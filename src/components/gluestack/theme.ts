// ============================================
// RYSE Theme Configuration - OBSIDIAN EDITION
// Strict Green/White/Black Color Palette
// Project Obsidian - Neon-Noir Aesthetic
// ============================================

/**
 * STRICT PALETTE RULES:
 * - Only #060606, #121212, #39FF14, and white variants allowed
 * - NO grays, blues, purples, or other colors
 * - Use opacity variants of white for text hierarchy
 */

export const RyseTheme = {
  // Brand Colors - OBSIDIAN PALETTE
  colors: {
    // Obsidian Backgrounds
    obsidian: {
      100: '#060606', // Main background
      200: '#121212', // Surface/Cards
      300: '#1A1A1A', // Elevated surfaces
      400: '#242424', // Hover states
    },

    // Neon Green - Primary action color
    neon: {
      primary: '#39FF14', // Main neon green
      dim: '#1B7A0F',     // Inactive/decorative
      bright: '#4AFF26',  // Hover states
      glow: 'rgba(57, 255, 20, 0.5)',
    },

    // White variants for text hierarchy
    white: {
      high: '#FFFFFF',                    // 100% - Headings
      med: 'rgba(255, 255, 255, 0.87)',   // 87% - Body text
      low: 'rgba(255, 255, 255, 0.60)',   // 60% - Secondary
      muted: 'rgba(255, 255, 255, 0.38)', // 38% - Disabled
      divider: 'rgba(255, 255, 255, 0.12)', // Dividers
    },

    // Pure values
    black: '#000000',
    white100: '#FFFFFF',

    // Legacy mappings for compatibility (map to Obsidian)
    primary: {
      50: '#1B7A0F',
      100: '#1B7A0F',
      200: '#1B7A0F',
      300: '#2ECC40',
      400: '#39FF14',
      500: '#39FF14',  // Main Neon Green
      600: '#4AFF26',
      700: '#4AFF26',
      800: '#4AFF26',
      900: '#4AFF26',
    },

    // Accent - Same as primary in Obsidian (neon green)
    accent: {
      50: '#1B7A0F',
      100: '#1B7A0F',
      200: '#1B7A0F',
      300: '#2ECC40',
      400: '#39FF14',
      500: '#39FF14',  // Main Neon Green
      600: '#4AFF26',
      700: '#4AFF26',
      800: '#4AFF26',
      900: '#4AFF26',
    },

    // Semantic Colors - Mapped to strict palette
    success: {
      light: 'rgba(57, 255, 20, 0.2)',
      main: '#39FF14',  // Neon green
      dark: '#1B7A0F',
    },
    warning: {
      light: 'rgba(255, 255, 255, 0.2)',
      main: '#FFFFFF',  // White for warnings (use alert pattern)
      dark: 'rgba(255, 255, 255, 0.87)',
    },
    error: {
      light: 'rgba(255, 255, 255, 0.2)',
      main: '#FFFFFF',  // White for errors (use alert pattern)
      dark: 'rgba(255, 255, 255, 0.87)',
    },

    // Gray scale - Map to obsidian scale
    gray: {
      50: '#242424',
      100: '#1A1A1A',
      200: '#121212',
      300: '#121212',
      400: 'rgba(255, 255, 255, 0.38)',
      500: 'rgba(255, 255, 255, 0.60)',
      600: 'rgba(255, 255, 255, 0.60)',
      700: 'rgba(255, 255, 255, 0.87)',
      800: 'rgba(255, 255, 255, 0.87)',
      900: '#FFFFFF',
    },

    // RyScore Colors - Neon variants
    ryscore: {
      platinum: '#39FF14', // All tiers use neon green
      gold: '#39FF14',
      silver: '#1B7A0F',
      bronze: '#1B7A0F',
    },
  },

  // Spacing Scale
  spacing: {
    0: '0px',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
    20: '80px',
  },

  // Border Radius
  radii: {
    none: '0px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '20px',
    '3xl': '24px',
    full: '9999px',
  },

  // Font Sizes
  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
    '5xl': '48px',
  },

  // Font Weights
  fontWeights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  // Shadows - Neon glow effects
  shadows: {
    sm: '0 0 10px rgba(57, 255, 20, 0.3)',
    md: '0 0 20px rgba(57, 255, 20, 0.4)',
    lg: '0 0 30px rgba(57, 255, 20, 0.5)',
    xl: '0 0 40px rgba(57, 255, 20, 0.6)',
    '2xl': '0 0 50px rgba(57, 255, 20, 0.7)',
    // Neon glow shadows
    neon: '0 0 20px rgba(57, 255, 20, 0.4)',
    neonLg: '0 0 40px rgba(57, 255, 20, 0.6)',
    // Glass shadow
    glass: '0 20px 40px rgba(0, 0, 0, 0.4)',
    // Text glow
    textGlow: '0 0 10px rgba(57, 255, 20, 0.8), 0 0 20px rgba(57, 255, 20, 0.4)',
  },

  // Glassmorphism
  glass: {
    background: 'rgba(10, 10, 10, 0.7)',
    backdropBlur: 'blur(30px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },

  // Transitions
  transitions: {
    fast: '100ms cubic-bezier(0.2, 0.0, 0.2, 1.0)',
    normal: '200ms cubic-bezier(0.2, 0.0, 0.2, 1.0)',
    slow: '300ms cubic-bezier(0.2, 0.0, 0.2, 1.0)',
  },
} as const;

// Type exports
export type RyseColors = typeof RyseTheme.colors;
export type RyseSpacing = typeof RyseTheme.spacing;

// Helper functions
export const getScoreColor = (score: number): string => {
  // All scores return neon green in Obsidian theme
  if (score > 700) return RyseTheme.colors.neon.primary;
  if (score > 500) return RyseTheme.colors.neon.primary;
  return RyseTheme.colors.neon.dim;
};

export const getScoreTier = (score: number): { name: string; color: string; emoji: string } => {
  // All tiers use neon green variants
  if (score >= 750) return {
    name: 'Platinum',
    color: RyseTheme.colors.neon.primary,
    emoji: '💎'
  };
  if (score >= 650) return {
    name: 'Gold',
    color: RyseTheme.colors.neon.primary,
    emoji: '🥇'
  };
  if (score >= 550) return {
    name: 'Silver',
    color: RyseTheme.colors.neon.dim,
    emoji: '🥈'
  };
  return {
    name: 'Bronze',
    color: RyseTheme.colors.neon.dim,
    emoji: '🥉'
  };
};

// CSS Variables for global use - OBSIDIAN
export const cssVariables = `
  :root {
    /* Obsidian Backgrounds */
    --obsidian-100: ${RyseTheme.colors.obsidian[100]};
    --obsidian-200: ${RyseTheme.colors.obsidian[200]};
    --obsidian-300: ${RyseTheme.colors.obsidian[300]};
    --obsidian-400: ${RyseTheme.colors.obsidian[400]};
    
    /* Neon Green */
    --neon-primary: ${RyseTheme.colors.neon.primary};
    --neon-dim: ${RyseTheme.colors.neon.dim};
    --neon-bright: ${RyseTheme.colors.neon.bright};
    --neon-glow: ${RyseTheme.colors.neon.glow};
    
    /* White Variants */
    --white-high: ${RyseTheme.colors.white.high};
    --white-med: ${RyseTheme.colors.white.med};
    --white-low: ${RyseTheme.colors.white.low};
    --white-muted: ${RyseTheme.colors.white.muted};
    --white-divider: ${RyseTheme.colors.white.divider};
    
    /* Shadows */
    --shadow-neon-sm: ${RyseTheme.shadows.sm};
    --shadow-neon-md: ${RyseTheme.shadows.md};
    --shadow-neon-lg: ${RyseTheme.shadows.lg};
    --shadow-text-glow: ${RyseTheme.shadows.textGlow};
    
    /* Glass */
    --glass-bg: ${RyseTheme.glass.background};
    --glass-blur: ${RyseTheme.glass.backdropBlur};
    --glass-border: ${RyseTheme.glass.border};
    --glass-shadow: ${RyseTheme.shadows.glass};
    
    /* Legacy compatibility */
    --ryse-primary: ${RyseTheme.colors.neon.primary};
    --ryse-accent: ${RyseTheme.colors.neon.primary};
    --ryse-success: ${RyseTheme.colors.neon.primary};
    --ryse-green: ${RyseTheme.colors.neon.primary};
  }
`;

export default RyseTheme;
