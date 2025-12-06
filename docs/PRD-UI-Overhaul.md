# Product Requirements Document: RYSE UI Overhaul
## Cash App-Inspired Fintech Design System

**Version:** 1.0  
**Date:** December 6, 2025  
**Author:** RYSE Product Team  
**Status:** Draft

---

## 1. Executive Summary

### 1.1 Objective
Transform the RYSE application UI into a modern, premium fintech experience inspired by Cash App's clean, minimal design language. The goal is to create a visually stunning, highly usable interface that builds trust with gig workers while maintaining RYSE's unique identity.

### 1.2 Key Outcomes
- **Trust:** Clean, professional UI that instills confidence in financial transactions
- **Simplicity:** Reduced cognitive load with minimal, focused interfaces
- **Delight:** Micro-interactions and animations that create memorable moments
- **Accessibility:** High contrast, large touch targets, readable typography

---

## 2. Design System Specifications

### 2.1 Color Palette

#### Primary Colors
| Name | Hex | Usage |
|------|-----|-------|
| **RYSE Green (Neon)** | `#B9FF00` | Card accent, success states, highlights |
| **Black** | `#000000` | Primary buttons, text, headers |
| **White** | `#FFFFFF` | Backgrounds, cards, button text |

#### Neutral Colors
| Name | Hex | Usage |
|------|-----|-------|
| **Gray 50** | `#F9FAFB` | Page backgrounds |
| **Gray 100** | `#F3F4F6` | Card backgrounds, secondary buttons |
| **Gray 200** | `#E5E7EB` | Borders, dividers |
| **Gray 400** | `#9CA3AF` | Placeholder text, icons |
| **Gray 500** | `#6B7280` | Secondary text |
| **Gray 900** | `#111827` | Primary text |

#### Semantic Colors
| Name | Hex | Usage |
|------|-----|-------|
| **Success Green** | `#22C55E` | Success states, income |
| **Error Red** | `#EF4444` | Errors, expenses |
| **Warning Amber** | `#F59E0B` | Warnings, pending |

### 2.2 Typography

#### Font Family
- **Primary:** SF Pro Display / Inter (System Sans-Serif fallback)
- **Monospace:** SF Mono / JetBrains Mono (for numbers, PINs)

#### Scale
| Style | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| **Display** | 48px | Bold (700) | 1.1 | Balance amounts |
| **H1** | 32px | Bold (700) | 1.2 | Page titles |
| **H2** | 24px | Semibold (600) | 1.3 | Section headers |
| **H3** | 18px | Semibold (600) | 1.4 | Card titles |
| **Body** | 16px | Regular (400) | 1.5 | Body text |
| **Body Small** | 14px | Regular (400) | 1.5 | Secondary text |
| **Caption** | 12px | Medium (500) | 1.4 | Labels, captions |

### 2.3 Spacing System
Based on 4px grid:
- `xs`: 4px
- `sm`: 8px
- `md`: 16px
- `lg`: 24px
- `xl`: 32px
- `2xl`: 48px
- `3xl`: 64px

### 2.4 Border Radius
| Name | Value | Usage |
|------|-------|-------|
| `sm` | 8px | Small buttons, inputs |
| `md` | 12px | Cards, medium elements |
| `lg` | 16px | Large cards |
| `xl` | 24px | Feature cards, modals |
| `2xl` | 32px | Hero cards |
| `full` | 9999px | Pills, avatar, buttons |

### 2.5 Shadows
```css
/* Subtle shadow for cards */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);

/* Default card shadow */
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

/* Elevated cards */
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

/* Neon glow for RYSE Green elements */
--shadow-neon: 0 20px 60px rgba(185, 255, 0, 0.3);
```

---

## 3. Component Specifications

### 3.1 Buttons

#### Primary Button (Black)
```
- Background: #000000
- Text: #FFFFFF
- Font: 18px Semibold
- Padding: 16px 24px
- Border Radius: 9999px (full pill)
- Min Height: 56px
- Active State: scale(0.98)
- Disabled: #D1D5DB background, #9CA3AF text
```

#### Secondary Button (Gray)
```
- Background: #F3F4F6
- Text: #374151
- Font: 18px Semibold
- Padding: 16px 24px
- Border Radius: 9999px (full pill)
- Min Height: 56px
```

#### Ghost Button (Text only)
```
- Background: transparent
- Text: #000000
- Font: 16px Medium
- Underline on hover (for links)
```

### 3.2 Cards

#### Feature Card (White)
```
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border Radius: 24px
- Padding: 24px
- Shadow: shadow-md
```

#### Balance Card (Black)
```
- Background: #000000
- Text: #FFFFFF
- Border Radius: 24px
- Padding: 24px
```

#### RYSE Card (Neon Green)
```
- Background: #B9FF00
- Text: #000000
- Border Radius: 16px
- Aspect Ratio: 1.586 (credit card ratio)
- Shadow: shadow-neon
- Decorative elements: Emoji doodles, stars
```

### 3.3 Input Fields

#### Text Input
```
- Background: #F9FAFB
- Border: 1px solid #E5E7EB
- Border Radius: 16px
- Padding: 16px
- Font: 18px Regular
- Focus: 2px black ring
```

#### PIN Input (Dot Indicator)
```
- 4 circular indicators
- Empty: #E5E7EB border, transparent fill
- Filled: #000000 fill
- Size: 16px diameter
- Gap: 16px between dots
```

### 3.4 Navigation

#### Bottom Navigation
```
- Background: #FFFFFF
- Border Top: 1px solid #F3F4F6
- Height: 80px (including safe area)
- Icons: 24px, #6B7280 inactive, #000000 active
- Active indicator: Small dot below icon
```

#### Header
```
- Height: 56px
- X button (close): 24px icon, left aligned
- Title: Centered, 18px Semibold
- Action button: Right aligned (optional)
```

### 3.5 Progress Indicators

#### Step Dots
```
- Inactive: 8px circle, #E5E7EB fill
- Active: 32px pill, #000000 fill
- Completed: 8px circle, #000000 fill
- Gap: 8px
```

#### Progress Bar
```
- Track: #E5E7EB, 4px height, full radius
- Fill: #000000
- Animated: ease-out 300ms
```

---

## 4. Screen-by-Screen Specifications

### 4.1 Onboarding Flow

#### Welcome Screen
**Layout:**
- Full screen white background
- Centered content
- Large icon in green circle (80px)
- Bold title (32px)
- Subtitle text (16px gray)
- Skip button top-right
- Progress dots at bottom
- Continue button (black pill)

**Animations:**
- Icon bounces on entry
- Text fades in with 100ms delay
- Button slides up from bottom

#### PIN Setup/Confirm Screen
**Layout:**
- White background
- Large bold title: "Create your PIN" / "Please confirm your PIN"
- 4 dot indicators centered
- No visible keypad (native keyboard)
- Secure entry (dots fill as typed)

**Behavior:**
- Dots fill left to right
- Haptic feedback on each digit
- Auto-submit on 4th digit
- Error shake animation if mismatch

### 4.2 Card Introduction Screen

**Layout:**
- White background
- Floating RYSE Card at top (with rotation animation)
- Stars and decorative elements around card
- "Meet the RYSE Card" title
- Feature list with icons:
  - ✓ Customizable design
  - ⚡ Instant discounts  
  - Ø No hidden fees
  - 🛡 BNM protected
- Disclaimer text (small, gray)
- Skip button (gray pill)
- Next button (black pill)

**Card Animation:**
- Gentle float up/down (2s loop)
- Slight rotation (±3°)
- Neon glow shadow pulse

### 4.3 Contact Sync Permission Screen

**Layout:**
- X close button top-left
- Green circle icon with person silhouette
- Bold title: "Sync your contacts to find them on RYSE"
- Description text explaining benefits
- Link: "How RYSE uses your contacts" (underlined)
- "Not now" button (gray pill)
- "Sync contacts" button (black pill)

### 4.4 Welcome Success Screen

**Layout:**
- Minimalist centered design
- Green circle outline with checkmark (no fill)
- "Welcome to RYSE!" text
- Auto-transitions to dashboard after 2s

**Animation:**
- Checkmark draws in (stroke animation)
- Text fades in
- Confetti particles (optional)

### 4.5 Dashboard (Money Screen)

**Layout:**
```
┌─────────────────────────────────┐
│ Money            🔍  [Avatar]   │  ← Header
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │  RYSE CARD    [Shipped] 📦  │ │  ← Neon card (small)
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │    Cash balance             │ │
│ │    RM 3,847.50              │ │  ← Balance card (white)
│ │  Account •• | Routing ••    │ │
│ │ [Add money]    [Withdraw]   │ │
│ │ ☑ RyScore: Ready to build   │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ Savings                     │ │
│ │ RM 0.00                     │ │  ← Savings card
│ │ Up to 3.75% interest   💰💰 │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ Earnings Pool              │ │
│ │ RM 0.00                     │ │  ← Pools card
│ │ 0 contributions        💱   │ │
│ └─────────────────────────────┘ │
│                                 │
│ More for you                    │
│ • Quick Advance                 │
│ • Learn to Save                 │
├─────────────────────────────────┤
│  [💰]     [$]      [🕐]        │  ← Bottom nav
└─────────────────────────────────┘
```

**Specifications:**
- Gray background (#F9FAFB)
- Cards have white background, 24px radius
- RYSE Card: Mini preview with "Shipped" badge if ordered
- Balance card: Large balance number (48px), masked account info
- Quick action buttons: Gray pills, side by side
- Section cards: Stacked vertically with 12px gap

### 4.6 KYC Flow

#### Step 1: Personal Information
- Clean form with floating labels
- Input fields: Full name, IC Number, Date of Birth
- Auto-format IC number (XXXXXX-XX-XXXX)
- Next button disabled until valid

#### Step 2: MyKad Upload
- Two upload zones (Front/Back)
- Camera icon in center
- "Tap to capture" instruction
- Preview after capture with retake option
- OCR extraction indicator

#### Step 3: Face Verification
- Full-screen camera view
- Oval face guide overlay
- Instructions: "Position face in oval"
- Liveness check prompts: "Blink", "Turn head"
- Progress ring around oval

#### Step 4: Gig Platform Linking
- List of platforms with icons (Grab, Foodpanda, Shopee)
- Each as a selectable card
- Driver ID input field
- "Verify & Link" button
- Success checkmark animation

#### Success Screen
- Full-screen celebration
- Green checkmark with animation
- "You're all set!" title
- RyScore reveal with counter animation
- Tier badge display
- Benefits unlocked list
- "Continue" button

---

## 5. Animation Specifications

### 5.1 Micro-interactions

| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Button press | scale(0.98) | 100ms | ease-out |
| Card tap | scale(0.98) + shadow reduce | 150ms | ease-out |
| Toggle switch | spring | 300ms | spring(1, 0.5, 0.5) |
| Checkbox | bounce | 200ms | ease-out |
| Loading spinner | rotate 360° | 1000ms | linear, infinite |

### 5.2 Page Transitions

| Transition | Animation | Duration |
|------------|-----------|----------|
| Forward navigation | Slide left + fade | 300ms |
| Back navigation | Slide right + fade | 300ms |
| Modal open | Slide up from bottom | 350ms |
| Modal close | Slide down + fade | 250ms |

### 5.3 Special Animations

#### RyScore Counter
```
- Start: 300
- End: Actual score
- Duration: 1500ms
- Easing: ease-out cubic
- Number morphing effect
```

#### Success Checkmark
```
- Circle draws (stroke-dasharray animation)
- Check draws after circle complete
- Green pulse effect
```

#### Card Float
```
- translateY: 0 → -10px → 0
- rotate: -3° → 3° → -3°
- Duration: 4s
- Easing: ease-in-out
- Loop: infinite
```

---

## 6. Accessibility Requirements

### 6.1 Touch Targets
- Minimum size: 44x44px
- Recommended: 48x48px for primary actions
- Spacing between targets: minimum 8px

### 6.2 Color Contrast
- Text on white: minimum 4.5:1 ratio
- Text on black: minimum 4.5:1 ratio
- Large text (24px+): minimum 3:1 ratio

### 6.3 Screen Reader Support
- All interactive elements have aria-labels
- Form inputs have associated labels
- Error messages announced
- Loading states communicated

### 6.4 Motion Preferences
- Respect `prefers-reduced-motion`
- Provide static alternatives for all animations

---

## 7. Implementation Phases

### Phase 1: Foundation (Week 1)
- [ ] Design tokens setup (colors, typography, spacing)
- [ ] Button components (Primary, Secondary, Ghost)
- [ ] Card components (Feature, Balance, RYSE Card)
- [ ] Input components (Text, PIN dots)

### Phase 2: Core Screens (Week 2)
- [ ] Onboarding screens redesign
- [ ] PIN setup/login screens
- [ ] Dashboard main layout
- [ ] Bottom navigation

### Phase 3: KYC Flow (Week 3)
- [ ] KYC step screens
- [ ] Camera/upload components
- [ ] Success celebration screen
- [ ] RyScore reveal animation

### Phase 4: Secondary Screens (Week 4)
- [ ] Transaction screen
- [ ] Savings screen
- [ ] RyScore detail screen
- [ ] Settings screen

### Phase 5: Polish (Week 5)
- [ ] Micro-interactions
- [ ] Page transitions
- [ ] Loading states
- [ ] Error states
- [ ] Empty states

---

## 8. Technical Considerations

### 8.1 CSS Architecture
- Use Tailwind CSS with custom theme extension
- CSS variables for dynamic theming
- Component-level styling with consistent naming

### 8.2 Animation Library
- Framer Motion for React animations
- CSS animations for simple transitions
- requestAnimationFrame for counter animations

### 8.3 Performance
- Lazy load heavy components
- Optimize images (WebP format)
- Preload critical assets
- Minimize layout shifts

### 8.4 Testing
- Visual regression testing
- Accessibility audits (axe-core)
- Cross-browser testing
- Device testing (iOS Safari, Android Chrome)

---

## 9. Success Metrics

| Metric | Current | Target |
|--------|---------|--------|
| User satisfaction (UI rating) | N/A | 4.5+/5 |
| Task completion rate | N/A | 95%+ |
| Time to complete KYC | N/A | <5 minutes |
| Accessibility score (Lighthouse) | N/A | 95+ |
| Performance score (Lighthouse) | N/A | 90+ |

---

## 10. Appendix

### A. Reference Screenshots
- Cash App PIN confirmation
- Cash App Card introduction
- Cash App Contact sync
- Cash App Welcome screen
- Cash App Money dashboard

### B. Competitive Analysis
- Cash App: Clean, minimal, black/green brand
- Grab: Green accent, card-based layouts
- Touch 'n Go: Blue/white, functional design
- BigPay: Purple accent, modern cards

### C. Brand Alignment
RYSE brand pillars reflected in UI:
1. **Trust** → Clean, professional aesthetic
2. **Innovation** → Modern animations, AI features
3. **Empowerment** → Clear progress, achievement celebrations
4. **Accessibility** → Simple language, inclusive design

---

*Document End*

