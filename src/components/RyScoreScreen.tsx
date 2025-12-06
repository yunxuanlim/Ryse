import { Screen } from '../App';
import { ArrowLeft, TrendingUp, Award, Target, CheckCircle, CreditCard } from 'lucide-react';
import { RyseLogo } from './RyseLogo';
import { BottomNav } from './BottomNav';

interface RyScoreScreenProps {
  navigateTo: (screen: Screen) => void;
}

export function RyScoreScreen({ navigateTo }: RyScoreScreenProps) {
  const scoreFactors = [
    { name: 'Income Stability', value: 85, weight: '30%', color: 'bg-purple-500' },
    { name: 'Platform Ratings', value: 92, weight: '25%', color: 'bg-blue-500' },
    { name: 'Work Tenure', value: 70, weight: '20%', color: 'bg-cyan-500' },
    { name: 'Savings Habits', value: 65, weight: '15%', color: 'bg-teal-500' },
    { name: 'Repayment History', value: 100, weight: '10%', color: 'bg-green-500' }
  ];

  const improvements = [
    { action: 'Complete 15 more deliveries', impact: '+30 points', timeframe: '2 weeks', icon: Target },
    { action: 'Save consistently for 3 months', impact: '+50 points', timeframe: '3 months', icon: TrendingUp },
    { action: 'Maintain 4.8+ rating', impact: '+20 points', timeframe: 'Ongoing', icon: Award }
  ];

  const connectedPlatforms = [
    { name: 'Grab', status: 'connected', orders: 847, rating: 4.9 },
    { name: 'Foodpanda', status: 'connected', orders: 523, rating: 4.8 },
    { name: 'Shopee', status: 'not-connected', orders: 0, rating: 0 }
  ];

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
          <h2 className="text-white">Your RyScore</h2>
          <p className="text-purple-200 text-sm">Gig Economy Credit Score</p>
        </div>

        {/* Score Display */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 text-center">
          <div className="text-8xl text-white mb-2">720</div>
          <div className="inline-block px-4 py-2 bg-amber-500 rounded-full text-white mb-4">
            Gold Tier
          </div>
          <div className="flex items-center justify-center gap-2 text-white/80 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>+15 points this month</span>
          </div>
        </div>
      </div>

      {/* Score Range */}
      <div className="px-6 py-6">
        <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
          <p className="text-gray-600 text-sm mb-3">Score Range: 300 - 850</p>
          <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
            <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 to-blue-500 rounded-full" style={{ width: '100%' }}></div>
          </div>
          <div className="flex justify-between mt-3">
            <div className="text-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mx-auto mb-1"></div>
              <p className="text-xs text-gray-500">Bronze</p>
              <p className="text-xs text-gray-400">300-500</p>
            </div>
            <div className="text-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mx-auto mb-1"></div>
              <p className="text-xs text-gray-500">Silver</p>
              <p className="text-xs text-gray-400">501-650</p>
            </div>
            <div className="text-center">
              <div className="w-3 h-3 bg-amber-500 rounded-full mx-auto mb-1"></div>
              <p className="text-xs text-gray-500">Gold</p>
              <p className="text-xs text-gray-400">651-750</p>
            </div>
            <div className="text-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-1"></div>
              <p className="text-xs text-gray-500">Platinum</p>
              <p className="text-xs text-gray-400">751-850</p>
            </div>
          </div>
        </div>
      </div>

      {/* Score Factors */}
      <div className="px-6 pb-6">
        <h3 className="text-gray-900 mb-4">Score Breakdown</h3>
        <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 space-y-4">
          {scoreFactors.map((factor, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-gray-800 text-sm">{factor.name}</span>
                  <span className="text-gray-400 text-xs">({factor.weight})</span>
                </div>
                <span className="text-gray-600">{factor.value}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className={`${factor.color} h-2 rounded-full`} style={{ width: `${factor.value}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Connected Platforms */}
      <div className="px-6 pb-6">
        <h3 className="text-gray-900 mb-4">Connected Platforms</h3>
        <div className="space-y-3">
          {connectedPlatforms.map((platform, index) => (
            <div key={index} className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${platform.status === 'connected' ? 'bg-green-100' : 'bg-gray-100'} rounded-xl flex items-center justify-center`}>
                    <span className="text-xl">{platform.status === 'connected' ? '✓' : '+'}</span>
                  </div>
                  <div>
                    <h4 className="text-gray-900">{platform.name}</h4>
                    {platform.status === 'connected' ? (
                      <p className="text-gray-600 text-sm">{platform.orders} orders • {platform.rating} ★</p>
                    ) : (
                      <p className="text-gray-500 text-sm">Not connected</p>
                    )}
                  </div>
                </div>
                {platform.status === 'connected' ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <button className="px-4 py-2 bg-purple-500 text-white rounded-full text-sm">
                    Connect
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Improvement Suggestions */}
      <div className="px-6 pb-6">
        <h3 className="text-gray-900 mb-4">How to Improve</h3>
        <div className="space-y-3">
          {improvements.map((improvement, index) => {
            const Icon = improvement.icon;
            return (
              <div key={index} className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-4 border border-purple-100">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-900 mb-1">{improvement.action}</h4>
                    <div className="flex items-center gap-3">
                      <span className="text-purple-600">{improvement.impact}</span>
                      <span className="text-gray-500 text-sm">• {improvement.timeframe}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ryse Advance Button */}
      <div className="px-6 pb-32">
        <button
          onClick={() => navigateTo('loan')}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-6 shadow-xl text-white"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center">
              <CreditCard className="w-7 h-7 text-white" />
            </div>
            <div className="text-left flex-1">
              <h3 className="text-white mb-1">Apply for Ryse Advance</h3>
              <p className="text-purple-200 text-sm">Based on your score, you can borrow up to RM 1,000</p>
            </div>
          </div>
        </button>
      </div>

      {/* Bottom Navigation */}
      <BottomNav currentScreen="ryscore" navigateTo={navigateTo} />
    </div>
  );
}