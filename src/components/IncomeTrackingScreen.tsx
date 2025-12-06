// ============================================
// Income Tracking Screen - OBSIDIAN Neon-Noir Design
// Deep black background with neon chart bars
// ============================================

import { Screen } from '../App';
import { ArrowLeft, TrendingUp, Calendar, AlertTriangle, Lightbulb, ChevronRight } from 'lucide-react';
import { BottomNav } from './BottomNav';

interface IncomeTrackingScreenProps {
  navigateTo: (screen: Screen) => void;
}

export function IncomeTrackingScreen({ navigateTo }: IncomeTrackingScreenProps) {
  const weeklyData = [
    { day: 'Mon', amount: 180, hours: 8 },
    { day: 'Tue', amount: 220, hours: 10 },
    { day: 'Wed', amount: 160, hours: 7 },
    { day: 'Thu', amount: 240, hours: 11 },
    { day: 'Fri', amount: 280, hours: 12 },
    { day: 'Sat', amount: 320, hours: 14 },
    { day: 'Sun', amount: 200, hours: 9 }
  ];

  const maxAmount = Math.max(...weeklyData.map(d => d.amount));
  const todayIndex = 5;

  const platforms = [
    { name: 'Grab', amount: 840, percentage: 58, emoji: '🚗' },
    { name: 'Foodpanda', amount: 480, percentage: 33, emoji: '🍕' },
    { name: 'Private Jobs', amount: 130, percentage: 9, emoji: '💼' }
  ];

  return (
    <div className="h-full flex flex-col bg-obsidian-100 overflow-y-auto pb-20 scrollbar-obsidian">
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
            <h2 className="text-xl font-bold text-white-high">Activity</h2>
            <p className="text-white-low text-sm">Track your income</p>
          </div>
          <button className="flex items-center gap-2 text-white-low text-sm hover:text-white-high transition-colors">
            <Calendar className="w-4 h-4" />
            <span>This Week</span>
          </button>
        </div>
      </div>

      {/* Summary Card */}
      <div className="px-4 pt-4">
        <div className="card-neon-border">
          <p className="text-white-low text-sm mb-1">This Week's Income</p>
          <div className="flex items-end gap-3 mb-2">
            <h1 className="text-4xl font-bold text-neon font-mono-nums text-glow">RM 1,450</h1>
            <div className="mb-1 px-3 py-1 rounded-full flex items-center gap-1" style={{ backgroundColor: 'rgba(57, 255, 20, 0.2)' }}>
              <TrendingUp className="w-4 h-4 text-neon" />
              <span className="text-neon text-sm font-medium">+22%</span>
            </div>
          </div>
          <p className="text-white-muted text-sm">71 hours worked across all platforms</p>
        </div>
      </div>

      {/* Weekly Chart */}
      <div className="px-4 py-4">
        <div className="card-obsidian">
          <h3 className="text-white-high font-semibold mb-4">Daily Breakdown</h3>

          <div className="flex items-end justify-between h-40 gap-2">
            {weeklyData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full flex flex-col justify-end h-32 mb-2">
                  <div
                    className={`w-full rounded-t-lg transition-all duration-300 ${
                      index === todayIndex ? 'glow-neon-md' : ''
                    }`}
                    style={{ 
                      height: `${(data.amount / maxAmount) * 100}%`,
                      backgroundColor: index === todayIndex ? 'var(--neon-primary)' : 'var(--obsidian-300)'
                    }}
                  />
                </div>
                <span className={`text-xs ${index === todayIndex ? 'text-neon font-semibold' : 'text-white-muted'}`}>
                  {data.day}
                </span>
                <span className={`text-xs ${index === todayIndex ? 'text-neon' : 'text-white-low'}`}>
                  RM{data.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Platform Breakdown */}
      <div className="px-4 pb-4">
        <div className="card-obsidian">
          <h3 className="text-white-high font-semibold mb-4">By Platform</h3>
          <div className="space-y-4">
            {platforms.map((platform, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-obsidian-300 rounded-xl flex items-center justify-center text-lg">
                  {platform.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white-high text-sm font-medium">{platform.name}</span>
                    <span className="text-neon text-sm font-mono">RM {platform.amount}</span>
                  </div>
                  <div className="w-full bg-obsidian-300 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ width: `${platform.percentage}%`, backgroundColor: 'var(--neon-primary)' }}
                    />
                  </div>
                </div>
                <span className="text-white-low text-xs">{platform.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="px-4 pb-4">
        <div className="card-obsidian">
          <h3 className="text-white-high font-semibold mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-neon" />
            AI Insights
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-obsidian-300 rounded-xl">
              <AlertTriangle className="w-5 h-5 text-white-high mt-0.5" />
              <div>
                <p className="text-white-high text-sm font-medium">Cashflow Warning</p>
                <p className="text-white-low text-xs">You may be RM 150 short next Tuesday</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-obsidian-300 rounded-xl">
              <TrendingUp className="w-5 h-5 text-neon mt-0.5" />
              <div>
                <p className="text-white-high text-sm font-medium">Peak Earning Insight</p>
                <p className="text-white-low text-xs">Friday nights 7-10pm earn 40% more</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav currentScreen="income" navigateTo={navigateTo} />
    </div>
  );
}
