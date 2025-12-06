// ============================================
// Authentication Service Layer
// Mock implementation for hackathon - ready for real API integration
// ============================================

import {
  User,
  AuthState,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  OTPVerifyRequest,
  SetMPINRequest,
  KYCStatus,
  RyScoreTier,
} from '../types';

// ============================================
// CONSTANTS
// ============================================

const API_DELAY = 600;
const DEV_OTP = '123456'; // Fixed OTP for development
const TOKEN_KEY = 'ryse_auth_token';
const USER_KEY = 'ryse_user';

// ============================================
// MOCK DATA STORAGE
// ============================================

interface MockUser extends User {
  mpinHash?: string;
}

// Mock users database
const mockUsers: Map<string, MockUser> = new Map([
  ['+60123456789', {
    id: '550e8400-e29b-41d4-a716-446655440000',
    phoneNumber: '+60123456789',
    fullName: 'Olivia Lim',
    kycStatus: 'verified' as KYCStatus,
    ryscoreCurrent: 720,
    ryscoreTier: 'Gold' as RyScoreTier,
    isActive: true,
    lastLoginAt: null,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: new Date().toISOString(),
    mpinHash: '123456', // In real app, this would be bcrypt hashed
  }]
]);

// OTP storage
const pendingOTPs: Map<string, { otp: string; expires: number; purpose: string }> = new Map();

// Current session
let currentSession: { user: User; token: string; expiresAt: string } | null = null;

// ============================================
// PHONE NUMBER UTILITIES
// ============================================

/**
 * Normalize Malaysian phone number to +60 format
 */
export function normalizePhoneNumber(phone: string): string {
  // Remove spaces, dashes
  let clean = phone.replace(/[\s-]/g, '');
  
  // Handle various formats
  if (clean.startsWith('60')) {
    return '+' + clean;
  } else if (clean.startsWith('0')) {
    return '+60' + clean.substring(1);
  } else if (clean.startsWith('+60')) {
    return clean;
  } else if (clean.match(/^1[0-9]{8,9}$/)) {
    return '+60' + clean;
  }
  
  return clean;
}

/**
 * Format phone number for display: +60 12-345 6789
 */
export function formatPhoneNumber(phone: string): string {
  const normalized = normalizePhoneNumber(phone);
  const digits = normalized.replace('+60', '');
  
  if (digits.length === 9) {
    return `+60 ${digits.substring(0, 2)}-${digits.substring(2, 5)} ${digits.substring(5)}`;
  } else if (digits.length === 10) {
    return `+60 ${digits.substring(0, 2)}-${digits.substring(2, 6)} ${digits.substring(6)}`;
  }
  
  return normalized;
}

/**
 * Mask phone number for display: +60 12-***-*789
 */
export function maskPhoneNumber(phone: string): string {
  const normalized = normalizePhoneNumber(phone);
  if (normalized.length >= 12) {
    return normalized.substring(0, 6) + '***' + normalized.substring(normalized.length - 3);
  }
  return normalized;
}

// ============================================
// AUTH API METHODS
// ============================================

/**
 * Register a new user (Step 1: Send OTP)
 */
export async function register(request: RegisterRequest): Promise<AuthResponse> {
  await new Promise(resolve => setTimeout(resolve, API_DELAY));
  
  const phone = normalizePhoneNumber(request.phoneNumber);
  
  // Validate phone format
  if (!phone.match(/^\+601[0-9]{8,9}$/)) {
    return {
      success: false,
      message: 'Invalid Malaysian phone number',
      error: 'Please enter a valid Malaysian mobile number starting with 01',
    };
  }
  
  // Check if user already exists
  if (mockUsers.has(phone)) {
    return {
      success: false,
      message: 'Phone number already registered',
      error: 'This phone number is already registered. Please login instead.',
    };
  }
  
  // Generate OTP (use fixed OTP in dev mode)
  const otp = DEV_OTP;
  const expires = Date.now() + 5 * 60 * 1000; // 5 minutes
  
  pendingOTPs.set(phone, { otp, expires, purpose: 'registration' });
  
  console.log(`[DEV] OTP for ${phone}: ${otp}`);
  
  return {
    success: true,
    message: `OTP sent to ${maskPhoneNumber(phone)}`,
    data: {
      // In real app, don't return OTP - just for dev convenience
    },
  };
}

/**
 * Request OTP for login
 */
export async function requestLoginOTP(phoneNumber: string): Promise<AuthResponse> {
  await new Promise(resolve => setTimeout(resolve, API_DELAY));
  
  const phone = normalizePhoneNumber(phoneNumber);
  
  // Check if user exists
  if (!mockUsers.has(phone)) {
    return {
      success: false,
      message: 'User not found',
      error: 'This phone number is not registered. Please sign up first.',
    };
  }
  
  // Generate OTP
  const otp = DEV_OTP;
  const expires = Date.now() + 5 * 60 * 1000;
  
  pendingOTPs.set(phone, { otp, expires, purpose: 'login' });
  
  console.log(`[DEV] Login OTP for ${phone}: ${otp}`);
  
  return {
    success: true,
    message: `OTP sent to ${maskPhoneNumber(phone)}`,
  };
}

/**
 * Verify OTP
 */
export async function verifyOTP(request: OTPVerifyRequest): Promise<AuthResponse> {
  await new Promise(resolve => setTimeout(resolve, API_DELAY));
  
  const phone = normalizePhoneNumber(request.phoneNumber);
  const pending = pendingOTPs.get(phone);
  
  if (!pending) {
    return {
      success: false,
      message: 'No OTP found',
      error: 'Please request a new OTP',
    };
  }
  
  if (Date.now() > pending.expires) {
    pendingOTPs.delete(phone);
    return {
      success: false,
      message: 'OTP expired',
      error: 'Please request a new OTP',
    };
  }
  
  if (pending.otp !== request.otp) {
    return {
      success: false,
      message: 'Invalid OTP',
      error: 'The OTP you entered is incorrect',
    };
  }
  
  // OTP verified successfully
  pendingOTPs.delete(phone);
  
  return {
    success: true,
    message: 'OTP verified successfully',
  };
}

/**
 * Set MPIN (for new users after OTP verification)
 */
export async function setMPIN(request: SetMPINRequest): Promise<AuthResponse> {
  await new Promise(resolve => setTimeout(resolve, API_DELAY));
  
  const phone = normalizePhoneNumber(request.phoneNumber);
  
  // Validate MPIN
  if (!/^\d{6}$/.test(request.mpin)) {
    return {
      success: false,
      message: 'Invalid MPIN',
      error: 'MPIN must be 6 digits',
    };
  }
  
  if (request.mpin !== request.confirmMpin) {
    return {
      success: false,
      message: 'MPIN mismatch',
      error: 'MPIN and confirmation do not match',
    };
  }
  
  // Create new user
  const newUser: MockUser = {
    id: `user-${Date.now()}`,
    phoneNumber: phone,
    fullName: null,
    kycStatus: 'not_started',
    ryscoreCurrent: 300,
    ryscoreTier: 'Bronze',
    isActive: true,
    lastLoginAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    mpinHash: request.mpin, // In real app, hash this
  };
  
  mockUsers.set(phone, newUser);
  
  // Create session
  const token = generateToken(newUser.id);
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 days
  
  currentSession = {
    user: { ...newUser, mpinHash: undefined } as User,
    token,
    expiresAt,
  };
  
  // Persist to localStorage
  saveSession(currentSession);
  
  return {
    success: true,
    message: 'Registration complete',
    data: {
      user: currentSession.user,
      token: currentSession.token,
      expiresAt: currentSession.expiresAt,
    },
  };
}

/**
 * Login with MPIN
 */
export async function loginWithMPIN(request: LoginRequest): Promise<AuthResponse> {
  await new Promise(resolve => setTimeout(resolve, API_DELAY));
  
  const phone = normalizePhoneNumber(request.phoneNumber);
  const user = mockUsers.get(phone);
  
  if (!user) {
    return {
      success: false,
      message: 'User not found',
      error: 'This phone number is not registered',
    };
  }
  
  // Verify MPIN (in real app, compare bcrypt hashes)
  if (user.mpinHash !== request.mpin) {
    return {
      success: false,
      message: 'Invalid MPIN',
      error: 'The MPIN you entered is incorrect',
    };
  }
  
  // Update last login
  user.lastLoginAt = new Date().toISOString();
  user.updatedAt = new Date().toISOString();
  
  // Create session
  const token = generateToken(user.id);
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  
  currentSession = {
    user: { ...user, mpinHash: undefined } as User,
    token,
    expiresAt,
  };
  
  saveSession(currentSession);
  
  return {
    success: true,
    message: 'Login successful',
    data: {
      user: currentSession.user,
      token: currentSession.token,
      expiresAt: currentSession.expiresAt,
    },
  };
}

/**
 * Quick login for demo (bypass OTP)
 */
export async function quickLogin(phoneNumber: string = '+60123456789'): Promise<AuthResponse> {
  await new Promise(resolve => setTimeout(resolve, API_DELAY / 2));
  
  const phone = normalizePhoneNumber(phoneNumber);
  let user = mockUsers.get(phone);
  
  if (!user) {
    // Create demo user
    user = {
      id: `user-${Date.now()}`,
      phoneNumber: phone,
      fullName: 'Demo User',
      kycStatus: 'not_started',
      ryscoreCurrent: 300,
      ryscoreTier: 'Bronze',
      isActive: true,
      lastLoginAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      mpinHash: '123456',
    };
    mockUsers.set(phone, user);
  }
  
  const token = generateToken(user.id);
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  
  currentSession = {
    user: { ...user, mpinHash: undefined } as User,
    token,
    expiresAt,
  };
  
  saveSession(currentSession);
  
  return {
    success: true,
    message: 'Login successful',
    data: {
      user: currentSession.user,
      token: currentSession.token,
      expiresAt: currentSession.expiresAt,
    },
  };
}

/**
 * Logout
 */
export async function logout(): Promise<AuthResponse> {
  await new Promise(resolve => setTimeout(resolve, API_DELAY / 2));
  
  currentSession = null;
  clearSession();
  
  return {
    success: true,
    message: 'Logged out successfully',
  };
}

/**
 * Get current user
 */
export async function getCurrentUser(): Promise<AuthResponse> {
  await new Promise(resolve => setTimeout(resolve, API_DELAY / 2));
  
  // Try to restore session from localStorage
  if (!currentSession) {
    currentSession = loadSession();
  }
  
  if (!currentSession) {
    return {
      success: false,
      message: 'Not authenticated',
      error: 'No active session',
    };
  }
  
  // Check if session expired
  if (new Date(currentSession.expiresAt) < new Date()) {
    currentSession = null;
    clearSession();
    return {
      success: false,
      message: 'Session expired',
      error: 'Please login again',
    };
  }
  
  return {
    success: true,
    message: 'User retrieved',
    data: {
      user: currentSession.user,
      token: currentSession.token,
      expiresAt: currentSession.expiresAt,
    },
  };
}

/**
 * Update user profile
 */
export async function updateUserProfile(updates: Partial<User>): Promise<AuthResponse> {
  await new Promise(resolve => setTimeout(resolve, API_DELAY));
  
  if (!currentSession) {
    return {
      success: false,
      message: 'Not authenticated',
      error: 'Please login first',
    };
  }
  
  const phone = currentSession.user.phoneNumber;
  const user = mockUsers.get(phone);
  
  if (!user) {
    return {
      success: false,
      message: 'User not found',
      error: 'User data is corrupted',
    };
  }
  
  // Update allowed fields
  if (updates.fullName !== undefined) user.fullName = updates.fullName;
  if (updates.kycStatus !== undefined) user.kycStatus = updates.kycStatus;
  if (updates.ryscoreCurrent !== undefined) user.ryscoreCurrent = updates.ryscoreCurrent;
  if (updates.ryscoreTier !== undefined) user.ryscoreTier = updates.ryscoreTier;
  
  user.updatedAt = new Date().toISOString();
  
  // Update session
  currentSession.user = { ...user, mpinHash: undefined } as User;
  saveSession(currentSession);
  
  return {
    success: true,
    message: 'Profile updated',
    data: {
      user: currentSession.user,
    },
  };
}

/**
 * Check if phone number is registered
 */
export async function checkPhoneExists(phoneNumber: string): Promise<boolean> {
  await new Promise(resolve => setTimeout(resolve, API_DELAY / 2));
  
  const phone = normalizePhoneNumber(phoneNumber);
  return mockUsers.has(phone);
}

// ============================================
// AUTH STATE HOOK HELPERS
// ============================================

/**
 * Get initial auth state
 */
export function getInitialAuthState(): AuthState {
  const session = loadSession();
  
  if (session && new Date(session.expiresAt) > new Date()) {
    currentSession = session;
    return {
      isAuthenticated: true,
      isLoading: false,
      user: session.user,
      token: session.token,
      error: null,
    };
  }
  
  return {
    isAuthenticated: false,
    isLoading: false,
    user: null,
    token: null,
    error: null,
  };
}

// ============================================
// INTERNAL UTILITIES
// ============================================

/**
 * Generate a mock JWT token
 */
function generateToken(userId: string): string {
  // In real app, use proper JWT library
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    sub: userId,
    iat: Date.now(),
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
  }));
  const signature = btoa('mock-signature-' + Date.now());
  
  return `${header}.${payload}.${signature}`;
}

/**
 * Save session to localStorage
 */
function saveSession(session: { user: User; token: string; expiresAt: string }): void {
  try {
    localStorage.setItem(TOKEN_KEY, session.token);
    localStorage.setItem(USER_KEY, JSON.stringify(session.user));
    localStorage.setItem('ryse_expires', session.expiresAt);
  } catch (e) {
    console.error('Failed to save session:', e);
  }
}

/**
 * Load session from localStorage
 */
function loadSession(): { user: User; token: string; expiresAt: string } | null {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    const userJson = localStorage.getItem(USER_KEY);
    const expiresAt = localStorage.getItem('ryse_expires');
    
    if (token && userJson && expiresAt) {
      return {
        user: JSON.parse(userJson),
        token,
        expiresAt,
      };
    }
  } catch (e) {
    console.error('Failed to load session:', e);
  }
  
  return null;
}

/**
 * Clear session from localStorage
 */
function clearSession(): void {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem('ryse_expires');
  } catch (e) {
    console.error('Failed to clear session:', e);
  }
}

// ============================================
// DEV UTILITIES
// ============================================

/**
 * Reset all auth data (for testing)
 */
export function resetAuthData(): void {
  // Keep the demo user
  const demoUser = mockUsers.get('+60123456789');
  mockUsers.clear();
  if (demoUser) {
    mockUsers.set('+60123456789', demoUser);
  }
  
  pendingOTPs.clear();
  currentSession = null;
  clearSession();
}

/**
 * Get all registered users (for debugging)
 */
export function getAllUsers(): User[] {
  return Array.from(mockUsers.values()).map(u => ({ ...u, mpinHash: undefined } as User));
}

