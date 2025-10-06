export type Difficulty = 'easy' | 'medium' | 'hard';

export interface QuizOption {
  A: string;
  B: string;
  C: string;
  D: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption;
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

export interface QuizData {
  topic: string;
  difficulty: Difficulty;
  questions: QuizQuestion[];
}

export interface UserAnswer {
  questionId: number;
  selectedAnswer: 'A' | 'B' | 'C' | 'D' | null;
}
