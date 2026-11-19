# FactoryOps AI 1.2

Responsive React + TypeScript PWA for industrial operations. Includes BOM, Production, Quality, Cost, Maintenance, rule-based operational insights, four UI languages (English, French, Arabic/RTL, German), Excel import/export, local browser storage, and optional Supabase cloud authentication and company-scoped records.

## Version 1.2 improvements

- Expanded the Supabase `records.module` constraint to support BOM, Production, Quality, Cost, Inventory, Suppliers, Maintenance, Actions and Risks. The previous schema allowed only five modules and rejected cloud saves from the newer modules.
- Updated SheetJS to the patched 0.20.3 distribution from the official SheetJS CDN; the public npm registry's legacy 0.18.5 package is affected by spreadsheet parsing advisories.
- Added role-aware record controls: viewers are read-only, operators can create/update, and managers/admins can delete; Supabase RLS remains the enforcement layer.
- Clarified the current MVP boundaries and release validation requirements.

## Version 1.1 fixes

- Corrected the source entry point and root-level module imports.
- Corrected TypeScript's source-file inclusion so the existing root-level application files are compiled.
- Configured Vite for the GitHub Pages project path `/factoryops-ai/`.
- Made the web app manifest and service worker work from the GitHub Pages subpath.
- Restored local browser records when cloud mode is configured but the user is signed out or has not created/joined a company.
- Added a GitHub Actions build and GitHub Pages deployment workflow.

## Deploy free with GitHub Pages

This repository includes `.github/workflows/deploy.yml`.

1. Open the repository on GitHub.
2. Open **Settings → Pages**. Set the build/deployment source to **GitHub Actions** if it is not already selected.
3. Open the **Actions** tab and select **Build and deploy FactoryOps AI**.
4. The workflow builds the app and deploys it when changes reach the `main` branch.
5. After the first successful deployment, open **Settings → Pages** to find the published URL. It should be `https://mrejeb63-ctrl.github.io/factoryops-ai/`.

No Node.js installation or local computer build is needed for this GitHub Actions deployment. You can review and merge the update from GitHub's mobile or desktop website.

## Important scope and data

- This is a functional MVP, not a certified ERP/MES/QMS.
- The AI Assistant uses transparent deterministic rules. It does not call a generative AI API.
- Without a signed-in Supabase workspace, records are stored in browser localStorage on that device/browser only. This is not cloud synchronization or a backup.
- Cloud sign-up, login, company creation, and record synchronization require your own Supabase project and running SQL schema.
- Never put a Supabase service-role key in the browser. Use only the public anon/publishable key and keep Row Level Security enabled.
- Invitations/member management, payment collection, email notifications, external ERP integrations, advanced audit trails and production-grade backup/monitoring are not included.

## Optional Supabase cloud mode

1. Create a project at [Supabase](https://supabase.com).
2. Copy the project URL and public anon key.
3. In GitHub, open **Settings → Secrets and variables → Actions → Variables** and add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Add these variables to the workflow build step as environment variables if cloud mode is required.
5. Run the SQL in `schema.sql` in the Supabase SQL editor.
6. Add the deployed GitHub Pages URL to Supabase Authentication's allowed redirect URLs.

The current workflow intentionally builds without Supabase variables, so the local browser workspace works immediately. Cloud mode remains optional.

## Modules

- **Dashboard:** cross-module operating KPIs and operational overview.
- **BOM Manager:** product and part classification, master BOM, validation, approval, blocking, production status, accuracy and costing references.
- **Production:** line/workstation, operation, operator, order/batch, planned/actual/good/scrap quantities, usage, shift, cycle time and downtime.
- **Quality:** NCR, defect, severity, containment, root cause, corrective action, owner, due date and effectiveness.
- **Cost Control:** cost categories, quantities, unit/total cost, currency, period and production-linked variance intelligence.
- **Inventory & Material Flow:** stock, allocation, safety/reorder levels, replenishment, lead time, supplier exposure and currency-separated stock value.
- **Supplier Performance & Procurement:** purchasing price, supplier risk, audit/qualification, CAPA, capacity/continuity, scorecards, benchmarking, portfolio, reviews, contract renewal and commercial exposure.
- **Maintenance:** equipment, maintenance type, downtime, technician, next due date and work order, with reliability intelligence.
- **Actions:** operational action tracking and follow-up.
- **Risk & Opportunities:** operational risk and opportunity register.
- **AI Assistant:** deterministic, rule-based operational observations; no generative AI API is connected.
- **Settings:** language, workspace and optional cloud configuration.

Only data-bearing modules are stored as records in Supabase. Dashboard, AI Assistant and Settings are application views/tools, not record modules.

## Data and release notes

- The app is currently published as a web app/PWA through GitHub Pages. It is not published in Google Play or the Apple App Store.
- Local browser storage is device/browser-specific. Export and securely back up important data before changing devices, clearing browser data or switching storage modes.
- Optional Supabase cloud mode requires applying the root-level `schema.sql` in the Supabase SQL Editor and configuring the public URL/anon key as GitHub Actions variables. Do not use a service-role key in the browser.
- The updated schema accepts all data-bearing modules. Existing Supabase projects must re-run the updated SQL file to apply the module constraint change.
- Cloud authentication, tenant isolation, role enforcement and backup/restore still require testing in the owner's configured Supabase project before business-critical production use.
- The published GitHub Pages app is suitable for evaluation and controlled pilot use; it should not be represented as a certified ERP/MES/QMS or production-certified SaaS until those checks are completed.

## Build locally

Requires Node.js 22+ and npm:

```bash
npm install
npm run dev
npm run build
```

## PWA / Android

After the GitHub Pages deployment succeeds, open the published HTTPS URL in Chrome on Android. Open Chrome's menu and choose **Install app** or **Add to Home screen**. Local data is specific to that browser/device. The PWA caches the app shell and same-origin static assets after they have been loaded online. Local browser records can be edited while the cached app is available; cloud-backed operations require connectivity. Offline cloud write queues and background synchronization are not implemented.

## Validation

GitHub Actions runs `npm install` and `npm run build` automatically. The cloud integration still requires a configured Supabase project and manual tenant-isolation/security testing. Do not treat it as production-certified.
