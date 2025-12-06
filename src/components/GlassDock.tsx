// ============================================
// GlassDock - Glassmorphism Navigation Dock
// Project Obsidian - Floating Navigation
// PRD Section 3.2.3 - Liquid Navigation
// ============================================

import { useState } from 'react';
import { Home, DollarSign, PiggyBank, BarChart2, User } from 'lucide-react';
import { Screen } from '../App';

// Obsidian Theme Colors
const COLORS = {
  obsidian100: '#060606',
  obsidian200: '#121212',
  neonPrimary: '#39FF14',
  neonDim: '#1B7A0F',
  whiteHigh: '#FFFFFF',
  whiteMedium: 'rgba(255,255,255,0.87)',
  whiteLow: 'rgba(255,255,255,0.60)',
  glassBg: 'rgba(10, 10, 10, 0.7)',
  glassBorder: 'rgba(255, 255, 255, 0.1)',
};

interface GlassDockProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

interface NavItem {
  id: Screen;
  icon: React.ReactNode;
  label: string;
}

export function GlassDock({ currentScreen, onNavigate }: GlassDockProps) {
  const [pressedItem, setPressedItem] = useState<Screen | null>(null);

  const navItems: NavItem[] = [
    { id: 'dashboard', icon: <Home className="w-6 h-6" />, label: 'Home' },
    { id: 'loan', icon: <DollarSign className="w-6 h-6" />, label: 'Advance' },
    { id: 'savings', icon: <PiggyBank className="w-6 h-6" />, label: 'Save' },
    { id: 'income', icon: <BarChart2 className="w-6 h-6" />, label: 'Income' },
    { id: 'ryscore', icon: <User className="w-6 h-6" />, label: 'Profile' },
  ];

  const handlePress = (screen: Screen) => {
    setPressedItem(screen);
    onNavigate(screen);
    // Reset press state after animation
    setTimeout(() => setPressedItem(null), 150);
  };

  return (
    <>
      {/* Dock Container */}
      <div 
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40"
        style={{
          maxWidth: '400px',
          width: 'calc(100% - 40px)',
        }}
      >
        {/* Glassmorphism Panel */}
        <div 
          className="rounded-3xl px-4 py-3 flex items-center justify-around"
          style={{
            background: COLORS.glassBg,
            backdropFilter: 'blur(30px) saturate(180%)',
            WebkitBackdropFilter: 'blur(30px) saturate(180%)',
            borderTop: `1px solid ${COLORS.glassBorder}`,
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
          }}
        >
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            const isPressed = pressedItem === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handlePress(item.id)}
                className="relative flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all duration-150"
                style={{
                  transform: isPressed ? 'scale(0.9)' : 'scale(1)',
                }}
              >
                {/* Green Spotlight Effect for Active */}
                {isActive && (
                  <div 
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full blur-lg"
                    style={{ 
                      backgroundColor: COLORS.neonPrimary,
                      opacity: 0.4,
                    }}
                  />
                )}

                {/* Icon Container */}
                <div 
                  className={`relative z-10 transition-all duration-150 ${
                    isPressed ? 'animate-micro-bounce' : ''
                  }`}
                  style={{
                    color: isActive ? COLORS.neonPrimary : COLORS.whiteLow,
                    filter: isActive ? `drop-shadow(0 0 8px ${COLORS.neonPrimary})` : 'none',
                  }}
                >
                  {item.icon}
                </div>

                {/* Label */}
                <span 
                  className="text-xs font-medium transition-colors duration-150"
                  style={{
                    color: isActive ? COLORS.neonPrimary : COLORS.whiteLow,
                  }}
                >
                  {item.label}
                </span>

                {/* Active Indicator Dot */}
                {isActive && (
                  <div 
                    className="absolute -bottom-0.5 w-1 h-1 rounded-full"
                    style={{ 
                      backgroundColor: COLORS.neonPrimary,
                      boxShadow: `0 0 8px ${COLORS.neonPrimary}`,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes micro-bounce {
          0% { transform: scale(1); }
          50% { transform: scale(0.85); }
          100% { transform: scale(1); }
        }
        .animate-micro-bounce {
          animation: micro-bounce 150ms cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </>
  );
}

// Compact version with just icons
export function GlassDockCompact({ 
  currentScreen, 
  onNavigate 
}: GlassDockProps) {
  const navItems: NavItem[] = [
    { id: 'dashboard', icon: <Home className="w-5 h-5" />, label: 'Home' },
    { id: 'loan', icon: <DollarSign className="w-5 h-5" />, label: 'Advance' },
    { id: 'savings', icon: <PiggyBank className="w-5 h-5" />, label: 'Save' },
    { id: 'income', icon: <BarChart2 className="w-5 h-5" />, label: 'Income' },
  ];

  return (
    <div 
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40"
      style={{ maxWidth: '280px', width: 'calc(100% - 60px)' }}
    >
      <div 
        className="rounded-full px-6 py-3 flex items-center justify-around"
        style={{
          background: COLORS.glassBg,
          backdropFilter: 'blur(30px) saturate(180%)',
          WebkitBackdropFilter: 'blur(30px) saturate(180%)',
          border: `1px solid ${COLORS.glassBorder}`,
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
        }}
      >
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="relative p-2 rounded-full transition-all duration-150 active:scale-90"
              style={{
                backgroundColor: isActive ? `${COLORS.neonPrimary}20` : 'transparent',
              }}
            >
              <div
                style={{
                  color: isActive ? COLORS.neonPrimary : COLORS.whiteLow,
                  filter: isActive ? `drop-shadow(0 0 6px ${COLORS.neonPrimary})` : 'none',
                }}
              >
                {item.icon}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Pill-style dock with center FAB space
export function GlassDockWithFAB({
  currentScreen,
  onNavigate,
}: GlassDockProps) {
  const leftItems: NavItem[] = [
    { id: 'dashboard', icon: <Home className="w-5 h-5" />, label: 'Home' },
    { id: 'loan', icon: <DollarSign className="w-5 h-5" />, label: 'Advance' },
  ];

  const rightItems: NavItem[] = [
    { id: 'savings', icon: <PiggyBank className="w-5 h-5" />, label: 'Save' },
    { id: 'income', icon: <BarChart2 className="w-5 h-5" />, label: 'Income' },
  ];

  const renderItem = (item: NavItem) => {
    const isActive = currentScreen === item.id;
    
    return (
      <button
        key={item.id}
        onClick={() => onNavigate(item.id)}
        className="flex flex-col items-center gap-0.5 px-4 py-2 transition-all duration-150 active:scale-90"
      >
        {/* Spotlight */}
        {isActive && (
          <div 
            className="absolute -top-2 w-6 h-6 rounded-full blur-md"
            style={{ backgroundColor: COLORS.neonPrimary, opacity: 0.3 }}
          />
        )}
        
        <div
          className="relative z-10"
          style={{
            color: isActive ? COLORS.neonPrimary : COLORS.whiteLow,
            filter: isActive ? `drop-shadow(0 0 6px ${COLORS.neonPrimary})` : 'none',
          }}
        >
          {item.icon}
        </div>
        
        <span 
          className="text-[10px] font-medium"
          style={{ color: isActive ? COLORS.neonPrimary : COLORS.whiteLow }}
        >
          {item.label}
        </span>
      </button>
    );
  };

  return (
    <div 
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2"
      style={{ maxWidth: '400px', width: 'calc(100% - 40px)' }}
    >
      {/* Left Panel */}
      <div 
        className="flex-1 rounded-full px-2 py-1 flex items-center justify-around"
        style={{
          background: COLORS.glassBg,
          backdropFilter: 'blur(30px) saturate(180%)',
          WebkitBackdropFilter: 'blur(30px) saturate(180%)',
          border: `1px solid ${COLORS.glassBorder}`,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        }}
      >
        {leftItems.map(renderItem)}
      </div>

      {/* Center Gap for FAB */}
      <div className="w-20" />

      {/* Right Panel */}
      <div 
        className="flex-1 rounded-full px-2 py-1 flex items-center justify-around"
        style={{
          background: COLORS.glassBg,
          backdropFilter: 'blur(30px) saturate(180%)',
          WebkitBackdropFilter: 'blur(30px) saturate(180%)',
          border: `1px solid ${COLORS.glassBorder}`,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        }}
      >
        {rightItems.map(renderItem)}
      </div>
    </div>
  );
}

export default GlassDock;

