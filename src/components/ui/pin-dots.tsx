// ============================================
// PIN Dots - OBSIDIAN Neon-Noir Design
// Neon green filled states, obsidian empty
// ============================================

interface PinDotsProps {
  length?: number;
  filled: number;
  error?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function PinDots({ 
  length = 4, 
  filled, 
  error = false,
  size = 'md' 
}: PinDotsProps) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const gapClasses = {
    sm: 'gap-3',
    md: 'gap-4',
    lg: 'gap-5',
  };

  return (
    <div 
      className={`flex items-center justify-center ${gapClasses[size]} ${error ? 'animate-shake' : ''}`}
    >
      {Array.from({ length }).map((_, index) => (
        <div
          key={index}
          className={`
            ${sizeClasses[size]}
            rounded-full
            transition-all duration-200 ease-fintech
            ${index < filled 
              ? error 
                ? 'alert-pattern' 
                : 'bg-neon scale-110 glow-neon-sm'
              : 'border-2 border-white-divider bg-transparent'
            }
          `}
        />
      ))}
    </div>
  );
}

export default PinDots;
