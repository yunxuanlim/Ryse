// ============================================
// LoanSelector Component - Gluestack Style
// Card with slider (RM100-RM1000) and repayment display
// ============================================

import { useState, useCallback, useMemo } from 'react';
import * as Slider from '@radix-ui/react-slider';
import { Zap, Info, ChevronRight, Calculator } from 'lucide-react';

// RYSE Branding Colors
const COLORS = {
  primary: '#0052FF',    // Primary Blue
  primaryLight: '#0052FF20',
  accent: '#FFD300',     // Yellow
  green: '#22C55E',
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    700: '#374151',
    900: '#111827',
  },
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
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div 
        className="px-6 py-4"
        style={{ backgroundColor: COLORS.primary }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Quick Advance</h3>
            <p className="text-white/70 text-sm">Instant cash when you need it</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Amount Display */}
        <div className="text-center mb-6">
          <p className="text-gray-500 text-sm mb-1">Select Amount</p>
          <div className="flex items-center justify-center gap-1">
            <span className="text-gray-400 text-2xl">RM</span>
            <span className="text-5xl font-bold text-gray-900">{amount}</span>
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
            <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
              <Slider.Range 
                className="absolute rounded-full h-full"
                style={{ backgroundColor: COLORS.primary }}
              />
            </Slider.Track>
            <Slider.Thumb
              className="block w-6 h-6 bg-white rounded-full shadow-lg border-2 focus:outline-none focus:ring-4 focus:ring-blue-100 cursor-grab active:cursor-grabbing"
              style={{ borderColor: COLORS.primary }}
              aria-label="Loan amount"
            />
          </Slider.Root>
          
          <div className="flex justify-between mt-2 text-sm text-gray-400">
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
              className={`
                flex-1 py-2.5 rounded-xl text-sm font-medium transition-all
                ${amount === quickAmount 
                  ? 'text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
              style={{
                backgroundColor: amount === quickAmount ? COLORS.primary : undefined,
              }}
            >
              RM {quickAmount}
            </button>
          ))}
        </div>

        {/* Repayment Info Card */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Calculator className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Repayment Details</span>
          </div>
          
          <div className="space-y-3">
            {/* Weekly Repayment - Highlighted */}
            <div 
              className="flex justify-between items-center p-3 rounded-xl"
              style={{ backgroundColor: COLORS.primaryLight }}
            >
              <span className="text-gray-700 font-medium">Weekly Repayment</span>
              <span 
                className="text-lg font-bold"
                style={{ color: COLORS.primary }}
              >
                RM {calculations.weeklyRepayment}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Processing Fee (3%)</span>
              <span className="text-gray-700">RM {calculations.fee.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">You'll Receive</span>
              <span className="text-gray-900 font-semibold">RM {calculations.youReceive.toFixed(2)}</span>
            </div>
            
            <div className="h-px bg-gray-200 my-2" />
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Per Delivery Deduction</span>
              <span className="text-gray-700">RM {calculations.perDelivery}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Est. Deliveries to Pay Off</span>
              <span className="text-gray-700">{calculations.deliveriesNeeded} deliveries</span>
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
              className="flex-1 flex items-center justify-center gap-1 py-2 bg-gray-50 rounded-lg"
            >
              <span className="text-sm">{feature.icon}</span>
              <span className="text-xs text-gray-600">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Apply Button */}
        <button
          onClick={handleApply}
          className="w-full py-4 rounded-full font-semibold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98]"
          style={{ backgroundColor: COLORS.primary }}
        >
          Apply for RM {amount}
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Info Link */}
        <button className="w-full mt-3 flex items-center justify-center gap-1 text-gray-500 text-sm hover:text-gray-700">
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
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-3">
        <span className="text-gray-600 text-sm">Loan Amount</span>
        <span className="text-xl font-bold text-gray-900">RM {amount}</span>
      </div>
      
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-4"
        value={[amount]}
        onValueChange={handleChange}
        max={maxAmount}
        min={minAmount}
        step={step}
      >
        <Slider.Track className="bg-gray-200 relative grow rounded-full h-1.5">
          <Slider.Range 
            className="absolute rounded-full h-full"
            style={{ backgroundColor: COLORS.primary }}
          />
        </Slider.Track>
        <Slider.Thumb
          className="block w-5 h-5 bg-white rounded-full shadow border-2 focus:outline-none cursor-grab"
          style={{ borderColor: COLORS.primary }}
        />
      </Slider.Root>
      
      <div className="flex justify-between mt-3 pt-3 border-t border-gray-100">
        <span className="text-gray-500 text-sm">Weekly Repayment:</span>
        <span 
          className="font-semibold"
          style={{ color: COLORS.primary }}
        >
          RM {weeklyRepayment}
        </span>
      </div>
    </div>
  );
}

export default LoanSelector;

