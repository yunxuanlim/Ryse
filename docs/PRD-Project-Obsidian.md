# Product Requirements Document: Project Obsidian – The Kinetic Redesign of the Ryse Financial Ecosystem

## 1. Executive Vision and Strategic Framework

### 1.1 The Paradigm Shift in Financial Interface Design

The contemporary financial technology landscape is undergoing a profound metamorphosis, transitioning from static, administrative utilities into dynamic, lifestyle-integrated ecosystems. The current user interface of the Ryse application, as presented in the provided source materials, reflects a functional but traditional approach to personal finance: clean, white-space dominant, and list-oriented. However, the trajectory of fintech design for 2025 and beyond demands a radical departure from these conventions. The objective of this Product Requirements Document (PRD) is to blueprint a comprehensive redesign of the Ryse application, transforming it into a high-performance "financial command center" tailored for the modern gig economy worker.

The core mandate is to implement a strict Green, White, and Black color palette. This is not merely an aesthetic choice but a strategic psychological realignment. In a market saturated with "trust blues" and "urgent reds," a monochromatic high-contrast palette signals sophistication, clarity, and technological supremacy. The redesign, codenamed "Project Obsidian," focuses on "Motion as Meaning." We are moving beyond static data presentation to a fluid, animated environment where every pixel justifies its existence through kinetic feedback. The interface will leverage the high-contrast capabilities of modern OLED displays to create a "Neon-Noir" aesthetic—deep, true blacks that allow neon green data points to pierce through the darkness with laser-like precision, ensuring legibility in the variable lighting conditions often faced by the app's primary user base: gig economy workers operating in dynamic environments.

### 1.2 User Persona and Contextual Analysis

A forensic analysis of the provided UI screens reveals a specific and distinct user persona: the "Gig Earner."

- **Evidence of Persona**: The current dashboard explicitly breaks down income by platform ("Grab," "Foodpanda"), tracking "71 hours worked across all platforms."
- **Implications for Design**: This user is not checking their balance once a month; they are tracking cash flow daily, perhaps hourly. They operate in high-stress, time-sensitive environments (e.g., between deliveries).
- **Design Response**: The interface must be a "Heads-Up Display" (HUD). It requires high legibility (high contrast), speed (zero-latency transitions), and predictive intelligence (AI insights on peak earning times). The shift to a dark mode interface is functionally superior for this demographic, reducing battery consumption on OLED devices during long shifts and minimizing glare during night-time operations.

### 1.3 The "Strict Palette" Philosophy

The requirement for a strict Green, White, and Black palette imposes a disciplined design language that enhances cognitive processing speed.

- **Deep Obsidian (Backgrounds)**: We will utilize a rich, non-pure black (e.g., #060606) to provide depth while preventing the "smearing" artifacts often seen with pure black on OLED screens during scrolling. This creates a stage where content takes prominence.
- **Hyper-Green (Action & Value)**: A neon-adjacent green (e.g., #39FF14 or #1FB622) becomes the sole signifier of "value" and "action." It represents money, growth, and the "go" signal. By removing other colors, we reduce decision fatigue; if it's green, it's important.
- **Crisp White (Information)**: Pure white serves as the voice of the data. It delivers the facts—balances, dates, names—without emotional coloring. Typography hierarchy will be managed through opacity variations of white (100%, 87%, 60%) rather than introducing greys, maintaining the purity of the tri-color system.

## 2. Forensic Analysis of Current State & Transformation Strategy

### 2.1 The Dashboard (Welcome & Home)

**Current State Analysis**: The existing Home screen is a vertical list of disjointed cards. "Earnings Pool" sits at the top, followed by "Talk to Ryse," "Quick Advance," and "Start Saving." While functional, it lacks hierarchy and urgency. The white background feels clinical and generic, failing to convey the excitement of wealth generation. The "More for you" section hides critical features like "Community" below the fold.

**Transformation Strategy**: The redesign will transform this list into a Spatial Dashboard.

- **The Hero**: The "Earnings Pool" will no longer be a static number. It will be a central, pulsating geometric element—a "Core"—that breathes with the user's financial liquidity.
- **Navigation**: The list of actions ("Quick Advance," "Start Saving") will migrate to a floating glassmorphism dock or a gesture-based control center, freeing up screen real estate for real-time data visualization.
- **Context**: The "Talk to Ryse" feature will be elevated from a card to an omnipresent "Ambient Intelligence," accessible via voice or a floating action button (FAB) at all times, reflecting the 2025 trend of conversational UI dominance.

### 2.2 The Insights & Forecasting Module

**Current State Analysis**: Critical predictive data includes "Cashflow Warning" (currently yellow) and "Peak Earning Insight" (green). The "Next 7 Days Forecast" uses a static row of numbers.

**Transformation Strategy**:

- **Palette Enforcement**: The "Cashflow Warning" must be adapted to the strict palette. Instead of yellow, we will use a high-contrast glitch effect or a striped White/Black hazard pattern. This communicates "Alert" without breaking the color rules.
- **Data Viz**: The 7-day forecast will become an interactive waveform. As the user runs their finger across the days, haptic feedback will simulate the "texture" of their predicted income—higher earnings feel "heavier" or more intense. This utilizes the "Gamification of Finance" trend to make budget forecasting visceral rather than abstract.

### 2.3 The Community Ecosystem

**Current State Analysis**: A "Mutual Aid" system where users fund each other's emergencies (e.g., "Bike broke down"). This is a powerful, emotional feature currently buried in standard list UI.

**Transformation Strategy**: This will be reimagined as a Network Graph. Users are nodes in a "Green" digital web. Funding a request triggers a particle animation where "energy" (green pixels) flows from the user's node to the recipient. This visualizes the collective power of the gig community, reinforcing the "Community" aspect ("12.5k Members").

### 2.4 The Savings & Goals Interface

**Current State Analysis**: Linear progress bars for goals like "Emergency Fund" and "New Phone." The "47 day streak" is a text label.

**Transformation Strategy**:

- **Gamified Progress**: Goals will be represented as orbital rings around the user's central avatar. Completing a streak adds a glowing segment to the ring.
- **Visual Reward**: Reaching a goal triggers a "supernova" effect where the ring collapses and explodes into digital confetti (green and white), providing a dopamine release that encourages continued saving.

## 3. Detailed Component Redesign: The "Obsidian" Interface

### 3.1 Screen 1: The Kinetic Onboarding & Welcome

#### 3.1.1 Concept: The Gateway

The first interaction sets the psychological baseline. In 2025, static login forms are obsolete. The trend is "Scrollytelling" and "Zero-Friction Onboarding". We must prove the app's speed and security before the user even authenticates.

#### 3.1.2 Visual Architecture

- **Background**: A deep, infinite black void (#060606).
- **Hero Element**: Floating in the center is a 3D Wireframe Object rendered in Neon Green (#39FF14). This object represents the user's financial potential. It is not a video; it is a real-time WebGL asset that responds to the phone's gyroscope. As the user tilts the phone, the wireframe rotates, offering a glimpse of the "future" of their finances.
- **Typography**: The app name "RYSE" appears in massive, monolithic Neo-Grotesque characters (e.g., Clash Grotesk Bold). The text is masked with a subtle "shimmer" shader that moves across the letters every 5 seconds, suggesting activity.

#### 3.1.3 Interaction Design

- **Biometric Seamlessness**: There are no input fields visible initially. A "Scan to Enter" button (Green outline) sits at the bottom. Upon tapping, or automatically if configured, the biometrics (FaceID/Fingerprint) engage.
- **Transition**: Upon successful authentication, the 3D wireframe creates a "warp speed" effect—accelerating towards the user and dissolving into the main dashboard elements. This transition serves a functional purpose: it hides the data-fetching latency while creating a seamless bridge between "locked" and "active" states.
- **Alternative Flow**: If the user is new, swiping up initiates a "Scrollytelling" journey. The 3D object morphs from a shield (Security) to a coin (Earnings) to a graph (Growth), explaining the value proposition through fluid metamorphosis rather than static slides.

### 3.2 Screen 2: The Command Dashboard (Home)

#### 3.2.1 Concept: The Cockpit

The dashboard replaces the list view with a spatial layout. The user (gig worker) needs immediate access to "Earnings," "Cashflow," and "Ryse AI."

#### 3.2.2 The "Earnings Core"

- **Visual**: The "Earnings Pool" (RM 1,240.00) is placed inside a central, glowing ring. The ring's thickness and brightness correspond to the user's weekly goal progress.
  - **Green Glow**: On track or ahead of schedule (Peak Earning Insight).
  - **Dimmed/Flickering**: Behind schedule or cashflow warning.
- **Interaction**: Tapping the core explodes it into the detailed breakdown (Daily/Platform breakdown), transitioning the user from "Summary" to "Analysis" without changing pages. The background blurs, and the bar charts rise from the bottom like a city skyline.

#### 3.2.3 Liquid Navigation

- **Structure**: Instead of a traditional tab bar, we utilize a Floating Glassmorphism Dock. It hovers 20px above the bottom edge.
  - **Material**: Black glass (rgba(10, 10, 10, 0.7)) with a high background blur (blur(30px)).
  - **Active State**: The active icon (e.g., Home) doesn't just change color; a "Green Spotlight" effect shines from the top of the dock onto the icon, mimicking a physical light source.
  - **Icons**: Minimalist, stroke-based icons. When tapped, they execute a "micro-bounce" animation using spring physics (mass: 1, stiffness: 300, damping: 15) to provide tactile confirmation.

### 3.3 Screen 3: The Interactive Credit Slider

#### 3.3.1 Concept: Tactile Negotiation

The "Quick Advance" feature leads to a credit selection screen. The current design is a passive text input. The redesign turns this into a Tactile Rail System, leveraging the "Gamification" trend to make borrowing feel calculated and physical.

#### 3.3.2 The "Rail" UI

- **The Track**: A horizontal neon green line spans the screen. It is not solid; it is composed of hundreds of micro-ticks, resembling a ruler or a frequency wave.
- **The Handle**: A circular "puck" with a glowing white core sits on the rail.
- **Interaction**:
  - **Haptics**: As the user drags the puck, the phone emits Haptic Feedback. The frequency of the haptic ticks increases as the amount gets higher, simulating "tension" or "weight." This acts as a subtle psychological brake on over-borrowing.
  - **Dynamic Typography**: The loan amount (e.g., "RM 500") floats above the puck. As the user drags right, the numbers scale up and tilt slightly in the direction of movement (skew effect), conveying velocity.
- **Contextual Data**: As the slider moves, secondary data points (Interest, Repayment Date) fade in and out below the rail. If the user slides into a "high risk" amount (based on their income history), the Green track begins to glitch (flickering with white static), serving as a warning within the strict palette.

### 3.4 Screen 4: The "Ryse" AI Concierge

#### 3.4.1 Concept: Ambient Intelligence

The "Talk to Ryse" feature is elevated to a central interaction mode. This is not a chatbot; it is a financial co-pilot.

#### 3.4.2 The "Living Orb" Visualization

- **Visual**: The AI is represented by a particle cloud or "Orb" in the center of the screen.
  - **Idle State**: The particles gently float in a green/black nebula.
  - **Listening State**: When the microphone is active, the particles align into a waveform that modulates with the user's voice volume and pitch. This "Voice Visualization" confirms the system is attentive.
  - **Processing State**: The particles swirl rapidly into a tight core, symbolizing calculation.
- **Interface**: Chat bubbles are asymmetrical.
  - **User**: Glassmorphic container with a Green border.
  - **Ryse**: Solid Black container with Neon Green text. This reversal of the typical "grey bubble" trope ensures the AI's insights pop against the background.
- **Context Awareness**: If the user opens the AI chat from the "Insights" screen, the Orb immediately pulses and suggests: "I see a cashflow warning for next Tuesday. Want to look at advance options?" This hyper-personalization anticipates the user's anxiety and offers a solution.

### 3.5 Screen 5: The Digital Card & Parallax Wallet

#### 3.5.1 Concept: The Digital Artifact

The card needs to feel precious. We apply Gyroscopic Parallax to give the digital card a sense of physical matter.

#### 3.5.2 Visual Physics

- **Material**: The card appears to be cut from obsidian glass. It has a glossy, refractive surface.
- **Parallax Effect**: As the user tilts their physical device, the virtual light source moves across the card's surface. The Neon Green details (Card Number, Logo) appear embossed, casting subtle shadows on the black card body. This 3D depth makes the card feel like a tangible object trapped behind the screen.
- **Security Interaction**: The card number is hidden by default (masked with asterisks). To reveal it, the user performs a "Long Press + Scan." A fingerprint scan animation travels across the card, "burning" the mask away to reveal the neon numbers underneath. This turns security into a satisfying interaction event.

## 4. Technical Architecture & Implementation

### 4.1 The "Neon-Noir" Rendering Stack

To achieve the requisite "sleekness," standard rendering is insufficient. The app will utilize a high-performance graphics layer.

| Component   | Technology Recommendation                          | Rationale                                                                                 |
| ----------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Core UI     | Flutter or React Native (Reanimated)               | Cross-platform consistency with native performance (60fps+).                              |
| 3D Elements | Filament (Android) / Metal (iOS) or Three.js (Web) | Required for the gyroscope-responsive Welcome wireframe and Parallax Card.                |
| Animations  | Lottie (Vector) + Rive (Interactive)               | Lottie for static animations; Rive for state-machines (e.g., the AI Orb changing states). |
| Haptics     | CoreHaptics (iOS) / Vibrator API (Android)         | Essential for the "Tactile Rail" credit slider.                                           |

### 4.2 Animation Physics & Motion Guidelines

The "modern" feel comes from the easing curves. We reject linear motion.

- **Spring Physics**: We will implement a "Critically Damped" spring model for all UI interactions.
  - **Formula**: damping-ratio = 1.0. This ensures elements snap to position without oscillating/wobbling, conveying precision and efficiency—traits desirable in finance.
  - **Parameters**: Stiffness: 180, Damping: 20, Mass: 1. This creates a "heavy" but responsive feel, like a premium switch.
- **Custom Bezier**: For non-physics transitions (e.g., page slides), we standardize on the "Fintech Ease": cubic-bezier(0.2, 0.0, 0.2, 1.0). This curve creates a fast entrance with a long, smooth deceleration, feeling luxurious and controlled.

### 4.3 Accessibility in a Strict Palette

Designing exclusively in Green/Black poses accessibility challenges that must be technically addressed.

- **Contrast Ratios**: The Neon Green (#39FF14) on Black (#060606) creates a contrast ratio of roughly 15:1, well above the WCAG AAA requirement (7:1). However, high contrast can cause "halation" (blurring) for users with astigmatism.
- **Mitigation Strategy**:
  - **Text Weights**: We will avoid "Light" font weights for green text. All green text will be "Medium" or "Bold" to increase stroke width, reducing the halation effect.
  - **Secondary Text**: Supportive text will be White (opacity 87%), which is softer on the eyes than pure neon, reducing overall eye strain during long sessions.

## 5. Strategic Implications & Future-Proofing

### 5.1 The Psychology of the "Gig Worker" UI

The user persona derived from the platform breakdown (Grab, Foodpanda) suggests a user whose income is volatile.

- **Insight**: Traditional banking apps induce anxiety with red negative numbers.
- **Design Solution**: By using a "glitch" effect or stripped patterns instead of red for warnings (Cashflow Warning), we reduce the emotional impact of a "negative" state. It becomes a system alert to be fixed, not a penalty. This aligns with "Financial Wellness" trends.

### 5.2 Gamification of Mutual Aid

The "Community" aspect is unique to Ryse.

- **Insight**: Users are more likely to contribute if they feel seen.
- **Design Solution**: The "Network Graph" visualization of the community turns mutual aid into a collective achievement. When a user contributes RM 50 to "David's Bike Repair," they see their node connect to David's. This provides instant social gratification, leveraging the "Gamification" trend to drive liquidity within the ecosystem.

### 5.3 AI-Driven Hyper-Personalization

The "Talk to Ryse" feature is not just support; it is the retention engine.

- **Insight**: Users ignore generic notifications.
- **Design Solution**: The AI Orb uses the "Insights" data to push "Proactive Prompts." Instead of waiting for the user to ask, the Orb might float a bubble saying: "Friday night is coming up. You usually earn RM 85/hr. Set a goal?" This transforms the app from a passive wallet to an active earning coach.

## 6. Implementation Roadmap

### Phase 1: Foundation (Weeks 1-4)

- Establish the Design System (DS-Obsidian).
- Define the Green (#39FF14), Black (#060606), and White (#FFFFFF) tokens.
- Select and license the Neo-Grotesque typeface (e.g., Clash Grotesk).
- Build the Flutter/React Native shell with "Dark Mode" hardcoded as the only state.

### Phase 2: The Core Mechanics (Weeks 5-8)

- Develop the Credit Slider with custom gesture handlers and haptic integration.
- Implement the Earnings Core animation for the home dashboard.
- Build the Glassmorphism navigation dock.

### Phase 3: The Intelligence Layer (Weeks 9-12)

- Integrate the AI Orb visualization (Rive/Lottie).
- Connect the AI UI to the backend NLP service.
- Implement the Scrollytelling onboarding flow with 3D assets.

### Phase 4: Polish & Parallax (Weeks 13-16)

- Apply Gyroscopic Parallax to the Digital Card and Welcome Screen.
- Conduct Accessibility Audits (Contrast, Screen Reader tags).
- Finalize Micro-interactions (button presses, list scrolling physics).

## 7. Conclusion

Project Obsidian is a bold reimagining of the Ryse platform. By stripping away the noise of traditional banking interfaces and embracing a disciplined, high-contrast aesthetic, we create a tool that mirrors the intensity and ambition of the gig economy worker. The strict Green/White/Black palette is not a limitation; it is a lens that focuses the user's attention on what matters: growth, liquidity, and community. Through the integration of kinetic typography, haptic feedback, and spatial data visualization, the new Ryse app will not just facilitate transactions—it will elevate the financial experience to the status of a lifestyle product, securing its place at the forefront of the 2025 fintech revolution.

## 8. Deep Dive: Theoretical Underpinnings of the Design

### 8.1 The "Neon-Noir" Aesthetic: A Cultural & Functional Analysis

The decision to adopt a "Neon-Noir" (High-Contrast Green on Deep Black) aesthetic is rooted in both cultural semiotics and physiological optics.

#### 8.1.1 Semiotics of the "Terminal"

Culturally, the green-on-black aesthetic evokes the visual language of the command line interface (CLI), the stock ticker, and the hacker terminal. For the target demographic—digital natives and gig workers—this aesthetic signals control and competence. It strips away the "marketing fluff" of traditional banking (stock photos of smiling families) and presents finance as raw data that can be manipulated. This aligns with the "Branding as a Trust Signal" trend, where trust is no longer conveyed by institutional heritage (stone pillars, serif fonts) but by algorithmic transparency and efficiency.

#### 8.1.2 Optical Ergonomics in the Gig Economy

Functionally, the "Gig Earner" often operates outdoors (delivery drivers, ride-share) or in variable lighting.

- **OLED Efficiency**: On OLED screens, black pixels are "off." A predominantly black interface consumes significantly less power than a white one. For a gig worker whose phone is their livelihood, battery preservation is a critical feature, not just a perk.
- **Pupillary Response**: In low-light environments (e.g., a driver's cab at night), a bright white screen causes pupil constriction and temporary night blindness. The Obsidian interface maintains dark adaptation, allowing the driver to glance at their earnings without losing visual acuity for the road. This makes the design safety-critical.

### 8.2 The "Gamification of Responsibility"

The redesign leverages gamification, but pivots from "casino" mechanics (confetti for trading) to "wellness" mechanics.

#### 8.2.1 The Credit Health Feedback Loop

The "Credit Slider" (Section 3.3) acts as a real-time educational tool.

- **Mechanism**: As the user slides towards a higher loan amount, the visual feedback (glitching track, heavy haptics) simulates "system stress."
- **Psychology**: This utilizes haptic skeuomorphism to create a physical sensation of "risk." Just as a physical spring becomes harder to pull the further it is stretched, the credit line becomes "heavier" as it approaches the user's safe limit. This visceral feedback instills caution more effectively than a text warning.

#### 8.2.2 Community Node Theory

The "Mutual Aid" feature is transformed into a network graph.

- **Mechanism**: When a user contributes, they see a visual connection form between their node and the recipient's.
- **Sociology**: This reinforces the concept of "reciprocal altruism." Visualizing the network proves to the user that they are part of a safety net, increasing the likelihood that they will contribute again, knowing the network is active and responsive. This builds a "stickiness" that traditional banking apps lack.

## 9. Technical Specification: The "Obsidian" Design System

### 9.1 Color Token Taxonomy

To ensure consistency and accessibility, the strict palette is codified into a token system.

| Token Name          | Hex Value              | Usage Scope                   | Accessibility Note                  |
| ------------------- | ---------------------- | ----------------------------- | ----------------------------------- |
| color-obsidian-100  | #060606                | Main Background               | Non-pure black prevents OLED smear. |
| color-obsidian-200  | #121212                | Surface / Cards               | Elevates content from background.   |
| color-neon-primary  | #39FF14                | Primary Actions / Key Data    | Use with Bold weight for text.      |
| color-neon-dim      | #1B7A0F                | Inactive States / Backgrounds | Low contrast; purely decorative.    |
| color-white-high    | #FFFFFF                | Headings / Critical Values    | 100% Opacity.                       |
| color-white-med     | rgba(255,255,255,0.87) | Body Text / Labels            | Reduces eye strain.                 |
| color-white-low     | rgba(255,255,255,0.60) | Secondary / Metadata          | Non-critical info.                  |
| color-alert-pattern | striped(#FFF, #000)    | Warnings / Errors             | Replaces Red for alerts.            |

### 9.2 Typography & Hierarchy

**Font Family**: Clash Grotesk (or similar Neo-Grotesque).

- **Display XL (Welcome)**: 48px, Bold, -2% Letter Spacing. "The Hook."
- **Heading L (Dashboard)**: 32px, Semibold, -1% Spacing. "The Core."
- **Body M (Lists)**: 16px, Medium, Normal Spacing. High legibility.
- **Mono S (Data)**: 14px, Regular, Tabular Lining. Used for all currency values to ensure vertical alignment.

### 9.3 Motion & Interaction Tokens

**Physics Engine**: React Spring / Reanimated.

- **spring-snappy**: `{ mass: 1, tension: 180, friction: 12 }`
  - Use Case: Button presses, toggle switches, tab changes. Immediate response.
- **spring-fluid**: `{ mass: 1, tension: 120, friction: 14 }`
  - Use Case: Page transitions, opening the "Earnings Core." Luxurious, weighted feel.
- **spring-wobbly**: `{ mass: 1, tension: 200, friction: 10 }`
  - Use Case: Notification badges, success states (e.g., goal reached). Attention-grabbing.

**Gesture Logic**:

- **Swipe Down**: Dismiss current modal/card.
- **Long Press**: Reveal hidden data (Security feature).
- **Tilt (Gyro)**: Actuate Parallax effects (Digital Card, Welcome Screen).

## 10. Forensics of the Provided Screens (Deep Dive)

### 10.1 Image 1 Analysis (Home)

- **Element**: "Earnings Pool RM 1,240.00"
  - **Redesign**: This needs to be the "heartbeat" of the app. In the new design, this number sits inside the "Earnings Core" ring. The "1,240" counts up in real-time if the user is currently working (simulated based on shift patterns), reinforcing the "velocity" of gig work.
- **Element**: "Quick Advance" (Get up to RM 500)
  - **Redesign**: This is the primary revenue driver. It becomes a prominent button on the Glassmorphism Dock, pulsating gently if the "Cashflow Warning" is active.

### 10.2 Image 3 Analysis (Community)

- **Element**: "David Wong - Bike broke down... RM 150 raised of RM 200"
  - **Redesign**: The "Progress Bar" (Green line) is currently static. In the redesign, this becomes a circular "funding ring" around David's avatar. As users donate, particles flow into the ring, filling it up. This transforms a sad event (broken bike) into a communal rally.
- **Element**: "12 supporters"
  - **Redesign**: These aren't just numbers. We show the avatars of the 12 supporters orbiting David's request, creating a visual "shield" of community support.

### 10.3 Image 5 Analysis (AI Insights)

- **Element**: "Cashflow Warning" (Yellow Icon)
  - **Redesign**: As discussed, we remove the yellow. The warning becomes a "System Alert" notification that slides down from the top (Dynamic Island style on iOS), utilizing the Alert Pattern (striped monochrome) to demand attention without breaking the color palette.
- **Element**: "Peak Earning Insight" (Friday nights 7-10pm)
  - **Redesign**: This is actionable intelligence. Tapping this insight shouldn't just open text; it should open the Calendar/Scheduler with those slots pre-highlighted in Neon Green, asking "Schedule this shift?" This reduces friction between "knowing" and "doing."

## 11. Final Implementation Notes

### 11.1 The "Glass" Shader

The "Glassmorphism" effect used in the navigation dock and digital card requires a custom blur implementation to be performant.

- **Technique**: We will use a "Backdrop Filter" with a saturation boost.
- **Code Concept**:

```css
.glass-panel {
  background: rgba(6, 6, 6, 0.65);
  backdrop-filter: blur(25px) saturate(180%);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}
```

This specific combination of blur and saturation (even on black) creates the "premium" depth look seen in high-end iOS apps, ensuring the background elements (like the Earnings Core) are visible but abstracted behind the panel.

### 11.2 Voice First, Screen Second

The "Talk to Ryse" integration is the biggest structural change.

- **Trigger**: A "Wake Word" listener (optional) or a dedicated hardware button mapping (on Android).
- **Visuals**: The "Orb" must never block critical data. It should float and dock into corners intelligently. If the user is viewing the Credit Slider, the Orb docks to the top right. If the user is on the Home screen, it centers itself. This "Intelligent Layout" ensures the AI is a helper, not an obstruction.

## Works Cited

1. 7 Latest Fintech UX Design Trends & Case Studies for 2025, accessed December 7, 2025, https://www.designstudiouiux.com/blog/fintech-ux-design-trends/
2. UI/UX Design Trends in Mobile Apps for 2025 | Chop Dawg, accessed December 7, 2025, https://www.chopdawg.com/ui-ux-design-trends-in-mobile-apps-for-2025/
3. Top Fintech UX Design Trends to Watch in 2025 - Yellow Slice, accessed December 7, 2025, https://yellowslice.in/bed/fintech-ux-design-trends-you-must-know/
4. Browse thousands of Dark Finance App images for design inspiration - Dribbble, accessed December 7, 2025, https://dribbble.com/search/dark-finance-app
5. 10 tips for creating perfect fintech app design - Merixstudio, accessed December 7, 2025, https://www.merixstudio.com/blog/fintech-design-10-tips
6. green black white Color Palette, accessed December 7, 2025, https://www.color-hex.com/color-palette/6522
7. Gamification in Financial Services: Benefits & Examples | Miquido Blog, accessed December 7, 2025, https://www.miquido.com/blog/gamification-in-financial-services/
8. 10 Best Fintech Website Designs of 2025, accessed December 7, 2025, https://azurodigital.com/fintech-website-examples/
9. 2025 UI design trends that are already shaping the web - Lummi, accessed December 7, 2025, https://www.lummi.ai/blog/ui-design-trends-2025
10. 3d illustration credit score Vectors - Download Free High-Quality Vectors from Freepik, accessed December 7, 2025, https://www.freepik.com/vectors/3d-illustration-credit-score
11. 28 Best Free Fonts for Modern UI Design in 2025 (+ Typography Best Practices) | Untitled UI, accessed December 7, 2025, https://www.untitledui.com/blog/best-free-fonts
12. Fintech UX Design: A Complete Guide for 2025 - Webstacks, accessed December 7, 2025, https://www.webstacks.com/blog/fintech-ux-design
13. 30 Animated Fintech Video Examples To Showcase Financial Technology - ADVIDS, accessed December 7, 2025, https://advids.co/blog/30-animated-fintech-video-examples-to-showcase-financial-technology-
14. Glassmorphic Bottom Navigation in Jetpack Compose - sinasamaki, accessed December 7, 2025, https://www.sinasamaki.com/glassmorphic-bottom-navigation-in-jetpack-compose/
15. Browse thousands of Glassmorphism Navbar images for design inspiration | Dribbble, accessed December 7, 2025, https://dribbble.com/search/glassmorphism-navbar
16. Spring Physics Mastery: Creating Natural Motion That Captivates Users - Allyson - AI, accessed December 7, 2025, https://www.allyson.ai/blog/spring-physics-mastery
17. AI Credit Score UI - v0 by Vercel, accessed December 7, 2025, https://v0.dev/chat/ai-credit-score-ui-3s7fB8k1nZE
18. Dynamic UI for AI Voice Assistant - YouTube, accessed December 7, 2025, https://www.youtube.com/watch?v=REqmieLpCwk
19. Browse thousands of Ai Voice images for design inspiration | Dribbble, accessed December 7, 2025, https://dribbble.com/search/ai-voice
20. UI Design Trends For 2025 - Chillybin, accessed December 7, 2025, https://www.chillybin.co/ui-design-trends-2025/
21. Browse thousands of Card Parallax images for design inspiration - Dribbble, accessed December 7, 2025, https://dribbble.com/search/card-parallax
22. How to implement Gyroscopic parallax in flutter - Medium, accessed December 7, 2025, https://medium.com/@RuslanTsitser/gyroscopic-parallax-effect-in-flutter-43ceb53b1449
23. Fintech App Design: 10 Latest Mobile Banking Trends - UXDA, accessed December 7, 2025, https://theuxda.com/blog/ux-case-study-mobile-banking-app-design-neobank
24. Designing interaction — spring animations | by Patricio Reyes - Medium, accessed December 7, 2025, https://medium.com/@patoreyes23/designing-interaction-spring-animations-c8b8788a4b2a
25. cubic-bezier() - CSS - MDN Web Docs, accessed December 7, 2025, https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/easing-function/cubic-bezier
26. Understanding easing and cubic-bezier curves in CSS - Josh Collinsworth blog, accessed December 7, 2025, https://joshcollinsworth.com/blog/easing-curves
27. Fintech UX Design Principles: Guide to Effective User Experience - DashDevs, accessed December 7, 2025, https://dashdevs.com/blog/fintech-ux-design/
28. 10 Best Fintech UX Practices for Mobile Apps in 2025 - ProCreator, accessed December 7, 2025, https://procreator.design/blog/best-fintech-ux-practices-for-mobile-apps/
29. The Future of Fintech Branding: Key Trends Shaping 2025 and Beyond, accessed December 7, 2025, https://fintechbranding.studio/fintech-branding-trends-2025
30. Top Mobile App Design Trends to Watch in 2025 | by Carlos Smith - Medium, accessed December 7, 2025, https://medium.com/@CarlosSmith24/top-mobile-app-design-trends-to-watch-in-2025-e95f633cd6ef
31. 30 Best Dark Mode UI Design Examples & Templates in 2024 - Mockplus, accessed December 7, 2025, https://www.mockplus.com/blog/post/dark-mode-ui-design

---

**Document Version**: 1.0  
**Last Updated**: December 2025  
**Status**: Active  
**Project Code**: Obsidian
