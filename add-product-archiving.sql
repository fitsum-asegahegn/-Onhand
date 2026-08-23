-- ============================================================
-- ADD: product archiving (soft delete)
-- Run once in: Supabase Dashboard → SQL Editor → New query → Run
--
-- WHY NOT A REAL DELETE: sales.product_id has "on delete restrict" —
-- deliberately, so a product can never be deleted out from under its own
-- sales history (that would silently corrupt past revenue/profit numbers).
-- Archiving hides a product from the active catalog and from keeper
-- scanning, without touching anything it's connected to.
-- ============================================================

alter table products add column if not exists is_archived boolean not null default false;

-- Index for the common case (loading the active catalog) — optional but
-- cheap, and this table will only grow.
create index if not exists products_owner_active_idx on products(owner_id, is_archived);
