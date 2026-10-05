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

Deployed on Vercel. See [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md).

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License. See [LICENSE](./LICENSE).

## 👨‍💼 Author

Biswajeet Bishoyi

---

**Version:** 0.1.0  
**Last Updated:** 2026-09-30  
**Status:** In active development (MVP phase)
