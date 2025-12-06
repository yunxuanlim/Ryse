// ============================================
// LoanSelector Component - Project Obsidian
// Neon-Noir Dark Theme with tactile slider
// ============================================

import { useState, useCallback, useMemo } from 'react';
import * as Slider from '@radix-ui/react-slider';
import { Zap, Info, ChevronRight, Calculator } from 'lucide-react';

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

interface LoanSelectorProps {
  minAmount?: number;
  maxAmount?: number;
  step?: number;
  initialAmount?: number;
  interestRate?: number;
  repaymentWeeks?: number;
  processingFee?: number;
  onAmountChange?: (amount: number) => void;
  onApply?: (amount: number, weeklyRepayment: number) => void;
}

export function LoanSelector({
  minAmount = 100,
  maxAmount = 1000,
  step = 50,
  initialAmount = 500,
  interestRate = 0, // 0% for Ryse Advance
  repaymentWeeks = 4,
  processingFee = 0.03, // 3%
  onAmountChange,
  onApply,
}: LoanSelectorProps) {
  const [amount, setAmount] = useState(initialAmount);

  // Calculate repayment details
  const calculations = useMemo(() => {
    const fee = amount * processingFee;
    const totalRepayment = amount + (amount * interestRate);
    const weeklyRepayment = totalRepayment / repaymentWeeks;
    const youReceive = amount - fee;
    
    return {
      fee,
      totalRepayment,
      weeklyRepayment: Math.ceil(weeklyRepayment),
      youReceive,
      perDelivery: 5, // Fixed per delivery deduction
      deliveriesNeeded: Math.ceil(amount / 5),
    };
  }, [amount, processingFee, interestRate, repaymentWeeks]);

  const handleAmountChange = useCallback((values: number[]) => {
    const newAmount = values[0];
    setAmount(newAmount);
    onAmountChange?.(newAmount);
  }, [onAmountChange]);

  const handleApply = useCallback(() => {
    onApply?.(amount, calculations.weeklyRepayment);
  }, [amount, calculations.weeklyRepayment, onApply]);

  // Quick amount buttons
  const quickAmounts = [200, 500, 750, 1000];

  return (
    <div 
      className="rounded-3xl shadow-lg overflow-hidden"
      style={{ 
        backgroundColor: COLORS.obsidian200,
        border: `1px solid ${COLORS.neonDim}`,
      }}
    >
      {/* Header */}
      <div 
        className="px-6 py-4"
        style={{ 
          background: `linear-gradient(135deg, ${COLORS.neonDim} 0%, ${COLORS.obsidian200} 100%)`,
        }}
      >
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${COLORS.neonPrimary}30` }}
          >
            <Zap className="w-5 h-5" style={{ color: COLORS.neonPrimary }} />
          </div>
          <div>
            <h3 className="font-semibold" style={{ color: COLORS.whiteHigh }}>Quick Advance</h3>
            <p className="text-sm" style={{ color: COLORS.whiteLow }}>Instant cash when you need it</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Amount Display */}
        <div className="text-center mb-6">
          <p className="text-sm mb-1" style={{ color: COLORS.whiteLow }}>Select Amount</p>
          <div className="flex items-center justify-center gap-1">
            <span className="text-2xl" style={{ color: COLORS.whiteLow }}>RM</span>
            <span 
              className="text-5xl font-bold"
              style={{ 
                color: COLORS.neonPrimary,
                textShadow: `0 0 30px ${COLORS.neonPrimary}40`,
              }}
            >
              {amount}
            </span>
          </div>
        </div>

        {/* Slider */}
        <div className="mb-6">
          <Slider.Root
            className="relative flex items-center select-none touch-none w-full h-5"
            value={[amount]}
            onValueChange={handleAmountChange}
            max={maxAmount}
            min={minAmount}
            step={step}
          >
            <Slider.Track 
              className="relative grow rounded-full h-2"
              style={{ backgroundColor: COLORS.obsidian100 }}
            >
              <Slider.Range 
                className="absolute rounded-full h-full"
                style={{ 
                  backgroundColor: COLORS.neonPrimary,
                  boxShadow: `0 0 10px ${COLORS.neonPrimary}`,
                }}
              />
            </Slider.Track>
            <Slider.Thumb
              className="block w-6 h-6 rounded-full shadow-lg focus:outline-none cursor-grab active:cursor-grabbing transition-transform hover:scale-110"
              style={{ 
                backgroundColor: COLORS.neonPrimary,
                boxShadow: `0 0 15px ${COLORS.neonPrimary}`,
              }}
              aria-label="Loan amount"
            />
          </Slider.Root>
          
          <div className="flex justify-between mt-2 text-sm" style={{ color: COLORS.whiteLow }}>
            <span>RM {minAmount}</span>
            <span>RM {maxAmount}</span>
          </div>
        </div>

        {/* Quick Amount Buttons */}
        <div className="flex gap-2 mb-6">
          {quickAmounts.map((quickAmount) => (
            <button
              key={quickAmount}
              onClick={() => {
                setAmount(quickAmount);
                onAmountChange?.(quickAmount);
              }}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={{
                backgroundColor: amount === quickAmount ? COLORS.neonPrimary : COLORS.obsidian100,
                color: amount === quickAmount ? COLORS.obsidian100 : COLORS.whiteMedium,
                border: amount === quickAmount ? 'none' : `1px solid ${COLORS.neonDim}`,
              }}
            >
              RM {quickAmount}
            </button>
          ))}
        </div>

        {/* Repayment Info Card */}
        <div 
          className="rounded-2xl p-4 mb-6"
          style={{ backgroundColor: COLORS.obsidian100 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Calculator className="w-4 h-4" style={{ color: COLORS.whiteLow }} />
            <span className="text-sm font-medium" style={{ color: COLORS.whiteMedium }}>Repayment Details</span>
          </div>
          
          <div className="space-y-3">
            {/* Weekly Repayment - Highlighted */}
            <div 
              className="flex justify-between items-center p-3 rounded-xl"
              style={{ backgroundColor: `${COLORS.neonPrimary}15` }}
            >
              <span className="font-medium" style={{ color: COLORS.whiteMedium }}>Weekly Repayment</span>
              <span 
                className="text-lg font-bold"
                style={{ color: COLORS.neonPrimary }}
              >
                RM {calculations.weeklyRepayment}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span style={{ color: COLORS.whiteLow }}>Processing Fee (3%)</span>
              <span style={{ color: COLORS.whiteMedium }}>RM {calculations.fee.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span style={{ color: COLORS.whiteLow }}>You'll Receive</span>
              <span className="font-semibold" style={{ color: COLORS.neonPrimary }}>RM {calculations.youReceive.toFixed(2)}</span>
            </div>
            
            <div className="h-px my-2" style={{ backgroundColor: COLORS.obsidian200 }} />
            
            <div className="flex justify-between text-sm">
              <span style={{ color: COLORS.whiteLow }}>Per Delivery Deduction</span>
              <span style={{ color: COLORS.whiteMedium }}>RM {calculations.perDelivery}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span style={{ color: COLORS.whiteLow }}>Est. Deliveries to Pay Off</span>
              <span style={{ color: COLORS.whiteMedium }}>{calculations.deliveriesNeeded} deliveries</span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="flex gap-2 mb-6">
          {[
            { icon: '⚡', text: '30-sec approval' },
            { icon: '🔒', text: 'No collateral' },
            { icon: '📱', text: 'Auto-repay' },
          ].map((feature, i) => (
            <div 
              key={i} 
              className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg"
              style={{ backgroundColor: COLORS.obsidian100 }}
            >
              <span className="text-sm">{feature.icon}</span>
              <span className="text-xs" style={{ color: COLORS.whiteLow }}>{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Apply Button */}
        <button
          onClick={handleApply}
          className="w-full py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98]"
          style={{ 
            backgroundColor: COLORS.neonPrimary, 
            color: COLORS.obsidian100,
            boxShadow: `0 0 20px ${COLORS.neonPrimary}50`,
          }}
        >
          Apply for RM {amount}
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Info Link */}
        <button 
          className="w-full mt-3 flex items-center justify-center gap-1 text-sm transition-colors"
          style={{ color: COLORS.whiteLow }}
        >
          <Info className="w-4 h-4" />
          <span>How does this work?</span>
        </button>
      </div>
    </div>
  );
}

// Compact version for inline use
export function LoanSelectorCompact({
  minAmount = 100,
  maxAmount = 1000,
  step = 50,
  initialAmount = 500,
  onAmountChange,
}: {
  minAmount?: number;
  maxAmount?: number;
  step?: number;
  initialAmount?: number;
  onAmountChange?: (amount: number) => void;
}) {
  const [amount, setAmount] = useState(initialAmount);
  const weeklyRepayment = Math.ceil(amount / 4);

  const handleChange = (values: number[]) => {
    setAmount(values[0]);
    onAmountChange?.(values[0]);
  };

  return (
    <div 
      className="rounded-2xl p-4 shadow-sm"
      style={{ 
        backgroundColor: COLORS.obsidian200,
        border: `1px solid ${COLORS.neonDim}`,
      }}
    >
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm" style={{ color: COLORS.whiteLow }}>Loan Amount</span>
        <span className="text-xl font-bold" style={{ color: COLORS.neonPrimary }}>RM {amount}</span>
      </div>
      
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-4"
        value={[amount]}
        onValueChange={handleChange}
        max={maxAmount}
        min={minAmount}
        step={step}
      >
        <Slider.Track 
          className="relative grow rounded-full h-1.5"
          style={{ backgroundColor: COLORS.obsidian100 }}
        >
          <Slider.Range 
            className="absolute rounded-full h-full"
            style={{ backgroundColor: COLORS.neonPrimary }}
          />
        </Slider.Track>
        <Slider.Thumb
          className="block w-5 h-5 rounded-full shadow focus:outline-none cursor-grab"
          style={{ backgroundColor: COLORS.neonPrimary }}
        />
      </Slider.Root>
      
      <div 
        className="flex justify-between mt-3 pt-3"
        style={{ borderTop: `1px solid ${COLORS.obsidian100}` }}
      >
        <span className="text-sm" style={{ color: COLORS.whiteLow }}>Weekly Repayment:</span>
        <span className="font-semibold" style={{ color: COLORS.neonPrimary }}>
          RM {weeklyRepayment}
        </span>
      </div>
    </div>
  );
}

export default LoanSelector;
