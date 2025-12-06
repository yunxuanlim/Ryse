import { Screen } from '../App';
import { Wallet, TrendingUp, Users, Menu } from 'lucide-react';

interface BottomNavProps {
  currentScreen: Screen;
  navigateTo: (screen: Screen) => void;
}

export function BottomNav({ currentScreen, navigateTo }: BottomNavProps) {
  const navItems = [
    { screen: 'dashboard' as Screen, icon: Wallet, label: 'Home' },
    { screen: 'income' as Screen, icon: TrendingUp, label: 'Income' },
    { screen: 'community' as Screen, icon: Users, label: 'Community' },
    { screen: 'education' as Screen, icon: Menu, label: 'More' },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 px-6 py-4 rounded-t-3xl z-50">
      <div className="grid grid-cols-4 gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.screen;
          
          return (
            <button
              key={item.screen}
              onClick={() => navigateTo(item.screen)}
              className="flex flex-col items-center gap-1"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                isActive ? 'bg-purple-100' : ''
              }`}>
                <Icon className={`w-5 h-5 ${isActive ? 'text-purple-600' : 'text-gray-400'}`} />
              </div>
              <span className={`text-xs ${isActive ? 'text-purple-600' : 'text-gray-400'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
