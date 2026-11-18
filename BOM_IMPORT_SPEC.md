# FactoryOps AI 1.2 — BOM Manager and dual-format import specification

## Goal
Support both the existing ERP BOM export (the 21-column format) and an extended FactoryOps Excel template. Existing ERP columns must be preserved verbatim in each imported record's `details`; normalized fields are added alongside them. Import remains compatible with the existing local-workspace and optional Supabase record storage.

## Import modes

### A. Existing ERP export (no template changes required)
Recognized source columns, in their existing names:
`DATAAREAID, salesitemid, salesitemsearchname, rootBOMId, rootApproved, rootBlocked, parentbomid, parentActive, parentApproved, parentBlocked, itemid, NAME, BRE_ITEMCLASSIFICATION, PRODUCTGROUPID, SUBPRODUCTGROUPID, BRE_EXCHANGERATE, BRE_FULLBOMQTY, bomlevel, SCRAPVAR, BRE_WRKCTRID, BRE_MES_REGENERATED`.

The importer keeps every original column and maps common values into normalized fields:
- Part number ← `itemid`
- Product name ← `NAME`
- Product type / Product classification ← `BRE_ITEMCLASSIFICATION`
- Product group ← `PRODUCTGROUPID`
- Sub product group ← `SUBPRODUCTGROUPID`
- Production line ← `BRE_WRKCTRID`
- Quantity ← `BRE_FULLBOMQTY`
- Exchange rate ← `BRE_EXCHANGERATE`
- Approval status ← root approval flag, falling back to parent approval flag
- Blocking status ← root blocking flag, falling back to parent blocking flag
- Production status ← `parentActive` (1 = Running, 0 = New)
- Record title prefers explicit Part number, then rootBOMId, salesitemid, itemid.

Each imported spreadsheet row is retained as a BOM record/line. The original root/parent/component relationships remain available in the preserved source columns.

### B. Extended FactoryOps template
The extended template uses readable headers and supports:
- BOM reference / Part number
- Product name, Product type
- Product group, Sub product group, Product classification
- Weight and Unit
- Supplier and Product image (image upload is available on manually created/edited BOM records)
- Production line and Validation date
- Approval status (Approved / Not approved)
- Blocking status (Blocked / Not blocked)
- Production status (New / Running)
- Quantity, Master BOM, Validation status
- Exchange rate and Currency

Unknown extra spreadsheet columns are also retained in `details`, so imports are non-destructive.

## Product group master data
The source ERP values `PRODUCTGROUPID` and `SUBPRODUCTGROUPID` are the authoritative classification codes. The sample data includes `STARTERS` with subgroups such as `SP_ST.C.5`, `SP_ST.C.5.1`, and `SP_ST.C.10`. Their business descriptions should be maintained from the user's approved product-group list; the application must not invent official descriptions.

## Governance rules
- ERP flags remain preserved exactly; normalized status fields are supplemental and must not overwrite source flags.
- Root and parent approval/block flags are distinct and remain separately auditable.
- Imported source records are not automatically released to production solely because a root flag is approved; review the source hierarchy and local validation process.
- Weight, supplier, product image, validation date, unit, currency and product type remain optional when absent from the ERP export.
- Product images selected in the form are stored as a data URL in local record details. For large-scale cloud use, move image storage to managed object storage rather than placing large images in database rows.
- Exchange rate values are imported as supplied. A separate currency master/rate-history feature is required before performing reliable currency conversion or costing.

## Validation checklist
1. Import a workbook with the exact 21 ERP headers.
2. Confirm row count equals imported BOM record count.
3. Confirm all 21 original fields remain in the record details and in subsequent exports.
4. Confirm product, product group, subgroup, production line and quantity are mapped.
5. Confirm root/parent approval and blocking flags are not lost.
6. Import an extended-template workbook and confirm readable headers map correctly.
7. Confirm unknown extra columns are retained.
8. Create/edit a BOM manually and verify unit, approval, blocking, production status, validation date and product image persist.
9. Confirm existing Production records and dashboard KPIs remain unchanged.
