# 🎓 GRANTLY — Rethinking the Scholarship Experience
### *A Modern, Human-Centered Digital Platform for Discovering, Tracking, and Winning Educational Financial Assistance*

---

## 🌟 Executive Summary & Vision

Accessing higher education is one of the most transformative economic elevators in modern society. Yet, for millions of students—particularly first-generation, low-income, and historically underrepresented scholars—navigating financial assistance is an intimidating maze characterized by:
- **Search Fatigue & Scams:** Cluttered, outdated databases filled with broken links, undisclosed requirements, and sweepstakes scams.
- **Disqualification Anxiety:** Unclear eligibility rules causing students to spend hours writing essays only to discover they were ineligible.
- **Process Paralysis & Lost Deadlines:** Chaotic spreadsheets, missing recommendation letters, and lack of visual pipeline tracking.
- **The "Blank Canvas" Problem:** Struggling to tailor essays to what scholarship selection committees actually look for.
- **Financial Ambiguity & Scholarship Displacement:** Not understanding their True Cost of Attendance (COA) or how winning outside scholarships affects their existing university grants.

**GRANTLY** transforms this fragmented, high-friction journey into a **calm, empowering, and transparent digital experience**. 

---

## 🚀 Key Modules & Capabilities

### 1. 🔐 Student Authentication & Login System
- **Flexible Sign-In:** Sign in with email, university credentials, or create a new student account.
- **1-Click Demo Personas:** Instantly test Grantly under different student profiles (*Maya Lin* - 2nd Year CS First-Gen; *Carlos Gomez* - Senior Pre-Med; *Priya Sharma* - High School Senior Merit Scholar) without typing dummy credentials.
- **Guest Explorer Mode:** Browse verified grants and run simulations without an account.
- **FERPA-Aligned Security:** 256-bit student data privacy protection.

### 2. 🏛️ 100% Real, Verified National Scholarships Database
Grantly is pre-loaded with **real-world, verified flagship scholarships** featuring real official portal URLs, verified award amounts, official essay prompts, and actual criteria:
- **Amazon Future Engineer Scholarship:** \$40,000 (\$10k/yr) + **Guaranteed Paid Software Engineering Internship at Amazon**
- **The Gates Scholarship (TGS):** **Full Cost of Attendance** for up to 5 undergraduate years by the Bill & Melinda Gates Foundation
- **Generation Google Scholarship:** \$10,000 award for underrepresented computer scientists + Google Scholars Retreat
- **Dell Scholars Program:** \$20,000 + **Brand new Dell Laptop** + 4 years of textbook credits & 1-on-1 counseling
- **Coca-Cola Scholars Program:** \$20,000 national merit award for community service leaders
- **Barry Goldwater Scholarship:** Up to \$7,500/year for undergraduate STEM research (Ph.D. track)
- **Jack Kent Cooke Foundation College Scholarship:** Up to **\$55,000/year** (up to \$220,000 total)
- **Society of Women Engineers (SWE) National Scholarships:** \$1,000 to \$19,000 for women & non-binary engineers
- **Hispanic Scholarship Fund (HSF):** \$500 to \$5,000 + HSF career network & leadership conferences
- **Davis-Putter Scholarship Fund:** Up to \$15,000/yr for grassroots civil rights and social justice organizers
- **Horatio Alger National Scholarship:** \$25,000 for students who have overcome severe personal adversity
- **Rotary Foundation Global Grant Fellowship:** \$30,000 for graduate public health and disease prevention

### 3. 🧭 The Match Compass & Persona Switcher
- **Dynamic 0–100% Match Scoring:** Analyzes student GPA, major, academic level, first-gen status, state of residence, and household income against verified scholarship criteria.
- **Radical Transparency:** Rather than showing an opaque score, Grantly provides a clear checklist showing **"Why You Match"** (e.g., GPA 3.82 exceeds 3.2 requirement, First-Gen priority) and **"Criteria to Note"**.

### 4. 🔍 Grant Explorer (Smart Discovery Engine)
- **Multi-Faceted Filtering:** Filter by Category (STEM, First-Gen, Healthcare, Arts, Business, Diversity, Merit), Award Amount, Effort Level (*Quick Apply / <1hr*, *Moderate / 1 Essay*, *Comprehensive*), and Closing Urgency.
- **Renewability & ROI Highlighting:** Highlights multi-year renewable awards (e.g. up to \$220,000 total) to help students maximize long-term debt reduction.
- **Direct Official Portals:** Clickable links directly to official application websites.

### 5. 📋 Application Pipeline Kanban & Milestone Hub
- **Visual Workflow Management:** Move applications across 5 realistic stages:
  1. *Considering / Bookmarked*
  2. *Drafting & Prep*
  3. *Ready to Submit*
  4. *Submitted (Under Committee Review)*
  5. *Awarded 🎉*
- **Milestone Checklists:** Track granular sub-tasks (Transcript, Statement of Purpose, FAFSA SAR, Faculty LOR) with progress rings on each card.
- **Confetti Victory Celebrations:** Celebrates scholarship wins with particle confetti bursts and instant automatic credit to the TrueCost simulator.
- **iCal / Calendar Export:** One-click download of `.ics` calendar events with verified submission deadlines.

### 6. ✍️ GrantWriter AI (Narrative Co-Pilot & Studio)
- **Prompt Theme Alignment Checker:** Committee evaluators score essays against core values (Resilience, Leadership, Ethical Vision, Community Impact). The studio scans student drafts in real-time to highlight which themes are actively articulated.
- **AI Narrative Architecture Generator:** Synthesizes a tailored, 4-beat structural outline (*The Hook*, *The Crucible*, *Community Multiplier*, *Future Vision*) mapped to the specific scholarship prompt.
- **Word Count Safeguards:** Live word progress bars with warnings to avoid disqualification.
- **Direct Vault Integration:** Save drafts to the Application Vault with one click.

### 7. 💰 TrueCost & Scholarship Stacking Simulator
- **Comprehensive Cost Modeling:** Integrates Tuition, Housing/Dining, and Books/Supplies into the True Cost of Attendance (COA).
- **Layered Aid Visualization:** Stacks Institutional Grants, Federal Pell Grants, Work-Study, and Outside Scholarships into a dynamic coverage bar.
- **Eliminating the Unmet Need Gap:** Displays exactly how much loan debt remains and allows simulation of active pipeline wins.
- **Scholarship Displacement Advisor & Appeal Template:** Educates students on institutional over-award policies and provides a one-click copyable formal appeal email citing `34 CFR § 673.5` to ensure outside awards reduce loans rather than institutional grants!

### 8. 🗄️ Application Locker & Faculty LOR Tracker
- **Centralized Document Vault:** Stores verified transcripts, standard personal statements, and resumes.
- **Faculty Recommendation Tracker:** Tracks recommender status, deadlines, and generates polite, professional reminder email scripts ready to send 7–10 days before deadlines.

---

## 🛠️ Technical Stack & Architecture

- **Core Framework:** React 18 with modern React Hooks (`useState`, `useMemo`, `useEffect`)
- **Build Tool:** Vite 5 (Ultra-fast HMR and optimized production bundling)
- **Styling & Design System:** Tailwind CSS with custom Emerald/Teal/Cyan educational palette
- **Icons & Micro-interactions:** Lucide React icons & Canvas Confetti
- **Persistence:** LocalStorage synchronization with instant reset sandbox options
- **Responsive & Accessible:** Fully responsive across mobile, tablet, and widescreen desktop with native Dark/Light mode support.

---

## 🚀 Running the Project

### Development Server
```bash
npm run dev
```
Navigate to `http://localhost:5173` to explore Grantly live.

### Production Build
```bash
npm run build
npm run preview
```
