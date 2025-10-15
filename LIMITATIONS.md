# Calculator Limitations and Missing Coverage Scenarios

This document outlines what the calculator **does NOT currently handle** and scenarios you should consider separately when choosing your health insurance plan.

## ⚠️ Major Limitations

### 1. Out-of-Network Care
**Status**: NOT CALCULATED

The calculator only estimates **in-network** costs. All plans have:
- 50% coinsurance for out-of-network care
- Higher deductibles (2-4x in-network amounts)
- Higher out-of-pocket maximums
- Potential balance billing from providers

**Impact**: If you regularly see out-of-network providers, your actual costs will be significantly higher than shown.

---

### 2. Specialty Medications
**Status**: NOT CALCULATED

Specialty drugs have unique cost structures:
- **30% coinsurance** (not a flat copay)
- $250 maximum per 30-day supply
- Must be filled through Aetna Specialty Pharmacy Network
- Often used for complex conditions (cancer, MS, rheumatoid arthritis, etc.)

**Impact**: If you take specialty medications, add these costs manually:
- Calculate: (Drug cost × 30%), capped at $250 per month
- Example: $5,000 specialty drug = $250/month (hits the cap)

---

### 3. Maternity/Pregnancy Care
**Status**: PARTIALLY CALCULATED

The calculator includes:
- ✅ Prenatal office visits (as specialist visits)
- ✅ Hospital stays (delivery)

The calculator does NOT include:
- ❌ Specific maternity copay structures
- ❌ Professional delivery fees (OB/GYN)
- ❌ Facility delivery fees
- ❌ Ultrasounds and prenatal testing
- ❌ Anesthesia (epidural)

**Impact**: Pregnancy/childbirth typically costs:
- HDHP 3300: ~$3,800-$5,500 out-of-pocket
- POS 250: ~$320-$1,750
- POS 500: ~$760-$4,000

Reference the SBC "Peg is Having a Baby" example for each plan.

---

### 4. Mental Health & Behavioral Services
**Status**: NOT CALCULATED

Each plan has specific coverage:
- Outpatient therapy: $40-$60 copay/visit (varies by plan)
- Inpatient psychiatric care: $500 copay or 0% coinsurance after deductible

**Impact**: If you or family members receive regular therapy:
- Add weekly therapy: 52 visits × copay per year
- Example: $60 × 52 = $3,120/year

---

### 5. Outpatient Surgery
**Status**: NOT CALCULATED

Outpatient surgical procedures (ambulatory surgery center) have:
- HDHP 3300: $300 facility copay
- POS 250 & 500: 0% coinsurance after deductible

**Impact**: Each outpatient surgery could cost $300-$1,000+ depending on plan and procedure complexity.

---

### 6. Physical Therapy & Rehabilitation
**Status**: NOT CALCULATED

After deductible is met:
- 0% coinsurance in-network (fully covered)
- May require multiple visits per week for injuries

**Impact**: Usually minimal after deductible, but could add $0-$500 depending on when services occur in the year.

---

### 7. Durable Medical Equipment (DME)
**Status**: NOT CALCULATED

Items like:
- Wheelchairs, walkers
- CPAP machines
- Prosthetics
- Diabetic supplies (beyond glucose meters)

Coverage: 50% coinsurance after deductible (all plans)

**Impact**: Can be expensive. A CPAP machine costs ~$800, so you'd pay ~$400 out-of-pocket.

---

### 8. Home Health Care
**Status**: NOT CALCULATED

In-network coverage: 0% coinsurance after deductible
Out-of-network: Limited to 120 visits/year

**Impact**: Typically used post-surgery or for chronic conditions. Usually minimal cost after deductible.

---

### 9. Skilled Nursing Facility
**Status**: NOT CALCULATED

Coverage:
- HDHP 3300: $500 copay per stay
- POS 250 & 500: 0% coinsurance after deductible
- Limited to 60 days per calendar year

**Impact**: Each stay could cost $500-$1,000+ depending on plan.

---

### 10. Imaging Costs (Simplified)
**Status**: SIMPLIFIED ESTIMATE

The calculator asks for an imaging cost estimate, but:
- Actual imaging costs vary widely ($500-$3,000+ per scan)
- Different coinsurance may apply
- May need pre-authorization

**Impact**: Use conservative estimates. A single MRI can cost $1,000-$3,000.

---

### 11. Lab Tests & Diagnostic Work (Simplified)
**Status**: SIMPLIFIED ESTIMATE

The calculator uses a flat estimate, but:
- HDHP 3300: Some diagnostic tests may have specific copays
- POS 250: $15 lab copay, $50 x-ray copay (don't apply to deductible)
- POS 500: $15 lab copay, $50 x-ray copay (don't apply to deductible)
- Actual lab costs vary significantly

**Impact**: Routine labs are relatively inexpensive, but genetic testing or specialized labs can cost thousands.

---

### 12. Deductible Application Complexity
**Status**: OVERSIMPLIFIED

The calculator applies deductible to "other medical costs," but in reality:
- **Some copays don't count toward deductible** (POS plans: PCP, specialist, drugs)
- **Some services are covered before deductible** (preventive care)
- **Tracking when deductible is met affects subsequent costs**

**Impact**: The order in which you receive care throughout the year affects costs. The calculator provides an annual estimate but doesn't model month-by-month scenarios.

---

### 13. Out-of-Pocket Maximum Tracking
**Status**: SIMPLIFIED

The calculator caps costs at the OOP max, but in reality:
- Not all expenses count toward OOP max (premiums, balance billing, etc.)
- Family members may need to meet individual OOP maxes first
- Deductible is included in OOP max

**Impact**: Generally accurate for high utilization, but may not reflect mid-year scenarios.

---

### 14. Preventive vs. Diagnostic Services
**Status**: NOT DISTINGUISHED

Key difference:
- **Preventive**: Annual physical, immunizations, cancer screenings → **$0 cost**
- **Diagnostic**: Same test when investigating symptoms → **Costs apply**

Example: Colonoscopy
- Routine screening at age 50: $0 (preventive)
- Colonoscopy due to symptoms: Subject to deductible/copay (diagnostic)

**Impact**: Make sure you understand whether your services are coded as preventive or diagnostic.

---

### 15. Pre-Authorization Requirements
**Status**: NOT TRACKED

Many services require pre-authorization:
- Hospital stays
- Imaging (MRI, CT, PET scans)
- Some specialty medications
- Failure to obtain pre-authorization: **$400 penalty** (out-of-network)

**Impact**: Always check if pre-authorization is needed to avoid penalties.

---

## 📊 How to Account for Missing Scenarios

### If You Need Specialty Medications:
1. Identify your specialty drugs
2. Calculate: Monthly cost = min((Drug price × 30%), $250)
3. Add to your annual total: Monthly cost × 12

### If You're Planning Pregnancy:
- Review the "Peg is Having a Baby" example in each plan's SBC (page 6)
- Add the example costs to your calculator results

### If You Need Regular Therapy:
- Weekly therapy: 52 sessions × copay ($40-$60)
- Bi-weekly: 26 sessions × copay
- Add to your annual total

### If You Have Planned Surgeries:
- Outpatient: Add $300-$1,000 per procedure
- Inpatient: Already factored in via hospital stays

### If You Use Out-of-Network Providers:
- This calculator won't help much
- Expect to pay significantly more
- Consider choosing POS 250 or 500 for lower deductibles

---

## ✅ What the Calculator DOES Handle Well

- ✅ Doctor visits (primary care and specialists)
- ✅ Emergency room and urgent care
- ✅ Hospital stays (inpatient)
- ✅ Generic and brand name prescriptions
- ✅ Basic lab and imaging estimates
- ✅ Deductibles and out-of-pocket maximums
- ✅ Annual premiums
- ✅ Employer HSA contributions

---

## 🎯 Recommendation

This calculator is best for:
- **Healthy individuals/families with routine care needs**
- **Comparing plans when you have typical healthcare usage**
- **Getting a baseline estimate to inform your decision**

This calculator is NOT sufficient for:
- **Complex medical conditions requiring specialty care**
- **Pregnancy/maternity planning**
- **Regular mental health therapy**
- **Out-of-network providers**
- **Specialty medications**

For these scenarios, request a **personalized benefits consultation** with your HR department or use your employer's benefits modeling tools.

---

## 📞 Always Verify

- Review the official Summary of Benefits and Coverage (SBC) documents
- Check with your benefits administrator
- Call Aetna directly: 1-800-704-7287
- Review the full plan documents at your employer's benefits portal

**The PDFs in this directory contain complete details.** This calculator is a starting point, not a complete analysis.
