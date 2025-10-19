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
    note?: string;
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
        units: ['SI (default): kPa (kilopascal)', 'METRIC: kg/cm2', 'ENGLISH (default absolute): PSIA (pounds/in², absolute)', 'BAR (bar)', 'MMHG (mm mercury)'],
        typical_range: '≈100 kPa (1 bar) is common; processes often 0.1 to 100 bar equivalent',
        related: ['DELP', 'VFRAC'],
        tip: 'Default units: SI -> kPa; Metric -> kg/cm2; English -> psia (absolute values). PRO/II treats pressure qualifiers as absolute when PSIA/ABS used; otherwise gauge may be assumed in some contexts. Use explicit units to avoid ambiguity.'
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

    'VARY': {
        description: 'VARY statement: Used with SPEC to vary parameters (DUTY, TEMP, RATE, etc.) during solution to meet specification targets',
        units: ['None - identifies variable to be varied (e.g., DUTY, TEMP)'],
        typical_range: 'Depends on the parameter being varied; check SPEC constraints',
        related: ['SPEC', 'DEFINE'],
        tip: 'Use one VARY per SPEC block. VARY identifies which variable the solver adjusts. See PRO/II Keyword Manual – Change and Vary Statements.'
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
    ,
    'DEFINE': {
        description: 'DEFINE statement: sets unit operation parameters or stream properties based on previously computed unit operations and streams (used to fix values or reference computed results).',
        units: ['Syntax: DEFINE <property> AS STREAM=<sid>, <property 1>, {<operator>, value | <reference 2>, <property 2>}', 'Or: DEFINE <property> AS <unit type>=<uid>, <property 1>, {<operator>, value | <reference 2>, <property 2>}'],
        related: ['SPEC', 'CALC', 'ISOTHERMAL'],
        tip: 'DEFINE adjusts unit operation parameters directly using values computed earlier in the flowsheet. Use to set a unit parameter equal to a stream property or another unit result.',
        typical_range: 'Varies by property; see manual for property-specific units',
        // short example from manual: weight fraction controller example and usage hint
        // example is stored as a tip to keep parameter schema consistent
        // Note: example shown in hoverProvider will render this tip field
        note: 'Example: DEFINE P(1) AS STRM=SRGO RATE(WT)  $ Fresh feed excluding liquid recycle\n' +
              'DEFINE PRES AS CALC=HDST R(2)\n' +
              'This sets P(1) equal to the weight rate of stream SRGO and PRES equal to a calculated result R(2) from unit HDST.'
    },
    'PLUS': {
        description: 'Arithmetic operator: addition. Adds the right-hand operand to the left-hand operand.',
        units: [],
        tip: 'Synonyms: SUM, ADD. Example: DEFINE X AS STREAM=S1, RATE, PLUS, STREAM=S2, RATE'
    },
    'SUM': {
        description: 'Arithmetic operator: addition (synonym of PLUS).',
        units: [],
        tip: 'Use with DEFINE/SPEC to sum values.'
    },
    'ADD': {
        description: 'Arithmetic operator: addition (synonym of PLUS).',
        units: [],
        tip: 'Commonly used in DEFINE to add constants or other properties.'
    },
    'MINUS': {
        description: 'Arithmetic operator: subtraction. Subtracts the right-hand operand from the left-hand operand.',
        units: [],
        tip: 'Synonyms: DIFF, SUBT. Example: DEFINE DP AS FLASH=F1, DP, MINUS, 0.5'
    },
    'DIFF': {
        description: 'Arithmetic operator: subtraction (synonym of MINUS).',
        units: [],
        tip: 'Used to indicate difference between two values.'
    },
    'SUBT': {
        description: 'Arithmetic operator: subtraction (synonym of MINUS).',
        units: [],
        tip: 'Alternative keyword for subtraction in DEFINE/SPEC.'
    },
    'TIMES': {
        description: 'Arithmetic operator: multiplication. Multiplies the left-hand operand by the right-hand operand.',
        units: [],
        tip: 'Synonym: MULTIPLY. Example: DEFINE PRESSURE AS STREAM=REF, PRES, TIMES, 0.95'
    },
    'MULTIPLY': {
        description: 'Arithmetic operator: multiplication (synonym of TIMES).',
        units: [],
        tip: 'Used to scale values by a multiplier.'
    },
    'DIVIDE': {
        description: 'Arithmetic operator: division. Divides the left-hand operand by the right-hand operand.',
        units: [],
        tip: 'Synonyms: DIVIDEBY, RATIO, OVER. Example: SPEC FRAC=0.5, DIVIDE, 2'
    },
    'DIVIDEBY': {
        description: 'Arithmetic operator: division (synonym of DIVIDE).',
        units: [],
        tip: 'Alternative textual form for division.'
    },
    'RATIO': {
        description: 'Arithmetic operator: divide or ratio. Used in DEFINE/SPEC to indicate division or ratio scaling.',
        units: [],
        tip: 'Also used in parameters like PRATIO (pressure ratio); as operator, acts like DIVIDE.'
    },
    'OVER': {
        description: 'Arithmetic operator: divide (synonym of DIVIDE).',
        units: [],
        tip: 'Common in plain-language arithmetic expressions (A OVER B).'
    },
    'PARAMETER': {
        description: 'General PARAMETER statement used to control solver, iteration and convergence options',
        units: ['Various - key/value pairs'],
        tip: 'Used to set algorithmic options (iterations, tolerances, number of theoretical stages, etc.). Often required for packed column settings.'
    },
    'PACKING': {
        description: 'Defines packing for a column section (random or structured) and associated parameters',
        units: ['Type name/code (e.g., SULZER, FLEXI, M250Y)', 'SIZE (uflen), HEIGHT (uleng), FACTOR (packing factor)'],
        tip: 'Used to declare packing type, size and height. Affects pressure drop, flood calculations and HETP; see packing section for TYPE/SIZE specifics.'
    },
    'SIZE': {
        description: 'Nominal packing or particle size (used in PACKING and sizing sections)',
        units: ['uflen (fine length units; e.g., inches or mm)'],
        tip: 'Select from available sizes for a packing type; interacts with TYPE to determine packing factor when FACTOR is omitted.'
    },
    'HEIGHT': {
        description: 'Packed section height or overall equipment height',
        units: ['uleng (length units, e.g., m, ft)'],
        tip: 'If specified, HETP is computed as HEIGHT divided by number of theoretical stages; otherwise HETP may be supplied directly.'
    }
    ,
    'FRAC': {
        description: 'Fraction qualifier used for properties and locations (represents fraction 0-1)',
        units: ['Dimensionless (0-1)', 'Also PCT for percent and PPM for parts-per-million'],
        tip: 'FRAC indicates fractions by default and is used as a qualifier for composition, profiles (e.g., TPROFILE) and reactor location fractions.'
    },
    'SRXSTR': {
        description: 'Subroutine SRXSTR: stores calculator vector element as a stream property and re-flashes the stream',
        units: ['Stream identifier (sid)'],
        tip: 'CALL SRXSTR(type, value, sid) stores values (SMR, SWR, STEMP, etc.) and re-flashes stream to update thermodynamic state.'
    },
    'SMR': {
        description: 'Stream property: SMR = stream mole rate (mol/time)',
        units: ['M (moles/time)'],
        tip: 'Accessible via SRXSTR and stream property tables; use for calculator/stream manipulations.'
    },
    'SWR': {
        description: 'Stream property: SWR = stream weight (mass/time)',
        units: ['WT (mass/time)'],
        tip: 'Accessible via SRXSTR and stream property tables; typical use in calculator and stream manipulations.'
    }
    ,
    'ROVHD': {
        description: 'ROVHD: rate (or fraction) assigned to overhead product in stream splitting or column outputs',
        units: ['Depending on context: weight/mole rate or fraction'],
        tip: 'Used in stream calculator and column split rules (ROVHD specifies rate to overhead product).'
    },
    'SGVR': {
        description: 'Standard gas volume rate of stream (standard conditions gas volumetric flow)',
        units: ['GV (standard gas volume per time)'],
        tip: 'Reported by stream property tables and accessible via SRXSTR (SGVR). Units default to problem standard gas volume units per time.'
    },
    'RXCALC': {
        description: 'RXCALC: reactor calculation options (selects model, basis, integration and kinetics options)',
        units: ['Optional model/basis flags'],
        tip: 'Entries: MODEL=STOIC|SHIFT|METHANATION, CONCENTRATION|PARTIALPRESSURE|FUGACITY, NOHBALANCE, KINETICS=...; controls reaction solver behavior.'
    },
    'EQUR': {
        description: 'EQUREACTOR / EQUR: Equilibrium reactor module identifier (equilibrium reaction solver)',
        units: ['Unit identifier string (UID)'],
        tip: 'Defines an equilibrium reactor; supports REACTION, EQUILIBRIUM, APPROACH, RXCALC entries and typical reactor options.'
    },
    'DEWWATER': {
        description: 'DEWWATER: water dew point calculation (water dew point for hydrocarbon-water systems)',
        units: ['Temperature (utemp) or Pressure (upres) qualifiers'],
        tip: 'Used with DEW and DEWWATER statements to compute water dew point conditions for hydrocarbon-water systems; not meaningful with VLLE methods.'
    }
    ,
    'SHIFT': {
        description: 'Special built-in shift reactor model/keyword used in REACTION statements or RXCALC MODEL selection',
        units: ['Keyword / Model selection'],
        tip: 'Used to indicate the water-gas shift reaction model (often alongside METHANATION). Appears as REACTION SHIFT or RXCALC MODEL=SHIFT; built-in stoichiometry and equilibrium data are used.'
    },
    'SPASS': {
        description: 'Number of shell passes for shell-and-tube heat exchangers or condenser/reboiler configuration',
        units: ['Integer (number of shell passes)'],
        tip: 'Defines the number of shell passes. When only SPASS is given, TPASS is set to twice SPASS for LMTD correction; default when omitted is TPASS=2 and SPASS=1.'
    },
    'TPASS': {
        description: 'Number of tube passes for shell-and-tube heat exchangers',
        units: ['Integer (number of tube passes)'],
        tip: 'Defines number of tube passes. Default is TPASS=2 when omitted. If only TPASS is given, SPASS is set to half TPASS (or 1 if TPASS=1); TPASS is reset to twice SPASS if not in expected relation and a warning is issued.'
    }
    ,
    'HOTVOL': {
        description: 'Total actual volumetric flow of the stream at flowing conditions (hot volume)',
        units: ['GV or LV (volume units per time) depending on basis, default: problem vapor volume units/time'],
        tip: 'Includes vapor + liquid + water at flowing conditions. Often used in mass balance and entrainment specifications.'
    },
    'XOVHD': {
        description: 'Actual composition of overhead product (fractional composition on specified basis)',
        units: ['Basis: M (mole, default), W (weight), LV (std liquid vol), GV (std gas vol)'],
        tip: 'Used in stream splitting statements (XOVHD) to define composition of overhead product explicitly. Provide i,j ranges and values as groups.'
    }
    ,
    'SEQUENCE': {
        description: 'Defines an ordered list of stream identifiers used by unit sequences and setup sections',
        units: ['List of stream IDs (comma-separated)'],
        tip: 'Use SEQUENCE to enumerate stream identifiers used in SEQUENCE or setup sections; helpful for referencing streams by index in calculators or array-style references.'
    }
};
