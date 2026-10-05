/**
 * LayerInfoPanel Component
 * Displays detailed information about a clicked pavement layer,
 * including authentic technical specifications of Geogrids & Geotextiles.
 */

import React, { useState } from 'react';
import { pavementLayersData } from '@data/pavementLayers';
import { useSimStore } from '../store/useSimStore';
import { GEOGRID_CATALOG, GEOTEXTILE_CATALOG } from '@data/geosyntheticSpecs';

const LAYER_ORDER = ['BC', 'DBM', 'WMM', 'GSB', 'subgrade', 'geogrid', 'geotextile'];

const layerIconMap: Record<string, string> = {
  BC: '🛣️',
  DBM: '🏗️',
  WMM: '🪨',
  GSB: '⛏️',
  subgrade: '🌍',
  geogrid: '🕸️',
  geotextile: '🧵',
};

const layerColorMap: Record<string, string> = {
  BC: 'border-slate-500 bg-slate-850',
  DBM: 'border-slate-600 bg-slate-850',
  WMM: 'border-amber-800/60 bg-amber-950/40',
  GSB: 'border-yellow-800/60 bg-yellow-950/40',
  subgrade: 'border-orange-800/60 bg-orange-950/40',
  geogrid: 'border-cyan-700/60 bg-cyan-950/40',
  geotextile: 'border-rose-700/60 bg-rose-950/40',
};

function FunctionBadge({ fn }: { fn: string }) {
  return (
    <span className="inline-block px-2 py-0.5 rounded-md text-[11px] font-medium bg-blue-900/40 text-blue-300 border border-blue-700/30 mr-1 mb-1">
      {fn}
    </span>
  );
}

export const LayerInfoPanel: React.FC = () => {
  const { selectedLayerId, setSelectedLayer, controls, setShowMicroView } = useSimStore((s) => ({
    selectedLayerId: s.ui.selectedLayerId,
    setSelectedLayer: s.setSelectedLayer,
    controls: s.controls,
    setShowMicroView: s.setShowMicroView,
  }));
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const showGeogrid = controls.pavementMode === 'geogrid' || controls.pavementMode === 'combined';
  const showGeotextile = controls.pavementMode === 'geotextile' || controls.pavementMode === 'combined';

  const visibleLayers = LAYER_ORDER.filter((id) => {
    if (id === 'geogrid') return showGeogrid;
    if (id === 'geotextile') return showGeotextile;
    return true;
  });

  const activeGrid = GEOGRID_CATALOG[controls.selectedGeogridType] || GEOGRID_CATALOG.bx3030;
  const activeTextile = GEOTEXTILE_CATALOG[controls.selectedGeotextileType] || GEOTEXTILE_CATALOG.nw200;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          Layer Details & Specs
        </h3>
        <span className="text-[11px] text-slate-500">Click to expand</span>
      </div>

      {visibleLayers.map((id) => {
        const layerKey = id === 'subgrade' ? 'subgrade' : id;
        const layer = pavementLayersData[layerKey];
        if (!layer) return null;

        const layerId = id.toUpperCase() === 'SUBGRADE' ? 'subgrade' : id.toUpperCase();
        const isSelected = selectedLayerId === layerId || selectedLayerId === id;
        const isExpanded = expandedId === id;
        const colorClass = layerColorMap[id] ?? 'border-slate-700 bg-slate-800';

        const isGrid = id === 'geogrid';
        const isTextile = id === 'geotextile';

        return (
          <div
            key={id}
            className={`rounded-xl border ${colorClass} transition-all duration-200 overflow-hidden ${
              isSelected ? 'ring-2 ring-blue-400' : ''
            }`}
          >
            {/* Header row */}
            <div
              className="flex items-center gap-2.5 p-2.5 cursor-pointer hover:brightness-110 transition"
              onClick={() => setSelectedLayer(isSelected ? null : layerId)}
            >
              <span className="text-lg">{layerIconMap[id] ?? '📦'}</span>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-white text-xs truncate">{layer.name}</div>
                <div className="text-[11px] text-slate-400 truncate">
                  {isGrid ? activeGrid.productName : isTextile ? activeTextile.productName : layer.material}
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedId(isExpanded ? null : id);
                }}
                className="text-slate-400 hover:text-white text-xs font-bold px-1.5 py-0.5 rounded bg-slate-800/80"
                aria-label="Toggle details"
              >
                {isExpanded ? '▲' : '▼'}
              </button>
            </div>

            {/* Expanded details */}
            {isExpanded && (
              <div className="px-3 pb-3 space-y-2.5 border-t border-white/10 text-xs">
                {/* Specific engineering values for Geogrid */}
                {isGrid && (
                  <div className="pt-2 space-y-1.5 bg-cyan-950/30 -mx-3 px-3 pb-2 border-b border-cyan-800/40">
                    <div className="font-bold text-cyan-300 text-[11px] flex justify-between">
                      <span>Technical Values (MoRTH Sec 704):</span>
                      <button
                        onClick={() => setShowMicroView('geogrid')}
                        className="text-cyan-400 underline hover:text-cyan-200"
                      >
                        Inspect Micro-View 🔍
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono text-slate-200">
                      <div>Tensile: <strong>{activeGrid.ultimateTensileStrengthMD} kN/m</strong></div>
                      <div>Aperture: <strong>{activeGrid.apertureSizeMD}×{activeGrid.apertureSizeCMD} mm</strong></div>
                      <div>At 2% Strain: <strong>{activeGrid.tensileStrength2Pct} kN/m</strong></div>
                      <div>Junction Eff: <strong>{activeGrid.junctionEfficiency}%</strong></div>
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Physical Model: {activeGrid.physicalModel.recommendedModelAggregate}
                    </div>
                  </div>
                )}

                {/* Specific engineering values for Geotextile */}
                {isTextile && (
                  <div className="pt-2 space-y-1.5 bg-rose-950/30 -mx-3 px-3 pb-2 border-b border-rose-800/40">
                    <div className="font-bold text-rose-300 text-[11px] flex justify-between">
                      <span>Technical Values (MoRTH Sec 702):</span>
                      <button
                        onClick={() => setShowMicroView('geotextile')}
                        className="text-rose-400 underline hover:text-rose-200"
                      >
                        Inspect Micro-View 🔍
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono text-slate-200">
                      <div>GSM: <strong>{activeTextile.massPerUnitAreaGSM} g/m²</strong></div>
                      <div>Puncture: <strong>{activeTextile.cbrPunctureResistance} N</strong></div>
                      <div>Grab Tensile: <strong>{activeTextile.grabTensileStrength} N</strong></div>
                      <div>AOS (O95): <strong>{activeTextile.apparentOpeningSizeAOS} µm</strong></div>
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Physical Model: {activeTextile.physicalModel.sampleDescription}
                    </div>
                  </div>
                )}

                <div className="pt-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Layer Functions
                  </div>
                  <div className="flex flex-wrap">
                    {layer.functions.map((fn) => (
                      <FunctionBadge key={fn} fn={fn} />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                    Response Under Wheel Load
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{layer.responseToLoad}</p>
                </div>

                <div className="text-[11px] text-slate-400 pt-1 border-t border-white/10 flex justify-between">
                  <span>Reference: <strong className="text-blue-400 font-mono">{layer.reference}</strong></span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LayerInfoPanel;
