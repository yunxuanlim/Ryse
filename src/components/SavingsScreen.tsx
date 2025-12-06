import { useState } from 'react';
import { Screen } from '../App';
import { ArrowLeft, PiggyBank, Target, Smartphone, GraduationCap, Shield, Trophy, Plus, Edit3, X } from 'lucide-react';
import { RyseLogo } from './RyseLogo';
import { BottomNav } from './BottomNav';

interface SavingsScreenProps {
  navigateTo: (screen: Screen) => void;
}

interface SavingsJar {
  id: number;
  name: string;
  goal: number;
  current: number;
  icon: typeof Shield;
  color: string;
  bgColor: string;
  borderColor: string;
  imageEmoji: string;
}

export function SavingsScreen({ navigateTo }: SavingsScreenProps) {
  const [savingsJars, setSavingsJars] = useState<SavingsJar[]>([
    { 
      id: 1,
      name: 'Emergency Fund', 
      goal: 5000, 
      current: 2500, 
      icon: Shield, 
      color: 'from-red-500 to-orange-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      imageEmoji: '🛡️'
    },
    { 
      id: 2,
      name: 'New Phone', 
      goal: 3000, 
      current: 1800, 
      icon: Smartphone, 
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      imageEmoji: '📱'
    },
    { 
      id: 3,
      name: 'Education Fund', 
      goal: 2000, 
      current: 850, 
      icon: GraduationCap, 
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      imageEmoji: '🎓'
    }
  ]);

  const [showNewJar, setShowNewJar] = useState(false);
  const [editingJar, setEditingJar] = useState<number | null>(null);
  const [newJarName, setNewJarName] = useState('');
  const [newJarGoal, setNewJarGoal] = useState('');
  const [newJarEmoji, setNewJarEmoji] = useState('🎯');

  const totalSaved = savingsJars.reduce((sum, jar) => sum + jar.current, 0);
  const totalGoal = savingsJars.reduce((sum, jar) => sum + jar.goal, 0);

  const streakDays = 47;
  const badges = [
    { name: 'Week Warrior', earned: true, icon: '🔥' },
    { name: 'Month Master', earned: true, icon: '💪' },
    { name: 'Quarter Champion', earned: false, icon: '🏆' }
  ];

  const emojiOptions = ['🎯', '🏠', '✈️', '🚗', '💍', '🎮', '📷', '⌚', '💻', '🏍️'];

  const handleCreateJar = () => {
    if (newJarName && newJarGoal) {
      const newJar: SavingsJar = {
        id: Date.now(),
        name: newJarName,
        goal: parseInt(newJarGoal),
        current: 0,
        icon: Target,
        color: 'from-teal-500 to-green-500',
        bgColor: 'bg-teal-50',
        borderColor: 'border-teal-200',
        imageEmoji: newJarEmoji
      };
      setSavingsJars([...savingsJars, newJar]);
      setShowNewJar(false);
      setNewJarName('');
      setNewJarGoal('');
      setNewJarEmoji('🎯');
    }
  };

  const handleAdjustGoal = (jarId: number, newGoal: string) => {
    setSavingsJars(savingsJars.map(jar => 
      jar.id === jarId ? { ...jar, goal: parseInt(newGoal) || jar.goal } : jar
    ));
    setEditingJar(null);
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-purple-50 via-white to-blue-50 overflow-y-auto pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-6 rounded-b-3xl shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <RyseLogo navigateTo={navigateTo} />
          <button
            onClick={() => navigateTo('dashboard')}
            className="w-10 h-10 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="mb-6">
          <h2 className="text-white">Savings</h2>
          <p className="text-purple-200 text-sm">Micro-Savings System</p>
        </div>

        {/* Total Savings */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
          <p className="text-purple-200 text-sm mb-2">Total Saved</p>
          <h1 className="text-white mb-4">RM {totalSaved.toLocaleString()}</h1>
          
          <div className="w-full bg-white/20 rounded-full h-3 mb-2">
            <div 
              className="bg-white h-3 rounded-full transition-all duration-500"
              style={{ width: `${(totalSaved / totalGoal) * 100}%` }}
            ></div>
          </div>
          <p className="text-purple-200 text-sm">RM {(totalGoal - totalSaved).toLocaleString()} to reach all goals</p>
        </div>
      </div>

      {/* Savings Streak */}
      <div className="px-6 py-6">
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-5 shadow-lg border border-amber-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-amber-900">Savings Streak</h3>
                <p className="text-amber-700">{streakDays} days in a row!</p>
              </div>
            </div>
            <div className="text-4xl">🔥</div>
          </div>
        </div>
      </div>

      {/* Savings Jars */}
      <div className="px-6 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Your Savings Jars</h3>
          <button 
            onClick={() => setShowNewJar(true)}
            className="flex items-center gap-1 text-purple-600 text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>New Jar</span>
          </button>
        </div>

        <div className="space-y-4">
          {savingsJars.map((jar) => {
            const progress = (jar.current / jar.goal) * 100;
            const opacity = Math.max(0.2, progress / 100);
            
            return (
              <div key={jar.id} className={`${jar.bgColor} rounded-3xl p-5 shadow-lg border ${jar.borderColor}`}>
                {/* Visual Representation */}
                <div className="mb-4 flex justify-center">
                  <div 
                    className="text-8xl transition-opacity duration-500 relative"
                    style={{ 
                      opacity: opacity,
                      filter: `grayscale(${100 - progress}%)`
                    }}
                  >
                    {jar.imageEmoji}
                    {progress < 100 && (
                      <div 
                        className="absolute inset-0 bg-gray-300/50 backdrop-blur-sm"
                        style={{ 
                          clipPath: `inset(0 0 ${progress}% 0)`
                        }}
                      ></div>
                    )}
                  </div>
                </div>

                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-gray-900 mb-1">{jar.name}</h4>
                    <p className="text-gray-600 text-sm">RM {jar.current.toLocaleString()} / RM {jar.goal.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-900 text-2xl">{Math.round(progress)}%</span>
                  </div>
                </div>

                <div className="w-full bg-white/50 rounded-full h-3 mb-3">
                  <div 
                    className={`bg-gradient-to-r ${jar.color} h-3 rounded-full transition-all duration-500`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                <div className="flex items-center gap-2">
                  {editingJar === jar.id ? (
                    <div className="flex items-center gap-2 flex-1">
                      <input
                        type="number"
                        defaultValue={jar.goal}
                        onBlur={(e) => handleAdjustGoal(jar.id, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        autoFocus
                      />
                      <button
                        onClick={() => setEditingJar(null)}
                        className="text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setEditingJar(jar.id)}
                      className="flex items-center gap-1 text-gray-700 text-sm"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Adjust goal</span>
                    </button>
                  )}
                </div>

                {progress >= 100 && (
                  <div className="mt-3 bg-green-100 border border-green-200 rounded-xl p-3 text-center">
                    <p className="text-green-700">🎉 Goal Achieved!</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* New Jar Modal */}
      {showNewJar && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-gray-900">Create New Savings Jar</h3>
              <button onClick={() => setShowNewJar(false)}>
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2 text-sm">Goal Name</label>
              <input
                type="text"
                value={newJarName}
                onChange={(e) => setNewJarName(e.target.value)}
                placeholder="e.g., Vacation Fund"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2 text-sm">Target Amount (RM)</label>
              <input
                type="number"
                value={newJarGoal}
                onChange={(e) => setNewJarGoal(e.target.value)}
                placeholder="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2 text-sm">Choose Icon</label>
              <div className="grid grid-cols-5 gap-3">
                {emojiOptions.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => setNewJarEmoji(emoji)}
                    className={`text-4xl p-3 rounded-xl transition-all ${
                      newJarEmoji === emoji 
                        ? 'bg-purple-100 scale-110' 
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleCreateJar}
              disabled={!newJarName || !newJarGoal}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl disabled:opacity-50"
            >
              Create Jar
            </button>
          </div>
        </div>
      )}

      {/* Smart Rules */}
      <div className="px-6 pb-6">
        <h3 className="text-gray-900 mb-4">Smart Savings Rules</h3>
        <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <Target className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-gray-900">Weekly Auto-Save</h4>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
              <p className="text-gray-600 text-sm">Save 10% of last week's income every Sunday</p>
              <p className="text-purple-600 text-sm mt-1">Next save: RM 124 on Sunday</p>
            </div>
          </div>

          <div className="h-px bg-gray-200"></div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <PiggyBank className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-gray-900">Round-up Savings</h4>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
              <p className="text-gray-600 text-sm">Round up purchases to nearest RM 5 and save difference</p>
            </div>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="px-6 pb-32">
        <h3 className="text-gray-900 mb-4">Achievement Badges</h3>
        <div className="grid grid-cols-3 gap-3">
          {badges.map((badge, index) => (
            <div 
              key={index} 
              className={`rounded-2xl p-4 text-center ${
                badge.earned 
                  ? 'bg-gradient-to-br from-amber-100 to-yellow-100 border border-amber-200' 
                  : 'bg-gray-100 border border-gray-200 opacity-50'
              }`}
            >
              <div className="text-4xl mb-2">{badge.icon}</div>
              <p className={`text-xs ${badge.earned ? 'text-amber-900' : 'text-gray-500'}`}>
                {badge.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      <BottomNav currentScreen="savings" navigateTo={navigateTo} />
    </div>
  );
}
