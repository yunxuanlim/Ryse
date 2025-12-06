// ============================================
// KYC Service Layer
// Mock implementation for hackathon - ready for real API integration
// ============================================

import {
  KYCProfile,
  KYCStep,
  KYCStep1Data,
  KYCStep2Data,
  KYCStep3Data,
  KYCStep4Data,
  KYCVerificationStatus,
  KYCProgressResponse,
  KYCSubmitResponse,
  GigPlatform,
  GigPlatformInput,
  PlatformVerificationResult,
  PlatformName,
  RyScoreCalculation,
  RyScoreTier,
  APIResponse,
  FormValidationResult,
  ValidationError,
} from '../types';

// ============================================
// MOCK DATA STORAGE (Replace with real API calls)
// ============================================

// Simulated delay for API calls
const API_DELAY = 800;

// Mock KYC profile storage (in real app, this comes from backend)
let mockKYCProfile: Partial<KYCProfile> | null = null;
let mockGigPlatforms: GigPlatform[] = [];

// ============================================
// VALIDATION UTILITIES
// ============================================

/**
 * Validate Malaysian IC Number format: YYMMDD-SS-NNNN
 */
export function validateICNumber(icNumber: string): FormValidationResult {
  const errors: ValidationError[] = [];
  
  // Remove any spaces or dashes for validation
  const cleanIC = icNumber.replace(/[-\s]/g, '');
  
  if (!cleanIC) {
    errors.push({ field: 'icNumber', message: 'IC Number is required' });
    return { isValid: false, errors };
  }
  
  // Check length (12 digits)
  if (cleanIC.length !== 12) {
    errors.push({ field: 'icNumber', message: 'IC Number must be 12 digits' });
    return { isValid: false, errors };
  }
  
  // Check if all digits
  if (!/^\d{12}$/.test(cleanIC)) {
    errors.push({ field: 'icNumber', message: 'IC Number must contain only digits' });
    return { isValid: false, errors };
  }
  
  // Validate date portion (YYMMDD)
  const year = parseInt(cleanIC.substring(0, 2));
  const month = parseInt(cleanIC.substring(2, 4));
  const day = parseInt(cleanIC.substring(4, 6));
  
  if (month < 1 || month > 12) {
    errors.push({ field: 'icNumber', message: 'Invalid month in IC Number' });
    return { isValid: false, errors };
  }
  
  if (day < 1 || day > 31) {
    errors.push({ field: 'icNumber', message: 'Invalid day in IC Number' });
    return { isValid: false, errors };
  }
  
  // Validate state code (SS) - Malaysian state codes are 01-16
  const stateCode = parseInt(cleanIC.substring(6, 8));
  const validStateCodes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 21, 22, 23, 24];
  if (!validStateCodes.includes(stateCode)) {
    errors.push({ field: 'icNumber', message: 'Invalid state code in IC Number' });
    return { isValid: false, errors };
  }
  
  return { isValid: true, errors: [] };
}

/**
 * Format IC number with dashes: YYMMDD-SS-NNNN
 */
export function formatICNumber(icNumber: string): string {
  const clean = icNumber.replace(/[-\s]/g, '');
  if (clean.length >= 6) {
    let formatted = clean.substring(0, 6);
    if (clean.length >= 8) {
      formatted += '-' + clean.substring(6, 8);
      if (clean.length > 8) {
        formatted += '-' + clean.substring(8, 12);
      }
    }
    return formatted;
  }
  return clean;
}

/**
 * Validate Malaysian phone number
 */
export function validatePhoneNumber(phone: string): FormValidationResult {
  const errors: ValidationError[] = [];
  const cleanPhone = phone.replace(/[\s-]/g, '');
  
  // Malaysian mobile: +60 followed by 1X (9-10 digits total after +60)
  const mobileRegex = /^\+?60?1[0-9]{8,9}$/;
  
  if (!mobileRegex.test(cleanPhone)) {
    errors.push({ field: 'phoneNumber', message: 'Invalid Malaysian phone number' });
    return { isValid: false, errors };
  }
  
  return { isValid: true, errors: [] };
}

/**
 * Validate Step 1 data
 */
export function validateStep1(data: KYCStep1Data): FormValidationResult {
  const errors: ValidationError[] = [];
  
  if (!data.fullName || data.fullName.trim().length < 3) {
    errors.push({ field: 'fullName', message: 'Full name must be at least 3 characters' });
  }
  
  const icValidation = validateICNumber(data.icNumber);
  if (!icValidation.isValid) {
    errors.push(...icValidation.errors);
  }
  
  return { isValid: errors.length === 0, errors };
}

// ============================================
// KYC API METHODS
// ============================================

/**
 * Initialize or get current KYC progress
 */
export async function getKYCProgress(userId: string): Promise<APIResponse<KYCProgressResponse>> {
  await new Promise(resolve => setTimeout(resolve, API_DELAY));
  
  // Mock response - in real app, fetch from backend
  if (!mockKYCProfile) {
    return {
      success: true,
      message: 'KYC not started',
      data: {
        currentStep: 1,
        completedSteps: [],
        verificationStatus: 'pending',
        canProceed: true,
      }
    };
  }
  
  const completedSteps: KYCStep[] = [];
  if (mockKYCProfile.fullName && mockKYCProfile.icNumber) completedSteps.push(1);
  if (mockKYCProfile.idFrontUrl && mockKYCProfile.idBackUrl) completedSteps.push(2);
  if (mockKYCProfile.faceImageUrl) completedSteps.push(3);
  if (mockGigPlatforms.length > 0) completedSteps.push(4);
  
  return {
    success: true,
    message: 'KYC progress retrieved',
    data: {
      currentStep: mockKYCProfile.currentStep || 1,
      completedSteps,
      verificationStatus: mockKYCProfile.verificationStatus || 'pending',
      canProceed: true,
    }
  };
}

/**
 * Submit Step 1: Personal Information
 */
export async function submitStep1(userId: string, data: KYCStep1Data): Promise<KYCSubmitResponse> {
  await new Promise(resolve => setTimeout(resolve, API_DELAY));
  
  // Validate data
  const validation = validateStep1(data);
  if (!validation.isValid) {
    return {
      success: false,
      message: 'Validation failed',
      error: validation.errors.map(e => e.message).join(', '),
    };
  }
  
  // Store in mock storage
  mockKYCProfile = {
    ...mockKYCProfile,
    userId,
    fullName: data.fullName,
    icNumber: formatICNumber(data.icNumber),
    dateOfBirth: data.dateOfBirth || null,
    gender: data.gender || null,
    addressLine1: data.addressLine1 || null,
    addressLine2: data.addressLine2 || null,
    city: data.city || null,
    state: data.state || null,
    postcode: data.postcode || null,
    currentStep: 2,
    verificationStatus: 'pending',
  };
  
  return {
    success: true,
    message: 'Personal information saved successfully',
    nextStep: 2,
    verificationStatus: 'pending',
  };
}

/**
 * Submit Step 2: Document Upload
 */
export async function submitStep2(userId: string, data: KYCStep2Data): Promise<KYCSubmitResponse> {
  await new Promise(resolve => setTimeout(resolve, API_DELAY * 2)); // Longer delay for file upload
  
  if (!data.idFrontFile || !data.idBackFile) {
    return {
      success: false,
      message: 'Both front and back of MyKad are required',
      error: 'Missing documents',
    };
  }
  
  // In real app, upload to cloud storage and get URLs
  // For mock, use the preview URLs
  mockKYCProfile = {
    ...mockKYCProfile,
    idFrontUrl: data.idFrontPreview || 'mock://id-front.jpg',
    idBackUrl: data.idBackPreview || 'mock://id-back.jpg',
    idFrontUploadedAt: new Date().toISOString(),
    idBackUploadedAt: new Date().toISOString(),
    currentStep: 3,
    verificationStatus: 'documents_uploaded',
  };
  
  // Mock OCR extraction
  mockKYCProfile.ocrExtractedName = mockKYCProfile.fullName;
  mockKYCProfile.ocrExtractedIc = mockKYCProfile.icNumber;
  mockKYCProfile.ocrConfidence = 95.5;
  
  return {
    success: true,
    message: 'Documents uploaded successfully',
    nextStep: 3,
    verificationStatus: 'documents_uploaded',
  };
}

/**
 * Submit Step 3: Face Liveness
 */
export async function submitStep3(userId: string, data: KYCStep3Data): Promise<KYCSubmitResponse> {
  await new Promise(resolve => setTimeout(resolve, API_DELAY * 2));
  
  if (!data.faceImageFile && !data.livenessCompleted) {
    return {
      success: false,
      message: 'Face verification is required',
      error: 'Liveness check not completed',
    };
  }
  
  // Mock liveness verification
  const livenessScore = 92.5 + Math.random() * 5; // Random score between 92.5-97.5
  
  mockKYCProfile = {
    ...mockKYCProfile,
    faceImageUrl: data.faceImagePreview || 'mock://face.jpg',
    faceVideoUrl: 'mock://liveness-video.mp4',
    livenessScore,
    faceVerifiedAt: new Date().toISOString(),
    currentStep: 4,
    verificationStatus: 'face_verified',
  };
  
  return {
    success: true,
    message: 'Face verification completed',
    nextStep: 4,
    verificationStatus: 'face_verified',
  };
}

/**
 * Verify a gig platform account
 */
export async function verifyGigPlatform(
  userId: string, 
  platform: GigPlatformInput
): Promise<PlatformVerificationResult> {
  await new Promise(resolve => setTimeout(resolve, API_DELAY * 1.5));
  
  // Mock platform verification
  // In real app, this would call the platform's API or verify manually
  
  // Simulate random success (90% success rate)
  const isSuccess = Math.random() > 0.1;
  
  if (!isSuccess) {
    return {
      success: false,
      platform: platform.platformName,
      driverId: platform.driverId,
      error: 'Unable to verify platform account. Please check your Driver ID.',
    };
  }
  
  // Generate mock stats based on platform
  const mockStats = generateMockPlatformStats(platform.platformName);
  
  return {
    success: true,
    platform: platform.platformName,
    driverId: platform.driverId,
    stats: mockStats,
  };
}

/**
 * Submit Step 4: Gig Platform Linking
 */
export async function submitStep4(
  userId: string, 
  data: KYCStep4Data
): Promise<KYCSubmitResponse> {
  await new Promise(resolve => setTimeout(resolve, API_DELAY));
  
  if (data.platforms.length === 0) {
    return {
      success: false,
      message: 'At least one gig platform is required',
      error: 'No platforms linked',
    };
  }
  
  // Verify each platform
  const verificationResults: PlatformVerificationResult[] = [];
  for (const platform of data.platforms) {
    const result = await verifyGigPlatform(userId, platform);
    verificationResults.push(result);
    
    if (result.success && result.stats) {
      // Add to mock platforms
      const newPlatform: GigPlatform = {
        id: `platform-${Date.now()}-${Math.random()}`,
        userId,
        platformName: platform.platformName,
        platformLogoUrl: null,
        driverId: platform.driverId,
        driverEmail: platform.driverEmail || null,
        joinedDate: result.stats.joinedDate,
        rating: result.stats.rating,
        totalTrips: result.stats.totalTrips,
        totalDeliveries: result.stats.totalTrips,
        lifetimeEarnings: result.stats.lifetimeEarnings,
        thisMonthEarnings: result.stats.lifetimeEarnings * 0.1,
        completionRate: result.stats.completionRate,
        acceptanceRate: 95,
        cancellationRate: 2,
        isVerified: true,
        verificationMethod: 'manual',
        verifiedAt: new Date().toISOString(),
        lastSyncedAt: new Date().toISOString(),
        isPrimary: mockGigPlatforms.length === 0,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      mockGigPlatforms.push(newPlatform);
    }
  }
  
  // Check if any platform was verified successfully
  const successfulVerifications = verificationResults.filter(r => r.success);
  if (successfulVerifications.length === 0) {
    return {
      success: false,
      message: 'No platforms could be verified',
      error: 'Please check your Driver IDs and try again',
    };
  }
  
  // Calculate initial RyScore
  const ryscore = calculateInitialRyScore(mockGigPlatforms);
  
  // Update KYC profile
  mockKYCProfile = {
    ...mockKYCProfile,
    currentStep: 4,
    verificationStatus: 'verified',
    verifiedAt: new Date().toISOString(),
  };
  
  return {
    success: true,
    message: `KYC completed! ${successfulVerifications.length} platform(s) verified.`,
    verificationStatus: 'verified',
    ryscore,
  };
}

/**
 * Complete KYC and submit for review
 */
export async function completeKYC(userId: string): Promise<KYCSubmitResponse> {
  await new Promise(resolve => setTimeout(resolve, API_DELAY));
  
  if (!mockKYCProfile || mockGigPlatforms.length === 0) {
    return {
      success: false,
      message: 'KYC is incomplete',
      error: 'Please complete all steps before submitting',
    };
  }
  
  const ryscore = calculateInitialRyScore(mockGigPlatforms);
  
  mockKYCProfile.verificationStatus = 'verified';
  mockKYCProfile.verifiedAt = new Date().toISOString();
  
  return {
    success: true,
    message: 'KYC completed successfully!',
    verificationStatus: 'verified',
    ryscore,
  };
}

/**
 * Get linked gig platforms
 */
export async function getLinkedPlatforms(userId: string): Promise<APIResponse<GigPlatform[]>> {
  await new Promise(resolve => setTimeout(resolve, API_DELAY / 2));
  
  return {
    success: true,
    message: 'Platforms retrieved',
    data: mockGigPlatforms,
  };
}

/**
 * Reset KYC data (for testing)
 */
export function resetKYCData(): void {
  mockKYCProfile = null;
  mockGigPlatforms = [];
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Generate mock platform statistics
 */
function generateMockPlatformStats(platform: PlatformName) {
  const baseStats = {
    Grab: { rating: 4.85, trips: 800, earnings: 45000 },
    Foodpanda: { rating: 4.75, trips: 500, earnings: 28000 },
    Shopee: { rating: 4.80, trips: 300, earnings: 18000 },
    Lalamove: { rating: 4.70, trips: 400, earnings: 22000 },
    GoGet: { rating: 4.65, trips: 200, earnings: 12000 },
    Other: { rating: 4.50, trips: 150, earnings: 8000 },
  };
  
  const base = baseStats[platform];
  
  // Add some randomness
  const variance = 0.1;
  return {
    rating: Math.min(5, base.rating + (Math.random() - 0.5) * variance),
    totalTrips: Math.floor(base.trips * (0.8 + Math.random() * 0.4)),
    lifetimeEarnings: Math.floor(base.earnings * (0.8 + Math.random() * 0.4)),
    completionRate: 95 + Math.random() * 4,
    joinedDate: generateRandomJoinDate(),
  };
}

/**
 * Generate a random join date (1-3 years ago)
 */
function generateRandomJoinDate(): string {
  const now = new Date();
  const daysAgo = Math.floor(365 + Math.random() * 730); // 1-3 years
  const joinDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
  return joinDate.toISOString().split('T')[0];
}

/**
 * Calculate initial RyScore from platform data
 */
export function calculateInitialRyScore(platforms: GigPlatform[]): RyScoreCalculation {
  if (platforms.length === 0) {
    return {
      totalScore: 300,
      tier: 'Bronze',
      breakdown: {
        incomeStability: 0,
        platformRating: 0,
        workTenure: 0,
        savingsHabits: 0,
        repaymentHistory: 100, // New users start with perfect repayment
      },
    };
  }
  
  // Calculate each component
  const avgRating = platforms.reduce((sum, p) => sum + (p.rating || 0), 0) / platforms.length;
  const totalTrips = platforms.reduce((sum, p) => sum + p.totalTrips, 0);
  const totalEarnings = platforms.reduce((sum, p) => sum + p.lifetimeEarnings, 0);
  const avgCompletionRate = platforms.reduce((sum, p) => sum + p.completionRate, 0) / platforms.length;
  
  // Calculate tenure (months since earliest join date)
  const earliestJoinDate = platforms
    .filter(p => p.joinedDate)
    .sort((a, b) => new Date(a.joinedDate!).getTime() - new Date(b.joinedDate!).getTime())[0];
  const tenureMonths = earliestJoinDate?.joinedDate 
    ? Math.floor((Date.now() - new Date(earliestJoinDate.joinedDate).getTime()) / (30 * 24 * 60 * 60 * 1000))
    : 0;
  
  // Score components (0-100 each)
  const breakdown = {
    incomeStability: Math.min(100, (totalEarnings / 50000) * 100), // Max at RM 50k lifetime
    platformRating: (avgRating / 5) * 100, // Direct percentage of 5-star max
    workTenure: Math.min(100, (tenureMonths / 24) * 100), // Max at 24 months
    savingsHabits: 50, // Default for new users
    repaymentHistory: 100, // New users start perfect
  };
  
  // Calculate weighted score
  const weightedScore = 
    breakdown.incomeStability * 0.30 +
    breakdown.platformRating * 0.25 +
    breakdown.workTenure * 0.20 +
    breakdown.savingsHabits * 0.15 +
    breakdown.repaymentHistory * 0.10;
  
  // Map to 300-850 range
  const totalScore = Math.floor(300 + (weightedScore / 100) * 550);
  
  // Determine tier
  let tier: RyScoreTier;
  if (totalScore >= 751) tier = 'Platinum';
  else if (totalScore >= 651) tier = 'Gold';
  else if (totalScore >= 501) tier = 'Silver';
  else tier = 'Bronze';
  
  return {
    totalScore,
    tier,
    breakdown,
  };
}

/**
 * Get tier from score
 */
export function getTierFromScore(score: number): RyScoreTier {
  if (score >= 751) return 'Platinum';
  if (score >= 651) return 'Gold';
  if (score >= 501) return 'Silver';
  return 'Bronze';
}

/**
 * Get tier color classes
 */
export function getTierColorClasses(tier: RyScoreTier): { bg: string; text: string; border: string } {
  switch (tier) {
    case 'Platinum':
      return { bg: 'bg-blue-500', text: 'text-blue-500', border: 'border-blue-500' };
    case 'Gold':
      return { bg: 'bg-amber-500', text: 'text-amber-500', border: 'border-amber-500' };
    case 'Silver':
      return { bg: 'bg-gray-400', text: 'text-gray-400', border: 'border-gray-400' };
    case 'Bronze':
    default:
      return { bg: 'bg-orange-600', text: 'text-orange-600', border: 'border-orange-600' };
  }
}

