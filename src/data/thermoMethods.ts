/**
 * Thermodynamic Methods Data for PRO/II Hover Tooltips
 * Contains descriptions and guidance for PRO/II thermodynamic packages
 */

export interface ThermoMethodData {
    name: string;
    suited_for: string;
    range: string;
    applications: string[];
    avoid: string;
    model_type?: string;
}

export const THERMO_METHODS: { [key: string]: ThermoMethodData } = {
    'SRK': {
        name: 'Soave-Redlich-Kwong',
        model_type: 'Cubic Equation of State',
        suited_for: 'Non-polar and light hydrocarbons, natural gas',
        range: 'Low to moderate pressure (< 100 bar typical)',
        applications: [
            'Oil & gas processing',
            'Refinery applications',
            'Natural gas systems',
            'Light hydrocarbon separations'
        ],
        avoid: 'Highly polar systems, electrolytes, aqueous solutions with salts'
    },

    'PR': {
        name: 'Peng-Robinson',
        model_type: 'Cubic Equation of State',
        suited_for: 'Hydrocarbon systems, gas processing, wider range than SRK',
        range: 'Wide pressure range (up to 200+ bar)',
        applications: [
            'LNG processes',
            'Gas processing and transmission',
            'Petroleum refining',
            'High-pressure separations',
            'Supercritical applications'
        ],
        avoid: 'Aqueous electrolyte solutions, highly polar mixtures'
    },

    'IDEAL': {
        name: 'Ideal Gas',
        model_type: 'Ideal behavior assumption',
        suited_for: 'Low pressure gas systems only',
        range: 'Near atmospheric pressure only (< 2 bar)',
        applications: [
            'Air separation at low pressure',
            'Atmospheric processes',
            'Gas mixtures at near-ambient conditions'
        ],
        avoid: 'Any high pressure, any liquids, real gas behavior needed'
    },

    'NRTL': {
        name: 'Non-Random Two Liquid',
        model_type: 'Activity Coefficient Model',
        suited_for: 'Polar mixtures, highly non-ideal liquid systems',
        range: 'Low to moderate pressure (< 10 bar typical)',
        applications: [
            'Chemical processing',
            'Azeotropic distillation',
            'Liquid-liquid extraction',
            'Polar organic mixtures',
            'Alcohol-water systems'
        ],
        avoid: 'High pressure gas systems, supercritical fluids'
    },

    'UNIQUAC': {
        name: 'Universal Quasi-Chemical',
        model_type: 'Activity Coefficient Model',
        suited_for: 'Polar and non-polar liquid mixtures',
        range: 'Low to moderate pressure',
        applications: [
            'Chemical and pharmaceutical processing',
            'Polymer solutions',
            'Complex organic mixtures',
            'Size-asymmetric molecules'
        ],
        avoid: 'Gas phase at high pressure, electrolyte solutions'
    },

    'WILSON': {
        name: 'Wilson',
        model_type: 'Activity Coefficient Model',
        suited_for: 'Polar mixtures, miscible systems',
        range: 'Low to moderate pressure',
        applications: [
            'Distillation of polar mixtures',
            'Alcohol-hydrocarbon systems',
            'Chemical separations'
        ],
        avoid: 'Immiscible liquid systems (liquid-liquid equilibrium), gas phase'
    },

    'UNIFAC': {
        name: 'UNIFAC (Universal Functional Activity Coefficient)',
        model_type: 'Group Contribution Method',
        suited_for: 'Predictive method for systems without experimental data',
        range: 'Low to moderate pressure',
        applications: [
            'Preliminary design when no data available',
            'Screening alternative solvents',
            'Quick estimates for complex mixtures'
        ],
        avoid: 'Final design without validation, electrolytes, polymers'
    },

    'ELEC': {
        name: 'Electrolyte NRTL',
        model_type: 'Electrolyte Model',
        suited_for: 'Aqueous solutions with ions (salts, acids, bases)',
        range: 'Low to moderate pressure',
        applications: [
            'Amine gas treating',
            'Caustic wash systems',
            'Acid gas removal',
            'Electrolyte solutions',
            'Aqueous extraction'
        ],
        avoid: 'Non-aqueous systems, high pressure gas systems'
    },

    'SRKM': {
        name: 'SRK Modified',
        model_type: 'Modified Cubic EOS',
        suited_for: 'Enhanced SRK for better liquid density prediction',
        range: 'Low to moderate pressure',
        applications: [
            'When liquid density is critical',
            'Improved SRK predictions',
            'Hydrocarbon processing'
        ],
        avoid: 'Same as SRK - polar and electrolyte systems'
    },

    'PRM': {
        name: 'Peng-Robinson Modified',
        model_type: 'Modified Cubic EOS',
        suited_for: 'Enhanced PR for better volumetric properties',
        range: 'Wide pressure range',
        applications: [
            'When accurate densities needed',
            'LNG and gas processing',
            'High-pressure applications'
        ],
        avoid: 'Highly polar systems, electrolytes'
    },

    'BWRS': {
        name: 'Benedict-Webb-Rubin-Starling',
        model_type: 'Multi-parameter EOS',
        suited_for: 'Light hydrocarbons and natural gas',
        range: 'Wide pressure range including high pressure',
        applications: [
            'Natural gas processing',
            'Cryogenic applications',
            'LNG plants',
            'High accuracy for light hydrocarbons'
        ],
        avoid: 'Heavy hydrocarbons, polar systems'
    },

    'GS': {
        name: 'Grayson-Streed',
        model_type: 'Correlation Method',
        suited_for: 'Hydrocarbon systems, historical method',
        range: 'Moderate pressure',
        applications: [
            'Petroleum refining (older designs)',
            'Hydrocarbon separations'
        ],
        avoid: 'Modern designs (use PR or SRK instead), polar systems'
    },

    'CS': {
        name: 'Chao-Seader',
        model_type: 'Correlation Method',
        suited_for: 'Light hydrocarbons and hydrogen',
        range: 'Moderate to high pressure',
        applications: [
            'Refinery hydrogen systems',
            'Light ends separation',
            'Historical refinery designs'
        ],
        avoid: 'Modern designs (use PR or SRK instead), heavy hydrocarbons'
    },

    'API': {
        name: 'API Procedure',
        model_type: 'Correlation for Petroleum',
        suited_for: 'Petroleum fractions and crude oil',
        range: 'Low to moderate pressure',
        applications: [
            'Crude oil distillation',
            'Petroleum fraction characterization',
            'Refinery atmospheric towers'
        ],
        avoid: 'High pressure, light gases, polar chemicals'
    }
};
