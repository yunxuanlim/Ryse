// ============================================
// HeroSection Component - RYSE Home Screen
// Gradient header with floating balance card
// ============================================

import { TrendingUp, ChevronRight } from 'lucide-react';

// Brand Colors
const COLORS = {
  gradientStart: '#0041C2',  // Deep Blue
  gradientEnd: '#0052FF',    // Bright Blue
  white: '#FFFFFF',
  green: '#00D632',          // Earnings Green
  greenLight: '#00D63220',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    400: '#9CA3AF',
    500: '#6B7280',
    900: '#111827',
  },
};

interface HeroSectionProps {
  userName?: string;
  ryScore?: number;
  totalEarnings?: number;
  earningsTrend?: number;
  trendPeriod?: string;
  onRyScorePress?: () => void;
  onBalancePress?: () => void;
}

export function HeroSection({
  userName = 'User',
  ryScore = 720,
  totalEarnings = 1240.00,
  earningsTrend = 12,
  trendPeriod = 'this week',
  onRyScorePress,
  onBalancePress,
}: HeroSectionProps) {
  // Format currency
  const formattedEarnings = new Intl.NumberFormat('en-MY', {
    style: 'currency',
    currency: 'MYR',
    minimumFractionDigits: 2,
  }).format(totalEarnings).replace('MYR', 'RM');

  // Get first name only
  const firstName = userName.split(' ')[0];

  // Determine RyScore tier color
  const getScoreTier = (score: number) => {
    if (score >= 750) return { name: 'Platinum', emoji: '💎' };
    if (score >= 650) return { name: 'Gold', emoji: '🥇' };
    if (score >= 550) return { name: 'Silver', emoji: '🥈' };
    return { name: 'Bronze', emoji: '🥉' };
  };

  const tier = getScoreTier(ryScore);

  return (
    <div className="relative">
      {/* Gradient Background */}
      <div 
        className="pt-6 pb-20 px-6"
        style={{
          background: `linear-gradient(135deg, ${COLORS.gradientStart} 0%, ${COLORS.gradientEnd} 100%)`,
          borderBottomLeftRadius: '30px',
          borderBottomRightRadius: '30px',
        }}
      >
        {/* Top Row - Greeting & RyScore Badge */}
        <div className="flex items-center justify-between mb-6">
          {/* Greeting */}
          <div>
            <p className="text-white/70 text-sm mb-1">Welcome back</p>
            <h1 className="text-white text-2xl font-bold">
              Hello, {firstName} 👋
            </h1>
          </div>

          {/* RyScore Pill Badge */}
          <button
            onClick={onRyScorePress}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-shadow"
          >
            <span className="text-sm">{tier.emoji}</span>
            <span 
              className="font-semibold text-sm"
              style={{ color: COLORS.gradientEnd }}
            >
              RyScore {ryScore}
            </span>
            <ChevronRight 
              className="w-4 h-4" 
              style={{ color: COLORS.gradientEnd }}
            />
          </button>
        </div>

        {/* Quick Stats Row */}
        <div className="flex gap-4">
          <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <p className="text-white/70 text-xs mb-1">Active Platforms</p>
            <p className="text-white font-bold text-lg">3</p>
          </div>
          <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <p className="text-white/70 text-xs mb-1">This Month</p>
            <p className="text-white font-bold text-lg">RM 4,850</p>
          </div>
        </div>
      </div>

      {/* Floating Balance Card */}
      <div className="px-6 -mt-10 relative z-10">
        <button
          onClick={onBalancePress}
          className="w-full bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all text-left"
          style={{
            boxShadow: '0 10px 40px rgba(0, 65, 194, 0.15), 0 4px 12px rgba(0, 0, 0, 0.05)',
          }}
        >
          {/* Card Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: COLORS.greenLight }}
              >
                <TrendingUp className="w-5 h-5" style={{ color: COLORS.green }} />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Earnings</p>
                <p className="text-xs text-gray-400">{trendPeriod}</p>
              </div>
            </div>
            
            {/* Trend Badge */}
            <div 
              className="flex items-center gap-1 px-3 py-1.5 rounded-full"
              style={{ backgroundColor: COLORS.greenLight }}
            >
              <TrendingUp className="w-4 h-4" style={{ color: COLORS.green }} />
              <span 
                className="text-sm font-semibold"
                style={{ color: COLORS.green }}
              >
                +{earningsTrend}%
              </span>
            </div>
          </div>

          {/* Earnings Amount */}
          <div className="mb-4">
            <h2 
              className="text-4xl font-bold"
              style={{ color: COLORS.green }}
            >
              {formattedEarnings}
            </h2>
          </div>

          {/* Card Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <span className="text-gray-500 text-sm">View detailed breakdown</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </button>
      </div>

      {/* Decorative Elements */}
      <div 
        className="absolute top-12 right-4 w-32 h-32 rounded-full opacity-10"
        style={{ background: 'white' }}
      />
      <div 
        className="absolute top-24 right-16 w-16 h-16 rounded-full opacity-5"
        style={{ background: 'white' }}
      />
    </div>
  );
}

// Compact variant for smaller spaces
export function HeroSectionCompact({
  userName = 'User',
  ryScore = 720,
  totalEarnings = 1240.00,
  earningsTrend = 12,
}: {
  userName?: string;
  ryScore?: number;
  totalEarnings?: number;
  earningsTrend?: number;
}) {
  const firstName = userName.split(' ')[0];
  const formattedEarnings = `RM ${totalEarnings.toLocaleString('en-MY', { minimumFractionDigits: 2 })}`;

  return (
    <div 
      className="rounded-3xl p-5 mb-4"
      style={{
        background: `linear-gradient(135deg, ${COLORS.gradientStart} 0%, ${COLORS.gradientEnd} 100%)`,
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-semibold">Hello, {firstName}</h2>
        <div className="bg-white px-3 py-1 rounded-full">
          <span className="text-sm font-medium" style={{ color: COLORS.gradientEnd }}>
            RyScore {ryScore}
          </span>
        </div>
      </div>
      
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
        <p className="text-white/70 text-sm mb-1">Total Earnings</p>
        <div className="flex items-center justify-between">
          <span className="text-white text-2xl font-bold">{formattedEarnings}</span>
          <div className="flex items-center gap-1 text-green-300">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">+{earningsTrend}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;

