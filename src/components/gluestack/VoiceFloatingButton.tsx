// ============================================
// VoiceFloatingButton Component - Project Obsidian
// Neon-Noir Dark Theme with modal
// ============================================

import { useState, useEffect, useCallback } from 'react';
import { Mic, X, MicOff } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

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

interface VoiceFloatingButtonProps {
  onStartListening?: () => void;
  onStopListening?: () => void;
  onTranscript?: (text: string) => void;
  position?: 'bottom-right' | 'bottom-center' | 'bottom-left';
  size?: 'md' | 'lg' | 'xl';
}

export function VoiceFloatingButton({
  onStartListening,
  onStopListening,
  onTranscript,
  position = 'bottom-right',
  size = 'lg',
}: VoiceFloatingButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Size configurations
  const sizes = {
    md: { button: 'w-14 h-14', icon: 'w-6 h-6' },
    lg: { button: 'w-16 h-16', icon: 'w-7 h-7' },
    xl: { button: 'w-20 h-20', icon: 'w-8 h-8' },
  };

  // Position configurations
  const positions = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-center': 'bottom-6 left-1/2 -translate-x-1/2',
    'bottom-left': 'bottom-6 left-6',
  };

  const config = sizes[size];
  const positionClass = positions[position];

  const handleStartListening = useCallback(() => {
    setIsListening(true);
    setTranscript('');
    setError(null);
    onStartListening?.();
  }, [onStartListening]);

  const handleStopListening = useCallback(() => {
    setIsListening(false);
    onStopListening?.();
    if (transcript) {
      onTranscript?.(transcript);
    }
  }, [onStopListening, onTranscript, transcript]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      handleStartListening();
    } else {
      handleStopListening();
    }
  };

  // Simulate transcript for demo (in real app, use Web Speech API)
  useEffect(() => {
    if (isListening) {
      const phrases = [
        'Listening...',
        'How much did I earn this week?',
        'Transfer RM50 to Ali',
        'Show my RyScore',
      ];
      let index = 0;
      const interval = setInterval(() => {
        setTranscript(phrases[index % phrases.length]);
        index++;
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isListening]);

  return (
    <>
      {/* Floating Button */}
      <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
        <Dialog.Trigger asChild>
          <button
            className={`
              fixed ${positionClass} ${config.button}
              rounded-full shadow-2xl
              flex items-center justify-center
              transition-all duration-200 ease-out
              hover:scale-110 active:scale-95
              focus:outline-none
              z-50
            `}
            style={{ 
              backgroundColor: COLORS.neonPrimary,
              boxShadow: `0 8px 32px ${COLORS.neonPrimary}50, 0 0 30px ${COLORS.neonPrimary}30`,
            }}
            aria-label="Voice Assistant"
          >
            <Mic className={`${config.icon}`} style={{ color: COLORS.obsidian100 }} strokeWidth={2.5} />
            
            {/* Pulse Animation Ring */}
            <span 
              className="absolute inset-0 rounded-full animate-ping opacity-30"
              style={{ backgroundColor: COLORS.neonPrimary }}
            />
          </button>
        </Dialog.Trigger>

        {/* Modal */}
        <Dialog.Portal>
          <Dialog.Overlay 
            className="fixed inset-0 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
            style={{ backgroundColor: `${COLORS.obsidian100}CC` }}
          />
          
          <Dialog.Content 
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md rounded-3xl shadow-2xl z-50 p-6 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
            style={{ 
              backgroundColor: COLORS.obsidian200,
              border: `1px solid ${COLORS.neonDim}`,
              boxShadow: `0 0 50px ${COLORS.neonPrimary}20`,
            }}
          >
            {/* Close Button */}
            <Dialog.Close asChild>
              <button
                className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                style={{ backgroundColor: COLORS.obsidian100 }}
                aria-label="Close"
              >
                <X className="w-5 h-5" style={{ color: COLORS.whiteLow }} />
              </button>
            </Dialog.Close>

            {/* Header */}
            <div className="text-center mb-6">
              <Dialog.Title className="text-xl font-bold" style={{ color: COLORS.whiteHigh }}>
                Ryse AI Assistant
              </Dialog.Title>
              <Dialog.Description className="text-sm mt-1" style={{ color: COLORS.whiteLow }}>
                {isListening ? 'Listening to you...' : 'Tap the mic to speak'}
              </Dialog.Description>
            </div>

            {/* Waveform Animation */}
            <div className="flex justify-center mb-6">
              <WaveformAnimation isActive={isListening} />
            </div>

            {/* Transcript Display */}
            <div 
              className="rounded-2xl p-4 min-h-[80px] mb-6"
              style={{ backgroundColor: COLORS.obsidian100 }}
            >
              {error ? (
                <p className="text-sm text-center" style={{ color: '#FF4444' }}>{error}</p>
              ) : transcript ? (
                <p className="text-center" style={{ color: COLORS.whiteMedium }}>{transcript}</p>
              ) : (
                <p className="text-sm text-center" style={{ color: COLORS.whiteLow }}>
                  Say something like "How much did I earn this week?"
                </p>
              )}
            </div>

            {/* Control Buttons */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  if (isListening) {
                    handleStopListening();
                  } else {
                    handleStartListening();
                  }
                }}
                className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200"
                style={{ 
                  backgroundColor: isListening ? '#FF4444' : COLORS.neonPrimary,
                  boxShadow: isListening 
                    ? '0 0 20px #FF444450' 
                    : `0 0 20px ${COLORS.neonPrimary}50`,
                }}
              >
                {isListening ? (
                  <MicOff className="w-7 h-7" style={{ color: COLORS.whiteHigh }} />
                ) : (
                  <Mic className="w-7 h-7" style={{ color: COLORS.obsidian100 }} />
                )}
              </button>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 pt-4" style={{ borderTop: `1px solid ${COLORS.obsidian100}` }}>
              <p className="text-xs text-center mb-3" style={{ color: COLORS.whiteLow }}>Quick commands:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Check balance', 'My earnings', 'Apply loan', 'RyScore'].map((action) => (
                  <button
                    key={action}
                    onClick={() => {
                      setTranscript(action);
                      onTranscript?.(action);
                    }}
                    className="px-3 py-1.5 rounded-full text-xs transition-colors"
                    style={{ 
                      backgroundColor: COLORS.obsidian100,
                      color: COLORS.whiteMedium,
                      border: `1px solid ${COLORS.neonDim}`,
                    }}
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

// Waveform Animation Component
function WaveformAnimation({ isActive }: { isActive: boolean }) {
  const bars = 5;
  
  return (
    <div className="flex items-center justify-center gap-1 h-20">
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className={`
            w-2 rounded-full transition-all duration-300
            ${isActive ? 'animate-waveform' : 'h-4'}
          `}
          style={{
            backgroundColor: isActive ? COLORS.neonPrimary : COLORS.obsidian100,
            animationDelay: `${i * 0.1}s`,
            height: isActive ? undefined : '16px',
            boxShadow: isActive ? `0 0 10px ${COLORS.neonPrimary}80` : 'none',
          }}
        />
      ))}
      
      <style>{`
        @keyframes waveform {
          0%, 100% {
            height: 16px;
          }
          50% {
            height: 64px;
          }
        }
        .animate-waveform {
          animation: waveform 0.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

// Standalone Waveform component for external use
export function ListeningWaveform({ 
  isActive = true,
  color = COLORS.neonPrimary,
  barCount = 5,
  height = 64,
}: {
  isActive?: boolean;
  color?: string;
  barCount?: number;
  height?: number;
}) {
  return (
    <div className="flex items-center justify-center gap-1" style={{ height }}>
      {Array.from({ length: barCount }).map((_, i) => (
        <div
          key={i}
          className="w-2 rounded-full transition-all duration-300"
          style={{
            backgroundColor: isActive ? color : COLORS.obsidian100,
            height: isActive ? `${Math.random() * (height - 16) + 16}px` : '16px',
            animation: isActive ? `waveform-${i} 0.8s ease-in-out infinite` : 'none',
            animationDelay: `${i * 0.1}s`,
            boxShadow: isActive ? `0 0 10px ${color}80` : 'none',
          }}
        />
      ))}
      
      <style>{`
        ${Array.from({ length: barCount }).map((_, i) => `
          @keyframes waveform-${i} {
            0%, 100% { height: 16px; }
            50% { height: ${Math.random() * (height - 20) + 20}px; }
          }
        `).join('\n')}
      `}</style>
    </div>
  );
}

export default VoiceFloatingButton;
