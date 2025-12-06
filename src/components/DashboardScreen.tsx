import { useState, useEffect } from 'react';
import { Screen } from '../App';
import { 
  Mic, 
  TrendingUp, 
  Wallet, 
  CreditCard, 
  PiggyBank, 
  Shield, 
  Users, 
  GraduationCap,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  ChevronRight,
  Send
} from 'lucide-react';
import { RyseLogo } from './RyseLogo';
import { BottomNav } from './BottomNav';

interface DashboardScreenProps {
  navigateTo: (screen: Screen) => void;
}

// Function to get greeting based on current time
const getGreeting = (): string => {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 12) {
    return 'Good Morning,';
  } else if (hour >= 12 && hour < 17) {
    return 'Good Afternoo,';
  } else if (hour >= 17 && hour < 21) {
    return 'Good Evening,';
  } else {
    return 'Good Night,';
  }
};

export function DashboardScreen({ navigateTo }: DashboardScreenProps) {
  const [greeting, setGreeting] = useState(getGreeting());

  // Update greeting every minute to handle time changes
  useEffect(() => {
    const updateGreeting = () => {
      setGreeting(getGreeting());
    };

    // Update immediately
    updateGreeting();

    // Update every minute
    const interval = setInterval(updateGreeting, 60000);

    return () => clearInterval(interval);
  }, []);
  const transactions = [
    { id: 1, name: 'Grab Earnings', amount: 450, type: 'income', date: 'Today, 10:30 AM', category: 'Grab' },
    { id: 2, name: 'Electricity Bill', amount: -120, type: 'expense', date: 'Today, 9:15 AM', category: 'Utilities' },
    { id: 3, name: 'Foodpanda Earnings', amount: 380, type: 'income', date: 'Yesterday', category: 'Foodpanda' },
    { id: 4, name: 'Transfer to Sarah', amount: -200, type: 'expense', date: 'Yesterday', category: 'Transfer' },
    { id: 5, name: 'Grab Earnings', amount: 520, type: 'income', date: '2 days ago', category: 'Grab' }
  ];

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 overflow-y-auto pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 pt-6 pb-8 rounded-b-[32px] shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <RyseLogo navigateTo={navigateTo} />
          <button 
            onClick={() => navigateTo('security')}
            className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center"
          >
            <Shield className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="mb-4">
          <p className="text-purple-200 text-sm">{greeting}</p>
          <h1 className="text-white text-3xl italic" style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontStyle: 'italic' }}>Olivia Lim</h1>
        </div>

        {/* Balance Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 mb-4">
          <p className="text-purple-200 text-sm mb-2">Total Balance</p>
          <h1 className="text-white mb-4">RM 3,847.50</h1>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                <ArrowDownRight className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-purple-200 text-xs">This Week</p>
                <p className="text-white">RM 1,240</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <p className="text-purple-200 text-xs">Expenses</p>
                <p className="text-white">RM 580</p>
              </div>
            </div>
          </div>
        </div>

        {/* Large Speak to Ryse Button */}
        <button
          onClick={() => navigateTo('voice')}
          className="w-full bg-white/10 backdrop-blur-xl rounded-3xl p-5 border border-white/20 transition-transform active:scale-95"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center">
              <Mic className="w-8 h-8 text-white" />
            </div>
            <div className="text-left flex-1">
              <h3 className="text-white mb-1">Speak to Ryse</h3>
              <p className="text-purple-200 text-sm">Ask me anything about your finances</p>
            </div>
            <ChevronRight className="w-6 h-6 text-white/60" />
          </div>
        </button>
      </div>

      {/* AI Insights */}
      <div className="px-6 py-4">
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-4 border border-amber-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-amber-900 text-sm mb-1">You earned 22% more this week! 🎉</p>
              <p className="text-amber-700 text-xs">Keep up the great work. Your RyScore increased by 15 points.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mb-6">
        <h3 className="text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-4 gap-4">
          <button
            onClick={() => navigateTo('transaction')}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Send className="w-8 h-8 text-white" />
            </div>
            <span className="text-xs text-gray-700 text-center">Send</span>
          </button>

          <button
            onClick={() => navigateTo('ryscore')}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <span className="text-xs text-gray-700 text-center">RyScore</span>
          </button>

          <button
            onClick={() => navigateTo('loan')}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
              <CreditCard className="w-8 h-8 text-white" />
            </div>
            <span className="text-xs text-gray-700 text-center">Advance</span>
          </button>

          <button
            onClick={() => navigateTo('savings')}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
              <PiggyBank className="w-8 h-8 text-white" />
            </div>
            <span className="text-xs text-gray-700 text-center">Savings</span>
          </button>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Recent Transactions</h3>
          <button className="text-purple-600 text-sm">View All</button>
        </div>
        
        <div className="bg-white rounded-3xl p-5 shadow-lg border border-gray-100">
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  transaction.type === 'income' 
                    ? 'bg-green-100' 
                    : 'bg-red-100'
                }`}>
                  {transaction.type === 'income' ? (
                    <ArrowDownRight className="w-6 h-6 text-green-600" />
                  ) : (
                    <ArrowUpRight className="w-6 h-6 text-red-600" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-900">{transaction.name}</h4>
                  <p className="text-gray-500 text-xs">{transaction.date}</p>
                </div>
                <div className={`${
                  transaction.type === 'income' 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {transaction.type === 'income' ? '+' : ''}RM {Math.abs(transaction.amount)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RyScore Preview */}
      <div className="px-6 mb-6">
        <button
          onClick={() => navigateTo('ryscore')}
          className="w-full bg-white rounded-3xl p-5 shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">Your RyScore</h3>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="flex items-end gap-4 mb-4">
            <div className="text-5xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              720
            </div>
            <div className="mb-2">
              <div className="px-3 py-1 bg-amber-100 rounded-full text-amber-700 text-xs">
                Gold Tier
              </div>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" style={{ width: '72%' }}></div>
          </div>
          
          <p className="text-gray-600 text-sm">Complete 15 more deliveries to reach Platinum</p>
        </button>
      </div>

      {/* Features Grid */}
      <div className="px-6 mb-6">
        <h3 className="text-gray-900 mb-4">Explore</h3>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => navigateTo('income')}
            className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 text-left"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-3">
              <Wallet className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="text-gray-900 mb-1">Income Track</h4>
            <p className="text-gray-600 text-xs">View earnings & predictions</p>
          </button>

          <button
            onClick={() => navigateTo('security')}
            className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 text-left"
          >
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-3">
              <Shield className="w-6 h-6 text-red-600" />
            </div>
            <h4 className="text-gray-900 mb-1">Shield Pro</h4>
            <p className="text-gray-600 text-xs">Anti-scam protection</p>
          </button>

          <button
            onClick={() => navigateTo('community')}
            className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 text-left"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="text-gray-900 mb-1">Community</h4>
            <p className="text-gray-600 text-xs">Connect with gig workers</p>
          </button>

          <button
            onClick={() => navigateTo('education')}
            className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 text-left"
          >
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-3">
              <GraduationCap className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="text-gray-900 mb-1">Learn</h4>
            <p className="text-gray-600 text-xs">Financial education</p>
          </button>
        </div>
      </div>

      <BottomNav currentScreen="dashboard" navigateTo={navigateTo} />
    </div>
  );
}
