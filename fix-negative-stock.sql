-- ============================================================
-- FIX: negative stock
-- Run once in: Supabase Dashboard → SQL Editor → New query → Run
--
-- WHY THIS HAPPENED: the sale trigger did current_stock = current_stock
-- - quantity with no floor. A double-tapped Confirm Sale button (fixed
-- separately in keeper.html) or a genuinely oversold item could push
-- current_stock below zero, which reads as broken/confusing to a
-- non-technical owner even though the sales themselves were recorded
-- correctly — this only affects the displayed running total.
-- ============================================================

create or replace function apply_sale_to_stock()
returns trigger
language plpgsql
security definer
as $$
begin
  update products
  set current_stock = greatest(current_stock - new.quantity, 0)
  where id = new.product_id;
  return new;
end;
$$;

-- One-time cleanup: any product that's already showing negative stock
-- from before this fix gets floored at zero. This does NOT touch or
-- delete any sales history — only the current_stock display number.
update products set current_stock = 0 where current_stock < 0;
