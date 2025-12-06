// ============================================
// KYC Success Screen - Cash App Inspired
// Clean, celebratory with score reveal
// ============================================

import { useState, useEffect } from 'react';
import { Check, TrendingUp, Sparkles, ChevronRight } from 'lucide-react';
import { RyScoreCalculation, RyScoreTier } from '../../types';

interface KYCSuccessProps {
  ryscore: RyScoreCalculation | null;
  userName: string;
  onContinue: () => void;
}

export function KYCSuccess({ ryscore, userName, onContinue }: KYCSuccessProps) {
  const [showScore, setShowScore] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(300);
  const [showBenefits, setShowBenefits] = useState(false);

  const finalScore = ryscore?.totalScore || 720;
  const tier = ryscore?.tier || 'Gold';

  useEffect(() => {
    const timer1 = setTimeout(() => setShowScore(true), 500);
    const timer2 = setTimeout(() => setShowBenefits(true), 2000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    if (!showScore) return;
    
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
  }, [showScore, finalScore]);

  const getTierInfo = (tier: RyScoreTier) => {
    switch (tier) {
      case 'Platinum': return { emoji: '💎', label: 'Platinum', limit: 'RM 5,000' };
      case 'Gold': return { emoji: '🥇', label: 'Gold', limit: 'RM 1,000' };
      case 'Silver': return { emoji: '🥈', label: 'Silver', limit: 'RM 500' };
      default: return { emoji: '🥉', label: 'Bronze', limit: 'RM 200' };
    }
  };

  const tierInfo = getTierInfo(tier);

  const benefits = [
    { icon: '💰', title: `Up to ${tierInfo.limit} credit available` },
    { icon: '⚡', title: 'Instant loan approvals' },
    { icon: '🛡️', title: 'AI-powered scam protection' },
    { icon: '📊', title: 'Smart financial insights' },
  ];

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Success Icon */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className={`w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 ${showScore ? 'animate-bounce' : ''}`}>
          <Check className="w-10 h-10 text-white" strokeWidth={3} />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
          You're all set!
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Welcome to RYSE, {userName.split(' ')[0]}
        </p>

        {/* Score Display */}
        <div className={`w-full max-w-sm bg-gray-100 rounded-3xl p-6 mb-6 transition-all duration-500 ${showScore ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-gray-500 text-sm text-center mb-2">Your RyScore</p>
          <div className="text-center mb-4">
            <span className="text-6xl font-bold text-gray-900">{animatedScore}</span>
          </div>
          
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl">{tierInfo.emoji}</span>
            <span className="text-lg font-semibold text-gray-700">{tierInfo.label} Tier</span>
          </div>

          <div className="w-full bg-gray-300 rounded-full h-2">
            <div 
              className="h-2 bg-black rounded-full transition-all duration-1500"
              style={{ width: `${((animatedScore - 300) / 550) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-400">
            <span>300</span>
            <span>850</span>
          </div>
        </div>

        {/* Benefits */}
        {showBenefits && (
          <div className="w-full max-w-sm space-y-2">
            <p className="text-gray-500 text-sm mb-3">What's unlocked for you:</p>
            {benefits.map((benefit, i) => (
              <div 
                key={i}
                className="flex items-center gap-3 bg-gray-50 rounded-xl p-3"
                style={{ 
                  animation: 'fadeIn 0.3s ease-out forwards',
                  animationDelay: `${i * 100}ms`,
                  opacity: 0
                }}
              >
                <span className="text-xl">{benefit.icon}</span>
                <span className="text-gray-700 text-sm">{benefit.title}</span>
                <Check className="w-4 h-4 text-green-500 ml-auto" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Continue Button */}
      <div className="p-6">
        <button
          onClick={onContinue}
          className="w-full py-4 bg-black text-white rounded-full font-semibold text-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          Continue
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
