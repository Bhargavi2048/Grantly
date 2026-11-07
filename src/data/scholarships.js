// Curated comprehensive database of educational grants, fellowships, and scholarships for GRANTLY
// Reference Date: November 2026

export const SCHOLARSHIPS_DATA = [
  {
    id: 'sch-tech-01',
    title: 'NextGen Innovators in Computing & AI Fellowship',
    organization: 'Turing Frontier Foundation',
    amount: 15000,
    isRenewable: true,
    renewableDuration: 'Up to 3 years ($45,000 max)',
    category: 'STEM & Technology',
    deadline: '2026-11-28',
    requirements: {
      minGpa: 3.2,
      academicLevels: ['Undergraduate', 'Graduate'],
      eligibleMajors: ['Computer Science', 'Software Engineering', 'Data Science', 'Artificial Intelligence', 'Electrical Engineering'],
      demographics: ['All Applicants', 'Underrepresented in Tech encouraged'],
      residency: 'US Citizens, Permanent Residents, & DACA',
      financialNeedRequired: false
    },
    effortLevel: 'Moderate (1 Essay)',
    estimatedHours: 3.5,
    historicalAwardRate: '14% acceptance',
    requiredItems: [
      { id: 'req-1', name: 'Statement of Purpose (AI Ethics & Impact)', type: 'essay', completed: true },
      { id: 'req-2', name: 'Official or Unofficial Transcript', type: 'transcript', completed: true },
      { id: 'req-3', name: 'Technical Project Portfolio or GitHub link', type: 'resume', completed: false },
      { id: 'req-4', name: '1 Academic Recommendation Letter', type: 'lor', completed: false }
    ],
    essayPrompts: [
      {
        id: 'ep-tech-1',
        title: 'Technology for Humane Progress',
        prompt: 'Describe a computational project, algorithm, or research endeavor you have undertaken or envision that directly mitigates a real-world humanitarian or societal problem. How will this fellowship accelerate your roadmap?',
        wordLimit: 650,
        keyThemes: ['Societal Impact', 'Technical Rigor', 'Ethical Consideration', 'Long-term Vision']
      }
    ],
    description: 'Empowering undergraduate and early graduate students pioneering human-centric artificial intelligence, scalable software systems, and data-driven equity.',
    tags: ['STEM', 'Renewable', 'AI & Tech', 'High Value'],
    featured: true,
    status: 'in_progress', // bookmarked / in_progress / ready_to_submit / submitted / awarded / unapplied
    applicationStage: 'Drafting Essays',
    notes: 'Drafted 420 words of the essay. Waiting on Prof. Miller for LOR.'
  },
  {
    id: 'sch-firstgen-02',
    title: 'First-Gen Trailblazers National Opportunity Grant',
    organization: 'Ascend Education Trust',
    amount: 10000,
    isRenewable: true,
    renewableDuration: '2 years ($20,000 total)',
    category: 'First-Gen & Need-Based',
    deadline: '2026-12-05',
    requirements: {
      minGpa: 2.8,
      academicLevels: ['High School Senior', 'Undergraduate'],
      eligibleMajors: ['All Majors'],
      demographics: ['First-Generation College Student'],
      residency: 'US Resident or Undocumented Student',
      financialNeedRequired: true
    },
    effortLevel: 'Moderate (1 Essay)',
    estimatedHours: 2.5,
    historicalAwardRate: '22% acceptance',
    requiredItems: [
      { id: 'req-fg-1', name: 'Personal Resilience Narrative', type: 'essay', completed: true },
      { id: 'req-fg-2', name: 'FAFSA SAR or State Aid Report', type: 'fafsa', completed: true },
      { id: 'req-fg-3', name: 'Verification of First-Gen Status', type: 'short_answer', completed: true }
    ],
    essayPrompts: [
      {
        id: 'ep-fg-1',
        title: 'Walking New Pathways',
        prompt: 'As a first-generation college student, how has your family journey and background shaped your ambition, work ethic, and definition of success? What advice would you give to the generation following you?',
        wordLimit: 500,
        keyThemes: ['First-Gen Pride', 'Resilience', 'Family Heritage', 'Community Leadership']
      }
    ],
    description: 'Created specifically for students whose parents did not graduate from a 4-year university. Provides tuition support plus an executive 1-on-1 industry mentor.',
    tags: ['First-Gen', 'Need-Based', 'Mentorship Included', 'High Acceptance'],
    featured: true,
    status: 'ready_to_submit',
    applicationStage: 'Final Review',
    notes: 'Essay polished and reviewed by campus writing center. Ready for submission button.'
  },
  {
    id: 'sch-women-stem-03',
    title: 'Ada Lovelace Women in Engineering & Biotech Award',
    organization: 'Grace Hopper Collaborative',
    amount: 12500,
    isRenewable: false,
    renewableDuration: 'Single academic year',
    category: 'STEM & Technology',
    deadline: '2026-12-12',
    requirements: {
      minGpa: 3.3,
      academicLevels: ['Undergraduate'],
      eligibleMajors: ['Computer Science', 'Bioengineering', 'Biotechnology', 'Mechanical Engineering', 'Mathematics'],
      demographics: ['Female / Non-Binary in STEM'],
      residency: 'Global / International Eligible',
      financialNeedRequired: false
    },
    effortLevel: 'Moderate (1 Essay)',
    estimatedHours: 3.0,
    historicalAwardRate: '18% acceptance',
    requiredItems: [
      { id: 'req-al-1', name: 'Engineering Leadership Essay', type: 'essay', completed: false },
      { id: 'req-al-2', name: 'Academic Transcripts', type: 'transcript', completed: true },
      { id: 'req-al-3', name: 'Resume highlighting STEM outreach/clubs', type: 'resume', completed: true }
    ],
    essayPrompts: [
      {
        id: 'ep-al-1',
        title: 'Breaking Structural Glass Ceilings',
        prompt: 'Describe a moment you confronted a gender disparity or systemic hurdle in STEM, how you responded, and how you mentor or uplift peers in your engineering community.',
        wordLimit: 600,
        keyThemes: ['Leadership', 'Equity in STEM', 'Mentorship', 'Technical Ambition']
      }
    ],
    description: 'Supporting women and non-binary students pursuing undergraduate degrees in high-growth STEM disciplines, with full sponsorship to attend the 2027 GHC Conference.',
    tags: ['Women in STEM', 'Conference Sponsorship', 'Global Eligible'],
    featured: true,
    status: 'bookmarked',
    applicationStage: 'Gathering Documents',
    notes: 'Need to write essay draft focusing on girls coding club mentoring.'
  },
  {
    id: 'sch-pell-04',
    title: 'Pell Bridge Completion Fellowship',
    organization: 'Horizon Opportunity Alliance',
    amount: 6000,
    isRenewable: true,
    renewableDuration: '2 years ($12,000 total)',
    category: 'First-Gen & Need-Based',
    deadline: '2026-11-20',
    requirements: {
      minGpa: 2.5,
      academicLevels: ['Undergraduate'],
      eligibleMajors: ['All Majors'],
      demographics: ['Pell Grant Recipient'],
      residency: 'US Citizens & Permanent Residents',
      financialNeedRequired: true
    },
    effortLevel: 'Quick (No Essay)',
    estimatedHours: 1.0,
    historicalAwardRate: '38% acceptance',
    requiredItems: [
      { id: 'req-pb-1', name: 'FAFSA Confirmation / Pell Grant verification', type: 'fafsa', completed: true },
      { id: 'req-pb-2', name: 'Course Schedule & Degree Audit', type: 'transcript', completed: true }
    ],
    essayPrompts: [],
    description: 'Zero-essay micro-fellowship for current Pell Grant recipients facing graduation funding cliffs. Designed for swift, non-bureaucratic emergency relief.',
    tags: ['Pell Eligible', 'No Essay', 'Urgent Deadline', 'Fast Review'],
    featured: false,
    status: 'submitted',
    applicationStage: 'Under Committee Review',
    notes: 'Submitted on Nov 2. Decision expected by Dec 1st.'
  },
  {
    id: 'sch-health-05',
    title: 'Florence Nightingale Healthcare & Community Nursing Grant',
    organization: 'Global Health Equity Trust',
    amount: 8500,
    isRenewable: false,
    renewableDuration: 'Single award',
    category: 'Healthcare & Nursing',
    deadline: '2026-12-20',
    requirements: {
      minGpa: 3.0,
      academicLevels: ['Undergraduate', 'Graduate'],
      eligibleMajors: ['Nursing', 'Public Health', 'Pre-Med', 'Health Administration', 'Biomedical Sciences'],
      demographics: ['All Applicants', 'Rural / Underserved Clinic focus preferred'],
      residency: 'US or Canada Resident',
      financialNeedRequired: false
    },
    effortLevel: 'Moderate (1 Essay)',
    estimatedHours: 3.0,
    historicalAwardRate: '24% acceptance',
    requiredItems: [
      { id: 'req-fn-1', name: 'Clinical Service Philosophy Essay', type: 'essay', completed: false },
      { id: 'req-fn-2', name: 'Clinical or Volunteer Hours Log (50+ hrs)', type: 'resume', completed: false },
      { id: 'req-fn-3', name: 'Clinical Supervisor Reference', type: 'lor', completed: false }
    ],
    essayPrompts: [
      {
        id: 'ep-fn-1',
        title: 'Compassion at the Bedside',
        prompt: 'Share a transformative clinical or caregiving interaction that reaffirmed your commitment to patient-centered healthcare in underserved or resource-constrained communities.',
        wordLimit: 550,
        keyThemes: ['Patient Advocacy', 'Health Disparities', 'Empathy', 'Public Health']
      }
    ],
    description: 'Providing direct financial assistance for aspiring nurses and public health specialists committed to addressing healthcare deserts and rural clinical shortages.',
    tags: ['Healthcare', 'Nursing', 'Public Health', 'Clinical'],
    featured: false,
    status: 'unapplied',
    applicationStage: 'Not Started',
    notes: ''
  },
  {
    id: 'sch-climate-06',
    title: 'Planetary Solutions & Climate Resilience Scholarship',
    organization: 'EarthForward Initiative',
    amount: 7500,
    isRenewable: false,
    renewableDuration: 'Single award',
    category: 'STEM & Technology',
    deadline: '2027-01-15',
    requirements: {
      minGpa: 3.0,
      academicLevels: ['Undergraduate', 'Graduate'],
      eligibleMajors: ['Environmental Science', 'Renewable Energy Engineering', 'Ecology', 'Urban Planning', 'Public Policy', 'Biology'],
      demographics: ['All Applicants'],
      residency: 'Global',
      financialNeedRequired: false
    },
    effortLevel: 'Moderate (1 Essay)',
    estimatedHours: 2.5,
    historicalAwardRate: '19% acceptance',
    requiredItems: [
      { id: 'req-ps-1', name: 'Sustainability Action Plan Pitch', type: 'essay', completed: false },
      { id: 'req-ps-2', name: 'Unofficial Transcripts', type: 'transcript', completed: false }
    ],
    essayPrompts: [
      {
        id: 'ep-ps-1',
        title: 'Local Climate Mitigation',
        prompt: 'Propose an actionable, hyper-local climate adaptation or waste-reduction intervention suitable for your university campus or hometown municipality.',
        wordLimit: 500,
        keyThemes: ['Environmental Impact', 'Feasibility', 'Innovation', 'Community Buy-In']
      }
    ],
    description: 'Supporting students dedicated to carbon neutrality, clean energy transitions, biodiversity conservation, and environmental justice.',
    tags: ['Sustainability', 'Renewable Energy', 'Climate', 'Global'],
    featured: false,
    status: 'unapplied',
    applicationStage: 'Not Started',
    notes: ''
  },
  {
    id: 'sch-arts-07',
    title: 'Voices of Tomorrow Creative Writing & Journalism Fellowship',
    organization: 'Pen & Pulse Literary Trust',
    amount: 5000,
    isRenewable: false,
    renewableDuration: 'Single award',
    category: 'Arts & Humanities',
    deadline: '2026-12-30',
    requirements: {
      minGpa: 2.7,
      academicLevels: ['Undergraduate', 'Graduate'],
      eligibleMajors: ['English', 'Journalism', 'Communications', 'Creative Writing', 'Media Studies', 'History'],
      demographics: ['All Applicants'],
      residency: 'Global',
      financialNeedRequired: false
    },
    effortLevel: 'Comprehensive (2 Essays + Portfolio)',
    estimatedHours: 5.0,
    historicalAwardRate: '11% acceptance',
    requiredItems: [
      { id: 'req-vo-1', name: 'Original Prose or Investigative Essay', type: 'essay', completed: false },
      { id: 'req-vo-2', name: 'Portfolio of 3 Published Works / Clippings', type: 'resume', completed: false },
      { id: 'req-vo-3', name: 'Personal Artist Statement', type: 'essay', completed: false }
    ],
    essayPrompts: [
      {
        id: 'ep-vo-1',
        title: 'Truth in the Age of Noise',
        prompt: 'How can ethical storytelling and investigative journalism combat disinformation while amplifying historically unheard voices in your region?',
        wordLimit: 750,
        keyThemes: ['Investigative Rigor', 'Media Ethics', 'Storytelling', 'Cultural Voice']
      }
    ],
    description: 'For aspiring investigative journalists, essayists, and narrative storytellers committed to fearless accountability and cultural resonance.',
    tags: ['Journalism', 'Creative Arts', 'Writing', 'Portfolio'],
    featured: false,
    status: 'unapplied',
    applicationStage: 'Not Started',
    notes: ''
  },
  {
    id: 'sch-biz-08',
    title: 'Vanguard Ethical Entrepreneurship & Leadership Award',
    organization: 'Impact Capital Forum',
    amount: 10000,
    isRenewable: true,
    renewableDuration: '2 years ($20,000 total)',
    category: 'Business & Leadership',
    deadline: '2027-01-20',
    requirements: {
      minGpa: 3.1,
      academicLevels: ['Undergraduate', 'Graduate'],
      eligibleMajors: ['Business Administration', 'Finance', 'Economics', 'Marketing', 'Entrepreneurship'],
      demographics: ['All Applicants'],
      residency: 'US Citizens & International Students',
      financialNeedRequired: false
    },
    effortLevel: 'Moderate (1 Essay)',
    estimatedHours: 3.5,
    historicalAwardRate: '16% acceptance',
    requiredItems: [
      { id: 'req-vg-1', name: 'Business Model Canvas & Executive Summary', type: 'essay', completed: false },
      { id: 'req-vg-2', name: 'Resume highlighting founder/leadership roles', type: 'resume', completed: false },
      { id: 'req-vg-3', name: '1 Mentor Recommendation', type: 'lor', completed: false }
    ],
    essayPrompts: [
      {
        id: 'ep-vg-1',
        title: 'Profit with Principled Purpose',
        prompt: 'Detail an ethical venture or organizational initiative you launched or co-founded. How do you balance financial sustainability with positive stakeholder impact?',
        wordLimit: 600,
        keyThemes: ['ESG / Social Impact', 'Business Acumen', 'Leadership Integrity', 'Scalability']
      }
    ],
    description: 'Recognizing student founders and business leaders building ventures that prioritize fair wages, sustainable supply chains, and transparent governance.',
    tags: ['Business', 'Entrepreneurship', 'Leadership', 'Renewable'],
    featured: false,
    status: 'unapplied',
    applicationStage: 'Not Started',
    notes: ''
  },
  {
    id: 'sch-micro-09',
    title: 'Campus Food Security & Textbook Micro-Grant',
    organization: 'Open Access Student Foundation',
    amount: 1500,
    isRenewable: false,
    renewableDuration: 'Disbursed in 48 hours',
    category: 'First-Gen & Need-Based',
    deadline: '2026-11-18',
    requirements: {
      minGpa: 2.0,
      academicLevels: ['Undergraduate', 'Graduate', 'Vocational'],
      eligibleMajors: ['All Majors'],
      demographics: ['Enrolled College Student in Need'],
      residency: 'All Enrolled Students',
      financialNeedRequired: true
    },
    effortLevel: 'Quick (No Essay)',
    estimatedHours: 0.5,
    historicalAwardRate: '65% acceptance',
    requiredItems: [
      { id: 'req-mg-1', name: 'Course Syllabus / Textbook Receipt Proof', type: 'short_answer', completed: true },
      { id: 'req-mg-2', name: 'Proof of Enrollment (Student ID / Schedule)', type: 'transcript', completed: true }
    ],
    essayPrompts: [],
    description: 'Emergency, fast-turnaround stipend to cover course materials, laboratory access codes, or nutritional support during midterm and exam season.',
    tags: ['Emergency Aid', 'No Essay', 'Micro-Grant', 'High Acceptance', '48hr Decision'],
    featured: true,
    status: 'awarded',
    applicationStage: 'Awarded & Disbursed',
    notes: 'Received $1,500 direct deposit to campus account for lab fees!'
  },
  {
    id: 'sch-diversity-10',
    title: 'Latinx Academic Excellence & Civic Empowerment Grant',
    organization: 'Alianza por la Educación Superior',
    amount: 8000,
    isRenewable: true,
    renewableDuration: 'Up to 2 years ($16,000 max)',
    category: 'Diversity & Inclusion',
    deadline: '2026-12-18',
    requirements: {
      minGpa: 3.0,
      academicLevels: ['High School Senior', 'Undergraduate'],
      eligibleMajors: ['All Majors'],
      demographics: ['Hispanic / Latino / Latina / Latinx Heritage'],
      residency: 'US Citizens, Legal Residents, & DACA',
      financialNeedRequired: true
    },
    effortLevel: 'Moderate (1 Essay)',
    estimatedHours: 2.5,
    historicalAwardRate: '21% acceptance',
    requiredItems: [
      { id: 'req-lx-1', name: 'Civic Engagement Essay', type: 'essay', completed: false },
      { id: 'req-lx-2', name: 'High School or College Transcript', type: 'transcript', completed: true },
      { id: 'req-lx-3', name: '1 Letter of Recommendation from community organizer/teacher', type: 'lor', completed: false }
    ],
    essayPrompts: [
      {
        id: 'ep-lx-1',
        title: 'Community Roots and Global Wings',
        prompt: 'Share how your cultural heritage drives your academic journey, and what civic initiatives you have organized to support Spanish-speaking or immigrant communities.',
        wordLimit: 500,
        keyThemes: ['Cultural Heritage', 'Bilingual Outreach', 'Community Advocacy', 'Academic Goals']
      }
    ],
    description: 'Empowering Hispanic and Latinx students with financial aid, cohort networking, and bi-monthly leadership masterclasses.',
    tags: ['Diversity', 'Latinx', 'Community Service', 'Renewable'],
    featured: false,
    status: 'bookmarked',
    applicationStage: 'Bookmarked',
    notes: 'High match due to community volunteering history.'
  },
  {
    id: 'sch-veteran-11',
    title: 'Patriot STEM Bridge for Veterans & Military Families',
    organization: 'Valor & Knowledge Foundation',
    amount: 11000,
    isRenewable: false,
    renewableDuration: 'Single academic year',
    category: 'General Merit',
    deadline: '2027-01-05',
    requirements: {
      minGpa: 2.8,
      academicLevels: ['Undergraduate', 'Graduate'],
      eligibleMajors: ['Cybersecurity', 'Mechanical Engineering', 'Aviation', 'Data Science', 'Nursing'],
      demographics: ['Active Duty, Veteran, or Military Dependent/Spouse'],
      residency: 'US Citizens & Residents',
      financialNeedRequired: false
    },
    effortLevel: 'Moderate (1 Essay)',
    estimatedHours: 2.0,
    historicalAwardRate: '29% acceptance',
    requiredItems: [
      { id: 'req-vet-1', name: 'Transition & Mission Essay', type: 'essay', completed: false },
      { id: 'req-vet-2', name: 'DD-214 or Military Dependent Verification', type: 'short_answer', completed: false },
      { id: 'req-vet-3', name: 'Transcripts', type: 'transcript', completed: false }
    ],
    essayPrompts: [
      {
        id: 'ep-vet-1',
        title: 'Translating Service into Innovation',
        prompt: 'How has military discipline, camaraderie, or sacrifice prepared you to lead in scientific discovery and national infrastructure resilience?',
        wordLimit: 500,
        keyThemes: ['Service Leadership', 'Resilience', 'Teamwork', 'Mission Focus']
      }
    ],
    description: 'Supplementing the GI Bill with flexible stipends for books, software licenses, lab supplies, and family childcare assistance.',
    tags: ['Military & Veterans', 'Cybersecurity', 'High Acceptance', 'STEM'],
    featured: false,
    status: 'unapplied',
    applicationStage: 'Not Started',
    notes: ''
  },
  {
    id: 'sch-merit-12',
    title: 'National Collegiate Honors Presidential Fellowship',
    organization: 'American Academic Honors Council',
    amount: 25000,
    isRenewable: true,
    renewableDuration: '4 years ($100,000 maximum)',
    category: 'General Merit',
    deadline: '2026-12-01',
    requirements: {
      minGpa: 3.8,
      academicLevels: ['High School Senior', 'Undergraduate (1st/2nd yr)'],
      eligibleMajors: ['All Majors'],
      demographics: ['All Applicants'],
      residency: 'US Citizens & Permanent Residents',
      financialNeedRequired: false
    },
    effortLevel: 'Comprehensive (2 Essays + LOR)',
    estimatedHours: 6.5,
    historicalAwardRate: '4.8% acceptance',
    requiredItems: [
      { id: 'req-nh-1', name: 'Intellectual Curiosity Thesis Statement', type: 'essay', completed: true },
      { id: 'req-nh-2', name: 'Leadership & Moral Courage Essay', type: 'essay', completed: false },
      { id: 'req-nh-3', name: 'Official Sealed Transcripts', type: 'transcript', completed: true },
      { id: 'req-nh-4', name: '2 Academic Faculty Recommendations', type: 'lor', completed: false }
    ],
    essayPrompts: [
      {
        id: 'ep-nh-1',
        title: 'Intellectual Passion',
        prompt: 'Discuss an unresolved question in science, philosophy, or sociology that you obsess over. What novel angle would you bring to exploring it?',
        wordLimit: 750,
        keyThemes: ['Scholarly Rigor', 'Original Thinking', 'Intellectual Curiosity']
      },
      {
        id: 'ep-nh-2',
        title: 'Moral Courage',
        prompt: 'Describe a situation where doing the right thing required you to stand against the consensus of peers or authority. What was at stake?',
        wordLimit: 500,
        keyThemes: ['Integrity', 'Leadership', 'Ethics', 'Courage']
      }
    ],
    description: 'One of the nation\'s most prestigious merit fellowships. Full tuition plus $5,000 annual research/travel grant.',
    tags: ['Prestige', 'High Value', '$25k/yr', 'Renewable', 'Research Grant'],
    featured: true,
    status: 'in_progress',
    applicationStage: 'Writing Essay 2',
    notes: 'Essay 1 draft is 710 words. Need to draft Moral Courage essay before Dec 1!'
  }
];

// Helper to compute match score based on user profile
export function calculateMatchScore(scholarship, profile) {
  let score = 50; // base score
  const reasons = [];
  const missing = [];

  // GPA matching
  if (scholarship.requirements.minGpa) {
    if (profile.gpa >= scholarship.requirements.minGpa) {
      score += 15;
      reasons.push(`GPA (${profile.gpa}) exceeds requirement of ${scholarship.requirements.minGpa}`);
    } else {
      score -= 25;
      missing.push(`GPA is ${profile.gpa}, scholarship asks for ${scholarship.requirements.minGpa}+`);
    }
  } else {
    score += 5;
    reasons.push('No minimum GPA restriction');
  }

  // Major matching
  if (scholarship.requirements.eligibleMajors.includes('All Majors') || 
      scholarship.requirements.eligibleMajors.some(m => m.toLowerCase().includes(profile.major.toLowerCase()) || profile.major.toLowerCase().includes(m.toLowerCase()))) {
    score += 15;
    reasons.push(`Targeted for your field: ${profile.major}`);
  } else {
    score -= 15;
    missing.push(`Specific to: ${scholarship.requirements.eligibleMajors.slice(0, 3).join(', ')}`);
  }

  // Academic level matching
  if (scholarship.requirements.academicLevels.includes(profile.academicLevel) || 
      scholarship.requirements.academicLevels.includes('All Levels')) {
    score += 10;
    reasons.push(`Eligible for ${profile.academicLevel}`);
  } else {
    score -= 20;
    missing.push(`Requires level: ${scholarship.requirements.academicLevels.join(', ')}`);
  }

  // Demographics / First-Gen
  if (profile.isFirstGen && scholarship.requirements.demographics.some(d => d.includes('First-Gen'))) {
    score += 15;
    reasons.push('First-Generation match priority');
  }

  // Financial Need matching
  if (scholarship.requirements.financialNeedRequired) {
    if (profile.householdIncomeTier === 'low' || profile.householdIncomeTier === 'pell_eligible') {
      score += 10;
      reasons.push('High need-based eligibility fit');
    }
  }

  // Clamp score
  const finalScore = Math.max(15, Math.min(99, score));
  return {
    score: finalScore,
    reasons,
    missing,
    fitLabel: finalScore >= 85 ? 'Exceptional Match' : finalScore >= 70 ? 'Strong Match' : finalScore >= 50 ? 'Moderate Match' : 'Reach Opportunity'
  };
}
