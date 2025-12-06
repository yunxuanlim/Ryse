// ============================================
// Education Screen - Cash App Inspired
// Clean white cards, black accents
// ============================================

import { Screen } from '../App';
import { ArrowLeft, GraduationCap, Play, Clock, Award, TrendingUp, PiggyBank, FileText, CheckCircle, ChevronRight } from 'lucide-react';

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
      icon: TrendingUp,
      emoji: '📈',
      difficulty: 'Beginner',
      recommended: true
    },
    {
      id: 2,
      title: 'Tax Guide for Gig Workers',
      duration: '5 min',
      completed: false,
      icon: FileText,
      emoji: '📄',
      difficulty: 'Intermediate',
      recommended: true
    },
    {
      id: 3,
      title: 'Building Your Emergency Fund',
      duration: '3 min',
      completed: true,
      icon: PiggyBank,
      emoji: '🐷',
      difficulty: 'Beginner',
      recommended: false
    },
    {
      id: 4,
      title: 'Smart Budgeting for Irregular Income',
      duration: '6 min',
      completed: false,
      icon: GraduationCap,
      emoji: '💡',
      difficulty: 'Intermediate',
      recommended: false
    }
  ];

  const completedCount = courses.filter(c => c.completed).length;
  const progress = (completedCount / courses.length) * 100;

  return (
    <div className="h-full flex flex-col bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigateTo('dashboard')}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-black" />
          </button>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">Learn</h2>
            <p className="text-gray-500 text-sm">Level up your money skills</p>
          </div>
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--ryse-green, #B9FF00)' }}
          >
            <GraduationCap className="w-5 h-5 text-black" />
          </div>
        </div>
      </div>

      {/* Progress Card */}
      <div className="px-4 pt-4">
        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-500 text-sm mb-1">Your Progress</p>
              <h3 className="text-2xl font-bold text-gray-900">{completedCount} of {courses.length}</h3>
              <p className="text-gray-400 text-sm">courses completed</p>
            </div>
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center">
              <span className="text-3xl">🎓</span>
            </div>
          </div>

          <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
            <div 
              className="bg-black h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-gray-500 text-sm">{Math.round(progress)}% complete</p>
        </div>
      </div>

      {/* AI Recommendation */}
      <div className="px-4 py-4">
        <div 
          className="rounded-2xl p-4 shadow-sm"
          style={{ backgroundColor: 'var(--ryse-green, #B9FF00)' }}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-lg">✨</span>
            </div>
            <div className="flex-1">
              <h4 className="text-black font-semibold mb-1">AI Recommendation</h4>
              <p className="text-black/70 text-sm mb-3">Based on your RyScore, start with "How to Improve Your RyScore"</p>
              <button className="text-black font-medium text-sm flex items-center gap-1">
                Start Learning <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Courses */}
      <div className="px-4 pb-4">
        <h3 className="text-gray-900 font-semibold mb-3">Recommended for You</h3>
        <div className="space-y-3">
          {courses.filter(c => c.recommended).map((course) => (
            <div key={course.id} className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">{course.emoji}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 pr-3">
                      <h4 className="text-gray-900 font-medium mb-1">{course.title}</h4>
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                        <span>•</span>
                        <span>{course.difficulty}</span>
                      </div>
                    </div>
                    {!course.completed ? (
                      <button className="w-10 h-10 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                        <Play className="w-5 h-5 text-white ml-0.5" />
                      </button>
                    ) : (
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Courses */}
      <div className="px-4 pb-24">
        <h3 className="text-gray-900 font-semibold mb-3">All Courses</h3>
        <div className="space-y-2">
          {courses.filter(c => !c.recommended).map((course) => (
            <div key={course.id} className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">{course.emoji}</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-900 font-medium text-sm mb-1">{course.title}</h4>
                  <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <Clock className="w-3 h-3" />
                    <span>{course.duration}</span>
                    <span>•</span>
                    <span>{course.difficulty}</span>
                  </div>
                </div>
                {course.completed ? (
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                ) : (
                  <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <Play className="w-4 h-4 text-gray-600 ml-0.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
