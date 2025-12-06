import { useState } from 'react';
import { Screen } from '../App';
import { ArrowLeft, Shield, Mic, AlertTriangle, CheckCircle, Lock, Fingerprint, Eye } from 'lucide-react';

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
      color: 'from-purple-500 to-blue-500',
      status: 'active'
    },
    {
      id: 'challenge',
      name: 'Random Challenge-Response',
      description: 'Random questions that deepfakes can\'t answer',
      icon: AlertTriangle,
      color: 'from-blue-500 to-cyan-500',
      status: 'active'
    },
    {
      id: 'behavioral',
      name: 'Behavioral Biometrics',
      description: 'Analyzes your unique speech patterns',
      icon: Eye,
      color: 'from-cyan-500 to-teal-500',
      status: 'active'
    },
    {
      id: 'mfa',
      name: 'Adaptive Multi-Factor Auth',
      description: 'Risk-based verification layers',
      icon: Lock,
      color: 'from-teal-500 to-green-500',
      status: 'active'
    }
  ];

  const scamPatterns = [
    { type: 'Fake Police', blocked: 127, trend: 'up' },
    { type: 'Fake Investment', blocked: 89, trend: 'down' },
    { type: 'Fake Family Emergency', blocked: 54, trend: 'up' }
  ];

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-purple-50 via-white to-blue-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-6 rounded-b-3xl shadow-xl">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigateTo('dashboard')}
            className="w-10 h-10 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h2 className="text-white">Ryse Shield Pro</h2>
            <p className="text-purple-200 text-sm">AI Anti-Scam Protection</p>
          </div>
        </div>

        {/* Protection Status */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-white">All Systems Active</h3>
              <p className="text-green-200">8 protection layers enabled</p>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-purple-200 text-sm mb-1">Threats Blocked This Month</p>
            <div className="text-white text-3xl">270</div>
          </div>
        </div>
      </div>

      {/* Protection Layers */}
      <div className="px-6 py-6">
        <h3 className="text-gray-900 mb-4">Protection Layers</h3>
        <div className="space-y-3">
          {securityFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <button
                key={feature.id}
                onClick={() => setActiveDemo(activeDemo === feature.id ? null : feature.id)}
                className="w-full bg-white rounded-2xl p-5 shadow-lg border border-gray-100 text-left"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-gray-900">{feature.name}</h4>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>

                {activeDemo === feature.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    {feature.id === 'liveness' && (
                      <div className="bg-purple-50 rounded-xl p-4">
                        <p className="text-purple-900 text-sm mb-3">Detection Indicators:</p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-gray-700">Background noise variation</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-gray-700">Natural breathing sounds</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-gray-700">Complex audio spectrum</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {feature.id === 'challenge' && (
                      <div className="bg-blue-50 rounded-xl p-4">
                        <p className="text-blue-900 text-sm mb-3">Example Challenge:</p>
                        <div className="space-y-2 text-sm">
                          <p className="text-gray-700"><span className="text-blue-600">AI:</span> "Please state your mother's maiden name"</p>
                          <p className="text-gray-700"><span className="text-blue-600">AI:</span> "What time is it now?"</p>
                          <p className="text-gray-700"><span className="text-blue-600">AI:</span> "What is 15 plus 23?"</p>
                        </div>
                      </div>
                    )}

                    {feature.id === 'behavioral' && (
                      <div className="bg-cyan-50 rounded-xl p-4">
                        <p className="text-cyan-900 text-sm mb-3">Your Speech Profile:</p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-700">Average speed</span>
                            <span className="text-cyan-700">140 words/min</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-700">Common thinking sound</span>
                            <span className="text-cyan-700">"emmm"</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-700">Verbal tic</span>
                            <span className="text-cyan-700">Adds "lah"</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {feature.id === 'mfa' && (
                      <div className="bg-teal-50 rounded-xl p-4">
                        <p className="text-teal-900 text-sm mb-3">Risk-Based Verification:</p>
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs text-teal-700 mb-1">Low Risk (RM 10)</p>
                            <div className="flex gap-2">
                              <div className="px-2 py-1 bg-green-500 rounded text-white text-xs">Voice</div>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-teal-700 mb-1">High Risk (RM 2000)</p>
                            <div className="flex gap-2 flex-wrap">
                              <div className="px-2 py-1 bg-orange-500 rounded text-white text-xs">Voice</div>
                              <div className="px-2 py-1 bg-orange-500 rounded text-white text-xs">Liveness</div>
                              <div className="px-2 py-1 bg-orange-500 rounded text-white text-xs">Challenge</div>
                              <div className="px-2 py-1 bg-orange-500 rounded text-white text-xs">Fingerprint</div>
                              <div className="px-2 py-1 bg-orange-500 rounded text-white text-xs">OTP</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Scam Pattern Recognition */}
      <div className="px-6 pb-6">
        <h3 className="text-gray-900 mb-4">Scam Pattern Recognition</h3>
        <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
          <p className="text-gray-600 text-sm mb-4">Detected & blocked this month:</p>
          <div className="space-y-4">
            {scamPatterns.map((pattern, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-800">{pattern.type}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-900">{pattern.blocked}</span>
                    {pattern.trend === 'up' ? (
                      <div className="text-red-500">↑</div>
                    ) : (
                      <div className="text-green-500">↓</div>
                    )}
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full"
                    style={{ width: `${(pattern.blocked / 150) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Example Scam Alert */}
      <div className="px-6 pb-32">
        <h3 className="text-gray-900 mb-4">How Shield Pro Works</h3>
        <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-2xl p-5 border border-red-200">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-red-900 mb-1">Example Scam Detected</h4>
              <p className="text-red-700 text-sm">User: "Transfer RM800, police said my account has issues"</p>
            </div>
          </div>

          <div className="bg-white/50 rounded-xl p-4">
            <p className="text-red-900 mb-2">🚨 SCAM ALERT!</p>
            <p className="text-red-800 text-sm mb-3">Real police or banks NEVER:</p>
            <ul className="space-y-1 text-red-700 text-sm mb-3">
              <li>✗ Ask you to transfer money</li>
              <li>✗ Request money via phone</li>
              <li>✗ Threaten arrest</li>
            </ul>
            <p className="text-red-900 text-sm">Suggestion: Hang up, dial 999 or visit police station</p>
          </div>
        </div>
      </div>
    </div>
  );
}
