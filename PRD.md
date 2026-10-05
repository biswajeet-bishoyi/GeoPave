# GeoPave India — Geosynthetic Reinforced Flexible Pavement Simulator

## Product Requirements Document (PRD)

**Version:** 1.0  
**Date:** 2026-09-29  
**Project Name:** GeoPave India  
**Target Users:** Civil engineering students, educators, practitioners, pavement engineers

---

## 1. Product Overview

GeoPave India is an interactive educational visualization and simulator designed to explain flexible pavement construction and performance in Indian road systems. The simulator demonstrates how wheel/traffic loads propagate through pavement layers, how geosynthetics (geogrids and geotextiles) interact with pavement materials, and when/why geosynthetics are appropriate interventions.

The product is primarily an **educational laboratory**, not a structural design calculator. All simulation outputs are explicitly labeled as conceptual, illustrative, or user-defined. Future versions may incorporate validated mechanistic-empirical models, but the current architecture supports conceptual visualization and learning.

---

## 2. Problem Statement

### Current State
- Civil engineering students lack interactive, visual tools to understand flexible pavement mechanics.
- Pavement layer interactions are often taught via static diagrams or complex mathematical models.
- Geosynthetics' role in pavements is poorly understood; many practitioners cannot visualize their function.
- Indian-specific pavement practices (IRC:37, IRC:SP:59, MoRTH standards) are not widely taught with interactive examples.
- Load distribution, stress propagation, and layer confinement are abstract concepts without visual reinforcement.

### Gap
No accessible, professional-grade simulator exists that explains Indian flexible pavement design with geosynthetics in a visual, interactive manner.

---

## 3. Objectives

1. **Educate** students and practitioners on Indian flexible pavement structure and layer functions.
2. **Visualize** load transfer, stress propagation, and deformation conceptually.
3. **Demonstrate** geogrid reinforcement effects (confinement, lateral restraint, load distribution).
4. **Demonstrate** geotextile functions (separation, filtration, drainage).
5. **Compare** conventional pavements with geosynthetic-reinforced alternatives visually.
6. **Contextualize** when geosynthetics are appropriate (weak subgrade, high traffic, wet conditions).
7. **Establish** professional credibility in civil engineering education and practice.
8. **Provide** accurate references to Indian standards (IRC, MoRTH, BIS) without fabricating design values.

---

## 4. Target Users

### Primary
- **Civil engineering students** (undergraduate, postgraduate) studying pavement design
- **Pavement engineering educators** delivering IRC:37 or geosynthetics courses
- **Geosynthetics manufacturers/suppliers** demonstrating product value in training contexts
- **Highway engineers/practitioners** refreshing knowledge on layer interactions

### Secondary
- **Project consultants** explaining pavement design to non-technical clients
- **Government/MoRTH personnel** in highway maintenance/design training programs
- **Researchers** visualizing pavement response scenarios

---

## 5. User Personas

### Persona 1: Student Learner (Arun, 4th Year Civil Engineering)
- Learning pavement design for the first time
- Struggles with abstract concepts like stress bulbs and load distribution
- Learns visually; needs interactive reinforcement
- Needs to understand "why" before "how much"
- Will reference this tool in assignments and academic discussions

### Persona 2: Practitioner Refresher (Priya, Pavement Engineer, 8 years)
- Knows pavement basics but rarely works with geosynthetics
- Wants to understand when/where geosynthetics add value
- Needs professional, credible tool to explain to clients
- Values quick access to layer comparison and visual effects
- Needs to know it's based on IRC/MoRTH, not invented

### Persona 3: Educator (Dr. Sharma, Associate Professor)
- Teaching 60+ students per year
- Needs a tool that replaces 1 hour of chalkboard diagrams
- Requires accurate representation of Indian standards
- Wants customizable scenarios for different teaching contexts
- May use comparison mode in live lectures

### Persona 4: Geosynthetics Professional (Vikram, Sales Engineer)
- Explaining geogrid/geotextile value to highway contractors
- Needs credible visual demonstration
- Must not overstate benefits (credibility is key)
- Wants side-by-side comparison showing geosynthetic effect
- Will use on site visits and in training workshops

---

## 6. Educational Goals

By interacting with GeoPave India, users should understand:

1. **Flexible pavement layers and their functions:**
   - BC (Bituminous Concrete) — surface load transfer and weathering protection
   - DBM (Dense Bituminous Macadam) — structural binder and load distribution
   - WMM (Wet Mix Macadam) — granular load distribution and rutting resistance
   - GSB (Granular Sub-Base) — load distribution to subgrade, stress reduction
   - Subgrade — foundation soil, load bearing, deformation response

2. **Load propagation mechanics:**
   - Wheel load contacts BC at a point
   - Load spreads through bituminous layers
   - Load continues spreading through granular layers (stress bulb)
   - Load reaches subgrade with reduced intensity
   - Stress spreads laterally with depth

3. **Geogrid reinforcement:**
   - Acts as a confining grid in granular layer
   - Restricts lateral aggregate movement
   - Improves interlocking and stress distribution
   - Reduces vertical settlement in critical layers
   - Most effective at WMM/GSB interface or within WMM

4. **Geotextile separation:**
   - Prevents fine soil migration from subgrade into granular layers
   - Maintains distinct material layers
   - Allows water passage (when appropriately designed)
   - Reduces mixing and provides filtration function
   - Positioned above subgrade

5. **Subgrade influence:**
   - Weak subgrade = greater deformation, thicker pavement required
   - Wet subgrade = reduced bearing capacity, settlement risk
   - CBR classification relates to load-bearing ability
   - Geosynthetics may reduce required pavement thickness in poor conditions

6. **Comparison reasoning:**
   - Conventional pavements suitable for good subgrade and moderate traffic
   - Geosynthetics valuable for weak subgrade, high traffic, or wet conditions
   - Not universally beneficial — appropriate selection matters
   - Geosynthetics are an intervention, not a standard layer

7. **Indian pavement standards context:**
   - IRC:37 provides design procedures for flexible pavements
   - IRC:SP:59 addresses geosynthetics in road applications
   - MoRTH specifications define material grades and layer thicknesses
   - BIS standards define material properties (e.g., geogrid specifications)

---

## 7. Engineering Scope

### In Scope
- Visual representation of Indian flexible pavement structure
- Conceptual load propagation and stress distribution visualization
- Geogrid confinement and load spread effects (visual demonstration)
- Geotextile separation and layer interaction (visual demonstration)
- Weak subgrade scenario modeling
- Heavy traffic scenario modeling
- Layer information panel with engineering explanations
- Comparison mode (conventional vs. reinforced pavement)
- Traffic level selection (light, medium, heavy, very heavy)
- Subgrade condition selection (good, moderate, weak, wet/poor drainage)
- Vehicle type selection (light vehicle, bus, truck, heavy truck)
- Animation and replay controls
- Responsive UI for desktop and tablet

### Out of Scope (Phase 1)
- Actual IRC:37 design calculations (CBR method, ESA/MSA)
- Finite element analysis (FEM) output
- Layer thickness design algorithms
- Fatigue or rutting criteria calculations
- Actual material property inputs (elastic modulus, Poisson's ratio)
- Three-dimensional (3D) pavement modeling
- Climate/seasonal effects
- Bituminous aging or reflective cracking
- Subgrade erosion or piping
- Validated mechanistic-empirical models (Phase 3+)

---

## 8. Out-of-Scope Items

- This is NOT a pavement design tool. Do not design actual pavements using this simulator.
- This simulator does NOT replace IRC:37 or MoRTH design procedures.
- Simulation values are NOT official design outputs.
- Simulator does NOT account for traffic speed, climate, construction quality, or maintenance.
- Simulator does NOT model asphalt aging, reflection cracking, or binder properties.
- Simulator does NOT perform CBR-based design or axle load calculations.
- Simulator does NOT validate geosynthetic property values against BIS standards.
- Simulator does NOT include procurement, cost, or installation guidance.

---

## 9. User Journeys

### Journey 1: Student First-Time Learner

**Goal:** Understand what happens when a truck drives over a pavement

**Steps:**
1. Open simulator → sees pavement cross-section with labels
2. Reads "Layer Explorer" to understand each layer
3. Selects "Conventional Pavement" mode
4. Places truck on surface
5. Clicks "Apply Wheel Load"
6. Watches animation: load penetrates layers, stress spreads downward
7. Sees stress bulb expand through GSB into subgrade
8. Reads explanation panel
9. Clicks "Geogrid Reinforced" mode
10. Applies same load → sees geogrid confine aggregate, smaller stress zone
11. Understands the difference
12. Reads "Learn" section for deeper context
13. Completes knowledge check

**Expected Outcome:** Student can explain (in simple terms) why pavement layers matter and what a geogrid does.

---

### Journey 2: Practitioner Quick Reference

**Goal:** Show a contractor why geosynthetics are needed for a weak subgrade project

**Steps:**
1. Open simulator
2. Select "Weak Subgrade" scenario
3. Select "Conventional Pavement" on left side, "Geogrid + Geotextile" on right
4. Apply load to both
5. Observe: conventional pavement shows large deformation, soil movement; reinforced shows reduced settlement
6. Screenshot or record comparison
7. Use screenshot in presentation to explain design decision

**Expected Outcome:** Practitioner has a credible visual to justify geosynthetic specification.

---

### Journey 3: Educator Classroom Demonstration

**Goal:** Teach 50 students about load distribution in 15 minutes

**Steps:**
1. Open simulator on projector
2. Show pavement cross-section (static, 2 min)
3. Ask students: "Where does the load go?" (engagement, 2 min)
4. Apply wheel load → animate (3 min)
5. Pause and explain stress bulb, layer confinement (3 min)
6. Switch to geogrid reinforced → apply same load → show difference (3 min)
7. Ask: "Why is geogrid here?" → students propose answers
8. Summarize and direct to Learn mode for homework

**Expected Outcome:** Students retain visual memory of load transfer and can reference it in assignments.

---

### Journey 4: Geosynthetics Sales/Training

**Goal:** Train highway contractors on geogrid placement and function

**Steps:**
1. Show conventional pavement → apply load → observe aggregate lateral movement
2. Point out: "Without confinement, aggregate shears laterally under wheel"
3. Switch to geogrid reinforced → apply same load → observe confined aggregate
4. Highlight geogrid layer and confinement visualization
5. Explain: "Geogrid interlocks with aggregate, reduces lateral movement, improves load distribution"
6. Show weak subgrade scenario to demonstrate when geogrid is critical
7. Provide handout with layer diagram and key takeaways

**Expected Outcome:** Contractors understand why geogrid placement and orientation matter.

---

## 10. Functional Requirements

### 10.1 Pavement Cross-Section Display

**Requirement:** Display a realistic, labeled Indian flexible pavement cross-section.

**Specifications:**
- Show layers vertically: BC → DBM → WMM → GSB → Subgrade
- Optional geosynthetic layers displayed inline when selected
- Geogrid shown as a polymer grid texture within/above GSB
- Geotextile shown as a thin synthetic fabric layer above subgrade
- Each layer has distinct visual texture/color
- Layer thicknesses are proportional and realistic (not to strict scale, but proportionally sensible)
- All layers labeled with name, material, and typical function
- Dimensions shown (e.g., "BC: 50 mm")
- Scale indicator (e.g., "0 m" at top, "2.0 m" at bottom for typical pavement depth)

**Acceptance Criteria:**
- Pavement cross-section renders without errors
- All five standard layers visible
- Geosynthetics display/hide based on user selection
- Layer labels are clear and accurate (no misspellings)
- Visual textures are distinct enough to differentiate materials
- Responsive to window resizing

---

### 10.2 Layer Explorer (Click-to-Learn Panel)

**Requirement:** Allow users to click any layer and see detailed information.

**Specifications:**
- Clicking a layer displays an information panel with:
  - Layer name (e.g., "Dense Bituminous Macadam")
  - Material composition
  - Typical thickness range (with reference to IRC/MoRTH)
  - Primary engineering functions
  - Position in pavement structure
  - What happens under loading (qualitative description)
  - Why the layer matters (pedagogical summary)
  - "Learn More" expandable section with additional context
- Information is accurate to IRC:37 and MoRTH specifications
- No fabricated values
- Layerpanel remains open until user clicks elsewhere or closes

**Acceptance Criteria:**
- All seven layers have complete information
- No invented IRC clauses or design values
- References are accurate (IRC:37, MoRTH, BIS where applicable)
- Panel is readable and well-formatted
- "Learn More" expands/collapses smoothly

---

### 10.3 Truck/Wheel Load Visualization

**Requirement:** Show a truck or wheel load on the pavement surface.

**Specifications:**
- Render a stylized truck or wheel at the surface
- Truck can be positioned/dragged to different locations on pavement
- "Apply Wheel Load" button triggers animation
- Visual wheel contact patch indicates load point
- Wheel load magnitude changes with vehicle type selection (light vehicle, bus, truck, heavy truck)
- Animation shows wheel descending/loading smoothly (not instantaneously)

**Acceptance Criteria:**
- Truck/wheel renders clearly
- Positioning is intuitive (click/drag)
- Load application is animated (not instant)
- Contact patch is visually distinct

---

### 10.4 Load Propagation Animation

**Requirement:** Animate load transfer through pavement layers.

**Specifications:**
- When "Apply Wheel Load" is clicked, animate:
  1. Wheel load applied to BC surface
  2. Load arrow/indicator shows load magnitude/direction
  3. Load propagates downward through BC
  4. Load spreads through DBM (arrows spread laterally)
  5. Load spreads through WMM (stress bulb expands)
  6. Geogrid (if present) visually confines/restrains aggregate movement
  7. Load continues to GSB (further spread)
  8. Geotextile (if present) shows separation/no mixing
  9. Load reaches subgrade
  10. Subgrade deformation visualized (settlement, lateral strain, rut formation)
- Animation can be:
  - Played automatically
  - Paused
  - Stepped frame-by-frame
  - Replayed
  - Played in slow motion
- Timeline/progress indicator shows animation progress
- Animation respects reduced-motion accessibility preference

**Acceptance Criteria:**
- Animation is smooth and visually continuous
- All layers show appropriate load spreading/reduction
- Geogrid/geotextile effects are visually evident
- Controls (play/pause/reset/step) function correctly
- Animation completes in 8-12 seconds (adjustable)

---

### 10.5 Stress Propagation Visualization

**Requirement:** Show conceptual stress distribution and stress bulbs.

**Specifications:**
- Stress bulbs shown as expanding zones of influence below load point
- Color gradient indicates stress intensity (red = high, yellow = medium, green = low)
- Stress bulb expands with depth as per Boussinesq approximation (conceptual, not precise)
- Arrows show load paths downward and laterally
- With geogrid: stress bulb appears narrower/more confined
- With weak subgrade: stress bulb penetrates deeper, wider
- Label clearly states: "Conceptual load-transfer visualization — not FEM analysis"
- Stress values shown as relative indicators (0–100 scale), not absolute MPa
- Indicator labeled: "Relative stress intensity (illustrative)"

**Acceptance Criteria:**
- Stress bulb expands appropriately with depth
- Color gradient is clear and visually distinct
- Geogrid/geotextile effects visible in stress distribution
- Label clearly indicates conceptual nature
- Responsive to pavement configuration and load type

---

### 10.6 Geogrid Visualization & Confinement Effect

**Requirement:** Visually demonstrate geogrid reinforcement and aggregate confinement.

**Specifications:**
- Geogrid shown as a polymer grid layer (distinct texture/color, typically gray/white with grid pattern)
- When load applied WITHOUT geogrid:
  - Aggregate particles in WMM/GSB show lateral outward movement (arrows/animation)
  - Particles appear to "shear" sideways
  - Stress bulb spreads broadly
- When load applied WITH geogrid:
  - Aggregate particles appear confined within grid openings
  - Lateral movement visibly reduced (restraint arrows)
  - Stress bulb appears narrower/more controlled
  - Grid interacts visually with particles (particles stay within grid cell region)
- Information panel for geogrid explains:
  - Reinforcement function
  - Aggregate confinement mechanism
  - Reduction of lateral movement
  - Improved load distribution
  - Potential rutting reduction benefit
  - **Disclaimer:** "Benefits depend on geogrid properties, placement, and subgrade conditions"

**Acceptance Criteria:**
- Geogrid renders as distinct visual layer
- Aggregate movement is clearly different with/without geogrid
- Confinement effect is visually obvious
- Information panel is accurate and includes disclaimer
- Comparison mode clearly shows difference

---

### 10.7 Geotextile Visualization & Separation Effect

**Requirement:** Visually demonstrate geotextile separation and filtration.

**Specifications:**
- Geotextile shown as a thin synthetic fabric layer (visually distinct texture, typically light color)
- When load applied WITHOUT geotextile:
  - Fine soil particles from subgrade shown moving upward into granular layer
  - Mixing animation shows particles crossing boundary
  - Subgrade and GSB boundary appears blurred/mixed
- When load applied WITH geotextile:
  - Geotextile acts as barrier
  - Fine particles cannot cross barrier
  - Distinct boundary maintained between subgrade and GSB
  - Water droplets (if relevant) shown passing through geotextile
- Information panel for geotextile explains:
  - Separation function
  - Filtration mechanism
  - Drainage-related roles (where applicable)
  - Protection of granular material
  - **Disclaimer:** "Drainage function depends on geotextile type and design; not all geotextiles provide drainage in all situations"

**Acceptance Criteria:**
- Geotextile renders as visually distinct layer
- Separation effect visible (with/without geotextile)
- Soil migration animation is clear
- Information panel includes accurate and cautious language
- No overstated drainage claims

---

### 10.8 Scenario/Configuration Selection Panel

**Requirement:** Provide intuitive controls to modify simulation parameters.

**Specifications:**

**Pavement Configuration:**
- Dropdown: "Conventional," "Geogrid Reinforced," "Geotextile Separated," "Geogrid + Geotextile"
- Pavement cross-section updates immediately

**Traffic Level:**
- Selector: Light, Medium, Heavy, Very Heavy
- Load magnitude scales with selection
- Animation duration/intensity may adjust

**Subgrade Condition:**
- Selector: Good, Moderate, Weak, Wet/Poor Drainage
- Affects:
  - Stress propagation depth
  - Deformation visualization
  - Subgrade settlement appearance
  - Weak subgrade shows larger deformation zone

**Vehicle Type:**
- Selector: Light Vehicle (car), Bus, Truck, Heavy Truck
- Load pattern adjusts (single axle, dual axle, etc.)
- Load magnitude changes
- Contact patch visualization changes

**Advanced (Optional, Hidden by Default):**
- Slider: Layer Thickness Adjustment (±20%)
- Slider: Traffic Repetitions (1–100 passes)
- Slider: Moisture Condition (dry–wet)
- These should only appear if the simulation engine can represent their effects

**Acceptance Criteria:**
- All controls function
- Pavement updates immediately on selection change
- Load/stress visualization reflects parameter changes
- Controls are intuitive (labels clear, no technical jargon)
- Mobile-friendly control layout

---

### 10.9 Comparison Mode (Side-by-Side Visualization)

**Requirement:** Show two pavement configurations simultaneously for direct comparison.

**Specifications:**
- Screen split into LEFT and RIGHT sections
- LEFT: Conventional pavement (no geosynthetics)
- RIGHT: Geosynthetic-reinforced pavement (user-selected configuration)
- Both pavements shown to same scale
- "Apply Load" button applies to both simultaneously
- Animation synchronized between left and right
- Visual differences clearly highlighted:
  - Load spread/stress bulb shape
  - Aggregate movement
  - Deformation zones
  - Separation/mixing
- Metrics panel below shows relative indicators:
  - Load Distribution (relative)
  - Aggregate Confinement (relative)
  - Subgrade Response (relative)
  - Rutting Tendency (relative, illustrative)
  - Separation Quality (present/absent)
- All metrics labeled: "Relative / Illustrative Indicator"
- User can select:
  - RIGHT configuration (geosynthetic type)
  - Traffic level
  - Subgrade condition
- Reset/replay controls

**Acceptance Criteria:**
- Side-by-side layout renders clearly
- Both pavements load/animate together
- Visual differences are obvious
- Metrics display without claiming precision
- Responsive on tablet/desktop

---

### 10.10 Engineering View Panel

**Requirement:** Provide scientific/conceptual explanation of what's happening.

**Specifications:**
- Expandable panel explains:
  - **Load Application Phase:** "Wheel applies contact pressure to BC surface"
  - **Bituminous Layer Response:** "Load transfers into and spreads through DBM and BC; bitumen redistributes load laterally"
  - **Granular Layer Interaction:** "Load spreads through WMM and GSB; aggregate particles interlock and distribute load; lateral particle movement occurs"
  - **Geogrid Effect (if present):** "Geogrid confines aggregate particles, reduces lateral shear, improves load distribution efficiency"
  - **Geotextile Effect (if present):** "Geotextile prevents fine soil migration from subgrade; maintains distinct layer integrity"
  - **Subgrade Response:** "Stress reaches subgrade; bearing capacity and settlement response depend on soil strength and moisture"
  - **Deformation Mechanism:** "Cumulative particle movement and subgrade settlement produce rut formation; geosynthetics may reduce rut depth by improving load distribution and layer separation"
- Uses simplified diagrams (stress bulb, particle interaction, load paths)
- No mathematical equations (reserve for future design module)
- Language is technical but accessible to upper-level engineering students

**Acceptance Criteria:**
- Explanations are scientifically sound (no invented mechanisms)
- Text is clear and concise
- Diagrams support explanations
- Information updates based on selected configuration

---

### 10.11 Learn/Education Mode

**Requirement:** Provide standalone educational content.

**Specifications:**

Sections:
1. **Flexible Pavement Basics**
   - What is a flexible pavement?
   - Why "flexible" vs. "rigid"?
   - Where are they used in India?

2. **Pavement Layers**
   - BC: Bituminous Concrete
   - DBM: Dense Bituminous Macadam
   - WMM: Wet Mix Macadam
   - GSB: Granular Sub-Base
   - Subgrade

3. **Load Distribution & Stress**
   - How loads spread through pavement
   - Stress bulb concept
   - Depth vs. load reduction

4. **Geogrids**
   - What is a geogrid?
   - Why use geogrids in pavements?
   - How does a geogrid confine aggregate?
   - When are geogrids beneficial?
   - When are geogrids NOT needed?

5. **Geotextiles**
   - What is a geotextile?
   - Separation function
   - Filtration function
   - Drainage considerations
   - When to use geotextiles

6. **Subgrade & Soil Mechanics**
   - What is CBR?
   - Why subgrade matters
   - Weak subgrade challenges
   - Wet subgrade issues

7. **Rutting & Pavement Performance**
   - What is rutting?
   - Causes of rutting
   - How geosynthetics may reduce rutting
   - Actual design requires IRC:37

8. **Indian Pavement Standards**
   - IRC:37 overview (no deep dive into calculations)
   - IRC:SP:59 overview (geosynthetics role)
   - MoRTH Specifications (layer definitions)
   - BIS standards (material properties)

9. **Conventional vs. Geosynthetic Pavement**
   - When is conventional sufficient?
   - When are geosynthetics necessary?
   - Cost-benefit considerations (informational only)

10. **Knowledge Check Quiz**
    - 10–15 multiple-choice questions
    - Instant feedback
    - Links back to Learn sections for incorrect answers
    - Not a test; a learning reinforcement tool

**Acceptance Criteria:**
- All sections are well-written, accurate
- No fabricated standards or design values
- Quiz questions are clear and fair
- Content is accessible to upper-level engineering students
- Links between sections function correctly

---

### 10.12 Metrics/Dashboard Panel

**Requirement:** Display conceptual performance indicators during simulation.

**Specifications:**

Indicators (all labeled as relative/illustrative):
- **Load Distribution Index** (0–100): How broadly the load spreads; geogrid increases this
- **Aggregate Confinement** (0–100): How much the geogrid restrains aggregate lateral movement
- **Subgrade Response** (0–100): Relative magnitude of subgrade deformation
- **Rutting Tendency** (0–100): Relative likelihood of rut formation (higher = more rutting risk)
- **Layer Separation Quality** (Present/Absent): Whether geotextile maintains layer distinction

Each indicator includes:
- A visual gauge or bar
- Numerical value (0–100)
- Label: "Illustrative Indicator"
- Brief tooltip explaining what it means
- Change over time (if running multiple load cycles)

**Specifications:**
- Metrics update in real-time as animation plays
- Metrics reset when configuration changes
- Metrics are NOT design outputs and cannot be used for actual pavement design

**Acceptance Criteria:**
- Metrics update smoothly
- All labels clearly indicate illustrative nature
- Values respond logically to configuration changes
- No user confusion with actual design values

---

## 11. Simulation Requirements

### 11.1 Simulation Engine Architecture

The simulation engine is independent of the UI and operates on a conceptual model.

**Core Inputs:**
```
pavement_config: {
  layers: [bc, dbm, wmm, gsb, subgrade]
  geogrid: boolean
  geogrid_position: string (e.g., "within-wmm", "wmm-gsb-interface")
  geotextile: boolean
  geotextile_position: string (e.g., "above-subgrade")
}

traffic_config: {
  level: "light" | "medium" | "heavy" | "very_heavy"
  vehicle_type: "light_vehicle" | "bus" | "truck" | "heavy_truck"
  load_repetitions: integer (1–100+)
}

subgrade_config: {
  condition: "good" | "moderate" | "weak" | "wet_poor_drainage"
  cbr: optional float (for future use)
  moisture: float (0–1, where 1 = saturated; illustrative)
}
```

**Core Outputs:**
```
simulation_result: {
  load_distribution: {
    index: float (0–100, relative)
    load_path: array of vectors (conceptual stress path)
    stress_bulb: {
      depth_zone: float
      lateral_spread: float
      intensity_profile: array
    }
  }
  
  aggregate_response: {
    confinement_index: float (0–100, relative)
    lateral_movement_magnitude: float (0–100, relative)
    with_geogrid_effect: float (confinement_reduction %)
  }
  
  layer_interaction: {
    separation_quality: boolean (geotextile present/absent)
    soil_migration_risk: float (0–100, higher = more risk)
    with_geotextile_effect: float (separation_improvement %)
  }
  
  subgrade_response: {
    deformation_index: float (0–100, relative)
    settlement_tendency: float (0–100, relative)
    rut_formation_risk: float (0–100, relative)
  }
  
  animation_sequence: array of animation_frames {
    time: float (seconds)
    layer: string (which layer is active)
    stress_intensity: float (0–100)
    particle_movement: array of vectors
    visual_state: object
  }
}
```

### 11.2 Conceptual Stress Propagation Model

**Basis:** Simplified conceptual model (NOT Boussinesq FEM).

**Logic:**
1. **Initial Load:** User specifies vehicle type and traffic level.
2. **Load Magnitude:** Normalized to 0–100 scale for simulation.
3. **Bituminous Layer Response:**
   - Load spreads 20–30% laterally per layer in BC/DBM.
   - Stress reduction ≈ 15% per bituminous layer.
4. **Granular Layer Response:**
   - Load spreads 40–60% per granular layer (higher spread = lower confinement).
   - Stress reduction ≈ 25–30% per granular layer.
   - **WITH GEOGRID:** Lateral spread reduced by 30–40%, confinement increased.
5. **Subgrade Interaction:**
   - Stress reaching subgrade depends on pavement depth and spread efficiency.
   - Subgrade deformation proportional to stress and inversely proportional to CBR/condition.
   - Weak subgrade: higher deformation; wet: much higher deformation.
6. **Geotextile Effect:**
   - Does not reduce load (no structural effect).
   - Prevents soil migration (visual separation maintained).
   - Soil migration risk = 0 with geotextile, 0–100 without (depends on subgrade condition).

**All outputs labeled as "Conceptual" or "Illustrative".**

### 11.3 Geogrid Reinforcement Model (Conceptual)

**Effect on Aggregate Confinement:**
- Geogrid confines aggregate within grid openings.
- Lateral aggregate movement = baseline lateral movement × (1 - confinement_factor).
- Confinement factor ≈ 0.3–0.5 (30–50% reduction in lateral movement).
- **Caveat:** Actual confinement depends on geogrid stiffness, grid opening size, and aggregate gradation (not modeled).

**Effect on Load Distribution:**
- Lateral load spread ≈ baseline spread × (1 + efficiency_factor).
- Efficiency factor ≈ 0.2–0.3 (20–30% increase in spread/distribution efficiency).
- Load reduction to subgrade ≈ baseline reduction × 0.8–0.9 (slightly more efficient energy dissipation).

**Visual Representation:**
- Stress bulb appears narrower (more concentrated laterally, but spreads downward longer).
- Aggregate particles remain within grid cell region (confined movement).

### 11.4 Geotextile Separation Model (Conceptual)

**Effect on Soil Migration:**
- Without geotextile: fine soil particles migrate from subgrade into GSB; soil_migration_risk = 0–100 (depends on subgrade fine content and pore pressure).
- With geotextile: soil migration blocked; soil_migration_risk = 0.
- Visual: Boundary between subgrade and GSB remains distinct (no mixing animation).

**Effect on Layer Integrity:**
- Geotextile maintains layer separation visually.
- Water passage: shown as water droplets passing through geotextile (if moisture is present).
- No structural role in simulation.

### 11.5 Weak Subgrade & Wet Subgrade Scenarios

**Weak Subgrade (CBR ≈ 2–5%):**
- Subgrade deformation_index = 70–100 (high deformation).
- Settlement tendency = 70–100 (significant settlement).
- Rut formation risk = 80–100 (high rutting risk).
- Stress penetration depth increased (stress reaches deeper into subgrade).
- Visual: Large deformation zone, obvious rut formation, particle settlement.

**Wet/Poor Drainage Subgrade (saturated or near-saturated):**
- Effective stress reduced due to pore pressure.
- Subgrade response treated as "weaker" than CBR suggests.
- Deformation_index = 85–100 (very high deformation).
- Settlement tendency = 90–100 (very high settlement).
- Visual: Maximum deformation zone, obvious rutting, possible failure indication.

**With Geosynthetics in Weak Subgrade:**
- Geotextile maintains layer separation (prevents mixing, which would worsen performance).
- Geogrid confines aggregate, improves load distribution, reduces stress reaching subgrade.
- Combined effect reduces subgrade stress by ≈ 20–30% (illustrative; not a design calculation).

### 11.6 Load Repetition Model (Optional)

If included:
- Each load repetition accumulates deformation conceptually.
- Rut depth increases with repetitions (cumulative damage model, conceptual).
- Rutting rate: baseline_rut_rate × number_of_repetitions.
- With geosynthetics: rut rate reduced due to improved load distribution and confinement.
- **All outputs labeled as illustrative.**

---

## 12. Animation Requirements

### 12.1 Truck/Wheel Animation

- Truck enters pavement surface from left edge.
- Moves to load point.
- Wheel descends onto pavement (contact patch visible).
- Wheel load applies (visual pressure indicator).
- Truck remains stationary during load transfer.
- Truck can exit or reset.
- Duration: ≈ 2 seconds.

### 12.2 Load Propagation Sequence

**Phase 1: Load Application (0–1 sec)**
- Wheel contact patch highlighted.
- Load arrow shows downward force.
- Load magnitude label appears.

**Phase 2: Bituminous Layer Spread (1–2 sec)**
- Load arrows spread laterally at BC/DBM interface.
- Arrows reduce in intensity downward.
- Layer highlighting shows BC then DBM.

**Phase 3: Granular Layer Spread (2–4 sec)**
- Load spreads more broadly through WMM.
- Stress bulb becomes visible (colored gradient zone).
- Arrows show downward and lateral spread.

**Phase 4: Geogrid Effect (if present, 3.5–5 sec)**
- Geogrid highlights as particles approach.
- Particles show confined movement within grid cells.
- Lateral spread visibly reduced compared to non-geogrid version (if togglable).

**Phase 5: GSB Response (4–6 sec)**
- Load continues spreading through GSB.
- Stress bulb expands.
- Particles show lateral and vertical movement.

**Phase 6: Geotextile Effect (if present, 5–6.5 sec)**
- Geotextile highlights.
- Fine soil particles show confinement at boundary (no upward migration).
- Layer distinction maintained visually.

**Phase 7: Subgrade Deformation (6–8 sec)**
- Stress reaches subgrade.
- Subgrade particles show settlement (downward movement).
- Rut formation visualized (deepening indentation).
- Lateral soil spreading (if weak subgrade).

**Phase 8: Equilibrium (8–10 sec)**
- Animation slows.
- Final deformation state visible.
- Stress bulb and deformation zones frozen.

**Total Duration:** ≈ 10 seconds (adjustable with slow-motion control).

### 12.3 Animation Controls

- **Play:** Start animation from current frame.
- **Pause:** Freeze animation; store current frame.
- **Reset:** Return to initial state (no load applied).
- **Step Forward:** Advance one frame.
- **Step Backward:** Rewind one frame.
- **Slow Motion:** Reduce animation speed by 50% or user-selected factor.
- **Replay:** Play again from current configuration.

### 12.4 Visual Indicators

- **Load Arrows:** Red/thick for high stress, yellow/medium for reduced stress, green/thin for low stress.
- **Stress Bulb:** Color gradient (red center → yellow → green → transparent).
- **Particle Movement:** Small arrows on aggregate particles showing direction/magnitude.
- **Deformation Zones:** Shaded region showing subgrade settlement/rut.
- **Geogrid Highlight:** Grid becomes opaque/glows when load reaches it; particles constrained visually.
- **Geotextile Barrier:** Barrier glows; particles stop at boundary (visual feedback).

### 12.5 Accessibility

- Animations respect `prefers-reduced-motion` CSS media query.
- Reduced-motion mode: static stress diagram instead of animation (all layers shown simultaneously with stress distribution).
- Alternative: step-by-step frame view (manual stepping through animation).
- Audio descriptions: optional narration of animation phases (future enhancement).

---

## 13. Comparison Mode (Detailed)

### 13.1 Layout

- Screen split 50–50 horizontally (or vertically on mobile).
- LEFT: Conventional pavement (always).
- RIGHT: Geosynthetic-reinforced pavement (user selects type).

### 13.2 Synchronized Controls

- Traffic Level selector affects both pavements.
- Subgrade Condition selector affects both pavements.
- Vehicle Type selector affects both pavements.
- "Apply Load" button triggers animation on both pavements simultaneously.
- Animations are frame-synchronized (both pause/resume together).

### 13.3 Visual Highlighting

- Stress bulbs color-coded consistently (red = high stress).
- Geogrid (right side) visually distinct; geogrid effect highlighted (e.g., geogrid glows or particles show confinement).
- Geotextile (right side) visually distinct; separation maintained.
- Rut formation side-by-side (user can observe rut depth difference).

### 13.4 Metrics Comparison

Below pavement cross-sections, display side-by-side metrics:

| Metric | LEFT (Conventional) | RIGHT (Reinforced) |
|--------|---------------------|-------------------|
| Load Distribution | 45 (illustrative) | 68 (illustrative) |
| Aggregate Confinement | 20 | 75 |
| Subgrade Stress | 85 | 55 |
| Rutting Risk | 80 | 45 |
| Layer Separation | Absent | Present |

**Labels:** "Relative / Illustrative Indicator — Not Design Output"

### 13.5 Switching Configurations

- User selects RIGHT configuration via dropdown:
  - "Geogrid Reinforced"
  - "Geotextile Separated"
  - "Geogrid + Geotextile"
- Pavement cross-section updates immediately.
- Metrics recalculate (if animation has run).

### 13.6 Scenarios

Pre-set scenario buttons:
- "Standard Traffic, Good Subgrade"
- "Heavy Traffic, Good Subgrade"
- "Light Traffic, Weak Subgrade"
- "Heavy Traffic, Weak Subgrade"
- "Wet/Poor Drainage Subgrade"

Each button sets traffic level, subgrade condition, and vehicle type automatically.

---

## 14. Layer Explorer (Detailed)

### 14.1 Interaction

- User clicks on any layer in the pavement cross-section.
- Layer highlights (e.g., lightens or glows).
- Information panel opens on right side (or below on mobile).
- Panel contains:

### 14.2 Panel Content

**Layer Name**
- Display name (e.g., "Bituminous Concrete")

**Material Composition**
- What it's made of (e.g., "Bitumen + coarse aggregate + filler")

**Typical Thickness**
- Standard range per IRC/MoRTH (e.g., "40–80 mm per IRC:37")
- Caveat: "Actual thickness determined by design; simulator shows illustrative dimensions"

**Primary Engineering Functions**
- Bullet list of layer purpose:
  - BC: Surface load transfer, weathering protection, skid resistance
  - DBM: Structural binder, load distribution, fatigue resistance
  - WMM: Granular load distribution, particle interlocking, rutting resistance
  - GSB: Load spread to subgrade, stress reduction, cost efficiency
  - Subgrade: Foundation, load bearing, deformation control

**Position in Pavement**
- Description (e.g., "Between DBM and Subgrade")
- Position number (e.g., "Layer 5 of 7")

**What Happens Under Loading**
- Qualitative description:
  - BC: Load transfers into layer; bitumen redistributes load laterally
  - DBM: Further load spread; bituminous matrix binds aggregate
  - WMM: Aggregate interlocks; load distributes through particle contact; particles move slightly laterally
  - GSB: Large lateral spread; stress reduces significantly; particles redistribute
  - Geogrid: Confines aggregate; reduces lateral movement; improves stress distribution
  - Geotextile: Maintains separation; prevents soil migration; allows water passage
  - Subgrade: Load induces stress; soil compresses; settlement occurs (magnitude depends on CBR)

**Why the Layer Matters**
- Pedagogical summary (2–3 sentences):
  - BC: Protects lower layers; first load contact; critical for durability
  - DBM: Binds pavement together; main structural layer
  - WMM: Cost-effective load distribution; reduces stress to weaker layers below
  - GSB: Prevents subgrade from excessive stress; allows thinner pavement if designed well
  - Subgrade: Everything rests on subgrade; if subgrade fails, pavement fails; geosynthetics may help weak subgrades

**"Learn More" Expandable Section**
- Additional context (1–2 paragraphs):
  - Material properties
  - Design considerations
  - Common failures
  - IRC reference (if applicable)

**Example Section for BC:**

"Bituminous Concrete (BC) is the top layer of flexible pavements. It consists of coarse aggregates bound together by bituminous binder (asphalt cement). BC must be hard enough to resist rutting from traffic yet flexible enough to distribute loads and accommodate minor pavement movement. The layer thickness typically ranges from 40–80 mm per IRC:37. BC also provides drainage if designed appropriately and seals the pavement from water ingress. Water infiltration is a primary cause of pavement distress; therefore, BC quality is critical. Learn More: The wearing surface experiences the highest stress concentrations and environmental exposure, making material quality and construction workmanship especially important."

### 14.3 Acceptance Criteria

- Clicking any layer opens panel (no errors).
- All information accurate to IRC:37 / MoRTH.
- No fabricated design values.
- References accurate.
- Panel closes cleanly.
- Mobile-responsive panel layout.

---

## 15. UI/UX Design Requirements

### 15.1 Visual Language

- **Aesthetic:** Professional engineering software / scientific visualization.
- **Not:** Childish graphics, generic SaaS dashboard, excessive gamification.
- **Feel:** Laboratory, technical, credible.

### 15.2 Color Palette

**Suggested (adjust as needed):**
- **Primary:** Dark gray or dark blue (professional, serious tone)
- **Secondary:** Light gray (UI elements)
- **Accent:** Engineering blue or green (CTAs, highlights)
- **Layer Colors:**
  - BC: Dark asphalt (near black)
  - DBM: Dark gray with texture
  - WMM: Light tan/beige (coarse aggregate)
  - GSB: Tan/brown (granular material)
  - Geogrid: Light gray/white with grid pattern
  - Geotextile: Light beige/gray (synthetic fabric)
  - Subgrade: Brown/tan (soil)
- **Stress/Load:** Red (high) → Yellow (medium) → Green (low)
- **Text:** Dark gray or black on light backgrounds; light gray on dark backgrounds
- **Borders/Dividers:** Subtle gray lines (no bright colors)

### 15.3 Typography

- **Headings:** Clean sans-serif (e.g., Inter, Roboto, Segoe UI)
- **Body:** Same sans-serif family
- **Code/Labels:** Monospace for technical terms where appropriate
- **Font Size:**
  - Page Title: 32px
  - Section Headings: 20–24px
  - Body Text: 14–16px
  - Small Labels/Captions: 12px
  - Accessible minimum: 14px for body text

### 15.4 Layout

- **Header:** Logo, project name, navigation tabs (Simulator, Learn, References)
- **Main Canvas:** Large pavement cross-section (central, prominent)
- **Control Panel:** Below or right of canvas (traffic, subgrade, geosynthetic config)
- **Layer Explorer:** Click-to-reveal panel (right or modal)
- **Metrics/Dashboard:** Below pavement cross-section or side panel
- **Animation Controls:** Below pavement cross-section (play, pause, reset, step)
- **Footer:** References, version, disclaimer

### 15.5 Information Hierarchy

1. **Primary:** Pavement cross-section (largest, center of screen)
2. **Secondary:** Control panel (below or right)
3. **Tertiary:** Metrics/animation controls
4. **Tertiary:** Layer information (on-demand, modal or sidebar)
5. **Quaternary:** Learn/references (separate tabs)

### 15.6 Component Design

**Buttons:**
- Clear labels (e.g., "Apply Wheel Load," "Reset," "Play")
- Consistent size and spacing
- Hover/active states for feedback
- Disabled state when not applicable

**Dropdowns/Selectors:**
- Clear labels above
- Visual indication of current selection
- Smooth transitions on change
- Mobile-friendly (native select on touch devices)

**Sliders (if included):**
- Clear labels and units
- Min/max values visible
- Current value displayed
- Smooth response to input

**Panels/Modals:**
- Close button or click-outside to close
- Clear title and content
- Scrollable if content overflows
- Shadow/backdrop for modality

**Tooltips:**
- Appear on hover (desktop) or tap (mobile)
- Concise text (1–2 sentences)
- Fade in/out smoothly
- Position intelligently (not offscreen)

### 15.7 Responsive Design

- **Desktop (1200px+):** Full side-by-side layout
- **Tablet (768–1199px):** Stacked or compact layout
- **Mobile (< 768px):** Single-column, stacked controls
- **Pavement cross-section:** Scales responsively (maintains aspect ratio)
- **Control panels:** Stack vertically or use tabs
- **Touch targets:** Minimum 44px × 44px for buttons/interactive elements

### 15.8 Dark Mode (Optional)

- Consider dark mode variant for nighttime/presentation use.
- Pavement layers remain visually distinct in dark mode.
- Text contrast meets WCAG AA standard (4.5:1 for normal text).

---

## 16. Accessibility Requirements

### 16.1 WCAG Compliance

- Target: **WCAG 2.1 Level AA**.
- Responsible accessibility review before production release.

### 16.2 Keyboard Navigation

- All interactive elements (buttons, dropdowns, layers) accessible via Tab key.
- Logical tab order (left-to-right, top-to-bottom).
- Enter/Space to activate buttons.
- Arrow keys to navigate dropdowns/sliders.
- Escape to close modals/panels.

### 16.3 Screen Reader Support

- Semantic HTML (`<button>`, `<label>`, `<form>` elements).
- Aria labels for SVG/canvas elements.
- Animation state announced (e.g., "Loading animation," "Animation complete").
- Layer information panel content readable by screen reader.
- Metrics panel labeled and described.

### 16.4 Color Contrast

- All text meets minimum 4.5:1 contrast ratio (WCAG AA).
- Color not sole means of conveying information (use patterns, labels).
- Stress bulb color gradient supplemented with intensity labels or patterns.

### 16.5 Reduced Motion

- Respect `prefers-reduced-motion` CSS media query.
- Animation disabled or replaced with static view.
- All information still accessible without animation.
- Frame-by-step button allows manual stepping through static states.

### 16.6 Text Alternatives

- All SVG graphics have text descriptions.
- Stress bulb diagram described in text (e.g., "Stress distribution with peak stress at load point, spreading downward and laterally with depth").
- Layer texture differences supported by text labels/colors, not appearance alone.

### 16.7 Focus Indicators

- Visible focus indicator on all interactive elements (default or custom).
- Focus indicator has minimum 3:1 contrast with adjacent elements.
- Focus order logical and intuitive.

### 16.8 Testing

- Test with keyboard navigation (no mouse).
- Test with screen reader (NVDA, JAWS, or browser built-in).
- Test with color blindness simulator (Coblis or similar).
- Test with reduced motion enabled.

---

## 17. Technical Architecture

### 17.1 Technology Stack

**Frontend Framework:**
- React 18+ with TypeScript

**Build/Dev:**
- Vite (fast builds, modern bundling)
- or Next.js (if SSG/SSR desired for Learn section)

**Styling:**
- Tailwind CSS (utility-first, responsive)
- optional: shadcn/ui (accessible component library)

**Visualization:**
- SVG (primary, for pavement cross-section, stress diagrams)
- Canvas (optional, for particle animation if needed for performance)
- Three.js (optional, only if 3D visualization added later)

**Animation:**
- Framer Motion (React-native animation library, smooth performance)
- or CSS animations for simpler effects

**State Management:**
- React Context + hooks (simple) or Zustand (if state becomes complex)
- Redux only if state grows significantly (probably not needed for MVP)

**Charts/Metrics:**
- Recharts (if additional metrics visualization required)
- or custom canvas for simple bars/gauges

**Form Handling:**
- React Hook Form (if forms become complex)
- or native HTML form handling initially

**Testing:**
- Vitest (unit tests)
- React Testing Library (component tests)
- Playwright or Cypress (e2e tests)

**Utilities:**
- Math.js (if mathematical calculations needed)
- Lodash (utility functions, use sparingly)

**Offline Support:**
- Service Worker (optional, for offline access; Phase 2+)

**Deployment:**
- Vercel (easy Next.js deployment) or Netlify (static hosting)
- or self-hosted on GitHub Pages

### 17.2 Do NOT Use

- jQuery (outdated)
- Three.js (unless 3D is genuinely needed)
- Babylon.js (overkill for 2D visualization)
- Expensive animation libraries (Animate.css, etc.)
- Heavy charting libraries (Chart.js for simple metrics)

---

## 18. Component Architecture

### 18.1 Proposed Component Structure

```
/src
  /components
    /pavement
      PavementCrossSection.tsx     (main cross-section SVG)
      Layer.tsx                    (individual layer component)
      PavementLayer.tsx            (wrapper for layer types)
      GeogridVisualization.tsx     (geogrid overlay)
      GeotextileVisualization.tsx  (geotextile layer)
    
    /truck
      Truck.tsx                    (truck/wheel SVG)
      WheelLoad.tsx                (wheel contact + load indicator)
    
    /animation
      LoadAnimation.tsx            (animation controller)
      StressBulb.tsx               (stress bulb SVG/gradient)
      ParticleAnimator.tsx         (aggregate particle movement)
      DeformationZone.tsx          (rut/settlement visualization)
    
    /controls
      ControlPanel.tsx             (main control panel)
      TrafficSelector.tsx          (light/medium/heavy/very heavy)
      SubgradeSelector.tsx         (good/moderate/weak/wet)
      GeosynthericConfig.tsx       (dropdown: none/geogrid/geotextile/both)
      VehicleSelector.tsx          (light/bus/truck/heavy)
      AnimationControls.tsx        (play/pause/reset/step)
    
    /comparison
      ComparisonView.tsx           (side-by-side pavement view)
      MetricsPanel.tsx             (relative indicators)
      ScenarioSelector.tsx         (pre-set scenario buttons)
    
    /explorer
      LayerExplorer.tsx            (click-to-learn panel)
      LayerInfo.tsx                (layer details component)
    
    /engineering
      EngineeringView.tsx          (scientific explanation panel)
      StressPath.tsx               (conceptual diagram)
    
    /learn
      LearnPanel.tsx               (main education content)
      LearnSection.tsx             (individual section)
      QuizSection.tsx              (knowledge check)
    
    /dashboard
      MetricGauge.tsx              (individual metric display)
      Dashboard.tsx                (all metrics together)
    
    /layout
      Header.tsx
      Navigation.tsx
      Footer.tsx
      MainLayout.tsx

  /engine
    simulationEngine.ts            (core simulation logic)
    loadPropagation.ts             (load transfer calculations)
    pavementModel.ts               (pavement configuration)
    geosyntheticModel.ts           (geogrid/geotextile effects)
    deformationModel.ts            (subgrade response)
    constants.ts                   (layer properties, defaults)
  
  /data
    pavementLayers.ts              (layer definitions)
    engineeringReferences.ts       (IRC, MoRTH references)
    scenarios.ts                   (pre-set scenario configs)
    quizData.ts                    (learn mode quiz questions)
  
  /types
    pavement.ts                    (TypeScript interfaces)
    simulation.ts                  (simulation result types)
    geosynthetic.ts                (geogrid/geotextile types)
    ui.ts                          (UI state types)
  
  /hooks
    useSimulation.ts               (custom hook for simulation engine)
    useAnimation.ts                (custom hook for animation state)
    useLayerExplorer.ts            (custom hook for layer selection)
  
  /store
    simulationStore.ts             (Zustand store, if used)
    uiStore.ts                     (UI state)
  
  /utils
    animationHelpers.ts            (animation utility functions)
    stressCalculations.ts          (stress distribution math)
    visualizationHelpers.ts        (SVG/Canvas helpers)
    formatting.ts                  (number formatting, labels)
  
  App.tsx
  index.tsx
  styles.css                       (Tailwind + custom CSS)

/public
  /images
    /icons
    /textures (layer textures, if pre-rendered)
    
/docs
  README.md
  ARCHITECTURE.md
  SIMULATION_MODEL.md
```

### 18.2 Component Responsibilities

**PavementCrossSection:** Renders SVG of all layers, layers are clickable (Layer Explorer).

**Layer:** Represents individual layer; on click, emits event to parent for Layer Explorer.

**GeogridVisualization:** Overlay SVG showing geogrid pattern; hides/shows based on config.

**GeotextileVisualization:** Overlay SVG showing geotextile fabric; hides/shows based on config.

**Truck:** SVG truck; positioned at load point; props control truck position and load state.

**LoadAnimation:** Parent component that controls animation sequence; orchestrates frame-by-frame display.

**StressBulb:** SVG with radial gradient showing stress distribution; props control bulb shape/intensity.

**ParticleAnimator:** Canvas or SVG showing particle movement; animated based on animation frame.

**ControlPanel:** Form with selectors; emits updates to parent (App or simulation store).

**ComparisonView:** Contains two PavementCrossSection components side-by-side; synchronized animation.

**LayerExplorer:** Modal/sidebar; displays layer information fetched from pavementLayers.ts.

**EngineeringView:** Text + simple diagrams explaining load transfer.

**LearnPanel:** Tab interface for Learn sections; Quiz component for knowledge check.

**Dashboard:** Grid of metric gauges; displays current simulation output.

---

## 19. Simulation Engine Architecture (Detailed)

### 19.1 Core Simulation Function

```typescript
// simulationEngine.ts

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
  // 1. Normalize inputs
  // 2. Calculate load magnitude
  // 3. Propagate load through layers
  // 4. Apply geogrid effects
  // 5. Apply geotextile effects
  // 6. Calculate subgrade response
  // 7. Generate animation frames
  // 8. Compile metrics
  // 9. Return output
}
```

### 19.2 Load Propagation

```typescript
// loadPropagation.ts

export function calculateLoadDistribution(
  initialLoad: number,
  pavement: PavementConfiguration,
  depth: number
): number {
  // Load reduces with depth
  // Spreads laterally through layers
  // Returns load intensity at depth
}

export function calculateStressBulb(
  load: number,
  spreadFactor: number,
  depth: number
): StressBulb {
  // Returns stress bulb shape (width, depth, intensity profile)
}

export function calculateAggregateMovement(
  load: number,
  confinement: number
): number {
  // Returns lateral aggregate movement magnitude (0–100, relative)
}
```

### 19.3 Geosynthetic Effects

```typescript
// geosyntheticModel.ts

export function applyGeogridEffect(
  baselineMovement: number,
  geogridConfig: GeogridConfig
): AggregateResponse {
  // Reduce lateral movement by confinement factor (30–50%)
  // Improve load distribution efficiency
  // Returns updated aggregate response
}

export function applyGeotextileEffect(
  soilMigrationRisk: number,
  subgradeCondition: string
): LayerInteraction {
  // Block soil migration (risk = 0)
  // Maintain layer separation
  // Returns updated layer interaction
}
```

### 19.4 Subgrade Response

```typescript
// deformationModel.ts

export function calculateSubgradeResponse(
  stressAtSubgrade: number,
  subgradeCondition: "good" | "moderate" | "weak" | "wet_poor_drainage",
  geosyntheticPresent: boolean
): SubgradeResponse {
  // Determine deformation based on stress and condition
  // Apply geosynthetic reduction factor if present
  // Returns settlement, rut risk, deformation index
}
```

### 19.5 Animation Sequence Generation

```typescript
// animationHelpers.ts

export function generateAnimationSequence(
  simulationOutput: SimulationOutput,
  durationSeconds: number
): AnimationFrame[] {
  // Break simulation output into animation frames
  // Each frame represents a moment in time (0–durationSeconds)
  // Frame contains: layer state, stress intensity, particle movement, visual properties
  // Returns array of frames
}

export interface AnimationFrame {
  time: number; // seconds elapsed
  layer: string; // which layer is "active" in this phase
  stressIntensity: number; // 0–100
  particles: ParticleState[]; // movement of aggregate particles
  stressBulb: StressBulbState; // shape and intensity of stress bulb
  deformationZone: DeformationState; // rut/settlement
  geogridEffect: GeogridAnimationState; // geogrid confinement visualization
  geotextileEffect: GeotextileAnimationState; // geotextile separation visualization
}
```

### 19.6 Metrics Calculation

```typescript
// Output from simulation includes:
export interface MetricsOutput {
  loadDistributionIndex: number; // 0–100, how well load spreads
  aggregateConfinement: number; // 0–100, with geogrid
  subgradeResponse: number; // 0–100, deformation tendency
  ruttingTendency: number; // 0–100, higher = more rutting
  layerSeparationQuality: "present" | "absent"; // geotextile effect
}
```

---

## 20. Data Model

### 20.1 Pavement Layers

```typescript
// pavementLayers.ts

export const pavementLayersData = {
  BC: {
    name: "Bituminous Concrete",
    material: "Bitumen + coarse aggregate + filler",
    typicalThickness: { min: 40, max: 80 }, // mm
    typicalThicknessUnit: "mm per IRC:37",
    functions: [
      "Surface load transfer",
      "Weathering protection",
      "Skid resistance",
      "Sealing pavement"
    ],
    position: "Top layer",
    responseToLoad: "Load transfers into layer; bitumen redistributes load laterally; aggregate particles interlock",
    importance: "Protects lower layers; first contact with traffic; critical for durability",
    learnMore: "Bituminous Concrete (BC) is the top layer of flexible pavements...",
    reference: "IRC:37"
  },
  DBM: {
    name: "Dense Bituminous Macadam",
    material: "Bitumen + well-graded aggregate",
    typicalThickness: { min: 75, max: 150 }, // mm
    typicalThicknessUnit: "mm per IRC:37",
    functions: [
      "Structural binder layer",
      "Load distribution",
      "Fatigue resistance"
    ],
    position: "Between BC and WMM",
    responseToLoad: "Further load spread; bituminous matrix binds aggregate; load reduced through friction and particle contact",
    importance: "Binds pavement together; main structural layer; resists fatigue cracking",
    learnMore: "...",
    reference: "IRC:37"
  },
  // ... WMM, GSB, Subgrade, Geogrid, Geotextile similarly defined
};

export interface LayerData {
  name: string;
  material: string;
  typicalThickness: { min: number; max: number };
  typicalThicknessUnit: string;
  functions: string[];
  position: string;
  responseToLoad: string;
  importance: string;
  learnMore: string;
  reference: string;
}
```

### 20.2 Engineering References

```typescript
// engineeringReferences.ts

export const referencesData = {
  IRC37: {
    title: "Guidelines for the Design of Flexible Pavements",
    version: "IRC:37-2018",
    type: "Indian Roads Congress",
    topics: [
      "Flexible pavement layer definitions",
      "Design procedures",
      "Material specifications"
    ],
    url: "https://www.irc.gov.in" // public info only
  },
  IRCSP59: {
    title: "Guidelines for Use of Geosynthetics in Road Pavements and Associated Works",
    version: "IRC:SP:59-2018",
    type: "Indian Roads Congress",
    topics: [
      "Geogrid applications",
      "Geotextile applications",
      "Design considerations"
    ]
  },
  // ... other standards
};
```

### 20.3 Scenarios

```typescript
// scenarios.ts

export const scenariosData = [
  {
    id: "standard_good",
    name: "Standard Traffic, Good Subgrade",
    trafficLevel: "medium",
    subgradeCondition: "good",
    vehicleType: "truck",
    description: "Typical condition; conventional pavement sufficient"
  },
  {
    id: "heavy_weak",
    name: "Heavy Traffic, Weak Subgrade",
    trafficLevel: "very_heavy",
    subgradeCondition: "weak",
    vehicleType: "heavy_truck",
    description: "Challenging condition; geosynthetics recommended"
  },
  // ... other scenarios
];
```

---

## 21. State Management

### 21.1 Using React Context + Hooks (Recommended for MVP)

```typescript
// SimulationContext.ts

export interface SimulationContextType {
  simulationInput: SimulationInput;
  simulationOutput: SimulationOutput | null;
  isAnimating: boolean;
  currentFrame: number;
  
  updateTrafficConfig: (config: Partial<TrafficConfiguration>) => void;
  updateSubgradeConfig: (config: Partial<SubgradeConfiguration>) => void;
  updatePavementConfig: (config: PavementConfiguration) => void;
  runSimulation: () => void;
  playAnimation: () => void;
  pauseAnimation: () => void;
  resetAnimation: () => void;
  stepFrameForward: () => void;
  stepFrameBackward: () => void;
}

export const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export function SimulationProvider({ children }: { children: ReactNode }) {
  // Manage state using useState, useCallback
  // Provide context to children
}
```

### 21.2 Using Zustand (If State Becomes Complex)

```typescript
// store/simulationStore.ts

import create from "zustand";

interface SimulationStore {
  // State
  simulationInput: SimulationInput;
  simulationOutput: SimulationOutput | null;
  isAnimating: boolean;
  currentFrame: number;
  
  // Actions
  updateTrafficConfig: (config: Partial<TrafficConfiguration>) => void;
  // ... other actions
}

export const useSimulationStore = create<SimulationStore>((set) => ({
  // Implementation
}));
```

**Recommendation:** Start with Context + hooks; migrate to Zustand if state becomes unwieldy.

---

## 22. Error Handling

### 22.1 Input Validation

- Validate all user inputs before simulation.
- Throw clear error messages if invalid (e.g., "Traffic level must be one of: light, medium, heavy, very_heavy").
- Prevent simulation if inputs invalid.

### 22.2 Animation Errors

- If animation fails to load, display: "Animation temporarily unavailable; static view enabled."
- Provide fallback: static stress diagram.

### 22.3 Rendering Errors

- If SVG fails to render (browser compatibility), fallback to canvas or HTML.
- Log errors to console for debugging.

### 22.4 User Feedback

- Spinner/loading indicator during simulation.
- Success confirmation: "Simulation complete."
- Error message: "Simulation failed: [reason]. Try again or contact support."

---

## 23. Testing Strategy

### 23.1 Unit Tests

- Test `simulationEngine.ts` functions with known inputs/outputs.
- Test load propagation calculations.
- Test geogrid/geotextile effect calculations.
- Test metric calculations.

### 23.2 Component Tests

- Test PavementCrossSection renders all layers.
- Test Layer Explorer opens/closes on click.
- Test ControlPanel updates state on selection change.
- Test animation controls (play/pause/reset).

### 23.3 Integration Tests

- Test full simulation flow (input → run → output → animate).
- Test comparison mode (both pavements synchronized).
- Test Learn mode quiz (questions display, scoring works).

### 23.4 e2e Tests

- Test user journey: open app → configure pavement → run simulation → compare → view Learn section.
- Test responsive layout on mobile/tablet.
- Test keyboard navigation (full accessibility).

### 23.5 Accessibility Testing

- Automated WCAG AA checks (axe-core, Pa11y).
- Manual testing with screen reader.
- Manual testing with keyboard navigation only.
- Manual testing with reduced motion enabled.

---

## 24. Performance Requirements

- **Page Load:** < 3 seconds (including assets).
- **Simulation Run:** < 500 ms (should feel instant).
- **Animation:** 60 FPS (smooth playback).
- **Bundle Size:** < 500 KB (gzipped).
- **Memory:** < 100 MB during typical session.

---

## 25. Security Considerations

### 25.1 Input Sanitization

- All user inputs sanitized (no XSS risk).
- No eval() or dynamic code execution.

### 25.2 No External API Dependency

- Simulator works offline (no API calls for core functionality).
- Optional: Analytics endpoint (user consent required, GDPR-compliant).

### 25.3 Content Security Policy

- CSP header set to strict (inline scripts, style nonces if used).

---

## 26. Engineering Accuracy Policy

### 26.1 Simulation vs. Design

**This simulator is an educational visualization tool, NOT a design calculator.**

- All simulation outputs are explicitly labeled "Conceptual," "Illustrative," or "Relative Indicator."
- Simulation values cannot be used to design actual pavements.
- For actual pavement design, refer to IRC:37 or engage a licensed engineer.

### 26.2 Reference Accuracy

- Every engineering claim references an official standard (IRC:37, IRC:SP:59, MoRTH, BIS).
- No fabricated design values, layer thicknesses, or material properties.
- If a claim cannot be verified, it is marked as "Illustrative" or omitted.

### 26.3 Geosynthetic Benefits

- Geosynthetic benefits presented conservatively and contextually.
- Example: "Geogrid may reduce rutting tendency under appropriate conditions" NOT "Geogrid reduces rutting by 50%."
- Overstatement is forbidden; credibility is paramount.

### 26.4 Future Design Model

- Architecture allows replacement of conceptual model with validated mechanistic-empirical equations later.
- Placeholder interfaces for future CBR-based design, ESA calculations, etc.
- Design module clearly separated from visualization module.

---

## 27. Reference / Source Management

### 27.1 Standards Compliance

- All design recommendations reference applicable Indian standards:
  - **IRC:37-2018:** Flexible pavement design methods
  - **IRC:SP:59-2018:** Geosynthetics in road pavements
  - **MoRTH Specifications:** Material and layer definitions
  - **BIS Standards:** Material properties (e.g., geogrid specifications)

### 27.2 References Sidebar

- "References" tab/section lists all cited standards.
- Each reference includes:
  - Document title
  - Version/year
  - Relevant sections
  - Brief description

### 27.3 Accuracy Disclaimer

- Footer: "Verify all engineering information against the latest applicable IRC/MoRTH standards before academic submission or professional use."

---

## 28. Development Phases

### Phase 0: Project Setup (Week 1)
- Initialize Vite + React + TypeScript project.
- Set up Tailwind CSS.
- Configure folder structure.
- Set up Git repository.
- Create CLAUDE.md and PRD.md.

### Phase 1: Static Pavement Cross-Section (Week 1–2)
- Create PavementCrossSection component (SVG).
- Define all layer types (BC, DBM, WMM, GSB, Subgrade).
- Render pavement with realistic proportions.
- Add layer labels and thicknesses.
- Test responsive layout.

### Phase 2: Layer Explorer (Week 2)
- Create LayerExplorer component.
- Implement Layer click detection.
- Create layer information panel.
- Populate with accurate data (IRC:37, MoRTH references).
- Test on mobile.

### Phase 3: Truck/Wheel Load Visualization (Week 2–3)
- Create Truck SVG component.
- Implement truck positioning (click/drag or preset).
- Add wheel contact patch visualization.
- Create "Apply Wheel Load" button.
- Test interaction.

### Phase 4: Load Propagation Animation (Week 3–4)
- Implement basic simulation engine (load propagation).
- Create LoadAnimation component.
- Implement animation sequence (frame-by-frame).
- Add animation controls (play/pause/reset/step).
- Integrate Framer Motion for smooth animation.

### Phase 5: Stress Bulb Visualization (Week 4)
- Create StressBulb SVG component.
- Implement color gradient (red → yellow → green).
- Integrate stress calculation into animation.
- Test stress bulb shape changes with configuration.

### Phase 6: Geogrid Reinforcement Visualization (Week 4–5)
- Create GeogridVisualization component.
- Implement geogrid texture/pattern.
- Create geogrid confinement effect (particle constraint visualization).
- Update simulation engine to apply geogrid effects.
- Create comparison (with/without geogrid).

### Phase 7: Geotextile Separation Visualization (Week 5)
- Create GeotextileVisualization component.
- Implement soil migration animation (with/without geotextile).
- Update simulation engine for geotextile effects.
- Create comparison (with/without geotextile).

### Phase 8: Control Panel (Week 5–6)
- Create ControlPanel component.
- Implement traffic selector (light/medium/heavy/very heavy).
- Implement subgrade selector (good/moderate/weak/wet).
- Implement geosynthetic config dropdown.
- Implement vehicle type selector.
- Connect controls to simulation.

### Phase 9: Comparison Mode (Week 6)
- Create ComparisonView component.
- Implement side-by-side pavement rendering.
- Synchronize animations.
- Create MetricsPanel (relative indicators).
- Test on desktop and tablet.

### Phase 10: Weak Subgrade Scenarios (Week 6–7)
- Update simulation engine for weak subgrade response.
- Visualize increased deformation for weak subgrade.
- Test comparison: good subgrade vs. weak subgrade.
- Test geosynthetic benefit in weak subgrade scenario.

### Phase 11: Engineering View (Week 7)
- Create EngineeringView component.
- Write clear, accurate explanations of load transfer.
- Create simplified diagrams (stress paths, layer interactions).
- Link to Learn section for deeper context.

### Phase 12: Learn/Education Mode (Week 7–8)
- Create LearnPanel component.
- Write sections: Basics, Layers, Load Distribution, Geogrids, Geotextiles, Subgrade, Standards.
- Create QuizSection with 10–15 questions.
- Implement quiz scoring and feedback.
- Link quiz questions to Learn content.

### Phase 13: Metrics Dashboard (Week 8)
- Create MetricGauge component.
- Implement metrics calculation in simulation engine.
- Display metrics in real-time during animation.
- Clearly label metrics as "Illustrative."

### Phase 14: Responsive Design & Mobile (Week 8–9)
- Test all components on mobile/tablet.
- Adjust layout for smaller screens.
- Optimize touch interaction.
- Test accessibility on mobile.

### Phase 15: Accessibility & Compliance (Week 9)
- Test keyboard navigation (full coverage).
- Test with screen reader (NVDA, JAWS).
- Test color contrast (axe-core).
- Test with reduced motion enabled.
- Fix any accessibility issues.
- Document WCAG compliance.

### Phase 16: Polish, Documentation, Deployment (Week 9–10)
- Refactor code for clarity.
- Add inline code comments.
- Create comprehensive README.
- Create ARCHITECTURE.md (technical guide).
- Create SIMULATION_MODEL.md (how simulation works).
- Set up deployment (Vercel or Netlify).
- Test full workflow on production.

---

## 29. MVP Scope (Minimum Viable Product)

The MVP should be demostrable and functional, covering the core educational objective.

**Included:**
- Flexible pavement cross-section (BC, DBM, WMM, GSB, Subgrade)
- Optional geogrid and geotextile layers
- Layer Explorer (click to learn)
- Truck/wheel load visualization
- Load propagation animation (conceptual stress spreading)
- Geogrid confinement visualization (aggregate movement reduction)
- Geotextile separation visualization (no soil mixing)
- Traffic level selector
- Subgrade condition selector
- Geosynthetic configuration selector
- Side-by-side comparison (conventional vs. reinforced)
- Animation controls (play/pause/reset)
- Relative metrics display
- Responsive UI (desktop/tablet)
- Accessibility basics (keyboard navigation, color contrast)

**Not Included in MVP:**
- Learn mode (Phase 2)
- Engineering View (Phase 2)
- Quiz (Phase 2)
- Advanced controls (layer thickness, traffic repetitions, moisture)
- Dark mode
- Mobile-specific UI optimization (Phase 2)
- Offline mode (PWA)
- 3D visualization
- Actual IRC design calculations

**MVP Timeline:** 6–8 weeks with focused development.

---

## 30. Phase 2 Enhancements

- Learn/Education mode with quiz.
- Engineering View with detailed explanations.
- Mobile-optimized UI.
- Advanced control panel (layer thickness, traffic repetitions, moisture).
- Weak subgrade and wet subgrade scenarios.
- Pre-set scenarios (buttons for common configurations).
- Reduced-motion accessibility mode.
- Enhanced metrics with additional indicators.

---

## 31. Phase 3 & Beyond (Future)

- **Mechanistic-Empirical Design Model:** Integrate validated IRC:37 layer thickness calculations.
- **CBR-Based Design:** Allow users to input subgrade CBR and see minimum pavement thickness.
- **Traffic Analysis:** Support MSA/ESA calculations based on traffic volume/composition.
- **Material Property Inputs:** Allow users to input elastic modulus, Poisson's ratio, etc. (advanced mode).
- **Fatigue & Rutting Criteria:** Implement design criteria from IRC:37.
- **Construction Quality Impact:** Model effect of compaction, material quality.
- **Climate Effects:** Seasonal temperature/moisture variations.
- **Cost Analysis:** Estimated pavement cost comparison.
- **Export/Report Generation:** Generate PDF reports with layer diagrams, calculations, recommendations.
- **Multi-Axle Load Configurations:** Bus/truck axle patterns.
- **3D Visualization:** Three-dimensional pavement section (optional).
- **Real-World Case Studies:** Pre-built projects with actual IRC design calculations.

---

## 32. Acceptance Criteria

### MVP Acceptance Criteria

1. **Pavement Rendering**
   - [ ] All five standard layers render without errors.
   - [ ] Layers have distinct visual textures/colors.
   - [ ] Layer labels are clear and accurate.
   - [ ] Layer thicknesses are proportionally realistic.
   - [ ] Geogrid and geotextile hide/show correctly based on configuration.

2. **Load Animation**
   - [ ] Truck/wheel renders on pavement surface.
   - [ ] "Apply Wheel Load" button triggers animation.
   - [ ] Animation progresses through layers sequentially.
   - [ ] Animation duration is 8–12 seconds (smooth playback).
   - [ ] Stress bulb expands appropriately.

3. **Geosynthetic Visualization**
   - [ ] Geogrid confinement effect visually evident (particle movement reduced).
   - [ ] Geotextile separation effect visually evident (no soil mixing).
   - [ ] Comparison mode shows clear difference (with vs. without geosynthetics).

4. **Control Panel**
   - [ ] Traffic selector changes load magnitude visually.
   - [ ] Subgrade selector changes deformation visualization.
   - [ ] Geosynthetic selector updates pavement configuration.
   - [ ] All controls function without errors.

5. **Layer Explorer**
   - [ ] Clicking any layer opens information panel.
   - [ ] Layer information is accurate (no fabricated values).
   - [ ] References are correct (IRC:37, MoRTH).
   - [ ] Panel closes cleanly.

6. **Comparison Mode**
   - [ ] Side-by-side layout renders on desktop.
   - [ ] Animations synchronized.
   - [ ] Metrics display with clear "Illustrative" labels.
   - [ ] Configuration changes affect both pavements logically.

7. **Accessibility**
   - [ ] All buttons/controls accessible via keyboard.
   - [ ] Text contrast >= 4.5:1 (WCAG AA).
   - [ ] Focus indicators visible.
   - [ ] Reduced-motion respected (animation disabled if requested).

8. **Responsive Design**
   - [ ] Layout adapts to tablet size (768px).
   - [ ] Touch targets are 44px × 44px minimum.
   - [ ] No horizontal scroll on any screen size.

9. **Engineering Accuracy**
   - [ ] No fabricated IRC clauses or design values.
   - [ ] Geosynthetic benefits presented conservatively.
   - [ ] All metrics labeled as "Illustrative/Relative."
   - [ ] Disclaimer present (simulator is NOT a design tool).

10. **Documentation**
    - [ ] PRD.md complete and accurate.
    - [ ] CLAUDE.md complete with development guidelines.
    - [ ] Code comments explain key functions.
    - [ ] README.md explains how to use simulator.

---

## 33. Definition of Done

A feature is "Done" when:

1. **Code**
   - Implemented per requirements.
   - Passes linting (ESLint).
   - Uses TypeScript strict mode.
   - Follows repository coding standards (see CLAUDE.md).

2. **Testing**
   - Unit tests written and passing (key functions).
   - Component tests passing (rendering, interaction).
   - No console errors/warnings in development.

3. **Accessibility**
   - Keyboard navigation works.
   - Color contrast verified.
   - Screen reader compatible (semantic HTML).
   - Reduced motion respected.

4. **Documentation**
   - Code comments explain complex logic.
   - Component props documented in JSDoc.
   - Any new data structures explained in comments.

5. **Review**
   - Code reviewed for correctness and style.
   - Engineering accuracy verified against references.
   - No hardcoded values (use constants/data files).

6. **Integration**
   - Feature integrates with existing codebase.
   - No breaking changes to other components.
   - State management consistent.

---

## 34. Recommended First Implementation Order

**For Claude Code / Development:**

1. **Phase 0 (Day 1):** Project setup, folder structure, TypeScript config, Tailwind CSS.

2. **Phase 1 (Days 2–4):** 
   - Create constants/data files (pavementLayers.ts, engineeringReferences.ts).
   - Build PavementCrossSection component (SVG layer rendering).
   - Build Layer component.
   - Test responsive layout.

3. **Phase 2 (Days 4–5):**
   - Build LayerExplorer component and layer information panel.
   - Test click interaction.

4. **Phase 3 (Days 5–6):**
   - Build basic Truck component.
   - Implement truck positioning.
   - Create "Apply Wheel Load" button.

5. **Phase 4 (Days 6–8):**
   - Implement core simulationEngine.ts (load propagation logic).
   - Build LoadAnimation component.
   - Implement animation controls.
   - Integrate Framer Motion.

6. **Phase 5 (Days 8–9):**
   - Build StressBulb component.
   - Update simulation to output stress bulb data.
   - Test stress bulb animation.

7. **Phase 6 (Days 9–10):**
   - Build GeogridVisualization component.
   - Update simulation engine for geogrid effects.
   - Build comparison (geogrid on/off).
   - Test visual difference.

8. **Phase 7 (Days 10–11):**
   - Build GeotextileVisualization component.
   - Update simulation engine for geotextile effects.
   - Test soil migration visualization.

9. **Phase 8 (Days 11–12):**
   - Build ControlPanel with all selectors.
   - Connect selectors to simulation state.
   - Test all control combinations.

10. **Phase 9 (Days 12–13):**
    - Build ComparisonView component.
    - Implement synchronized animation.
    - Create MetricsPanel with relative indicators.
    - Test side-by-side layout.

11. **Phase 10 (Days 13–14):**
    - Update simulation for weak subgrade scenarios.
    - Test deformation visualization changes.

12. **Phase 11 (Days 14–15):**
    - Build EngineeringView component.
    - Write clear explanations.
    - Create simple diagrams.

13. **Phase 12 (Days 15–17):**
    - Build LearnPanel and sections.
    - Create QuizSection.
    - Implement quiz scoring.

14. **Phase 13 (Days 17–18):**
    - Build MetricGauge component.
    - Integrate metrics into simulation output.
    - Display metrics in real-time.

15. **Phase 14 (Days 18–19):**
    - Test responsive layout on mobile/tablet.
    - Adjust UI as needed.

16. **Phase 15 (Days 19–21):**
    - Full accessibility testing and fixes.
    - Keyboard navigation, screen reader, color contrast.

17. **Phase 16 (Days 21–22):**
    - Code refactoring and cleanup.
    - Documentation (README, ARCHITECTURE, SIMULATION_MODEL).
    - Deploy to Vercel/Netlify.
    - Final testing.

**Total MVP Development Time:** ~22 days (3–4 weeks with 1–2 developers).

---

## 35. Success Metrics

**Post-Launch Evaluation:**

1. **User Engagement:**
   - Average session time > 5 minutes.
   - Users complete at least one Learn section.
   - Repeat visit rate > 20%.

2. **Educational Impact:**
   - Student survey: "I now understand flexible pavement layers" (target: >80% agree).
   - Student survey: "Geogrid function is clear" (target: >75% agree).
   - Quiz average score > 70%.

3. **Professional Adoption:**
   - Downloads/shares by practitioners (target: >100 in first month).
   - Feedback: credible, accurate, useful.
   - No complaints about misrepresentation.

4. **Technical Performance:**
   - Page load time < 3 sec (target achieved).
   - Simulation runs < 500 ms (target achieved).
   - Animation smooth (60 FPS) on desktop and tablet.
   - Accessibility: 95%+ WCAG AA compliance.

5. **Engineering Accuracy:**
   - Zero fabricated IRC/MoRTH values reported.
   - No claims of precision beyond conceptual model.
   - Disclaimer clearly visible.
   - Positive feedback from civil engineering educators.

---

## 36. Conclusion

GeoPave India is an ambitious, well-scoped educational simulator that bridges the gap between abstract pavement engineering concepts and visual, interactive learning. The simulator is designed to build professional credibility through accurate references, conservative geosynthetic claims, and clear distinction between educational visualization and design calculation.

The phased development approach, MVP scope, and detailed technical architecture provide a clear roadmap for implementation. With disciplined engineering accuracy and user-centered design, GeoPave India will become a valuable teaching and training tool for the civil engineering and geosynthetics communities in India and beyond.

---

**Document Version:** 1.0  
**Last Updated:** 2026-09-29  
**Status:** Ready for Development
