# FactoryOps AI publishing roadmap

**Product direction:** professional industrial operations SaaS for manufacturing teams.  
**Distribution target:** web/PWA, Google Play and Apple App Store.  
**Current package version:** 1.3.0  
**Native identifier:** com.factoryopsai.app

This roadmap separates repository work that can be automated from owner-controlled account, signing, legal, backend and store-review requirements. A green CI build is not the same as a store-approved production release.

## Phase 1 — Web application and PWA

**Repository implementation**
- [x] React/TypeScript production build.
- [x] GitHub Pages deployment workflow with dependency security audit.
- [x] Responsive PWA manifest, icon and service-worker caching.
- [x] Versioned service-worker cache to refresh deployed app assets.
- [x] Public privacy, terms and support pages.
- [x] Optional public Supabase client variables passed to the build without embedding a service-role key.

**Release acceptance**
- [x] Most recent confirmed Pages build and deployment for commit 337322559a96d95002e192eb22afdada713f2a03 succeeded.
- [ ] Validate PWA installation and offline local-mode behavior on physical Android and iOS devices.
- [ ] Complete owner-specific cloud authentication, RLS and recovery tests before business-critical rollout.

## Phase 2 — Android / Google Play

**Repository implementation**
- [x] Capacitor 8.6.2 runtime and Android platform dependency.
- [x] Native-relative Vite asset build.
- [x] Android CI project generation and debug APK pipeline.
- [x] CI SDK setup updated to the supported Android setup action.
- [x] Android debug APK workflow completed successfully and uploaded the preview artifact (run 44496495031).
- [ ] Add production app icons and final Android screenshots.
- [ ] Add release signing configuration after the owner securely creates and stores the upload key.

**Owner/store gates**
- [ ] Create and verify Play Console developer account.
- [ ] Confirm package ID and store ownership before first listing.
- [ ] Complete Data safety, app access, content rating, target audience, privacy and store listing.
- [ ] Complete required closed testing for eligible new personal accounts.
- [ ] Build signed Android App Bundle (AAB), submit and pass Google review.

## Phase 3 — iOS / Apple App Store

**Repository implementation**
- [x] Capacitor 8.6.2 iOS platform dependency.
- [x] iOS project generation and sync in CI.
- [x] Unsigned iOS Simulator build pipeline scaffold.
- [ ] Confirm the latest Xcode project-based simulator build and archive artifact succeed.
- [ ] Add production App Store icon and iPhone/iPad screenshots.
- [ ] Add signing/archive workflow only after Apple certificates and provisioning profiles are securely available.

**Owner/store gates**
- [ ] Enroll in Apple Developer Program.
- [ ] Confirm bundle ID and legal seller identity.
- [ ] Complete App Store privacy details, age rating, review notes and product page.
- [ ] Create signed archive and validate through TestFlight on physical devices.
- [ ] Submit and pass App Review.

## Phase 4 — Multi-company SaaS readiness

**Repository implementation**
- [x] Optional Supabase authentication and company-scoped records.
- [x] Schema includes all nine data-bearing modules.
- [x] Database RLS policies separate membership read access and role-based record writes/deletes.
- [x] Active company selector for users with multiple memberships.
- [x] Cloud record queries now filter to the selected company.
- [x] Role-aware UI controls for viewer, operator, manager and admin.

**Owner/backend gates**
- [ ] Configure repository Actions variables VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.
- [ ] Apply root-level schema.sql to the owner's Supabase project.
- [ ] Verify account creation, sign-in, email confirmation and session expiry.
- [ ] Verify two-company users can switch workspaces without record leakage.
- [ ] Test direct cross-tenant SELECT, INSERT, UPDATE and DELETE attempts with separate accounts.
- [ ] Test all four roles against database policies, not only the UI.
- [ ] Establish backups, restore drills, data retention/deletion, monitoring and incident response.
- [ ] Implement invitations/member administration, audit history, billing and production support before a commercial SaaS launch.

## Phase 5 — Commercial launch

- [ ] Confirm legal operator, registered business details, support contact and applicable jurisdiction.
- [ ] Obtain legal review of privacy policy, terms, data processing and customer contract.
- [ ] Define pricing, trial, subscription and cancellation behavior; billing is not currently implemented.
- [ ] Prepare onboarding, demo dataset, training and customer support process.
- [ ] Define uptime, recovery point/time objectives and customer data export/exit process.
- [ ] Complete security and privacy review of every third-party service and SDK.
- [ ] Run a controlled pilot with representative manufacturing users and documented acceptance criteria.

## Current limits — do not represent as complete

- Store builds are preview builds until signing, store declarations, physical-device testing and review are complete.
- The current iOS CI target is an unsigned simulator build, not an App Store IPA.
- The current Android CI target is a debug APK, not a signed production AAB.
- Supabase cloud mode remains disabled unless the repository variables and owner's project are configured. Build logs currently show those values empty.
- Local browser storage is device/browser-specific and is not a backup.
- No payment collection, invitations, external ERP integration, full audit trail, offline cloud write queue or production monitoring is included.
- The current AI Assistant uses deterministic rules and does not call a generative AI API.
