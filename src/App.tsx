/**
 * GeoPave India — Main Application
 * Interactive educational simulator for geosynthetic-reinforced flexible pavements
 * Conforming to CLAUDE.md (54 Sections) and ANTIGRAVITY.md Quality Safeguards.
 */

import React, { Suspense, lazy, useEffect } from 'react';
import { useSimStore } from './store/useSimStore';
import { PavementCrossSection } from './components/PavementCrossSection';
import { LayerInfoPanel } from './components/LayerInfoPanel';
import { ControlsPanel } from './components/ControlsPanel';
import { MetricsPanel } from './components/MetricsPanel';
import { AnimationProgressBar } from './components/AnimationProgressBar';
import { MicroViewModal } from './components/MicroViewModal';
import { ReportExportModal } from './components/ReportExportModal';
import { TermsOfUseModal } from './components/TermsOfUseModal';
import { ClassroomModeModal } from './components/ClassroomModeModal';
import { OnboardingTour } from './components/OnboardingTour';

const LearnTab = lazy(() => import('./components/LearnTab'));
const CompareTab = lazy(() => import('./components/CompareTab'));
const PhysicalModelTab = lazy(() => import('./components/PhysicalModelTab'));
const IntroPage = lazy(() => import('./components/IntroPage'));

// ── Tab definitions ──
const TABS = [
  { id: 'intro', label: '🏠 Overview', title: 'Project Overview & Theory' },
  { id: 'simulator', label: '⚙️ Simulator', title: 'Pavement Simulator' },
  { id: 'compare', label: '⚖️ Compare', title: 'Comparison Mode' },
  { id: 'physical-model', label: '🧪 Physical Model', title: 'Physical Scale Model & Specs' },
  { id: 'learn', label: '📚 Learn', title: 'Learning Resources' },
] as const;

// ── Collapsible sidebar section ──
function SidebarSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div className="border border-slate-700/50 rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-4 py-3 bg-slate-800/80 hover:bg-slate-700/80 transition text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="text-xs font-semibold text-slate-300 uppercase tracking-widest">{title}</span>
        <span className={`text-slate-500 text-sm transition-transform ${open ? 'rotate-180' : ''}`}>
          ▾
        </span>
      </button>
      {open && <div className="px-4 py-4 bg-slate-900/60">{children}</div>}
    </div>
  );
}

export default function App() {
  const {
    activeTab,
    setActiveTab,
    setShowExportModal,
    setShowTermsModal,
    setShowClassroomMode,
    setShowOnboardingTour,
  } = useSimStore((s) => ({
    activeTab: s.ui.activeTab,
    setActiveTab: s.setActiveTab,
    setShowExportModal: s.setShowExportModal,
    setShowTermsModal: s.setShowTermsModal,
    setShowClassroomMode: s.setShowClassroomMode,
    setShowOnboardingTour: s.setShowOnboardingTour,
  }));

  // Auto-launch guided tour on first visit
  useEffect(() => {
    const hasCompleted = localStorage.getItem('geopave_tour_completed');
    if (!hasCompleted) {
      setShowOnboardingTour(true);
    }
  }, [setShowOnboardingTour]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col" style={{ fontFamily: 'Inter, Roboto, Segoe UI, sans-serif' }}>

      {/* Global Modals */}
      <MicroViewModal />
      <ReportExportModal />
      <TermsOfUseModal />
      <ClassroomModeModal />
      <OnboardingTour />

      {/* ─── HEADER ─── */}
      <header className="border-b border-slate-800 bg-slate-900/95 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 py-2.5 flex items-center justify-between gap-3 sm:gap-4">
          {/* Logo + title */}
          <div className="flex items-center gap-2.5 min-w-0 flex-shrink-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg flex-shrink-0">
              <span className="text-base">🛣️</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base text-white leading-none">GeoPave India</span>
                <span className="hidden xl:inline-block px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 text-[10px] font-mono border border-blue-800/60 font-semibold">
                  IRC:37
                </span>
              </div>
              <div className="text-[11px] text-slate-400 truncate hidden lg:block leading-tight mt-0.5 max-w-[260px]">
                Flexible Pavement Simulator
              </div>
            </div>
          </div>

          {/* Nav tabs */}
          <nav className="flex items-center gap-1 bg-slate-800/70 border border-slate-700/60 rounded-xl p-1 flex-shrink-0 overflow-x-auto scrollbar-hide">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 focus:outline-2 focus:outline-offset-2 focus-visible:outline-2 focus:outline-blue-400 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-900/50'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/60'
                }`}
                title={tab.title}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Quick Action Utilities (Classroom Mode, Tour, Export) */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setShowOnboardingTour(true)}
              className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-xs text-slate-300 font-medium whitespace-nowrap transition focus:outline-2 focus:outline-offset-2 focus-visible:outline-2 focus:outline-blue-400"
              title="Start student orientation tour"
            >
              <span>💡</span> Tour
            </button>

            <button
              onClick={() => setShowClassroomMode(true)}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-600/40 bg-amber-950/30 hover:bg-amber-900/40 text-xs text-amber-300 font-semibold whitespace-nowrap transition shadow-sm focus:outline-2 focus:outline-offset-2 focus-visible:outline-2 focus:outline-blue-400"
              title="High-contrast projector mode for instructors"
            >
              <span>🎓</span> Classroom
            </button>

            <button
              onClick={() => setShowExportModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold whitespace-nowrap transition shadow-md shadow-blue-900/40 focus:outline-2 focus:outline-offset-2 focus-visible:outline-2 focus:outline-blue-400"
              title="Export watermarked simulation report (PDF / JSON)"
            >
              <span>📄</span> Export
            </button>
          </div>
        </div>
      </header>

      {/* ─── MAIN CONTENT ─── */}
      <main className="flex-1 max-w-screen-2xl mx-auto w-full px-4 lg:px-8 py-6">

        {/* ── SIMULATOR TAB ── */}
        {activeTab === 'simulator' && (
          <div className="grid grid-cols-1 xl:grid-cols-[290px_1fr_310px] gap-5">

            {/* Left: Controls */}
            <aside className="space-y-4 overflow-y-auto max-h-[calc(100vh-120px)] scrollbar-hide">
              <SidebarSection title="Simulation & Layer Controls" defaultOpen={true}>
                <ControlsPanel />
              </SidebarSection>
            </aside>

            {/* Center: Visualization */}
            <div className="space-y-4">
              {/* Pavement canvas */}
              <div className="rounded-2xl border border-slate-700/50 bg-slate-900/40 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h2 className="font-bold text-white text-sm">Flexible Pavement Cross-Section</h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Real-time thickness scaling • Dual wheel axle load • Click Geogrid/Geotextile badges to inspect micro-view
                    </p>
                  </div>
                  <div className="text-xs text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 rounded px-2.5 py-1 font-mono">
                    IRC:37-2018 Mechanistic
                  </div>
                </div>

                <div className="flex justify-center">
                  <PavementCrossSection width={540} height={530} />
                </div>

                <AnimationProgressBar />
              </div>

              {/* Mobile: Layer panel below on small screens */}
              <div className="xl:hidden">
                <SidebarSection title="Layer Details & Specs" defaultOpen={false}>
                  <LayerInfoPanel />
                </SidebarSection>
              </div>
            </div>

            {/* Right: Layer info + Metrics */}
            <aside className="space-y-4 overflow-y-auto max-h-[calc(100vh-120px)] scrollbar-hide">
              <SidebarSection title="Layer Details & Specs" defaultOpen={true}>
                <LayerInfoPanel />
              </SidebarSection>
              <SidebarSection title="Engineering Metrics & Savings" defaultOpen={true}>
                <MetricsPanel />
              </SidebarSection>
            </aside>
          </div>
        )}

        {/* ── INTRO / OVERVIEW TAB ── */}
        {activeTab === 'intro' && (
          <Suspense fallback={<LoadingSpinner />}>
            <IntroPage />
          </Suspense>
        )}

        {/* ── COMPARE TAB ── */}
        {activeTab === 'compare' && (
          <Suspense fallback={<LoadingSpinner />}>
            <CompareTab />
          </Suspense>
        )}

        {/* ── PHYSICAL MODEL & SPECS TAB ── */}
        {activeTab === 'physical-model' && (
          <Suspense fallback={<LoadingSpinner />}>
            <PhysicalModelTab />
          </Suspense>
        )}

        {/* ── LEARN TAB ── */}
        {activeTab === 'learn' && (
          <Suspense fallback={<LoadingSpinner />}>
            <LearnTab />
          </Suspense>
        )}
      </main>

      {/* ─── FOOTER (ANTIGRAVITY.MD §3.1 & §3.2 COMPLIANT) ─── */}
      <footer className="border-t border-slate-800 bg-slate-900/80 mt-auto">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            GeoPave India v0.2.0 &nbsp;·&nbsp; College Project & Exhibition Edition &nbsp;·&nbsp; © {new Date().getFullYear()} Biswajeet Bishoyi
          </div>
          <div className="flex items-center gap-3">
            <span>IRC:37-2018</span>
            <span>·</span>
            <span>IRC:SP:59-2018</span>
            <span>·</span>
            <span>MoRTH Section 700</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="mailto:bishoyibiswajeet@gmail.com"
              className="text-slate-400 hover:text-blue-400 underline underline-offset-2 transition"
              title="Contact Author"
            >
              ✉️ bishoyibiswajeet@gmail.com
            </a>
            <span>·</span>
            <button
              onClick={() => setShowTermsModal(true)}
              className="text-amber-400/90 hover:text-amber-300 underline underline-offset-2 transition focus:outline-2 focus:outline-offset-2 focus-visible:outline-2 focus:outline-blue-400"
            >
              Terms of Use & Legal Disclaimer
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
