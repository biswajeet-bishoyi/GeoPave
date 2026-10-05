/**
 * Pre-configured Scenarios
 * Common pavement situations for demonstration and learning
 */

import type { SimulationInput } from '@gptypes/simulation';

export interface Scenario {
  id: string;
  name: string;
  description: string;
  pavementType: 'conventional' | 'geogrid' | 'geotextile' | 'combined';
  input: SimulationInput;
}

export const scenarios: Scenario[] = [
  {
    id: 'standard_good',
    name: 'Standard Traffic, Good Subgrade',
    description:
      'Typical condition for urban roads. Good subgrade (CBR >5%), moderate traffic. Conventional pavement sufficient.',
    pavementType: 'conventional',
    input: {
      pavementConfig: {
        layers: [],
        geogrid: false,
        geotextile: false,
      },
      trafficConfig: {
        level: 'medium',
        vehicleType: 'truck',
        loadRepetitions: 10,
      },
      subgradeConfig: {
        condition: 'good',
        cbr: 6,
        moisture: 0.3,
      },
    },
  },

  {
    id: 'heavy_good',
    name: 'Heavy Traffic, Good Subgrade',
    description:
      'Highway or high-traffic urban road. Good subgrade but significant traffic loading. Thicker conventional pavement required.',
    pavementType: 'conventional',
    input: {
      pavementConfig: {
        layers: [],
        geogrid: false,
        geotextile: false,
      },
      trafficConfig: {
        level: 'very_heavy',
        vehicleType: 'heavy_truck',
        loadRepetitions: 30,
      },
      subgradeConfig: {
        condition: 'good',
        cbr: 5,
        moisture: 0.4,
      },
    },
  },

  {
    id: 'light_weak',
    name: 'Light Traffic, Weak Subgrade',
    description:
      'Rural or secondary road with weak subgrade (CBR 2–3%). Light traffic. Geosynthetics can economically improve pavement.',
    pavementType: 'combined',
    input: {
      pavementConfig: {
        layers: [],
        geogrid: true,
        geogridPosition: 'wmm-gsb-interface',
        geotextile: true,
        geotextilePosition: 'above-subgrade',
      },
      trafficConfig: {
        level: 'light',
        vehicleType: 'bus',
        loadRepetitions: 5,
      },
      subgradeConfig: {
        condition: 'weak',
        cbr: 2.5,
        moisture: 0.5,
      },
    },
  },

  {
    id: 'heavy_weak',
    name: 'Heavy Traffic, Weak Subgrade',
    description:
      'Challenging condition: weak subgrade with high traffic. Geosynthetics essential to prevent excessive rutting and early failure.',
    pavementType: 'combined',
    input: {
      pavementConfig: {
        layers: [],
        geogrid: true,
        geogridPosition: 'wmm-gsb-interface',
        geotextile: true,
        geotextilePosition: 'above-subgrade',
      },
      trafficConfig: {
        level: 'very_heavy',
        vehicleType: 'heavy_truck',
        loadRepetitions: 50,
      },
      subgradeConfig: {
        condition: 'weak',
        cbr: 2,
        moisture: 0.6,
      },
    },
  },

  {
    id: 'wet_poor_drainage',
    name: 'Wet/Poor Drainage Subgrade',
    description:
      'High water table or poor drainage area. Subgrade moisture reduces bearing capacity. Geotextile separation and drainage critical.',
    pavementType: 'geotextile',
    input: {
      pavementConfig: {
        layers: [],
        geogrid: false,
        geotextile: true,
        geotextilePosition: 'above-subgrade',
      },
      trafficConfig: {
        level: 'medium',
        vehicleType: 'truck',
        loadRepetitions: 15,
      },
      subgradeConfig: {
        condition: 'wet_poor_drainage',
        cbr: 1.5,
        moisture: 0.85,
      },
    },
  },

  {
    id: 'moderate_standard',
    name: 'Moderate Condition (Baseline)',
    description:
      'Reference scenario: moderate traffic, moderate subgrade. Shows baseline pavement performance and layer interaction.',
    pavementType: 'conventional',
    input: {
      pavementConfig: {
        layers: [],
        geogrid: false,
        geotextile: false,
      },
      trafficConfig: {
        level: 'medium',
        vehicleType: 'truck',
        loadRepetitions: 12,
      },
      subgradeConfig: {
        condition: 'moderate',
        cbr: 3.5,
        moisture: 0.5,
      },
    },
  },
];

export function getScenarioById(id: string): Scenario | undefined {
  return scenarios.find((s) => s.id === id);
}

export function getScenariosByPavementType(type: string): Scenario[] {
  return scenarios.filter((s) => s.pavementType === type);
}
