# FactoryOps AI — Supabase cloud setup and validation

This guide enables optional cloud synchronization. It does not require sharing a password, service-role key, or database secret with anyone.

## 1. Create the Supabase project

1. Create a project in your own Supabase account.
2. Choose a strong database password and keep it in your password manager.
3. In **Project Settings → API**, copy the Project URL and the public anon/publishable key.
4. Never use the service-role/secret key in FactoryOps AI, a browser, an Android APK, or GitHub Actions variables prefixed with `VITE_`.

## 2. Apply the database schema

1. Open **SQL Editor** in Supabase.
2. Open the repository's root `schema.sql`.
3. Paste the complete file into a new SQL query and run it.
4. Confirm the query completes without errors. The schema enables Row Level Security (RLS), tenant-scoped record policies, role-based writes, restricted membership creation, and automatic record update timestamps.

Re-running the schema is designed to refresh the listed policies and timestamp trigger. Review any custom policies or triggers in an existing project before applying changes.

## 3. Configure GitHub Actions variables

In the GitHub repository, open **Settings → Secrets and variables → Actions → Variables** and add:

| Variable | Value |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase Project URL |
| `VITE_SUPABASE_ANON_KEY` | Your public anon/publishable key |

These are public client configuration values, not passwords. Do not add a service-role key. Re-run the **Build and deploy FactoryOps AI** workflow after adding the variables; the mobile workflow also reads them on its next build.

## 4. Configure authentication URLs

In Supabase **Authentication → URL Configuration**:
- Set the Site URL to `https://mrejeb63-ctrl.github.io/factoryops-ai/`.
- Add that same URL to the allowed redirect URLs.
- If using a custom domain later, add its exact HTTPS URL too.

Use a strong password and enable email confirmation if required by your operating policy. Configure SMTP before relying on production sign-up emails; default provider limits may be restrictive.

## 5. Validate before importing factory data

Use two separate test accounts and two separate companies. Use dummy data only.

- Account A creates Company A and adds a dummy BOM record.
- Account B creates Company B and adds a different dummy record.
- Confirm A cannot see B's company or records, and B cannot see A's.
- In Company A, test roles by changing membership through a trusted administrative process: viewer cannot create/update/delete; operator can create/update but cannot delete; manager can create/update/delete; admin can manage company ownership-level tasks supported by the app.
- Sign out and sign back in; verify cloud records remain available.
- Export the test records, then test importing them back without creating unintended duplicates.
- Confirm record changes update the `updated_at` timestamp.

Do not test role changes by editing membership directly from the browser. The current MVP intentionally does not include invitations or a member-administration screen.

## 6. Backup and recovery

Before business-critical use, configure Supabase database backups/PITR according to your plan and retention needs. Export important FactoryOps data regularly as an additional recovery copy. A spreadsheet export is not a substitute for a tested database restore.

Perform a restore drill into a separate test project before relying on backups. Record the recovery point and recovery time achieved.

## 7. Release boundaries

Cloud mode is optional. If the two GitHub variables are absent, the application uses browser-local storage; data will not synchronize between devices. A successful build does not prove RLS isolation or backup recovery. Complete the tests above before loading confidential supplier, customer, employee, pricing, or production information.

FactoryOps AI currently has no in-app invitation/member administration, automated backup scheduler, or full audit-trail interface. These remain separate development items.
