// ============================================
// Login Screen - Cash App Inspired Design
// Clean 4-dot PIN input with minimal UI
// ============================================

import { useState, useRef, useEffect } from 'react';
import { Screen } from '../App';
import { X, Loader2, Eye, EyeOff, Phone } from 'lucide-react';
import { PillButton } from './ui/pill-button';
import { PinDots } from './ui/pin-dots';

interface LoginScreenProps {
  navigateTo: (screen: Screen) => void;
  onAuthSuccess: () => void;
  auth: {
    isLoading: boolean;
    error: string | null;
    registerUser: (phone: string) => Promise<boolean>;
    requestOTP: (phone: string) => Promise<boolean>;
    verifyUserOTP: (phone: string, otp: string, purpose: 'registration' | 'login' | 'reset_pin') => Promise<boolean>;
    setUserMPIN: (phone: string, mpin: string, confirmMpin: string) => Promise<boolean>;
    loginWithPin: (phone: string, mpin: string) => Promise<boolean>;
    checkPhone: (phone: string) => Promise<boolean>;
    clearError: () => void;
    demoLogin: () => Promise<boolean>;
  };
}

type AuthStep = 'phone' | 'otp' | 'pin_setup' | 'pin_confirm' | 'pin_login';

export function LoginScreen({ navigateTo, onAuthSuccess, auth }: LoginScreenProps) {
  const [step, setStep] = useState<AuthStep>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [pinError, setPinError] = useState(false);
  
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  // Focus hidden input for PIN entry
  useEffect(() => {
    if ((step === 'pin_setup' || step === 'pin_confirm' || step === 'pin_login') && hiddenInputRef.current) {
      hiddenInputRef.current.focus();
    }
  }, [step]);

  const formatPhoneInput = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 2) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
    return `${digits.slice(0, 2)}-${digits.slice(2, 6)}-${digits.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneInput(e.target.value);
    setPhoneNumber(formatted);
    setLocalError(null);
    auth.clearError();
  };

  const handlePhoneSubmit = async () => {
    const cleanPhone = '+60' + phoneNumber.replace(/-/g, '');
    
    if (phoneNumber.replace(/-/g, '').length < 9) {
      setLocalError('Please enter a valid phone number');
      return;
    }

    const exists = await auth.checkPhone(cleanPhone);
    setIsNewUser(!exists);

    if (exists) {
      const success = await auth.requestOTP(cleanPhone);
      if (success) setStep('otp');
    } else {
      const success = await auth.registerUser(cleanPhone);
      if (success) setStep('otp');
    }
  };

  const handleOTPSubmit = async () => {
    if (otp.length !== 6) {
      setLocalError('Please enter 6-digit OTP');
      return;
    }

    const cleanPhone = '+60' + phoneNumber.replace(/-/g, '');
    const purpose = isNewUser ? 'registration' : 'login';
    const success = await auth.verifyUserOTP(cleanPhone, otp, purpose);
    
    if (success) {
      setStep(isNewUser ? 'pin_setup' : 'pin_login');
    }
  };

  const handlePinInput = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    
    if (step === 'pin_setup') {
      setPin(digits);
      if (digits.length === 4) {
        setTimeout(() => setStep('pin_confirm'), 300);
      }
    } else if (step === 'pin_confirm') {
      setConfirmPin(digits);
      if (digits.length === 4) {
        if (digits === pin) {
          handlePinSetup(digits);
        } else {
          setPinError(true);
          setTimeout(() => {
            setPinError(false);
            setConfirmPin('');
          }, 500);
        }
      }
    } else if (step === 'pin_login') {
      setPin(digits);
      if (digits.length === 4) {
        handlePinLogin(digits);
      }
    }
  };

  const handlePinSetup = async (confirmValue: string) => {
    const cleanPhone = '+60' + phoneNumber.replace(/-/g, '');
    // Using the 4-digit PIN but padding to 6 for backend compatibility
    const paddedPin = pin + '00';
    const paddedConfirm = confirmValue + '00';
    const success = await auth.setUserMPIN(cleanPhone, paddedPin, paddedConfirm);
    if (success) onAuthSuccess();
  };

  const handlePinLogin = async (pinValue: string) => {
    const cleanPhone = '+60' + phoneNumber.replace(/-/g, '');
    // Using the 4-digit PIN but padding to 6 for backend compatibility
    const paddedPin = pinValue + '00';
    const success = await auth.loginWithPin(cleanPhone, paddedPin);
    if (success) {
      onAuthSuccess();
    } else {
      setPinError(true);
      setTimeout(() => {
        setPinError(false);
        setPin('');
      }, 500);
    }
  };

  const handleDemoLogin = async () => {
    const success = await auth.demoLogin();
    if (success) onAuthSuccess();
  };

  const handleBack = () => {
    if (step === 'phone') {
      navigateTo('onboarding');
    } else if (step === 'pin_confirm') {
      setStep('pin_setup');
      setConfirmPin('');
    } else {
      setStep('phone');
      setOtp('');
      setPin('');
      setConfirmPin('');
      setLocalError(null);
      auth.clearError();
    }
  };

  const error = localError || auth.error;

  const getTitle = () => {
    switch (step) {
      case 'phone': return 'Enter your phone number';
      case 'otp': return 'Enter verification code';
      case 'pin_setup': return 'Create your Cash PIN';
      case 'pin_confirm': return 'Please confirm your Cash PIN';
      case 'pin_login': return 'Enter your Cash PIN';
    }
  };

  const getSubtitle = () => {
    switch (step) {
      case 'phone': return "We'll send you a verification code";
      case 'otp': return `Sent to +60 ${phoneNumber}`;
      case 'pin_setup': return "You'll use this to sign in and confirm transactions";
      case 'pin_confirm': return 'Enter the same PIN again';
      case 'pin_login': return 'Welcome back!';
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header with X button */}
      <div className="flex items-center px-4 py-4">
        <button
          onClick={handleBack}
          className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-black" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pt-8">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {getTitle()}
        </h1>
        <p className="text-gray-500 mb-8">
          {getSubtitle()}
        </p>

        {/* Phone Input Step */}
        {step === 'phone' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-4 bg-gray-100 rounded-2xl">
                <span className="text-lg">🇲🇾</span>
                <span className="text-gray-900 font-medium">+60</span>
              </div>
              <input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="12-3456-7890"
                className="flex-1 px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black text-lg"
                maxLength={12}
                autoFocus
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
          </div>
        )}

        {/* OTP Input Step */}
        {step === 'otp' && (
          <div className="space-y-6">
            <input
              type="text"
              value={otp}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                setOtp(value);
                setLocalError(null);
                auth.clearError();
              }}
              placeholder="000000"
              className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black text-2xl text-center tracking-[0.5em] font-mono"
              maxLength={6}
              autoFocus
            />

            <div className="bg-gray-50 rounded-2xl p-4">
              <p className="text-gray-600 text-sm">
                <span className="font-medium">Dev Mode:</span> Use code <span className="font-mono bg-gray-200 px-2 py-0.5 rounded">123456</span>
              </p>
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              onClick={async () => {
                const cleanPhone = '+60' + phoneNumber.replace(/-/g, '');
                if (isNewUser) await auth.registerUser(cleanPhone);
                else await auth.requestOTP(cleanPhone);
              }}
              disabled={auth.isLoading}
              className="text-black font-medium underline text-sm"
            >
              {auth.isLoading ? 'Sending...' : 'Resend code'}
            </button>
          </div>
        )}

        {/* PIN Input Steps */}
        {(step === 'pin_setup' || step === 'pin_confirm' || step === 'pin_login') && (
          <div className="flex flex-col items-center pt-12">
            <PinDots 
              length={4} 
              filled={step === 'pin_confirm' ? confirmPin.length : pin.length}
              error={pinError}
              size="lg"
            />
            
            {/* Hidden input for keyboard */}
            <input
              ref={hiddenInputRef}
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              value={step === 'pin_confirm' ? confirmPin : pin}
              onChange={(e) => handlePinInput(e.target.value)}
              className="opacity-0 absolute -z-10"
              autoFocus
            />

            {/* Tap to type hint */}
            <button
              onClick={() => hiddenInputRef.current?.focus()}
              className="mt-8 text-gray-400 text-sm"
            >
              Tap to enter PIN
            </button>

            {step === 'pin_login' && (
              <div className="mt-8 bg-gray-50 rounded-2xl p-4 w-full">
                <p className="text-gray-600 text-sm text-center">
                  <span className="font-medium">Dev Mode:</span> Use PIN <span className="font-mono bg-gray-200 px-2 py-0.5 rounded">1234</span>
                </p>
              </div>
            )}

            {error && (
              <p className="text-red-500 text-sm mt-4">{error}</p>
            )}
          </div>
        )}
      </div>

      {/* Bottom Button */}
      <div className="p-6 space-y-3">
        {step === 'phone' && (
          <>
            <PillButton
              onClick={handlePhoneSubmit}
              disabled={auth.isLoading || phoneNumber.replace(/-/g, '').length < 9}
              isLoading={auth.isLoading}
              className="w-full"
              size="lg"
            >
              Next
            </PillButton>
            <PillButton
              onClick={handleDemoLogin}
              disabled={auth.isLoading}
              variant="secondary"
              className="w-full"
              size="lg"
            >
              Quick Demo Login
            </PillButton>
          </>
        )}

        {step === 'otp' && (
          <PillButton
            onClick={handleOTPSubmit}
            disabled={auth.isLoading || otp.length !== 6}
            isLoading={auth.isLoading}
            className="w-full"
            size="lg"
          >
            Verify
          </PillButton>
        )}

        {(step === 'pin_setup' || step === 'pin_confirm' || step === 'pin_login') && auth.isLoading && (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        )}

        <p className="text-center text-xs text-gray-400 pt-2">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
