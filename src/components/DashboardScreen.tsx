// ============================================
// Dashboard Screen - Cash App Inspired Design
// Gray background, white cards, minimal layout
// ============================================

import { useState, useEffect } from 'react';
import { Screen } from '../App';
import { 
  Search,
  TrendingUp, 
  CreditCard, 
  PiggyBank, 
  Shield, 
  Users, 
  GraduationCap,
  ArrowDownRight,
  ChevronRight,
  AlertCircle,
  Plus,
  Minus,
  Mic,
  Clock,
  DollarSign
} from 'lucide-react';
import { BottomNav } from './BottomNav';
import { User } from '../types';
import { RyseCard } from './RyseCard';
import { PillButton } from './ui/pill-button';

interface DashboardScreenProps {
  navigateTo: (screen: Screen) => void;
  user?: User | null;
  onLogout?: () => void;
}

export function DashboardScreen({ navigateTo, user, onLogout }: DashboardScreenProps) {
  const needsKYC = user && (user.kycStatus === 'not_started' || user.kycStatus === 'in_progress');
  const displayName = user?.fullName || 'User';

  return (
    <div className="h-full flex flex-col bg-gray-50 overflow-y-auto pb-24">
      {/* Header */}
      <div className="bg-white px-6 pt-6 pb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Money</h1>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <Search className="w-5 h-5 text-gray-700" />
          </button>
          <button 
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--ryse-green, #B9FF00)' }}
          >
            <span className="text-lg font-bold text-black">
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
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <p className="text-gray-500 text-sm mb-1">Cash balance</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-1">RM 3,847.50</h2>
          <p className="text-gray-400 text-xs mb-6">Account •• 4521 | Routing •• 7892</p>
          
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
            className="mt-4 w-full flex items-center gap-3 py-3 border-t border-gray-100"
          >
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: needsKYC ? '#FEF3C7' : '#D1FAE5' }}
            >
              {needsKYC ? (
                <AlertCircle className="w-4 h-4 text-amber-600" />
              ) : (
                <TrendingUp className="w-4 h-4 text-green-600" />
              )}
            </div>
            <div className="flex-1 text-left">
              <span className="text-gray-900 font-medium text-sm">
                {needsKYC ? 'Complete KYC to build RyScore' : 'RyScore: 720 (Gold)'}
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* KYC Banner */}
        {needsKYC && (
          <button
            onClick={() => navigateTo('kyc')}
            className="w-full bg-white rounded-3xl p-5 shadow-sm flex items-center gap-4"
          >
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--ryse-green, #B9FF00)' }}
            >
              <Shield className="w-6 h-6 text-black" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-gray-900 font-semibold">Verify your identity</p>
              <p className="text-gray-500 text-sm">Unlock all features and build credit</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        )}

        {/* Savings Card */}
        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Savings</p>
              <p className="text-2xl font-bold text-gray-900">RM 0.00</p>
              <p className="text-green-600 text-sm font-medium">Up to 3.75% interest</p>
            </div>
            <div className="flex gap-1">
              <span className="text-2xl">💰</span>
              <span className="text-2xl">💰</span>
            </div>
          </div>
        </div>

        {/* Earnings Pool Card */}
        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Earnings Pool</p>
              <p className="text-2xl font-bold text-gray-900">RM 1,240.00</p>
              <p className="text-gray-400 text-sm">This week's gig income</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">💸</span>
            </div>
          </div>
        </div>

        {/* Voice Assistant */}
        <button
          onClick={() => navigateTo('voice')}
          className="w-full bg-white rounded-3xl p-5 shadow-sm flex items-center gap-4"
        >
          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
            <Mic className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-gray-900 font-semibold">Talk to Ryse</p>
            <p className="text-gray-500 text-sm">Ask about your finances</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        {/* More for you */}
        <div className="pt-2">
          <h3 className="text-gray-900 font-semibold mb-3 px-1">More for you</h3>
          <div className="space-y-2">
            {[
              { icon: CreditCard, label: 'Quick Advance', desc: 'Get up to RM 500', screen: 'loan' as Screen },
              { icon: PiggyBank, label: 'Start Saving', desc: 'Earn 3.75% APY', screen: 'savings' as Screen },
              { icon: GraduationCap, label: 'Financial Tips', desc: 'Learn to grow wealth', screen: 'education' as Screen },
              { icon: Users, label: 'Community', desc: 'Connect with others', screen: 'community' as Screen },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => navigateTo(item.screen)}
                className="w-full bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-gray-700" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-gray-900 font-medium">{item.label}</p>
                  <p className="text-gray-500 text-xs">{item.desc}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Simplified */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-8 py-4 flex items-center justify-around max-w-md mx-auto">
        <button 
          onClick={() => navigateTo('dashboard')}
          className="flex flex-col items-center gap-1"
        >
          <DollarSign className="w-6 h-6 text-black" />
          <span className="text-xs font-medium text-black">$1</span>
        </button>
        <button 
          onClick={() => navigateTo('transaction')}
          className="flex flex-col items-center gap-1"
        >
          <div className="w-6 h-6 flex items-center justify-center text-gray-400 font-bold">$</div>
          <span className="text-xs text-gray-400">Pay</span>
        </button>
        <button 
          onClick={() => navigateTo('income')}
          className="flex flex-col items-center gap-1"
        >
          <Clock className="w-6 h-6 text-gray-400" />
          <span className="text-xs text-gray-400">Activity</span>
        </button>
      </div>
    </div>
  );
}
