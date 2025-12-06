// ============================================
// RYSE Theme Configuration - Gluestack Style
// Centralized branding colors and tokens
// ============================================

export const RyseTheme = {
  // Brand Colors
  colors: {
    // Primary - Blue for headers, CTAs
    primary: {
      50: '#E6EEFF',
      100: '#CCE0FF',
      200: '#99C2FF',
      300: '#66A3FF',
      400: '#3385FF',
      500: '#0052FF',  // Main Primary Blue
      600: '#0042CC',
      700: '#003199',
      800: '#002166',
      900: '#001033',
    },
    
    // Accent - Yellow for Voice Button, highlights
    accent: {
      50: '#FFFCE6',
      100: '#FFF9CC',
      200: '#FFF399',
      300: '#FFEC66',
      400: '#FFE633',
      500: '#FFD300',  // Main Yellow
      600: '#CCAA00',
      700: '#998000',
      800: '#665500',
      900: '#332B00',
    },
    
    // Semantic Colors
    success: {
      light: '#D1FAE5',
      main: '#22C55E',
      dark: '#15803D',
    },
    warning: {
      light: '#FEF3C7',
      main: '#EAB308',
      dark: '#A16207',
    },
    error: {
      light: '#FEE2E2',
      main: '#EF4444',
      dark: '#B91C1C',
    },
    
    // Neutrals
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
    
    // Special
    black: '#000000',
    white: '#FFFFFF',
    
    // RyScore Colors
    ryscore: {
      platinum: '#8B5CF6',
      gold: '#F59E0B',
      silver: '#6B7280',
      bronze: '#92400E',
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
  
  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    // Brand shadows
    primary: '0 8px 32px rgba(0, 82, 255, 0.3)',
    accent: '0 8px 32px rgba(255, 211, 0, 0.4)',
  },
} as const;

// Type exports
export type RyseColors = typeof RyseTheme.colors;
export type RyseSpacing = typeof RyseTheme.spacing;

// Helper functions
export const getScoreColor = (score: number): string => {
  if (score > 700) return RyseTheme.colors.success.main;
  if (score > 500) return RyseTheme.colors.warning.main;
  return RyseTheme.colors.error.main;
};

export const getScoreTier = (score: number): { name: string; color: string; emoji: string } => {
  if (score >= 750) return { 
    name: 'Platinum', 
    color: RyseTheme.colors.ryscore.platinum, 
    emoji: '💎' 
  };
  if (score >= 650) return { 
    name: 'Gold', 
    color: RyseTheme.colors.ryscore.gold, 
    emoji: '🥇' 
  };
  if (score >= 550) return { 
    name: 'Silver', 
    color: RyseTheme.colors.ryscore.silver, 
    emoji: '🥈' 
  };
  return { 
    name: 'Bronze', 
    color: RyseTheme.colors.ryscore.bronze, 
    emoji: '🥉' 
  };
};

// CSS Variables for global use
export const cssVariables = `
  :root {
    /* Primary */
    --ryse-primary: ${RyseTheme.colors.primary[500]};
    --ryse-primary-light: ${RyseTheme.colors.primary[100]};
    --ryse-primary-dark: ${RyseTheme.colors.primary[700]};
    
    /* Accent */
    --ryse-accent: ${RyseTheme.colors.accent[500]};
    --ryse-accent-light: ${RyseTheme.colors.accent[100]};
    --ryse-accent-dark: ${RyseTheme.colors.accent[700]};
    
    /* Semantic */
    --ryse-success: ${RyseTheme.colors.success.main};
    --ryse-warning: ${RyseTheme.colors.warning.main};
    --ryse-error: ${RyseTheme.colors.error.main};
    
    /* Shadows */
    --ryse-shadow-primary: ${RyseTheme.shadows.primary};
    --ryse-shadow-accent: ${RyseTheme.shadows.accent};
  }
`;

export default RyseTheme;

