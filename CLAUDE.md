# CLAUDE.md - Development Session Notes

## Project Overview
Health Insurance Cost Comparison web application for comparing 3 Aetna plans:
- HDHP 3300
- POS 250
- POS 500

Built with Next.js 14, TypeScript, and Tailwind CSS. 100% client-side, no backend.

---

## Recent Session Progress

### 1. Tooltip Implementation ✅
**Added comprehensive hover tooltips to ALL input fields**

- Created reusable `components/Tooltip.tsx` component
- Added tooltips explaining what to enter in each field
- Included examples (e.g., "lisinopril, metformin" for generic drugs)
- Added calculation details to help users understand costs

**Key locations:**
- All usage input fields in `app/page.tsx`
- Doctor visits, prescriptions, therapy sessions, etc.
- Each tooltip shows service type, copay amounts, and examples

### 2. Family vs Individual Clarity ✅
**Resolved confusion about per-person vs family totals**

- Added prominent blue info box on Family tab: "💡 All usage values are for your entire family combined. Add up visits/prescriptions for all family members."
- Info box only shows on Family tab (not on Individual tab)
- Changed section headers to be clearer: "Annual Total", "Monthly Total"
- Updated tooltip text to reference family vs individual context

### 3. PDF Download Links ✅
**Added official plan document downloads**

- Copied PDFs to `public/` folder:
  - `Atena 3300.pdf`
  - `Atena 250.pdf`
  - `Atena 500.pdf`
- Added download links at top of page below title
- Links use `download` attribute for direct downloads

### 4. Cost Breakdown Tooltips ✅
**Added detailed calculation tooltips to results section**

Each cost breakdown line now has a tooltip showing the actual calculation:

- **Annual Premiums**: Shows monthly × 12 calculation
- **Deductible Used**: Explains deductible limit and what applies
- **Copays**: Shows detailed breakdown: "Primary care (X × $Y) + Specialist (X × $Y) + ER..." with actual user numbers
- **Prescriptions**: Shows breakdown by drug type with user quantities
- **Other Medical Costs**: Explains lab/imaging and mentions maternity if applicable
- **Total OOP**: Explains sum and OOP max cap

**Key feature:** Tooltips use the actual user input values, so calculations are transparent.

---

## Test Scenarios Created

### Test File: `test-scenarios.ts`
Comprehensive QA test scenarios validating calculations against plan documents.

**6 Test Scenarios:**

1. **Healthy Individual - Minimal Care**
   - 1 primary care visit, minimal costs
   - Tests low utilization scenario
   - Expected: HDHP 3300 cheapest with HSA benefit

2. **Family with Chronic Conditions**
   - Family of 4 with diabetes, hypertension
   - 12 primary care visits, 8 specialist visits
   - 6 generic drugs/month, quarterly labs
   - Tests moderate-high utilization

3. **Individual with Specialty Drugs & Mental Health**
   - Autoimmune condition requiring specialty meds
   - 1 specialty drug/month ($250 cap = $3000/year)
   - 52 mental health therapy sessions (weekly)
   - Tests high-cost medications and therapy

4. **Family Planning Pregnancy**
   - Family planning childbirth
   - Uses `planningPregnancy: true` checkbox
   - Tests SBC maternity cost estimates:
     - HDHP 3300: $3,860
     - POS 250: $320
     - POS 500: $760

5. **High Utilization - OOP Max Test**
   - Major surgery with complications
   - 3 hospital stays, multiple ER visits
   - Should hit out-of-pocket maximums:
     - HDHP 3300: $5,500 individual
     - POS 250: $1,750 individual
     - POS 500: $4,000 individual

6. **Zero Usage (Premium Only)**
   - No healthcare usage at all
   - Only premiums paid (minus HSA for 3300)
   - Validates baseline costs

**Test Features:**
- Validates calculations against expected ranges
- Checks OOP max is never exceeded
- Displays detailed breakdown of all costs
- Shows pass/fail for each plan in each scenario

**How to Run Tests:**
```bash
npm install  # Install tsx dependency
npx tsx test-scenarios.ts
```

Or add to package.json scripts:
```json
"scripts": {
  "test": "tsx test-scenarios.ts"
}
```

---

## Known Issues

### npm Install Hanging
- `npm install tsx --save-dev` is hanging/timing out in WSL2 environment
- tsx has been added to package.json devDependencies
- **Workaround needed:** User will install manually
- Once installed, tests can be run with `npx tsx test-scenarios.ts`

---

## Architecture Overview

### Key Files

**Data Layer:**
- `lib/plans.ts` - Plan data structures, interfaces, default values
- `lib/calculator.ts` - Cost calculation engine

**UI Layer:**
- `app/page.tsx` - Main application component with tabs, inputs, results
- `components/Tooltip.tsx` - Reusable hover tooltip component

**Public Assets:**
- `public/Atena 3300.pdf`
- `public/Atena 250.pdf`
- `public/Atena 500.pdf`

**Documentation:**
- `README.md` - Main project documentation
- `SETUP.md` - Quick start guide
- `LIMITATIONS.md` - What's NOT covered by calculator
- `CLAUDE.md` - This file (session notes)

**Testing:**
- `test-scenarios.ts` - QA test scenarios

### Plan Data Structure (`lib/plans.ts`)

```typescript
export interface PlanData {
  name: string;
  deductibleIndividual: number;
  deductibleFamily: number;
  oopMaxIndividual: number;
  oopMaxFamily: number;
  primaryCareCopay: number;
  specialistCopay: number;
  emergencyRoomCopay: number;
  urgentCareCopay: number;
  hospitalCopay: number;
  genericDrugCopay: number;
  preferredBrandDrugCopay: number;
  nonPreferredBrandDrugCopay: number;
  mentalHealthOfficeCopay: number;
  outpatientSurgeryCopay: number;
  specialtyDrugCoinsurance: number;
  specialtyDrugMaxCopay: number;
}

export interface UsageInputs {
  primaryCareVisits: number;
  specialistVisits: number;
  emergencyRoomVisits: number;
  urgentCareVisits: number;
  hospitalStays: number;
  genericDrugsPerMonth: number;
  preferredBrandDrugsPerMonth: number;
  nonPreferredBrandDrugsPerMonth: number;
  specialtyDrugsPerMonth: number;
  labTestsXrays: number;
  imagingCTPETMRI: number;
  mentalHealthTherapySessions: number;
  outpatientSurgeries: number;
  physicalTherapySessions: number;
  familyMembers: number;
  planningPregnancy: boolean;
}
```

### Calculation Logic (`lib/calculator.ts`)

**Main function:** `calculatePlanCost(plan, usage, isFamily, monthlyPremium, employerHSA)`

**Returns:**
```typescript
interface CostBreakdown {
  annualPremiums: number;
  deductible: number;
  copays: number;
  prescriptions: number;
  otherCosts: number;
  totalOutOfPocket: number;
  employerHSAContribution: number;
  netCost: number;
}
```

**Key calculations:**
1. **Premiums:** Monthly premium × 12
2. **Copays:** Sum of all visit copays (doctor, ER, hospital, therapy, surgery)
3. **Prescriptions:** Drug copays × quantity × 12 months
   - Specialty drugs: 30% coinsurance with $250/month cap
4. **Other costs:** Lab/imaging costs after deductible
5. **Maternity:** SBC-based estimates if `planningPregnancy: true`
6. **OOP enforcement:** Total OOP capped at plan's out-of-pocket maximum
7. **Net cost:** Premiums + Total OOP - HSA contribution

---

## What's Covered vs Not Covered

### ✅ Currently Covered
- Primary care and specialist visits
- Emergency room and urgent care
- Hospital stays
- Generic, preferred, and non-preferred brand drugs
- Specialty medications (30% coinsurance, $250 cap)
- Mental health therapy sessions
- Outpatient surgery facility fees
- Physical therapy sessions
- Lab tests and X-rays
- Advanced imaging (CT/PET/MRI)
- Maternity/pregnancy (SBC estimates)
- Deductibles and out-of-pocket maximums
- Employer HSA contributions

### ❌ NOT Covered (see LIMITATIONS.md)
- Out-of-network care (50% coinsurance)
- Durable medical equipment (DME)
- Home health care
- Skilled nursing facilities
- Pre-authorization penalties ($400)
- Vision and dental
- Chiropractic care
- Acupuncture
- And more...

---

## User Experience Features

### Disclaimers
1. **Yellow Warning Box** - Reminds users this is estimation only, verify with official docs
2. **Blue Privacy Box** - Explains 100% client-side, no data storage

### Tooltips
- Hover over blue ⓘ icons
- Appear on ALL input fields
- Appear on ALL cost breakdown lines
- Show calculations with actual user numbers
- Include examples and guidance

### Clarity Improvements
- Family tab: Blue info box explaining "add up all family members"
- Section headers: "Annual Total", "Monthly Total"
- Placeholder text: "e.g. 500" for lab costs
- Conditional display: Info box only on Family tab

### Comparison Features
- Side-by-side plan cards
- Color-coded results
- Summary table sorted by total cost
- "LOWEST" badge on best plan
- Green highlight on cheapest option

---

## Next Steps / TODO

### Immediate (In Progress)
- [ ] Get tsx installed to run test scenarios
- [ ] Execute all 6 test scenarios
- [ ] Validate calculations match plan documents
- [ ] Fix any calculation errors found in testing

### Potential Future Enhancements
- Add more coverage scenarios from LIMITATIONS.md
- Create visual charts/graphs for cost comparison
- Add "save/load scenario" functionality (localStorage)
- Mobile responsiveness improvements
- Print-friendly view
- HSA contribution calculator
- Tax savings calculator for HDHP

---

## Development Commands

```bash
# Install dependencies
npm install

# Run dev server
npm run dev
# → http://localhost:3000 (or :3001 if 3000 in use)

# Build for production
npm run build

# Start production server
npm start

# Run tests (once tsx is installed)
npx tsx test-scenarios.ts
```

---

## Deployment

**Ready for Vercel deployment:**
- All configuration files in place
- No backend/API required
- Static assets in `public/`
- Environment: Node.js 18+

**Deploy command:**
```bash
vercel deploy
```

---

## Notes for Future Sessions

### Calculation Validation Needed
The test scenarios are written but not yet executed due to tsx installation issues. Priority is to:
1. Get tsx installed and working
2. Run all 6 test scenarios
3. Check if calculations match expected ranges
4. Verify OOP max enforcement is correct
5. Validate maternity cost additions

### Edge Cases to Test
- What happens when deductible = 0 usage?
- What if user enters negative numbers?
- What if family members = 0?
- Extremely high costs (should cap at OOP max)

### UX Polish Ideas
- Loading states (not needed for client-side but nice for large inputs)
- Input validation with error messages
- "Reset to defaults" button
- Keyboard shortcuts
- Dark mode toggle

---

## Contact / Issues

For bugs or questions, user can reference:
- This file (CLAUDE.md) for session context
- README.md for general documentation
- LIMITATIONS.md for coverage gaps
- SETUP.md for getting started

---

*Last updated: 2025-10-15*
*Session: Tooltip implementation + QA test creation*
