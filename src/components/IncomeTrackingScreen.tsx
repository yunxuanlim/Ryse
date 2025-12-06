import { Screen } from '../App';
import { ArrowLeft, TrendingUp, TrendingDown, Calendar, AlertTriangle, Lightbulb } from 'lucide-react';
import { RyseLogo } from './RyseLogo';
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

  const platforms = [
    { name: 'Grab', amount: 840, percentage: 58, color: 'bg-green-500' },
    { name: 'Foodpanda', amount: 480, percentage: 33, color: 'bg-pink-500' },
    { name: 'Private Jobs', amount: 130, percentage: 9, color: 'bg-blue-500' }
  ];

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
            <h2 className="text-white">Income Tracking</h2>
            <p className="text-purple-200 text-sm">Smart Cashflow Insights</p>
          </div>
        </div>

        {/* This Week Summary */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
          <p className="text-purple-200 text-sm mb-2">This Week's Income</p>
          <div className="flex items-end gap-3 mb-3">
            <h1 className="text-white">RM 1,450</h1>
            <div className="mb-2 px-3 py-1 bg-green-500/20 rounded-full flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm">+22%</span>
            </div>
          </div>
          <p className="text-purple-200 text-sm">71 hours worked across all platforms</p>
        </div>
      </div>

      {/* Weekly Chart */}
      <div className="px-6 py-6">
        <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">Daily Breakdown</h3>
            <button className="flex items-center gap-2 text-purple-600 text-sm">
              <Calendar className="w-4 h-4" />
              <span>This Week</span>
            </button>
          </div>

          <div className="flex items-end justify-between h-48 gap-2">
            {weeklyData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full flex flex-col justify-end h-40 mb-2">
                  <div
                    className="w-full bg-gradient-to-t from-purple-500 to-blue-500 rounded-t-lg relative group cursor-pointer"
                    style={{ height: `${(data.amount / maxAmount) * 100}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      RM {data.amount}
                    </div>
                  </div>
                </div>
                <span className="text-gray-600 text-xs">{data.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Platform Breakdown */}
      <div className="px-6 pb-6">
        <h3 className="text-gray-900 mb-4">Income by Platform</h3>
        <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 space-y-4">
          {platforms.map((platform, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-800">{platform.name}</span>
                <span className="text-gray-900">RM {platform.amount}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className={`${platform.color} h-2 rounded-full`} style={{ width: `${platform.percentage}%` }}></div>
                </div>
                <span className="text-gray-600 text-sm w-12 text-right">{platform.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Predictions */}
      <div className="px-6 pb-6">
        <h3 className="text-gray-900 mb-4">AI Cashflow Prediction</h3>
        
        {/* Warning Alert */}
        <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-4 border border-orange-200 mb-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-orange-900 mb-1">Cashflow Warning</h4>
              <p className="text-orange-700 text-sm mb-2">You may be short RM 150 for bills next Tuesday based on your predicted income.</p>
              <button className="text-orange-900 text-sm underline">View suggestions</button>
            </div>
          </div>
        </div>

        {/* Insight */}
        <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl p-4 border border-blue-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-blue-900 mb-1">Peak Earning Insight</h4>
              <p className="text-blue-700 text-sm">You earn most on Friday nights 7-10pm (avg RM 85/hr). Consider working more during this window.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Next 7 Days Prediction */}
      <div className="px-6 pb-24">
        <h3 className="text-gray-900 mb-4">Next 7 Days Forecast</h3>
        <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
          <div className="grid grid-cols-7 gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
              const amounts = [180, 140, 200, 220, 290, 310, 190];
              const amount = amounts[index];
              const isLow = amount < 160;
              
              return (
                <div key={index} className="text-center">
                  <p className="text-gray-600 text-xs mb-2">{day}</p>
                  <div className={`px-2 py-3 rounded-lg ${isLow ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
                    <p className={`text-sm ${isLow ? 'text-red-700' : 'text-green-700'}`}>
                      {amount}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-gray-500 text-xs text-center mt-4">Predicted income in RM based on your work patterns</p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav currentScreen="income" navigateTo={navigateTo} />
    </div>
  );
}