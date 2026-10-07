/**
 * Pavement Types and Data Structures
 * Core type definitions for flexible pavement simulation
 */

/**
 * Supported pavement layer types
 */
export type LayerType = 'bc' | 'dbm' | 'wmm' | 'gsb' | 'subgrade' | 'geogrid' | 'geotextile';

/**
 * Traffic level classification
 */
export type TrafficLevel = 'light' | 'medium' | 'heavy' | 'very_heavy';

/**
 * Subgrade condition classification
 */
export type SubgradeCondition = 'good' | 'moderate' | 'weak' | 'wet_poor_drainage';

/**
 * Vehicle/wheel load type
 */
export type VehicleType = 'light_vehicle' | 'bus' | 'truck' | 'heavy_truck';

/**
 * User-configurable layer thicknesses in mm
 */
export interface LayerThicknesses {
  bc: number;   // 30–80 mm
  dbm: number;  // 50–160 mm
  wmm: number;  // 150–300 mm
  gsb: number;  // 150–300 mm
}

/**
 * Definition of a single pavement layer
 */
export interface LayerDefinition {
  id: LayerType;
  name: string;
  material: string;
  typicalThickness: {
    min: number;
    max: number;
  };
  typicalThicknessUnit: string;
  functions: string[];
  position: string;
  responseToLoad: string;
  importance: string;
  learnMore: string;
  reference: string;
}

/**
 * Pavement configuration (which layers are present, geosynthetics, etc.)
 */
export interface PavementConfiguration {
  layers: LayerDefinition[];
  layerThicknesses?: LayerThicknesses;
  geogrid: boolean;
  hasGeogrid?: boolean; // Standardized alias for geogrid flag
  geogridPosition?: string; // e.g., 'within-wmm', 'wmm-gsb-interface'
  geogridGradeId?: string;
  geotextile: boolean;
  hasGeotextile?: boolean; // Standardized alias for geotextile flag
  geotextilePosition?: string; // e.g., 'above-subgrade'
  geotextileGradeId?: string;
}

/**
 * Traffic configuration
 */
export interface TrafficConfiguration {
  level: TrafficLevel;
  vehicleType: VehicleType;
  loadRepetitions?: number;
  designTrafficMSA?: number; // Million Standard Axles
}

/**
 * Subgrade soil configuration
 */
export interface SubgradeConfiguration {
  condition: SubgradeCondition;
  cbr?: number; // California Bearing Ratio in % (2 to 15)
  resilientModulusMR?: number; // Subgrade Resilient Modulus in MPa (IRC:37)
  moisture?: number; // 0-1 scale, where 1 = saturated
}
