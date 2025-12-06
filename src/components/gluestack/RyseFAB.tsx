// ============================================
// RyseFAB - Floating Action Button for Voice
// Gradient green with pulse animation
// ============================================

import { useState } from 'react';
import { Mic } from 'lucide-react';

// Brand Colors
const COLORS = {
  gradientStart: '#00D632',  // Green Start
  gradientEnd: '#00B32C',    // Green End
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
    
    // Trigger pulse animation
    setTimeout(() => {
      setIsPressed(false);
    }, 150);
    
    // Stop pulsing after animation
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
          relative rounded-full shadow-2xl
          flex items-center justify-center
          transition-all duration-150 ease-out
          focus:outline-none focus:ring-4 focus:ring-green-300
          ${isPressed ? 'scale-95' : 'hover:scale-105'}
        `}
        style={{
          width: size,
          height: size,
          background: `linear-gradient(135deg, ${COLORS.gradientStart} 0%, ${COLORS.gradientEnd} 100%)`,
          boxShadow: `0 8px 32px ${COLORS.gradientStart}50, 0 4px 16px rgba(0,0,0,0.15)`,
        }}
        aria-label={label}
      >
        {/* Pulse Animation Rings */}
        {isPulsing && (
          <>
            <span 
              className="absolute inset-0 rounded-full animate-ping"
              style={{ 
                backgroundColor: COLORS.gradientStart,
                opacity: 0.4,
              }}
            />
            <span 
              className="absolute inset-0 rounded-full animate-pulse-ring"
              style={{ 
                backgroundColor: COLORS.gradientStart,
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
            color: COLORS.white,
          }}
          strokeWidth={2.5}
        />
        
        {/* Subtle inner glow */}
        <div 
          className="absolute inset-2 rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle at 30% 30%, white 0%, transparent 70%)`,
          }}
        />
      </button>
      
      {/* Label */}
      {showLabel && (
        <span className="mt-2 text-xs font-semibold text-gray-600">
          {label}
        </span>
      )}
      
      {/* Animation Styles */}
      <style>{`
        @keyframes pulse-ring {
          0% {
            transform: scale(1);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.1;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        .animate-pulse-ring {
          animation: pulse-ring 0.6s ease-out forwards;
        }
      `}</style>
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
      className="rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${COLORS.gradientStart} 0%, ${COLORS.gradientEnd} 100%)`,
      }}
    >
      <Mic 
        style={{ 
          width: size * 0.45, 
          height: size * 0.45,
          color: COLORS.white,
        }}
        strokeWidth={2.5}
      />
    </button>
  );
}

export default RyseFAB;

