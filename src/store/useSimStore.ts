/**
 * GeoPave India — Global Zustand Store
 * Manages simulation state, layer thicknesses, CBR, geosynthetic specs,
 * physical model UI, export reports, classroom mode, and terms of use.
 */

import { create } from 'zustand';
import type { TrafficLevel, SubgradeCondition, VehicleType, LayerThicknesses } from '@gptypes/pavement';
import type { SimulationOutput } from '@gptypes/simulation';
import { runSimulation } from '@engine/simulationEngine';
import { pavementLayersData } from '@data/pavementLayers';
import { scenarios, type Scenario } from '@data/scenarios';

export type PavementMode = 'conventional' | 'geogrid' | 'geotextile' | 'combined';
export type AnimationState = 'idle' | 'playing' | 'paused' | 'complete';
export type ActiveTab = 'intro' | 'simulator' | 'compare' | 'physical-model' | 'learn';

export interface SimControls {
  pavementMode: PavementMode;
  trafficLevel: TrafficLevel;
  vehicleType: VehicleType;
  subgradeCondition: SubgradeCondition;
  cbr: number; // California Bearing Ratio in % (2 to 15)
  layerThicknesses: LayerThicknesses;
  selectedGeogridType: string;
  selectedGeotextileType: string;
  animationSpeed: number;
}

export interface UIState {
  activeTab: ActiveTab;
  selectedLayerId: string | null;
  animationState: AnimationState;
  animationProgress: number;
  showAdvanced: boolean;
  activeScenario: string | null;
  showPhysicalModelModal: boolean;
  showMicroView: 'none' | 'geogrid' | 'geotextile';
  showExportModal: boolean;
  showTermsModal: boolean;
  showClassroomMode: boolean;
  showOnboardingTour: boolean;
}

interface SimStore {
  controls: SimControls;
  ui: UIState;
  result: SimulationOutput | null;

  setTrafficLevel: (level: TrafficLevel) => void;
  setVehicleType: (type: VehicleType) => void;
  setSubgradeCondition: (cond: SubgradeCondition) => void;
  setCBR: (cbr: number) => void;
  setLayerThickness: (layer: keyof LayerThicknesses, val: number) => void;
  setSelectedGeogridType: (id: string) => void;
  setSelectedGeotextileType: (id: string) => void;
  setPavementMode: (mode: PavementMode) => void;
  setAnimationSpeed: (speed: number) => void;
  setActiveTab: (tab: ActiveTab) => void;
  setSelectedLayer: (id: string | null) => void;
  setAnimationState: (state: AnimationState) => void;
  setAnimationProgress: (p: number) => void;
  toggleAdvanced: () => void;
  setShowPhysicalModelModal: (show: boolean) => void;
  setShowMicroView: (view: 'none' | 'geogrid' | 'geotextile') => void;
  setShowExportModal: (show: boolean) => void;
  setShowTermsModal: (show: boolean) => void;
  setShowClassroomMode: (show: boolean) => void;
  setShowOnboardingTour: (show: boolean) => void;
  loadScenario: (id: string) => void;
  runSim: () => void;
  resetAnimation: () => void;
}

const defaultControls: SimControls = {
  pavementMode: 'conventional',
  trafficLevel: 'medium',
  vehicleType: 'truck',
  subgradeCondition: 'moderate',
  cbr: 4,
  layerThicknesses: {
    bc: 40,
    dbm: 100,
    wmm: 250,
    gsb: 200,
  },
  selectedGeogridType: 'bx3030',
  selectedGeotextileType: 'nw200',
  animationSpeed: 1,
};

const defaultUI: UIState = {
  activeTab: 'intro',
  selectedLayerId: null,
  animationState: 'idle',
  animationProgress: 0,
  showAdvanced: false,
  activeScenario: 'moderate_standard',
  showPhysicalModelModal: false,
  showMicroView: 'none',
  showExportModal: false,
  showTermsModal: false,
  showClassroomMode: false,
  showOnboardingTour: false,
};

function buildSimInput(controls: SimControls) {
  return {
    pavementConfig: {
      layers: Object.values(pavementLayersData),
      layerThicknesses: controls.layerThicknesses,
      geogrid: controls.pavementMode === 'geogrid' || controls.pavementMode === 'combined',
      geogridGradeId: controls.selectedGeogridType,
      geotextile: controls.pavementMode === 'geotextile' || controls.pavementMode === 'combined',
      geotextileGradeId: controls.selectedGeotextileType,
    },
    trafficConfig: {
      level: controls.trafficLevel,
      vehicleType: controls.vehicleType,
    },
    subgradeConfig: {
      condition: controls.subgradeCondition,
      cbr: controls.cbr,
    },
  };
}

export const useSimStore = create<SimStore>((set, get) => ({
  controls: defaultControls,
  ui: defaultUI,
  result: null,

  setTrafficLevel: (level) =>
    set((s) => ({ controls: { ...s.controls, trafficLevel: level } })),

  setVehicleType: (type) =>
    set((s) => ({ controls: { ...s.controls, vehicleType: type } })),

  setSubgradeCondition: (cond) => {
    const cbrMap: Record<SubgradeCondition, number> = {
      good: 8,
      moderate: 5,
      weak: 3,
      wet_poor_drainage: 2,
    };
    set((s) => ({
      controls: { ...s.controls, subgradeCondition: cond, cbr: cbrMap[cond] || 4 },
    }));
  },

  setCBR: (cbr) => {
    let cond: SubgradeCondition = 'moderate';
    if (cbr < 3) cond = 'wet_poor_drainage';
    else if (cbr < 5) cond = 'weak';
    else if (cbr < 8) cond = 'moderate';
    else cond = 'good';

    set((s) => ({
      controls: { ...s.controls, cbr, subgradeCondition: cond },
    }));
  },

  setLayerThickness: (layer, val) =>
    set((s) => ({
      controls: {
        ...s.controls,
        layerThicknesses: { ...s.controls.layerThicknesses, [layer]: val },
      },
    })),

  setSelectedGeogridType: (id) =>
    set((s) => ({ controls: { ...s.controls, selectedGeogridType: id } })),

  setSelectedGeotextileType: (id) =>
    set((s) => ({ controls: { ...s.controls, selectedGeotextileType: id } })),

  setPavementMode: (mode) =>
    set((s) => ({
      controls: { ...s.controls, pavementMode: mode },
      ui: { ...s.ui, activeScenario: null },
    })),

  setAnimationSpeed: (speed) =>
    set((s) => ({ controls: { ...s.controls, animationSpeed: speed } })),

  setActiveTab: (tab) =>
    set((s) => ({ ui: { ...s.ui, activeTab: tab } })),

  setSelectedLayer: (id) =>
    set((s) => ({ ui: { ...s.ui, selectedLayerId: id } })),

  setAnimationState: (state) =>
    set((s) => ({ ui: { ...s.ui, animationState: state } })),

  setAnimationProgress: (p) =>
    set((s) => ({ ui: { ...s.ui, animationProgress: p } })),

  toggleAdvanced: () =>
    set((s) => ({ ui: { ...s.ui, showAdvanced: !s.ui.showAdvanced } })),

  setShowPhysicalModelModal: (show) =>
    set((s) => ({ ui: { ...s.ui, showPhysicalModelModal: show } })),

  setShowMicroView: (view) =>
    set((s) => ({ ui: { ...s.ui, showMicroView: view } })),

  setShowExportModal: (show) =>
    set((s) => ({ ui: { ...s.ui, showExportModal: show } })),

  setShowTermsModal: (show) =>
    set((s) => ({ ui: { ...s.ui, showTermsModal: show } })),

  setShowClassroomMode: (show) =>
    set((s) => ({ ui: { ...s.ui, showClassroomMode: show } })),

  setShowOnboardingTour: (show) =>
    set((s) => ({ ui: { ...s.ui, showOnboardingTour: show } })),

  loadScenario: (id) => {
    const scenario: Scenario | undefined = scenarios.find((sc) => sc.id === id);
    if (!scenario) return;
    const modeMap: Record<string, PavementMode> = {
      conventional: 'conventional',
      geogrid: 'geogrid',
      geotextile: 'geotextile',
      combined: 'combined',
    };
    const mode: PavementMode = modeMap[scenario.pavementType] ?? 'conventional';
    const cbrMap: Record<SubgradeCondition, number> = {
      good: 8,
      moderate: 5,
      weak: 3,
      wet_poor_drainage: 2,
    };
    const cbr = cbrMap[scenario.input.subgradeConfig.condition] || 4;

    set((s) => ({
      controls: {
        ...s.controls,
        pavementMode: mode,
        trafficLevel: scenario.input.trafficConfig.level,
        vehicleType: scenario.input.trafficConfig.vehicleType,
        subgradeCondition: scenario.input.subgradeConfig.condition,
        cbr,
      },
      ui: { ...s.ui, activeScenario: id, animationState: 'idle', animationProgress: 0 },
      result: null,
    }));
  },

  runSim: () => {
    const { controls } = get();
    try {
      const input = buildSimInput(controls);
      const result = runSimulation(input);
      set((s) => ({
        result,
        ui: { ...s.ui, animationState: 'playing', animationProgress: 0 },
      }));
    } catch (e) {
      console.error('Simulation error:', e);
    }
  },

  resetAnimation: () =>
    set((s) => ({
      ui: { ...s.ui, animationState: 'idle', animationProgress: 0 },
      result: null,
    })),
}));
