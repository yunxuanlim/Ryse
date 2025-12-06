// ============================================
// Dashboard Screen - OBSIDIAN Neon-Noir Design
// Deep black background, neon green accents
// ============================================

import { Screen } from '../App';
import { 
  Search,
  TrendingUp, 
  Shield, 
  ChevronRight,
  AlertCircle,
  Plus,
  Minus,
  Clock,
  DollarSign
} from 'lucide-react';
import { User } from '../types';
import { RyseCard } from './RyseCard';
import { PillButton } from './ui/pill-button';
import { RyseFAB } from './gluestack/RyseFAB';
import { ActionGrid } from './gluestack/ActionGrid';

interface DashboardScreenProps {
  navigateTo: (screen: Screen) => void;
  user?: User | null;
  onLogout?: () => void;
}

export function DashboardScreen({ navigateTo, user }: DashboardScreenProps) {
  const needsKYC = user && (user.kycStatus === 'not_started' || user.kycStatus === 'in_progress');
  const displayName = user?.fullName || 'User';

  return (
    <div className="h-full flex flex-col bg-obsidian-100 overflow-y-auto pb-24">
      {/* Header */}
      <div className="bg-obsidian-200 px-6 pt-6 pb-4 flex items-center justify-between border-b" style={{ borderColor: 'var(--white-divider)' }}>
        <h1 className="text-2xl font-bold text-white-high">Money</h1>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 bg-obsidian-300 rounded-full flex items-center justify-center hover:bg-obsidian-400 transition-colors">
            <Search className="w-5 h-5 text-white-med" />
          </button>
          <button 
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--neon-primary)' }}
          >
            <span className="text-lg font-bold text-obsidian-100">
              {displayName.charAt(0).toUpperCase()}
            </span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 pt-4 space-y-4">
        {/* RYSE Card Preview */}
        <div className="flex justify-center py-2">
          <RyseCard 
            variant="neon" 
            size="medium"
            userName={displayName.toUpperCase()}
            showBadge={true}
            badgeText="Ready"
            animate={true}
          />
        </div>

        {/* Balance Card */}
        <div className="card-obsidian">
          <p className="text-white-low text-sm mb-1">Cash balance</p>
          <h2 className="text-4xl font-bold text-neon mb-1 font-mono-nums">RM 3,847.50</h2>
          <p className="text-white-muted text-xs mb-6">Account •• 4521 | Routing •• 7892</p>
          
          <div className="flex gap-3">
            <PillButton
              variant="secondary"
              size="sm"
              className="flex-1"
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Add money
            </PillButton>
            <PillButton
              variant="secondary"
              size="sm"
              className="flex-1"
              leftIcon={<Minus className="w-4 h-4" />}
            >
              Withdraw
            </PillButton>
          </div>

          {/* RyScore Status */}
          <button
            onClick={() => navigateTo('ryscore')}
            className="mt-4 w-full flex items-center gap-3 py-3 border-t transition-colors hover:bg-obsidian-300 rounded-lg -mx-2 px-2"
            style={{ borderColor: 'var(--white-divider)' }}
          >
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: needsKYC ? 'var(--obsidian-300)' : 'rgba(57, 255, 20, 0.15)' }}
            >
              {needsKYC ? (
                <AlertCircle className="w-4 h-4 text-white-med" />
              ) : (
                <TrendingUp className="w-4 h-4 text-neon" />
              )}
            </div>
            <div className="flex-1 text-left">
              <span className="text-white-high font-medium text-sm">
                {needsKYC ? 'Complete KYC to build RyScore' : 'RyScore: 720 (Gold)'}
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-white-low" />
          </button>
        </div>

        {/* KYC Banner */}
        {needsKYC && (
          <button
            onClick={() => navigateTo('kyc')}
            className="w-full card-neon-border flex items-center gap-4 hover:bg-obsidian-300 transition-colors"
          >
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--neon-primary)' }}
            >
              <Shield className="w-6 h-6 text-obsidian-100" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-white-high font-semibold">Verify your identity</p>
              <p className="text-white-low text-sm">Unlock all features and build credit</p>
            </div>
            <ChevronRight className="w-5 h-5 text-white-low" />
          </button>
        )}

        {/* Savings Card */}
        <div className="card-obsidian">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white-low text-sm">Savings</p>
              <p className="text-2xl font-bold text-white-high font-mono-nums">RM 0.00</p>
              <p className="text-neon text-sm font-medium">Up to 3.75% interest</p>
            </div>
            <div className="flex gap-1">
              <span className="text-2xl">💰</span>
              <span className="text-2xl">💰</span>
            </div>
          </div>
        </div>

        {/* Earnings Pool Card - The "Core" */}
        <div className="card-neon-border animate-neon-pulse">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white-low text-sm">Earnings Pool</p>
              <p className="text-2xl font-bold text-neon font-mono-nums text-glow">RM 1,240.00</p>
              <p className="text-white-muted text-sm">This week's gig income</p>
            </div>
            <div className="w-12 h-12 bg-obsidian-300 rounded-xl flex items-center justify-center glow-neon-sm">
              <span className="text-2xl">💸</span>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="pt-2">
          <h3 className="text-white-high font-semibold mb-3 px-1">Quick Actions</h3>
          <ActionGrid onNavigate={navigateTo} />
        </div>
      </div>

      {/* Ryse Voice FAB - Floating Action Button */}
      <RyseFAB 
        onPress={() => navigateTo('voice')}
        label="Ask Ryse"
        size={64}
        showLabel={true}
      />

      {/* Bottom Navigation - Glassmorphism Dock */}
      <div className="fixed bottom-0 left-0 right-0 glass-panel px-8 py-4 flex items-center justify-around max-w-md mx-auto rounded-t-3xl">
        <button 
          onClick={() => navigateTo('dashboard')}
          className="flex flex-col items-center gap-1 transition-all"
        >
          <div className="relative">
            <DollarSign className="w-6 h-6 text-neon" />
            {/* Green spotlight effect */}
            <div className="absolute -inset-2 bg-neon opacity-20 blur-lg rounded-full" />
          </div>
          <span className="text-xs font-medium text-neon">$1</span>
        </button>
        {/* Spacer for FAB */}
        <div className="w-16" />
        <button 
          onClick={() => navigateTo('income')}
          className="flex flex-col items-center gap-1 transition-all hover:scale-105"
        >
          <Clock className="w-6 h-6 text-white-low" />
          <span className="text-xs text-white-low">Activity</span>
        </button>
      </div>
    </div>
  );
}
