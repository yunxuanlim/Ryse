// ============================================
// Progress Dots - OBSIDIAN Neon-Noir Design
// Neon green active state, white inactive
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
              transition-all duration-300 ease-fintech
              ${isActive 
                ? 'w-8 bg-neon glow-neon-sm' 
                : isCompleted 
                  ? 'w-2 bg-neon' 
                  : 'w-2 bg-obsidian-400'
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
