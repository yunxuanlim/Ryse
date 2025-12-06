// ============================================
// MOTION & ANIMATION TOKENS
// Project Obsidian - Kinetic Design System
// ============================================

/**
 * Spring Physics - PRD Section 4.2
 * "Critically Damped" spring model for UI interactions
 */
export const SpringPhysics = {
  // Snappy - Immediate response
  // Use: Button presses, toggle switches, tab changes
  snappy: {
    mass: 1,
    tension: 180,
    friction: 12,
    // CSS equivalent timing
    duration: 150,
    easing: 'cubic-bezier(0.2, 0.0, 0.0, 1.0)',
  },

  // Fluid - Luxurious, weighted feel
  // Use: Page transitions, opening the "Earnings Core"
  fluid: {
    mass: 1,
    tension: 120,
    friction: 14,
    duration: 300,
    easing: 'cubic-bezier(0.2, 0.0, 0.2, 1.0)',
  },

  // Wobbly - Attention-grabbing
  // Use: Notification badges, success states
  wobbly: {
    mass: 1,
    tension: 200,
    friction: 10,
    duration: 400,
    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },

  // Critical - No oscillation, precision
  // Use: Most UI interactions
  critical: {
    mass: 1,
    stiffness: 180,
    damping: 20,
    duration: 200,
    easing: 'cubic-bezier(0.2, 0.0, 0.2, 1.0)',
  },
} as const;

/**
 * Easing Curves
 */
export const Easings = {
  // Fintech Ease - Fast entrance, smooth deceleration
  fintech: 'cubic-bezier(0.2, 0.0, 0.2, 1.0)',
  
  // Standard easings
  easeIn: 'cubic-bezier(0.4, 0.0, 1.0, 0.0)',
  easeOut: 'cubic-bezier(0.0, 0.0, 0.2, 1.0)',
  easeInOut: 'cubic-bezier(0.4, 0.0, 0.2, 1.0)',
  
  // Bounce
  bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  
  // Sharp
  sharp: 'cubic-bezier(0.4, 0.0, 0.6, 1.0)',
} as const;

/**
 * Duration Scale
 */
export const Durations = {
  instant: 0,
  fast: 100,
  normal: 200,
  slow: 300,
  slower: 400,
  slowest: 500,
  
  // Specific use cases
  microInteraction: 100,
  buttonPress: 150,
  transition: 300,
  pageTransition: 400,
  complexAnimation: 600,
  warpSpeed: 800,
  celebration: 1500,
} as const;

/**
 * Framer Motion Variants
 */
export const MotionVariants = {
  // Fade in/out
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2, ease: Easings.fintech },
  },

  // Scale bounce
  scaleBounce: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    transition: { type: 'spring', ...SpringPhysics.wobbly },
  },

  // Slide up
  slideUp: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 20, opacity: 0 },
    transition: { type: 'spring', ...SpringPhysics.fluid },
  },

  // Slide from bottom (for modals, sheets)
  slideFromBottom: {
    initial: { y: '100%' },
    animate: { y: 0 },
    exit: { y: '100%' },
    transition: { type: 'spring', ...SpringPhysics.critical },
  },

  // Expand from center
  expandFromCenter: {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: 'spring', ...SpringPhysics.snappy },
  },

  // Stagger children
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  },

  // Stagger child item
  staggerItem: {
    initial: { y: 10, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { type: 'spring', ...SpringPhysics.snappy },
  },

  // Pulse (for attention)
  pulse: {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        repeatType: 'reverse' as const,
      },
    },
  },

  // Glow pulse (for neon elements)
  glowPulse: {
    animate: {
      boxShadow: [
        '0 0 20px rgba(57, 255, 20, 0.4)',
        '0 0 40px rgba(57, 255, 20, 0.6)',
        '0 0 20px rgba(57, 255, 20, 0.4)',
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  },

  // Flicker (for warnings)
  flicker: {
    animate: {
      opacity: [1, 0.4, 1, 0.6, 1],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatDelay: 2,
      },
    },
  },

  // Micro-bounce (for button press)
  microBounce: {
    whileTap: { scale: 0.95 },
    transition: { type: 'spring', ...SpringPhysics.snappy },
  },

  // Hover lift
  hoverLift: {
    whileHover: { y: -2, scale: 1.02 },
    transition: { type: 'spring', ...SpringPhysics.snappy },
  },
} as const;

/**
 * CSS Keyframe Animations
 */
export const KeyframeAnimations = `
  /* Pulse ring for buttons */
  @keyframes pulse-ring {
    0% { transform: scale(1); opacity: 0.4; }
    50% { transform: scale(1.3); opacity: 0.1; }
    100% { transform: scale(1.5); opacity: 0; }
  }

  /* Neon glow pulse */
  @keyframes neon-pulse {
    0%, 100% { box-shadow: 0 0 20px rgba(57, 255, 20, 0.4); }
    50% { box-shadow: 0 0 40px rgba(57, 255, 20, 0.6); }
  }

  /* Flicker effect for warnings */
  @keyframes flicker {
    0%, 100% { opacity: 1; }
    25% { opacity: 0.4; }
    50% { opacity: 1; }
    75% { opacity: 0.6; }
  }

  /* Float animation */
  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(-2deg); }
    50% { transform: translateY(-10px) rotate(2deg); }
  }

  /* Shimmer effect for text */
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  /* Spin for loading */
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  /* Shake for errors */
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
    20%, 40%, 60%, 80% { transform: translateX(4px); }
  }

  /* Draw circle (for success checkmark) */
  @keyframes draw-circle {
    from { stroke-dashoffset: 283; }
    to { stroke-dashoffset: 0; }
  }

  /* Draw check (for success checkmark) */
  @keyframes draw-check {
    from { stroke-dashoffset: 70; }
    to { stroke-dashoffset: 0; }
  }

  /* Warp speed (for welcome transition) */
  @keyframes warp-speed {
    0% { transform: scale(1) translateZ(0); opacity: 1; }
    100% { transform: scale(10) translateZ(100px); opacity: 0; }
  }

  /* Particle float (for AI orb) */
  @keyframes particle-float {
    0%, 100% { transform: translate(0, 0); }
    25% { transform: translate(5px, -5px); }
    50% { transform: translate(-3px, 3px); }
    75% { transform: translate(3px, 5px); }
  }

  /* Vortex (for AI orb processing) */
  @keyframes vortex {
    from { transform: rotate(0deg) scale(1); }
    to { transform: rotate(360deg) scale(0.5); }
  }

  /* Supernova (for goal completion) */
  @keyframes supernova {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(0.2); opacity: 1; }
    100% { transform: scale(3); opacity: 0; }
  }

  /* Animation utility classes */
  .animate-pulse-ring { animation: pulse-ring 0.6s ease-out forwards; }
  .animate-neon-pulse { animation: neon-pulse 2s ease-in-out infinite; }
  .animate-flicker { animation: flicker 0.5s infinite; }
  .animate-float { animation: float 4s ease-in-out infinite; }
  .animate-shimmer { animation: shimmer 2s linear infinite; }
  .animate-shake { animation: shake 0.5s ease-in-out; }
  .animate-draw-circle { animation: draw-circle 0.6s ease-out forwards; }
  .animate-draw-check { animation: draw-check 0.4s ease-out 0.4s forwards; }
  .animate-warp-speed { animation: warp-speed 0.8s ease-in forwards; }
  .animate-particle-float { animation: particle-float 3s ease-in-out infinite; }
  .animate-vortex { animation: vortex 1s ease-in-out forwards; }
  .animate-supernova { animation: supernova 1.5s ease-out forwards; }
`;

/**
 * Gesture timing configuration
 */
export const GestureConfig = {
  // Long press duration (ms)
  longPressDuration: 800,
  
  // Swipe threshold (px)
  swipeThreshold: 50,
  
  // Double tap max interval (ms)
  doubleTapInterval: 300,
  
  // Drag resistance
  dragElastic: 0.2,
  
  // Momentum decay
  momentumDecay: 0.95,
} as const;

// Default export
export const MotionTokens = {
  springs: SpringPhysics,
  easings: Easings,
  durations: Durations,
  variants: MotionVariants,
  keyframes: KeyframeAnimations,
  gesture: GestureConfig,
} as const;

export default MotionTokens;


