import { describe, it, expect } from 'vitest';
import { runSimulation, validateInput } from '../simulationEngine';
import type { SimulationInput } from '../../types/simulation';

const createTestInput = (overrides?: Partial<SimulationInput>): SimulationInput => ({
  trafficConfig: {
    level: 'heavy',
    vehicleType: 'truck',
  },
  subgradeConfig: {
    condition: 'weak',
    cbr: 3,
  },
  pavementConfig: {
    layers: [],
    geogrid: false,
    geotextile: false,
    layerThicknesses: {
      bc: 50,
      dbm: 100,
      wmm: 250,
      gsb: 200,
    },
  },
  ...overrides,
});

describe('Simulation Engine', () => {
  it('validates correct inputs and catches invalid traffic inputs', () => {
    const valid = validateInput(createTestInput());
    expect(valid.valid).toBe(true);

    const invalid = validateInput(createTestInput({
      trafficConfig: {
        level: 'supersonic' as any,
        vehicleType: 'truck',
      },
    }));
    expect(invalid.valid).toBe(false);
    expect(invalid.errors?.length).toBeGreaterThan(0);
  });

  it('calculates deterministic IRC:37 resilient modulus (MR) based on CBR', () => {
    // For CBR <= 5: MR = 10 * CBR
    const lowCbrInput = createTestInput({
      subgradeConfig: { condition: 'weak', cbr: 3 },
    });
    const lowCbrOutput = runSimulation(lowCbrInput);
    expect(lowCbrOutput.engineeringMetrics.resilientModulusMR).toBe(30); // 10 * 3

    // For CBR > 5: MR = 17.6 * CBR^0.64
    const highCbrInput = createTestInput({
      subgradeConfig: { condition: 'good', cbr: 8 },
    });
    const highCbrOutput = runSimulation(highCbrInput);
    const expectedMr = Math.round(17.6 * Math.pow(8, 0.64));
    expect(highCbrOutput.engineeringMetrics.resilientModulusMR).toBe(expectedMr);
  });

  it('demonstrates geogrid confinement and TBR improvement', () => {
    const withoutGrid = runSimulation(createTestInput({
      pavementConfig: {
        layers: [],
        geogrid: false,
        geotextile: false,
        layerThicknesses: { bc: 50, dbm: 100, wmm: 250, gsb: 200 },
      },
    }));

    const withGrid = runSimulation(createTestInput({
      pavementConfig: {
        layers: [],
        geogrid: true,
        geogridGradeId: 'bx-3030',
        geotextile: false,
        layerThicknesses: { bc: 50, dbm: 100, wmm: 250, gsb: 200 },
      },
    }));

    // Confinement index is higher with geogrid
    expect(withGrid.aggregateResponse.confinementIndex).toBeGreaterThan(withoutGrid.aggregateResponse.confinementIndex);

    // Lateral movement is reduced with geogrid
    expect(withGrid.aggregateResponse.lateralMovementMagnitude).toBeLessThan(withoutGrid.aggregateResponse.lateralMovementMagnitude);

    // TBR is > 1.0 with geogrid
    expect(withGrid.engineeringMetrics.trafficBenefitRatioTBR).toBeGreaterThan(1.0);

    // BCR percentage is positive with geogrid
    expect(withGrid.engineeringMetrics.baseCourseReductionBCR).toBeGreaterThan(0);
  });

  it('demonstrates geotextile separation preventing subgrade pumping', () => {
    const withoutTex = runSimulation(createTestInput({
      pavementConfig: {
        layers: [],
        geogrid: false,
        geotextile: false,
        layerThicknesses: { bc: 50, dbm: 100, wmm: 250, gsb: 200 },
      },
    }));

    const withTex = runSimulation(createTestInput({
      pavementConfig: {
        layers: [],
        geogrid: false,
        geotextile: true,
        geotextileGradeId: 'nw-200',
        layerThicknesses: { bc: 50, dbm: 100, wmm: 250, gsb: 200 },
      },
    }));

    // With geotextile, separation quality is 'present'
    expect(withTex.layerInteraction.separationQuality).toBe('present');
    expect(withoutTex.layerInteraction.separationQuality).toBe('absent');

    // Soil migration risk is substantially reduced
    expect(withTex.layerInteraction.soilMigrationRisk).toBeLessThan(withoutTex.layerInteraction.soilMigrationRisk);

    // withGeotextileEffect is positive
    expect(withTex.layerInteraction.withGeotextileEffect).toBeGreaterThan(0);
  });
});
