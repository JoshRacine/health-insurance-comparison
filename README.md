# Health Insurance Cost Comparison Tool

A comprehensive web application for comparing Aetna health insurance plans (HDHP 3300, POS 250, and POS 500) based on your expected healthcare usage.

## Features

- **Family vs Individual Plans**: Separate tabs for family and individual plan calculations
- **Fully Adjustable Inputs**: Customize all healthcare usage parameters including:
  - Doctor visits (primary care and specialists)
  - Emergency room and urgent care visits
  - Hospital stays
  - Prescription medications (generic, preferred brand, non-preferred brand)
  - Lab tests and imaging costs
  - Family size (for family plans)
- **Premium Configuration**: Set monthly premiums for each plan
- **HSA Support**: Include employer HSA contributions (for HDHP 3300)
- **Real-time Calculations**: See cost breakdowns and comparisons instantly
- **Smart Defaults**: Pre-configured with average family healthcare usage

## Plan Details

### HDHP 3300
- Deductible: $3,300 individual / $6,600 family
- Out-of-Pocket Max: $5,500 individual / $11,000 family
- Eligible for HSA contributions

### POS 250
- Deductible: $250 individual / $500 family
- Out-of-Pocket Max: $1,750 individual / $3,500 family
- Lower deductible with moderate premiums

### POS 500
- Deductible: $500 individual / $1,000 family
- Out-of-Pocket Max: $4,000 individual / $8,000 family
- Balance between deductible and OOP max

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment to Vercel

This app is optimized for Vercel deployment:

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import the project in Vercel
3. Vercel will automatically detect Next.js and configure the build settings
4. Click "Deploy"

Alternatively, use the Vercel CLI:

```bash
npm install -g vercel
vercel
```

## Usage

1. **Select Plan Type**: Choose between Family or Individual plans using the tabs
2. **Configure Healthcare Usage**: Adjust the inputs on the left panel based on your expected healthcare needs
3. **Set Premiums**: Enter the monthly premium for each plan (from your employer)
4. **Add HSA Contribution**: For HDHP 3300, enter any employer HSA contribution
5. **Compare Results**: Review the cost breakdown for each plan and the comparison table at the bottom

The app will automatically:
- Calculate annual costs including premiums and out-of-pocket expenses
- Apply deductibles and out-of-pocket maximums
- Factor in copays for all services
- Subtract HSA contributions from total costs
- Highlight the lowest-cost option

## Technology Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe code
- **Tailwind CSS**: Utility-first styling
- **React Hooks**: State management

## Cost Calculation Logic

The calculator considers:
1. **Annual Premiums**: Monthly premium × 12
2. **Deductible**: Applied to eligible medical costs
3. **Copays**: Fixed costs for visits and services
4. **Prescriptions**: Medication copays × frequency
5. **Out-of-Pocket Maximum**: Cap on annual medical expenses
6. **HSA Contributions**: Employer contributions reduce net cost

## Customization

To modify default values, edit:
- `lib/plans.ts`: Plan details and default usage inputs
- `lib/calculator.ts`: Cost calculation logic
- `app/page.tsx`: UI and component layout

## License

This project is for personal use. Consult official plan documents for accurate coverage details.

## Disclaimer

This tool provides cost estimates based on the inputs provided. Actual costs may vary based on:
- Specific services received
- Provider charges
- Network status
- Plan changes
- Benefit coverage details

Always refer to your official plan documents and Summary of Benefits and Coverage (SBC) for complete information.

## Important Limitations

This calculator **does NOT include**:
- ❌ Out-of-network care (50% coinsurance, higher deductibles)
- ❌ Specialty medications (30% coinsurance, $250 max per month)
- ❌ Maternity/pregnancy care
- ❌ Mental health therapy sessions
- ❌ Outpatient surgery facility fees
- ❌ Physical therapy/rehabilitation services
- ❌ Durable medical equipment (50% coinsurance)
- ❌ Home health care or skilled nursing
- ❌ Pre-authorization penalties ($400 if not obtained)

**See [LIMITATIONS.md](./LIMITATIONS.md) for complete details on what's not covered and how to account for these scenarios.**

This calculator is best suited for healthy individuals/families with routine healthcare needs. For complex medical situations, pregnancy planning, specialty medications, or regular therapy, please consult with your HR benefits administrator for personalized guidance.
