# FactoryOps AI release validation plan

## Build checks
- [ ] `npm install` completes without dependency errors.
- [ ] `npm run build` completes successfully.
- [ ] `npm run preview` serves the production build.

## Local mode
- [ ] Open app with no `.env`; local workspace status is shown.
- [ ] Create a BOM record with a part number and status Approved.
- [ ] Create production record with planned, actual, good and scrap quantities.
- [ ] Create quality NCR, cost record, inventory item, supplier record, maintenance record, action and risk record.
- [ ] Refresh browser; local records remain.
- [ ] Search records; export workbook; import a sample workbook.
- [ ] Edit and delete records.
- [ ] Switch EN/FR/AR/DE; Arabic uses RTL direction.
- [ ] Check desktop, tablet and Android viewport layouts.
- [ ] Install PWA from HTTPS Chrome and relaunch.

## Cloud mode (requires Supabase project)
- [ ] Apply the root-level `schema.sql` in the Supabase SQL Editor (it is safe to re-apply).
- [ ] Create account and sign in.
- [ ] Create company using `create_company` RPC.
- [ ] Create/read/update records.
- [ ] Sign out and sign in again; records persist.
- [ ] Use a second account with no membership; it cannot read first company's records.
- [ ] Verify a user cannot read, insert, update or delete a record for a company they do not belong to.
- [ ] Verify viewer can read but cannot create, update or delete records.
- [ ] Verify operator can read, create and update but cannot delete records.
- [ ] Verify manager can read, create, update and delete records.
- [ ] Verify admin can read, create, update and delete records.
- [ ] Verify an authenticated user cannot add themselves or another user to a company by direct `company_members` insert.
- [ ] Test expired session and email-confirmation flow.

## Release gate
- [ ] Confirm the latest GitHub Actions build and Pages deployment succeeded.
- [ ] Open the published URL in desktop Chrome/Edge and Android Chrome.
- [ ] Verify browser console has no uncaught runtime errors during the core workflows.
- [ ] Confirm manifest, icon and service worker load from the GitHub Pages project subpath.
- [ ] Confirm a fresh visitor can use local mode without Supabase configuration.
- [ ] Export a workbook and re-import it into a test workspace; compare record counts and key fields.
- [ ] Confirm a backup/export is available before testing data migration or storage-mode changes.

## Known limitations
- This source package has not been connected to your Supabase instance, deployed, or tested against your production environment. Do not treat cloud mode as validated until the cloud tests above pass.
- Role-aware controls and membership invitations are not fully implemented in the frontend. The database RLS policies enforce read/write/delete permissions; invitations/member administration remain unavailable.
- Offline writes and background synchronization are not implemented.
