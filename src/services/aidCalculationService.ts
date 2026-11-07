/**
 * Financial Aid Stacking & Debt Freedom ROI Engine for GRANTLY
 * Calculates Cost of Attendance, Unmet Need, and Student Loan Amortization Savings.
 */

export interface AidPackageInputs {
  tuitionAndFees: number;
  roomAndBoard: number;
  booksAndSupplies: number;
  institutionalAid: number;
  pellGrant: number;
  workStudy: number;
  personalSavings: number;
  outsideScholarshipsTotal: number;
}

export interface AidAnalysisResult {
  totalCostOfAttendance: number;
  totalAidCovered: number;
  unmetGap: number;
  coveredPercent: number;
  isFullyFunded: boolean;
  loanYearsShavedOff: number;
  compoundedInterestSaved: number;
  displacementRisk: 'Low' | 'Moderate' | 'High';
}

export class AidCalculationService {
  /**
   * Evaluates financial aid stacking and debt reduction projections.
   */
  public static calculateAidImpact(inputs: AidPackageInputs): AidAnalysisResult {
    const totalCostOfAttendance = inputs.tuitionAndFees + inputs.roomAndBoard + inputs.booksAndSupplies;
    const totalAidCovered = 
      inputs.institutionalAid + 
      inputs.pellGrant + 
      inputs.workStudy + 
      inputs.personalSavings + 
      inputs.outsideScholarshipsTotal;

    const unmetGap = Math.max(0, totalCostOfAttendance - totalAidCovered);
    const coveredPercent = totalCostOfAttendance > 0 
      ? Math.min(100, Math.round((totalAidCovered / totalCostOfAttendance) * 100))
      : 100;

    // Student Loan Amortization Model:
    // Assumes standard Federal Direct Unsubsidized / Private student loan at 6.8% APR over 10 years (120 payments)
    // Every $10,000 in scholarships saves approx $3,800 in compounding interest and ~1.8 years of repayment effort
    const scholarshipAmount = inputs.outsideScholarshipsTotal;
    const loanYearsShavedOff = parseFloat(Math.min(10, (scholarshipAmount / 12000) * 2.2).toFixed(1));
    const compoundedInterestSaved = Math.round(scholarshipAmount * 0.38);

    let displacementRisk: 'Low' | 'Moderate' | 'High' = 'Low';
    if (totalAidCovered > totalCostOfAttendance) {
      displacementRisk = 'High';
    } else if (totalAidCovered > (totalCostOfAttendance * 0.85)) {
      displacementRisk = 'Moderate';
    }

    return {
      totalCostOfAttendance,
      totalAidCovered,
      unmetGap,
      coveredPercent,
      isFullyFunded: unmetGap === 0,
      loanYearsShavedOff,
      compoundedInterestSaved,
      displacementRisk
    };
  }
}
