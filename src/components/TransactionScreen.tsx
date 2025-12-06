// ============================================
// Transaction Screen - OBSIDIAN Neon-Noir Design
// Payment flow with neon accents and glassmorphism
// ============================================

import { useState, useEffect } from 'react';
import { Screen } from '../App';
import { X, ArrowUp, Search, ChevronRight, AlertTriangle, CheckCircle, Fingerprint } from 'lucide-react';
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
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setAmount(value);
    }
  };

  const handlePayment = async () => {
    const amountNum = parseFloat(amount);
    
    if (amountNum > currentBalance) {
      return;
    }

    if (amountNum > 1000) {
      setStep('security');
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
      <div className="h-full flex flex-col bg-obsidian-100">
        <div className="flex items-center justify-between px-4 py-4">
          <button onClick={handleClose} className="w-10 h-10 flex items-center justify-center hover:bg-obsidian-300 rounded-full transition-colors">
            <X className="w-6 h-6 text-white-high" />
          </button>
          <span className="text-sm text-white-low font-medium">
            Balance: RM {currentBalance.toLocaleString()}
          </span>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-2xl text-white-muted">RM</span>
            <input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => handleAmountInput(e.target.value)}
              placeholder="0"
              className="text-7xl font-bold text-neon text-center bg-transparent border-none outline-none w-full font-mono-nums text-glow"
              style={{ caretColor: 'var(--neon-primary)' }}
              autoFocus
            />
          </div>
          {parseFloat(amount) > currentBalance && (
            <div className="flex items-center gap-2 text-white-high text-sm alert-pattern px-3 py-1 rounded-lg">
              <span>Exceeds your balance</span>
            </div>
          )}
        </div>

        <div className="p-6">
          <PillButton
            onClick={() => setStep('recipient')}
            disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > currentBalance}
            className="w-full"
            size="lg"
            variant="neon"
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
      <div className="h-full flex flex-col bg-obsidian-100">
        <div className="flex items-center justify-between px-4 py-4 border-b" style={{ borderColor: 'var(--white-divider)' }}>
          <button onClick={() => setStep('amount')} className="w-10 h-10 flex items-center justify-center hover:bg-obsidian-300 rounded-full transition-colors">
            <X className="w-6 h-6 text-white-high" />
          </button>
          <span className="font-semibold text-neon">RM {parseFloat(amount).toFixed(2)}</span>
          <div className="w-10" />
        </div>

        <div className="px-6 py-4">
          <div className="flex items-center gap-3 bg-obsidian-200 border rounded-2xl px-4 py-3" style={{ borderColor: 'var(--white-divider)' }}>
            <Search className="w-5 h-5 text-white-muted" />
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Name, phone, or email"
              className="flex-1 bg-transparent outline-none text-white-high placeholder-white-muted"
              autoFocus
            />
          </div>
        </div>

        <div className="flex-1 px-6 overflow-y-auto scrollbar-obsidian">
          <p className="text-white-low text-sm mb-3">Recent</p>
          {recentContacts.map((contact) => (
            <button
              key={contact.phone}
              onClick={() => {
                setRecipient(contact.name);
                setStep('confirm');
              }}
              className="w-full flex items-center gap-4 py-3 hover:bg-obsidian-300 rounded-2xl px-2 transition-colors"
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-obsidian-100 glow-neon-sm"
                style={{ backgroundColor: 'var(--neon-primary)' }}
              >
                {contact.avatar}
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-white-high">{contact.name}</p>
                <p className="text-sm text-white-low">{contact.phone}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-white-low" />
            </button>
          ))}
        </div>

        {recipient && (
          <div className="p-6 border-t" style={{ borderColor: 'var(--white-divider)' }}>
            <PillButton
              onClick={() => setStep('confirm')}
              className="w-full"
              size="lg"
              variant="neon"
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
      <div className="h-full flex flex-col bg-obsidian-100">
        <div className="flex items-center px-4 py-4">
          <button onClick={() => setStep('recipient')} className="w-10 h-10 flex items-center justify-center hover:bg-obsidian-300 rounded-full transition-colors">
            <X className="w-6 h-6 text-white-high" />
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center font-bold text-2xl text-obsidian-100 mb-4 glow-neon-lg"
            style={{ backgroundColor: 'var(--neon-primary)' }}
          >
            {recipient.charAt(0).toUpperCase()}
          </div>
          <p className="text-white-low mb-2">Pay {recipient}</p>
          <p className="text-5xl font-bold text-neon mb-1 font-mono-nums text-glow">RM {parseFloat(amount).toFixed(2)}</p>
        </div>

        <div className="p-6">
          <PillButton
            onClick={handlePayment}
            className="w-full"
            size="lg"
            variant="neon"
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
      <div className="h-full flex flex-col bg-obsidian-100 items-center justify-center">
        <div className="w-16 h-16 bg-obsidian-300 rounded-full flex items-center justify-center mb-4 animate-neon-pulse">
          <Fingerprint className="w-8 h-8 text-neon" />
        </div>
        <p className="text-xl font-bold text-white-high mb-2">Verifying payment</p>
        <p className="text-white-low">Running security checks...</p>
      </div>
    );
  }

  // Scam Warning
  if (step === 'scam_warning') {
    return (
      <div className="h-full flex flex-col bg-obsidian-100">
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4 animate-flicker alert-pattern">
            <AlertTriangle className="w-10 h-10 text-obsidian-100" />
          </div>
          <h2 className="text-2xl font-bold text-white-high text-center mb-2">
            Payment flagged
          </h2>
          <p className="text-white-low text-center mb-6">
            This transaction has patterns similar to known scams. Please verify this is a legitimate payment.
          </p>
          
          <div className="w-full card-obsidian border-l-4 mb-6" style={{ borderLeftColor: 'var(--white-high)' }}>
            <p className="text-white-high text-sm font-medium mb-2">⚠️ Warning signs detected:</p>
            <ul className="text-white-low text-sm space-y-1">
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
            variant="neon"
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
      <div className="h-full flex flex-col bg-obsidian-100">
        <div className="flex items-center px-4 py-4">
          <button onClick={() => setStep('confirm')} className="w-10 h-10 flex items-center justify-center hover:bg-obsidian-300 rounded-full transition-colors">
            <X className="w-6 h-6 text-white-high" />
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <h2 className="text-2xl font-bold text-white-high mb-2">Enter PIN to pay</h2>
          <p className="text-white-low mb-8">RM {parseFloat(amount).toFixed(2)} to {recipient}</p>
          
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

          <div className="mt-8 card-obsidian w-full max-w-xs">
            <p className="text-white-low text-sm text-center">
              <span className="font-medium text-neon">Dev Mode:</span> Use PIN <span className="font-mono bg-obsidian-300 text-neon px-2 py-0.5 rounded">1234</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Success Screen
  if (step === 'success') {
    return (
      <div className="h-full flex flex-col bg-obsidian-100">
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4 glow-neon-xl" style={{ backgroundColor: 'rgba(57, 255, 20, 0.2)' }}>
            <CheckCircle className="w-10 h-10 text-neon" />
          </div>
          <h2 className="text-2xl font-bold text-white-high mb-2">Payment sent!</h2>
          <p className="text-white-low text-center">
            RM {parseFloat(amount).toFixed(2)} sent to {recipient}
          </p>
        </div>

        <div className="p-6">
          <PillButton
            onClick={handleClose}
            className="w-full"
            size="lg"
            variant="neon"
          >
            Done
          </PillButton>
        </div>
      </div>
    );
  }

  return null;
}
