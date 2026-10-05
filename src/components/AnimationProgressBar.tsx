/**
 * AnimationProgressBar Component
 * Timeline progress indicator for the simulation animation
 */

import React from 'react';
import { useSimStore } from '../store/useSimStore';

const ANIMATION_STAGES = [
  { label: 'Surface Contact', pct: 0 },
  { label: 'BC Layer', pct: 0.15 },
  { label: 'DBM Layer', pct: 0.3 },
  { label: 'WMM Layer', pct: 0.5 },
  { label: 'GSB Layer', pct: 0.7 },
  { label: 'Subgrade', pct: 0.85 },
  { label: 'Complete', pct: 1 },
];

export const AnimationProgressBar: React.FC = () => {
  const { animationProgress, animationState } = useSimStore((s) => ({
    animationProgress: s.ui.animationProgress,
    animationState: s.ui.animationState,
  }));

  if (animationState === 'idle') return null;

  const activeStage = ANIMATION_STAGES.reduce((last, stage) =>
    animationProgress >= stage.pct ? stage : last,
    ANIMATION_STAGES[0]
  );

  return (
    <div className="mt-3 px-1">
      {/* Timeline bar */}
      <div className="relative h-1.5 bg-slate-700 rounded-full overflow-hidden mb-2">
        <div
          className="absolute left-0 top-0 h-full rounded-full transition-all duration-100"
          style={{
            width: `${animationProgress * 100}%`,
            background: 'linear-gradient(90deg, #ef4444, #f59e0b, #22c55e)',
          }}
        />
      </div>

      {/* Stage dots */}
      <div className="flex justify-between relative">
        {ANIMATION_STAGES.map((stage) => {
          const isActive = animationProgress >= stage.pct;
          const isCurrent = stage === activeStage;
          return (
            <div key={stage.label} className="flex flex-col items-center" style={{ width: 0 }}>
              <div
                className={`w-2 h-2 rounded-full -mt-3.5 transition-all ${
                  isActive ? 'bg-blue-400 scale-110' : 'bg-slate-600'
                } ${isCurrent ? 'ring-2 ring-blue-400/40' : ''}`}
              />
            </div>
          );
        })}
      </div>

      {/* Active stage label */}
      <div className="text-center mt-1">
        <span className="text-xs font-medium text-blue-300">
          {animationState === 'complete' ? '✅ Animation complete' : `⏱ ${activeStage.label}`}
        </span>
        <span className="text-xs text-slate-500 ml-2">
          {Math.round(animationProgress * 100)}%
        </span>
      </div>
    </div>
  );
};

export default AnimationProgressBar;
