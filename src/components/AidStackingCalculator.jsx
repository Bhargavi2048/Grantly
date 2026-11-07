import React, { useState } from 'react';
import { 
  Calculator, 
  DollarSign, 
  ShieldAlert, 
  CheckCircle2, 
  HelpCircle, 
  TrendingDown, 
  Sparkles, 
  Copy, 
  Check, 
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function AidStackingCalculator({ 
  studentProfile, 
  scholarships, 
  onUpdateProfile 
}) {
  // Financial parameters
  const [tuitionAndFees, setTuitionAndFees] = useState(18500);
  const [roomAndBoard, setRoomAndBoard] = useState(11500);
  const [booksAndSupplies, setBooksAndSupplies] = useState(2000);

  const [institutionalAid, setInstitutionalAid] = useState(studentProfile.institutionalAid || 12000);
  const [pellGrant, setPellGrant] = useState(studentProfile.federalPellGrant || 7395);
  const [workStudy, setWorkStudy] = useState(studentProfile.studentWorkStudy || 3500);
  const [personalSavings, setPersonalSavings] = useState(studentProfile.personalSavings || 2000);

  // Won outside scholarships from pipeline
  const wonScholarships = scholarships.filter(s => s.status === 'awarded');
  const wonTotal = wonScholarships.reduce((acc, s) => acc + s.amount, 0);

  // In-progress targeted scholarships
  const inProgressScholarships = scholarships.filter(s => ['in_progress', 'ready_to_submit', 'submitted'].includes(s.status));
  const [includeTargeted, setIncludeTargeted] = useState(false);
  const targetedTotal = inProgressScholarships.reduce((acc, s) => acc + s.amount, 0);

  const outsideScholarshipsTotal = wonTotal + (includeTargeted ? targetedTotal : 0);

  // Calculations
  const totalCostOfAttendance = tuitionAndFees + roomAndBoard + booksAndSupplies;
  const totalAidCovered = institutionalAid + pellGrant + workStudy + personalSavings + outsideScholarshipsTotal;
  const unmetGap = Math.max(0, totalCostOfAttendance - totalAidCovered);
  const coveredPercent = Math.min(100, Math.round((totalAidCovered / totalCostOfAttendance) * 100));

  // Displacement advisory
  const isOverAwarded = totalAidCovered > totalCostOfAttendance;
  const potentialSurplus = Math.max(0, totalAidCovered - totalCostOfAttendance);

  const [copiedLetter, setCopiedLetter] = useState(false);

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Calculator className="w-4 h-4" />
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                TrueCost & Scholarship Stacking Simulator
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Model your True Cost of Attendance (COA), calculate your remaining unmet need gap, and navigate scholarship displacement policies.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-slate-500">Pipeline Grants:</span>
            <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-extrabold text-xs border border-emerald-200 dark:border-emerald-800">
              ${wonTotal.toLocaleString()} Won
            </span>
          </div>
        </div>
      </div>

      {/* Main Visual Stacking Bar & Gap Alert */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Funding Coverage Status
            </span>
            <div className="flex items-baseline space-x-2 mt-0.5">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                ${totalAidCovered.toLocaleString()}
              </span>
              <span className="text-sm font-semibold text-slate-400">
                of ${totalCostOfAttendance.toLocaleString()} Total Cost
              </span>
            </div>
          </div>

          <div className="text-right sm:text-right">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Remaining Unmet Gap (Loans/Debt)
            </span>
            <span className={`text-2xl font-extrabold ${unmetGap === 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
              {unmetGap === 0 ? '🎉 $0 (Fully Funded!)' : `$${unmetGap.toLocaleString()}`}
            </span>
          </div>
        </div>

        {/* Stacked Visual Bar */}
        <div>
          <div className="w-full h-5 rounded-xl bg-slate-100 dark:bg-slate-800 flex overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700">
            {/* Institutional Aid */}
            <div 
              style={{ width: `${Math.min(100, (institutionalAid / totalCostOfAttendance) * 100)}%` }}
              className="h-full bg-blue-500 rounded-l-lg transition-all"
              title={`Institutional Aid: $${institutionalAid.toLocaleString()}`}
            />
            {/* Pell */}
            <div 
              style={{ width: `${Math.min(100, (pellGrant / totalCostOfAttendance) * 100)}%` }}
              className="h-full bg-cyan-500 transition-all"
              title={`Pell Grant: $${pellGrant.toLocaleString()}`}
            />
            {/* Work Study */}
            <div 
              style={{ width: `${Math.min(100, (workStudy / totalCostOfAttendance) * 100)}%` }}
              className="h-full bg-amber-500 transition-all"
              title={`Work Study: $${workStudy.toLocaleString()}`}
            />
            {/* Savings */}
            <div 
              style={{ width: `${Math.min(100, (personalSavings / totalCostOfAttendance) * 100)}%` }}
              className="h-full bg-purple-500 transition-all"
              title={`Savings: $${personalSavings.toLocaleString()}`}
            />
            {/* Outside Scholarships */}
            <div 
              style={{ width: `${Math.min(100, (outsideScholarshipsTotal / totalCostOfAttendance) * 100)}%` }}
              className="h-full bg-emerald-500 transition-all"
              title={`Outside Scholarships: $${outsideScholarshipsTotal.toLocaleString()}`}
            />
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] font-semibold text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> College Grants (${institutionalAid.toLocaleString()})</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-cyan-500" /> Pell Grant (${pellGrant.toLocaleString()})</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Work-Study (${workStudy.toLocaleString()})</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Savings (${personalSavings.toLocaleString()})</span>
            <span className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Outside Scholarships (${outsideScholarshipsTotal.toLocaleString()})</span>
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
            {coveredPercent}% of total college expenses covered
          </span>
        </div>
      </div>

      {/* Inputs Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cost of Attendance Column */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
            <DollarSign className="w-4 h-4 text-emerald-500" />
            1. Annual Cost of Attendance (COA)
          </h3>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-slate-600 dark:text-slate-400">Tuition & Mandatory Campus Fees</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">${tuitionAndFees.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="5000"
                max="60000"
                step="500"
                value={tuitionAndFees}
                onChange={(e) => setTuitionAndFees(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-slate-600 dark:text-slate-400">Housing & Dining (Room/Board)</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">${roomAndBoard.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="3000"
                max="25000"
                step="500"
                value={roomAndBoard}
                onChange={(e) => setRoomAndBoard(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-slate-600 dark:text-slate-400">Books, Supplies & Local Transport</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">${booksAndSupplies.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="500"
                max="5000"
                step="250"
                value={booksAndSupplies}
                onChange={(e) => setBooksAndSupplies(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Existing Financial Aid Layers */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-blue-500" />
            2. Institutional & Federal Aid Packages
          </h3>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-slate-600 dark:text-slate-400">University Grant & Merit Scholarships</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">${institutionalAid.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="0"
                max="35000"
                step="500"
                value={institutionalAid}
                onChange={(e) => setInstitutionalAid(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-slate-600 dark:text-slate-400">Federal Pell Grant</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">${pellGrant.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="0"
                max="7395"
                step="100"
                value={pellGrant}
                onChange={(e) => setPellGrant(Number(e.target.value))}
                className="w-full accent-cyan-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-slate-600 dark:text-slate-400">Work-Study & Summer Contribution</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">${workStudy.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="0"
                max="8000"
                step="250"
                value={workStudy}
                onChange={(e) => setWorkStudy(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scholarship Displacement Policy Advisor */}
      <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-6 space-y-4">
        <div className="flex items-start space-x-3">
          <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-800 flex items-center justify-center text-amber-700 dark:text-amber-400 flex-shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Scholarship Displacement Protection & Appeal Advisor
            </h3>
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
              onClick={handleCopyLetter}
              className="text-xs font-semibold px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1 hover:bg-emerald-100 transition-colors"
            >
              {copiedLetter ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLetter ? 'Copied to Clipboard' : 'Copy Email Script'}</span>
            </button>
          </div>
          <pre className="text-[11px] text-slate-600 dark:text-slate-400 font-mono whitespace-pre-wrap bg-slate-50 dark:bg-slate-800/80 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
            {appealLetterTemplate}
          </pre>
        </div>
      </div>
    </div>
  );
}
