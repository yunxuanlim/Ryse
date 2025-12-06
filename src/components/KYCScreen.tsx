// ============================================
// KYC Screen - OBSIDIAN Neon-Noir Design
// Deep black background, neon green accents
// ============================================

import { useState, useEffect } from 'react';
import { Screen } from '../App';
import { X, ArrowLeft } from 'lucide-react';
import { User } from '../types';
import { useKYC } from '../hooks/useKYC';
import { KYCStep1, KYCStep2, KYCStep3, KYCStep4, KYCSuccess } from './kyc';
import { PillButton } from './ui/pill-button';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const steps = [
    { id: 1, title: 'Personal Info', icon: '👤' },
    { id: 2, title: 'ID Upload', icon: '🪪' },
    { id: 3, title: 'Face Verify', icon: '📸' },
    { id: 4, title: 'Link Accounts', icon: '🔗' },
  ];

  const currentStepInfo = steps[kyc.currentStep - 1];

  const handleNext = async () => {
    if (!user?.id) return;
    const currentStepBeforeSubmit = kyc.currentStep;
    const success = await kyc.submitCurrentStep(user.id);
    if (success && currentStepBeforeSubmit === 4) {
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
    <div className="h-full flex flex-col bg-obsidian-100">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b" style={{ borderColor: 'var(--white-divider)' }}>
        <button
          onClick={handleBack}
          className="w-10 h-10 flex items-center justify-center hover:bg-obsidian-300 rounded-full transition-colors"
        >
          {kyc.currentStep === 1 ? (
            <X className="w-6 h-6 text-white-high" />
          ) : (
            <ArrowLeft className="w-6 h-6 text-white-high" />
          )}
        </button>
        <div className="flex-1 text-center">
          <span className="text-sm text-white-low font-medium">
            Step {kyc.currentStep} of 4
          </span>
        </div>
        <button
          onClick={handleSkip}
          className="px-4 py-2 text-white-low text-sm font-medium hover:text-white-high transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Progress Indicators */}
      <div className="px-6 py-4">
        <div className="flex gap-2 mb-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${
                step.id <= kyc.currentStep ? 'bg-neon glow-neon-sm' : 'bg-obsidian-400'
              }`}
            />
          ))}
        </div>
        
        {/* Step Info */}
        <div className="flex items-center gap-3">
          <div 
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl glow-neon-sm"
            style={{ backgroundColor: 'var(--neon-primary)' }}
          >
            {currentStepInfo?.icon}
          </div>
          <div>
            <h1 className="text-xl font-bold text-white-high">
              {currentStepInfo?.title}
            </h1>
            <p className="text-white-low text-sm">
              {kyc.currentStep === 1 && 'Enter your details as shown on MyKad'}
              {kyc.currentStep === 2 && 'Take clear photos of your ID'}
              {kyc.currentStep === 3 && 'Quick selfie to verify identity'}
              {kyc.currentStep === 4 && 'Connect your gig platforms'}
            </p>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 px-6 overflow-y-auto scrollbar-obsidian">
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
      <div className="p-6 bg-obsidian-200 border-t" style={{ borderColor: 'var(--white-divider)' }}>
        <PillButton
          onClick={handleNext}
          disabled={kyc.isLoading || !isCurrentStepValid()}
          isLoading={kyc.isLoading}
          className="w-full"
          size="lg"
          variant="neon"
        >
          {kyc.currentStep === 4 ? 'Complete Verification' : 'Continue'}
        </PillButton>
      </div>
    </div>
  );
}
