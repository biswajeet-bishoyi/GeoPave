/**
 * Core Simulation Engine — Enhanced with IRC:37-2018 & IRC:SP:59-2018 Mechanistic-Empirical Models
 * Deterministic calculations for:
 * - Subgrade Resilient Modulus (MR) from CBR per IRC:37
 * - Layered Elastic Odemark Equivalent Thickness (Heq)
 * - Vertical Subgrade Compressive Strain (εv)
 * - IRC:37 Rutting Life (NR in MSA)
 * - IRC:SP:59 Traffic Benefit Ratio (TBR) & Base Course Reduction (BCR)
 * - Material, Cost (₹ Lakhs/km), and Carbon Savings (Tonnes CO2/km)
 * - MoRTH Section 700 Geogrid & Geotextile Properties
 */

import type {
  SimulationInput,
  SimulationOutput,
  ValidationResult,
  LoadDistribution,
  AggregateResponse,
  LayerInteraction,
  SubgradeResponse,
  MetricsOutput,
  AnimationFrame,
  StressBulb,
  EngineeringMetrics,
} from '@gptypes/simulation';
import { GEOGRID_CATALOG, GEOTEXTILE_CATALOG } from '@data/geosyntheticSpecs';

/**
 * Validate simulation input
 */
export function validateInput(input: SimulationInput): ValidationResult {
  const errors: string[] = [];

  // Traffic validation
  const validTraffic = ['light', 'medium', 'heavy', 'very_heavy'];
  if (!validTraffic.includes(input.trafficConfig.level)) {
    errors.push(`Invalid traffic level: ${input.trafficConfig.level}`);
  }

  // Vehicle type validation
  const validVehicles = ['light_vehicle', 'bus', 'truck', 'heavy_truck'];
  if (!validVehicles.includes(input.trafficConfig.vehicleType)) {
    errors.push(`Invalid vehicle type: ${input.trafficConfig.vehicleType}`);
  }

  // Subgrade condition validation
  const validConditions = ['good', 'moderate', 'weak', 'wet_poor_drainage'];
  if (!validConditions.includes(input.subgradeConfig.condition)) {
    errors.push(`Invalid subgrade condition: ${input.subgradeConfig.condition}`);
  }

  return errors.length === 0 ? { valid: true } : { valid: false, errors };
}

/**
 * Get load magnitude from traffic level and vehicle type (0-100 scale)
 */
function getLoadMagnitude(
  trafficLevel: string,
  vehicleType: string
): number {
  const trafficMultiplier: Record<string, number> = {
    light: 0.4,
    medium: 0.6,
    heavy: 0.8,
    very_heavy: 1.0,
  };

  const vehicleMultiplier: Record<string, number> = {
    light_vehicle: 0.4,
    bus: 0.7,
    truck: 0.85,
    heavy_truck: 1.0,
  };

  const base = 50;
  const load = base * (trafficMultiplier[trafficLevel] || 0.6) * (vehicleMultiplier[vehicleType] || 0.85);
  return Math.min(100, Math.max(0, load));
}

/**
 * Load distribution through pavement layers
 */
function calculateLoadDistribution(
  initialLoad: number,
  hasGeogrid: boolean
): LoadDistribution {
  const stressAtBC = initialLoad;
  const stressAtDBM = stressAtBC * 0.85;
  const stressAtWMM = stressAtDBM * 0.75;
  const stressAtGSB = hasGeogrid ? stressAtWMM * 0.68 : stressAtWMM * 0.78;
  const stressAtSubgrade = hasGeogrid ? stressAtGSB * 0.52 : stressAtGSB * 0.65;

  const stressBulb: StressBulb = {
    depthZone: hasGeogrid ? 1.1 : 1.5,
    lateralSpread: hasGeogrid ? 0.95 : 0.65, // Geogrid spreads stress wider laterally
    intensityProfile: [
      stressAtBC,
      stressAtDBM,
      stressAtWMM,
      stressAtGSB,
      stressAtSubgrade,
    ],
  };

  return {
    index: Math.min(100, Math.max(10, 100 - stressAtSubgrade)),
    loadPath: [],
    stressBulb,
    label: 'Conceptual load-transfer visualization',
  };
}

/**
 * Geogrid aggregate confinement response
 */
function applyGeogridEffect(hasGeogrid: boolean): AggregateResponse {
  if (!hasGeogrid) {
    return {
      confinementIndex: 25,
      lateralMovementMagnitude: 75,
      withGeogridEffect: 0,
      label: 'Illustrative indicator',
    };
  }

  return {
    confinementIndex: 85,
    lateralMovementMagnitude: 18,
    withGeogridEffect: 82,
    label: 'Illustrative indicator',
  };
}

/**
 * Geotextile layer separation response
 */
function applyGeotextileEffect(hasGeotextile: boolean): LayerInteraction {
  if (!hasGeotextile) {
    return {
      separationQuality: 'absent',
      soilMigrationRisk: 75,
      withGeotextileEffect: 0,
    };
  }

  return {
    separationQuality: 'present',
    soilMigrationRisk: 0,
    withGeotextileEffect: 100,
  };
}

/**
 * Subgrade deformation response
 */
function calculateSubgradeResponse(
  stressAtSubgrade: number,
  condition: string,
  cbr: number,
  hasGeogrid: boolean,
  hasGeotextile: boolean
): SubgradeResponse {
  const conditionFactor: Record<string, number> = {
    good: 0.3,
    moderate: 0.5,
    weak: 0.75,
    wet_poor_drainage: 0.9,
  };

  // Adjust by actual CBR (lower CBR = higher deformation)
  const cbrFactor = Math.max(0.2, 1.2 - (cbr / 15) * 0.8);
  let deformation = stressAtSubgrade * (conditionFactor[condition] || 0.5) * cbrFactor;

  if (hasGeogrid) deformation *= 0.72; // ~28% reduction in subgrade deformation
  if (hasGeotextile) deformation *= 0.92; // prevents subgrade softening from fine intrusion

  return {
    deformationIndex: Math.min(100, Math.max(5, deformation)),
    settlementTendency: Math.min(100, Math.max(5, deformation * 1.08)),
    rutFormationRisk: Math.min(100, Math.max(5, deformation * 0.95)),
    label: 'Illustrative indicator',
  };
}

/**
 * Authentic IRC:37-2018 & IRC:SP:59-2018 Engineering Calculations
 */
function calculateEngineeringMetrics(
  input: SimulationInput,
  hasGeogrid: boolean,
  hasGeotextile: boolean
): EngineeringMetrics {
  // 1. Subgrade CBR (%)
  let cbr = input.subgradeConfig.cbr;
  if (!cbr) {
    const defaultCBR: Record<string, number> = {
      good: 8,
      moderate: 5,
      weak: 3,
      wet_poor_drainage: 2,
    };
    cbr = defaultCBR[input.subgradeConfig.condition] || 5;
  }

  // 2. Resilient Modulus (MR) per IRC:37-2018 Eq 5.1 & 5.2
  // MR = 10 * CBR for CBR <= 5; MR = 17.6 * (CBR)^0.64 for CBR > 5
  const mrSubgrade = cbr <= 5 ? 10 * cbr : 17.6 * Math.pow(cbr, 0.64);

  // 3. Layer Thicknesses (mm)
  const thicknesses = input.pavementConfig.layerThicknesses || {
    bc: 40,
    dbm: 100,
    wmm: 250,
    gsb: 200,
  };

  const hBit = thicknesses.bc + thicknesses.dbm; // mm
  const hGran = thicknesses.wmm + thicknesses.gsb; // mm

  // Moduli (MPa) per IRC:37
  const eBit = 3000; // VG-40 bitumen at 35°C design temperature
  // Unreinforced granular base modulus
  const eGranUnreinforced = Math.min(300, 0.2 * Math.pow(hGran, 0.45) * mrSubgrade);
  // Geogrid confinement increases granular layer effective modulus by ~1.65x
  const eGranEffective = hasGeogrid ? eGranUnreinforced * 1.65 : eGranUnreinforced;

  // 4. Equivalent Depth via Odemark's Transformation
  const fFactor = 0.8; // Odemark correction factor for multi-layer systems
  const hEqBit = hBit * Math.pow(eBit / mrSubgrade, 1 / 3);
  const hEqGran = hGran * Math.pow(eGranEffective / mrSubgrade, 1 / 3);
  const hEq = fFactor * (hEqBit + hEqGran); // mm

  // 5. Vertical Subgrade Compressive Strain (εv) under standard dual tire load
  // Standard dual wheel axle: 20 kN per tire, tyre pressure p = 0.56 MPa, radius a = 106.7 mm
  const p = 0.56; // MPa
  const a = 106.7; // mm
  const depthRatio = hEq / a;
  // Boussinesq vertical strain approximation on subgrade surface
  const stressAtDepth = p * (1 - Math.pow(depthRatio / Math.sqrt(1 + depthRatio * depthRatio), 3));
  const verticalStrainRaw = (stressAtDepth / mrSubgrade) * 1e6; // microstrain
  const verticalSubgradeStrain = Math.round(Math.max(120, Math.min(1400, verticalStrainRaw)));

  // Tensile strain at bottom of bituminous layer (microstrain)
  const bitTensileRaw = (p / eBit) * 1e6 * (350 / Math.max(100, hBit));
  const tensileStrainBituminous = Math.round(hasGeogrid ? bitTensileRaw * 0.82 : bitTensileRaw);

  // 6. IRC:37-2018 Rutting Life Equation (Clause 5.4.2):
  // NR = 1.41e-8 * (1 / εv)^4.5337  (for 80% reliability)
  const eps = verticalSubgradeStrain * 1e-6;
  const nrRepetitions = 1.41e-8 * Math.pow(1 / eps, 4.5337);
  const ruttingLifeMSA = Number(Math.max(0.5, Math.min(250, nrRepetitions / 1e6)).toFixed(1));

  // 7. Traffic Benefit Ratio (TBR) & Base Course Reduction (BCR) per IRC:SP:59-2018
  const tbr = hasGeogrid ? (cbr <= 3 ? 2.6 : cbr <= 5 ? 2.2 : 1.8) : 1.0;
  // Base Course Reduction BCR = 1 - (1/TBR)^0.22 (typically 18% to 25%)
  const bcrPct = hasGeogrid ? Math.round((1 - Math.pow(1 / tbr, 0.22)) * 100) : 0;
  const allowableGranularReductionMm = Math.round((bcrPct / 100) * hGran);

  // 8. Material & Cost Savings (standard Indian 2-lane 7.0 m carriageway + 2x1.5m shoulders = 10.0 m formation)
  const formationWidth = 10.0; // meters
  const roadLengthKm = 1.0;
  const aggregateSavedPerKm = Math.round(
    formationWidth * (roadLengthKm * 1000) * (allowableGranularReductionMm / 1000)
  ); // m³/km
  const truckTripsSavedPerKm = Math.round(aggregateSavedPerKm / 10); // 10 m³ capacity dumper tippers

  // Material cost: WMM/GSB aggregate ~₹1,350/m³ laid; Geogrid cost ~₹180/m² laid
  const aggregateCostSavedLakhs = (aggregateSavedPerKm * 1350) / 100000;
  const geogridCostLakhs = hasGeogrid ? (formationWidth * 1000 * 180) / 100000 : 0;
  const geotextileCostLakhs = hasGeotextile ? (formationWidth * 1000 * 65) / 100000 : 0;
  const netCostSavedLakhs = hasGeogrid
    ? Number(Math.max(0, aggregateCostSavedLakhs - (geogridCostLakhs + geotextileCostLakhs)).toFixed(2))
    : 0;

  // Carbon footprint saved: ~32 kg CO2 per m³ crushed aggregate quarrying, crushing, hauling
  const co2SavedPerKmTonnes = Math.round((aggregateSavedPerKm * 32) / 1000);

  // Subgrade vertical deflection (mm)
  const deflectionMm = Number(((stressAtDepth / mrSubgrade) * 250).toFixed(2));

  // Geosynthetic Specs selected
  const geogridId = input.pavementConfig.geogridGradeId || 'bx3030';
  const geotextileId = input.pavementConfig.geotextileGradeId || 'nw200';

  return {
    subgradeCBR: cbr,
    resilientModulusMR: Math.round(mrSubgrade),
    verticalSubgradeStrain,
    tensileStrainBituminous,
    ruttingLifeMSA,
    trafficBenefitRatioTBR: tbr,
    baseCourseReductionBCR: bcrPct,
    allowableGranularReductionMm,
    compositeModulusEffective: Math.round(eGranEffective),
    subgradeVerticalDeflectionMm: deflectionMm,
    materialSavings: {
      aggregateSavedPerKm,
      truckTripsSavedPerKm,
      costSavedPerKmLakhs: netCostSavedLakhs,
      co2SavedPerKmTonnes,
    },
    geogridSpecs: GEOGRID_CATALOG[geogridId] || GEOGRID_CATALOG.bx3030,
    geotextileSpecs: GEOTEXTILE_CATALOG[geotextileId] || GEOTEXTILE_CATALOG.nw200,
  };
}

/**
 * Generate animation sequence
 */
function generateAnimationSequence(
  _output: Partial<{
    loadDist: LoadDistribution;
    aggregate: AggregateResponse;
    layer: LayerInteraction;
    subgrade: SubgradeResponse;
  }>,
  durationSeconds: number = 8
): AnimationFrame[] {
  const frames: AnimationFrame[] = [];
  const frameCount = 30;

  for (let i = 0; i <= frameCount; i++) {
    const progress = i / frameCount;
    const time = progress * durationSeconds;

    frames.push({
      time,
      progress,
      layer: progress < 0.15 ? 'bc' : progress < 0.35 ? 'dbm' : progress < 0.6 ? 'wmm' : progress < 0.8 ? 'gsb' : 'subgrade',
      stressIntensity: Math.sin(progress * Math.PI) * 100,
      particles: [],
      stressBulbState: {
        x: 0.5,
        y: progress,
        width: 1 - progress * 0.3,
        height: progress * 2,
        intensity: Math.max(0, 100 - progress * 100),
        color: `rgba(220, 38, 38, ${Math.max(0, 1 - progress)})`,
      },
      deformationZone: {
        depth: progress * 0.3,
        width: progress * 0.5,
        visible: progress > 0.7,
      },
    });
  }

  return frames;
}

/**
 * Compile metrics from simulation results
 */
function compileMetrics(
  output: Partial<{
    loadDist: LoadDistribution;
    aggregate: AggregateResponse;
    subgrade: SubgradeResponse;
    hasGeotextile: boolean;
  }>
): MetricsOutput {
  return {
    loadDistributionIndex: {
      value: output.loadDist?.index || 50,
      label: 'Illustrative indicator',
    },
    aggregateConfinement: {
      value: output.aggregate?.confinementIndex || 0,
      label: 'Relative indicator (with geogrid)',
    },
    subgradeResponse: {
      value: output.subgrade?.deformationIndex || 50,
      label: 'Illustrative deformation tendency',
    },
    ruttingTendency: {
      value: output.subgrade?.rutFormationRisk || 50,
      label: 'Illustrative rutting risk',
    },
    layerSeparationQuality: {
      value: output.hasGeotextile ? 'present' : 'absent',
      label: 'Geotextile effect',
    },
  };
}

/**
 * Main simulation function
 */
export function runSimulation(input: SimulationInput): SimulationOutput {
  const validation = validateInput(input);
  if (!validation.valid) {
    throw new Error(`Simulation validation failed: ${validation.errors?.join(', ')}`);
  }

  const hasGeogrid = Boolean((input.pavementConfig as any).hasGeogrid ?? input.pavementConfig.geogrid);
  const hasGeotextile = Boolean((input.pavementConfig as any).hasGeotextile ?? input.pavementConfig.geotextile);

  const initialLoad = getLoadMagnitude(
    input.trafficConfig.level,
    input.trafficConfig.vehicleType
  );

  const loadDist = calculateLoadDistribution(initialLoad, hasGeogrid);
  const aggregate = applyGeogridEffect(hasGeogrid);
  const layer = applyGeotextileEffect(hasGeotextile);

  const engMetrics = calculateEngineeringMetrics(input, hasGeogrid, hasGeotextile);

  const subgradeStress = loadDist.stressBulb.intensityProfile[4];
  const subgrade = calculateSubgradeResponse(
    subgradeStress,
    input.subgradeConfig.condition,
    engMetrics.subgradeCBR,
    hasGeogrid,
    hasGeotextile
  );

  const animation = generateAnimationSequence({ loadDist, aggregate, subgrade }, 8);
  const metrics = compileMetrics({ loadDist, aggregate, subgrade, hasGeotextile });

  return {
    loadDistribution: loadDist,
    aggregateResponse: aggregate,
    layerInteraction: layer,
    subgradeResponse: subgrade,
    animationSequence: animation,
    metrics,
    engineeringMetrics: engMetrics,
  };
}
