/**
 * VehicleVector Component
 * Detailed, realistic SVG vector models for flexible pavement simulation:
 * - Car (Passenger Sedan)
 * - Intercity Highway Coach Bus
 * - Heavy Freight Dumper Truck (100 kN Axle)
 * - Commercial Indian Highway Truck (80 kN SADW)
 *
 * Ensures:
 * 1. Red tire contact patches are perfectly positioned directly below each wheel.
 * 2. Vehicle labels/badges have ample top headroom so they are never clipped.
 * 3. Dynamic suspension compression animation under wheel load.
 */

import React from 'react';
import type { VehicleType } from '@gptypes/pavement';

interface VehicleVectorProps {
  vehicleType: VehicleType;
  centerX: number;
  groundY: number;
  isAnimating: boolean;
  progress: number;
}

export const VehicleVector: React.FC<VehicleVectorProps> = ({
  vehicleType,
  centerX,
  groundY,
  isAnimating,
  progress,
}) => {
  // Suspension compression bounce under load pulse (max 3px downward travel)
  const suspensionDrop = isAnimating ? Math.sin(progress * Math.PI) * 3.0 : 0;
  const effectiveGroundY = groundY + suspensionDrop;

  if (vehicleType === 'light_vehicle') {
    // ─── 1. REALISTIC SEDAN CAR MODEL ───
    const carW = 160;
    const carH = 44;
    const startX = centerX - carW / 2;
    const bodyY = effectiveGroundY - carH;
    const wheelRadius = 11;
    const wheelY = effectiveGroundY - wheelRadius;
    const frontWheelX = startX + carW - 34;
    const rearWheelX = startX + 24;
    const contactPatchW = 22;

    return (
      <g className="transition-transform duration-75 select-none" id="vehicle-car">
        <defs>
          <linearGradient id="carBodyGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="35%" stopColor="#2563eb" />
            <stop offset="70%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="carGlassGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1e293b" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="wheelRubber" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
        </defs>

        {/* Shadow under car */}
        <ellipse
          cx={centerX}
          cy={groundY + 1}
          rx={carW * 0.48}
          ry={3}
          fill="rgba(0, 0, 0, 0.65)"
        />

        {/* ── RED TIRE CONTACT PATCHES (Directly below each wheel on BC road) ── */}
        <rect
          x={rearWheelX - contactPatchW / 2}
          y={groundY - 1}
          width={contactPatchW}
          height={3}
          rx={1.5}
          fill="#ef4444"
          opacity={0.95}
        />
        <rect
          x={frontWheelX - contactPatchW / 2}
          y={groundY - 1}
          width={contactPatchW}
          height={3}
          rx={1.5}
          fill="#ef4444"
          opacity={0.95}
        />

        {/* Car Lower Body & Fenders */}
        <path
          d={`M ${startX + 8} ${effectiveGroundY - 13}
              C ${startX + 14} ${effectiveGroundY - 24}, ${startX + 30} ${effectiveGroundY - 24}, ${startX + 36} ${effectiveGroundY - 13}
              L ${startX + carW - 46} ${effectiveGroundY - 13}
              C ${startX + carW - 40} ${effectiveGroundY - 24}, ${startX + carW - 24} ${effectiveGroundY - 24}, ${startX + carW - 18} ${effectiveGroundY - 13}
              L ${startX + carW - 2} ${effectiveGroundY - 13}
              C ${startX + carW} ${effectiveGroundY - 17}, ${startX + carW - 4} ${effectiveGroundY - 22}, ${startX + carW - 14} ${effectiveGroundY - 24}
              L ${startX + carW - 32} ${effectiveGroundY - 26}
              L ${startX + carW - 55} ${bodyY + 6}
              C ${startX + carW - 65} ${bodyY}, ${startX + 55} ${bodyY}, ${startX + 45} ${bodyY + 7}
              L ${startX + 24} ${effectiveGroundY - 26}
              L ${startX + 4} ${effectiveGroundY - 22}
              C ${startX} ${effectiveGroundY - 18}, ${startX + 2} ${effectiveGroundY - 14}, ${startX + 8} ${effectiveGroundY - 13}
              Z`}
          fill="url(#carBodyGrad)"
          stroke="#1e40af"
          strokeWidth="1.2"
        />

        {/* Roof & Cabin Windows */}
        <path
          d={`M ${startX + 44} ${bodyY + 8}
              L ${startX + 58} ${bodyY + 2}
              L ${startX + carW - 64} ${bodyY + 2}
              L ${startX + carW - 48} ${bodyY + 11}
              L ${startX + carW - 50} ${effectiveGroundY - 24}
              L ${startX + 32} ${effectiveGroundY - 24}
              Z`}
          fill="url(#carGlassGrad)"
          stroke="#0f172a"
          strokeWidth="1"
        />

        {/* Window Pillars (B-Pillar & C-Pillar) */}
        <line
          x1={startX + carW / 2 - 2}
          y1={bodyY + 2}
          x2={startX + carW / 2 - 2}
          y2={effectiveGroundY - 24}
          stroke="#1e3a8a"
          strokeWidth="3"
        />

        {/* Headlight & Tail-light */}
        <path
          d={`M ${startX + carW - 4} ${effectiveGroundY - 22} L ${startX + carW - 14} ${effectiveGroundY - 24} L ${startX + carW - 12} ${effectiveGroundY - 18} Z`}
          fill="#fef08a"
        />
        <rect
          x={startX + 2}
          y={effectiveGroundY - 22}
          width="4"
          height="7"
          rx="1.5"
          fill="#ef4444"
        />

        {/* Front & Rear Wheels (Alloy rims) */}
        {[rearWheelX, frontWheelX].map((wx, idx) => (
          <g key={idx}>
            <circle cx={wx} cy={wheelY} r={wheelRadius} fill="url(#wheelRubber)" stroke="#090d16" strokeWidth="1.5" />
            <circle cx={wx} cy={wheelY} r={wheelRadius * 0.75} fill="#475569" stroke="#64748b" strokeWidth="0.8" />
            <circle cx={wx} cy={wheelY} r={wheelRadius * 0.45} fill="#cbd5e1" />
            <circle cx={wx} cy={wheelY} r="2" fill="#1e293b" />
          </g>
        ))}

        {/* ── BADGE (Clearly visible with plenty of headroom) ── */}
        <g transform={`translate(${centerX - 52}, ${bodyY - 18})`}>
          <rect x="0" y="0" width="104" height="15" rx="3.5" fill="#0f172a" stroke="#3b82f6" strokeWidth="1" />
          <text x="52" y="11" fill="#93c5fd" fontSize="8.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            Passenger Car • 15 kN
          </text>
        </g>
      </g>
    );
  }

  if (vehicleType === 'bus') {
    // ─── 2. INTERCITY EXPRESS HIGHWAY BUS MODEL ───
    const busW = 195;
    const busH = 52;
    const startX = centerX - busW / 2;
    const bodyY = effectiveGroundY - busH;
    const wheelRadius = 12;
    const wheelY = effectiveGroundY - wheelRadius;
    const rearWheelX = startX + 36;
    const frontWheelX = startX + busW - 38;
    const contactPatchW = 26;

    return (
      <g className="transition-transform duration-75 select-none" id="vehicle-bus">
        <defs>
          <linearGradient id="busBodyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="40%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
        </defs>

        {/* Ground shadow */}
        <ellipse cx={centerX} cy={groundY + 1} rx={busW * 0.49} ry={3.5} fill="rgba(0,0,0,0.65)" />

        {/* ── RED TIRE CONTACT PATCHES (Directly below each wheel on BC road) ── */}
        <rect
          x={rearWheelX - contactPatchW / 2}
          y={groundY - 1}
          width={contactPatchW}
          height={3}
          rx={1.5}
          fill="#ef4444"
          opacity={0.95}
        />
        <rect
          x={frontWheelX - contactPatchW / 2}
          y={groundY - 1}
          width={contactPatchW}
          height={3}
          rx={1.5}
          fill="#ef4444"
          opacity={0.95}
        />

        {/* Main Bus Monocoque Chassis */}
        <rect
          x={startX}
          y={bodyY}
          width={busW}
          height={busH - 10}
          rx="5"
          fill="url(#busBodyGrad)"
          stroke="#075985"
          strokeWidth="1.5"
        />

        {/* Aerodynamic Front Slope */}
        <path
          d={`M ${startX + busW - 14} ${bodyY} Q ${startX + busW} ${bodyY + 6} ${startX + busW} ${bodyY + 24} L ${startX + busW} ${effectiveGroundY - 11} L ${startX + busW - 14} ${effectiveGroundY - 11} Z`}
          fill="#0369a1"
        />

        {/* Large Front Windshield */}
        <path
          d={`M ${startX + busW - 30} ${bodyY + 4} L ${startX + busW - 4} ${bodyY + 6} L ${startX + busW - 2} ${bodyY + 24} L ${startX + busW - 30} ${bodyY + 24} Z`}
          fill="#bae6fd"
          opacity="0.9"
          stroke="#0284c7"
          strokeWidth="1"
        />

        {/* Panoramic Tinted Windows */}
        <rect
          x={startX + 12}
          y={bodyY + 5}
          width={busW - 48}
          height="16"
          rx="2.5"
          fill="#0f172a"
          stroke="#0284c7"
          strokeWidth="0.8"
        />

        {/* Window Pane Dividers */}
        {[startX + 34, startX + 62, startX + 90, startX + 118, startX + 144].map((wx, i) => (
          <line key={i} x1={wx} y1={bodyY + 5} x2={wx} y2={bodyY + 21} stroke="#0ea5e9" strokeWidth="1.5" />
        ))}

        {/* Destination LED Board */}
        <rect x={startX + busW - 28} y={bodyY + 6} width="22" height="6" rx="1.5" fill="#f59e0b" />
        <text x={startX + busW - 17} y={bodyY + 11} fill="#000000" fontSize="5.5" fontWeight="bold" textAnchor="middle">
          EXPRESS
        </text>

        {/* Lower Luggage Compartment Doors */}
        <rect x={startX + 38} y={effectiveGroundY - 23} width="84" height="11" fill="#0369a1" stroke="#0284c7" strokeWidth="0.8" />
        <circle cx={startX + 65} cy={effectiveGroundY - 18} r="1.5" fill="#cbd5e1" />
        <circle cx={startX + 95} cy={effectiveGroundY - 18} r="1.5" fill="#cbd5e1" />

        {/* Headlight & Taillight */}
        <rect x={startX + busW - 3} y={effectiveGroundY - 21} width="3" height="7" rx="1" fill="#fef08a" />
        <rect x={startX} y={effectiveGroundY - 21} width="3" height="7" rx="1" fill="#ef4444" />

        {/* Wheels */}
        {[rearWheelX, frontWheelX].map((wx, idx) => (
          <g key={idx}>
            <circle cx={wx} cy={wheelY} r={wheelRadius} fill="#1e293b" stroke="#0f172a" strokeWidth="1.5" />
            <circle cx={wx} cy={wheelY} r={wheelRadius * 0.72} fill="#475569" />
            <circle cx={wx} cy={wheelY} r={wheelRadius * 0.38} fill="#94a3b8" />
          </g>
        ))}

        {/* ── BADGE (Positioned with clear top headroom) ── */}
        <g transform={`translate(${centerX - 58}, ${bodyY - 18})`}>
          <rect x="0" y="0" width="116" height="15" rx="3.5" fill="#0f172a" stroke="#0284c7" strokeWidth="1" />
          <text x="58" y="11" fill="#7dd3fc" fontSize="8.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            Intercity Coach • 65 kN Axle
          </text>
        </g>
      </g>
    );
  }

  if (vehicleType === 'heavy_truck') {
    // ─── 3. MULTI-AXLE HEAVY FREIGHT DUMPER (100 kN Axle) ───
    const truckW = 205;
    const truckH = 54;
    const startX = centerX - truckW / 2;
    const bodyY = effectiveGroundY - truckH;
    const wheelRadius = 13;
    const wheelY = effectiveGroundY - wheelRadius;

    // Exact wheel center positions
    const rearWheel1X = startX + 32;
    const rearWheel2X = startX + 62;
    const frontWheelX = startX + truckW - 32;
    const contactPatchW = 24;

    return (
      <g className="transition-transform duration-75 select-none" id="vehicle-heavy-truck">
        <defs>
          <linearGradient id="tipperGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
          <linearGradient id="heavyCabGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>
        </defs>

        {/* Ground Shadow */}
        <ellipse cx={centerX} cy={groundY + 1} rx={truckW * 0.49} ry={4} fill="rgba(0,0,0,0.7)" />

        {/* ── RED TIRE CONTACT PATCHES (Directly below each of the 3 wheels on BC road) ── */}
        <rect
          x={rearWheel1X - contactPatchW / 2}
          y={groundY - 1}
          width={contactPatchW}
          height={3}
          rx={1.5}
          fill="#ef4444"
          opacity={0.95}
        />
        <rect
          x={rearWheel2X - contactPatchW / 2}
          y={groundY - 1}
          width={contactPatchW}
          height={3}
          rx={1.5}
          fill="#ef4444"
          opacity={0.95}
        />
        <rect
          x={frontWheelX - contactPatchW / 2}
          y={groundY - 1}
          width={contactPatchW}
          height={3}
          rx={1.5}
          fill="#ef4444"
          opacity={0.95}
        />

        {/* Heavy Duty Tipper Cargo Body */}
        <path
          d={`M ${startX + 12} ${bodyY + 8}
              L ${startX + truckW - 74} ${bodyY + 8}
              L ${startX + truckW - 74} ${effectiveGroundY - 20}
              L ${startX + 12} ${effectiveGroundY - 20}
              Z`}
          fill="url(#tipperGrad)"
          stroke="#451a03"
          strokeWidth="1.5"
        />

        {/* Aggregate stone heap in tipper bed */}
        <path
          d={`M ${startX + 16} ${bodyY + 8} Q ${startX + (truckW - 74) / 2} ${bodyY - 4} ${startX + truckW - 78} ${bodyY + 8} Z`}
          fill="#78716c"
          stroke="#57534e"
          strokeWidth="1"
        />

        {/* Reinforcement Ribs on Tipper Container */}
        {[startX + 35, startX + 60, startX + 85, startX + 110].map((rx, idx) => (
          <line key={idx} x1={rx} y1={bodyY + 8} x2={rx} y2={effectiveGroundY - 20} stroke="#451a03" strokeWidth="2.5" />
        ))}

        {/* Heavy Truck Cab */}
        <path
          d={`M ${startX + truckW - 68} ${bodyY + 4}
              L ${startX + truckW - 16} ${bodyY + 4}
              Q ${startX + truckW - 4} ${bodyY + 10} ${startX + truckW - 4} ${effectiveGroundY - 13}
              L ${startX + truckW - 68} ${effectiveGroundY - 13}
              Z`}
          fill="url(#heavyCabGrad)"
          stroke="#7f1d1d"
          strokeWidth="1.5"
        />

        {/* Cab Windshield & Windows */}
        <path
          d={`M ${startX + truckW - 55} ${bodyY + 7} L ${startX + truckW - 14} ${bodyY + 7} L ${startX + truckW - 12} ${bodyY + 23} L ${startX + truckW - 55} ${bodyY + 23} Z`}
          fill="#cbd5e1"
          stroke="#475569"
          strokeWidth="1"
        />

        {/* Sun Visor & Headlights */}
        <rect x={startX + truckW - 16} y={bodyY + 5} width="14" height="3" fill="#0f172a" />
        <rect x={startX + truckW - 4} y={effectiveGroundY - 21} width="4" height="7" fill="#fef08a" rx="1" />

        {/* Chassis Frame & Fuel Tank */}
        <rect x={startX + 75} y={effectiveGroundY - 22} width="32" height="9" rx="2.5" fill="#64748b" stroke="#334155" />

        {/* Tandem Rear Dual Wheels (2 Axles at rear) + Front Steer Wheel */}
        {[rearWheel1X, rearWheel2X, frontWheelX].map((wx, idx) => (
          <g key={idx}>
            <circle cx={wx} cy={wheelY} r={wheelRadius} fill="#0f172a" stroke="#334155" strokeWidth="2" />
            <circle cx={wx} cy={wheelY} r={wheelRadius * 0.65} fill="#334155" />
            <circle cx={wx} cy={wheelY} r={wheelRadius * 0.32} fill="#94a3b8" />
          </g>
        ))}

        {/* ── BADGE (Positioned with clear top headroom) ── */}
        <g transform={`translate(${centerX - 70}, ${bodyY - 18})`}>
          <rect x="0" y="0" width="140" height="15" rx="3.5" fill="#0f172a" stroke="#ef4444" strokeWidth="1.2" />
          <text x="70" y="11" fill="#fecaca" fontSize="8.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            ⚠️ Heavy Axle • 100 kN Footprint
          </text>
        </g>
      </g>
    );
  }

  // ─── 4. STANDARD INDIAN COMMERCIAL TRUCK (80 kN SADW) ───
  // Default: Tata / Ashok Leyland 16-Ton Freight Carrier
  const truckW = 190;
  const truckH = 54;
  const startX = centerX - truckW / 2;
  const bodyY = effectiveGroundY - truckH;
  const wheelRadius = 13;
  const wheelY = effectiveGroundY - wheelRadius;

  // Exact wheel centers
  const rearWheelX = startX + 38;
  const frontWheelX = startX + truckW - 32;
  const contactPatchW = 26;

  return (
    <g className="transition-transform duration-75 select-none" id="vehicle-truck">
      <defs>
        <linearGradient id="indianTruckCab" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#047857" />
          <stop offset="50%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#065f46" />
        </linearGradient>
        <linearGradient id="cargoWooden" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b45309" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>
      </defs>

      {/* Shadow */}
      <ellipse cx={centerX} cy={groundY + 1} rx={truckW * 0.48} ry={3.5} fill="rgba(0,0,0,0.65)" />

      {/* ── RED TIRE CONTACT PATCHES (Directly below each wheel on BC road) ── */}
      <rect
        x={rearWheelX - contactPatchW / 2}
        y={groundY - 1}
        width={contactPatchW}
        height={3}
        rx={1.5}
        fill="#ef4444"
        opacity={0.95}
      />
      <rect
        x={frontWheelX - contactPatchW / 2}
        y={groundY - 1}
        width={contactPatchW}
        height={3}
        rx={1.5}
        fill="#ef4444"
        opacity={0.95}
      />

      {/* Wooden / Steel Cargo Body with Indian Highway Slat styling */}
      <rect
        x={startX + 10}
        y={bodyY + 6}
        width={truckW - 74}
        height={truckH - 18}
        rx="2"
        fill="url(#cargoWooden)"
        stroke="#78350f"
        strokeWidth="1.5"
      />

      {/* Slat lines & yellow caution stripes */}
      {[bodyY + 15, bodyY + 24, bodyY + 33].map((sy, i) => (
        <line key={i} x1={startX + 10} y1={sy} x2={startX + truckW - 64} y2={sy} stroke="#d97706" strokeWidth="1.2" />
      ))}
      <rect x={startX + 10} y={bodyY + 6} width={truckW - 74} height="4.5" fill="#facc15" />

      {/* Truck Cab (Green Indian Highway Truck) */}
      <path
        d={`M ${startX + truckW - 60} ${bodyY + 4}
            L ${startX + truckW - 14} ${bodyY + 4}
            C ${startX + truckW - 2} ${bodyY + 12}, ${startX + truckW - 2} ${bodyY + 22}, ${startX + truckW - 2} ${effectiveGroundY - 13}
            L ${startX + truckW - 60} ${effectiveGroundY - 13}
            Z`}
        fill="url(#indianTruckCab)"
        stroke="#064e3b"
        strokeWidth="1.5"
      />

      {/* Front Windshield with Top Visor */}
      <rect x={startX + truckW - 48} y={bodyY + 8} width="36" height="16" rx="2" fill="#bae6fd" stroke="#0284c7" strokeWidth="1" />
      <rect x={startX + truckW - 52} y={bodyY + 4} width="42" height="3.5" fill="#f59e0b" />

      {/* Chrome Bumper & Headlights */}
      <rect x={startX + truckW - 4} y={effectiveGroundY - 20} width="4" height="7" rx="1" fill="#fef08a" />
      <rect x={startX + truckW - 8} y={effectiveGroundY - 15} width="8" height="5" fill="#e2e8f0" stroke="#64748b" />

      {/* Chassis Frame Rail & Fuel Tank */}
      <rect x={startX + 65} y={effectiveGroundY - 22} width="35" height="9" rx="2.5" fill="#475569" stroke="#1e293b" />
      <circle cx={startX + 74} cy={effectiveGroundY - 17.5} r="2" fill="#94a3b8" />

      {/* Wheels */}
      {[rearWheelX, frontWheelX].map((wx, idx) => (
        <g key={idx}>
          <circle cx={wx} cy={wheelY} r={wheelRadius} fill="#0f172a" stroke="#334155" strokeWidth="2" />
          <circle cx={wx} cy={wheelY} r={wheelRadius * 0.65} fill="#1e293b" />
          <circle cx={wx} cy={wheelY} r={wheelRadius * 0.32} fill="#f59e0b" stroke="#b45309" />
        </g>
      ))}

      {/* ── BADGE (Positioned with clear top headroom) ── */}
      <g transform={`translate(${centerX - 62}, ${bodyY - 18})`}>
        <rect x="0" y="0" width="124" height="15" rx="3.5" fill="#0f172a" stroke="#10b981" strokeWidth="1.2" />
        <text x="62" y="11" fill="#a7f3d0" fontSize="8.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
          Commercial Truck • 80 kN SADW
        </text>
      </g>
    </g>
  );
};

export default VehicleVector;
