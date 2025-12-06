import { Screen } from '../App';
import { Sparkles } from 'lucide-react';

interface RyseLogoProps {
  navigateTo: (screen: Screen) => void;
}

export function RyseLogo({ navigateTo }: RyseLogoProps) {
  return (
    <button
      onClick={() => navigateTo('dashboard')}
      className="flex items-center gap-2 transition-transform active:scale-95"
    >
      <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
        <Sparkles className="w-5 h-5 text-white" />
      </div>
      <span className="text-white tracking-tight">RYSE</span>
    </button>
  );
}
