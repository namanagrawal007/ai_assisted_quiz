import { Brain } from 'lucide-react';

export const Loader = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 transition-colors duration-300">
      <div className="text-center">
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-2xl opacity-30 animate-pulse" />
          <div className="relative bg-white dark:bg-gray-800 p-8 rounded-full shadow-2xl animate-bounce">
            <Brain size={64} className="text-blue-600 dark:text-cyan-400" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Generating Your Quiz
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
          Our AI is crafting personalized questions just for you...
        </p>

        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
};
