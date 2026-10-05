/**
 * TermsOfUseModal Component
 * Conforming strictly to ANTIGRAVITY.md Section 3.2 & CLAUDE.md Section 35:
 * - Legal Protection & Liability Waiver
 * - Educational Boundary Definition
 * - Non-Reliance & Professional Engineer Requirement
 */

import React, { useState, useEffect } from 'react';
import { useSimStore } from '../store/useSimStore';

export const TermsOfUseModal: React.FC = () => {
  const { showTermsModal, setShowTermsModal } = useSimStore((s) => ({
    showTermsModal: s.ui.showTermsModal,
    setShowTermsModal: s.setShowTermsModal,
  }));

  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const hasAgreed = localStorage.getItem('geopave_terms_agreed');
    if (hasAgreed) setAccepted(true);
  }, []);

  if (!showTermsModal) return null;

  const handleAgree = () => {
    localStorage.setItem('geopave_terms_agreed', new Date().toISOString());
    setAccepted(true);
    setShowTermsModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">⚖️</span>
            <div>
              <h2 className="text-base font-bold text-white">Terms of Use & Legal Disclaimer</h2>
              <p className="text-xs text-slate-400">Statutory Guidance for GeoPave India</p>
            </div>
          </div>
          <button
            onClick={() => setShowTermsModal(false)}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-sm font-bold transition"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-300 leading-relaxed">
          <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-700/40 text-amber-200">
            <strong>IMPORTANT:</strong> By accessing or using GeoPave India, you acknowledge and agree that this software is an educational visualization and conceptual simulator, NOT a stamped civil engineering design calculator.
          </div>

          <section className="space-y-1.5">
            <h3 className="font-bold text-white text-sm">1. Educational & Academic Purpose Only</h3>
            <p className="text-slate-400">
              GeoPave India is created for university engineering coursework, laboratory demonstrations, and conceptual understanding of flexible pavement mechanics. It is <strong>NOT</strong>:
            </p>
            <ul className="list-disc pl-5 space-y-0.5 text-slate-400">
              <li>A structural pavement design calculator.</li>
              <li>A replacement for professional mechanistic-empirical design tools (e.g., IITPAVE, KENPAVE, AASHTOware).</li>
              <li>A Finite Element Method (FEM) geotechnical solver.</li>
              <li>Certified or stamped for construction contract specifications or tender documents.</li>
            </ul>
          </section>

          <section className="space-y-1.5">
            <h3 className="font-bold text-white text-sm">2. Limitation of Liability</h3>
            <p className="text-slate-400">
              GeoPave India and its author (Biswajeet Bishoyi) provide this tool on an "AS-IS" and "AS-AVAILABLE" basis without warranties of any kind, whether express or implied. Under no circumstances shall the creators be liable for:
            </p>
            <ul className="list-disc pl-5 space-y-0.5 text-slate-400">
              <li>Pavement structural distress, rutting, cracking, or catastrophic road failure resulting from using this software.</li>
              <li>Financial, commercial, or professional losses incurred by contractors, consultants, or road agencies.</li>
              <li>Discrepancies between illustrative simulation numbers and field plate load or falling weight deflectometer (FWD) test results.</li>
            </ul>
          </section>

          <section className="space-y-1.5">
            <h3 className="font-bold text-white text-sm">3. Mandatory Professional Consultation</h3>
            <p className="text-slate-400">
              For any real highway, urban road, or rural connectivity project, you must engage licensed professional civil engineers and strictly adhere to:
            </p>
            <ul className="list-disc pl-5 space-y-0.5 text-slate-400">
              <li><strong>IRC:37-2018:</strong> Guidelines for the Design of Flexible Pavements.</li>
              <li><strong>IRC:SP:59-2018:</strong> Guidelines for Use of Geosynthetics in Road Pavements.</li>
              <li><strong>MoRTH Specifications:</strong> 5th Revision for Road and Bridge Works.</li>
            </ul>
          </section>

          <section className="space-y-1.5">
            <h3 className="font-bold text-white text-sm">4. Contact & Inquiries</h3>
            <p className="text-slate-400">
              For academic citations, capstone project inquiries, or corrections, contact: <a href="mailto:biswajeet@geopave.edu" className="text-blue-400 underline">biswajeet@geopave.edu</a>.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between flex-shrink-0">
          <div className="text-[11px] text-slate-500">
            {accepted ? '✓ Terms accepted on this browser' : 'Please review and accept terms'}
          </div>
          <button
            onClick={handleAgree}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition shadow-lg shadow-blue-900/50"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUseModal;
