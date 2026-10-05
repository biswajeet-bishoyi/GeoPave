/**
 * MicroViewModal Component
 * Interactive visual demonstration of:
 * 1. Geogrid Aperture Aggregate Interlocking (Lateral Confinement)
 * 2. Geotextile Pores Anti-Pumping & Filtration (Separation)
 */

import React from 'react';
import { useSimStore } from '../store/useSimStore';
import { GEOGRID_CATALOG, GEOTEXTILE_CATALOG } from '@data/geosyntheticSpecs';

export const MicroViewModal: React.FC = () => {
  const { showMicroView, setShowMicroView, controls } = useSimStore((s) => ({
    showMicroView: s.ui.showMicroView,
    setShowMicroView: s.setShowMicroView,
    controls: s.controls,
  }));

  if (showMicroView === 'none') return null;

  const isGrid = showMicroView === 'geogrid';
  const grid = GEOGRID_CATALOG[controls.selectedGeogridType] || GEOGRID_CATALOG.bx3030;
  const textile = GEOTEXTILE_CATALOG[controls.selectedGeotextileType] || GEOTEXTILE_CATALOG.nw200;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{isGrid ? '🕸️' : '🧵'}</span>
            <div>
              <h3 className="font-bold text-white text-base">
                {isGrid ? 'Micro-View: Aggregate Interlocking Mechanism' : 'Micro-View: Anti-Pumping & Filtration'}
              </h3>
              <p className="text-xs text-slate-400">
                {isGrid
                  ? `${grid.productName} (${grid.apertureSizeMD}×${grid.apertureSizeCMD} mm aperture)`
                  : `${textile.productName} (${textile.apparentOpeningSizeAOS} µm AOS)`}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowMicroView('none')}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-sm font-bold transition"
          >
            ✕
          </button>
        </div>

        {/* SVG Microscopic Diagram */}
        <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 p-3 flex justify-center">
          {isGrid ? (
            /* Geogrid Interlocking SVG */
            <svg width="420" height="240" viewBox="0 0 420 240" className="select-none">
              <defs>
                <pattern id="gridRibs" width="80" height="80" patternUnits="userSpaceOnUse">
                  <rect x="0" y="36" width="80" height="8" fill="#38bdf8" />
                  <rect x="36" y="0" width="8" height="80" fill="#38bdf8" />
                  <circle cx="40" cy="40" r="7" fill="#0284c7" />
                </pattern>
                <radialGradient id="stoneGrad1" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#a8a29e" />
                  <stop offset="100%" stopColor="#57534e" />
                </radialGradient>
                <radialGradient id="stoneGrad2" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#d6d3d1" />
                  <stop offset="100%" stopColor="#78716c" />
                </radialGradient>
              </defs>

              {/* Background chamber */}
              <rect x="10" y="10" width="400" height="220" rx="8" fill="#1c1917" stroke="#292524" />

              {/* Upper aggregate particles above grid */}
              <polygon points="50,60 90,45 110,85 70,95" fill="url(#stoneGrad1)" stroke="#44403c" strokeWidth="2" />
              <polygon points="130,50 175,40 190,80 145,90" fill="url(#stoneGrad2)" stroke="#44403c" strokeWidth="2" />
              <polygon points="210,55 255,42 270,82 225,92" fill="url(#stoneGrad1)" stroke="#44403c" strokeWidth="2" />
              <polygon points="290,48 340,38 360,78 305,92" fill="url(#stoneGrad2)" stroke="#44403c" strokeWidth="2" />

              {/* GEOGRID LAYER (Ribs and Apertures) */}
              <rect x="20" y="115" width="380" height="12" rx="2" fill="#0284c7" />
              {/* Vertical Junction nodes */}
              {[60, 140, 220, 300, 380].map((x, i) => (
                <rect key={i} x={x - 4} y="95" width="8" height="50" rx="2" fill="#38bdf8" />
              ))}

              {/* Interlocking Aggregate Stones wedged deep in apertures */}
              {/* Stone 1 wedged in aperture 1 */}
              <polygon points="75,100 125,95 132,135 80,140" fill="url(#stoneGrad2)" stroke="#38bdf8" strokeWidth="2.5" />
              {/* Stone 2 wedged in aperture 2 */}
              <polygon points="155,102 205,98 212,138 160,142" fill="url(#stoneGrad1)" stroke="#38bdf8" strokeWidth="2.5" />
              {/* Stone 3 wedged in aperture 3 */}
              <polygon points="235,98 285,96 292,136 240,140" fill="url(#stoneGrad2)" stroke="#38bdf8" strokeWidth="2.5" />
              {/* Stone 4 wedged in aperture 4 */}
              <polygon points="315,102 365,99 372,139 320,143" fill="url(#stoneGrad1)" stroke="#38bdf8" strokeWidth="2.5" />

              {/* Lower aggregate support */}
              <polygon points="60,155 110,150 120,195 70,200" fill="url(#stoneGrad1)" stroke="#44403c" strokeWidth="1.5" />
              <polygon points="140,155 190,148 200,198 150,202" fill="url(#stoneGrad2)" stroke="#44403c" strokeWidth="1.5" />
              <polygon points="220,152 270,149 280,196 230,201" fill="url(#stoneGrad1)" stroke="#44403c" strokeWidth="1.5" />
              <polygon points="300,154 350,150 360,198 310,202" fill="url(#stoneGrad2)" stroke="#44403c" strokeWidth="1.5" />

              {/* Confinement Arrows (Forces holding stone) */}
              <g fill="#38bdf8">
                <path d="M 68 118 L 76 114 L 76 122 Z" />
                <path d="M 139 118 L 131 114 L 131 122 Z" />
                <text x="104" y="122" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Locked</text>
              </g>

              {/* Downward wheel load vector */}
              <g stroke="#ef4444" strokeWidth="2.5" fill="#ef4444">
                <line x1="210" y1="18" x2="210" y2="40" />
                <polygon points="210,48 204,38 216,38" />
                <text x="210" y="15" fill="#f87171" fontSize="10" textAnchor="middle" fontWeight="bold">Wheel Load (Vertical Stress)</text>
              </g>

              {/* Lateral Resistance Annotation */}
              <g fill="#38bdf8" fontSize="10">
                <text x="30" y="32" fontWeight="bold">Tensile Rib Confinement</text>
                <text x="30" y="222" fill="#94a3b8" fontSize="9">Aggregate D50 ≈ Aperture size (35mm) locks lateral spreading</text>
              </g>
            </svg>
          ) : (
            /* Geotextile Separation SVG */
            <svg width="420" height="240" viewBox="0 0 420 240" className="select-none">
              <defs>
                <linearGradient id="waterFlow" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* Background */}
              <rect x="10" y="10" width="400" height="220" rx="8" fill="#0f172a" stroke="#1e293b" />

              {/* Top: Clean GSB Aggregate Layer */}
              <rect x="10" y="10" width="400" height="95" fill="#292524" opacity="0.7" />
              <text x="20" y="30" fill="#cbd5e1" fontSize="11" fontWeight="bold">
                Clean Granular Sub-Base (GSB) — Permeable
              </text>
              {/* Coarse aggregate stones */}
              {[40, 90, 150, 210, 270, 330, 380].map((cx, i) => (
                <circle key={i} cx={cx} cy="65" r="14" fill="#78716c" stroke="#a8a29e" strokeWidth="1.5" />
              ))}
              {[65, 120, 180, 240, 300, 360].map((cx, i) => (
                <circle key={i} cx={cx} cy="85" r="10" fill="#57534e" stroke="#78716c" strokeWidth="1.5" />
              ))}

              {/* GEOTEXTILE BARRIER (Felt fabric with micro-pores) */}
              <rect x="10" y="105" width="400" height="20" fill="#f43f5e" opacity="0.9" />
              {/* Texture fibers on geotextile */}
              {[...Array(25)].map((_, i) => (
                <line
                  key={i}
                  x1={20 + i * 15}
                  y1={108 + (i % 3) * 3}
                  x2={30 + i * 15}
                  y2={122 - (i % 3) * 3}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  opacity="0.6"
                />
              ))}
              <text x="210" y="119" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                Non-Woven Geotextile Membrane ({textile.massPerUnitAreaGSM} GSM • O95 = {textile.apparentOpeningSizeAOS} µm)
              </text>

              {/* Bottom: Moist Subgrade Soil with Fine Silt/Clay Particles */}
              <rect x="10" y="125" width="400" height="105" fill="#451a03" opacity="0.6" />
              <text x="20" y="215" fill="#fdba74" fontSize="11" fontWeight="bold">
                Soft Clayey Subgrade Soil (Water Saturated)
              </text>

              {/* Fine subgrade particles blocked by geotextile */}
              {[...Array(35)].map((_, i) => (
                <circle
                  key={i}
                  cx={25 + (i * 11) % 370}
                  cy={132 + ((i * 7) % 65)}
                  r="3.5"
                  fill="#b45309"
                  stroke="#f97316"
                  strokeWidth="0.5"
                />
              ))}

              {/* Water droplet paths dissipating UPWARD through geotextile */}
              {[80, 160, 240, 320].map((x, i) => (
                <g key={i} stroke="#38bdf8" strokeWidth="2" strokeDasharray="3,3">
                  <line x1={x} y1="165" x2={x} y2="45" />
                  <polygon points={`${x},40 ${x - 4},48 ${x + 4},48`} fill="#38bdf8" />
                </g>
              ))}

              <text x="350" y="165" fill="#38bdf8" fontSize="10" fontWeight="bold">
                Pore Water Escapes ↑
              </text>
              <text x="350" y="180" fill="#f87171" fontSize="10" fontWeight="bold">
                Soil Fines Blocked ✕
              </text>
            </svg>
          )}
        </div>

        {/* Technical Explanations */}
        <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/60 text-xs space-y-2">
          <div className="font-bold text-white flex items-center gap-1.5">
            <span>💡</span> Physical Working Principle:
          </div>
          <p className="text-slate-300 leading-relaxed">
            {isGrid
              ? `The ${grid.structure} geogrid ribs engage with the angular crushed aggregates of the WMM/GSB layer. Under vertical wheel loading, stone particles attempt to roll and spread laterally. The aperture rib perimeter acts as a rigid boundary, locking aggregate dilation and creating a stiffened composite platform.`
              : `Under cyclic traffic loading over wet/saturated subgrade, pore water pressure causes mud slurry pumping. The needle-punched non-woven geotextile acts as an engineered filter: its apparent opening size (AOS O95 = ${textile.apparentOpeningSizeAOS} µm) traps silt and clay particles while permitting water to dissipate, preventing sub-base contamination.`}
          </p>
          <div className="flex justify-between items-center text-[11px] pt-1 border-t border-slate-700/40 text-slate-400">
            <span>MoRTH Standard: <strong className="text-cyan-400">{isGrid ? grid.morthClause : textile.morthClause}</strong></span>
            <span>Junction / Puncture: <strong className="text-emerald-400">{isGrid ? `${grid.junctionEfficiency}% efficiency` : `${textile.cbrPunctureResistance} N CBR`}</strong></span>
          </div>
        </div>

        {/* Close Button */}
        <div className="flex justify-end">
          <button
            onClick={() => setShowMicroView('none')}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition"
          >
            Close Micro-View
          </button>
        </div>
      </div>
    </div>
  );
};

export default MicroViewModal;
