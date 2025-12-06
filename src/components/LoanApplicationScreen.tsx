import { useState, useEffect } from 'react';
import { Screen } from '../App';
import { ArrowLeft, Zap, Info, CheckCircle, DollarSign, AlertCircle, X } from 'lucide-react';
import { RyseLogo } from './RyseLogo';
import { BottomNav } from './BottomNav';

interface LoanApplicationScreenProps {
  navigateTo: (screen: Screen) => void;
  initialData?: {
    loanAmount?: string;
  };
}

export function LoanApplicationScreen({ navigateTo, initialData }: LoanApplicationScreenProps) {
  const maxLoan = 1000;
  const ryScore = 720;
  
  // Initialize loan amount from initialData or default to 500
  const getInitialAmount = () => {
    if (initialData?.loanAmount) {
      const amount = parseFloat(initialData.loanAmount);
      if (!isNaN(amount)) {
        return Math.min(Math.max(amount, 100), maxLoan); // Clamp between 100 and maxLoan
      }
    }
    return 500;
  };

  const [loanAmount, setLoanAmount] = useState(getInitialAmount());
  const [showApproval, setShowApproval] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Check if initial amount exceeds limit
  useEffect(() => {
    if (initialData?.loanAmount) {
      const amount = parseFloat(initialData.loanAmount);
      if (!isNaN(amount)) {
        if (amount > maxLoan) {
          // Show error if amount exceeds limit, but keep the original amount in input
          setShowError(true);
          setErrorMessage(`The amount you entered exceeds the available credit limit. Please enter an amount less than RM ${maxLoan}.`);
          // Keep the original amount so user can see what they entered
          setLoanAmount(amount);
        } else {
          // Amount is within limit, set it normally
          setLoanAmount(Math.min(Math.max(amount, 100), maxLoan));
        }
      }
    }
  }, [initialData, maxLoan]);

  const handleApply = () => {
    if (loanAmount > maxLoan) {
      setShowError(true);
      setErrorMessage(`The amount you entered exceeds the available credit limit. Please enter an amount less than RM ${maxLoan}.`);
      setLoanAmount(maxLoan);
      return;
    }
    setShowApproval(true);
  };

  const handleAmountChange = (newAmount: number) => {
    if (newAmount > maxLoan) {
      setShowError(true);
      setErrorMessage(`The amount you entered exceeds the available credit limit. Please enter an amount less than RM ${maxLoan}.`);
      setLoanAmount(maxLoan);
    } else {
      setLoanAmount(newAmount);
      if (showError) {
        setShowError(false);
      }
    }
  };

  if (showApproval) {
    return (
      <div className="h-full flex flex-col bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6 animate-bounce">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          
          <h2 className="text-gray-900 text-center mb-3">Loan Approved!</h2>
          <p className="text-gray-600 text-center mb-8">Your Ryse Advance of RM {loanAmount} has been approved in 30 seconds.</p>

          <div className="w-full bg-white rounded-3xl p-6 shadow-xl border border-gray-100 mb-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Loan Amount</span>
                <span className="text-gray-900">RM {loanAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Processing Fee (3%)</span>
                <span className="text-gray-900">RM {(loanAmount * 0.03).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Repayment Method</span>
                <span className="text-gray-900">Per delivery</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Per Delivery Deduction</span>
                <span className="text-gray-900">RM 5</span>
              </div>
              <div className="h-px bg-gray-200"></div>
              <div className="flex justify-between">
                <span className="text-gray-900">You'll Receive</span>
                <span className="text-gray-900">RM {(loanAmount * 0.97).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigateTo('dashboard')}
            className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl shadow-lg mb-3"
          >
            Done
          </button>
          
          <button
            onClick={() => setShowApproval(false)}
            className="w-full py-4 text-gray-600"
          >
            Apply for Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-purple-50 via-white to-blue-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-6 rounded-b-3xl shadow-xl">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigateTo('dashboard')}
            className="w-10 h-10 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h2 className="text-white">Ryse Advance</h2>
            <p className="text-purple-200 text-sm">Smart Micro-Loans</p>
          </div>
        </div>

        {/* Available Credit */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
          <p className="text-purple-200 text-sm mb-2">Available Credit</p>
          <h1 className="text-white mb-2">RM 1,000</h1>
          <p className="text-purple-200 text-sm">Based on your RyScore: {ryScore} (Gold)</p>
        </div>
      </div>

      {/* Error Alert */}
      {showError && (
        <div className="px-6 pt-6">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-red-900 font-semibold mb-1">Amount Exceeded</h4>
              <p className="text-red-700 text-sm">{errorMessage}</p>
            </div>
            <button
              onClick={() => setShowError(false)}
              className="text-red-500 hover:text-red-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Loan Amount Selector */}
      <div className="px-6 py-6">
        <h3 className="text-gray-900 mb-4">How much do you need?</h3>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="text-center mb-6">
            <div className="text-5xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-2">
              RM {loanAmount}
            </div>
            <p className="text-gray-500 text-sm">Swipe to adjust amount</p>
          </div>

          <input
            type="range"
            min="100"
            max={maxLoan}
            step="50"
            value={loanAmount}
            onChange={(e) => handleAmountChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
          />

          <div className="flex justify-between mt-3 text-gray-600 text-sm">
            <span>RM 100</span>
            <span>RM {maxLoan}</span>
          </div>

          {/* Manual Input */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <label className="block text-gray-700 text-sm mb-2">Or enter amount directly</label>
            <input
              type="number"
              min="100"
              max={maxLoan}
              step="50"
              value={loanAmount}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (!isNaN(value)) {
                  if (value > maxLoan) {
                    // Show error immediately when exceeding limit
                    setShowError(true);
                    setErrorMessage(`The amount you entered exceeds the available credit limit. Please enter an amount less than RM ${maxLoan}.`);
                    setLoanAmount(maxLoan);
                  } else if (value >= 100) {
                    setLoanAmount(value);
                    if (showError) {
                      setShowError(false);
                    }
                  } else {
                    setLoanAmount(value);
                  }
                }
              }}
              onBlur={(e) => {
                const value = Number(e.target.value);
                if (isNaN(value) || value < 100) {
                  handleAmountChange(100);
                } else if (value > maxLoan) {
                  handleAmountChange(maxLoan);
                }
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-purple-500 text-center text-lg"
              placeholder="Enter amount"
            />
          </div>
        </div>
      </div>

      {/* Loan Details */}
      <div className="px-6 pb-6">
        <h3 className="text-gray-900 mb-4">Loan Details</h3>
        <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Processing Fee (3%)</span>
            <span className="text-gray-900">RM {(loanAmount * 0.03).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">You'll Receive</span>
            <span className="text-gray-900">RM {(loanAmount * 0.97).toFixed(2)}</span>
          </div>
          <div className="h-px bg-gray-200"></div>
          <div className="flex justify-between">
            <span className="text-gray-600">Repayment</span>
            <span className="text-gray-900">RM 5 per delivery</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Estimated Payoff</span>
            <span className="text-gray-900">{Math.ceil(loanAmount / 5)} deliveries</span>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="px-6 pb-6">
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-4 border border-green-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-green-900">30-Second Approval</h4>
                <p className="text-green-700 text-sm">Instant decision based on your RyScore</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl p-4 border border-blue-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-blue-900">Smart Repayment</h4>
                <p className="text-blue-700 text-sm">Auto-deduct from deliveries, accelerates during high-income weeks</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-4 border border-purple-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Info className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-purple-900">Transparent Fees</h4>
                <p className="text-purple-700 text-sm">No hidden charges, clear terms explained by AI</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why This Amount */}
      <div className="px-6 pb-32">
        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-gray-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-gray-900 mb-2">Why can I borrow up to RM {maxLoan}?</h4>
              <p className="text-gray-600 text-sm mb-3">Your limit is calculated based on:</p>
              <ul className="space-y-1 text-gray-600 text-sm">
                <li>• Your RyScore (720 - Gold Tier)</li>
                <li>• Average weekly income (RM 1,200)</li>
                <li>• Payment history (100% on-time)</li>
                <li>• Current savings (RM 2,500)</li>
              </ul>
              <button className="text-purple-600 text-sm mt-3 underline">Learn more about limits</button>
            </div>
          </div>
        </div>
      </div>

      {/* Apply Button */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 px-6 py-4">
        <button
          onClick={handleApply}
          className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl shadow-lg"
        >
          Apply for RM {loanAmount}
        </button>
      </div>
    </div>
  );
}