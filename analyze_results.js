import fs from 'fs';
import OpenAI from 'openai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error('API key not found');
}

const openai = new OpenAI(apiKey);

async function analyzeCode() {
  // Read problem, student code, and test results
  const problemStatement = fs.readFileSync('problem.txt', 'utf8');
  const studentCode = fs.readFileSync('student_code.cpp', 'utf8');
  const testResults = fs.readFileSync('test_results.txt', 'utf8');
  
  const prompt = `
  다음은 학생에게 주어진 문제와 학생이 작성한 코드입니다. 코드를 리뷰하고 각 부분별로 잘못된 부분을 지적하며, 어떻게 고치면 좋을지와 그 이유를 설명해 주세요. 특이점이 없다면 피드백을 안 해줘도 됩니다. 또한, 코드의 개선점을 제안해 주세요. 응답은 반드시 한국어로 해주세요.

  [문제]
  ${problemStatement}

  [학생이 작성한 코드]
  ${studentCode}

  [테스트 결과]
  ${testResults}

  리뷰 형식:
  1. 문제점: 설명
  2. 잘못된 코드: 
  3. 올바른 코드: 
  4. 테스트 케이스 분석:
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are a highly experienced software engineer and provide a thorough code review. Respond in Korean." },
      { role: "user", content: prompt }
    ]
  });

  const feedback = response.choices[0].message.content.trim();
  fs.writeFileSync('feedback.log', feedback);
}

analyzeCode().catch(error => {
  console.error(error);
  process.exit(1);
}
