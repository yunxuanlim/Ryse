// ============================================
// ActionGrid - 2x2 Quick Actions Grid
// Square cards with icons and subtle shadows
// ============================================

import { CreditCard, PiggyBank, BarChart2, Users } from 'lucide-react';
import { Screen } from '../../App';

// Brand Colors
const COLORS = {
  blue: '#0052FF',
  green: '#00D632',
  white: '#FFFFFF',
  gray: '#6B7280',
  lightGray: '#F3F4F6',
};

interface ActionCardProps {
  icon: React.ReactNode;
  iconBgColor: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
}

function ActionCard({ 
  icon, 
  iconBgColor, 
  title, 
  subtitle, 
  onPress 
}: ActionCardProps) {
  return (
    <button
      onClick={onPress}
      className="
        aspect-square w-full
        bg-white rounded-2xl
        p-4 flex flex-col items-center justify-center gap-2
        transition-all duration-150 ease-out
        hover:scale-[1.02] active:scale-[0.98]
        focus:outline-none focus:ring-2 focus:ring-gray-200
      "
      style={{
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
        borderRadius: 16,
      }}
    >
      <div 
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-1"
        style={{ backgroundColor: iconBgColor }}
      >
        {icon}
      </div>
      
      <span className="text-sm font-semibold text-gray-900 text-center">
        {title}
      </span>
      
      {subtitle && (
        <span className="text-xs text-gray-500 text-center -mt-1">
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
      icon: <CreditCard className="w-6 h-6" style={{ color: COLORS.blue }} />,
      iconBgColor: `${COLORS.blue}15`,
      title: 'Quick Advance',
      subtitle: 'Get RM500',
      screen: 'loan' as Screen,
    },
    {
      id: 'savings',
      icon: <PiggyBank className="w-6 h-6" style={{ color: COLORS.green }} />,
      iconBgColor: `${COLORS.green}15`,
      title: 'Micro-Save',
      subtitle: '3.75% APY',
      screen: 'savings' as Screen,
    },
    {
      id: 'income',
      icon: <BarChart2 className="w-6 h-6" style={{ color: COLORS.blue }} />,
      iconBgColor: `${COLORS.blue}15`,
      title: 'Income Trends',
      subtitle: undefined,
      screen: 'income' as Screen,
    },
    {
      id: 'community',
      icon: <Users className="w-6 h-6" style={{ color: COLORS.green }} />,
      iconBgColor: `${COLORS.green}15`,
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
          iconBgColor={action.iconBgColor}
          title={action.title}
          subtitle={action.subtitle}
          onPress={() => onNavigate?.(action.screen)}
        />
      ))}
    </div>
  );
}

export default ActionGrid;

