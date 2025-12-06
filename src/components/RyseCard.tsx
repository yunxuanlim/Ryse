// ============================================
// Ryse Card Component
// Physical debit card design like Cash App
// ============================================

interface RyseCardProps {
  userName?: string;
  cardNumber?: string;
  variant?: 'neon' | 'black' | 'gradient';
  size?: 'small' | 'medium' | 'large';
  showDetails?: boolean;
  onClick?: () => void;
}

export function RyseCard({ 
  userName = 'CARDHOLDER NAME',
  cardNumber = '•••• •••• •••• 4242',
  variant = 'neon',
  size = 'medium',
  showDetails = false,
  onClick
}: RyseCardProps) {

  const sizeStyles: Record<string, React.CSSProperties> = {
    small: { width: '160px', height: '100px' },
    medium: { width: '280px', height: '175px' },
    large: { width: '320px', height: '200px' }
  };

  const variantColors = {
    neon: { bg: '#B9FF00', text: '#000', accent: '#a8e600' },
    black: { bg: '#000', text: '#fff', accent: '#333' },
    gradient: { bg: 'linear-gradient(135deg, #7c3aed, #3b82f6, #06b6d4)', text: '#fff', accent: 'rgba(255,255,255,0.2)' }
  };

  const colors = variantColors[variant];
  const isGradient = variant === 'gradient';

  return (
    <div 
      className="cursor-pointer relative"
      style={sizeStyles[size]}
      onClick={onClick}
    >
      {/* Card Face */}
      <div 
        className="absolute inset-0 rounded-2xl p-5 flex flex-col justify-between overflow-hidden"
        style={{ 
          background: colors.bg,
          boxShadow: variant === 'neon' 
            ? '0 20px 60px rgba(185, 255, 0, 0.3)' 
            : variant === 'black'
              ? '0 20px 60px rgba(0, 0, 0, 0.3)'
              : '0 20px 60px rgba(124, 58, 237, 0.3)'
        }}
      >
        {/* Accent Pattern */}
        {variant === 'neon' && (
          <div 
            className="absolute bottom-0 right-0 w-32 h-32 rounded-tl-[80px] opacity-60"
            style={{ background: colors.accent }}
          />
        )}

        {/* Chip & Logo */}
        <div className="flex items-start justify-between relative z-10">
          {/* EMV Chip */}
          <div 
            className="w-10 h-7 rounded-md flex items-center justify-center"
            style={{ background: variant === 'neon' ? '#d1d5db' : variant === 'black' ? '#4b5563' : 'rgba(255,255,255,0.3)' }}
          >
            <div className="w-6 h-4 border border-gray-400 rounded-sm opacity-60 grid grid-cols-3 gap-px p-0.5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-400 opacity-50 rounded-sm" />
              ))}
            </div>
          </div>
          
          {/* RYSE Logo */}
          <div 
            className="font-bold text-base tracking-widest"
            style={{ color: colors.text }}
          >
            RYSE
          </div>
        </div>

        {/* Card Number */}
        {showDetails && size !== 'small' && (
          <div 
            className="font-mono text-sm tracking-wider opacity-80 relative z-10"
            style={{ color: colors.text }}
          >
            {cardNumber}
          </div>
        )}

        {/* Bottom Row */}
        <div className="flex items-end justify-between relative z-10">
          <div 
            className="text-xs font-medium tracking-wide uppercase opacity-80"
            style={{ color: colors.text }}
          >
            {showDetails ? userName : 'DEBIT'}
          </div>
          
          {/* Contactless Icon */}
          <svg 
            className="w-5 h-5 opacity-70" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke={colors.text} 
            strokeWidth="2"
          >
            <path d="M8.5 14a4 4 0 0 1 4-4" strokeLinecap="round" />
            <path d="M5.5 14a7 7 0 0 1 7-7" strokeLinecap="round" />
            <path d="M2.5 14a10 10 0 0 1 10-10" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// Card Preview Component for selection
export function RyseCardPreview({ 
  variant,
  selected = false,
  onClick 
}: { 
  variant: 'neon' | 'black' | 'gradient';
  selected?: boolean;
  onClick?: () => void;
}) {
  const labels = {
    neon: 'Glow in the dark',
    black: 'Classic Black',
    gradient: 'RYSE Signature'
  };

  const descriptions = {
    neon: 'Light up the night with this neon card.',
    black: 'Sleek and professional design.',
    gradient: 'Make it yours with custom colors.'
  };

  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-2xl border-2 transition-all ${
        selected 
          ? 'border-black bg-gray-50' 
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="w-24 h-14 flex-shrink-0">
          <RyseCard variant={variant} size="small" />
        </div>
        <div className="flex-1 text-left">
          <h3 className="font-semibold text-gray-900">{labels[variant]}</h3>
          <p className="text-sm text-gray-500">{descriptions[variant]}</p>
        </div>
        {selected && (
          <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>
    </button>
  );
}

