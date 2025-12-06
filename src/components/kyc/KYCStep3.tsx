// ============================================
// KYC Step 3: Face Liveness Verification
// Project Obsidian - Neon-Noir Dark Theme
// ============================================

import { useState, useRef, useEffect } from 'react';
import { Camera, Check, RefreshCw, AlertCircle } from 'lucide-react';
import { KYCStep3Data } from '../../types';

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

interface KYCStep3Props {
  data: KYCStep3Data;
  onUpdate: (data: Partial<KYCStep3Data>) => void;
  error: string | null;
}

type LivenessAction = 'center' | 'blink' | 'turn_left' | 'turn_right' | 'smile';

export function KYCStep3({ data, onUpdate, error }: KYCStep3Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [currentAction, setCurrentAction] = useState<LivenessAction>('center');
  const [completedActions, setCompletedActions] = useState<LivenessAction[]>([]);
  const [isVerifying, setIsVerifying] = useState(false);

  const actions: { id: LivenessAction; label: string; emoji: string }[] = [
    { id: 'center', label: 'Look at camera', emoji: '👁️' },
    { id: 'blink', label: 'Blink twice', emoji: '😌' },
    { id: 'turn_left', label: 'Turn head left', emoji: '👈' },
  ];

  useEffect(() => {
    return () => {
      // Cleanup camera on unmount
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 640, height: 480 }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
        // Start verification sequence
        startVerification();
      }
    } catch (err) {
      console.error('Camera error:', err);
    }
  };

  const startVerification = async () => {
    setIsVerifying(true);
    setCompletedActions([]);
    
    // Simulate liveness check sequence
    for (const action of actions) {
      setCurrentAction(action.id);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setCompletedActions(prev => [...prev, action.id]);
    }

    // Complete verification
    await new Promise(resolve => setTimeout(resolve, 500));
    
    onUpdate({
      selfieVideo: 'verified',
      livenessScore: 0.95,
      livenessActions: actions.map(a => a.id),
    });

    // Stop camera
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
    setCameraActive(false);
    setIsVerifying(false);
  };

  const isCompleted = data.selfieVideo && data.livenessScore && data.livenessScore > 0.8;

  return (
    <div className="space-y-6 py-4">
      {/* Instructions */}
      {!cameraActive && !isCompleted && (
        <div 
          className="rounded-2xl p-4"
          style={{ backgroundColor: COLORS.obsidian200 }}
        >
          <p className="text-sm" style={{ color: COLORS.whiteMedium }}>
            📸 We'll verify your identity with a quick selfie. Follow the on-screen prompts.
          </p>
        </div>
      )}

      {/* Camera View / Start Button */}
      <div className="relative">
        {cameraActive ? (
          <div 
            className="relative rounded-2xl overflow-hidden"
            style={{ backgroundColor: COLORS.obsidian100 }}
          >
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-80 object-cover scale-x-[-1]"
            />
            
            {/* Face guide overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="w-48 h-64 border-4 rounded-full"
                style={{ borderColor: `${COLORS.neonPrimary}50` }}
              />
            </div>

            {/* Current action */}
            {isVerifying && (
              <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                <div 
                  className="backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-3"
                  style={{ backgroundColor: `${COLORS.obsidian100}CC` }}
                >
                  <span className="text-2xl">
                    {actions.find(a => a.id === currentAction)?.emoji}
                  </span>
                  <span className="font-medium" style={{ color: COLORS.whiteHigh }}>
                    {actions.find(a => a.id === currentAction)?.label}
                  </span>
                </div>
              </div>
            )}
          </div>
        ) : isCompleted ? (
          <div 
            className="rounded-2xl p-8 flex flex-col items-center"
            style={{ backgroundColor: `${COLORS.neonPrimary}15` }}
          >
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: COLORS.neonPrimary }}
            >
              <Check className="w-10 h-10" style={{ color: COLORS.obsidian100 }} />
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: COLORS.whiteHigh }}>Verified!</h3>
            <p className="text-center" style={{ color: COLORS.whiteLow }}>
              Your face has been successfully verified
            </p>
            <p className="text-sm font-medium mt-2" style={{ color: COLORS.neonPrimary }}>
              Liveness Score: {((data.livenessScore || 0) * 100).toFixed(0)}%
            </p>
          </div>
        ) : (
          <button
            onClick={startCamera}
            className="w-full h-64 rounded-2xl flex flex-col items-center justify-center gap-4 transition-all hover:opacity-90"
            style={{ backgroundColor: COLORS.obsidian200 }}
          >
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: COLORS.neonPrimary }}
            >
              <Camera className="w-8 h-8" style={{ color: COLORS.obsidian100 }} />
            </div>
            <span className="font-medium" style={{ color: COLORS.whiteHigh }}>Start face verification</span>
            <span className="text-sm" style={{ color: COLORS.whiteLow }}>Takes about 10 seconds</span>
          </button>
        )}
      </div>

      {/* Progress Steps */}
      {(cameraActive || isCompleted) && (
        <div className="space-y-3">
          {actions.map((action) => {
            const isComplete = completedActions.includes(action.id) || isCompleted;
            const isCurrent = currentAction === action.id && !isCompleted;
            
            return (
              <div
                key={action.id}
                className="flex items-center gap-3 p-4 rounded-2xl transition-all"
                style={{
                  backgroundColor: isComplete 
                    ? `${COLORS.neonPrimary}15` 
                    : isCurrent 
                    ? COLORS.obsidian200 
                    : COLORS.obsidian200,
                  border: isComplete ? `1px solid ${COLORS.neonDim}` : 'none',
                }}
              >
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isCurrent ? 'animate-pulse' : ''
                  }`}
                  style={{
                    backgroundColor: isComplete 
                      ? COLORS.neonPrimary 
                      : isCurrent 
                      ? COLORS.neonDim 
                      : COLORS.obsidian100,
                    color: isComplete || isCurrent ? COLORS.obsidian100 : COLORS.whiteLow,
                  }}
                >
                  {isComplete ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span className="text-sm">{action.emoji}</span>
                  )}
                </div>
                <span 
                  className="font-medium"
                  style={{ color: isComplete ? COLORS.neonPrimary : COLORS.whiteMedium }}
                >
                  {action.label}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Retry button */}
      {isCompleted && (
        <button
          onClick={() => {
            onUpdate({
              selfieVideo: null,
              livenessScore: undefined,
              livenessActions: [],
            });
            setCompletedActions([]);
          }}
          className="w-full flex items-center justify-center gap-2 py-3"
          style={{ color: COLORS.whiteLow }}
        >
          <RefreshCw className="w-4 h-4" />
          <span>Redo verification</span>
        </button>
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
