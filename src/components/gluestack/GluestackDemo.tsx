// ============================================
// Gluestack Components Demo - Project Obsidian
// Showcase all RYSE components with Neon-Noir theme
// ============================================

import { useState } from 'react';
import { ScoreRing, ScoreRingCompact } from './ScoreRing';
import { VoiceFloatingButton } from './VoiceFloatingButton';
import { LoanSelector, LoanSelectorCompact } from './LoanSelector';
import { HeroSection } from './HeroSection';

// Obsidian Theme Colors
const COLORS = {
  obsidian100: '#060606',
  obsidian200: '#121212',
  neonPrimary: '#39FF14',
  neonDim: '#1B7A0F',
  whiteHigh: '#FFFFFF',
  whiteMedium: 'rgba(255,255,255,0.87)',
  whiteLow: 'rgba(255,255,255,0.60)',
  scoreGreen: '#39FF14',
  scoreYellow: '#FFD300',
  scoreRed: '#FF4444',
};

export function GluestackDemo() {
  const [loanAmount, setLoanAmount] = useState(500);

  return (
    <div className="min-h-screen pb-32" style={{ backgroundColor: COLORS.obsidian100 }}>
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
            style={{ color: COLORS.neonPrimary, textShadow: `0 0 20px ${COLORS.neonPrimary}50` }}
          >
            RYSE Obsidian Components
          </h1>
          <p style={{ color: COLORS.whiteLow }} className="text-sm">Component library showcase</p>
        </div>

        {/* ScoreRing Section */}
        <section 
          className="rounded-3xl p-6 shadow-lg"
          style={{ 
            backgroundColor: COLORS.obsidian200,
            border: `1px solid ${COLORS.neonDim}`,
          }}
        >
          <h2 className="text-lg font-semibold mb-4" style={{ color: COLORS.whiteHigh }}>ScoreRing</h2>
          <p className="text-sm mb-6" style={{ color: COLORS.whiteLow }}>
            Circular progress indicator with score color-coding
          </p>
          
          {/* Size Variations */}
          <div className="flex justify-center gap-6 mb-8">
            <div className="text-center">
              <ScoreRing score={720} size="md" />
              <p className="text-xs mt-4" style={{ color: COLORS.whiteLow }}>Default (720)</p>
            </div>
          </div>

          {/* Color Variations */}
          <div className="flex justify-around">
            <div className="text-center">
              <ScoreRing score={780} size="sm" />
              <p className="text-xs mt-2" style={{ color: COLORS.whiteLow }}>Green (&gt;700)</p>
            </div>
            <div className="text-center">
              <ScoreRing score={600} size="sm" />
              <p className="text-xs mt-2" style={{ color: COLORS.whiteLow }}>Yellow (&gt;500)</p>
            </div>
            <div className="text-center">
              <ScoreRing score={450} size="sm" />
              <p className="text-xs mt-2" style={{ color: COLORS.whiteLow }}>Red (≤500)</p>
            </div>
          </div>

          {/* Compact Version */}
          <div className="mt-6 pt-6" style={{ borderTop: `1px solid ${COLORS.obsidian100}` }}>
            <p className="text-sm mb-3" style={{ color: COLORS.whiteMedium }}>Compact version:</p>
            <div className="flex items-center gap-3">
              <ScoreRingCompact score={720} />
              <span style={{ color: COLORS.whiteMedium }}>Your RyScore</span>
            </div>
          </div>
        </section>

        {/* LoanSelector Section */}
        <section>
          <h2 className="text-lg font-semibold mb-4" style={{ color: COLORS.whiteHigh }}>LoanSelector</h2>
          <p className="text-sm mb-4" style={{ color: COLORS.whiteLow }}>
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
            <p className="text-sm mb-3" style={{ color: COLORS.whiteMedium }}>Compact version:</p>
            <LoanSelectorCompact
              initialAmount={500}
              onAmountChange={(amount) => console.log('Amount:', amount)}
            />
          </div>
        </section>

        {/* Theme Colors */}
        <section 
          className="rounded-3xl p-6 shadow-lg"
          style={{ 
            backgroundColor: COLORS.obsidian200,
            border: `1px solid ${COLORS.neonDim}`,
          }}
        >
          <h2 className="text-lg font-semibold mb-4" style={{ color: COLORS.whiteHigh }}>Obsidian Palette</h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm mb-2" style={{ color: COLORS.whiteMedium }}>Neon Primary (#39FF14)</p>
              <div 
                className="h-12 rounded-xl flex items-center justify-center font-medium"
                style={{ 
                  backgroundColor: COLORS.neonPrimary, 
                  color: COLORS.obsidian100,
                  boxShadow: `0 0 20px ${COLORS.neonPrimary}50`,
                }}
              >
                Actions & Highlights
              </div>
            </div>
            
            <div>
              <p className="text-sm mb-2" style={{ color: COLORS.whiteMedium }}>Obsidian Surface (#121212)</p>
              <div 
                className="h-12 rounded-xl flex items-center justify-center font-medium"
                style={{ 
                  backgroundColor: COLORS.obsidian100, 
                  color: COLORS.whiteHigh,
                  border: `1px solid ${COLORS.neonDim}`,
                }}
              >
                Cards & Surfaces
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div 
                className="h-10 rounded-lg flex items-center justify-center text-xs"
                style={{ backgroundColor: COLORS.scoreGreen, color: COLORS.obsidian100 }}
              >
                Score Green
              </div>
              <div 
                className="h-10 rounded-lg flex items-center justify-center text-xs"
                style={{ backgroundColor: COLORS.scoreYellow, color: COLORS.obsidian100 }}
              >
                Score Yellow
              </div>
              <div 
                className="h-10 rounded-lg flex items-center justify-center text-xs"
                style={{ backgroundColor: COLORS.scoreRed, color: COLORS.whiteHigh }}
              >
                Alert Red
              </div>
            </div>
          </div>
        </section>

        {/* VoiceFloatingButton Note */}
        <section 
          className="rounded-3xl p-6 shadow-lg"
          style={{ 
            backgroundColor: COLORS.obsidian200,
            border: `1px solid ${COLORS.neonDim}`,
          }}
        >
          <h2 className="text-lg font-semibold mb-4" style={{ color: COLORS.whiteHigh }}>VoiceFloatingButton</h2>
          <p className="text-sm mb-4" style={{ color: COLORS.whiteLow }}>
            Floating action button with modal. Look at the bottom-right corner! 👉
          </p>
          <div 
            className="p-4 rounded-xl text-center"
            style={{ backgroundColor: `${COLORS.neonPrimary}15` }}
          >
            <p className="text-sm" style={{ color: COLORS.neonPrimary }}>
              Press the neon button to open the voice assistant modal
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
