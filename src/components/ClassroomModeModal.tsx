/**
 * ClassroomModeModal Component
 * Conforming to CLAUDE.md Section 49: Instructor / Classroom Presentation Mode:
 * - High-contrast full-screen lecture layout for projectors & digital whiteboards
 * - Step-by-step lecture slides with pedagogical discussion points
 * - Quick teaching scenarios for professors and educators
 */

import React, { useState } from 'react';
import { useSimStore } from '../store/useSimStore';
import { PavementCrossSection } from './PavementCrossSection';

interface LectureStep {
  title: string;
  subtitle: string;
  mode: 'conventional' | 'geogrid' | 'geotextile' | 'combined';
  cbr: number;
  teachingGoal: string;
  chalkboardKeyPoints: string[];
  vivaQuestion: string;
}

const LECTURE_STEPS: LectureStep[] = [
  {
    title: 'Lecture Step 1: Conventional Unreinforced Mechanics',
    subtitle: 'Standard Flexible Pavement Load Spread & Subgrade Stress Bulbs',
    mode: 'conventional',
    cbr: 3,
    teachingGoal: 'Explain why untreated granular bases spread load at a shallow ~45° angle, subjecting weak subgrades to high vertical compressive strain.',
    chalkboardKeyPoints: [
      'Wheel load creates vertical compressive stress (σz) penetrating into weak foundation soil.',
      'Unbound aggregate particles under shear roll and spread laterally without confinement.',
      'IRC:37-2018 limits vertical subgrade strain (εv) to control deep rutting in the wheel path.',
    ],
    vivaQuestion: 'Why does a low CBR subgrade (< 3%) require an excessively thick granular sub-base without stabilization?',
  },
  {
    title: 'Lecture Step 2: Geogrid Aggregate Confinement',
    subtitle: 'Lateral Restraint & Tensioned Membrane Mechanism (IRC:SP:59)',
    mode: 'geogrid',
    cbr: 3,
    teachingGoal: 'Demonstrate how aggregate particles lock into geogrid apertures, creating a stiffened composite platform.',
    chalkboardKeyPoints: [
      'Aperture sizing (35×35 mm) matches median aggregate D50 to achieve positive mechanical interlock.',
      'Lateral aggregate movement is constrained by rib tensile resistance, boosting composite base modulus (Eeff) by 1.6×.',
      'TBR (Traffic Benefit Ratio): Extends pavement fatigue/rutting life by 1.8× to 2.6×.',
    ],
    vivaQuestion: 'Why is geogrid placed at the WMM/GSB interface rather than directly below the wearing course?',
  },
  {
    title: 'Lecture Step 3: Geotextile Anti-Pumping & Separation',
    subtitle: 'Subgrade Filtration & Layer Integrity Preservation (MoRTH Section 702)',
    mode: 'geotextile',
    cbr: 2,
    teachingGoal: 'Show how cyclic wheel loads create excess pore pressure that pumps saturated clay fines upward into the GSB.',
    chalkboardKeyPoints: [
      'Pore size criterion (AOS O95 ≤ 110 µm) retains soil particles while allowing pore water to dissipate freely.',
      'Prevents subgrade clay slurry from contaminating GSB gravel, maintaining sub-base drainage and load bearing.',
      'High CBR static puncture resistance (≥ 1900 N) prevents stone penetration during roller compaction.',
    ],
    vivaQuestion: 'What happens to the structural capacity of GSB if subgrade fines contaminate the aggregate matrix?',
  },
  {
    title: 'Lecture Step 4: Combined Geosynthetics & Economic BCR',
    subtitle: 'Base Course Reduction (BCR) and Net Carbon Offset',
    mode: 'combined',
    cbr: 3,
    teachingGoal: 'Evaluate the economic savings: reducing expensive crushed rock quarrying and hauling.',
    chalkboardKeyPoints: [
      'Base Course Reduction (BCR = 15–25%): Allows saving 75–100 mm of granular thickness while keeping equal structural life.',
      'Saves ~350–500 m³ of aggregate per km (avoiding 30+ dumper truck trips).',
      'Net project savings: ₹ 8–15 Lakhs per km with ~15 Tonnes CO2 equivalent offset.',
    ],
    vivaQuestion: 'How does BCR maintain the structural number (SN) of a flexible pavement?',
  },
];

export const ClassroomModeModal: React.FC = () => {
  const { showClassroomMode, setShowClassroomMode, setPavementMode, setCBR, runSim } =
    useSimStore((s) => ({
      showClassroomMode: s.ui.showClassroomMode,
      setShowClassroomMode: s.setShowClassroomMode,
      setPavementMode: s.setPavementMode,
      setCBR: s.setCBR,
      runSim: s.runSim,
    }));

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  if (!showClassroomMode) return null;

  const step = LECTURE_STEPS[currentStepIndex];

  const applyLectureStep = (index: number) => {
    const s = LECTURE_STEPS[index];
    setCurrentStepIndex(index);
    setPavementMode(s.mode);
    setCBR(s.cbr);
    runSim();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950 text-white p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200 select-none">
      {/* Top Presentation Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center text-lg">
            🎓
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-tight text-white">
                Instructor & Lecture Presentation Mode
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-600/50 text-[10px] font-mono font-bold">
                Projector High-Contrast
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Interactive teaching companion for professors and lecturers per IRC:37-2018 & IRC:SP:59-2018
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowClassroomMode(false)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition border border-slate-700"
        >
          <span>✕</span> Exit Presentation
        </button>
      </div>

      {/* Main Classroom Screen (Split layout: Left Slides / Right Cross-Section) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5">

        {/* Left Col: Lecture Controls & Chalkboard Notes (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Lecture Step Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {LECTURE_STEPS.map((s, idx) => (
              <button
                key={idx}
                onClick={() => applyLectureStep(idx)}
                className={`p-2.5 rounded-xl text-left transition border text-xs ${
                  currentStepIndex === idx
                    ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-lg shadow-amber-900/30'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                }`}
              >
                <div className="text-[10px] opacity-80 uppercase tracking-wider">Slide {idx + 1}</div>
                <div className="truncate font-semibold">{s.mode.toUpperCase()}</div>
              </button>
            ))}
          </div>

          {/* Current Slide Display Card */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block mb-1">
                Classroom Slide {currentStepIndex + 1} of 4
              </span>
              <h2 className="text-xl font-extrabold text-white leading-tight">
                {step.title}
              </h2>
              <p className="text-xs text-cyan-400 font-medium mt-1">
                {step.subtitle}
              </p>
            </div>

            {/* Teaching Objective */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-amber-300 block">
                🎯 Teaching Objective:
              </span>
              <p className="text-slate-300 text-xs leading-relaxed">
                {step.teachingGoal}
              </p>
            </div>

            {/* Chalkboard Key Points */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                📝 Chalkboard Concepts & Discussion Points:
              </span>
              <div className="space-y-2">
                {step.chalkboardKeyPoints.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-amber-400 font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Viva Voce Question for Students */}
            <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/40 text-xs space-y-1">
              <span className="font-bold text-amber-300 flex items-center gap-1.5">
                <span>❓</span> Question to Ask the Class:
              </span>
              <p className="text-slate-300 italic">
                "{step.vivaQuestion}"
              </p>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <div className="text-[11px] text-slate-400">
                Pavement: <strong className="text-white capitalize">{step.mode}</strong> • Subgrade CBR: <strong className="text-cyan-400">{step.cbr}%</strong>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => applyLectureStep(Math.max(0, currentStepIndex - 1))}
                  disabled={currentStepIndex === 0}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-semibold"
                >
                  ← Prev
                </button>
                <button
                  onClick={() => runSim()}
                  className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow"
                >
                  ⚡ Simulate Wheel Pulse
                </button>
                <button
                  onClick={() => applyLectureStep(Math.min(LECTURE_STEPS.length - 1, currentStepIndex + 1))}
                  disabled={currentStepIndex === LECTURE_STEPS.length - 1}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-semibold"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Live Hero Cross-Section (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center">
            Live Cross-Section Visualizer
          </div>
          <div className="w-full flex justify-center">
            <PavementCrossSection width={440} height={460} />
          </div>
          <p className="text-[11px] text-slate-500 text-center italic">
            Click any layer to highlight • Observe stress bulb spread and confinement in real time
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClassroomModeModal;
