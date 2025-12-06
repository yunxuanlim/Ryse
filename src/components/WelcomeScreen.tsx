// ============================================
// WelcomeScreen - Kinetic Onboarding
// Project Obsidian - 3D Welcome with Scrollytelling
// PRD Section 3.1 - The Gateway
// ============================================

import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronRight, Shield, Zap, TrendingUp, Users } from 'lucide-react';

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

interface WelcomeScreenProps {
  onComplete: () => void;
  onLogin: () => void;
}

interface Slide {
  id: number;
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  subtitle: string;
  shape: 'shield' | 'coin' | 'graph' | 'community';
}

export function WelcomeScreen({ onComplete, onLogin }: WelcomeScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [gyroPosition, setGyroPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const slides: Slide[] = [
    {
      id: 0,
      icon: <Shield className="w-10 h-10" style={{ color: COLORS.neonPrimary }} />,
      iconBg: `${COLORS.neonPrimary}20`,
      title: 'Your Financial Shield',
      subtitle: 'AI-powered protection against scams and fraud',
      shape: 'shield',
    },
    {
      id: 1,
      icon: <Zap className="w-10 h-10" style={{ color: COLORS.neonPrimary }} />,
      iconBg: `${COLORS.neonPrimary}20`,
      title: 'Instant Cash Access',
      subtitle: 'Get advances in seconds, zero interest',
      shape: 'coin',
    },
    {
      id: 2,
      icon: <TrendingUp className="w-10 h-10" style={{ color: COLORS.neonPrimary }} />,
      iconBg: `${COLORS.neonPrimary}20`,
      title: 'Build Your RyScore',
      subtitle: 'Your gig work powers your financial future',
      shape: 'graph',
    },
    {
      id: 3,
      icon: <Users className="w-10 h-10" style={{ color: COLORS.neonPrimary }} />,
      iconBg: `${COLORS.neonPrimary}20`,
      title: 'Join the Community',
      subtitle: 'Support and get supported by fellow gig workers',
      shape: 'community',
    },
  ];

  // Gyroscope effect (simulated with mouse)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setGyroPosition({ x, y });
    };

    // Try to use device orientation
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        setGyroPosition({
          x: e.gamma * 0.5,
          y: (e.beta - 45) * 0.5,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('deviceorientation', handleDeviceOrientation);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, []);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      onComplete();
    }
    
    setTimeout(() => setIsAnimating(false), 500);
  }, [currentSlide, isAnimating, slides.length, onComplete]);

  const prevSlide = useCallback(() => {
    if (isAnimating || currentSlide === 0) return;
    setIsAnimating(true);
    setCurrentSlide(prev => prev - 1);
    setTimeout(() => setIsAnimating(false), 500);
  }, [currentSlide, isAnimating]);

  // Render 3D wireframe shape
  const render3DShape = (shape: string) => {
    const baseStyle = {
      transform: `rotateX(${gyroPosition.y}deg) rotateY(${gyroPosition.x}deg)`,
      transition: 'transform 0.1s ease-out',
    };

    switch (shape) {
      case 'shield':
        return (
          <svg width="200" height="200" viewBox="0 0 200 200" style={baseStyle}>
            <path
              d="M100 10 L180 50 L180 100 Q180 160 100 190 Q20 160 20 100 L20 50 Z"
              fill="none"
              stroke={COLORS.neonPrimary}
              strokeWidth="2"
              className="animate-shimmer-stroke"
            />
            <path
              d="M100 30 L160 60 L160 100 Q160 145 100 170 Q40 145 40 100 L40 60 Z"
              fill="none"
              stroke={COLORS.neonDim}
              strokeWidth="1"
            />
            {/* Center check */}
            <path
              d="M70 100 L90 120 L130 80"
              fill="none"
              stroke={COLORS.neonPrimary}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-draw-check"
            />
          </svg>
        );
      
      case 'coin':
        return (
          <svg width="200" height="200" viewBox="0 0 200 200" style={baseStyle}>
            {/* Outer ring */}
            <ellipse
              cx="100"
              cy="100"
              rx="80"
              ry="80"
              fill="none"
              stroke={COLORS.neonPrimary}
              strokeWidth="2"
              className="animate-rotate-slow"
            />
            {/* Inner ring */}
            <ellipse
              cx="100"
              cy="100"
              rx="60"
              ry="60"
              fill="none"
              stroke={COLORS.neonDim}
              strokeWidth="1"
            />
            {/* Dollar sign */}
            <text
              x="100"
              y="115"
              textAnchor="middle"
              fill={COLORS.neonPrimary}
              fontSize="60"
              fontWeight="bold"
            >
              $
            </text>
          </svg>
        );
      
      case 'graph':
        return (
          <svg width="200" height="200" viewBox="0 0 200 200" style={baseStyle}>
            {/* Grid lines */}
            {[40, 80, 120, 160].map((y) => (
              <line
                key={y}
                x1="20"
                y1={y}
                x2="180"
                y2={y}
                stroke={COLORS.neonDim}
                strokeWidth="0.5"
                opacity="0.3"
              />
            ))}
            {/* Trend line */}
            <polyline
              points="30,150 60,120 90,140 120,80 150,60 170,30"
              fill="none"
              stroke={COLORS.neonPrimary}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-draw-line"
            />
            {/* Glow dots */}
            {[[30, 150], [60, 120], [90, 140], [120, 80], [150, 60], [170, 30]].map(([x, y], i) => (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="5"
                fill={COLORS.neonPrimary}
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </svg>
        );
      
      case 'community':
        return (
          <svg width="200" height="200" viewBox="0 0 200 200" style={baseStyle}>
            {/* Center node */}
            <circle
              cx="100"
              cy="100"
              r="30"
              fill={`${COLORS.neonPrimary}30`}
              stroke={COLORS.neonPrimary}
              strokeWidth="2"
            />
            {/* Outer nodes */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => {
              const x = 100 + Math.cos((angle * Math.PI) / 180) * 60;
              const y = 100 + Math.sin((angle * Math.PI) / 180) * 60;
              return (
                <g key={i}>
                  <line
                    x1="100"
                    y1="100"
                    x2={x}
                    y2={y}
                    stroke={COLORS.neonDim}
                    strokeWidth="1"
                    className="animate-pulse"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r="15"
                    fill={COLORS.obsidian200}
                    stroke={COLORS.neonPrimary}
                    strokeWidth="1"
                    className="animate-pulse"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                </g>
              );
            })}
            {/* Center icon */}
            <text
              x="100"
              y="108"
              textAnchor="middle"
              fill={COLORS.neonPrimary}
              fontSize="24"
            >
              👥
            </text>
          </svg>
        );
      
      default:
        return null;
    }
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: COLORS.obsidian100 }}
    >
      {/* Skip Button */}
      <div className="flex justify-end p-4">
        <button
          onClick={onComplete}
          className="px-4 py-2 text-sm font-medium rounded-full"
          style={{ color: COLORS.whiteLow }}
        >
          Skip
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* 3D Wireframe Visualization */}
        <div 
          className="relative mb-12"
          style={{
            filter: `drop-shadow(0 0 30px ${COLORS.neonPrimary}40)`,
          }}
        >
          {render3DShape(currentSlideData.shape)}
        </div>

        {/* Text Content */}
        <div 
          className={`text-center max-w-sm transition-all duration-500 ${
            isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
        >
          {/* Icon Badge */}
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: currentSlideData.iconBg }}
          >
            {currentSlideData.icon}
          </div>

          {/* Title */}
          <h1 
            className="text-3xl font-bold mb-4"
            style={{ color: COLORS.whiteHigh }}
          >
            {currentSlideData.title}
          </h1>

          {/* Subtitle */}
          <p 
            className="text-lg"
            style={{ color: COLORS.whiteMedium }}
          >
            {currentSlideData.subtitle}
          </p>
        </div>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center gap-2 mb-8">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className="transition-all duration-300"
            style={{
              width: currentSlide === i ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              backgroundColor: currentSlide === i 
                ? COLORS.neonPrimary 
                : COLORS.obsidian200,
              boxShadow: currentSlide === i 
                ? `0 0 10px ${COLORS.neonPrimary}` 
                : 'none',
            }}
          />
        ))}
      </div>

      {/* Action Buttons */}
      <div className="px-6 pb-8 space-y-3">
        <button
          onClick={nextSlide}
          className="w-full py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          style={{ 
            backgroundColor: COLORS.neonPrimary, 
            color: COLORS.obsidian100,
            boxShadow: `0 0 30px ${COLORS.neonPrimary}50`,
          }}
        >
          {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
          <ChevronRight className="w-5 h-5" />
        </button>

        {currentSlide === 0 && (
          <button
            onClick={onLogin}
            className="w-full py-4 rounded-full font-medium text-center"
            style={{ color: COLORS.whiteLow }}
          >
            Already have an account? Log In
          </button>
        )}
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes shimmer-stroke {
          0% { stroke-dasharray: 1000; stroke-dashoffset: 1000; }
          100% { stroke-dasharray: 1000; stroke-dashoffset: 0; }
        }
        .animate-shimmer-stroke {
          animation: shimmer-stroke 3s ease-out forwards;
        }
        @keyframes draw-check {
          0% { stroke-dasharray: 100; stroke-dashoffset: 100; }
          100% { stroke-dasharray: 100; stroke-dashoffset: 0; }
        }
        .animate-draw-check {
          animation: draw-check 0.6s ease-out 0.5s forwards;
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
        }
        @keyframes draw-line {
          0% { stroke-dasharray: 500; stroke-dashoffset: 500; }
          100% { stroke-dasharray: 500; stroke-dashoffset: 0; }
        }
        .animate-draw-line {
          animation: draw-line 1.5s ease-out forwards;
        }
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-rotate-slow {
          animation: rotate-slow 10s linear infinite;
          transform-origin: center;
        }
      `}</style>
    </div>
  );
}

// Compact biometric login option
export function BiometricLogin({ onScan }: { onScan: () => void }) {
  return (
    <button
      onClick={onScan}
      className="w-full py-4 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
      style={{ 
        backgroundColor: COLORS.obsidian200,
        border: `1px solid ${COLORS.neonDim}`,
      }}
    >
      <span className="text-2xl">🔐</span>
      <span style={{ color: COLORS.whiteMedium }}>Scan to Enter</span>
    </button>
  );
}

export default WelcomeScreen;


