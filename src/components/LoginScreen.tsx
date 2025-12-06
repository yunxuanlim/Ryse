// ============================================
// Login Screen - Cash App Inspired Design
// Clean, minimal forms with black buttons
// ============================================

import { useState } from 'react';
import { Screen } from '../App';
import { X, Loader2, Eye, EyeOff, Lock, Phone } from 'lucide-react';

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

type AuthStep = 'phone' | 'otp' | 'mpin_setup' | 'mpin_login';

export function LoginScreen({ navigateTo, onAuthSuccess, auth }: LoginScreenProps) {
  const [step, setStep] = useState<AuthStep>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [mpin, setMpin] = useState('');
  const [confirmMpin, setConfirmMpin] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const [showMpin, setShowMpin] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

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
      setStep(isNewUser ? 'mpin_setup' : 'mpin_login');
    }
  };

  const handleMPINSetup = async () => {
    if (mpin.length !== 6) {
      setLocalError('MPIN must be 6 digits');
      return;
    }
    if (mpin !== confirmMpin) {
      setLocalError('MPINs do not match');
      return;
    }

    const cleanPhone = '+60' + phoneNumber.replace(/-/g, '');
    const success = await auth.setUserMPIN(cleanPhone, mpin, confirmMpin);
    if (success) onAuthSuccess();
  };

  const handleMPINLogin = async () => {
    if (mpin.length !== 6) {
      setLocalError('MPIN must be 6 digits');
      return;
    }

    const cleanPhone = '+60' + phoneNumber.replace(/-/g, '');
    const success = await auth.loginWithPin(cleanPhone, mpin);
    if (success) onAuthSuccess();
  };

  const handleDemoLogin = async () => {
    const success = await auth.demoLogin();
    if (success) onAuthSuccess();
  };

  const handleBack = () => {
    if (step === 'phone') {
      navigateTo('onboarding');
    } else {
      setStep('phone');
      setOtp('');
      setMpin('');
      setConfirmMpin('');
      setLocalError(null);
      auth.clearError();
    }
  };

  const error = localError || auth.error;

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header with X button */}
      <div className="flex items-center justify-between px-4 py-4">
        <button
          onClick={handleBack}
          className="w-10 h-10 flex items-center justify-center"
        >
          <X className="w-6 h-6 text-black" />
        </button>
        <div className="flex-1" />
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pt-4">
        {/* Phone Input Step */}
        {step === 'phone' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Enter your phone number
              </h1>
              <p className="text-gray-500">
                We'll send you a verification code.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Phone Number</label>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-4 bg-gray-100 rounded-xl border border-gray-200">
                  <span className="text-lg">🇲🇾</span>
                  <span className="text-gray-900 font-medium">+60</span>
                </div>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="12-3456-7890"
                  className="flex-1 px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-lg"
                  maxLength={12}
                  autoFocus
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
          </div>
        )}

        {/* OTP Input Step */}
        {step === 'otp' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Enter verification code
              </h1>
              <p className="text-gray-500">
                Sent to +60 {phoneNumber}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">6-digit code</label>
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
                className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-2xl text-center tracking-[0.5em] font-mono"
                maxLength={6}
                autoFocus
              />
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
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
                const success = isNewUser 
                  ? await auth.registerUser(cleanPhone)
                  : await auth.requestOTP(cleanPhone);
                if (success) {
                  setLocalError(null);
                  // Brief success indication via placeholder change handled by loading state
                }
              }}
              disabled={auth.isLoading}
              className="text-black font-medium underline"
            >
              {auth.isLoading ? 'Sending...' : 'Resend code'}
            </button>
          </div>
        )}

        {/* MPIN Setup Step */}
        {step === 'mpin_setup' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Create your PIN
              </h1>
              <p className="text-gray-500">
                You'll use this to sign in and confirm transactions.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">6-digit PIN</label>
                <div className="relative">
                  <input
                    type={showMpin ? 'text' : 'password'}
                    value={mpin}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                      setMpin(value);
                      setLocalError(null);
                      auth.clearError();
                    }}
                    placeholder="••••••"
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-xl text-center tracking-[0.3em]"
                    maxLength={6}
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowMpin(!showMpin)}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    {showMpin ? (
                      <EyeOff className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Confirm PIN</label>
                <input
                  type={showMpin ? 'text' : 'password'}
                  value={confirmMpin}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setConfirmMpin(value);
                    setLocalError(null);
                    auth.clearError();
                  }}
                  placeholder="••••••"
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-xl text-center tracking-[0.3em]"
                  maxLength={6}
                />
              </div>
            </div>

            <div className="flex items-start gap-3 text-sm text-gray-500">
              <Lock className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <p>Secured with 256-bit encryption</p>
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
          </div>
        )}

        {/* MPIN Login Step */}
        {step === 'mpin_login' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Enter your PIN
              </h1>
              <p className="text-gray-500">
                Welcome back! Enter your 6-digit PIN.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">6-digit PIN</label>
              <div className="relative">
                <input
                  type={showMpin ? 'text' : 'password'}
                  value={mpin}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setMpin(value);
                    setLocalError(null);
                    auth.clearError();
                  }}
                  placeholder="••••••"
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-xl text-center tracking-[0.3em]"
                  maxLength={6}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowMpin(!showMpin)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showMpin ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <p className="text-gray-600 text-sm">
                <span className="font-medium">Dev Mode:</span> Use PIN <span className="font-mono bg-gray-200 px-2 py-0.5 rounded">123456</span>
              </p>
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              onClick={() => setLocalError('Password reset coming soon')}
              className="text-black font-medium underline text-sm"
            >
              Forgot PIN?
            </button>
          </div>
        )}
      </div>

      {/* Bottom Button */}
      <div className="p-6 space-y-3">
        {step === 'phone' && (
          <>
            <button
              onClick={handlePhoneSubmit}
              disabled={auth.isLoading || phoneNumber.replace(/-/g, '').length < 9}
              className="w-full py-4 bg-black text-white rounded-full font-semibold text-lg disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              {auth.isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Checking...
                </>
              ) : (
                'Next'
              )}
            </button>
            <button
              onClick={handleDemoLogin}
              disabled={auth.isLoading}
              className="w-full py-4 border border-gray-200 text-gray-700 rounded-full font-medium transition-all active:scale-[0.98]"
            >
              Quick Demo Login
            </button>
          </>
        )}

        {step === 'otp' && (
          <button
            onClick={handleOTPSubmit}
            disabled={auth.isLoading || otp.length !== 6}
            className="w-full py-4 bg-black text-white rounded-full font-semibold text-lg disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            {auth.isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Verifying...
              </>
            ) : (
              'Verify'
            )}
          </button>
        )}

        {step === 'mpin_setup' && (
          <button
            onClick={handleMPINSetup}
            disabled={auth.isLoading || mpin.length !== 6 || confirmMpin.length !== 6}
            className="w-full py-4 bg-black text-white rounded-full font-semibold text-lg disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            {auth.isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Creating...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        )}

        {step === 'mpin_login' && (
          <button
            onClick={handleMPINLogin}
            disabled={auth.isLoading || mpin.length !== 6}
            className="w-full py-4 bg-black text-white rounded-full font-semibold text-lg disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            {auth.isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        )}

        <p className="text-center text-xs text-gray-400">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
