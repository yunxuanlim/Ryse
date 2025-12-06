-- ============================================
-- RYSE Application Database Schema
-- Database: TiDB Serverless (MySQL Compatible)
-- Version: 1.0.0
-- ============================================

-- ============================================
-- 1. USERS TABLE
-- Core user account information
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id CHAR(36) PRIMARY KEY, -- UUID
    phone_number VARCHAR(20) NOT NULL UNIQUE, -- +60 format
    full_name VARCHAR(255),
    mpin_hash VARCHAR(255), -- bcrypt hashed 6-digit PIN
    kyc_status ENUM(
        'not_started',
        'in_progress',
        'pending_review',
        'verified',
        'rejected'
    ) DEFAULT 'not_started',
    ryscore_current INT DEFAULT 300, -- Initial score
    ryscore_tier ENUM(
        'Bronze',
        'Silver',
        'Gold',
        'Platinum'
    ) DEFAULT 'Bronze',
    is_active BOOLEAN DEFAULT TRUE,
    last_login_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_phone (phone_number),
    INDEX idx_kyc_status (kyc_status)
);

-- ============================================
-- 2. USER SESSIONS TABLE
-- JWT session management
-- ============================================
CREATE TABLE IF NOT EXISTS user_sessions (
    session_id CHAR(36) PRIMARY KEY,
    user_id CHAR(36) NOT NULL,
    token TEXT NOT NULL, -- JWT token
    device_info JSON, -- Optional device metadata
    ip_address VARCHAR(45), -- IPv4/IPv6
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    INDEX idx_user_sessions (user_id),
    INDEX idx_expires (expires_at)
);

-- ============================================
-- 3. OTP VERIFICATION TABLE
-- Phone number OTP verification
-- ============================================
CREATE TABLE IF NOT EXISTS otp_verifications (
    id CHAR(36) PRIMARY KEY,
    phone_number VARCHAR(20) NOT NULL,
    otp_code VARCHAR(6) NOT NULL, -- 6-digit OTP
    purpose ENUM(
        'registration',
        'login',
        'reset_pin'
    ) NOT NULL,
    attempts INT DEFAULT 0, -- Track failed attempts
    max_attempts INT DEFAULT 3,
    is_verified BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_phone_otp (phone_number, otp_code),
    INDEX idx_expires (expires_at)
);

-- ============================================
-- 4. KYC PROFILES TABLE
-- Identity verification data
-- ============================================
CREATE TABLE IF NOT EXISTS kyc_profiles (
    id CHAR(36) PRIMARY KEY,
    user_id CHAR(36) NOT NULL UNIQUE,

-- Personal Information (Step 1)
full_name VARCHAR(255),
ic_number VARCHAR(20) UNIQUE, -- Malaysian IC: YYMMDD-SS-NNNN
date_of_birth DATE,
gender ENUM('male', 'female') NULL,
address_line1 VARCHAR(255),
address_line2 VARCHAR(255),
city VARCHAR(100),
state VARCHAR(100),
postcode VARCHAR(10),

-- Document Upload (Step 2)
id_front_url TEXT, -- MyKad front image URL
id_back_url TEXT, -- MyKad back image URL
id_front_uploaded_at TIMESTAMP NULL,
id_back_uploaded_at TIMESTAMP NULL,

-- Face Liveness (Step 3)
face_image_url TEXT, -- Selfie image
face_video_url TEXT, -- Liveness video
liveness_score DECIMAL(5, 2) NULL, -- AI confidence score
face_verified_at TIMESTAMP NULL,

-- OCR Extracted Data
ocr_extracted_name VARCHAR(255),
ocr_extracted_ic VARCHAR(20),
ocr_confidence DECIMAL(5, 2) NULL,

-- Verification Status
verification_status ENUM(
    'pending',
    'documents_uploaded',
    'face_verified',
    'under_review',
    'verified',
    'rejected'
) DEFAULT 'pending',
rejection_reason TEXT,
verified_by VARCHAR(100), -- Admin/System ID
verified_at TIMESTAMP NULL,

-- Metadata
current_step INT DEFAULT 1,                 -- Track wizard progress (1-4)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_ic_number (ic_number),
    INDEX idx_verification_status (verification_status)
);

-- ============================================
-- 5. GIG PLATFORMS TABLE
-- Linked gig economy platform accounts
-- ============================================
CREATE TABLE IF NOT EXISTS gig_platforms (
    id CHAR(36) PRIMARY KEY,
    user_id CHAR(36) NOT NULL,

-- Platform Info
platform_name ENUM(
    'Grab',
    'Foodpanda',
    'Shopee',
    'Lalamove',
    'GoGet',
    'Other'
) NOT NULL,
platform_logo_url TEXT,
driver_id VARCHAR(100), -- Platform-specific ID
driver_email VARCHAR(255),

-- Platform Stats (fetched or manual)
joined_date DATE,
rating DECIMAL(3, 2), -- e.g., 4.90
total_trips INT DEFAULT 0,
total_deliveries INT DEFAULT 0,
lifetime_earnings DECIMAL(15, 2) DEFAULT 0, -- In MYR
this_month_earnings DECIMAL(15, 2) DEFAULT 0,
completion_rate DECIMAL(5, 2) DEFAULT 0, -- Percentage
acceptance_rate DECIMAL(5, 2) DEFAULT 0, -- Percentage
cancellation_rate DECIMAL(5, 2) DEFAULT 0, -- Percentage

-- Verification
is_verified BOOLEAN DEFAULT FALSE,
verification_method ENUM(
    'oauth',
    'manual',
    'screenshot'
) DEFAULT 'manual',
verified_at TIMESTAMP NULL,
last_synced_at TIMESTAMP NULL,

-- Status
is_primary BOOLEAN DEFAULT FALSE,           -- Primary income source
    is_active BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_platforms (user_id),
    INDEX idx_platform_name (platform_name),
    UNIQUE KEY unique_user_platform (user_id, platform_name, driver_id)
);

-- ============================================
-- 6. RYSCORE HISTORY TABLE
-- Track score changes over time
-- ============================================

CREATE TABLE IF NOT EXISTS ryscore_history (
    id CHAR(36) PRIMARY KEY,
    user_id CHAR(36) NOT NULL,
    
    previous_score INT,
    new_score INT NOT NULL,
    score_change INT,                           -- Calculated: new - previous

-- Score Breakdown
income_stability_score INT,
platform_rating_score INT,
work_tenure_score INT,
savings_habits_score INT,
repayment_history_score INT,

-- Change Reason
change_reason ENUM(
    'initial_calculation',
    'platform_linked',
    'platform_updated',
    'loan_repaid',
    'loan_defaulted',
    'savings_milestone',
    'manual_adjustment',
    'monthly_recalculation'
) NOT NULL,
change_description TEXT,

-- Tier Info
previous_tier ENUM('Bronze', 'Silver', 'Gold', 'Platinum'),
    new_tier ENUM('Bronze', 'Silver', 'Gold', 'Platinum') NOT NULL,
    tier_changed BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_score_history (user_id, created_at)
);

-- ============================================
-- 7. KYC AUDIT LOG TABLE
-- Track all KYC-related actions
-- ============================================
CREATE TABLE IF NOT EXISTS kyc_audit_log (
    id CHAR(36) PRIMARY KEY,
    user_id CHAR(36) NOT NULL,
    kyc_profile_id CHAR(36),
    action ENUM(
        'kyc_started',
        'step_completed',
        'document_uploaded',
        'face_captured',
        'platform_linked',
        'platform_verified',
        'submitted_for_review',
        'approved',
        'rejected',
        'resubmitted'
    ) NOT NULL,
    step_number INT,
    details JSON, -- Additional action details
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    INDEX idx_user_audit (user_id, created_at)
);

-- ============================================
-- SEED DATA FOR DEVELOPMENT
-- ============================================

-- Insert test user (for development only)
-- Password/PIN should be hashed in production
INSERT INTO
    users (
        id,
        phone_number,
        full_name,
        mpin_hash,
        kyc_status,
        ryscore_current,
        ryscore_tier
    )
VALUES (
        '550e8400-e29b-41d4-a716-446655440000',
        '+60123456789',
        'Olivia Lim',
        '$2b$10$test_hash_for_dev',
        'verified',
        720,
        'Gold'
    )
ON DUPLICATE KEY UPDATE
    updated_at = CURRENT_TIMESTAMP;

-- Insert test KYC profile
INSERT INTO
    kyc_profiles (
        id,
        user_id,
        full_name,
        ic_number,
        verification_status,
        current_step
    )
VALUES (
        '660e8400-e29b-41d4-a716-446655440001',
        '550e8400-e29b-41d4-a716-446655440000',
        'Olivia Lim',
        '900101-14-5678',
        'verified',
        4
    )
ON DUPLICATE KEY UPDATE
    updated_at = CURRENT_TIMESTAMP;

-- Insert test gig platforms
INSERT INTO
    gig_platforms (
        id,
        user_id,
        platform_name,
        driver_id,
        joined_date,
        rating,
        total_trips,
        lifetime_earnings,
        completion_rate,
        is_verified,
        is_primary
    )
VALUES (
        '770e8400-e29b-41d4-a716-446655440002',
        '550e8400-e29b-41d4-a716-446655440000',
        'Grab',
        'GRB-12345',
        '2023-01-15',
        4.90,
        847,
        45000.00,
        98.50,
        TRUE,
        TRUE
    ),
    (
        '770e8400-e29b-41d4-a716-446655440003',
        '550e8400-e29b-41d4-a716-446655440000',
        'Foodpanda',
        'FP-67890',
        '2023-06-01',
        4.80,
        523,
        28000.00,
        97.20,
        TRUE,
        FALSE
    )
ON DUPLICATE KEY UPDATE
    updated_at = CURRENT_TIMESTAMP;

-- ============================================
-- HELPER VIEWS
-- ============================================

-- View: User with KYC status
CREATE OR REPLACE VIEW v_user_kyc_status AS
SELECT
    u.id,
    u.phone_number,
    u.full_name,
    u.kyc_status,
    u.ryscore_current,
    u.ryscore_tier,
    k.verification_status as kyc_verification_status,
    k.current_step as kyc_current_step,
    COUNT(DISTINCT g.id) as linked_platforms_count
FROM
    users u
    LEFT JOIN kyc_profiles k ON u.id = k.user_id
    LEFT JOIN gig_platforms g ON u.id = g.user_id
    AND g.is_verified = TRUE
GROUP BY
    u.id,
    u.phone_number,
    u.full_name,
    u.kyc_status,
    u.ryscore_current,
    u.ryscore_tier,
    k.verification_status,
    k.current_step;

-- View: Platform stats summary
CREATE OR REPLACE VIEW v_user_platform_stats AS
SELECT
    user_id,
    COUNT(*) as total_platforms,
    SUM(
        CASE
            WHEN is_verified THEN 1
            ELSE 0
        END
    ) as verified_platforms,
    AVG(rating) as avg_rating,
    SUM(total_trips) as total_trips,
    SUM(lifetime_earnings) as total_lifetime_earnings,
    AVG(completion_rate) as avg_completion_rate
FROM gig_platforms
WHERE
    is_active = TRUE
GROUP BY
    user_id;