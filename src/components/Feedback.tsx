import { useState, useEffect } from 'react';
import { Trophy, Award, Target, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { QuizData, UserAnswer } from '../types/quiz';
import { generateFeedback } from '../services/aiService';

interface FeedbackProps {
  quizData: QuizData;
  score: number;
  userAnswers: UserAnswer[];
  onRestart: () => void;
}

export const Feedback = ({ quizData, score, userAnswers, onRestart }: FeedbackProps) => {
  const [aiFeedback, setAiFeedback] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const feedback = await generateFeedback(quizData.topic, quizData.difficulty, score, quizData.questions.length);
        setAiFeedback(feedback);
      } catch (error) {
        console.error('Failed to fetch feedback:', error);
        setAiFeedback(`Great effort on the ${quizData.topic} quiz! Keep learning and improving.`);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [quizData.topic, quizData.difficulty, score, quizData.questions.length]);

  const percentage = (score / quizData.questions.length) * 100;
  const getScoreColor = () => {
    if (percentage >= 80) return 'from-green-500 to-emerald-600';
    if (percentage >= 60) return 'from-blue-500 to-cyan-600';
    if (percentage >= 40) return 'from-amber-500 to-orange-600';
    return 'from-red-500 to-rose-600';
  };

  const getScoreIcon = () => {
    if (percentage >= 80) return <Trophy size={64} />;
    if (percentage >= 60) return <Award size={64} />;
    return <Target size={64} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 transition-colors duration-300">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <div className="relative inline-block mb-6">
            <div className={`absolute inset-0 bg-gradient-to-r ${getScoreColor()} rounded-full blur-2xl opacity-30 animate-pulse`} />
            <div className={`relative bg-gradient-to-r ${getScoreColor()} p-8 rounded-full shadow-2xl text-white transform hover:scale-110 transition-transform duration-300`}>
              {getScoreIcon()}
            </div>
          </div>

          <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">
            Quiz Complete!
          </h1>
          <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent mb-2">
            {score} / {quizData.questions.length}
          </div>
          <p className="text-2xl text-gray-600 dark:text-gray-300">
            {percentage.toFixed(0)}% Correct
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
            <Award className="mr-3 text-blue-600 dark:text-cyan-400" size={28} />
            AI Feedback
          </h2>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent" />
            </div>
          ) : (
            <p className="text-gray-700 dark:text-gray-200 text-lg leading-relaxed">
              {aiFeedback}
            </p>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Review Your Answers
          </h2>
          <div className="space-y-4">
            {quizData.questions.map((question, index) => {
              const userAnswer = userAnswers[index];
              const isCorrect = userAnswer.selectedAnswer === question.correctAnswer;

              return (
                <div
                  key={question.id}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    isCorrect
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                  }`}
                >
                  <div className="flex items-start mb-2">
                    {isCorrect ? (
                      <CheckCircle className="text-green-600 dark:text-green-400 mr-3 flex-shrink-0 mt-1" size={24} />
                    ) : (
                      <XCircle className="text-red-600 dark:text-red-400 mr-3 flex-shrink-0 mt-1" size={24} />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                        Question {index + 1}: {question.question}
                      </h3>
                      <div className="space-y-1 text-sm">
                        <p className="text-gray-700 dark:text-gray-300">
                          <span className="font-semibold">Your answer:</span>{' '}
                          {userAnswer.selectedAnswer ? (
                            <span className={isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                              {userAnswer.selectedAnswer} - {question.options[userAnswer.selectedAnswer]}
                            </span>
                          ) : (
                            <span className="text-gray-500">No answer selected</span>
                          )}
                        </p>
                        {!isCorrect && (
                          <p className="text-gray-700 dark:text-gray-300">
                            <span className="font-semibold">Correct answer:</span>{' '}
                            <span className="text-green-600 dark:text-green-400">
                              {question.correctAnswer} - {question.options[question.correctAnswer]}
                            </span>
                          </p>
                        )}
                        <p className="text-gray-600 dark:text-gray-400 italic mt-2">
                          {question.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onRestart}
            className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <RefreshCw size={24} />
            <span>Take Another Quiz</span>
          </button>
        </div>
      </div>
    </div>
  );
};
