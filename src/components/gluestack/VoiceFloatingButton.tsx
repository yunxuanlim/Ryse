// ============================================
// VoiceFloatingButton Component - Gluestack Style
// Large circular button with mic icon
// Opens modal with listening waveform animation
// ============================================

import { useState, useEffect, useCallback } from 'react';
import { Mic, X, MicOff } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

// RYSE Branding Colors
const COLORS = {
  primary: '#0052FF',    // Primary Blue
  accent: '#FFD300',     // Yellow (Voice Button)
  accentDark: '#E5BE00', // Darker yellow for hover
  white: '#FFFFFF',
  black: '#000000',
  gray: '#6B7280',
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
              focus:outline-none focus:ring-4 focus:ring-yellow-300
              z-50
            `}
            style={{ 
              backgroundColor: COLORS.accent,
              boxShadow: `0 8px 32px ${COLORS.accent}50, 0 4px 12px rgba(0,0,0,0.15)`,
            }}
            aria-label="Voice Assistant"
          >
            <Mic className={`${config.icon} text-black`} strokeWidth={2.5} />
            
            {/* Pulse Animation Ring */}
            <span 
              className="absolute inset-0 rounded-full animate-ping opacity-30"
              style={{ backgroundColor: COLORS.accent }}
            />
          </button>
        </Dialog.Trigger>

        {/* Modal */}
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          
          <Dialog.Content 
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md bg-white rounded-3xl shadow-2xl z-50 p-6 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          >
            {/* Close Button */}
            <Dialog.Close asChild>
              <button
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </Dialog.Close>

            {/* Header */}
            <div className="text-center mb-6">
              <Dialog.Title className="text-xl font-bold text-gray-900">
                Ryse AI Assistant
              </Dialog.Title>
              <Dialog.Description className="text-gray-500 text-sm mt-1">
                {isListening ? 'Listening to you...' : 'Tap the mic to speak'}
              </Dialog.Description>
            </div>

            {/* Waveform Animation */}
            <div className="flex justify-center mb-6">
              <WaveformAnimation isActive={isListening} />
            </div>

            {/* Transcript Display */}
            <div className="bg-gray-50 rounded-2xl p-4 min-h-[80px] mb-6">
              {error ? (
                <p className="text-red-500 text-sm text-center">{error}</p>
              ) : transcript ? (
                <p className="text-gray-800 text-center">{transcript}</p>
              ) : (
                <p className="text-gray-400 text-sm text-center">
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
                className={`
                  w-16 h-16 rounded-full flex items-center justify-center
                  transition-all duration-200
                  ${isListening 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'hover:scale-105'
                  }
                `}
                style={{ 
                  backgroundColor: isListening ? undefined : COLORS.accent,
                }}
              >
                {isListening ? (
                  <MicOff className="w-7 h-7 text-white" />
                ) : (
                  <Mic className="w-7 h-7 text-black" />
                )}
              </button>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500 text-center mb-3">Quick commands:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Check balance', 'My earnings', 'Apply loan', 'RyScore'].map((action) => (
                  <button
                    key={action}
                    onClick={() => {
                      setTranscript(action);
                      onTranscript?.(action);
                    }}
                    className="px-3 py-1.5 bg-gray-100 rounded-full text-xs text-gray-700 hover:bg-gray-200 transition-colors"
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
            backgroundColor: isActive ? COLORS.accent : '#E5E7EB',
            animationDelay: `${i * 0.1}s`,
            height: isActive ? undefined : '16px',
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
  color = COLORS.accent,
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
          className={`w-2 rounded-full transition-all duration-300 ${isActive ? '' : ''}`}
          style={{
            backgroundColor: isActive ? color : '#E5E7EB',
            height: isActive ? `${Math.random() * (height - 16) + 16}px` : '16px',
            animation: isActive ? `waveform-${i} 0.8s ease-in-out infinite` : 'none',
            animationDelay: `${i * 0.1}s`,
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

