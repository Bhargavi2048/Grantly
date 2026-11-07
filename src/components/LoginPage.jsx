import React, { useState } from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  UserCheck, 
  DollarSign,
  Compass
} from 'lucide-react';

export default function LoginPage({ onLogin, onGuestAccess, currentProfile }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [institution, setInstitution] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    onLogin({
      fullName: isRegistering && fullName ? fullName : currentProfile.fullName,
      email: email,
      institution: isRegistering && institution ? institution : currentProfile.institution,
      academicLevel: currentProfile.academicLevel,
      major: currentProfile.major,
      gpa: currentProfile.gpa,
      isFirstGen: currentProfile.isFirstGen,
      isPellEligible: currentProfile.isPellEligible,
      householdIncomeTier: currentProfile.householdIncomeTier,
      totalFundingGoal: currentProfile.totalFundingGoal,
      institutionalAid: currentProfile.institutionalAid,
      federalPellGrant: currentProfile.federalPellGrant,
      studentWorkStudy: currentProfile.studentWorkStudy,
      personalSavings: currentProfile.personalSavings
    });
  };

  const handleQuickDemoLogin = (persona) => {
    onLogin(persona);
  };

  const DEMO_PERSONAS = [
    {
      name: 'Maya Lin',
      tag: 'Undergraduate First-Gen',
      detail: 'CS & Bioethics · 3.82 GPA · Pell Grant Eligible',
      profile: {
        fullName: 'Maya Lin',
        email: 'maya.lin@university.edu',
        academicLevel: 'Undergraduate',
        yearOfStudy: 'Sophomore (2nd Year)',
        institution: 'Pacific State University',
        major: 'Computer Science',
        minor: 'Bioethics & Society',
        gpa: 3.82,
        isFirstGen: true,
        isPellEligible: true,
        householdIncomeTier: 'pell_eligible',
        totalFundingGoal: 32000,
        institutionalAid: 12000,
        federalPellGrant: 7395,
        studentWorkStudy: 3500,
        personalSavings: 2000
      }
    },
    {
      name: 'Carlos Gomez',
      tag: 'Pre-Med Community Leader',
      detail: 'Nursing & Public Health · 3.45 GPA · Texas',
      profile: {
        fullName: 'Carlos Gomez',
        email: 'carlos.gomez@healthsci.edu',
        academicLevel: 'Undergraduate',
        yearOfStudy: 'Senior (4th Year)',
        institution: 'Metropolitan Health College',
        major: 'Nursing',
        minor: 'Public Health',
        gpa: 3.45,
        isFirstGen: true,
        isPellEligible: false,
        householdIncomeTier: 'low',
        totalFundingGoal: 28000,
        institutionalAid: 9000,
        federalPellGrant: 0,
        studentWorkStudy: 3000,
        personalSavings: 1500
      }
    },
    {
      name: 'Priya Sharma',
      tag: 'STEM Merit Scholar',
      detail: 'Engineering & Physics · 4.0 GPA · High School Senior',
      profile: {
        fullName: 'Priya Sharma',
        email: 'priya.sharma@prep.org',
        academicLevel: 'High School Senior',
        yearOfStudy: 'Grade 12',
        institution: 'Horizon Science Academy',
        major: 'Engineering',
        minor: 'Physics',
        gpa: 4.0,
        isFirstGen: false,
        isPellEligible: false,
        householdIncomeTier: 'moderate',
        totalFundingGoal: 45000,
        institutionalAid: 20000,
        federalPellGrant: 0,
        studentWorkStudy: 2500,
        personalSavings: 3000
      }
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-10 sm:px-6 lg:px-8 transition-colors">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Brand Icon */}
        <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 flex items-center justify-center shadow-xl shadow-emerald-500/20 text-white font-bold text-2xl mb-3">
          <GraduationCap className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          GRANTLY
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
          Rethinking Educational Financial Assistance & Scholarship Discovery
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-xl px-4">
        <div className="bg-white dark:bg-slate-900 py-8 px-6 sm:px-10 shadow-2xl border border-slate-200/90 dark:border-slate-800 rounded-3xl space-y-6">
          
          {/* Form Tabs */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 pb-2">
            <button
              onClick={() => setIsRegistering(false)}
              className={`flex-1 py-2 text-sm font-bold text-center border-b-2 transition-all ${
                !isRegistering
                  ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400 dark:border-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              Sign In to Grantly
            </button>
            <button
              onClick={() => setIsRegistering(true)}
              className={`flex-1 py-2 text-sm font-bold text-center border-b-2 transition-all ${
                isRegistering
                  ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400 dark:border-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              Create Student Account
            </button>
          </div>

          {/* Quick 1-Click Demo Profiles */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900/60">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              1-Click Demo Access (Test Different Student Archetypes):
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {DEMO_PERSONAS.map(p => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => handleQuickDemoLogin(p.profile)}
                  className="p-2.5 rounded-xl border border-emerald-300/80 dark:border-emerald-800 bg-white dark:bg-slate-800 hover:border-emerald-500 text-left transition-all shadow-xs group"
                >
                  <p className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                    {p.name}
                  </p>
                  <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">{p.tag}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
            <span className="flex-shrink mx-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Or sign in with credentials
            </span>
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
          </div>

          {/* Credential Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegistering && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Lin"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                University or Personal Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="name@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {isRegistering && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  College / High School Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pacific State University"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center space-x-2"
            >
              <span>{isRegistering ? 'Create Student Account' : 'Sign In to Match Compass'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Guest / Direct Explorer Mode */}
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={onGuestAccess}
              className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Explore Grantly as Guest (No Sign-In Required) →
            </button>
          </div>

          {/* Privacy & FERPA Badge */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center space-x-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>FERPA-Compliant 256-Bit Financial Privacy Protection</span>
          </div>

        </div>
      </div>
    </div>
  );
}
