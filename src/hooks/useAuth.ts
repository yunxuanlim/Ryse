// ============================================
// Auth Hook - Manages authentication state
// ============================================

import { useState, useEffect, useCallback } from 'react';
import {
  AuthState,
  User,
  LoginRequest,
  RegisterRequest,
  OTPVerifyRequest,
  SetMPINRequest,
} from '../types';
import {
  register,
  requestLoginOTP,
  verifyOTP,
  setMPIN,
  loginWithMPIN,
  quickLogin,
  logout,
  getCurrentUser,
  updateUserProfile,
  getInitialAuthState,
  checkPhoneExists,
} from '../services/authService';

interface UseAuthReturn {
  // State
  authState: AuthState;
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  error: string | null;
  
  // Actions
  registerUser: (phoneNumber: string) => Promise<boolean>;
  requestOTP: (phoneNumber: string) => Promise<boolean>;
  verifyUserOTP: (phoneNumber: string, otp: string, purpose: 'registration' | 'login' | 'reset_pin') => Promise<boolean>;
  setUserMPIN: (phoneNumber: string, mpin: string, confirmMpin: string) => Promise<boolean>;
  loginWithPin: (phoneNumber: string, mpin: string) => Promise<boolean>;
  demoLogin: () => Promise<boolean>;
  logoutUser: () => Promise<void>;
  refreshUser: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<boolean>;
  checkPhone: (phoneNumber: string) => Promise<boolean>;
  clearError: () => void;
}

export function useAuth(): UseAuthReturn {
  const [authState, setAuthState] = useState<AuthState>(() => getInitialAuthState());
  
  // Refresh user on mount
  useEffect(() => {
    if (authState.isAuthenticated) {
      refreshUser();
    }
  }, []);
  
  const setLoading = useCallback((isLoading: boolean) => {
    setAuthState(prev => ({ ...prev, isLoading }));
  }, []);
  
  const setError = useCallback((error: string | null) => {
    setAuthState(prev => ({ ...prev, error, isLoading: false }));
  }, []);
  
  const clearError = useCallback(() => {
    setAuthState(prev => ({ ...prev, error: null }));
  }, []);
  
  const registerUser = useCallback(async (phoneNumber: string): Promise<boolean> => {
    setLoading(true);
    clearError();
    
    const response = await register({ phoneNumber });
    
    if (response.success) {
      setLoading(false);
      return true;
    } else {
      setError(response.error || response.message);
      return false;
    }
  }, []);
  
  const requestOTP = useCallback(async (phoneNumber: string): Promise<boolean> => {
    setLoading(true);
    clearError();
    
    const response = await requestLoginOTP(phoneNumber);
    
    if (response.success) {
      setLoading(false);
      return true;
    } else {
      setError(response.error || response.message);
      return false;
    }
  }, []);
  
  const verifyUserOTP = useCallback(async (
    phoneNumber: string, 
    otp: string, 
    purpose: 'registration' | 'login' | 'reset_pin'
  ): Promise<boolean> => {
    setLoading(true);
    clearError();
    
    const response = await verifyOTP({ phoneNumber, otp, purpose });
    
    if (response.success) {
      setLoading(false);
      return true;
    } else {
      setError(response.error || response.message);
      return false;
    }
  }, []);
  
  const setUserMPIN = useCallback(async (
    phoneNumber: string, 
    mpin: string, 
    confirmMpin: string
  ): Promise<boolean> => {
    setLoading(true);
    clearError();
    
    const response = await setMPIN({ phoneNumber, mpin, confirmMpin });
    
    if (response.success && response.data?.user) {
      setAuthState({
        isAuthenticated: true,
        isLoading: false,
        user: response.data.user,
        token: response.data.token || null,
        error: null,
      });
      return true;
    } else {
      setError(response.error || response.message);
      return false;
    }
  }, []);
  
  const loginWithPin = useCallback(async (phoneNumber: string, mpin: string): Promise<boolean> => {
    setLoading(true);
    clearError();
    
    const response = await loginWithMPIN({ phoneNumber, mpin });
    
    if (response.success && response.data?.user) {
      setAuthState({
        isAuthenticated: true,
        isLoading: false,
        user: response.data.user,
        token: response.data.token || null,
        error: null,
      });
      return true;
    } else {
      setError(response.error || response.message);
      return false;
    }
  }, []);
  
  const demoLogin = useCallback(async (): Promise<boolean> => {
    setLoading(true);
    clearError();
    
    const response = await quickLogin();
    
    if (response.success && response.data?.user) {
      setAuthState({
        isAuthenticated: true,
        isLoading: false,
        user: response.data.user,
        token: response.data.token || null,
        error: null,
      });
      return true;
    } else {
      setError(response.error || response.message);
      return false;
    }
  }, []);
  
  const logoutUser = useCallback(async (): Promise<void> => {
    setLoading(true);
    
    await logout();
    
    setAuthState({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      token: null,
      error: null,
    });
  }, []);
  
  const refreshUser = useCallback(async (): Promise<void> => {
    const response = await getCurrentUser();
    
    if (response.success && response.data?.user) {
      setAuthState(prev => ({
        ...prev,
        user: response.data!.user!,
        token: response.data!.token || prev.token,
        isAuthenticated: true,
      }));
    } else {
      // Session expired or invalid
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        token: null,
        error: null,
      });
    }
  }, []);
  
  const updateUser = useCallback(async (updates: Partial<User>): Promise<boolean> => {
    setLoading(true);
    clearError();
    
    const response = await updateUserProfile(updates);
    
    if (response.success && response.data?.user) {
      setAuthState(prev => ({
        ...prev,
        user: response.data!.user!,
        isLoading: false,
      }));
      return true;
    } else {
      setError(response.error || response.message);
      return false;
    }
  }, []);
  
  const checkPhone = useCallback(async (phoneNumber: string): Promise<boolean> => {
    return await checkPhoneExists(phoneNumber);
  }, []);
  
  return {
    authState,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    user: authState.user,
    error: authState.error,
    
    registerUser,
    requestOTP,
    verifyUserOTP,
    setUserMPIN,
    loginWithPin,
    demoLogin,
    logoutUser,
    refreshUser,
    updateUser,
    checkPhone,
    clearError,
  };
}

export default useAuth;

