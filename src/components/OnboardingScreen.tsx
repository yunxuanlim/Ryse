// ============================================
// Onboarding Screen - OBSIDIAN Neon-Noir Design
// Deep black background, neon green accents
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
    <div className="h-full flex flex-col bg-obsidian-100">
      {/* Skip Button - Top Right */}
      <div className="flex justify-end px-6 pt-4">
        <button
          onClick={onLogin}
          className="text-white-low text-sm font-medium hover:text-white-high transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {/* Icon with Neon Circle */}
        <div className="mb-8 relative">
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center glow-neon-md"
            style={{ backgroundColor: 'var(--neon-primary)' }}
          >
            <Icon className="w-10 h-10 text-obsidian-100" strokeWidth={1.5} />
          </div>
          {/* Decorative sparkles */}
          <div className="absolute -top-2 -right-2 text-2xl animate-particle-float">✨</div>
          <div className="absolute -bottom-1 -left-2 text-xl animate-particle-float" style={{ animationDelay: '0.5s' }}>⭐</div>
        </div>

        {/* Title & Description */}
        <h1 className="text-3xl font-bold text-white-high text-center mb-3 tracking-tight">
          {currentStep.title}
        </h1>
        <p className="text-neon text-center mb-3 text-lg font-medium">
          {currentStep.subtitle}
        </p>
        <p className="text-white-low text-center max-w-sm text-base leading-relaxed">
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
            variant="neon"
          >
            Next
          </PillButton>
        ) : (
          <div className="space-y-3">
            <PillButton
              onClick={onNavigateToLogin || onLogin}
              className="w-full"
              size="lg"
              variant="neon"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              Get Started
            </PillButton>
            <button
              onClick={onLogin}
              className="w-full py-4 text-white-low font-medium text-base hover:text-white-high transition-colors"
            >
              Already have an account? <span className="text-neon font-semibold">Log In</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
