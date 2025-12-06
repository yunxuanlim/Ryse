// ============================================
// Savings Screen - Cash App Inspired Design
// Clean savings jars with gray bg, white cards
// ============================================

import { useState } from 'react';
import { Screen } from '../App';
import { ArrowLeft, Plus, ChevronRight, TrendingUp, X } from 'lucide-react';
import { PillButton } from './ui/pill-button';

interface SavingsScreenProps {
  navigateTo: (screen: Screen) => void;
}

interface SavingsJar {
  id: number;
  name: string;
  goal: number;
  current: number;
  emoji: string;
}

export function SavingsScreen({ navigateTo }: SavingsScreenProps) {
  const [savingsJars, setSavingsJars] = useState<SavingsJar[]>([
    { id: 1, name: 'Emergency Fund', goal: 5000, current: 2500, emoji: '🛡️' },
    { id: 2, name: 'New Phone', goal: 3000, current: 1800, emoji: '📱' },
    { id: 3, name: 'Education', goal: 2000, current: 850, emoji: '🎓' },
  ]);

  const [showNewJar, setShowNewJar] = useState(false);
  const [newJarName, setNewJarName] = useState('');
  const [newJarGoal, setNewJarGoal] = useState('');
  const [newJarEmoji, setNewJarEmoji] = useState('🎯');

  const totalSaved = savingsJars.reduce((sum, jar) => sum + jar.current, 0);
  const interestRate = 3.75;

  const emojiOptions = ['🎯', '🏠', '✈️', '🚗', '💍', '🎮', '📷', '⌚', '💻', '🏍️'];

  const handleCreateJar = () => {
    if (newJarName && newJarGoal) {
      const newJar: SavingsJar = {
        id: Date.now(),
        name: newJarName,
        goal: parseInt(newJarGoal),
        current: 0,
        emoji: newJarEmoji,
      };
      setSavingsJars([...savingsJars, newJar]);
      setNewJarName('');
      setNewJarGoal('');
      setNewJarEmoji('🎯');
      setShowNewJar(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 overflow-y-auto pb-24">
      {/* Header */}
      <div className="bg-white px-4 pt-4 pb-6">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigateTo('dashboard')}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-6 h-6 text-black" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Savings</h1>
        </div>

        {/* Total Savings Card */}
        <div className="bg-gray-50 rounded-3xl p-6 text-center">
          <p className="text-gray-500 text-sm mb-1">Total savings</p>
          <h2 className="text-5xl font-bold text-gray-900 mb-2">
            RM {totalSaved.toLocaleString()}
          </h2>
          <div className="flex items-center justify-center gap-2 text-green-600 text-sm font-medium">
            <TrendingUp className="w-4 h-4" />
            <span>Earning {interestRate}% APY</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-4 space-y-4">
        {/* Interest Banner */}
        <div 
          className="rounded-3xl p-5 shadow-sm flex items-center gap-4"
          style={{ backgroundColor: 'var(--ryse-green, #B9FF00)' }}
        >
          <div className="text-3xl">💰</div>
          <div className="flex-1">
            <p className="font-bold text-gray-900">Earn up to {interestRate}%</p>
            <p className="text-gray-700 text-sm">On all your savings with RYSE</p>
          </div>
        </div>

        {/* Savings Jars */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-semibold text-gray-900">Your goals</h3>
            <button 
              onClick={() => setShowNewJar(true)}
              className="text-sm text-gray-600 font-medium flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> New goal
            </button>
          </div>

          {savingsJars.map((jar) => {
            const progress = (jar.current / jar.goal) * 100;
            return (
              <div key={jar.id} className="bg-white rounded-3xl p-5 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-2xl">
                    {jar.emoji}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{jar.name}</p>
                    <p className="text-gray-500 text-sm">
                      RM {jar.current.toLocaleString()} of RM {jar.goal.toLocaleString()}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 bg-black rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                <p className="text-right text-xs text-gray-400 mt-2">
                  {Math.round(progress)}% complete
                </p>
              </div>
            );
          })}
        </div>

        {/* Quick Add Card */}
        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <p className="text-gray-500 text-sm mb-3">Quick deposit</p>
          <div className="flex gap-2">
            {[50, 100, 200, 500].map((amount) => (
              <button
                key={amount}
                className="flex-1 py-3 bg-gray-100 rounded-xl font-medium text-gray-900 hover:bg-gray-200 transition-colors"
              >
                RM {amount}
              </button>
            ))}
          </div>
        </div>

        {/* Streak */}
        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🔥</div>
              <div>
                <p className="font-semibold text-gray-900">47 day streak</p>
                <p className="text-gray-500 text-sm">Keep saving daily!</p>
              </div>
            </div>
            <div className="flex gap-1">
              {['🔥', '💪', '🏆'].map((badge, i) => (
                <span key={i} className={`text-xl ${i === 2 ? 'opacity-30' : ''}`}>
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* New Jar Modal */}
      {showNewJar && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-3xl p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">New savings goal</h2>
              <button 
                onClick={() => setShowNewJar(false)}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Choose an emoji</label>
                <div className="flex flex-wrap gap-2">
                  {emojiOptions.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => setNewJarEmoji(emoji)}
                      className={`w-12 h-12 rounded-xl text-2xl flex items-center justify-center transition-all ${
                        newJarEmoji === emoji ? 'bg-black text-white' : 'bg-gray-100'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Goal name</label>
                <input
                  type="text"
                  value={newJarName}
                  onChange={(e) => setNewJarName(e.target.value)}
                  placeholder="e.g., New Car"
                  className="w-full px-4 py-3 bg-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Target amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">RM</span>
                  <input
                    type="number"
                    value={newJarGoal}
                    onChange={(e) => setNewJarGoal(e.target.value)}
                    placeholder="0"
                    className="w-full px-4 py-3 pl-12 bg-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>

              <PillButton
                onClick={handleCreateJar}
                disabled={!newJarName || !newJarGoal}
                className="w-full"
                size="lg"
              >
                Create goal
              </PillButton>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-8 py-4 max-w-md mx-auto">
        <div className="flex justify-around">
          <button onClick={() => navigateTo('dashboard')} className="text-gray-400 text-sm">
            Money
          </button>
          <button onClick={() => navigateTo('ryscore')} className="text-gray-400 text-sm">
            Score
          </button>
          <button className="text-black font-semibold text-sm border-b-2 border-black pb-1">
            Savings
          </button>
        </div>
      </div>

      {/* Animation styles */}
      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
