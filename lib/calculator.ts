import { PlanData, UsageInputs } from './plans';

export interface CostBreakdown {
  annualPremiums: number;
  deductible: number;
  copays: number;
  prescriptions: number;
  maternityCosts: number;
  otherCosts: number;
  totalOutOfPocket: number;
  employerHSAContribution: number;
  netCost: number;
}

export function calculatePlanCost(
  plan: PlanData,
  usage: UsageInputs,
  isFamily: boolean,
  monthlyPremium: number,
  employerHSAContribution: number = 0
): CostBreakdown {
  const annualPremiums = monthlyPremium * 12;

  // Calculate copays
  const primaryCareCopays = usage.primaryCareVisits * plan.primaryCareCopay;
  const specialistCopays = usage.specialistVisits * plan.specialistCopay;
  const emergencyCopays = usage.emergencyRoomVisits * plan.emergencyRoomCopay;
  const urgentCareCopays = usage.urgentCareVisits * plan.urgentCareCopay;
  const hospitalCopays = usage.hospitalStays * plan.hospitalCopay;

  // NEW: Additional service copays
  const mentalHealthCopays = usage.mentalHealthTherapySessions * plan.mentalHealthOfficeCopay;
  const outpatientSurgeryCopays = usage.outpatientSurgeries * plan.outpatientSurgeryCopay;
  const physicalTherapyCopays = usage.physicalTherapySessions * 0; // 0% coinsurance after deductible

  const totalCopays = primaryCareCopays + specialistCopays + emergencyCopays + urgentCareCopays +
    hospitalCopays + mentalHealthCopays + outpatientSurgeryCopays + physicalTherapyCopays;

  // Calculate prescription costs (annual)
  const genericDrugCosts = usage.genericDrugsPerMonth * 12 * plan.genericDrugCopay;
  const preferredBrandCosts = usage.preferredBrandDrugsPerMonth * 12 * plan.preferredBrandDrugCopay;
  const nonPreferredBrandCosts = usage.nonPreferredBrandDrugsPerMonth * 12 * plan.nonPreferredBrandDrugCopay;

  // NEW: Specialty drug costs (30% coinsurance, $250 max per month)
  // Assuming average specialty drug cost of $3000/month if not specified
  const avgSpecialtyDrugCost = 3000;
  const specialtyDrugCostPerMonth = Math.min(
    avgSpecialtyDrugCost * plan.specialtyDrugCoinsurance,
    plan.specialtyDrugMaxCopay
  );
  const specialtyDrugCosts = usage.specialtyDrugsPerMonth * 12 * specialtyDrugCostPerMonth;

  const totalPrescriptionCosts = genericDrugCosts + preferredBrandCosts + nonPreferredBrandCosts + specialtyDrugCosts;

  // Other medical costs (labs, imaging)
  const otherMedicalCosts = usage.labTestsXrays + usage.imagingCTPETMRI;

  // NEW: Maternity costs (based on SBC examples)
  // HDHP 3300: ~$3,860, POS 250: ~$320, POS 500: ~$760
  let maternityCosts = 0;
  if (usage.planningPregnancy) {
    if (plan.name === 'HDHP 3300') {
      maternityCosts = 3860;
    } else if (plan.name === 'POS 250') {
      maternityCosts = 320;
    } else if (plan.name === 'POS 500') {
      maternityCosts = 760;
    }
  }

  // Calculate deductible usage
  // Deductible applies to many services (but not copays)
  const deductibleApplicableCosts = otherMedicalCosts;
  const deductibleUsed = isFamily
    ? Math.min(deductibleApplicableCosts, plan.deductibleFamily)
    : Math.min(deductibleApplicableCosts, plan.deductibleIndividual);

  // Total out-of-pocket before OOP max
  const totalBeforeOOPMax = totalCopays + totalPrescriptionCosts + deductibleUsed +
    Math.max(0, otherMedicalCosts - deductibleUsed) + maternityCosts;

  // Apply OOP maximum
  const oopMax = isFamily ? plan.oopMaxFamily : plan.oopMaxIndividual;
  const totalOutOfPocket = Math.min(totalBeforeOOPMax, oopMax);

  // Calculate net cost (including premiums and HSA contribution)
  const netCost = annualPremiums + totalOutOfPocket - employerHSAContribution;

  return {
    annualPremiums,
    deductible: deductibleUsed,
    copays: totalCopays,
    prescriptions: totalPrescriptionCosts,
    maternityCosts,
    otherCosts: Math.max(0, otherMedicalCosts - deductibleUsed),
    totalOutOfPocket,
    employerHSAContribution,
    netCost,
  };
}

export function comparePlans(
  plans: Record<string, PlanData>,
  usage: UsageInputs,
  isFamily: boolean,
  premiums: Record<string, number>,
  hsaContributions: Record<string, number>
): Record<string, CostBreakdown> {
  const results: Record<string, CostBreakdown> = {};

  for (const [key, plan] of Object.entries(plans)) {
    results[key] = calculatePlanCost(
      plan,
      usage,
      isFamily,
      premiums[key] || 0,
      hsaContributions[key] || 0
    );
  }

  return results;
}
