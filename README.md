# Duka — Shop Ledger (MVP)

A phone-first tool for a shop owner to track sales, stock, and profit remotely, and for a keeper to scan and sell without ever seeing cost prices or margins.

Built by Fitsum Asegahegn. Complementary to the Applied Finance Suite, but a separate product: full-stack operational tooling rather than statistical demos.

---

## What's in this MVP (Phase 1)

- Owner and keeper accounts with different views (Supabase Auth + `profiles` table)
- Owner: add products, auto-generated barcodes, sales/profit dashboard (today / 7d / 30d), low-stock alerts
- Keeper: scan a barcode with the phone camera, confirm quantity, record the sale — no cost or profit ever shown
- Missed-sale logging (customer asked for something out of stock)
- Stock automatically decrements on each sale (database trigger)

**Not in this MVP yet (Phase 2, next):** demand forecasting, stockout probability, forex-risk-aware reorder timing, shrinkage/audit alerts. The plain-language alert templates for these are already drafted — this build wires up the data those alerts will eventually run on.

---

## Setup — do this once, in order

### 1. Create the Supabase project (10 min)
1. Go to [supabase.com](https://supabase.com), sign up, click **New Project**.
2. Pick a name (e.g. `duka-shop`), a database password (save it somewhere), and a region close to Ethiopia (EU or Middle East regions usually have the lowest latency).
3. Wait ~2 minutes for the project to provision.

### 2. Run the database schema (10 min)
1. In the Supabase dashboard, open **SQL Editor** → **New query**.
2. Paste the entire contents of `schema.sql` and click **Run**.
3. Check **Table Editor** — you should see `profiles`, `products`, `sales`, `stock_movements`, `missed_sales`.

### 3. Turn off email confirmation for faster testing (5 min, optional)
By default Supabase requires email confirmation before sign-in works. For quick local testing:
1. **Authentication** → **Providers** → **Email** → turn off "Confirm email".
   *(Turn this back on before a real pilot with real users.)*

### 4. Get your API keys (5 min)
1. **Project Settings** → **API**.
2. Copy the **Project URL** and the **anon public** key.
3. Open `supabaseClient.js` in this folder and paste them in:
   ```js
   const SUPABASE_URL = "https://xxxxx.supabase.co";
   const SUPABASE_ANON_KEY = "eyJ...";
   ```

### 5. Test locally (10 min)
1. From this folder, run a local server (any of these work):
   ```bash
   npx serve .
   # or
   python3 -m http.server 8000
   ```
2. Open the local URL in your browser.
3. Sign up as **Shop owner**. You'll land on the owner dashboard.
4. Add a product (e.g. "Sugar", cost 90, price 105, opening stock 50). Note the barcode that appears.
5. Copy your **shop code** from the owner dashboard (it's your user ID).
6. Open an incognito window, sign up as **Keeper**, paste in the shop code.
7. On the keeper screen, tap **Scan a Product** — since you likely don't have a printed barcode yet, you can temporarily test by typing the barcode value into your browser console:
   ```js
   onScanSuccess("DUKA123456789") // use the real barcode shown when you added the product
   ```
   Once you print a real label and scan it with the camera, this manual step won't be needed.
8. Confirm a sale, then go back to the owner dashboard and refresh — the stats and stock should update.

### 6. Deploy (10 min)
1. Push this folder to a GitHub repo.
2. Go to [Netlify](https://netlify.com) or [Vercel](https://vercel.com) → **New site from Git** → pick the repo → deploy (no build step needed, it's static).
3. Test on an actual phone, on the actual shop's WiFi/data connection, before handing it to Shemsu.

---

## Known limitations (v1, honest list)

- **Cost-price hiding is UI-level, not database-level.** RLS isolates shops from each other correctly, but a technically curious keeper could still query `products.cost_price` directly via the Supabase client if they opened the browser console. Fine for a trusted pilot; not a hard security boundary. Hardening step: move cost data to a table/view keepers have no `SELECT` grant on at all.
- **Barcodes are generated codes, not real product barcodes.** They're unique per product in your shop, printed as Code128 labels — not linked to any external barcode database. That's intentional and simpler for this use case.
- **No offline support yet.** If the connection drops mid-sale, the sale won't save. For the pilot, this is an acceptable v1 trade-off (per the plan), but queueing failed writes locally is the recommended next hardening step before wider rollout.
- **Bulk goods (e.g. 100kg sugar) use "scan product, enter quantity."** No sub-unit repacking or scale integration in v1.

## Next: Phase 2

Wire up the demand-forecasting module (bootstrap resampling of daily sales, reorder point, stockout probability) and the plain-language alert templates already drafted, once at least 2–3 weeks of real sales data exist in the `sales` table.
