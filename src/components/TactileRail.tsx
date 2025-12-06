// ============================================
// TactileRail - Interactive Credit Slider
// Project Obsidian - Haptic Loan Selection
// PRD Section 3.3 - The "Rail" UI
// ============================================

import { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import * as Slider from '@radix-ui/react-slider';
import { Zap, Info, ChevronRight, AlertTriangle } from 'lucide-react';

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

interface TactileRailProps {
  minAmount?: number;
  maxAmount?: number;
  step?: number;
  initialAmount?: number;
  safeLimit?: number; // Amount above which glitch effect triggers
  repaymentWeeks?: number;
  processingFee?: number;
  onAmountChange?: (amount: number) => void;
  onApply?: (amount: number, weeklyRepayment: number) => void;
}

export function TactileRail({
  minAmount = 100,
  maxAmount = 1000,
  step = 50,
  initialAmount = 500,
  safeLimit = 750,
  repaymentWeeks = 4,
  processingFee = 0.03,
  onAmountChange,
  onApply,
}: TactileRailProps) {
  const [amount, setAmount] = useState(initialAmount);
  const [isDragging, setIsDragging] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const lastHapticTrigger = useRef(amount);

  // Check if amount is in "danger" zone
  const isHighRisk = amount > safeLimit;

  // Haptic feedback simulation
  const triggerHaptic = useCallback((intensity: number = 1) => {
    // Use Vibration API if available
    if ('vibrate' in navigator) {
      navigator.vibrate(10 * intensity);
    }
  }, []);

  // Calculate repayment details
  const calculations = useMemo(() => {
    const fee = amount * processingFee;
    const totalRepayment = amount;
    const weeklyRepayment = totalRepayment / repaymentWeeks;
    const youReceive = amount - fee;
    
    return {
      fee,
      totalRepayment,
      weeklyRepayment: Math.ceil(weeklyRepayment),
      youReceive,
      perDelivery: 5,
      deliveriesNeeded: Math.ceil(amount / 5),
    };
  }, [amount, processingFee, repaymentWeeks]);

  const handleAmountChange = useCallback((values: number[]) => {
    const newAmount = values[0];
    
    // Trigger haptic feedback at intervals
    const amountDiff = Math.abs(newAmount - lastHapticTrigger.current);
    if (amountDiff >= step) {
      // Increase haptic intensity as amount increases
      const intensity = newAmount > safeLimit ? 3 : 1;
      triggerHaptic(intensity);
      lastHapticTrigger.current = newAmount;
    }

    setAmount(newAmount);
    setShowWarning(newAmount > safeLimit);
    onAmountChange?.(newAmount);
  }, [step, safeLimit, triggerHaptic, onAmountChange]);

  const handleApply = useCallback(() => {
    onApply?.(amount, calculations.weeklyRepayment);
  }, [amount, calculations.weeklyRepayment, onApply]);

  // Calculate position for floating amount display
  const progress = (amount - minAmount) / (maxAmount - minAmount);
  
  // Skew effect when dragging
  const skewDegree = isDragging ? (progress - 0.5) * 6 : 0;

  // Track tick marks
  const tickCount = Math.floor((maxAmount - minAmount) / step);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div 
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ 
            backgroundColor: `${COLORS.neonPrimary}15`,
            boxShadow: `0 0 20px ${COLORS.neonPrimary}30`,
          }}
        >
          <Zap className="w-6 h-6" style={{ color: COLORS.neonPrimary }} />
        </div>
        <div>
          <h2 
            className="text-xl font-bold"
            style={{ color: COLORS.whiteHigh }}
          >
            Quick Advance
          </h2>
          <p 
            className="text-sm"
            style={{ color: COLORS.whiteLow }}
          >
            Instant cash, zero interest
          </p>
        </div>
      </div>

      {/* Floating Amount Display */}
      <div className="relative mb-6">
        <div 
          className="text-center transition-transform duration-100"
          style={{
            transform: `skewX(${skewDegree}deg) scale(${isDragging ? 1.05 : 1})`,
          }}
        >
          <span 
            className="text-2xl font-light"
            style={{ color: COLORS.whiteLow }}
          >
            RM
          </span>
          <span 
            className={`text-6xl font-bold tabular-nums block transition-all duration-150 ${
              isHighRisk ? 'animate-flicker' : ''
            }`}
            style={{ 
              color: isHighRisk ? COLORS.whiteHigh : COLORS.neonPrimary,
              textShadow: isHighRisk 
                ? 'none' 
                : `0 0 30px ${COLORS.neonPrimary}60`,
            }}
          >
            {amount}
          </span>
        </div>

        {/* High Risk Warning */}
        {isHighRisk && (
          <div 
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 rounded-full animate-pulse"
            style={{ 
              backgroundColor: `${COLORS.whiteHigh}10`,
              border: `1px solid ${COLORS.whiteLow}`,
            }}
          >
            <AlertTriangle className="w-3 h-3" style={{ color: COLORS.whiteHigh }} />
            <span className="text-xs font-medium" style={{ color: COLORS.whiteHigh }}>
              High amount
            </span>
          </div>
        )}
      </div>

      {/* Tactile Rail Slider */}
      <div className="relative mb-8 py-4">
        {/* Micro-tick background */}
        <div 
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-4 flex items-center justify-between px-3"
          style={{ opacity: 0.3 }}
        >
          {Array.from({ length: tickCount + 1 }).map((_, i) => (
            <div
              key={i}
              className="w-px bg-white"
              style={{
                height: i % 2 === 0 ? '12px' : '6px',
                opacity: i % 2 === 0 ? 0.5 : 0.3,
              }}
            />
          ))}
        </div>

        {/* Radix Slider */}
        <Slider.Root
          className="relative flex items-center select-none touch-none w-full h-10"
          value={[amount]}
          onValueChange={handleAmountChange}
          onPointerDown={() => setIsDragging(true)}
          onPointerUp={() => setIsDragging(false)}
          max={maxAmount}
          min={minAmount}
          step={step}
        >
          <Slider.Track 
            className="relative grow rounded-full h-2"
            style={{ backgroundColor: COLORS.obsidian200 }}
          >
            <Slider.Range 
              className={`absolute rounded-full h-full transition-all ${
                isHighRisk ? 'animate-glitch' : ''
              }`}
              style={{ 
                backgroundColor: isHighRisk ? COLORS.whiteHigh : COLORS.neonPrimary,
                boxShadow: isHighRisk 
                  ? 'none' 
                  : `0 0 15px ${COLORS.neonPrimary}80`,
              }}
            />
          </Slider.Track>
          
          {/* The "Puck" Handle */}
          <Slider.Thumb
            className={`
              block w-10 h-10 rounded-full shadow-2xl
              focus:outline-none cursor-grab active:cursor-grabbing
              transition-all duration-150
              ${isDragging ? 'scale-110' : 'scale-100'}
            `}
            style={{ 
              backgroundColor: isHighRisk ? COLORS.whiteHigh : COLORS.neonPrimary,
              boxShadow: isHighRisk 
                ? '0 0 20px rgba(255,255,255,0.5)' 
                : `0 0 30px ${COLORS.neonPrimary}`,
              border: '3px solid ' + COLORS.obsidian100,
            }}
            aria-label="Loan amount"
          >
            {/* Inner glow */}
            <div 
              className="absolute inset-2 rounded-full"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${
                  isHighRisk ? 'rgba(255,255,255,0.5)' : `${COLORS.neonPrimary}80`
                }, transparent 70%)`,
              }}
            />
          </Slider.Thumb>
        </Slider.Root>

        {/* Range Labels */}
        <div className="flex justify-between mt-3">
          <span className="text-sm" style={{ color: COLORS.whiteLow }}>RM {minAmount}</span>
          <span className="text-sm" style={{ color: COLORS.whiteLow }}>RM {maxAmount}</span>
        </div>
      </div>

      {/* Contextual Data - Fades in/out based on drag */}
      <div 
        className={`space-y-4 transition-opacity duration-200 ${
          isDragging ? 'opacity-50' : 'opacity-100'
        }`}
      >
        {/* Repayment Info */}
        <div 
          className="rounded-2xl p-4"
          style={{ backgroundColor: COLORS.obsidian200 }}
        >
          <div className="flex justify-between items-center mb-3">
            <span style={{ color: COLORS.whiteMedium }}>Weekly Repayment</span>
            <span 
              className="text-2xl font-bold"
              style={{ color: COLORS.neonPrimary }}
            >
              RM {calculations.weeklyRepayment}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex justify-between">
              <span style={{ color: COLORS.whiteLow }}>Fee (3%)</span>
              <span style={{ color: COLORS.whiteMedium }}>RM {calculations.fee.toFixed(0)}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: COLORS.whiteLow }}>You Receive</span>
              <span style={{ color: COLORS.neonPrimary }}>RM {calculations.youReceive.toFixed(0)}</span>
            </div>
          </div>
        </div>

        {/* Deliveries to Pay Off */}
        <div 
          className="rounded-2xl p-4 text-center"
          style={{ 
            backgroundColor: `${COLORS.neonPrimary}10`,
            border: `1px solid ${COLORS.neonDim}`,
          }}
        >
          <p className="text-sm" style={{ color: COLORS.whiteLow }}>
            Pay off in approximately
          </p>
          <p 
            className="text-3xl font-bold my-2"
            style={{ color: COLORS.neonPrimary }}
          >
            {calculations.deliveriesNeeded} deliveries
          </p>
          <p className="text-xs" style={{ color: COLORS.whiteLow }}>
            RM{calculations.perDelivery} auto-deducted per delivery
          </p>
        </div>
      </div>

      {/* Apply Button */}
      <button
        onClick={handleApply}
        className={`
          w-full mt-6 py-4 rounded-full font-semibold
          flex items-center justify-center gap-2
          transition-all duration-150
          active:scale-[0.98]
        `}
        style={{ 
          backgroundColor: COLORS.neonPrimary, 
          color: COLORS.obsidian100,
          boxShadow: `0 0 30px ${COLORS.neonPrimary}50`,
        }}
      >
        Get RM {amount} Now
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Info Link */}
      <button 
        className="w-full mt-3 flex items-center justify-center gap-1 py-2"
        style={{ color: COLORS.whiteLow }}
      >
        <Info className="w-4 h-4" />
        <span className="text-sm">How does this work?</span>
      </button>

      {/* Animation Styles */}
      <style>{`
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          25% { opacity: 0.6; }
          50% { opacity: 1; }
          75% { opacity: 0.4; }
        }
        .animate-flicker {
          animation: flicker 0.3s infinite;
        }
        @keyframes glitch {
          0% { transform: translateX(0); }
          25% { transform: translateX(-2px); opacity: 0.8; }
          50% { transform: translateX(2px); opacity: 1; }
          75% { transform: translateX(-1px); opacity: 0.9; }
          100% { transform: translateX(0); opacity: 1; }
        }
        .animate-glitch {
          animation: glitch 0.2s infinite;
        }
      `}</style>
    </div>
  );
}

// Simple inline version
export function TactileRailCompact({
  amount: initialAmount = 500,
  minAmount = 100,
  maxAmount = 1000,
  onAmountChange,
}: {
  amount?: number;
  minAmount?: number;
  maxAmount?: number;
  onAmountChange?: (amount: number) => void;
}) {
  const [amount, setAmount] = useState(initialAmount);

  const handleChange = (values: number[]) => {
    setAmount(values[0]);
    onAmountChange?.(values[0]);
  };

  return (
    <div 
      className="rounded-2xl p-4"
      style={{ backgroundColor: COLORS.obsidian200 }}
    >
      <div className="flex justify-between items-center mb-3">
        <span style={{ color: COLORS.whiteMedium }}>Amount</span>
        <span 
          className="text-xl font-bold"
          style={{ color: COLORS.neonPrimary }}
        >
          RM {amount}
        </span>
      </div>
      
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-6"
        value={[amount]}
        onValueChange={handleChange}
        max={maxAmount}
        min={minAmount}
        step={50}
      >
        <Slider.Track 
          className="relative grow rounded-full h-1.5"
          style={{ backgroundColor: COLORS.obsidian100 }}
        >
          <Slider.Range 
            className="absolute rounded-full h-full"
            style={{ 
              backgroundColor: COLORS.neonPrimary,
              boxShadow: `0 0 8px ${COLORS.neonPrimary}80`,
            }}
          />
        </Slider.Track>
        <Slider.Thumb
          className="block w-6 h-6 rounded-full shadow-lg focus:outline-none cursor-grab active:cursor-grabbing"
          style={{ 
            backgroundColor: COLORS.neonPrimary,
            boxShadow: `0 0 15px ${COLORS.neonPrimary}`,
          }}
        />
      </Slider.Root>
    </div>
  );
}

export default TactileRail;

