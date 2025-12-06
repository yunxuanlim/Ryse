// ============================================
// OBSIDIAN DESIGN SYSTEM - Main Entry
// Export all design tokens and utilities
// ============================================

// Design tokens
export { 
  ObsidianTokens,
  ObsidianColors, 
  ObsidianTypography, 
  ObsidianSpacing, 
  ObsidianRadii, 
  ObsidianShadows, 
  ObsidianGlass,
  ObsidianCSSVariables,
  getWhiteOpacity,
  getNeonGlow,
  getAlertPattern,
} from './tokens/obsidian';

// Motion tokens
export {
  MotionTokens,
  SpringPhysics,
  Easings,
  Durations,
  MotionVariants,
  KeyframeAnimations,
  GestureConfig,
} from './motion';

// Re-export types
export type { 
  RyseColors, 
  RyseSpacing 
} from '../components/gluestack/theme';

// Import the CSS (side effect)
import './obsidian.css';

