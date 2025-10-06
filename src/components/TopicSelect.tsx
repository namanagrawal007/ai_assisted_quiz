import { Lightbulb, Cpu, Rocket, Scroll, Globe, Music, Palette, Dumbbell, BookOpen, Code } from 'lucide-react';

interface Topic {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

interface TopicSelectProps {
  onSelectTopic: (topic: string) => void;
}

const topics: Topic[] = [
  { id: 'wellness', name: 'Wellness', icon: <Lightbulb size={40} />, color: 'from-emerald-500 to-teal-600' },
  { id: 'tech', name: 'Tech Trends', icon: <Cpu size={40} />, color: 'from-blue-500 to-cyan-600' },
  { id: 'space', name: 'Space', icon: <Rocket size={40} />, color: 'from-slate-500 to-slate-700' },
  { id: 'history', name: 'History', icon: <Scroll size={40} />, color: 'from-amber-500 to-orange-600' },
  { id: 'geography', name: 'Geography', icon: <Globe size={40} />, color: 'from-green-500 to-lime-600' },
  { id: 'music', name: 'Music', icon: <Music size={40} />, color: 'from-pink-500 to-rose-600' },
  { id: 'art', name: 'Art & Culture', icon: <Palette size={40} />, color: 'from-violet-500 to-fuchsia-600' },
  { id: 'sports', name: 'Sports', icon: <Dumbbell size={40} />, color: 'from-red-500 to-orange-600' },
  { id: 'literature', name: 'Literature', icon: <BookOpen size={40} />, color: 'from-sky-500 to-blue-600' },
  { id: 'programming', name: 'Programming', icon: <Code size={40} />, color: 'from-gray-600 to-gray-800' },
];

export const TopicSelect = ({ onSelectTopic }: TopicSelectProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 transition-colors duration-300">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent mb-4">
            AI-Assisted Knowledge Quiz
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Choose a topic to test your knowledge
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => onSelectTopic(topic.name)}
              className="group relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 p-6"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${topic.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

              <div className="relative flex flex-col items-center space-y-3">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${topic.color} text-white transform group-hover:rotate-12 transition-transform duration-300`}>
                  {topic.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white text-center">
                  {topic.name}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
