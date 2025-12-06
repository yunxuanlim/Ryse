// ============================================
// RyScore Screen - OBSIDIAN Neon-Noir Design
// Neon score display with deep black background
// ============================================

import { Screen } from '../App';
import { ArrowLeft, TrendingUp, ChevronRight, Info } from 'lucide-react';
import { PillButton } from './ui/pill-button';

interface RyScoreScreenProps {
  navigateTo: (screen: Screen) => void;
}

export function RyScoreScreen({ navigateTo }: RyScoreScreenProps) {
  const scoreFactors = [
    { name: 'Income Stability', value: 85, desc: 'Consistent weekly earnings', emoji: '📊' },
    { name: 'Platform Ratings', value: 92, desc: '4.9★ average rating', emoji: '⭐' },
    { name: 'Work Tenure', value: 70, desc: '8 months on platforms', emoji: '📅' },
    { name: 'Savings Habits', value: 65, desc: 'Regular deposits', emoji: '💰' },
    { name: 'Repayment History', value: 100, desc: 'Never missed payment', emoji: '✅' }
  ];

  const improvements = [
    { action: 'Complete 15 more deliveries', impact: '+30', emoji: '🚴' },
    { action: 'Save consistently for 3 months', impact: '+50', emoji: '🏦' },
    { action: 'Maintain 4.8+ rating', impact: '+20', emoji: '⭐' }
  ];

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
          <h1 className="text-xl font-bold text-white-high">RyScore</h1>
        </div>

        {/* Score Card */}
        <div className="card-obsidian text-center">
          <p className="text-white-low text-sm mb-2">Your credit score</p>
          <div className="text-7xl font-bold text-neon mb-3 font-mono-nums text-glow animate-neon-pulse">720</div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl">🥇</span>
            <span className="text-lg font-semibold px-3 py-1 rounded-full glow-neon-sm" style={{ backgroundColor: 'rgba(57, 255, 20, 0.2)', color: 'var(--neon-primary)' }}>
              Gold Tier
            </span>
          </div>
          <div className="flex items-center justify-center gap-2 text-neon text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>+15 points this month</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-4 space-y-4">
        {/* Progress Bar Card */}
        <div className="card-obsidian">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white-low text-sm">Score progress</span>
            <button className="text-white-muted hover:text-white-low transition-colors">
              <Info className="w-4 h-4" />
            </button>
          </div>
          <div className="w-full bg-obsidian-300 rounded-full h-3 mb-3">
            <div 
              className="h-3 rounded-full transition-all duration-500 glow-neon-sm"
              style={{ width: '76%', backgroundColor: 'var(--neon-primary)' }}
            />
          </div>
          <div className="flex justify-between text-xs text-white-muted">
            <span>300</span>
            <span className="text-neon">720</span>
            <span>850</span>
          </div>
        </div>

        {/* Score Factors */}
        <div className="card-obsidian">
          <h3 className="text-white-high font-semibold mb-4">Score Breakdown</h3>
          <div className="space-y-4">
            {scoreFactors.map((factor, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-obsidian-300 rounded-xl flex items-center justify-center text-lg">
                  {factor.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white-high text-sm font-medium">{factor.name}</span>
                    <span className="text-neon text-sm font-mono">{factor.value}%</span>
                  </div>
                  <div className="w-full bg-obsidian-300 rounded-full h-1.5">
                    <div 
                      className="h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${factor.value}%`, backgroundColor: 'var(--neon-primary)' }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Improvements */}
        <div className="card-obsidian">
          <h3 className="text-white-high font-semibold mb-4">Boost Your Score</h3>
          <div className="space-y-3">
            {improvements.map((item, index) => (
              <button 
                key={index}
                className="w-full flex items-center gap-3 p-3 bg-obsidian-300 rounded-xl hover:bg-obsidian-400 transition-colors"
              >
                <span className="text-xl">{item.emoji}</span>
                <div className="flex-1 text-left">
                  <span className="text-white-high text-sm">{item.action}</span>
                </div>
                <span className="text-neon font-semibold text-sm">{item.impact}</span>
                <ChevronRight className="w-4 h-4 text-white-low" />
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <PillButton
          onClick={() => navigateTo('loan')}
          className="w-full"
          size="lg"
          variant="neon"
        >
          Get Quick Advance
        </PillButton>
      </div>
    </div>
  );
}
