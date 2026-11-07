import React, { useState } from 'react';
import { 
  Calculator, 
  DollarSign, 
  ShieldAlert, 
  Copy, 
  Check, 
  Layers,
  Clock,
  TrendingDown,
  Download
} from 'lucide-react';
import { StudentProfile, Scholarship } from '../types';
import { AidCalculationService } from '../services/aidCalculationService';
import { ExportService } from '../services/exportService';

interface AidStackingCalculatorProps {
  studentProfile: StudentProfile;
  scholarships: Scholarship[];
  onUpdateProfile: (profile: StudentProfile) => void;
}

export default function AidStackingCalculator({ 
  studentProfile, 
  scholarships 
}: AidStackingCalculatorProps): JSX.Element {
  // Financial parameters
  const [tuitionAndFees, setTuitionAndFees] = useState<number>(18500);
  const [roomAndBoard, setRoomAndBoard] = useState<number>(11500);
  const [booksAndSupplies, setBooksAndSupplies] = useState<number>(2000);

  const [institutionalAid, setInstitutionalAid] = useState<number>(studentProfile.institutionalAid || 12000);
  const [pellGrant, setPellGrant] = useState<number>(studentProfile.federalPellGrant || 7395);
  const [workStudy, setWorkStudy] = useState<number>(studentProfile.studentWorkStudy || 3500);
  const [personalSavings] = useState<number>(studentProfile.personalSavings || 2000);

  // Won outside scholarships from pipeline
  const wonScholarships = scholarships.filter(s => s.status === 'awarded');
  const wonTotal = wonScholarships.reduce((acc, s) => acc + s.amount, 0);

  // In-progress targeted scholarships
  const inProgressScholarships = scholarships.filter(s => ['in_progress', 'ready_to_submit', 'submitted'].includes(s.status));
  const [includeTargeted, setIncludeTargeted] = useState<boolean>(false);
  const targetedTotal = inProgressScholarships.reduce((acc, s) => acc + s.amount, 0);

  const outsideScholarshipsTotal = wonTotal + (includeTargeted ? targetedTotal : 0);

  // Innovation: Run comprehensive Aid Calculation Service
  const aidMetrics = AidCalculationService.calculateAidImpact({
    tuitionAndFees,
    roomAndBoard,
    booksAndSupplies,
    institutionalAid,
    pellGrant,
    workStudy,
    personalSavings,
    outsideScholarshipsTotal
  });

  const [copiedLetter, setCopiedLetter] = useState<boolean>(false);
  const [copiedPortfolio, setCopiedPortfolio] = useState<boolean>(false);

  const appealLetterTemplate = `Dear Financial Aid Committee at ${studentProfile.institution},

I am writing as an enrolled ${studentProfile.major} student (${studentProfile.academicLevel}) to report outside private scholarship assistance I have been awarded for the upcoming academic year.

In accordance with institutional guidelines and federal regulation 34 CFR § 673.5, I respectfully request that these outside funds be applied first toward reducing my student loans, work-study obligations, or unbudgeted educational expenses (such as required technology, books, and course equipment) rather than reducing my institutional grant or merit aid.

Preserving institutional grant funding is essential for my family to maintain full-time academic enrollment without taking on high-interest private debt. Thank you for your continued partnership and support.

Sincerely,
${studentProfile.fullName}
Student ID: Pending Verification
${studentProfile.email}`;

  const handleCopyLetter = () => {
    navigator.clipboard.writeText(appealLetterTemplate);
    setCopiedLetter(true);
    setTimeout(() => setCopiedLetter(false), 2500);
  };

  const handleExportPortfolio = () => {
    const portfolioText = ExportService.generateAidPortfolioText(
      studentProfile,
      scholarships,
      wonTotal
    );
    navigator.clipboard.writeText(portfolioText);
    setCopiedPortfolio(true);
    setTimeout(() => setCopiedPortfolio(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <section 
        aria-labelledby="calculator-heading"
        className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-sm"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400" aria-hidden="true">
                <Calculator className="w-4 h-4" />
              </span>
              <h1 id="calculator-heading" className="text-xl font-bold text-slate-900 dark:text-white">
                TrueCost & Scholarship Stacking Simulator
              </h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Model your True Cost of Attendance (COA), calculate your remaining unmet need gap, and navigate scholarship displacement policies.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleExportPortfolio}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
              title="Copy formatted Financial Aid Portfolio summary"
            >
              {copiedPortfolio ? <Check className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" /> : <Download className="w-3.5 h-3.5" aria-hidden="true" />}
              <span>{copiedPortfolio ? 'Portfolio Copied!' : 'Export Aid Portfolio'}</span>
            </button>

            <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-extrabold text-xs border border-emerald-200 dark:border-emerald-800">
              ${wonTotal.toLocaleString()} Won
            </span>
          </div>
        </div>
      </section>

      {/* Main Visual Stacking Bar & Gap Alert */}
      <section 
        aria-labelledby="funding-status-heading"
        className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 id="funding-status-heading" className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Funding Coverage Status
            </h2>
            <div className="flex items-baseline space-x-2 mt-0.5">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                ${aidMetrics.totalAidCovered.toLocaleString()}
              </span>
              <span className="text-sm font-semibold text-slate-400">
                of ${aidMetrics.totalCostOfAttendance.toLocaleString()} Total Cost
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Remaining Unmet Gap (Loans/Debt)
            </span>
            <span className={`text-2xl font-extrabold ${aidMetrics.unmetGap === 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
              {aidMetrics.unmetGap === 0 ? '🎉 $0 (Fully Funded!)' : `$${aidMetrics.unmetGap.toLocaleString()}`}
            </span>
          </div>
        </div>

        {/* Stacked Visual Bar */}
        <div>
          <div 
            className="w-full h-5 rounded-xl bg-slate-100 dark:bg-slate-800 flex overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700"
            role="progressbar"
            aria-valuenow={aidMetrics.coveredPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Funding coverage progress: ${aidMetrics.coveredPercent}%`}
          >
            {/* Institutional Aid */}
            <div 
              style={{ width: `${Math.min(100, (institutionalAid / aidMetrics.totalCostOfAttendance) * 100)}%` }}
              className="h-full bg-blue-500 rounded-l-lg transition-all"
              title={`Institutional Aid: $${institutionalAid.toLocaleString()}`}
            />
            {/* Pell */}
            <div 
              style={{ width: `${Math.min(100, (pellGrant / aidMetrics.totalCostOfAttendance) * 100)}%` }}
              className="h-full bg-cyan-500 transition-all"
              title={`Pell Grant: $${pellGrant.toLocaleString()}`}
            />
            {/* Work Study */}
            <div 
              style={{ width: `${Math.min(100, (workStudy / aidMetrics.totalCostOfAttendance) * 100)}%` }}
              className="h-full bg-amber-500 transition-all"
              title={`Work Study: $${workStudy.toLocaleString()}`}
            />
            {/* Savings */}
            <div 
              style={{ width: `${Math.min(100, (personalSavings / aidMetrics.totalCostOfAttendance) * 100)}%` }}
              className="h-full bg-purple-500 transition-all"
              title={`Savings: $${personalSavings.toLocaleString()}`}
            />
            {/* Outside Scholarships */}
            <div 
              style={{ width: `${Math.min(100, (outsideScholarshipsTotal / aidMetrics.totalCostOfAttendance) * 100)}%` }}
              className="h-full bg-emerald-500 transition-all"
              title={`Outside Scholarships: $${outsideScholarshipsTotal.toLocaleString()}`}
            />
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] font-semibold text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" aria-hidden="true" /> College Grants (${institutionalAid.toLocaleString()})</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-cyan-500" aria-hidden="true" /> Pell Grant (${pellGrant.toLocaleString()})</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" aria-hidden="true" /> Work-Study (${workStudy.toLocaleString()})</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500" aria-hidden="true" /> Savings (${personalSavings.toLocaleString()})</span>
            <span className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" aria-hidden="true" /> Outside Scholarships (${outsideScholarshipsTotal.toLocaleString()})</span>
          </div>
        </div>

        {/* Targeted Pipeline Simulator Toggle */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          <label className="flex items-center space-x-2 cursor-pointer font-medium text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={includeTargeted}
              onChange={(e) => setIncludeTargeted(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
            />
            <span>Simulate: Include all active pipeline grants (${targetedTotal.toLocaleString()}) in projection</span>
          </label>

          <span className="text-slate-400 text-[11px]">
            {aidMetrics.coveredPercent}% of total college expenses covered
          </span>
        </div>
      </section>

      {/* Innovation: Student Debt Freedom ROI Cards */}
      {outsideScholarshipsTotal > 0 && (
        <section aria-label="Student Loan Debt Freedom ROI" className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
            <span className="text-[10px] uppercase font-bold text-emerald-800 dark:text-emerald-300 block flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" /> Loan Repayment Accelerated
            </span>
            <span className="text-xl font-extrabold text-emerald-700 dark:text-emerald-300 block mt-1">
              -{aidMetrics.loanYearsShavedOff} Years
            </span>
            <span className="text-[11px] text-slate-600 dark:text-slate-400">
              Shaved off standard 10-year student debt horizon
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-cyan-50/70 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800">
            <span className="text-[10px] uppercase font-bold text-cyan-800 dark:text-cyan-300 block flex items-center gap-1">
              <TrendingDown className="w-3.5 h-3.5 text-cyan-600" aria-hidden="true" /> Compounded Interest Saved
            </span>
            <span className="text-xl font-extrabold text-cyan-700 dark:text-cyan-300 block mt-1">
              ${aidMetrics.compoundedInterestSaved.toLocaleString()}
            </span>
            <span className="text-[11px] text-slate-600 dark:text-slate-400">
              Saved in amortized loan interest (6.8% APR standard)
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
            <span className="text-[10px] uppercase font-bold text-purple-800 dark:text-purple-300 block">
              Displacement Policy Risk
            </span>
            <span className={`text-xl font-extrabold block mt-1 ${
              aidMetrics.displacementRisk === 'High' ? 'text-amber-600' : 'text-emerald-600 dark:text-emerald-400'
            }`}>
              {aidMetrics.displacementRisk} Risk
            </span>
            <span className="text-[11px] text-slate-600 dark:text-slate-400">
              {aidMetrics.displacementRisk === 'High' ? 'Outside aid exceeds budget; file appeal' : 'Outside aid safely reduces loan gap'}
            </span>
          </div>
        </section>
      )}

      {/* Inputs Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cost of Attendance Column */}
        <section 
          aria-labelledby="coa-inputs-heading"
          className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4"
        >
          <h2 id="coa-inputs-heading" className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
            <DollarSign className="w-4 h-4 text-emerald-500" aria-hidden="true" />
            1. Annual Cost of Attendance (COA)
          </h2>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <label htmlFor="tuition-slider" className="text-slate-600 dark:text-slate-400">
                  Tuition & Mandatory Campus Fees
                </label>
                <span className="font-bold text-slate-800 dark:text-slate-200">${tuitionAndFees.toLocaleString()}</span>
              </div>
              <input
                id="tuition-slider"
                type="range"
                min="5000"
                max="60000"
                step="500"
                value={tuitionAndFees}
                onChange={(e) => setTuitionAndFees(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
                aria-label="Tuition and Mandatory Fees slider"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <label htmlFor="housing-slider" className="text-slate-600 dark:text-slate-400">
                  Housing & Dining (Room/Board)
                </label>
                <span className="font-bold text-slate-800 dark:text-slate-200">${roomAndBoard.toLocaleString()}</span>
              </div>
              <input
                id="housing-slider"
                type="range"
                min="3000"
                max="25000"
                step="500"
                value={roomAndBoard}
                onChange={(e) => setRoomAndBoard(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
                aria-label="Housing and Dining slider"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <label htmlFor="books-slider" className="text-slate-600 dark:text-slate-400">
                  Books, Supplies & Local Transport
                </label>
                <span className="font-bold text-slate-800 dark:text-slate-200">${booksAndSupplies.toLocaleString()}</span>
              </div>
              <input
                id="books-slider"
                type="range"
                min="500"
                max="5000"
                step="250"
                value={booksAndSupplies}
                onChange={(e) => setBooksAndSupplies(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
                aria-label="Books, Supplies and Transport slider"
              />
            </div>
          </div>
        </section>

        {/* Existing Financial Aid Layers */}
        <section 
          aria-labelledby="aid-inputs-heading"
          className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4"
        >
          <h2 id="aid-inputs-heading" className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-blue-500" aria-hidden="true" />
            2. Institutional & Federal Aid Packages
          </h2>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <label htmlFor="institutional-aid-slider" className="text-slate-600 dark:text-slate-400">
                  University Grant & Merit Scholarships
                </label>
                <span className="font-bold text-slate-800 dark:text-slate-200">${institutionalAid.toLocaleString()}</span>
              </div>
              <input
                id="institutional-aid-slider"
                type="range"
                min="0"
                max="35000"
                step="500"
                value={institutionalAid}
                onChange={(e) => setInstitutionalAid(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
                aria-label="Institutional Aid slider"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <label htmlFor="pell-grant-slider" className="text-slate-600 dark:text-slate-400">
                  Federal Pell Grant
                </label>
                <span className="font-bold text-slate-800 dark:text-slate-200">${pellGrant.toLocaleString()}</span>
              </div>
              <input
                id="pell-grant-slider"
                type="range"
                min="0"
                max="7395"
                step="100"
                value={pellGrant}
                onChange={(e) => setPellGrant(Number(e.target.value))}
                className="w-full accent-cyan-600 cursor-pointer"
                aria-label="Federal Pell Grant slider"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <label htmlFor="work-study-slider" className="text-slate-600 dark:text-slate-400">
                  Work-Study & Campus Earnings
                </label>
                <span className="font-bold text-slate-800 dark:text-slate-200">${workStudy.toLocaleString()}</span>
              </div>
              <input
                id="work-study-slider"
                type="range"
                min="0"
                max="8000"
                step="250"
                value={workStudy}
                onChange={(e) => setWorkStudy(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
                aria-label="Work-Study Earnings slider"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Scholarship Displacement Policy Advisor */}
      <section 
        aria-labelledby="displacement-advisor-heading"
        className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-6 space-y-4"
      >
        <div className="flex items-start space-x-3">
          <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-800 flex items-center justify-center text-amber-700 dark:text-amber-400 flex-shrink-0" aria-hidden="true">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h2 id="displacement-advisor-heading" className="text-sm font-bold text-slate-900 dark:text-white">
              Scholarship Displacement Protection & Appeal Advisor
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              <strong>What is Scholarship Displacement?</strong> When students receive outside scholarships, some universities reduce their own institutional grants rather than reducing loans. Grantly helps you advocate so outside awards reduce your loans first!
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              One-Click Financial Aid Displacement Appeal Template:
            </span>
            <button
              type="button"
              onClick={handleCopyLetter}
              className="text-xs font-semibold px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1 hover:bg-emerald-100 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
              aria-label="Copy appeal email template to clipboard"
            >
              {copiedLetter ? <Check className="w-3.5 h-3.5" aria-hidden="true" /> : <Copy className="w-3.5 h-3.5" aria-hidden="true" />}
              <span>{copiedLetter ? 'Copied to Clipboard' : 'Copy Email Script'}</span>
            </button>
          </div>
          <pre className="text-[11px] text-slate-600 dark:text-slate-400 font-mono whitespace-pre-wrap bg-slate-50 dark:bg-slate-800/80 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
            {appealLetterTemplate}
          </pre>
        </div>
      </section>
    </div>
  );
}
