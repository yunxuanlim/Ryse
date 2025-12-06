// ============================================
// Database Connection Utility
// For TiDB Serverless (MySQL Compatible)
// ============================================

/**
 * DATABASE CONNECTION SETUP
 * 
 * This file provides the database connection utility for TiDB Serverless.
 * 
 * IMPORTANT: This is a client-side React app (Vite), so direct database
 * connections should NOT be made from the browser. Instead, you should:
 * 
 * Option 1: Migrate to Next.js (recommended in PRD)
 *   - Use Next.js API routes for database operations
 *   - Connection happens server-side only
 * 
 * Option 2: Create a separate backend server
 *   - Express.js, Fastify, or similar
 *   - Database connection happens on the server
 * 
 * Option 3: Use a BaaS (Backend as a Service)
 *   - Supabase, Firebase, etc.
 *   - Handle database operations via SDK
 * 
 * Below is the BACKEND code that would be used with Next.js API routes
 * or a Node.js server. DO NOT import this in frontend code!
 */

// ============================================
// FOR NEXT.JS API ROUTES OR NODE.JS SERVER
// ============================================

/*
// Install: npm install mysql2 serverless-mysql

import mysql from 'serverless-mysql';

// TiDB connection configuration
const db = mysql({
  config: {
    host: process.env.TIDB_HOST,
    port: parseInt(process.env.TIDB_PORT || '4000'),
    user: process.env.TIDB_USER,
    password: process.env.TIDB_PASSWORD,
    database: process.env.TIDB_DATABASE,
    ssl: {
      rejectUnauthorized: true,
    },
  },
});

// Query helper function
export async function query<T = any>(
  sql: string, 
  values?: any[]
): Promise<T> {
  try {
    const results = await db.query<T>(sql, values);
    await db.end();
    return results;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Transaction helper
export async function transaction<T>(
  callback: (query: (sql: string, values?: any[]) => Promise<any>) => Promise<T>
): Promise<T> {
  try {
    await db.query('START TRANSACTION');
    const result = await callback((sql, values) => db.query(sql, values));
    await db.query('COMMIT');
    await db.end();
    return result;
  } catch (error) {
    await db.query('ROLLBACK');
    await db.end();
    throw error;
  }
}

export default db;
*/

// ============================================
// ENVIRONMENT VARIABLES TEMPLATE
// ============================================

/**
 * Add these to your .env file:
 * 
 * # TiDB Serverless Connection
 * TIDB_HOST=gateway01.ap-southeast-1.prod.aws.tidbcloud.com
 * TIDB_PORT=4000
 * TIDB_USER=your_username
 * TIDB_PASSWORD=your_password
 * TIDB_DATABASE=ryse_db
 * 
 * # For Next.js, prefix with NEXT_PUBLIC_ only for client-side vars
 * # Database credentials should NEVER be exposed to client
 */

// ============================================
// API SERVICE LAYER (FOR FRONTEND USE)
// ============================================

/**
 * This is what the frontend should use - API calls to backend endpoints
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

interface APIOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any;
  headers?: Record<string, string>;
}

interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Make API request to backend
 */
export async function apiRequest<T = any>(
  endpoint: string,
  options: APIOptions = {}
): Promise<APIResponse<T>> {
  const { method = 'GET', body, headers = {} } = options;
  
  const token = localStorage.getItem('ryse_auth_token');
  
  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  };
  
  if (token) {
    requestHeaders['Authorization'] = `Bearer ${token}`;
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: requestHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return {
        success: false,
        error: data.error || data.message || 'Request failed',
      };
    }
    
    return {
      success: true,
      data: data.data || data,
      message: data.message,
    };
  } catch (error) {
    console.error('API request error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

/**
 * API endpoints helper
 */
export const api = {
  // Auth endpoints
  auth: {
    register: (phoneNumber: string) => 
      apiRequest('/auth/register', { method: 'POST', body: { phoneNumber } }),
    
    verifyOTP: (phoneNumber: string, otp: string, purpose: string) =>
      apiRequest('/auth/verify-otp', { method: 'POST', body: { phoneNumber, otp, purpose } }),
    
    setMPIN: (phoneNumber: string, mpin: string) =>
      apiRequest('/auth/set-mpin', { method: 'POST', body: { phoneNumber, mpin } }),
    
    login: (phoneNumber: string, mpin: string) =>
      apiRequest('/auth/login', { method: 'POST', body: { phoneNumber, mpin } }),
    
    logout: () =>
      apiRequest('/auth/logout', { method: 'POST' }),
    
    me: () =>
      apiRequest('/auth/me'),
  },
  
  // KYC endpoints
  kyc: {
    getProgress: () =>
      apiRequest('/kyc/progress'),
    
    submitStep1: (data: any) =>
      apiRequest('/kyc/step1', { method: 'POST', body: data }),
    
    submitStep2: (data: FormData) =>
      apiRequest('/kyc/step2', { 
        method: 'POST', 
        body: data,
        headers: { 'Content-Type': 'multipart/form-data' }
      }),
    
    submitStep3: (data: FormData) =>
      apiRequest('/kyc/step3', { method: 'POST', body: data }),
    
    submitStep4: (data: any) =>
      apiRequest('/kyc/step4', { method: 'POST', body: data }),
    
    verifyPlatform: (platformName: string, driverId: string) =>
      apiRequest('/kyc/verify-platform', { method: 'POST', body: { platformName, driverId } }),
  },
  
  // User endpoints
  user: {
    getProfile: () =>
      apiRequest('/user/profile'),
    
    updateProfile: (data: any) =>
      apiRequest('/user/profile', { method: 'PUT', body: data }),
    
    getRyScore: () =>
      apiRequest('/user/ryscore'),
    
    getPlatforms: () =>
      apiRequest('/user/platforms'),
  },
};

// ============================================
// MOCK MODE FLAG
// ============================================

/**
 * When true, services will use mock data instead of real API calls.
 * Set to false when backend is ready.
 */
export const USE_MOCK_API = true;

/**
 * Check if we should use mock API
 */
export function shouldUseMock(): boolean {
  return USE_MOCK_API || !import.meta.env.VITE_API_URL;
}

