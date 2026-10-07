import { describe, it, expect, beforeEach } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { PavementCrossSection } from '../../src/components/PavementCrossSection';
import { useSimStore } from '../../src/store/useSimStore';

describe('PavementCrossSection Component', () => {
  beforeEach(() => {
    // Reset store state to default before each test
    useSimStore.getState().resetToDefaults();
  });

  describe('Accessibility (WCAG 2.1 AA)', () => {
    it('renders SVG with role="img" and descriptive aria-label', () => {
      render(<PavementCrossSection />);
      const svg = screen.getByRole('img');
      expect(svg).toBeDefined();
      expect(svg.getAttribute('aria-label')).toBe(
        'Flexible pavement cross-section showing load propagation through layers'
      );
    });

    it('contains accessibility title and description inside SVG', () => {
      const { container } = render(<PavementCrossSection />);
      const title = container.querySelector('title');
      const desc = container.querySelector('desc');

      expect(title).toBeDefined();
      expect(title?.textContent).toBe('Pavement Cross-Section Visualization');
      expect(desc).toBeDefined();
      expect(desc?.textContent).toContain('Bituminous Concrete (BC)');
      expect(desc?.textContent).toContain('Dense Bituminous Macadam (DBM)');
      expect(desc?.textContent).toContain('Wet Mix Macadam (WMM)');
      expect(desc?.textContent).toContain('Granular Sub-Base (GSB)');
      expect(desc?.textContent).toContain('subgrade');
    });
  });

  describe('Dimensions & Viewport', () => {
    it('renders with default width (540) and height (520)', () => {
      render(<PavementCrossSection />);
      const svg = screen.getByRole('img');
      expect(svg.getAttribute('width')).toBe('540');
      expect(svg.getAttribute('height')).toBe('520');
      expect(svg.getAttribute('viewBox')).toBe('0 0 540 520');
    });

    it('renders with custom dimensions when provided via props', () => {
      render(<PavementCrossSection width={600} height={450} />);
      const svg = screen.getByRole('img');
      expect(svg.getAttribute('width')).toBe('600');
      expect(svg.getAttribute('height')).toBe('450');
      expect(svg.getAttribute('viewBox')).toBe('0 0 600 450');
    });
  });

  describe('Pavement Layer Rendering', () => {
    it('renders all structural pavement layers with labels', () => {
      render(<PavementCrossSection />);

      // Layer labels in SVG
      expect(screen.getByText(/Bituminous Concrete \(BC\)/i)).toBeDefined();
      expect(screen.getByText(/Dense Bituminous Macadam \(DBM\)/i)).toBeDefined();
      expect(screen.getByText(/Wet Mix Macadam \(WMM\)/i)).toBeDefined();
      expect(screen.getByText(/Granular Sub-Base \(GSB\)/i)).toBeDefined();
      expect(screen.getByText(/Subgrade \(CBR:/i)).toBeDefined();
    });

    it('displays user configured layer thicknesses', () => {
      render(<PavementCrossSection />);

      const state = useSimStore.getState();
      const th = state.controls.layerThicknesses;

      expect(screen.getAllByText(`${th.bc} mm`).length).toBeGreaterThan(0);
      expect(screen.getAllByText(`${th.dbm} mm`).length).toBeGreaterThan(0);
      expect(screen.getAllByText(`${th.wmm} mm`).length).toBeGreaterThan(0);
      expect(screen.getAllByText(`${th.gsb} mm`).length).toBeGreaterThan(0);
    });
  });

  describe('Animation & Stress Visualization States', () => {
    it('does not render stress bulb group when animation is idle', () => {
      const { container } = render(<PavementCrossSection />);
      const stressGroup = container.querySelector('#stressVisualization');
      expect(stressGroup).toBeNull();
    });

    it('renders Boussinesq stress isobars when animation is active', () => {
      useSimStore.getState().setAnimationState('playing');
      useSimStore.getState().setAnimationProgress(0.7);

      const { container } = render(<PavementCrossSection />);
      const stressGroup = container.querySelector('#stressVisualization');
      expect(stressGroup).not.toBeNull();

      // Isobars should be present
      expect(screen.getByText('0.2p')).toBeDefined();
      expect(screen.getByText('0.5p')).toBeDefined();
      expect(screen.getByText('0.8p')).toBeDefined();
      expect(screen.getByText(/Boussinesq Stress Distribution/i)).toBeDefined();
    });
  });

  describe('Geosynthetic Inspection Badges', () => {
    it('renders geogrid badge when geogrid mode is enabled', () => {
      useSimStore.getState().setPavementMode('geogrid');
      render(<PavementCrossSection />);

      expect(screen.getByText(/GEOGRID:/i)).toBeDefined();
    });

    it('renders geotextile badge when geotextile mode is enabled', () => {
      useSimStore.getState().setPavementMode('geotextile');
      render(<PavementCrossSection />);

      expect(screen.getByText(/GEOTEXTILE:/i)).toBeDefined();
    });
  });
});
