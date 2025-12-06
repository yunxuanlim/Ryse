// ============================================
// RYSE Logo - Cash App Inspired
// Neon green accent with clean typography
// ============================================

import { Screen } from '../App';
import { Zap } from 'lucide-react';

interface RyseLogoProps {
  navigateTo?: (screen: Screen) => void;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export function RyseLogo({ 
  navigateTo, 
  variant = 'dark',
  size = 'md' 
}: RyseLogoProps) {
  const sizeClasses = {
    sm: { container: 'w-6 h-6', icon: 'w-4 h-4', text: 'text-sm' },
    md: { container: 'w-8 h-8', icon: 'w-5 h-5', text: 'text-base' },
    lg: { container: 'w-10 h-10', icon: 'w-6 h-6', text: 'text-lg' },
  };

  const variantClasses = {
    light: { text: 'text-white', bg: 'bg-white/20' },
    dark: { text: 'text-black', bg: '' },
  };

  const sizes = sizeClasses[size];
  const variants = variantClasses[variant];

  const content = (
    <div className="flex items-center gap-2">
      <div 
        className={`${sizes.container} rounded-xl flex items-center justify-center ${variants.bg}`}
        style={{ backgroundColor: variant === 'dark' ? 'var(--ryse-green, #B9FF00)' : undefined }}
      >
        <Zap className={`${sizes.icon} text-black`} strokeWidth={2.5} />
      </div>
      <span className={`${sizes.text} font-bold tracking-tight ${variants.text}`}>
        RYSE
      </span>
    </div>
  );

  if (navigateTo) {
    return (
      <button
        onClick={() => navigateTo('dashboard')}
        className="transition-transform active:scale-95"
      >
        {content}
      </button>
    );
  }

  return content;
}
