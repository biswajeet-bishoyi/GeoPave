/**
 * LearnTab Component
 * Educational content: concepts, IRC references, quiz prompts
 */

import React, { useState } from 'react';

interface ConceptCard {
  title: string;
  icon: string;
  summary: string;
  detail: string;
  ref: string;
}

const CONCEPTS: ConceptCard[] = [
  {
    title: 'Flexible Pavement Structure',
    icon: '🏗️',
    summary: 'A multi-layered system transferring wheel loads to the subgrade through progressive stress reduction.',
    detail: `Flexible pavements consist of a surface course (BC/DBM), base course (WMM), sub-base (GSB), and subgrade. Each layer is engineered to reduce the stress passed to the layer below. The total pavement thickness is designed using IRC:37, with subgrade CBR and traffic (MSA) as primary inputs. The term "flexible" refers to the asphalt surface's ability to deflect slightly under load without cracking — unlike rigid (concrete) pavements.`,
    ref: 'IRC:37-2018 Section 3',
  },
  {
    title: 'Load Propagation & Stress Bulbs',
    icon: '⬇️',
    summary: 'Wheel loads spread outward and reduce intensity with depth, forming an inverted cone called a "stress bulb."',
    detail: `When a wheel load is applied to the pavement surface, stress distributes downward and laterally through layers. At any given depth, the loaded area is larger and the stress is lower than at the surface. This is conceptually described by Boussinesq's elastic half-space theory. In practice, IRC:37 uses layered elastic analysis for mechanistic-empirical design. The stress at the subgrade must remain below the soil's bearing capacity to prevent excessive settlement.`,
    ref: 'IRC:37-2018 Section 4',
  },
  {
    title: 'Geogrid Reinforcement',
    icon: '🕸️',
    summary: 'Polymer grids placed in granular layers to confine aggregate, reduce lateral movement, and improve load distribution.',
    detail: `Geogrids work through aggregate interlock: gravel particles fill and lock within the geogrid openings, preventing lateral shear movement under load. This confinement improves the modulus of the granular layer, spreading loads more effectively. Key factors for geogrid effectiveness: tensile strength, aperture size (should match aggregate particle size), stiffness (junction strength), and placement location. Per IRC:SP:59, geogrids are most effective at the interface between a stiff granular layer and a weaker layer below.`,
    ref: 'IRC:SP:59-2018 Section 5',
  },
  {
    title: 'Geotextile Separation',
    icon: '🧵',
    summary: 'Permeable synthetic fabric placed between subgrade and granular layer to prevent soil migration (pumping).',
    detail: `Without a separator, repeated vehicle loads cause fine subgrade soil to pump upward into the granular sub-base, contaminating and weakening it. Geotextiles prevent this mixing while allowing water drainage (in nonwoven fabrics). Geotextile selection requires filtration compatibility: the geotextile's pore size (O95 characteristic opening size) must be matched to the subgrade's grain size distribution to prevent fine particles from clogging the fabric. Per IRC:SP:59, woven geotextiles are suited for separation with lower filtration, while nonwoven serve drainage-critical applications.`,
    ref: 'IRC:SP:59-2018 Section 4',
  },
  {
    title: 'Subgrade Characterization (CBR)',
    icon: '🌍',
    summary: 'California Bearing Ratio (CBR) measures subgrade shear strength and determines required pavement thickness.',
    detail: `CBR is a penetration test that compares the load required to push a standard plunger into soil to the load required in a standard crushed rock material. A CBR of 5% means the soil requires 5% of the load a reference material needs — i.e., it is relatively weak. IRC:37 requires subgrade CBR to size the pavement: lower CBR = thicker pavement. Subgrade CBR ranges: <2% (very poor, e.g., black cotton soil), 2–3% (poor), 3–5% (moderate), 5–10% (good), >10% (excellent). Wet conditions reduce CBR significantly, emphasizing the importance of drainage design.`,
    ref: 'IRC:37-2018 Section 6.1, IS 2720 Part 16',
  },
  {
    title: 'When to Use Geosynthetics',
    icon: '🧭',
    summary: 'Geosynthetics are an economic intervention, not a universal solution — appropriate selection matters.',
    detail: `Geosynthetics are appropriate when: (1) Subgrade CBR < 3% — weak soils can't support pavement without reinforcement; (2) High water table or poor drainage conditions where soil pumping is likely; (3) High traffic loads where granular layer stability is critical; (4) Economic optimization — geosynthetics may allow reduced granular layer thickness. Geosynthetics are NOT needed for: Strong subgrades (CBR > 5%) with moderate traffic; well-drained conditions with proper compaction; situations where conventional thicker pavement is more economical. A cost-benefit comparison should always be performed per IRC:SP:59 guidelines.`,
    ref: 'IRC:SP:59-2018 Section 3',
  },
];

const IRC_REFS = [
  {
    code: 'IRC:37-2018',
    title: 'Guidelines for the Design of Flexible Pavements',
    desc: 'Primary document for flexible pavement thickness design in India. Uses mechanistic-empirical approach with CBR and MSA inputs.',
  },
  {
    code: 'IRC:SP:59-2018',
    title: 'Guidelines for Use of Geosynthetics in Road Pavements',
    desc: 'Design guidance for geogrids and geotextiles in pavement applications including reinforcement, separation, filtration, and drainage.',
  },
  {
    code: 'MoRTH Specifications',
    title: 'Specifications for Road and Bridge Works',
    desc: 'Defines material grades, layer thickness ranges, and construction standards for Indian road pavements (Sections 400–500).',
  },
  {
    code: 'BIS 15618',
    title: 'Specification for Geogrids for Soil Reinforcement',
    desc: 'Bureau of Indian Standards specification covering geogrid classification, tensile strength, and performance testing.',
  },
  {
    code: 'BIS 15635–15636',
    title: 'Specification for Geotextiles',
    desc: 'BIS standards for geotextile properties including strength, permeability, characteristic opening size, and durability.',
  },
];

export const LearnTab: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (title: string) =>
    setExpanded(expanded === title ? null : title);

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Hero */}
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-white mb-2">Learning Resources</h2>
        <p className="text-slate-400 text-sm">
          Deep-dive into the engineering concepts behind Indian flexible pavements and geosynthetics.
        </p>
      </div>

      {/* Concepts */}
      <div>
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-3">
          Key Concepts
        </h3>
        <div className="space-y-2">
          {CONCEPTS.map((concept) => (
            <div
              key={concept.title}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                expanded === concept.title
                  ? 'border-blue-500/50 bg-blue-950/20'
                  : 'border-slate-700 bg-slate-800/50 hover:bg-slate-800'
              }`}
            >
              <button
                className="w-full text-left flex items-center gap-3 p-4"
                onClick={() => toggle(concept.title)}
              >
                <span className="text-2xl">{concept.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white text-sm">{concept.title}</div>
                  <div className="text-xs text-slate-400 mt-0.5 leading-relaxed">{concept.summary}</div>
                </div>
                <span className={`text-slate-400 text-lg transition-transform ${expanded === concept.title ? 'rotate-90' : ''}`}>
                  ›
                </span>
              </button>
              {expanded === concept.title && (
                <div className="px-5 pb-4 space-y-3">
                  <p className="text-sm text-slate-300 leading-relaxed">{concept.detail}</p>
                  <div className="text-xs text-blue-400 font-mono bg-blue-950/40 border border-blue-700/30 rounded px-2 py-1 inline-block">
                    📖 {concept.ref}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* IRC References */}
      <div>
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-3">
          Engineering Standards & References
        </h3>
        <div className="space-y-2">
          {IRC_REFS.map((ref) => (
            <div key={ref.code} className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
              <div className="flex items-start gap-3">
                <div className="text-blue-400 font-mono text-sm font-bold flex-shrink-0 mt-0.5">
                  {ref.code}
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">{ref.title}</div>
                  <div className="text-slate-400 text-xs mt-1 leading-relaxed">{ref.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="rounded-xl border border-red-700/40 bg-red-950/20 p-4">
        <div className="flex items-start gap-3">
          <span className="text-red-400 text-xl">⚠️</span>
          <div>
            <div className="text-red-300 font-semibold text-sm mb-1">Important Disclaimer</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              GeoPave India is an <strong>educational visualization tool only</strong>. All simulation outputs are conceptual and illustrative.
              This tool does <strong>not</strong> perform IRC:37 design calculations, CBR-based thickness design, or validated mechanistic-empirical analysis.
              For actual pavement design, consult IRC:37 and engage a licensed pavement engineer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnTab;
