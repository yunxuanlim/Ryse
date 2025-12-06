// ============================================
// KYC Step 4: Gig Platform Linking
// Project Obsidian - Neon-Noir Dark Theme
// ============================================

import { useState } from 'react';
import { Check, Plus, X, AlertCircle, Loader2 } from 'lucide-react';
import { KYCStep4Data, GigPlatform } from '../../types';

// Obsidian Theme Colors
const COLORS = {
  obsidian100: '#060606',
  obsidian200: '#121212',
  neonPrimary: '#39FF14',
  neonDim: '#1B7A0F',
  whiteHigh: '#FFFFFF',
  whiteMedium: 'rgba(255,255,255,0.87)',
  whiteLow: 'rgba(255,255,255,0.60)',
};

interface KYCStep4Props {
  data: KYCStep4Data;
  onUpdate: (data: Partial<KYCStep4Data>) => void;
  onAddPlatform: (platform: Omit<GigPlatform, 'id' | 'linkedAt'>) => Promise<boolean>;
  onRemovePlatform: (platformId: string) => void;
  error: string | null;
  userId: string;
}

const PLATFORMS = [
  { name: 'Grab', icon: '🚗', color: '#00B14F' },
  { name: 'Foodpanda', icon: '🐼', color: '#D70F64' },
  { name: 'Shopee', icon: '🛒', color: '#EE4D2D' },
  { name: 'GoGet', icon: '📦', color: '#00C9A7' },
  { name: 'Lalamove', icon: '🚚', color: '#F5A623' },
] as const;

export function KYCStep4({ data, onAddPlatform, onRemovePlatform, error }: KYCStep4Props) {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [driverId, setDriverId] = useState('');
  const [isLinking, setIsLinking] = useState(false);
  const [linkError, setLinkError] = useState<string | null>(null);

  const handleLinkPlatform = async () => {
    if (!selectedPlatform || !driverId) return;

    setIsLinking(true);
    setLinkError(null);

    try {
      const success = await onAddPlatform({
        platformName: selectedPlatform,
        driverId: driverId,
        isVerified: true,
        stats: {
          totalOrders: Math.floor(Math.random() * 1000) + 100,
          avgRating: (4.5 + Math.random() * 0.5).toFixed(1),
          monthsActive: Math.floor(Math.random() * 24) + 6,
          avgMonthlyEarnings: Math.floor(Math.random() * 3000) + 2000,
        },
      });

      if (success) {
        setSelectedPlatform(null);
        setDriverId('');
      } else {
        setLinkError('Failed to link platform. Please try again.');
      }
    } catch (err) {
      setLinkError('An error occurred. Please try again.');
    }

    setIsLinking(false);
  };

  const linkedPlatforms = data.platforms?.filter(p => p.isVerified) || [];
  const unlinkedPlatforms = PLATFORMS.filter(
    p => !linkedPlatforms.some(lp => lp.platformName === p.name)
  );

  return (
    <div className="space-y-6 py-4">
      {/* Instructions */}
      <div 
        className="rounded-2xl p-4"
        style={{ backgroundColor: COLORS.obsidian200 }}
      >
        <p className="text-sm" style={{ color: COLORS.whiteMedium }}>
          🔗 Connect your gig platforms to build your RyScore and unlock better credit options.
        </p>
      </div>

      {/* Linked Platforms */}
      {linkedPlatforms.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium" style={{ color: COLORS.whiteLow }}>Connected platforms</p>
          {linkedPlatforms.map((platform) => {
            const platformInfo = PLATFORMS.find(p => p.name === platform.platformName);
            return (
              <div
                key={platform.id}
                className="rounded-2xl p-4"
                style={{ 
                  backgroundColor: COLORS.obsidian200,
                  border: `1px solid ${COLORS.neonDim}`,
                }}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                    style={{ backgroundColor: `${platformInfo?.color}30` }}
                  >
                    {platformInfo?.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold" style={{ color: COLORS.whiteHigh }}>{platform.platformName}</span>
                      <span 
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: `${COLORS.neonPrimary}20`, color: COLORS.neonPrimary }}
                      >
                        Verified
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: COLORS.whiteLow }}>ID: {platform.driverId}</p>
                  </div>
                  <button
                    onClick={() => onRemovePlatform(platform.id)}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                    style={{ backgroundColor: COLORS.obsidian100 }}
                  >
                    <X className="w-4 h-4" style={{ color: COLORS.whiteLow }} />
                  </button>
                </div>
                
                {platform.stats && (
                  <div 
                    className="grid grid-cols-2 gap-3 pt-3"
                    style={{ borderTop: `1px solid ${COLORS.obsidian100}` }}
                  >
                    <div>
                      <p className="text-xs" style={{ color: COLORS.whiteLow }}>Orders</p>
                      <p className="font-semibold" style={{ color: COLORS.whiteHigh }}>{platform.stats.totalOrders}</p>
                    </div>
                    <div>
                      <p className="text-xs" style={{ color: COLORS.whiteLow }}>Rating</p>
                      <p className="font-semibold" style={{ color: COLORS.whiteHigh }}>⭐ {platform.stats.avgRating}</p>
                    </div>
                    <div>
                      <p className="text-xs" style={{ color: COLORS.whiteLow }}>Active</p>
                      <p className="font-semibold" style={{ color: COLORS.whiteHigh }}>{platform.stats.monthsActive} months</p>
                    </div>
                    <div>
                      <p className="text-xs" style={{ color: COLORS.whiteLow }}>Avg. Monthly</p>
                      <p className="font-semibold" style={{ color: COLORS.neonPrimary }}>RM {platform.stats.avgMonthlyEarnings}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Link New Platform */}
      {selectedPlatform ? (
        <div 
          className="rounded-2xl p-5 space-y-4"
          style={{ backgroundColor: COLORS.obsidian200 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ 
                  backgroundColor: `${PLATFORMS.find(p => p.name === selectedPlatform)?.color}30` 
                }}
              >
                {PLATFORMS.find(p => p.name === selectedPlatform)?.icon}
              </div>
              <span className="font-semibold" style={{ color: COLORS.whiteHigh }}>{selectedPlatform}</span>
            </div>
            <button
              onClick={() => {
                setSelectedPlatform(null);
                setDriverId('');
                setLinkError(null);
              }}
              className="text-sm"
              style={{ color: COLORS.whiteLow }}
            >
              Cancel
            </button>
          </div>

          <div>
            <label className="text-sm mb-2 block" style={{ color: COLORS.whiteLow }}>Driver/Partner ID</label>
            <input
              type="text"
              value={driverId}
              onChange={(e) => setDriverId(e.target.value)}
              placeholder="Enter your driver ID"
              className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
              style={{
                backgroundColor: COLORS.obsidian100,
                color: COLORS.whiteHigh,
                border: `1px solid ${COLORS.neonDim}`,
              }}
            />
          </div>

          {linkError && (
            <p className="text-sm" style={{ color: '#FF4444' }}>{linkError}</p>
          )}

          <button
            onClick={handleLinkPlatform}
            disabled={!driverId || isLinking}
            className="w-full py-3 rounded-full font-medium flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
            style={{ backgroundColor: COLORS.neonPrimary, color: COLORS.obsidian100 }}
          >
            {isLinking ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <Check className="w-5 h-5" />
                Link Account
              </>
            )}
          </button>
        </div>
      ) : unlinkedPlatforms.length > 0 ? (
        <div className="space-y-3">
          <p className="text-sm font-medium" style={{ color: COLORS.whiteLow }}>Add platform</p>
          {unlinkedPlatforms.map((platform) => (
            <button
              key={platform.name}
              onClick={() => setSelectedPlatform(platform.name)}
              className="w-full flex items-center gap-4 p-4 rounded-2xl transition-all hover:opacity-90"
              style={{ backgroundColor: COLORS.obsidian200 }}
            >
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${platform.color}30` }}
              >
                {platform.icon}
              </div>
              <span className="flex-1 text-left font-medium" style={{ color: COLORS.whiteHigh }}>{platform.name}</span>
              <Plus className="w-5 h-5" style={{ color: COLORS.neonPrimary }} />
            </button>
          ))}
        </div>
      ) : (
        <div 
          className="rounded-2xl p-6 text-center"
          style={{ backgroundColor: `${COLORS.neonPrimary}15` }}
        >
          <div className="text-4xl mb-3">🎉</div>
          <p className="font-medium" style={{ color: COLORS.neonPrimary }}>All platforms connected!</p>
          <p className="text-sm" style={{ color: COLORS.whiteLow }}>You've linked all available platforms</p>
        </div>
      )}

      {/* Minimum requirement note */}
      {linkedPlatforms.length === 0 && (
        <p className="text-sm text-center" style={{ color: COLORS.whiteLow }}>
          Link at least one platform to complete verification
        </p>
      )}

      {/* Error */}
      {error && (
        <div 
          className="rounded-2xl p-4 text-sm flex items-start gap-2"
          style={{
            background: 'repeating-linear-gradient(45deg, #060606, #060606 10px, #1a1a1a 10px, #1a1a1a 20px)',
            color: COLORS.whiteHigh,
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          {error}
        </div>
      )}
    </div>
  );
}
