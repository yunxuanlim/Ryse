import { useState } from 'react';
import { Sparkles, Shield, TrendingUp, ChevronRight, ArrowRight } from 'lucide-react';

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
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={onLogin}
          className="px-4 py-2 text-gray-500 text-sm font-medium"
        >
          Skip
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pt-16">
        {/* Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center">
            <Icon className="w-12 h-12 text-white" strokeWidth={1.5} />
          </div>
        </div>

        {/* Title & Description */}
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-3 tracking-tight">
          {currentStep.title}
        </h1>
        <p className="text-gray-600 text-center mb-3 text-lg">
          {currentStep.subtitle}
        </p>
        <p className="text-gray-400 text-center max-w-sm text-base leading-relaxed">
          {currentStep.description}
        </p>
      </div>

      {/* Bottom Section */}
      <div className="p-8">
        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mb-8">
          {onboardingSteps.map((_, index) => (
            <button
              key={index}
              onClick={() => setStep(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === step 
                  ? 'w-8 bg-black' 
                  : index < step 
                    ? 'bg-black' 
                    : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Buttons */}
        {step < onboardingSteps.length - 1 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="w-full py-4 bg-black text-white rounded-full font-semibold text-lg transition-all active:scale-[0.98]"
          >
            Next
          </button>
        ) : (
          <div className="space-y-3">
            <button
              onClick={onNavigateToLogin || onLogin}
              className="w-full py-4 bg-black text-white rounded-full font-semibold text-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={onLogin}
              className="w-full py-4 text-gray-600 font-medium text-base"
            >
              Already have an account? <span className="text-black font-semibold">Log In</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
