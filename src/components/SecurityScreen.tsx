// ============================================
// Security Screen - Cash App Inspired
// Clean white cards, black accents
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
    <div className="h-full flex flex-col bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigateTo('dashboard')}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-black" />
          </button>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">Ryse Shield</h2>
            <p className="text-gray-500 text-sm">AI Anti-Scam Protection</p>
          </div>
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--ryse-green, #B9FF00)' }}
          >
            <Shield className="w-5 h-5 text-black" />
          </div>
        </div>
      </div>

      {/* Status Card */}
      <div className="px-4 pt-4">
        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center">
              <Shield className="w-7 h-7 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900">All Systems Active</h3>
              <p className="text-green-600 text-sm font-medium">8 protection layers enabled</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4">
            <p className="text-gray-500 text-sm mb-1">Threats Blocked This Month</p>
            <div className="text-3xl font-bold text-gray-900">270</div>
          </div>
        </div>
      </div>

      {/* Protection Layers */}
      <div className="px-4 py-4">
        <h3 className="text-gray-900 font-semibold mb-3">Protection Layers</h3>
        <div className="space-y-2">
          {securityFeatures.map((feature) => {
            const isExpanded = activeDemo === feature.id;
            return (
              <div
                key={feature.id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setActiveDemo(isExpanded ? null : feature.id)}
                  className="w-full p-4 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">{feature.emoji}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-gray-900 font-medium">{feature.name}</h4>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      <p className="text-gray-500 text-sm">{feature.description}</p>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      {feature.id === 'liveness' && (
                        <>
                          <p className="text-gray-700 text-sm font-medium mb-3">Detection Indicators:</p>
                          <div className="space-y-2">
                            {['Background noise variation', 'Natural breathing sounds', 'Complex audio spectrum'].map((item, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span className="text-sm text-gray-600">{item}</span>
                              </div>
                            ))}
                          </div>
                        </>
                      )}

                      {feature.id === 'challenge' && (
                        <>
                          <p className="text-gray-700 text-sm font-medium mb-3">Example Challenges:</p>
                          <div className="space-y-2 text-sm text-gray-600">
                            <p>"Please state your mother's maiden name"</p>
                            <p>"What time is it now?"</p>
                            <p>"What is 15 plus 23?"</p>
                          </div>
                        </>
                      )}

                      {feature.id === 'behavioral' && (
                        <>
                          <p className="text-gray-700 text-sm font-medium mb-3">Your Speech Profile:</p>
                          <div className="space-y-2">
                            {[
                              { label: 'Average speed', value: '140 words/min' },
                              { label: 'Thinking sound', value: '"emmm"' },
                              { label: 'Verbal tic', value: 'Adds "lah"' }
                            ].map((item, i) => (
                              <div key={i} className="flex justify-between text-sm">
                                <span className="text-gray-500">{item.label}</span>
                                <span className="text-gray-900 font-medium">{item.value}</span>
                              </div>
                            ))}
                          </div>
                        </>
                      )}

                      {feature.id === 'mfa' && (
                        <>
                          <p className="text-gray-700 text-sm font-medium mb-3">Risk-Based Verification:</p>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-gray-500 mb-2">Low Risk (RM 10)</p>
                              <div className="flex gap-2">
                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">Voice</span>
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-2">High Risk (RM 2000+)</p>
                              <div className="flex gap-2 flex-wrap">
                                {['Voice', 'Liveness', 'Challenge', 'Fingerprint', 'OTP'].map((item, i) => (
                                  <span key={i} className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-medium">{item}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Scam Pattern Recognition */}
      <div className="px-4 pb-4">
        <h3 className="text-gray-900 font-semibold mb-3">Scam Pattern Recognition</h3>
        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <p className="text-gray-500 text-sm mb-4">Detected & blocked this month:</p>
          <div className="space-y-4">
            {scamPatterns.map((pattern, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{pattern.emoji}</span>
                    <span className="text-gray-800 font-medium">{pattern.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-900 font-semibold">{pattern.blocked}</span>
                    <span className={pattern.trend === 'up' ? 'text-red-500' : 'text-green-500'}>
                      {pattern.trend === 'up' ? '↑' : '↓'}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div 
                    className="bg-black h-2 rounded-full"
                    style={{ width: `${(pattern.blocked / 150) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Example Scam Alert */}
      <div className="px-4 pb-24">
        <h3 className="text-gray-900 font-semibold mb-3">How Shield Works</h3>
        <div className="bg-red-50 rounded-3xl p-5 border border-red-100">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h4 className="text-gray-900 font-semibold mb-1">Example Scam Detected</h4>
              <p className="text-gray-600 text-sm">"Transfer RM800, police said my account has issues"</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4">
            <p className="text-red-600 font-semibold mb-2">🚨 SCAM ALERT!</p>
            <p className="text-gray-700 text-sm mb-3">Real police or banks NEVER:</p>
            <ul className="space-y-1 text-gray-600 text-sm mb-3">
              <li>✗ Ask you to transfer money</li>
              <li>✗ Request money via phone</li>
              <li>✗ Threaten arrest</li>
            </ul>
            <p className="text-gray-700 text-sm font-medium">💡 Hang up, dial 999 or visit police station</p>
          </div>
        </div>
      </div>
    </div>
  );
}
