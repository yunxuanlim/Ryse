// ============================================
// AIOrb - Particle Cloud Visualization
// Project Obsidian - Ambient AI Intelligence
// PRD Section 3.4 - The "Living Orb"
// ============================================

import { useState, useEffect, useRef, useCallback } from 'react';
import { Mic, X, Send } from 'lucide-react';

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

type OrbState = 'idle' | 'listening' | 'processing' | 'speaking';

interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIOrbProps {
  isOpen: boolean;
  onClose: () => void;
  onSendMessage?: (message: string) => void;
  contextHint?: string;
}

export function AIOrb({ isOpen, onClose, onSendMessage, contextHint }: AIOrbProps) {
  const [orbState, setOrbState] = useState<OrbState>('idle');
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);

  // Particle class for visualization
  class Particle {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    vx: number;
    vy: number;
    size: number;
    alpha: number;
    
    constructor(centerX: number, centerY: number, radius: number) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * radius;
      this.baseX = centerX + Math.cos(angle) * distance;
      this.baseY = centerY + Math.sin(angle) * distance;
      this.x = this.baseX;
      this.y = this.baseY;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.size = Math.random() * 3 + 1;
      this.alpha = Math.random() * 0.5 + 0.3;
    }
    
    update(state: OrbState, centerX: number, centerY: number) {
      switch (state) {
        case 'idle':
          // Gentle floating
          this.x += Math.sin(Date.now() * 0.001 + this.baseX) * 0.3;
          this.y += Math.cos(Date.now() * 0.001 + this.baseY) * 0.3;
          break;
        case 'listening':
          // Waveform modulation
          const wave = Math.sin(Date.now() * 0.005 + this.baseX * 0.1) * 15;
          this.y = this.baseY + wave;
          break;
        case 'processing':
          // Vortex spiral
          const angle = Date.now() * 0.003;
          const dist = 30 + Math.sin(Date.now() * 0.002) * 20;
          this.x = centerX + Math.cos(angle + this.baseX * 0.01) * dist;
          this.y = centerY + Math.sin(angle + this.baseY * 0.01) * dist;
          break;
        case 'speaking':
          // Pulse outward
          const pulse = Math.sin(Date.now() * 0.01) * 10;
          const dx = this.baseX - centerX;
          const dy = this.baseY - centerY;
          const len = Math.sqrt(dx * dx + dy * dy) || 1;
          this.x = this.baseX + (dx / len) * pulse;
          this.y = this.baseY + (dy / len) * pulse;
          break;
      }
      
      // Keep particles within bounds
      this.alpha = Math.min(1, Math.max(0.2, this.alpha + (Math.random() - 0.5) * 0.1));
    }
    
    draw(ctx: CanvasRenderingContext2D) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(57, 255, 20, ${this.alpha})`;
      ctx.fill();
    }
  }

  // Initialize particles
  useEffect(() => {
    if (!isOpen) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 50;
    
    // Create particles
    particlesRef.current = Array.from({ length: 60 }, () => 
      new Particle(centerX, centerY, radius)
    );
    
    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(6, 6, 6, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(particle => {
        particle.update(orbState, centerX, centerY);
        particle.draw(ctx);
      });
      
      // Draw center glow
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 40);
      gradient.addColorStop(0, 'rgba(57, 255, 20, 0.3)');
      gradient.addColorStop(1, 'rgba(57, 255, 20, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isOpen, orbState]);

  // Handle voice listening
  const startListening = useCallback(() => {
    setOrbState('listening');
    
    // Simulate voice recognition
    setTimeout(() => {
      setOrbState('processing');
      setTimeout(() => {
        // Add mock response
        const userMessage: AIMessage = {
          role: 'user',
          content: 'How much did I earn this week?',
          timestamp: new Date(),
        };
        const assistantMessage: AIMessage = {
          role: 'assistant',
          content: 'You earned RM 1,240 this week from 3 platforms. That\'s 12% more than last week! 🎉',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, userMessage, assistantMessage]);
        setOrbState('speaking');
        
        setTimeout(() => setOrbState('idle'), 2000);
      }, 1500);
    }, 3000);
  }, []);

  const handleSend = useCallback(() => {
    if (!inputText.trim()) return;
    
    const userMessage: AIMessage = {
      role: 'user',
      content: inputText,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setOrbState('processing');
    
    onSendMessage?.(inputText);
    
    // Simulate response
    setTimeout(() => {
      const assistantMessage: AIMessage = {
        role: 'assistant',
        content: 'I\'m analyzing your request. Based on your income patterns, I can help you with that!',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setOrbState('idle');
    }, 2000);
  }, [inputText, onSendMessage]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col"
      style={{ backgroundColor: `${COLORS.obsidian100}F0` }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div>
          <h2 className="text-lg font-bold" style={{ color: COLORS.whiteHigh }}>
            Ryse AI
          </h2>
          <p className="text-xs" style={{ color: COLORS.whiteLow }}>
            Your financial co-pilot
          </p>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: COLORS.obsidian200 }}
        >
          <X className="w-5 h-5" style={{ color: COLORS.whiteLow }} />
        </button>
      </div>

      {/* Context Hint */}
      {contextHint && (
        <div 
          className="mx-4 px-4 py-2 rounded-full text-sm"
          style={{ 
            backgroundColor: `${COLORS.neonPrimary}15`,
            color: COLORS.neonPrimary,
          }}
        >
          💡 {contextHint}
        </div>
      )}

      {/* Orb Visualization */}
      <div className="flex-shrink-0 flex items-center justify-center py-8">
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={200}
            height={200}
            className="rounded-full"
            style={{ 
              filter: `drop-shadow(0 0 20px ${COLORS.neonPrimary}40)`,
            }}
          />
          
          {/* State Label */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
            <span 
              className="text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-full"
              style={{ 
                backgroundColor: COLORS.obsidian200,
                color: orbState === 'idle' ? COLORS.whiteLow : COLORS.neonPrimary,
              }}
            >
              {orbState === 'idle' && 'Ready'}
              {orbState === 'listening' && '🎤 Listening...'}
              {orbState === 'processing' && '⚡ Thinking...'}
              {orbState === 'speaking' && '💬 Speaking...'}
            </span>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 space-y-4 scrollbar-obsidian">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                msg.role === 'user' 
                  ? 'rounded-br-sm' 
                  : 'rounded-bl-sm'
              }`}
              style={{
                backgroundColor: msg.role === 'user' 
                  ? `${COLORS.neonPrimary}20`
                  : COLORS.obsidian200,
                border: msg.role === 'user' 
                  ? `1px solid ${COLORS.neonDim}`
                  : `1px solid ${COLORS.obsidian100}`,
              }}
            >
              <p 
                style={{ 
                  color: msg.role === 'user' ? COLORS.neonPrimary : COLORS.whiteMedium,
                }}
              >
                {msg.content}
              </p>
              <p 
                className="text-xs mt-1"
                style={{ color: COLORS.whiteLow }}
              >
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 space-y-3">
        {/* Quick Actions */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[
            'My earnings',
            'Apply loan',
            'RyScore',
            'Peak hours',
          ].map((action) => (
            <button
              key={action}
              onClick={() => setInputText(action)}
              className="flex-shrink-0 px-4 py-2 rounded-full text-sm"
              style={{ 
                backgroundColor: COLORS.obsidian200,
                color: COLORS.whiteMedium,
                border: `1px solid ${COLORS.neonDim}`,
              }}
            >
              {action}
            </button>
          ))}
        </div>

        {/* Input Row */}
        <div className="flex items-center gap-3">
          {/* Voice Button */}
          <button
            onClick={startListening}
            disabled={orbState !== 'idle'}
            className={`
              w-14 h-14 rounded-full flex items-center justify-center
              transition-all duration-200
              ${orbState === 'listening' ? 'animate-pulse' : ''}
            `}
            style={{ 
              backgroundColor: orbState === 'listening' 
                ? '#FF4444' 
                : COLORS.neonPrimary,
              boxShadow: `0 0 20px ${orbState === 'listening' ? '#FF444480' : COLORS.neonPrimary}80`,
            }}
          >
            <Mic 
              className="w-6 h-6" 
              style={{ color: orbState === 'listening' ? COLORS.whiteHigh : COLORS.obsidian100 }} 
            />
          </button>

          {/* Text Input */}
          <div className="flex-1 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask Ryse anything..."
              className="flex-1 px-4 py-3 rounded-2xl focus:outline-none"
              style={{ 
                backgroundColor: COLORS.obsidian200,
                color: COLORS.whiteHigh,
                border: `1px solid ${COLORS.neonDim}`,
              }}
            />
            <button
              onClick={handleSend}
              disabled={!inputText.trim()}
              className="w-12 h-12 rounded-full flex items-center justify-center disabled:opacity-50"
              style={{ backgroundColor: COLORS.neonPrimary }}
            >
              <Send className="w-5 h-5" style={{ color: COLORS.obsidian100 }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Floating trigger button for AI
export function AIOrbTrigger({ 
  onClick, 
  hasNotification = false 
}: { 
  onClick: () => void;
  hasNotification?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="relative w-16 h-16 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
      style={{ 
        background: `radial-gradient(circle at 30% 30%, ${COLORS.neonPrimary}, ${COLORS.neonDim})`,
        boxShadow: `0 0 30px ${COLORS.neonPrimary}60`,
      }}
    >
      {/* Particle animation effect */}
      <div className="absolute inset-0 rounded-full animate-pulse opacity-30" 
        style={{ backgroundColor: COLORS.neonPrimary }} 
      />
      
      {/* Icon */}
      <div className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center">
        <span className="text-2xl">✨</span>
      </div>
      
      {/* Notification dot */}
      {hasNotification && (
        <div 
          className="absolute -top-1 -right-1 w-4 h-4 rounded-full animate-bounce"
          style={{ backgroundColor: '#FF4444' }}
        />
      )}
    </button>
  );
}

export default AIOrb;

