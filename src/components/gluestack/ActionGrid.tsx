// ============================================
// ActionGrid - OBSIDIAN Neon-Noir Design
// Square cards with neon accents on deep black
// ============================================

import { CreditCard, PiggyBank, BarChart2, Users } from 'lucide-react';
import { Screen } from '../../App';

// Obsidian Color Palette
const COLORS = {
  neon: '#39FF14',
  neonDim: '#1B7A0F',
  obsidian200: '#121212',
  obsidian300: '#1A1A1A',
  whiteMed: 'rgba(255, 255, 255, 0.87)',
  whiteLow: 'rgba(255, 255, 255, 0.60)',
};

interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress?: () => void;
}

function ActionCard({ 
  icon, 
  title, 
  subtitle, 
  onPress 
}: ActionCardProps) {
  return (
    <button
      onClick={onPress}
      className="
        aspect-square w-full
        bg-obsidian-200 rounded-2xl
        p-4 flex flex-col items-center justify-center gap-2
        transition-all duration-150 ease-fintech
        hover:scale-[1.02] hover:bg-obsidian-300 active:scale-[0.98]
        focus:outline-none focus-neon
        border border-white-divider
      "
      style={{
        boxShadow: '0 0 20px rgba(57, 255, 20, 0.1)',
        borderRadius: 16,
      }}
    >
      <div 
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-1"
        style={{ backgroundColor: 'rgba(57, 255, 20, 0.15)' }}
      >
        {icon}
      </div>
      
      <span className="text-sm font-semibold text-white-high text-center">
        {title}
      </span>
      
      {subtitle && (
        <span className="text-xs text-neon text-center -mt-1">
          {subtitle}
        </span>
      )}
    </button>
  );
}

interface ActionGridProps {
  onNavigate?: (screen: Screen) => void;
}

export function ActionGrid({ onNavigate }: ActionGridProps) {
  const actions = [
    {
      id: 'loan',
      icon: <CreditCard className="w-6 h-6 text-neon" />,
      title: 'Quick Advance',
      subtitle: 'Get RM500',
      screen: 'loan' as Screen,
    },
    {
      id: 'savings',
      icon: <PiggyBank className="w-6 h-6 text-neon" />,
      title: 'Micro-Save',
      subtitle: '3.75% APY',
      screen: 'savings' as Screen,
    },
    {
      id: 'income',
      icon: <BarChart2 className="w-6 h-6 text-neon" />,
      title: 'Income Trends',
      subtitle: undefined,
      screen: 'income' as Screen,
    },
    {
      id: 'community',
      icon: <Users className="w-6 h-6 text-neon" />,
      title: 'Gig Squad',
      subtitle: undefined,
      screen: 'community' as Screen,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {actions.map((action) => (
        <ActionCard
          key={action.id}
          icon={action.icon}
          title={action.title}
          subtitle={action.subtitle}
          onPress={() => onNavigate?.(action.screen)}
        />
      ))}
    </div>
  );
}

export default ActionGrid;
