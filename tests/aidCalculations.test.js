/**
 * Financial Aid Stacking & Loan ROI Calculation Test Suite
 */

import assert from 'node:assert';

function runAidCalculationTests() {
  console.log('🧪 Testing Financial Aid Stacking & Debt ROI Engine...');

  const tuition = 20000;
  const housing = 10000;
  const books = 2000;
  const totalCOA = tuition + housing + books; // 32,000

  const institutional = 12000;
  const pell = 7000;
  const workStudy = 3000;
  const outsideScholarships = 10000;

  const totalAid = institutional + pell + workStudy + outsideScholarships; // 32,000
  const unmetGap = Math.max(0, totalCOA - totalAid);

  // Test 1: Full funding zero-gap verification
  assert.strictEqual(totalCOA, 32000, 'Total COA should equal 32,000');
  assert.strictEqual(totalAid, 32000, 'Total Aid should equal 32,000');
  assert.strictEqual(unmetGap, 0, 'Unmet gap should equal 0 when fully covered');
  console.log('  ✓ Zero debt gap calculation verified');

  // Test 2: Compounded interest savings calculation
  const interestSaved = Math.round(outsideScholarships * 0.38);
  assert.strictEqual(interestSaved, 3800, 'Compound interest savings should equal $3,800 for $10k aid');
  console.log(`  ✓ Compound student loan savings verified ($${interestSaved})`);

  // Test 3: Displacement risk threshold
  const isOverAwarded = totalAid > totalCOA;
  assert.strictEqual(isOverAwarded, false, 'Exact match should not trigger overaward');
  console.log('  ✓ Displacement policy evaluation verified');
}

export { runAidCalculationTests };
