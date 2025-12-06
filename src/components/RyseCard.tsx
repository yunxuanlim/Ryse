// ============================================
// RYSE Card Component - Project Obsidian
// Gyroscopic Parallax Digital Card
// PRD Section 3.5 - The Digital Card & Parallax Wallet
// ============================================

import React, { useState, useEffect, useRef, useCallback } from 'react';

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

interface RyseCardProps {
  userName?: string;
  cardNumber?: string;
  variant?: 'neon' | 'obsidian' | 'glass';
  size?: 'small' | 'medium' | 'large';
  showDetails?: boolean;
  showBadge?: boolean;
  badgeText?: string;
  onClick?: () => void;
  animate?: boolean;
  enableParallax?: boolean;
}

export function RyseCard({ 
  userName = 'CARDHOLDER NAME',
  cardNumber = '•••• •••• •••• 4242',
  variant = 'obsidian',
  size = 'medium',
  showDetails = false,
  showBadge = false,
  badgeText = 'Active',
  onClick,
  animate = false,
  enableParallax = true,
}: RyseCardProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [lightPosition, setLightPosition] = useState({ x: 50, y: 50 });
  const [isRevealing, setIsRevealing] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const longPressTimer = useRef<NodeJS.Timeout>();

  const sizeStyles: Record<string, { width: string; height: string; padding: string }> = {
    small: { width: '180px', height: '113px', padding: '12px' },
    medium: { width: '280px', height: '175px', padding: '20px' },
    large: { width: '320px', height: '200px', padding: '24px' }
  };

  const variantColors = {
    neon: { bg: COLORS.neonPrimary, text: COLORS.obsidian100, accent: COLORS.neonDim, glow: `${COLORS.neonPrimary}80` },
    obsidian: { bg: COLORS.obsidian200, text: COLORS.whiteHigh, accent: COLORS.neonPrimary, glow: `${COLORS.neonPrimary}50` },
    glass: { bg: 'rgba(10, 10, 10, 0.7)', text: COLORS.whiteHigh, accent: COLORS.neonPrimary, glow: `${COLORS.neonPrimary}30` }
  };

  const colors = variantColors[variant];
  const currentSize = sizeStyles[size];

  // Gyroscope effect
  useEffect(() => {
    if (!enableParallax) return;

    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        setRotation({
          x: Math.max(-15, Math.min(15, (e.beta - 45) * 0.3)),
          y: Math.max(-15, Math.min(15, e.gamma * 0.3)),
        });
        setLightPosition({
          x: 50 + e.gamma * 0.5,
          y: 50 + (e.beta - 45) * 0.5,
        });
      }
    };

    window.addEventListener('deviceorientation', handleDeviceOrientation);
    return () => window.removeEventListener('deviceorientation', handleDeviceOrientation);
  }, [enableParallax]);

  // Mouse parallax fallback
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableParallax || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setRotation({
      x: (y - 0.5) * 20,
      y: (x - 0.5) * -20,
    });
    setLightPosition({
      x: x * 100,
      y: y * 100,
    });
  }, [enableParallax]);

  const handleMouseLeave = useCallback(() => {
    setRotation({ x: 0, y: 0 });
    setLightPosition({ x: 50, y: 50 });
    setIsHovered(false);
    setIsRevealing(false);
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
  }, []);

  // Long press to reveal card number
  const handleMouseDown = useCallback(() => {
    longPressTimer.current = setTimeout(() => {
      setIsRevealing(true);
    }, 500);
  }, []);

  const handleMouseUp = useCallback(() => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
    // Keep revealing for 3 seconds then hide
    if (isRevealing) {
      setTimeout(() => setIsRevealing(false), 3000);
    }
  }, [isRevealing]);

  return (
    <div 
      ref={cardRef}
      className={`relative cursor-pointer ${animate ? 'animate-float' : ''}`}
      style={{ 
        width: currentSize.width, 
        height: currentSize.height,
        perspective: '1000px',
      }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      {/* Decorative elements */}
      {variant === 'obsidian' && (
        <>
          <div className="absolute -top-3 -right-3 text-xl animate-particle-float">✨</div>
          <div className="absolute -bottom-2 -left-3 text-lg animate-particle-float" style={{ animationDelay: '0.5s' }}>⭐</div>
        </>
      )}

      {/* Badge */}
      {showBadge && (
        <div 
          className="absolute -top-2 left-4 px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1 z-20"
          style={{ 
            backgroundColor: COLORS.neonPrimary,
            color: COLORS.obsidian100,
            boxShadow: `0 0 15px ${COLORS.neonPrimary}80`,
          }}
        >
          <span>⚡</span> {badgeText}
        </div>
      )}

      {/* Card Face with 3D Transform */}
      <div 
        className="absolute inset-0 rounded-2xl flex flex-col justify-between overflow-hidden border transition-transform duration-200"
        style={{ 
          background: variant === 'glass' 
            ? 'rgba(10, 10, 10, 0.7)' 
            : colors.bg,
          backdropFilter: variant === 'glass' ? 'blur(30px)' : undefined,
          padding: currentSize.padding,
          boxShadow: `
            0 0 ${isHovered ? '40px' : '20px'} ${colors.glow}, 
            0 20px 60px rgba(0, 0, 0, 0.5),
            inset 0 0 100px rgba(57, 255, 20, 0.05)
          `,
          borderColor: variant === 'neon' ? 'transparent' : `${COLORS.neonPrimary}40`,
          transform: enableParallax 
            ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovered ? 1.02 : 1})`
            : undefined,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Moving Light Reflection */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${lightPosition.x}% ${lightPosition.y}%, ${COLORS.whiteHigh}20 0%, transparent 50%)`,
            opacity: isHovered ? 1 : 0.3,
          }}
        />

        {/* Neon accent line */}
        {variant !== 'neon' && (
          <div 
            className="absolute bottom-0 left-0 right-0 h-1"
            style={{ 
              background: `linear-gradient(90deg, transparent, ${COLORS.neonPrimary}, transparent)`,
              opacity: 0.6,
              boxShadow: `0 0 10px ${COLORS.neonPrimary}`,
            }}
          />
        )}

        {/* Top Row - Chip & Logo */}
        <div className="flex items-start justify-between relative z-10">
          {/* EMV Chip with 3D effect */}
          <div 
            className="w-10 h-7 rounded-md flex items-center justify-center transition-transform duration-200"
            style={{ 
              background: variant === 'neon' 
                ? 'linear-gradient(135deg, #a8e600, #7ac000)' 
                : `linear-gradient(135deg, ${COLORS.obsidian100}, #1A1A1A)`,
              border: variant === 'neon' ? 'none' : `1px solid ${COLORS.neonPrimary}30`,
              transform: `translateZ(${isHovered ? '10px' : '0px'})`,
              boxShadow: isHovered ? `0 4px 12px rgba(0,0,0,0.3)` : 'none',
            }}
          >
            <div 
              className="w-6 h-4 border rounded-sm opacity-70 grid grid-cols-3 gap-px p-0.5"
              style={{ borderColor: variant === 'neon' ? COLORS.obsidian100 : COLORS.neonPrimary }}
            >
              {[...Array(6)].map((_, i) => (
                <div 
                  key={i} 
                  className="rounded-sm opacity-50" 
                  style={{ backgroundColor: variant === 'neon' ? COLORS.obsidian100 : COLORS.neonPrimary }}
                />
              ))}
            </div>
          </div>
          
          {/* RYSE Logo with glow */}
          <div 
            className="font-bold text-sm tracking-widest transition-all duration-200"
            style={{ 
              color: variant === 'neon' ? colors.text : COLORS.neonPrimary,
              textShadow: variant === 'neon' 
                ? 'none' 
                : `0 0 ${isHovered ? '20px' : '10px'} ${COLORS.neonPrimary}80`,
              transform: `translateZ(${isHovered ? '15px' : '0px'})`,
            }}
          >
            RYSE
          </div>
        </div>

        {/* Card Number with reveal animation */}
        {showDetails && size !== 'small' && (
          <div 
            className="relative overflow-hidden"
            style={{ transform: `translateZ(${isHovered ? '8px' : '0px'})` }}
          >
            <div 
              className={`font-mono text-sm tracking-wider relative z-10 transition-all duration-300 ${
                isRevealing ? 'blur-0' : 'blur-sm'
              }`}
              style={{ 
                color: colors.text,
                opacity: 0.8,
              }}
            >
              {isRevealing ? '4242 4242 4242 4242' : cardNumber}
            </div>
            
            {/* Reveal scan effect */}
            {isRevealing && (
              <div 
                className="absolute inset-0 animate-scan"
                style={{
                  background: `linear-gradient(90deg, transparent, ${COLORS.neonPrimary}40, transparent)`,
                }}
              />
            )}
          </div>
        )}

        {/* Bottom Row */}
        <div 
          className="flex items-end justify-between relative z-10"
          style={{ transform: `translateZ(${isHovered ? '5px' : '0px'})` }}
        >
          <div 
            className="text-xs font-medium tracking-wide uppercase"
            style={{ 
              color: variant === 'neon' ? colors.text : COLORS.whiteLow
            }}
          >
            {showDetails ? userName : 'DEBIT'}
          </div>
          
          {/* Contactless Icon */}
          <svg 
            className="w-6 h-6 transition-transform duration-200" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke={variant === 'neon' ? colors.text : COLORS.neonPrimary} 
            strokeWidth="2"
            style={{ 
              opacity: 0.8,
              filter: isHovered ? `drop-shadow(0 0 6px ${COLORS.neonPrimary})` : 'none',
            }}
          >
            <path d="M8.5 14a4 4 0 0 1 4-4" strokeLinecap="round" />
            <path d="M5.5 14a7 7 0 0 1 7-7" strokeLinecap="round" />
            <path d="M2.5 14a10 10 0 0 1 10-10" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes particle-float {
          0%, 100% { transform: translate(0, 0); opacity: 1; }
          50% { transform: translate(5px, -5px); opacity: 0.6; }
        }
        .animate-particle-float {
          animation: particle-float 3s ease-in-out infinite;
        }
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-scan {
          animation: scan 1s ease-in-out infinite;
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
  variant: 'neon' | 'obsidian' | 'glass';
  selected?: boolean;
  onClick?: () => void;
}) {
  const labels = {
    neon: 'Neon Glow',
    obsidian: 'Obsidian Black',
    glass: 'Glass Edition'
  };

  const descriptions = {
    neon: 'Light up the dark with neon.',
    obsidian: 'Sleek obsidian with neon accents.',
    glass: 'Glassmorphism premium feel.'
  };

  return (
    <button
      onClick={onClick}
      className="w-full p-4 rounded-2xl border-2 transition-all"
      style={{
        backgroundColor: selected ? COLORS.obsidian200 : COLORS.obsidian100,
        borderColor: selected ? COLORS.neonPrimary : `${COLORS.whiteHigh}10`,
      }}
    >
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          <RyseCard variant={variant} size="small" enableParallax={false} />
        </div>
        <div className="flex-1 text-left">
          <h3 className="font-semibold" style={{ color: COLORS.whiteHigh }}>{labels[variant]}</h3>
          <p className="text-sm" style={{ color: COLORS.whiteLow }}>{descriptions[variant]}</p>
        </div>
        {selected && (
          <div 
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{ 
              backgroundColor: COLORS.neonPrimary,
              boxShadow: `0 0 10px ${COLORS.neonPrimary}`,
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke={COLORS.obsidian100} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>
    </button>
  );
}

// Full wallet view with parallax
export function RyseWallet({
  cards,
  activeIndex = 0,
  onCardSelect,
}: {
  cards: Array<{ variant: 'neon' | 'obsidian' | 'glass'; userName: string }>;
  activeIndex?: number;
  onCardSelect?: (index: number) => void;
}) {
  return (
    <div className="relative py-8" style={{ perspective: '1000px' }}>
      <div className="flex flex-col items-center gap-4">
        {cards.map((card, i) => {
          const isActive = i === activeIndex;
          const offset = (i - activeIndex) * 20;
          
          return (
            <div
              key={i}
              className="transition-all duration-300 cursor-pointer"
              style={{
                transform: `
                  translateY(${offset}px) 
                  translateZ(${isActive ? 0 : -50}px)
                  scale(${isActive ? 1 : 0.9})
                `,
                opacity: isActive ? 1 : 0.6,
                zIndex: cards.length - Math.abs(i - activeIndex),
              }}
              onClick={() => onCardSelect?.(i)}
            >
              <RyseCard
                variant={card.variant}
                userName={card.userName}
                size="large"
                showDetails={isActive}
                enableParallax={isActive}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RyseCard;
