# Architecture Guide — GeoPave India

## Overview

GeoPave India follows a modular, layered architecture designed for testability, extensibility, and separation of concerns.

```
┌─────────────────────────────────────────────────┐
│           React UI Layer                        │
│  (Components, State Management, Rendering)      │
└────────────────┬────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────┐
│           Simulation Engine                     │
│  (Pure Functions, Deterministic, Testable)     │
└────────────────┬────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────┐
│           Data Layer                            │
│  (Pavement Layers, References, Scenarios)      │
└─────────────────────────────────────────────────┘
```

## Core Principle: Separation of Concerns

**Simulation logic ≠ UI rendering ≠ Data storage**

### Why This Matters

- **Simulation can be tested independently** without React
- **UI can be replaced or extended** without changing logic
- **Design calculations can be added later** without refactoring
- **Multiple interfaces** (web, CLI, server) can share the same engine

## Folder Structure

```
src/
├── components/                   # React UI components
│   ├── pavement/                # Pavement cross-section, layers
│   │   ├── PavementCrossSection.tsx
│   │   ├── Layer.tsx
│   │   ├── GeogridVisualization.tsx
│   │   └── GeotextileVisualization.tsx
│   ├── truck/                   # Truck/wheel visualization
│   │   ├── Truck.tsx
│   │   └── WheelLoad.tsx
│   ├── animation/               # Load animation, stress
│   │   ├── LoadAnimation.tsx
│   │   ├── StressBulb.tsx
│   │   └── ParticleAnimator.tsx
│   ├── controls/                # Control panel, selectors
│   │   ├── ControlPanel.tsx
│   │   ├── TrafficSelector.tsx
│   │   ├── SubgradeSelector.tsx
│   │   └── AnimationControls.tsx
│   ├── comparison/              # Side-by-side comparison
│   │   ├── ComparisonView.tsx
│   │   └── MetricsPanel.tsx
│   ├── explorer/                # Layer explorer
│   │   ├── LayerExplorer.tsx
│   │   └── LayerInfo.tsx
│   ├── learn/                   # Learn mode, quiz
│   │   ├── LearnPanel.tsx
│   │   └── QuizSection.tsx
│   └── layout/                  # Header, footer, nav
│       ├── Header.tsx
│       ├── Navigation.tsx
│       └── Footer.tsx
├── engine/                       # Simulation logic (pure)
│   ├── simulationEngine.ts      # Main simulation function
│   ├── loadPropagation.ts       # Load transfer calculations
│   ├── pavementModel.ts         # Pavement behavior model
│   ├── geosyntheticModel.ts     # Geogrid/geotextile effects
│   ├── deformationModel.ts      # Subgrade response
│   └── constants.ts             # Constants and defaults
├── data/                        # Static data definitions
│   ├── pavementLayers.ts        # BC, DBM, WMM, GSB, Subgrade
│   ├── engineeringReferences.ts # IRC, MoRTH, BIS standards
│   ├── scenarios.ts             # Pre-set scenario configs
│   └── quizData.ts              # Quiz questions
├── types/                       # TypeScript interfaces
│   ├── pavement.ts              # Pavement data structures
│   ├── simulation.ts            # Simulation I/O types
│   ├── geosynthetic.ts          # Geogrid/geotextile types
│   └── ui.ts                    # UI state types
├── hooks/                       # Custom React hooks
│   ├── useSimulation.ts         # Simulation execution hook
│   ├── useAnimation.ts          # Animation control hook
│   └── useLayerExplorer.ts      # Layer explorer state hook
├── utils/                       # Utility functions
│   ├── animationHelpers.ts      # Animation utilities
│   ├── stressCalculations.ts    # Stress math helpers
│   ├── visualizationHelpers.ts  # SVG/Canvas helpers
│   └── formatting.ts            # Number formatting, labels
├── App.tsx                      # Root component
├── index.tsx                    # React entry point
└── styles.css                   # Global styles (Tailwind)

tests/
├── engine/
│   └── simulationEngine.test.ts
├── components/
│   └── PavementCrossSection.test.tsx
└── e2e/
    └── simulator.spec.ts

docs/
├── README.md                    # This file
├── DEPLOYMENT.md                # Deployment instructions
├── ENGINEERING_REFERENCES.md    # IRC/MoRTH references
└── SIMULATION_MODEL.md          # Simulation explanation
```

## Data Flow

```
User Input (Control Panel)
    ↓
Context / State (SimulationContext)
    ↓
useSimulation Hook
    ↓
simulationEngine.ts (pure function)
    │
    ├─→ validateInput()
    ├─→ loadPropagation()
    ├─→ applyGeogridEffect()
    ├─→ applyGeotextileEffect()
    ├─→ calculateSubgradeResponse()
    ├─→ generateAnimationSequence()
    └─→ compileMetrics()
    ↓
SimulationOutput
    ↓
React Components (render)
    ├─→ PavementCrossSection
    ├─→ StressBulb
    ├─→ ParticleAnimator
    ├─→ MetricsPanel
    └─→ LayerExplorer
    ↓
UI / Animation / Visualization
```

## Component Design Patterns

### Stateless Components (Preferred)

Most components are presentational and stateless:

```typescript
interface PavementCrossSectionProps {
  config: PavementConfiguration;
  animationFrame?: AnimationFrame;
  onLayerClick?: (layerName: string) => void;
}

export function PavementCrossSection({
  config,
  animationFrame,
  onLayerClick,
}: PavementCrossSectionProps) {
  // Render only, no internal state
  return <svg>{/* ... */}</svg>;
}
```

### State Management

**MVP:** React Context + hooks

```typescript
// App.tsx (or dedicated context file)
const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export function SimulationProvider({ children }: { children: ReactNode }) {
  const [input, setInput] = useState<SimulationInput>(defaultInput);
  const [output, setOutput] = useState<SimulationOutput | null>(null);
  
  return (
    <SimulationContext.Provider value={{ input, setInput, output, setOutput }}>
      {children}
    </SimulationContext.Provider>
  );
}

// In nested components
const { input, setInput, output } = useContext(SimulationContext);
```

## Simulation Engine

### Core Principle: Deterministic

Same input always produces same output (no randomness unless explicitly needed).

### Structure

```typescript
// engine/simulationEngine.ts

export function runSimulation(input: SimulationInput): SimulationOutput {
  // 1. Validate input
  const validation = validateInput(input);
  if (!validation.valid) {
    throw new Error(`Invalid input: ${validation.errors?.join(', ')}`);
  }

  // 2. Calculate load propagation
  const loadDist = calculateLoadDistribution(input);

  // 3. Apply geosynthetic effects
  const geogridEffect = applyGeogridEffect(loadDist, input.pavementConfig.geogrid);
  const geotextileEffect = applyGeotextileEffect(input.pavementConfig.geotextile);

  // 4. Calculate subgrade response
  const subgradeResp = calculateSubgradeResponse(geogridEffect.stress, input.subgradeConfig);

  // 5. Generate animation frames
  const animation = generateAnimationSequence(
    { loadDist, geogridEffect, geotextileEffect, subgradeResp },
    10 // duration in seconds
  );

  // 6. Compile metrics
  const metrics = compileMetrics({ loadDist, geogridEffect, subgradeResp });

  // 7. Return complete output
  return {
    loadDistribution: loadDist,
    aggregateResponse: geogridEffect,
    layerInteraction: geotextileEffect,
    subgradeResponse: subgradeResp,
    animationSequence: animation,
    metrics,
  };
}
```

## Testing Strategy

### Unit Tests (simulationEngine.ts)

Test pure functions without React:

```typescript
// tests/engine/simulationEngine.test.ts
describe('simulationEngine', () => {
  it('should reduce stress with depth', () => {
    const input = { /* ... */ };
    const output = runSimulation(input);
    
    expect(output.metrics.subgradeResponse.value)
      .toBeLessThan(output.metrics.loadDistributionIndex.value);
  });
});
```

### Component Tests (React components)

Test rendering and interaction:

```typescript
// tests/components/PavementCrossSection.test.tsx
describe('PavementCrossSection', () => {
  it('should render all layers', () => {
    const { getByText } = render(
      <PavementCrossSection config={defaultConfig} />
    );
    
    expect(getByText('BC')).toBeInTheDocument();
    expect(getByText('Subgrade')).toBeInTheDocument();
  });
});
```

### e2e Tests (user workflows)

Test complete user journeys:

```typescript
// tests/e2e/simulator.spec.ts
describe('Simulator workflow', () => {
  it('should run full simulation', async () => {
    await page.goto('http://localhost:5173');
    await page.click('button:has-text("Apply Load")');
    await page.waitForSelector('[data-test="metrics"]');
    // Assert metrics display
  });
});
```

## Performance Considerations

- **Bundle size target:** < 500 KB (gzipped)
- **Simulation run time:** < 500 ms
- **Animation FPS:** 60 FPS
- **Code splitting:** React vendor, animation library, UI utilities

## Future Extensibility

The architecture reserves space for:

1. **Validated Design Calculations** — Replace conceptual model with IRC:37 CBR method
2. **Advanced Material Properties** — Elastic modulus, Poisson's ratio inputs
3. **Multiple UI Implementations** — CLI, server API, mobile app
4. **Plugin System** — Custom geosynthetic models

```typescript
// engine/designCalculator.ts (placeholder for Phase 3+)

interface DesignCalculator {
  calculateMinimumLayerThickness(
    traffic: TrafficAnalysis,
    subgrade: SubgradeCharacterization
  ): LayerThickness[];
  
  calculateRuttingDepth(...): number;
  calculateFatigueDamage(...): number;
}

// Swappable implementation
export let designCalculator: DesignCalculator | null = null;

export function setDesignCalculator(calc: DesignCalculator) {
  designCalculator = calc;
}
```

## Coding Standards

### TypeScript
- Strict mode enabled (`strict: true`)
- No `any` types without justification
- Explicit return types on functions

### React
- Functional components with hooks (no class components)
- Props documented with JSDoc
- Memoization for expensive components

### File Naming
- Components: PascalCase (`PavementCrossSection.tsx`)
- Utilities: camelCase (`animationHelpers.ts`)
- Constants: UPPER_SNAKE_CASE (`DEFAULT_LAYER_THICKNESS`)

---

**See also:**
- [CLAUDE.md](../CLAUDE.md) — Development guidelines
- [SIMULATION_MODEL.md](./SIMULATION_MODEL.md) — Simulation explanation
