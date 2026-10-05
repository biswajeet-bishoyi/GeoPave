# GeoPave India — Complete Project Files Guide

**Date:** 2026-09-30  
**Status:** Reference document for project initialization

---

## Overview

This guide lists all files needed to set up the GeoPave India project professionally. Files are organized by category with creation priority and dependencies.

---

## TIER 1: Critical Initialization Files
*(Create first; project cannot start without these)*

### 1. `package.json`
**Purpose:** Node.js project configuration, dependencies, scripts  
**Priority:** CRITICAL  
**Size:** ~1 KB  
**Create:** Before any other setup

```json
{
  "name": "geopave-india",
  "version": "0.1.0",
  "description": "Interactive educational simulator for geosynthetic-reinforced flexible pavements in Indian road systems",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext .ts,.tsx",
    "lint:fix": "eslint src --ext .ts,.tsx --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,css,md}\"",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "analyze": "vite-plugin-visualizer"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "framer-motion": "^10.16.4",
    "zustand": "^4.4.0",
    "tailwindcss": "^3.3.0",
    "clsx": "^2.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.48.0",
    "eslint-config-prettier": "^9.0.0",
    "prettier": "^3.0.0",
    "typescript": "^5.2.0",
    "vite": "^4.4.0",
    "vitest": "^0.34.0",
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.1.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  },
  "license": "MIT",
  "author": "Your Name",
  "repository": {
    "type": "git",
    "url": "https://github.com/username/GeoPave-India.git"
  }
}
```

**Rationale:** Pinned exact versions for reproducibility; minimal but sufficient dependencies.

---

### 2. `tsconfig.json`
**Purpose:** TypeScript compiler configuration (strict mode)  
**Priority:** CRITICAL  
**Size:** ~1 KB  

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,

    /* Strictness */
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,

    /* Paths */
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@engine/*": ["src/engine/*"],
      "@data/*": ["src/data/*"],
      "@types/*": ["src/types/*"],
      "@hooks/*": ["src/hooks/*"],
      "@utils/*": ["src/utils/*"]
    },

    "resolveJsonModule": true,
    "isolatedModules": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "forceConsistentCasingInFileNames": true,
    "jsx": "react-jsx"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "tests"]
}
```

**Rationale:** Strict mode enforces type safety; path aliases improve readability.

---

### 3. `vite.config.ts`
**Purpose:** Vite bundler configuration  
**Priority:** CRITICAL  
**Size:** ~1.5 KB  

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@engine': path.resolve(__dirname, './src/engine'),
      '@data': path.resolve(__dirname, './src/data'),
      '@types': path.resolve(__dirname, './src/types'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
  build: {
    target: 'ES2020',
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'animation': ['framer-motion'],
          'ui': ['zustand', 'clsx'],
        },
      },
    },
  },
  server: {
    port: 5173,
    strictPort: false,
    open: true,
  },
});
```

**Rationale:** Code splitting for optimized bundle; path aliases match tsconfig.

---

### 4. `.eslintrc.json`
**Purpose:** Code linting rules  
**Priority:** HIGH  
**Size:** ~1 KB  

```json
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint",
    "react"
  ],
  "rules": {
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/explicit-function-return-types": ["warn", { "allowExpressions": true }],
    "@typescript-eslint/no-explicit-any": "error",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
```

**Rationale:** Catches common errors; enforces TypeScript strict typing; compatible with Prettier.

---

### 5. `prettier.config.js`
**Purpose:** Code formatting consistency  
**Priority:** HIGH  
**Size:** ~0.5 KB  

```javascript
module.exports = {
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  arrowParens: 'always',
  endOfLine: 'lf',
};
```

**Rationale:** Standard formatting; printWidth 100 chars (engineering readability).

---

### 6. `tailwind.config.ts`
**Purpose:** Tailwind CSS customization  
**Priority:** HIGH  
**Size:** ~2 KB  

```typescript
import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Engineering color palette
        'slate-dark': '#1f2937',
        'slate-light': '#f3f4f6',
        'engineering-blue': '#0369a1',
        'engineering-green': '#15803d',
        'stress-red': '#dc2626',
        'stress-yellow': '#eab308',
        'stress-green': '#22c55e',
        // Pavement layer colors
        'bc-color': '#1a1a1a',
        'dbm-color': '#3a3a3a',
        'wmm-color': '#c4b5a0',
        'gsb-color': '#d4c5b0',
        'subgrade-color': '#8b7355',
        'geogrid-color': '#e5e7eb',
        'geotextile-color': '#f3e8d8',
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'Segoe UI', 'sans-serif'],
        mono: ['Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'lg': '18px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '32px',
      },
    },
  },
  plugins: [],
} satisfies Config;
```

**Rationale:** Custom colors match engineering aesthetic; layer-specific colors predefined.

---

### 7. `postcss.config.js`
**Purpose:** PostCSS configuration (Tailwind integration)  
**Priority:** HIGH  
**Size:** ~0.3 KB  

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

---

### 8. `.gitignore`
**Purpose:** Exclude files from version control  
**Priority:** CRITICAL  
**Size:** ~0.5 KB  

```
# Dependencies
node_modules/
/.pnp
.pnp.js

# Testing
/coverage
.nyc_output

# Build
/dist
/build
*.tsbuildinfo

# Environment
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~
.DS_Store

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# OS
Thumbs.db
.DS_Store
```

---

## TIER 2: Documentation Files
*(Create before development begins)*

### 9. `README.md`
**Purpose:** Project overview, setup, usage instructions  
**Priority:** HIGH  
**Size:** ~3–4 KB  

```markdown
# GeoPave India — Geosynthetic Reinforced Flexible Pavement Simulator

An interactive educational visualization tool for understanding flexible pavement construction and geosynthetic reinforcement in Indian road systems.

## 🎯 Project Overview

GeoPave India is designed to teach civil engineering students, educators, and practitioners:

- How wheel loads propagate through pavement layers
- How geogrid reinforcement improves aggregate confinement
- How geotextile provides layer separation
- When and why geosynthetics are appropriate interventions
- Real-world pavement design considerations based on IRC:37 and IRC:SP:59

**Important:** This is an educational visualization tool, NOT a structural pavement design calculator.

## ⚡ Quick Start

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

```bash
git clone https://github.com/username/GeoPave-India.git
cd GeoPave-India
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## 📦 Available Scripts

- `npm run dev` — Start development server with HMR
- `npm run build` — Build for production
- `npm run preview` — Preview production build locally
- `npm run lint` — Run ESLint
- `npm run lint:fix` — Fix linting errors
- `npm run format` — Format code with Prettier
- `npm run type-check` — Check TypeScript types
- `npm run test` — Run unit tests (watch mode)
- `npm run test:ui` — Run tests with UI
- `npm run test:coverage` — Generate coverage report
- `npm run analyze` — Analyze bundle size

## 🏗️ Project Structure

```
src/
├── components/        # React UI components
├── engine/           # Simulation logic (pure functions)
├── data/             # Static data (layers, references, scenarios)
├── types/            # TypeScript interfaces
├── hooks/            # Custom React hooks
├── utils/            # Utility functions
├── App.tsx           # Root component
├── index.tsx         # Entry point
└── styles.css        # Global styles (Tailwind)
```

**See:** [ARCHITECTURE.md](./docs/ARCHITECTURE.md) for detailed component structure.

## 🔬 Engineering Accuracy

### What This Tool Is
- An educational visualization
- A conceptual load propagation animator
- A geosynthetic effect demonstrator

### What This Tool Is NOT
- A pavement design calculator
- A finite element analysis (FEM) tool
- A traffic analysis tool
- Compliant with IRC:37 design procedures

### All Simulation Outputs Are Labeled

Every metric and indicator is explicitly tagged:
- **"Conceptual"** — Educational visualization
- **"Illustrative"** — Relative indicator (not absolute)
- **"User-defined"** — Input from user selection

**For actual pavement design, refer to IRC:37 and engage a licensed engineer.**

## 📚 References

- **IRC:37-2018** — Guidelines for the Design of Flexible Pavements
- **IRC:SP:59-2018** — Guidelines for Use of Geosynthetics in Road Pavements
- **MoRTH Specifications** — Material grades and layer definitions
- **BIS Standards** — Material properties

## 🎓 Learning Resources

GeoPave India includes:
- Interactive pavement layer explorer
- Load propagation visualization
- Geosynthetic effect comparison
- Engineering explanations
- Knowledge check quiz

## ♿ Accessibility

This project aims for **WCAG 2.1 Level AA** compliance:
- Keyboard navigation (Tab, Enter, Arrow keys)
- Screen reader support (semantic HTML, ARIA labels)
- Color contrast >= 4.5:1
- Reduced motion support (`prefers-reduced-motion`)

## 🚀 Deployment

Deployed on Vercel. See [DEPLOYMENT.md](./docs/DEPLOYMENT.md).

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License. See [LICENSE](./LICENSE).

## 👨‍💼 Author

Your Name ([email@example.com](mailto:email@example.com))

---

**Version:** 0.1.0  
**Last Updated:** 2026-09-30  
**Status:** In active development (MVP phase)
```

**Rationale:** Clear onboarding, quick start, engineering accuracy disclaimer upfront.

---

### 10. `ARCHITECTURE.md`
**Purpose:** Technical architecture guide  
**Priority:** HIGH  
**Size:** ~4–5 KB  

```markdown
# GeoPave India — Architecture Guide

## Overview

GeoPave India follows a modular, layered architecture:

1. **Simulation Engine** — Pure functions, independent of UI
2. **React Components** — Presentational, props-driven
3. **State Management** — Context + hooks (MVP), Zustand (future)
4. **Data Layer** — Static definitions and references

## Core Principle: Separation of Concerns

**Simulation logic ≠ UI rendering ≠ Data storage**

### Why?
- Simulation can be tested independently
- UI can be replaced or extended without changing logic
- Design calculations can be added later without refactoring
- Multiple UIs (web, CLI, server) can share the same engine

## Folder Structure

```
src/
├── components/
│   ├── pavement/          # Pavement cross-section, layers, geosynthetics
│   ├── truck/             # Truck/wheel visualization
│   ├── animation/         # Load animation, stress bulbs, particles
│   ├── controls/          # Control panel, selectors
│   ├── comparison/        # Side-by-side comparison view
│   ├── explorer/          # Layer explorer / click-to-learn
│   ├── learn/             # Learn mode, quiz
│   └── layout/            # Header, footer, navigation
├── engine/
│   ├── simulationEngine.ts
│   ├── loadPropagation.ts
│   ├── pavementModel.ts
│   ├── geosyntheticModel.ts
│   ├── deformationModel.ts
│   └── constants.ts
├── data/
│   ├── pavementLayers.ts
│   ├── engineeringReferences.ts
│   ├── scenarios.ts
│   └── quizData.ts
├── types/
│   ├── pavement.ts
│   ├── simulation.ts
│   ├── geosynthetic.ts
│   └── ui.ts
├── hooks/
│   ├── useSimulation.ts
│   ├── useAnimation.ts
│   └── useLayerExplorer.ts
├── utils/
│   ├── animationHelpers.ts
│   ├── stressCalculations.ts
│   ├── visualizationHelpers.ts
│   └── formatting.ts
├── App.tsx
├── index.tsx
└── styles.css
```

## Data Flow

```
User Input (Control Panel)
    ↓
SimulationContext / State Management
    ↓
useSimulation Hook
    ↓
simulationEngine.ts (pure, deterministic)
    ↓
SimulationOutput
    ↓
React Components (render)
    ↓
Animation & Visualization
```

## Component Design

### Stateless Components
Most components are presentational:

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
// hooks/useSimulation.ts
export function useSimulation(input: SimulationInput) {
  const [output, setOutput] = useState<SimulationOutput | null>(null);
  
  useEffect(() => {
    const result = runSimulation(input);
    setOutput(result);
  }, [input]);
  
  return output;
}
```

## Simulation Engine

### Core Principle: Deterministic

Same input → same output (no randomness unless explicitly needed).

### Structure

```typescript
// engine/simulationEngine.ts

export interface SimulationInput {
  pavementConfig: PavementConfiguration;
  trafficConfig: TrafficConfiguration;
  subgradeConfig: SubgradeConfiguration;
}

export interface SimulationOutput {
  loadDistribution: LoadDistribution;
  aggregateResponse: AggregateResponse;
  layerInteraction: LayerInteraction;
  subgradeResponse: SubgradeResponse;
  animationSequence: AnimationFrame[];
  metrics: MetricsOutput;
}

export function runSimulation(input: SimulationInput): SimulationOutput {
  // 1. Validate input
  // 2. Calculate load propagation
  // 3. Apply geosynthetic effects
  // 4. Calculate subgrade response
  // 5. Generate animation frames
  // 6. Compile metrics
  // 7. Return output
}
```

## Testing Strategy

### Unit Tests (simulationEngine.ts)
```typescript
// tests/engine/simulationEngine.test.ts
describe('simulationEngine', () => {
  it('should reduce stress with depth', () => {
    // Test load propagation logic
  });
});
```

### Component Tests (React components)
```typescript
// tests/components/PavementCrossSection.test.tsx
describe('PavementCrossSection', () => {
  it('should render all layers', () => {
    // Test rendering
  });
});
```

### e2e Tests (user journeys)
```typescript
// tests/e2e/simulator.spec.ts
describe('Simulator workflow', () => {
  it('should run full simulation', () => {
    // Test user journey
  });
});
```

## Performance Considerations

- **Bundle size:** < 500 KB (gzipped)
- **Simulation:** < 500 ms
- **Animation:** 60 FPS
- **Code splitting:** React vendor, animation, UI
- **Memoization:** Use `memo`, `useMemo` for expensive components

## Future Extensibility

The architecture is designed to support:

1. **Validated Design Calculations** — Replace conceptual model
2. **Advanced Material Properties** — Elastic modulus, Poisson's ratio
3. **Multiple UI Implementations** — CLI, server API
4. **Plugin System** — Custom geosynthetic models

Reserved interfaces in `simulationEngine.ts`:

```typescript
interface DesignCalculator {
  calculateMinimumLayerThickness(...): LayerThickness[];
  calculateRuttingDepth(...): number;
  calculateFatigueDamage(...): number;
}
```

---

See [CLAUDE.md](../CLAUDE.md) for detailed development guidelines.
```

---

### 11. `SIMULATION_MODEL.md`
**Purpose:** Explanation of simulation approach  
**Priority:** HIGH  
**Size:** ~3–4 KB  

Covers:
- Conceptual load propagation model
- Geogrid reinforcement effect
- Geotextile separation effect
- Subgrade response model
- Assumptions and limitations
- Clear labeling as "Conceptual" (not FEM)

---

### 12. `CONTRIBUTING.md`
**Purpose:** Contribution guidelines  
**Priority:** MEDIUM  
**Size:** ~2 KB  

Covers:
- How to report bugs
- How to propose features
- Coding standards
- Testing requirements
- PR process
- Engineering accuracy checklist

---

### 13. `LICENSE`
**Purpose:** Open source license  
**Priority:** HIGH  
**Size:** ~1 KB  

Recommended: MIT License (permissive, clear).

---

### 14. `docs/DEPLOYMENT.md`
**Purpose:** Deployment instructions  
**Priority:** MEDIUM  
**Size:** ~1.5 KB  

Covers:
- Deployment targets (dev, staging, production)
- Vercel configuration
- Environment variables
- Pre-deployment checklist
- Monitoring

---

### 15. `docs/ENGINEERING_REFERENCES.md`
**Purpose:** Detailed standard references  
**Priority:** MEDIUM  
**Size:** ~2–3 KB  

Lists:
- IRC:37-2018 sections used
- IRC:SP:59-2018 sections used
- MoRTH specifications referenced
- BIS standards referenced
- Version notes ("Verify against latest revision")

---

## TIER 3: Configuration & Build Files
*(Generated or template-based)*

### 16. `vitest.config.ts`
**Purpose:** Unit testing configuration  
**Size:** ~0.5 KB  

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'tests/'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

---

### 17. `playwright.config.ts` (optional for e2e)
**Purpose:** End-to-end testing configuration  
**Size:** ~0.8 KB  

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
```

---

### 18. `.github/workflows/ci.yml`
**Purpose:** GitHub Actions CI pipeline  
**Priority:** MEDIUM  
**Size:** ~1.5 KB  

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  lint-and-test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x, 20.x]

    steps:
      - uses: actions/checkout@v3

      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm install

      - name: Lint
        run: npm run lint

      - name: Type check
        run: npm run type-check

      - name: Test
        run: npm run test

      - name: Build
        run: npm run build

      - name: Analyze bundle
        run: npm run analyze
```

---

### 19. `.github/PULL_REQUEST_TEMPLATE.md`
**Purpose:** PR template for consistency  
**Size:** ~0.5 KB  

```markdown
## Description
Briefly describe the changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation
- [ ] Refactoring
- [ ] Performance improvement

## Related Issues
Closes #(issue number)

## Testing Done
Describe what you tested and how.

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated (if applicable)
- [ ] Linting passes (`npm run lint`)
- [ ] Tests pass (`npm run test`)
- [ ] Bundle size acceptable (< 500 KB)
- [ ] Accessibility verified (keyboard, color contrast)
- [ ] Engineering accuracy verified (references, labels)
```

---

### 20. `.github/ISSUE_TEMPLATE/bug_report.md`
**Purpose:** Bug report template  
**Size:** ~0.5 KB  

```markdown
## Description
Describe the bug.

## Reproduce
Steps to reproduce:
1.
2.
3.

## Expected Behavior
What should happen?

## Actual Behavior
What actually happens?

## Environment
- Browser:
- OS:
- Node version:

## Screenshots
(if applicable)

## Additional Context
Any other context?
```

---

### 21. `.github/ISSUE_TEMPLATE/feature_request.md`
**Purpose:** Feature request template  
**Size:** ~0.5 KB  

```markdown
## Description
Describe the feature.

## Use Case
Why is this feature needed?

## Proposed Solution
How should it work?

## Alternatives
Any alternative approaches?

## Additional Context
Any other context?
```

---

## TIER 4: Development Helpers
*(Optional but recommended)*

### 22. `.editorconfig`
**Purpose:** Consistent editor settings across IDEs  
**Size:** ~0.3 KB  

```ini
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false
```

---

### 23. `.vscode/settings.json` (optional)
**Purpose:** VS Code workspace settings  
**Size:** ~0.5 KB  

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "files.exclude": {
    "**/*.js": {
      "when": "$(basename).ts"
    }
  }
}
```

---

### 24. `.env.example`
**Purpose:** Template for environment variables  
**Size:** ~0.3 KB  

```
# Copy to .env and fill in values
VITE_APP_NAME=GeoPave India
VITE_APP_VERSION=0.1.0
VITE_API_URL=http://localhost:3000
VITE_ANALYTICS_ENABLED=false
```

---

### 25. `vitest.setup.ts` (optional)
**Purpose:** Test setup file  
**Size:** ~0.5 KB  

```typescript
import '@testing-library/jest-dom';

// Mock window.matchMedia for reduced-motion tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
```

---

## TIER 5: Data & Type Scaffolds
*(Create to start implementation)*

### 26. `src/types/pavement.ts`
**Purpose:** TypeScript interfaces for pavement data  
**Priority:** HIGH  
**Size:** ~1.5 KB  

Defines:
- `PavementConfiguration`
- `LayerDefinition`
- `Layer` (BC, DBM, WMM, GSB, Subgrade)
- `PavementLayerType`

---

### 27. `src/types/simulation.ts`
**Purpose:** TypeScript interfaces for simulation  
**Priority:** HIGH  
**Size:** ~2 KB  

Defines:
- `SimulationInput`
- `SimulationOutput`
- `LoadDistribution`
- `AggregateResponse`
- `LayerInteraction`
- `SubgradeResponse`
- `MetricsOutput`

---

### 28. `src/types/geosynthetic.ts`
**Purpose:** TypeScript interfaces for geosynthetics  
**Priority:** HIGH  
**Size:** ~1 KB  

Defines:
- `GeogridConfiguration`
- `GeotextileConfiguration`
- `GeosynthConfig`

---

### 29. `src/data/pavementLayers.ts`
**Purpose:** Pavement layer definitions  
**Priority:** HIGH  
**Size:** ~2–3 KB  

Defines data for:
- BC, DBM, WMM, GSB, Subgrade
- Material, thickness, functions, references

---

### 30. `src/data/engineeringReferences.ts`
**Purpose:** IRC/MoRTH standards references  
**Priority:** MEDIUM  
**Size:** ~1.5 KB  

Lists:
- IRC:37-2018
- IRC:SP:59-2018
- MoRTH specifications
- BIS standards

---

### 31. `src/data/scenarios.ts`
**Purpose:** Pre-built scenario configurations  
**Priority:** MEDIUM  
**Size:** ~1 KB  

Defines scenarios like:
- "Standard Traffic, Good Subgrade"
- "Heavy Traffic, Weak Subgrade"
- "Wet/Poor Drainage Subgrade"

---

### 32. `src/data/quizData.ts`
**Purpose:** Quiz questions for Learn mode  
**Priority:** MEDIUM  
**Size:** ~2 KB  

Defines:
- Quiz questions
- Answer options
- Correct answers
- Explanations

---

## TIER 6: Stub Components
*(Create empty stubs before implementation)*

### 33–50: Component Stubs

Create empty stub files (just exports) for all components:
- `src/components/pavement/PavementCrossSection.tsx`
- `src/components/truck/Truck.tsx`
- `src/components/animation/LoadAnimation.tsx`
- ... (all listed in CLAUDE.md)

---

### 51–58: Engine Stubs

Create empty stub files for all engine modules:
- `src/engine/simulationEngine.ts`
- `src/engine/loadPropagation.ts`
- ... (all listed in CLAUDE.md)

---

### 59–65: Hook Stubs

Create empty custom hooks:
- `src/hooks/useSimulation.ts`
- `src/hooks/useAnimation.ts`
- ... (all listed in CLAUDE.md)

---

### 66–72: Utility Stubs

Create utility function stubs:
- `src/utils/animationHelpers.ts`
- `src/utils/stressCalculations.ts`
- ... (all listed in CLAUDE.md)

---

## TIER 7: Root Files

### 73. `src/App.tsx`
**Purpose:** Root React component  
**Priority:** HIGH  
**Size:** ~1–2 KB (stub initially)

```typescript
export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <h1 className="text-3xl font-bold">GeoPave India</h1>
      </header>
      <main>
        {/* Simulator components here */}
      </main>
    </div>
  );
}
```

---

### 74. `src/index.tsx`
**Purpose:** React entry point  
**Priority:** HIGH  
**Size:** ~0.5 KB  

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

### 75. `src/styles.css`
**Purpose:** Global styles & Tailwind imports  
**Priority:** HIGH  
**Size:** ~1 KB  

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    @apply scroll-smooth;
  }

  body {
    @apply bg-white text-slate-900;
  }
}

@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-engineering-blue text-white rounded font-medium hover:opacity-90;
  }

  .btn-secondary {
    @apply px-4 py-2 border border-slate-300 text-slate-700 rounded font-medium hover:bg-slate-50;
  }

  .pavement-layer {
    @apply border border-slate-300 rounded;
  }
}

/* Engineering-specific utilities */
.stress-high {
  @apply bg-stress-red;
}

.stress-medium {
  @apply bg-stress-yellow;
}

.stress-low {
  @apply bg-stress-green;
}
```

---

### 76. `public/index.html`
**Purpose:** HTML entry point  
**Priority:** HIGH  
**Size:** ~0.8 KB  

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Interactive simulator for geosynthetic-reinforced flexible pavements." />
    <meta name="theme-color" content="#1f2937" />
    <title>GeoPave India — Flexible Pavement Simulator</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/index.tsx"></script>
  </body>
</html>
```

---

## TIER 8: Testing Scaffolds

### 77. `tests/setup.ts`
### 78. `tests/engine/simulationEngine.test.ts`
### 79. `tests/components/PavementCrossSection.test.tsx`
### 80. `tests/e2e/simulator.spec.ts`

(Create empty test files with placeholder tests)

---

## Creation Priority Order

### Phase 0 (Day 1) — Initialization
1. package.json
2. tsconfig.json
3. vite.config.ts
4. .gitignore
5. README.md
6. CLAUDE.md (already created)
7. PRD.md (already created)

### Phase 0 (Day 2) — Configuration
8. .eslintrc.json
9. prettier.config.js
10. tailwind.config.ts
11. postcss.config.js
12. vitest.config.ts
13. .editorconfig
14. .env.example

### Phase 0 (Day 2–3) — GitHub Setup
15. .github/workflows/ci.yml
16. .github/PULL_REQUEST_TEMPLATE.md
17. .github/ISSUE_TEMPLATE/bug_report.md
18. .github/ISSUE_TEMPLATE/feature_request.md

### Phase 0 (Day 3) — Documentation
19. ARCHITECTURE.md
20. SIMULATION_MODEL.md
21. CONTRIBUTING.md
22. LICENSE
23. docs/DEPLOYMENT.md
24. docs/ENGINEERING_REFERENCES.md

### Phase 1 (Day 3–4) — Scaffolds
25–32. TypeScript type files
33–50. Component stubs
51–58. Engine stubs
59–65. Hook stubs
66–72. Utility stubs
73–76. Root files (App.tsx, index.tsx, styles.css, index.html)
77–80. Test scaffolds

---

## Total Files Summary

| Category | Count | Priority |
|----------|-------|----------|
| Core Config | 8 | CRITICAL |
| Documentation | 8 | HIGH |
| GitHub Automation | 4 | MEDIUM |
| Build/Test Config | 4 | HIGH |
| Development Helpers | 4 | OPTIONAL |
| Type Scaffolds | 3 | HIGH |
| Data Scaffolds | 4 | HIGH |
| Component Stubs | 18+ | HIGH |
| Engine Stubs | 8+ | HIGH |
| Utility Stubs | 7+ | HIGH |
| Hook Stubs | 3+ | HIGH |
| Root Files | 4 | HIGH |
| Test Stubs | 4 | HIGH |
| **TOTAL** | **~95** | |

---

## Recommended First Steps

### For Solo Developer or Small Team

1. Create **Tier 1** files (initialization)
2. Create **Tier 2** files (documentation)
3. Create **Tier 7** files (root files)
4. Initialize git repository
5. Create **Tier 3–6** files (configuration & scaffolds)
6. Start Phase 1 implementation

### For Team Development

1. Create all **Tier 1** files
2. Create **Tier 2** documentation (shared understanding)
3. Set up CI/CD (**Tier 3**)
4. Create **Tier 4–7** scaffolds
5. Divide work by component/engine module
6. Follow CONTRIBUTING.md guidelines

---

**Total estimated time to set up all files:** 2–4 hours  
**Total estimated time to establish working dev environment:** 30 minutes

---

**Document Version:** 1.0  
**Status:** Ready for implementation
