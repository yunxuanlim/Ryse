// ============================================
// RYSE Card Component - Cash App Inspired
// Neon green card with emoji doodles and float animation
// ============================================

import { useState } from 'react';

interface RyseCardProps {
  userName?: string;
  cardNumber?: string;
  variant?: 'neon' | 'black' | 'gradient';
  size?: 'small' | 'medium' | 'large';
  showDetails?: boolean;
  showBadge?: boolean;
  badgeText?: string;
  onClick?: () => void;
  animate?: boolean;
}

export function RyseCard({ 
  userName = 'CARDHOLDER NAME',
  cardNumber = '•••• •••• •••• 4242',
  variant = 'neon',
  size = 'medium',
  showDetails = false,
  showBadge = false,
  badgeText = 'Shipped',
  onClick,
  animate = false
}: RyseCardProps) {

  const sizeStyles: Record<string, { width: string; height: string; padding: string }> = {
    small: { width: '180px', height: '113px', padding: '12px' },
    medium: { width: '280px', height: '175px', padding: '20px' },
    large: { width: '320px', height: '200px', padding: '24px' }
  };

  const variantColors = {
    neon: { bg: '#B9FF00', text: '#000', accent: '#a8e600' },
    black: { bg: '#000', text: '#fff', accent: '#333' },
    gradient: { bg: 'linear-gradient(135deg, #7c3aed, #3b82f6, #06b6d4)', text: '#fff', accent: 'rgba(255,255,255,0.2)' }
  };

  const colors = variantColors[variant];
  const currentSize = sizeStyles[size];

  // Emoji decorations for the neon card
  const emojis = ['😊', '💰', '⚡', '🎯', '✨', '💎'];

  return (
    <div 
      className={`relative cursor-pointer ${animate ? 'animate-float' : ''}`}
      style={{ width: currentSize.width, height: currentSize.height }}
      onClick={onClick}
    >
      {/* Decorative elements around card */}
      {variant === 'neon' && (
        <>
          <div className="absolute -top-3 -right-3 text-xl animate-pulse">✨</div>
          <div className="absolute -bottom-2 -left-3 text-lg animate-pulse" style={{ animationDelay: '0.5s' }}>⭐</div>
          <div className="absolute top-1/2 -right-4 text-sm animate-pulse" style={{ animationDelay: '0.3s' }}>✨</div>
        </>
      )}

      {/* Badge */}
      {showBadge && (
        <div 
          className="absolute -top-2 left-4 px-3 py-1 bg-black text-white text-xs font-medium rounded-full flex items-center gap-1 z-10"
        >
          <span>📦</span> {badgeText}
        </div>
      )}

      {/* Card Face */}
      <div 
        className="absolute inset-0 rounded-2xl flex flex-col justify-between overflow-hidden"
        style={{ 
          background: colors.bg,
          padding: currentSize.padding,
          boxShadow: variant === 'neon' 
            ? '0 20px 60px rgba(185, 255, 0, 0.3)' 
            : variant === 'black'
              ? '0 20px 60px rgba(0, 0, 0, 0.3)'
              : '0 20px 60px rgba(124, 58, 237, 0.3)'
        }}
      >
        {/* Emoji Doodles (only for neon variant) */}
        {variant === 'neon' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
            {emojis.map((emoji, i) => (
              <span 
                key={i}
                className="absolute text-lg"
                style={{
                  top: `${20 + (i * 15) % 60}%`,
                  left: `${10 + (i * 20) % 80}%`,
                  transform: `rotate(${-15 + i * 10}deg)`,
                }}
              >
                {emoji}
              </span>
            ))}
          </div>
        )}

        {/* Accent Pattern */}
        {variant === 'neon' && (
          <div 
            className="absolute bottom-0 right-0 w-24 h-24 rounded-tl-[60px] opacity-50"
            style={{ background: colors.accent }}
          />
        )}

        {/* Top Row - Chip & Logo */}
        <div className="flex items-start justify-between relative z-10">
          {/* EMV Chip */}
          <div 
            className="w-8 h-6 rounded-md flex items-center justify-center"
            style={{ background: variant === 'neon' ? '#d1d5db' : variant === 'black' ? '#4b5563' : 'rgba(255,255,255,0.3)' }}
          >
            <div className="w-5 h-3 border border-gray-400 rounded-sm opacity-60 grid grid-cols-3 gap-px p-0.5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-400 opacity-50 rounded-sm" />
              ))}
            </div>
          </div>
          
          {/* RYSE Logo */}
          <div 
            className="font-bold text-sm tracking-widest"
            style={{ color: colors.text }}
          >
            RYSE
          </div>
        </div>

        {/* Card Number (if showing details) */}
        {showDetails && size !== 'small' && (
          <div 
            className="font-mono text-sm tracking-wider opacity-80 relative z-10"
            style={{ color: colors.text }}
          >
            {cardNumber}
          </div>
        )}

        {/* Bottom Row */}
        <div className="flex items-end justify-between relative z-10">
          <div 
            className="text-xs font-medium tracking-wide uppercase opacity-80"
            style={{ color: colors.text }}
          >
            {showDetails ? userName : 'DEBIT'}
          </div>
          
          {/* Contactless Icon */}
          <svg 
            className="w-5 h-5 opacity-70" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke={colors.text} 
            strokeWidth="2"
          >
            <path d="M8.5 14a4 4 0 0 1 4-4" strokeLinecap="round" />
            <path d="M5.5 14a7 7 0 0 1 7-7" strokeLinecap="round" />
            <path d="M2.5 14a10 10 0 0 1 10-10" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Float animation styles */}
      <style>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) rotate(-2deg); 
          }
          50% { 
            transform: translateY(-10px) rotate(2deg); 
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

// Card Preview Component for selection
export function RyseCardPreview({ 
  variant,
  selected = false,
  onClick 
}: { 
  variant: 'neon' | 'black' | 'gradient';
  selected?: boolean;
  onClick?: () => void;
}) {
  const labels = {
    neon: 'Glow in the dark',
    black: 'Classic Black',
    gradient: 'RYSE Signature'
  };

  const descriptions = {
    neon: 'Light up the night with this neon card.',
    black: 'Sleek and professional design.',
    gradient: 'Make it yours with custom colors.'
  };

  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-2xl border-2 transition-all ${
        selected 
          ? 'border-black bg-gray-50' 
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          <RyseCard variant={variant} size="small" />
        </div>
        <div className="flex-1 text-left">
          <h3 className="font-semibold text-gray-900">{labels[variant]}</h3>
          <p className="text-sm text-gray-500">{descriptions[variant]}</p>
        </div>
        {selected && (
          <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>
    </button>
  );
}

export default RyseCard;
