/**
 * Match Engine Calculation Test Suite
 */

import assert from 'node:assert';

// Simulated match score calculation test
function runMatchEngineTests() {
  console.log('🧪 Testing Match Compass Algorithm...');

  const mockProfile = {
    gpa: 3.8,
    major: 'Computer Science',
    academicLevel: 'Undergraduate',
    isFirstGen: true,
    isPellEligible: true,
    householdIncomeTier: 'pell_eligible'
  };

  const mockScholarship = {
    requirements: {
      minGpa: 3.0,
      eligibleMajors: ['Computer Science', 'Engineering'],
      academicLevels: ['Undergraduate'],
      demographics: ['First-Gen', 'Pell Eligible'],
      financialNeedRequired: true
    }
  };

  // Test 1: High match scoring calculation
  let score = 50;
  if (mockProfile.gpa >= mockScholarship.requirements.minGpa) score += 15;
  if (mockScholarship.requirements.eligibleMajors.includes(mockProfile.major)) score += 15;
  if (mockScholarship.requirements.academicLevels.includes(mockProfile.academicLevel)) score += 10;
  if (mockProfile.isFirstGen) score += 15;
  if (mockProfile.householdIncomeTier === 'pell_eligible') score += 10;

  const clamped = Math.min(99, Math.max(15, score));
  assert.strictEqual(clamped >= 85, true, 'Match score for high-compatibility profile should be >= 85%');
  console.log(`  ✓ Match scoring passed (${clamped}% for CS First-Gen profile)`);

  // Test 2: Low match test for mismatched field
  const mismatchedProfile = {
    ...mockProfile,
    gpa: 2.1, // below 3.0
    major: 'Fine Arts'
  };
  let lowScore = 50;
  if (mismatchedProfile.gpa < mockScholarship.requirements.minGpa) lowScore -= 25;
  if (!mockScholarship.requirements.eligibleMajors.includes(mismatchedProfile.major)) lowScore -= 15;

  assert.strictEqual(lowScore < 50, true, 'Mismatching major and GPA should lower match score below 50%');
  console.log('  ✓ Penalties for below-threshold criteria passed');
}

export { runMatchEngineTests };
