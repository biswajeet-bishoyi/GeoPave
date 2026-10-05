# CLAUDE.md — GeoPave India Development Guidelines

**Version:** 1.0  
**Date:** 2026-09-29  
**Project:** GeoPave India — Geosynthetic Reinforced Flexible Pavement Simulator  
**Audience:** Claude Code, development agents, future developers

---

## 1. Project Overview

GeoPave India is an interactive educational visualization simulator designed to explain flexible pavement construction, load propagation, and geosynthetic reinforcement in Indian road systems. 

**Primary Purpose:** Educational visualization and learning tool (NOT a structural design calculator).

**Core Educational Goals:**
- Visualize how wheel loads propagate through pavement layers
- Demonstrate geogrid confinement and aggregate load distribution
- Demonstrate geotextile separation and layer integrity
- Compare conventional pavements with geosynthetic-reinforced alternatives
- Teach when and why geosynthetics are appropriate interventions
- Build professional credibility through accurate Indian standard references (IRC:37, IRC:SP:59, MoRTH)

**Key Constraint:** All simulation outputs are explicitly labeled as conceptual, illustrative, or relative indicators. The simulator CANNOT and WILL NOT present simulation values as design calculations or IRC-verified values.

---

## 2. Product Vision

GeoPave India should feel like:
- A professional engineering laboratory / teaching simulator
- Scientific visualization software
- Civil engineering educational tool
- NOT: a generic SaaS dashboard, childish graphics, or fake 3D games

**Visual Aesthetic:**
- Clean, dark/light engineering visualization
- Professional typography (sans-serif)
- Distinct layer textures/colors (not gaudy)
- Strong visual hierarchy (pavement cross-section is hero element)
- Responsive and accessible on desktop/tablet

---

## 3. Engineering Context

### 3.1 Indian Flexible Pavement Structure

**Standard layers (top to bottom):**
1. **BC (Bituminous Concrete):** 40–80 mm; surface protection, load transfer
2. **DBM (Dense Bituminous Macadam):** 75–150 mm; structural binder layer
3. **WMM (Wet Mix Macadam):** 150–300 mm; granular load distribution
4. **GSB (Granular Sub-Base):** 150–300 mm; further load distribution, cost efficiency
5. **Subgrade:** Foundation soil; bearing capacity, settlement response

**Geosynthetic layers (optional interventions):**
- **Geogrid:** Typically placed at WMM/GSB interface or within WMM; confines aggregate, improves load distribution
- **Geotextile:** Typically placed above subgrade; separates soil, provides filtration, reduces mixing

### 3.2 Relevant Standards (DO NOT INVENT)

- **IRC:37-2018:** Guidelines for the Design of Flexible Pavements (primary reference)
- **IRC:SP:59-2018:** Guidelines for Use of Geosynthetics in Road Pavements and Associated Works
- **MoRTH Specifications:** Material grades, layer definitions, construction standards
- **BIS Standards:** Material properties (e.g., geogrid tensile strength per BIS 15618)

**Rule:** Do NOT cite IRC clauses, thicknesses, or design values that you cannot verify. If uncertain, mark as "Illustrative" or omit.

### 3.3 Simulation Model vs. Design

**This simulator is NOT:**
- A pavement design tool
- A structural analysis tool
- An FEM (Finite Element Method) solver
- A traffic analysis calculator
- Compliant with IRC:37 design procedures

**This simulator IS:**
- An educational visualization
- A conceptual load propagation animator
- A geosynthetic effect demonstrator
- A learning reinforcement tool

**Distinction:** All simulation outputs must be labeled clearly. Example:
- ✅ CORRECT: "Conceptual Load Distribution Index: 65 (illustrative)"
- ❌ WRONG: "Design stress at subgrade: 150 kPa (per IRC:37)"

---

## 4. Engineering Accuracy Rules

### 4.1 Fundamental Rule

**NO FABRICATION.** Every engineering claim must be verifiable against an official source (IRC:37, IRC:SP:59, MoRTH, BIS).

### 4.2 Layer Properties

**DO:**
- State typical layer thickness ranges with reference (e.g., "40–80 mm per IRC:37")
- Describe layer functions qualitatively (e.g., "BC protects lower layers and provides skid resistance")
- Explain why a layer matters (e.g., "GSB cost-effectively distributes load to subgrade")

**DON'T:**
- Invent layer thicknesses
- State precise design values without verification
- Claim specific IRC clause numbers unless you can verify them
- Use MoRTH specification numbers without certainty

### 4.3 Geosynthetic Benefits

**DO:**
- Present benefits conservatively and contextually
- Use language like: "Geogrid may reduce rutting tendency under appropriate conditions"
- Explain the mechanism (e.g., "Geogrid confines aggregate particles, reducing lateral movement and improving load distribution")
- Acknowledge that benefits depend on material properties, placement, and subgrade condition

**DON'T:**
- Claim fixed percentages (e.g., "Geogrid reduces rutting by 50%") unless rigorously validated
- Overstate universal benefits
- Suggest geosynthetics are mandatory for all pavements
- Omit disclaimers about conditions/assumptions

### 4.4 Subgrade Response

**DO:**
- Describe qualitatively: "Weak subgrade = higher settlement risk"
- Explain CBR concept: "CBR classification relates to bearing capacity; lower CBR = weaker soil"
- Explain wet subgrade risk: "Saturated soil has reduced effective stress and bearing capacity"

**DON'T:**
- Use precise CBR-settlement correlations without validation
- Claim specific rut depth without mechanistic-empirical model
- State deformation values as "actual predictions"

### 4.5 References & Citations

**DO:**
- Include reference to standard in layer descriptions
- List all references in a "References" section
- Provide brief source descriptions (e.g., "Indian Roads Congress guideline for geosynthetics in pavements")

**DON'T:**
- Cite non-existent IRC clauses
- Reference outdated or superseded standards without noting the version
- Provide URLs without verifying they are official

### 4.6 Simulation Output Labeling

Every metric, indicator, and visualization output must be tagged with its category:

**Verified Engineering Calculation** (rare in MVP; marked if ever used):
- "Load magnitude based on vehicle weight input"

**Simplified Engineering Model** (most of simulator):
- "Conceptual stress propagation (not FEM analysis)"
- "Illustrative load distribution index"
- "Relative aggregate confinement indicator"

**Visual Approximation** (animations, particle movement):
- "Schematic representation of load paths"
- "Conceptual particle movement visualization"

**User-Defined Input** (what user controls):
- "Load magnitude: [user selection]"
- "Traffic level: [user selection]"

**Rule:** If a user cannot immediately tell whether an output is "real calculation" or "illustrative," add a label.

### 4.7 Accuracy Audit Checklist

Before committing any engineering-related content:

- [ ] Is this claim verifiable against IRC:37, IRC:SP:59, MoRTH, or BIS?
- [ ] If not, is it clearly labeled "Illustrative" or "Conceptual"?
- [ ] Does the language avoid overstating benefits or certainty?
- [ ] Are assumptions documented (e.g., "Assuming standard geogrid placement at WMM/GSB interface")?
- [ ] Could this claim mislead someone designing an actual pavement?
- [ ] Is the reference source correct and current?

---

## 5. Source / Citation Rules

### 5.1 When to Cite

- Layer definitions (name, material, typical function)
- Layer thickness guidance
- Geosynthetic applications and functions
- Any specific design principle or standard

### 5.2 How to Cite

**Format in code/data:**
```typescript
{
  name: "Bituminous Concrete",
  reference: "IRC:37-2018",
  typicalThickness: { min: 40, max: 80, unit: "mm" },
  typicalThicknessSource: "IRC:37-2018, Section X"
}
```

**Format in UI (Learn section):**
```
"Typical thickness: 40–80 mm (per IRC:37-2018)"
"For actual design, refer to IRC:37 Section X and engage a licensed engineer."
```

### 5.3 Unverifiable Claims

If you encounter a claim that seems engineering-related but you cannot verify:

1. **STOP.** Do not proceed.
2. **FLAG it** in a comment: `// TODO: Verify this against IRC:37 before including`
3. **MARK as illustrative:** "Illustrative value (not verified against IRC:37)"
4. **ASK.** If critical to functionality, ask the user or engineering advisor.

---

## 6. Technical Stack

### 6.1 Core Technologies

**Frontend Framework:**
- React 18+ (hooks, Context API)
- TypeScript (strict mode)

**Build & Bundling:**
- Vite (fast builds, HMR)
- ESLint + Prettier (code quality)

**Styling:**
- Tailwind CSS (utility-first)
- Optional: shadcn/ui for accessible components

**Visualization:**
- SVG (primary for pavement cross-section, stress diagrams)
- Canvas (optional for particle animations, if performance needed)
- Three.js (only if 3D later; NOT recommended for MVP)

**Animation:**
- Framer Motion (smooth, React-native, performant)
- CSS animations (for simple state changes)

**State Management:**
- React Context + hooks (MVP scope)
- Zustand (if state complexity grows beyond MVP)

**Testing:**
- Vitest (unit tests)
- React Testing Library (component tests)
- Playwright (e2e tests, optional)

**Performance & Optimization:**
- Code splitting (lazy loading for Learn section)
- Image optimization (SVG compression)
- Bundle analysis (check bundle size)

### 6.2 Dependencies to Avoid

- ❌ jQuery (outdated for React)
- ❌ Three.js for 2D (overkill, performance cost)
- ❌ Redux (too complex for this scope; use Context or Zustand)
- ❌ Heavy animation libraries (Animate.css; Framer Motion is sufficient)
- ❌ Unvetted geosynthetic-specific libraries (none likely exist anyway)

### 6.3 Dependency Policy

- **Pin exact versions:** `"react": "18.2.0"` NOT `"react": "^18.0.0"`
- **Prefer well-maintained packages:** Check GitHub stars, recent commits, maintenance status
- **Minimize dependencies:** Only add if genuinely necessary
- **Document why:** Comment in package.json or ARCHITECTURE.md if reasoning is non-obvious

---

## 7. Repository Structure

```
GeoPave-India/
├── .github/
│   └── workflows/
│       └── ci.yml                 # ESLint, tests, build checks
├── public/
│   ├── index.html
│   └── icons/                      # SVG icons if needed
├── src/
│   ├── components/
│   │   ├── pavement/
│   │   │   ├── PavementCrossSection.tsx
│   │   │   ├── Layer.tsx
│   │   │   ├── GeogridVisualization.tsx
│   │   │   └── GeotextileVisualization.tsx
│   │   ├── truck/
│   │   │   ├── Truck.tsx
│   │   │   └── WheelLoad.tsx
│   │   ├── animation/
│   │   │   ├── LoadAnimation.tsx
│   │   │   ├── StressBulb.tsx
│   │   │   └── ParticleAnimator.tsx
│   │   ├── controls/
│   │   │   ├── ControlPanel.tsx
│   │   │   ├── TrafficSelector.tsx
│   │   │   ├── SubgradeSelector.tsx
│   │   │   └── AnimationControls.tsx
│   │   ├── comparison/
│   │   │   ├── ComparisonView.tsx
│   │   │   └── MetricsPanel.tsx
│   │   ├── explorer/
│   │   │   ├── LayerExplorer.tsx
│   │   │   └── LayerInfo.tsx
│   │   ├── learn/
│   │   │   ├── LearnPanel.tsx
│   │   │   └── QuizSection.tsx
│   │   └── layout/
│   │       ├── Header.tsx
│   │       ├── Navigation.tsx
│   │       └── Footer.tsx
│   ├── engine/
│   │   ├── simulationEngine.ts     # Core simulation logic
│   │   ├── loadPropagation.ts
│   │   ├── pavementModel.ts
│   │   ├── geosyntheticModel.ts
│   │   ├── deformationModel.ts
│   │   └── constants.ts
│   ├── data/
│   │   ├── pavementLayers.ts
│   │   ├── engineeringReferences.ts
│   │   ├── scenarios.ts
│   │   └── quizData.ts
│   ├── types/
│   │   ├── pavement.ts
│   │   ├── simulation.ts
│   │   ├── geosynthetic.ts
│   │   └── ui.ts
│   ├── hooks/
│   │   ├── useSimulation.ts
│   │   ├── useAnimation.ts
│   │   └── useLayerExplorer.ts
│   ├── utils/
│   │   ├── animationHelpers.ts
│   │   ├── stressCalculations.ts
│   │   ├── visualizationHelpers.ts
│   │   └── formatting.ts
│   ├── App.tsx
│   ├── index.tsx
│   └── styles.css
├── tests/
│   ├── engine/
│   │   └── simulationEngine.test.ts
│   ├── components/
│   │   └── PavementCrossSection.test.tsx
│   └── e2e/
│       └── simulator.spec.ts
├── docs/
│   ├── README.md
│   ├── ARCHITECTURE.md
│   ├── SIMULATION_MODEL.md
│   └── ENGINEERING_REFERENCES.md
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── eslintrc.json
├── prettier.config.js
├── package.json
├── PRD.md                           # This PRD
├── CLAUDE.md                        # This file
└── .gitignore
```

### 7.1 Folder Purpose

- `/components` — React components (UI presentation, stateless preferred)
- `/engine` — Simulation logic (independent of React; testable, pure functions)
- `/data` — Static data (layer definitions, references, scenarios)
- `/types` — TypeScript interfaces and types
- `/hooks` — Custom React hooks (state management, side effects)
- `/utils` — Utility functions (formatting, calculations, helpers)
- `/tests` — Test files (mirrors `/src` structure)
- `/docs` — Documentation (README, architecture guides)

---

## 8. Architecture Rules

### 8.1 Separation of Concerns

**Golden Rule:** Simulation engine is independent from UI.

**Why:** The simulation logic can be tested, debugged, and modified without touching React. This allows:
- Easy testing of simulation correctness
- Replacement of conceptual model with design calculations later
- Reuse in CLI or backend tools

**Pattern:**
```typescript
// engine/simulationEngine.ts (pure, testable)
export function runSimulation(input: SimulationInput): SimulationOutput {
  // Pure function: no side effects, no React
  // Returns deterministic output given input
}

// hooks/useSimulation.ts (React integration)
export function useSimulation(input: SimulationInput) {
  const [output, setOutput] = useState<SimulationOutput | null>(null);
  useEffect(() => {
    const result = runSimulation(input);
    setOutput(result);
  }, [input]);
  return output;
}

// components/SimulatorView.tsx (UI presentation)
export function SimulatorView() {
  const input = useSimulationInput(); // get input from controls
  const output = useSimulation(input); // run simulation
  return <div>{/* render output */}</div>;
}
```

### 8.2 Component Design Principles

**Rule 1: Stateless Components**
- Components should primarily be presentational (render props, no internal state).
- State lives in parent or Context.
- Exception: Local UI state (modal open/close, tooltip visibility) is OK.

**Rule 2: Single Responsibility**
- Each component has one primary purpose.
- If a component is doing multiple things, split it.
- Example: Don't mix "render pavement" with "handle click events for layer explorer"; use a parent component to wire them.

**Rule 3: Prop Documentation**
- Document all props in JSDoc comments.
- Example:
  ```typescript
  interface PavementCrossSectionProps {
    /** Pavement configuration (layers, geosynthetics) */
    config: PavementConfiguration;
    /** Callback when user clicks a layer */
    onLayerClick?: (layerName: string) => void;
    /** Current animation state (for highlighting) */
    animationState?: AnimationFrame;
  }
  ```

**Rule 4: Avoid Prop Drilling**
- If passing props through 3+ levels, use Context instead.
- Create a custom hook to consume Context (cleaner than `useContext`).

### 8.3 State Management Rules

**MVP Scope: Use React Context + hooks**

**When to migrate to Zustand:**
- If more than 5 top-level state slices
- If state updates become frequent and complex
- If performance optimization needed (Context re-renders all consumers on update)

**Pattern:**
```typescript
// store/simulationStore.ts (if using Zustand)
import create from 'zustand';

interface SimulationStore {
  input: SimulationInput;
  output: SimulationOutput | null;
  updateTrafficConfig: (config: Partial<TrafficConfiguration>) => void;
  runSimulation: () => void;
}

export const useSimulationStore = create<SimulationStore>((set) => ({
  input: defaultInput,
  output: null,
  updateTrafficConfig: (config) =>
    set((state) => ({
      input: { ...state.input, traffic: { ...state.input.traffic, ...config } },
    })),
  runSimulation: () =>
    set((state) => ({
      output: runSimulation(state.input),
    })),
}));
```

---

## 9. Simulation Engine Rules

### 9.1 Core Principle: Deterministic

The simulation engine MUST be deterministic.
- Same input → same output (no randomness unless explicitly needed for visualization variety).
- Allows testing, debugging, reproducibility.

### 9.2 Input Validation

```typescript
// engine/simulationEngine.ts

export function validateInput(input: SimulationInput): ValidationResult {
  const errors: string[] = [];
  
  if (!["light", "medium", "heavy", "very_heavy"].includes(input.traffic.level)) {
    errors.push(`Invalid traffic level: ${input.traffic.level}`);
  }
  
  if (!["good", "moderate", "weak", "wet_poor_drainage"].includes(input.subgrade.condition)) {
    errors.push(`Invalid subgrade condition: ${input.subgrade.condition}`);
  }
  
  return errors.length === 0
    ? { valid: true }
    : { valid: false, errors };
}

export function runSimulation(input: SimulationInput): SimulationOutput {
  const validation = validateInput(input);
  if (!validation.valid) {
    throw new Error(`Simulation input invalid: ${validation.errors.join(", ")}`);
  }
  // ... proceed with simulation
}
```

### 9.3 Conceptual Model (MVP)

**DO NOT fabricate precise equations.** Instead, use a clearly documented conceptual model.

**Example:**
```typescript
/**
 * Conceptual Load Propagation Model
 * 
 * This is NOT a mechanistic-empirical model or FEM analysis.
 * It is a simplified, illustrative model for educational visualization.
 * 
 * Load spreads downward and laterally through layers.
 * Spread factor increases with layer softness (granular > bituminous).
 * Stress reduces with depth due to load distribution.
 * 
 * Geogrid reduces lateral spread (confinement).
 * Geotextile prevents soil migration (no load effect).
 */

function calculateStressAtDepth(
  initialLoad: number,
  depth: number,
  pavementConfig: PavementConfiguration
): number {
  let currentLoad = initialLoad;
  let currentDepth = 0;
  
  for (const layer of pavementConfig.layers) {
    // Bituminous layers: 15% stress reduction per layer
    // Granular layers: 25–30% stress reduction per layer
    const reductionFactor = layer.type === 'bituminous' ? 0.85 : 0.75;
    currentLoad *= reductionFactor;
    
    // If geogrid present in this layer, improve load distribution (reduce stress)
    if (layer.hasGeogrid) {
      currentLoad *= 0.85; // 15% additional reduction (illustrative)
    }
    
    currentDepth += layer.thickness;
    
    if (currentDepth >= depth) {
      return currentLoad;
    }
  }
  
  return currentLoad;
}
```

**Key:** Always document that this is "conceptual" and NOT a design calculation.

### 9.4 Animation Sequence Generation

Animation frames should be independent from simulation output and deterministic.

```typescript
/**
 * Generate animation frames from simulation output.
 * Each frame represents a moment in time during load transfer.
 * Frames are independent and can be rendered in any order.
 */
export function generateAnimationSequence(
  simOutput: SimulationOutput,
  durationSeconds: number = 10,
  frameRate: number = 30
): AnimationFrame[] {
  const totalFrames = Math.ceil((durationSeconds * frameRate) / 1000);
  const frames: AnimationFrame[] = [];
  
  for (let i = 0; i <= totalFrames; i++) {
    const progress = i / totalFrames; // 0 to 1
    const time = progress * durationSeconds;
    
    frames.push({
      time,
      progress,
      activeLayer: determineActiveLayer(time),
      stressIntensity: interpolateStress(simOutput, progress),
      particles: calculateParticlePositions(simOutput, progress),
      // ... other frame data
    });
  }
  
  return frames;
}
```

### 9.5 Labeling Outputs

Every output must be tagged with its type:

```typescript
export interface SimulationOutput {
  // Verified calculations (rare)
  loadMagnitude: {
    value: number; // kN or normalized
    label: "User-defined input";
  };
  
  // Conceptual model outputs
  stressDistribution: {
    values: number[]; // 0–100, relative
    label: "Conceptual stress propagation (not FEM)";
  };
  
  // Illustrative metrics
  metrics: {
    loadDistributionIndex: {
      value: number; // 0–100
      label: "Illustrative indicator";
    };
    aggregateConfinement: {
      value: number; // 0–100
      label: "Relative indicator (with geogrid)";
    };
  };
}
```

---

## 10. UI/UX Rules

### 10.1 Design Language

**Professional Engineering Aesthetic:**
- Dark/light mode with high contrast
- Clean sans-serif typography
- Distinct layer textures (not gamified)
- Strong visual hierarchy (pavement = hero)
- No unnecessary animations or gradients

**Color Palette:**
- Primary: Dark gray (#1f2937) or dark blue (#1e3a8a)
- Accent: Engineering blue (#0369a1) or green (#15803d)
- Stress: Red (#dc2626) → Yellow (#eab308) → Green (#22c55e)
- Text: Dark gray on light, light gray on dark
- Borders: Subtle gray (#d1d5db)

### 10.2 Responsive Design

**Breakpoints:**
- Desktop: 1200px+
- Tablet: 768px–1199px
- Mobile: <768px

**Rules:**
- Pavement cross-section scales responsively (maintain aspect ratio)
- Controls stack vertically on mobile
- Touch targets: minimum 44px × 44px
- No horizontal scroll at any breakpoint

### 10.3 Information Hierarchy

1. **Primary:** Pavement cross-section (largest, center)
2. **Secondary:** Control panel (below or right)
3. **Tertiary:** Metrics, animation controls
4. **Tertiary:** Layer information (on-demand)
5. **Quaternary:** Learn, references (separate tabs)

### 10.4 Component Naming

- `Xxx.tsx` — Component file
- `XxxProps` — Interface for component props
- `useXxx` — Custom hook
- `xxxEngine.ts` — Pure logic module

---

## 11. Visualization Rules

### 11.1 SVG vs. Canvas

**Use SVG for:**
- Pavement cross-section (static, scalable)
- Stress diagrams (clean, precise)
- Layer outlines (crisp edges)
- Load arrows (vector graphics)

**Use Canvas for:**
- Particle animations (performance-critical if many particles)
- Real-time stress bulb gradients (if SVG gradients too slow)
- Heavy animation (100+ moving elements)

**Default to SVG unless performance testing proves otherwise.**

### 11.2 Color Coding

**Stress Visualization:**
- Red: High stress (>80 on 0–100 scale)
- Yellow: Medium stress (40–80)
- Green: Low stress (<40)
- Transparent: No stress

**Layer Identification:**
- BC: Dark asphalt (#1a1a1a)
- DBM: Dark gray with texture (#3a3a3a)
- WMM: Tan/beige (#c4b5a0)
- GSB: Light tan (#d4c5b0)
- Geogrid: Light gray grid (#e5e7eb)
- Geotextile: Beige fabric (#f3e8d8)
- Subgrade: Brown soil (#8b7355)

### 11.3 Accessibility in Visualization

- **Color not sole indicator:** Always supplement with patterns, labels, or text
- **Contrast:** Minimum 4.5:1 for text
- **Legends:** Every color/pattern must be explained
- **Alternative text:** SVG `<title>` and `<desc>` tags for screen readers

---

## 12. Animation Rules

### 12.1 Animation Principles

- **Smooth:** 60 FPS on desktop/tablet
- **Purposeful:** Every animation communicates meaning (not decorative)
- **Interruptible:** User can pause/reset at any time
- **Accessible:** Respect `prefers-reduced-motion`

### 12.2 Animation Controller

```typescript
// hooks/useAnimation.ts

interface AnimationState {
  currentFrame: number;
  isPlaying: boolean;
  playbackRate: number; // 1.0 = normal, 0.5 = slow motion
}

export function useAnimation(frames: AnimationFrame[]) {
  const [state, setState] = useState<AnimationState>({
    currentFrame: 0,
    isPlaying: false,
    playbackRate: 1.0,
  });
  
  const play = () => setState((s) => ({ ...s, isPlaying: true }));
  const pause = () => setState((s) => ({ ...s, isPlaying: false }));
  const reset = () => setState({ currentFrame: 0, isPlaying: false, playbackRate: 1.0 });
  const step = (direction: 1 | -1) => {
    pause();
    setState((s) => ({
      ...s,
      currentFrame: Math.max(0, Math.min(s.currentFrame + direction, frames.length - 1)),
    }));
  };
  
  // Animation loop
  useEffect(() => {
    if (!state.isPlaying) return;
    
    const interval = setInterval(() => {
      setState((s) => ({
        ...s,
        currentFrame: (s.currentFrame + 1) % frames.length,
      }));
    }, 1000 / (30 * state.playbackRate)); // 30 FPS * playback rate
    
    return () => clearInterval(interval);
  }, [state.isPlaying, state.playbackRate, frames.length]);
  
  return {
    ...state,
    play,
    pause,
    reset,
    step,
    currentAnimationFrame: frames[state.currentFrame],
  };
}
```

### 12.3 Reduced Motion Support

```typescript
// utils/animationHelpers.ts

export function shouldReduceMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// In component:
const reduceMotion = shouldReduceMotion();
if (reduceMotion) {
  // Show static view instead of animation
  return <StaticStressVisualization {...props} />;
} else {
  // Show animation
  return <AnimatedStressVisualization {...props} />;
}
```

---

## 13. Accessibility Rules

### 13.1 WCAG 2.1 Level AA Target

**Minimum compliance:**
- Keyboard navigation (Tab, Enter, Arrow keys)
- Screen reader support (semantic HTML, ARIA labels)
- Color contrast: 4.5:1 for normal text, 3:1 for large text
- Reduced motion: Respect `prefers-reduced-motion`
- Focus indicators: Visible outline on all interactive elements

### 13.2 Keyboard Navigation

```typescript
// Example: Making a custom button accessible

<button
  aria-label="Apply wheel load to pavement"
  onClick={handleApplyLoad}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleApplyLoad();
    }
  }}
>
  Apply Wheel Load
</button>
```

### 13.3 Screen Reader Support

```typescript
// SVG with accessible content
<svg role="img" aria-label="Pavement cross-section showing load propagation">
  <title>Flexible Pavement Structure</title>
  <desc>Five layers of a flexible pavement: BC (top), DBM, WMM, GSB, and subgrade (bottom). Load arrow shows wheel load entering from top.</desc>
  {/* SVG content */}
</svg>

// Interactive elements
<div
  role="button"
  tabIndex={0}
  aria-label="Bituminous Concrete layer; click to see details"
  onClick={() => { /* ... */ }}
>
  BC Layer
</div>
```

### 13.4 Color Contrast

```typescript
// Verify contrast when adding colors

// BAD: #aaa text on #fff background (ratio 3.8:1 < 4.5:1)
// GOOD: #595959 text on #fff background (ratio 4.54:1 >= 4.5:1)

// Use tools: WebAIM Contrast Checker, Colornesia, Coblis (color blindness)
```

### 13.5 Focus Management

```typescript
// When opening a modal, trap focus within it
function LayerExplorerModal({ isOpen, onClose }) {
  const firstButtonRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    if (isOpen) {
      firstButtonRef.current?.focus();
    }
  }, [isOpen]);
  
  return isOpen ? (
    <div role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <h2 id="modal-title">Layer Information</h2>
      {/* Modal content */}
      <button ref={firstButtonRef} onClick={onClose}>Close</button>
    </div>
  ) : null;
}
```

---

## 14. Performance Rules

### 14.1 Bundle Size

- **Target:** < 500 KB (gzipped)
- **Check:** `npm run build && npm run analyze`
- **Rule:** If adding a dependency increases bundle by > 50 KB, reconsider

### 14.2 Runtime Performance

- **Simulation:** < 500 ms (should feel instant)
- **Animation:** 60 FPS (smooth playback)
- **Page load:** < 3 seconds (LCP < 2.5 sec)

### 14.3 Optimization Techniques

**Code Splitting:**
```typescript
// Lazy load Learn section
const LearnPanel = lazy(() => import('./components/learn/LearnPanel'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LearnPanel />
    </Suspense>
  );
}
```

**Memoization:**
```typescript
// Memoize expensive components
const PavementCrossSection = memo(({ config, animationFrame }) => {
  // Component only re-renders if config or animationFrame changes
  return <svg>{/* ... */}</svg>;
});
```

**useMemo for calculations:**
```typescript
// Cache expensive simulation results
const simulationOutput = useMemo(
  () => runSimulation(input),
  [input]
);
```

---

## 15. Coding Standards

### 15.1 TypeScript

**Always use strict mode:**
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true
  }
}
```

**Type everything:**
```typescript
// GOOD
function calculateLoad(vehicle: VehicleType, traffic: TrafficLevel): number {
  return loadMap[vehicle][traffic];
}

// BAD
function calculateLoad(vehicle, traffic) {
  return loadMap[vehicle][traffic];
}
```

### 15.2 Naming Conventions

- **Components:** PascalCase (`PavementCrossSection.tsx`)
- **Functions:** camelCase (`calculateStress()`)
- **Constants:** UPPER_SNAKE_CASE (`DEFAULT_LAYER_THICKNESS`)
- **Types/Interfaces:** PascalCase (`SimulationInput`, `LayerData`)
- **Files:** kebab-case or PascalCase (match export name)

### 15.3 Comments

**Write comments for "why," not "what":**

```typescript
// GOOD: Explains intent
// Reduce load by 15% per bituminous layer (simplification for educational visualization)
const reductionFactor = 0.85;

// BAD: Obvious from code
// Set reduction factor to 0.85
const reductionFactor = 0.85;
```

**Use JSDoc for exported functions:**

```typescript
/**
 * Calculate conceptual stress distribution through pavement layers.
 * 
 * @param initialLoad - Normalized load magnitude (0–100)
 * @param pavementConfig - Pavement configuration (layers, geosynthetics)
 * @returns Stress intensity at each depth (0–100, relative)
 * 
 * @remarks
 * This is a conceptual model for educational visualization.
 * NOT a mechanistic-empirical or FEM analysis.
 * Stress reduces with depth; spreads laterally through granular layers.
 */
export function calculateStressDistribution(
  initialLoad: number,
  pavementConfig: PavementConfiguration
): number[] {
  // Implementation
}
```

### 15.4 Error Handling

```typescript
// Always validate inputs
export function runSimulation(input: SimulationInput): SimulationOutput {
  const validation = validateInput(input);
  if (!validation.valid) {
    throw new Error(`Invalid simulation input: ${validation.errors.join(", ")}`);
  }
  
  try {
    return executeSimulation(input);
  } catch (error) {
    console.error("Simulation failed:", error);
    throw new Error(`Simulation execution failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
```

---

## 16. React Rules

### 16.1 Hooks Best Practices

**Use hooks, not class components:**
```typescript
// GOOD: Functional component with hooks
export function Simulator() {
  const [config, setConfig] = useState<PavementConfiguration>(defaultConfig);
  const output = useSimulation(config);
  
  return <div>{/* ... */}</div>;
}

// AVOID: Class components
class Simulator extends React.Component {
  state = { config: defaultConfig };
  // ...
}
```

**Order of hooks (within component):**
1. State (useState)
2. Effects (useEffect)
3. Refs (useRef)
4. Memoization (useMemo, useCallback)
5. Context (useContext)

### 16.2 Prop Drilling Prevention

```typescript
// BAD: Drilling props 3+ levels
<Simulator config={config} onConfigChange={setConfig} />
// └─ <SimulatorView config={config} onConfigChange={setConfig} />
//    └─ <ControlPanel config={config} onConfigChange={setConfig} />

// GOOD: Use Context
const ConfigContext = createContext<{
  config: PavementConfiguration;
  setConfig: (config: PavementConfiguration) => void;
}>(undefined!);

export function SimulatorProvider({ children }) {
  const [config, setConfig] = useState<PavementConfiguration>(defaultConfig);
  return (
    <ConfigContext.Provider value={{ config, setConfig }}>
      {children}
    </ConfigContext.Provider>
  );
}

// In nested component
const { config, setConfig } = useContext(ConfigContext);
```

### 16.3 Conditional Rendering

```typescript
// GOOD: Conditional render with early return
if (!output) {
  return <LoadingSpinner />;
}

if (output.isError) {
  return <ErrorMessage error={output.error} />;
}

return <SimulationView output={output} />;

// OKAY: Ternary for simple cases
return <div>{isLoading ? <Spinner /> : <Content />}</div>;

// AVOID: Multiple conditions in JSX
return <div>{loading && error && valid ? <A /> : <B />}</div>;
```

---

## 17. State Management Rules

### 17.1 Props vs. State vs. Context

**Use props for:**
- Static data (layer definitions)
- Component configuration
- Callback functions

**Use state for:**
- User input (traffic level, subgrade condition)
- Animation state (current frame, playing)
- Temporary UI state (modal open/close)

**Use Context for:**
- Global simulation state (shared by many components)
- Theme/settings (if added later)

**Do NOT use Context for:**
- Every bit of state (defeats purpose of useState)
- High-frequency updates (causes unnecessary re-renders)

### 17.2 State Lifting

```typescript
// GOOD: State at appropriate level
function App() {
  const [config, setConfig] = useState<PavementConfiguration>(defaultConfig);
  
  return (
    <>
      <ControlPanel config={config} onChange={setConfig} />
      <SimulatorView config={config} />
    </>
  );
}

// AVOID: State too high or too low
// Too high: State in root App for every UI toggle
// Too low: Each component manages its own config (not in sync)
```

---

## 18. Testing Rules

### 18.1 What to Test

**MUST test:**
- Simulation engine (all functions)
- Component rendering (correct output)
- User interactions (button clicks, selections)
- State updates (config changes trigger correct behavior)
- Edge cases (invalid inputs, empty states)

**SHOULD test:**
- Animation frame generation
- Accessibility (keyboard, screen reader)
- Responsive layout (different breakpoints)

**OPTIONAL:**
- Style/CSS (visual regression testing is expensive)
- Third-party library functions (assume they work)

### 18.2 Unit Tests (Simulation Engine)

```typescript
// tests/engine/simulationEngine.test.ts

import { describe, it, expect } from 'vitest';
import { runSimulation, calculateStressAtDepth } from '../../src/engine/simulationEngine';

describe('simulationEngine', () => {
  it('should reduce stress with depth', () => {
    const stress1m = calculateStressAtDepth(100, 1000, defaultConfig);
    const stress2m = calculateStressAtDepth(100, 2000, defaultConfig);
    
    expect(stress2m).toBeLessThan(stress1m);
  });
  
  it('should apply geogrid effect', () => {
    const configWithout = { ...defaultConfig, geogrid: false };
    const configWith = { ...defaultConfig, geogrid: true };
    
    const outputWithout = runSimulation({ ...input, pavementConfig: configWithout });
    const outputWith = runSimulation({ ...input, pavementConfig: configWith });
    
    // Geogrid should improve load distribution
    expect(outputWith.metrics.loadDistributionIndex)
      .toBeGreaterThan(outputWithout.metrics.loadDistributionIndex);
  });
  
  it('should throw on invalid input', () => {
    const invalidInput = { ...input, traffic: { level: 'invalid' } };
    expect(() => runSimulation(invalidInput as any)).toThrow();
  });
});
```

### 18.3 Component Tests

```typescript
// tests/components/PavementCrossSection.test.tsx

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PavementCrossSection } from '../../src/components/pavement/PavementCrossSection';

describe('PavementCrossSection', () => {
  it('should render all layers', () => {
    render(<PavementCrossSection config={defaultConfig} />);
    
    expect(screen.getByText('BC')).toBeInTheDocument();
    expect(screen.getByText('DBM')).toBeInTheDocument();
    expect(screen.getByText('WMM')).toBeInTheDocument();
    expect(screen.getByText('GSB')).toBeInTheDocument();
    expect(screen.getByText('Subgrade')).toBeInTheDocument();
  });
  
  it('should call onLayerClick when layer is clicked', async () => {
    const onLayerClick = vi.fn();
    const user = userEvent.setup();
    
    render(
      <PavementCrossSection config={defaultConfig} onLayerClick={onLayerClick} />
    );
    
    await user.click(screen.getByText('BC'));
    expect(onLayerClick).toHaveBeenCalledWith('BC');
  });
  
  it('should display geogrid when enabled', () => {
    const configWithGeogrid = { ...defaultConfig, geogrid: true };
    render(<PavementCrossSection config={configWithGeogrid} />);
    
    expect(screen.getByTestId('geogrid-layer')).toBeInTheDocument();
  });
  
  it('should hide geogrid when disabled', () => {
    const configWithout = { ...defaultConfig, geogrid: false };
    render(<PavementCrossSection config={configWithout} />);
    
    expect(screen.queryByTestId('geogrid-layer')).not.toBeInTheDocument();
  });
});
```

---

## 19. Git Rules

### 19.1 Branching

**Branch naming:**
- Feature: `feature/pavement-cross-section`
- Bug fix: `fix/animation-frame-drop`
- Docs: `docs/update-simulation-model`
- Never commit directly to `main`/`master`

### 19.2 Commits

**Commit message format:**
```
[feature|fix|docs|refactor]: Brief description (50 chars max)

Longer explanation (72 chars per line).
Explain what changed and why, not how.

Fixes: #123 (if closing an issue)
```

**Example:**
```
feat: Add geogrid confinement visualization

- Aggregate particles now show constrained movement within grid cells
- Lateral spread reduced by 30–40% with geogrid (illustrative)
- Added GeogridVisualization component with particle animation

Fixes: #45
```

### 19.3 Pull Requests

- Always create PR for review before merging
- PR title: Descriptive, < 70 chars
- PR description: What changed, why, what was tested
- Require approval before merge

---

## 20. Documentation Rules

### 20.1 README.md

Must include:
- Project overview
- How to install/run
- How to use the simulator
- Engineering accuracy disclaimer
- Contributing guidelines
- License

### 20.2 ARCHITECTURE.md

Must include:
- Project structure overview
- Component architecture
- Simulation engine explanation
- State management strategy
- Key design decisions and rationale

### 20.3 SIMULATION_MODEL.md

Must include:
- How the simulation works (high-level)
- Load propagation model
- Geogrid effect model
- Geotextile effect model
- Subgrade response model
- Limitations and assumptions
- Clearly labeled "Conceptual Model"

### 20.4 Inline Code Comments

- Explain "why," not "what"
- Document complex algorithms
- Mark areas of uncertainty or future improvements
- JSDoc for public functions/components

---

## 21. Forbidden Practices

### 21.1 Absolute NO's

- ❌ **Fabricating IRC clauses or design values.** Every number must be verifiable.
- ❌ **Presenting simulation outputs as design calculations.** Always label clearly.
- ❌ **Overstating geosynthetic benefits.** Be conservative; credibility is paramount.
- ❌ **Hardcoding layer thicknesses or material properties.** Use constants/data files.
- ❌ **Using eval() or dynamic code execution.** Security risk and maintainability nightmare.
- ❌ **Mixing simulation logic with UI components.** Keep separation of concerns strict.
- ❌ **Committing console.log() statements.** Use proper logging or remove.
- ❌ **Large monolithic components.** Split into smaller, testable pieces.
- ❌ **Ignoring TypeScript errors.** Fix them; don't suppress with `any`.
- ❌ **Publishing without WCAG AA testing.** Accessibility is not optional.

---

## 22. Definition of Done

A feature is "Done" when:

1. **Implemented** per PRD requirements
2. **Tested** (unit + component tests passing)
3. **Accessible** (keyboard nav, screen reader, contrast verified)
4. **Documented** (JSDoc, inline comments, README updated if needed)
5. **Code reviewed** (approved by another developer or technical lead)
6. **No console errors/warnings** in development mode
7. **TypeScript strict mode** passes (no `any`, no `@ts-ignore` without reason)
8. **Performance** acceptable (< 500 KB bundle, animation smooth, simulation < 500 ms)
9. **Responsive** (works on desktop, tablet, mobile)
10. **Engineering-accurate** (references verified, no fabrications, labels correct)

---

## 23. How Claude Should Approach New Features

1. **Read PRD.md first.** Understand requirements, acceptance criteria, user stories.

2. **Plan architecture.** How does this feature fit into the existing structure? Does it need new components, updates to simulation engine, or both?

3. **Implement simulation logic first (if applicable).** Pure functions, testable, independent of UI.

4. **Implement UI components.** Presentational components, props-driven, no deep state.

5. **Connect via custom hooks or Context.** Wire simulation to UI without tight coupling.

6. **Test thoroughly.** Unit tests for engine, component tests for UI, manual e2e testing.

7. **Verify accessibility.** Keyboard nav, screen reader, color contrast.

8. **Document.** JSDoc, inline comments, update README if necessary.

9. **Code review.** Ask for feedback; iterate if needed.

10. **Merge.** Celebrate.

---

## 24. How Claude Should Modify Existing Features

1. **Understand the current implementation.** Read existing code, understand why it's structured that way.

2. **Verify the requirement.** Does the request require changing the existing approach, or just an extension?

3. **Preserve working functionality.** Don't rewrite code unless necessary; make targeted changes.

4. **Check for side effects.** Will this change affect other components/tests? Run tests.

5. **Update tests if needed.** If behavior changes, update corresponding tests.

6. **Update documentation.** If architecture changes, update ARCHITECTURE.md or comments.

7. **Run full test suite.** Ensure nothing broke.

---

## 25. How Claude Should Handle Engineering Uncertainty

1. **Recognize uncertainty.** Ask: "Can I verify this against IRC:37/IRC:SP:59/MoRTH?"

2. **If YES:** Use the verified information; cite the source.

3. **If NO:** Mark it as "Illustrative" or "Conceptual" or OMIT it.

4. **Flag for review.** Add a comment: `// TODO: Verify against IRC:37 Section X before release`

5. **Ask the user.** If critical to functionality, ask the user or engineering advisor before committing.

6. **Document assumptions.** If using a simplified model, document the assumptions explicitly.

**Golden Rule:** Preserve credibility over feature completeness. A simple, accurate simulator is better than a feature-rich, inaccurate one.

---

## 26. Code Quality Checklist

Before committing, verify:

- [ ] **TypeScript:** No `any`, strict mode passes, types exported
- [ ] **Linting:** `npm run lint` passes (ESLint + Prettier)
- [ ] **Testing:** `npm run test` passes (unit + component tests)
- [ ] **Performance:** Bundle size acceptable, simulation fast
- [ ] **Accessibility:** Keyboard nav works, contrast >= 4.5:1, semantic HTML
- [ ] **Engineering:** No fabricated values, correct references, appropriate labels
- [ ] **Documentation:** JSDoc on exports, comments on complex logic
- [ ] **Git:** Branch name clear, commit message descriptive
- [ ] **No console errors:** In development mode, console clean
- [ ] **Responsive:** Layout works on 320px, 768px, 1200px viewports

---

## 27. Development Workflow

### 27.1 Getting Started

```bash
git clone https://github.com/username/GeoPave-India.git
cd GeoPave-India
npm install
npm run dev
```

### 27.2 During Development

```bash
# In one terminal
npm run dev

# In another terminal, run tests (watch mode)
npm run test -- --watch

# Lint on save (optional, configure in editor)
npm run lint -- --fix
```

### 27.3 Before Committing

```bash
npm run lint       # Fix linting errors
npm run test       # Run all tests
npm run build      # Build for production
npm run analyze    # Check bundle size
```

### 27.4 Create PR

```bash
git push -u origin feature/your-feature-name
# Open PR on GitHub
# Request review
# Address feedback
# Merge when approved
```

---

## 28. Deployment

### 28.1 Pre-Deployment Checklist

- [ ] All tests passing
- [ ] No console errors/warnings
- [ ] Bundle size < 500 KB
- [ ] WCAG AA compliance verified
- [ ] Engineering accuracy reviewed
- [ ] Simulation outputs correctly labeled
- [ ] README updated
- [ ] Disclaimer visible on page

### 28.2 Deployment Targets

- **Development:** Local (`npm run dev`)
- **Staging:** Vercel preview (automatic on PR)
- **Production:** Vercel main branch (after PR merged)

---

## 29. Monitoring & Feedback

- **Error tracking:** Sentry (optional; log to console in MVP)
- **User feedback:** Form on "Learn" section or GitHub issues
- **Performance metrics:** Web Vitals monitoring
- **Engineering feedback:** Email or GitHub discussions

---

## 30. Future Engineering Model

Reserve space in architecture for future validated models:

```typescript
// simulationEngine.ts — placeholder for future design model

export interface DesignCalculator {
  calculateMinimumLayerThickness(
    traffic: TrafficAnalysis,
    subgrade: SubgradeCharacterization
  ): LayerThickness[];
  
  calculateRuttingDepth(
    traffic: TrafficAnalysis,
    pavement: PavementConfiguration
  ): number; // mm
  
  calculateFatigueDamage(
    traffic: TrafficAnalysis,
    pavement: PavementConfiguration
  ): number; // damage ratio
}

// Currently using conceptual model
let designCalculator: DesignCalculator | null = null;

// Future: Replace conceptual model with validated calculations
export function setDesignCalculator(calculator: DesignCalculator) {
  designCalculator = calculator;
}

export function runSimulation(input: SimulationInput): SimulationOutput {
  if (designCalculator) {
    // Use validated design calculations
    return runDesignCalculation(input, designCalculator);
  } else {
    // Use conceptual model (current, MVP)
    return runConceptualSimulation(input);
  }
}
```

---

## 31. Questions for the User

If uncertain, ask:

1. **"Is this an IRC:37 / IRC:SP:59 / MoRTH requirement?"** If yes, verify before implementing.
2. **"Is this user-visible?"** If yes, ensure it's accessible and accurate.
3. **"Should this be configurable by the user?"** If yes, add to control panel.
4. **"Does this affect simulation accuracy or just visualization?"** Affects priority and implementation approach.
5. **"Is this in-scope for MVP?"** Consult PRD phase roadmap.

---

## 32. Summary: Claude's Core Responsibilities

As Claude Code for this project:

1. **Preserve engineering accuracy.** No fabrications, correct references, appropriate labels.
2. **Maintain architecture discipline.** Simulation engine separate from UI.
3. **Write testable code.** Pure functions, small components, clear dependencies.
4. **Prioritize accessibility.** WCAG AA compliance, keyboard nav, semantic HTML.
5. **Respect user intent from PRD.** Build what's specified; ask before deviating.
6. **Document thoughtfully.** JSDoc, comments explain "why," not "what."
7. **Test thoroughly.** Unit + component + accessibility tests.
8. **Keep learning.** Ask for feedback, iterate, improve.

---

**Document Version:** 1.0  
**Last Updated:** 2026-09-29  
**Status:** Ready for Development

---

## 33. User Personas & Learning Paths

GeoPave India serves multiple distinct audiences. Each has different needs, complexity preferences, and success metrics.

### 33.1 Persona 1: Civil Engineering Student (Age 19–22)

**Profile:**
- Learning flexible pavement design for first time
- Limited practical experience; textbook-heavy curriculum
- Uses simulator to visualize abstract concepts

**Needs:**
- Simple, forgiving UI (no overwhelming options)
- Clear, layered explanations (Beginner → Advanced)
- Visual feedback on every action
- Immediate gratification (run simulation in <2 seconds)

**Pain Points:**
- Math-heavy textbooks don't explain "why"
- Difficulty visualizing load propagation
- Unclear why geosynthetics matter in practice

**Success Metric:**
- "I finally understand how stress distributes through layers"
- Can explain (to a friend) why geogrid helps

**UI/UX Implications:**
- Hide advanced controls by default (progressive disclosure)
- Tooltips on every button
- "Learn" tab should answer "why" questions
- Quiz section to reinforce learning

---

### 33.2 Persona 2: Young Engineer (Age 22–28)

**Profile:**
- Designing first road project; may reference IRC:37
- Familiar with pavement concepts; wants practical tool
- May show simulator to senior engineers for validation

**Needs:**
- Quick scenario setup (save presets)
- Professional, credible appearance
- Export reports (screenshots, CSV)
- Comparison mode (conventional vs. geosynthetic)

**Pain Points:**
- Simulator MUST NOT mislead about design safety
- Outputs must be clearly labeled "illustrative"
- Needs confidence in results before presenting to team

**Success Metric:**
- "Used this to explain to my team why we should consider geogrid"
- Team accepted concept after seeing visualization

**UI/UX Implications:**
- Scenario library with pre-built cases (e.g., "High-traffic highway")
- Comparison mode front-and-center
- Export button with warning dialog
- Reference links to IRC:37 sections
- Confidence badges on metrics ("Medium confidence," etc.)

---

### 33.3 Persona 3: Contractor/Project Manager (Age 30–50)

**Profile:**
- Manages construction crews; wants to understand geosynthetics
- Not deep technical knowledge; practical concerns
- May attend industry workshops

**Needs:**
- Simple visual explanation (no math)
- Cost-benefit reasoning (why pay for geogrid?)
- Field-applicable insights
- Printable summaries

**Pain Points:**
- Overwhelmed by technical detail
- Skeptical of "new" solutions (wants proof)
- May not have engineering background

**Success Metric:**
- "Now I understand when geosynthetics are worth the cost"
- Can justify material choice to project stakeholders

**UI/UX Implications:**
- "Simple Mode" toggle (hides equations, complex metrics)
- Cost-comparison chart (optional module)
- Glossary with plain-English definitions
- Printable 1-page summary

---

### 33.4 Persona 4: Educator/Professor (Age 35–65)

**Profile:**
- Teaches 40–200 students; wants to save prep time
- Integrating simulator into curriculum
- Grades student assignments

**Needs:**
- Classroom/batch mode (assign preset scenarios)
- Student progress tracking
- Grading rubric support
- LMS integration (Moodle, Canvas)

**Pain Points:**
- Manual setup for each student is tedious
- Cannot assess which concepts students don't grasp
- Wants to assign homework

**Success Metric:**
- "Reduced my prep time by 30%; students more engaged"
- Can track which quiz topics trip up students
- Integrates seamlessly into course platform

**UI/UX Implications:**
- Instructor dashboard (preset scenarios, batch export)
- Student assignment tracking
- Quiz question difficulty metrics
- SCORM export (LMS compatibility)
- Downloadable student workbook

---

### 33.5 Feature Prioritization by Persona

**MVP (Launch):**
- Student + Young Engineer personas (Sections 33.1 + 33.2)

**Post-MVP (Q2 2027):**
- Contractor mode (Section 33.3)
- Instructor mode (Section 33.4)

---

## 34. Scenario Library & Use Cases

Pre-built scenarios make learning concrete and help users connect theory to practice. They reduce analysis paralysis ("what values should I choose?").

### 34.1 Scenario Categories

**Category A: Traffic Intensity Scenarios**
- **Light Traffic (Town Road):** 1,000 vehicles/day, mostly 2-wheelers
- **Medium Traffic (State Highway):** 5,000 vehicles/day, mixed loading
- **Heavy Traffic (National Highway):** 15,000 vehicles/day, high truck ratio
- **Very Heavy Traffic (Urban Expressway):** 30,000+ vehicles/day, sustained heavy loading

**Category B: Subgrade Condition Scenarios**
- **Good Subgrade (Rock/Well-Compacted Soil):** CBR 8–12%, high bearing capacity
- **Moderate Subgrade (Average Soil):** CBR 3–5%, typical performance
- **Weak Subgrade (Silty/Clayey Soil):** CBR 1–2%, settlement risk
- **Wet/Poor Drainage (Monsoon-Prone):** Saturated soil, CBR drops to <1%, high rutting risk

**Category C: Environmental Scenarios**
- **Monsoon-Prone Weak Subgrade:** Heavy rainfall + weak soil = double jeopardy
- **Coastal Saline Soil:** Salt content affects binder durability
- **Hightemperature Region:** Thermal cracking risk; thicker BC layer needed
- **High-Altitude:** Low temperature; premature fatigue
- **Urban Heat Island:** Darker pavements absorb more heat

**Category D: Real-World Design Cases**
- **National Highway NH-1 (Delhi–Mumbai):** High traffic, mixed terrain
- **State Road to Remote Village:** Low traffic, weak subgrade
- **Urban Arterial Road:** Medium-high traffic, tight ROW constraints
- **Airport Taxiway:** Concentrated heavy loading
- **Industrial Park Road:** Uniform traffic; aggressive loads

---

### 34.2 Scenario Data Structure

```typescript
// data/scenarios.ts

export interface Scenario {
  id: string;
  name: string;
  description: string;
  category: 'traffic' | 'subgrade' | 'environmental' | 'realworld';
  icon: string;
  
  // Pavement configuration
  pavementConfig: PavementConfiguration;
  
  // Traffic
  trafficLevel: 'light' | 'medium' | 'heavy' | 'very_heavy';
  trafficDescription: string; // "1,000 vehicles/day, mostly 2-wheelers"
  
  // Subgrade
  subgradeCondition: 'good' | 'moderate' | 'weak' | 'wet_poor_drainage';
  subgradeCBR: number;
  subgradeDescription: string; // "CBR 3–5%, typical performance"
  
  // Environmental factors (optional)
  environment?: {
    rainallMM: number;
    temperatureRange: [number, number]; // [min, max] in °C
    drainage: 'excellent' | 'good' | 'poor' | 'very_poor';
  };
  
  // Recommended geosynthetics
  recommendedGeosynthetics: {
    geogrid: boolean;
    geotextile: boolean;
    reason: string; // "Weak subgrade → use geotextile for separation"
  };
  
  // Learning notes
  learningNotes: string[];
  // [
  //   "This scenario is common in monsoon-prone regions",
  //   "Geogrid improves load distribution ~15–20%",
  //   "Compare with conventional solution to see benefit"
  // ]
  
  // References
  relatedIRCSection: string; // "IRC:37-2018, Section 3.2"
}

export const SCENARIOS: Scenario[] = [
  {
    id: 'nh1-delhi-mumbai',
    name: 'National Highway NH-1 (Delhi–Mumbai)',
    description: 'High-traffic route with variable subgrade; heavy truck traffic',
    category: 'realworld',
    icon: '🛣️',
    
    pavementConfig: {
      layers: [
        { name: 'BC', thickness: 60 },
        { name: 'DBM', thickness: 100 },
        { name: 'WMM', thickness: 200, hasGeogrid: true },
        { name: 'GSB', thickness: 250 },
      ],
      geogrid: true,
      geotextile: false,
    },
    
    trafficLevel: 'very_heavy',
    trafficDescription: '20,000+ vehicles/day; 40% heavy trucks',
    
    subgradeCondition: 'moderate',
    subgradeCBR: 4,
    subgradeDescription: 'Mixed soil; CBR 3–5%; typical for route',
    
    environment: {
      rainfallMM: 800,
      temperatureRange: [5, 45],
      drainage: 'good',
    },
    
    recommendedGeosynthetics: {
      geogrid: true,
      geotextile: false,
      reason: 'Heavy traffic + moderate subgrade → geogrid confines WMM, reduces rutting',
    },
    
    learningNotes: [
      'This is a real-world high-traffic scenario',
      'Geogrid in WMM layer improves lateral load distribution',
      'Temperature variation (5–45°C) requires thermal considerations',
      'Compare with conventional design to see cost–benefit',
    ],
    
    relatedIRCSection: 'IRC:37-2018, Section 4.2 (Design for very heavy traffic)',
  },
  
  // More scenarios...
];
```

---

### 34.3 Scenario UI Implementation

```typescript
// components/ScenarioLibrary.tsx

export function ScenarioLibrary() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  
  return (
    <div className="scenario-library">
      <h2>Pre-Built Scenarios</h2>
      <p>Start with a real-world case or customize from scratch</p>
      
      {/* Filters */}
      <div className="filters">
        <button>All</button>
        <button>Traffic</button>
        <button>Subgrade</button>
        <button>Environmental</button>
        <button>Real-World</button>
      </div>
      
      {/* Scenario Cards */}
      <div className="scenario-grid">
        {SCENARIOS.map(scenario => (
          <ScenarioCard
            key={scenario.id}
            scenario={scenario}
            onSelect={() => {
              setSelectedScenario(scenario);
              loadScenario(scenario);
            }}
          />
        ))}
      </div>
      
      {/* Scenario Detail Panel */}
      {selectedScenario && (
        <ScenarioDetail scenario={selectedScenario} />
      )}
    </div>
  );
}

// Scenario Card shows: name, category, icon, quick description
function ScenarioCard({ scenario, onSelect }: ScenarioCardProps) {
  return (
    <div className="card" onClick={onSelect}>
      <div className="icon">{scenario.icon}</div>
      <h3>{scenario.name}</h3>
      <p className="category">{scenario.category}</p>
      <p className="description">{scenario.description}</p>
      <button>Load Scenario</button>
    </div>
  );
}

// Scenario Detail shows: full info, learning notes, comparison option
function ScenarioDetail({ scenario }: ScenarioDetailProps) {
  return (
    <div className="detail-panel">
      <h3>{scenario.name}</h3>
      
      <section>
        <h4>Scenario Details</h4>
        <ul>
          <li><strong>Traffic:</strong> {scenario.trafficDescription}</li>
          <li><strong>Subgrade:</strong> {scenario.subgradeDescription} (CBR {scenario.subgradeCBR})</li>
          {scenario.environment && (
            <>
              <li><strong>Annual Rainfall:</strong> {scenario.environment.rainfallMM} mm</li>
              <li><strong>Temperature Range:</strong> {scenario.environment.temperatureRange[0]}–{scenario.environment.temperatureRange[1]}°C</li>
            </>
          )}
        </ul>
      </section>
      
      <section>
        <h4>Recommended Geosynthetics</h4>
        <p>{scenario.recommendedGeosynthetics.reason}</p>
      </section>
      
      <section>
        <h4>Learning Notes</h4>
        <ul>
          {scenario.learningNotes.map((note, i) => (
            <li key={i}>{note}</li>
          ))}
        </ul>
      </section>
      
      <section>
        <h4>References</h4>
        <p><a href="#">{scenario.relatedIRCSection}</a></p>
      </section>
      
      <button onClick={() => compareWithConventional(scenario)}>
        Compare with Conventional
      </button>
    </div>
  );
}
```

---

## 35. Disclaimer & Legal Guardrails

### 35.1 Disclaimer Statement (Required on Every Page)

```typescript
// components/Disclaimer.tsx

export function Disclaimer() {
  return (
    <div className="disclaimer-banner" role="region" aria-label="Disclaimer">
      <div className="content">
        <p className="headline">
          <strong>⚠️ EDUCATIONAL SIMULATION ONLY</strong>
        </p>
        <p>
          GeoPave India is an educational tool for visualizing pavement concepts. 
          It is <strong>NOT</strong> suitable for actual pavement design. 
          See <a href="/terms-of-use">Terms of Use</a> for full disclaimer.
        </p>
      </div>
    </div>
  );
}

// CSS: Make it prominent but not obstructive
.disclaimer-banner {
  background: #fef3c7;
  border-left: 4px solid #f59e0b;
  padding: 12px 16px;
  margin: 0 0 20px 0;
  font-size: 14px;
  line-height: 1.4;
}
```

### 35.2 Terms of Use Page

Create `/pages/TermsOfUse.tsx` with sections:
1. **Educational Purpose Only** — What this tool is/isn't
2. **Limitation of Liability** — No warranty; no responsibility for misuse
3. **User Responsibilities** — Users must verify with engineers
4. **Accuracy Statements** — All outputs labeled "Illustrative"
5. **Contact for Concerns** — How to report misuse
6. **Acceptable Use Policy** — What users can/cannot do

(See ANTIGRAVITY.md Section 3.2 for full template)

### 35.3 Export Warning Dialog

```typescript
// Before any export (screenshot, CSV, PDF)
function ExportConfirmDialog() {
  const [userAgreed, setUserAgreed] = useState(false);
  
  return (
    <dialog open>
      <h2>Confirm Export</h2>
      <div className="warning-box">
        <p className="headline">⚠️ This export is ILLUSTRATIVE only</p>
        <ul>
          <li>❌ Do NOT use for actual design</li>
          <li>❌ Do NOT submit to regulatory bodies</li>
          <li>❌ Do NOT include in professional reports without engineer review</li>
          <li>✅ DO consult a licensed engineer for real projects</li>
        </ul>
      </div>
      
      <label>
        <input 
          type="checkbox"
          checked={userAgreed}
          onChange={(e) => setUserAgreed(e.target.checked)}
        />
        <span>I understand this is an illustrative export only</span>
      </label>
      
      <div className="buttons">
        <button onClick={() => closeDialog()}>Cancel</button>
        <button 
          onClick={() => proceedWithExport()}
          disabled={!userAgreed}
        >
          Download Export
        </button>
      </div>
    </dialog>
  );
}
```

### 35.4 Exported File Watermark

All exports include watermark:
```
"ILLUSTRATIVE EXPORT FROM GEOPAVE INDIA — NOT FOR DESIGN"
Date: 2026-10-06
Exported by: user@email.com
Simulation Parameters: [traffic=heavy, subgrade=weak, geogrid=yes]
Disclaimer: See terms-of-use at geopave.edu
```

---

## 36. Data Export & Reporting

### 36.1 Export Formats & Rules

**✅ ALLOWED Exports:**
1. **Screenshot (PNG)** — Current visualization + watermark
2. **Simulation Data (JSON)** — Raw parameters + outputs (versioned)
3. **Comparison Report (CSV)** — Conventional vs. geosynthetic metrics side-by-side
4. **Student Workbook (PDF)** — Scenario + blank space for notes (educator mode)

**❌ NOT ALLOWED Exports:**
- "Design Report" (implies IRC:37 compliance)
- "IRC:37 Certification" (false credentialing)
- "Professional Engineering Analysis"
- Any export without "ILLUSTRATIVE" label

### 36.2 Export Data Structure

```typescript
export interface ExportData {
  // Metadata
  version: string; // App version
  engineVersion: string; // Simulation engine version
  exportedAt: string; // ISO timestamp
  exportedBy: string; // User ID (privacy: anonymized)
  
  // Scenario
  scenario: {
    trafficLevel: string;
    subgradeCondition: string;
    geogridEnabled: boolean;
    geotextileEnabled: boolean;
  };
  
  // Simulation Output
  results: {
    stressAtDepth: number[];
    loadDistributionIndex: number;
    aggregateConfinement: number;
    // ... all metrics with confidence levels
  };
  
  // Disclaimer (legal protection)
  disclaimer: {
    text: string; // Full disclaimer text
    acceptedAt: string; // When user accepted
    terms: string; // URL to terms of use
  };
  
  // Formatting
  filename: string; // "GeoPave_2026-10-06_NH1_scenario.json"
}
```

### 36.3 Naming Convention

All exports follow pattern:
```
GeoPave_[DATE]_[SCENARIO-ID]_[TYPE].[EXT]

Examples:
- GeoPave_2026-10-06_NH1_screenshot.png
- GeoPave_2026-10-06_NH1_simulation-data.json
- GeoPave_2026-10-06_comparison_report.csv
- GeoPave_2026-10-06_classroom_workbook.pdf
```

---

## 37. Multilingual & Localization Roadmap

### 37.1 i18n Architecture

Reserve folder structure for translations:
```
src/
├── i18n/
│   ├── en/
│   │   ├── common.json
│   │   ├── engineering.json
│   │   ├── learn.json
│   │   └── ui.json
│   ├── hi/
│   │   ├── common.json
│   │   ├── engineering.json
│   │   ├── learn.json
│   │   └── ui.json
│   └── ...
└── utils/
    └── i18n.ts
```

### 37.2 Translation Rules

**DON'T Translate (Keep in English):**
- Technical acronyms: IRC:37, MoRTH, BIS, CBR
- Layer names: BC, DBM, WMM, GSB (standard codes)
- Geosynthetic types: "geogrid," "geotextile"
- Metric names: "Load Distribution Index"

**DO Translate:**
- UI labels: "Load," "Traffic Level," "Subgrade Condition"
- Explanations: Layer functions, geosynthetic benefits
- Learn section: Full educational content
- Instructions: How to use simulator
- Field labels: Dropdowns, input boxes

### 37.3 Regional Variants

**Tier 1 (MVP):**
- English (en-IN: Indian English)

**Tier 2 (Post-MVP):**
- Hindi (hi-IN)
- Marathi (mr-IN)
- Tamil (ta-IN)
- Telugu (te-IN)

**Tier 3 (Future):**
- Nepali (ne-NP)
- Bangla (bn-BD)
- (Regional standards: IRC:SP:59, but localized explanations)

### 37.4 Implementation

```typescript
// utils/i18n.ts

import en from '../i18n/en/common.json';
import hi from '../i18n/hi/common.json';

const translations = { en, hi };

export function t(key: string, lang: string = 'en'): string {
  const keys = key.split('.');
  let value: any = translations[lang];
  for (const k of keys) {
    value = value?.[k];
  }
  return value || `[Missing: ${key}]`;
}

// Usage in component
<h2>{t('common.title', currentLanguage)}</h2>
// or with i18next library for production
```

---

## 38. Mobile/Tablet Interaction Patterns

### 38.1 Touch Controls

**Swipe Gestures:**
- Swipe left/right: Rotate pavement cross-section (±10°)
- Swipe up: Expand layer details
- Swipe down: Collapse layer details
- Pinch zoom: Scale visualization (0.5x–2x)

**Long-press:**
- Long-press layer: Show layer properties modal
- Long-press metric: Explain confidence level

### 38.2 Accelerometer Integration (Optional, Fun)

```typescript
// Optional: Tilt device to see stress direction shift
if (DeviceOrientationEvent) {
  window.addEventListener('deviceorientation', (event) => {
    const alpha = event.alpha; // Z-axis (0–360°)
    const beta = event.beta;   // X-axis (-180 to 180°)
    
    // Rotate pavement visualization based on tilt
    updatePavementRotation(beta);
  });
}
```

**Disclaimer:** "Tilt device to rotate view (for fun; does not affect simulation accuracy)"

### 38.3 Mobile Fallbacks

Ensure full functionality without touch gestures:
- Buttons for rotate, zoom, expand/collapse
- On-screen dpad (↑ ↓ ← →)
- Slider for rotation angle

### 38.4 Responsive Layout

**Desktop (1200px+):**
- Pavement cross-section (left, 60%)
- Control panel (right, 40%)

**Tablet (768px–1199px):**
- Pavement cross-section (top, 60%)
- Control panel (bottom, 40%)
- Vertical scrolling

**Mobile (<768px):**
- Pavement cross-section (full width, 50% height)
- Controls (tabs below)
- Scroll vertically

---

## 39. Dark Mode Strategy

### 39.1 System Preference Detection

```typescript
// hooks/useDarkMode.ts

export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true;
    }
    // Check localStorage (user override)
    return localStorage.getItem('geopave-dark-mode') === 'true';
  });
  
  const toggle = () => {
    setIsDark(!isDark);
    localStorage.setItem('geopave-dark-mode', String(!isDark));
  };
  
  return { isDark, toggle };
}
```

### 39.2 Dark Mode Color Overrides

**Layer Colors (adjust for dark background):**

| Layer | Light | Dark | Rationale |
|-------|-------|------|-----------|
| BC | #1a1a1a | #3a3a3a | Darker in light mode, lighter in dark |
| DBM | #3a3a3a | #5a5a5a | Maintain contrast |
| WMM | #c4b5a0 | #a89078 | Tan stays readable |
| GSB | #d4c5b0 | #b8a890 | Light tan slightly darker |
| Geogrid | #e5e7eb | #4b5563 | Grid visible on both |
| Geotextile | #f3e8d8 | #c9bfb3 | Fabric pattern visible |
| Subgrade | #8b7355 | #a0865f | Brown slightly lighter |
| Stress (High) | #dc2626 | #ef4444 | Red brighter in dark |
| Stress (Low) | #22c55e | #4ade80 | Green brighter in dark |

### 39.3 Benefits for Engineering Visualization

Dark mode actually **improves** stress heatmap contrast:
- Red stress indicators pop more on dark background
- Less eye strain during long simulation sessions
- Better for projected presentations (classroom mode)

---

## 40. Onboarding & Tutorial Flow

### 40.1 First-Time User Detection

```typescript
// App.tsx

export function App() {
  const [isFirstVisit, setIsFirstVisit] = useState(() => {
    return !localStorage.getItem('geopave-onboarded');
  });
  
  const completeOnboarding = () => {
    localStorage.setItem('geopave-onboarded', 'true');
    setIsFirstVisit(false);
  };
  
  return (
    <>
      {isFirstVisit && (
        <OnboardingTutorial onComplete={completeOnboarding} />
      )}
      <Simulator />
    </>
  );
}
```

### 40.2 Onboarding Steps

**Step 1: Welcome (15 seconds)**
- Video: "What is this tool?" (30-second animation)
- "This is a simulator for learning about road pavements"

**Step 2: Load Control (30 seconds)**
- Highlight the truck icon
- "Click here to apply a wheel load"
- User clicks → Load appears on cross-section

**Step 3: Stress Visualization (30 seconds)**
- Highlight the stress heatmap
- "Watch how stress spreads through layers"
- Animation plays automatically

**Step 4: Geogrid Toggle (30 seconds)**
- Highlight geogrid checkbox
- "Add geogrid to see how it helps"
- User toggles → Visualization updates

**Step 5: Learn Tab (20 seconds)**
- Highlight "Learn" tab
- "Explore articles to understand each concept"

**Step 6: Done (10 seconds)**
- "You're ready to explore! Tip: Hover over any element for help"
- Skip/Finish button

**Total time: ~2–3 minutes**

### 40.3 Tutorial Component

```typescript
// components/OnboardingTutorial.tsx

export function OnboardingTutorial({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    {
      title: 'Welcome to GeoPave India',
      content: <WelcomeStep />,
      action: 'Next',
    },
    {
      title: 'Apply a Wheel Load',
      target: '#truck-control',
      content: 'Click the truck icon to apply a load',
      action: 'Next',
    },
    {
      title: 'Watch Stress Propagate',
      target: '#stress-visualization',
      content: 'See how stress spreads through layers',
      action: 'Next',
    },
    // ... more steps
  ];
  
  const step = steps[currentStep];
  
  return (
    <div className="onboarding-overlay">
      {/* Spotlight: highlight target element */}
      {step.target && <Spotlight selector={step.target} />}
      
      {/* Tooltip */}
      <div className="onboarding-tooltip">
        <h2>{step.title}</h2>
        <div>{step.content}</div>
        <div className="buttons">
          {currentStep > 0 && <button onClick={() => setCurrentStep(currentStep - 1)}>Back</button>}
          {currentStep < steps.length - 1 ? (
            <button onClick={() => setCurrentStep(currentStep + 1)}>{step.action}</button>
          ) : (
            <button onClick={onComplete}>Finish</button>
          )}
          <button onClick={onComplete}>Skip Tutorial</button>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="progress">
        {currentStep + 1} / {steps.length}
      </div>
    </div>
  );
}
```

### 40.4 Context Tooltips (Always Available)

```typescript
// Hover over any control → tooltip appears
<button 
  aria-label="Apply wheel load"
  data-tooltip="Click to apply a truck wheel load to the pavement"
>
  <TruckIcon />
</button>

// CSS: Show tooltip on hover
[data-tooltip]:hover::after {
  content: attr(data-tooltip);
  /* Position, style, etc. */
}
```

---

## 41. Glossary & Terminology

Create `/pages/Glossary.tsx` with searchable terms, linked to IRC standards.

```typescript
// data/glossary.ts

export interface GlossaryTerm {
  term: string;
  fullName?: string; // For acronyms
  definition: string;
  relatedTerms: string[];
  source: string; // "IRC:37-2018, Section 3.1"
  learnLink?: string; // Link to Learn section article
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'BC',
    fullName: 'Bituminous Concrete',
    definition: 'Top layer of flexible pavement; provides surface protection and load transfer. Typical thickness 40–80 mm.',
    relatedTerms: ['Bituminous', 'Surface Layer', 'Asphalt'],
    source: 'IRC:37-2018, Section 2.1',
    learnLink: '/learn/bituminous-layers',
  },
  {
    term: 'DBM',
    fullName: 'Dense Bituminous Macadam',
    definition: 'Binder layer in flexible pavement; transfers load from BC to granular layers. Typical thickness 75–150 mm.',
    relatedTerms: ['Binder Layer', 'Bituminous'],
    source: 'IRC:37-2018, Section 2.2',
  },
  {
    term: 'WMM',
    fullName: 'Wet Mix Macadam',
    definition: 'Granular layer using water and cement; cost-effective load distribution. Typical thickness 150–300 mm.',
    relatedTerms: ['Granular Layer', 'Base Layer'],
    source: 'IRC:37-2018, Section 2.3',
  },
  {
    term: 'GSB',
    fullName: 'Granular Sub-Base',
    definition: 'Lower granular layer; further distributes load to subgrade. Typical thickness 150–300 mm.',
    relatedTerms: ['Sub-Base', 'Granular Layer'],
    source: 'IRC:37-2018, Section 2.4',
  },
  {
    term: 'CBR',
    fullName: 'California Bearing Ratio',
    definition: 'Measure of subgrade bearing capacity. Higher CBR = stronger soil. Ranges 1–12 for typical roads.',
    relatedTerms: ['Bearing Capacity', 'Subgrade', 'Soil Strength'],
    source: 'IRC:SP:20-2002, Appendix A',
  },
  {
    term: 'Geogrid',
    definition: 'Geosynthetic material with grid structure; confines aggregate particles, improves load distribution. Typically placed in WMM/GSB interface.',
    relatedTerms: ['Geosynthetic', 'Confinement', 'Reinforcement'],
    source: 'IRC:SP:59-2018, Section 3.2',
    learnLink: '/learn/geogrid-function',
  },
  {
    term: 'Geotextile',
    definition: 'Woven or non-woven fabric; provides separation between soil layers, prevents mixing. Placed above subgrade.',
    relatedTerms: ['Geosynthetic', 'Separation', 'Filtration'],
    source: 'IRC:SP:59-2018, Section 3.3',
  },
  {
    term: 'Rutting',
    definition: 'Permanent deformation (groove) in pavement surface due to heavy traffic. Can indicate material failure or inadequate design.',
    relatedTerms: ['Distress', 'Deformation', 'Failure Mode'],
    source: 'IRC:37-2018, Section 6.1',
  },
  {
    term: 'IRC:37',
    fullName: 'Indian Roads Congress: Guidelines for the Design of Flexible Pavements',
    definition: 'Primary Indian standard for pavement design. Updated 2018 edition. Covers design methods, layer specifications, and material properties.',
    relatedTerms: ['IRC', 'Standard', 'Design Guideline'],
    source: 'Indian Roads Congress',
  },
  {
    term: 'IRC:SP:59',
    fullName: 'Indian Roads Congress: Guidelines for Use of Geosynthetics in Road Pavements and Associated Works',
    definition: 'IRC standard for geosynthetic applications in roads. Covers selection, placement, and performance.',
    relatedTerms: ['IRC', 'Geosynthetic', 'Guideline'],
    source: 'Indian Roads Congress',
  },
  // ... more terms
];

// Glossary component
export function Glossary() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filtered = GLOSSARY_TERMS.filter(term =>
    term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    term.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="glossary">
      <h1>Glossary</h1>
      <input
        type="search"
        placeholder="Search glossary..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <div className="terms">
        {filtered.map(term => (
          <div key={term.term} className="term">
            <h3>{term.term}</h3>
            {term.fullName && <p className="full-name">{term.fullName}</p>}
            <p className="definition">{term.definition}</p>
            {term.relatedTerms.length > 0 && (
              <p className="related">
                <strong>Related:</strong>{' '}
                {term.relatedTerms.map(t => (
                  <a key={t} href={`#${t}`}>{t}</a>
                )).reduce((prev, curr) => [prev, ', ', curr])}
              </p>
            )}
            <p className="source">Source: <a href="#">{term.source}</a></p>
            {term.learnLink && (
              <a href={term.learnLink} className="learn-link">→ Learn more</a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 42. Animation & Particle System Rules

### 42.1 Particle Configuration

```typescript
// constants/animation.ts

export const PARTICLE_CONFIG = {
  // Performance limits
  MAX_PARTICLES_DESKTOP: 200,
  MAX_PARTICLES_TABLET: 100,
  MAX_PARTICLES_MOBILE: 50,
  
  // Physics
  GRAVITY: 0.1, // Downward acceleration
  DAMPING: 0.95, // Friction (0–1; 0.95 = 5% energy loss per frame)
  PARTICLE_SIZE: 3, // pixels
  
  // Animation
  SPAWN_RATE: 0.3, // Particles per frame
  LIFETIME: 2000, // ms before particle disappears
  VELOCITY_RANGE: [2, 8], // pixels per frame
  
  // Trails
  SHOW_TRAILS: true,
  TRAIL_LENGTH: 10, // number of previous positions to show
  TRAIL_OPACITY_DECAY: 0.9,
};
```

### 42.2 Particle Representation

**What particles represent:**
- ✅ Illustrative aggregate particles (NOT realistic simulation)
- ✅ Show conceptual load path propagation
- ✅ Confined movement with geogrid (reduced lateral spread)
- ❌ NOT actual FEM particle tracking
- ❌ NOT precise aggregate movement
- ❌ NOT suitable for design calculations

**Visual feedback:**
- Particles flow downward → Shows vertical load propagation
- Particles spread laterally (more with weak layers) → Shows load distribution
- Particles confined (narrower spread with geogrid) → Shows geogrid benefit

### 42.3 Particle Physics

```typescript
// engine/particleAnimator.ts

export interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number; // velocity x
  vy: number; // velocity y
  age: number; // ms since spawn
  trail: Array<{ x: number; y: number }>; // Previous positions
}

export function updateParticles(
  particles: Particle[],
  config: PavementConfiguration,
  deltaTime: number
): Particle[] {
  return particles.map(p => {
    // Apply gravity
    let vy = p.vy + GRAVITY;
    
    // Apply confinement (geogrid reduces lateral spread)
    let vx = p.vx;
    if (isInGeogridLayer(p.y, config)) {
      vx *= 0.7; // Reduce lateral velocity by 30% (illustrative)
    }
    
    // Apply damping
    vx *= DAMPING;
    vy *= DAMPING;
    
    // Update position
    const x = p.x + vx;
    const y = p.y + vy;
    
    // Add to trail
    const trail = [{ x: p.x, y: p.y }, ...p.trail].slice(0, TRAIL_LENGTH);
    
    // Increment age
    const age = p.age + deltaTime;
    
    return { ...p, x, y, vx, vy, age, trail };
  }).filter(p => p.age < PARTICLE_LIFETIME);
}
```

### 42.4 Particle Rendering

```typescript
// components/ParticleLayer.tsx

export function ParticleLayer({ particles }: { particles: Particle[] }) {
  return (
    <g className="particles">
      {particles.map(p => (
        <g key={p.id}>
          {/* Particle trail (fading) */}
          {SHOW_TRAILS && (
            <polyline
              points={p.trail.map(pos => `${pos.x},${pos.y}`).join(' ')}
              stroke="rgba(100, 150, 255, 0.3)"
              strokeWidth="1"
              fill="none"
            />
          )}
          
          {/* Particle itself */}
          <circle
            cx={p.x}
            cy={p.y}
            r={PARTICLE_SIZE}
            fill="rgba(100, 150, 255, 0.8)"
            opacity={1 - p.age / PARTICLE_LIFETIME} // Fade out
          />
        </g>
      ))}
    </g>
  );
}
```

---

## 43. Comparison Mode Deep Dive

### 43.1 Comparison UI Layout

```typescript
// components/ComparisonView.tsx

export function ComparisonView() {
  const [conventional, setConventional] = useState<SimulationOutput | null>(null);
  const [withGeosynthetic, setWithGeosynthetic] = useState<SimulationOutput | null>(null);
  
  return (
    <div className="comparison-container">
      {/* Header */}
      <h2>Conventional vs. Geosynthetic-Reinforced</h2>
      <p>Compare solutions for the same scenario</p>
      
      {/* Main Comparison Area */}
      <div className="comparison-grid">
        {/* Left: Conventional */}
        <div className="left-panel">
          <h3>Conventional Pavement</h3>
          <PavementVisualization config={conventional?.config} />
          <MetricsPanel metrics={conventional?.metrics} label="Conventional" />
        </div>
        
        {/* Center: Metrics Diff */}
        <div className="center-panel">
          <MetricsDifference 
            conventional={conventional?.metrics}
            withGeosynthetic={withGeosynthetic?.metrics}
          />
        </div>
        
        {/* Right: Geosynthetic-Reinforced */}
        <div className="right-panel">
          <h3>With Geogrid</h3>
          <PavementVisualization config={withGeosynthetic?.config} />
          <MetricsPanel metrics={withGeosynthetic?.metrics} label="With Geogrid" />
        </div>
      </div>
      
      {/* Benefits Callout */}
      <BenefitsCallout 
        conventional={conventional}
        withGeosynthetic={withGeosynthetic}
      />
    </div>
  );
}
```

### 43.2 Metrics Comparison

```typescript
// components/MetricsDifference.tsx

export function MetricsDifference({ conventional, withGeosynthetic }) {
  const metrics = [
    {
      name: 'Stress at Subgrade',
      conventional: conventional?.stressAtSubgrade,
      improved: withGeosynthetic?.stressAtSubgrade,
    },
    {
      name: 'Lateral Spread',
      conventional: conventional?.lateralSpread,
      improved: withGeosynthetic?.lateralSpread,
    },
    {
      name: 'Load Distribution Index',
      conventional: conventional?.loadDistributionIndex,
      improved: withGeosynthetic?.loadDistributionIndex,
    },
    {
      name: 'Aggregate Confinement',
      conventional: conventional?.aggregateConfinement || 0,
      improved: withGeosynthetic?.aggregateConfinement || 100,
    },
  ];
  
  return (
    <div className="metrics-diff">
      <h3>Improvement</h3>
      {metrics.map(m => {
        const improvement = ((m.improved - m.conventional) / m.conventional * 100).toFixed(1);
        const improved = improvement > 0;
        
        return (
          <div key={m.name} className="metric-row">
            <div className="metric-name">{m.name}</div>
            <div className="metric-change">
              <span className={improved ? 'green' : 'red'}>
                {improved ? '+' : ''}{improvement}%
              </span>
            </div>
            <div className="metric-bar">
              <div className="bar-fill" style={{ width: `${Math.abs(improvement)}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
```

### 43.3 Benefits Callout

```typescript
// components/BenefitsCallout.tsx

export function BenefitsCallout({ conventional, withGeosynthetic }) {
  return (
    <div className="benefits-box">
      <h3>✓ Why This Matters</h3>
      <ul>
        <li>
          <strong>Reduced stress at subgrade:</strong> Lower settlement risk
        </li>
        <li>
          <strong>Better load distribution:</strong> Lateral spread is confined, reducing rutting
        </li>
        <li>
          <strong>Improved confinement:</strong> Geogrid prevents aggregate migration
        </li>
        <li>
          <strong>Longer pavement life:</strong> Typically 5–10 more years (varies by conditions)
        </li>
      </ul>
      
      <div className="caveat">
        <p>
          <strong>Important:</strong> This comparison is illustrative. Actual benefits depend on 
          material properties, placement, and subgrade condition. Consult IRC:SP:59 for design guidance.
        </p>
      </div>
    </div>
  );
}
```

---

## 44. Extensibility Hooks

Reserve architecture for future plugins and extensions.

### 44.1 Plugin System

```typescript
// engine/plugins.ts

export interface SimulatorPlugin {
  id: string;
  name: string;
  version: string;
  description: string;
  
  // Lifecycle hooks
  install: (engine: SimulationEngine) => void;
  uninstall: (engine: SimulationEngine) => void;
  
  // Extend simulation
  beforeSimulation?: (input: SimulationInput) => void;
  afterSimulation?: (output: SimulationOutput) => void;
  
  // Add UI
  registerPanel?: (name: string, component: React.ComponentType) => void;
  registerMetric?: (metric: CustomMetric) => void;
}

export interface CustomMetric {
  id: string;
  name: string;
  calculate: (output: SimulationOutput) => number;
  unit: string;
  icon: React.ReactNode;
}

export class PluginManager {
  private plugins: Map<string, SimulatorPlugin> = new Map();
  
  install(plugin: SimulatorPlugin, engine: SimulationEngine) {
    plugin.install(engine);
    this.plugins.set(plugin.id, plugin);
  }
  
  uninstall(pluginId: string, engine: SimulationEngine) {
    const plugin = this.plugins.get(pluginId);
    if (plugin) {
      plugin.uninstall(engine);
      this.plugins.delete(pluginId);
    }
  }
}
```

### 44.2 Future Plugin Examples

**Plugin 1: FEM Validation**
- Compares GeoPave outputs with FEM analysis
- Validates accuracy of conceptual model

**Plugin 2: Cost Analysis**
- Calculates material costs
- Compares conventional vs. geosynthetic cost-benefit

**Plugin 3: Traffic Simulation**
- Advanced traffic analysis (ESA, ESAL)
- Integrates with IRC:37 design procedures

**Plugin 4: Climate Impact**
- Thermal analysis
- Drainage and water management

---

## 45. Confidence Levels

Every metric is tagged with confidence: High / Medium / Low.

### 45.1 Confidence Badges

```typescript
// components/ConfidenceBadge.tsx

export type Confidence = 'high' | 'medium' | 'low';

export function ConfidenceBadge({ level, tooltip }: { level: Confidence; tooltip: string }) {
  const config = {
    high: { color: '#22c55e', label: 'High', icon: '✓' },
    medium: { color: '#eab308', label: 'Medium', icon: '~' },
    low: { color: '#f97316', label: 'Low', icon: '?' },
  };
  
  const c = config[level];
  
  return (
    <span 
      className="confidence-badge"
      style={{ backgroundColor: c.color }}
      title={tooltip}
    >
      {c.icon} {c.label}
    </span>
  );
}
```

### 45.2 Confidence Levels by Metric

| Metric | Level | Reason |
|--------|-------|--------|
| Load magnitude at surface | High | Directly from user input |
| Stress at top of pavement | High | Simple geometry + boundary condition |
| Stress distribution shape | Medium | Simplified model; not FEM |
| Stress at subgrade | Medium | Depends on layer thicknesses (assumed) |
| Lateral spread | Medium | Conceptual; not empirically validated |
| Geogrid confinement effect | Medium | Illustrative; real benefits vary |
| Geotextile benefit | Low | Mainly qualitative (separation) |
| Settlement depth | Low | Requires CBR-settlement correlation (unvalidated) |

### 45.3 Implementation

```typescript
export interface MetricWithConfidence {
  name: string;
  value: number;
  unit: string;
  confidence: Confidence;
  explanation: string;
}

export function MetricCard({ metric }: { metric: MetricWithConfidence }) {
  return (
    <div className="metric-card">
      <div className="header">
        <h4>{metric.name}</h4>
        <ConfidenceBadge level={metric.confidence} tooltip={metric.explanation} />
      </div>
      <div className="value">
        {metric.value} {metric.unit}
      </div>
      <p className="explanation">{metric.explanation}</p>
    </div>
  );
}
```

---

## 46. Feedback Loop & Iteration

### 46.1 GitHub Issues Template

Create `/issues/FEEDBACK.md`:

```markdown
# Report Issue or Suggest Improvement

## Category
- [ ] Simulation doesn't match my textbook
- [ ] UI is confusing
- [ ] Missing information
- [ ] Bug or error
- [ ] Feature request

## Description
(Describe the issue)

## Expected vs. Actual
- Expected: ...
- Actual: ...

## References
- IRC:37 Section: ...
- Textbook page: ...
- YouTube link: ...

## Severity
- [ ] Blocker (wrong calculation)
- [ ] Major (misleading)
- [ ] Minor (cosmetic)
- [ ] Enhancement

## Attachments
- Screenshot
- Simulation file
- Document
```

### 46.2 Quiz Analytics Tracking

```typescript
// Track which quiz questions trip up users
export function trackQuizResponse(
  questionId: string,
  userAnswer: string,
  correct: boolean
) {
  analytics.trackEvent('quiz_response', {
    questionId,
    correct,
    timestamp: new Date().toISOString(),
  });
  
  // If wrong answer common: flag for review
  // "Q7: Geogrid placement → 40% of students got this wrong"
}
```

### 46.3 Quarterly Content Review

Every 90 days:
1. Analyze quiz failure rates
2. Identify topics students struggle with
3. Review and update Learn section
4. Update SIMULATION_MODEL.md if new research found
5. Post changelog: "Updated content based on user feedback"

---

## 47. Accessibility Audit Schedule

### 47.1 Automated Checks (Every Commit)

```bash
# .github/workflows/accessibility.yml

name: Accessibility Checks

on: [pull_request, push]

jobs:
  axe:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install
      - run: npm run build
      - run: npx axe-core dist/index.html --exit
        # Fail if any critical issues found
  
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install
      - run: npm run build
      - run: npx lighthouse dist/index.html --output-path=lighthouse.json
        # Check: Accessibility score ≥ 90
```

### 47.2 Manual Quarterly Testing

```markdown
# Quarterly Accessibility Audit

## Q4 2026 (2026-10-01 to 2026-12-31)

### Screen Reader Testing (NVDA)
- [ ] Home page readable
- [ ] Simulator controls labeled
- [ ] Metrics properly announced
- [ ] Errors/warnings announced
- [ ] Links descriptive

### Keyboard Navigation
- [ ] Tab through all controls in logical order
- [ ] Enter/Space triggers buttons
- [ ] Arrow keys navigate sliders
- [ ] Focus visible (outline/highlight)
- [ ] No keyboard traps

### Color Contrast
- [ ] Text: 4.5:1 minimum (normal), 3:1 (large)
- [ ] UI elements: 3:1 minimum
- [ ] Verify with: WebAIM, Contrast Checker

### Motion/Animation
- [ ] Respects `prefers-reduced-motion`
- [ ] Static alternative available
- [ ] No auto-playing video/animation

### Mobile Accessibility
- [ ] Touch targets ≥ 44×44px
- [ ] Zoom works (not disabled)
- [ ] Text resizable

### Date: ________  
### Auditor: ________  
### Issues Found: ________  
### Actions Taken: ________  
```

### 47.3 Annual User Testing

Schedule annual session with:
- Civil engineers using screen readers
- Users with motor disabilities (testing keyboard nav)
- Deaf/blind accessibility expert (review captions, descriptions)

Document findings → Create technical debt issues → Assign to sprints

---

## 48. Version Control & Simulation Model Versioning

### 48.1 Simulation Engine Version File

Create `/src/engine/VERSIONS.md`:

```markdown
# Simulation Engine Version History

## v2.2.0 (2026-11-15)
**Changes:**
- Added temperature-dependent stress reduction (thermal cracking risk)
- Implemented drainage-dependent CBR adjustment

**References:**
- IRC:37-2018, Section 4.1 (thermal analysis)
- Research paper: "Thermal effects on pavement..." (citation)

**Impact on Outputs:**
- Stress values may change ±5% for high-temperature scenarios
- Subgrade stress may increase for poor drainage conditions

**Migration:**
- Old exports still valid with label: "Calculated with v2.1.0"
- Re-run existing scenarios to see new model effects

---

## v2.1.0 (2026-10-06)
**Changes:**
- Added CBR-dependent stress reduction factor
- Geogrid confinement now scales with soil type

**References:**
- IRC:SP:59-2018, Section 5.3 (CBR correlation)

**Impact on Outputs:**
- Stress at subgrade differs from v2.0 for weak subgrades (up to ±10%)

**Migration:**
- Backward compatible; re-run for updated values

---

## v2.0.0 (2026-09-15)
**Breaking Changes:**
- Overhauled geogrid confinement model
- Changed from 2-factor to 3-factor stress reduction

**References:**
- Verified against IRC:SP:59 Annex B (case study)

**Impact:**
- NOT backward compatible
- v1.x exports will not match v2.0 model

**Migration:**
- Old exports: marked "Legacy (v1.x model)"
- Re-run simulations with v2.0 for current results

---

## v1.0.0 (2026-08-01)
**Initial Release**
- Conceptual load propagation model
- Simplified geogrid effect (15% confinement)

**References:**
- Based on Boussinesq theory (simplified)
```

### 48.2 Version Tag in Exports

All exports include version stamp:

```typescript
export interface ExportData {
  engineVersion: '2.2.0';
  exportedAt: '2026-10-06T14:30:00Z';
  warning: 'This export was generated with simulation engine v2.2.0. ' +
           'Results may differ if re-run with future versions.';
  // ... simulation data
}
```

### 48.3 Reproducibility Test

```typescript
// test/reproducibility.test.ts

describe('Reproducibility', () => {
  it('should reproduce same results across runs', () => {
    const input = testScenarios[0];
    
    const run1 = runSimulation(input);
    const run2 = runSimulation(input);
    
    expect(run1.results).toEqual(run2.results);
  });
  
  it('should warn if exported data from old version', () => {
    const oldExport = loadJSON('test-data/export-v2.0.json');
    
    console.warn = jest.fn();
    const current = runSimulation(oldExport.input);
    
    // Expect warning if outputs differ
    if (!deepEqual(oldExport.results, current.results)) {
      expect(console.warn).toHaveBeenCalledWith(/version mismatch/i);
    }
  });
});
```

---

## 49. Instructor/Classroom Mode

### 49.1 Educator Dashboard

```typescript
// components/educator/EducatorDashboard.tsx

export function EducatorDashboard() {
  const [classroom, setClassroom] = useState<Classroom | null>(null);
  
  return (
    <div className="educator-dashboard">
      <h1>Instructor Panel</h1>
      
      {/* Classroom Management */}
      <section className="classrooms">
        <h2>My Classrooms</h2>
        <ClassroomList />
        <button>Create New Classroom</button>
      </section>
      
      {/* Preset Scenarios for Assignment */}
      <section className="scenarios">
        <h2>Preset Scenarios</h2>
        <ScenarioAssigner
          onAssign={(scenario) => {
            // Assign to all students
            assignScenarioToClass(classroom.id, scenario);
          }}
        />
      </section>
      
      {/* Student Progress */}
      <section className="progress">
        <h2>Student Progress</h2>
        <StudentProgressTable classroom={classroom} />
      </section>
      
      {/* Batch Export */}
      <section className="export">
        <h2>Export</h2>
        <button onClick={() => batchExportStudentWork(classroom.id)}>
          Download All Student Work (ZIP)
        </button>
      </section>
      
      {/* Quiz Analytics */}
      <section className="analytics">
        <h2>Quiz Analytics</h2>
        <QuizPerformanceChart />
      </section>
      
      {/* Grading Rubric */}
      <section className="grading">
        <h2>Grading Rubric</h2>
        <GradingRubric />
      </section>
    </div>
  );
}
```

### 49.2 Preset Scenarios for Assignment

```typescript
export interface ClassroomAssignment {
  id: string;
  scenarioId: string;
  dueDate: string;
  rubric: GradingRubric;
  expectedAnswers?: string[]; // For quizzes
}

// Instructor assigns: "All students must run NH-1 scenario"
function assignScenario(classroom: Classroom, scenario: Scenario) {
  const assignment: ClassroomAssignment = {
    id: generateId(),
    scenarioId: scenario.id,
    dueDate: addDays(new Date(), 7).toISOString(),
    rubric: defaultRubric,
  };
  
  classroom.assignments.push(assignment);
  // Students see: "Assignment: Run NH-1 Scenario (due in 7 days)"
}
```

### 49.3 Grading Rubric

```typescript
export interface GradingRubric {
  criteria: {
    name: string; // "Did student correctly identify geogrid benefits?"
    points: number; // 10 points
    description: string; // "Student should cite ≥2 benefits with evidence"
  }[];
}

// Example rubric for "Compare Conventional vs. Geosynthetic"
const comparisonRubric: GradingRubric = {
  criteria: [
    {
      name: 'Ran both scenarios',
      points: 5,
      description: 'Student exported results from both conventional and geosynthetic pavements',
    },
    {
      name: 'Identified key differences',
      points: 15,
      description: 'Student noted ≥3 differences in metrics (stress, spread, confinement)',
    },
    {
      name: 'Explained mechanism',
      points: 15,
      description: 'Student explained HOW geogrid reduces stress (confinement, load distribution)',
    },
    {
      name: 'Referenced standards',
      points: 10,
      description: 'Student cited IRC:37 or IRC:SP:59 in explanation',
    },
    {
      name: 'Presentation/clarity',
      points: 5,
      description: 'Report is well-organized and easy to follow',
    },
  ],
};
```

### 49.4 LMS Integration (SCORM Export)

Reserve API for future SCORM compliance:

```typescript
// Future: Export student progress as SCORM package
export function exportSCORM(classroom: Classroom): ScormPackage {
  return {
    version: '1.2',
    manifestFile: generateManifest(classroom),
    content: generateContent(classroom),
    // Tracks completion, scores, time spent
  };
}

// Can then import into Moodle, Canvas, Blackboard, etc.
```

---

## 50. Performance Budgets (Detailed)

### 50.1 Execution Time Budget

```typescript
// constants/performanceBudgets.ts

export const PERFORMANCE_BUDGETS = {
  // Simulation
  SIMULATION_TIME_MS: 500, // Should feel <0.5s
  SIMULATION_TIME_WARN_MS: 300, // Warn if >300ms (slow device)
  
  // Animation
  ANIMATION_FPS_TARGET: 60,
  ANIMATION_FPS_MIN: 50, // Warn if drops below
  FRAME_TIME_MS: 16.67, // 1000 / 60 FPS
  
  // Memory
  MEMORY_BUDGET_MB: 50, // Total (sim + particles + SVG)
  MEMORY_WARN_MB: 40,
  
  // Bundle
  BUNDLE_SIZE_KB: 500, // Gzipped
  BUNDLE_WARN_KB: 450,
  
  // Page Load
  LCP_TARGET_MS: 2500, // Largest Contentful Paint
  FCP_TARGET_MS: 1500, // First Contentful Paint
  TTI_TARGET_MS: 3500, // Time to Interactive
};
```

### 50.2 Bundle Breakdown Target

```
Total: 485 KB (gzipped)

- React + ReactDOM: 45 KB
- Framer Motion: 20 KB
- Tailwind CSS: 50 KB
- SVG/Icons: 15 KB
- Pavement visualization: 30 KB
- Simulation engine: 25 KB
- Learn content: 80 KB (lazy-loaded)
- Miscellaneous: 180 KB (app code, utilities, etc.)

---
Baseline: 330 KB (core simulator)
Learn section: 80 KB (lazy-loaded on demand)
Buffer: 75 KB
```

### 50.3 Performance Monitoring

```typescript
// utils/performanceMonitor.ts

export function monitorSimulation(input: SimulationInput) {
  const startTime = performance.now();
  const result = runSimulation(input);
  const elapsed = performance.now() - startTime;
  
  console.log(`Simulation time: ${elapsed.toFixed(2)}ms`);
  
  if (elapsed > PERFORMANCE_BUDGETS.SIMULATION_TIME_WARN_MS) {
    console.warn(`⚠️ Simulation slow (${elapsed}ms); may cause lag on slower devices`);
  }
  
  if (elapsed > PERFORMANCE_BUDGETS.SIMULATION_TIME_MS) {
    console.error(`❌ BUDGET EXCEEDED: ${elapsed}ms > ${PERFORMANCE_BUDGETS.SIMULATION_TIME_MS}ms`);
  }
  
  return result;
}

export function monitorAnimation() {
  let frameCount = 0;
  let lastTime = performance.now();
  
  function frame() {
    const now = performance.now();
    const deltaTime = now - lastTime;
    const fps = 1000 / deltaTime;
    
    frameCount++;
    if (frameCount % 30 === 0) {
      console.log(`Animation FPS: ${fps.toFixed(1)}`);
      if (fps < PERFORMANCE_BUDGETS.ANIMATION_FPS_MIN) {
        console.warn(`⚠️ FPS dropped to ${fps.toFixed(1)}`);
      }
    }
    
    lastTime = now;
    requestAnimationFrame(frame);
  }
  
  requestAnimationFrame(frame);
}
```

---

## 51. Error Recovery & Graceful Degradation

### 51.1 Simulation Timeout Handling

```typescript
export async function runSimulationWithTimeout(
  input: SimulationInput,
  timeoutMs: number = 2000
): Promise<SimulationOutput> {
  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error('Simulation timeout')), timeoutMs)
  );
  
  try {
    return await Promise.race([
      Promise.resolve(runSimulation(input)),
      timeoutPromise,
    ]);
  } catch (error) {
    if (error instanceof Error && error.message === 'Simulation timeout') {
      // Show cached result if available
      const cachedResult = getCachedResult(input);
      if (cachedResult) {
        showWarning('Simulation slow; showing cached result');
        return cachedResult;
      }
      
      // Fallback: return default/simple result
      return getDefaultResult(input);
    }
    throw error;
  }
}
```

### 51.2 Invalid State Recovery

```typescript
export function validateAndSanitizeConfig(
  config: PavementConfiguration
): PavementConfiguration {
  // Check layer thicknesses
  config.layers.forEach(layer => {
    if (layer.thickness < 10) {
      console.warn(`Layer ${layer.name} too thin; setting to minimum`);
      layer.thickness = 10;
    }
  });
  
  // Ensure at least 4 layers
  if (config.layers.length < 4) {
    console.error(`Invalid config (< 4 layers); resetting to default`);
    return DEFAULT_PAVEMENT_CONFIG;
  }
  
  return config;
}
```

### 51.3 Mobile Memory Crash Recovery

```typescript
export function handleMemoryCrash() {
  // Reduce particle count
  PARTICLE_CONFIG.MAX_PARTICLES_MOBILE = 10;
  
  // Clear animation frame cache
  animationFrameCache.clear();
  
  // Switch to static view
  setShowAnimations(false);
  
  showError(
    'Device low on memory. Switching to static visualization. ' +
    'Close other apps for better performance.'
  );
}

// Monitor memory usage
if (navigator.deviceMemory && navigator.deviceMemory < 2) {
  handleMemoryCrash();
}
```

---

## 52. Monitoring & Observability

### 52.1 Error Logging (Optional Sentry Integration)

```typescript
// utils/errorReporting.ts

import * as Sentry from '@sentry/react';

export function initErrorReporting() {
  if (process.env.REACT_APP_SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.REACT_APP_SENTRY_DSN,
      environment: process.env.NODE_ENV,
      tracesSampleRate: 0.1, // 10% of events
    });
  }
}

export function reportError(error: Error, context?: Record<string, any>) {
  Sentry.captureException(error, {
    contexts: { custom: context },
  });
  
  console.error(error);
}
```

### 52.2 Performance Tracing

```typescript
// Create performance marks for slow operations
performance.mark('simulation-start');
const result = runSimulation(input);
performance.mark('simulation-end');
performance.measure('simulation', 'simulation-start', 'simulation-end');

const measure = performance.getEntriesByName('simulation')[0];
console.log(`Simulation took ${measure.duration}ms`);

if (measure.duration > 400) {
  console.warn('Slow simulation detected');
  // Could report to monitoring service
}
```

### 52.3 User Behavior Analytics (Privacy-Respecting)

```typescript
// Track which Learn topics are accessed (anonymized)
export function trackTopicAccess(topicId: string) {
  // Do NOT track personally identifiable info
  analytics.trackEvent('learn_topic_accessed', {
    topicId,
    timestamp: Date.now(),
    // NOT included: user email, IP address, etc.
  });
}

// Aggregate: "Topic X viewed 1,200 times this month"
// Use to identify popular topics and gaps in content
```

### 52.4 Health Check Dashboard

Create `/admin/health` endpoint:

```typescript
export async function getSystemHealth() {
  return {
    bundleSize: {
      current: await getBundleSize(), // KB
      target: 500,
      status: current <= target ? 'OK' : 'WARN',
    },
    
    simulationPerformance: {
      avgTime: getAverageSimulationTime(), // ms
      p95Time: get95thPercentileTime(), // ms
      target: 500,
      status: avgTime <= target ? 'OK' : 'WARN',
    },
    
    animationFPS: {
      current: getCurrentFPS(),
      target: 60,
      status: current >= 55 ? 'OK' : 'WARN',
    },
    
    accessibility: {
      axeScore: await runAxeAudit(),
      target: 100,
      status: score >= 95 ? 'OK' : 'WARN',
    },
    
    uptime: getUptimePercentage(), // 99.9%
  };
}
```

---

## 53. Migrating from Conceptual to Validated Model

### 53.1 Parallel Model Implementation

```typescript
// engine/models/conceptualModel.ts
export function runConceptualSimulation(input: SimulationInput): SimulationOutput {
  // Current: illustrative model
  return calculateSimplifiedStressDistribution(input);
}

// engine/models/validatedModel.ts (future)
export function runValidatedSimulation(input: SimulationInput): SimulationOutput {
  // Future: FEM-validated or empirically verified model
  return calculateFEMVerifiedStressDistribution(input);
}

// engine/simulationEngine.ts
let activeModel: 'conceptual' | 'validated' = 'conceptual';

export function runSimulation(input: SimulationInput): SimulationOutput {
  const result = activeModel === 'conceptual'
    ? runConceptualSimulation(input)
    : runValidatedSimulation(input);
  
  return {
    ...result,
    modelUsed: activeModel,
    modelVersion: MODEL_VERSIONS[activeModel],
  };
}

// Allow switching for testing/research
export function setActiveModel(model: 'conceptual' | 'validated') {
  activeModel = model;
}
```

### 53.2 Model Comparison & Validation

```typescript
export async function validateModels(testCases: SimulationInput[]) {
  const results: ModelComparison[] = [];
  
  for (const input of testCases) {
    const conceptualOutput = runConceptualSimulation(input);
    const validatedOutput = runValidatedSimulation(input);
    
    const divergence = calculateDivergence(conceptualOutput, validatedOutput);
    
    results.push({
      testCaseId: input.id,
      divergencePercent: divergence,
      significant: divergence > 20, // Flag if >20% difference
    });
  }
  
  return results;
}

// Output: "Model outputs diverge by ±8% on average; max divergence 25% for weak subgrades"
```

### 53.3 Communication & UI Update

When validated model is adopted:

```typescript
// components/ModelBadge.tsx
export function ModelBadge() {
  const modelInfo = {
    conceptual: {
      label: 'Conceptual Model (v1.0)',
      description: 'Illustrative load propagation',
      color: '#eab308', // Yellow (caution)
    },
    validated: {
      label: 'Validated Model (v2.0)',
      description: 'FEM-verified; higher accuracy',
      color: '#22c55e', // Green (improved)
    },
  };
  
  return (
    <div className="model-info">
      <p>Using: {modelInfo[activeModel].label}</p>
      <p className="description">{modelInfo[activeModel].description}</p>
      
      {activeModel === 'validated' && (
        <div className="improvement-badge">
          ✓ Updated to validated model (2026-11-01)
          <a href="/learn/model-update">Learn more</a>
        </div>
      )}
    </div>
  );
}
```

---

## 54. Crisis Response Plan

### 54.1 Misuse Detection

Monitor for:
- GitHub issues: "Used GeoPave for my design; pavement failed"
- Social media: User sharing GeoPave outputs as professional design
- Contact form: Engineer reporting misuse

### 54.2 Response Protocol

**IMMEDIATE (1 hour):**
1. Acknowledge issue (professional, non-defensive tone)
2. Redirect to Terms of Use
3. Escalate to project lead + legal advisor
4. Do NOT admit liability

**SHORT-TERM (24 hours):**
5. Document incident (date, user, scenario, outcome)
6. Assess if disclaimer was insufficient
7. If safety critical: consider stronger warnings

**LONG-TERM (1 week):**
8. Post-mortem: How did user bypass warnings?
9. Strengthen onboarding/disclaimers if needed
10. Add required quiz: "What is this tool NOT for?"

### 54.3 Required Confirmation Checkbox

```typescript
// Before simulator loads for first time
export function SafetyConfirmation({ onConfirm }) {
  const [checkedItems, setCheckedItems] = useState({
    notForDesign: false,
    educational: false,
    consultEngineer: false,
  });
  
  const allChecked = Object.values(checkedItems).every(Boolean);
  
  return (
    <dialog open>
      <h2>Confirm Before Using GeoPave India</h2>
      
      <label>
        <input
          type="checkbox"
          checked={checkedItems.notForDesign}
          onChange={(e) => setCheckedItems({
            ...checkedItems,
            notForDesign: e.target.checked,
          })}
        />
        <span>
          I understand this tool is for EDUCATION ONLY and 
          NOT suitable for actual pavement design.
        </span>
      </label>
      
      <label>
        <input
          type="checkbox"
          checked={checkedItems.educational}
          onChange={(e) => setCheckedItems({
            ...checkedItems,
            educational: e.target.checked,
          })}
        />
        <span>
          I will NOT use simulation outputs for professional design documents
          without consulting a licensed engineer.
        </span>
      </label>
      
      <label>
        <input
          type="checkbox"
          checked={checkedItems.consultEngineer}
          onChange={(e) => setCheckedItems({
            ...checkedItems,
            consultEngineer: e.target.checked,
          })}
        />
        <span>
          For actual pavement design, I will consult IRC:37, IRC:SP:59, 
          and engage a professional engineer.
        </span>
      </label>
      
      <button 
        onClick={onConfirm} 
        disabled={!allChecked}
      >
        I Agree; Let Me Use the Simulator
      </button>
    </dialog>
  );
}
```

---

## Quick Reference: The 54-Section Summary

| Section | Purpose |
|---------|---------|
| 33 | User Personas | Define target audiences and their needs |
| 34 | Scenario Library | Pre-built learning scenarios |
| 35 | Disclaimers | Legal guardrails and liability protection |
| 36 | Data Export | Safe export formats and naming |
| 37 | Localization | Support for multiple languages/regions |
| 38 | Mobile Interaction | Touch gestures, accelerometer, responsive |
| 39 | Dark Mode | System preference + color overrides |
| 40 | Onboarding | First-time user tutorial (2–3 min) |
| 41 | Glossary | Searchable engineering terms database |
| 42 | Particle System | Animation rules and physics |
| 43 | Comparison Mode | Side-by-side conventional vs. geosynthetic |
| 44 | Plugins | Extensibility for future enhancements |
| 45 | Confidence Levels | Transparent uncertainty in metrics |
| 46 | Feedback Loop | Community input drives improvements |
| 47 | Accessibility Audits | Quarterly WCAG AA reviews |
| 48 | Version Control | Reproducibility + simulation model tracking |
| 49 | Classroom Mode | Educator dashboard + grading |
| 50 | Performance Budgets | Execution time, memory, bundle size targets |
| 51 | Error Recovery | Graceful degradation on failure |
| 52 | Monitoring | Health checks, analytics, observability |
| 53 | Model Migration | Path from conceptual to validated simulation |
| 54 | Crisis Response | Protocol if tool is misused for design |

---

**Document Version:** 2.0  
**Last Updated:** 2026-10-06  
**Status:** Comprehensive Production-Ready Guide

---

## The 22 Enhancements Summary

This expanded CLAUDE.md now includes:

1. ✅ **User Personas & Learning Paths** (Section 33)
2. ✅ **Scenario Library & Use Cases** (Section 34)
3. ✅ **Disclaimer & Legal Guardrails** (Section 35)
4. ✅ **Data Export & Reporting** (Section 36)
5. ✅ **Multilingual & Localization Roadmap** (Section 37)
6. ✅ **Mobile/Tablet Interaction Patterns** (Section 38)
7. ✅ **Dark Mode Strategy** (Section 39)
8. ✅ **Onboarding & Tutorial Flow** (Section 40)
9. ✅ **Glossary & Terminology** (Section 41)
10. ✅ **Animation & Particle System Rules** (Section 42)
11. ✅ **Comparison Mode Deep Dive** (Section 43)
12. ✅ **Extensibility Hooks** (Section 44)
13. ✅ **Confidence Levels** (Section 45)
14. ✅ **Feedback Loop & Iteration** (Section 46)
15. ✅ **Accessibility Audit Schedule** (Section 47)
16. ✅ **Version Control & Simulation Model Versioning** (Section 48)
17. ✅ **Instructor/Classroom Mode** (Section 49)
18. ✅ **Performance Budgets (Detailed)** (Section 50)
19. ✅ **Error Recovery & Graceful Degradation** (Section 51)
20. ✅ **Monitoring & Observability** (Section 52)
21. ✅ **Migrating from Conceptual to Validated Model** (Section 53)
22. ✅ **Crisis Response Plan** (Section 54)

GeoPave India is now production-ready with comprehensive guidance for quality, user experience, legal protection, and educational effectiveness.

Good luck building! 🚀

