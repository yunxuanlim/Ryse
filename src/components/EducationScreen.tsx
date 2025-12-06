import { Screen } from '../App';
import { ArrowLeft, GraduationCap, Play, Clock, Award, TrendingUp, PiggyBank, FileText } from 'lucide-react';

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
      color: 'from-purple-500 to-blue-500',
      bgColor: 'bg-purple-50',
      difficulty: 'Beginner',
      recommended: true
    },
    {
      id: 2,
      title: 'Tax Guide for Gig Workers',
      duration: '5 min',
      completed: false,
      icon: FileText,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      difficulty: 'Intermediate',
      recommended: true
    },
    {
      id: 3,
      title: 'Building Your Emergency Fund',
      duration: '3 min',
      completed: true,
      icon: PiggyBank,
      color: 'from-cyan-500 to-teal-500',
      bgColor: 'bg-cyan-50',
      difficulty: 'Beginner',
      recommended: false
    },
    {
      id: 4,
      title: 'Smart Budgeting for Irregular Income',
      duration: '6 min',
      completed: false,
      icon: GraduationCap,
      color: 'from-teal-500 to-green-500',
      bgColor: 'bg-teal-50',
      difficulty: 'Intermediate',
      recommended: false
    }
  ];

  const completedCount = courses.filter(c => c.completed).length;
  const progress = (completedCount / courses.length) * 100;

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-purple-50 via-white to-blue-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-6 rounded-b-3xl shadow-xl">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigateTo('dashboard')}
            className="w-10 h-10 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h2 className="text-white">Financial Education</h2>
            <p className="text-purple-200 text-sm">Level Up Your Money Skills</p>
          </div>
        </div>

        {/* Learning Progress */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-purple-200 text-sm mb-1">Your Progress</p>
              <h3 className="text-white">{completedCount} of {courses.length} courses</h3>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Award className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="w-full bg-white/20 rounded-full h-3 mb-2">
            <div 
              className="bg-white h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-purple-200 text-sm">{Math.round(progress)}% complete</p>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="px-6 py-6">
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-5 shadow-lg border border-amber-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-amber-900 mb-1">AI Recommendation</h4>
              <p className="text-amber-700 text-sm mb-3">Based on your RyScore and savings habits, we recommend starting with "How to Improve Your RyScore".</p>
              <button className="text-amber-900 underline text-sm">Start Learning →</button>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Courses */}
      <div className="px-6 pb-6">
        <h3 className="text-gray-900 mb-4">Recommended for You</h3>
        <div className="space-y-4">
          {courses.filter(c => c.recommended).map((course) => {
            const Icon = course.icon;
            return (
              <div key={course.id} className={`${course.bgColor} rounded-2xl p-5 shadow-lg border border-gray-200`}>
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${course.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-gray-900 pr-2">{course.title}</h4>
                      {!course.completed && (
                        <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                          <Play className="w-5 h-5 text-purple-600" />
                        </button>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-gray-600 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <span>•</span>
                      <span>{course.difficulty}</span>
                    </div>
                    {course.completed && (
                      <div className="mt-2 flex items-center gap-2 text-green-600 text-sm">
                        <Award className="w-4 h-4" />
                        <span>Completed</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* All Courses */}
      <div className="px-6 pb-32">
        <h3 className="text-gray-900 mb-4">All Courses</h3>
        <div className="space-y-3">
          {courses.filter(c => !c.recommended).map((course) => {
            const Icon = course.icon;
            return (
              <div key={course.id} className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${course.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-900 text-sm mb-1">{course.title}</h4>
                    <div className="flex items-center gap-2 text-gray-600 text-xs">
                      <Clock className="w-3 h-3" />
                      <span>{course.duration}</span>
                      <span>•</span>
                      <span>{course.difficulty}</span>
                    </div>
                  </div>
                  {course.completed ? (
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Award className="w-5 h-5 text-green-600" />
                    </div>
                  ) : (
                    <button className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Play className="w-4 h-4 text-purple-600" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
