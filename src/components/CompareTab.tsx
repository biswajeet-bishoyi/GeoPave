/**
 * CompareTab Component
 * Side-by-side comparison: Conventional vs. Geosynthetic-Reinforced Pavement
 * Features IRC:37-2018 strain/life predictions & IRC:SP:59-2018 TBR/BCR benefits.
 */

import React, { useState } from 'react';
import { runSimulation } from '@engine/simulationEngine';
import { pavementLayersData } from '@data/pavementLayers';
import type { SubgradeCondition, TrafficLevel, VehicleType } from '@gptypes/pavement';
import type { SimulationOutput } from '@gptypes/simulation';

const SUBGRADE_OPTS: { value: SubgradeCondition; label: string; cbr: number }[] = [
  { value: 'wet_poor_drainage', label: 'Wet / Poor (CBR 2%)', cbr: 2 },
  { value: 'weak', label: 'Weak Subgrade (CBR 3%)', cbr: 3 },
  { value: 'moderate', label: 'Moderate Subgrade (CBR 5%)', cbr: 5 },
  { value: 'good', label: 'Good Subgrade (CBR 8%)', cbr: 8 },
];

const TRAFFIC_OPTS: { value: TrafficLevel; label: string }[] = [
  { value: 'light', label: 'Light Traffic (< 10 MSA)' },
  { value: 'medium', label: 'Medium Traffic (10–30 MSA)' },
  { value: 'heavy', label: 'Heavy Traffic (30–80 MSA)' },
  { value: 'very_heavy', label: 'Very Heavy Traffic (> 80 MSA)' },
];

interface CompareResult {
  conventional: SimulationOutput;
  reinforced: SimulationOutput;
}

function MetricRow({
  label,
  convValue,
  reinValue,
  unit = '',
  invert = false,
}: {
  label: string;
  convValue: number;
  reinValue: number;
  unit?: string;
  invert?: boolean;
}) {
  const improvement = invert ? convValue - reinValue : reinValue - convValue;
  const pctChange = convValue > 0 ? Math.round((improvement / convValue) * 100) : 0;
  const improved = improvement > 0;

  return (
    <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-2 items-center py-2 border-b border-slate-700/50 last:border-0 text-xs">
      <span className="text-slate-300 font-medium">{label}</span>
      <span className="font-mono text-center text-slate-400">
        {convValue} {unit}
      </span>
      <span className="font-mono text-center text-cyan-300 font-bold">
        {reinValue} {unit}
      </span>
      <span
        className={`font-semibold text-center ${
          improved ? 'text-emerald-400' : improvement < 0 ? 'text-rose-400' : 'text-slate-500'
        }`}
      >
        {improved ? `+${pctChange}%` : improvement < 0 ? `-${Math.abs(pctChange)}%` : '—'}
      </span>
    </div>
  );
}

export const CompareTab: React.FC = () => {
  const [subgrade, setSubgrade] = useState<SubgradeCondition>('weak');
  const [traffic, setTraffic] = useState<TrafficLevel>('heavy');
  const [vehicle, setVehicle] = useState<VehicleType>('truck');
  const [result, setResult] = useState<CompareResult | null>(null);

  const selectedSubgradeObj = SUBGRADE_OPTS.find((s) => s.value === subgrade) || SUBGRADE_OPTS[1];

  const runComparison = () => {
    const layers = Object.values(pavementLayersData);
    const trafficConfig = { level: traffic, vehicleType: vehicle };
    const subgradeConfig = { condition: subgrade, cbr: selectedSubgradeObj.cbr };

    const conventional = runSimulation({
      pavementConfig: { layers, geogrid: false, geotextile: false },
      trafficConfig,
      subgradeConfig,
    });
    const reinforced = runSimulation({
      pavementConfig: { layers, geogrid: true, geotextile: true },
      trafficConfig,
      subgradeConfig,
    });

    setResult({ conventional, reinforced });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      <div className="text-center py-2">
        <h2 className="text-2xl font-bold text-white mb-1">Pavement Comparison Laboratory</h2>
        <p className="text-slate-400 text-sm">
          Quantifying the structural and economic benefits of Geosynthetics according to IRC:37-2018 and IRC:SP:59-2018.
        </p>
      </div>

      {/* Controls */}
      <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5 space-y-4">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
          Road Scenario Parameters
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs text-slate-400 block mb-1.5 font-medium">Subgrade Soil Condition</label>
            <select
              value={subgrade}
              onChange={(e) => setSubgrade(e.target.value as SubgradeCondition)}
              className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {SUBGRADE_OPTS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1.5 font-medium">Traffic Demand Level</label>
            <select
              value={traffic}
              onChange={(e) => setTraffic(e.target.value as TrafficLevel)}
              className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {TRAFFIC_OPTS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1.5 font-medium">Design Wheel Loading</label>
            <select
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value as VehicleType)}
              className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="truck">Commercial Truck (80 kN Legal Axle)</option>
              <option value="heavy_truck">Overloaded Axle (100 kN Axle)</option>
              <option value="bus">Standard 2-Axle Bus</option>
              <option value="light_vehicle">Light Vehicle</option>
            </select>
          </div>
        </div>

        <button
          onClick={runComparison}
          className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg shadow-blue-900/40 active:scale-95"
        >
          ⚡ Run Comprehensive IRC Comparison
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-5 animate-in fade-in duration-300">
          {/* Header Row */}
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-2 px-4 py-2 bg-slate-800/80 rounded-xl border border-slate-700 text-xs font-semibold">
            <div className="text-slate-400">Engineering Parameter</div>
            <div className="text-center text-slate-300">Conventional</div>
            <div className="text-center text-cyan-400">Geosynthetic Reinforced</div>
            <div className="text-center text-emerald-400">Improvement</div>
          </div>

          {/* Table 1: IRC:37 Mechanistic-Empirical Metrics */}
          <div className="rounded-2xl border border-slate-700/80 bg-slate-900/60 p-4 space-y-1">
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span>📐</span> IRC:37-2018 Structural & Strain Analysis
            </div>
            <MetricRow
              label="Vertical Subgrade Compressive Strain (εv)"
              convValue={result.conventional.engineeringMetrics.verticalSubgradeStrain}
              reinValue={result.reinforced.engineeringMetrics.verticalSubgradeStrain}
              unit="με"
              invert={true}
            />
            <MetricRow
              label="Bituminous Tensile Strain (εt)"
              convValue={result.conventional.engineeringMetrics.tensileStrainBituminous}
              reinValue={result.reinforced.engineeringMetrics.tensileStrainBituminous}
              unit="με"
              invert={true}
            />
            <MetricRow
              label="IRC:37 Predicted Rutting Life (NR)"
              convValue={result.conventional.engineeringMetrics.ruttingLifeMSA}
              reinValue={result.reinforced.engineeringMetrics.ruttingLifeMSA}
              unit="MSA"
              invert={false}
            />
            <MetricRow
              label="Subgrade Surface Deflection"
              convValue={result.conventional.engineeringMetrics.subgradeVerticalDeflectionMm}
              reinValue={result.reinforced.engineeringMetrics.subgradeVerticalDeflectionMm}
              unit="mm"
              invert={true}
            />
            <MetricRow
              label="Composite Granular Modulus (Eeff)"
              convValue={result.conventional.engineeringMetrics.compositeModulusEffective}
              reinValue={result.reinforced.engineeringMetrics.compositeModulusEffective}
              unit="MPa"
              invert={false}
            />
          </div>

          {/* Table 2: IRC:SP:59 Geosynthetic Quantification */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-cyan-800/50 bg-cyan-950/20 p-4 space-y-3">
              <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                <span>🚀</span> Traffic Benefit Ratio (TBR)
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white font-mono">
                  {result.reinforced.engineeringMetrics.trafficBenefitRatioTBR}×
                </span>
                <span className="text-xs text-cyan-400">Design Life Extension</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Per IRC:SP:59-2018 Clause 6.1, the geogrid-reinforced pavement carries{' '}
                <strong className="text-cyan-300">{result.reinforced.engineeringMetrics.trafficBenefitRatioTBR} times</strong>{' '}
                more cumulative standard axles before reaching the terminal 20 mm rutting limit.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-800/50 bg-emerald-950/20 p-4 space-y-3">
              <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                <span>📉</span> Base Course Reduction (BCR)
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white font-mono">
                  {result.reinforced.engineeringMetrics.baseCourseReductionBCR}%
                </span>
                <span className="text-xs text-emerald-400">
                  ({result.reinforced.engineeringMetrics.allowableGranularReductionMm} mm Granular Saved)
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Allowable reduction of{' '}
                <strong className="text-emerald-300">{result.reinforced.engineeringMetrics.allowableGranularReductionMm} mm</strong>{' '}
                in granular base (WMM/GSB) while maintaining equal structural service life as the thick unreinforced pavement.
              </p>
            </div>
          </div>

          {/* Table 3: Economic & Environmental Savings (1 km 2-lane road) */}
          <div className="rounded-2xl border border-slate-700 bg-slate-800/60 p-5 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span>💰</span> Material, Cost & Carbon Savings (per lane-km)
              </span>
              <span className="text-[11px] text-slate-400 font-mono">10m Formation Width</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-700/60">
                <span className="text-slate-400 block text-[11px]">Aggregate Saved</span>
                <span className="text-base font-extrabold text-cyan-400 font-mono">
                  {result.reinforced.engineeringMetrics.materialSavings.aggregateSavedPerKm} m³/km
                </span>
                <span className="text-[10px] text-slate-500 block">WMM/GSB crushed stone</span>
              </div>

              <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-700/60">
                <span className="text-slate-400 block text-[11px]">Truck Trips Avoided</span>
                <span className="text-base font-extrabold text-amber-400 font-mono">
                  {result.reinforced.engineeringMetrics.materialSavings.truckTripsSavedPerKm} Trips
                </span>
                <span className="text-[10px] text-slate-500 block">16-ton tipper dumpers</span>
              </div>

              <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-700/60">
                <span className="text-slate-400 block text-[11px]">Net Cost Saved</span>
                <span className="text-base font-extrabold text-emerald-400 font-mono">
                  ₹ {result.reinforced.engineeringMetrics.materialSavings.costSavedPerKmLakhs} L/km
                </span>
                <span className="text-[10px] text-slate-500 block">Net of geosynthetic cost</span>
              </div>

              <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-700/60">
                <span className="text-slate-400 block text-[11px]">CO₂ Carbon Offset</span>
                <span className="text-base font-extrabold text-emerald-300 font-mono">
                  {result.reinforced.engineeringMetrics.materialSavings.co2SavedPerKmTonnes} T CO₂
                </span>
                <span className="text-[10px] text-slate-500 block">Quarrying/diesel avoided</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompareTab;
