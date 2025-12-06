// ============================================
// Loan Application Screen - Cash App Inspired
// Clean white cards, black accents
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

  // Approval Screen
  if (showApproval) {
    return (
      <div className="h-full flex flex-col bg-white">
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          {/* Animated Checkmark */}
          <div className="relative mb-6">
            <svg className="w-24 h-24" viewBox="0 0 100 100">
              <circle
                cx="50" cy="50" r="45"
                fill="none" stroke="#22C55E" strokeWidth="3"
                strokeLinecap="round"
                className="animate-draw-circle"
                style={{ strokeDasharray: 283, strokeDashoffset: 283 }}
              />
              <path
                d="M30 52 L45 67 L72 35"
                fill="none" stroke="#22C55E" strokeWidth="4"
                strokeLinecap="round" strokeLinejoin="round"
                className="animate-draw-check"
                style={{ strokeDasharray: 70, strokeDashoffset: 70 }}
              />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Approved!</h2>
          <p className="text-gray-500 text-center mb-8">Your advance of RM {loanAmount} is ready</p>

          <div className="w-full bg-gray-50 rounded-3xl p-6 mb-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Loan Amount</span>
                <span className="text-gray-900 font-medium">RM {loanAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Processing Fee (3%)</span>
                <span className="text-gray-900 font-medium">RM {(loanAmount * 0.03).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Per Delivery Deduction</span>
                <span className="text-gray-900 font-medium">RM 5</span>
              </div>
              <div className="h-px bg-gray-200"></div>
              <div className="flex justify-between">
                <span className="text-gray-900 font-semibold">You'll Receive</span>
                <span className="text-gray-900 font-bold">RM {(loanAmount * 0.97).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <PillButton
            onClick={() => navigateTo('dashboard')}
            className="w-full mb-3"
            size="lg"
          >
            Done
          </PillButton>
          
          <button
            onClick={() => setShowApproval(false)}
            className="w-full py-4 text-gray-600 font-medium"
          >
            Apply for Another
          </button>
        </div>

        <style>{`
          @keyframes draw-circle { to { stroke-dashoffset: 0; } }
          @keyframes draw-check { to { stroke-dashoffset: 0; } }
          .animate-draw-circle { animation: draw-circle 0.6s ease-out forwards; }
          .animate-draw-check { animation: draw-check 0.4s ease-out 0.4s forwards; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-50 overflow-y-auto pb-24">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigateTo('dashboard')}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-black" />
          </button>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">Quick Advance</h2>
            <p className="text-gray-500 text-sm">Get instant cash</p>
          </div>
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--ryse-green, #B9FF00)' }}
          >
            <Zap className="w-5 h-5 text-black" />
          </div>
        </div>
      </div>

      {/* Credit Card */}
      <div className="px-4 pt-4">
        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <p className="text-gray-500 text-sm mb-1">Available Credit</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">RM 1,000</h1>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm">Based on RyScore:</span>
            <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
              🥇 {ryScore} Gold
            </span>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {showError && (
        <div className="px-4 pt-4">
          <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-start gap-3">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-4 h-4 text-red-600" />
            </div>
            <div className="flex-1">
              <p className="text-red-700 text-sm">{errorMessage}</p>
            </div>
            <button onClick={() => setShowError(false)} className="text-red-400 hover:text-red-600">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Amount Selector */}
      <div className="px-4 py-4">
        <h3 className="text-gray-900 font-semibold mb-3">How much do you need?</h3>
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="text-center mb-6">
            <div className="text-5xl font-bold text-gray-900 mb-2">
              RM {loanAmount}
            </div>
            <p className="text-gray-400 text-sm">Drag to adjust</p>
          </div>

          <input
            type="range"
            min="100"
            max={maxLoan}
            step="50"
            value={loanAmount}
            onChange={(e) => handleAmountChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, black 0%, black ${((loanAmount - 100) / (maxLoan - 100)) * 100}%, #e5e7eb ${((loanAmount - 100) / (maxLoan - 100)) * 100}%, #e5e7eb 100%)`
            }}
          />

          <div className="flex justify-between mt-3 text-gray-400 text-sm">
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
              className={`flex-1 py-3 rounded-xl text-sm font-medium transition-colors ${
                loanAmount === amount 
                  ? 'bg-black text-white' 
                  : 'bg-white text-gray-700 border border-gray-200'
              }`}
            >
              RM {amount}
            </button>
          ))}
        </div>
      </div>

      {/* Loan Details */}
      <div className="px-4 pb-4">
        <div className="bg-white rounded-3xl p-5 shadow-sm space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-500">Processing Fee (3%)</span>
            <span className="text-gray-900 font-medium">RM {(loanAmount * 0.03).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">You'll Receive</span>
            <span className="text-gray-900 font-semibold">RM {(loanAmount * 0.97).toFixed(2)}</span>
          </div>
          <div className="h-px bg-gray-100"></div>
          <div className="flex justify-between">
            <span className="text-gray-500">Repayment</span>
            <span className="text-gray-900 font-medium">RM 5 per delivery</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Est. Payoff</span>
            <span className="text-gray-900 font-medium">{Math.ceil(loanAmount / 5)} deliveries</span>
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
            <div key={i} className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-xl">{feature.icon}</span>
              </div>
              <div className="flex-1">
                <h4 className="text-gray-900 font-medium text-sm">{feature.title}</h4>
                <p className="text-gray-500 text-xs">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Card */}
      <div className="px-4 pb-24">
        <button className="w-full bg-gray-50 rounded-2xl p-4 flex items-center gap-3 text-left">
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Info className="w-5 h-5 text-gray-600" />
          </div>
          <div className="flex-1">
            <h4 className="text-gray-900 font-medium text-sm">Why RM {maxLoan} limit?</h4>
            <p className="text-gray-500 text-xs">Based on your RyScore & income</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Apply Button */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 px-4 py-4">
        <PillButton
          onClick={handleApply}
          className="w-full"
          size="lg"
        >
          Apply for RM {loanAmount}
        </PillButton>
      </div>
    </div>
  );
}
