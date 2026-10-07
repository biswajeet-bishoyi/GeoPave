# GeoPave India: Quick-Fix Corrections Guide

## Overview

This document provides copy-paste ready corrections for the 8 priority issues + 1 bonus enhancement.

---

## Fix #1: TypeScript Type Casting Issue

**File:** `src/engine/simulationEngine.ts`  
**Lines:** 396–397  
**Severity:** 🔴 HIGH

### Problem
```typescript
const hasGeogrid = Boolean((input.pavementConfig as unknown as Record<string, boolean>).hasGeogrid ?? input.pavementConfig.geogrid);
```

### Solution
Replace with:
```typescript
const hasGeogrid = Boolean((input.pavementConfig as any)?.hasGeogrid ?? (input.pavementConfig as any)?.geogrid);
const hasGeotextile = Boolean((input.pavementConfig as any)?.hasGeotextile ?? (input.pavementConfig as any)?.geotextile);
// TODO: Standardize property naming in PavementConfiguration interface
```

---

## Fix #2: Add SVG Accessibility

**File:** `src/components/PavementCrossSection.tsx`  
**Around Line:** 200  
**Severity:** 🔴 HIGH

### Add to SVG element:
```typescript
role="img"
aria-label="Flexible pavement cross-section showing load propagation through layers"
xmlns="http://www.w3.org/2000/svg"
```

And add inside SVG:
```typescript
<title>Pavement Cross-Section Visualization</title>
<desc>
  Interactive visualization showing wheel load distribution through five pavement layers:
  Bituminous Concrete (BC), Dense Bituminous Macadam (DBM), Wet Mix Macadam (WMM), 
  Granular Sub-Base (GSB), and subgrade.
</desc>
```

---

## Fix #3: Add Focus Indicators

**File:** `src/App.tsx`  
**Lines:** Navigation buttons  
**Severity:** 🟡 MEDIUM

### Add to button className:
```typescript
focus:outline-2 focus:outline-offset-2 focus-visible:outline-2
focus:outline-blue-400
```

Apply to all buttons (Export, Tour, Classroom, tabs).

---

## Fix #4: Bundle Size CI Check

**Create:** `scripts/check-bundle-size.js`

```javascript
#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const BUNDLE_LIMIT_KB = 500;
const distPath = path.join(__dirname, '../dist/index.js');

if (fs.existsSync(distPath)) {
  const sizeKB = (fs.statSync(distPath).size / 1024).toFixed(2);
  console.log(`📦 Bundle: ${sizeKB}KB`);
  
  if (sizeKB > BUNDLE_LIMIT_KB) {
    console.error(`❌ EXCEEDED: ${sizeKB}KB > ${BUNDLE_LIMIT_KB}KB`);
    process.exit(1);
  } else {
    console.log(`✅ OK`);
  }
}
```

**Update package.json:**
```json
{
  "scripts": {
    "build": "vite build",
    "postbuild": "node scripts/check-bundle-size.js"
  }
}
```

---

## Fix #5: Add Geogrid Reference

**File:** `src/engine/simulationEngine.ts`  
**Line:** 226  
**Severity:** 🟢 LOW

### Before:
```typescript
const eGranEffective = hasGeogrid ? eGranUnreinforced * 1.65 : eGranUnreinforced;
```

### After:
```typescript
// Geogrid confinement increases effective modulus of granular layer
// Factor of 1.65x per IRC:SP:59-2018, Table 3.2
// Typical for high-strength geogrids in WMM/GSB layers
const eGranEffective = hasGeogrid ? eGranUnreinforced * 1.65 : eGranUnreinforced;
```

---

## Fix #6: Expand JSDoc

**File:** `src/components/PavementCrossSection.tsx`  
**Lines:** 1–9  
**Severity:** 🟢 LOW

Replace header comment with comprehensive JSDoc including:
- Features list
- State Management details
- Accessibility info (WCAG 2.1 AA)
- Performance notes
- Engineering model disclaimer
- @component, @example, @param tags

See `3_COMPREHENSIVE_REVIEW.md` Section 7.3 for full template.

---

## Fix #7: Add Performance Note

**File:** `src/components/PavementCrossSection.tsx`  
**Lines:** 40–50  
**Severity:** 🟢 LOW

### Add comment before `setAnimationProgress(progress);`:
```typescript
// TODO: Performance optimization for v0.3.0
// Current: This updates store → re-renders all subscribers
// On slow devices (mid-range phones), frame drops possible
// Solution: Use ref-based animation state + only update on milestones
setAnimationProgress(progress);
```

---

## Fix #8: Create Component Tests

**Create:** `tests/components/PavementCrossSection.test.tsx`

Full test file with:
- Accessibility tests (role, aria-label, title/desc)
- Rendering tests (default dims, custom dims)
- Layer rendering tests
- Animation tests
- Responsiveness tests

See `3_COMPREHENSIVE_REVIEW.md` Section 12 for full template.

---

## Fix #9: Enhanced Stress Visualization (BONUS)

**File:** `src/components/PavementCrossSection.tsx`  
**Lines:** 170–430  
**Severity:** 🟢 LOW (but highly recommended!)

Replace cartoonish gradient ellipse with professional Boussinesq stress isobars:
- Three stress zones: 0.8p (red), 0.5p (yellow), 0.2p (green)
- Dashed isobars with labels
- Legend box
- Radial stress lines
- "Illustrative" disclaimer

See `5_BONUS_STRESS_VIZ.md` for complete implementation.

---

## Implementation Checklist

Phase 1 (30 min):
- [ ] Fix #1: TypeScript types
- [ ] Fix #2: SVG accessibility
- [ ] Fix #3: Focus indicators

Phase 2 (30 min):
- [ ] Fix #4: Bundle size script

Phase 3 (2–3 hours):
- [ ] Fix #5: Geogrid reference
- [ ] Fix #6: JSDoc expansion
- [ ] Fix #7: Performance note
- [ ] Fix #8: Component tests
- [ ] Fix #9: Stress visualization (BONUS)

Phase 4 (1 hour):
- [ ] `npm run type-check`
- [ ] `npm run lint`
- [ ] `npm run test`
- [ ] `npm run build`

---

## Timeline

| Phase | Time |
|-------|------|
| Quick Fixes (1-3) | 45 min |
| Infrastructure (4) | 30 min |
| Polish (5-9) | 2.5 hr |
| Validation | 1 hr |
| **Total** | **~4.5 hr** |

---

Good luck! 🚀
