/**
 * PhysicalModelTab Component
 * Comprehensive Laboratory & Exhibition Companion for Physical Flexible Pavement Models
 * Contains authentic technical values of Geogrids & Geotextiles (MoRTH Sec 700 / IRC:SP:59)
 * and scaling guide for college viva and project demonstrations.
 */

import React, { useState } from 'react';
import {
  GEOGRID_CATALOG,
  GEOTEXTILE_CATALOG,
  PHYSICAL_MODEL_GUIDE,
} from '@data/geosyntheticSpecs';
import { useSimStore } from '../store/useSimStore';

export const PhysicalModelTab: React.FC = () => {
  const [selectedGridKey, setSelectedGridKey] = useState<string>('bx3030');
  const [selectedTextileKey, setSelectedTextileKey] = useState<string>('nw200');
  const [modelScale, setModelScale] = useState<'1:10' | '1:5'>('1:10');

  const { setSelectedGeogridType, setSelectedGeotextileType } = useSimStore((s) => ({
    setSelectedGeogridType: s.setSelectedGeogridType,
    setSelectedGeotextileType: s.setSelectedGeotextileType,
  }));

  const grid = GEOGRID_CATALOG[selectedGridKey] || GEOGRID_CATALOG.bx3030;
  const textile = GEOTEXTILE_CATALOG[selectedTextileKey] || GEOTEXTILE_CATALOG.nw200;

  const scaleFactor = modelScale === '1:10' ? 0.1 : 0.2; // 1:10 = 0.1 cm per mm; 1:5 = 0.2 cm per mm

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-700/50 text-cyan-400 text-xs font-semibold">
          <span>🧪</span> College Lab & Exhibition Demonstration Guide
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Physical Model & Geosynthetic Specifications
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto">
          Authentic MoRTH Section 700 & IRC:SP:59-2018 technical values for your physical road cross-section model, scale conversions, and viva voce defense.
        </p>
      </div>

      {/* ── SECTION 1: PHYSICAL MODEL SCALING & BOX ARCHITECTURE ── */}
      <div className="rounded-2xl border border-slate-700/70 bg-slate-900/60 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>📦</span> Transparent Acrylic Model Box Architecture
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Dimensions: 50 cm (L) × 25 cm (W) × 45 cm (H) • Transparent front panel to observe stress bulbs and particle interlock
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 p-1 rounded-xl text-xs">
            <span className="text-slate-400 px-2 font-medium">Model Scale:</span>
            <button
              onClick={() => setModelScale('1:10')}
              className={`px-3 py-1 rounded-lg font-semibold transition ${
                modelScale === '1:10'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              1:10 Scale (1cm = 100mm)
            </button>
            <button
              onClick={() => setModelScale('1:5')}
              className={`px-3 py-1 rounded-lg font-semibold transition ${
                modelScale === '1:5'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              1:5 Scale (1cm = 50mm)
            </button>
          </div>
        </div>

        {/* Scaled Layers Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-800/80 text-slate-300 font-semibold border-b border-slate-700">
                <th className="py-2.5 px-3">Layer / Component</th>
                <th className="py-2.5 px-3">Prototype Field Depth</th>
                <th className="py-2.5 px-3 text-cyan-400">Physical Model Thickness</th>
                <th className="py-2.5 px-3">Model Material Recommendation</th>
                <th className="py-2.5 px-3">Role in Physical Demonstration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {PHYSICAL_MODEL_GUIDE.layerScaling.map((layer) => {
                const calculatedCm = (layer.fieldThicknessMm * scaleFactor).toFixed(1);
                return (
                  <tr
                    key={layer.layerId}
                    className={
                      layer.layerId === 'geogrid'
                        ? 'bg-cyan-950/20'
                        : layer.layerId === 'geotextile'
                        ? 'bg-rose-950/20'
                        : 'hover:bg-slate-800/40'
                    }
                  >
                    <td className="py-2.5 px-3 font-semibold flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: layer.color }}
                      />
                      <span>{layer.layerName}</span>
                    </td>
                    <td className="py-2.5 px-3 font-mono">{layer.fieldThicknessMm} mm</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-cyan-400">
                      {layer.layerId === 'geogrid' || layer.layerId === 'geotextile'
                        ? '1 Swatch Sheet'
                        : `${calculatedCm} cm`}
                    </td>
                    <td className="py-2.5 px-3 text-slate-300">{layer.modelMaterial}</td>
                    <td className="py-2.5 px-3 text-slate-400 italic">
                      {layer.layerId === 'geogrid'
                        ? 'Locks aggregate into grid apertures'
                        : layer.layerId === 'geotextile'
                        ? 'Stops clay migration into GSB'
                        : 'Simulates pavement structural layer'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── SECTION 2: TECHNICAL VALUES OF GEOGRIDS & GEOTEXTILES ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ─── GEOGRID SPECIFICATIONS CARD ─── */}
        <div className="rounded-2xl border border-cyan-800/40 bg-gradient-to-b from-slate-900 to-slate-950 p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-cyan-900/40 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🕸️</span>
              <div>
                <h3 className="text-base font-bold text-white">Geogrid Technical Data Sheet</h3>
                <p className="text-xs text-cyan-400 font-mono">MoRTH Section 704 / IRC:SP:59-2018</p>
              </div>
            </div>

            {/* Selector */}
            <select
              value={selectedGridKey}
              onChange={(e) => {
                setSelectedGridKey(e.target.value);
                setSelectedGeogridType(e.target.value);
              }}
              className="bg-slate-800 border border-cyan-700/60 text-white text-xs rounded-lg px-2.5 py-1.5 focus:ring-1 focus:ring-cyan-500"
            >
              {Object.values(GEOGRID_CATALOG).map((g) => (
                <option key={g.id} value={g.id}>
                  {g.structure} ({g.ultimateTensileStrengthMD} kN/m)
                </option>
              ))}
            </select>
          </div>

          <div className="text-xs font-semibold text-white bg-slate-800/60 p-2.5 rounded-lg border border-slate-700">
            Selected Grade: <span className="text-cyan-400">{grid.productName}</span>
          </div>

          {/* Properties Table */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Engineering Properties (Field Prototype)
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-800/50 p-2.5 rounded-lg border border-slate-700/50">
                <span className="text-slate-400 block text-[11px]">Ultimate Tensile Strength</span>
                <span className="font-mono font-bold text-white text-sm">
                  {grid.ultimateTensileStrengthMD} × {grid.ultimateTensileStrengthCMD} kN/m
                </span>
                <span className="text-[10px] text-slate-500 block">MD × CMD per ASTM D6637</span>
              </div>

              <div className="bg-slate-800/50 p-2.5 rounded-lg border border-slate-700/50">
                <span className="text-slate-400 block text-[11px]">Aperture Size (Opening)</span>
                <span className="font-mono font-bold text-white text-sm">
                  {grid.apertureSizeMD} × {grid.apertureSizeCMD} mm
                </span>
                <span className="text-[10px] text-slate-500 block">Square/Triangular Pitch</span>
              </div>

              <div className="bg-slate-800/50 p-2.5 rounded-lg border border-slate-700/50">
                <span className="text-slate-400 block text-[11px]">Tensile Strength at 2% Strain</span>
                <span className="font-mono font-bold text-cyan-400 text-sm">
                  {grid.tensileStrength2Pct} kN/m
                </span>
                <span className="text-[10px] text-slate-500 block">Serviceability load limit</span>
              </div>

              <div className="bg-slate-800/50 p-2.5 rounded-lg border border-slate-700/50">
                <span className="text-slate-400 block text-[11px]">Tensile Strength at 5% Strain</span>
                <span className="font-mono font-bold text-cyan-400 text-sm">
                  {grid.tensileStrength5Pct} kN/m
                </span>
                <span className="text-[10px] text-slate-500 block">Structural design limit</span>
              </div>

              <div className="bg-slate-800/50 p-2.5 rounded-lg border border-slate-700/50">
                <span className="text-slate-400 block text-[11px]">Junction Efficiency</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">
                  {grid.junctionEfficiency}%
                </span>
                <span className="text-[10px] text-slate-500 block">GRI-GG2 / ASTM D7737</span>
              </div>

              <div className="bg-slate-800/50 p-2.5 rounded-lg border border-slate-700/50">
                <span className="text-slate-400 block text-[11px]">Polymer & UV Protection</span>
                <span className="font-mono font-bold text-white text-sm">
                  {grid.polymerType}
                </span>
                <span className="text-[10px] text-slate-500 block">Carbon Black: {grid.carbonBlack}%</span>
              </div>
            </div>
          </div>

          {/* Test Standards Box */}
          <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-1 text-xs">
            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
              Test Standards & MoRTH Clause:
            </span>
            <div className="text-slate-400 space-y-0.5 text-[11px]">
              <div>• Tensile: <span className="text-slate-200">{grid.testStandards.tensile}</span></div>
              <div>• Junction Strength: <span className="text-slate-200">{grid.testStandards.junction}</span></div>
              <div>• MoRTH Compliance: <span className="text-cyan-400">{grid.morthClause}</span></div>
            </div>
          </div>

          {/* Physical Model Spec Box */}
          <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-800/50 space-y-1.5 text-xs">
            <div className="font-bold text-cyan-300 flex items-center gap-1.5">
              <span>🎯</span> Physical Model Laboratory Implementation:
            </div>
            <p className="text-slate-300 text-xs">
              <strong>Sample Type:</strong> {grid.physicalModel.scaleRatio}
            </p>
            <p className="text-slate-300 text-xs">
              <strong>Recommended Model Aggregate:</strong> {grid.physicalModel.recommendedModelAggregate}
            </p>
            <p className="text-cyan-200 text-xs italic bg-cyan-950/40 p-2 rounded border border-cyan-900/40">
              💡 {grid.physicalModel.demonstrationRole}
            </p>
          </div>
        </div>

        {/* ─── GEOTEXTILE SPECIFICATIONS CARD ─── */}
        <div className="rounded-2xl border border-rose-800/40 bg-gradient-to-b from-slate-900 to-slate-950 p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-rose-900/40 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🧵</span>
              <div>
                <h3 className="text-base font-bold text-white">Geotextile Technical Data Sheet</h3>
                <p className="text-xs text-rose-400 font-mono">MoRTH Section 702 / IS 13162</p>
              </div>
            </div>

            {/* Selector */}
            <select
              value={selectedTextileKey}
              onChange={(e) => {
                setSelectedTextileKey(e.target.value);
                setSelectedGeotextileType(e.target.value);
              }}
              className="bg-slate-800 border border-rose-700/60 text-white text-xs rounded-lg px-2.5 py-1.5 focus:ring-1 focus:ring-rose-500"
            >
              {Object.values(GEOTEXTILE_CATALOG).map((t) => (
                <option key={t.id} value={t.id}>
                  {t.manufacturingType.split(' ')[0]} ({t.massPerUnitAreaGSM} GSM)
                </option>
              ))}
            </select>
          </div>

          <div className="text-xs font-semibold text-white bg-slate-800/60 p-2.5 rounded-lg border border-slate-700">
            Selected Grade: <span className="text-rose-400">{textile.productName}</span>
          </div>

          {/* Properties Table */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Engineering Properties (Field Prototype)
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-800/50 p-2.5 rounded-lg border border-slate-700/50">
                <span className="text-slate-400 block text-[11px]">Mass Per Unit Area (GSM)</span>
                <span className="font-mono font-bold text-white text-sm">
                  {textile.massPerUnitAreaGSM} g/m²
                </span>
                <span className="text-[10px] text-slate-500 block">IS 13162 (Part 3) / ASTM D5261</span>
              </div>

              <div className="bg-slate-800/50 p-2.5 rounded-lg border border-slate-700/50">
                <span className="text-slate-400 block text-[11px]">CBR Puncture Resistance</span>
                <span className="font-mono font-bold text-white text-sm">
                  {textile.cbrPunctureResistance} N
                </span>
                <span className="text-[10px] text-slate-500 block">ASTM D6241 (Plunger method)</span>
              </div>

              <div className="bg-slate-800/50 p-2.5 rounded-lg border border-slate-700/50">
                <span className="text-slate-400 block text-[11px]">Grab Tensile Strength</span>
                <span className="font-mono font-bold text-rose-400 text-sm">
                  {textile.grabTensileStrength} N
                </span>
                <span className="text-[10px] text-slate-500 block">Elongation: &gt; {textile.elongationAtBreak}%</span>
              </div>

              <div className="bg-slate-800/50 p-2.5 rounded-lg border border-slate-700/50">
                <span className="text-slate-400 block text-[11px]">Trapezoidal Tear Strength</span>
                <span className="font-mono font-bold text-rose-400 text-sm">
                  {textile.trapezoidalTearStrength} N
                </span>
                <span className="text-[10px] text-slate-500 block">ASTM D4533 / IS 14293</span>
              </div>

              <div className="bg-slate-800/50 p-2.5 rounded-lg border border-slate-700/50">
                <span className="text-slate-400 block text-[11px]">Apparent Opening Size (AOS O95)</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">
                  {textile.apparentOpeningSizeAOS} µm
                </span>
                <span className="text-[10px] text-slate-500 block">Filters soil fines &lt; 0.11 mm</span>
              </div>

              <div className="bg-slate-800/50 p-2.5 rounded-lg border border-slate-700/50">
                <span className="text-slate-400 block text-[11px]">Water Permittivity & Flow</span>
                <span className="font-mono font-bold text-white text-sm">
                  {textile.waterFlowRate100mm} L/m²/s
                </span>
                <span className="text-[10px] text-slate-500 block">Permittivity: {textile.permittivity} s⁻¹</span>
              </div>
            </div>
          </div>

          {/* Test Standards Box */}
          <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-1 text-xs">
            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
              Test Standards & MoRTH Clause:
            </span>
            <div className="text-slate-400 space-y-0.5 text-[11px]">
              <div>• Classification: <span className="text-rose-400 font-semibold">{textile.morthClass}</span></div>
              <div>• Puncture & Grab: <span className="text-slate-200">{textile.testStandards.puncture}</span></div>
              <div>• MoRTH Compliance: <span className="text-slate-200">{textile.morthClause}</span></div>
            </div>
          </div>

          {/* Physical Model Spec Box */}
          <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-800/50 space-y-1.5 text-xs">
            <div className="font-bold text-rose-300 flex items-center gap-1.5">
              <span>🎯</span> Physical Model Laboratory Implementation:
            </div>
            <p className="text-slate-300 text-xs">
              <strong>Sample Type:</strong> {textile.physicalModel.sampleDescription}
            </p>
            <p className="text-slate-300 text-xs">
              <strong>Placement Location:</strong> At the boundary between Compacted Subgrade and Granular Sub-Base (GSB).
            </p>
            <p className="text-rose-200 text-xs italic bg-rose-950/40 p-2 rounded border border-rose-900/40">
              💡 {textile.physicalModel.demonstrationRole}
            </p>
          </div>
        </div>
      </div>

      {/* ── SECTION 3: PHYSICAL MODEL DEMONSTRATION WORKFLOWS ── */}
      <div className="rounded-2xl border border-slate-700/70 bg-slate-900/60 p-6 space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <span>🔬</span> How to Demonstrate Your Model in Viva & Exhibitions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PHYSICAL_MODEL_GUIDE.demonstrationPoints.map((demo, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 space-y-2 text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px]">
                  {idx + 1}
                </span>
                <span className="font-bold text-white text-sm">{demo.title}</span>
              </div>
              <div className="text-cyan-400 font-medium">Mechanism: {demo.mechanism}</div>
              <div className="text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                <span className="text-amber-400 font-semibold block mb-0.5">How to Demonstrate:</span>
                {demo.howToDemonstrate}
              </div>
              <div className="text-slate-400">
                <span className="text-slate-300 font-semibold">Engineering Value: </span>
                {demo.engineeringSignificance}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 4: VIVA VOCE DEFENSE QUESTIONS & ANSWERS ── */}
      <div className="rounded-2xl border border-amber-800/40 bg-amber-950/20 p-6 space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎓</span>
          <div>
            <h2 className="text-lg font-bold text-white">Examiner Viva Voce Defense Questions</h2>
            <p className="text-xs text-amber-400">
              Direct technical answers based on IRC:37-2018 & IRC:SP:59-2018 to defend your physical model
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {PHYSICAL_MODEL_GUIDE.vivaQuestions.map((viva, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-900/80 border border-amber-900/30 space-y-2 text-xs"
            >
              <div className="font-bold text-white text-sm flex items-start gap-2">
                <span className="text-amber-400 flex-shrink-0">Q{idx + 1}:</span>
                <span>{viva.question}</span>
              </div>
              <div className="text-slate-300 pl-6 border-l-2 border-amber-500/40 py-0.5">
                <span className="text-emerald-400 font-semibold block mb-0.5">Technical Answer:</span>
                {viva.answer}
              </div>
              <div className="text-right text-[11px] text-amber-500 font-mono">
                Clause Ref: {viva.reference}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Print / Export Report Button */}
      <div className="flex justify-center pt-2">
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-xl shadow-blue-950/50 transition active:scale-95"
        >
          <span>🖨️</span> Print / Export Model Technical Data Sheet (PDF)
        </button>
      </div>
    </div>
  );
};

export default PhysicalModelTab;
