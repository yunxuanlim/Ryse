// ============================================
// OBSIDIAN DESIGN TOKENS
// Strict Green/White/Black Color Palette
// Project Obsidian - Neon-Noir Aesthetic
// ============================================

/**
 * Color Tokens - PRD Section 9.1
 * 
 * STRICT PALETTE RULES:
 * - Only #060606, #121212, #39FF14, and white variants allowed
 * - NO grays, blues, purples, or other colors
 * - Use opacity variants of white for text hierarchy
 */

export const ObsidianColors = {
  // Deep Obsidian Backgrounds
  obsidian: {
    100: '#060606', // Main background - non-pure black prevents OLED smear
    200: '#121212', // Surface/Cards - elevates content from background
    300: '#1A1A1A', // Elevated surfaces
    400: '#242424', // Hover states on surfaces
  },

  // Hyper-Green (Action & Value)
  neon: {
    primary: '#39FF14',   // Main neon green - PRIMARY ACTIONS
    dim: '#1B7A0F',       // Inactive states / decorative backgrounds
    bright: '#4AFF26',    // Hover/active states
    glow: 'rgba(57, 255, 20, 0.5)', // Glow effect
    pulse: 'rgba(57, 255, 20, 0.3)', // Pulse animation
  },

  // Crisp White (Information) - opacity variants
  white: {
    high: '#FFFFFF',                    // 100% - Headings / Critical Values
    med: 'rgba(255, 255, 255, 0.87)',   // 87% - Body Text / Labels
    low: 'rgba(255, 255, 255, 0.60)',   // 60% - Secondary / Metadata
    muted: 'rgba(255, 255, 255, 0.38)', // 38% - Disabled / Hints
    divider: 'rgba(255, 255, 255, 0.12)', // Dividers
  },

  // Alert Pattern (replaces red for warnings)
  alert: {
    pattern: 'repeating-linear-gradient(45deg, #FFFFFF 0px, #FFFFFF 2px, #000000 2px, #000000 4px)',
    glitch: 'rgba(255, 255, 255, 0.8)',
  },

  // Pure black and white
  black: '#000000',
  white100: '#FFFFFF',
} as const;

/**
 * Typography Scale - PRD Section 9.2
 * Font: Clash Grotesk (Neo-Grotesque)
 * Fallback: Inter with adjusted weights
 */
export const ObsidianTypography = {
  fontFamily: {
    display: '"Clash Grotesk", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    mono: '"JetBrains Mono", "Fira Code", monospace',
  },

  // Font sizes with line heights
  scale: {
    displayXL: { size: '48px', lineHeight: '1.1', letterSpacing: '-0.02em', weight: '700' },  // Welcome hook
    displayL: { size: '40px', lineHeight: '1.15', letterSpacing: '-0.02em', weight: '700' },
    headingL: { size: '32px', lineHeight: '1.2', letterSpacing: '-0.01em', weight: '600' },   // Dashboard core
    headingM: { size: '24px', lineHeight: '1.25', letterSpacing: '-0.01em', weight: '600' },
    headingS: { size: '20px', lineHeight: '1.3', letterSpacing: '0', weight: '600' },
    bodyL: { size: '18px', lineHeight: '1.5', letterSpacing: '0', weight: '500' },
    bodyM: { size: '16px', lineHeight: '1.5', letterSpacing: '0', weight: '500' },           // High legibility
    bodyS: { size: '14px', lineHeight: '1.5', letterSpacing: '0', weight: '500' },
    caption: { size: '12px', lineHeight: '1.4', letterSpacing: '0.01em', weight: '500' },
    monoS: { size: '14px', lineHeight: '1.5', letterSpacing: '0.02em', weight: '400' },      // Currency values
    monoM: { size: '16px', lineHeight: '1.5', letterSpacing: '0.02em', weight: '400' },
  },

  // Minimum font weight for neon text (halation mitigation)
  minNeonWeight: '500',
} as const;

/**
 * Spacing Scale
 */
export const ObsidianSpacing = {
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
} as const;

/**
 * Border Radius
 */
export const ObsidianRadii = {
  none: '0px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '20px',
  '3xl': '24px',
  full: '9999px',
} as const;

/**
 * Shadows - Neon glow effects
 */
export const ObsidianShadows = {
  // Standard shadows
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
  
  // Neon glow shadows
  neonSm: '0 0 10px rgba(57, 255, 20, 0.3)',
  neonMd: '0 0 20px rgba(57, 255, 20, 0.4)',
  neonLg: '0 0 30px rgba(57, 255, 20, 0.5)',
  neonXl: '0 0 40px rgba(57, 255, 20, 0.6)',
  
  // Neon text glow
  textGlow: '0 0 10px rgba(57, 255, 20, 0.8), 0 0 20px rgba(57, 255, 20, 0.4)',
  
  // Glassmorphism
  glass: '0 20px 40px rgba(0, 0, 0, 0.4)',
} as const;

/**
 * Glassmorphism properties
 */
export const ObsidianGlass = {
  background: 'rgba(10, 10, 10, 0.7)',
  backdropBlur: 'blur(30px) saturate(180%)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  shadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
} as const;

/**
 * CSS Custom Properties for global use
 */
export const ObsidianCSSVariables = `
  :root {
    /* Obsidian Backgrounds */
    --obsidian-100: ${ObsidianColors.obsidian[100]};
    --obsidian-200: ${ObsidianColors.obsidian[200]};
    --obsidian-300: ${ObsidianColors.obsidian[300]};
    --obsidian-400: ${ObsidianColors.obsidian[400]};
    
    /* Neon Green */
    --neon-primary: ${ObsidianColors.neon.primary};
    --neon-dim: ${ObsidianColors.neon.dim};
    --neon-bright: ${ObsidianColors.neon.bright};
    --neon-glow: ${ObsidianColors.neon.glow};
    
    /* White Variants */
    --white-high: ${ObsidianColors.white.high};
    --white-med: ${ObsidianColors.white.med};
    --white-low: ${ObsidianColors.white.low};
    --white-muted: ${ObsidianColors.white.muted};
    --white-divider: ${ObsidianColors.white.divider};
    
    /* Typography */
    --font-display: ${ObsidianTypography.fontFamily.display};
    --font-mono: ${ObsidianTypography.fontFamily.mono};
    
    /* Shadows */
    --shadow-neon-sm: ${ObsidianShadows.neonSm};
    --shadow-neon-md: ${ObsidianShadows.neonMd};
    --shadow-neon-lg: ${ObsidianShadows.neonLg};
    --shadow-text-glow: ${ObsidianShadows.textGlow};
    
    /* Glassmorphism */
    --glass-bg: ${ObsidianGlass.background};
    --glass-blur: ${ObsidianGlass.backdropBlur};
    --glass-border: ${ObsidianGlass.border};
    --glass-shadow: ${ObsidianGlass.shadow};
  }
`;

/**
 * Helper function to get opacity variant of white
 */
export function getWhiteOpacity(opacity: number): string {
  return `rgba(255, 255, 255, ${opacity})`;
}

/**
 * Helper function to get neon glow with custom intensity
 */
export function getNeonGlow(intensity: number = 1): string {
  const base = 0.4 * intensity;
  return `0 0 ${20 * intensity}px rgba(57, 255, 20, ${Math.min(base, 1)})`;
}

/**
 * Alert pattern generator
 */
export function getAlertPattern(angle: number = 45): string {
  return `repeating-linear-gradient(${angle}deg, #FFFFFF 0px, #FFFFFF 2px, #000000 2px, #000000 4px)`;
}

// Default export
export const ObsidianTokens = {
  colors: ObsidianColors,
  typography: ObsidianTypography,
  spacing: ObsidianSpacing,
  radii: ObsidianRadii,
  shadows: ObsidianShadows,
  glass: ObsidianGlass,
  cssVariables: ObsidianCSSVariables,
} as const;

export default ObsidianTokens;

