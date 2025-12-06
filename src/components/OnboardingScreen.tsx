// ============================================
// Onboarding Screen - Cash App Inspired
// Clean, minimal with green accent icons
// ============================================

import { useState } from 'react';
import { Sparkles, Shield, TrendingUp, ArrowRight } from 'lucide-react';
import { PillButton } from './ui/pill-button';
import { ProgressDots } from './ui/progress-dots';

interface OnboardingScreenProps {
  onLogin: () => void;
  onNavigateToLogin?: () => void;
}

export function OnboardingScreen({ onLogin, onNavigateToLogin }: OnboardingScreenProps) {
  const [step, setStep] = useState(0);

  const onboardingSteps = [
    {
      icon: Sparkles,
      title: 'Welcome to RYSE',
      subtitle: 'AI-Powered Banking for Gig Workers',
      description: 'Your hustle is your credit. Bank smarter with AI that understands your income.',
    },
    {
      icon: TrendingUp,
      title: 'Build Your RyScore',
      subtitle: 'Credit Without Credit History',
      description: 'Connect your Grab, Foodpanda, or Shopee accounts to unlock instant credit.',
    },
    {
      icon: Shield,
      title: 'Stay Protected',
      subtitle: 'AI-Powered Security',
      description: 'Advanced scam detection and multi-layer security keeps your money safe.',
    }
  ];

  const currentStep = onboardingSteps[step];
  const Icon = currentStep.icon;

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Skip Button - Top Right */}
      <div className="flex justify-end px-6 pt-4">
        <button
          onClick={onLogin}
          className="text-gray-500 text-sm font-medium hover:text-gray-700 transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {/* Icon with Green Circle */}
        <div className="mb-8 relative">
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--ryse-green, #B9FF00)' }}
          >
            <Icon className="w-10 h-10 text-black" strokeWidth={1.5} />
          </div>
          {/* Decorative sparkles */}
          <div className="absolute -top-2 -right-2 text-2xl">✨</div>
          <div className="absolute -bottom-1 -left-2 text-xl">⭐</div>
        </div>

        {/* Title & Description */}
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-3 tracking-tight">
          {currentStep.title}
        </h1>
        <p className="text-gray-600 text-center mb-3 text-lg font-medium">
          {currentStep.subtitle}
        </p>
        <p className="text-gray-400 text-center max-w-sm text-base leading-relaxed">
          {currentStep.description}
        </p>
      </div>

      {/* Bottom Section */}
      <div className="px-8 pb-8">
        {/* Progress Dots */}
        <div className="mb-8">
          <ProgressDots 
            total={onboardingSteps.length} 
            current={step}
            onDotClick={setStep}
          />
        </div>

        {/* Buttons */}
        {step < onboardingSteps.length - 1 ? (
          <PillButton
            onClick={() => setStep(step + 1)}
            className="w-full"
            size="lg"
          >
            Next
          </PillButton>
        ) : (
          <div className="space-y-3">
            <PillButton
              onClick={onNavigateToLogin || onLogin}
              className="w-full"
              size="lg"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              Get Started
            </PillButton>
            <button
              onClick={onLogin}
              className="w-full py-4 text-gray-600 font-medium text-base hover:text-gray-900 transition-colors"
            >
              Already have an account? <span className="text-black font-semibold">Log In</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
