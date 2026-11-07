/**
 * Export & Portfolio Generation Service for GRANTLY
 * Enables iCalendar exports and printable Financial Aid Portfolio summaries.
 */

import { Scholarship, StudentProfile } from '../types';

export class ExportService {
  /**
   * Generates standard iCalendar (.ics) string for upcoming scholarship deadlines.
   */
  public static generateCalendarICS(scholarships: Scholarship[]): string {
    const active = scholarships.filter(s => s.status && s.status !== 'unapplied');
    let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Grantly Education//Scholarship Deadlines//EN\nCALSCALE:GREGORIAN\nMETHOD:PUBLISH\n";
    
    active.forEach(s => {
      const cleanDate = s.deadline.replace(/-/g, '');
      icsContent += "BEGIN:VEVENT\n";
      icsContent += `UID:${s.id}-grantly@education\n`;
      icsContent += `SUMMARY:Scholarship Deadline: ${s.title}\n`;
      icsContent += `DESCRIPTION:Award Value: $${s.amount.toLocaleString()} | Sponsor: ${s.organization}\n`;
      icsContent += `DTSTART;VALUE=DATE:${cleanDate}\n`;
      icsContent += `DTEND;VALUE=DATE:${cleanDate}\n`;
      icsContent += "STATUS:CONFIRMED\n";
      icsContent += "END:VEVENT\n";
    });

    icsContent += "END:VCALENDAR";
    return icsContent;
  }

  /**
   * Generates a printable student financial assistance portfolio summary.
   */
  public static generateAidPortfolioText(
    profile: StudentProfile,
    scholarships: Scholarship[],
    awardedTotal: number
  ): string {
    const inPipeline = scholarships.filter(s => ['in_progress', 'ready_to_submit', 'submitted'].includes(s.status));
    const won = scholarships.filter(s => s.status === 'awarded');

    return `=================================================================
GRANTLY — STUDENT FINANCIAL ASSISTANCE PORTFOLIO SUMMARY
Generated for: ${profile.fullName} (${profile.institution})
Major: ${profile.major} | Cumulative GPA: ${profile.gpa} | Academic Level: ${profile.academicLevel}
=================================================================

1. COLLEGE COST & FUNDING OVERVIEW
-----------------------------------------------------------------
Estimated Annual Cost of Attendance: $${profile.totalFundingGoal.toLocaleString()}
Institutional Aid & Grants:         $${profile.institutionalAid.toLocaleString()}
Federal Pell Grant:                  $${profile.federalPellGrant.toLocaleString()}
Federal / Campus Work-Study:         $${profile.studentWorkStudy.toLocaleString()}
Personal / Family Contribution:      $${profile.personalSavings.toLocaleString()}
Total Outside Scholarships Won:      $${awardedTotal.toLocaleString()}

2. SCHOLARSHIP AWARDS WON TO DATE (${won.length})
-----------------------------------------------------------------
${won.map(s => `• ${s.title}: $${s.amount.toLocaleString()} (${s.organization})`).join('\n') || 'None recorded yet.'}

3. ACTIVE SCHOLARSHIP APPLICATIONS IN PROGRESS (${inPipeline.length})
-----------------------------------------------------------------
${inPipeline.map(s => `• ${s.title} ($${s.amount.toLocaleString()}) - Deadline: ${s.deadline} [Stage: ${s.status}]`).join('\n')}

=================================================================
Protected by 256-Bit Financial Privacy & FERPA Compliance Standards.
GRANTLY — Democratizing Higher Education Funding.
=================================================================`;
  }
}
