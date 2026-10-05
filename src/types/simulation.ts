/**
 * Simulation Engine Types
 * Core output and result structures
 */

import type {
  PavementConfiguration,
  TrafficConfiguration,
  SubgradeConfiguration,
} from './pavement';

/**
 * Simulation input combining all configuration
 */
export interface SimulationInput {
  pavementConfig: PavementConfiguration;
  trafficConfig: TrafficConfiguration;
  subgradeConfig: SubgradeConfiguration;
}

/**
 * Load distribution results
 */
export interface LoadDistribution {
  index: number; // 0-100, relative indicator
  loadPath: Vector[];
  stressBulb: StressBulb;
  label: 'Conceptual load-transfer visualization';
}

/**
 * Stress bulb geometry
 */
export interface StressBulb {
  depthZone: number; // depth of stress influence
  lateralSpread: number; // lateral spread at max depth
  intensityProfile: number[]; // intensity values by depth
}

/**
 * 2D vector for load paths
 */
export interface Vector {
  x: number;
  y: number;
}

/**
 * Aggregate particle response to loading
 */
export interface AggregateResponse {
  confinementIndex: number; // 0-100, how confined particles are
  lateralMovementMagnitude: number; // 0-100, relative movement
  withGeogridEffect: number; // % reduction with geogrid
  label: 'Illustrative indicator';
}

/**
 * Layer interaction (separation, filtration, etc.)
 */
export interface LayerInteraction {
  separationQuality: 'present' | 'absent';
  soilMigrationRisk: number; // 0-100, higher = more risk
  withGeotextileEffect: number; // % improvement with geotextile
}

/**
 * Subgrade soil response
 */
export interface SubgradeResponse {
  deformationIndex: number; // 0-100, relative
  settlementTendency: number; // 0-100, relative
  rutFormationRisk: number; // 0-100, higher = more risk
  label: 'Illustrative indicator';
}

/**
 * Animation frame for visualization
 */
export interface AnimationFrame {
  time: number; // seconds elapsed
  progress: number; // 0-1
  layer: string; // which layer is active
  stressIntensity: number; // 0-100
  particles: ParticleState[];
  stressBulbState: StressBulbAnimationState;
  deformationZone: DeformationState;
  geogridEffect?: GeogridAnimationState;
  geotextileEffect?: GeotextileAnimationState;
}

/**
 * Particle state for animation
 */
export interface ParticleState {
  id: string;
  x: number; // current x position
  y: number; // current y position
  originalX: number; // initial position
  originalY: number; // initial position
  movement: Vector; // displacement vector
  opacity: number; // 0-1
}

/**
 * Stress bulb animation state
 */
export interface StressBulbAnimationState {
  x: number; // center x
  y: number; // center y
  width: number; // current width
  height: number; // current height
  intensity: number; // 0-100
  color: string; // CSS color
}

/**
 * Deformation/rut visualization
 */
export interface DeformationState {
  depth: number; // rut depth (relative)
  width: number; // rut width (relative)
  visible: boolean;
}

/**
 * Geogrid effect visualization
 */
export interface GeogridAnimationState {
  visible: boolean;
  confinement: number; // 0-1, how much particles confined
  gridOpacity: number; // 0-1
}

/**
 * Geotextile effect visualization
 */
export interface GeotextileAnimationState {
  visible: boolean;
  separation: boolean; // particles separated or not
  barrierOpacity: number; // 0-1
}

/**
 * All metrics output
 */
export interface MetricsOutput {
  loadDistributionIndex: {
    value: number; // 0-100
    label: 'Illustrative indicator';
  };
  aggregateConfinement: {
    value: number; // 0-100
    label: 'Relative indicator (with geogrid)';
  };
  subgradeResponse: {
    value: number; // 0-100
    label: 'Illustrative deformation tendency';
  };
  ruttingTendency: {
    value: number; // 0-100
    label: 'Illustrative rutting risk';
  };
  layerSeparationQuality: {
    value: 'present' | 'absent';
    label: 'Geotextile effect';
  };
}

import type {
  GeogridProperties,
  GeotextileProperties,
} from './geosynthetic';

/**
 * Engineering analysis output per IRC:37-2018 & IRC:SP:59-2018
 */
export interface EngineeringMetrics {
  subgradeCBR: number; // %
  resilientModulusMR: number; // MPa (calculated per IRC:37 Eq)
  verticalSubgradeStrain: number; // microstrain (με)
  tensileStrainBituminous: number; // microstrain (με)
  ruttingLifeMSA: number; // Million Standard Axles before 20mm rutting failure
  trafficBenefitRatioTBR: number; // Extension multiplier (e.g. 2.1x)
  baseCourseReductionBCR: number; // % allowable reduction in granular layer (e.g. 22%)
  allowableGranularReductionMm: number; // mm of granular thickness saved
  compositeModulusEffective: number; // MPa
  subgradeVerticalDeflectionMm: number; // mm under design wheel load
  materialSavings: {
    aggregateSavedPerKm: number; // m³/km for standard 2-lane 7.0m road + shoulders
    truckTripsSavedPerKm: number; // 16-ton tipper dumper trips eliminated
    costSavedPerKmLakhs: number; // Net ₹ Lakhs saved per km
    co2SavedPerKmTonnes: number; // Tonnes CO2 equivalent saved
  };
  geogridSpecs?: GeogridProperties;
  geotextileSpecs?: GeotextileProperties;
}

/**
 * Complete simulation output
 */
export interface SimulationOutput {
  loadDistribution: LoadDistribution;
  aggregateResponse: AggregateResponse;
  layerInteraction: LayerInteraction;
  subgradeResponse: SubgradeResponse;
  animationSequence: AnimationFrame[];
  metrics: MetricsOutput;
  engineeringMetrics: EngineeringMetrics;
}

/**
 * Validation result
 */
export interface ValidationResult {
  valid: boolean;
  errors?: string[];
}
