"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultUsageInputs = exports.plans = void 0;
exports.plans = {
    '3300': {
        name: 'HDHP 3300',
        deductibleIndividual: 3300,
        deductibleFamily: 6600,
        oopMaxIndividual: 5500,
        oopMaxFamily: 11000,
        primaryCareCopay: 30,
        specialistCopay: 60,
        emergencyRoomCopay: 350,
        urgentCareCopay: 85,
        hospitalCopay: 500,
        genericDrugCopay: 10,
        preferredBrandDrugCopay: 45,
        nonPreferredBrandDrugCopay: 70,
        mentalHealthOfficeCopay: 60,
        outpatientSurgeryCopay: 300,
        specialtyDrugCoinsurance: 0.30,
        specialtyDrugMaxCopay: 250,
        monthlyPremiumIndividual: 0, // User adjustable
        monthlyPremiumFamily: 0, // User adjustable
        employerHSAContribution: 0, // User adjustable, default mentioned for 3300 plan
    },
    '250': {
        name: 'POS 250',
        deductibleIndividual: 250,
        deductibleFamily: 500,
        oopMaxIndividual: 1750,
        oopMaxFamily: 3500,
        primaryCareCopay: 15,
        specialistCopay: 40,
        emergencyRoomCopay: 300,
        urgentCareCopay: 75,
        hospitalCopay: 0, // 0% coinsurance
        genericDrugCopay: 10,
        preferredBrandDrugCopay: 45,
        nonPreferredBrandDrugCopay: 70,
        mentalHealthOfficeCopay: 40,
        outpatientSurgeryCopay: 0, // 0% coinsurance after deductible
        specialtyDrugCoinsurance: 0.30,
        specialtyDrugMaxCopay: 250,
        monthlyPremiumIndividual: 0, // User adjustable
        monthlyPremiumFamily: 0, // User adjustable
    },
    '500': {
        name: 'POS 500',
        deductibleIndividual: 500,
        deductibleFamily: 1000,
        oopMaxIndividual: 4000,
        oopMaxFamily: 8000,
        primaryCareCopay: 15,
        specialistCopay: 50,
        emergencyRoomCopay: 350,
        urgentCareCopay: 50,
        hospitalCopay: 0, // 0% coinsurance
        genericDrugCopay: 10,
        preferredBrandDrugCopay: 45,
        nonPreferredBrandDrugCopay: 70,
        mentalHealthOfficeCopay: 50,
        outpatientSurgeryCopay: 0, // 0% coinsurance after deductible
        specialtyDrugCoinsurance: 0.30,
        specialtyDrugMaxCopay: 250,
        monthlyPremiumIndividual: 0, // User adjustable
        monthlyPremiumFamily: 0, // User adjustable
    },
};
exports.defaultUsageInputs = {
    primaryCareVisits: 4,
    specialistVisits: 2,
    emergencyRoomVisits: 0,
    urgentCareVisits: 1,
    hospitalStays: 0,
    genericDrugsPerMonth: 2,
    preferredBrandDrugsPerMonth: 0,
    nonPreferredBrandDrugsPerMonth: 0,
    specialtyDrugsPerMonth: 0,
    labTestsXrays: 500,
    imagingCTPETMRI: 0,
    mentalHealthTherapySessions: 0,
    outpatientSurgeries: 0,
    physicalTherapySessions: 0,
    familyMembers: 4,
    planningPregnancy: false,
};
