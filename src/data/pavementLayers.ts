/**
 * Pavement Layer Definitions
 * Static data for all pavement layer types per IRC:37 and MoRTH standards
 */

import type { LayerDefinition } from '@gptypes/pavement';

export const pavementLayersData: Record<string, LayerDefinition> = {
  BC: {
    id: 'bc',
    name: 'Bituminous Concrete',
    material: 'Bitumen (60–70 grade) + coarse aggregate + filler',
    typicalThickness: { min: 40, max: 80 },
    typicalThicknessUnit: 'mm per IRC:37',
    functions: [
      'Surface load transfer and distribution',
      'Weathering protection and sealing',
      'Skid resistance for traffic safety',
      'First contact layer for wheel loads',
    ],
    position: 'Top layer (Layer 1)',
    responseToLoad:
      'Load transfers into layer; bitumen redistributes load laterally; aggregate particles interlock under pressure',
    importance:
      'Protects lower layers from direct traffic and weather. Critical for pavement durability and safety. Failure of BC leads to rapid deterioration of entire pavement.',
    learnMore:
      'Bituminous Concrete (BC) is the wearing surface of flexible pavements. It consists of coarse aggregates (typically 12–14 mm nominal size) bound together by bituminous binder (asphalt cement, 60–70 grade). BC must be hard enough to resist rutting from traffic yet flexible enough to distribute loads and accommodate minor pavement movement. Typical thickness ranges from 40–80 mm per IRC:37. BC also provides water sealing for the pavement structure; water infiltration is a primary cause of pavement distress. Construction quality and workmanship are especially important for BC.',
    reference: 'IRC:37-2018',
  },

  DBM: {
    id: 'dbm',
    name: 'Dense Bituminous Macadam',
    material: 'Bitumen (80–100 grade) + well-graded aggregate (6–10 mm)',
    typicalThickness: { min: 75, max: 150 },
    typicalThicknessUnit: 'mm per IRC:37',
    functions: [
      'Structural binder layer',
      'Load distribution and transfer',
      'Fatigue resistance to repeated loading',
      'Bonds BC to WMM',
    ],
    position: 'Second layer (Layer 2)',
    responseToLoad:
      'Further load spread through bituminous matrix; friction and particle contact distribute load; reduced stress transmitted to lower layers',
    importance:
      'Main structural layer of bituminous pavement. Binds pavement together and resists fatigue cracking. Determines pavement structural capability. Poor DBM quality leads to premature fatigue cracking.',
    learnMore:
      'Dense Bituminous Macadam (DBM) is the main structural layer in flexible pavements. It consists of well-graded aggregates (maximum nominal size 10 mm) bound by bituminous binder (80–100 grade). DBM is designed for higher binder content than BC, providing a more durable matrix. Typical thickness ranges from 75–150 mm per IRC:37, depending on traffic and design strength.',
    reference: 'IRC:37-2018',
  },

  WMM: {
    id: 'wmm',
    name: 'Wet Mix Macadam',
    material: 'Well-graded aggregate (6–13 mm) + bitumen (35–70 grade)',
    typicalThickness: { min: 150, max: 300 },
    typicalThicknessUnit: 'mm per IRC:37',
    functions: [
      'Granular load distribution and spread',
      'Rutting resistance through particle interlocking',
      'Stiffness and structural capacity',
      'Cost-effective layer for load distribution',
    ],
    position: 'Third layer (Layer 3)',
    responseToLoad:
      'Load spreads significantly through aggregate interlocking; particles move laterally under load; stress reduces substantially through friction and load redistribution',
    importance:
      'Primary load distribution layer. Reduces stress reaching subgrade. One of the most economical pavement layers. Geogrid is often most effective in this layer, providing confinement and improved load distribution.',
    learnMore:
      'Wet Mix Macadam (WMM) is a bituminous-bound granular layer consisting of well-graded stone aggregate (6–13 mm nominal size) mixed with bituminous binder (35–70 grade) and laid in a single layer. Typical thickness ranges from 150–300 mm per IRC:37. WMM provides cost-effective load distribution and improved pavement performance through aggregate interlocking. This layer is ideal for geogrid reinforcement.',
    reference: 'IRC:37-2018',
  },

  GSB: {
    id: 'gsb',
    name: 'Granular Sub-Base',
    material: 'Well-graded stone aggregate (50 mm nominal size)',
    typicalThickness: { min: 150, max: 300 },
    typicalThicknessUnit: 'mm per IRC:37',
    functions: [
      'Further load distribution to subgrade',
      'Stress reduction through spreading',
      'Cost-effective foundation layer',
      'Drainage support',
      'Frost protection',
    ],
    position: 'Fourth layer (Layer 4)',
    responseToLoad:
      'Largest lateral load spread; stress reduces further through aggregate contact; particles rearrange under load; principal role is stress reduction',
    importance:
      'Reduces stress reaching subgrade to acceptable levels. Most economical way to reduce subgrade stress. Proper GSB thickness determines whether weak subgrade is viable. Geotextile often placed above GSB to provide separation.',
    learnMore:
      'Granular Sub-Base (GSB) is an unbound or mechanically stabilized granular layer consisting of stone aggregate (50 mm nominal size) compacted to specified density. GSB layer is not bound by bitumen, allowing greater flexibility and drainage. Typical thickness ranges from 150–300 mm per IRC:37, depending on subgrade strength and traffic. GSB provides economical stress reduction and is essential for pavements on weak subgrades.',
    reference: 'IRC:37-2018',
  },

  subgrade: {
    id: 'subgrade',
    name: 'Compacted Subgrade',
    material: 'Natural soil or fill material, compacted',
    typicalThickness: { min: 300, max: 1000 },
    typicalThicknessUnit: 'mm depth of influence',
    functions: [
      'Foundation and load bearing',
      'Settlement control',
      'Determines pavement thickness requirements',
      'Support for entire pavement structure',
    ],
    position: 'Foundation (Layer 5)',
    responseToLoad:
      'Load induces stress in soil; bearing capacity (CBR) determines settlement and deformation response; weak subgrade shows excessive settlement',
    importance:
      'Everything rests on subgrade. If subgrade fails (excessive settlement, bearing failure), entire pavement fails. Subgrade characterization (CBR) is critical input to IRC:37 design. Weak or wet subgrades require thicker pavement or geosynthetics.',
    learnMore:
      'The subgrade is the foundation soil or prepared fill layer on which the pavement structure rests. Subgrade strength is characterized by California Bearing Ratio (CBR), which reflects soil shear strength and stiffness. CBR values range from <2% (very weak, highly plastic soil) to >10% (strong, well-graded granular soil). IRC:37 design procedures use subgrade CBR to determine minimum pavement thickness. Weak subgrades (<3% CBR) require thicker pavements or geosynthetic reinforcement.',
    reference: 'IRC:37-2018',
  },

  geogrid: {
    id: 'geogrid',
    name: 'Geogrid (Reinforcement Layer)',
    material: 'Polymer grid (HDPE or polyester)',
    typicalThickness: { min: 2, max: 5 },
    typicalThicknessUnit: 'mm nominal thickness',
    functions: [
      'Aggregate confinement and reinforcement',
      'Reduction of lateral aggregate movement',
      'Improved load distribution efficiency',
      'Reduction of rutting tendency',
      'Increased bearing capacity of weak layers',
    ],
    position: 'Typically at WMM/GSB interface or within WMM',
    responseToLoad:
      'Geogrid confines aggregate particles within grid openings; lateral movement restricted; load distribution improved; stress reaching lower layers reduced; rutting depth decreased',
    importance:
      'Optional intervention for weak subgrade, high traffic, or economic optimization. NOT mandatory in all pavements. Most effective when placed at interface between granular layer and weaker layer below. Properly specified and placed geogrid can reduce required pavement thickness.',
    learnMore:
      'Geogrids are polymer grids (typically HDPE or polyester) used to reinforce granular pavement layers. Geogrids improve pavement performance by: (1) confining aggregate particles, reducing lateral shear and movement; (2) improving load distribution through enhanced interlocking; (3) reducing vertical settlement in weak layers; (4) potentially reducing required pavement thickness. Benefits depend on geogrid stiffness (tensile strength), grid opening size, and placement location. Per IRC:SP:59, geogrids should be placed at the interface between a strong granular layer and a weaker layer below, or within a granular layer to be reinforced.',
    reference: 'IRC:SP:59-2018, BIS 15618',
  },

  geotextile: {
    id: 'geotextile',
    name: 'Geotextile (Separation/Filtration Layer)',
    material: 'Synthetic fabric (woven or nonwoven)',
    typicalThickness: { min: 0.5, max: 2 },
    typicalThicknessUnit: 'mm nominal thickness',
    functions: [
      'Separation of soil and granular layers',
      'Prevention of soil migration into granular layer',
      'Filtration of fine particles',
      'Drainage function (if properly designed)',
      'Protection of granular layer',
    ],
    position: 'Typically above subgrade (between GSB and subgrade)',
    responseToLoad:
      'Geotextile acts as barrier to prevent fine soil migration while allowing water passage; maintains layer distinction; no structural/load-bearing role; primarily functional layer',
    importance:
      'Optional intervention to prevent pumping and soil mixing, especially for weak or wet subgrades. Maintains granular layer integrity. Allows moisture while preventing fine soil contamination. Proper geotextile selection critical; must have appropriate pore size for soil type.',
    learnMore:
      'Geotextiles are synthetic fabric materials used for separation, filtration, and drainage functions in pavement structures. Geotextiles are typically placed between subgrade and granular layer (GSB) to: (1) prevent fine subgrade soil from migrating into granular layer; (2) allow water passage while filtering fines; (3) reduce mixing and contamination; (4) provide uniform support. Per IRC:SP:59, geotextile selection depends on subgrade soil type (grain size distribution) and required filtration. Woven geotextiles provide lower permeability; nonwoven provide higher permeability.',
    reference: 'IRC:SP:59-2018, BIS 15635, BIS 15636',
  },
};

export function getLayerDefinition(layerId: string): LayerDefinition | undefined {
  return pavementLayersData[layerId.toUpperCase()];
}
