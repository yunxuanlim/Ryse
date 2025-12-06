import { useState } from 'react';
import { Sparkles, Shield, TrendingUp, Zap } from 'lucide-react';

interface OnboardingScreenProps {
  onLogin: () => void;
}

export function OnboardingScreen({ onLogin }: OnboardingScreenProps) {
  const [step, setStep] = useState(0);

  const onboardingSteps = [
    {
      icon: Sparkles,
      title: 'Welcome to RYSE',
      subtitle: 'AI-Powered Banking for Gig Workers',
      description: 'Your hustle is your credit. Bank smarter with AI.',
      gradient: 'from-purple-500 to-blue-500'
    },
    {
      icon: TrendingUp,
      title: 'RyScore Credit',
      subtitle: 'Build Credit with Every Gig',
      description: 'Connect your Grab, Foodpanda, Shopee accounts to unlock instant credit.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Shield,
      title: 'Ryse Shield Pro',
      subtitle: 'AI Anti-Scam Protection',
      description: 'Advanced deepfake detection and multi-layer security keeps your money safe.',
      gradient: 'from-cyan-500 to-teal-500'
    }
  ];

  const currentStep = onboardingSteps[step];
  const Icon = currentStep.icon;

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-50 to-purple-50">
      {/* Hero Section */}
      <div className={`flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-br ${currentStep.gradient} relative overflow-hidden`}>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        </div>

        {/* Icon with Animation */}
        <div className="relative mb-8 animate-bounce">
          <div className="w-32 h-32 bg-white/20 backdrop-blur-xl rounded-[32px] flex items-center justify-center shadow-2xl">
            <Icon className="w-16 h-16 text-white" strokeWidth={1.5} />
          </div>
          <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white/30 rounded-full blur-xl"></div>
        </div>

        <h1 className="text-white text-center mb-3 tracking-tight">{currentStep.title}</h1>
        <p className="text-white/90 text-center mb-2">{currentStep.subtitle}</p>
        <p className="text-white/70 text-center max-w-xs text-sm">{currentStep.description}</p>
      </div>

      {/* Bottom Section */}
      <div className="p-8 bg-white">
        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mb-6">
          {onboardingSteps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === step ? 'w-8 bg-purple-500' : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Buttons */}
        {step < onboardingSteps.length - 1 ? (
          <div className="space-y-3">
            <button
              onClick={() => setStep(step + 1)}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl transition-transform active:scale-95 shadow-lg"
            >
              Continue
            </button>
            <button
              onClick={onLogin}
              className="w-full py-4 text-gray-600 rounded-2xl transition-colors hover:bg-gray-100"
            >
              Skip
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <button
              onClick={onLogin}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl transition-transform active:scale-95 shadow-lg"
            >
              Get Started
            </button>
            <button
              onClick={onLogin}
              className="w-full py-4 text-gray-600 rounded-2xl transition-colors hover:bg-gray-100"
            >
              Already have an account? Log In
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
