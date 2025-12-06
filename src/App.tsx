import { useState, useEffect } from 'react';
import { OnboardingScreen } from './components/OnboardingScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { VoiceAssistantScreen } from './components/VoiceAssistantScreen';
import { RyScoreScreen } from './components/RyScoreScreen';
import { IncomeTrackingScreen } from './components/IncomeTrackingScreen';
import { LoanApplicationScreen } from './components/LoanApplicationScreen';
import { SavingsScreen } from './components/SavingsScreen';
import { SecurityScreen } from './components/SecurityScreen';
import { CommunityScreen } from './components/CommunityScreen';
import { EducationScreen } from './components/EducationScreen';
import { TransactionScreen } from './components/TransactionScreen';
import { LoginScreen } from './components/LoginScreen';
import { KYCScreen } from './components/KYCScreen';
import { useAuth } from './hooks/useAuth';

export type Screen = 
  | 'onboarding' 
  | 'login'
  | 'kyc'
  | 'dashboard' 
  | 'voice' 
  | 'ryscore' 
  | 'income' 
  | 'loan' 
  | 'savings' 
  | 'security' 
  | 'community' 
  | 'education'
  | 'transaction';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [screenData, setScreenData] = useState<any>(null);
  
  // Auth hook for managing authentication state
  const auth = useAuth();


  const handleLogin = () => {
    // For demo mode - quick login
    auth.demoLogin().then((success) => {
      if (success) {
        setCurrentScreen('dashboard');
      }
    });
  };

  const handleAuthSuccess = () => {
    // Check if KYC is needed
    if (auth.user && (auth.user.kycStatus === 'not_started' || auth.user.kycStatus === 'in_progress')) {
      setCurrentScreen('kyc');
    } else {
      setCurrentScreen('dashboard');
    }
  };

  const handleKYCComplete = () => {
    // Refresh user data and go to dashboard
    auth.refreshUser().then(() => {
      setCurrentScreen('dashboard');
    });
  };

  const navigateTo = (screen: Screen, data?: any) => {
    setCurrentScreen(screen);
    setScreenData(data || null);
  };

  // Get current time for status bar
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false });
  };

  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md h-[800px] bg-white rounded-[40px] shadow-2xl overflow-hidden relative">
        {/* Status Bar */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-transparent z-50 flex items-center justify-between px-6">
          <span className="text-sm font-medium">{currentTime}</span>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-black/20 rounded-sm"></div>
            <div className="w-4 h-4 bg-black/20 rounded-sm"></div>
            <div className="w-6 h-3 bg-black/20 rounded-sm"></div>
          </div>
        </div>

        {/* Screen Content */}
        <div className="h-full pt-12">
          {currentScreen === 'onboarding' && (
            <OnboardingScreen 
              onLogin={handleLogin}
              onNavigateToLogin={() => setCurrentScreen('login')}
            />
          )}
          {currentScreen === 'login' && (
            <LoginScreen 
              navigateTo={navigateTo} 
              onAuthSuccess={handleAuthSuccess}
              auth={auth}
            />
          )}
          {currentScreen === 'kyc' && (
            <KYCScreen 
              navigateTo={navigateTo}
              onComplete={handleKYCComplete}
              user={auth.user}
            />
          )}
          {currentScreen === 'dashboard' && (
            <DashboardScreen 
              navigateTo={navigateTo}
              user={auth.user}
              onLogout={() => {
                auth.logoutUser();
                setCurrentScreen('onboarding');
              }}
            />
          )}
          {currentScreen === 'voice' && <VoiceAssistantScreen navigateTo={navigateTo} />}
          {currentScreen === 'ryscore' && <RyScoreScreen navigateTo={navigateTo} />}
          {currentScreen === 'income' && <IncomeTrackingScreen navigateTo={navigateTo} />}
          {currentScreen === 'loan' && <LoanApplicationScreen navigateTo={navigateTo} initialData={screenData} />}
          {currentScreen === 'savings' && <SavingsScreen navigateTo={navigateTo} />}
          {currentScreen === 'security' && <SecurityScreen navigateTo={navigateTo} />}
          {currentScreen === 'community' && <CommunityScreen navigateTo={navigateTo} />}
          {currentScreen === 'education' && <EducationScreen navigateTo={navigateTo} />}
          {currentScreen === 'transaction' && <TransactionScreen navigateTo={navigateTo} initialData={screenData} />}
        </div>
      </div>
    </div>
  );
}