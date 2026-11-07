// Initial Student Profile for GRANTLY
export const INITIAL_STUDENT_PROFILE = {
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
  householdIncomeTier: 'pell_eligible', // 'low', 'pell_eligible', 'moderate', 'high'
  stateOfResidence: 'California',
  citizenshipStatus: 'US Citizen',
  careerGoal: 'Artificial Intelligence & Ethical Healthcare Systems',
  communityInvolvement: 'Girls Who Code Mentor, Campus Food Pantry Volunteer',
  totalFundingGoal: 32000, // Total estimated annual college cost (Tuition + Housing + Supplies)
  institutionalAid: 12000, // University scholarship & grant
  federalPellGrant: 7395, // Max federal Pell grant
  studentWorkStudy: 3500, // Campus work-study
  personalSavings: 2000,
  // Remaining gap is 32000 - (12000 + 7395 + 3500 + 2000) = 7,105 without outside scholarships!
};

export const INITIAL_VAULT_DOCUMENTS = [
  {
    id: 'doc-1',
    name: 'Personal Statement - Walking New Pathways (First-Gen)',
    type: 'essay',
    wordCount: 520,
    updatedAt: '2026-11-04',
    status: 'Ready',
    content: `Growing up in an immigrant household where neither parent had the opportunity to complete high school, higher education was both an elusive summit and an unspoken obligation. My father worked twelve-hour shifts at a distribution warehouse, while my mother managed residential sanitation. Every evening, around our kitchen table, they reminded me that education is the one asset that economic volatility can never confiscate.

When I first stepped onto Pacific State University's campus as a Computer Science major, imposter syndrome was visceral. In introductory algorithms, peers discussed robotics camps and high school venture internships while I balanced course loads with twenty hours of campus work-study. Yet, I soon recognized that resilience is an engineering virtue: debugging complex code requires the exact patience and iterative grit that watching my parents rebuild their lives taught me.

Today, I channel this heritage into mentorship. As a lead student coordinator for Girls Who Code, I facilitate weekly workshops for high schoolers from underserved districts across our county, demonstrating that computational technology should reflect the diversity of the world it claims to serve. Receiving educational assistance is more than financial relief—it is an affirmation that voices like mine belong at the decision-making tables of tomorrow's digital infrastructure.`
  },
  {
    id: 'doc-2',
    name: 'Official Academic Transcript (Fall 2024 - Spring 2026)',
    type: 'transcript',
    fileSize: '1.4 MB',
    updatedAt: '2026-10-15',
    status: 'Verified (GPA 3.82)',
    notes: 'Includes Dean\'s Honors List for 3 consecutive terms.'
  },
  {
    id: 'doc-3',
    name: 'Academic CV / Resume (Tech & Community Outreach)',
    type: 'resume',
    fileSize: '420 KB',
    updatedAt: '2026-11-01',
    status: 'Ready',
    notes: 'Highlights hackathon 1st place, GitHub repositories, and campus leadership.'
  },
  {
    id: 'doc-4',
    name: 'FAFSA Student Aid Report (SAR 2026-2027)',
    type: 'financial',
    fileSize: '890 KB',
    updatedAt: '2026-09-30',
    status: 'Verified',
    notes: 'Student Aid Index (SAI): -1500 (Max need eligibility).'
  },
  {
    id: 'doc-5',
    name: 'Recommendation Letter - Dr. Marcus Miller (CS Department)',
    type: 'lor',
    recommender: 'Dr. Marcus Miller, Associate Professor of AI Ethics',
    updatedAt: '2026-11-03',
    status: 'Requested',
    notes: 'Followed up on Monday; promised delivery by Nov 15 for NextGen fellowship.'
  }
];
