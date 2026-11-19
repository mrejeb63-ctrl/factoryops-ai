# FactoryOps AI — Store Listing Draft

This file is a publishing asset, not a completed store submission. Confirm every claim against the release build and complete each store's policy, privacy and content questionnaires before submission.

## Product positioning

**Product name:** FactoryOps AI  
**Android application ID / iOS bundle ID:** com.factoryopsai.app  
**Primary category:** Business  
**Target users:** Manufacturing engineers, production leaders, quality teams, maintenance teams, procurement and factory operations managers.  
**Audience:** Business users; not designed for children.  
**Monetization:** No in-app purchase or subscription billing is implemented in the current codebase. Do not configure paid features until a billing model and terms are approved.

## Google Play

**Short description (75/80 characters)**

Manufacturing operations workspace for BOM, production, quality and supply.

**Full description**

FactoryOps AI brings key manufacturing operations into one practical workspace.

Track and review:
- BOM management: product and part references, product groups, validation, approval, blocking, production status and BOM accuracy.
- Production: planned and actual quantities, good parts, scrap, shifts, cycle times, downtime and line performance.
- Quality: nonconformities, defect categories, containment, root causes, corrective actions and follow-up.
- Cost control: recorded costs, currency-separated totals and production-linked usage variance.
- Inventory and material flow: stock, allocation, safety stock, reorder points, lead times and replenishment suggestions.
- Supplier performance and procurement: delivery, incoming quality, price history, audits, CAPA, capacity, continuity and supplier reviews.
- Maintenance: equipment, work orders, downtime and maintenance follow-up.
- Actions and risks: owners, due dates, operational follow-up and risk/opportunity registers.
- Operational intelligence: dashboards, trends and transparent rule-based observations.

Use the application in local mode or connect an administrator-configured Supabase workspace for account-based cloud records. Excel import and export support practical factory data workflows.

Important: FactoryOps AI is an operational decision-support tool. Insights depend on the quality and completeness of entered data. Verify critical engineering, safety, quality, costing and production decisions with qualified personnel. The current release is not a certified ERP, MES or QMS and does not replace validated factory systems.

Local-mode data is stored in the browser/device and is not automatically synchronized or backed up. Cloud mode requires a separately configured Supabase project and correctly tested access policies.

**Store contact URLs**
- Privacy policy: https://mrejeb63-ctrl.github.io/factoryops-ai/privacy.html
- Support: https://mrejeb63-ctrl.github.io/factoryops-ai/support.html
- Product website: https://mrejeb63-ctrl.github.io/factoryops-ai/

**Google Play asset checklist**
- [ ] 512 × 512 app icon (PNG).
- [ ] Feature graphic and phone/tablet screenshots in the current Play Console required formats.
- [ ] Store listing localized where translations are ready.
- [ ] App access instructions and a working reviewer account if sign-in is required.
- [ ] Data safety form completed from the actual release configuration and all SDK/provider behavior.
- [ ] Content rating, target audience, ads declaration and app access declarations completed accurately.
- [ ] Signed Android App Bundle and upload key securely backed up.
- [ ] For eligible new personal accounts, closed test completed with the required tester count and duration.

## Apple App Store

**App name:** FactoryOps AI  
**Subtitle (24/30 characters):** Manufacturing operations  
**Promotional text:** Bring BOM, production, quality, inventory, supplier performance and maintenance data into one practical factory workspace.  
**Keywords (84/100 characters):** manufacturing,production,BOM,quality,inventory,suppliers,maintenance,cost,operations  
**Primary category:** Business  
**Secondary category:** Productivity (confirm availability and fit in App Store Connect).

**Description**

FactoryOps AI is a practical operations workspace for manufacturing teams.

Manage and review BOM, production, quality, cost, inventory, supplier performance, maintenance, actions and operational risks in one interface.

Use dashboards and trend views to understand recorded factory performance. Import and export Excel workbooks to support existing engineering and operations workflows. Work locally on a device or connect an administrator-configured Supabase workspace for cloud records.

FactoryOps AI includes transparent rule-based operational observations. It does not connect to a generative AI service in the current release. Its outputs are decision support and must be checked against source data and factory procedures.

The current release is an evolving operational MVP. It is not a certified ERP, MES or QMS and should not be used as the sole system for safety-critical or regulated processes. Local records are device-specific and are not a backup. Cloud mode requires an independently configured Supabase project.

**App Store asset checklist**
- [ ] 1024 × 1024 App Store app icon (PNG, no transparency).
- [ ] Current required iPhone screenshots for supported display classes.
- [ ] iPad screenshots if iPad is enabled as a supported device.
- [ ] Privacy details completed for the exact app build and all third-party SDKs/providers.
- [ ] Age-rating questionnaire completed accurately.
- [ ] Accessibility and export compliance declarations completed where applicable.
- [ ] App Review notes and test account prepared.
- [ ] Signed archive uploaded and validated through TestFlight.

## Privacy and app access review

The current codebase can process:
- Email and authentication/session information when Supabase authentication is enabled.
- User-entered or imported operational records, including factory, supplier and employee-related fields if the workspace operator chooses to enter them.
- Local browser/device storage in local mode.
- Technical request data handled by hosting and authentication providers.
- Google Fonts network requests from the current stylesheet.

Before submitting:
1. Confirm the legal operator and contact details.
2. Decide which Supabase project/region is used and document its retention, backup and deletion settings.
3. Review GitHub Pages, Supabase and Google Fonts provider practices.
4. Complete Google Play Data safety and Apple App Privacy disclosures from the actual production build, not from this draft.
5. Ensure the published privacy policy describes any analytics, crash reporting, push notification or other SDK added later.
6. Provide reviewers with working access to all gated features or clear instructions for local mode.
7. Do not include real customer, employee or factory-sensitive records in screenshots or review accounts.

## Release notes draft

Initial release of FactoryOps AI: manufacturing operations dashboard with BOM, production, quality, cost, inventory, supplier, maintenance, action and risk modules; local workspace mode; optional Supabase cloud configuration; and Excel import/export.

## Not yet ready for store submission

- Android production AAB signing and Play Console release.
- iOS distribution signing, TestFlight validation and App Store submission.
- Final production app icons and store screenshots.
- Final legal operator details and reviewed legal terms.
- Actual Supabase tenant-isolation, role, backup and restore test evidence.
- Physical-device acceptance testing for file import/export, authentication, navigation and offline behavior.
