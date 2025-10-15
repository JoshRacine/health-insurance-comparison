# Quick Setup Guide

## Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```
   This will install Next.js, React, TypeScript, and Tailwind CSS.

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   The app will be available at http://localhost:3000

3. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## Deploying to Vercel

### Option 1: Via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your Git repository
4. Vercel will auto-detect Next.js settings
5. Click "Deploy"

Your app will be live in minutes!

### Option 2: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Follow the prompts to complete deployment.

## Configuration

### Setting Default Values

Edit `lib/plans.ts` to modify:
- Default healthcare usage patterns
- Plan premium defaults
- HSA contribution amounts

### Adjusting Calculations

Edit `lib/calculator.ts` to modify the cost calculation logic.

## Tips for Your Employer's Plans

1. Get the monthly premiums for each plan from your HR/benefits portal
2. Find out the employer HSA contribution amount (if applicable for HDHP)
3. Review your family's healthcare usage from the past year:
   - Count doctor visits
   - List prescriptions and their tier
   - Note any hospital stays or major procedures
4. Enter these values in the app to get accurate cost comparisons

## Customizing for Different Plans

To add more plans or modify existing ones:

1. Edit `lib/plans.ts`
2. Add new plan data to the `plans` object
3. The UI will automatically include the new plan

Example:
```typescript
'newplan': {
  name: 'New Plan Name',
  deductibleIndividual: 1000,
  deductibleFamily: 2000,
  // ... other fields
}
```

## Troubleshooting

**Issue**: Page won't load
- Make sure dependencies are installed: `npm install`
- Check that port 3000 is available
- Try: `rm -rf .next && npm run dev`

**Issue**: Styles not showing
- Ensure Tailwind is configured in `tailwind.config.js`
- Check `app/globals.css` includes Tailwind directives

**Issue**: Build fails
- Run `npm run build` to see specific errors
- Check TypeScript types in `lib/` files

## Support

For questions or issues, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
