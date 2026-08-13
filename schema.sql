-- ============================================================
-- DUKA — Shop Ledger MVP schema for Supabase (Postgres)
-- Run this in: Supabase Dashboard → SQL Editor → New query → Run
-- ============================================================

-- ---------- 1. Profiles (roles + shop linkage) ----------
-- Every auth user gets a profile. Owners have role='owner' and owner_id = NULL.
-- Keepers have role='keeper' and owner_id = the owner's profile id (their shop).
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null check (role in ('owner', 'keeper')),
  owner_id uuid references profiles(id) on delete cascade, -- null for owners, set for keepers
  created_at timestamptz not null default now()
);

-- Helper: returns the shop_id (owner's profile id) that a given user belongs to,
-- whether they ARE the owner or are a keeper working for one.
create or replace function shop_id_for(user_id uuid)
returns uuid
language sql stable
as $$
  select case
    when p.role = 'owner' then p.id
    else p.owner_id
  end
  from profiles p
  where p.id = user_id;
$$;

-- ---------- 2. Products ----------
create table products (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references profiles(id) on delete cascade,
  name text not null,
  unit text not null default 'piece', -- 'piece' | 'kg' | 'litre' | etc.
  cost_price numeric(12,2) not null default 0,
  selling_price numeric(12,2) not null default 0,
  barcode text not null unique,
  current_stock numeric(12,2) not null default 0,
  low_stock_threshold numeric(12,2) not null default 5,
  created_at timestamptz not null default now()
);

create index products_owner_idx on products(owner_id);
create index products_barcode_idx on products(barcode);

-- ---------- 3. Sales ----------
create table sales (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references profiles(id) on delete cascade,
  product_id uuid not null references products(id) on delete restrict,
  sold_by uuid not null references profiles(id),
  quantity numeric(12,2) not null check (quantity > 0),
  unit_price_at_sale numeric(12,2) not null,
  cost_price_at_sale numeric(12,2) not null, -- snapshot, so later cost edits don't rewrite history
  sold_at timestamptz not null default now()
);

create index sales_owner_idx on sales(owner_id);
create index sales_product_idx on sales(product_id);
create index sales_sold_at_idx on sales(sold_at);

-- ---------- 4. Stock movements (manual adjustments: deliveries, damage, counts) ----------
create table stock_movements (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references profiles(id) on delete cascade,
  product_id uuid not null references products(id) on delete cascade,
  change_amount numeric(12,2) not null, -- positive = added, negative = removed
  reason text not null default 'adjustment', -- 'delivery' | 'damage' | 'count_correction' | 'adjustment'
  recorded_by uuid not null references profiles(id),
  created_at timestamptz not null default now()
);

-- ---------- 5. Missed sales (keeper taps "out of stock" when a customer asks) ----------
create table missed_sales (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references profiles(id) on delete cascade,
  product_id uuid references products(id) on delete set null, -- nullable: item may not exist in catalog yet
  product_name_free_text text, -- fallback if not in catalog
  reported_by uuid not null references profiles(id),
  created_at timestamptz not null default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- Enforces SHOP-LEVEL isolation: a user only ever sees rows
-- belonging to their own shop (owner_id = shop_id_for(auth.uid())).
--
-- KNOWN V1 LIMITATION: this is row-level, not column-level.
-- A keeper's Supabase session can technically still query
-- products.cost_price or sales.cost_price_at_sale directly via
-- the API, even though the app UI never shows it to them.
-- Hardening step for later: move cost fields into a separate
-- table only owners can SELECT, or expose keepers a view that
-- excludes cost columns entirely. Fine for a v1 pilot with a
-- trusted keeper; don't rely on this for a hostile-keeper threat
-- model without that follow-up.
-- ============================================================

alter table profiles enable row level security;
alter table products enable row level security;
alter table sales enable row level security;
alter table stock_movements enable row level security;
alter table missed_sales enable row level security;

-- Profiles: a user can see their own profile and their shop-mates' profiles
create policy "profiles: view own shop" on profiles
  for select using (id = auth.uid() or owner_id = auth.uid() or shop_id_for(auth.uid()) = shop_id_for(id));

create policy "profiles: update own" on profiles
  for update using (id = auth.uid());

create policy "profiles: insert own on signup" on profiles
  for insert with check (id = auth.uid());

-- Products: shop members can read; only the owner can write
create policy "products: read own shop" on products
  for select using (owner_id = shop_id_for(auth.uid()));

create policy "products: owner writes" on products
  for insert with check (owner_id = auth.uid() and owner_id = shop_id_for(auth.uid()));

create policy "products: owner updates" on products
  for update using (owner_id = auth.uid());

create policy "products: owner deletes" on products
  for delete using (owner_id = auth.uid());

-- Sales: shop members can read and insert within their own shop
create policy "sales: read own shop" on sales
  for select using (owner_id = shop_id_for(auth.uid()));

create policy "sales: shop members insert" on sales
  for insert with check (owner_id = shop_id_for(auth.uid()) and sold_by = auth.uid());

-- Stock movements: same pattern
create policy "stock_movements: read own shop" on stock_movements
  for select using (owner_id = shop_id_for(auth.uid()));

create policy "stock_movements: shop members insert" on stock_movements
  for insert with check (owner_id = shop_id_for(auth.uid()) and recorded_by = auth.uid());

-- Missed sales: same pattern
create policy "missed_sales: read own shop" on missed_sales
  for select using (owner_id = shop_id_for(auth.uid()));

create policy "missed_sales: shop members insert" on missed_sales
  for insert with check (owner_id = shop_id_for(auth.uid()) and reported_by = auth.uid());

-- ============================================================
-- TRIGGER: selling a product automatically decrements stock
-- ============================================================
create or replace function apply_sale_to_stock()
returns trigger
language plpgsql
security definer
as $$
begin
  update products
  set current_stock = current_stock - new.quantity
  where id = new.product_id;
  return new;
end;
$$;

create trigger on_sale_decrement_stock
  after insert on sales
  for each row execute function apply_sale_to_stock();

create or replace function apply_stock_movement()
returns trigger
language plpgsql
security definer
as $$
begin
  update products
  set current_stock = current_stock + new.change_amount
  where id = new.product_id;
  return new;
end;
$$;

create trigger on_movement_adjust_stock
  after insert on stock_movements
  for each row execute function apply_stock_movement();
