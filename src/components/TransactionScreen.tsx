// ============================================
// Transaction Screen - Cash App Inspired Design
// Clean payment flow with minimal UI
// ============================================

import { useState, useEffect } from 'react';
import { Screen } from '../App';
import { X, ArrowUp, Search, ChevronRight, AlertTriangle, CheckCircle, Mic, Fingerprint } from 'lucide-react';
import { PillButton } from './ui/pill-button';
import { PinDots } from './ui/pin-dots';

interface TransactionScreenProps {
  navigateTo: (screen: Screen) => void;
  initialData?: {
    amount?: string;
    recipient?: string;
  };
}

type PaymentStep = 'amount' | 'recipient' | 'confirm' | 'pin' | 'security' | 'success' | 'scam_warning';

export function TransactionScreen({ navigateTo, initialData }: TransactionScreenProps) {
  const [step, setStep] = useState<PaymentStep>('amount');
  const [amount, setAmount] = useState(initialData?.amount || '');
  const [recipient, setRecipient] = useState(initialData?.recipient || '');
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const recentContacts = [
    { name: 'Ahmad', phone: '+60 12-345-6789', avatar: 'A' },
    { name: 'Siti', phone: '+60 13-456-7890', avatar: 'S' },
    { name: 'Wei Ming', phone: '+60 14-567-8901', avatar: 'W' },
  ];

  const currentBalance = 3847.50;

  useEffect(() => {
    if (initialData?.amount) setAmount(initialData.amount);
    if (initialData?.recipient) setRecipient(initialData.recipient);
  }, [initialData]);

  const handleAmountInput = (value: string) => {
    // Only allow numbers and one decimal point
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setAmount(value);
    }
  };

  const handlePayment = async () => {
    const amountNum = parseFloat(amount);
    
    if (amountNum > currentBalance) {
      // Show insufficient balance
      return;
    }

    if (amountNum > 1000) {
      // Need security verification for large amounts
      setStep('security');
      // Simulate scam detection (30% chance for demo)
      if (Math.random() < 0.3) {
        setTimeout(() => setStep('scam_warning'), 2000);
      } else {
        setTimeout(() => setStep('pin'), 2000);
      }
    } else {
      setStep('pin');
    }
  };

  const handlePinSubmit = async (pinValue: string) => {
    setIsLoading(true);
    
    // Simulate verification
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (pinValue === '1234') {
      setStep('success');
    } else {
      setPinError(true);
      setTimeout(() => {
        setPinError(false);
        setPin('');
      }, 500);
    }
    setIsLoading(false);
  };

  const handleClose = () => {
    navigateTo('dashboard');
  };

  // Amount Screen
  if (step === 'amount') {
    return (
      <div className="h-full flex flex-col bg-white">
        <div className="flex items-center justify-between px-4 py-4">
          <button onClick={handleClose} className="w-10 h-10 flex items-center justify-center">
            <X className="w-6 h-6 text-black" />
          </button>
          <span className="text-sm text-gray-500 font-medium">
            Balance: RM {currentBalance.toLocaleString()}
          </span>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-2xl text-gray-400">RM</span>
            <input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => handleAmountInput(e.target.value)}
              placeholder="0"
              className="text-7xl font-bold text-gray-900 text-center bg-transparent border-none outline-none w-full"
              style={{ caretColor: 'black' }}
              autoFocus
            />
          </div>
          {parseFloat(amount) > currentBalance && (
            <p className="text-red-500 text-sm">Exceeds your balance</p>
          )}
        </div>

        <div className="p-6">
          <PillButton
            onClick={() => setStep('recipient')}
            disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > currentBalance}
            className="w-full"
            size="lg"
            rightIcon={<ArrowUp className="w-5 h-5" />}
          >
            Pay
          </PillButton>
        </div>
      </div>
    );
  }

  // Recipient Screen
  if (step === 'recipient') {
    return (
      <div className="h-full flex flex-col bg-white">
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <button onClick={() => setStep('amount')} className="w-10 h-10 flex items-center justify-center">
            <X className="w-6 h-6 text-black" />
          </button>
          <span className="font-semibold text-gray-900">RM {parseFloat(amount).toFixed(2)}</span>
          <div className="w-10" />
        </div>

        <div className="px-6 py-4">
          <div className="flex items-center gap-3 bg-gray-100 rounded-2xl px-4 py-3">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Name, phone, or email"
              className="flex-1 bg-transparent outline-none text-gray-900"
              autoFocus
            />
          </div>
        </div>

        <div className="flex-1 px-6 overflow-y-auto">
          <p className="text-gray-500 text-sm mb-3">Recent</p>
          {recentContacts.map((contact) => (
            <button
              key={contact.phone}
              onClick={() => {
                setRecipient(contact.name);
                setStep('confirm');
              }}
              className="w-full flex items-center gap-4 py-3 hover:bg-gray-50 rounded-2xl px-2"
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-black"
                style={{ backgroundColor: 'var(--ryse-green, #B9FF00)' }}
              >
                {contact.avatar}
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-gray-900">{contact.name}</p>
                <p className="text-sm text-gray-500">{contact.phone}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>

        {recipient && (
          <div className="p-6 border-t border-gray-100">
            <PillButton
              onClick={() => setStep('confirm')}
              className="w-full"
              size="lg"
            >
              Continue
            </PillButton>
          </div>
        )}
      </div>
    );
  }

  // Confirm Screen
  if (step === 'confirm') {
    return (
      <div className="h-full flex flex-col bg-white">
        <div className="flex items-center px-4 py-4">
          <button onClick={() => setStep('recipient')} className="w-10 h-10 flex items-center justify-center">
            <X className="w-6 h-6 text-black" />
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center font-bold text-2xl text-black mb-4"
            style={{ backgroundColor: 'var(--ryse-green, #B9FF00)' }}
          >
            {recipient.charAt(0).toUpperCase()}
          </div>
          <p className="text-gray-500 mb-2">Pay {recipient}</p>
          <p className="text-5xl font-bold text-gray-900 mb-1">RM {parseFloat(amount).toFixed(2)}</p>
        </div>

        <div className="p-6">
          <PillButton
            onClick={handlePayment}
            className="w-full"
            size="lg"
          >
            Pay
          </PillButton>
        </div>
      </div>
    );
  }

  // Security Check
  if (step === 'security') {
    return (
      <div className="h-full flex flex-col bg-white items-center justify-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 animate-pulse">
          <Fingerprint className="w-8 h-8 text-gray-600" />
        </div>
        <p className="text-xl font-bold text-gray-900 mb-2">Verifying payment</p>
        <p className="text-gray-500">Running security checks...</p>
      </div>
    );
  }

  // Scam Warning
  if (step === 'scam_warning') {
    return (
      <div className="h-full flex flex-col bg-white">
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
            Payment flagged
          </h2>
          <p className="text-gray-500 text-center mb-6">
            This transaction has patterns similar to known scams. Please verify this is a legitimate payment.
          </p>
          
          <div className="w-full bg-red-50 rounded-2xl p-4 mb-6">
            <p className="text-red-800 text-sm font-medium mb-2">⚠️ Warning signs detected:</p>
            <ul className="text-red-700 text-sm space-y-1">
              <li>• Unknown recipient</li>
              <li>• Large amount</li>
              <li>• Unusual payment pattern</li>
            </ul>
          </div>
        </div>

        <div className="p-6 space-y-3">
          <PillButton
            onClick={() => setStep('pin')}
            variant="secondary"
            className="w-full"
            size="lg"
          >
            I understand, continue anyway
          </PillButton>
          <PillButton
            onClick={handleClose}
            className="w-full"
            size="lg"
          >
            Cancel payment
          </PillButton>
        </div>
      </div>
    );
  }

  // PIN Screen
  if (step === 'pin') {
    return (
      <div className="h-full flex flex-col bg-white">
        <div className="flex items-center px-4 py-4">
          <button onClick={() => setStep('confirm')} className="w-10 h-10 flex items-center justify-center">
            <X className="w-6 h-6 text-black" />
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter PIN to pay</h2>
          <p className="text-gray-500 mb-8">RM {parseFloat(amount).toFixed(2)} to {recipient}</p>
          
          <PinDots length={4} filled={pin.length} error={pinError} size="lg" />
          
          <input
            type="tel"
            inputMode="numeric"
            value={pin}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '').slice(0, 4);
              setPin(value);
              if (value.length === 4) {
                handlePinSubmit(value);
              }
            }}
            className="opacity-0 absolute"
            autoFocus
          />

          <div className="mt-8 bg-gray-50 rounded-2xl p-4 w-full max-w-xs">
            <p className="text-gray-600 text-sm text-center">
              <span className="font-medium">Dev Mode:</span> Use PIN <span className="font-mono bg-gray-200 px-2 py-0.5 rounded">1234</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Success Screen
  if (step === 'success') {
    return (
      <div className="h-full flex flex-col bg-white">
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment sent!</h2>
          <p className="text-gray-500 text-center">
            RM {parseFloat(amount).toFixed(2)} sent to {recipient}
          </p>
        </div>

        <div className="p-6">
          <PillButton
            onClick={handleClose}
            className="w-full"
            size="lg"
          >
            Done
          </PillButton>
        </div>
      </div>
    );
  }

  return null;
}
