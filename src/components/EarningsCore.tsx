// ============================================
// EarningsCore - Animated Earnings Display
// Project Obsidian - Central Financial Hub
// PRD Section 3.2.2 - The "Earnings Core"
// ============================================

import { useState, useEffect, useCallback } from 'react';
import { TrendingUp, TrendingDown, ChevronRight, Zap } from 'lucide-react';

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

interface EarningsCoreProps {
  amount: number;
  currency?: string;
  weeklyGoal?: number;
  trend?: number;
  trendPeriod?: string;
  isLive?: boolean;
  onPress?: () => void;
  onExpandPress?: () => void;
}

export function EarningsCore({
  amount,
  currency = 'RM',
  weeklyGoal = 2000,
  trend = 12,
  trendPeriod = 'vs last week',
  isLive = false,
  onPress,
  onExpandPress,
}: EarningsCoreProps) {
  const [animatedAmount, setAnimatedAmount] = useState(0);
  const [isPulsing, setIsPulsing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate goal progress
  const goalProgress = Math.min((amount / weeklyGoal) * 100, 100);
  const isOnTrack = goalProgress >= 50; // 50%+ at midweek is on track

  // Animate amount on mount and when amount changes
  useEffect(() => {
    const duration = 1500;
    const startTime = Date.now();
    const startAmount = 0;
    let animationFrameId: number;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentAmount = startAmount + (amount - startAmount) * easeOut;
      setAnimatedAmount(currentAmount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [amount]);

  // Simulate live earnings pulse when isLive is true
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [isLive]);

  const handlePress = useCallback(() => {
    setIsExpanded(!isExpanded);
    onPress?.();
  }, [isExpanded, onPress]);

  const formatAmount = (num: number) => {
    return num.toLocaleString('en-MY', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Ring animation parameters
  const ringSize = 200;
  const strokeWidth = 8;
  const radius = (ringSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - goalProgress / 100);

  return (
    <div className="relative">
      {/* Main Core Container */}
      <button
        onClick={handlePress}
        className="relative w-full flex flex-col items-center"
      >
        {/* Pulsing Ring Container */}
        <div 
          className={`relative transition-all duration-500 ${
            isPulsing ? 'scale-105' : 'scale-100'
          }`}
          style={{ width: ringSize, height: ringSize }}
        >
          {/* Background Glow */}
          {isOnTrack && (
            <div 
              className="absolute inset-0 rounded-full blur-3xl opacity-30"
              style={{ backgroundColor: COLORS.neonPrimary }}
            />
          )}

          {/* Progress Ring SVG */}
          <svg
            width={ringSize}
            height={ringSize}
            className="transform -rotate-90"
          >
            {/* Background Track */}
            <circle
              cx={ringSize / 2}
              cy={ringSize / 2}
              r={radius}
              fill="none"
              stroke={COLORS.obsidian200}
              strokeWidth={strokeWidth}
            />
            
            {/* Progress Arc */}
            <circle
              cx={ringSize / 2}
              cy={ringSize / 2}
              r={radius}
              fill="none"
              stroke={isOnTrack ? COLORS.neonPrimary : COLORS.neonDim}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className={`transition-all duration-1000 ease-out ${
                isOnTrack ? 'animate-ring-glow' : ''
              }`}
              style={{
                filter: isOnTrack ? `drop-shadow(0 0 10px ${COLORS.neonPrimary}80)` : 'none',
              }}
            />
          </svg>

          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {/* Live Indicator */}
            {isLive && (
              <div className="flex items-center gap-1 mb-2">
                <div 
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: COLORS.neonPrimary }}
                />
                <span 
                  className="text-xs font-medium uppercase tracking-wider"
                  style={{ color: COLORS.neonPrimary }}
                >
                  Live
                </span>
              </div>
            )}

            {/* Currency + Amount */}
            <div className="text-center">
              <span 
                className="text-lg"
                style={{ color: COLORS.whiteLow }}
              >
                {currency}
              </span>
              <span 
                className={`text-4xl font-bold tabular-nums block transition-all ${
                  isPulsing ? 'scale-105' : 'scale-100'
                }`}
                style={{ 
                  color: COLORS.whiteHigh,
                  textShadow: isOnTrack 
                    ? `0 0 20px ${COLORS.neonPrimary}40`
                    : 'none',
                }}
              >
                {formatAmount(animatedAmount)}
              </span>
            </div>

            {/* Trend Indicator */}
            <div 
              className="flex items-center gap-1 mt-2"
              style={{ color: trend >= 0 ? COLORS.neonPrimary : '#FF4444' }}
            >
              {trend >= 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="text-sm font-semibold">
                {trend >= 0 ? '+' : ''}{trend}%
              </span>
            </div>
          </div>
        </div>

        {/* Goal Progress Label */}
        <div 
          className="mt-4 text-center"
          style={{ color: COLORS.whiteLow }}
        >
          <span className="text-sm">
            {goalProgress.toFixed(0)}% of {currency}{weeklyGoal.toLocaleString()} goal
          </span>
        </div>

        {/* Expand Indicator */}
        <div 
          className="mt-2 flex items-center gap-1"
          style={{ color: COLORS.whiteLow }}
        >
          <span className="text-xs">Tap for breakdown</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </button>

      {/* Expanded Details Panel */}
      {isExpanded && (
        <div 
          className="mt-6 rounded-3xl p-6 animate-slide-up"
          style={{ 
            backgroundColor: COLORS.obsidian200,
            border: `1px solid ${COLORS.neonDim}`,
          }}
        >
          {/* Platform Breakdown Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 
              className="text-lg font-semibold"
              style={{ color: COLORS.whiteHigh }}
            >
              This Week
            </h3>
            <button
              onClick={onExpandPress}
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{ 
                backgroundColor: `${COLORS.neonPrimary}15`,
                color: COLORS.neonPrimary,
              }}
            >
              View All
            </button>
          </div>

          {/* Platform Bars */}
          <div className="space-y-4">
            {[
              { name: 'Grab', amount: 520, icon: '🚗', color: '#00B14F' },
              { name: 'Foodpanda', amount: 480, icon: '🐼', color: '#D70F64' },
              { name: 'Shopee', amount: 240, icon: '🛒', color: '#EE4D2D' },
            ].map((platform) => {
              const percentage = (platform.amount / amount) * 100;
              
              return (
                <div key={platform.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{platform.icon}</span>
                      <span style={{ color: COLORS.whiteMedium }}>{platform.name}</span>
                    </div>
                    <span 
                      className="font-semibold tabular-nums"
                      style={{ color: COLORS.whiteHigh }}
                    >
                      {currency}{platform.amount.toLocaleString()}
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div 
                    className="h-2 rounded-full overflow-hidden"
                    style={{ backgroundColor: COLORS.obsidian100 }}
                  >
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: platform.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Stats */}
          <div 
            className="grid grid-cols-2 gap-4 mt-6 pt-6"
            style={{ borderTop: `1px solid ${COLORS.obsidian100}` }}
          >
            <div 
              className="rounded-2xl p-4"
              style={{ backgroundColor: COLORS.obsidian100 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4" style={{ color: COLORS.neonPrimary }} />
                <span className="text-xs" style={{ color: COLORS.whiteLow }}>Hours Worked</span>
              </div>
              <span 
                className="text-2xl font-bold"
                style={{ color: COLORS.whiteHigh }}
              >
                32h
              </span>
            </div>
            
            <div 
              className="rounded-2xl p-4"
              style={{ backgroundColor: COLORS.obsidian100 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4" style={{ color: COLORS.neonPrimary }} />
                <span className="text-xs" style={{ color: COLORS.whiteLow }}>Avg/Hour</span>
              </div>
              <span 
                className="text-2xl font-bold"
                style={{ color: COLORS.neonPrimary }}
              >
                {currency}{(amount / 32).toFixed(0)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Animation Styles */}
      <style>{`
        @keyframes ring-glow {
          0%, 100% {
            filter: drop-shadow(0 0 4px rgba(57, 255, 20, 0.4));
          }
          50% {
            filter: drop-shadow(0 0 12px rgba(57, 255, 20, 0.7));
          }
        }
        .animate-ring-glow {
          animation: ring-glow 2s ease-in-out infinite;
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

// Mini version for cards/lists
export function EarningsCoreMini({
  amount,
  currency = 'RM',
  trend = 12,
  onPress,
}: {
  amount: number;
  currency?: string;
  trend?: number;
  onPress?: () => void;
}) {
  return (
    <button
      onClick={onPress}
      className="flex items-center gap-3 p-4 rounded-2xl transition-all active:scale-95"
      style={{ backgroundColor: COLORS.obsidian200 }}
    >
      {/* Mini Ring */}
      <div 
        className="w-12 h-12 rounded-full flex items-center justify-center"
        style={{ 
          backgroundColor: `${COLORS.neonPrimary}15`,
          border: `2px solid ${COLORS.neonPrimary}`,
        }}
      >
        <span 
          className="text-lg"
          style={{ color: COLORS.neonPrimary }}
        >
          💰
        </span>
      </div>

      {/* Amount */}
      <div className="flex-1 text-left">
        <p 
          className="text-xs"
          style={{ color: COLORS.whiteLow }}
        >
          Earnings
        </p>
        <p 
          className="text-xl font-bold tabular-nums"
          style={{ color: COLORS.whiteHigh }}
        >
          {currency}{amount.toLocaleString()}
        </p>
      </div>

      {/* Trend */}
      <div 
        className="flex items-center gap-1 px-2 py-1 rounded-full"
        style={{ 
          backgroundColor: trend >= 0 ? `${COLORS.neonPrimary}15` : '#FF444420',
          color: trend >= 0 ? COLORS.neonPrimary : '#FF4444',
        }}
      >
        {trend >= 0 ? (
          <TrendingUp className="w-3 h-3" />
        ) : (
          <TrendingDown className="w-3 h-3" />
        )}
        <span className="text-xs font-semibold">
          {trend >= 0 ? '+' : ''}{trend}%
        </span>
      </div>
    </button>
  );
}

export default EarningsCore;


