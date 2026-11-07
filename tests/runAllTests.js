/**
 * Automated Test Runner for GRANTLY
 * Executes all domain unit tests and prints verified test results.
 */

import { runMatchEngineTests } from './matchEngine.test.js';
import { runAidCalculationTests } from './aidCalculations.test.js';
import { runSecurityTests } from './securitySanitization.test.js';

console.log('====================================================');
console.log('🚀 Running GRANTLY Quality & Verification Test Suite');
console.log('====================================================\n');

try {
  runMatchEngineTests();
  console.log('');
  runAidCalculationTests();
  console.log('');
  runSecurityTests();
  console.log('\n====================================================');
  console.log('✅ ALL TEST SUITES PASSED (100% Assertion Success)');
  console.log('====================================================');
  process.exit(0);
} catch (error) {
  console.error('\n❌ TEST SUITE FAILED:', error);
  process.exit(1);
}
