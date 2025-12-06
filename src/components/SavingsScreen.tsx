// ============================================
// Savings Screen - OBSIDIAN Neon-Noir Design
// Deep black background with neon accents
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
    <div className="h-full flex flex-col bg-obsidian-100 overflow-y-auto pb-24 scrollbar-obsidian">
      {/* Header */}
      <div className="bg-obsidian-200 px-4 pt-4 pb-6 border-b" style={{ borderColor: 'var(--white-divider)' }}>
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigateTo('dashboard')}
            className="w-10 h-10 flex items-center justify-center hover:bg-obsidian-300 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white-high" />
          </button>
          <h1 className="text-xl font-bold text-white-high">Savings</h1>
        </div>

        {/* Total Savings Card */}
        <div className="card-obsidian text-center">
          <p className="text-white-low text-sm mb-1">Total savings</p>
          <h2 className="text-5xl font-bold text-neon mb-2 font-mono-nums text-glow">
            RM {totalSaved.toLocaleString()}
          </h2>
          <div className="flex items-center justify-center gap-2 text-neon text-sm font-medium">
            <TrendingUp className="w-4 h-4" />
            <span>Earning {interestRate}% APY</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-4 space-y-4">
        {/* New Goal Button */}
        <button
          onClick={() => setShowNewJar(true)}
          className="w-full card-obsidian flex items-center gap-4 hover:bg-obsidian-300 transition-colors"
        >
          <div className="w-12 h-12 rounded-full flex items-center justify-center glow-neon-sm" style={{ backgroundColor: 'var(--neon-primary)' }}>
            <Plus className="w-6 h-6 text-obsidian-100" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-white-high font-semibold">Create new goal</p>
            <p className="text-white-low text-sm">Set up automatic savings</p>
          </div>
          <ChevronRight className="w-5 h-5 text-white-low" />
        </button>

        {/* Savings Jars */}
        <h3 className="text-white-high font-semibold px-1 pt-2">Your Goals</h3>
        {savingsJars.map((jar) => {
          const progress = (jar.current / jar.goal) * 100;
          
          return (
            <div key={jar.id} className="card-obsidian">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-obsidian-300 rounded-full flex items-center justify-center text-xl">
                  {jar.emoji}
                </div>
                <div className="flex-1">
                  <p className="text-white-high font-medium">{jar.name}</p>
                  <p className="text-white-low text-sm">
                    RM {jar.current.toLocaleString()} of RM {jar.goal.toLocaleString()}
                  </p>
                </div>
                <span className="text-neon text-sm font-medium">{progress.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-obsidian-300 rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-500 glow-neon-sm"
                  style={{ width: `${progress}%`, backgroundColor: 'var(--neon-primary)' }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* New Jar Modal */}
      {showNewJar && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-end justify-center">
          <div className="bg-obsidian-200 w-full max-w-md rounded-t-3xl p-6 border-t" style={{ borderColor: 'var(--white-divider)' }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white-high">New savings goal</h3>
              <button
                onClick={() => setShowNewJar(false)}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-obsidian-300"
              >
                <X className="w-6 h-6 text-white-high" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Emoji Picker */}
              <div>
                <label className="text-white-low text-sm block mb-2">Choose an icon</label>
                <div className="flex gap-2 flex-wrap">
                  {emojiOptions.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => setNewJarEmoji(emoji)}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all ${
                        newJarEmoji === emoji 
                          ? 'bg-neon' 
                          : 'bg-obsidian-300 hover:bg-obsidian-400'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name Input */}
              <div>
                <label className="text-white-low text-sm block mb-2">Goal name</label>
                <input
                  type="text"
                  value={newJarName}
                  onChange={(e) => setNewJarName(e.target.value)}
                  placeholder="e.g., New Laptop"
                  className="input-obsidian w-full"
                />
              </div>

              {/* Amount Input */}
              <div>
                <label className="text-white-low text-sm block mb-2">Target amount</label>
                <div className="flex items-center gap-2">
                  <span className="text-white-high font-medium">RM</span>
                  <input
                    type="number"
                    value={newJarGoal}
                    onChange={(e) => setNewJarGoal(e.target.value)}
                    placeholder="5000"
                    className="input-obsidian flex-1"
                  />
                </div>
              </div>

              <PillButton
                onClick={handleCreateJar}
                disabled={!newJarName || !newJarGoal}
                className="w-full mt-4"
                size="lg"
                variant="neon"
              >
                Create Goal
              </PillButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
