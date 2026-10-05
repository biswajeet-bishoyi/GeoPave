/**
 * ReportExportModal Component
 * Conforming to CLAUDE.md Section 36 & ANTIGRAVITY.md Section 3.1:
 * - Prominent "ILLUSTRATIVE ONLY — NOT FOR STRUCTURAL DESIGN" watermark
 * - Deterministic Run Hash & Timestamp for simulation reproducibility
 * - Comprehensive IRC:37-2018 & IRC:SP:59-2018 engineering breakdown
 * - Print / PDF formatting and raw JSON export
 */

import React from 'react';
import { useSimStore } from '../store/useSimStore';

export const ReportExportModal: React.FC = () => {
  const { showExportModal, setShowExportModal, controls, result } = useSimStore((s) => ({
    showExportModal: s.ui.showExportModal,
    setShowExportModal: s.setShowExportModal,
    controls: s.controls,
    result: s.result,
  }));

  if (!showExportModal) return null;

  const em = result?.engineeringMetrics;
  const th = controls.layerThicknesses;
  const timestamp = new Date().toISOString();
  // Deterministic simulation run hash (based on inputs)
  const runHash = `GP-${Math.abs(
    (controls.cbr * 31 + th.bc * 17 + th.dbm * 13 + th.wmm * 7 + th.gsb) * 997
  )
    .toString(16)
    .toUpperCase()}-${controls.pavementMode.substring(0, 3).toUpperCase()}`;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const exportData = {
      project: 'GeoPave India',
      disclaimer: 'ILLUSTRATIVE ONLY - NOT FOR STRUCTURAL DESIGN',
      runHash,
      timestamp,
      modelEngineVersion: '0.2.0',
      standardsCited: ['IRC:37-2018', 'IRC:SP:59-2018', 'MoRTH Section 700'],
      inputConfiguration: {
        pavementMode: controls.pavementMode,
        trafficLevel: controls.trafficLevel,
        vehicleType: controls.vehicleType,
        subgradeCBR: controls.cbr,
        layerThicknessesMm: controls.layerThicknesses,
        selectedGeogrid: controls.selectedGeogridType,
        selectedGeotextile: controls.selectedGeotextileType,
      },
      simulationResults: result
        ? {
            resilientModulusMR_MPa: em?.resilientModulusMR,
            verticalSubgradeStrain_ue: em?.verticalSubgradeStrain,
            bituminousTensileStrain_ue: em?.tensileStrainBituminous,
            ruttingLife_MSA: em?.ruttingLifeMSA,
            trafficBenefitRatio_TBR: em?.trafficBenefitRatioTBR,
            baseCourseReduction_BCR_pct: em?.baseCourseReductionBCR,
            granularReductionMm: em?.allowableGranularReductionMm,
            materialSavings: em?.materialSavings,
          }
        : null,
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GeoPave-Simulation-${runHash}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden relative">

        {/* ── MANDATORY WATERMARK OVERLAY (ANTIGRAVITY.MD §3.1) ── */}
        <div className="absolute inset-0 pointer-events-none select-none flex items-center justify-center overflow-hidden z-20 opacity-[0.06]">
          <span className="text-6xl sm:text-8xl font-black text-rose-500 transform -rotate-45 whitespace-nowrap">
            ILLUSTRATIVE ONLY • NOT FOR DESIGN
          </span>
        </div>

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80 flex-shrink-0 z-30">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📋</span>
            <div>
              <h2 className="text-base font-bold text-white">Engineering Simulation Report</h2>
              <p className="text-xs text-slate-400 font-mono">
                Run Hash: <span className="text-cyan-400 font-semibold">{runHash}</span> • Engine v0.2.0
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowExportModal(false)}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-sm font-bold transition"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Report Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-200 text-xs z-10 print:text-black">

          {/* Prominent Statutory Warning Banner */}
          <div className="p-3.5 rounded-xl bg-amber-950/50 border border-amber-600/50 text-amber-200 space-y-1">
            <div className="font-bold flex items-center gap-2 text-sm text-amber-300">
              <span>⚠️</span> STATUTORY NOTICE: EDUCATIONAL LABORATORY USE ONLY
            </div>
            <p className="leading-relaxed text-[11px] text-amber-200/90">
              This report is generated for conceptual evaluation and laboratory education only. It does <strong>NOT</strong> constitute a stamped structural design, construction contract specification, or certified engineering analysis. For real-world highway projects, engage a certified civil engineer and follow IRC:37-2018, IRC:SP:59-2018, and MoRTH specifications.
            </p>
          </div>

          {/* Section 1: Pavement Cross-Section Structure */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-1">
              1. Pavement Cross-Section Structure
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono">
              <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700">
                <span className="text-slate-400 block text-[10px]">BC Wearing Course</span>
                <span className="font-bold text-white text-sm">{th.bc} mm</span>
              </div>
              <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700">
                <span className="text-slate-400 block text-[10px]">DBM Binder Course</span>
                <span className="font-bold text-white text-sm">{th.dbm} mm</span>
              </div>
              <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700">
                <span className="text-slate-400 block text-[10px]">WMM Granular Base</span>
                <span className="font-bold text-white text-sm">{th.wmm} mm</span>
              </div>
              <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700">
                <span className="text-slate-400 block text-[10px]">GSB Sub-Base</span>
                <span className="font-bold text-white text-sm">{th.gsb} mm</span>
              </div>
            </div>
            <div className="flex justify-between items-center bg-slate-950 p-2 rounded-lg text-[11px] border border-slate-800">
              <span>Total Granular Thickness: <strong className="text-cyan-400">{th.wmm + th.gsb} mm</strong></span>
              <span>Total Pavement Depth: <strong className="text-white">{th.bc + th.dbm + th.wmm + th.gsb} mm</strong></span>
            </div>
          </div>

          {/* Section 2: Subgrade Soil Properties */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-1">
              2. Subgrade Soil Foundation
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700">
                <span className="text-slate-400 block text-[10px]">Subgrade CBR</span>
                <span className="font-mono font-bold text-white text-sm">{controls.cbr}%</span>
              </div>
              <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700">
                <span className="text-slate-400 block text-[10px]">Resilient Modulus (MR)</span>
                <span className="font-mono font-bold text-cyan-400 text-sm">{em?.resilientModulusMR ?? 40} MPa</span>
                <span className="text-[9px] text-slate-500 block">IRC:37 Eq 5.1/5.2</span>
              </div>
              <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700">
                <span className="text-slate-400 block text-[10px]">Design Axle Load</span>
                <span className="font-mono font-bold text-amber-400 text-sm">
                  {controls.vehicleType === 'heavy_truck' ? '100 kN Axle' : '80 kN Standard SADW'}
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: IRC Mechanistic-Empirical Results */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-1">
              3. Structural Strains & Rutting Life Predictions
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700">
                <span className="text-slate-400 block text-[10px]">Subgrade Strain (εv)</span>
                <span className="font-mono font-bold text-cyan-300 text-sm">
                  {em?.verticalSubgradeStrain ?? 420} με
                </span>
                <span className="text-[9px] text-slate-500 block">Vertical compressive</span>
              </div>
              <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700">
                <span className="text-slate-400 block text-[10px]">Bituminous Strain (εt)</span>
                <span className="font-mono font-bold text-white text-sm">
                  {em?.tensileStrainBituminous ?? 180} με
                </span>
                <span className="text-[9px] text-slate-500 block">Bottom tensile</span>
              </div>
              <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700">
                <span className="text-slate-400 block text-[10px]">Predicted Rutting Life</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">
                  {em?.ruttingLifeMSA ?? 25} MSA
                </span>
                <span className="text-[9px] text-slate-500 block">Million Std Axles (IRC:37)</span>
              </div>
              <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700">
                <span className="text-slate-400 block text-[10px]">Subgrade Deflection</span>
                <span className="font-mono font-bold text-white text-sm">
                  {em?.subgradeVerticalDeflectionMm ?? 0.85} mm
                </span>
              </div>
            </div>
          </div>

          {/* Section 4: Geosynthetic Benefits & Material Savings */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-1">
              4. Geosynthetic Performance & Material Savings (IRC:SP:59-2018)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              <div className="bg-cyan-950/30 p-2.5 rounded-lg border border-cyan-800/40">
                <span className="text-cyan-300 block text-[10px]">Traffic Benefit Ratio</span>
                <span className="font-mono font-bold text-cyan-400 text-sm">
                  {em?.trafficBenefitRatioTBR ?? 1.0}×
                </span>
                <span className="text-[9px] text-slate-400 block">Life extension multiplier</span>
              </div>
              <div className="bg-cyan-950/30 p-2.5 rounded-lg border border-cyan-800/40">
                <span className="text-cyan-300 block text-[10px]">Base Course Reduction</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">
                  {em?.baseCourseReductionBCR ?? 0}%
                </span>
                <span className="text-[9px] text-slate-400 block">
                  ({em?.allowableGranularReductionMm ?? 0} mm granular saved)
                </span>
              </div>
              <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700">
                <span className="text-slate-400 block text-[10px]">Net Cost Saved</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">
                  ₹ {em?.materialSavings.costSavedPerKmLakhs ?? 0} L/km
                </span>
                <span className="text-[9px] text-slate-400 block">10m wide road section</span>
              </div>
              <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700">
                <span className="text-slate-400 block text-[10px]">Carbon Emission Offset</span>
                <span className="font-mono font-bold text-emerald-300 text-sm">
                  {em?.materialSavings.co2SavedPerKmTonnes ?? 0} T CO₂
                </span>
                <span className="text-[9px] text-slate-400 block">Diesel & hauling avoided</span>
              </div>
            </div>
          </div>

          {/* Section 5: Standards & Methodologies Cited */}
          <div className="text-[11px] text-slate-400 bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
            <span className="font-semibold text-slate-300 block">Standard Methodologies Cited:</span>
            <div>• IRC:37-2018 Guidelines for the Design of Flexible Pavements (Clauses 5.1, 5.2, 5.4.2)</div>
            <div>• IRC:SP:59-2018 Guidelines for Use of Geosynthetics in Road Pavements (Clauses 4.2, 5.3, 6.1)</div>
            <div>• MoRTH Specifications for Road and Bridge Works (5th Rev, Section 700: Geotextiles & Geogrids)</div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between flex-shrink-0 z-30">
          <div className="text-[11px] text-slate-500 font-mono hidden sm:block">
            Timestamp: {timestamp.substring(0, 19).replace('T', ' ')} UTC
          </div>
          <div className="flex gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={handleDownloadJSON}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition border border-slate-700"
            >
              📥 Download Data (JSON)
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition shadow-lg shadow-blue-900/50"
            >
              🖨️ Print / Save as PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportExportModal;
