import { useState, useEffect } from 'react';
import { Screen } from '../App';
import { ArrowLeft, Shield, Mic, Fingerprint, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { RyseLogo } from './RyseLogo';
import { BottomNav } from './BottomNav';

interface TransactionScreenProps {
  navigateTo: (screen: Screen) => void;
  initialData?: {
    amount?: string;
    recipient?: string;
  };
}

type SecurityStep = 'voice' | 'liveness' | 'challenge' | 'fingerprint' | 'result';

export function TransactionScreen({ navigateTo, initialData }: TransactionScreenProps) {
  const [amount, setAmount] = useState(initialData?.amount || '');
  const [recipient, setRecipient] = useState(initialData?.recipient || '');
  const [showSecurity, setShowSecurity] = useState(false);
  const [currentStep, setCurrentStep] = useState<SecurityStep>('voice');
  const [isScamDetected, setIsScamDetected] = useState(false);
  const [securityPassed, setSecurityPassed] = useState({
    voice: false,
    liveness: false,
    challenge: false,
    fingerprint: false
  });

  // Update amount and recipient when initialData changes
  useEffect(() => {
    if (initialData?.amount) {
      setAmount(initialData.amount);
    }
    if (initialData?.recipient) {
      setRecipient(initialData.recipient);
    }
  }, [initialData]);

  const handleTransfer = () => {
    const amountNum = parseFloat(amount);
    const currentBalance = 3847.50; // Current balance
    
    // Check if amount exceeds balance
    if (amountNum > currentBalance) {
      alert(`Your balance is insufficient. Your current balance is RM ${currentBalance.toFixed(2)}, but you're trying to transfer RM ${amountNum.toFixed(2)}. Please top up your account to complete this transaction.`);
      return;
    }
    
    if (amountNum > 1000) {
      setShowSecurity(true);
      setCurrentStep('voice');
      // Simulate scam detection (30% chance for demo)
      setIsScamDetected(Math.random() < 0.3);
    } else {
      // Direct transfer for amounts <= 1000
      alert('Transfer successful!');
      setAmount('');
      setRecipient('');
    }
  };

  const handleVoiceCheck = () => {
    setSecurityPassed(prev => ({ ...prev, voice: true }));
    setTimeout(() => setCurrentStep('liveness'), 1000);
  };

  const handleLivenessCheck = () => {
    setSecurityPassed(prev => ({ ...prev, liveness: true }));
    setTimeout(() => setCurrentStep('challenge'), 1000);
  };

  const handleChallengeCheck = () => {
    setSecurityPassed(prev => ({ ...prev, challenge: true }));
    setTimeout(() => setCurrentStep('fingerprint'), 1000);
  };

  const handleFingerprintCheck = () => {
    setSecurityPassed(prev => ({ ...prev, fingerprint: true }));
    setTimeout(() => setCurrentStep('result'), 1000);
  };

  const resetTransaction = () => {
    setShowSecurity(false);
    setAmount('');
    setRecipient('');
    setSecurityPassed({ voice: false, liveness: false, challenge: false, fingerprint: false });
    setCurrentStep('voice');
  };

  if (showSecurity) {
    return (
      <div className="h-full flex flex-col bg-gradient-to-br from-purple-50 via-white to-blue-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-6 rounded-b-3xl shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <RyseLogo navigateTo={navigateTo} />
            <button
              onClick={resetTransaction}
              className="w-10 h-10 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
          <h2 className="text-white">Security Verification</h2>
          <p className="text-purple-200 text-sm">High-value transaction detected</p>
        </div>

        {/* Security Steps */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* Transaction Info */}
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 mb-6">
            <p className="text-gray-600 text-sm mb-2">Transferring to</p>
            <h3 className="text-gray-900 mb-3">{recipient}</h3>
            <div className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              RM {amount}
            </div>
          </div>

          {/* Progress Steps */}
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 mb-6">
            <div className="space-y-4">
              {/* Voice Recognition */}
              <div className={`flex items-center gap-3 ${currentStep === 'voice' ? 'opacity-100' : 'opacity-50'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  securityPassed.voice ? 'bg-green-500' : 'bg-purple-500'
                }`}>
                  {securityPassed.voice ? (
                    <CheckCircle className="w-6 h-6 text-white" />
                  ) : (
                    <Mic className="w-6 h-6 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-900">Voice Recognition</h4>
                  <p className="text-gray-600 text-sm">
                    {securityPassed.voice ? 'Verified' : 'Verifying your voice...'}
                  </p>
                </div>
              </div>

              {/* Liveness Detection */}
              <div className={`flex items-center gap-3 ${currentStep === 'liveness' ? 'opacity-100' : 'opacity-50'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  securityPassed.liveness ? 'bg-green-500' : 'bg-blue-500'
                }`}>
                  {securityPassed.liveness ? (
                    <CheckCircle className="w-6 h-6 text-white" />
                  ) : (
                    <Mic className="w-6 h-6 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-900">Liveness Detection</h4>
                  <p className="text-gray-600 text-sm">
                    {securityPassed.liveness ? 'Verified' : 'Checking for deepfake...'}
                  </p>
                </div>
              </div>

              {/* Challenge Questions */}
              <div className={`flex items-center gap-3 ${currentStep === 'challenge' ? 'opacity-100' : 'opacity-50'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  securityPassed.challenge ? 'bg-green-500' : 'bg-cyan-500'
                }`}>
                  {securityPassed.challenge ? (
                    <CheckCircle className="w-6 h-6 text-white" />
                  ) : (
                    <Shield className="w-6 h-6 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-900">Challenge Questions</h4>
                  <p className="text-gray-600 text-sm">
                    {securityPassed.challenge ? 'Verified' : 'Answer verification questions...'}
                  </p>
                </div>
              </div>

              {/* Fingerprint */}
              <div className={`flex items-center gap-3 ${currentStep === 'fingerprint' ? 'opacity-100' : 'opacity-50'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  securityPassed.fingerprint ? 'bg-green-500' : 'bg-teal-500'
                }`}>
                  {securityPassed.fingerprint ? (
                    <CheckCircle className="w-6 h-6 text-white" />
                  ) : (
                    <Fingerprint className="w-6 h-6 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-900">Fingerprint Verification</h4>
                  <p className="text-gray-600 text-sm">
                    {securityPassed.fingerprint ? 'Verified' : 'Place finger on sensor...'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Current Step Action */}
          {currentStep === 'voice' && !securityPassed.voice && (
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-5 border border-purple-200">
              <div className="flex items-center gap-3 mb-4">
                <Mic className="w-6 h-6 text-purple-600" />
                <h4 className="text-purple-900">Voice Verification Required</h4>
              </div>
              <p className="text-purple-700 text-sm mb-4">Please say: "I authorize this transfer"</p>
              <button
                onClick={handleVoiceCheck}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl"
              >
                Start Voice Check
              </button>
            </div>
          )}

          {currentStep === 'liveness' && !securityPassed.liveness && (
            <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl p-5 border border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
                <h4 className="text-blue-900">Liveness Check</h4>
              </div>
              <p className="text-blue-700 text-sm mb-4">Please cough into the microphone</p>
              <button
                onClick={handleLivenessCheck}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl"
              >
                Perform Liveness Check
              </button>
            </div>
          )}

          {currentStep === 'challenge' && !securityPassed.challenge && (
            <div className="bg-gradient-to-r from-cyan-100 to-teal-100 rounded-2xl p-5 border border-cyan-200">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-cyan-600" />
                <h4 className="text-cyan-900">Challenge Question</h4>
              </div>
              <p className="text-cyan-700 text-sm mb-2">What is your RyScore tier?</p>
              <div className="space-y-2 mb-4">
                <button
                  onClick={handleChallengeCheck}
                  className="w-full py-2 bg-white border border-cyan-300 rounded-xl text-cyan-900 text-sm"
                >
                  Gold
                </button>
                <button className="w-full py-2 bg-white border border-gray-300 rounded-xl text-gray-700 text-sm">
                  Silver
                </button>
                <button className="w-full py-2 bg-white border border-gray-300 rounded-xl text-gray-700 text-sm">
                  Platinum
                </button>
              </div>
            </div>
          )}

          {currentStep === 'fingerprint' && !securityPassed.fingerprint && (
            <div className="bg-gradient-to-r from-teal-100 to-green-100 rounded-2xl p-5 border border-teal-200">
              <div className="flex items-center gap-3 mb-4">
                <Fingerprint className="w-6 h-6 text-teal-600" />
                <h4 className="text-teal-900">Fingerprint Required</h4>
              </div>
              <p className="text-teal-700 text-sm mb-4">Place your finger on the sensor</p>
              <button
                onClick={handleFingerprintCheck}
                className="w-full py-3 bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-xl"
              >
                Scan Fingerprint
              </button>
            </div>
          )}

          {/* Result */}
          {currentStep === 'result' && (
            <div>
              {isScamDetected ? (
                <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-2xl p-6 border border-red-200 text-center">
                  <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <X className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-red-900 mb-3">Transaction Blocked</h3>
                  <p className="text-red-700 text-sm mb-4">
                    Our AI detected suspicious patterns consistent with scam attempts. Your account has been protected.
                  </p>
                  <div className="bg-white/50 rounded-xl p-4 mb-4">
                    <p className="text-red-900 text-sm mb-2">Detected Issues:</p>
                    <ul className="text-left text-red-700 text-sm space-y-1">
                      <li>• Abnormal speech patterns detected</li>
                      <li>• Voice stress analysis shows pressure</li>
                      <li>• Unusual timing for large transfer</li>
                    </ul>
                  </div>
                  <button
                    onClick={resetTransaction}
                    className="w-full py-3 bg-red-600 text-white rounded-xl"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-6 border border-green-200 text-center">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-green-900 mb-3">Verification Complete</h3>
                  <p className="text-green-700 text-sm mb-4">
                    All security checks passed. Your transaction is approved.
                  </p>
                  <div className="bg-white/50 rounded-xl p-4 mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-green-800">Recipient:</span>
                      <span className="text-green-900">{recipient}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-green-800">Amount:</span>
                      <span className="text-green-900">RM {amount}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      alert('Transfer successful!');
                      resetTransaction();
                      navigateTo('dashboard');
                    }}
                    className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl mb-2"
                  >
                    Confirm Transfer
                  </button>
                  <button
                    onClick={resetTransaction}
                    className="w-full py-3 text-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <BottomNav currentScreen="dashboard" navigateTo={navigateTo} />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-purple-50 via-white to-blue-50 overflow-y-auto pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-6 rounded-b-3xl shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <RyseLogo navigateTo={navigateTo} />
          <button
            onClick={() => navigateTo('dashboard')}
            className="w-10 h-10 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        </div>
        <h2 className="text-white">Send Money</h2>
        <p className="text-purple-200 text-sm">Transfer to anyone instantly</p>
      </div>

      {/* Transfer Form */}
      <div className="px-6 py-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-4">
          <label className="block text-gray-700 mb-2">Recipient</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Enter name or phone number"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
          <label className="block text-gray-700 mb-2">Amount (RM)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-purple-500 text-2xl"
          />
          {parseFloat(amount) > 1000 && (
            <div className="mt-3 flex items-start gap-2 text-orange-700 text-sm">
              <Shield className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p>Enhanced security verification required for amounts above RM 1,000</p>
            </div>
          )}
        </div>

        <button
          onClick={handleTransfer}
          disabled={!amount || !recipient}
          className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Transfer
        </button>
      </div>
    </div>
  );
}
