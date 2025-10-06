import { QuizQuestion } from '../types/quiz';

interface QuestionCardProps {
  question: QuizQuestion;
  selectedAnswer: 'A' | 'B' | 'C' | 'D' | null;
  onSelectAnswer: (answer: 'A' | 'B' | 'C' | 'D') => void;
  questionNumber: number;
  totalQuestions: number;
}

export const QuestionCard = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  questionNumber,
  totalQuestions,
}: QuestionCardProps) => {
  const options = ['A', 'B', 'C', 'D'] as const;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-6 transition-all duration-300">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-semibold text-blue-600 dark:text-cyan-400">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            ID: {question.id}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          {question.question}
        </h2>
      </div>

      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelectAnswer(option)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 transform hover:scale-102 ${
              selectedAnswer === option
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 shadow-md'
                : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-gray-50 dark:hover:bg-gray-700/50'
            }`}
          >
            <div className="flex items-start">
              <span
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 transition-colors ${
                  selectedAnswer === option
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {option}
              </span>
              <span className="flex-1 text-gray-700 dark:text-gray-200 pt-1">
                {question.options[option]}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
