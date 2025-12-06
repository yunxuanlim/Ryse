// ============================================
// KYC Step 3: Face Liveness Verification
// ============================================

import { useState, useRef, useEffect } from 'react';
import { Camera, Check, X, RefreshCw, Eye, Smile, AlertCircle } from 'lucide-react';
import { KYCStep3Data } from '../../types';

interface KYCStep3Props {
  data: KYCStep3Data;
  onUpdate: (data: Partial<KYCStep3Data>) => void;
  error: string | null;
}

type LivenessChallenge = 'blink' | 'smile' | 'turn_left' | 'turn_right';

interface Challenge {
  id: LivenessChallenge;
  instruction: string;
  icon: typeof Eye;
  completed: boolean;
}

export function KYCStep3({ data, onUpdate, error }: KYCStep3Props) {
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [challengeCompleted, setChallengeCompleted] = useState<boolean[]>([false, false]);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const challenges: Challenge[] = [
    { id: 'blink', instruction: 'Blink twice', icon: Eye, completed: challengeCompleted[0] },
    { id: 'smile', instruction: 'Smile naturally', icon: Smile, completed: challengeCompleted[1] },
  ];

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 640, height: 480 }
      });
      setCameraStream(stream);
      setCameraActive(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error('Camera access error:', err);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setCameraActive(false);
  };

  // Auto-complete challenges for demo (simulating AI detection)
  useEffect(() => {
    if (!cameraActive || isCapturing) return;

    // Simulate challenge detection after random delay
    const timer = setTimeout(() => {
      if (currentChallengeIndex < challenges.length) {
        const newCompleted = [...challengeCompleted];
        newCompleted[currentChallengeIndex] = true;
        setChallengeCompleted(newCompleted);
        
        if (currentChallengeIndex < challenges.length - 1) {
          setCurrentChallengeIndex(currentChallengeIndex + 1);
        } else {
          // All challenges completed - start capture countdown
          setIsCapturing(true);
          setCountdown(3);
        }
      }
    }, 2000 + Math.random() * 1000); // 2-3 seconds

    return () => clearTimeout(timer);
  }, [cameraActive, currentChallengeIndex, isCapturing]);

  // Countdown and capture
  useEffect(() => {
    if (countdown === null) return;

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Capture photo
      capturePhoto();
    }
  }, [countdown]);

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);
    
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'face-verification.jpg', { type: 'image/jpeg' });
        const preview = canvas.toDataURL('image/jpeg', 0.9);
        
        onUpdate({
          faceImageFile: file,
          faceImagePreview: preview,
          livenessCompleted: true,
        });
        
        stopCamera();
      }
    }, 'image/jpeg', 0.9);
  };

  const resetCapture = () => {
    setChallengeCompleted([false, false]);
    setCurrentChallengeIndex(0);
    setCountdown(null);
    setIsCapturing(false);
    onUpdate({
      faceImageFile: null,
      faceImagePreview: null,
      livenessCompleted: false,
    });
  };

  // Already captured view
  if (data.faceImagePreview && data.livenessCompleted) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-gray-900 text-xl font-semibold">Face Verified!</h3>
          <p className="text-gray-500 text-sm mt-1">Liveness check completed successfully</p>
        </div>

        {/* Captured Image */}
        <div className="relative mx-auto w-48 h-48">
          <div className="w-full h-full rounded-full overflow-hidden border-4 border-green-500 shadow-lg">
            <img 
              src={data.faceImagePreview} 
              alt="Face verification" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm flex items-center gap-1">
            <Check className="w-4 h-4" />
            Verified
          </div>
        </div>

        {/* Retake Button */}
        <button
          onClick={resetCapture}
          className="w-full py-3 border border-gray-300 text-gray-700 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50"
        >
          <RefreshCw className="w-5 h-5" />
          Retake Photo
        </button>
      </div>
    );
  }

  // Camera view
  if (cameraActive) {
    return (
      <div className="space-y-6">
        {/* Camera Feed */}
        <div className="relative mx-auto" style={{ maxWidth: '300px' }}>
          <div className="aspect-square rounded-full overflow-hidden border-4 border-purple-500 shadow-lg">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
              style={{ transform: 'scaleX(-1)' }} // Mirror
            />
          </div>
          
          {/* Face Guide Overlay */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-[70%] aspect-[3/4] border-2 border-dashed border-white/50 rounded-[40%]" />
          </div>

          {/* Countdown */}
          {countdown !== null && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full">
              <span className="text-6xl font-bold text-white">{countdown || '📸'}</span>
            </div>
          )}
        </div>

        {/* Challenge Progress */}
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
          <p className="text-gray-500 text-sm text-center mb-4">Complete these actions:</p>
          
          <div className="space-y-3">
            {challenges.map((challenge, index) => {
              const Icon = challenge.icon;
              const isActive = index === currentChallengeIndex && !isCapturing;
              
              return (
                <div
                  key={challenge.id}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                    challenge.completed
                      ? 'bg-green-50 border border-green-200'
                      : isActive
                        ? 'bg-purple-50 border border-purple-200 animate-pulse'
                        : 'bg-gray-50 border border-gray-100'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    challenge.completed
                      ? 'bg-green-500 text-white'
                      : isActive
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                  }`}>
                    {challenge.completed ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <span className={`flex-1 ${
                    challenge.completed
                      ? 'text-green-700'
                      : isActive
                        ? 'text-purple-700 font-medium'
                        : 'text-gray-500'
                  }`}>
                    {challenge.instruction}
                  </span>
                  {challenge.completed && (
                    <Check className="w-5 h-5 text-green-500" />
                  )}
                </div>
              );
            })}
          </div>

          {isCapturing && countdown !== null && (
            <p className="text-center text-purple-600 mt-4 font-medium">
              Hold still... Capturing in {countdown}
            </p>
          )}
        </div>

        {/* Cancel Button */}
        <button
          onClick={stopCamera}
          className="w-full py-3 border border-gray-300 text-gray-700 rounded-xl flex items-center justify-center gap-2"
        >
          <X className="w-5 h-5" />
          Cancel
        </button>

        {/* Hidden Canvas */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    );
  }

  // Initial view
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Camera className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-gray-900 text-xl font-semibold">Face Verification</h3>
        <p className="text-gray-500 text-sm mt-1">Take a selfie to verify your identity</p>
      </div>

      {/* Face Circle Placeholder */}
      <div className="mx-auto w-48 h-48 border-4 border-dashed border-gray-300 rounded-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <span className="text-gray-500 text-sm">Your face here</span>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-cyan-50 border border-cyan-100 rounded-xl p-4">
        <h4 className="text-cyan-900 font-medium text-sm mb-2">🔐 Liveness Check</h4>
        <p className="text-cyan-700 text-xs mb-3">
          We'll ask you to perform simple actions to verify you're a real person:
        </p>
        <ul className="text-cyan-700 text-xs space-y-1">
          <li>• Blink twice</li>
          <li>• Smile naturally</li>
        </ul>
      </div>

      {/* Start Button */}
      <button
        onClick={startCamera}
        className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl flex items-center justify-center gap-2 shadow-lg"
      >
        <Camera className="w-5 h-5" />
        Start Verification
      </button>

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

