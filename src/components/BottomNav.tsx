// ============================================
// Bottom Navigation - Cash App Inspired
// Clean minimal nav with black active states
// ============================================

import { Screen } from '../App';
import { Home, DollarSign, Clock, MoreHorizontal } from 'lucide-react';

interface BottomNavProps {
  currentScreen: Screen;
  navigateTo: (screen: Screen) => void;
}

export function BottomNav({ currentScreen, navigateTo }: BottomNavProps) {
  const navItems = [
    { screen: 'dashboard' as Screen, icon: Home, label: 'Home' },
    { screen: 'transaction' as Screen, icon: DollarSign, label: 'Pay' },
    { screen: 'income' as Screen, icon: Clock, label: 'Activity' },
    { screen: 'education' as Screen, icon: MoreHorizontal, label: 'More' },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 px-4 py-3 z-50">
      <div className="grid grid-cols-4 gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.screen;
          
          return (
            <button
              key={item.screen}
              onClick={() => navigateTo(item.screen)}
              className="flex flex-col items-center gap-1 py-1"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                isActive ? 'bg-gray-100' : ''
              }`}>
                <Icon 
                  className={`w-6 h-6 transition-colors ${
                    isActive ? 'text-black' : 'text-gray-400'
                  }`} 
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </div>
              <span className={`text-xs font-medium transition-colors ${
                isActive ? 'text-black' : 'text-gray-400'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
