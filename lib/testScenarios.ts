import { UsageInputs } from './plans';

export interface TestScenarioForUI {
  name: string;
  description: string;
  isFamily: boolean;
  usage: UsageInputs;
  premiums: { '3300': number; '250': number; '500': number };
  hsaContributions: { '3300': number; '250': number; '500': number };
}

export const testScenarios: TestScenarioForUI[] = [
  // ========== ORIGINAL 6 SCENARIOS (FIXED RANGES) ==========

  // Scenario 1: Healthy Individual - Minimal Care
  {
    name: 'Scenario 1: Healthy Individual - Minimal Care',
    description: 'Young healthy adult with only annual physical and no chronic conditions',
    isFamily: false,
    usage: {
      primaryCareVisits: 1,
      specialistVisits: 0,
      emergencyRoomVisits: 0,
      urgentCareVisits: 0,
      hospitalStays: 0,
      genericDrugsPerMonth: 0,
      preferredBrandDrugsPerMonth: 0,
      nonPreferredBrandDrugsPerMonth: 0,
      specialtyDrugsPerMonth: 0,
      labTestsXrays: 200,
      imagingCTPETMRI: 0,
      mentalHealthTherapySessions: 0,
      outpatientSurgeries: 0,
      physicalTherapySessions: 0,
      familyMembers: 1,
      planningPregnancy: false,
    },
    premiums: { '3300': 50, '250': 150, '500': 100 },
    hsaContributions: { '3300': 500, '250': 0, '500': 0 },
  },

  // Scenario 2: Family with Chronic Conditions
  {
    name: 'Scenario 2: Family with Chronic Conditions',
    description: 'Family of 4 with diabetes, hypertension, regular doctor visits',
    isFamily: true,
    usage: {
      primaryCareVisits: 12,
      specialistVisits: 8,
      emergencyRoomVisits: 1,
      urgentCareVisits: 4,
      hospitalStays: 0,
      genericDrugsPerMonth: 6,
      preferredBrandDrugsPerMonth: 2,
      nonPreferredBrandDrugsPerMonth: 0,
      specialtyDrugsPerMonth: 0,
      labTestsXrays: 1500,
      imagingCTPETMRI: 0,
      mentalHealthTherapySessions: 0,
      outpatientSurgeries: 0,
      physicalTherapySessions: 0,
      familyMembers: 4,
      planningPregnancy: false,
    },
    premiums: { '3300': 200, '250': 500, '500': 350 },
    hsaContributions: { '3300': 1000, '250': 0, '500': 0 },
  },

  // Scenario 3: Individual with Specialty Drugs & Mental Health
  {
    name: 'Scenario 3: Individual with Specialty Drugs & Mental Health',
    description: 'Individual with autoimmune condition requiring specialty meds and weekly therapy',
    isFamily: false,
    usage: {
      primaryCareVisits: 6,
      specialistVisits: 12,
      emergencyRoomVisits: 0,
      urgentCareVisits: 2,
      hospitalStays: 0,
      genericDrugsPerMonth: 2,
      preferredBrandDrugsPerMonth: 1,
      nonPreferredBrandDrugsPerMonth: 0,
      specialtyDrugsPerMonth: 1,
      labTestsXrays: 800,
      imagingCTPETMRI: 2000,
      mentalHealthTherapySessions: 52,
      outpatientSurgeries: 0,
      physicalTherapySessions: 0,
      familyMembers: 1,
      planningPregnancy: false,
    },
    premiums: { '3300': 50, '250': 150, '500': 100 },
    hsaContributions: { '3300': 750, '250': 0, '500': 0 },
  },

  // Scenario 4: Family Planning Pregnancy
  {
    name: 'Scenario 4: Family Planning Pregnancy',
    description: 'Family planning for childbirth with routine prenatal care',
    isFamily: true,
    usage: {
      primaryCareVisits: 8,
      specialistVisits: 15,
      emergencyRoomVisits: 0,
      urgentCareVisits: 2,
      hospitalStays: 1,
      genericDrugsPerMonth: 2,
      preferredBrandDrugsPerMonth: 1,
      nonPreferredBrandDrugsPerMonth: 0,
      specialtyDrugsPerMonth: 0,
      labTestsXrays: 1000,
      imagingCTPETMRI: 500,
      mentalHealthTherapySessions: 0,
      outpatientSurgeries: 0,
      physicalTherapySessions: 0,
      familyMembers: 3,
      planningPregnancy: true,
    },
    premiums: { '3300': 150, '250': 450, '500': 300 },
    hsaContributions: { '3300': 1200, '250': 0, '500': 0 },
  },

  // Scenario 5: High Utilization - OOP Max Test
  {
    name: 'Scenario 5: High Utilization - OOP Max Test',
    description: 'Major surgery with complications - tests OOP maximum calculations',
    isFamily: false,
    usage: {
      primaryCareVisits: 10,
      specialistVisits: 20,
      emergencyRoomVisits: 2,
      urgentCareVisits: 5,
      hospitalStays: 3,
      genericDrugsPerMonth: 4,
      preferredBrandDrugsPerMonth: 3,
      nonPreferredBrandDrugsPerMonth: 2,
      specialtyDrugsPerMonth: 1,
      labTestsXrays: 3000,
      imagingCTPETMRI: 5000,
      mentalHealthTherapySessions: 26,
      outpatientSurgeries: 2,
      physicalTherapySessions: 30,
      familyMembers: 1,
      planningPregnancy: false,
    },
    premiums: { '3300': 50, '250': 150, '500': 100 },
    hsaContributions: { '3300': 1000, '250': 0, '500': 0 },
  },

  // Scenario 6: Zero Usage
  {
    name: 'Scenario 6: Zero Usage (Premium Only)',
    description: 'No healthcare usage - only premiums paid',
    isFamily: false,
    usage: {
      primaryCareVisits: 0,
      specialistVisits: 0,
      emergencyRoomVisits: 0,
      urgentCareVisits: 0,
      hospitalStays: 0,
      genericDrugsPerMonth: 0,
      preferredBrandDrugsPerMonth: 0,
      nonPreferredBrandDrugsPerMonth: 0,
      specialtyDrugsPerMonth: 0,
      labTestsXrays: 0,
      imagingCTPETMRI: 0,
      mentalHealthTherapySessions: 0,
      outpatientSurgeries: 0,
      physicalTherapySessions: 0,
      familyMembers: 1,
      planningPregnancy: false,
    },
    premiums: { '3300': 50, '250': 150, '500': 100 },
    hsaContributions: { '3300': 500, '250': 0, '500': 0 },
  },

  // ========== 20 NEW TEST SCENARIOS ==========

  // Scenario 7: Low-Income Individual with Free/Low Premium
  {
    name: 'Scenario 7: Low-Income Individual - Subsidized Premium',
    description: 'Individual with subsidized/free premium, moderate care needs',
    isFamily: false,
    usage: {
      primaryCareVisits: 3,
      specialistVisits: 2,
      emergencyRoomVisits: 0,
      urgentCareVisits: 1,
      hospitalStays: 0,
      genericDrugsPerMonth: 2,
      preferredBrandDrugsPerMonth: 0,
      nonPreferredBrandDrugsPerMonth: 0,
      specialtyDrugsPerMonth: 0,
      labTestsXrays: 400,
      imagingCTPETMRI: 0,
      mentalHealthTherapySessions: 0,
      outpatientSurgeries: 0,
      physicalTherapySessions: 0,
      familyMembers: 1,
      planningPregnancy: false,
    },
    premiums: { '3300': 0, '250': 0, '500': 0 },
    hsaContributions: { '3300': 0, '250': 0, '500': 0 },
  },

  // Scenario 8: Single Parent Family
  {
    name: 'Scenario 8: Single Parent with 2 Kids',
    description: 'Family of 3, parent works, kids have regular pediatric care',
    isFamily: true,
    usage: {
      primaryCareVisits: 8,      // Parent 2, kids 3 each
      specialistVisits: 2,
      emergencyRoomVisits: 0,
      urgentCareVisits: 3,       // Kids get sick
      hospitalStays: 0,
      genericDrugsPerMonth: 1,
      preferredBrandDrugsPerMonth: 0,
      nonPreferredBrandDrugsPerMonth: 0,
      specialtyDrugsPerMonth: 0,
      labTestsXrays: 600,
      imagingCTPETMRI: 0,
      mentalHealthTherapySessions: 0,
      outpatientSurgeries: 0,
      physicalTherapySessions: 0,
      familyMembers: 3,
      planningPregnancy: false,
    },
    premiums: { '3300': 100, '250': 300, '500': 200 },
    hsaContributions: { '3300': 800, '250': 0, '500': 0 },
  },

  // Scenario 9: Retiree - High Premium, High Usage
  {
    name: 'Scenario 9: Early Retiree (before Medicare)',
    description: 'Individual 62yo, multiple chronic conditions, high premium',
    isFamily: false,
    usage: {
      primaryCareVisits: 8,
      specialistVisits: 15,      // Cardiologist, endocrinologist, etc.
      emergencyRoomVisits: 1,
      urgentCareVisits: 2,
      hospitalStays: 1,
      genericDrugsPerMonth: 5,
      preferredBrandDrugsPerMonth: 2,
      nonPreferredBrandDrugsPerMonth: 1,
      specialtyDrugsPerMonth: 0,
      labTestsXrays: 2000,
      imagingCTPETMRI: 1500,
      mentalHealthTherapySessions: 0,
      outpatientSurgeries: 1,
      physicalTherapySessions: 12,
      familyMembers: 1,
      planningPregnancy: false,
    },
    premiums: { '3300': 200, '250': 450, '500': 325 },
    hsaContributions: { '3300': 0, '250': 0, '500': 0 },
  },

  // Scenario 10: Young Couple - Dual Income No Kids (DINK)
  {
    name: 'Scenario 10: Young Couple - DINK',
    description: 'Healthy couple, minimal care, good employer benefits',
    isFamily: true,
    usage: {
      primaryCareVisits: 2,
      specialistVisits: 1,
      emergencyRoomVisits: 0,
      urgentCareVisits: 0,
      hospitalStays: 0,
      genericDrugsPerMonth: 0,
      preferredBrandDrugsPerMonth: 0,
      nonPreferredBrandDrugsPerMonth: 0,
      specialtyDrugsPerMonth: 0,
      labTestsXrays: 300,
      imagingCTPETMRI: 0,
      mentalHealthTherapySessions: 0,
      outpatientSurgeries: 0,
      physicalTherapySessions: 0,
      familyMembers: 2,
      planningPregnancy: false,
    },
    premiums: { '3300': 75, '250': 200, '500': 140 },
    hsaContributions: { '3300': 1500, '250': 0, '500': 0 },
  },

  // Scenario 11: Cancer Treatment
  {
    name: 'Scenario 11: Individual Undergoing Cancer Treatment',
    description: 'Active cancer treatment - chemotherapy, radiation, oncology visits',
    isFamily: false,
    usage: {
      primaryCareVisits: 4,
      specialistVisits: 24,      // Oncologist bi-weekly
      emergencyRoomVisits: 2,    // Complications
      urgentCareVisits: 3,
      hospitalStays: 2,          // Surgeries/complications
      genericDrugsPerMonth: 3,
      preferredBrandDrugsPerMonth: 2,
      nonPreferredBrandDrugsPerMonth: 1,
      specialtyDrugsPerMonth: 2, // Chemo drugs
      labTestsXrays: 4000,       // Frequent monitoring
      imagingCTPETMRI: 8000,     // CT/PET scans
      mentalHealthTherapySessions: 12,
      outpatientSurgeries: 3,
      physicalTherapySessions: 20,
      familyMembers: 1,
      planningPregnancy: false,
    },
    premiums: { '3300': 75, '250': 175, '500': 125 },
    hsaContributions: { '3300': 2000, '250': 0, '500': 0 },
  },

  // Scenario 12: Athlete with Sports Injuries
  {
    name: 'Scenario 12: Athlete - Multiple Sports Injuries',
    description: 'Young athlete with torn ACL, extensive PT, orthopedic care',
    isFamily: false,
    usage: {
      primaryCareVisits: 3,
      specialistVisits: 8,       // Orthopedist
      emergencyRoomVisits: 1,    // Initial injury
      urgentCareVisits: 2,
      hospitalStays: 1,          // ACL surgery
      genericDrugsPerMonth: 1,   // Pain management
      preferredBrandDrugsPerMonth: 0,
      nonPreferredBrandDrugsPerMonth: 0,
      specialtyDrugsPerMonth: 0,
      labTestsXrays: 800,
      imagingCTPETMRI: 3000,     // MRI for diagnosis
      mentalHealthTherapySessions: 0,
      outpatientSurgeries: 1,    // ACL repair
      physicalTherapySessions: 50, // 6 months PT
      familyMembers: 1,
      planningPregnancy: false,
    },
    premiums: { '3300': 40, '250': 120, '500': 80 },
    hsaContributions: { '3300': 1000, '250': 0, '500': 0 },
  },

  // Scenario 13: Large Family - 2 Parents + 4 Kids
  {
    name: 'Scenario 13: Large Family (6 people)',
    description: 'Family of 6 with average health needs',
    isFamily: true,
    usage: {
      primaryCareVisits: 18,     // 3 per person
      specialistVisits: 6,
      emergencyRoomVisits: 1,
      urgentCareVisits: 8,       // Kids get sick often
      hospitalStays: 0,
      genericDrugsPerMonth: 4,
      preferredBrandDrugsPerMonth: 1,
      nonPreferredBrandDrugsPerMonth: 0,
      specialtyDrugsPerMonth: 0,
      labTestsXrays: 1800,
      imagingCTPETMRI: 500,
      mentalHealthTherapySessions: 0,
      outpatientSurgeries: 0,
      physicalTherapySessions: 0,
      familyMembers: 6,
      planningPregnancy: false,
    },
    premiums: { '3300': 300, '250': 700, '500': 500 },
    hsaContributions: { '3300': 1500, '250': 0, '500': 0 },
  },

  // Scenario 14: Mental Health Focus
  {
    name: 'Scenario 14: Intensive Mental Health Treatment',
    description: 'Individual with severe depression/anxiety, twice-weekly therapy',
    isFamily: false,
    usage: {
      primaryCareVisits: 4,
      specialistVisits: 12,      // Psychiatrist monthly
      emergencyRoomVisits: 0,
      urgentCareVisits: 0,
      hospitalStays: 0,
      genericDrugsPerMonth: 2,   // Antidepressants
      preferredBrandDrugsPerMonth: 1,
      nonPreferredBrandDrugsPerMonth: 0,
      specialtyDrugsPerMonth: 0,
      labTestsXrays: 300,
      imagingCTPETMRI: 0,
      mentalHealthTherapySessions: 100,  // Twice weekly
      outpatientSurgeries: 0,
      physicalTherapySessions: 0,
      familyMembers: 1,
      planningPregnancy: false,
    },
    premiums: { '3300': 55, '250': 155, '500': 105 },
    hsaContributions: { '3300': 800, '250': 0, '500': 0 },
  },

  // Scenario 15: Diabetic Type 1 - Individual
  {
    name: 'Scenario 15: Type 1 Diabetic - Intensive Management',
    description: 'Individual with Type 1 diabetes, insulin pump, CGM',
    isFamily: false,
    usage: {
      primaryCareVisits: 4,
      specialistVisits: 12,      // Endocrinologist quarterly
      emergencyRoomVisits: 1,    // Hypoglycemia episode
      urgentCareVisits: 2,
      hospitalStays: 0,
      genericDrugsPerMonth: 1,
      preferredBrandDrugsPerMonth: 4, // Insulin, test strips
      nonPreferredBrandDrugsPerMonth: 0,
      specialtyDrugsPerMonth: 0,
      labTestsXrays: 1200,       // A1C, labs quarterly
      imagingCTPETMRI: 0,
      mentalHealthTherapySessions: 0,
      outpatientSurgeries: 0,
      physicalTherapySessions: 0,
      familyMembers: 1,
      planningPregnancy: false,
    },
    premiums: { '3300': 60, '250': 160, '500': 110 },
    hsaContributions: { '3300': 900, '250': 0, '500': 0 },
  },

  // Scenario 16: Pregnancy + Existing Kids
  {
    name: 'Scenario 16: Growing Family - Pregnancy with 2 Kids',
    description: 'Family of 4 (soon to be 5), pregnancy plus kids care',
    isFamily: true,
    usage: {
      primaryCareVisits: 12,
      specialistVisits: 18,      // OB/GYN + pediatrician
      emergencyRoomVisits: 0,
      urgentCareVisits: 5,
      hospitalStays: 1,          // Delivery
      genericDrugsPerMonth: 2,
      preferredBrandDrugsPerMonth: 1,
      nonPreferredBrandDrugsPerMonth: 0,
      specialtyDrugsPerMonth: 0,
      labTestsXrays: 1500,
      imagingCTPETMRI: 600,      // Ultrasounds
      mentalHealthTherapySessions: 0,
      outpatientSurgeries: 0,
      physicalTherapySessions: 0,
      familyMembers: 4,
      planningPregnancy: true,
    },
    premiums: { '3300': 180, '250': 520, '500': 360 },
    hsaContributions: { '3300': 1400, '250': 0, '500': 0 },
  },

  // Scenario 17: College Student
  {
    name: 'Scenario 17: College Student on Parent Plan',
    description: 'Healthy college student, minimal care, preventive only',
    isFamily: false,
    usage: {
      primaryCareVisits: 1,
      specialistVisits: 0,
      emergencyRoomVisits: 0,
      urgentCareVisits: 1,       // Flu
      hospitalStays: 0,
      genericDrugsPerMonth: 0,
      preferredBrandDrugsPerMonth: 0,
      nonPreferredBrandDrugsPerMonth: 0,
      specialtyDrugsPerMonth: 0,
      labTestsXrays: 100,
      imagingCTPETMRI: 0,
      mentalHealthTherapySessions: 0,
      outpatientSurgeries: 0,
      physicalTherapySessions: 0,
      familyMembers: 1,
      planningPregnancy: false,
    },
    premiums: { '3300': 35, '250': 100, '500': 70 },
    hsaContributions: { '3300': 300, '250': 0, '500': 0 },
  },

  // Scenario 18: Rheumatoid Arthritis
  {
    name: 'Scenario 18: Rheumatoid Arthritis - Biologic Therapy',
    description: 'Individual with RA on expensive biologic medications',
    isFamily: false,
    usage: {
      primaryCareVisits: 4,
      specialistVisits: 12,      // Rheumatologist
      emergencyRoomVisits: 0,
      urgentCareVisits: 1,
      hospitalStays: 0,
      genericDrugsPerMonth: 2,
      preferredBrandDrugsPerMonth: 1,
      nonPreferredBrandDrugsPerMonth: 0,
      specialtyDrugsPerMonth: 1, // Biologics (Humira, Enbrel)
      labTestsXrays: 1000,
      imagingCTPETMRI: 1000,
      mentalHealthTherapySessions: 12,
      outpatientSurgeries: 0,
      physicalTherapySessions: 24,
      familyMembers: 1,
      planningPregnancy: false,
    },
    premiums: { '3300': 65, '250': 165, '500': 115 },
    hsaContributions: { '3300': 1100, '250': 0, '500': 0 },
  },

  // Scenario 19: Moderate Family Care
  {
    name: 'Scenario 19: Average Family - Moderate Healthcare Use',
    description: 'Family of 4, typical American family healthcare usage',
    isFamily: true,
    usage: {
      primaryCareVisits: 10,
      specialistVisits: 4,
      emergencyRoomVisits: 0,
      urgentCareVisits: 3,
      hospitalStays: 0,
      genericDrugsPerMonth: 3,
      preferredBrandDrugsPerMonth: 1,
      nonPreferredBrandDrugsPerMonth: 0,
      specialtyDrugsPerMonth: 0,
      labTestsXrays: 1000,
      imagingCTPETMRI: 0,
      mentalHealthTherapySessions: 0,
      outpatientSurgeries: 0,
      physicalTherapySessions: 0,
      familyMembers: 4,
      planningPregnancy: false,
    },
    premiums: { '3300': 175, '250': 475, '500': 325 },
    hsaContributions: { '3300': 1000, '250': 0, '500': 0 },
  },

  // Scenario 20: Asthma + Allergies
  {
    name: 'Scenario 20: Individual with Asthma & Severe Allergies',
    description: 'Individual requiring controller meds, allergy specialist',
    isFamily: false,
    usage: {
      primaryCareVisits: 4,
      specialistVisits: 8,       // Allergist, pulmonologist
      emergencyRoomVisits: 1,    // Asthma attack
      urgentCareVisits: 3,
      hospitalStays: 0,
      genericDrugsPerMonth: 1,
      preferredBrandDrugsPerMonth: 3, // Inhalers, allergy meds
      nonPreferredBrandDrugsPerMonth: 0,
      specialtyDrugsPerMonth: 0,
      labTestsXrays: 600,
      imagingCTPETMRI: 0,
      mentalHealthTherapySessions: 0,
      outpatientSurgeries: 0,
      physicalTherapySessions: 0,
      familyMembers: 1,
      planningPregnancy: false,
    },
    premiums: { '3300': 50, '250': 145, '500': 95 },
    hsaContributions: { '3300': 700, '250': 0, '500': 0 },
  },

  // Scenario 21: Elderly Couple
  {
    name: 'Scenario 21: Elderly Couple (Pre-Medicare)',
    description: 'Couple in early 60s, multiple health issues',
    isFamily: true,
    usage: {
      primaryCareVisits: 12,
      specialistVisits: 20,
      emergencyRoomVisits: 2,
      urgentCareVisits: 4,
      hospitalStays: 2,
      genericDrugsPerMonth: 8,
      preferredBrandDrugsPerMonth: 4,
      nonPreferredBrandDrugsPerMonth: 2,
      specialtyDrugsPerMonth: 0,
      labTestsXrays: 3000,
      imagingCTPETMRI: 2500,
      mentalHealthTherapySessions: 0,
      outpatientSurgeries: 2,
      physicalTherapySessions: 30,
      familyMembers: 2,
      planningPregnancy: false,
    },
    premiums: { '3300': 400, '250': 800, '500': 600 },
    hsaContributions: { '3300': 0, '250': 0, '500': 0 },
  },

  // Scenario 22: Preventive Care Only
  {
    name: 'Scenario 22: Preventive Care Focused Individual',
    description: 'Health-conscious individual, only preventive services',
    isFamily: false,
    usage: {
      primaryCareVisits: 2,      // Annual + follow-up
      specialistVisits: 1,       // Dermatologist screening
      emergencyRoomVisits: 0,
      urgentCareVisits: 0,
      hospitalStays: 0,
      genericDrugsPerMonth: 0,
      preferredBrandDrugsPerMonth: 0,
      nonPreferredBrandDrugsPerMonth: 0,
      specialtyDrugsPerMonth: 0,
      labTestsXrays: 250,        // Annual bloodwork
      imagingCTPETMRI: 0,
      mentalHealthTherapySessions: 0,
      outpatientSurgeries: 0,
      physicalTherapySessions: 0,
      familyMembers: 1,
      planningPregnancy: false,
    },
    premiums: { '3300': 45, '250': 135, '500': 90 },
    hsaContributions: { '3300': 600, '250': 0, '500': 0 },
  },

  // Scenario 23: Multiple Surgeries
  {
    name: 'Scenario 23: Multiple Planned Surgeries',
    description: 'Individual with multiple elective/necessary surgeries',
    isFamily: false,
    usage: {
      primaryCareVisits: 6,
      specialistVisits: 15,
      emergencyRoomVisits: 0,
      urgentCareVisits: 2,
      hospitalStays: 2,          // Two surgeries
      genericDrugsPerMonth: 2,
      preferredBrandDrugsPerMonth: 1,
      nonPreferredBrandDrugsPerMonth: 0,
      specialtyDrugsPerMonth: 0,
      labTestsXrays: 1500,
      imagingCTPETMRI: 3000,
      mentalHealthTherapySessions: 0,
      outpatientSurgeries: 3,    // Knee, shoulder, etc.
      physicalTherapySessions: 40,
      familyMembers: 1,
      planningPregnancy: false,
    },
    premiums: { '3300': 70, '250': 170, '500': 120 },
    hsaContributions: { '3300': 1500, '250': 0, '500': 0 },
  },

  // Scenario 24: Employer with Generous HSA
  {
    name: 'Scenario 24: HDHP with Maximum HSA Contribution',
    description: 'Individual with employer contributing max HSA, moderate usage',
    isFamily: false,
    usage: {
      primaryCareVisits: 4,
      specialistVisits: 3,
      emergencyRoomVisits: 0,
      urgentCareVisits: 2,
      hospitalStays: 0,
      genericDrugsPerMonth: 2,
      preferredBrandDrugsPerMonth: 1,
      nonPreferredBrandDrugsPerMonth: 0,
      specialtyDrugsPerMonth: 0,
      labTestsXrays: 800,
      imagingCTPETMRI: 500,
      mentalHealthTherapySessions: 12,
      outpatientSurgeries: 0,
      physicalTherapySessions: 0,
      familyMembers: 1,
      planningPregnancy: false,
    },
    premiums: { '3300': 40, '250': 140, '500': 90 },
    hsaContributions: { '3300': 4150, '250': 0, '500': 0 },  // 2025 IRS max
  },

  // Scenario 25: C-Section Delivery
  {
    name: 'Scenario 25: Pregnancy with C-Section',
    description: 'Family planning C-section delivery (higher maternity costs)',
    isFamily: true,
    usage: {
      primaryCareVisits: 6,
      specialistVisits: 16,      // More OB/GYN visits
      emergencyRoomVisits: 0,
      urgentCareVisits: 1,
      hospitalStays: 1,          // C-section
      genericDrugsPerMonth: 1,
      preferredBrandDrugsPerMonth: 1,
      nonPreferredBrandDrugsPerMonth: 0,
      specialtyDrugsPerMonth: 0,
      labTestsXrays: 1200,
      imagingCTPETMRI: 700,
      mentalHealthTherapySessions: 0,
      outpatientSurgeries: 0,
      physicalTherapySessions: 0,
      familyMembers: 2,
      planningPregnancy: true,
    },
    premiums: { '3300': 120, '250': 380, '500': 250 },
    hsaContributions: { '3300': 1800, '250': 0, '500': 0 },
  },

  // Scenario 26: Bare Minimum Coverage
  {
    name: 'Scenario 26: Catastrophic Coverage Mindset',
    description: 'Individual who never goes to doctor, only wants catastrophic coverage',
    isFamily: false,
    usage: {
      primaryCareVisits: 0,
      specialistVisits: 0,
      emergencyRoomVisits: 0,
      urgentCareVisits: 0,
      hospitalStays: 0,
      genericDrugsPerMonth: 0,
      preferredBrandDrugsPerMonth: 0,
      nonPreferredBrandDrugsPerMonth: 0,
      specialtyDrugsPerMonth: 0,
      labTestsXrays: 0,
      imagingCTPETMRI: 0,
      mentalHealthTherapySessions: 0,
      outpatientSurgeries: 0,
      physicalTherapySessions: 0,
      familyMembers: 1,
      planningPregnancy: false,
    },
    premiums: { '3300': 25, '250': 100, '500': 60 },
    hsaContributions: { '3300': 1000, '250': 0, '500': 0 },
  },
];
