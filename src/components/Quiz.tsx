import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { QuizData, UserAnswer } from '../types/quiz';
import { QuestionCard } from './QuestionCard';

interface QuizProps {
  quizData: QuizData;
  onComplete: (score: number, answers: UserAnswer[]) => void;
}

export const Quiz = ({ quizData, onComplete }: QuizProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>(
    quizData.questions.map((q) => ({
      questionId: q.id,
      selectedAnswer: null,
    }))
  );

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const currentAnswer = userAnswers[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizData.questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  const handleSelectAnswer = (answer: 'A' | 'B' | 'C' | 'D') => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = {
      questionId: currentQuestion.id,
      selectedAnswer: answer,
    };
    setUserAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      const score = userAnswers.reduce((acc, answer, index) => {
        const question = quizData.questions[index];
        return acc + (answer.selectedAnswer === question.correctAnswer ? 1 : 0);
      }, 0);
      onComplete(score, userAnswers);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const progress = ((currentQuestionIndex + 1) / quizData.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 transition-colors duration-300">
      <div className="max-w-3xl w-full">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              {quizData.topic} Quiz
            </h1>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {currentQuestionIndex + 1} / {quizData.questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <QuestionCard
          question={currentQuestion}
          selectedAnswer={currentAnswer.selectedAnswer}
          onSelectAnswer={handleSelectAnswer}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={quizData.questions.length}
        />

        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={isFirstQuestion}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
              isFirstQuestion
                ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-lg hover:shadow-xl'
            }`}
          >
            <ChevronLeft size={20} />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            disabled={currentAnswer.selectedAnswer === null}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 ${
              currentAnswer.selectedAnswer === null
                ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg hover:shadow-xl'
            }`}
          >
            <span>{isLastQuestion ? 'Submit' : 'Next'}</span>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
