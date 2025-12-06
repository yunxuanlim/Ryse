// ============================================
// Progress Dots - Cash App Inspired
// Step indicator with active pill state
// ============================================

interface ProgressDotsProps {
  total: number;
  current: number;
  onDotClick?: (index: number) => void;
}

export function ProgressDots({ total, current, onDotClick }: ProgressDotsProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === current;
        const isCompleted = index < current;
        
        return (
          <button
            key={index}
            onClick={() => onDotClick?.(index)}
            disabled={!onDotClick}
            className={`
              h-2 rounded-full
              transition-all duration-300 ease-out
              ${isActive 
                ? 'w-8 bg-black' 
                : isCompleted 
                  ? 'w-2 bg-black' 
                  : 'w-2 bg-gray-300'
              }
              ${onDotClick ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}
            `}
            aria-label={`Step ${index + 1} of ${total}`}
            aria-current={isActive ? 'step' : undefined}
          />
        );
      })}
    </div>
  );
}

export default ProgressDots;

