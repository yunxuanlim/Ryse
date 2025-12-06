// ============================================
// Gluestack Components Demo
// Showcase all RYSE Gluestack-style components
// ============================================

import { useState } from 'react';
import { ScoreRing, ScoreRingCompact } from './ScoreRing';
import { VoiceFloatingButton } from './VoiceFloatingButton';
import { LoanSelector, LoanSelectorCompact } from './LoanSelector';
import { HeroSection } from './HeroSection';
import { RyseTheme } from './theme';

export function GluestackDemo() {
  const [loanAmount, setLoanAmount] = useState(500);

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Hero Section */}
      <HeroSection
        userName="Ahmad Razak"
        ryScore={720}
        totalEarnings={1240.00}
        earningsTrend={12}
        trendPeriod="this week"
        onRyScorePress={() => alert('Navigate to RyScore screen')}
        onBalancePress={() => alert('Navigate to earnings breakdown')}
      />

      <div className="max-w-md mx-auto space-y-8 px-6 pt-6">
        {/* Header */}
        <div className="text-center">
          <h1 
            className="text-2xl font-bold mb-2"
            style={{ color: RyseTheme.colors.primary[500] }}
          >
            RYSE Gluestack Components
          </h1>
          <p className="text-gray-500 text-sm">Component library showcase</p>
        </div>

        {/* ScoreRing Section */}
        <section className="bg-white rounded-3xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">ScoreRing</h2>
          <p className="text-gray-500 text-sm mb-6">
            Circular progress indicator with score color-coding
          </p>
          
          {/* Size Variations */}
          <div className="flex justify-center gap-6 mb-8">
            <div className="text-center">
              <ScoreRing score={720} size="md" />
              <p className="text-xs text-gray-500 mt-4">Default (720)</p>
            </div>
          </div>

          {/* Color Variations */}
          <div className="flex justify-around">
            <div className="text-center">
              <ScoreRing score={780} size="sm" />
              <p className="text-xs text-gray-500 mt-2">Green (&gt;700)</p>
            </div>
            <div className="text-center">
              <ScoreRing score={600} size="sm" />
              <p className="text-xs text-gray-500 mt-2">Yellow (&gt;500)</p>
            </div>
            <div className="text-center">
              <ScoreRing score={450} size="sm" />
              <p className="text-xs text-gray-500 mt-2">Red (≤500)</p>
            </div>
          </div>

          {/* Compact Version */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-600 mb-3">Compact version:</p>
            <div className="flex items-center gap-3">
              <ScoreRingCompact score={720} />
              <span className="text-gray-700">Your RyScore</span>
            </div>
          </div>
        </section>

        {/* LoanSelector Section */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">LoanSelector</h2>
          <p className="text-gray-500 text-sm mb-4">
            Loan amount selector with repayment calculation
          </p>
          
          <LoanSelector
            initialAmount={loanAmount}
            onAmountChange={setLoanAmount}
            onApply={(amount, repayment) => {
              alert(`Applied for RM${amount} with weekly repayment of RM${repayment}`);
            }}
          />

          {/* Compact Version */}
          <div className="mt-6">
            <p className="text-sm text-gray-600 mb-3">Compact version:</p>
            <LoanSelectorCompact
              initialAmount={500}
              onAmountChange={(amount) => console.log('Amount:', amount)}
            />
          </div>
        </section>

        {/* Theme Colors */}
        <section className="bg-white rounded-3xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Brand Colors</h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">Primary Blue (#0052FF)</p>
              <div 
                className="h-12 rounded-xl flex items-center justify-center text-white font-medium"
                style={{ backgroundColor: RyseTheme.colors.primary[500] }}
              >
                Headers & CTAs
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-2">Accent Yellow (#FFD300)</p>
              <div 
                className="h-12 rounded-xl flex items-center justify-center text-black font-medium"
                style={{ backgroundColor: RyseTheme.colors.accent[500] }}
              >
                Voice Button & Highlights
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div 
                className="h-10 rounded-lg flex items-center justify-center text-white text-xs"
                style={{ backgroundColor: RyseTheme.colors.success.main }}
              >
                Success
              </div>
              <div 
                className="h-10 rounded-lg flex items-center justify-center text-black text-xs"
                style={{ backgroundColor: RyseTheme.colors.warning.main }}
              >
                Warning
              </div>
              <div 
                className="h-10 rounded-lg flex items-center justify-center text-white text-xs"
                style={{ backgroundColor: RyseTheme.colors.error.main }}
              >
                Error
              </div>
            </div>
          </div>
        </section>

        {/* VoiceFloatingButton Note */}
        <section className="bg-white rounded-3xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">VoiceFloatingButton</h2>
          <p className="text-gray-500 text-sm mb-4">
            Floating action button with modal. Look at the bottom-right corner! 👉
          </p>
          <div 
            className="p-4 rounded-xl text-center"
            style={{ backgroundColor: RyseTheme.colors.accent[100] }}
          >
            <p className="text-sm" style={{ color: RyseTheme.colors.accent[700] }}>
              Press the yellow button to open the voice assistant modal
            </p>
          </div>
        </section>
      </div>

      {/* Voice Floating Button */}
      <VoiceFloatingButton
        onStartListening={() => console.log('Started listening')}
        onStopListening={() => console.log('Stopped listening')}
        onTranscript={(text) => console.log('Transcript:', text)}
      />
    </div>
  );
}

export default GluestackDemo;

