// ============================================
// PIN Dots - Cash App Inspired
// 4-dot PIN indicator with filled/empty states
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
            transition-all duration-200 ease-out
            ${index < filled 
              ? error 
                ? 'bg-red-500' 
                : 'bg-black scale-110'
              : 'border-2 border-gray-300 bg-transparent'
            }
          `}
        />
      ))}
      
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default PinDots;

