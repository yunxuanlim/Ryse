// ============================================
// KYC Success Screen - Project Obsidian
// Neon-Noir Dark Theme with animations
// ============================================

import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { RyScoreCalculation, RyScoreTier } from '../../types';
import { PillButton } from '../ui/pill-button';

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

interface KYCSuccessProps {
  ryscore: RyScoreCalculation | null;
  userName: string;
  onContinue: () => void;
}

export function KYCSuccess({ ryscore, userName, onContinue }: KYCSuccessProps) {
  const [showContent, setShowContent] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(300);
  const [showBenefits, setShowBenefits] = useState(false);

  const finalScore = ryscore?.totalScore || 720;
  const tier = ryscore?.tier || 'Gold';

  useEffect(() => {
    const timer1 = setTimeout(() => setShowContent(true), 800);
    const timer2 = setTimeout(() => setShowBenefits(true), 2500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    if (!showContent) return;
    
    const duration = 1500;
    const startTime = Date.now();
    const startScore = 300;
    let animationFrameId: number;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentScore = Math.round(startScore + (finalScore - startScore) * easeOut);
      setAnimatedScore(currentScore);
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [showContent, finalScore]);

  const getTierInfo = (tier: RyScoreTier) => {
    switch (tier) {
      case 'Platinum': return { emoji: '💎', label: 'Platinum', color: '#8B5CF6' };
      case 'Gold': return { emoji: '🥇', label: 'Gold', color: '#F59E0B' };
      case 'Silver': return { emoji: '🥈', label: 'Silver', color: '#9CA3AF' };
      default: return { emoji: '🥉', label: 'Bronze', color: '#92400E' };
    }
  };

  const tierInfo = getTierInfo(tier);

  return (
    <div className="h-full flex flex-col" style={{ backgroundColor: COLORS.obsidian100 }}>
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Animated Checkmark */}
        <div className="relative mb-8">
          <svg 
            className="w-24 h-24" 
            viewBox="0 0 100 100"
          >
            {/* Circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={COLORS.neonPrimary}
              strokeWidth="3"
              strokeLinecap="round"
              className="animate-draw-circle"
              style={{
                strokeDasharray: 283,
                strokeDashoffset: 283,
                filter: `drop-shadow(0 0 10px ${COLORS.neonPrimary})`,
              }}
            />
            {/* Checkmark */}
            <path
              d="M30 52 L45 67 L72 35"
              fill="none"
              stroke={COLORS.neonPrimary}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-draw-check"
              style={{
                strokeDasharray: 70,
                strokeDashoffset: 70,
                filter: `drop-shadow(0 0 10px ${COLORS.neonPrimary})`,
              }}
            />
          </svg>
        </div>

        {/* Welcome Text */}
        <h1 
          className={`text-3xl font-bold text-center mb-2 transition-all duration-500 ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ color: COLORS.whiteHigh }}
        >
          Welcome to RYSE!
        </h1>
        <p 
          className={`text-center mb-8 transition-all duration-500 delay-100 ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ color: COLORS.whiteLow }}
        >
          {userName.split(' ')[0]}, you're all set
        </p>

        {/* RyScore Card */}
        <div 
          className={`w-full max-w-sm rounded-3xl p-6 mb-6 transition-all duration-500 delay-200 ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ 
            backgroundColor: COLORS.obsidian200,
            border: `1px solid ${COLORS.neonDim}`,
          }}
        >
          <p className="text-sm text-center mb-2" style={{ color: COLORS.whiteLow }}>Your RyScore</p>
          <div className="text-center mb-4">
            <span 
              className="text-6xl font-bold tabular-nums"
              style={{ 
                color: COLORS.neonPrimary,
                textShadow: `0 0 20px ${COLORS.neonPrimary}50`,
              }}
            >
              {animatedScore}
            </span>
          </div>
          
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl">{tierInfo.emoji}</span>
            <span 
              className="text-lg font-semibold px-3 py-1 rounded-full"
              style={{ backgroundColor: `${tierInfo.color}30`, color: tierInfo.color }}
            >
              {tierInfo.label}
            </span>
          </div>

          {/* Progress Bar */}
          <div 
            className="w-full rounded-full h-2 mb-2"
            style={{ backgroundColor: COLORS.obsidian100 }}
          >
            <div 
              className="h-2 rounded-full transition-all duration-1000"
              style={{ 
                width: `${((animatedScore - 300) / 550) * 100}%`,
                backgroundColor: COLORS.neonPrimary,
                boxShadow: `0 0 10px ${COLORS.neonPrimary}`,
              }}
            />
          </div>
          <div className="flex justify-between text-xs" style={{ color: COLORS.whiteLow }}>
            <span>300</span>
            <span>850</span>
          </div>
        </div>

        {/* Benefits */}
        {showBenefits && (
          <div className="w-full max-w-sm space-y-2">
            <p className="text-sm mb-3 text-center" style={{ color: COLORS.whiteLow }}>What's unlocked for you</p>
            {[
              { emoji: '💰', text: 'Up to RM 1,000 credit available' },
              { emoji: '⚡', text: 'Instant loan approvals' },
              { emoji: '🛡️', text: 'AI-powered scam protection' },
            ].map((benefit, i) => (
              <div 
                key={i}
                className="flex items-center gap-3 rounded-2xl p-4 animate-fade-in"
                style={{ 
                  backgroundColor: COLORS.obsidian200,
                  animationDelay: `${i * 150}ms`,
                }}
              >
                <span className="text-xl">{benefit.emoji}</span>
                <span className="text-sm flex-1" style={{ color: COLORS.whiteMedium }}>{benefit.text}</span>
                <svg className="w-5 h-5" fill="none" stroke={COLORS.neonPrimary} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Continue Button */}
      <div className="p-6">
        <PillButton
          onClick={onContinue}
          className="w-full"
          size="lg"
          rightIcon={<ChevronRight className="w-5 h-5" />}
        >
          Continue
        </PillButton>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes draw-circle {
          to { stroke-dashoffset: 0; }
        }
        @keyframes draw-check {
          to { stroke-dashoffset: 0; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-draw-circle {
          animation: draw-circle 0.6s ease-out forwards;
        }
        .animate-draw-check {
          animation: draw-check 0.4s ease-out 0.4s forwards;
        }
        .animate-fade-in {
          opacity: 0;
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
