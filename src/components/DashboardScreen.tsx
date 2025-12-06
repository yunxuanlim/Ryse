// ============================================
// Dashboard Screen - Cash App Inspired Design
// Clean, minimal with focus on balance
// ============================================

import { useState, useEffect } from 'react';
import { Screen } from '../App';
import { 
  Mic, 
  TrendingUp, 
  CreditCard, 
  PiggyBank, 
  Shield, 
  Users, 
  GraduationCap,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Send,
  AlertCircle,
  Settings,
  Wallet,
  Plus
} from 'lucide-react';
import { BottomNav } from './BottomNav';
import { User } from '../types';
import { RyseCard } from './RyseCard';

interface DashboardScreenProps {
  navigateTo: (screen: Screen) => void;
  user?: User | null;
  onLogout?: () => void;
}

const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'Good Morning';
  if (hour >= 12 && hour < 17) return 'Good Afternoon';
  if (hour >= 17 && hour < 21) return 'Good Evening';
  return 'Good Night';
};

export function DashboardScreen({ navigateTo, user, onLogout }: DashboardScreenProps) {
  const [greeting, setGreeting] = useState(getGreeting());
  const needsKYC = user && (user.kycStatus === 'not_started' || user.kycStatus === 'in_progress');
  const displayName = user?.fullName || 'Olivia Lim';

  useEffect(() => {
    const interval = setInterval(() => setGreeting(getGreeting()), 60000);
    return () => clearInterval(interval);
  }, []);

  const transactions = [
    { id: 1, name: 'Grab Earnings', amount: 450, type: 'income', date: 'Today, 10:30 AM' },
    { id: 2, name: 'Electricity Bill', amount: -120, type: 'expense', date: 'Today, 9:15 AM' },
    { id: 3, name: 'Foodpanda Earnings', amount: 380, type: 'income', date: 'Yesterday' },
    { id: 4, name: 'Transfer to Sarah', amount: -200, type: 'expense', date: 'Yesterday' },
  ];

  return (
    <div className="h-full flex flex-col bg-white overflow-y-auto pb-24">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{greeting}</p>
          <h1 className="text-2xl font-bold text-gray-900">{displayName}</h1>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigateTo('security')}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
          >
            <Shield className="w-5 h-5 text-gray-700" />
          </button>
          <button 
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
          >
            <Settings className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* KYC Banner */}
      {needsKYC && (
        <div className="px-6 mb-4">
          <button
            onClick={() => navigateTo('kyc')}
            className="w-full bg-gray-100 rounded-2xl p-4 border border-gray-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-gray-900 font-semibold">Complete your profile</p>
                <p className="text-gray-500 text-sm">Verify identity to unlock full features</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </button>
        </div>
      )}

      {/* Balance Card */}
      <div className="px-6 mb-6">
        <div style={{ background: '#000', borderRadius: '24px', padding: '24px', color: '#fff' }}>
          <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '4px' }}>Total Balance</p>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '24px' }}>RM 3,847.50</h2>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigateTo('transaction')}
              style={{ flex: 1, background: '#fff', color: '#000', borderRadius: '9999px', padding: '12px 0', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <Send className="w-5 h-5" />
              Send
            </button>
            <button 
              style={{ flex: 1, background: 'rgba(255,255,255,0.2)', color: '#fff', borderRadius: '9999px', padding: '12px 0', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <Plus className="w-5 h-5" />
              Add Money
            </button>
          </div>
        </div>
      </div>

      {/* Ryse Card Preview */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Your Ryse Card</h3>
          <button className="text-gray-500 text-sm font-medium flex items-center gap-1">
            Customize <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="flex justify-center" style={{ height: '220px' }}>
          <RyseCard 
            variant="neon" 
            size="large"
            userName={displayName.toUpperCase()}
            showDetails={true}
          />
        </div>
      </div>

      {/* Voice Assistant */}
      <div className="px-6 mb-6">
        <button
          onClick={() => navigateTo('voice')}
          className="w-full bg-gray-100 rounded-2xl p-4 flex items-center gap-4"
        >
          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
            <Mic className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 text-left">
            <h3 className="font-semibold text-gray-900">Talk to Ryse</h3>
            <p className="text-gray-500 text-sm">Ask me anything about your finances</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Quick Stats */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-green-50 rounded-2xl p-4 border border-green-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <ArrowDownRight className="w-4 h-4 text-white" />
              </div>
              <span className="text-green-800 text-sm font-medium">This Week</span>
            </div>
            <p className="text-2xl font-bold text-green-900">+RM 1,240</p>
          </div>
          
          <div className="bg-red-50 rounded-2xl p-4 border border-red-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
              <span className="text-red-800 text-sm font-medium">Spent</span>
            </div>
            <p className="text-2xl font-bold text-red-900">-RM 580</p>
          </div>
        </div>
      </div>

      {/* RyScore Preview */}
      <div className="px-6 mb-6">
        <button
          onClick={() => navigateTo('ryscore')}
          className="w-full bg-gray-100 rounded-2xl p-5"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Your RyScore</p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold text-gray-900">720</span>
                <span className="text-sm font-medium text-amber-600 mb-1 px-2 py-0.5 bg-amber-100 rounded-full">Gold</span>
              </div>
            </div>
            <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-300 rounded-full h-2">
              <div className="bg-black h-2 rounded-full" style={{ width: '72%' }} />
            </div>
            <p className="text-gray-500 text-xs mt-2">15 more deliveries to Platinum</p>
          </div>
        </button>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-4 gap-4">
          {[
            { icon: Send, label: 'Send', screen: 'transaction' as Screen },
            { icon: TrendingUp, label: 'RyScore', screen: 'ryscore' as Screen },
            { icon: CreditCard, label: 'Advance', screen: 'loan' as Screen },
            { icon: PiggyBank, label: 'Savings', screen: 'savings' as Screen },
          ].map((action) => (
            <button
              key={action.label}
              onClick={() => navigateTo(action.screen)}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center">
                <action.icon className="w-6 h-6 text-gray-700" />
              </div>
              <span className="text-xs text-gray-600">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <button className="text-gray-500 text-sm font-medium">View All</button>
        </div>
        
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center gap-3 py-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                tx.type === 'income' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {tx.type === 'income' ? (
                  <ArrowDownRight className="w-5 h-5 text-green-600" />
                ) : (
                  <ArrowUpRight className="w-5 h-5 text-red-600" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{tx.name}</p>
                <p className="text-gray-500 text-xs">{tx.date}</p>
              </div>
              <span className={`font-semibold ${
                tx.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}>
                {tx.type === 'income' ? '+' : '-'}RM {Math.abs(tx.amount)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Explore Section */}
      <div className="px-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Explore</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Wallet, label: 'Income Track', desc: 'View earnings', screen: 'income' as Screen },
            { icon: Shield, label: 'Shield Pro', desc: 'Anti-scam', screen: 'security' as Screen },
            { icon: Users, label: 'Community', desc: 'Connect', screen: 'community' as Screen },
            { icon: GraduationCap, label: 'Learn', desc: 'Education', screen: 'education' as Screen },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => navigateTo(item.screen)}
              className="bg-gray-50 rounded-2xl p-4 text-left border border-gray-100"
            >
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-3 border border-gray-200">
                <item.icon className="w-5 h-5 text-gray-700" />
              </div>
              <h4 className="font-semibold text-gray-900 text-sm">{item.label}</h4>
              <p className="text-gray-500 text-xs">{item.desc}</p>
            </button>
          ))}
        </div>
      </div>

      <BottomNav currentScreen="dashboard" navigateTo={navigateTo} />
    </div>
  );
}
