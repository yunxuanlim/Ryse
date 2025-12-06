// ============================================
// RyseFAB - OBSIDIAN Neon-Noir Design
// Neon green FAB with pulse animation
// ============================================

import { useState } from 'react';
import { Mic } from 'lucide-react';

// Obsidian Color Palette
const COLORS = {
  neon: '#39FF14',
  neonBright: '#4AFF26',
  neonDim: '#1B7A0F',
  obsidian: '#060606',
  white: '#FFFFFF',
};

interface RyseFABProps {
  onPress?: () => void;
  label?: string;
  size?: number;
  showLabel?: boolean;
  className?: string;
}

export function RyseFAB({
  onPress,
  label = 'Ask Ryse',
  size = 64,
  showLabel = true,
  className = '',
}: RyseFABProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);

  const handlePress = () => {
    setIsPressed(true);
    setIsPulsing(true);
    
    setTimeout(() => {
      setIsPressed(false);
    }, 150);
    
    setTimeout(() => {
      setIsPulsing(false);
    }, 600);
    
    onPress?.();
  };

  return (
    <div className={`fixed bottom-16 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center ${className}`}>
      {/* Main FAB Button */}
      <button
        onClick={handlePress}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        className={`
          relative rounded-full
          flex items-center justify-center
          transition-all duration-150 ease-fintech
          focus:outline-none focus-neon
          ${isPressed ? 'scale-95' : 'hover:scale-105'}
        `}
        style={{
          width: size,
          height: size,
          background: COLORS.neon,
          boxShadow: `0 0 40px ${COLORS.neon}80, 0 8px 32px rgba(0,0,0,0.5)`,
        }}
        aria-label={label}
      >
        {/* Pulse Animation Rings */}
        {isPulsing && (
          <>
            <span 
              className="absolute inset-0 rounded-full animate-ping"
              style={{ 
                backgroundColor: COLORS.neon,
                opacity: 0.4,
              }}
            />
            <span 
              className="absolute inset-0 rounded-full animate-pulse-ring"
              style={{ 
                backgroundColor: COLORS.neon,
                opacity: 0.2,
              }}
            />
          </>
        )}
        
        {/* Microphone Icon */}
        <Mic 
          className="relative z-10" 
          style={{ 
            width: size * 0.45, 
            height: size * 0.45,
            color: COLORS.obsidian,
          }}
          strokeWidth={2.5}
        />
        
        {/* Subtle inner glow */}
        <div 
          className="absolute inset-2 rounded-full opacity-30"
          style={{
            background: `radial-gradient(circle at 30% 30%, white 0%, transparent 70%)`,
          }}
        />
      </button>
      
      {/* Label */}
      {showLabel && (
        <span className="mt-2 text-xs font-semibold text-white-low">
          {label}
        </span>
      )}
    </div>
  );
}

// Mini version for compact spaces
export function RyseFABMini({
  onPress,
  size = 48,
}: {
  onPress?: () => void;
  size?: number;
}) {
  return (
    <button
      onClick={onPress}
      className="rounded-full flex items-center justify-center transition-all ease-fintech hover:scale-105 active:scale-95 glow-neon-md"
      style={{
        width: size,
        height: size,
        background: COLORS.neon,
      }}
    >
      <Mic 
        style={{ 
          width: size * 0.45, 
          height: size * 0.45,
          color: COLORS.obsidian,
        }}
        strokeWidth={2.5}
      />
    </button>
  );
}

export default RyseFAB;
