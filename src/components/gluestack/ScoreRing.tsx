// ============================================
// ScoreRing Component - Project Obsidian
// Neon-Noir Dark Theme circular progress
// ============================================

import { useEffect, useState } from 'react';

// Obsidian Theme Colors
const COLORS = {
  obsidian100: '#060606',
  obsidian200: '#121212',
  neonPrimary: '#39FF14',
  neonDim: '#1B7A0F',
  whiteHigh: '#FFFFFF',
  whiteMedium: 'rgba(255,255,255,0.87)',
  whiteLow: 'rgba(255,255,255,0.60)',
  scoreGreen: '#39FF14',
  scoreYellow: '#FFD300',
  scoreRed: '#FF4444',
};

interface ScoreRingProps {
  score: number;
  maxScore?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
  strokeWidth?: number;
}

export function ScoreRing({
  score,
  maxScore = 850,
  size = 'md',
  showLabel = true,
  label = 'RyScore',
  animated = true,
  strokeWidth,
}: ScoreRingProps) {
  const [animatedScore, setAnimatedScore] = useState(animated ? 0 : score);
  const [isVisible, setIsVisible] = useState(false);

  // Size configurations
  const sizes = {
    sm: { width: 80, height: 80, stroke: strokeWidth || 6, fontSize: 'text-lg', labelSize: 'text-xs' },
    md: { width: 120, height: 120, stroke: strokeWidth || 8, fontSize: 'text-2xl', labelSize: 'text-xs' },
    lg: { width: 160, height: 160, stroke: strokeWidth || 10, fontSize: 'text-3xl', labelSize: 'text-sm' },
    xl: { width: 200, height: 200, stroke: strokeWidth || 12, fontSize: 'text-4xl', labelSize: 'text-base' },
  };

  const config = sizes[size];
  const radius = (config.width - config.stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  
  // Calculate progress (minimum score is typically 300)
  const minScore = 300;
  const normalizedScore = Math.max(minScore, Math.min(score, maxScore));
  const progress = (normalizedScore - minScore) / (maxScore - minScore);
  const strokeDashoffset = circumference * (1 - progress);

  // Determine color based on score
  const getScoreColor = (score: number): string => {
    if (score > 700) return COLORS.scoreGreen;
    if (score > 500) return COLORS.scoreYellow;
    return COLORS.scoreRed;
  };

  const scoreColor = getScoreColor(score);

  // Animation effect
  useEffect(() => {
    setIsVisible(true);
    
    if (!animated) {
      setAnimatedScore(score);
      return;
    }

    const duration = 1500;
    const startTime = Date.now();
    const startScore = 300;
    let animationFrameId: number;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const eased = 1 - Math.pow(1 - progress, 3);
      
      const currentScore = Math.round(startScore + (score - startScore) * eased);
      setAnimatedScore(currentScore);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [score, animated]);

  // Get tier label based on score
  const getTierLabel = (score: number): { name: string; emoji: string } => {
    if (score >= 750) return { name: 'Platinum', emoji: '💎' };
    if (score >= 650) return { name: 'Gold', emoji: '🥇' };
    if (score >= 550) return { name: 'Silver', emoji: '🥈' };
    return { name: 'Bronze', emoji: '🥉' };
  };

  const tier = getTierLabel(animatedScore);

  return (
    <div 
      className={`relative inline-flex flex-col items-center justify-center transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ width: config.width, height: config.height }}
    >
      {/* SVG Ring */}
      <svg
        width={config.width}
        height={config.height}
        viewBox={`0 0 ${config.width} ${config.height}`}
        className="transform -rotate-90"
      >
        {/* Background Track */}
        <circle
          cx={config.width / 2}
          cy={config.height / 2}
          r={radius}
          fill="none"
          stroke={COLORS.obsidian100}
          strokeWidth={config.stroke}
        />
        
        {/* Progress Arc */}
        <circle
          cx={config.width / 2}
          cy={config.height / 2}
          r={radius}
          fill="none"
          stroke={scoreColor}
          strokeWidth={config.stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animated ? strokeDashoffset : circumference * (1 - progress)}
          className="transition-all duration-1000 ease-out"
          style={{
            filter: `drop-shadow(0 0 10px ${scoreColor}80)`,
          }}
        />
      </svg>

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span 
          className={`font-bold tabular-nums ${config.fontSize}`}
          style={{ 
            color: scoreColor,
            textShadow: `0 0 15px ${scoreColor}50`,
          }}
        >
          {animatedScore}
        </span>
        {showLabel && (
          <span className={`${config.labelSize}`} style={{ color: COLORS.whiteLow }}>
            {label}
          </span>
        )}
      </div>

      {/* Tier Badge (optional, shown below ring) */}
      {size !== 'sm' && (
        <div 
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"
          style={{ 
            backgroundColor: `${scoreColor}20`,
            color: scoreColor,
            border: `1px solid ${scoreColor}40`,
          }}
        >
          <span>{tier.emoji}</span>
          <span>{tier.name}</span>
        </div>
      )}
    </div>
  );
}

// Compact version for inline use
export function ScoreRingCompact({ 
  score, 
  size = 40 
}: { 
  score: number; 
  size?: number 
}) {
  const radius = (size - 4) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (Math.max(300, Math.min(score, 850)) - 300) / 550;
  const strokeDashoffset = circumference * (1 - progress);

  const getColor = (score: number) => {
    if (score > 700) return COLORS.scoreGreen;
    if (score > 500) return COLORS.scoreYellow;
    return COLORS.scoreRed;
  };

  const color = getColor(score);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={COLORS.obsidian100}
          strokeWidth={4}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={4}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ filter: `drop-shadow(0 0 5px ${color}80)` }}
        />
      </svg>
      <span 
        className="absolute text-xs font-bold"
        style={{ color }}
      >
        {score}
      </span>
    </div>
  );
}

export default ScoreRing;
