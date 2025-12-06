// ============================================
// Security Screen - OBSIDIAN Neon-Noir Design
// Deep black background with neon security visuals
// ============================================

import { useState } from 'react';
import { Screen } from '../App';
import { ArrowLeft, Shield, Mic, AlertTriangle, CheckCircle, Lock, Eye, ChevronDown, ChevronUp } from 'lucide-react';

interface SecurityScreenProps {
  navigateTo: (screen: Screen) => void;
}

export function SecurityScreen({ navigateTo }: SecurityScreenProps) {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  const securityFeatures = [
    {
      id: 'liveness',
      name: 'Voice Liveness Detection',
      description: 'Detects real human vs recorded/cloned audio',
      icon: Mic,
      emoji: '🎤',
      status: 'active'
    },
    {
      id: 'challenge',
      name: 'Random Challenge-Response',
      description: 'Random questions that deepfakes can\'t answer',
      icon: AlertTriangle,
      emoji: '🧠',
      status: 'active'
    },
    {
      id: 'behavioral',
      name: 'Behavioral Biometrics',
      description: 'Analyzes your unique speech patterns',
      icon: Eye,
      emoji: '👁️',
      status: 'active'
    },
    {
      id: 'mfa',
      name: 'Adaptive Multi-Factor Auth',
      description: 'Risk-based verification layers',
      icon: Lock,
      emoji: '🔐',
      status: 'active'
    }
  ];

  const scamPatterns = [
    { type: 'Fake Police', blocked: 127, trend: 'up', emoji: '👮' },
    { type: 'Fake Investment', blocked: 89, trend: 'down', emoji: '💰' },
    { type: 'Fake Family Emergency', blocked: 54, trend: 'up', emoji: '👨‍👩‍👧' }
  ];

  return (
    <div className="h-full flex flex-col bg-obsidian-100 overflow-y-auto scrollbar-obsidian">
      {/* Header */}
      <div className="bg-obsidian-200 px-6 py-4 border-b" style={{ borderColor: 'var(--white-divider)' }}>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigateTo('dashboard')}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-obsidian-300 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white-high" />
          </button>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white-high">Ryse Shield Pro</h2>
            <p className="text-white-low text-sm">AI-powered security</p>
          </div>
          <div className="w-10 h-10 rounded-full flex items-center justify-center glow-neon-md" style={{ backgroundColor: 'var(--neon-primary)' }}>
            <Shield className="w-5 h-5 text-obsidian-100" />
          </div>
        </div>
      </div>

      {/* Protection Status */}
      <div className="px-4 pt-4">
        <div className="card-neon-border text-center animate-neon-pulse">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 glow-neon-lg" style={{ backgroundColor: 'rgba(57, 255, 20, 0.2)' }}>
            <Shield className="w-8 h-8 text-neon" />
          </div>
          <h3 className="text-white-high font-bold text-lg mb-1">Fully Protected</h3>
          <p className="text-white-low text-sm">All security layers active</p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <CheckCircle className="w-4 h-4 text-neon" />
            <span className="text-neon text-sm font-medium">Voice Shield Active</span>
          </div>
        </div>
      </div>

      {/* Security Features */}
      <div className="px-4 pt-4">
        <h3 className="text-white-high font-semibold mb-3">Active Protection</h3>
        <div className="space-y-2">
          {securityFeatures.map((feature) => {
            const Icon = feature.icon;
            const isExpanded = activeDemo === feature.id;

            return (
              <div key={feature.id} className="card-obsidian">
                <button
                  onClick={() => setActiveDemo(isExpanded ? null : feature.id)}
                  className="w-full flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-obsidian-300">
                    {feature.emoji}
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="text-white-high font-medium text-sm">{feature.name}</h4>
                    <p className="text-white-muted text-xs">{feature.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-neon text-xs font-medium">Active</span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-white-low" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-white-low" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="mt-3 pt-3 border-t" style={{ borderColor: 'var(--white-divider)' }}>
                    <div className="bg-obsidian-300 rounded-lg p-3">
                      <p className="text-white-low text-xs">
                        {feature.id === 'liveness' && 'Uses AI to analyze voice patterns and detect pre-recorded audio or voice clones.'}
                        {feature.id === 'challenge' && 'Generates random questions that only a real person would know how to answer.'}
                        {feature.id === 'behavioral' && 'Tracks your unique speaking patterns to verify your identity.'}
                        {feature.id === 'mfa' && 'Adds extra verification steps based on transaction risk level.'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Scam Protection Stats */}
      <div className="px-4 pt-4 pb-24">
        <h3 className="text-white-high font-semibold mb-3">Threats Blocked</h3>
        <div className="card-obsidian">
          <div className="space-y-4">
            {scamPatterns.map((pattern, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-obsidian-300 rounded-xl flex items-center justify-center text-xl">
                  {pattern.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white-high text-sm font-medium">{pattern.type}</span>
                    <span className="text-neon text-sm font-mono">{pattern.blocked}</span>
                  </div>
                  <div className="w-full bg-obsidian-300 rounded-full h-1.5">
                    <div 
                      className="h-1.5 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${(pattern.blocked / 150) * 100}%`, 
                        backgroundColor: 'var(--neon-primary)' 
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--white-divider)' }}>
            <div className="flex items-center justify-between">
              <span className="text-white-low text-sm">Total blocked this month</span>
              <span className="text-neon font-bold font-mono-nums">270</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
