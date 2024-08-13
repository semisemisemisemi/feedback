import fs from 'fs';
import { execSync } from 'child_process';

// Load test cases
const testCases = fs.readFileSync('test.txt', 'utf8').split('\n\n');
let results = '';

testCases.forEach((testCase, index) => {
  const [input, expectedOutput] = testCase.split('=>').map(s => s.trim());
  
  try {
    const output = execSync(`echo "${input}" | ./student_code`).toString().trim();
    const passed = output === expectedOutput ? 'Passed' : `Failed (Expected: ${expectedOutput}, Got: ${output})`;
    
    results += `Test Case ${index + 1}: ${passed}\n`;
  } catch (error) {
    results += `Test Case ${index + 1}: Error\n`;
  }
});

fs.writeFileSync('test_results.txt', results);
