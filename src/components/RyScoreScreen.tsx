// ============================================
// RyScore Screen - Cash App Inspired Design
// Clean score display with white cards on gray bg
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
          <h1 className="text-xl font-bold text-gray-900">RyScore</h1>
        </div>

        {/* Score Card */}
        <div className="bg-gray-50 rounded-3xl p-8 text-center">
          <p className="text-gray-500 text-sm mb-2">Your credit score</p>
          <div className="text-7xl font-bold text-gray-900 mb-3 tabular-nums">720</div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl">🥇</span>
            <span className="text-lg font-semibold text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
              Gold Tier
            </span>
          </div>
          <div className="flex items-center justify-center gap-2 text-green-600 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>+15 points this month</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-4 space-y-4">
        {/* Progress Bar Card */}
        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-500 text-sm">Score progress</span>
            <button className="text-gray-400">
              <Info className="w-4 h-4" />
            </button>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
            <div 
              className="h-3 bg-black rounded-full transition-all duration-500"
              style={{ width: '76%' }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>300</span>
            <span>720</span>
            <span>850</span>
          </div>
        </div>

        {/* Score Factors */}
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">What makes up your score</h3>
          </div>
          {scoreFactors.map((factor, index) => (
            <div 
              key={factor.name}
              className={`flex items-center gap-4 p-4 ${index !== scoreFactors.length - 1 ? 'border-b border-gray-50' : ''}`}
            >
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-xl">
                {factor.emoji}
              </div>
              <div className="flex-1">
                <p className="text-gray-900 font-medium text-sm">{factor.name}</p>
                <p className="text-gray-400 text-xs">{factor.desc}</p>
              </div>
              <div className="text-right">
                <span className="text-gray-900 font-semibold">{factor.value}%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Ways to Improve */}
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Ways to improve</h3>
          </div>
          {improvements.map((item, index) => (
            <button 
              key={item.action}
              className={`w-full flex items-center gap-4 p-4 hover:bg-gray-50 ${index !== improvements.length - 1 ? 'border-b border-gray-50' : ''}`}
            >
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-xl">
                {item.emoji}
              </div>
              <div className="flex-1 text-left">
                <p className="text-gray-900 font-medium text-sm">{item.action}</p>
                <p className="text-green-600 text-xs font-medium">{item.impact} points</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>

        {/* Unlock More */}
        <div 
          className="rounded-3xl p-6 shadow-sm"
          style={{ backgroundColor: 'var(--ryse-green, #B9FF00)' }}
        >
          <div className="flex items-start gap-4">
            <div className="text-3xl">💳</div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-1">Unlock up to RM 1,500</h3>
              <p className="text-gray-700 text-sm mb-4">
                Your Gold tier qualifies you for instant cash advances
              </p>
              <PillButton size="sm" className="w-full">
                Apply Now
              </PillButton>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-8 py-4 max-w-md mx-auto">
        <div className="flex justify-around">
          <button onClick={() => navigateTo('dashboard')} className="text-gray-400 text-sm">
            Money
          </button>
          <button className="text-black font-semibold text-sm border-b-2 border-black pb-1">
            Score
          </button>
          <button onClick={() => navigateTo('savings')} className="text-gray-400 text-sm">
            Savings
          </button>
        </div>
      </div>
    </div>
  );
}
