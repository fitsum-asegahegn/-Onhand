-- ============================================================
-- FIX: barcode uniqueness should be per-shop, not global
-- Run once in: Supabase Dashboard → SQL Editor → New query → Run
--
-- WHY: the original schema had `barcode text not null unique` — fine
-- when every barcode was a randomly generated ONHAND-xxxx string, but
-- real manufacturer barcodes (EAN-13/UPC-A, printed on the product by
-- the manufacturer) are IDENTICAL across every shop that stocks that
-- product. A global unique constraint would incorrectly block a second
-- shop from ever registering a product a different shop already scanned.
-- The actually meaningful rule is: unique WITHIN one shop.
-- ============================================================

-- Drop the old global constraint. Default Postgres naming for a
-- column-level `unique` is <table>_<column>_key — if this errors with
-- "constraint does not exist", check the real name with:
--   select conname from pg_constraint where conrelid = 'products'::regclass;
-- and substitute it below.
alter table products drop constraint if exists products_barcode_key;

-- Add the correct composite constraint: unique per shop, not globally.
alter table products add constraint products_owner_barcode_unique unique (owner_id, barcode);
