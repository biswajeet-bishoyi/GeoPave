/**
 * ControlsPanel Component
 * Interactive controls for:
 * - Pavement Mode (Conventional, Geogrid, Geotextile, Combined)
 * - Geosynthetic Grade & Specification Selection
 * - Subgrade CBR (%) Slider with live Resilient Modulus (MR) calculation
 * - Layer Thickness Sliders (BC, DBM, WMM, GSB)
 * - Traffic Level & Vehicle Load
 * - Quick Scenarios & Physical Model link
 */

import React from 'react';
import { useSimStore } from '../store/useSimStore';
import type { PavementMode } from '../store/useSimStore';
import type { TrafficLevel, VehicleType } from '@gptypes/pavement';
import { scenarios } from '@data/scenarios';
import { GEOGRID_CATALOG, GEOTEXTILE_CATALOG } from '@data/geosyntheticSpecs';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2 flex items-center justify-between">
      {children}
    </div>
  );
}

function OptionGroup<T extends string>({
  value,
  options,
  onChange,
  cols = 2,
}: {
  value: T;
  options: { value: T; label: string; icon?: string }[];
  onChange: (v: T) => void;
  cols?: number;
}) {
  return (
    <div className={`grid grid-cols-${cols} gap-1.5`}>
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-medium transition-all border ${
            value === opt.value
              ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-900/50'
              : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:border-slate-600'
          }`}
        >
          {opt.icon && <span>{opt.icon}</span>}
          <span className="truncate">{opt.label}</span>
        </button>
      ))}
    </div>
  );
}

const PAVEMENT_OPTIONS: { value: PavementMode; label: string; icon: string }[] = [
  { value: 'conventional', label: 'Conventional', icon: '🏗️' },
  { value: 'geogrid', label: 'Geogrid', icon: '🕸️' },
  { value: 'geotextile', label: 'Geotextile', icon: '🧵' },
  { value: 'combined', label: 'Geogrid + Geotextile', icon: '✅' },
];

const TRAFFIC_OPTIONS: { value: TrafficLevel; label: string; icon: string }[] = [
  { value: 'light', label: 'Light', icon: '🚗' },
  { value: 'medium', label: 'Medium', icon: '🚌' },
  { value: 'heavy', label: 'Heavy', icon: '🚛' },
  { value: 'very_heavy', label: 'Very Heavy', icon: '🛻' },
];

const VEHICLE_OPTIONS: { value: VehicleType; label: string; icon: string }[] = [
  { value: 'light_vehicle', label: 'Car', icon: '🚗' },
  { value: 'bus', label: 'Bus', icon: '🚌' },
  { value: 'truck', label: 'Truck', icon: '🚛' },
  { value: 'heavy_truck', label: 'Heavy Truck', icon: '🛻' },
];

export const ControlsPanel: React.FC = () => {
  const {
    controls,
    ui,
    setPavementMode,
    setTrafficLevel,
    setVehicleType,
    setCBR,
    setLayerThickness,
    setSelectedGeogridType,
    setSelectedGeotextileType,
    setAnimationSpeed,
    toggleAdvanced,
    setActiveTab,
    loadScenario,
    runSim,
    resetAnimation,
  } = useSimStore((s) => ({
    controls: s.controls,
    ui: s.ui,
    setPavementMode: s.setPavementMode,
    setTrafficLevel: s.setTrafficLevel,
    setVehicleType: s.setVehicleType,
    setCBR: s.setCBR,
    setLayerThickness: s.setLayerThickness,
    setSelectedGeogridType: s.setSelectedGeogridType,
    setSelectedGeotextileType: s.setSelectedGeotextileType,
    setAnimationSpeed: s.setAnimationSpeed,
    toggleAdvanced: s.toggleAdvanced,
    setActiveTab: s.setActiveTab,
    loadScenario: s.loadScenario,
    runSim: s.runSim,
    resetAnimation: s.resetAnimation,
  }));

  const isPlaying = ui.animationState === 'playing';
  const hasResult = !!useSimStore((s) => s.result);
  const setAnimState = useSimStore((s) => s.setAnimationState);

  // Subgrade Resilient Modulus (MR) calculation per IRC:37
  const mrCalculated =
    controls.cbr <= 5
      ? 10 * controls.cbr
      : Math.round(17.6 * Math.pow(controls.cbr, 0.64));

  const totalThickness =
    controls.layerThicknesses.bc +
    controls.layerThicknesses.dbm +
    controls.layerThicknesses.wmm +
    controls.layerThicknesses.gsb;

  const hasGeogrid = controls.pavementMode === 'geogrid' || controls.pavementMode === 'combined';
  const hasGeotextile = controls.pavementMode === 'geotextile' || controls.pavementMode === 'combined';

  return (
    <div className="space-y-5">
      {/* ── Action: Physical Model Quick Banner ── */}
      <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-950/60 to-blue-950/60 border border-cyan-800/40">
        <div className="flex items-center justify-between">
          <div className="text-xs">
            <span className="font-bold text-cyan-300 block">🧪 Physical Model Ready</span>
            <span className="text-[11px] text-slate-400">1:10 scaling & viva defense</span>
          </div>
          <button
            onClick={() => setActiveTab('physical-model')}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white transition shadow"
          >
            View Specs →
          </button>
        </div>
      </div>

      {/* ── Scenarios ── */}
      <div>
        <SectionTitle>
          <span>Quick Scenarios</span>
          <span className="text-[10px] text-slate-500">Preset Road Scenarios</span>
        </SectionTitle>
        <div className="grid grid-cols-1 gap-1.5">
          {scenarios.slice(0, 4).map((sc) => (
            <button
              key={sc.id}
              onClick={() => loadScenario(sc.id)}
              className={`text-left px-3 py-2 rounded-lg text-xs transition-all border ${
                ui.activeScenario === sc.id
                  ? 'bg-indigo-700 border-indigo-500 text-white'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <div className="font-semibold">{sc.name}</div>
              <div className="text-slate-400 mt-0.5 text-xs leading-tight truncate">{sc.description}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-700/50" />

      {/* ── Pavement Configuration ── */}
      <div>
        <SectionTitle>Pavement Reinforcement</SectionTitle>
        <OptionGroup
          value={controls.pavementMode}
          options={PAVEMENT_OPTIONS}
          onChange={setPavementMode}
          cols={2}
        />
      </div>

      {/* ── Geosynthetic Grade Selection (If Active) ── */}
      {hasGeogrid && (
        <div className="p-3 rounded-xl bg-slate-800/60 border border-cyan-700/40 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-cyan-300 flex items-center gap-1.5">
              <span>🕸️</span> Geogrid Grade:
            </span>
            <span className="text-[10px] text-slate-400 font-mono">MoRTH Sec 704</span>
          </div>
          <select
            value={controls.selectedGeogridType}
            onChange={(e) => setSelectedGeogridType(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 text-white text-xs rounded-lg px-2.5 py-1.5 focus:ring-1 focus:ring-cyan-500"
          >
            {Object.values(GEOGRID_CATALOG).map((g) => (
              <option key={g.id} value={g.id}>
                {g.structure} ({g.ultimateTensileStrengthMD} kN/m • {g.apertureSizeMD}×{g.apertureSizeCMD}mm)
              </option>
            ))}
          </select>
        </div>
      )}

      {hasGeotextile && (
        <div className="p-3 rounded-xl bg-slate-800/60 border border-rose-700/40 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-rose-300 flex items-center gap-1.5">
              <span>🧵</span> Geotextile Grade:
            </span>
            <span className="text-[10px] text-slate-400 font-mono">MoRTH Sec 702</span>
          </div>
          <select
            value={controls.selectedGeotextileType}
            onChange={(e) => setSelectedGeotextileType(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 text-white text-xs rounded-lg px-2.5 py-1.5 focus:ring-1 focus:ring-rose-500"
          >
            {Object.values(GEOTEXTILE_CATALOG).map((t) => (
              <option key={t.id} value={t.id}>
                {t.manufacturingType.split(' ')[0]} ({t.massPerUnitAreaGSM} GSM • CBR: {t.cbrPunctureResistance}N)
              </option>
            ))}
          </select>
        </div>
      )}

      {/* ── Subgrade CBR Slider ── */}
      <div>
        <SectionTitle>
          <span>Subgrade CBR (%)</span>
          <span className="text-[11px] text-emerald-400 font-mono">
            MR = {mrCalculated} MPa (IRC:37)
          </span>
        </SectionTitle>
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-slate-300">
            <span>Soil CBR: <strong className="text-white font-mono">{controls.cbr}%</strong></span>
            <span className="text-slate-400 text-[11px]">
              {controls.cbr < 3 ? '🔴 Poor / Saturated' : controls.cbr < 5 ? '🟡 Weak Subgrade' : controls.cbr < 8 ? '🟢 Moderate' : '✅ Good'}
            </span>
          </div>
          <input
            type="range"
            min={2}
            max={15}
            step={0.5}
            value={controls.cbr}
            onChange={(e) => setCBR(Number(e.target.value))}
            className="w-full accent-blue-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>2% (Clay)</span>
            <span>5% (Design Min)</span>
            <span>10%</span>
            <span>15% (Gravel)</span>
          </div>
        </div>
      </div>

      {/* ── Layer Thickness Customization ── */}
      <div className="space-y-2.5">
        <SectionTitle>
          <span>Layer Thicknesses</span>
          <span className="text-[11px] text-cyan-400 font-mono">Total: {totalThickness} mm</span>
        </SectionTitle>

        {/* BC Slider */}
        <div className="space-y-1 text-xs">
          <div className="flex justify-between text-slate-300">
            <span>Bituminous Concrete (BC):</span>
            <span className="font-mono text-white">{controls.layerThicknesses.bc} mm</span>
          </div>
          <input
            type="range"
            min={30}
            max={80}
            step={5}
            value={controls.layerThicknesses.bc}
            onChange={(e) => setLayerThickness('bc', Number(e.target.value))}
            className="w-full accent-blue-500 h-1.5 cursor-pointer"
          />
        </div>

        {/* DBM Slider */}
        <div className="space-y-1 text-xs">
          <div className="flex justify-between text-slate-300">
            <span>Dense Bituminous Macadam (DBM):</span>
            <span className="font-mono text-white">{controls.layerThicknesses.dbm} mm</span>
          </div>
          <input
            type="range"
            min={50}
            max={160}
            step={10}
            value={controls.layerThicknesses.dbm}
            onChange={(e) => setLayerThickness('dbm', Number(e.target.value))}
            className="w-full accent-blue-500 h-1.5 cursor-pointer"
          />
        </div>

        {/* WMM Slider */}
        <div className="space-y-1 text-xs">
          <div className="flex justify-between text-slate-300">
            <span>Wet Mix Macadam (WMM Base):</span>
            <span className="font-mono text-white">{controls.layerThicknesses.wmm} mm</span>
          </div>
          <input
            type="range"
            min={150}
            max={300}
            step={25}
            value={controls.layerThicknesses.wmm}
            onChange={(e) => setLayerThickness('wmm', Number(e.target.value))}
            className="w-full accent-blue-500 h-1.5 cursor-pointer"
          />
        </div>

        {/* GSB Slider */}
        <div className="space-y-1 text-xs">
          <div className="flex justify-between text-slate-300">
            <span>Granular Sub-Base (GSB):</span>
            <span className="font-mono text-white">{controls.layerThicknesses.gsb} mm</span>
          </div>
          <input
            type="range"
            min={150}
            max={300}
            step={25}
            value={controls.layerThicknesses.gsb}
            onChange={(e) => setLayerThickness('gsb', Number(e.target.value))}
            className="w-full accent-blue-500 h-1.5 cursor-pointer"
          />
        </div>
      </div>

      <div className="border-t border-slate-700/50" />

      {/* ── Traffic & Vehicle ── */}
      <div>
        <SectionTitle>Traffic Volume</SectionTitle>
        <OptionGroup
          value={controls.trafficLevel}
          options={TRAFFIC_OPTIONS}
          onChange={setTrafficLevel}
          cols={2}
        />
      </div>

      <div>
        <SectionTitle>Axle Loading (Wheel)</SectionTitle>
        <OptionGroup
          value={controls.vehicleType}
          options={VEHICLE_OPTIONS}
          onChange={setVehicleType}
          cols={2}
        />
      </div>

      {/* ── Advanced (collapsible) ── */}
      <div>
        <button
          onClick={toggleAdvanced}
          className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 transition"
        >
          <span className={`transition-transform ${ui.showAdvanced ? 'rotate-90' : ''}`}>▶</span>
          Simulation Speed
        </button>
        {ui.showAdvanced && (
          <div className="mt-2 space-y-3">
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Animation Speed</span>
                <span>{controls.animationSpeed}x</span>
              </div>
              <input
                type="range"
                min={0.5}
                max={2}
                step={0.5}
                value={controls.animationSpeed}
                onChange={(e) => setAnimationSpeed(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
              <div className="flex justify-between text-xs text-slate-600 mt-0.5">
                <span>0.5x</span><span>1x</span><span>1.5x</span><span>2x</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-slate-700/50" />

      {/* ── Action Buttons ── */}
      <div className="space-y-2">
        <button
          id="apply-load-btn"
          onClick={runSim}
          disabled={isPlaying}
          className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg shadow-red-900/40 hover:from-red-500 hover:to-orange-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
        >
          {isPlaying ? '⏳ Computing IRC Stresses…' : '⚡ Apply Dual Wheel Axle Load'}
        </button>

        {hasResult && (
          <div className="flex gap-2">
            <button
              onClick={() => setAnimState(isPlaying ? 'paused' : 'playing')}
              className="flex-1 py-2 rounded-lg text-xs font-semibold bg-slate-700 hover:bg-slate-600 text-white transition"
            >
              {isPlaying ? '⏸ Pause' : '▶ Resume'}
            </button>
            <button
              onClick={resetAnimation}
              className="flex-1 py-2 rounded-lg text-xs font-semibold bg-slate-700 hover:bg-slate-600 text-white transition"
            >
              🔄 Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ControlsPanel;
