// ============================================
// HeroSection Component - Project Obsidian
// Neon-Noir Dark Theme with glassmorphism
// ============================================

import { TrendingUp, ChevronRight } from 'lucide-react';

// Obsidian Theme Colors
const COLORS = {
  obsidian100: '#060606',
  obsidian200: '#121212',
  neonPrimary: '#39FF14',
  neonDim: '#1B7A0F',
  whiteHigh: '#FFFFFF',
  whiteMedium: 'rgba(255,255,255,0.87)',
  whiteLow: 'rgba(255,255,255,0.60)',
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
      {/* Gradient Background - Obsidian with neon accent */}
      <div 
        className="pt-6 pb-20 px-6"
        style={{
          background: `linear-gradient(135deg, ${COLORS.obsidian100} 0%, ${COLORS.obsidian200} 100%)`,
          borderBottomLeftRadius: '30px',
          borderBottomRightRadius: '30px',
        }}
      >
        {/* Neon Accent Line */}
        <div 
          className="absolute top-0 left-0 right-0 h-1"
          style={{ 
            background: `linear-gradient(90deg, transparent, ${COLORS.neonPrimary}, transparent)`,
            boxShadow: `0 0 20px ${COLORS.neonPrimary}`,
          }}
        />

        {/* Top Row - Greeting & RyScore Badge */}
        <div className="flex items-center justify-between mb-6">
          {/* Greeting */}
          <div>
            <p className="text-sm mb-1" style={{ color: COLORS.whiteLow }}>Welcome back</p>
            <h1 className="text-2xl font-bold" style={{ color: COLORS.whiteHigh }}>
              Hello, {firstName} 👋
            </h1>
          </div>

          {/* RyScore Pill Badge */}
          <button
            onClick={onRyScorePress}
            className="flex items-center gap-2 px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all"
            style={{ 
              backgroundColor: COLORS.obsidian200,
              border: `1px solid ${COLORS.neonDim}`,
            }}
          >
            <span className="text-sm">{tier.emoji}</span>
            <span 
              className="font-semibold text-sm"
              style={{ color: COLORS.neonPrimary }}
            >
              RyScore {ryScore}
            </span>
            <ChevronRight 
              className="w-4 h-4" 
              style={{ color: COLORS.neonPrimary }}
            />
          </button>
        </div>

        {/* Quick Stats Row */}
        <div className="flex gap-4">
          <div 
            className="flex-1 backdrop-blur-sm rounded-2xl p-4"
            style={{ 
              backgroundColor: `${COLORS.neonDim}20`,
              border: `1px solid ${COLORS.neonDim}40`,
            }}
          >
            <p className="text-xs mb-1" style={{ color: COLORS.whiteLow }}>Active Platforms</p>
            <p className="font-bold text-lg" style={{ color: COLORS.whiteHigh }}>3</p>
          </div>
          <div 
            className="flex-1 backdrop-blur-sm rounded-2xl p-4"
            style={{ 
              backgroundColor: `${COLORS.neonDim}20`,
              border: `1px solid ${COLORS.neonDim}40`,
            }}
          >
            <p className="text-xs mb-1" style={{ color: COLORS.whiteLow }}>This Month</p>
            <p className="font-bold text-lg" style={{ color: COLORS.neonPrimary }}>RM 4,850</p>
          </div>
        </div>
      </div>

      {/* Floating Balance Card */}
      <div className="px-6 -mt-10 relative z-10">
        <button
          onClick={onBalancePress}
          className="w-full rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all text-left"
          style={{
            backgroundColor: COLORS.obsidian200,
            border: `1px solid ${COLORS.neonDim}`,
            boxShadow: `0 10px 40px rgba(0, 0, 0, 0.5), 0 0 20px ${COLORS.neonPrimary}10`,
          }}
        >
          {/* Card Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${COLORS.neonPrimary}20` }}
              >
                <TrendingUp className="w-5 h-5" style={{ color: COLORS.neonPrimary }} />
              </div>
              <div>
                <p className="text-sm" style={{ color: COLORS.whiteLow }}>Total Earnings</p>
                <p className="text-xs" style={{ color: COLORS.whiteLow }}>{trendPeriod}</p>
              </div>
            </div>
            
            {/* Trend Badge */}
            <div 
              className="flex items-center gap-1 px-3 py-1.5 rounded-full"
              style={{ backgroundColor: `${COLORS.neonPrimary}20` }}
            >
              <TrendingUp className="w-4 h-4" style={{ color: COLORS.neonPrimary }} />
              <span 
                className="text-sm font-semibold"
                style={{ color: COLORS.neonPrimary }}
              >
                +{earningsTrend}%
              </span>
            </div>
          </div>

          {/* Earnings Amount */}
          <div className="mb-4">
            <h2 
              className="text-4xl font-bold"
              style={{ 
                color: COLORS.neonPrimary,
                textShadow: `0 0 20px ${COLORS.neonPrimary}30`,
              }}
            >
              {formattedEarnings}
            </h2>
          </div>

          {/* Card Footer */}
          <div 
            className="flex items-center justify-between pt-4"
            style={{ borderTop: `1px solid ${COLORS.obsidian100}` }}
          >
            <span className="text-sm" style={{ color: COLORS.whiteLow }}>View detailed breakdown</span>
            <ChevronRight className="w-5 h-5" style={{ color: COLORS.whiteLow }} />
          </div>
        </button>
      </div>

      {/* Decorative Neon Orbs */}
      <div 
        className="absolute top-12 right-4 w-32 h-32 rounded-full opacity-10 blur-3xl"
        style={{ background: COLORS.neonPrimary }}
      />
      <div 
        className="absolute top-24 right-16 w-16 h-16 rounded-full opacity-5 blur-2xl"
        style={{ background: COLORS.neonPrimary }}
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
        backgroundColor: COLORS.obsidian200,
        border: `1px solid ${COLORS.neonDim}`,
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold" style={{ color: COLORS.whiteHigh }}>Hello, {firstName}</h2>
        <div 
          className="px-3 py-1 rounded-full"
          style={{ 
            backgroundColor: `${COLORS.neonPrimary}20`,
            border: `1px solid ${COLORS.neonDim}`,
          }}
        >
          <span className="text-sm font-medium" style={{ color: COLORS.neonPrimary }}>
            RyScore {ryScore}
          </span>
        </div>
      </div>
      
      <div 
        className="backdrop-blur-sm rounded-2xl p-4"
        style={{ backgroundColor: `${COLORS.neonDim}20` }}
      >
        <p className="text-sm mb-1" style={{ color: COLORS.whiteLow }}>Total Earnings</p>
        <div className="flex items-center justify-between">
          <span 
            className="text-2xl font-bold"
            style={{ color: COLORS.neonPrimary }}
          >
            {formattedEarnings}
          </span>
          <div className="flex items-center gap-1" style={{ color: COLORS.neonPrimary }}>
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">+{earningsTrend}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
