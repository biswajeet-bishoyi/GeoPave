/**
 * Engineering References
 * Official standards and guidelines used in GeoPave India
 */

export interface EngineeringReference {
  id: string;
  title: string;
  version: string;
  organization: string;
  year: number;
  topics: string[];
  description: string;
  relevantSections?: string[];
}

export const engineeringReferences: EngineeringReference[] = [
  {
    id: 'irc37',
    title: 'Guidelines for the Design of Flexible Pavements',
    version: 'IRC:37-2018',
    organization: 'Indian Roads Congress',
    year: 2018,
    topics: [
      'Flexible pavement design methods',
      'Layer definitions and functions',
      'CBR-based design procedures',
      'Traffic analysis (MSA, ESA)',
      'Design strength and thickness',
    ],
    description:
      'Primary Indian standard for flexible pavement design. Provides CBR method for determining minimum pavement thickness based on subgrade strength and traffic loading.',
    relevantSections: [
      'Section 2: Soil Subgrade Preparation',
      'Section 3: Pavement Materials',
      'Section 4: Design Procedure',
      'Section 5: Layer Thickness Design',
    ],
  },

  {
    id: 'ircsp59',
    title: 'Guidelines for Use of Geosynthetics in Road Pavements and Associated Works',
    version: 'IRC:SP:59-2018',
    organization: 'Indian Roads Congress',
    year: 2018,
    topics: [
      'Geogrid applications in pavements',
      'Geotextile applications in pavements',
      'Design considerations for geosynthetics',
      'Material specifications',
      'Installation guidelines',
    ],
    description:
      'Comprehensive guideline for incorporating geosynthetics (geogrids, geotextiles) into road pavements. Covers when, where, and how to use geosynthetics for improved performance.',
    relevantSections: [
      'Section 2: Geogrids in Pavements',
      'Section 3: Geotextiles in Pavements',
      'Section 4: Design Approach',
      'Section 5: Material Specifications',
      'Section 6: Quality and Installation',
    ],
  },

  {
    id: 'morth',
    title: 'Specifications for Road and Bridge Works',
    version: 'MoRTH 2013 (Revised Edition)',
    organization: 'Ministry of Road Transport and Highways (MoRTH)',
    year: 2013,
    topics: [
      'Material specifications',
      'Layer definitions and grading',
      'Construction standards',
      'Quality requirements',
      'Testing procedures',
    ],
    description:
      'Official specifications for materials and construction of road and bridge works in India. Defines material grades, layer thicknesses, and construction procedures.',
    relevantSections: [
      'Section 300: Bituminous Materials',
      'Section 400: Unbound Materials',
      'Section 500: Bituminous Pavements',
      'Section 600: Flexible Pavements',
    ],
  },

  {
    id: 'bis15618',
    title: 'Geogrids – Specifications and Test Methods',
    version: 'BIS 15618:2016',
    organization: 'Bureau of Indian Standards (BIS)',
    year: 2016,
    topics: [
      'Geogrid material properties',
      'Tensile strength specifications',
      'Test methods and procedures',
      'Quality requirements',
    ],
    description:
      'Indian standard specifying properties and testing of geogrids used in pavements and other applications.',
    relevantSections: ['Section 3: Technical Requirements', 'Section 4: Test Methods'],
  },

  {
    id: 'bis15635',
    title: 'Woven Geotextiles – Specifications',
    version: 'BIS 15635:2008',
    organization: 'Bureau of Indian Standards (BIS)',
    year: 2008,
    topics: ['Woven geotextile properties', 'Filtration requirements', 'Strength specifications'],
    description: 'Indian standard for woven geotextiles used in road and soil applications.',
    relevantSections: ['Section 3: Technical Requirements'],
  },

  {
    id: 'bis15636',
    title: 'Non-woven Geotextiles – Specifications',
    version: 'BIS 15636:2008',
    organization: 'Bureau of Indian Standards (BIS)',
    year: 2008,
    topics: ['Non-woven geotextile properties', 'Permeability', 'Tensile strength'],
    description: 'Indian standard for non-woven geotextiles used in filtration and separation.',
    relevantSections: ['Section 3: Technical Requirements'],
  },
];

export function getReferenceById(id: string): EngineeringReference | undefined {
  return engineeringReferences.find((ref) => ref.id === id);
}

export function getReferencesByTopic(topic: string): EngineeringReference[] {
  return engineeringReferences.filter((ref) => ref.topics.includes(topic));
}
