// ============================================
// Education Screen - OBSIDIAN Neon-Noir Design
// Deep black background with neon accents
// ============================================

import { Screen } from '../App';
import { ArrowLeft, Play, Clock, CheckCircle, ChevronRight } from 'lucide-react';

interface EducationScreenProps {
  navigateTo: (screen: Screen) => void;
}

export function EducationScreen({ navigateTo }: EducationScreenProps) {
  const courses = [
    {
      id: 1,
      title: 'How to Improve Your RyScore',
      duration: '4 min',
      completed: false,
      emoji: '📈',
      difficulty: 'Beginner',
      recommended: true
    },
    {
      id: 2,
      title: 'Tax Guide for Gig Workers',
      duration: '5 min',
      completed: false,
      emoji: '📄',
      difficulty: 'Intermediate',
      recommended: true
    },
    {
      id: 3,
      title: 'Building Your Emergency Fund',
      duration: '3 min',
      completed: true,
      emoji: '🐷',
      difficulty: 'Beginner',
      recommended: false
    },
    {
      id: 4,
      title: 'Smart Budgeting for Irregular Income',
      duration: '6 min',
      completed: false,
      emoji: '💡',
      difficulty: 'Intermediate',
      recommended: false
    }
  ];

  const completedCount = courses.filter(c => c.completed).length;
  const progress = (completedCount / courses.length) * 100;

  return (
    <div className="h-full flex flex-col bg-obsidian-100 overflow-y-auto scrollbar-obsidian">
      {/* Header */}
      <div className="bg-obsidian-200 px-6 py-4 border-b" style={{ borderColor: 'var(--white-divider)' }}>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigateTo('dashboard')}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-obsidian-300 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white-high" />
          </button>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white-high">Learn</h2>
            <p className="text-white-low text-sm">Financial education</p>
          </div>
        </div>
      </div>

      {/* Progress Card */}
      <div className="px-4 pt-4">
        <div className="card-neon-border">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-white-low text-sm">Learning Progress</p>
              <p className="text-2xl font-bold text-neon font-mono-nums">{completedCount}/{courses.length} courses</p>
            </div>
            <div className="text-4xl">🎓</div>
          </div>
          <div className="w-full bg-obsidian-300 rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all duration-500 glow-neon-sm"
              style={{ width: `${progress}%`, backgroundColor: 'var(--neon-primary)' }}
            />
          </div>
          <p className="text-white-muted text-xs mt-2">Complete courses to improve your financial knowledge</p>
        </div>
      </div>

      {/* Recommended Courses */}
      <div className="px-4 pt-4">
        <h3 className="text-white-high font-semibold mb-3">Recommended for you</h3>
        <div className="space-y-3">
          {courses.filter(c => c.recommended).map((course) => (
            <button
              key={course.id}
              className="w-full card-obsidian flex items-center gap-4 text-left hover:bg-obsidian-300 transition-colors"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl bg-obsidian-300">
                {course.emoji}
              </div>
              <div className="flex-1">
                <h4 className="text-white-high font-medium">{course.title}</h4>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1 text-white-muted text-xs">
                    <Clock className="w-3 h-3" />
                    <span>{course.duration}</span>
                  </div>
                  <span className="text-neon text-xs font-medium">{course.difficulty}</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center glow-neon-sm" style={{ backgroundColor: 'var(--neon-primary)' }}>
                <Play className="w-5 h-5 text-obsidian-100 ml-0.5" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* All Courses */}
      <div className="px-4 pt-4 pb-24">
        <h3 className="text-white-high font-semibold mb-3">All courses</h3>
        <div className="space-y-3">
          {courses.map((course) => (
            <button
              key={course.id}
              className="w-full card-obsidian flex items-center gap-4 text-left hover:bg-obsidian-300 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-obsidian-300">
                {course.emoji}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-white-high font-medium text-sm">{course.title}</h4>
                  {course.completed && (
                    <CheckCircle className="w-4 h-4 text-neon" />
                  )}
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1 text-white-muted text-xs">
                    <Clock className="w-3 h-3" />
                    <span>{course.duration}</span>
                  </div>
                  <span className={`text-xs ${course.difficulty === 'Beginner' ? 'text-neon' : 'text-white-low'}`}>
                    {course.difficulty}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-white-low" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
