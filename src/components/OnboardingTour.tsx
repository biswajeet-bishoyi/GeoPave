/**
 * OnboardingTour Component
 * Conforming to CLAUDE.md Section 40 & ANTIGRAVITY.md Section 2:
 * - 4-step guided orientation for civil engineering students
 * - Explains CBR, layer thicknesses, geosynthetics, and simulation
 * - Can be re-launched from the header at any time
 */

import React, { useState } from 'react';
import { useSimStore } from '../store/useSimStore';

interface TourStep {
  title: string;
  badge: string;
  description: string;
  proTip: string;
  icon: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    title: 'Step 1: Set Subgrade CBR & Layer Depths',
    badge: 'Soil Foundation',
    description:
      'Adjust the Subgrade CBR (%) slider on the left panel. GeoPave calculates the Resilient Modulus (MR) using IRC:37 formulas (MR = 10×CBR). You can also customize individual layer thicknesses (BC, DBM, WMM, GSB).',
    proTip: 'A CBR < 3% indicates soft/saturated clay that highly benefits from geotextile separation.',
    icon: '🧱',
  },
  {
    title: 'Step 2: Choose Geosynthetic Reinforcement',
    badge: 'MoRTH Section 700',
    description:
      'Select between Conventional, Geogrid (aperture aggregate confinement), Geotextile (subgrade separation & anti-pumping), or Combined. You can select specific MoRTH grades like Biaxial BX 3030 or Non-woven 200 GSM.',
    proTip: 'Click the "Inspect 🔍" badge on the pavement cross-section to view microscopic stone interlock.',
    icon: '🕸️',
  },
  {
    title: 'Step 3: Apply Dual Wheel Axle Loading',
    badge: 'Axle Mechanics',
    description:
      'Click "Apply Dual Wheel Axle Load" to simulate an 80 kN or 100 kN legal axle. Watch the vehicle chassis compress on its suspension and observe the stress isobar bulb penetrate through the granular layers.',
    proTip: 'Notice how geogrid widens lateral load spread and reduces vertical pressure reaching the subgrade.',
    icon: '⚡',
  },
  {
    title: 'Step 4: Explore Metrics & Physical Model',
    badge: 'IRC Calculations',
    description:
      'Review computed strains, IRC:37 Rutting Life (NR in MSA), Traffic Benefit Ratio (TBR), Base Course Reduction (BCR), and net project savings. Switch to the "🧪 Physical Model & Specs" tab to prepare for your college viva and lab model display!',
    proTip: 'You can export a watermarked engineering report (PDF/JSON) anytime from the simulator.',
    icon: '🎓',
  },
];

export const OnboardingTour: React.FC = () => {
  const { showOnboardingTour, setShowOnboardingTour, setActiveTab, runSim } = useSimStore((s) => ({
    showOnboardingTour: s.ui.showOnboardingTour,
    setShowOnboardingTour: s.setShowOnboardingTour,
    setActiveTab: s.setActiveTab,
    runSim: s.runSim,
  }));

  const [stepIndex, setStepIndex] = useState(0);

  if (!showOnboardingTour) return null;

  const currentStep = TOUR_STEPS[stepIndex];

  const handleNext = () => {
    if (stepIndex < TOUR_STEPS.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      localStorage.setItem('geopave_tour_completed', 'true');
      setShowOnboardingTour(false);
      runSim();
    }
  };

  const handleSkip = () => {
    localStorage.setItem('geopave_tour_completed', 'true');
    setShowOnboardingTour(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-blue-500/50 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 relative">
        {/* Header with Step Tracker */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{currentStep.icon}</span>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-bold">
                {currentStep.badge} • Step {stepIndex + 1} of 4
              </span>
              <h2 className="text-base font-bold text-white leading-tight">
                {currentStep.title}
              </h2>
            </div>
          </div>
          <button
            onClick={handleSkip}
            className="text-slate-500 hover:text-slate-300 text-xs font-semibold px-2 py-1 rounded"
          >
            Skip Tour
          </button>
        </div>

        {/* Body */}
        <div className="space-y-3 text-xs leading-relaxed text-slate-300">
          <p>{currentStep.description}</p>

          <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800/40 text-blue-200">
            <strong className="text-blue-300 block mb-0.5">💡 Engineering Insight:</strong>
            {currentStep.proTip}
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-1.5 pt-1">
          {TOUR_STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                stepIndex === i ? 'w-6 bg-blue-500' : 'w-2 bg-slate-700'
              }`}
            />
          ))}
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <button
            onClick={() => setStepIndex(Math.max(0, stepIndex - 1))}
            disabled={stepIndex === 0}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-30"
          >
            ← Previous
          </button>

          <div className="flex gap-2">
            {stepIndex === TOUR_STEPS.length - 1 && (
              <button
                onClick={() => {
                  handleSkip();
                  setActiveTab('physical-model');
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-950 border border-cyan-700/50 text-cyan-300 hover:bg-cyan-900/50 transition"
              >
                Open Physical Model →
              </button>
            )}
            <button
              onClick={handleNext}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition shadow-lg shadow-blue-900/40"
            >
              {stepIndex === TOUR_STEPS.length - 1 ? 'Start Simulator 🚀' : 'Next Step →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingTour;
