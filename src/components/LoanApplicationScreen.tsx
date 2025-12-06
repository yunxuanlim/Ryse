// ============================================
// Loan Application Screen - OBSIDIAN Neon-Noir
// Credit Slider with neon visual feedback
// ============================================

import { useState, useEffect } from 'react';
import { Screen } from '../App';
import { ArrowLeft, Zap, Info, CheckCircle, DollarSign, AlertCircle, X, ChevronRight } from 'lucide-react';
import { PillButton } from './ui/pill-button';

interface LoanApplicationScreenProps {
  navigateTo: (screen: Screen) => void;
  initialData?: {
    loanAmount?: string;
  };
}

export function LoanApplicationScreen({ navigateTo, initialData }: LoanApplicationScreenProps) {
  const maxLoan = 1000;
  const ryScore = 720;
  
  const getInitialAmount = () => {
    if (initialData?.loanAmount) {
      const amount = parseFloat(initialData.loanAmount);
      if (!isNaN(amount)) {
        return Math.min(Math.max(amount, 100), maxLoan);
      }
    }
    return 500;
  };

  const [loanAmount, setLoanAmount] = useState(getInitialAmount());
  const [showApproval, setShowApproval] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (initialData?.loanAmount) {
      const amount = parseFloat(initialData.loanAmount);
      if (!isNaN(amount)) {
        if (amount > maxLoan) {
          setShowError(true);
          setErrorMessage(`The amount exceeds your credit limit. Max: RM ${maxLoan}.`);
          setLoanAmount(maxLoan);
        } else {
          setLoanAmount(Math.min(Math.max(amount, 100), maxLoan));
        }
      }
    }
  }, [initialData, maxLoan]);

  const handleApply = () => {
    if (loanAmount > maxLoan) {
      setShowError(true);
      setErrorMessage(`The amount exceeds your credit limit. Max: RM ${maxLoan}.`);
      setLoanAmount(maxLoan);
      return;
    }
    setShowApproval(true);
  };

  const handleAmountChange = (newAmount: number) => {
    if (newAmount > maxLoan) {
      setShowError(true);
      setErrorMessage(`The amount exceeds your credit limit. Max: RM ${maxLoan}.`);
      setLoanAmount(maxLoan);
    } else {
      setLoanAmount(newAmount);
      if (showError) {
        setShowError(false);
      }
    }
  };

  // High risk threshold (70% of limit)
  const isHighRisk = loanAmount > maxLoan * 0.7;

  // Approval Screen
  if (showApproval) {
    return (
      <div className="h-full flex flex-col bg-obsidian-100">
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          {/* Animated Checkmark */}
          <div className="relative mb-6">
            <svg className="w-24 h-24" viewBox="0 0 100 100">
              <circle
                cx="50" cy="50" r="45"
                fill="none" stroke="#39FF14" strokeWidth="3"
                strokeLinecap="round"
                className="animate-draw-circle"
                style={{ strokeDasharray: 283, strokeDashoffset: 283, filter: 'drop-shadow(0 0 10px rgba(57, 255, 20, 0.5))' }}
              />
              <path
                d="M30 52 L45 67 L72 35"
                fill="none" stroke="#39FF14" strokeWidth="4"
                strokeLinecap="round" strokeLinejoin="round"
                className="animate-draw-check"
                style={{ strokeDasharray: 70, strokeDashoffset: 70, filter: 'drop-shadow(0 0 10px rgba(57, 255, 20, 0.5))' }}
              />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-white-high text-center mb-2">Approved!</h2>
          <p className="text-white-low text-center mb-8">Your advance of RM {loanAmount} is ready</p>

          <div className="w-full card-obsidian mb-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-white-low">Loan Amount</span>
                <span className="text-white-high font-medium">RM {loanAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white-low">Processing Fee (3%)</span>
                <span className="text-white-high font-medium">RM {(loanAmount * 0.03).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white-low">Per Delivery Deduction</span>
                <span className="text-white-high font-medium">RM 5</span>
              </div>
              <div className="h-px bg-white-divider"></div>
              <div className="flex justify-between">
                <span className="text-white-high font-semibold">You'll Receive</span>
                <span className="text-neon font-bold text-glow">RM {(loanAmount * 0.97).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <PillButton
            onClick={() => navigateTo('dashboard')}
            className="w-full mb-3"
            size="lg"
            variant="neon"
          >
            Done
          </PillButton>
          
          <button
            onClick={() => setShowApproval(false)}
            className="w-full py-4 text-white-low font-medium hover:text-white-high transition-colors"
          >
            Apply for Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-obsidian-100 overflow-y-auto pb-24 scrollbar-obsidian">
      {/* Header */}
      <div className="bg-obsidian-200 px-6 py-4 border-b" style={{ borderColor: 'var(--white-divider)' }}>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigateTo('dashboard')}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-obsidian-300 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white-high" />
          </button>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white-high">Quick Advance</h2>
            <p className="text-white-low text-sm">Get instant cash</p>
          </div>
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center glow-neon-md"
            style={{ backgroundColor: 'var(--neon-primary)' }}
          >
            <Zap className="w-5 h-5 text-obsidian-100" />
          </div>
        </div>
      </div>

      {/* Credit Card */}
      <div className="px-4 pt-4">
        <div className="card-neon-border">
          <p className="text-white-low text-sm mb-1">Available Credit</p>
          <h1 className="text-4xl font-bold text-neon mb-2 font-mono-nums text-glow">RM 1,000</h1>
          <div className="flex items-center gap-2">
            <span className="text-white-low text-sm">Based on RyScore:</span>
            <span className="px-2 py-0.5 rounded-full text-sm font-medium" style={{ backgroundColor: 'rgba(57, 255, 20, 0.2)', color: 'var(--neon-primary)' }}>
              🥇 {ryScore} Gold
            </span>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {showError && (
        <div className="px-4 pt-4">
          <div className="alert-pattern rounded-2xl p-4 flex items-start gap-3">
            <div className="w-8 h-8 bg-obsidian-100 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-4 h-4 text-white-high" />
            </div>
            <div className="flex-1">
              <p className="text-obsidian-100 text-sm font-medium">{errorMessage}</p>
            </div>
            <button onClick={() => setShowError(false)} className="text-obsidian-100 hover:opacity-80">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Amount Selector - Tactile Rail */}
      <div className="px-4 py-4">
        <h3 className="text-white-high font-semibold mb-3">How much do you need?</h3>
        <div className={`card-obsidian ${isHighRisk ? 'animate-flicker' : ''}`}>
          <div className="text-center mb-6">
            <div 
              className={`text-5xl font-bold mb-2 font-mono-nums transition-all ${isHighRisk ? 'text-white-high' : 'text-neon text-glow'}`}
              style={{ transform: `scale(${1 + (loanAmount / maxLoan) * 0.1})` }}
            >
              RM {loanAmount}
            </div>
            <p className="text-white-muted text-sm">Drag to adjust</p>
          </div>

          {/* Custom Slider Track */}
          <div className="relative h-4 mb-4">
            <div className="absolute inset-0 bg-obsidian-300 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all ${isHighRisk ? 'alert-pattern' : ''}`}
                style={{ 
                  width: `${((loanAmount - 100) / (maxLoan - 100)) * 100}%`,
                  backgroundColor: isHighRisk ? undefined : 'var(--neon-primary)',
                  boxShadow: isHighRisk ? undefined : 'var(--shadow-neon-md)'
                }}
              />
            </div>
            <input
              type="range"
              min="100"
              max={maxLoan}
              step="50"
              value={loanAmount}
              onChange={(e) => handleAmountChange(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {/* Puck indicator */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white-high pointer-events-none transition-all"
              style={{ 
                left: `calc(${((loanAmount - 100) / (maxLoan - 100)) * 100}% - 12px)`,
                boxShadow: isHighRisk ? '0 0 10px rgba(255,255,255,0.8)' : 'var(--shadow-neon-lg)'
              }}
            />
          </div>

          <div className="flex justify-between text-white-muted text-sm">
            <span>RM 100</span>
            <span>RM {maxLoan}</span>
          </div>
        </div>
      </div>

      {/* Quick Amounts */}
      <div className="px-4 pb-4">
        <div className="flex gap-2">
          {[200, 500, 750, 1000].map((amount) => (
            <button
              key={amount}
              onClick={() => handleAmountChange(amount)}
              className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
                loanAmount === amount 
                  ? 'bg-neon text-obsidian-100 glow-neon-sm' 
                  : 'bg-obsidian-200 text-white-med border border-white-divider hover:bg-obsidian-300'
              }`}
            >
              RM {amount}
            </button>
          ))}
        </div>
      </div>

      {/* Loan Details */}
      <div className="px-4 pb-4">
        <div className="card-obsidian space-y-4">
          <div className="flex justify-between">
            <span className="text-white-low">Processing Fee (3%)</span>
            <span className="text-white-high font-medium font-mono">RM {(loanAmount * 0.03).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white-low">You'll Receive</span>
            <span className="text-neon font-semibold font-mono">RM {(loanAmount * 0.97).toFixed(2)}</span>
          </div>
          <div className="h-px bg-white-divider"></div>
          <div className="flex justify-between">
            <span className="text-white-low">Repayment</span>
            <span className="text-white-high font-medium">RM 5 per delivery</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white-low">Est. Payoff</span>
            <span className="text-white-high font-medium">{Math.ceil(loanAmount / 5)} deliveries</span>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="px-4 pb-4">
        <div className="space-y-2">
          {[
            { icon: '⚡', title: '30-Second Approval', desc: 'Instant decision' },
            { icon: '💸', title: 'Smart Repayment', desc: 'Auto-deduct from earnings' },
            { icon: '✨', title: 'No Hidden Fees', desc: 'Transparent pricing' }
          ].map((feature, i) => (
            <div key={i} className="card-obsidian flex items-center gap-3 p-4">
              <div className="w-10 h-10 bg-obsidian-300 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-xl">{feature.icon}</span>
              </div>
              <div className="flex-1">
                <h4 className="text-white-high font-medium text-sm">{feature.title}</h4>
                <p className="text-white-low text-xs">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Card */}
      <div className="px-4 pb-24">
        <button className="w-full bg-obsidian-200 rounded-2xl p-4 flex items-center gap-3 text-left border border-white-divider hover:bg-obsidian-300 transition-colors">
          <div className="w-10 h-10 bg-obsidian-300 rounded-xl flex items-center justify-center flex-shrink-0">
            <Info className="w-5 h-5 text-white-low" />
          </div>
          <div className="flex-1">
            <h4 className="text-white-high font-medium text-sm">Why RM {maxLoan} limit?</h4>
            <p className="text-white-low text-xs">Based on your RyScore & income</p>
          </div>
          <ChevronRight className="w-5 h-5 text-white-low" />
        </button>
      </div>

      {/* Apply Button - Fixed Bottom */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md glass-panel px-4 py-4">
        <PillButton
          onClick={handleApply}
          className="w-full"
          size="lg"
          variant="neon"
        >
          Apply for RM {loanAmount}
        </PillButton>
      </div>
    </div>
  );
}
