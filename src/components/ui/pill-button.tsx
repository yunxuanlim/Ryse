// ============================================
// Pill Button - OBSIDIAN Neon-Noir Design
// Neon green primary, obsidian secondary, ghost variants
// ============================================

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

interface PillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'neon' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const PillButton = forwardRef<HTMLButtonElement, PillButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    isLoading = false,
    leftIcon,
    rightIcon,
    children, 
    className = '',
    disabled,
    ...props 
  }, ref) => {
    const baseStyles = `
      inline-flex items-center justify-center gap-2
      rounded-full font-semibold
      transition-all duration-150 ease-fintech
      active:scale-[0.98]
      disabled:cursor-not-allowed disabled:opacity-50
      focus:outline-none focus-neon
    `;

    const variants = {
      // Neon green - primary action (Obsidian theme)
      neon: 'bg-neon text-obsidian-100 hover:bg-neon-bright glow-neon-md hover:glow-neon-lg',
      // Legacy primary (maps to neon)
      primary: 'bg-neon text-obsidian-100 hover:bg-neon-bright glow-neon-sm',
      // Secondary - obsidian surface
      secondary: 'bg-obsidian-300 text-white-high hover:bg-obsidian-400 border border-white-divider',
      // Ghost - transparent
      ghost: 'bg-transparent text-white-high hover:bg-obsidian-300 underline-offset-4 hover:underline',
      // Outline - neon border
      outline: 'bg-transparent text-neon border-2 border-neon hover:bg-neon hover:bg-opacity-10',
    };

    const sizes = {
      sm: 'h-10 px-4 text-sm',
      md: 'h-14 px-6 text-base',
      lg: 'h-16 px-8 text-lg',
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon}
            {children}
            {rightIcon}
          </>
        )}
      </button>
    );
  }
);

PillButton.displayName = 'PillButton';

export default PillButton;
