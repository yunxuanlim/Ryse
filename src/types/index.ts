// ============================================
// RYSE Application Type Definitions
// ============================================

// ============================================
// USER TYPES
// ============================================

export type KYCStatus = 'not_started' | 'in_progress' | 'pending_review' | 'verified' | 'rejected';
export type RyScoreTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum';

export interface User {
  id: string;
  phoneNumber: string;
  fullName: string | null;
  kycStatus: KYCStatus;
  ryscoreCurrent: number;
  ryscoreTier: RyScoreTier;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UserSession {
  sessionId: string;
  userId: string;
  token: string;
  expiresAt: string;
  createdAt: string;
}

// ============================================
// AUTHENTICATION TYPES
// ============================================

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  token: string | null;
  error: string | null;
}

export interface LoginRequest {
  phoneNumber: string;
  mpin: string;
}

export interface RegisterRequest {
  phoneNumber: string;
}

export interface OTPVerifyRequest {
  phoneNumber: string;
  otp: string;
  purpose: 'registration' | 'login' | 'reset_pin';
}

export interface SetMPINRequest {
  phoneNumber: string;
  mpin: string;
  confirmMpin: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user?: User;
    token?: string;
    expiresAt?: string;
  };
  error?: string;
}

// ============================================
// KYC TYPES
// ============================================

export type KYCVerificationStatus = 
  | 'pending' 
  | 'documents_uploaded' 
  | 'face_verified' 
  | 'under_review' 
  | 'verified' 
  | 'rejected';

export type KYCStep = 1 | 2 | 3 | 4;

export interface KYCProfile {
  id: string;
  userId: string;
  
  // Step 1: Personal Information
  fullName: string | null;
  icNumber: string | null;
  dateOfBirth: string | null;
  gender: 'male' | 'female' | null;
  addressLine1: string | null;
  addressLine2: string | null;
  city: string | null;
  state: string | null;
  postcode: string | null;
  
  // Step 2: Documents
  idFrontUrl: string | null;
  idBackUrl: string | null;
  idFrontUploadedAt: string | null;
  idBackUploadedAt: string | null;
  
  // Step 3: Face Liveness
  faceImageUrl: string | null;
  faceVideoUrl: string | null;
  livenessScore: number | null;
  faceVerifiedAt: string | null;
  
  // OCR Data
  ocrExtractedName: string | null;
  ocrExtractedIc: string | null;
  ocrConfidence: number | null;
  
  // Status
  verificationStatus: KYCVerificationStatus;
  rejectionReason: string | null;
  verifiedAt: string | null;
  currentStep: KYCStep;
  
  createdAt: string;
  updatedAt: string;
}

// KYC Form Data for each step
export interface KYCStep1Data {
  fullName: string;
  icNumber: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female';
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postcode?: string;
}

export interface KYCStep2Data {
  idFrontFile: File | null;
  idFrontPreview: string | null;
  idBackFile: File | null;
  idBackPreview: string | null;
}

export interface KYCStep3Data {
  faceImageFile: File | null;
  faceImagePreview: string | null;
  faceVideoFile: File | null;
  livenessCompleted: boolean;
}

export interface KYCStep4Data {
  platforms: GigPlatformInput[];
}

export interface KYCFormData {
  step1: KYCStep1Data;
  step2: KYCStep2Data;
  step3: KYCStep3Data;
  step4: KYCStep4Data;
}

// ============================================
// GIG PLATFORM TYPES
// ============================================

export type PlatformName = 'Grab' | 'Foodpanda' | 'Shopee' | 'Lalamove' | 'GoGet' | 'Other';

export interface GigPlatform {
  id: string;
  userId: string;
  platformName: PlatformName;
  platformLogoUrl: string | null;
  driverId: string | null;
  driverEmail: string | null;
  
  // Stats
  joinedDate: string | null;
  rating: number | null;
  totalTrips: number;
  totalDeliveries: number;
  lifetimeEarnings: number;
  thisMonthEarnings: number;
  completionRate: number;
  acceptanceRate: number;
  cancellationRate: number;
  
  // Verification
  isVerified: boolean;
  verificationMethod: 'oauth' | 'manual' | 'screenshot';
  verifiedAt: string | null;
  lastSyncedAt: string | null;
  
  // Status
  isPrimary: boolean;
  isActive: boolean;
  
  createdAt: string;
  updatedAt: string;
}

export interface GigPlatformInput {
  platformName: PlatformName;
  driverId: string;
  driverEmail?: string;
}

export interface PlatformVerificationResult {
  success: boolean;
  platform: PlatformName;
  driverId: string;
  stats?: {
    rating: number;
    totalTrips: number;
    lifetimeEarnings: number;
    completionRate: number;
    joinedDate: string;
  };
  error?: string;
}

// ============================================
// RYSCORE TYPES
// ============================================

export interface RyScoreBreakdown {
  incomeStability: number;      // 0-100, weight: 30%
  platformRating: number;       // 0-100, weight: 25%
  workTenure: number;           // 0-100, weight: 20%
  savingsHabits: number;        // 0-100, weight: 15%
  repaymentHistory: number;     // 0-100, weight: 10%
}

export interface RyScoreCalculation {
  totalScore: number;           // 300-850
  tier: RyScoreTier;
  breakdown: RyScoreBreakdown;
  previousScore?: number;
  scoreChange?: number;
  tierChanged?: boolean;
}

export type ScoreChangeReason = 
  | 'initial_calculation'
  | 'platform_linked'
  | 'platform_updated'
  | 'loan_repaid'
  | 'loan_defaulted'
  | 'savings_milestone'
  | 'manual_adjustment'
  | 'monthly_recalculation';

export interface RyScoreHistory {
  id: string;
  userId: string;
  previousScore: number | null;
  newScore: number;
  scoreChange: number | null;
  breakdown: RyScoreBreakdown;
  changeReason: ScoreChangeReason;
  changeDescription: string | null;
  previousTier: RyScoreTier | null;
  newTier: RyScoreTier;
  tierChanged: boolean;
  createdAt: string;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface APIResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  code?: string;
}

export interface KYCProgressResponse {
  currentStep: KYCStep;
  completedSteps: KYCStep[];
  verificationStatus: KYCVerificationStatus;
  canProceed: boolean;
  missingFields?: string[];
}

export interface KYCSubmitResponse {
  success: boolean;
  message: string;
  nextStep?: KYCStep;
  verificationStatus?: KYCVerificationStatus;
  ryscore?: RyScoreCalculation;
  error?: string;
}

// ============================================
// FORM VALIDATION TYPES
// ============================================

export interface ValidationError {
  field: string;
  message: string;
}

export interface FormValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// ============================================
// PLATFORM LOGOS & METADATA
// ============================================

export const PLATFORM_METADATA: Record<PlatformName, { 
  name: string; 
  color: string; 
  bgColor: string;
  icon: string;
}> = {
  Grab: {
    name: 'Grab',
    color: '#00B14F',
    bgColor: '#E6F7EE',
    icon: '🚗'
  },
  Foodpanda: {
    name: 'Foodpanda',
    color: '#D70F64',
    bgColor: '#FDE8F0',
    icon: '🐼'
  },
  Shopee: {
    name: 'Shopee',
    color: '#EE4D2D',
    bgColor: '#FDEBE7',
    icon: '🛒'
  },
  Lalamove: {
    name: 'Lalamove',
    color: '#F26722',
    bgColor: '#FEF0E7',
    icon: '📦'
  },
  GoGet: {
    name: 'GoGet',
    color: '#4A90D9',
    bgColor: '#EBF3FB',
    icon: '🏃'
  },
  Other: {
    name: 'Other',
    color: '#6B7280',
    bgColor: '#F3F4F6',
    icon: '📱'
  }
};

// ============================================
// MALAYSIAN STATES
// ============================================

export const MALAYSIAN_STATES = [
  'Johor',
  'Kedah',
  'Kelantan',
  'Kuala Lumpur',
  'Labuan',
  'Melaka',
  'Negeri Sembilan',
  'Pahang',
  'Penang',
  'Perak',
  'Perlis',
  'Putrajaya',
  'Sabah',
  'Sarawak',
  'Selangor',
  'Terengganu'
] as const;

export type MalaysianState = typeof MALAYSIAN_STATES[number];

