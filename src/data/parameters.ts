/**
 * Parameters Data for PRO/II Hover Tooltips
 * Contains descriptions, units, and guidance for PRO/II parameters
 */

export interface ParameterData {
    description: string;
    units: string[];
    typical_range?: string;
    related?: string[];
    tip?: string;
}

export const PARAMETERS: { [key: string]: ParameterData } = {
    'TEMP': {
        description: 'Temperature specification',
        units: ['C (Celsius)', 'F (Fahrenheit)', 'K (Kelvin)', 'R (Rankine)'],
        typical_range: '-50 to 500°C for most processes',
        related: ['DUTY', 'VFRAC'],
        tip: 'Cannot specify both TEMP and DUTY simultaneously in most units. Use for isothermal operations.'
    },

    'PRES': {
        description: 'Pressure specification',
        units: ['BAR (bar)', 'KPA (kilopascal)', 'PSI (pounds/inch²)', 'ATM (atmosphere)', 'MMHG (mm mercury)'],
        typical_range: '0.1 to 100 bar for typical processes',
        related: ['DELP', 'VFRAC'],
        tip: 'Gauge pressure by default. Use PSIA for absolute pressure. Consider vacuum for < 1 bar.'
    },

    'DUTY': {
        description: 'Heat duty specification (positive = heating, negative = cooling)',
        units: ['KW (kilowatt)', 'MW (megawatt)', 'BTU/HR', 'KCAL/HR', 'MMBTU/HR'],
        typical_range: '-10000 to 10000 kW typical',
        related: ['TEMP', 'LMTD', 'UA'],
        tip: 'Positive duty = heat added (heating). Negative duty = heat removed (cooling).'
    },

    'VFRAC': {
        description: 'Vapor fraction specification (mass basis)',
        units: ['Dimensionless (0 to 1)'],
        typical_range: '0.0 (all liquid) to 1.0 (all vapor)',
        related: ['TEMP', 'PRES', 'DUTY'],
        tip: 'VFRAC=0 means all liquid, VFRAC=1 means all vapor, VFRAC=0.5 means 50% vapor by mass.'
    },

    'DELP': {
        description: 'Pressure drop or pressure change',
        units: ['BAR', 'KPA', 'PSI', 'ATM'],
        typical_range: 'Typically 0.01 to 5 bar',
        related: ['PRES', 'POUT'],
        tip: 'Positive DELP = pressure increase (pump/compressor). Negative DELP = pressure decrease (valve/pipe).'
    },

    'FEED': {
        description: 'Feed stream specification - defines input stream(s) to unit',
        units: ['Stream name(s)', 'Multiple feeds: FEED=S1,S2,S3', 'With stage: FEED=S1(10)'],
        tip: 'For columns: stage number in parentheses. Stage 1 = top. Multiple feeds separated by commas.'
    },

    'PROD': {
        description: 'Product stream specification - defines output stream(s) from unit',
        units: ['Stream name(s)', 'Multiple products: PROD=V1,L1', 'Named: PROD=OVHD=V1,BOT=L1'],
        tip: 'For flash: vapor product first, liquid second. For columns: can specify OVHD (overhead), BOT (bottoms).'
    },

    'NAME': {
        description: 'Unit name identifier - unique name for the unit operation',
        units: ['Alphanumeric string', 'Up to 16 characters', 'No spaces'],
        tip: 'Use meaningful names like "C-101" for columns, "E-101" for heat exchangers. Must be unique.'
    },

    'NSTAGE': {
        description: 'Number of equilibrium stages in column',
        units: ['Integer number'],
        typical_range: '5 to 100 stages typical, 20-40 most common',
        related: ['FEED', 'PROD'],
        tip: 'Stage 1 is the top stage. Condenser/reboiler may be additional stages depending on type.'
    },

    'REFLUX': {
        description: 'Reflux ratio for distillation column (L/D - liquid return / distillate)',
        units: ['Dimensionless ratio'],
        typical_range: '0.5 to 10 typical, 1-5 most common',
        related: ['BOTTOM', 'SPEC'],
        tip: 'Higher reflux = better separation but higher energy cost. Minimum reflux is theoretical limit.'
    },

    'BOTTOM': {
        description: 'Boilup ratio for distillation column (V/B - vapor / bottoms)',
        units: ['Dimensionless ratio'],
        typical_range: '0.5 to 10 typical',
        related: ['REFLUX', 'SPEC'],
        tip: 'Similar to reflux but for bottom of column. Affects reboiler duty.'
    },

    'EFF': {
        description: 'Efficiency specification (isentropic efficiency for pumps/compressors)',
        units: ['% (percent)', 'Decimal (0 to 1)'],
        typical_range: '70-85% for pumps, 75-85% for compressors',
        related: ['WORK', 'POWER'],
        tip: 'Lower efficiency = higher power consumption. Typical pump efficiency: 75%, compressor: 80%.'
    },

    'WORK': {
        description: 'Work input/output for pump or compressor',
        units: ['KW (kilowatt)', 'HP (horsepower)', 'MW (megawatt)'],
        related: ['EFF', 'DELP', 'PRATIO'],
        tip: 'Calculated from flow, pressure rise, and efficiency. Higher efficiency = lower work required.'
    },

    'PRATIO': {
        description: 'Pressure ratio for compressor (Pout/Pin)',
        units: ['Dimensionless ratio'],
        typical_range: '1.5 to 5 per stage typical',
        related: ['POUT', 'PRES', 'WORK'],
        tip: 'PRATIO = outlet pressure / inlet pressure. Multi-stage compression for PRATIO > 4.'
    },

    'POUT': {
        description: 'Outlet pressure specification',
        units: ['BAR', 'KPA', 'PSI', 'ATM'],
        related: ['PRES', 'DELP'],
        tip: 'Specify either POUT or DELP, not both. POUT is absolute outlet pressure.'
    },

    'LMTD': {
        description: 'Log Mean Temperature Difference for heat exchangers',
        units: ['C (Celsius)', 'K (Kelvin)', 'F (Fahrenheit)'],
        typical_range: '5 to 50°C typical',
        related: ['DUTY', 'UA', 'AREA', 'TAPP'],
        tip: 'Driving force for heat transfer. LMTD = (ΔT1 - ΔT2) / ln(ΔT1/ΔT2). Larger LMTD = smaller exchanger.'
    },

    'TAPP': {
        description: 'Temperature approach for heat exchangers (minimum ΔT)',
        units: ['C (Celsius)', 'K (Kelvin)', 'F (Fahrenheit)'],
        typical_range: '5 to 20°C typical',
        related: ['LMTD', 'DUTY'],
        tip: 'Smaller approach = larger heat exchanger but better heat recovery. Typical minimum: 10°C.'
    },

    'UA': {
        description: 'Overall heat transfer coefficient × Area',
        units: ['KW/K', 'BTU/HR-F', 'KCAL/HR-C'],
        related: ['DUTY', 'LMTD', 'AREA'],
        tip: 'UA = U × A where U = overall heat transfer coefficient, A = area. Duty = UA × LMTD.'
    },

    'AREA': {
        description: 'Heat transfer area for heat exchanger',
        units: ['M2 (square meter)', 'FT2 (square feet)'],
        typical_range: '10 to 1000 m² typical',
        related: ['UA', 'DUTY', 'LMTD'],
        tip: 'Larger area = more heat transfer capacity. Duty = U × Area × LMTD.'
    },

    'VOL': {
        description: 'Volume specification (reactor, vessel, tank)',
        units: ['M3 (cubic meter)', 'L (liter)', 'GAL (gallon)', 'FT3 (cubic feet)'],
        typical_range: '0.1 to 1000 m³ typical',
        related: ['RES', 'DIAM', 'LENGTH'],
        tip: 'For reactors: affects residence time. Volume = flow × residence time.'
    },

    'RES': {
        description: 'Residence time (holdup time in reactor or vessel)',
        units: ['HR (hour)', 'MIN (minute)', 'SEC (second)'],
        typical_range: 'Minutes to hours for reactors',
        related: ['VOL', 'FLOW'],
        tip: 'Residence time = Volume / Volumetric flow rate. Longer time = more conversion.'
    },

    'DIAM': {
        description: 'Diameter specification (pipe, vessel, column)',
        units: ['M (meter)', 'MM (millimeter)', 'IN (inch)', 'FT (feet)'],
        typical_range: '0.05 to 5 m for pipes, 1 to 10 m for columns',
        related: ['LENGTH', 'AREA', 'VOL'],
        tip: 'For pipes: affects pressure drop. For columns: affects vapor capacity.'
    },

    'LENGTH': {
        description: 'Length specification (pipe, heat exchanger tubes)',
        units: ['M (meter)', 'MM (millimeter)', 'FT (feet)'],
        typical_range: '1 to 1000 m for pipes, 2 to 10 m for HX tubes',
        related: ['DIAM', 'VOL'],
        tip: 'For pipes: affects pressure drop. For heat exchangers: affects area.'
    },

    'ROUGH': {
        description: 'Absolute roughness of pipe wall',
        units: ['MM (millimeter)', 'IN (inch)', 'Typical: 0.045 mm for commercial steel'],
        typical_range: '0.001 to 0.5 mm',
        related: ['DIAM', 'DELP'],
        tip: 'Commercial steel: 0.045 mm. Stainless steel: 0.015 mm. Affects friction factor and pressure drop.'
    },

    'SPLIT': {
        description: 'Split fractions for splitter - how to divide feed among products',
        units: ['Decimal fractions (must sum to 1.0)', 'Example: SPLIT=0.6,0.4'],
        related: ['PROD', 'FLOW'],
        tip: 'Each number is fraction to corresponding product. Must sum to 1.0. Order matches PROD order.'
    },

    'FLOW': {
        description: 'Flow rate specification for streams',
        units: ['KG/HR', 'KGMOL/HR', 'LB/HR', 'LBMOL/HR', 'M3/HR'],
        tip: 'Can specify mass flow, molar flow, or volumetric flow. Consistent units throughout simulation.'
    },

    'SPEC': {
        description: 'Column specification (composition, temperature, flow, etc.)',
        units: ['Various - depends on spec type', 'Composition: mole fraction', 'Temperature: C/F/K', 'Flow: mass/molar rate'],
        related: ['REFLUX', 'BOTTOM'],
        tip: 'Specs control column operation. Need degrees of freedom: typical specs are reflux, boilup, and product specs.'
    },

    'COND': {
        description: 'Condenser type for distillation column',
        units: ['TOTAL (total condenser)', 'PARTIAL (partial condenser)', 'NONE (no condenser)'],
        related: ['REFLUX', 'OVHD'],
        tip: 'TOTAL: all vapor condensed. PARTIAL: vapor product available. Affects stage count.'
    },

    'REB': {
        description: 'Reboiler type for distillation column',
        units: ['KETTLE (kettle reboiler)', 'THERMO (thermosiphon)', 'NONE (no reboiler)'],
        related: ['BOTTOM', 'DUTY'],
        tip: 'KETTLE: equilibrium stage. THERMO: no additional stage. Affects stage count and calculations.'
    },

    'ELEV': {
        description: 'Elevation change (vertical height difference)',
        units: ['M (meter)', 'FT (feet)'],
        related: ['DELP', 'HEAD'],
        tip: 'Positive = upward flow (pressure drop). Negative = downward flow (pressure gain). ΔP = ρ × g × h.'
    },

    'HEAD': {
        description: 'Pump head (pressure rise in height of liquid)',
        units: ['M (meter of liquid)', 'FT (feet of liquid)'],
        typical_range: '10 to 200 m typical for pumps',
        related: ['DELP', 'WORK', 'EFF'],
        tip: 'Head = ΔP / (ρ × g). Pump curves typically in meters of liquid. Higher head = higher pressure rise.'
    },

    'IEFF': {
        description: 'Isentropic efficiency for compressors',
        units: ['% (percent)', 'Decimal (0 to 1)'],
        typical_range: '75-85% typical',
        related: ['WORK', 'PRATIO'],
        tip: 'Ratio of isentropic work to actual work. Lower efficiency = higher temperature rise and power.'
    },

    'PEFF': {
        description: 'Polytropic efficiency for compressors',
        units: ['% (percent)', 'Decimal (0 to 1)'],
        typical_range: '80-88% typical',
        related: ['IEFF', 'WORK'],
        tip: 'Used for multi-stage compression. More fundamental than isentropic efficiency.'
    },

    'SYSTEM': {
        description: 'Thermodynamic method system specification - CRITICAL FOR ACCURATE PHASE EQUILIBRIUM',
        units: [
            'Equation of State (EOS) Methods:',
            '  SRK - Soave-Redlich-Kwong',
            '  PR - Peng-Robinson',
            '  SRKM - SRK Modified (Mathias)',
            '  PRM - PR Modified (Mathias)',
            '  SRKKD - SRK w/ Kabadi-Danner',
            '  SRKH - SRK w/ Huron-Vidal',
            '  PRH - PR w/ Huron-Vidal',
            '  SRKP - SRK Peneloux',
            '  PRP - PR Peneloux',
            '',
            'Activity Coefficient Methods:',
            '  NRTL - Non-Random Two Liquid',
            '  UNIQUAC - Universal Quasi-Chemical',
            '  UNIFAC - UNIQUAC Functional Group',
            '  WILSON - Wilson Equation',
            '  VANLAAR - Van Laar',
            '  IDEAL - Ideal Solution/Gas',
            '',
            'Specialized Methods:',
            '  SOUR - Sour Water Systems (H2S, CO2)',
            '  AMINE - Amine Gas Treating',
            '  BWRS - Benedict-Webb-Rubin-Starling',
            '  GS - Grayson-Streed (Petroleum)',
            '  BK10 - Braun K-10 (Petroleum)',
            '  IGSTPD - Ideal Gas Steam Tables'
        ],
        typical_range: 'Must be specified in THERMODYNAMIC DATA section',
        related: ['METHOD', 'SET', 'KVALUE', 'DENSITY', 'ENTHALPY'],
        tip: '**SELECTION GUIDE:**\n\n' +
             '**HYDROCARBONS (non-polar):**\n' +
             '• SRK/PR - General purpose, oil/gas processing (MOST COMMON)\n' +
             '• SRKM/PRM - Improved for high MW or polar mix\n' +
             '• GS/BK10 - Traditional petroleum methods\n\n' +
             '**POLAR SYSTEMS:**\n' +
             '• NRTL - Highly non-ideal, alcohol-water, chemicals\n' +
             '• UNIQUAC - Polymer solutions, broad polarity\n' +
             '• UNIFAC - Predictive (no data needed)\n\n' +
             '**SPECIALIZED:**\n' +
             '• SOUR - H2S/CO2/H2O systems\n' +
             '• AMINE - DEA/MEA/MDEA gas treating\n' +
             '• SRKKD - Aqueous hydrocarbons w/ electrolytes\n\n' +
             '**USAGE:**\n' +
             'METHOD SYSTEM=SRK, SET=SET01, DEFAULT\n' +
             'METHOD SYSTEM(VLLE)=NRTL, L1KEY=1, L2KEY=5\n\n' +
             '**CRITICAL:** Wrong thermo method = wrong answers!\n' +
             'Always validate against plant data or literature.'
    }
};
