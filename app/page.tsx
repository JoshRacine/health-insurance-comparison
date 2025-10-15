'use client';

import { useState } from 'react';
import { plans, defaultUsageInputs, UsageInputs } from '@/lib/plans';
import { calculatePlanCost, CostBreakdown } from '@/lib/calculator';
import Tooltip from '@/components/Tooltip';
import { testScenarios } from '@/lib/testScenarios';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'family' | 'individual'>('family');
  const [usage, setUsage] = useState<UsageInputs>(defaultUsageInputs);
  const [expandedBreakdowns, setExpandedBreakdowns] = useState<Record<string, Record<string, boolean>>>({});

  // Premiums (monthly) for each plan
  const [premiums, setPremiums] = useState({
    '3300': 0,
    '250': 0,
    '500': 0,
  });

  // HSA Contributions (annual) for each plan
  const [hsaContributions, setHSAContributions] = useState({
    '3300': 0,
    '250': 0,
    '500': 0,
  });

  const isFamily = activeTab === 'family';

  // Calculate costs for all plans
  const planResults: Record<string, CostBreakdown> = {};
  for (const [key, plan] of Object.entries(plans)) {
    planResults[key] = calculatePlanCost(
      plan,
      usage,
      isFamily,
      premiums[key as keyof typeof premiums],
      hsaContributions[key as keyof typeof hsaContributions]
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const updateUsage = (field: keyof UsageInputs, value: number) => {
    setUsage({ ...usage, [field]: value });
  };

  const updatePremium = (planKey: string, value: number) => {
    setPremiums({ ...premiums, [planKey]: value });
  };

  const updateHSA = (planKey: string, value: number) => {
    setHSAContributions({ ...hsaContributions, [planKey]: value });
  };

  const toggleBreakdown = (planKey: string, field: string) => {
    setExpandedBreakdowns(prev => ({
      ...prev,
      [planKey]: {
        ...(prev[planKey] || {}),
        [field]: !(prev[planKey]?.[field] || false)
      }
    }));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto w-full">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2 text-gray-800 px-2">
          Health Insurance Cost Comparison
        </h1>
        <p className="text-center text-gray-600 mb-2 text-sm sm:text-base px-2">
          Aetna Plans: HDHP 3300 vs POS 250 vs POS 500
        </p>
        <div className="text-center mb-6 sm:mb-8 px-2">
          <p className="text-xs sm:text-sm text-gray-600 mb-2">Download Official Plan Documents:</p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <a href="/Atena 3300.pdf" download className="text-blue-600 hover:text-blue-800 underline text-sm">
              HDHP 3300 PDF
            </a>
            <a href="/Atena 250.pdf" download className="text-blue-600 hover:text-blue-800 underline text-sm">
              POS 250 PDF
            </a>
            <a href="/Atena 500.pdf" download className="text-blue-600 hover:text-blue-800 underline text-sm">
              POS 500 PDF
            </a>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-6 sm:mb-8 px-2">
          <div className="bg-white rounded-lg shadow-md p-1 inline-flex w-full sm:w-auto max-w-md">
            <button
              onClick={() => setActiveTab('family')}
              className={`flex-1 sm:flex-initial px-4 sm:px-6 py-2 sm:py-3 rounded-md font-semibold transition-all text-sm sm:text-base ${
                activeTab === 'family'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Family Plan
            </button>
            <button
              onClick={() => setActiveTab('individual')}
              className={`flex-1 sm:flex-initial px-4 sm:px-6 py-2 sm:py-3 rounded-md font-semibold transition-all text-sm sm:text-base ${
                activeTab === 'individual'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Individual Plan
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Input Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:sticky lg:top-4">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">Usage Inputs</h2>

              {/* Premiums and HSA Contributions */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-700 mb-3">Plan Costs</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-xs font-medium text-gray-500 flex items-center">Plan</div>
                    <div className="text-xs font-medium text-gray-500 text-center">Monthly Premium</div>
                    <div className="text-xs font-medium text-gray-500 text-center">HSA Employer Contrib (Annual)</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 items-center">
                    <div className="text-sm font-medium text-gray-700">POS 250</div>
                    <input
                      type="number"
                      min="0"
                      step="10"
                      value={premiums['250']}
                      onChange={(e) => updatePremium('250', parseInt(e.target.value) || 0)}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      placeholder="$0"
                    />
                    <div className="text-xs text-center text-gray-400">N/A</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 items-center">
                    <div className="text-sm font-medium text-gray-700">POS 500</div>
                    <input
                      type="number"
                      min="0"
                      step="10"
                      value={premiums['500']}
                      onChange={(e) => updatePremium('500', parseInt(e.target.value) || 0)}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      placeholder="$0"
                    />
                    <div className="text-xs text-center text-gray-400">N/A</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 items-center">
                    <div className="text-sm font-medium text-gray-700">HDHP 3300</div>
                    <input
                      type="number"
                      min="0"
                      step="10"
                      value={premiums['3300']}
                      onChange={(e) => updatePremium('3300', parseInt(e.target.value) || 0)}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      placeholder="$0"
                    />
                    <input
                      type="number"
                      min="0"
                      step="100"
                      value={hsaContributions['3300']}
                      onChange={(e) => updateHSA('3300', parseInt(e.target.value) || 0)}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      placeholder="$0"
                    />
                  </div>
                </div>
              </div>

              {/* Test Scenarios Dropdown */}
              <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🎯 Try a Sample Scenario {isFamily ? '(Family)' : '(Individual)'}
                  <Tooltip content="Pre-configured healthcare scenarios to help you explore different situations. Select one to auto-fill usage inputs with realistic values. Your premiums and HSA contributions will not be changed.">
                    <span className="ml-1 text-blue-500 text-xs">ⓘ</span>
                  </Tooltip>
                </label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  onChange={(e) => {
                    if (e.target.value) {
                      const scenario = testScenarios[parseInt(e.target.value)];
                      setUsage(scenario.usage);
                      // Don't change premiums or HSA - only usage data
                      setActiveTab(scenario.isFamily ? 'family' : 'individual');
                    }
                  }}
                  value=""
                  key={activeTab}
                >
                  <option value="">-- Select a scenario to auto-fill inputs --</option>
                  {testScenarios
                    .map((scenario, index) => ({ scenario, index }))
                    .filter(({ scenario }) => scenario.isFamily === isFamily)
                    .map(({ scenario, index }) => (
                      <option key={index} value={index}>
                        {scenario.name} - {scenario.description}
                      </option>
                    ))}
                </select>
              </div>

              {isFamily && (
                <div className="mb-4 p-2 sm:p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                  <p className="text-sm text-blue-800">
                    <strong>💡 All usage values are for your entire family combined.</strong>
                    {' '}Add up visits/prescriptions for all family members.
                  </p>
                </div>
              )}

              {isFamily && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Family Members
                    <Tooltip content="Total number of people covered under this family plan (you + dependents). Used for deductible and out-of-pocket max calculations.">
                      <span className="ml-1 text-blue-500">ⓘ</span>
                    </Tooltip>
                  </label>
                  <input
                    type="number"
                    min="2"
                    value={usage.familyMembers}
                    onChange={(e) => updateUsage('familyMembers', parseInt(e.target.value) || 0)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}

              <h3 className="font-semibold text-gray-700 mt-4 mb-2">Doctor Visits (Annual Total)</h3>

              <div className="space-y-3 mb-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Primary Care Visits
                    <Tooltip content={`Annual checkups, sick visits, physicals with your regular doctor. Copay: $15-$30 per visit depending on plan. (Total for ${isFamily ? 'all family members' : 'you'})`}>
                      <span className="ml-1 text-blue-500 text-xs">ⓘ</span>
                    </Tooltip>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={usage.primaryCareVisits}
                    onChange={(e) => updateUsage('primaryCareVisits', parseInt(e.target.value) || 0)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Specialist Visits
                    <Tooltip content={`Cardiologist, dermatologist, orthopedist, etc. Copay: $40-$60 per visit. (Total for ${isFamily ? 'all family members' : 'you'})`}>
                      <span className="ml-1 text-blue-500 text-xs">ⓘ</span>
                    </Tooltip>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={usage.specialistVisits}
                    onChange={(e) => updateUsage('specialistVisits', parseInt(e.target.value) || 0)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <h3 className="font-semibold text-gray-700 mt-4 mb-2">Emergency & Urgent Care</h3>

              <div className="space-y-3 mb-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Emergency Room Visits
                    <Tooltip content="Life-threatening situations only. Copay: $300-$350 per visit. Examples: chest pain, severe injuries, stroke symptoms.">
                      <span className="ml-1 text-blue-500 text-xs">ⓘ</span>
                    </Tooltip>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={usage.emergencyRoomVisits}
                    onChange={(e) => updateUsage('emergencyRoomVisits', parseInt(e.target.value) || 0)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Urgent Care Visits
                    <Tooltip content="Non-life-threatening issues requiring immediate care. Copay: $50-$85. Examples: sprains, minor cuts, flu, ear infections.">
                      <span className="ml-1 text-blue-500 text-xs">ⓘ</span>
                    </Tooltip>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={usage.urgentCareVisits}
                    onChange={(e) => updateUsage('urgentCareVisits', parseInt(e.target.value) || 0)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Hospital Stays
                    <Tooltip content="Overnight admissions for surgery, serious illness, childbirth, etc. Copay: $0-$500 per stay depending on plan.">
                      <span className="ml-1 text-blue-500 text-xs">ⓘ</span>
                    </Tooltip>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={usage.hospitalStays}
                    onChange={(e) => updateUsage('hospitalStays', parseInt(e.target.value) || 0)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <h3 className="font-semibold text-gray-700 mt-4 mb-2">Prescriptions (Monthly Total)</h3>

              <div className="space-y-3 mb-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Generic Drugs
                    <Tooltip content={`Most affordable option. $10 copay per prescription (30-day supply). Examples: lisinopril, metformin, omeprazole. (Total per month for ${isFamily ? 'all family' : 'you'})`}>
                      <span className="ml-1 text-blue-500 text-xs">ⓘ</span>
                    </Tooltip>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={usage.genericDrugsPerMonth}
                    onChange={(e) => updateUsage('genericDrugsPerMonth', parseInt(e.target.value) || 0)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Preferred Brand Drugs
                    <Tooltip content="Brand name drugs on the formulary. $45 copay per prescription. Examples: Advair, Lantus. Check your plan's drug list.">
                      <span className="ml-1 text-blue-500 text-xs">ⓘ</span>
                    </Tooltip>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={usage.preferredBrandDrugsPerMonth}
                    onChange={(e) => updateUsage('preferredBrandDrugsPerMonth', parseInt(e.target.value) || 0)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Non-Preferred Brand Drugs
                    <Tooltip content="Brand name drugs not on preferred list. $70 copay. Usually have generic or preferred alternatives available.">
                      <span className="ml-1 text-blue-500 text-xs">ⓘ</span>
                    </Tooltip>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={usage.nonPreferredBrandDrugsPerMonth}
                    onChange={(e) => updateUsage('nonPreferredBrandDrugsPerMonth', parseInt(e.target.value) || 0)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Specialty Drugs
                    <Tooltip content="High-cost medications for complex conditions (cancer, MS, rheumatoid arthritis). Calculated at 30% coinsurance with $250/month maximum. Must use Aetna Specialty Pharmacy.">
                      <span className="ml-1 text-blue-500 text-xs">ⓘ</span>
                    </Tooltip>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={usage.specialtyDrugsPerMonth}
                    onChange={(e) => updateUsage('specialtyDrugsPerMonth', parseInt(e.target.value) || 0)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <h3 className="font-semibold text-gray-700 mt-4 mb-2">Therapy & Procedures</h3>

              <div className="space-y-3 mb-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Mental Health Therapy (Annual)
                    <Tooltip content="Individual therapy sessions (depression, anxiety, PTSD). Copay: $40-$60 per session. Weekly therapy = 52 sessions/year = ~$2,600.">
                      <span className="ml-1 text-blue-500 text-xs">ⓘ</span>
                    </Tooltip>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={usage.mentalHealthTherapySessions}
                    onChange={(e) => updateUsage('mentalHealthTherapySessions', parseInt(e.target.value) || 0)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Outpatient Surgeries
                    <Tooltip content="Same-day surgical procedures at surgery center. Examples: colonoscopy, cataract surgery, hernia repair. Copay: $0-$300 depending on plan.">
                      <span className="ml-1 text-blue-500 text-xs">ⓘ</span>
                    </Tooltip>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={usage.outpatientSurgeries}
                    onChange={(e) => updateUsage('outpatientSurgeries', parseInt(e.target.value) || 0)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Physical Therapy Sessions
                    <Tooltip content="PT/OT for injuries, post-surgery rehab, chronic pain. Covered at 100% after deductible. Typical treatment: 10-20 sessions.">
                      <span className="ml-1 text-blue-500 text-xs">ⓘ</span>
                    </Tooltip>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={usage.physicalTherapySessions}
                    onChange={(e) => updateUsage('physicalTherapySessions', parseInt(e.target.value) || 0)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <h3 className="font-semibold text-gray-700 mt-4 mb-2">Special Circumstances</h3>

              <div className="space-y-3 mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="pregnancy"
                    checked={usage.planningPregnancy}
                    onChange={(e) => setUsage({ ...usage, planningPregnancy: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="pregnancy" className="ml-2 block text-sm text-gray-700">
                    Planning Pregnancy/Childbirth
                    <Tooltip content="Adds official SBC pregnancy cost estimates: HDHP 3300: $3,860, POS 250: $320, POS 500: $760. Includes 9 months prenatal care + hospital delivery.">
                      <span className="ml-1 text-blue-500 text-xs">ⓘ</span>
                    </Tooltip>
                  </label>
                </div>
              </div>

              <h3 className="font-semibold text-gray-700 mt-4 mb-2">Other Medical Costs (Annual Estimate)</h3>

              <div className="space-y-3 mb-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Lab Tests & X-Rays
                    <Tooltip content="Estimate total annual cost for blood work, urinalysis, basic x-rays, etc. Typical bloodwork panel: $100-$300. Annual physical labs: ~$500. Covered after deductible.">
                      <span className="ml-1 text-blue-500 text-xs">ⓘ</span>
                    </Tooltip>
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={usage.labTestsXrays}
                    onChange={(e) => updateUsage('labTestsXrays', parseInt(e.target.value) || 0)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    placeholder="e.g. 500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Imaging (CT/PET/MRI)
                    <Tooltip content="Advanced imaging total annual cost. Single MRI: $1,000-$3,000. CT scan: $500-$3,000. Usually requires pre-authorization. Applied to deductible.">
                      <span className="ml-1 text-blue-500 text-xs">ⓘ</span>
                    </Tooltip>
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={usage.imagingCTPETMRI}
                    onChange={(e) => updateUsage('imagingCTPETMRI', parseInt(e.target.value) || 0)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    placeholder="e.g. 1500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2">
            <div className="space-y-4 sm:space-y-6">
              {Object.entries(plans).map(([key, plan]) => {
                const result = planResults[key];
                return (
                  <div key={key} className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4">
                      <h2 className="text-2xl font-bold">{plan.name}</h2>
                      <p className="text-blue-100 text-sm mt-1">
                        Deductible: {formatCurrency(isFamily ? plan.deductibleFamily : plan.deductibleIndividual)} |
                        OOP Max: {formatCurrency(isFamily ? plan.oopMaxFamily : plan.oopMaxIndividual)}
                      </p>
                    </div>

                    <div className="p-6">
                      {/* Cost Breakdown */}
                      <div className="space-y-3">
                        <div className="border-b">
                          <div
                            className="flex justify-between items-center py-2 cursor-pointer hover:bg-gray-50"
                            onClick={() => toggleBreakdown(key, 'annualPremiums')}
                          >
                            <span className="text-gray-600 flex items-center">
                              <svg
                                className={`w-4 h-4 mr-2 transition-transform ${expandedBreakdowns[key]?.annualPremiums ? 'rotate-90' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                              Annual Premiums
                            </span>
                            <span className="font-semibold text-gray-900">{formatCurrency(result.annualPremiums)}</span>
                          </div>
                          {expandedBreakdowns[key]?.annualPremiums && (
                            <div className="pl-8 pb-3 space-y-1 text-sm bg-gray-50">
                              <div className="text-gray-600">
                                Monthly premium: {formatCurrency(premiums[key as keyof typeof premiums])} × 12 months = {formatCurrency(result.annualPremiums)}
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="border-b">
                          <div
                            className="flex justify-between items-center py-2 cursor-pointer hover:bg-gray-50"
                            onClick={() => toggleBreakdown(key, 'deductible')}
                          >
                            <span className="text-gray-600 flex items-center">
                              <svg
                                className={`w-4 h-4 mr-2 transition-transform ${expandedBreakdowns[key]?.deductible ? 'rotate-90' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                              Deductible Used
                            </span>
                            <span className="font-semibold text-gray-900">{formatCurrency(result.deductible)}</span>
                          </div>
                          {expandedBreakdowns[key]?.deductible && (
                            <div className="pl-8 pb-3 space-y-1 text-sm bg-gray-50">
                              <div className="text-gray-600">
                                Amount applied to deductible from lab/imaging costs.
                              </div>
                              <div className="text-gray-600">
                                Deductible limit: {formatCurrency(isFamily ? plan.deductibleFamily : plan.deductibleIndividual)}
                              </div>
                              <div className="text-gray-600">
                                After deductible is met, most services are covered at plan rates.
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="border-b">
                          <div
                            className="flex justify-between items-center py-2 cursor-pointer hover:bg-gray-50"
                            onClick={() => toggleBreakdown(key, 'copays')}
                          >
                            <span className="text-gray-600 flex items-center">
                              <svg
                                className={`w-4 h-4 mr-2 transition-transform ${expandedBreakdowns[key]?.copays ? 'rotate-90' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                              Copays
                            </span>
                            <span className="font-semibold text-gray-900">{formatCurrency(result.copays)}</span>
                          </div>
                          {expandedBreakdowns[key]?.copays && (
                            <div className="pl-8 pb-3 space-y-1 text-sm bg-gray-50">
                              {usage.primaryCareVisits > 0 && (
                                <div className="flex justify-between text-gray-600">
                                  <span>Primary Care ({usage.primaryCareVisits} × ${plan.primaryCareCopay})</span>
                                  <span>{formatCurrency(usage.primaryCareVisits * plan.primaryCareCopay)}</span>
                                </div>
                              )}
                              {usage.specialistVisits > 0 && (
                                <div className="flex justify-between text-gray-600">
                                  <span>Specialist ({usage.specialistVisits} × ${plan.specialistCopay})</span>
                                  <span>{formatCurrency(usage.specialistVisits * plan.specialistCopay)}</span>
                                </div>
                              )}
                              {usage.emergencyRoomVisits > 0 && (
                                <div className="flex justify-between text-gray-600">
                                  <span>Emergency Room ({usage.emergencyRoomVisits} × ${plan.emergencyRoomCopay})</span>
                                  <span>{formatCurrency(usage.emergencyRoomVisits * plan.emergencyRoomCopay)}</span>
                                </div>
                              )}
                              {usage.urgentCareVisits > 0 && (
                                <div className="flex justify-between text-gray-600">
                                  <span>Urgent Care ({usage.urgentCareVisits} × ${plan.urgentCareCopay})</span>
                                  <span>{formatCurrency(usage.urgentCareVisits * plan.urgentCareCopay)}</span>
                                </div>
                              )}
                              {usage.hospitalStays > 0 && (
                                <div className="flex justify-between text-gray-600">
                                  <span>Hospital Stays ({usage.hospitalStays} × ${plan.hospitalCopay})</span>
                                  <span>{formatCurrency(usage.hospitalStays * plan.hospitalCopay)}</span>
                                </div>
                              )}
                              {usage.mentalHealthTherapySessions > 0 && (
                                <div className="flex justify-between text-gray-600">
                                  <span>Mental Health ({usage.mentalHealthTherapySessions} × ${plan.mentalHealthOfficeCopay})</span>
                                  <span>{formatCurrency(usage.mentalHealthTherapySessions * plan.mentalHealthOfficeCopay)}</span>
                                </div>
                              )}
                              {usage.outpatientSurgeries > 0 && (
                                <div className="flex justify-between text-gray-600">
                                  <span>Outpatient Surgery ({usage.outpatientSurgeries} × ${plan.outpatientSurgeryCopay})</span>
                                  <span>{formatCurrency(usage.outpatientSurgeries * plan.outpatientSurgeryCopay)}</span>
                                </div>
                              )}
                              {result.copays === 0 && (
                                <div className="text-gray-500 italic">No copays entered</div>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="border-b">
                          <div
                            className="flex justify-between items-center py-2 cursor-pointer hover:bg-gray-50"
                            onClick={() => toggleBreakdown(key, 'prescriptions')}
                          >
                            <span className="text-gray-600 flex items-center">
                              <svg
                                className={`w-4 h-4 mr-2 transition-transform ${expandedBreakdowns[key]?.prescriptions ? 'rotate-90' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                              Prescriptions
                            </span>
                            <span className="font-semibold text-gray-900">{formatCurrency(result.prescriptions)}</span>
                          </div>
                          {expandedBreakdowns[key]?.prescriptions && (
                            <div className="pl-8 pb-3 space-y-1 text-sm bg-gray-50">
                              {usage.genericDrugsPerMonth > 0 && (
                                <div className="flex justify-between text-gray-600">
                                  <span>Generic ({usage.genericDrugsPerMonth}/mo × ${plan.genericDrugCopay} × 12)</span>
                                  <span>{formatCurrency(usage.genericDrugsPerMonth * plan.genericDrugCopay * 12)}</span>
                                </div>
                              )}
                              {usage.preferredBrandDrugsPerMonth > 0 && (
                                <div className="flex justify-between text-gray-600">
                                  <span>Preferred Brand ({usage.preferredBrandDrugsPerMonth}/mo × ${plan.preferredBrandDrugCopay} × 12)</span>
                                  <span>{formatCurrency(usage.preferredBrandDrugsPerMonth * plan.preferredBrandDrugCopay * 12)}</span>
                                </div>
                              )}
                              {usage.nonPreferredBrandDrugsPerMonth > 0 && (
                                <div className="flex justify-between text-gray-600">
                                  <span>Non-Preferred ({usage.nonPreferredBrandDrugsPerMonth}/mo × ${plan.nonPreferredBrandDrugCopay} × 12)</span>
                                  <span>{formatCurrency(usage.nonPreferredBrandDrugsPerMonth * plan.nonPreferredBrandDrugCopay * 12)}</span>
                                </div>
                              )}
                              {usage.specialtyDrugsPerMonth > 0 && (
                                <div className="flex justify-between text-gray-600">
                                  <span>Specialty ({usage.specialtyDrugsPerMonth}/mo × $250 max × 12)</span>
                                  <span>{formatCurrency(usage.specialtyDrugsPerMonth * 250 * 12)}</span>
                                </div>
                              )}
                              {result.prescriptions === 0 && (
                                <div className="text-gray-500 italic">No prescriptions entered</div>
                              )}
                            </div>
                          )}
                        </div>
                        {result.maternityCosts > 0 && (
                          <div className="border-b bg-pink-50 -mx-3 px-3">
                            <div
                              className="flex justify-between items-center py-2 cursor-pointer hover:bg-pink-100"
                              onClick={() => toggleBreakdown(key, 'maternity')}
                            >
                              <span className="text-gray-700 font-medium flex items-center">
                                <svg
                                  className={`w-4 h-4 mr-2 transition-transform ${expandedBreakdowns[key]?.maternity ? 'rotate-90' : ''}`}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                                Maternity Costs
                              </span>
                              <span className="font-semibold text-gray-900">{formatCurrency(result.maternityCosts)}</span>
                            </div>
                            {expandedBreakdowns[key]?.maternity && (
                              <div className="pl-8 pb-3 space-y-1 text-sm bg-pink-100">
                                <div className="text-gray-600">
                                  Official SBC estimate for pregnancy/childbirth: {formatCurrency(result.maternityCosts)}
                                </div>
                                <div className="text-gray-600">
                                  Includes prenatal visits, lab work, ultrasounds, and hospital delivery.
                                </div>
                                <div className="text-gray-600">
                                  Based on Summary of Benefits and Coverage examples.
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                        <div className="border-b">
                          <div
                            className="flex justify-between items-center py-2 cursor-pointer hover:bg-gray-50"
                            onClick={() => toggleBreakdown(key, 'otherCosts')}
                          >
                            <span className="text-gray-600 flex items-center">
                              <svg
                                className={`w-4 h-4 mr-2 transition-transform ${expandedBreakdowns[key]?.otherCosts ? 'rotate-90' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                              Other Medical Costs
                            </span>
                            <span className="font-semibold text-gray-900">{formatCurrency(result.otherCosts)}</span>
                          </div>
                          {expandedBreakdowns[key]?.otherCosts && (
                            <div className="pl-8 pb-3 space-y-1 text-sm bg-gray-50">
                              <div className="text-gray-600">
                                Lab tests/X-rays + Imaging (CT/PET/MRI) costs after deductible is applied.
                              </div>
                              <div className="text-gray-600">
                                Any costs beyond deductible up to out-of-pocket max.
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="border-b border-gray-300">
                          <div
                            className="flex justify-between items-center py-2 cursor-pointer hover:bg-gray-50"
                            onClick={() => toggleBreakdown(key, 'totalOOP')}
                          >
                            <span className="text-gray-600 font-medium flex items-center">
                              <svg
                                className={`w-4 h-4 mr-2 transition-transform ${expandedBreakdowns[key]?.totalOOP ? 'rotate-90' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                              Total Out-of-Pocket (Medical)
                            </span>
                            <span className="font-semibold text-gray-900">{formatCurrency(result.totalOutOfPocket)}</span>
                          </div>
                          {expandedBreakdowns[key]?.totalOOP && (
                            <div className="pl-8 pb-3 space-y-1 text-sm bg-gray-50">
                              <div className="text-gray-600">
                                Sum of all medical costs (deductible + copays + prescriptions + other costs).
                              </div>
                              <div className="text-gray-600">
                                Capped at out-of-pocket maximum of {formatCurrency(isFamily ? plan.oopMaxFamily : plan.oopMaxIndividual)}.
                              </div>
                            </div>
                          )}
                        </div>
                        {result.employerHSAContribution > 0 && (
                          <div className="flex justify-between items-center py-2 border-b border-green-300 bg-green-50 px-3 -mx-3">
                            <span className="text-green-700 font-medium">Employer HSA Contribution</span>
                            <span className="font-semibold text-green-700">-{formatCurrency(result.employerHSAContribution)}</span>
                          </div>
                        )}
                        <div className="flex justify-between items-center py-3 bg-blue-50 px-3 -mx-3 rounded-lg mt-4">
                          <span className="text-lg font-bold text-blue-900">Total Annual Cost</span>
                          <span className="text-2xl font-bold text-blue-900">{formatCurrency(result.netCost)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Comparison Summary */}
            <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Plan Comparison Summary</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-3 px-2 text-gray-700">Plan</th>
                      <th className="text-right py-3 px-2 text-gray-700">Premiums</th>
                      <th className="text-right py-3 px-2 text-gray-700">Medical OOP</th>
                      <th className="text-right py-3 px-2 text-gray-700">HSA Credit</th>
                      <th className="text-right py-3 px-2 text-gray-700 font-bold">Total Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(plans)
                      .sort((a, b) => planResults[a[0]].netCost - planResults[b[0]].netCost)
                      .map(([key, plan], index) => {
                        const result = planResults[key];
                        const isLowest = index === 0;
                        return (
                          <tr key={key} className={`border-b ${isLowest ? 'bg-green-50' : ''}`}>
                            <td className="py-3 px-2 font-medium">
                              {plan.name}
                              {isLowest && <span className="ml-2 text-xs text-green-600 font-bold">LOWEST</span>}
                            </td>
                            <td className="text-right py-3 px-2">{formatCurrency(result.annualPremiums)}</td>
                            <td className="text-right py-3 px-2">{formatCurrency(result.totalOutOfPocket)}</td>
                            <td className="text-right py-3 px-2 text-green-600">
                              {result.employerHSAContribution > 0 ? `-${formatCurrency(result.employerHSAContribution)}` : '$0'}
                            </td>
                            <td className="text-right py-3 px-2 font-bold text-lg">
                              {formatCurrency(result.netCost)}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer and Privacy Notice */}
        <div className="mt-12 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-bold text-yellow-800 mb-2">Important Disclaimer</h3>
              <div className="text-sm text-yellow-700 space-y-2">
                <p>
                  <strong>This is an estimation tool only.</strong> Always verify the numbers you see here against your official plan documents,
                  Summary of Benefits and Coverage (SBC), and benefits information from your employer.
                </p>
                <p>
                  Actual costs may vary based on specific services received, provider charges, network status,
                  plan changes, and individual circumstances. This calculator does not account for all possible scenarios or coverage details.
                </p>
                <p className="font-semibold">
                  This calculator does NOT include:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Out-of-network care (50% coinsurance, higher deductibles)</li>
                  <li>Durable medical equipment (50% coinsurance)</li>
                  <li>Home health care or skilled nursing facilities</li>
                  <li>Pre-authorization penalties ($400 if not obtained)</li>
                </ul>
                <p className="font-semibold mt-3">
                  Now includes (use inputs on left):
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2 text-green-700">
                  <li>✓ Specialty medications (estimated at $250/month max)</li>
                  <li>✓ Maternity/pregnancy costs (checkbox option, based on SBC)</li>
                  <li>✓ Mental health therapy sessions</li>
                  <li>✓ Outpatient surgery facility fees</li>
                  <li>✓ Physical therapy/rehabilitation sessions</li>
                </ul>
                <p className="mt-3">
                  <strong>Please consult with your HR department or benefits administrator for personalized guidance when making your healthcare plan decision.</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-bold text-blue-800 mb-2">Your Privacy is Protected</h3>
              <div className="text-sm text-blue-700">
                <p>
                  <strong>This application is 100% client-side.</strong> All calculations happen in your browser.
                  No data is stored, transmitted, or saved to any server. Your healthcare information never leaves your device.
                </p>
                <p className="mt-2">
                  You can verify this by checking the network tab in your browser developer tools - you'll see no data being sent anywhere.
                </p>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-6 text-center text-gray-600 text-xs">
          <p>© {new Date().getFullYear()} - Educational Tool for Personal Use Only</p>
        </footer>
      </div>
    </main>
  );
}
