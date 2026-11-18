# FactoryOps AI 1.1

Responsive React + TypeScript PWA for industrial operations. Includes BOM, Production, Quality, Cost, Maintenance, rule-based operational insights, four UI languages (English, French, Arabic/RTL, German), Excel import/export, local browser storage, and optional Supabase cloud authentication and company-scoped records.

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

- **BOM:** part number, description, revision, quantity, unit, master BOM, validation status.
- **Production:** production line, planned/actual quantity, good/scrap parts, shift, cycle time.
- **Quality:** NCR, defect category, severity, root cause, corrective action, owner, due date.
- **Cost:** cost category, quantity, unit cost, currency, cost center, reference.
- **Maintenance:** equipment, maintenance type, downtime, technician, next due date, work order.
- **AI Assistant:** rule-based production/BOM/quality/maintenance observations.

## Build locally

Requires Node.js 20+ and npm:

```bash
npm install
npm run dev
npm run build
```

## PWA / Android

After the GitHub Pages deployment succeeds, open the published HTTPS URL in Chrome on Android. Open Chrome's menu and choose **Install app** or **Add to Home screen**. Local data is specific to that browser/device. Offline writes and background cloud synchronization are not implemented.

## Validation

GitHub Actions runs `npm install` and `npm run build` automatically. The cloud integration still requires a configured Supabase project and manual tenant-isolation/security testing. Do not treat it as production-certified.
