import React from 'react';
import { useSimStore } from '../store/useSimStore';

export const IntroPage: React.FC = () => {
  const setActiveTab = useSimStore((s) => s.setActiveTab);
  const setShowClassroomMode = useSimStore((s) => s.setShowClassroomMode);
  const setShowOnboardingTour = useSimStore((s) => s.setShowOnboardingTour);

  const handleLaunch = () => {
    setActiveTab('simulator');
  };

  const handleOpenPhysicalModel = () => {
    setActiveTab('physical-model');
  };

  const handleOpenCompare = () => {
    setActiveTab('compare');
  };

  return (
    <div className="min-h-full pb-16 text-slate-100">
      {/* ─── HERO HEADER SECTION ─── */}
      <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 px-4 sm:px-6 lg:px-12 py-12 lg:py-16">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-950/40 text-blue-300 text-xs font-semibold tracking-wide shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            CIVIL ENGINEERING CAPSTONE &amp; EXHIBITION PROJECT
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            GeoPave <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">India</span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Interactive Mechanistic Simulator &amp; Laboratory Scale Demonstrator for Geosynthetic-Reinforced Flexible Pavements in Indian Highway Systems.
          </p>

          {/* Standards Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-medium text-slate-400 pt-1">
            <span className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300">
              📘 IRC:37-2018 (Flexible Pavements)
            </span>
            <span className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300">
              📗 IRC:SP:59-2018 (Geosynthetics)
            </span>
            <span className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300">
              📙 MoRTH Section 700 (5th Rev)
            </span>
            <span className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300">
              📐 Physical Scale: 1:10 &amp; 1:5
            </span>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={handleLaunch}
              className="px-6 py-3.5 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-900/40 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
            >
              <span>🚀</span> Launch Interactive Simulator
            </button>
            <button
              onClick={handleOpenPhysicalModel}
              className="px-5 py-3.5 rounded-xl text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center gap-2"
            >
              <span>🧪</span> Physical Model &amp; Scale Specs
            </button>
            <button
              onClick={() => setShowClassroomMode(true)}
              className="px-4 py-3.5 rounded-xl text-sm font-semibold bg-purple-950/60 hover:bg-purple-900/60 text-purple-200 border border-purple-700/50 transition-all flex items-center gap-2"
            >
              <span>🎓</span> Classroom Mode
            </button>
            <button
              onClick={() => setShowOnboardingTour(true)}
              className="px-4 py-3.5 rounded-xl text-sm font-semibold bg-slate-850 hover:bg-slate-800 text-slate-300 border border-slate-750 transition-all flex items-center gap-2"
            >
              <span>💡</span> Guided Tour
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        {/* ─── SECTION 0: WHAT IS THIS PROJECT ABOUT? ─── */}
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-900/95 border border-blue-900/40 shadow-xl space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-700/50 text-blue-300 text-xs font-semibold">
              <span>💡</span> IN A NUTSHELL
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              What is GeoPave India About?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-4xl">
              <strong className="text-white font-semibold">GeoPave India</strong> is an interactive educational and laboratory demonstration project designed to showcase how modern <strong className="text-emerald-400 font-semibold">Geosynthetics (Geogrids &amp; Geotextiles)</strong> reinforce flexible asphalt roads over weak Indian soils—doubling pavement lifespan, preventing potholes and rutting, and cutting construction costs by up to 30%.
            </p>
          </div>

          {/* 3 Core Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <span className="text-lg">🧪</span> 1. The Physical Model
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                A 50 cm transparent acrylic demonstration chamber built at exact 1:10 and 1:5 scale with real gravel, soil, and geosynthetics so visitors and examiners can touch and see aggregate stone interlocking in person.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <span className="text-lg">💻</span> 2. The Digital Simulator
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                A real-time mechanistic simulation engine that computes dynamic stress dispersion, subgrade resilient modulus (M_R), vertical compressive strain (ε_v), and rutting lifespan for cars, buses, and heavy trucks.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span className="text-lg">📘</span> 3. Indian Highway Standards
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Directly calibrated with IRC:37-2018 (Flexible Pavements), IRC:SP:59-2018 (Geosynthetics in Roads), and MoRTH Section 700 to provide authentic engineering numbers for viva defense and project reports.
              </p>
            </div>
          </div>

          {/* Quick takeaway bar */}
          <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-blue-200">
            <div className="flex items-center gap-2">
              <span className="text-base">🎯</span>
              <span><strong>Core Question:</strong> Can we build stronger, cheaper, and greener roads over weak soils using geosynthetics instead of just laying more expensive asphalt?</span>
            </div>
            <button
              onClick={handleLaunch}
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold flex-shrink-0 transition"
            >
              See It in Action →
            </button>
          </div>
        </section>

        {/* ─── SECTION 1: WHY DO WE NEED THIS SIMULATOR? (THE PROBLEM STATEMENT) ─── */}
        <section className="space-y-6">
          <div className="text-center sm:text-left space-y-1">
            <div className="text-xs font-bold text-blue-400 uppercase tracking-widest">Problem Statement</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Why We Need This Simulator
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl">
              Indian flexible pavements face severe environmental and operational challenges that traditional textbooks fail to intuitively demonstrate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Problem Card 1 */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-900/30 hover:border-rose-700/50 transition space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-950/60 border border-rose-800/50 flex items-center justify-center text-xl">
                🌧️
              </div>
              <h3 className="text-base font-bold text-rose-300">
                1. Monsoon Subgrade Failure &amp; Pumping
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                During intense monsoon seasons, poor road drainage and high water tables saturate fine subgrade soils (CBR &lt; 4%). Dynamic wheel loads generate excess hydrostatic pore pressure, pumping clay and silt slurries upward into the granular sub-base (GSB), resulting in sudden structural shear failure.
              </p>
              <div className="pt-1 text-[11px] font-mono text-rose-400/90">
                • Solution: Non-woven Geotextile filter barrier
              </div>
            </div>

            {/* Problem Card 2 */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-amber-900/30 hover:border-amber-700/50 transition space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-800/50 flex items-center justify-center text-xl">
                🚚
              </div>
              <h3 className="text-base font-bold text-amber-300">
                2. Overloaded Commercial Traffic Rutting
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Indian freight corridors carry heavily overloaded commercial trucks exceeding the statutory 80 kN single axle design limit (often 100–120 kN). Unconfined granular base stones (WMM) experience irreversible lateral movement, creating surface longitudinal ruts greater than 20 mm.
              </p>
              <div className="pt-1 text-[11px] font-mono text-amber-400/90">
                • Solution: Biaxial/Triaxial Geogrid stone interlocking
              </div>
            </div>

            {/* Problem Card 3 */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-900/30 hover:border-cyan-700/50 transition space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-800/50 flex items-center justify-center text-xl">
                📐
              </div>
              <h3 className="text-base font-bold text-cyan-300">
                3. The Abstract Learning Barrier
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                IRC:37-2018 presents complex multi-layered elastic formulations (Odemark's MET, Boussinesq stress dispersion, resilient modulus $M_R$, and vertical compressive strain $\epsilon_v$). Without interactive visual models, students struggle to grasp the physical relationship between wheel loads and subgrade response.
              </p>
              <div className="pt-1 text-[11px] font-mono text-cyan-400/90">
                • Solution: Real-time 2D Simulator &amp; Physical Model
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: PROJECT REQUIREMENTS & METHODOLOGY ─── */}
        <section className="space-y-6">
          <div className="text-center sm:text-left space-y-1">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Project Requirements &amp; Scope</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Dual Methodology: Physical Model + Digital Twin
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl">
              This capstone project bridges tactile laboratory demonstration with mechanistic computer simulation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Box A: Physical Model Requirements */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📦</span>
                <div>
                  <h3 className="text-base font-bold text-white">1. Physical Acrylic Demonstration Box</h3>
                  <span className="text-xs text-slate-400">Laboratory apparatus for live exhibition testing</span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white">Dimensions:</strong> 50 cm Length × 25 cm Width × 45 cm Height built with 8 mm transparent acrylic sheets.
                  </div>
                </div>
                <div className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white">1:10 &amp; 1:5 Scale Verification:</strong> Allows testing real layer depths (BC 40–80mm, DBM 75–150mm, WMM 150–300mm, GSB 150–300mm) directly scaled into centimeter laboratory graduations.
                  </div>
                </div>
                <div className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white">Physical Inclusions:</strong> Authentic polypropylene Biaxial Geogrid (BX 3030 / BX 4040) placed at WMM/GSB interface and 200 GSM Non-Woven Geotextile placed above subgrade soil.
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleOpenPhysicalModel}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-emerald-950/50 hover:bg-emerald-900/50 text-emerald-300 border border-emerald-700/50 transition flex items-center justify-center gap-2"
                >
                  View Physical Scale Calculator &amp; Viva Q&amp;A →
                </button>
              </div>
            </div>

            {/* Box B: Digital Simulation Requirements */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">💻</span>
                <div>
                  <h3 className="text-base font-bold text-white">2. Deterministic Digital Engine</h3>
                  <span className="text-xs text-slate-400">IRC:37-2018 &amp; IRC:SP:59-2018 compliant engine</span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white">Mechanistic Strain Calculations:</strong> Calculates vertical compressive subgrade strain ($\epsilon_v$) and bituminous tensile strain ($\epsilon_t$) using Odemark's Method of Equivalent Thickness (MET).
                  </div>
                </div>
                <div className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white">Quantifiable Benefits:</strong> Computes Traffic Benefit Ratio (TBR, typically 1.5–2.5×) and allowable Base Course Reduction (BCR, 15–30% granular thickness savings).
                  </div>
                </div>
                <div className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white">Savings Estimator:</strong> Live economic calculations (₹ Lakhs saved per lane-km) and carbon offset metrics (tonnes of $CO_2$ avoided from reduced quarrying and tipper trips).
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleOpenCompare}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-cyan-950/50 hover:bg-cyan-900/50 text-cyan-300 border border-cyan-700/50 transition flex items-center justify-center gap-2"
                >
                  Explore Comparison Mode (Conventional vs Reinforced) →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: ENGINEERING THEORY & GOVERNING FORMULAS ─── */}
        <section className="space-y-6">
          <div className="text-center sm:text-left space-y-1">
            <div className="text-xs font-bold text-purple-400 uppercase tracking-widest">Engineering Theory</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Theoretical Foundation &amp; Governing Equations
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl">
              Authentic Indian Roads Congress design principles underpinning every calculation in this software.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Theory Card 1: Subgrade Resilient Modulus */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-400">IRC:37-2018 Clause 5.2</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-800/40">Subgrade Modulus</span>
              </div>
              <h3 className="text-sm font-bold text-white">
                Resilient Modulus ($M_R$) Formulation
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                The stiffness of subgrade soil under cyclical traffic loading is non-linear and governed by the California Bearing Ratio (CBR):
              </p>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 font-mono text-xs text-cyan-300 space-y-1.5">
                <div>For CBR ≤ 5%: &nbsp; <strong className="text-emerald-400">M_R = 10.0 × CBR</strong> (MPa)</div>
                <div>For CBR &gt; 5%: &nbsp; <strong className="text-emerald-400">M_R = 17.6 × CBR^0.64</strong> (MPa)</div>
              </div>
            </div>

            {/* Theory Card 2: Rutting Life Equation */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400">IRC:37-2018 Clause 5.3</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/40">Rutting Life</span>
              </div>
              <h3 className="text-sm font-bold text-white">
                Allowable Rutting Performance ($N_R$)
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Number of cumulative standard axles (Million Standard Axles, MSA) sustained before reaching a terminal 20 mm rut depth threshold (80% reliability):
              </p>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 font-mono text-xs text-emerald-300">
                N_R = 1.41 × 10^-8 × (1 / ε_v)^4.5337
              </div>
              <div className="text-[11px] text-slate-400">
                Where $\epsilon_v$ is vertical compressive strain at top of subgrade soil.
              </div>
            </div>

            {/* Theory Card 3: Geogrid Confinement & TBR */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400">IRC:SP:59-2018 Clause 4.1</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800/40">Confinement Mechanics</span>
              </div>
              <h3 className="text-sm font-bold text-white">
                Traffic Benefit Ratio (TBR) &amp; BCR
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Interlocking of aggregate ballast into geogrid apertures restricts lateral displacement, increasing the effective dispersion angle from 26° to 35°:
              </p>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 font-mono text-xs text-amber-300 space-y-1">
                <div>TBR = 1.0 + 1.25 × (η_conf / 100) × (10 / CBR)^0.45</div>
                <div>BCR = 15% to 30% allowable reduction in WMM base</div>
              </div>
            </div>

            {/* Theory Card 4: Geotextile Separation Criteria */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-400">MoRTH Cl. 702 &amp; IS 13162</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-800/40">Separation / Filtration</span>
              </div>
              <h3 className="text-sm font-bold text-white">
                Pore Filtration &amp; Anti-Pumping
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Non-woven continuous filament fabric placed at subgrade interface satisfying retention criteria while allowing unimpeded vertical water relief:
              </p>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 font-mono text-xs text-indigo-300 space-y-1">
                <div>Apparent Opening Size: O_90 ≤ 0.09 mm (90 micron)</div>
                <div>Permeability: k ≥ 2.5 × 10^-3 m/s | CBR Puncture ≥ 2.4 kN</div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: SIMULATOR CAPABILITIES SHOWCASE ─── */}
        <section className="space-y-6">
          <div className="text-center sm:text-left space-y-1">
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Simulator Features</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              What You Can Explore in the Simulator
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl">
              Interact with real pavement components, vector vehicle axle configurations, and real-time stress isobars.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-center space-y-2">
              <span className="text-3xl block">🚛</span>
              <h4 className="text-xs font-bold text-white">4 Vector Vehicles</h4>
              <p className="text-[11px] text-slate-400">Car (15 kN), Bus (65 kN), Truck (80 kN SADW), and Heavy Truck (100 kN).</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-center space-y-2">
              <span className="text-3xl block">🎛️</span>
              <h4 className="text-xs font-bold text-white">Dynamic Sliders</h4>
              <p className="text-[11px] text-slate-400">Adjust BC, DBM, WMM, GSB thicknesses &amp; subgrade CBR from 2% to 15%.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-center space-y-2">
              <span className="text-3xl block">🔬</span>
              <h4 className="text-xs font-bold text-white">Micro-View Zoom</h4>
              <p className="text-[11px] text-slate-400">Inspect aggregate stone interlocking inside apertures &amp; geotextile pore filtration.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-center space-y-2">
              <span className="text-3xl block">📄</span>
              <h4 className="text-xs font-bold text-white">Watermarked Report</h4>
              <p className="text-[11px] text-slate-400">Export engineering calculation sheets as PDF with statutory notice and JSON.</p>
            </div>
          </div>
        </section>

        {/* ─── BOTTOM CTA BANNER ─── */}
        <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-950/80 via-slate-900 to-indigo-950/80 border border-blue-800/40 text-center space-y-4 shadow-2xl relative overflow-hidden">
          <div className="max-w-xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Ready to Explore Pavement Mechanics?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Apply dynamic wheel loads, toggle geosynthetics, and visualize stress propagation in real time.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleLaunch}
              className="px-8 py-4 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-900/60 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <span>🚀</span> Enter Interactive Simulator Now
            </button>
            <button
              onClick={handleOpenPhysicalModel}
              className="px-6 py-4 rounded-xl text-sm font-semibold bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center gap-2"
            >
              <span>📐</span> Physical Scale Model Table
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default IntroPage;
