// ============================================
// Bottom Navigation - Project Obsidian
// Glassmorphism floating dock with neon spotlight
// PRD Section 3.2.3 - Liquid Navigation
// ============================================

import { Screen } from '../App';
import { Home, DollarSign, PiggyBank, BarChart2, MoreHorizontal } from 'lucide-react';

// Obsidian Theme Colors
const COLORS = {
  obsidian100: '#060606',
  obsidian200: '#121212',
  obsidian300: '#1A1A1A',
  neonPrimary: '#39FF14',
  neonDim: '#1B7A0F',
  whiteHigh: '#FFFFFF',
  whiteMedium: 'rgba(255,255,255,0.87)',
  whiteLow: 'rgba(255,255,255,0.60)',
  glassBg: 'rgba(10, 10, 10, 0.7)',
  glassBorder: 'rgba(255, 255, 255, 0.1)',
};

interface BottomNavProps {
  currentScreen: Screen;
  navigateTo: (screen: Screen) => void;
}

interface NavItem {
  screen: Screen;
  icon: typeof Home;
  label: string;
}

export function BottomNav({ currentScreen, navigateTo }: BottomNavProps) {
  const navItems: NavItem[] = [
    { screen: 'dashboard', icon: Home, label: 'Home' },
    { screen: 'loan', icon: DollarSign, label: 'Advance' },
    { screen: 'savings', icon: PiggyBank, label: 'Save' },
    { screen: 'income', icon: BarChart2, label: 'Income' },
    { screen: 'education', icon: MoreHorizontal, label: 'More' },
  ];

  return (
    <>
      {/* Floating Glassmorphism Dock */}
      <div 
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40"
        style={{
          maxWidth: '420px',
          width: 'calc(100% - 32px)',
        }}
      >
        <div 
          className="rounded-3xl px-2 py-2 flex items-center justify-around"
          style={{
            background: COLORS.glassBg,
            backdropFilter: 'blur(30px) saturate(180%)',
            WebkitBackdropFilter: 'blur(30px) saturate(180%)',
            borderTop: `1px solid ${COLORS.glassBorder}`,
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 -2px 10px rgba(0, 0, 0, 0.2)',
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.screen;
            
            return (
              <button
                key={item.screen}
                onClick={() => navigateTo(item.screen)}
                className="relative flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all duration-150 active:scale-90"
              >
                {/* Green Spotlight Effect for Active */}
                {isActive && (
                  <div 
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full blur-xl"
                    style={{ 
                      backgroundColor: COLORS.neonPrimary,
                      opacity: 0.35,
                    }}
                  />
                )}

                {/* Icon Container with micro-bounce */}
                <div 
                  className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-150 ${
                    isActive ? 'animate-micro-bounce' : ''
                  }`}
                  style={{
                    backgroundColor: isActive ? `${COLORS.neonPrimary}15` : 'transparent',
                  }}
                >
                  <Icon 
                    className="w-5 h-5 transition-all duration-150"
                    strokeWidth={isActive ? 2.5 : 2}
                    style={{
                      color: isActive ? COLORS.neonPrimary : COLORS.whiteLow,
                      filter: isActive ? `drop-shadow(0 0 8px ${COLORS.neonPrimary})` : 'none',
                    }}
                  />
                </div>

                {/* Label */}
                <span 
                  className="text-[10px] font-medium transition-all duration-150"
                  style={{
                    color: isActive ? COLORS.neonPrimary : COLORS.whiteLow,
                  }}
                >
                  {item.label}
                </span>

                {/* Active Indicator Line */}
                {isActive && (
                  <div 
                    className="absolute -bottom-0.5 w-4 h-0.5 rounded-full"
                    style={{ 
                      backgroundColor: COLORS.neonPrimary,
                      boxShadow: `0 0 10px ${COLORS.neonPrimary}`,
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
          50% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        .animate-micro-bounce {
          animation: micro-bounce 150ms cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </>
  );
}

// Alternative compact pill dock
export function BottomNavPill({ currentScreen, navigateTo }: BottomNavProps) {
  const navItems: NavItem[] = [
    { screen: 'dashboard', icon: Home, label: 'Home' },
    { screen: 'loan', icon: DollarSign, label: 'Advance' },
    { screen: 'savings', icon: PiggyBank, label: 'Save' },
    { screen: 'income', icon: BarChart2, label: 'Activity' },
  ];

  return (
    <div 
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40"
      style={{ maxWidth: '300px', width: 'calc(100% - 48px)' }}
    >
      <div 
        className="rounded-full px-4 py-2.5 flex items-center justify-around"
        style={{
          background: COLORS.glassBg,
          backdropFilter: 'blur(30px) saturate(180%)',
          WebkitBackdropFilter: 'blur(30px) saturate(180%)',
          border: `1px solid ${COLORS.glassBorder}`,
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.screen;
          
          return (
            <button
              key={item.screen}
              onClick={() => navigateTo(item.screen)}
              className="relative p-2 rounded-full transition-all duration-150 active:scale-90"
              style={{
                backgroundColor: isActive ? `${COLORS.neonPrimary}20` : 'transparent',
              }}
            >
              <Icon 
                className="w-5 h-5"
                strokeWidth={isActive ? 2.5 : 2}
                style={{
                  color: isActive ? COLORS.neonPrimary : COLORS.whiteLow,
                  filter: isActive ? `drop-shadow(0 0 6px ${COLORS.neonPrimary})` : 'none',
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default BottomNav;
