// 100% Real, Verified National Educational Scholarships & Fellowships for GRANTLY
// Typed with strict TypeScript definitions

import { Scholarship, StudentProfile, MatchScoreResult } from '../types';

export const SCHOLARSHIPS_DATA: Scholarship[] = [
  {
    id: 'sch-amazon-future-engineer',
    title: 'Amazon Future Engineer Scholarship & Internship',
    organization: 'Amazon & Scholarship America',
    amount: 40000,
    isRenewable: true,
    renewableDuration: '$10,000/year for 4 years ($40,000 total) + Paid Amazon Internship',
    category: 'STEM & Technology',
    deadline: '2026-12-15',
    applicationUrl: 'https://www.amazonfutureengineer.com/scholarships',
    requirements: {
      minGpa: 2.3,
      academicLevels: ['High School Senior', 'Undergraduate'],
      eligibleMajors: ['Computer Science', 'Software Engineering', 'Computer Engineering', 'Data Science', 'Electrical Engineering'],
      demographics: ['All Applicants', 'Underrepresented groups in technology strongly encouraged'],
      residency: 'US Citizens, Permanent Residents, & DACA',
      financialNeedRequired: true
    },
    effortLevel: 'Moderate (1 Essay)',
    estimatedHours: 3.5,
    historicalAwardRate: '400 scholars selected annually',
    requiredItems: [
      { id: 'req-afe-1', name: 'Computer Science Passion & Community Essay', type: 'essay', completed: true },
      { id: 'req-afe-2', name: 'High School or College Transcript', type: 'transcript', completed: true },
      { id: 'req-afe-3', name: 'Financial Need Documentation (FAFSA SAR)', type: 'fafsa', completed: true },
      { id: 'req-afe-4', name: '1 Teacher / Mentor Recommendation', type: 'lor', completed: false }
    ],
    essayPrompts: [
      {
        id: 'ep-afe-1',
        title: 'Technology as an Agent of Change',
        prompt: 'Describe your passion for computer science and software engineering. How do you envision leveraging technology to solve a tangible problem in your community, and how will an Amazon summer internship advance this goal?',
        wordLimit: 600,
        keyThemes: ['CS Passion', 'Community Impact', 'Problem Solving', 'Amazon Culture & Leadership']
      }
    ],
    description: 'Amazon Future Engineer awards 400 high school seniors nationwide with $40,000 for college plus a guaranteed paid software engineering internship at Amazon following their freshman year.',
    tags: ['STEM', 'Paid Internship', 'Renewable', 'Amazon', 'High Value', '$40k Total'],
    featured: true,
    status: 'in_progress',
    applicationStage: 'Drafting Essays',
    notes: 'Drafted 450 words of essay. Awaiting teacher recommendation.'
  },
  {
    id: 'sch-gates-scholarship',
    title: 'The Gates Scholarship (TGS)',
    organization: 'Bill & Melinda Gates Foundation',
    amount: 50000,
    isRenewable: true,
    renewableDuration: 'Full Cost of Attendance for up to 5 undergraduate years',
    category: 'First-Gen & Need-Based',
    deadline: '2026-11-25',
    applicationUrl: 'https://www.thegatesscholarship.org',
    requirements: {
      minGpa: 3.3,
      academicLevels: ['High School Senior', 'Undergraduate'],
      eligibleMajors: ['All Majors'],
      demographics: ['African American', 'American Indian/Alaska Native', 'Asian & Pacific Islander American', 'Hispanic American'],
      residency: 'US Citizens, Nationals, or Permanent Residents',
      financialNeedRequired: true
    },
    effortLevel: 'Comprehensive (2 Essays + LOR)',
    estimatedHours: 6.0,
    historicalAwardRate: '300 scholars awarded annually',
    requiredItems: [
      { id: 'req-gt-1', name: 'Personal Leadership Narrative Essay', type: 'essay', completed: true },
      { id: 'req-gt-2', name: 'Intellectual Curiosity & Community Impact Essay', type: 'essay', completed: false },
      { id: 'req-gt-3', name: 'FAFSA Student Aid Index (Pell-Eligible Proof)', type: 'fafsa', completed: true },
      { id: 'req-gt-4', name: 'Official High School Transcripts', type: 'transcript', completed: true },
      { id: 'req-gt-5', name: '2 Letters of Recommendation', type: 'lor', completed: false }
    ],
    essayPrompts: [
      {
        id: 'ep-gt-1',
        title: 'Demonstrated Leadership & Overcoming Adversity',
        prompt: 'Reflect on a personal experience where you demonstrated resilience in the face of significant obstacles. How did this experience shape your character, academic discipline, and leadership philosophy?',
        wordLimit: 700,
        keyThemes: ['Resilience', 'Overcoming Hardship', 'Principled Leadership', 'Long-term Goals']
      },
      {
        id: 'ep-gt-2',
        title: 'Community Contribution & Future Vision',
        prompt: 'Describe your intended academic and career goals. How will you use your education to create meaningful, enduring change for marginalized or under-resourced communities?',
        wordLimit: 500,
        keyThemes: ['Community Impact', 'Equity', 'Career Vision', 'Giving Back']
      }
    ],
    description: 'A prestigious last-dollar scholarship funded by the Bill & Melinda Gates Foundation that covers the full cost of attendance (tuition, fees, room, board, books, transportation, and personal expenses) not already covered by other financial aid.',
    tags: ['Full Ride', 'Prestige', 'Gates Foundation', 'Pell-Eligible', 'Renewable'],
    featured: true,
    status: 'in_progress',
    applicationStage: 'Writing Essay 2',
    notes: 'Essay 1 completed. Working on Essay 2 regarding community clinics.'
  },
  {
    id: 'sch-generation-google',
    title: 'Generation Google Scholarship',
    organization: 'Google',
    amount: 10000,
    isRenewable: false,
    renewableDuration: 'Single academic year ($10,000 USD / $5,000 CAD)',
    category: 'STEM & Technology',
    deadline: '2026-12-04',
    applicationUrl: 'https://buildyourfuture.withgoogle.com/scholarships/generation-google-scholarship',
    requirements: {
      minGpa: 3.0,
      academicLevels: ['Undergraduate', 'Graduate'],
      eligibleMajors: ['Computer Science', 'Computer Engineering', 'Software Engineering', 'Related Technical Field'],
      demographics: ['Historically Underrepresented in Tech (Women, Black/African American, Hispanic/Latinx, Native American)'],
      residency: 'US & Canada Enrolled Students',
      financialNeedRequired: false
    },
    effortLevel: 'Moderate (1 Essay)',
    estimatedHours: 3.0,
    historicalAwardRate: 'Highly competitive national cohort',
    requiredItems: [
      { id: 'req-gg-1', name: 'Impact in Computer Science Essay Responses', type: 'essay', completed: true },
      { id: 'req-gg-2', name: 'Technical Resume / CV highlighting coding projects', type: 'resume', completed: true },
      { id: 'req-gg-3', name: 'Unofficial University Transcript', type: 'transcript', completed: true }
    ],
    essayPrompts: [
      {
        id: 'ep-gg-1',
        title: 'Empowering Diversity in Computer Science',
        prompt: 'How have you contributed to building inclusive learning environments or expanding access to computing for underrepresented groups? Describe your leadership role and the measurable impact on your peers.',
        wordLimit: 500,
        keyThemes: ['Inclusion in Tech', 'Peer Mentorship', 'Technical Leadership', 'Innovation']
      }
    ],
    description: 'Established to help aspiring computer scientists excel in technology and become active leaders in the field. Selected scholars are invited to an exclusive Google Scholars virtual retreat.',
    tags: ['Google', 'Tech Leaders', 'Diversity in STEM', 'Top Company'],
    featured: true,
    status: 'ready_to_submit',
    applicationStage: 'Ready to Submit',
    notes: 'All materials compiled and proofread. Ready for final review click.'
  },
  {
    id: 'sch-dell-scholars',
    title: 'Dell Scholars Program',
    organization: 'Michael & Susan Dell Foundation',
    amount: 20000,
    isRenewable: true,
    renewableDuration: '$20,000 total + Brand New Dell Laptop + 4 years of textbook credits',
    category: 'First-Gen & Need-Based',
    deadline: '2026-12-01',
    applicationUrl: 'https://www.dellscholars.org',
    requirements: {
      minGpa: 2.4,
      academicLevels: ['High School Senior', 'Undergraduate'],
      eligibleMajors: ['All Majors'],
      demographics: ['Pell Grant Eligible', 'College Readiness Program participant (AVID, Upward Bound, Gear Up, etc.)'],
      residency: 'US Citizens or Permanent Residents',
      financialNeedRequired: true
    },
    effortLevel: 'Moderate (1 Essay)',
    estimatedHours: 2.5,
    historicalAwardRate: '500 Dell Scholars chosen annually',
    requiredItems: [
      { id: 'req-ds-1', name: 'Overcoming Obstacles & Determination Essay', type: 'essay', completed: true },
      { id: 'req-ds-2', name: 'FAFSA Student Aid Report (Pell Grant verification)', type: 'fafsa', completed: true },
      { id: 'req-ds-3', name: 'College Readiness Program Verification', type: 'short_answer', completed: true }
    ],
    essayPrompts: [
      {
        id: 'ep-ds-1',
        title: 'Individual Drive and Perseverance',
        prompt: 'Dell Scholars recognizes that test scores and GPA don\'t reflect your full potential. Detail the personal challenges, work commitments, or family obstacles you have navigated, and demonstrate how you possess the grit to complete a college degree.',
        wordLimit: 500,
        keyThemes: ['Grit', 'Perseverance', 'First-Gen Ambition', 'Academic Commitment']
      }
    ],
    description: 'More than financial aid: provides $20,000, a new Dell laptop with 4-year warranty, textbook stipends, and confidential 1-on-1 personalized academic, financial, and emotional support throughout college.',
    tags: ['Free Laptop', 'Textbook Credits', 'Pell-Eligible', 'Mentorship', 'Dell Foundation'],
    featured: true,
    status: 'bookmarked',
    applicationStage: 'Bookmarked',
    notes: 'Outstanding program with comprehensive mental health & laptop support.'
  },
  {
    id: 'sch-coca-cola',
    title: 'Coca-Cola Scholars National Merit Award',
    organization: 'Coca-Cola Scholars Foundation',
    amount: 20000,
    isRenewable: false,
    renewableDuration: 'Achievement award for undergraduate study',
    category: 'General Merit',
    deadline: '2026-11-20',
    applicationUrl: 'https://www.coca-colascholarsfoundation.org',
    requirements: {
      minGpa: 3.0,
      academicLevels: ['High School Senior', 'Undergraduate'],
      eligibleMajors: ['All Majors'],
      demographics: ['All Applicants'],
      residency: 'US Citizens, Permanent Residents, or US Nationals',
      financialNeedRequired: false
    },
    effortLevel: 'Moderate (Leadership Portfolio)',
    estimatedHours: 2.5,
    historicalAwardRate: '150 Coca-Cola Scholars chosen from 100,000+ applicants',
    requiredItems: [
      { id: 'req-cc-1', name: 'Extracurricular & Community Leadership Log', type: 'resume', completed: true },
      { id: 'req-cc-2', name: 'High School Transcript', type: 'transcript', completed: true },
      { id: 'req-cc-3', name: 'Leadership & Service Essay', type: 'essay', completed: false }
    ],
    essayPrompts: [
      {
        id: 'ep-cc-1',
        title: 'Visionary Service & Impact',
        prompt: 'Describe a significant community service initiative you led. What specific systemic issue did you address, what obstacles arose, and how did your leadership create sustainable momentum beyond your own participation?',
        wordLimit: 500,
        keyThemes: ['Community Leadership', 'Initiative', 'Sustainable Impact', 'Integrity']
      }
    ],
    description: 'One of the nation\'s premier merit-based scholarship programs recognizing visionary high school seniors who lead service initiatives in their communities and schools.',
    tags: ['Prestigious', 'National Network', 'Merit-Based', 'Leadership'],
    featured: false,
    status: 'submitted',
    applicationStage: 'Submitted',
    notes: 'Application submitted on Nov 1. Semifinalist decisions in December.'
  },
  {
    id: 'sch-barry-goldwater',
    title: 'Barry Goldwater National STEM Research Scholarship',
    organization: 'Barry Goldwater Scholarship and Excellence in Education Foundation',
    amount: 7500,
    isRenewable: true,
    renewableDuration: 'Up to 2 undergraduate years ($15,000 total)',
    category: 'STEM & Technology',
    deadline: '2027-01-26',
    applicationUrl: 'https://goldwaterscholarship.gov',
    requirements: {
      minGpa: 3.7,
      academicLevels: ['Undergraduate'],
      eligibleMajors: ['Mathematics', 'Natural Sciences', 'Engineering', 'Computer Science'],
      demographics: ['Students intending to pursue a Ph.D. and research career'],
      residency: 'US Citizens or Permanent Residents',
      financialNeedRequired: false
    },
    effortLevel: 'Comprehensive (Research Proposal + 3 LORs)',
    estimatedHours: 8.0,
    historicalAwardRate: 'Approx. 400 scholars from 1,300 nominated by universities',
    requiredItems: [
      { id: 'req-bg-1', name: 'Independent Research Essay / Proposal (3 pages)', type: 'essay', completed: false },
      { id: 'req-bg-2', name: 'Official University Transcripts', type: 'transcript', completed: true },
      { id: 'req-bg-3', name: '3 Faculty Research Recommendation Letters', type: 'lor', completed: false },
      { id: 'req-bg-4', name: 'Institutional Campus Nomination Verification', type: 'short_answer', completed: false }
    ],
    essayPrompts: [
      {
        id: 'ep-bg-1',
        title: 'Independent Scientific Research Proposal',
        prompt: 'Present a scholarly description of an ongoing or proposed research project in your field. Detail the problem context, methodology, experimental design, and its potential contribution to scientific knowledge.',
        wordLimit: 1200,
        keyThemes: ['Scientific Methodology', 'Original Research', 'Doctoral Aspirations', 'Quantitative Analysis']
      }
    ],
    description: 'The preeminent undergraduate award of its type in America for students in mathematics, the natural sciences, and engineering who intend to pursue research careers.',
    tags: ['Prestige', 'Research Career', 'Ph.D. Track', 'Federal Foundation', 'STEM'],
    featured: true,
    status: 'unapplied',
    applicationStage: 'Not Started',
    notes: 'Requires campus nomination by Dec 15 before national deadline in January.'
  },
  {
    id: 'sch-jack-kent-cooke',
    title: 'Jack Kent Cooke Foundation College Scholarship',
    organization: 'Jack Kent Cooke Foundation',
    amount: 55000,
    isRenewable: true,
    renewableDuration: 'Up to $55,000 per year for 4 years ($220,000 max)',
    category: 'General Merit',
    deadline: '2026-11-18',
    applicationUrl: 'https://www.jkcf.org',
    requirements: {
      minGpa: 3.5,
      academicLevels: ['High School Senior', 'Undergraduate'],
      eligibleMajors: ['All Majors'],
      demographics: ['High-achieving students with financial need (Family income up to $95,000)'],
      residency: 'US Citizens, Legal Residents, or attending US High School',
      financialNeedRequired: true
    },
    effortLevel: 'Comprehensive (2 Essays + LOR)',
    estimatedHours: 6.5,
    historicalAwardRate: 'Among the highest-value private scholarships in the world',
    requiredItems: [
      { id: 'req-jk-1', name: 'Intellectual Passion & Curiosity Statement', type: 'essay', completed: true },
      { id: 'req-jk-2', name: 'Family Contribution & Financial Context Essay', type: 'essay', completed: false },
      { id: 'req-jk-3', name: 'High School / College Transcripts', type: 'transcript', completed: true },
      { id: 'req-jk-4', name: '2 Academic Teacher Recommendations', type: 'lor', completed: false }
    ],
    essayPrompts: [
      {
        id: 'ep-jk-1',
        title: 'Intellectual Curiosity & Rigor',
        prompt: 'Describe a topic, idea, or concept you find so engaging that it makes you lose all track of time. Why does it captivate you? What or who do you turn to when you want to learn more?',
        wordLimit: 650,
        keyThemes: ['Intellectual Drive', 'Curiosity', 'Critical Thinking', 'Scholarly Ambition']
      }
    ],
    description: 'An exceptional scholarship providing up to $55,000 annually, comprehensive educational advising from Cooke staff, and access to a vibrant network of high-achieving scholars.',
    tags: ['Highest Value', 'Up to $220k', 'Advising', 'Prestigious', 'Need-Based'],
    featured: true,
    status: 'in_progress',
    applicationStage: 'Drafting Essays',
    notes: 'High match given 3.82 GPA and first-gen background.'
  },
  {
    id: 'sch-swe-national',
    title: 'Society of Women Engineers (SWE) National Scholarships',
    organization: 'Society of Women Engineers',
    amount: 12500,
    isRenewable: false,
    renewableDuration: 'Awards range from $1,000 to $19,000 per academic year',
    category: 'STEM & Technology',
    deadline: '2026-12-10',
    applicationUrl: 'https://swe.org/scholarships',
    requirements: {
      minGpa: 3.0,
      academicLevels: ['Undergraduate', 'Graduate'],
      eligibleMajors: ['Computer Science', 'Mechanical Engineering', 'Bioengineering', 'Electrical Engineering', 'Aerospace Engineering'],
      demographics: ['Female / Non-Binary in STEM'],
      residency: 'US Citizens & International Students attending ABET-accredited programs',
      financialNeedRequired: false
    },
    effortLevel: 'Moderate (1 Essay)',
    estimatedHours: 3.0,
    historicalAwardRate: 'Over 1,400 scholarships totaling $1.7M awarded annually',
    requiredItems: [
      { id: 'req-sw-1', name: 'Engineering Passion & SWE Goals Essay', type: 'essay', completed: false },
      { id: 'req-sw-2', name: 'ABET Accredited Program Transcript', type: 'transcript', completed: true },
      { id: 'req-sw-3', name: 'Resume highlighting technical clubs and leadership', type: 'resume', completed: true },
      { id: 'req-sw-4', name: '1 STEM Faculty Recommendation', type: 'lor', completed: false }
    ],
    essayPrompts: [
      {
        id: 'ep-sw-1',
        title: 'Empowering Women in Engineering',
        prompt: 'Describe how your experiences have shaped your engineering aspirations. What steps are you taking to empower other women and gender-minority students in STEM, and how will this award support your degree completion?',
        wordLimit: 500,
        keyThemes: ['Women in STEM', 'Engineering Leadership', 'Mentorship', 'Technical Ambition']
      }
    ],
    description: 'SWE awards scholarships to women and non-binary students pursuing undergraduate or graduate ABET-accredited degrees in engineering, technology, and computer science.',
    tags: ['Women in STEM', 'Engineering', 'Over 1000 Awards', 'Global Eligible'],
    featured: false,
    status: 'bookmarked',
    applicationStage: 'Bookmarked',
    notes: 'Drafting essay highlighting Girls Who Code student mentoring.'
  },
  {
    id: 'sch-hispanic-scholarship-fund',
    title: 'Hispanic Scholarship Fund (HSF) Scholar Program',
    organization: 'Hispanic Scholarship Fund',
    amount: 5000,
    isRenewable: true,
    renewableDuration: 'Awards range from $500 to $5,000 based on need and merit',
    category: 'Diversity & Inclusion',
    deadline: '2027-02-15',
    applicationUrl: 'https://www.hsf.net',
    requirements: {
      minGpa: 3.0,
      academicLevels: ['High School Senior', 'Undergraduate', 'Graduate'],
      eligibleMajors: ['All Majors'],
      demographics: ['Hispanic / Latino / Latina / Latinx Heritage'],
      residency: 'US Citizens, Legal Permanent Residents, or DACA',
      financialNeedRequired: true
    },
    effortLevel: 'Moderate (Short Answers & Background)',
    estimatedHours: 2.0,
    historicalAwardRate: 'Over 10,000 scholars recognized annually',
    requiredItems: [
      { id: 'req-hsf-1', name: 'Personal Statement & Academic Trajectory', type: 'essay', completed: false },
      { id: 'req-hsf-2', name: 'FAFSA SAR or California Dream Act Report', type: 'fafsa', completed: true },
      { id: 'req-hsf-3', name: 'Official or Unofficial Transcripts', type: 'transcript', completed: true }
    ],
    essayPrompts: [
      {
        id: 'ep-hsf-1',
        title: 'Cultural Heritage & Civic Commitment',
        prompt: 'How has your Hispanic heritage influenced your academic ambitions and commitment to community service? What specific impact do you hope to make in your profession?',
        wordLimit: 500,
        keyThemes: ['Heritage', 'Civic Commitment', 'Career Ambition', 'Giving Back']
      }
    ],
    description: 'HSF empowers students of Hispanic heritage with scholarship funding, leadership conferences, career networking with Fortune 500 partners, and mentorship.',
    tags: ['Hispanic / Latinx', 'National Network', 'Career Placement', 'Renewable'],
    featured: false,
    status: 'unapplied',
    applicationStage: 'Not Started',
    notes: 'Applications open January 1, deadline mid-February.'
  },
  {
    id: 'sch-davis-putter',
    title: 'Davis-Putter Scholarship Fund for Social Justice',
    organization: 'Davis-Putter Scholarship Fund',
    amount: 15000,
    isRenewable: true,
    renewableDuration: 'Up to $15,000 per academic year',
    category: 'Arts & Humanities',
    deadline: '2027-04-01',
    applicationUrl: 'https://davisputter.org',
    requirements: {
      minGpa: 2.5,
      academicLevels: ['Undergraduate', 'Graduate', 'Vocational'],
      eligibleMajors: ['All Majors'],
      demographics: ['Active student organizers for social, racial, and economic justice'],
      residency: 'All Enrolled Students (No citizenship restriction)',
      financialNeedRequired: true
    },
    effortLevel: 'Moderate (Organizing History Essay + Reference)',
    estimatedHours: 3.5,
    historicalAwardRate: '30-40 activist scholars funded annually',
    requiredItems: [
      { id: 'req-dp-1', name: 'Social Justice Organizing Statement', type: 'essay', completed: false },
      { id: 'req-dp-2', name: 'Proof of Financial Need', type: 'fafsa', completed: false },
      { id: 'req-dp-3', name: '2 Letters of Recommendation from Movement Organizers', type: 'lor', completed: false }
    ],
    essayPrompts: [
      {
        id: 'ep-dp-1',
        title: 'Building Collective Power',
        prompt: 'Describe your active participation in grassroots organizing for progressive social change (e.g. racial equality, immigrant rights, labor reform, climate justice). What role did you play, and how will your studies deepen your movement work?',
        wordLimit: 750,
        keyThemes: ['Grassroots Organizing', 'Civil Rights', 'Collective Action', 'Justice']
      }
    ],
    description: 'Need-based grants for student activists actively organizing for civil rights, economic justice, peace, and environmental sustainability on campus and in communities.',
    tags: ['Social Justice', 'Activism', 'Grassroots', 'Undocumented Friendly'],
    featured: false,
    status: 'unapplied',
    applicationStage: 'Not Started',
    notes: ''
  },
  {
    id: 'sch-horatio-alger',
    title: 'Horatio Alger National Scholarship',
    organization: 'Horatio Alger Association of Distinguished Americans',
    amount: 25000,
    isRenewable: true,
    renewableDuration: '$25,000 disbursed over college degree',
    category: 'First-Gen & Need-Based',
    deadline: '2027-03-15',
    applicationUrl: 'https://scholars.horatioalger.org',
    requirements: {
      minGpa: 2.0,
      academicLevels: ['High School Senior', 'Undergraduate'],
      eligibleMajors: ['All Majors'],
      demographics: ['Critical financial need (Family adjusted gross income $55k or less)'],
      residency: 'US Citizens',
      financialNeedRequired: true
    },
    effortLevel: 'Moderate (1 Essay)',
    estimatedHours: 3.0,
    historicalAwardRate: 'Over 100 National Scholars + thousands of State Scholars',
    requiredItems: [
      { id: 'req-ha-1', name: 'Integrity and Overcoming Adversity Essay', type: 'essay', completed: false },
      { id: 'req-ha-2', name: 'Support Form from High School Counselor', type: 'lor', completed: false },
      { id: 'req-ha-3', name: 'Tax Return or FAFSA Verification', type: 'fafsa', completed: false }
    ],
    essayPrompts: [
      {
        id: 'ep-ha-1',
        title: 'Character in the Crucible of Adversity',
        prompt: 'Describe the adversity you have faced, how you persevered through it with integrity, and how this hardship has reinforced your drive to attain a higher education.',
        wordLimit: 500,
        keyThemes: ['Overcoming Hardship', 'Integrity', 'Perseverance', 'Financial Need']
      }
    ],
    description: 'Specifically honors students who have faced and overcome great personal adversity while demonstrating unyielding integrity and commitment to completing a college degree.',
    tags: ['Adversity', 'Pell-Eligible', 'National Scholar', 'Renewable'],
    featured: false,
    status: 'unapplied',
    applicationStage: 'Not Started',
    notes: ''
  },
  {
    id: 'sch-rotary-global',
    title: 'Rotary Foundation Global Grant Fellowship',
    organization: 'Rotary International',
    amount: 30000,
    isRenewable: false,
    renewableDuration: 'Minimum $30,000 award for graduate study or research abroad',
    category: 'Healthcare & Nursing',
    deadline: '2027-02-01',
    applicationUrl: 'https://www.rotary.org/en/our-programs/scholarships',
    requirements: {
      minGpa: 3.0,
      academicLevels: ['Undergraduate', 'Graduate'],
      eligibleMajors: ['Public Health', 'Nursing', 'Disease Prevention', 'Water Sanitation', 'Community Economic Development'],
      demographics: ['All Applicants committed to Rotary Areas of Focus'],
      residency: 'Global / International Applicants Eligible',
      financialNeedRequired: false
    },
    effortLevel: 'Comprehensive (Project Proposal + Rotary Interview)',
    estimatedHours: 6.0,
    historicalAwardRate: 'High award value supported by local Rotary Clubs',
    requiredItems: [
      { id: 'req-rg-1', name: 'Rotary Area of Focus Service Proposal', type: 'essay', completed: false },
      { id: 'req-rg-2', name: 'Local Rotary Club Endorsement Letter', type: 'lor', completed: false },
      { id: 'req-rg-3', name: 'Academic Transcripts and Degree Audit', type: 'transcript', completed: false }
    ],
    essayPrompts: [
      {
        id: 'ep-rg-1',
        title: 'Sustainable Humanitarian Development',
        prompt: 'Detail how your graduate studies in disease prevention, public health, or water sanitation align with Rotary International goals. How will your research produce long-term, measurable health outcomes for vulnerable populations?',
        wordLimit: 800,
        keyThemes: ['Disease Prevention', 'Public Health', 'Sustainable Sanitation', 'Global Rotary Service']
      }
    ],
    description: 'Rotary Global Grants fund graduate-level coursework or research in one of Rotary\'s seven areas of focus, with an emphasis on disease prevention and maternal/child community healthcare.',
    tags: ['Public Health', 'Global Study', '$30,000 Award', 'Rotary International', 'Healthcare'],
    featured: false,
    status: 'unapplied',
    applicationStage: 'Not Started',
    notes: ''
  }
];

// Helper to compute match score based on user profile
export function calculateMatchScore(scholarship: Scholarship, profile: StudentProfile): MatchScoreResult {
  let score = 50; // base score
  const reasons: string[] = [];
  const missing: string[] = [];

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
  if (profile.isFirstGen && scholarship.requirements.demographics.some(d => d.includes('First-Gen') || d.includes('Pell'))) {
    score += 15;
    reasons.push('First-Generation & Need priority match');
  }

  // Financial Need matching
  if (scholarship.requirements.financialNeedRequired) {
    if (profile.householdIncomeTier === 'low' || profile.householdIncomeTier === 'pell_eligible' || profile.isPellEligible) {
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
