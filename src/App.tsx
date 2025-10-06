import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './contexts/ThemeContext';
import { TopicSelect } from './components/TopicSelect';
import { DifficultySelect } from './components/DifficultySelect';
import { Loader } from './components/Loader';
import { Quiz } from './components/Quiz';
import { Feedback } from './components/Feedback';
import { generateQuizQuestions } from './services/aiService';
import { QuizData, UserAnswer, Difficulty } from './types/quiz';

type AppState = 'topic-select' | 'difficulty-select' | 'loading' | 'quiz' | 'feedback';

function App() {
  const { isDark, toggleTheme } = useTheme();
  const [appState, setAppState] = useState<AppState>('topic-select');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [score, setScore] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSelectTopic = (topic: string) => {
    setSelectedTopic(topic);
    setAppState('difficulty-select');
  };

  const handleSelectDifficulty = async (difficulty: Difficulty) => {
    setAppState('loading');
    setError(null);

    try {
      const data = await generateQuizQuestions(selectedTopic, difficulty);
      setQuizData(data);
      setAppState('quiz');
    } catch (err) {
      console.error('Error generating quiz:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate quiz');
      setAppState('difficulty-select');
    }
  };

  const handleBackToTopics = () => {
    setAppState('topic-select');
    setSelectedTopic('');
  };

  const handleQuizComplete = (finalScore: number, answers: UserAnswer[]) => {
    setScore(finalScore);
    setUserAnswers(answers);
    setAppState('feedback');
  };

  const handleRestart = () => {
    setAppState('topic-select');
    setSelectedTopic('');
    setQuizData(null);
    setScore(0);
    setUserAnswers([]);
    setError(null);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110"
        aria-label="Toggle theme"
      >
        {isDark ? (
          <Sun className="text-yellow-500" size={24} />
        ) : (
          <Moon className="text-gray-700" size={24} />
        )}
      </button>

      {error && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg animate-fade-in">
          {error}
        </div>
      )}

      {appState === 'topic-select' && <TopicSelect onSelectTopic={handleSelectTopic} />}
      {appState === 'difficulty-select' && (
        <DifficultySelect
          topic={selectedTopic}
          onSelectDifficulty={handleSelectDifficulty}
          onBack={handleBackToTopics}
        />
      )}
      {appState === 'loading' && <Loader />}
      {appState === 'quiz' && quizData && (
        <Quiz quizData={quizData} onComplete={handleQuizComplete} />
      )}
      {appState === 'feedback' && quizData && (
        <Feedback
          quizData={quizData}
          score={score}
          userAnswers={userAnswers}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;
