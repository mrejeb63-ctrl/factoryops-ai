# FactoryOps AI release validation plan

## Web/PWA CI
- [ ] Dependency installation and high/critical vulnerability audit pass.
- [ ] TypeScript/Vite production build succeeds.
- [ ] GitHub Pages deployment succeeds.
- [ ] Manifest, icon and service worker load from the GitHub Pages project subpath.
- [ ] Fresh visitor can use local mode without Supabase configuration.
- [ ] Install PWA from HTTPS Chrome and relaunch.
- [ ] Verify desktop, tablet and Android viewport layouts.
- [ ] Check browser console for uncaught runtime errors during core workflows.

## Local mode
- [ ] Create BOM, production, quality, cost, inventory, supplier, maintenance, action and risk records.
- [ ] Refresh browser; local records remain.
- [ ] Search records; export workbook; import a sample workbook.
- [ ] Edit and delete records.
- [ ] Switch EN/FR/AR/DE; Arabic uses RTL direction.
- [ ] Export a workbook and re-import it into a clean test workspace; compare counts and key fields.

## Cloud mode (requires the owner's Supabase project)
- [ ] Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY as GitHub Actions repository variables.
- [ ] Confirm web and mobile workflows receive only these public client values.
- [ ] Apply root-level schema.sql in the Supabase SQL Editor.
- [ ] Create account, sign in and create company using create_company RPC.
- [ ] Create/read/update records; sign out and sign in again.
- [ ] Use a second account with no membership; it cannot read the first company's records.
- [ ] Verify cross-company SELECT/INSERT/UPDATE/DELETE attempts are rejected by RLS.
- [ ] Verify viewer, operator, manager and admin permissions.
- [ ] Verify authenticated users cannot self-assign memberships or roles.
- [ ] Test expired session, email-confirmation flow, backup and restore.

## Android preview and store release
- [ ] Run Actions → Build FactoryOps AI mobile previews.
- [ ] Install Android debug APK on physical Android devices.
- [ ] Test login, local mode, data entry, charts, import/export, keyboard, orientation and back navigation.
- [ ] Test offline local-mode behavior and cloud-mode connectivity handling.
- [ ] Generate production app icons and screenshots.
- [ ] Create and securely back up Android upload/signing key.
- [ ] Build and validate signed Android App Bundle (AAB).
- [ ] Complete Play Console app content, Data safety, privacy policy, target audience and listing.
- [ ] For eligible new personal accounts, complete required 12-tester/14-day closed test and apply for production access.
- [ ] Submit signed release to Play Console review.

## iOS preview and store release
- [ ] Run mobile workflow and confirm unsigned simulator build succeeds.
- [ ] Test supported iPhone/iPad simulators and physical devices.
- [ ] Validate safe areas, keyboard, navigation, file import/export and authentication redirects.
- [ ] Generate App Store icons and screenshots.
- [ ] Enroll in Apple Developer Program and configure bundle identifier, certificates and provisioning profiles.
- [ ] Build signed archive and upload to App Store Connect.
- [ ] Complete privacy details, age rating, review notes and product page metadata.
- [ ] Distribute through TestFlight and collect feedback.
- [ ] Submit for App Review.

## Legal, privacy and operational release gates
- [ ] Confirm legal operator name, business address, support contact and governing jurisdiction.
- [ ] Review privacy/terms pages against real hosting, analytics, authentication and retention configuration.
- [ ] Publish support and incident-response process.
- [ ] Define data ownership, retention, deletion, backup and restoration responsibilities.
- [ ] Complete security review of Supabase RLS, exposed configuration and account lifecycle.
- [ ] Confirm no service-role key or secret is included in client artifacts.
- [ ] Define monitored production environment and recovery objectives before business-critical rollout.

## Known limitations
- Mobile workflow creates an Android debug APK and unsigned iOS Simulator build only. It does not sign, notarize or submit store releases.
- Store release requires developer accounts, legal declarations, privacy disclosures, signing credentials and human review.
- Cloud mode is not validated until the owner's Supabase project passes tenant-isolation, role, backup and restore tests.
- Local browser storage is device/browser-specific; offline cloud write queues and background synchronization are not implemented.
- Invitations/member administration, billing, external ERP integrations, advanced audit trails and production monitoring are not included.
