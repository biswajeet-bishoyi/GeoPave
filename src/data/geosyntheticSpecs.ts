/**
 * Authentic Geosynthetic Technical Specifications & Physical Model Data
 * Based on:
 * - MoRTH Specifications for Road & Bridge Works (5th Revision, Section 700)
 * - IRC:SP:59-2018: Guidelines for Use of Geosynthetics in Road Pavements
 * - IS 13162 (Part 3, 4, 5): Indian Standard Geotextiles Methods of Test
 * - IS 13326 / ASTM D6637: Standard Test Method for Tensile Properties of Geogrids
 * - ASTM D6241: Static Puncture Strength of Geotextiles (CBR Plunger Method)
 */

import type {
  GeogridProperties,
  GeotextileProperties,
  PhysicalModelGuide,
} from '@gptypes/geosynthetic';

/**
 * Technical specifications for Geogrids used in Indian flexible pavements
 */
export const GEOGRID_CATALOG: Record<string, GeogridProperties> = {
  bx3030: {
    id: 'bx3030',
    productName: 'Biaxial PP Geogrid BX 3030 (Standard Indian Highway Grade)',
    polymerType: 'Polypropylene (PP)',
    structure: 'Biaxial',
    apertureSizeMD: 35, // mm
    apertureSizeCMD: 35, // mm
    ultimateTensileStrengthMD: 30.0, // kN/m
    ultimateTensileStrengthCMD: 30.0, // kN/m
    tensileStrength2Pct: 10.5, // kN/m at 2% strain
    tensileStrength5Pct: 21.0, // kN/m at 5% strain
    junctionEfficiency: 95, // %
    torsionalRigidity: 0.65, // N-m/deg
    carbonBlack: 2.0, // % UV resistance
    morthClause: 'MoRTH Section 704 (Biaxial Geogrid for Base/Sub-base Reinforcement)',
    testStandards: {
      tensile: 'ASTM D6637 / IS 13326 (Part 1) — Single Rib Tensile Test',
      junction: 'GRI-GG2 / ASTM D7737 — Geogrid Junction Strength',
      aperture: 'Direct Caliper Measurement (Square 35 × 35 mm)',
      creep: 'ASTM D5262 — 10,000 hr Tension Creep Rupture',
    },
    physicalModel: {
      modelApertureMm: 6.0, // scaled for 1:5 model or micro-mesh
      scaleRatio: '1:5 to 1:10 (or real specimen swatch mounted on display board)',
      recommendedModelAggregate: 'Crushed fine gravel (4–8 mm) to demonstrate aperture interlocking',
      demonstrationRole: 'Interlocks with coarse aggregate particles, preventing lateral spread under wheel load.',
    },
  },

  tx160: {
    id: 'tx160',
    productName: 'Triaxial PP Geogrid TX 160 (Multi-Directional Stiffness)',
    polymerType: 'Polypropylene (PP)',
    structure: 'Triaxial',
    apertureSizeMD: 40,
    apertureSizeCMD: 40,
    ultimateTensileStrengthMD: 35.0,
    ultimateTensileStrengthCMD: 35.0,
    tensileStrength2Pct: 14.0,
    tensileStrength5Pct: 26.0,
    radialStiffness: 360, // kN/m at 0.5% strain
    junctionEfficiency: 100, // Integral monolithic junction
    torsionalRigidity: 0.85,
    carbonBlack: 2.2,
    morthClause: 'MoRTH Section 704 & IRC:SP:59 Clause 4.2 (Isotropic Load Transfer)',
    testStandards: {
      tensile: 'ASTM D6637 Method B (Multi-rib tensile)',
      junction: 'ASTM D7737 / GRI-GG2 (Monolithic punched-and-drawn junction)',
      aperture: 'Equilateral Triangular Aperture (40 mm pitch)',
      creep: 'ASTM D5262 & ISO 13431',
    },
    physicalModel: {
      modelApertureMm: 7.0,
      scaleRatio: '1:5 to 1:10',
      recommendedModelAggregate: 'Angular crushed basalt aggregate (6–10 mm)',
      demonstrationRole: 'Provides 360° radial aggregate confinement with true triangular rib trusses.',
    },
  },

  bx4040: {
    id: 'bx4040',
    productName: 'Heavy-Duty Biaxial Geogrid BX 4040 (Heavy Freight / Weak Subgrade)',
    polymerType: 'Polypropylene (PP)',
    structure: 'Biaxial',
    apertureSizeMD: 38,
    apertureSizeCMD: 38,
    ultimateTensileStrengthMD: 40.0,
    ultimateTensileStrengthCMD: 40.0,
    tensileStrength2Pct: 15.0,
    tensileStrength5Pct: 30.0,
    junctionEfficiency: 95,
    torsionalRigidity: 0.80,
    carbonBlack: 2.0,
    morthClause: 'MoRTH Section 704 (High-Traffic Pavements > 50 MSA)',
    testStandards: {
      tensile: 'ASTM D6637 / IS 13326',
      junction: 'GRI-GG2',
      aperture: 'Square 38 × 38 mm',
      creep: 'ASTM D5262',
    },
    physicalModel: {
      modelApertureMm: 7.5,
      scaleRatio: '1:5 to 1:10',
      recommendedModelAggregate: 'Crushed stone ballast (8–12 mm)',
      demonstrationRole: 'High tensile modulus at 2% serviceability strain for heavy axle loading.',
    },
  },
};

/**
 * Technical specifications for Geotextiles used in Indian flexible pavements
 */
export const GEOTEXTILE_CATALOG: Record<string, GeotextileProperties> = {
  nw200: {
    id: 'nw200',
    productName: 'Non-Woven Needle-Punched PP Geotextile 200 GSM (MoRTH Class 1)',
    material: '100% Polypropylene Continuous / Staple Fibres',
    manufacturingType: 'Non-Woven Needle Punched',
    massPerUnitAreaGSM: 200, // g/m²
    thicknessAt2kPa: 1.8, // mm
    grabTensileStrength: 850, // N
    elongationAtBreak: 55, // %
    trapezoidalTearStrength: 350, // N
    cbrPunctureResistance: 1900, // N
    apparentOpeningSizeAOS: 110, // microns (0.110 mm)
    permittivity: 1.8, // s⁻¹
    waterFlowRate100mm: 80, // L/m²/s
    morthClass: 'MoRTH Class 1 (Separation/Drainage)',
    morthClause: 'MoRTH Section 702 Table 700-1 & IRC:SP:59 Section 5 (Subgrade Separation)',
    testStandards: {
      massGSM: 'IS 13162 (Part 3) / ASTM D5261 (Mass per unit area)',
      grabTensile: 'IS 13162 (Part 5) / ASTM D4632 (Grab tensile strength & elongation)',
      puncture: 'IS 13162 (Part 4) / ASTM D6241 (CBR static plunger puncture resistance)',
      permeability: 'IS 14324 / ASTM D4491 (Water permittivity & cross-plane flow)',
      openingSize: 'IS 14294 / ASTM D4751 (Dry glass bead sieving for O95 pore size)',
    },
    physicalModel: {
      modelFabricType: 'Real non-woven polypropylene needle-punched fabric swatch (150–200 GSM sheet)',
      scaleRatio: '1:1 fabric swatch directly integrated at subgrade/GSB interface in model box',
      sampleDescription: 'Soft porous white/grey felt-like sheet that permits water but completely stops sand/clay migration.',
      demonstrationRole: 'Prevents fine clay/silt subgrade pumping into GSB while allowing pore water dissipation.',
    },
  },

  nw250: {
    id: 'nw250',
    productName: 'Heavy-Duty Non-Woven Geotextile 250 GSM (MoRTH Class 1 Premium)',
    material: 'Virgin Polypropylene (UV Stabilized)',
    manufacturingType: 'Non-Woven Needle Punched',
    massPerUnitAreaGSM: 250,
    thicknessAt2kPa: 2.2,
    grabTensileStrength: 1150,
    elongationAtBreak: 60,
    trapezoidalTearStrength: 450,
    cbrPunctureResistance: 2500,
    apparentOpeningSizeAOS: 95, // 0.095 mm
    permittivity: 1.6,
    waterFlowRate100mm: 70,
    morthClass: 'MoRTH Class 1 (Separation/Drainage)',
    morthClause: 'MoRTH Section 702 & IRC:SP:59 (Heavy Dynamic Loading over Soft Clays)',
    testStandards: {
      massGSM: 'IS 13162 (Part 3) / ASTM D5261',
      grabTensile: 'ASTM D4632 / IS 13162 (Part 5)',
      puncture: 'ASTM D6241 / IS 13162 (Part 4)',
      permeability: 'ASTM D4491',
      openingSize: 'ASTM D4751 (AOS O95)',
    },
    physicalModel: {
      modelFabricType: 'High-puncture-resistant needle-punched non-woven geotextile swatch',
      scaleRatio: '1:1 fabric sample',
      sampleDescription: 'Dense felt structure with high puncture resistance against sharp angular sub-base aggregates.',
      demonstrationRole: 'Withstands sharp stones without tearing under heavy compaction loads.',
    },
  },

  w200: {
    id: 'w200',
    productName: 'Woven Slit-Film Polypropylene Geotextile (High Modulus Separator)',
    material: 'High-Tenacity Polypropylene Tape Yarns',
    manufacturingType: 'Woven Slit Film',
    massPerUnitAreaGSM: 190,
    thicknessAt2kPa: 0.7,
    grabTensileStrength: 1400,
    elongationAtBreak: 18, // low elongation, high modulus
    trapezoidalTearStrength: 500,
    cbrPunctureResistance: 3200,
    apparentOpeningSizeAOS: 250,
    permittivity: 0.25,
    waterFlowRate100mm: 22,
    morthClass: 'MoRTH Class 2 (Filtration)',
    morthClause: 'MoRTH Section 702 & IRC:SP:59 (High Tensile Subgrade Reinforcement / Separation)',
    testStandards: {
      massGSM: 'IS 13162 (Part 3) / ASTM D5261',
      grabTensile: 'ASTM D4632',
      puncture: 'ASTM D6241',
      permeability: 'ASTM D4491',
      openingSize: 'ASTM D4751',
    },
    physicalModel: {
      modelFabricType: 'Black criss-cross woven polypropylene ribbon fabric swatch',
      scaleRatio: '1:1 fabric sample',
      sampleDescription: 'Grid-weave fabric with high tensile modulus and high puncture resistance.',
      demonstrationRole: 'Provides basal planar reinforcement and layer separation over ultra-soft subgrade.',
    },
  },
};

/**
 * Physical Model Laboratory Guide & Demonstration Companion
 * For college project viva, presentations, and transparent display box construction
 */
export const PHYSICAL_MODEL_GUIDE: PhysicalModelGuide = {
  boxDimensions: {
    lengthCm: 50, // 50 cm wide transparent acrylic container
    widthCm: 25,  // 25 cm deep
    heightCm: 45, // 45 cm total height
  },
  scale: '1:10 Geometric Scale (1 cm in model = 100 mm in prototype road)',
  layerScaling: [
    {
      layerId: 'bc',
      layerName: 'Bituminous Concrete (BC)',
      fieldThicknessMm: 40,
      modelThicknessCm: 0.5,
      modelMaterial: 'Fine black dyed sand with epoxy binder (or black foam core top)',
      color: '#1a1a2e',
    },
    {
      layerId: 'dbm',
      layerName: 'Dense Bituminous Macadam (DBM)',
      fieldThicknessMm: 100,
      modelThicknessCm: 1.0,
      modelMaterial: 'Fine dark aggregate (2–3 mm) mixed with black acrylic binder',
      color: '#2d2d44',
    },
    {
      layerId: 'geogrid',
      layerName: 'Geogrid Reinforcement Interface',
      fieldThicknessMm: 5,
      modelThicknessCm: 0.1,
      modelMaterial: 'Polymer micro-mesh (BX 3030 sample swatch or 5 mm fine plastic grid)',
      color: '#38bdf8',
    },
    {
      layerId: 'wmm',
      layerName: 'Wet Mix Macadam (WMM Base)',
      fieldThicknessMm: 250,
      modelThicknessCm: 2.5,
      modelMaterial: 'Graded fine gravel (4–8 mm crushed stone aggregate)',
      color: '#7c6f5b',
    },
    {
      layerId: 'gsb',
      layerName: 'Granular Sub-Base (GSB)',
      fieldThicknessMm: 200,
      modelThicknessCm: 2.0,
      modelMaterial: 'Coarse sand mixed with fine gravel (2–5 mm)',
      color: '#a08c72',
    },
    {
      layerId: 'geotextile',
      layerName: 'Geotextile Separation Interface',
      fieldThicknessMm: 2,
      modelThicknessCm: 0.1,
      modelMaterial: 'White non-woven polypropylene needle-punched fabric swatch (200 GSM)',
      color: '#f43f5e',
    },
    {
      layerId: 'subgrade',
      layerName: 'Prepared Subgrade Soil',
      fieldThicknessMm: 500,
      modelThicknessCm: 15.0,
      modelMaterial: 'Compacted natural red/clayey soil (or fine silt/sand)',
      color: '#6b4f32',
    },
  ],

  demonstrationPoints: [
    {
      title: 'Aggregate Interlocking & Confinement (Geogrid)',
      mechanism: 'Lateral Restraint Mechanism',
      howToDemonstrate: 'Apply vertical pressure on unreinforced WMM aggregates vs aggregates sitting directly within the geogrid aperture mesh.',
      engineeringSignificance: 'Under tire loading, aggregates push sideways. Geogrid ribs lock the stones in place, reducing lateral strain and increasing the composite base modulus by 40–80%.',
    },
    {
      title: 'Anti-Pumping & Separation (Geotextile)',
      mechanism: 'Filtration and Boundary Separation',
      howToDemonstrate: 'Pour moist fine subgrade clay/sand below the non-woven geotextile and coarse GSB gravel above. Compress and vibrate the model.',
      engineeringSignificance: 'Without geotextile, subgrade clay particles pump upward under cyclic traffic, contaminating the GSB and reducing CBR from 30% to <5%. The geotextile retains fines (O95 < 110 µm) while letting pore water dissipate freely.',
    },
    {
      title: 'Tensioned Membrane Effect',
      mechanism: 'Curvature-Induced Vertical Upward Force',
      howToDemonstrate: 'In soft subgrades with rutting, the geogrid deforms into a dish shape and mobilizes membrane tensile stress.',
      engineeringSignificance: 'The upward component of tensile membrane force directly supports wheel load, reducing peak vertical stress on the subgrade by 20–35%.',
    },
    {
      title: 'Base Course Reduction (BCR) & Cost Savings',
      mechanism: 'Equivalent Structural Number / Modulus Boosting',
      howToDemonstrate: 'Compare thickness markings on the model: 450 mm conventional granular base vs 350 mm reinforced granular base delivering identical rut resistance.',
      engineeringSignificance: 'Saves 20–25% expensive aggregate quarrying, hauling diesel, and project cost (₹ 8–15 Lakhs per km).',
    },
  ],

  vivaQuestions: [
    {
      question: 'What is the optimal placement depth for geogrid in a flexible pavement according to IRC:SP:59-2018?',
      answer: 'Typically at the bottom of the base layer (WMM/GSB interface) or within the lower 1/3rd of the base layer. Placing it directly below BC is ineffective because bituminous layers are stiff and do not provide aggregate interlock into the grid apertures.',
      reference: 'IRC:SP:59-2018 Clause 5.3 & FHWA-NHI-07-092',
    },
    {
      question: 'How does aperture size relate to aggregate nominal size ($D_{50}$)?',
      answer: 'For effective mechanical interlocking, the geogrid aperture should be approximately 1.0 to 1.5 times the median aggregate size ($D_{50}$), typically 30 mm to 40 mm for standard Indian 40 mm / 20 mm nominal WMM aggregate.',
      reference: 'IRC:SP:59-2018 Clause 4.2.2',
    },
    {
      question: 'What is the difference between Traffic Benefit Ratio (TBR) and Base Course Reduction (BCR)?',
      answer: 'TBR is the ratio of traffic cycles carried by a reinforced pavement to failure compared to an unreinforced pavement of the SAME thickness (TBR typically 1.5 – 3.0×). BCR is the percentage reduction in granular base thickness permitted while maintaining the SAME service life as the conventional design (BCR typically 15 – 30%).',
      reference: 'IRC:SP:59-2018 Clause 6.1',
    },
    {
      question: 'Why must geotextiles have an Apparent Opening Size ($O_{95}$) matched to subgrade soil?',
      answer: 'To satisfy filtration criteria ($O_{95} ≤ 2.5 \\times D_{85}$ for sandy soils, and $O_{95} ≤ 0.2\\text{ mm}$ for fine soils). If the pores are too large, subgrade fines pump into the GSB; if too small, geotextile clogs and traps pore water pressure.',
      reference: 'MoRTH Section 702 & IRC:SP:59-2018 Clause 5.2',
    },
  ],
};
