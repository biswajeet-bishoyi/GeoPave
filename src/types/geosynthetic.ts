/**
 * Geosynthetic Types and Technical Specifications
 * Conforming to MoRTH Section 700, IRC:SP:59-2018, and Indian/ASTM Standards
 */

export type GeosynthType = 'geogrid' | 'geotextile' | 'combined';

export type GeogridStructure = 'Biaxial' | 'Triaxial' | 'Uniaxial';
export type GeotextileManufacturing = 'Non-Woven Needle Punched' | 'Woven Monofilament' | 'Woven Slit Film';

/**
 * Detailed technical specifications for Geogrid
 * As required for MoRTH Section 700 & IRC:SP:59-2018 compliance
 */
export interface GeogridProperties {
  id: string;
  productName: string;
  polymerType: 'Polypropylene (PP)' | 'Polyester (PET)' | 'High-Density Polyethylene (HDPE)';
  structure: GeogridStructure;
  apertureSizeMD: number; // mm in Machine Direction
  apertureSizeCMD: number; // mm in Cross Machine Direction
  ultimateTensileStrengthMD: number; // kN/m per ASTM D6637 / IS 13326
  ultimateTensileStrengthCMD: number; // kN/m
  tensileStrength2Pct: number; // kN/m at 2% strain (serviceability)
  tensileStrength5Pct: number; // kN/m at 5% strain (design)
  radialStiffness?: number; // kN/m at low strain (for Triaxial)
  junctionEfficiency: number; // % per GRI-GG2 / ASTM D7737
  torsionalRigidity: number; // N-m/deg (interlock resistance)
  carbonBlack: number; // % for UV resistance
  morthClause: string;
  testStandards: {
    tensile: string;
    junction: string;
    aperture: string;
    creep: string;
  };
  physicalModel: {
    modelApertureMm: number;
    scaleRatio: string;
    recommendedModelAggregate: string;
    demonstrationRole: string;
  };
}

/**
 * Detailed technical specifications for Geotextile
 * As required for MoRTH Section 700 Class 1 / Class 2 & IRC:SP:59-2018 compliance
 */
export interface GeotextileProperties {
  id: string;
  productName: string;
  material: string;
  manufacturingType: GeotextileManufacturing;
  massPerUnitAreaGSM: number; // g/m² per IS 13162 (Part 3) / ASTM D5261
  thicknessAt2kPa: number; // mm
  grabTensileStrength: number; // N per ASTM D4632 / IS 13162 (Part 5)
  elongationAtBreak: number; // % (> 50% for non-woven puncture resistance)
  trapezoidalTearStrength: number; // N per ASTM D4533 / IS 14293
  cbrPunctureResistance: number; // N per ASTM D6241 / IS 13162 (Part 4)
  apparentOpeningSizeAOS: number; // microns (O95) per ASTM D4751
  permittivity: number; // s⁻¹ per ASTM D4491
  waterFlowRate100mm: number; // L/m²/s normal to plane
  morthClass: 'MoRTH Class 1 (Separation/Drainage)' | 'MoRTH Class 2 (Filtration)' | 'MoRTH Class 3 (Protection)';
  morthClause: string;
  testStandards: {
    massGSM: string;
    grabTensile: string;
    puncture: string;
    permeability: string;
    openingSize: string;
  };
  physicalModel: {
    modelFabricType: string;
    scaleRatio: string;
    sampleDescription: string;
    demonstrationRole: string;
  };
}

export interface GeogridConfiguration {
  enabled: boolean;
  position: 'within-wmm' | 'wmm-gsb-interface' | 'above-gsb';
  gradeId?: string;
  type?: string;
  tensileStrength?: number;
}

export interface GeotextileConfiguration {
  enabled: boolean;
  position: 'above-subgrade' | 'above-gsb';
  gradeId?: string;
  type?: string;
  filteringClass?: string;
}

export interface GeosynthConfig {
  geogrid: GeogridConfiguration;
  geotextile: GeotextileConfiguration;
}

/**
 * Physical model scaling and demonstration guide for college exhibition/lab
 */
export interface PhysicalModelGuide {
  boxDimensions: {
    lengthCm: number;
    widthCm: number;
    heightCm: number;
  };
  scale: string;
  layerScaling: {
    layerId: string;
    layerName: string;
    fieldThicknessMm: number;
    modelThicknessCm: number;
    modelMaterial: string;
    color: string;
  }[];
  demonstrationPoints: {
    title: string;
    mechanism: string;
    howToDemonstrate: string;
    engineeringSignificance: string;
  }[];
  vivaQuestions: {
    question: string;
    answer: string;
    reference: string;
  }[];
}
