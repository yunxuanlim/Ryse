// ============================================
// KYC Step 3: Face Liveness Verification
// Cash App Inspired - Clean camera interface
// ============================================

import { useState, useRef, useEffect } from 'react';
import { Camera, Check, RefreshCw, AlertCircle } from 'lucide-react';
import { KYCStep3Data } from '../../types';

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
        <div className="bg-gray-50 rounded-2xl p-4">
          <p className="text-gray-600 text-sm">
            📸 We'll verify your identity with a quick selfie. Follow the on-screen prompts.
          </p>
        </div>
      )}

      {/* Camera View / Start Button */}
      <div className="relative">
        {cameraActive ? (
          <div className="relative rounded-2xl overflow-hidden bg-black">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-80 object-cover scale-x-[-1]"
            />
            
            {/* Face guide overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-64 border-4 border-white/50 rounded-full" />
            </div>

            {/* Current action */}
            {isVerifying && (
              <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                <div className="bg-black/80 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-3">
                  <span className="text-2xl">
                    {actions.find(a => a.id === currentAction)?.emoji}
                  </span>
                  <span className="text-white font-medium">
                    {actions.find(a => a.id === currentAction)?.label}
                  </span>
                </div>
              </div>
            )}
          </div>
        ) : isCompleted ? (
          <div className="bg-green-50 rounded-2xl p-8 flex flex-col items-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Verified!</h3>
            <p className="text-gray-500 text-center">
              Your face has been successfully verified
            </p>
            <p className="text-green-600 text-sm font-medium mt-2">
              Liveness Score: {((data.livenessScore || 0) * 100).toFixed(0)}%
            </p>
          </div>
        ) : (
          <button
            onClick={startCamera}
            className="w-full h-64 bg-gray-100 rounded-2xl flex flex-col items-center justify-center gap-4 hover:bg-gray-200 transition-colors"
          >
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: 'var(--ryse-green, #B9FF00)' }}
            >
              <Camera className="w-8 h-8 text-black" />
            </div>
            <span className="text-gray-900 font-medium">Start face verification</span>
            <span className="text-gray-500 text-sm">Takes about 10 seconds</span>
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
                className={`flex items-center gap-3 p-4 rounded-2xl transition-all ${
                  isComplete
                    ? 'bg-green-50'
                    : isCurrent
                    ? 'bg-gray-100'
                    : 'bg-gray-50'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isComplete
                    ? 'bg-green-500 text-white'
                    : isCurrent
                    ? 'bg-black text-white animate-pulse'
                    : 'bg-gray-300 text-gray-500'
                }`}>
                  {isComplete ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span className="text-sm">{action.emoji}</span>
                  )}
                </div>
                <span className={`font-medium ${
                  isComplete ? 'text-green-700' : 'text-gray-700'
                }`}>
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
          className="w-full flex items-center justify-center gap-2 py-3 text-gray-600"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Redo verification</span>
        </button>
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
