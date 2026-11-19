# FactoryOps AI 1.3

Professional industrial operations workspace built with React, TypeScript and Vite. The product is delivered as a hosted web application/PWA and is being prepared for native Android and iOS distribution through Capacitor.

## Release status

| Channel | Status |
|---|---|
| Web application | Published through GitHub Pages |
| Installable PWA | Published; install from the HTTPS site |
| Android | Capacitor foundation and automated debug-APK preview pipeline prepared; store signing and Play Console release remain pending |
| iOS | Capacitor foundation and unsigned simulator-build pipeline prepared; signing, TestFlight and App Store release remain pending |
| Multi-company cloud SaaS | Optional Supabase integration exists; owner-project configuration, tenant isolation, role and recovery tests remain release gates |

Live web app: https://mrejeb63-ctrl.github.io/factoryops-ai/

## Version 1.3 publishing improvements

- Added Capacitor 8.6.2 foundations for Android and iOS using one shared application codebase.
- Added native build mode with relative asset paths for packaged WebViews.
- Disabled hosted PWA service-worker registration inside native Capacitor shells.
- Added manual/tag-triggered mobile CI for an Android debug APK and unsigned iOS simulator preview.
- Expanded PWA metadata and added public privacy, terms and support pages.
- Connected optional Supabase public project variables to web and mobile build workflows. Never place a service-role key in a client build.

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

## Web deployment

The GitHub Pages workflow runs dependency auditing, TypeScript/Vite build and deployment on pushes to main. In GitHub Settings → Pages, select GitHub Actions as the deployment source.

For optional cloud mode, add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY as repository Actions variables. The web and mobile workflows read these variables automatically. If absent, the build remains in local-browser mode.

## Android and iOS preview builds

Open Actions → Build FactoryOps AI mobile previews → Run workflow. The workflow creates:
- An Android debug APK for controlled device testing; it is not a Play Store-signed release.
- An unsigned iOS Simulator app archive; it is not an installable iPhone/App Store package.

The workflow also runs when a mobile-v* tag is pushed. Download previews from the workflow Artifacts section.

Native app identifier: com.factoryopsai.app. Treat this identifier as permanent after creating a store listing.

### Store publication gates

**Google Play**
- Create and verify a Play Console developer account.
- Complete app content, Data safety, privacy policy, store listing, screenshots and testing declarations.
- New personal developer accounts created after 13 November 2023 must complete a closed test with at least 12 opted-in testers for 14 continuous days before applying for production access.
- A signed Android App Bundle, signing-key custody and Play Console submission remain required.

**Apple App Store**
- Enroll in the Apple Developer Program.
- Complete App Store Connect app information, age rating, privacy details, screenshots and review notes.
- Build and sign an archive with the correct distribution certificate and provisioning profile, then validate through TestFlight.
- Current iOS CI is an unsigned simulator smoke build only. It does not create an App Store IPA.

No store submission, paid enrollment, signing certificate, production credential or external service purchase is performed automatically.

## Optional Supabase cloud mode

1. Create and own a Supabase project.
2. Add the project URL and public anon/publishable key as GitHub Actions repository variables named VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.
3. Run root-level schema.sql in the Supabase SQL editor.
4. Add the published site URL to Supabase Authentication allowed redirect URLs.
5. Test authentication, company creation, tenant isolation, role permissions, export/import and recovery before entering business-critical data.

Never put a Supabase service-role key in a browser build, GitHub Pages artifact or mobile app. A public anon key is not a substitute for correctly configured Row Level Security.

## Data and operating boundaries

- Without a signed-in Supabase workspace, records are stored in browser localStorage on that device/browser only. This is not cloud synchronization or a backup.
- Cloud sign-up, login, company creation and record synchronization require your own Supabase project and running SQL schema.
- Invitations/member management, payment collection, email notifications, external ERP integrations, advanced audit trails and production-grade backup/monitoring are not included.
- The AI Assistant uses deterministic rules; it does not call a generative AI service.
- This is an operational MVP, not a certified ERP/MES/QMS and not a safety-critical control system. Validate source data and operational decisions with qualified personnel.

## Product policies and support

- Privacy policy: https://mrejeb63-ctrl.github.io/factoryops-ai/privacy.html
- Terms of use: https://mrejeb63-ctrl.github.io/factoryops-ai/terms.html
- Support: https://mrejeb63-ctrl.github.io/factoryops-ai/support.html

Review and adapt these pages to the final legal operator, actual Supabase configuration, business location and applicable law before commercial launch.

## Local development

Requires Node.js 22+. Run npm install, npm run dev and npm run build. For native project generation, use the native build and Capacitor CLI on a configured Android/iOS development machine. Capacitor 8 requires current supported native toolchains; see the official Capacitor environment setup guide.

## Validation

See TEST_PLAN.md. A successful CI build does not prove device compatibility, cloud tenant isolation, store-policy compliance or production readiness.
