# ANTIGRAVITY.md — GeoPave India Quality Safeguards

**Version:** 1.0  
**Date:** 2026-10-06  
**Purpose:** Prevent feature drift, legal risk, and quality decay in GeoPave India  
**Audience:** Claude, developers, code reviewers

---

## Overview

This document lists explicit **things we must NOT do**, organized by risk category. It's the inverse of CLAUDE.md—not aspirational rules, but defensive guardrails against common failure modes.

**Why "Antigravity"?** Because without these rules, projects naturally drift toward:
- Feature bloat (weight pulls down)
- Legal liability (gravity of neglect)
- Performance degradation (slow accumulation)
- Accessibility debt (builds over time)

---

## 1. Quality Assurance: Performance Budgets

### 1.1 DON'T: Ship Without Performance Baselines

**❌ BAD:**
```bash
# No performance test in CI
npm run build
git push  # Deploy without checking bundle size
```

**✅ GOOD:**
```bash
# CI must fail if bundle exceeds budget
npm run build && npm run analyze
# Output: Bundle size: 485 KB (PASS: < 500 KB)
# If 510 KB → CI FAILS, blocks merge
```

**Anti-gravity rule:** 
- Every PR must include `npm run analyze` output in the description
- If bundle grows > 10 KB unexplained, require justification + approval
- Yearly review: update budget if legitimately needed (document why)

**Enforcement:**
- Add GitHub Actions check: `if bundle > 500KB then fail`
- Generate bundle report per commit (git history shows trend)
- Red flag: "Bundle grew 50 KB over last 6 months" → investigate

---

### 1.2 DON'T: Ignore Animation Performance Regressions

**❌ BAD:**
```typescript
// No FPS monitoring; "feels smooth to me"
export function ParticleAnimator() {
  // Renders 500 particles without optimization
  return particles.map(p => <Circle key={p.id} cx={p.x} cy={p.y} />);
}
```

**✅ GOOD:**
```typescript
// Explicit performance monitoring
export function ParticleAnimator() {
  const fpsRef = useRef(0);
  
  useEffect(() => {
    // Log FPS every 30 frames
    if (frameCount % 30 === 0) {
      const fps = frameCount / (Date.now() - startTime) * 1000;
      console.assert(fps >= 50, `FPS dropped to ${fps}; target 60`);
    }
  }, [frameCount]);
  
  // Memoize to prevent unnecessary re-renders
  return (
    <g>
      {particles.map(p => (
        <MemoizedCircle key={p.id} x={p.x} y={p.y} />
      ))}
    </g>
  );
}

const MemoizedCircle = memo(({ x, y }) => <circle cx={x} cy={y} r="2" />);
```

**Anti-gravity rule:**
- Animation perf test in CI: measure FPS on target device
- Flag if FPS drops below 55 (allow 5 FPS margin)
- Regression detected? Fix before merge
- Quarterly: test on 3-year-old device (simulate older hardware)

---

### 1.3 DON'T: Let Simulation Engine Performance Degrade

**❌ BAD:**
```typescript
// No timing; assume it's fast
export function runSimulation(input) {
  // Some day this takes 2 seconds; nobody notices
  return expensiveCalculation(input);
}
```

**✅ GOOD:**
```typescript
// Explicit performance contract
export function runSimulation(input: SimulationInput): SimulationOutput {
  const startTime = performance.now();
  
  const validation = validateInput(input);
  if (!validation.valid) throw new Error(`Invalid input`);
  
  const result = expensiveCalculation(input);
  
  const elapsed = performance.now() - startTime;
  console.assert(
    elapsed < 500,
    `Simulation took ${elapsed}ms; budget is 500ms`
  );
  
  return result;
}
```

**Anti-gravity rule:**
- Every simulation run logs execution time
- CI test: run 1000 random simulations, alert if avg > 400 ms
- User sees timing in dev tools: "Simulation: 145 ms"
- Quarterly: profile and optimize if trending slower

---

## 2. User-Centric Clarity: Onboarding & Personas

### 2.1 DON'T: Launch Without First-Time User Testing

**❌ BAD:**
```typescript
// No onboarding; assume users figure it out
export function App() {
  return <Simulator />;  // Good luck!
}
```

**✅ GOOD:**
```typescript
// First-time users see guided walkthrough
export function App() {
  const [isFirstVisit, setIsFirstVisit] = useState(() => 
    !localStorage.getItem('geopave_visited')
  );
  
  useEffect(() => {
    if (!isFirstVisit) return;
    setIsFirstVisit(false);
    localStorage.setItem('geopave_visited', 'true');
  }, []);
  
  return (
    <>
      {isFirstVisit && <OnboardingTutorial onComplete={() => {}} />}
      <Simulator />
    </>
  );
}

// Test: 5 civil eng students, 0 prior simulator use
// Success metric: 80% complete tutorial, understand "what is this"
```

**Anti-gravity rule:**
- Before any release: test with 3–5 target users (unfamiliar with tool)
- Document: "User A took 2 min to load sample scenario; User B confused about layer colors"
- Fix > Test again
- Never ship if users say "I don't know what this does"

---

### 2.2 DON'T: Hide Personas or Target Audience

**❌ BAD:**
```typescript
// No persona definition; build for "everyone"
// Result: confusing UI, conflicting features
```

**✅ GOOD:**
```typescript
// Explicit personas in docs/PERSONAS.md

/**
 * PERSONA 1: Civil Engineering Student (Age 19–22)
 * - Learning flexible pavement design for first time
 * - Needs: Simple, forgiving UI; clear explanations
 * - Pain: Math-heavy textbooks; wants visualization
 * - Success: "I finally get why geosynthetics work"
 * 
 * PERSONA 2: Young Engineer (Age 22–28)
 * - Designing first road project; may use IRC:37
 * - Needs: Quick scenario setup; professional look
 * - Pain: Simulator must NOT mislead about design safety
 * - Success: "Showed this to my team; they got it"
 * 
 * PERSONA 3: Educator (Age 35–60)
 * - Teaching 40 students; wants to save time
 * - Needs: Classroom mode; batch exports; assessment
 * - Pain: Manual setup for each student is tedious
 * - Success: "Reduced my prep time by 30%"
 */

// Feature gate: This button is for Persona 3 only
function TeacherBatchExport() {
  const role = useUserRole();
  if (role !== 'educator') return null;  // Hide from students
  return <ExportAllStudentWork />;
}
```

**Anti-gravity rule:**
- Document personas before any UI work
- Before shipping a feature: "Which persona(s) need this? Why?"
- If answer is "everyone," split into 2–3 focused features instead
- Quarterly: re-validate personas (do they still match users?)

---

### 2.3 DON'T: Design Onboarding Without Measuring It

**❌ BAD:**
```typescript
// "I think the tutorial is helpful"
// No data on how many users actually finish it
```

**✅ GOOD:**
```typescript
// Track onboarding completion
export function OnboardingTutorial({ onComplete }) {
  const steps = ['intro', 'load-control', 'stress-viz', 'geogrid-toggle', 'learn-more'];
  const [currentStep, setCurrentStep] = useState(0);
  
  const handleNext = () => {
    // Log completion
    console.log(`Onboarding step completed: ${steps[currentStep]}`);
    analytics.trackEvent('onboarding_step', {
      step: steps[currentStep],
      timestamp: new Date().toISOString(),
    });
    
    if (currentStep === steps.length - 1) {
      analytics.trackEvent('onboarding_completed', { totalSteps: steps.length });
      onComplete();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };
  
  return (
    <div>
      <ProgressBar current={currentStep} total={steps.length} />
      {/* Step content */}
      <button onClick={handleNext}>Next</button>
    </div>
  );
}

// QUARTERLY AUDIT:
// - Did 85% of first-time users complete onboarding? (target: YES)
// - Where did users drop off? (step 2 = high abandon rate → redesign)
// - Average time to complete: 3 min (target: < 5 min)
```

**Anti-gravity rule:**
- Every onboarding flow must log completion
- Monthly review: "Are users finishing the tutorial?"
- If completion < 70%, investigate why and fix
- If users skip halfway: "What's broken about step 2?"

---

## 3. Legal Protection: Disclaimers & Liability

### 3.1 DON'T: Let Simulation Outputs Be Mistaken for Design Calculations

**❌ BAD:**
```typescript
// No disclaimer; user downloads and thinks it's real
export function SimulatorView() {
  return (
    <div>
      <PavementCrossSection />
      <ExportButton />  {/* User exports, misuses as design doc */}
    </div>
  );
}
```

**✅ GOOD:**
```typescript
// Multiple layers of disclaimer
export function SimulatorView() {
  return (
    <div>
      {/* Top disclaimer */}
      <Banner severity="warning">
        ⚠️ EDUCATIONAL SIMULATION ONLY
        <br />
        Not for actual pavement design. See footer for full disclaimer.
      </Banner>
      
      <PavementCrossSection />
      
      {/* Before export */}
      <ExportButton 
        onClick={() => {
          if (!window.confirm(
            'Export will include:\n' +
            '• ILLUSTRATIVE values only\n' +
            '• NOT suitable for design\n' +
            '• Consult IRC:37 and engineers\n\n' +
            'Continue?'
          )) return;
          
          // Add watermark to exported file
          exportWithWatermark('ILLUSTRATIVE - NOT FOR DESIGN');
        }}
      />
      
      {/* Footer */}
      <Footer>
        <Disclaimer />
      </Footer>
    </div>
  );
}

// Disclaimer component (shown on every page)
function Disclaimer() {
  return (
    <div className="text-xs text-gray-500">
      <p>
        <strong>DISCLAIMER:</strong> GeoPave India is an educational 
        visualization tool. Simulation outputs are ILLUSTRATIVE and 
        NOT suitable for actual pavement design. Do not use for:
      </p>
      <ul>
        <li>Professional design calculations</li>
        <li>Construction specifications</li>
        <li>Contract documents</li>
        <li>Any application where public safety depends on accuracy</li>
      </ul>
      <p>
        For actual pavement design, engage a licensed civil engineer 
        and follow IRC:37-2018, IRC:SP:59-2018, and MoRTH specifications.
      </p>
      <p>
        <a href="/terms-of-use">Full Terms of Use</a> | 
        <a href="/about#accuracy">About Accuracy</a>
      </p>
    </div>
  );
}
```

**Anti-gravity rule:**
- Every page must display disclaimer (legally required)
- Export dialog must warn before download
- Exported files include "ILLUSTRATIVE ONLY" watermark
- Footer on every page with full disclaimer link
- Terms of Use page explicitly forbids misuse
- Quarterly legal review: update if regulations change

---

### 3.2 DON'T: Omit Terms of Use or Liability Waiver

**❌ BAD:**
```typescript
// No terms page
// User sues if they misuse output
```

**✅ GOOD:**
```typescript
// /pages/TermsOfUse.tsx

export function TermsOfUse() {
  return (
    <div>
      <h1>Terms of Use & Disclaimer</h1>
      
      <section>
        <h2>1. Educational Purpose Only</h2>
        <p>
          GeoPave India is designed for educational visualization of 
          pavement concepts. It is NOT:
        </p>
        <ul>
          <li>A structural design tool</li>
          <li>A replacement for professional engineering analysis</li>
          <li>Compliant with IRC:37 design procedures</li>
          <li>Suitable for actual construction specifications</li>
        </ul>
      </section>
      
      <section>
        <h2>2. Limitation of Liability</h2>
        <p>
          GeoPave India is provided "as-is" without warranty. The creators 
          assume no liability for:
        </p>
        <ul>
          <li>Misuse of simulation outputs</li>
          <li>Pavement failures resulting from using this tool</li>
          <li>Professional or financial losses</li>
          <li>Claims arising from users' design decisions</li>
        </ul>
      </section>
      
      <section>
        <h2>3. User Responsibilities</h2>
        <p>By using GeoPave India, you agree to:</p>
        <ul>
          <li>NOT use outputs for actual design without professional review</li>
          <li>Consult licensed engineers for real projects</li>
          <li>Follow IRC:37, IRC:SP:59, and MoRTH specifications</li>
          <li>Accept responsibility for any decisions based on this tool</li>
        </ul>
      </section>
      
      <section>
        <h2>4. Accuracy Statements</h2>
        <p>
          All simulation outputs are labeled as "Illustrative" or 
          "Conceptual." Engineering accuracy is NOT verified for 
          design purposes.
        </p>
      </section>
      
      <section>
        <h2>5. Contact for Concerns</h2>
        <p>
          If you believe this tool is being misused for actual design, 
          please contact: <a href="mailto:legal@geopave.edu">legal@geopave.edu</a>
        </p>
      </section>
    </div>
  );
}
```

**Anti-gravity rule:**
- Terms of Use page is non-negotiable; ship with project
- Checkbox on signup: "I have read and agree to Terms of Use" (required)
- Lawyer review before launch (budget for 1 consultation)
- Annual review: update if new liability concerns emerge
- Store user agreement timestamps (proof they accepted)

---

### 3.3 DON'T: Ignore Actual Misuse If It Happens

**❌ BAD:**
```typescript
// User reports: "I used GeoPave outputs in my design; pavement failed"
// Response: silence
```

**✅ GOOD:**
```typescript
// Crisis response plan (documented)

/**
 * MISUSE DETECTED: Crisis Response Protocol
 * 
 * TRIGGER: User reports using GeoPave for actual design
 * 
 * IMMEDIATE (1 hour):
 * 1. Acknowledge issue; do NOT admit liability
 * 2. Direct to Terms of Use: "Tool is for education only"
 * 3. Escalate to project lead + legal advisor
 * 
 * SHORT-TERM (24 hours):
 * 4. Document the incident (date, user, context, outcome)
 * 5. Review if stronger disclaimers needed
 * 6. Consider adding legal review step in future versions
 * 7. If public: post FAQ addressing the incident (without admitting fault)
 * 
 * LONG-TERM (1 week):
 * 8. Post-mortem: How did user bypass warnings?
 * 9. Strengthen onboarding/disclaimers if needed
 * 10. Consider adding required quiz: "What is this tool NOT for?"
 * 
 * COMMUNICATION:
 * - Internal: Incident report (Slack + GitHub issue)
 * - External: FAQ update only if necessary
 * - Legal: Brief to lawyer; follow their guidance
 */

// Implement: If user tries to export, require confirmation
function ExportModal() {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  return (
    <dialog open>
      <h2>Confirm Before Export</h2>
      <div className="warning-box">
        <strong>⚠️ IMPORTANT:</strong>
        <p>This tool is for EDUCATION ONLY. I understand:</p>
        <ul>
          <li>❌ I will NOT use this for actual pavement design</li>
          <li>❌ I will NOT include these values in professional reports</li>
          <li>✅ I will consult a licensed engineer for real projects</li>
        </ul>
      </div>
      <label>
        <input 
          type="checkbox" 
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e.target.checked)}
        />
        I understand and agree to use this tool for education only.
      </label>
      <button disabled={!agreedToTerms}>Download Export</button>
    </dialog>
  );
}
```

**Anti-gravity rule:**
- Maintain a crisis response template (document this now)
- If misuse occurs, follow protocol; don't improvise
- Log incident for legal review (date, user input, outcome)
- Use as learning to strengthen disclaimers

---

## 4. Reproducibility: Version Control & Simulation Tracking

### 4.1 DON'T: Ship Simulation Changes Without Documenting Them

**❌ BAD:**
```typescript
// Modified stress calculation algorithm
// No version change, no changelog
// Old exports no longer match current engine
```

**✅ GOOD:**
```typescript
// /src/engine/VERSIONS.md (tracked in git)

# Simulation Engine Version History

## v2.1.0 (2026-10-06)
**Change:** Added CBR-dependent stress reduction factor
**Reference:** IRC:SP:59-2018, Section 5.3
**Impact:** Stress at subgrade may differ from v2.0 for weak subgrades
**Migration:** Old exports still valid; re-run for new model

## v2.0.0 (2026-09-15)
**Change:** Implemented geogrid confinement model
**Reference:** Verified against case study in IRC:SP:59 Annex B
**Backward compatibility:** BROKEN (v1.x exports incompatible)

## v1.0.0 (2026-08-01)
**Change:** Initial conceptual load propagation model
**Reference:** Simplified from Boussinesq's theory (illustrative)
```

**Code implementation:**
```typescript
// /src/engine/simulationEngine.ts

const SIMULATION_ENGINE_VERSION = '2.1.0';

export interface SimulationOutput {
  version: string; // Always include version
  timestamp: string;
  input: SimulationInput;
  result: { /* ... */ };
  metadata: {
    engineVersion: string;
    modelType: 'conceptual' | 'validated'; // Track model type
    confidence: 'high' | 'medium' | 'low';
  };
}

export function runSimulation(input: SimulationInput): SimulationOutput {
  return {
    version: SIMULATION_ENGINE_VERSION,
    timestamp: new Date().toISOString(),
    input,
    result: calculateStressDistribution(input),
    metadata: {
      engineVersion: SIMULATION_ENGINE_VERSION,
      modelType: 'conceptual',
      confidence: 'medium', // Varies by metric
    },
  };
}

// Export always includes version
export function exportSimulation(output: SimulationOutput): string {
  return JSON.stringify({
    ...output,
    exportedAt: new Date().toISOString(),
    warning: 'This is an ILLUSTRATIVE export from GeoPave India. See terms of use.',
  }, null, 2);
}
```

**Anti-gravity rule:**
- Every simulation engine change must increment version (MAJOR.MINOR.PATCH)
- CHANGELOG.md updated with: what changed, why, reference source
- If breaking change (v1→v2): document migration path
- Old exports always tagged with version; warn if schema mismatch

---

### 4.2 DON'T: Let Reproducibility Drift

**❌ BAD:**
```typescript
// Random seeding for particle animations
const particleVelocity = Math.random() * 10;
// Run simulation twice, get different results
```

**✅ GOOD:**
```typescript
// Deterministic animations (seed-based)
const RANDOM_SEED = 42; // Fixed for reproducibility

function seededRandom(seed: number): () => number {
  let m_w = seed;
  let m_z = 987654321;
  
  return function() {
    m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & 0xffffffff;
    m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & 0xffffffff;
    let result = ((m_z << 16) + (m_w & 65535)) >>> 0;
    result /= 4294967296;
    return result;
  };
}

export function generateAnimationSequence(
  simOutput: SimulationOutput,
  seed: number = RANDOM_SEED // Allow override for testing
): AnimationFrame[] {
  const rng = seededRandom(seed);
  
  return Array.from({ length: 300 }, (_, i) => ({
    frame: i,
    particleVelocity: rng() * 10, // Always same for same seed
    // ...
  }));
}

// Test: Same input → same animation frames
describe('Reproducibility', () => {
  it('should generate identical animations with same seed', () => {
    const seq1 = generateAnimationSequence(testOutput, 42);
    const seq2 = generateAnimationSequence(testOutput, 42);
    expect(seq1).toEqual(seq2); // PASS
  });
});
```

**Anti-gravity rule:**
- No `Math.random()` in simulation or animation logic
- All randomness must use seeded RNG
- Document seed value in exports (so results can be replayed)
- Test: "Same input on different days = same output"

---

### 4.3 DON'T: Lose Audit Trail of Simulation Changes

**❌ BAD:**
```typescript
// No git history of why something changed
// Reviewer can't see if change was intentional or accidental
```

**✅ GOOD:**
```typescript
// Detailed commit messages
git log --oneline src/engine/

> 3f4a8c2 refactor: Simplify stress calculation (no output change)
> 2e8b9d1 feat: Add CBR-dependent stress reduction per IRC:SP:59 sec 5.3
> 1d7a6c8 fix: Correct geogrid effect—was applying 2x confinement

// Check: Did this change output?
git show 2e8b9d1 -- src/engine/simulationEngine.ts
# (Review the diff; verify the change is intentional)

// Regression test: Ensure output didn't change unexpectedly
npm run test:regression  # Compares current output vs baseline
```

**Anti-gravity rule:**
- Commit messages must explain WHY (not just WHAT)
- Every simulation engine change is a separate commit (not bundled)
- PR description includes: "Engine outputs changed? YES/NO. If yes, why?"
- Regression tests in CI: old test cases must still pass (or intentionally change)

---

## 5. Enforcement Mechanisms

### 5.1 Pre-commit Hooks (Prevent Mistakes Before They're Committed)

```bash
# .husky/pre-commit

# Run linter
npm run lint || exit 1

# Run tests
npm run test || exit 1

# Check bundle size
BUNDLE_SIZE=$(npm run build:analyze | grep "Total" | awk '{print $3}' | sed 's/KB//')
if (( $(echo "$BUNDLE_SIZE > 500" | bc -l) )); then
  echo "❌ Bundle size exceeds 500 KB: ${BUNDLE_SIZE} KB"
  exit 1
fi

# Check for console.log statements
if git diff --cached | grep -E "console\.(log|debug|warn)"; then
  echo "❌ console.log detected; remove before committing"
  exit 1
fi

# Check for fabricated IRC references
if git diff --cached | grep -E "IRC:[0-9]+-[0-9]+" | grep -v "IRC:37\|IRC:SP:59"; then
  echo "⚠️ New IRC reference detected; verify it exists"
  exit 1
fi

echo "✅ Pre-commit checks passed"
```

**Anti-gravity rule:**
- Pre-commit hooks block commits that violate rules
- Developers can't accidentally ship bad code

---

### 5.2 CI/CD Checks (Catch Regressions Before Merge)

```yaml
# .github/workflows/quality-gates.yml

name: Quality Gates

on: [pull_request]

jobs:
  performance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install
      - run: npm run build
      - run: |
          BUNDLE=$(npm run analyze | grep "Total")
          echo "Bundle: $BUNDLE"
          if [[ $BUNDLE > 500KB ]]; then
            echo "❌ Bundle exceeds budget"
            exit 1
          fi
      - run: npm run test:performance
        # Fail if FPS < 55, simulation > 500ms
  
  accessibility:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install
      - run: npm run build
      - run: npx axe-core dist/index.html  # Automated a11y scan
      - run: npm run test:a11y  # Custom accessibility tests
  
  reproducibility:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install
      - run: npm run test:regression
        # Fail if simulation outputs changed unexpectedly
  
  legal:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Check for disclaimer
        run: |
          if ! grep -r "ILLUSTRATIVE" src/; then
            echo "❌ Disclaimer text not found; add ILLUSTRATIVE label"
            exit 1
          fi
      - name: Check for fabricated IRC
        run: |
          # Ensure all IRC citations are real
          grep -r "IRC:[0-9]" src/ | \
            grep -v "IRC:37\|IRC:SP:59\|IRC:SP:55" || exit 0
          # If any other IRC found, fail (needs verification)
```

**Anti-gravity rule:**
- Every PR must pass all quality gates
- CI output is transparent: developers see what failed and why
- Red X on PR = cannot merge

---

### 5.3 Quarterly Audits (Proactive Quality Reviews)

```markdown
# Quarterly Quality Audit Checklist

## Q4 2026 Audit (2026-10-06 to 2026-12-31)

### Performance
- [ ] Bundle size trend: ↓ / → / ↑ ? Expected: stable
- [ ] Animation FPS on target device: __ (target: ≥55)
- [ ] Simulation time avg: __ ms (target: <500 ms)
- [ ] Oldest supported browser still tested: IE11? Safari 10? Mobile Safari?

### Accessibility
- [ ] WCAG AA audit completed: PASS / FAIL
- [ ] Screen reader test (NVDA): __ (target: 0 blockers)
- [ ] Keyboard nav: All controls reachable? PASS / FAIL
- [ ] Color contrast: Lowest ratio __ (target: ≥4.5:1)

### Reproducibility
- [ ] All simulation changes documented in VERSIONS.md: YES / NO
- [ ] Regression tests passing: __ / __ (target: 100%)
- [ ] Export format versioned: YES / NO

### Legal
- [ ] Disclaimer visible on: All pages? Learn section? Footer? __ / 3
- [ ] Terms of Use page: Current? YES / NO
- [ ] No fabricated IRC references: YES / NO (scan codebase)
- [ ] Misuse incidents reported: 0 / 1 / 2+ ? Action taken: ___

### User Onboarding
- [ ] First-time user test completed: YES / NO (3+ users)
- [ ] Tutorial completion rate: __ % (target: ≥70%)
- [ ] Persona alignment: Still accurate? YES / NO
- [ ] User feedback collected: __ (from survey / issues / interviews)

**Audit Date:** ________________  
**Auditor:** ________________  
**Findings:** ________________  
**Action Items:** ________________  
**Next Audit:** Q1 2027
```

**Anti-gravity rule:**
- Quarterly = every 90 days (not "when we remember")
- Audit is written, stored in git history
- Findings drive next sprint priorities
- Trend tracking: Is quality improving or degrading?

---

## 6. Escalation Path

### When Something Breaks the Rules

1. **Developer notices:** "Wait, this feels wrong"
   - Flag in code comment: `// TODO: This violates anti-gravity rule X`
   - Open GitHub issue with anti-gravity reference

2. **Code reviewer catches it:**
   - Block PR merge
   - Link to ANTIGRAVITY.md section
   - Example: "This violates 4.1: Simulation changes lack changelog entry"

3. **Quarterly audit reveals issue:**
   - Document in audit report
   - Create technical debt issue
   - Assign to sprint with priority

4. **User reports misuse:**
   - Escalate to legal advisor
   - Follow crisis response protocol (Section 3.3)
   - Post-mortem after resolution

**Never ignore violations.** If something's too hard to fix, that's a design problem—not an exception.

---

## 7. Change Log

| Date | Section | Change | Reason |
|------|---------|--------|--------|
| 2026-10-06 | 1.0 | Initial version | Establishing quality guardrails |

---

## 8. Quick Reference: "If You Don't Know..."

**Q: Can I add a dependency?**
A: Only if bundle size stays < 500 KB. Check first: `npm run analyze`

**Q: Can I change the simulation model?**
A: Only if you update VERSIONS.md, document the reason, and pass regression tests.

**Q: Can I skip the accessibility audit?**
A: No. WCAG AA is non-negotiable. If urgent, file a tech debt issue.

**Q: What if a user misuses the tool?**
A: Follow the crisis response protocol in Section 3.3. Do not ad-lib.

**Q: Can I remove a disclaimer?**
A: No. Never. Add more, not fewer.

**Q: What if we want to go live with known issues?**
A: Document all known issues in a public page. Users deserve transparency.

---

## 9. Legal Disclaimer (For This Document Itself)

This ANTIGRAVITY.md is a **process document**, not legal advice. It reflects engineering best practices and risk mitigation strategies. For actual legal liability concerns, consult a lawyer. This document is informational and does not constitute legal counsel.

---

**Document Version:** 1.0  
**Last Updated:** 2026-10-06  
**Status:** Active  
**Review Cycle:** Quarterly (next: Q1 2027)

---

## Summary: The 10 Commandments of Anti-Gravity

1. **Thou shalt measure performance.** (no guessing)
2. **Thou shalt document versions.** (reproduce = trust)
3. **Thou shalt not fabricate data.** (verify or label)
4. **Thou shalt warn users loudly.** (disclaimers on every page)
5. **Thou shalt test with real users.** (not yourself)
6. **Thou shalt keep accessibility sacred.** (WCAG AA, always)
7. **Thou shalt review code for regressions.** (delta analysis)
8. **Thou shalt log incidents.** (crisis protocol, always)
9. **Thou shalt update this document.** (quarterly, religiously)
10. **Thou shalt ask for help.** (lawyer, accessibility expert, users)

---

**End of ANTIGRAVITY.md**
