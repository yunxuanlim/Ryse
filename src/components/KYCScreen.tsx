// ============================================
// KYC Screen - Cash App Inspired Design
// Clean step-by-step flow with minimal UI
// ============================================

import { useState, useEffect } from 'react';
import { Screen } from '../App';
import { X, ArrowLeft, Check, Loader2 } from 'lucide-react';
import { User } from '../types';
import { useKYC } from '../hooks/useKYC';
import { KYCStep1, KYCStep2, KYCStep3, KYCStep4, KYCSuccess } from './kyc';

interface KYCScreenProps {
  navigateTo: (screen: Screen) => void;
  onComplete: () => void;
  user: User | null;
}

export function KYCScreen({ navigateTo, onComplete, user }: KYCScreenProps) {
  const kyc = useKYC();
  const [showSuccess, setShowSuccess] = useState(false);
  
  useEffect(() => {
    if (user?.id) {
      kyc.loadProgress(user.id);
    }
  }, [user?.id]);

  const steps = [
    { id: 1, title: 'Personal Information', subtitle: 'Enter your details as shown on your MyKad' },
    { id: 2, title: 'Upload MyKad', subtitle: 'Take clear photos of your identification card' },
    { id: 3, title: 'Face Verification', subtitle: 'Quick selfie to verify your identity' },
    { id: 4, title: 'Link Gig Accounts', subtitle: 'Connect your platforms to build your RyScore' },
  ];

  const currentStepInfo = steps[kyc.currentStep - 1];

  const handleNext = async () => {
    if (!user?.id) return;
    const success = await kyc.submitCurrentStep(user.id);
    if (success && kyc.currentStep === 4) {
      setShowSuccess(true);
    }
  };

  const handleBack = () => {
    if (kyc.currentStep > 1) {
      kyc.prevStep();
    } else {
      navigateTo('dashboard');
    }
  };

  const handleSkip = () => {
    navigateTo('dashboard');
  };

  const handleSuccessContinue = () => {
    onComplete();
  };

  // Show success screen
  if (showSuccess || kyc.verificationStatus === 'verified') {
    return (
      <KYCSuccess
        ryscore={kyc.ryscore}
        userName={kyc.formData.step1.fullName || user?.fullName || 'User'}
        onContinue={handleSuccessContinue}
      />
    );
  }

  const isCurrentStepValid = (): boolean => {
    const validation = kyc.validateCurrentStep();
    return validation.isValid;
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
        <button
          onClick={handleBack}
          className="w-10 h-10 flex items-center justify-center"
        >
          {kyc.currentStep === 1 ? (
            <X className="w-6 h-6 text-black" />
          ) : (
            <ArrowLeft className="w-6 h-6 text-black" />
          )}
        </button>
        <div className="flex-1 text-center">
          <span className="text-sm text-gray-500">Step {kyc.currentStep} of 4</span>
        </div>
        <button
          onClick={handleSkip}
          className="px-4 py-2 text-gray-500 text-sm font-medium"
        >
          Skip
        </button>
      </div>

      {/* Progress Bar */}
      <div className="px-6 py-4">
        <div className="flex gap-2">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex-1 h-1 rounded-full transition-all duration-300 ${
                index < kyc.currentStep
                  ? 'bg-black'
                  : index === kyc.currentStep - 1
                    ? 'bg-black'
                    : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Title */}
      <div className="px-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          {currentStepInfo?.title}
        </h1>
        <p className="text-gray-500">
          {currentStepInfo?.subtitle}
        </p>
      </div>

      {/* Content Area */}
      <div className="flex-1 px-6 overflow-y-auto">
        {kyc.currentStep === 1 && (
          <KYCStep1
            data={kyc.formData.step1}
            onUpdate={kyc.updateStep1Data}
            error={kyc.error}
          />
        )}

        {kyc.currentStep === 2 && (
          <KYCStep2
            data={kyc.formData.step2}
            onUpdate={kyc.updateStep2Data}
            error={kyc.error}
          />
        )}

        {kyc.currentStep === 3 && (
          <KYCStep3
            data={kyc.formData.step3}
            onUpdate={kyc.updateStep3Data}
            error={kyc.error}
          />
        )}

        {kyc.currentStep === 4 && (
          <KYCStep4
            data={kyc.formData.step4}
            onUpdate={() => {}}
            onAddPlatform={kyc.addPlatform}
            onRemovePlatform={kyc.removePlatform}
            error={kyc.error}
            userId={user?.id || ''}
          />
        )}
      </div>

      {/* Bottom Button */}
      <div className="p-6 bg-white border-t border-gray-100">
        <button
          onClick={handleNext}
          disabled={kyc.isLoading || !isCurrentStepValid()}
          className="w-full py-4 bg-black text-white rounded-full font-semibold text-lg disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          {kyc.isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : kyc.currentStep === 4 ? (
            'Complete Verification'
          ) : (
            'Continue'
          )}
        </button>
      </div>
    </div>
  );
}
