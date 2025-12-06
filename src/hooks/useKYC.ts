// ============================================
// KYC Hook - Manages KYC state and progress
// ============================================

import { useState, useCallback, useEffect } from 'react';
import {
  KYCStep,
  KYCStep1Data,
  KYCStep2Data,
  KYCStep3Data,
  KYCStep4Data,
  KYCFormData,
  KYCVerificationStatus,
  GigPlatform,
  GigPlatformInput,
  RyScoreCalculation,
  FormValidationResult,
} from '../types';
import {
  getKYCProgress,
  submitStep1,
  submitStep2,
  submitStep3,
  submitStep4,
  getLinkedPlatforms,
  validateStep1,
  validateICNumber,
  formatICNumber,
  resetKYCData,
} from '../services/kycService';

interface KYCState {
  currentStep: KYCStep;
  completedSteps: KYCStep[];
  verificationStatus: KYCVerificationStatus;
  isLoading: boolean;
  error: string | null;
  formData: KYCFormData;
  linkedPlatforms: GigPlatform[];
  ryscore: RyScoreCalculation | null;
}

interface UseKYCReturn {
  // State
  state: KYCState;
  currentStep: KYCStep;
  completedSteps: KYCStep[];
  verificationStatus: KYCVerificationStatus;
  isLoading: boolean;
  error: string | null;
  formData: KYCFormData;
  linkedPlatforms: GigPlatform[];
  ryscore: RyScoreCalculation | null;
  
  // Progress
  progressPercent: number;
  isStepComplete: (step: KYCStep) => boolean;
  canProceedToStep: (step: KYCStep) => boolean;
  
  // Actions
  loadProgress: (userId: string) => Promise<void>;
  goToStep: (step: KYCStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  
  // Step Data Updates
  updateStep1Data: (data: Partial<KYCStep1Data>) => void;
  updateStep2Data: (data: Partial<KYCStep2Data>) => void;
  updateStep3Data: (data: Partial<KYCStep3Data>) => void;
  addPlatform: (platform: GigPlatformInput) => void;
  removePlatform: (index: number) => void;
  
  // Submissions
  submitCurrentStep: (userId: string) => Promise<boolean>;
  submitStep1Form: (userId: string) => Promise<boolean>;
  submitStep2Form: (userId: string) => Promise<boolean>;
  submitStep3Form: (userId: string) => Promise<boolean>;
  submitStep4Form: (userId: string) => Promise<boolean>;
  
  // Validation
  validateCurrentStep: () => FormValidationResult;
  
  // Utilities
  clearError: () => void;
  resetKYC: () => void;
  formatIC: (ic: string) => string;
}

const initialFormData: KYCFormData = {
  step1: {
    fullName: '',
    icNumber: '',
    dateOfBirth: undefined,
    gender: undefined,
    addressLine1: undefined,
    addressLine2: undefined,
    city: undefined,
    state: undefined,
    postcode: undefined,
  },
  step2: {
    idFrontFile: null,
    idFrontPreview: null,
    idBackFile: null,
    idBackPreview: null,
  },
  step3: {
    faceImageFile: null,
    faceImagePreview: null,
    faceVideoFile: null,
    livenessCompleted: false,
  },
  step4: {
    platforms: [],
  },
};

export function useKYC(): UseKYCReturn {
  const [state, setState] = useState<KYCState>({
    currentStep: 1,
    completedSteps: [],
    verificationStatus: 'pending',
    isLoading: false,
    error: null,
    formData: initialFormData,
    linkedPlatforms: [],
    ryscore: null,
  });
  
  // Computed values
  const progressPercent = (state.currentStep / 4) * 100;
  
  const isStepComplete = useCallback((step: KYCStep): boolean => {
    return state.completedSteps.includes(step);
  }, [state.completedSteps]);
  
  const canProceedToStep = useCallback((step: KYCStep): boolean => {
    if (step === 1) return true;
    return state.completedSteps.includes((step - 1) as KYCStep);
  }, [state.completedSteps]);
  
  // Actions
  const setLoading = useCallback((isLoading: boolean) => {
    setState(prev => ({ ...prev, isLoading }));
  }, []);
  
  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error, isLoading: false }));
  }, []);
  
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);
  
  const loadProgress = useCallback(async (userId: string): Promise<void> => {
    setLoading(true);
    clearError();
    
    const response = await getKYCProgress(userId);
    
    if (response.success && response.data) {
      setState(prev => ({
        ...prev,
        currentStep: response.data!.currentStep,
        completedSteps: response.data!.completedSteps,
        verificationStatus: response.data!.verificationStatus,
        isLoading: false,
      }));
      
      // Load linked platforms
      const platformsResponse = await getLinkedPlatforms(userId);
      if (platformsResponse.success && platformsResponse.data) {
        setState(prev => ({
          ...prev,
          linkedPlatforms: platformsResponse.data!,
        }));
      }
    } else {
      setError(response.error || 'Failed to load KYC progress');
    }
  }, []);
  
  const goToStep = useCallback((step: KYCStep): void => {
    if (canProceedToStep(step) || step <= state.currentStep) {
      setState(prev => ({ ...prev, currentStep: step }));
    }
  }, [canProceedToStep, state.currentStep]);
  
  const nextStep = useCallback((): void => {
    if (state.currentStep < 4) {
      setState(prev => ({ 
        ...prev, 
        currentStep: (prev.currentStep + 1) as KYCStep 
      }));
    }
  }, [state.currentStep]);
  
  const prevStep = useCallback((): void => {
    if (state.currentStep > 1) {
      setState(prev => ({ 
        ...prev, 
        currentStep: (prev.currentStep - 1) as KYCStep 
      }));
    }
  }, [state.currentStep]);
  
  // Step Data Updates
  const updateStep1Data = useCallback((data: Partial<KYCStep1Data>): void => {
    setState(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        step1: { ...prev.formData.step1, ...data },
      },
    }));
  }, []);
  
  const updateStep2Data = useCallback((data: Partial<KYCStep2Data>): void => {
    setState(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        step2: { ...prev.formData.step2, ...data },
      },
    }));
  }, []);
  
  const updateStep3Data = useCallback((data: Partial<KYCStep3Data>): void => {
    setState(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        step3: { ...prev.formData.step3, ...data },
      },
    }));
  }, []);
  
  const addPlatform = useCallback((platform: GigPlatformInput): void => {
    setState(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        step4: {
          platforms: [...prev.formData.step4.platforms, platform],
        },
      },
    }));
  }, []);
  
  const removePlatform = useCallback((index: number): void => {
    setState(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        step4: {
          platforms: prev.formData.step4.platforms.filter((_, i) => i !== index),
        },
      },
    }));
  }, []);
  
  // Validation
  const validateCurrentStep = useCallback((): FormValidationResult => {
    switch (state.currentStep) {
      case 1:
        return validateStep1(state.formData.step1);
      case 2:
        if (!state.formData.step2.idFrontFile || !state.formData.step2.idBackFile) {
          return {
            isValid: false,
            errors: [{ field: 'documents', message: 'Both front and back of MyKad are required' }],
          };
        }
        return { isValid: true, errors: [] };
      case 3:
        if (!state.formData.step3.faceImageFile && !state.formData.step3.livenessCompleted) {
          return {
            isValid: false,
            errors: [{ field: 'face', message: 'Face verification is required' }],
          };
        }
        return { isValid: true, errors: [] };
      case 4:
        if (state.formData.step4.platforms.length === 0) {
          return {
            isValid: false,
            errors: [{ field: 'platforms', message: 'At least one gig platform is required' }],
          };
        }
        return { isValid: true, errors: [] };
      default:
        return { isValid: true, errors: [] };
    }
  }, [state.currentStep, state.formData]);
  
  // Submissions
  const submitStep1Form = useCallback(async (userId: string): Promise<boolean> => {
    setLoading(true);
    clearError();
    
    const response = await submitStep1(userId, state.formData.step1);
    
    if (response.success) {
      setState(prev => ({
        ...prev,
        completedSteps: [...new Set([...prev.completedSteps, 1 as KYCStep])],
        currentStep: 2,
        verificationStatus: response.verificationStatus || prev.verificationStatus,
        isLoading: false,
      }));
      return true;
    } else {
      setError(response.error || response.message);
      return false;
    }
  }, [state.formData.step1]);
  
  const submitStep2Form = useCallback(async (userId: string): Promise<boolean> => {
    setLoading(true);
    clearError();
    
    const response = await submitStep2(userId, state.formData.step2);
    
    if (response.success) {
      setState(prev => ({
        ...prev,
        completedSteps: [...new Set([...prev.completedSteps, 2 as KYCStep])],
        currentStep: 3,
        verificationStatus: response.verificationStatus || prev.verificationStatus,
        isLoading: false,
      }));
      return true;
    } else {
      setError(response.error || response.message);
      return false;
    }
  }, [state.formData.step2]);
  
  const submitStep3Form = useCallback(async (userId: string): Promise<boolean> => {
    setLoading(true);
    clearError();
    
    const response = await submitStep3(userId, state.formData.step3);
    
    if (response.success) {
      setState(prev => ({
        ...prev,
        completedSteps: [...new Set([...prev.completedSteps, 3 as KYCStep])],
        currentStep: 4,
        verificationStatus: response.verificationStatus || prev.verificationStatus,
        isLoading: false,
      }));
      return true;
    } else {
      setError(response.error || response.message);
      return false;
    }
  }, [state.formData.step3]);
  
  const submitStep4Form = useCallback(async (userId: string): Promise<boolean> => {
    setLoading(true);
    clearError();
    
    const response = await submitStep4(userId, state.formData.step4);
    
    if (response.success) {
      setState(prev => ({
        ...prev,
        completedSteps: [...new Set([...prev.completedSteps, 4 as KYCStep])],
        verificationStatus: response.verificationStatus || prev.verificationStatus,
        ryscore: response.ryscore || null,
        isLoading: false,
      }));
      return true;
    } else {
      setError(response.error || response.message);
      return false;
    }
  }, [state.formData.step4]);
  
  const submitCurrentStep = useCallback(async (userId: string): Promise<boolean> => {
    const validation = validateCurrentStep();
    if (!validation.isValid) {
      setError(validation.errors.map(e => e.message).join(', '));
      return false;
    }
    
    switch (state.currentStep) {
      case 1:
        return submitStep1Form(userId);
      case 2:
        return submitStep2Form(userId);
      case 3:
        return submitStep3Form(userId);
      case 4:
        return submitStep4Form(userId);
      default:
        return false;
    }
  }, [state.currentStep, validateCurrentStep, submitStep1Form, submitStep2Form, submitStep3Form, submitStep4Form]);
  
  const resetKYC = useCallback((): void => {
    resetKYCData();
    setState({
      currentStep: 1,
      completedSteps: [],
      verificationStatus: 'pending',
      isLoading: false,
      error: null,
      formData: initialFormData,
      linkedPlatforms: [],
      ryscore: null,
    });
  }, []);
  
  const formatIC = useCallback((ic: string): string => {
    return formatICNumber(ic);
  }, []);
  
  return {
    state,
    currentStep: state.currentStep,
    completedSteps: state.completedSteps,
    verificationStatus: state.verificationStatus,
    isLoading: state.isLoading,
    error: state.error,
    formData: state.formData,
    linkedPlatforms: state.linkedPlatforms,
    ryscore: state.ryscore,
    
    progressPercent,
    isStepComplete,
    canProceedToStep,
    
    loadProgress,
    goToStep,
    nextStep,
    prevStep,
    
    updateStep1Data,
    updateStep2Data,
    updateStep3Data,
    addPlatform,
    removePlatform,
    
    submitCurrentStep,
    submitStep1Form,
    submitStep2Form,
    submitStep3Form,
    submitStep4Form,
    
    validateCurrentStep,
    
    clearError,
    resetKYC,
    formatIC,
  };
}

export default useKYC;

