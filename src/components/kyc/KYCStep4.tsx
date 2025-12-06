// ============================================
// KYC Step 4: Gig Platform Linking
// ============================================

import { useState } from 'react';
import { Briefcase, Plus, X, Check, Loader2, AlertCircle, ChevronRight, Star, TrendingUp } from 'lucide-react';
import { KYCStep4Data, GigPlatformInput, PlatformName, PLATFORM_METADATA, PlatformVerificationResult } from '../../types';
import { verifyGigPlatform } from '../../services/kycService';

interface KYCStep4Props {
  data: KYCStep4Data;
  onUpdate: (data: Partial<KYCStep4Data>) => void;
  onAddPlatform: (platform: GigPlatformInput) => void;
  onRemovePlatform: (index: number) => void;
  error: string | null;
  userId: string;
}

interface VerifiedPlatform extends GigPlatformInput {
  stats?: {
    rating: number;
    totalTrips: number;
    lifetimeEarnings: number;
    completionRate: number;
    joinedDate: string;
  };
  isVerified: boolean;
  isVerifying: boolean;
  verificationError?: string;
}

export function KYCStep4({ data, onUpdate, onAddPlatform, onRemovePlatform, error, userId }: KYCStep4Props) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformName | null>(null);
  const [driverId, setDriverId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [verifiedPlatforms, setVerifiedPlatforms] = useState<VerifiedPlatform[]>([]);

  const availablePlatforms: PlatformName[] = ['Grab', 'Foodpanda', 'Shopee', 'Lalamove', 'GoGet'];
  
  // Filter out already added platforms
  const unlinkedPlatforms = availablePlatforms.filter(
    p => !data.platforms.some(linked => linked.platformName === p)
  );

  const handleVerifyPlatform = async () => {
    if (!selectedPlatform || !driverId.trim()) {
      setVerificationError('Please enter your Driver ID');
      return;
    }

    setIsVerifying(true);
    setVerificationError(null);

    const result = await verifyGigPlatform(userId, {
      platformName: selectedPlatform,
      driverId: driverId.trim(),
    });

    setIsVerifying(false);

    if (result.success && result.stats) {
      // Add to verified platforms
      const newPlatform: VerifiedPlatform = {
        platformName: selectedPlatform,
        driverId: driverId.trim(),
        stats: result.stats,
        isVerified: true,
        isVerifying: false,
      };
      
      setVerifiedPlatforms([...verifiedPlatforms, newPlatform]);
      onAddPlatform({
        platformName: selectedPlatform,
        driverId: driverId.trim(),
      });
      
      // Reset modal
      setShowAddModal(false);
      setSelectedPlatform(null);
      setDriverId('');
    } else {
      setVerificationError(result.error || 'Verification failed. Please check your Driver ID.');
    }
  };

  const getPlatformData = (platformName: PlatformName) => {
    return verifiedPlatforms.find(p => p.platformName === platformName);
  };

  // Add Modal
  if (showAddModal) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-gray-900 text-lg font-semibold">Link Platform</h3>
          <button
            onClick={() => {
              setShowAddModal(false);
              setSelectedPlatform(null);
              setDriverId('');
              setVerificationError(null);
            }}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Platform Selection */}
        {!selectedPlatform ? (
          <div className="space-y-3">
            <p className="text-gray-500 text-sm">Select a platform to link:</p>
            {unlinkedPlatforms.map((platform) => {
              const meta = PLATFORM_METADATA[platform];
              return (
                <button
                  key={platform}
                  onClick={() => setSelectedPlatform(platform)}
                  className="w-full flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all"
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ backgroundColor: meta.bgColor }}
                  >
                    {meta.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="text-gray-900 font-medium">{meta.name}</h4>
                    <p className="text-gray-500 text-sm">Tap to connect</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              );
            })}
            
            {unlinkedPlatforms.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                All platforms have been linked!
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Selected Platform */}
            <div className="flex items-center gap-4 p-4 bg-purple-50 border border-purple-200 rounded-xl">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ backgroundColor: PLATFORM_METADATA[selectedPlatform].bgColor }}
              >
                {PLATFORM_METADATA[selectedPlatform].icon}
              </div>
              <div className="flex-1">
                <h4 className="text-gray-900 font-medium">{PLATFORM_METADATA[selectedPlatform].name}</h4>
                <p className="text-purple-600 text-sm">Enter your Driver ID</p>
              </div>
            </div>

            {/* Driver ID Input */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Driver ID / Partner ID
              </label>
              <input
                type="text"
                value={driverId}
                onChange={(e) => {
                  setDriverId(e.target.value.toUpperCase());
                  setVerificationError(null);
                }}
                placeholder={`e.g., ${selectedPlatform.substring(0, 3).toUpperCase()}-12345`}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <p className="text-gray-400 text-xs mt-1">
                Find this in your {selectedPlatform} driver app settings
              </p>
            </div>

            {/* Error */}
            {verificationError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm flex items-start gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{verificationError}</span>
              </div>
            )}

            {/* Verify Button */}
            <button
              onClick={handleVerifyPlatform}
              disabled={isVerifying || !driverId.trim()}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isVerifying ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  Verify & Link
                </>
              )}
            </button>

            {/* Back Button */}
            <button
              onClick={() => {
                setSelectedPlatform(null);
                setDriverId('');
                setVerificationError(null);
              }}
              className="w-full py-3 text-gray-600"
            >
              ← Choose Different Platform
            </button>
          </div>
        )}
      </div>
    );
  }

  // Main View
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Briefcase className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-gray-900 text-xl font-semibold">Link Gig Platforms</h3>
        <p className="text-gray-500 text-sm mt-1">Connect your delivery accounts to build RyScore</p>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-teal-50 to-green-50 border border-teal-100 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <TrendingUp className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-teal-900 font-medium text-sm">Boost Your RyScore</p>
            <p className="text-teal-700 text-xs mt-1">
              Each verified platform adds up to 100 points to your score based on your ratings and activity.
            </p>
          </div>
        </div>
      </div>

      {/* Linked Platforms */}
      {data.platforms.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-gray-700 font-medium text-sm">Linked Platforms</h4>
          {data.platforms.map((platform, index) => {
            const meta = PLATFORM_METADATA[platform.platformName];
            const platformData = getPlatformData(platform.platformName);
            
            return (
              <div
                key={index}
                className="bg-white border border-green-200 rounded-xl p-4 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ backgroundColor: meta.bgColor }}
                  >
                    {meta.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-gray-900 font-medium">{meta.name}</h4>
                      <div className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        Verified
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm">ID: {platform.driverId}</p>
                  </div>
                  <button
                    onClick={() => {
                      onRemovePlatform(index);
                      setVerifiedPlatforms(verifiedPlatforms.filter(p => p.platformName !== platform.platformName));
                    }}
                    className="w-8 h-8 rounded-full hover:bg-red-50 flex items-center justify-center"
                  >
                    <X className="w-4 h-4 text-gray-400 hover:text-red-500" />
                  </button>
                </div>

                {/* Stats */}
                {platformData?.stats && (
                  <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-3 gap-2">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-amber-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-semibold">{platformData.stats.rating.toFixed(2)}</span>
                      </div>
                      <p className="text-gray-500 text-xs">Rating</p>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">{platformData.stats.totalTrips}</div>
                      <p className="text-gray-500 text-xs">Trips</p>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">
                        RM {(platformData.stats.lifetimeEarnings / 1000).toFixed(1)}k
                      </div>
                      <p className="text-gray-500 text-xs">Earnings</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Add Platform Button */}
      {unlinkedPlatforms.length > 0 && (
        <button
          onClick={() => setShowAddModal(true)}
          className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center gap-2 text-gray-600 hover:border-purple-300 hover:bg-purple-50 hover:text-purple-600 transition-all"
        >
          <Plus className="w-5 h-5" />
          {data.platforms.length === 0 ? 'Add Your First Platform' : 'Add Another Platform'}
        </button>
      )}

      {/* Minimum Requirement */}
      {data.platforms.length === 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-700 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span>Link at least one gig platform to complete KYC and receive your RyScore.</span>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

