/**
 * MetricsPanel Component
 * Displays IRC:37-2018 Mechanistic-Empirical calculations,
 * IRC:SP:59-2018 Geosynthetic benefits (TBR & BCR),
 * and Material/Cost Savings for highway construction.
 */

import React from 'react';
import { useSimStore } from '../store/useSimStore';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  subtext: string;
  color?: string;
  icon?: string;
}

function MetricCard({ label, value, unit, subtext, color = 'text-white', icon }: MetricCardProps) {
  return (
    <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60 space-y-0.5">
      <div className="flex items-center justify-between text-[11px] text-slate-400">
        <span>{label}</span>
        {icon && <span>{icon}</span>}
      </div>
      <div className="flex items-baseline gap-1">
        <span className={`text-base font-extrabold font-mono ${color}`}>{value}</span>
        {unit && <span className="text-[11px] text-slate-400 font-medium">{unit}</span>}
      </div>
      <div className="text-[10px] text-slate-500 truncate">{subtext}</div>
    </div>
  );
}

export const MetricsPanel: React.FC = () => {
  const result = useSimStore((s) => s.result);
  const animState = useSimStore((s) => s.ui.animationState);
  const setShowMicroView = useSimStore((s) => s.setShowMicroView);
  const setActiveTab = useSimStore((s) => s.setActiveTab);
  const setShowExportModal = useSimStore((s) => s.setShowExportModal);

  if (animState === 'idle' || !result) {
    return (
      <div className="h-full flex flex-col items-center justify-center py-8 text-center">
        <div className="text-4xl mb-3">📊</div>
        <p className="text-slate-300 text-xs font-semibold">Engineered IRC Results</p>
        <p className="text-slate-500 text-[11px] mt-1">
          Click "Apply Dual Wheel Axle Load" to calculate subgrade strains, TBR, and savings.
        </p>
      </div>
    );
  }

  const { engineeringMetrics } = result;
  const em = engineeringMetrics;

  const hasGeogrid = em.trafficBenefitRatioTBR > 1.0;
  const hasGeotextile = result.layerInteraction.separationQuality === 'present';

  return (
    <div className="space-y-4">
      {/* ── Heading ── */}
      <div className="flex items-center justify-between">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
          IRC:37 & SP:59 Analysis
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-700/40 font-mono">
          80% Reliability
        </span>
      </div>

      {/* ── Key Engineering Parameters Grid ── */}
      <div className="grid grid-cols-2 gap-2">
        <MetricCard
          label="Subgrade Modulus (MR)"
          value={em.resilientModulusMR}
          unit="MPa"
          subtext={`From CBR ${em.subgradeCBR}% (IRC:37 Eq 5.1)`}
          color="text-cyan-400"
          icon="🧱"
        />

        <MetricCard
          label="Vertical Subgrade Strain"
          value={em.verticalSubgradeStrain}
          unit="με"
          subtext={em.verticalSubgradeStrain < 600 ? 'Safe (< 650 με)' : 'High Strain Tendency'}
          color={em.verticalSubgradeStrain < 600 ? 'text-emerald-400' : 'text-amber-400'}
          icon="📐"
        />

        <MetricCard
          label="IRC:37 Rutting Life"
          value={em.ruttingLifeMSA}
          unit="MSA"
          subtext="Million Standard Axles to 20mm rut"
          color="text-blue-400"
          icon="⏳"
        />

        <MetricCard
          label="Traffic Benefit (TBR)"
          value={hasGeogrid ? `${em.trafficBenefitRatioTBR}×` : '1.0×'}
          unit={hasGeogrid ? 'Life Ext.' : 'Baseline'}
          subtext={hasGeogrid ? 'Pavement Life Multiplier' : 'No Geogrid Benefit'}
          color={hasGeogrid ? 'text-emerald-400' : 'text-slate-400'}
          icon="🚀"
        />
      </div>

      {/* ── Geosynthetic Reinforcement Benefits (IRC:SP:59-2018) ── */}
      {hasGeogrid && (
        <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-950/40 to-blue-950/40 border border-cyan-800/40 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-cyan-300 flex items-center gap-1.5">
              <span>🕸️</span> Base Course Reduction (BCR)
            </span>
            <span className="font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-700/40 text-[11px]">
              {em.baseCourseReductionBCR}% Saved
            </span>
          </div>

          <div className="text-xs text-slate-300">
            Allowable granular base thickness reduction:{' '}
            <strong className="text-white font-mono">{em.allowableGranularReductionMm} mm</strong>{' '}
            while maintaining equal rutting performance.
          </div>

          {/* Micro-view quick button */}
          <button
            onClick={() => setShowMicroView('geogrid')}
            className="w-full py-1.5 rounded-lg text-xs font-semibold bg-cyan-700/40 hover:bg-cyan-600/50 border border-cyan-600/50 text-cyan-200 transition flex items-center justify-center gap-1.5"
          >
            <span>🔍</span> Inspect Aggregate Interlock Micro-View
          </button>
        </div>
      )}

      {/* ── Geotextile Anti-Pumping Status ── */}
      {hasGeotextile && (
        <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-800/40 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-rose-300 flex items-center gap-1.5">
              <span>🧵</span> Geotextile Separation Active
            </span>
            <span className="text-[10px] text-emerald-400 font-mono">0% Soil Migration</span>
          </div>
          <div className="text-[11px] text-slate-300">
            Filters subgrade fines (&lt; {em.geotextileSpecs?.apparentOpeningSizeAOS ?? 110} µm) and stops mud pumping into GSB layer.
          </div>
          <button
            onClick={() => setShowMicroView('geotextile')}
            className="w-full py-1.5 rounded-lg text-xs font-semibold bg-rose-700/40 hover:bg-rose-600/50 border border-rose-600/50 text-rose-200 transition flex items-center justify-center gap-1.5"
          >
            <span>🔍</span> Inspect Anti-Pumping Micro-View
          </button>
        </div>
      )}

      {/* ── Material & Cost Savings (2-Lane Carriageway per km) ── */}
      {hasGeogrid && em.materialSavings.aggregateSavedPerKm > 0 && (
        <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/70 space-y-2 text-xs">
          <div className="font-bold text-white flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span>💰</span> Material & Cost Savings (per km)
            </span>
            <span className="text-[10px] text-slate-400">10m Width</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Aggregate Saved:</span>
              <span className="font-bold font-mono text-cyan-400 text-xs">
                {em.materialSavings.aggregateSavedPerKm} m³/km
              </span>
            </div>
            <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Dumper Truck Trips:</span>
              <span className="font-bold font-mono text-amber-400 text-xs">
                {em.materialSavings.truckTripsSavedPerKm} Trips avoided
              </span>
            </div>
            <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Net Project Cost Saved:</span>
              <span className="font-bold font-mono text-emerald-400 text-xs">
                ₹ {em.materialSavings.costSavedPerKmLakhs} Lakhs/km
              </span>
            </div>
            <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Carbon Emission Saved:</span>
              <span className="font-bold font-mono text-emerald-300 text-xs">
                {em.materialSavings.co2SavedPerKmTonnes} T CO₂ eq
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── Action Buttons: Physical Model & Export Report ── */}
      <div className="space-y-2 pt-1">
        <button
          onClick={() => setShowExportModal(true)}
          className="w-full py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white transition flex items-center justify-center gap-1.5 shadow-md shadow-blue-900/40"
        >
          <span>📄</span> Export Watermarked Report (PDF / JSON)
        </button>

        <button
          onClick={() => setActiveTab('physical-model')}
          className="text-xs text-cyan-400 hover:text-cyan-300 underline underline-offset-4 flex items-center justify-center gap-1 mx-auto"
        >
          <span>📋</span> View Technical Data Sheet & Viva Guide →
        </button>
      </div>
    </div>
  );
};

export default MetricsPanel;
