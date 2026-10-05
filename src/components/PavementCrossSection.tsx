/**
 * PavementCrossSection Component
 * SVG-based interactive flexible pavement cross-section:
 * - Dynamically scales layer heights in real time from controls.layerThicknesses
 * - Real dual-wheel tire axle contact footprint (80 kN / 100 kN)
 * - Layered Boussinesq stress isobars (0.8p, 0.5p, 0.2p)
 * - Clickable micro-view badges for Geogrid & Geotextile physical inspection
 * - Accurate depth ruler in mm
 */

import React, { useEffect, useRef } from 'react';
import { useSimStore } from '../store/useSimStore';
import { GEOGRID_CATALOG, GEOTEXTILE_CATALOG } from '@data/geosyntheticSpecs';
import { VehicleVector } from './VehicleVector';

interface Props {
  width?: number;
  height?: number;
}

export const PavementCrossSection: React.FC<Props> = ({ width = 540, height = 520 }) => {
  const { controls, ui, result, setSelectedLayer, setShowMicroView } = useSimStore((s) => ({
    controls: s.controls,
    ui: s.ui,
    result: s.result,
    setSelectedLayer: s.setSelectedLayer,
    setShowMicroView: s.setShowMicroView,
  }));

  const animFrameRef = useRef<number | null>(null);
  const progressRef = useRef(0);
  const setAnimationProgress = useSimStore((s) => s.setAnimationProgress);
  const setAnimationState = useSimStore((s) => s.setAnimationState);

  // Drive animation via requestAnimationFrame
  useEffect(() => {
    if (ui.animationState === 'playing' && result) {
      const duration = 7500 / controls.animationSpeed;
      let startTime: number | null = null;

      const tick = (ts: number) => {
        if (!startTime) startTime = ts;
        const elapsed = ts - startTime;
        const progress = Math.min(elapsed / duration, 1);
        progressRef.current = progress;
        setAnimationProgress(progress);
        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(tick);
        } else {
          setAnimationState('complete');
        }
      };

      animFrameRef.current = requestAnimationFrame(tick);
    }

    if (ui.animationState === 'idle' || ui.animationState === 'paused') {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    }

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [ui.animationState, controls.animationSpeed, result]);

  const prog = ui.animationProgress;
  const isAnimating = ui.animationState === 'playing' || ui.animationState === 'complete';
  const hasGeogrid = controls.pavementMode === 'geogrid' || controls.pavementMode === 'combined';
  const hasGeotextile = controls.pavementMode === 'geotextile' || controls.pavementMode === 'combined';
  const deformIdx = result?.subgradeResponse.deformationIndex ?? 0;

  // Selected specs
  const gridSpec = GEOGRID_CATALOG[controls.selectedGeogridType] || GEOGRID_CATALOG.bx3030;
  const textileSpec = GEOTEXTILE_CATALOG[controls.selectedGeotextileType] || GEOTEXTILE_CATALOG.nw200;

  // Total modeled depth in mm (e.g. 1200 mm)
  const totalModelDepthMm = 1200;
  const roadTopY = 88; // Height allocated above BC layer for realistic vehicle model & badge
  const availableCanvasHeight = height - roadTopY - 20;

  // Compute dynamic layer coordinates based on user thicknesses
  const th = controls.layerThicknesses;
  const pxPerMm = availableCanvasHeight / totalModelDepthMm;

  const hBc = Math.max(18, th.bc * pxPerMm);
  const hDbm = Math.max(25, th.dbm * pxPerMm);
  const hWmm = Math.max(40, th.wmm * pxPerMm);
  const hGsb = Math.max(40, th.gsb * pxPerMm);

  const yBc = roadTopY;
  const yDbm = yBc + hBc;
  const yWmm = yDbm + hDbm;
  const yGsb = yWmm + hWmm;
  const ySubgrade = yGsb + hGsb;
  const hSubgrade = height - ySubgrade;

  // Layer objects for rendering
  const dynamicLayers = [
    {
      id: 'bc',
      label: 'Bituminous Concrete (BC)',
      shortLabel: 'BC Wearing Course',
      y: yBc,
      h: hBc,
      color: '#18181b',
      pattern: 'asphalt',
      thicknessText: `${th.bc} mm`,
      strokeColor: '#09090b',
    },
    {
      id: 'dbm',
      label: 'Dense Bituminous Macadam (DBM)',
      shortLabel: 'DBM Binder Course',
      y: yDbm,
      h: hDbm,
      color: '#27272a',
      pattern: 'asphalt',
      thicknessText: `${th.dbm} mm`,
      strokeColor: '#18181b',
    },
    {
      id: 'wmm',
      label: 'Wet Mix Macadam (WMM)',
      shortLabel: 'WMM Granular Base',
      y: yWmm,
      h: hWmm,
      color: '#574838',
      pattern: 'gravel',
      thicknessText: `${th.wmm} mm`,
      strokeColor: '#44372a',
    },
    {
      id: 'gsb',
      label: 'Granular Sub-Base (GSB)',
      shortLabel: 'GSB Sub-Base',
      y: yGsb,
      h: hGsb,
      color: '#78654c',
      pattern: 'gravel',
      thicknessText: `${th.gsb} mm`,
      strokeColor: '#5c4e3a',
    },
    {
      id: 'subgrade',
      label: 'Compacted Subgrade',
      shortLabel: `Subgrade (CBR: ${controls.cbr}%)`,
      y: ySubgrade,
      h: hSubgrade,
      color: '#452c16',
      pattern: 'soil',
      thicknessText: `${totalModelDepthMm - (th.bc + th.dbm + th.wmm + th.gsb)} mm+`,
      strokeColor: '#2e1d0e',
    },
  ];

  // Geogrid Y interface (WMM - GSB interface)
  const geogridY = yGsb;
  // Geotextile Y interface (GSB - Subgrade interface)
  const geotextileY = ySubgrade;

  // Subgrade deformation dip under wheel
  const deformOffset =
    isAnimating && prog > 0.65
      ? ((prog - 0.65) / 0.35) * (deformIdx / 100) * 16
      : 0;

  // Axle contact center
  const centerX = width / 2;

  // Stress bulb dimensions
  const bulbMaxH = isAnimating ? prog * availableCanvasHeight * 0.9 : 0;
  const lateralSpreadFactor = hasGeogrid ? 1.15 : 0.72; // Geogrid spreads lateral confinement
  const bulbW = 85 + bulbMaxH * lateralSpreadFactor;

  return (
    <div className="relative select-none">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl"
        style={{ background: '#090d16' }}
        aria-label="Interactive flexible pavement cross-section"
      >
        <defs>
          {/* Stress radial gradient */}
          <radialGradient id="stressGradIso" cx="50%" cy="12%" r="75%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.85" />
            <stop offset="35%" stopColor="#f59e0b" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#10b981" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
          </radialGradient>

          {/* Asphalt pattern */}
          <pattern id="pat-asphalt" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
            <rect width="8" height="8" fill="transparent" />
            <circle cx="2" cy="2" r="1.0" fill="rgba(255,255,255,0.12)" />
            <circle cx="6" cy="6" r="0.8" fill="rgba(255,255,255,0.08)" />
          </pattern>

          {/* Gravel pattern */}
          <pattern id="pat-gravel" x="0" y="0" width="14" height="10" patternUnits="userSpaceOnUse">
            <rect width="14" height="10" fill="transparent" />
            <polygon points="3,2 6,1 7,4 4,5" fill="rgba(255,255,255,0.16)" />
            <polygon points="9,6 12,5 13,8 10,9" fill="rgba(255,255,255,0.12)" />
          </pattern>

          {/* Soil pattern */}
          <pattern id="pat-soil" x="0" y="0" width="16" height="10" patternUnits="userSpaceOnUse">
            <rect width="16" height="10" fill="transparent" />
            <path d="M0,4 Q4,2 8,4 Q12,6 16,4" stroke="rgba(255,255,255,0.09)" strokeWidth="0.8" fill="none" />
            <circle cx="4" cy="7" r="0.7" fill="rgba(255,255,255,0.08)" />
            <circle cx="12" cy="2" r="0.6" fill="rgba(255,255,255,0.07)" />
          </pattern>
        </defs>

        {/* ─── 1. PAVEMENT LAYERS ─── */}
        {dynamicLayers.map((layer) => {
          const isSelected = ui.selectedLayerId === layer.id;
          const isSubgrade = layer.id === 'subgrade';
          const layerY = isSubgrade ? layer.y + deformOffset : layer.y;
          const layerH = isSubgrade ? layer.h - deformOffset : layer.h;

          return (
            <g
              key={layer.id}
              onClick={() => setSelectedLayer(isSelected ? null : layer.id)}
              className="cursor-pointer group"
            >
              {/* Layer Solid Fill */}
              <rect
                x={0}
                y={layerY}
                width={width - 55}
                height={layerH}
                fill={layer.color}
              />
              {/* Layer Texture Pattern */}
              <rect
                x={0}
                y={layerY}
                width={width - 55}
                height={layerH}
                fill={`url(#pat-${layer.pattern})`}
              />
              {/* Layer Boundary Line */}
              <line
                x1={0}
                y1={layerY}
                x2={width - 55}
                y2={layerY}
                stroke={layer.strokeColor}
                strokeWidth={1.5}
              />
              {/* Selection Halo */}
              {isSelected && (
                <rect
                  x={0}
                  y={layerY}
                  width={width - 55}
                  height={layerH}
                  fill="rgba(56, 189, 248, 0.15)"
                  stroke="#38bdf8"
                  strokeWidth={2}
                />
              )}
              {/* Layer Name (Left) */}
              <text
                x={12}
                y={layerY + Math.min(layerH - 6, Math.max(14, layerH / 2 + 4))}
                fontSize={layer.id === 'subgrade' ? 12 : 11}
                fontWeight="700"
                fill="rgba(255,255,255,0.92)"
                fontFamily="Inter, sans-serif"
              >
                {layer.shortLabel}
              </text>
              {/* Layer Thickness (Right of cross-section) */}
              <text
                x={width - 65}
                y={layerY + Math.min(layerH - 6, Math.max(14, layerH / 2 + 4))}
                fontSize={10}
                fontWeight="600"
                fill="rgba(255,255,255,0.65)"
                textAnchor="end"
                fontFamily="monospace"
              >
                {layer.thicknessText}
              </text>
            </g>
          );
        })}

        {/* ─── 2. GEOSYNTHETIC LAYERS ─── */}

        {/* Geogrid Interface */}
        {hasGeogrid && (
          <g className="cursor-pointer" onClick={() => setShowMicroView('geogrid')}>
            {/* High-visibility Geogrid boundary line */}
            <rect
              x={0}
              y={geogridY - 5}
              width={width - 55}
              height={10}
              fill="rgba(56, 189, 248, 0.25)"
              stroke="#0284c7"
              strokeWidth={1.5}
            />
            {/* Grid apertures representation */}
            {[...Array(32)].map((_, i) => (
              <line
                key={i}
                x1={10 + i * 15}
                y1={geogridY - 4}
                x2={10 + i * 15}
                y2={geogridY + 4}
                stroke="#38bdf8"
                strokeWidth={1.5}
              />
            ))}
            {/* Interactive badge */}
            <g transform={`translate(${centerX - 95}, ${geogridY - 10})`}>
              <rect
                x={0}
                y={0}
                width={190}
                height={20}
                rx={10}
                fill="#0369a1"
                stroke="#38bdf8"
                strokeWidth={1}
              />
              <text
                x={95}
                y={13}
                fill="#ffffff"
                fontSize={9}
                fontWeight="700"
                textAnchor="middle"
                fontFamily="Inter, sans-serif"
              >
                🕸️ GEOGRID: {gridSpec.ultimateTensileStrengthMD} kN/m (Inspect 🔍)
              </text>
            </g>
          </g>
        )}

        {/* Geotextile Interface */}
        {hasGeotextile && (
          <g className="cursor-pointer" onClick={() => setShowMicroView('geotextile')}>
            <rect
              x={0}
              y={geotextileY - 4 + deformOffset}
              width={width - 55}
              height={8}
              fill="rgba(244, 63, 94, 0.35)"
              stroke="#e11d48"
              strokeWidth={1.5}
              strokeDasharray="6 3"
            />
            {/* Interactive badge */}
            <g transform={`translate(${centerX - 100}, ${geotextileY - 10 + deformOffset})`}>
              <rect
                x={0}
                y={0}
                width={200}
                height={20}
                rx={10}
                fill="#be123c"
                stroke="#f43f5e"
                strokeWidth={1}
              />
              <text
                x={100}
                y={13}
                fill="#ffffff"
                fontSize={9}
                fontWeight="700"
                textAnchor="middle"
                fontFamily="Inter, sans-serif"
              >
                🧵 GEOTEXTILE: {textileSpec.massPerUnitAreaGSM} GSM (Inspect 🔍)
              </text>
            </g>
          </g>
        )}

        {/* ─── 3. STRESS BULB & ISO-CURVES (Animated) ─── */}
        {isAnimating && prog > 0.05 && (
          <g style={{ pointerEvents: 'none' }}>
            {/* Main stress bulb */}
            <ellipse
              cx={centerX}
              cy={roadTopY + bulbMaxH * 0.45}
              rx={bulbW / 2}
              ry={bulbMaxH * 0.52}
              fill="url(#stressGradIso)"
              opacity={Math.min(prog * 2.5, 0.75)}
            />

            {/* Isobar stress lines (Boussinesq bulbs: 0.8p, 0.5p, 0.2p) */}
            {prog > 0.25 && (
              <path
                d={`M${centerX - (bulbW * 0.35)},${roadTopY + bulbMaxH * 0.25}
                    Q${centerX},${roadTopY + bulbMaxH * 0.45}
                    ${centerX + (bulbW * 0.35)},${roadTopY + bulbMaxH * 0.25}`}
                fill="none"
                stroke="#ef4444"
                strokeWidth={1.8}
                strokeDasharray="4 2"
                opacity={0.8}
              />
            )}
            {prog > 0.5 && (
              <path
                d={`M${centerX - (bulbW * 0.48)},${roadTopY + bulbMaxH * 0.45}
                    Q${centerX},${roadTopY + bulbMaxH * 0.75}
                    ${centerX + (bulbW * 0.48)},${roadTopY + bulbMaxH * 0.45}`}
                fill="none"
                stroke="#f59e0b"
                strokeWidth={1.5}
                strokeDasharray="5 3"
                opacity={0.7}
              />
            )}

            {/* Lateral Stress Dispersion Vectors (showing geogrid action) */}
            {hasGeogrid && prog > 0.4 && (
              <g stroke="#38bdf8" strokeWidth={1.8} opacity={(prog - 0.4) * 2}>
                <line x1={centerX - 25} y1={geogridY} x2={centerX - 130} y2={geogridY} />
                <polygon points={`${centerX - 135},${geogridY} ${centerX - 125},${geogridY - 4} ${centerX - 125},${geogridY + 4}`} fill="#38bdf8" />
                <line x1={centerX + 25} y1={geogridY} x2={centerX + 130} y2={geogridY} />
                <polygon points={`${centerX + 135},${geogridY} ${centerX + 125},${geogridY - 4} ${centerX + 125},${geogridY + 4}`} fill="#38bdf8" />
                <text x={centerX} y={geogridY - 14} fill="#38bdf8" fontSize={9} fontWeight="bold" textAnchor="middle">
                  Lateral Restraint & Tension Membrane
                </text>
              </g>
            )}
          </g>
        )}

        {/* ─── 4. REALISTIC VEHICLE MODEL & TIRE CONTACT FOOTPRINT ─── */}
        <VehicleVector
          vehicleType={controls.vehicleType}
          centerX={centerX}
          groundY={roadTopY}
          isAnimating={isAnimating}
          progress={prog}
        />

        {/* ─── 5. DEPTH RULER (Right Edge) ─── */}
        <g transform={`translate(${width - 50}, 0)`}>
          {/* Vertical axis */}
          <line x1={0} y1={roadTopY} x2={0} y2={height - 15} stroke="#334155" strokeWidth={1.5} />
          {/* Tick marks */}
          {[
            { label: '0 mm', y: roadTopY },
            { label: `${th.bc} mm`, y: yDbm },
            { label: `${th.bc + th.dbm} mm`, y: yWmm },
            { label: `${th.bc + th.dbm + th.wmm} mm`, y: yGsb },
            { label: `${th.bc + th.dbm + th.wmm + th.gsb} mm`, y: ySubgrade },
            { label: '1200 mm', y: height - 15 },
          ].map((tick, i) => (
            <g key={i}>
              <line x1={-4} y1={tick.y} x2={4} y2={tick.y} stroke="#64748b" strokeWidth={1.5} />
              <text
                x={7}
                y={tick.y + 3}
                fontSize={8}
                fill="#94a3b8"
                fontFamily="monospace"
              >
                {tick.label}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};

export default PavementCrossSection;
