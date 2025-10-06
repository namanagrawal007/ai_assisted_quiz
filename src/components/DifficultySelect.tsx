import { ChevronLeft, Zap, TrendingUp, Flame } from 'lucide-react';
import { Difficulty } from '../types/quiz';

interface DifficultyLevel {
  value: Difficulty;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface DifficultySelectProps {
  topic: string;
  onSelectDifficulty: (difficulty: Difficulty) => void;
  onBack: () => void;
}

const difficultyLevels: DifficultyLevel[] = [
  {
    value: 'easy',
    label: 'Easy',
    description: 'Perfect for beginners',
    icon: <Zap size={48} />,
    color: 'from-green-500 to-emerald-600',
  },
  {
    value: 'medium',
    label: 'Medium',
    description: 'Test your knowledge',
    icon: <TrendingUp size={48} />,
    color: 'from-blue-500 to-cyan-600',
  },
  {
    value: 'hard',
    label: 'Hard',
    description: 'For true experts',
    icon: <Flame size={48} />,
    color: 'from-red-500 to-orange-600',
  },
];

export const DifficultySelect = ({ topic, onSelectDifficulty, onBack }: DifficultySelectProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 transition-colors duration-300">
      <div className="max-w-4xl w-full">
        <button
          onClick={onBack}
          className="mb-6 flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors duration-200"
        >
          <ChevronLeft size={20} />
          <span>Back to Topics</span>
        </button>

        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            Choose Your Difficulty
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Topic: <span className="font-semibold text-blue-600 dark:text-cyan-400">{topic}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {difficultyLevels.map((level) => (
            <button
              key={level.value}
              onClick={() => onSelectDifficulty(level.value)}
              className="group relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 p-8"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${level.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

              <div className="relative flex flex-col items-center space-y-4">
                <div className={`p-4 rounded-xl bg-gradient-to-br ${level.color} text-white transform group-hover:rotate-12 transition-transform duration-300`}>
                  {level.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {level.label}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {level.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
