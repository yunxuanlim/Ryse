// ============================================
// KYC Step 4: Gig Platform Linking
// Cash App Inspired - Clean platform cards
// ============================================

import { useState } from 'react';
import { Check, Plus, X, ChevronRight, AlertCircle, Loader2 } from 'lucide-react';
import { KYCStep4Data, GigPlatform } from '../../types';

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
      <div className="bg-gray-50 rounded-2xl p-4">
        <p className="text-gray-600 text-sm">
          🔗 Connect your gig platforms to build your RyScore and unlock better credit options.
        </p>
      </div>

      {/* Linked Platforms */}
      {linkedPlatforms.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-gray-500 font-medium">Connected platforms</p>
          {linkedPlatforms.map((platform) => {
            const platformInfo = PLATFORMS.find(p => p.name === platform.platformName);
            return (
              <div
                key={platform.id}
                className="bg-white border border-gray-200 rounded-2xl p-4"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                    style={{ backgroundColor: `${platformInfo?.color}20` }}
                  >
                    {platformInfo?.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">{platform.platformName}</span>
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                        Verified
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm">ID: {platform.driverId}</p>
                  </div>
                  <button
                    onClick={() => onRemovePlatform(platform.id)}
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
                
                {platform.stats && (
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                    <div>
                      <p className="text-gray-400 text-xs">Orders</p>
                      <p className="text-gray-900 font-semibold">{platform.stats.totalOrders}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Rating</p>
                      <p className="text-gray-900 font-semibold">⭐ {platform.stats.avgRating}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Active</p>
                      <p className="text-gray-900 font-semibold">{platform.stats.monthsActive} months</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Avg. Monthly</p>
                      <p className="text-gray-900 font-semibold">RM {platform.stats.avgMonthlyEarnings}</p>
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
        <div className="bg-gray-50 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ 
                  backgroundColor: `${PLATFORMS.find(p => p.name === selectedPlatform)?.color}20` 
                }}
              >
                {PLATFORMS.find(p => p.name === selectedPlatform)?.icon}
              </div>
              <span className="font-semibold text-gray-900">{selectedPlatform}</span>
            </div>
            <button
              onClick={() => {
                setSelectedPlatform(null);
                setDriverId('');
                setLinkError(null);
              }}
              className="text-gray-500 text-sm"
            >
              Cancel
            </button>
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-2 block">Driver/Partner ID</label>
            <input
              type="text"
              value={driverId}
              onChange={(e) => setDriverId(e.target.value)}
              placeholder="Enter your driver ID"
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {linkError && (
            <p className="text-red-500 text-sm">{linkError}</p>
          )}

          <button
            onClick={handleLinkPlatform}
            disabled={!driverId || isLinking}
            className="w-full py-3 bg-black text-white rounded-full font-medium flex items-center justify-center gap-2 disabled:opacity-50"
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
          <p className="text-sm text-gray-500 font-medium">Add platform</p>
          {unlinkedPlatforms.map((platform) => (
            <button
              key={platform.name}
              onClick={() => setSelectedPlatform(platform.name)}
              className="w-full flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-colors"
            >
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${platform.color}20` }}
              >
                {platform.icon}
              </div>
              <span className="flex-1 text-left font-medium text-gray-900">{platform.name}</span>
              <Plus className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>
      ) : (
        <div className="bg-green-50 rounded-2xl p-6 text-center">
          <div className="text-4xl mb-3">🎉</div>
          <p className="text-green-700 font-medium">All platforms connected!</p>
          <p className="text-green-600 text-sm">You've linked all available platforms</p>
        </div>
      )}

      {/* Minimum requirement note */}
      {linkedPlatforms.length === 0 && (
        <p className="text-gray-400 text-sm text-center">
          Link at least one platform to complete verification
        </p>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 rounded-2xl p-4 text-red-700 text-sm flex items-start gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          {error}
        </div>
      )}
    </div>
  );
}
