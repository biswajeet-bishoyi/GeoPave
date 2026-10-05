/**
 * UI State Types
 */

export interface UIState {
  currentTab: 'simulator' | 'learn' | 'references';
  layerExplorerOpen: boolean;
  selectedLayer?: string;
  comparisonMode: boolean;
  animationPlaying: boolean;
  engineeringViewOpen: boolean;
}

export interface ControlState {
  trafficLevel: 'light' | 'medium' | 'heavy' | 'very_heavy';
  vehicleType: 'light_vehicle' | 'bus' | 'truck' | 'heavy_truck';
  subgradeCondition: 'good' | 'moderate' | 'weak' | 'wet_poor_drainage';
  geosynthConfig: 'none' | 'geogrid' | 'geotextile' | 'both';
}
