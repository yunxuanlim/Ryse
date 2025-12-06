// ============================================
// Income Tracking Screen - Cash App Inspired
// Clean white cards, black accents, minimal UI
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
  const todayIndex = 5; // Saturday as example

  const platforms = [
    { name: 'Grab', amount: 840, percentage: 58, emoji: '🚗' },
    { name: 'Foodpanda', amount: 480, percentage: 33, emoji: '🍕' },
    { name: 'Private Jobs', amount: 130, percentage: 9, emoji: '💼' }
  ];

  return (
    <div className="h-full flex flex-col bg-gray-50 overflow-y-auto pb-20">
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
            <h2 className="text-xl font-bold text-gray-900">Activity</h2>
            <p className="text-gray-500 text-sm">Track your income</p>
          </div>
          <button className="flex items-center gap-2 text-gray-600 text-sm">
            <Calendar className="w-4 h-4" />
            <span>This Week</span>
          </button>
        </div>
      </div>

      {/* Summary Card */}
      <div className="px-4 pt-4">
        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <p className="text-gray-500 text-sm mb-1">This Week's Income</p>
          <div className="flex items-end gap-3 mb-2">
            <h1 className="text-4xl font-bold text-gray-900">RM 1,450</h1>
            <div className="mb-1 px-3 py-1 bg-green-100 rounded-full flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-green-600 text-sm font-medium">+22%</span>
            </div>
          </div>
          <p className="text-gray-400 text-sm">71 hours worked across all platforms</p>
        </div>
      </div>

      {/* Weekly Chart */}
      <div className="px-4 py-4">
        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <h3 className="text-gray-900 font-semibold mb-4">Daily Breakdown</h3>

          <div className="flex items-end justify-between h-40 gap-2">
            {weeklyData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full flex flex-col justify-end h-32 mb-2">
                  <div
                    className={`w-full rounded-lg relative group cursor-pointer transition-colors ${
                      index === todayIndex ? 'bg-black' : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                    style={{ height: `${(data.amount / maxAmount) * 100}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      RM {data.amount}
                    </div>
                  </div>
                </div>
                <span className={`text-xs ${index === todayIndex ? 'text-black font-semibold' : 'text-gray-400'}`}>
                  {data.day}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Platform Breakdown */}
      <div className="px-4 pb-4">
        <h3 className="text-gray-900 font-semibold mb-3">Income by Platform</h3>
        <div className="bg-white rounded-3xl p-5 shadow-sm space-y-4">
          {platforms.map((platform, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{platform.emoji}</span>
                  <span className="text-gray-800 font-medium">{platform.name}</span>
                </div>
                <span className="text-gray-900 font-semibold">RM {platform.amount}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div 
                    className="bg-black h-2 rounded-full transition-all" 
                    style={{ width: `${platform.percentage}%` }}
                  />
                </div>
                <span className="text-gray-500 text-sm w-12 text-right">{platform.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="px-4 pb-4">
        <h3 className="text-gray-900 font-semibold mb-3">AI Insights</h3>
        
        {/* Warning Alert */}
        <div className="bg-amber-50 rounded-2xl p-4 mb-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <h4 className="text-gray-900 font-medium mb-1">Cashflow Warning</h4>
              <p className="text-gray-600 text-sm mb-2">You may be short RM 150 for bills next Tuesday.</p>
              <button className="text-black text-sm font-medium flex items-center gap-1">
                View suggestions <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Insight */}
        <div 
          className="rounded-2xl p-4"
          style={{ backgroundColor: 'var(--ryse-green, #B9FF00)' }}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-black font-medium mb-1">Peak Earning Insight</h4>
              <p className="text-black/70 text-sm">You earn most on Friday nights 7-10pm (avg RM 85/hr). Work more during this window!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Next 7 Days Prediction */}
      <div className="px-4 pb-24">
        <h3 className="text-gray-900 font-semibold mb-3">Next 7 Days Forecast</h3>
        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <div className="grid grid-cols-7 gap-2">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => {
              const amounts = [180, 140, 200, 220, 290, 310, 190];
              const amount = amounts[index];
              const isLow = amount < 160;
              
              return (
                <div key={index} className="text-center">
                  <p className="text-gray-400 text-xs mb-2">{day}</p>
                  <div className={`py-2 rounded-xl ${isLow ? 'bg-red-50' : 'bg-gray-50'}`}>
                    <p className={`text-sm font-medium ${isLow ? 'text-red-600' : 'text-gray-700'}`}>
                      {amount}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-gray-400 text-xs text-center mt-4">Predicted income in RM</p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav currentScreen="income" navigateTo={navigateTo} />
    </div>
  );
}
