import React, { useState, useEffect } from 'react';
import { 
  X, 
  User, 
  Sparkles, 
  CheckCircle2, 
  Save
} from 'lucide-react';
import { StudentProfile } from '../types';
import { clampGpa, sanitizeText } from '../utils/security';

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: StudentProfile;
  onSaveProfile: (profile: StudentProfile) => void;
}

interface PersonaPreset {
  name: string;
  role: string;
  desc: string;
  profile: StudentProfile;
}

const PRESET_ARCHETYPES: PersonaPreset[] = [
  {
    name: 'Maya Lin',
    role: '2nd Year CS & Bioethics',
    desc: 'First-Gen Undergrad, Pell-Eligible, 3.82 GPA',
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
      stateOfResidence: 'California',
      citizenshipStatus: 'US Citizen',
      careerGoal: 'Artificial Intelligence & Ethical Healthcare Systems',
      communityInvolvement: 'Girls Who Code Mentor, Campus Food Pantry Volunteer',
      totalFundingGoal: 32000,
      institutionalAid: 12000,
      federalPellGrant: 7395,
      studentWorkStudy: 3500,
      personalSavings: 2000,
    }
  },
  {
    name: 'Carlos Gomez',
    role: 'Senior Pre-Med & Public Health',
    desc: 'First-Gen, Clinical Volunteer, 3.45 GPA',
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
      stateOfResidence: 'Texas',
      citizenshipStatus: 'US Citizen',
      careerGoal: 'Community Clinic Family Nurse Practitioner',
      communityInvolvement: 'Free Clinic EMT, Spanish Medical Interpreter',
      totalFundingGoal: 28000,
      institutionalAid: 9000,
      federalPellGrant: 0,
      studentWorkStudy: 3000,
      personalSavings: 1500,
    }
  },
  {
    name: 'Priya Sharma',
    role: 'High School Senior (Incoming STEM)',
    desc: 'Presidential Merit Scholar, 4.0 GPA, Research Fellow',
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
      stateOfResidence: 'New York',
      citizenshipStatus: 'US Citizen',
      careerGoal: 'Clean Energy & Nanotechnology Research',
      communityInvolvement: 'Solar Car Team Captain, Science Olympiad Coach',
      totalFundingGoal: 45000,
      institutionalAid: 20000,
      federalPellGrant: 0,
      studentWorkStudy: 2500,
      personalSavings: 3000,
    }
  }
];

export default function StudentProfileModal({ 
  isOpen, 
  onClose, 
  currentProfile, 
  onSaveProfile 
}: StudentProfileModalProps): JSX.Element | null {
  const [formData, setFormData] = useState<StudentProfile>({ ...currentProfile });
  const [activeArchetype, setActiveArchetype] = useState<string | null>(null);

  useEffect(() => {
    setFormData({ ...currentProfile });
  }, [currentProfile]);

  // Global Escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? checked 
        : name === 'gpa'
        ? clampGpa(Number(value))
        : (name.includes('Goal') || name.includes('Aid') || name.includes('Grant') || name.includes('Study') || name.includes('Savings'))
        ? Number(value)
        : sanitizeText(value)
    }));
    setActiveArchetype(null);
  };

  const handleSelectArchetype = (archetype: PersonaPreset) => {
    setFormData({ ...archetype.profile });
    setActiveArchetype(archetype.name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400" aria-hidden="true">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h1 id="profile-modal-title" className="text-xl font-bold text-slate-900 dark:text-white">
                Student Profile & Match Compass
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Grant matching and eligibility scores automatically adjust based on these criteria.
              </p>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
            aria-label="Close profile modal"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Quick Archetype Switcher */}
        <div className="my-5 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
              Quick Persona Switcher (Try different student profiles):
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {PRESET_ARCHETYPES.map((arch) => {
              const isSelected = activeArchetype === arch.name || formData.fullName === arch.name;
              return (
                <button
                  key={arch.name}
                  type="button"
                  onClick={() => handleSelectArchetype(arch)}
                  className={`text-left p-3 rounded-lg border text-xs transition-all focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none ${
                    isSelected
                      ? 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-500 ring-2 ring-emerald-500/20 text-emerald-900 dark:text-emerald-200'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-300'
                  }`}
                  aria-pressed={isSelected}
                >
                  <p className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                    {arch.name}
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />}
                  </p>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">{arch.role}</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">{arch.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="student-full-name" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <input
                id="student-full-name"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="student-academic-level" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Academic Level
              </label>
              <select
                id="student-academic-level"
                name="academicLevel"
                value={formData.academicLevel}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="High School Senior">High School Senior</option>
                <option value="Undergraduate">Undergraduate (College / Univ)</option>
                <option value="Graduate">Graduate / Master's / PhD</option>
                <option value="Vocational">Vocational / Trade School</option>
              </select>
            </div>

            <div>
              <label htmlFor="student-major" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Major / Intended Field
              </label>
              <input
                id="student-major"
                type="text"
                name="major"
                value={formData.major}
                onChange={handleChange}
                required
                placeholder="e.g. Computer Science, Nursing, English"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="student-gpa" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Cumulative GPA (4.0 Scale)
              </label>
              <input
                id="student-gpa"
                type="number"
                step="0.01"
                min="1.0"
                max="4.0"
                name="gpa"
                value={formData.gpa}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="student-income-tier" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Household Financial Tier
              </label>
              <select
                id="student-income-tier"
                name="householdIncomeTier"
                value={formData.householdIncomeTier}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="pell_eligible">Pell Grant Eligible (Under $35k)</option>
                <option value="low">Low Income ($35k - $60k)</option>
                <option value="moderate">Moderate Income ($60k - $100k)</option>
                <option value="high">Higher Income ($100k+)</option>
              </select>
            </div>

            <div>
              <label htmlFor="student-funding-goal" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Annual Cost of Attendance Goal ($)
              </label>
              <input
                id="student-funding-goal"
                type="number"
                step="500"
                name="totalFundingGoal"
                value={formData.totalFundingGoal}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Checkboxes */}
          <div className="pt-2 flex flex-wrap gap-4">
            <label className="flex items-center space-x-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                name="isFirstGen"
                checked={formData.isFirstGen}
                onChange={handleChange}
                className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
              />
              <span>First-Generation College Student (Parents didn't complete 4-yr college)</span>
            </label>

            <label className="flex items-center space-x-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                name="isPellEligible"
                checked={formData.isPellEligible}
                onChange={handleChange}
                className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
              />
              <span>Pell Grant Recipient / Maximum Need Demonstrated</span>
            </label>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-lg shadow-md shadow-emerald-500/20 transition-all focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
            >
              <Save className="w-4 h-4" aria-hidden="true" />
              <span>Update Profile & Re-calculate Matches</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
