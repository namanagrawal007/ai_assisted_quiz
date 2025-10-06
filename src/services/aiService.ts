import { GoogleGenerativeAI } from '@google/generative-ai';
import { QuizData, Difficulty } from '../types/quiz';

const API_KEY = 'AIzaSyCgz8LN8iBzxSJct_2zqW1qgiSFFBYOW-E';

if (!API_KEY) {
  console.error('VITE_GEMINI_API_KEY is not set in environment variables');
}

const genAI = new GoogleGenerativeAI(API_KEY);

const cleanJsonResponse = (text: string): string => {
  text = text.trim();
  const jsonMatch = text.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/);
  if (jsonMatch) {
    return jsonMatch[1];
  }
  const startIdx = text.indexOf('{');
  const endIdx = text.lastIndexOf('}');
  if (startIdx !== -1 && endIdx !== -1) {
    return text.substring(startIdx, endIdx + 1);
  }
  return text;
};

export const generateQuizQuestions = async (
  topic: string,
  difficulty: Difficulty,
  retries = 3
): Promise<QuizData> => {
  // ✅ Use Gemini 2.5 Flash
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const difficultyInstructions = {
    easy: 'Make questions straightforward and suitable for beginners. Focus on basic concepts and fundamental knowledge.',
    medium: 'Make questions moderately challenging. Include some nuance and require good understanding of the topic.',
    hard: 'Make questions very challenging. Include advanced concepts, tricky details, and require deep expertise.',
  };

  const prompt = `You are an AI quiz generator.
Generate exactly 5 multiple-choice questions (MCQs) on the topic "${topic}" at ${difficulty.toUpperCase()} difficulty level.
${difficultyInstructions[difficulty]}

Each question must include: question text, 4 options (A–D), correctAnswer, and explanation.
Return only valid JSON like:
{
  "topic": "${topic}",
  "difficulty": "${difficulty}",
  "questions": [
    {
      "id": 1,
      "question": "Question text?",
      "options": {"A": "Option A", "B": "Option B", "C": "Option C", "D": "Option D"},
      "correctAnswer": "C",
      "explanation": "Short explanation."
    }
  ]
}
No extra text or markdown.`;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const cleanedText = cleanJsonResponse(text);
      const quizData: QuizData = JSON.parse(cleanedText);

      if (
        !quizData.questions ||
        !Array.isArray(quizData.questions) ||
        quizData.questions.length !== 5
      ) {
        throw new Error('Invalid quiz data structure');
      }

      quizData.questions.forEach((q, index) => {
        if (!q.question || !q.options || !q.correctAnswer || !q.explanation) {
          throw new Error(`Question ${index + 1} is missing required fields`);
        }
      });

      return quizData;
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error);
      if (attempt === retries) {
        throw new Error(
          `Failed to generate quiz after ${retries} attempts. Please try again.`
        );
      }
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
    }
  }

  throw new Error('Failed to generate quiz');
};

export const generateFeedback = async (
  topic: string,
  difficulty: Difficulty,
  score: number,
  total: number
): Promise<string> => {
  // ✅ Also use Gemini 2.5 Flash here
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const prompt = `You are an AI feedback generator.
Given topic: "${topic}" at ${difficulty.toUpperCase()} difficulty level, score: ${score} out of ${total}, write 2–3 motivational sentences summarizing the user's performance and suggesting improvement.
Plain text only.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error('Failed to generate feedback:', error);
    return `You scored ${score} out of ${total} on ${topic}. Keep practicing to improve your knowledge!`;
  }
};
