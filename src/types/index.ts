// Type definitions for GRANTLY Educational Assistance Platform

export type AcademicLevel = 'High School Senior' | 'Undergraduate' | 'Graduate' | 'Vocational';

export type HouseholdIncomeTier = 'pell_eligible' | 'low' | 'moderate' | 'high';

export type EffortLevel = 
  | 'Quick (No Essay)' 
  | 'Moderate (1 Essay)' 
  | 'Moderate (Leadership Portfolio)' 
  | 'Moderate (Short Answers & Background)' 
  | 'Moderate (Organizing History Essay + Reference)' 
  | 'Comprehensive (2 Essays + LOR)' 
  | 'Comprehensive (Research Proposal + 3 LORs)' 
  | 'Comprehensive (Project Proposal + Rotary Interview)';

export type ScholarshipStatus = 
  | 'unapplied' 
  | 'bookmarked' 
  | 'in_progress' 
  | 'ready_to_submit' 
  | 'submitted' 
  | 'awarded' 
  | 'declined';

export type ItemType = 'essay' | 'lor' | 'transcript' | 'resume' | 'fafsa' | 'short_answer';

export interface RequiredItem {
  id: string;
  name: string;
  type: ItemType;
  completed: boolean;
}

export interface EssayPrompt {
  id: string;
  title: string;
  prompt: string;
  wordLimit: number;
  keyThemes: string[];
}

export interface ScholarshipRequirements {
  minGpa: number | null;
  academicLevels: string[];
  eligibleMajors: string[];
  demographics: string[];
  residency: string;
  financialNeedRequired: boolean;
}

export interface Scholarship {
  id: string;
  title: string;
  organization: string;
  amount: number;
  isRenewable: boolean;
  renewableDuration: string;
  category: string;
  deadline: string;
  applicationUrl?: string;
  requirements: ScholarshipRequirements;
  effortLevel: EffortLevel;
  estimatedHours: number;
  historicalAwardRate: string;
  requiredItems: RequiredItem[];
  essayPrompts: EssayPrompt[];
  description: string;
  tags: string[];
  featured: boolean;
  status: ScholarshipStatus;
  applicationStage: string;
  notes?: string;
  computedMatchScore?: number;
  matchFit?: string;
}

export interface StudentProfile {
  fullName: string;
  email: string;
  academicLevel: AcademicLevel;
  yearOfStudy: string;
  institution: string;
  major: string;
  minor: string;
  gpa: number;
  isFirstGen: boolean;
  isPellEligible: boolean;
  householdIncomeTier: HouseholdIncomeTier;
  stateOfResidence: string;
  citizenshipStatus: string;
  careerGoal: string;
  communityInvolvement: string;
  totalFundingGoal: number;
  institutionalAid: number;
  federalPellGrant: number;
  studentWorkStudy: number;
  personalSavings: number;
}

export interface VaultDocument {
  id: string;
  name: string;
  type: 'essay' | 'transcript' | 'resume' | 'financial' | 'lor';
  updatedAt: string;
  status: string;
  wordCount?: number;
  fileSize?: string;
  content?: string;
  notes?: string;
  recommender?: string;
}

export interface MatchScoreResult {
  score: number;
  reasons: string[];
  missing: string[];
  fitLabel: string;
}

export interface AuthUser {
  name: string;
  email: string;
  institution: string;
}

export type TabType = 'explorer' | 'pipeline' | 'essay' | 'calculator' | 'vault';
