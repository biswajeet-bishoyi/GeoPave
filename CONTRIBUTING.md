# Contributing to GeoPave India

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Focus on the code, not the person
- Help others learn and grow

## Getting Started

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Run tests: `npm run test`
5. Commit: `git commit -m "feat: your feature"`
6. Push: `git push origin feature/your-feature-name`
7. Create a Pull Request

## Development Setup

```bash
npm install
npm run dev
```

## Code Standards

### TypeScript
- Strict mode (no `any`)
- Explicit return types
- Document complex functions with JSDoc

### React
- Functional components + hooks
- Stateless when possible
- Props documented

### Engineering Accuracy
- Verify all references (IRC:37, IRC:SP:59, MoRTH, BIS)
- No fabricated design values
- Label outputs clearly (Conceptual, Illustrative, etc.)
- Be conservative with geosynthetic benefit claims

## Testing

Write tests for:
- Simulation engine functions
- Component rendering
- User interactions
- Edge cases

```bash
npm run test        # Run tests
npm run test:ui     # Run with UI
npm run test:coverage # Coverage report
```

## Linting & Formatting

```bash
npm run lint        # Check linting
npm run lint:fix    # Fix linting errors
npm run format      # Format code
```

## Commit Messages

Format: `[type]: description`

Types:
- `feat:` — New feature
- `fix:` — Bug fix
- `docs:` — Documentation
- `refactor:` — Code refactoring
- `test:` — Test additions
- `chore:` — Dependency or build updates

Example:
```
feat: Add geogrid confinement visualization

- Implement particle confinement within grid cells
- Add visual indicator for confined particles
- Update simulation to track confinement metrics

Fixes #123
```

## Pull Request Guidelines

- Keep PRs focused (one feature/fix per PR)
- Write descriptive PR title (< 70 chars)
- Include testing summary
- Link related issues
- Request review from maintainers

## Reporting Issues

**Bug reports should include:**
- Description of the bug
- Steps to reproduce
- Expected vs. actual behavior
- Environment (browser, OS, Node version)
- Screenshots (if applicable)

**Feature requests should include:**
- Clear description of the feature
- Use case / problem it solves
- Proposed solution
- Any alternatives considered

## Documentation

- Update README.md if adding features
- Document complex logic with comments
- Update ARCHITECTURE.md if changing structure
- Keep PRD.md and CLAUDE.md aligned with code

## Questions?

Open an issue with the `question` label or start a discussion.

---

Thank you for contributing to GeoPave India!
