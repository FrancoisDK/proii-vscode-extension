"use strict";
/**
 * Unit Operations Data for PRO/II Hover Tooltips
 * Contains descriptions, parameters, and examples for all PRO/II unit operations
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UNIT_OPERATIONS = void 0;
exports.UNIT_OPERATIONS = {
    'FLASH': {
        description: 'Flash Drum - Calculates thermodynamic equilibrium and separates phases (PRO/II Manual §11.1)',
        types: [
            'ISOTHERMAL - Fixed temperature and pressure',
            'ADIABATIC - Most common, no heat transfer',
            'DEW - Saturated vapor (dew point)',
            'DEWHC - Hydrocarbon dew point',
            'DEWWATER - Water dew point',
            'BUBBLE - Saturated liquid (bubble point)',
            'ISENTROPIC - Constant entropy',
            'UPPERDEWPOINT - Upper dew point solution',
            'TPSPEC - Fixed T or P with SPEC statement',
            'FRAC - Specified vapor fraction'
        ],
        parameters: {
            required: ['UID', 'FEED', 'PRODUCT'],
            optional: [
                'NAME', 'KPRINT',
                'ISOTHERMAL', 'ISOT', 'ADIABATIC', 'ADIA', 'DEW', 'DEWHC', 'DEWWATER',
                'BUBBLE', 'BUBL', 'ISENTROPIC', 'ISEN', 'UPPERDEWPOINT', 'TPSPEC', 'FRAC',
                'TEMP', 'TEMPERATURE', 'TEST',
                'PRESSURE', 'PRES', 'DP', 'DELP', 'PEST',
                'DUTY', 'VFRAC',
                'OPERATION', 'PHASE', 'V', 'L', 'L1', 'L2', 'W', 'ENTOPTION', 'FAIL', 'SOLVE',
                'ENTRAINMENT', 'ENTPROD', 'FROM', 'TO', 'FRACTION', 'PERCENT', 'RATE', 'HOTVOL',
                'M', 'WT', 'AV', 'GV', 'LV',
                'SPEC', 'STREAM', 'WET', 'DRY', 'VALUE', 'ATOL', 'RTOL',
                'METHOD', 'SET',
                'DEFINE', 'AS', 'ERATE',
                'PRINT', 'EXTE', 'EXTENDED'
            ]
        },
        example: `$ Example 1: Adiabatic flash (most common)
FLASH       UID=F01, NAME=PHASE SEPARATOR
  FEED      FEED1, FEED2
  PRODUCT   V=VAPOR, L=LIQUID
  ADIABATIC

$ Example 2: Isothermal flash at fixed T and P
FLASH       UID=F02, NAME=COOLER FLASH
  FEED      HOT
  PRODUCT   V=V2, L=L2
  ISOTHERMAL TEMP(F)=100, PRESSURE(PSIA)=50

$ Example 3: Bubble point at fixed pressure
FLASH       UID=F03, NAME=BUBBLE PT
  FEED      FEED
  PRODUCT   L=LIQUID
  BUBBLE    PRESSURE(PSIA)=100

$ Example 4: Dew point with pressure drop
FLASH       UID=F04, NAME=DEW PT
  FEED      VAPOR
  PRODUCT   V=SATURATED
  DEW       DP(PSI)=5, TEST(F)=120

$ Example 5: TPSPEC with stream specification
FLASH       UID=F05, NAME=CONTROLLED FLASH
  FEED      FEED
  PRODUCT   V=V5, L=L5
  TPSPEC    DP=10
  SPEC      STREAM=L5, RATE, VALUE=1432`,
        notes: `⚠️ UID is REQUIRED (unique identifier).
📖 Reference: PRO/II Keyword Manual Section 11.1

GENERAL DESCRIPTION:
- Calculates thermodynamic state when two variables are given
- Determines phase equilibrium and separates phases
- Reports required duty to achieve the state
- Handles two-phase (VL) and three-phase (VLL with VLLE)
- Can model entrainment between phases

FEED/PRODUCT STATEMENTS (required):
Format: FEED sid1, sid2, ...
        PRODUCT V=sid or L=sid, {W=sid, S=sid} or
                V=sid, L=sid, {W=sid, S=sid} or
                M=sid, {W=sid, S=sid}

Product options:
  V = Vapor only
  L = Liquid only
  M = Mixed (vapor + liquid in same stream)
  W = Decanted water (VLLE systems)
  S = Solids (separate solid product)

Multiple feeds are mixed before flashing

⚠️ Product phase allowances depend on flash type (see Table 11.1-1)

FLASH TYPES (Performance Specifications):

1. ISOTHERMAL (fixed T and P):
   Format: ISOTHERMAL TEMP(utemp)=value, PRESSURE(upres)=value
       or: ISOTHERMAL TEMP(utemp)=value, DP(upres)=0.0
   
   Both temperature and pressure fixed
   Most constrained flash type
   
   Example:
     ISOTHERMAL TEMP(F)=100, PRESSURE(PSIA)=50
     ISOTHERMAL TEMP(C)=38, DP=0

2. ADIABATIC (most common):
   Format: ADIABATIC TEMP(utemp)=value, {PEST(upres)=value}
       or: ADIABATIC PRESSURE(upres)=value, {TEST(utemp)=value}
       or: ADIABATIC DP(upres)=0.0, {TEST(utemp)=value}
       or: ADIABATIC DUTY(uduty)=0.0
   
   No heat transfer (DUTY=0.0 default)
   Can specify non-zero DUTY if desired
   Most commonly used flash type
   
   DUTY in millions of energy/time units:
     Positive = Heating
     Negative = Cooling
   
   Example:
     ADIABATIC                          (default DP=0)
     ADIABATIC PRESSURE(PSIA)=100
     ADIABATIC DP(PSI)=5
     ADIABATIC DUTY(MMBTU/HR)=-2.5

3. DEW (dew point - saturated vapor):
   Format: DEW TEMP(utemp)=value, {PEST(upres)=value}
       or: DEW PRESSURE(upres)=value, {TEST(utemp)=value}
       or: DEW DP(upres)=0.0, {TEST(utemp)=value}
   
   Calculates conditions where vapor is saturated
   Product is all vapor at dew point
   Pseudo liquid stream created if L product label given
   
   Example:
     DEW TEMP(F)=120, PEST(PSIA)=50
     DEW PRESSURE(PSIA)=100
     DEW DP=0

4. DEWHC (hydrocarbon dew point):
   Format: DEWHC TEMP(utemp)=value, {PEST(upres)=value}
       or: DEWHC PRESSURE(upres)=value, {TEST(utemp)=value}
       or: DEWHC DP(upres)=0.0, {TEST(utemp)=value}
   
   For water-hydrocarbon systems
   Calculates hydrocarbon dew point
   Water treated separately
   
   ⚠️ Not meaningful with VLLE
   
   Example:
     DEWHC TEMP(F)=150
     DEWHC PRESSURE(PSIA)=200

5. DEWWATER (water dew point):
   Format: DEWWATER TEMP(utemp)=value, {PEST(upres)=value}
       or: DEWWATER PRESSURE(upres)=value, {TEST(utemp)=value}
       or: DEWWATER DP(upres)=0.0, {TEST(utemp)=value}
   
   For water-hydrocarbon systems
   Calculates water dew point
   Hydrocarbons treated separately
   
   ⚠️ Not meaningful with VLLE
   
   Example:
     DEWWATER TEMP(F)=130
     DEWWATER DP(PSI)=5, TEST(F)=120

6. BUBBLE (bubble point - saturated liquid):
   Format: BUBBLE TEMP(utemp)=value, {PEST(upres)=value}
       or: BUBBLE PRESSURE(upres)=value, {TEST(utemp)=value}
       or: BUBBLE DP(upres)=0.0, {TEST(utemp)=value}
   
   Calculates conditions where liquid is saturated
   Product is all liquid at bubble point
   Pseudo vapor stream created if V product label given
   
   Example:
     BUBBLE TEMP(F)=200
     BUBBLE PRESSURE(PSIA)=100, TEST(F)=195
     BUBBLE DP=0

7. ISENTROPIC (constant entropy):
   Format: ISENTROPIC TEMP(utemp)=value, {PEST(upres)=value}
       or: ISENTROPIC PRESSURE(upres)=value, {TEST(utemp)=value}
       or: ISENTROPIC DP(upres)=0.0, {TEST(utemp)=value}
   
   Entropy of products equals entropy of feeds
   Used for modeling isentropic expansions
   
   Example:
     ISENTROPIC PRESSURE(PSIA)=20, TEST(F)=100
     ISENTROPIC DP(PSI)=50

8. UPPERDEWPOINT (upper dew point):
   Format: UPPERDEWPOINT TEMP(utemp)=value, {PEST(upres)=value}
   
   For retrograde systems above critical temperature
   Guarantees dew point at higher pressure
   Two valid dew points may exist
   
   Example:
     UPPERDEWPOINT TEMPERATURE(C)=30, PEST=100

9. TPSPEC (specified with constraint):
   Format: TPSPEC TEMP(utemp)=value, {PEST(upres)=value}
       or: TPSPEC PRESSURE(upres)=value, {TEST(utemp)=value}
       or: TPSPEC DP(upres)=0.0, {TEST(utemp)=value}
       and: SPEC STREAM=sid, <property>, {WET or DRY}, &
                 {<operator>, <reference>, <property>}, &
                 VALUE=value, {ATOL=value or RTOL=value}
   
   Flash at fixed T or P meeting stream specification
   Requires SPEC statement
   
   Available properties:
     TEMP, PRESSURE, RATE, FRAC, PERC, PPM, GRAINS (component),
     MOISTURE, LFRAC, VFRAC, WFRAC, MW, API, SPGR, DENSITY,
     MOLVOL, HOTVOL, ENTHALPY, TBP, D86, D1160, RVP, TVP,
     VISCOSITY, CONDUCTIVITY, SURFACE, SPROPERTY
   
   Example:
     TPSPEC DP=10
     SPEC STREAM=LIQUID, RATE, VALUE=1432

10. FRAC (vapor fraction):
    Format: FRAC TEMP(utemp)=value, {PEST(upres)=value}
        or: FRAC PRESSURE(upres)=value, {TEST(utemp)=value}
        or: FRAC VFRAC(ufrac)=value
    
    Flash to specified vapor fraction
    VFRAC range: 0.0 (all liquid) to 1.0 (all vapor)
    
    Example:
      FRAC PRESSURE(PSIA)=100, VFRAC=0.5
      FRAC TEMP(F)=150, VFRAC=0.3

TEMPERATURE/PRESSURE SPECIFICATIONS:

TEMP or TEMPERATURE:
  Format: TEMP(utemp)=value
  
  Specifies flash temperature
  Required for ISOTHERMAL
  Optional for other types (specify TEMP or PRESSURE)
  
  Example:
    TEMP(F)=100
    TEMPERATURE(C)=38

TEST (temperature estimate):
  Format: TEST(utemp)=value
  
  Initial estimate for iterative calculation
  Helps convergence
  
  Example:
    TEST(F)=120

PRESSURE or PRES:
  Format: PRESSURE(upres)=value
  
  Specifies flash pressure
  Required for ISOTHERMAL
  Optional for other types
  
  Example:
    PRESSURE(PSIA)=50
    PRES(BAR)=3.5

DP or DELP (pressure drop):
  Format: DP(upres)=value
  
  Pressure drop below lowest feed pressure
  Default: DP=0.0
  Negative DP increases pressure
  
  If both PRESSURE and DP omitted, default is DP=0
  
  Example:
    DP(PSI)=5              (5 psi drop)
    DP(KPA)=-100           (100 kPa increase)

PEST (pressure estimate):
  Format: PEST(upres)=value
  
  Initial pressure estimate
  Helps convergence
  
  Example:
    PEST(PSIA)=50

DUTY (heat duty):
  Format: DUTY(uduty)=value
  
  Only for ADIABATIC flash
  In millions of energy/time units
  Default: 0.0
  Positive = Heating
  Negative = Cooling
  
  Example:
    DUTY(MMBTU/HR)=2.5     (heating)
    DUTY(KW)=-500          (cooling)

VFRAC (vapor fraction):
  Format: VFRAC(ufrac)=value
  
  Only for FRAC flash type
  Range: 0.0 to 1.0
  0.0 = All liquid
  1.0 = All vapor
  
  Example:
    VFRAC=0.5              (50% vapor)

PRODUCT PHASE ASSIGNMENT (optional):

OPERATION PHASE=type, {ENTOPTION=FAIL or SOLVE}

For super-critical region:
  Fluid is neither liquid nor vapor ('dense phase')
  PRO/II uses heuristics to assign phase
  PHASE option allows override

Phase types:
  V or VAPOR - Product returns as all vapor
  L or LIQUID - Product returns as bulk liquid
  L1 - First (hydrocarbon, light) liquid sub-phase
  L2 or WATER - Second (aqueous, heavy) liquid sub-phase
  
Omit PHASE entry for PRO/II automatic selection (default)

⚠️ Primarily for super-critical region use

ENTOPTION (for entrainment):
  FAIL - Stop if entrainment flow spec cannot be met
  SOLVE - Reduce entrainment rate to available feed

Example:
  OPERATION PHASE=V
  OPERATION PHASE=L1, ENTOPTION=SOLVE

ENTRAINMENT (optional):

Specifies extent one phase entrains in another

ENTRAINMENT FROM=phase, TO=phase, &
            FRACTION=value or PERCENT=value or &
            RATE(basis,urate)=value or &
            HOTVOL(basis,vol units)=value, {NAME=eid}

Valid phases: V, L, S, W

FROM: Phase being entrained
TO: Phase receiving entrainment (no self-entrainment)

Specification options:
  FRACTION - Mole fraction of FROM phase entrained
  PERCENT - Mole percent of FROM phase entrained
  RATE - Flow rate entrained (M, WT, LV, GV basis)
  HOTVOL - Actual volumetric flow rate (AV, GV basis)

Multiple ENTRAINMENT statements allowed

Example:
  ENTRAINMENT FROM=L, TO=V, PERCENT=1.5
  ENTRAINMENT FROM=V, TO=L, RATE(M,LBMOL/HR)=10

ENTPROD (alternative entrainment):

Specifies extent entrained phase constitutes other phase

ENTPROD FROM=phase, TO=phase, &
        FRACTION(basis)=value or PERCENT(basis)=value or &
        RATE(basis,urate)=value or &
        HOTVOL(basis,vol units)=value, {NAME=eid}

Valid phases: V, L, S, W

Basis options: M (mole), WT (weight), AV (actual volume), GV (gas volume)

⚠️ ENTRAINMENT and ENTPROD are mutually exclusive

Example:
  ENTPROD FROM=L, TO=V, FRACTION(WT)=0.02

Entrainment notes:
  - Calculated after flash calculations
  - Multiple statements processed sequentially
  - If FRACTION/PERCENT sum > 1.0, input error
  - If actual entrainment > 1.0, warning and rate reduced
  - Products after entrainment may differ from flash specs

VLLE CALCULATIONS (three-phase):

Rigorous two liquid phase handling:
  - Specify VLLE thermodynamics method set
  - L = First liquid (bulk of first principal component)
  - W = Second liquid (or aqueous phase if no principals)
  - DEWWATER and DEWHC not meaningful with VLLE

Example:
  FLASH UID=F10
    FEED MIXED
    PRODUCT V=VAP, L=HC, W=WATER
    ADIABATIC
    METHOD SET=SRKM-VLLE

SPEC STATEMENT (for TPSPEC):

Format: SPEC STREAM=sid, <property 1>, {WET or DRY}, &
             {<operator>, <reference>, <property 2>}, &
             VALUE=value, {ATOL=value or RTOL=value}

Generalized specification for TPSPEC flash

WET/DRY basis:
  WET - Include water in calculation
  DRY - Exclude water from calculation

Operators: PLUS, MINUS, TIMES, DIVIDEBY

Tolerances:
  ATOL - Absolute tolerance
  RTOL - Relative tolerance (default: 0.1%)

Example:
  SPEC STREAM=LIQUID, TEMP(F), VALUE=150, RTOL=0.5
  SPEC STREAM=VAPOR, RATE(LBMOL/HR), VALUE=500

DEFINE STATEMENT (optional):

Format: DEFINE <param> AS <unit type>=uid, <param>, {<op>, <ref>}
    or: DEFINE <param> AS STREAM=sid, <prop>, {<op>, <ref>}

Parameters available for DEFINE:
  TEMP, PRESSURE, DP, DUTY, ERATE (for pseudo streams)

Can relate to stream or unit properties

Limits:
  - ISOTHERMAL: Maximum two DEFINE statements
  - All other types: Maximum one DEFINE statement

Example:
  DEFINE DUTY AS COLUMN=T101, DUTY(2)
  DEFINE DP AS STREAM=P1, PRESSURE, MINUS, FLASH=F1, PRESSURE
  DEFINE TEMP AS FLASH=F1, TEMP, PLUS, 10.0

METHOD STATEMENT (optional):

Format: METHOD SET=setid

Selects thermodynamic method set for:
  - K-value calculations
  - Enthalpy calculations
  - Entropy calculations
  - Property calculations

Example:
  METHOD SET=SRK-HP
  METHOD SET=SRKM-VLLE

PRINT OPTIONS (optional):

Format: PRINT EXTE or EXTENDED

EXTE: Extended output
  - Component K-values tabulation
  - Detailed phase properties
  - Convergence information

Example with KPRINT:
  FLASH UID=F11, NAME=SEPARATOR, KPRINT
    ...

TYPICAL APPLICATIONS:

1. Phase Separator (most common):
   Simple V-L separation
   
   FLASH UID=SEP
     FEED MIXED
     PRODUCT V=VAPOR, L=LIQUID
     ADIABATIC

2. Pressure Let-Down:
   Reduce pressure with phase change
   
   FLASH UID=LETDOWN
     FEED HIGH_P
     PRODUCT V=V_OUT, L=L_OUT
     ADIABATIC DP(PSI)=50

3. Cooler with Flash:
   Cool and separate phases
   
   FLASH UID=COOLER
     FEED HOT
     PRODUCT V=V_COLD, L=L_COLD
     ADIABATIC TEMP(F)=100

4. Three-Phase Separator:
   Separate vapor, HC, and water
   
   FLASH UID=3PHASE
     FEED WELL
     PRODUCT V=GAS, L=OIL, W=WATER
     ADIABATIC
     METHOD SET=SRKM-VLLE

5. Quality Control:
   Flash to specific liquid rate
   
   FLASH UID=CONTROL
     FEED FEED
     PRODUCT V=V_OUT, L=L_OUT
     TPSPEC DP=10
     SPEC STREAM=L_OUT, RATE, VALUE=1000

DESIGN GUIDELINES:

1. Flash Type Selection:
   ✓ Default to ADIABATIC for most applications
   ✓ Use ISOTHERMAL for coolers/heaters
   ✓ Use DEW/BUBBLE for saturation points
   ✓ Use TPSPEC for controlled separation

2. Product Specification:
   ✓ Use V=, L= for separate products (most common)
   ✓ Use M= for mixed stream (feeding another unit)
   ✓ Add W= for three-phase systems with VLLE

3. Pressure Specification:
   ✓ Use DP=0 for simple phase separation
   ✓ Use DP>0 for pressure let-down
   ✓ Use PRESSURE for fixed outlet pressure

4. Estimates (TEST, PEST):
   ✓ Provide for difficult convergence
   ✓ Use results from similar flash as estimate
   ✓ TEST within 50°F of expected result
   ✓ PEST within 50 psi of expected result

5. VLLE Systems:
   ✓ Must specify VLLE method set
   ✓ Declare principal components if needed
   ✓ Use L for HC-rich phase, W for water-rich

COMMON MISTAKES:

❌ Forgetting UID (required identifier)
❌ Using DEWWATER/DEWHC with VLLE
❌ Specifying both TEMP and DUTY for ADIABATIC
❌ Not specifying at least T or P for flash type
❌ Using M= product with entrainment (need V=, L=)
❌ Conflicting specs (e.g., TEMP + DP with ISOTHERMAL)
❌ No thermodynamic method for VLLE systems

TROUBLESHOOTING:

Issue: "Flash did not converge"
- Provide TEST and/or PEST estimates
- Check feed phase (may already be single phase)
- Verify thermodynamic method appropriate
- Check for extreme conditions (near critical)

Issue: "Pressure drop too large"
- Check DP sign (negative increases pressure)
- Verify feed pressure high enough
- Reduce DP value

Issue: "Wrong phase split"
- Check thermodynamic method selection
- Verify K-value correlations
- Check for VLLE requirement
- Verify temperature/pressure reasonable

Issue: "Entrainment not satisfied"
- Check if enough phase available
- Use ENTOPTION=SOLVE to allow reduction
- Verify FROM/TO phases exist
- Check FRACTION/PERCENT sum ≤ 1.0

Issue: "Pseudo stream has zero flow"
- Normal for DEW (liquid) or BUBBLE (vapor)
- Can DEFINE ERATE to set non-zero flow
- Use for feeding calculators or specs

ALLOWED PRODUCTS BY FLASH TYPE:

Table 11.1-1 Summary:
  ISOTHERMAL:    V, L, M, W, S
  ADIABATIC:     V, L, M, W, S
  DEW:           V, (L pseudo), W, S
  DEWHC:         V, (L pseudo), W
  DEWWATER:      V, (L pseudo), W
  BUBBLE:        (V pseudo), L, W, S
  ISENTROPIC:    V, L, M, W, S
  UPPERDEWPOINT: V, W
  TPSPEC:        V, L, M, W, S
  FRAC:          V, L, M, W, S

⚠️ Pseudo streams: Created with label but may have zero/negligible flow

PARAMETERS FOR CROSS-REFERENCING:

Available in DEFINE, SPEC, VARY:
- TEMP = Flash temperature
- PRESSURE = Flash pressure
- DP = Pressure drop
- DUTY = Heat duty (ADIABATIC only)
- VFRAC = Vapor fraction
- LFRAC = Liquid fraction
- WFRAC = Water fraction (VLLE)

Example:
  DEFINE DP AS 5.0
  SPEC STREAM=LIQUID, TEMP(F), VALUE=150`
    },
    'ISOT': {
        description: 'Isothermal Flash - Constant temperature flash (keyword form of FLASH)',
        parameters: {
            required: ['UID', 'FEED', 'PROD', 'TEMP'],
            optional: ['NAME', 'PRES', 'DELP', 'METHOD']
        },
        example: `FLASH UID=F101, NAME=ISOTHERMAL SEPARATOR
    FEED S1
    PRODUCT M = S2
    ISOT TEMP = 55, PRES = 81`,
        notes: 'ISOT is a flash type keyword. Temperature must be specified. Use inside FLASH unit operation.'
    },
    'ADIA': {
        description: 'Adiabatic Flash - No heat transfer flash (keyword form of FLASH)',
        parameters: {
            required: ['UID', 'FEED', 'PROD'],
            optional: ['NAME', 'PRES', 'TEMP', 'DELP', 'METHOD']
        },
        example: `FLASH UID=HPIS, NAME=ADIABATIC SEPARATOR
    FEED HPCF
    PRODUCT M = HPIS
    ADIA`,
        notes: 'ADIA is the most commonly used flash type. Adiabatic (no heat duty). Use inside FLASH unit operation.'
    },
    'ISEN': {
        description: 'Isentropic Flash - Constant entropy flash (keyword form of FLASH)',
        parameters: {
            required: ['UID', 'FEED', 'PROD'],
            optional: ['NAME', 'PRES', 'DELP', 'METHOD']
        },
        example: `FLASH UID=F103, NAME=ISENTROPIC FLASH
    FEED S1
    PRODUCT M = S2
    ISEN PRES = 5`,
        notes: 'ISEN is a flash type keyword. Isentropic (constant entropy) flash. Use inside FLASH unit operation.'
    },
    'DEW': {
        description: 'Dew Point Flash - Calculates dew point conditions (keyword form of FLASH)',
        parameters: {
            required: ['UID', 'FEED', 'PROD'],
            optional: ['NAME', 'PRES', 'TEMP', 'DP', 'METHOD']
        },
        example: `FLASH UID=EFVD, NAME=VAPOUR DEWPOINT
    FEED HPCF
    PRODUCT M = HPCFW
    DEWWATER DP=0
    METHOD SET=SRK-HP`,
        notes: 'DEW/DEWWATER calculates dew point. DP parameter sets pressure drop. Use inside FLASH unit operation.'
    },
    'BUBL': {
        description: 'Bubble Point Flash - Calculates bubble point conditions (keyword form of FLASH)',
        parameters: {
            required: ['UID', 'FEED', 'PROD'],
            optional: ['NAME', 'PRES', 'TEMP', 'METHOD']
        },
        example: `FLASH UID=F105, NAME=BUBBLE POINT CALC
    FEED S1
    PRODUCT M = S2
    BUBL`,
        notes: 'BUBL calculates bubble point conditions. Use inside FLASH unit operation.'
    },
    'SPEC': {
        description: 'Specified Flash - Both temperature and pressure fully specified (keyword form of FLASH)',
        parameters: {
            required: ['UID', 'FEED', 'PROD', 'TEMP', 'PRES'],
            optional: ['NAME', 'METHOD']
        },
        example: `FLASH UID=F106, NAME=SPECIFIED FLASH
    FEED S1
    PRODUCT M = S2
    SPEC TEMP = 100, PRES = 5`,
        notes: 'SPEC requires both TEMP and PRES to be specified. Use inside FLASH unit operation.'
    },
    'COLUMN': {
        description: 'Distillation Column - Rigorous multi-stage vapor-liquid separation (PRO/II Manual §12.1)',
        types: [
            'IO Algorithm - Inside-out (fastest, handles VLE)',
            'SURE Algorithm - Handles free water on multiple trays',
            'CHEMDIST Algorithm - Non-ideal, VLLE, reactive distillation',
            'Enhanced IO - IO plus total draws and water decant',
            'RATEFRAC® - Rate-based (non-equilibrium)',
            'LLEX - Liquid-liquid extraction (no vapor)'
        ],
        parameters: {
            required: ['UID', 'PARAMETER', 'FEED', 'PRODUCT', 'PRESSURE or PSPEC'],
            optional: [
                'NAME',
                'TRAY', 'IO', 'SURE', 'CHEMDIST', 'ENHANCEDIO', 'RATEFRAC', 'LLEX', 'SEGMENTS',
                'ERRINC', 'DAMP', 'SIMSTOP', 'STOP', 'CAVE', 'KEY', 'FREEWATER',
                'CUTOFF', 'CVAR', 'BTRIAL',
                'OVHD', 'BTMS', 'LDRAW', 'VDRAW', 'WATER', 'L1DRAW', 'L2DRAW',
                'TSEPARATE', 'TNOTSEPARATE', 'SEPARATE', 'NOTSEPARATE', 'SUPERCEDE',
                'CONDENSER', 'TYPE', 'PART', 'MIXED', 'BUBB', 'TFIX', 'DTBB', 'TESTIMATE',
                'REBOILER', 'KETTLE', 'THERMOSIPHON', 'BAFFLE',
                'DUTY', 'HEAT',
                'PA', 'FROM', 'TO', 'RATE', 'TOTAL', 'LFRAC', 'TEMP', 'DT', 'PHASE',
                'PTOP', 'DPCOL', 'DPCOLUMN', 'DPTRAY',
                'ESTIMATE', 'MODEL', 'SIMPLE', 'CONVENTIONAL', 'REFINING', 'CHEM',
                'CTEMP', 'TTEMP', 'BTEMP', 'RTEMP', 'RRATIO', 'REFLUX',
                'TEMPERATURE', 'VAPOR', 'LIQUID', 'CESTIMATE',
                'SPEC', 'STREAM', 'PROPERTY', 'VALUE', 'ATOL', 'RTOL', 'WET', 'DRY',
                'VARY', 'DRAW', 'DNAME', 'PORDER',
                'TSIZE', 'TRATE', 'SECTION', 'DMIN', 'SPACING', 'BASESEG',
                'VALVE', 'SIEVE', 'CAP',
                'DIAMETER', 'PASSES', 'SFACTOR', 'FFACTOR',
                'THICKNESS', 'NUMBER', 'HOLEAREA', 'MATERIAL',
                'WEEPING', 'WEIRHEIGHT', 'WLEN',
                'PACKING', 'TYPE', 'SIZE', 'HEIGHT', 'HETP', 'FACTOR',
                'HMETHOD', 'DPMETHOD', 'FLMETHOD', 'CSMETHOD',
                'FLOOD', 'DESIGN', 'FLAPPROACH', 'CSMAX', 'CSDESIGN', 'CSAPPROACH',
                'SULZER', 'FLEX', 'INTALOX', 'KGWIREGAUZE', 'SPAREA', 'VOIDFRACTION',
                'LIQMIXING', 'VAPMIXING', 'CSURFACETENSION',
                'TEFF', 'CEFF', 'EFACTOR', 'MURPHREE', 'EQUILIBRIUM', 'VAPORIZATION',
                'QSPEC', 'QCOLUMN', 'QCOND', 'QREBO', 'QCOL', 'QTRAY',
                'TOLERANCE', 'EQUILBRIUM', 'ENTHALPY', 'COMP', 'KVALUE',
                'PRINT', 'ITER', 'PROPTABLES', 'RECOVERY', 'TEFF', 'TLOAD', 'DIAGRAM',
                'PROFILE', 'COMPOSITIONS', 'KVALUE', 'KEYL', 'KEYH', 'SUMMARY', 'TDATA',
                'RFPRINT',
                'PLOT', 'XCOMP', 'YCOMP', 'LOG', 'SFACTOR',
                'TFLOW', 'NET', 'TOTAL', 'TSFEED', 'TSLIQUID', 'TSVAPOR',
                'FZONE', 'TLDT', 'HEATEREFF', 'LBYPASSFRAC', 'VBYPASSFRAC',
                'APSEUDO', 'CONDENSER', 'REBOILER', 'PA',
                'HOMOTOPY', 'SPECIFICATION', 'INITIAL', 'ITERATIONS', 'HVARYFLAG',
                'VLLECHECK', 'CHECK', 'TRAYS', 'SET',
                'RFVLLECHECK',
                'DEFINE', 'METHOD'
            ]
        },
        example: `$ Example 1: Simple IO column with 20 trays
COLUMN      UID=C1, NAME=DISTILLATION COLUMN
  PARAMETER IO=30, TRAY=20
  FEED      FEED1, 10
  PRODUCT   OVHD(M)=DISTILLATE, 100, &
            BTMS(M)=BOTTOMS, 50
  PSPEC     PTOP(PSIA)=50, DPCOLUMN(PSI)=2.0
  CONDENSER TYPE=MIXED, PRESSURE(PSIA)=50
  DUTY      1, 1 / 2, 20
  ESTIMATE  MODEL=SIMPLE
  SPEC      STREAM=DISTILLATE, COMP=1, VALUE=0.95
  VARY      DUTY=1

$ Example 2: Column with packing and side draws
COLUMN      UID=C2, NAME=ABSORBER
  PARAMETER ENHANCEDIO=25, TRAY=15
  FEED      GAS, 15 / SOLVENT, 1, TSEPARATE
  PRODUCT   OVHD(M)=OVERHEAD, 80, &
            BTMS(M)=RICH, 25, &
            LDRAW(M)=SIDEPROD, 8, 5
  PSPEC     PTOP(BAR)=10, DPTRAY(BAR)=0.05
  PACKING   SECTION=1,5, TYPE=1, SIZE(MM)=25, HEIGHT(M)=3.0
  PACKING   SECTION=6,10, TYPE=2, SIZE(MM)=25, HEIGHT(M)=4.0
  ESTIMATE  MODEL=CONVENTIONAL

$ Example 3: Reactive distillation with CHEMDIST
COLUMN      UID=RD1, NAME=REACTIVE COLUMN
  PARAMETER CHEMDIST=40, TRAY=25
  FEED      REACTANT_A, 5 / REACTANT_B, 20
  PRODUCT   OVHD(M)=PRODUCT, 60, &
            BTMS(M)=BYPRODUCT, 45
  PSPEC     PTOP(PSIA)=14.7, DPCOLUMN(PSI)=1.5
  CONDENSER TYPE=MIXED
  DUTY      1, 1 / 2, 25
  SPEC      STREAM=PRODUCT, COMP=3, VALUE=0.98
  VARY      REFLUX(M)

$ Example 4: Column with pump-around
COLUMN      UID=C3, NAME=FRACTIONATOR
  PARAMETER IO=30, TRAY=30
  FEED      CRUDE, 15
  PRODUCT   OVHD(M)=NAPHTHA, 50, &
            LDRAW(M)=KEROSENE, 10, 20, &
            LDRAW(M)=GASOIL, 15, 25, &
            BTMS(M)=RESIDUE, 100
  PSPEC     PTOP(PSIA)=25, DPCOLUMN(PSI)=3.0
  PA        FROM=8, TO=10, RATE(M)=200, TEMP(F)=350
  DUTY      1, 1 / 2, 10 / 3, 30
  ESTIMATE  MODEL=REFINING`,
        notes: `⚠️ UID is REQUIRED (unique identifier).
📖 Reference: PRO/II Keyword Manual Section 12.1

GENERAL DESCRIPTION:
- Rigorous tray-by-tray calculations for vapor-liquid equilibrium
- Six algorithms available (IO, SURE, CHEMDIST, Enhanced IO, RATEFRAC®, LLEX)
- Handles trayed towers and packed columns
- Stage 1 = top (condenser if present), last stage = bottom (reboiler if present)
- Theoretical stages include condenser, reboiler, heaters/coolers

ALGORITHM SELECTION (Table 12.1-1):

1. IO (Inside-Out) - Default, fastest:
   Format: PARAMETER IO=iterations, TRAY=value
   
   Best for:
     ✓ Conventional distillation
     ✓ Absorbers, strippers
     ✓ VLE systems
     ✓ Hydrocarbon/water (free water on tray 1 only)
     ✓ First choice for most problems
   
   Limitations:
     ✗ Free water only at condenser (tray 1)
   
   Example:
     PARAMETER IO=30, TRAY=25

2. SURE:
   Format: PARAMETER SURE=iterations, STOP=5, CAVE=0, TRAY=value, KEY=i, FREEWATER
   
   Best for:
     ✓ Same as IO
     ✓ Free water on multiple trays (ethylene quench tower)
     ✓ Water decant from any tray
   
   Slower than IO but more robust for water systems
   
   Example:
     PARAMETER SURE=20, TRAY=30, KEY=1, FREEWATER

3. CHEMDIST:
   Format: PARAMETER CHEMDIST=iterations, DAMP=1.0, TRAY=value, ERRINC=100, &
                     CUTOFF=1.0E-8, CVAR=LOG
   
   Best for:
     ✓ Non-ideal systems (alcohols, acids, amines)
     ✓ VLLE (vapor-liquid-liquid equilibrium)
     ✓ Reactive distillation (reactions on stages)
     ✓ Extractive distillation
   
   Most rigorous but slowest convergence
   
   Example:
     PARAMETER CHEMDIST=40, TRAY=25, CVAR=ADAPTIVE

4. Enhanced IO:
   Format: PARAMETER ENHANCEDIO=iterations, TRAY=value, FREEWATER, DAMP=1.0
   
   Same as IO plus:
     ✓ Total draws (LDRAW/VDRAW with TOTAL keyword)
     ✓ Total pump-arounds
     ✓ Water decant from any tray (with FREEWATER)
   
   Example:
     PARAMETER ENHANCEDIO=30, TRAY=20, FREEWATER

5. RATEFRAC®:
   Format: PARAMETER RATEFRAC=iterations, SEGMENTS=value, DAMP=1.0
   
   Rate-based (not equilibrium):
     ✓ Departure from equilibrium important
     ✓ Mass transfer resistance
     ✓ Requires actual stages (not theoretical)
     ✓ More rigorous for non-ideal systems
   
   Example:
     PARAMETER RATEFRAC=30, SEGMENTS=25

6. LLEX (Liquid-Liquid Extraction):
   Format: PARAMETER LLEX=iterations, TRAY=value, DAMP=1.0, ERRINC=100, CUTOFF=1.0E-8
   
   For liquid-liquid extraction:
     ✓ No vapor phase
     ✓ Two immiscible liquid phases
     ✓ Extraction columns
   
   Example:
     PARAMETER LLEX=30, TRAY=15

PARAMETER STATEMENT OPTIONS:

TRAY or SEGMENTS (required):
  Number of distillation stages
  Includes condenser and reboiler if present
  Minimum: 1, No maximum
  For equilibrium models: Theoretical stages
  For RATEFRAC®: Actual stages

IO, SURE, CHEMDIST, ENHANCEDIO, RATEFRAC, LLEX (required, choose one):
  Selects algorithm
  Optional integer: Maximum iterations
  Default iterations vary by algorithm

ERRINC (default: 1.0 for IO/Enhanced IO, 100 for CHEMDIST/LLEX):
  Error increment for convergence
  Higher = more tolerant, faster but less accurate

DAMP (default: 1.0):
  Damping factor for convergence (0-1)
  Lower values = more damping = slower but more stable
  Heavy ends: Use DAMP=0.8

SIMSTOP (default: 15):
  Maximum simultaneous corrections
  Limits number of variables corrected per iteration

STOP (SURE only, default: 5):
  Convergence stopping criterion

CAVE (SURE only, default: 0):
  Convergence acceleration value

KEY (SURE only):
  Key component number for convergence

FREEWATER (SURE, Enhanced IO):
  Allows free water on any tray (not just tray 1)
  Water refluxes back to column instead of decanting at condenser

CUTOFF (CHEMDIST, LLEX, default: 1.0E-8):
  Composition cutoff for trace components

CVAR (CHEMDIST, default: LOG):
  Composition variable type
  LOG = Logarithmic (default)
  LINEAR = Linear
  ADAPTIVE = Adapts based on convergence

BTRIAL (CHEMDIST, default: 3):
  Broyden method trials before Jacobian update

FEED STATEMENT (required):

Format: FEED sid1, segno1, option / sid2, segno2, option / ..., SEPARATE or NOTSEPARATE, SUPERCEDE=ON/OFF

sid:
  Feed stream identifier

segno:
  Feed tray number (1 = top)
  Must be between 1 and TRAY

TSEPARATE / TNOTSEPARATE (per-feed option):
  TSEPARATE:
    - Flash feed to V+L
    - Liquid enters designated tray
    - Vapor enters tray above
    - Best simulates typical feed nozzle
    - All-vapor feed goes to designated tray
  
  TNOTSEPARATE:
    - Both V and L enter liquid on designated tray
    - No feed flash separation

SEPARATE / NOTSEPARATE (global option):
  Applied to all feeds not having TSEPARATE/TNOTSEPARATE
  Must appear after last "sid, segno" pair
  NOTSEPARATE is default

SUPERCEDE (default: ON):
  ON = Uses calculated product rates from last iteration
  OFF = Uses user-supplied estimates every iteration

Example:
  FEED FEED1, 10, TSEPARATE / FEED2, 15 / FEED3, 20, TNOTSEPARATE, SEPARATE

PRODUCT STATEMENT (required):

Format: PRODUCT OVHD(basis,urate)=sid,value, BTMS(basis,urate)=sid,value, &
                LDRAW(basis,urate)=sid,segno,value/..., &
                VDRAW(basis,urate)=sid,segno,value/..., &
                WATER(basis,urate)=sid,segno,value/...

OVHD (required):
  Overhead product stream
  For PARTIAL/MIXED condenser: Vapor product
  For BUBB/TFIX/DTBB condenser: Liquid product
  For two liquid phases: See CHEMDIST (§12.4)

BTMS (required):
  Bottom product stream
  
Either OVHD or BTMS value required (other can be omitted)

LDRAW:
  Liquid side draw(s)
  segno = draw tray number
  No limit on number of draws
  
VDRAW:
  Vapor side draw(s)
  segno = draw tray number

WATER (IO, SURE, Enhanced IO):
  Decanted free water
  segno = draw tray (normally 1)
  SURE/Enhanced IO with FREEWATER: Any tray

Basis options:
  M = Molar (default)
  LV = Liquid volume
  WT = Weight
  GV = Gas volume (vapor draws only)

Value:
  Estimate of product rate
  Actual rate if not on VARY statement

TOTAL (Enhanced IO only):
  Total draw (withdraws all liquid/vapor from stage)
  Format: LDRAW(M)=sid,segno,value,TOTAL

Example:
  PRODUCT OVHD(M)=DISTILLATE, 100, &
          BTMS(M)=BOTTOMS, 50, &
          LDRAW(M)=SIDE1, 10, 20 / SIDE2, 15, 15, &
          WATER(M)=H2O, 1, 5

CONDENSER STATEMENT (optional):

Format: CONDENSER TYPE=type, PRESSURE(upres)=value, TESTIMATE(utemp)=value
                   or TYPE=TFIX, TEMPERATURE(utemp)=value
                   or TYPE=DTBB, DT(utemp)=value

Omit for columns without condenser
Requires DUTY statement for tray 1

TYPE options:
  PART (Partial):
    - Not all vapor condenses
    - Vapor overhead drawn off
    - All liquid refluxes to column
  
  MIXED:
    - Like PART but allows liquid draw
    - Some liquid drawn, rest refluxes
  
  BUBB (Bubble):
    - Cools to bubble point
    - All liquid, some drawn, rest refluxes
  
  TFIX (Fixed Temperature):
    - Cools to specified temperature
    - Sub-cools below bubble point
    - Requires TEMPERATURE entry
  
  DTBB (Delta T Bubble):
    - Cools by specified degrees below bubble point
    - Requires DT entry

PRESSURE:
  Condenser (tray 1) pressure
  Equivalent to setting pressure on tray 1

TEMPERATURE (TFIX only):
  Fixed condenser temperature

DT (DTBB only):
  Degrees of sub-cooling below bubble point

TESTIMATE:
  Temperature estimate (rarely needed with ESTIMATE)

Example:
  CONDENSER TYPE=MIXED, PRESSURE(PSIA)=50, TESTIMATE(F)=120

REBOILER STATEMENT (optional):

Format: REBOILER TYPE=KETTLE or THERMOSIPHON, BAFFLE=NO or YES, &
                 RATE(basis)=value or LFRAC(basis)=value or VFRAC(basis)=value, &
                 TEMP(utemp)=value or DT(utemp)=value

Requires DUTY statement on bottom stage

TYPE:
  KETTLE (default):
    - Standard kettle reboiler
    - Once-through boiler
    - Single theoretical stage
  
  THERMOSIPHON (IO, Enhanced IO, SURE only):
    - Natural circulation reboiler
    - Modeled as multiple stages
    - Not allowed: Merged columns, side strippers
    - Can have baffle

BAFFLE (THERMOSIPHON only):
  NO = No baffle (default)
  YES = With baffle

RATE, LFRAC, VFRAC:
  Thermosiphon circulation rate
  RATE = Actual rate (M, WT, or LV basis)
  LFRAC = Fraction of bottoms liquid
  VFRAC = Fraction of bottoms vapor

TEMP, DT:
  Thermosiphon temperature spec

Example:
  REBOILER TYPE=THERMOSIPHON, BAFFLE=YES, LFRAC(M)=1.5

DUTY STATEMENT (optional but usually needed):

Format: DUTY idno, segno, value, name / ...

Specifies heater/cooler duties
Unlimited number allowed

idno:
  Duty ID number (integer)
  All numbers from 1 to nd must be used
  Can reference in SPEC, VARY, DEFINE

segno:
  Stage number
  Condenser: 1
  Reboiler: n (last tray)
  Pump-around: Return tray

value:
  Duty in millions of energy/time
  Negative = cooling
  Constant unless on VARY or PA statement

name (optional):
  12-character heater/cooler name

Example:
  DUTY 1, 1 / 2, 10, 6.0, SIDHTR / 3, 30

PUMP-AROUND STATEMENT (optional):

Format: PA FROM=tno1, TO=tno2, PRESSURE(upres)=value, PHASE=L or V, &
           RATE(basis)=value or TOTAL or LFRAC(basis)=value, &
           TEMP(utemp)=value or DT(utemp)=value

Pump-around: Withdraws liquid/vapor, cools/heats, returns to column

FROM:
  Draw tray number

TO:
  Return tray number (must be below FROM)

PRESSURE:
  Pump-around pressure

PHASE (default: L):
  L = Liquid
  V = Vapor

RATE:
  Pump-around rate
  
TOTAL (SURE, Enhanced IO, RATEFRAC®):
  Total draw (all liquid/vapor from tray)

LFRAC:
  Fraction of liquid on draw tray

TEMP:
  Return temperature

DT:
  Temperature change

Pump-around requires DUTY on return tray

Example:
  PA FROM=8, TO=10, RATE(M)=200, TEMP(F)=350
  DUTY 2, 10

PRESSURE SPECIFICATION (required):

Two methods:

1. PRESSURE statement:
   Format: PRESSURE(upres) segno, value / ...
   
   Specify pressure for each stage
   Must specify all stages
   
   Example:
     PRESSURE(PSIA) 1, 50 / 2, 51 / 3, 52 / ... / 25, 73

2. PSPEC statement (recommended):
   Format: PSPEC PTOP(upres)=value, DPCOLUMN(upres)=value or DPTRAY(upres)=value
   
   PTOP:
     Top stage (tray 1) pressure
   
   DPCOLUMN:
     Total pressure drop across column
     Distributed uniformly
   
   DPTRAY:
     Pressure drop per tray
     Constant across all stages
   
   Example:
     PSPEC PTOP(BAR)=10, DPCOLUMN(BAR)=1.5
     or
     PSPEC PTOP(PSIA)=100, DPTRAY(PSI)=0.5

ESTIMATE STATEMENT (highly recommended):

Format: ESTIMATE MODEL=type, CTEMP(utemp)=value, TTEMP(utemp)=value, &
                 BTEMP(utemp)=value, RTEMP(utemp)=value, RRATIO=value, REFLUX=value

Generates initial estimates for convergence

MODEL:
  SIMPLE:
    - Quick estimate
    - Linear temperature profile
    - Good for most problems
  
  CONVENTIONAL:
    - More detailed
    - Better for difficult separations
  
  REFINING:
    - For petroleum fractionators
    - Handles wide-boiling mixtures
  
  CHEM:
    - For chemical systems
    - Non-ideal mixtures

CTEMP, TTEMP, BTEMP, RTEMP:
  Condenser, top tray, bottom tray, reboiler temperatures
  Optional hints for estimate generator

RRATIO:
  Reflux ratio estimate
  Default: 3.0 (varies by algorithm)

REFLUX:
  Reflux rate estimate

Example:
  ESTIMATE MODEL=SIMPLE, CTEMP(F)=120, BTEMP(F)=350

USER-SUPPLIED ESTIMATES (optional):

TEMPERATURE statement:
  Format: TEMPERATURE(utemp) segno, value / ...
  
  Stage-by-stage temperature estimates
  
  Example:
    TEMPERATURE(F) 1, 120 / 2, 125 / 3, 130 / ...

VAPOR statement:
  Format: VAPOR(basis) segno, value / ...
  
  Stage vapor flow estimates
  
  Example:
    VAPOR(M) 1, 100 / 2, 105 / 3, 110 / ...

LIQUID statement:
  Format: LIQUID(basis) segno, value / ...
  
  Stage liquid flow estimates
  
  Example:
    LIQUID(M) 1, 150 / 2, 155 / 3, 160 / ...

CESTIMATE statement:
  Format: CESTIMATE(phase) segno, x1, x2, ... / ...
  
  Stage composition estimates (mole fractions)
  
  Example:
    CESTIMATE(L) 1, 0.9, 0.08, 0.02 / 2, 0.85, 0.12, 0.03 / ...

SPECIFICATION STATEMENT (usually required):

Format: SPEC STREAM=sid, property, PHASE=T or L or V, WET or DRY, &
             operator, reference, property2, VALUE=value, ATOL=value or RTOL=value

Specifies product purity or internal conditions

Product stream property:
  SPEC STREAM=DISTILLATE, COMP=1, VALUE=0.95
  
Internal tray property:
  SPEC COMP=2, TRAY=10, VALUE=0.25
  
Duty:
  SPEC DUTY(1), VALUE=5.5
  
Reflux/Reflux ratio:
  SPEC REFLUX(M), VALUE=100
  SPEC RRATIO(M), VALUE=2.5

Common properties:
  COMP=i - Component mole fraction
  RATE - Stream rate
  TEMP - Temperature
  PRES - Pressure
  CUTPOINT - TBP cutpoint (IO only)

PHASE:
  T = Total (default)
  L = Liquid
  V = Vapor

WET/DRY:
  WET = Includes free water
  DRY = Excludes free water

Operators:
  DIVIDE, MULTIPLY, PLUS, MINUS
  
ATOL (absolute tolerance):
  Convergence tolerance (absolute)
  
RTOL (relative tolerance):
  Convergence tolerance (relative)

Example:
  SPEC STREAM=DISTILLATE, COMP=1, VALUE=0.95, RTOL=0.001

VARY STATEMENT (one per SPEC):

Format: VARY DUTY=idno,... or DRAW=sid,... or DNAME=name,... or FEED=sid,...

Specifies what to adjust to meet spec

DUTY:
  Vary heater/cooler duty
  
DRAW:
  Vary draw rate
  
DNAME:
  Vary duty by name
  
FEED:
  Vary feed rate

Example:
  SPEC STREAM=DISTILLATE, COMP=1, VALUE=0.95
  VARY DUTY=1

PACKING STATEMENT (optional):

Random Packing:
  Format: PACKING SECTION=segno1,segno2, TYPE=itype, SIZE(uflen)=value, &
                  HEIGHT(uleng)=value or HETP(uleng)=value, FACTOR=value

Structured Packing:
  Format: PACKING SECTION=segno1,segno2, SULZER=itype or FLEX=itype or INTALOX=itype, &
                  HEIGHT(uleng)=value, DIAMETER(uflen)=value

SECTION:
  Start and end tray numbers for packed section

TYPE:
  Random packing type (1-18)
  Common types: Raschig rings, Pall rings, Intalox saddles

SIZE:
  Nominal packing size

HEIGHT:
  Packed height

HETP (Height Equivalent to Theoretical Plate):
  Alternative to HEIGHT
  Packing performance measure

SULZER, FLEX, INTALOX:
  Structured packing types

Example:
  PACKING SECTION=5,15, TYPE=1, SIZE(MM)=25, HEIGHT(M)=5.0

TRAY SIZING/RATING (optional):

TSIZE (sizing):
  Format: TSIZE SECTION=segno1,segno2, VALVE or SIEVE or CAP, &
                DMIN(inch)=15, SPACING(TRAY,inch)=24, BASESEG=segno

TRATE (rating):
  Format: TRATE SECTION=segno1,segno2, VALVE or SIEVE or CAP, &
                DIAMETER(TRAY,uflen)=value, SPACING(TRAY,inch)=24

Tray types:
  VALVE - Valve trays
  SIEVE - Sieve trays  
  CAP - Cap trays (bubble cap)

DMIN:
  Minimum diameter (sizing)

DIAMETER:
  Fixed diameter (rating)

SPACING:
  Tray spacing

Common parameters:
  PASSES - Number of passes (default: 1)
  SFACTOR - Safety factor (default: 1.0)
  FFACTOR - Flooding factor % (default: 100%)
  HOLEAREA - Hole area % (default: 12%)
  WEEPING - Weeping calculation (ON/OFF)
  WEIRHEIGHT - Weir height
  WLEN - Weir length

Example:
  TSIZE SECTION=1,20, SIEVE, DMIN(FT)=3, SPACING(TRAY,IN)=24

TRAY EFFICIENCIES (optional):

TEFF statement (all components):
  Format: TEFF type segno, value / ...
  
CEFF statement (per component):
  Format: CEFF type segno, i, value / ...

Types:
  MURPHREE - Murphree efficiency (default)
  EQUILIBRIUM - Equilibrium stage (100%)
  VAPORIZATION - Vaporization efficiency

Example:
  TEFF MURPHREE 1, 1.0 / 2, 0.85 / 3, 0.85 / ... / 20, 0.80

PRINT OPTIONS (optional):

Format: PRINT ITER=level, PROPTABLES=level, RECOVERY, TEFF, TLOAD, DIAGRAM, &
              PROFILE=level, COMPOSITIONS=M and/or WT, KVALUE, &
              KEYL=i,j, KEYH=k,l, SUMMARY=WT or GV or LV, TDATA

ITER:
  NONE - No iteration printout
  PARTIAL - Print final iteration
  ESTIMATE - Print estimate + final
  ALL - Print all iterations

PROPTABLES:
  BRIEF - Summary only
  PART - Partial property tables
  ALL - All property tables

PROFILE:
  NONE - No profile
  ESTIMATE - Initial estimate
  ALL - All iterations
  FINAL - Final only (default)

RECOVERY:
  Component recovery table

TEFF:
  Tray efficiency table

TLOAD:
  Tray loading data

DIAGRAM:
  McCabe-Thiele diagram

COMPOSITIONS:
  M = Molar (default)
  WT = Weight

KVALUE:
  K-value profiles

KEYL, KEYH:
  Light and heavy key components

Example:
  PRINT ITER=PARTIAL, PROPTABLES=PART, RECOVERY, PROFILE=FINAL

TOLERANCE OPTIONS (optional):

Format: TOLERANCE EQUILIBRIUM=0.0001, ENTHALPY=0.0001, COMP=0.0001, KVALUE=0.0001

Sets convergence tolerances

EQUILIBRIUM:
  Phase equilibrium tolerance
  
ENTHALPY:
  Energy balance tolerance
  
COMP:
  Component balance tolerance
  
KVALUE:
  K-value tolerance (IO, RATEFRAC®)

Example:
  TOLERANCE EQUILIBRIUM=0.0001, ENTHALPY=0.0001, COMP=0.0001

DESIGN GUIDELINES:

1. Algorithm Selection:
   - Start with IO for most problems
   - Use SURE for multiple water trays
   - Use CHEMDIST for non-ideal, VLLE, reactive
   - Use Enhanced IO for total draws
   - Use RATEFRAC® when mass transfer matters

2. Initial Estimates:
   - Always use ESTIMATE MODEL=SIMPLE minimum
   - Provide TEMPERATURE, VAPOR, LIQUID if available
   - Good estimates = faster convergence

3. Specifications:
   - Common: Product purity (COMP fraction)
   - At least (number of products - 1) specs needed
   - Match SPEC count with VARY count

4. Pressure Profile:
   - Use PSPEC for simple linear drop
   - Use PRESSURE for complex profiles

5. Convergence:
   - Increase iterations if near convergence
   - Reduce DAMP for difficult cases
   - Check PRINT ITER=ALL for diagnosis

6. Packing vs Trays:
   - Trays: Discrete stages, easier convergence
   - Packing: Continuous contact, use HETP

7. Thermodynamics:
   - Select appropriate method in THERMODYNAMIC DATA
   - VLE critical for column performance
   - Check K-values are reasonable

TYPICAL APPLICATIONS:
  - Crude distillation
  - Aromatics separation
  - Alcohol purification
  - Gas processing (absorbers, strippers)
  - Extractive distillation
  - Azeotropic distillation
  - Reactive distillation`
    },
    'HEATX': {
        description: 'Heat Exchanger - Transfers heat between hot and cold streams (use HX keyword in practice)',
        types: [
            'Simple - Basic heat transfer with LMTD',
            'Detailed (TEMA) - Full shell & tube design with geometry',
            'Air Cooler - Air-cooled heat exchanger',
            'Fired Heater - Furnace or heater with combustion',
            'Plate - Plate heat exchanger',
            'Double Pipe - Double pipe configuration',
            'HXRIG - Rigorous rating with detailed geometry'
        ],
        parameters: {
            required: ['UID', 'NAME'],
            optional: [
                'HOT FEED', 'COLD FEED', 'CONFIGURE', 'DEFINE',
                'METHOD', 'DUTY', 'TOUT',
                'LMTD', 'ZMTD', 'AREA', 'UVALUE', 'U', 'UA',
                'DELP', 'HDP', 'CDP',
                'CTEMP', 'CLFRAC', 'CDTBB', 'CDTAD',
                'HTEMP', 'HLFRAC', 'HDTBB', 'HDTAD',
                'FT', 'HOCI', 'HICO', 'HOCO', 'TMIN', 'MITA', 'TOLER',
                'CIPRESSURE', 'COPRESSURE', 'HIPRESSURE', 'HOPRESSURE',
                'COCI', 'HIHO',
                'TYPE', 'GEOM', 'TUBES', 'PASSES',
                'FOULING', 'HFOUL', 'CFOUL',
                '$ HXRIG type parameters:',
                'UEST', 'STEMP', 'TTEMP', 'TFOUL', 'SFOUL'
            ]
        },
        example: `$ Note: Use HX keyword in practice, not HEATX
HX          UID=DOCO, NAME=DRIER OVHD TRIM COOLER E1306
  HOT       FEED=DOAO, M=DOCO
  COLD      FEED=CWI06, L=CWO06
  CONFIGURE U=291.54E-3, AREA=831.72
  DEFINE    HDP AS STRM=LEAK PRES TIMES 0.04
  METHOD    SET=SRK-LP`,
        notes: `⚠️ UID is REQUIRED (unique identifier).
⚠️ Use HX keyword in PRO/II files, not HEATX.

Stream specifications:
  HOT FEED = inlet_stream, outlet_stream
  COLD FEED = inlet_stream, outlet_stream
  Format: inlet, M/V/L = outlet
    M = mixed phase product
    V = vapor product
    L = liquid product

CONFIGURE specifications:
  U = overall heat transfer coefficient (kW/m²-K or BTU/hr-ft²-F)
  AREA = heat transfer area (m² or ft²)
  UA = combined U×Area value

📋 PARAMETERS AVAILABLE FOR CROSS-REFERENCING (Table 10.3-3C):
Use these in DEFINE, SPEC, VARY statements:

THERMAL PARAMETERS:
  DUTY = heat duty (energy/time)
  LMTD = log mean temperature difference
  ZMTD = true mean temperature difference (for cross-flow)
  U = overall heat transfer coefficient
  AREA = heat transfer area
  UA = combined U×Area value
  FT = LMTD correction factor

COLD SIDE PARAMETERS:
  CDP = cold side pressure drop
  CTEMP = cold side outlet temperature
  CLFRAC = cold side outlet liquid fraction
  CDTBB = cold side bubble point approach temperature
  CDTAD = cold side dew point approach temperature
  CIPRESSURE = cold side inlet pressure
  COPRESSURE = cold side outlet pressure
  COCI = cold side inlet-outlet parameter

HOT SIDE PARAMETERS:
  HDP = hot side pressure drop
  HTEMP = hot side outlet temperature
  HLFRAC = hot side outlet liquid fraction
  HDTBB = hot side bubble point approach temperature
  HDTAD = hot side dew point approach temperature
  HIPRESSURE = hot side inlet pressure
  HOPRESSURE = hot side outlet pressure
  HOCI = hot side inlet-outlet parameter
  HICO = hot side inlet-cold outlet parameter
  HOCO = hot side outlet-cold outlet parameter
  HIHO = hot side inlet-hot outlet parameter

TEMPERATURE APPROACH PARAMETERS:
  TMIN = minimum approach temperature
  MITA = minimum internal temperature approach
  TOLER = temperature tolerance

🔧 HXRIG TYPE SPECIFIC PARAMETERS:
For rigorous shell & tube rating calculations:
  U = overall heat transfer coefficient
  UEST = estimated U (if not calculated)
  AREA = heat transfer area
  UA = combined U×Area value
  DUTY = heat duty
  LMTD = log mean temperature difference
  STEMP = shell side outlet temperature
  TTEMP = tube side outlet temperature
  TFOUL = tube side fouling resistance
  SFOUL = shell side fouling resistance

USAGE EXAMPLES:
  DEFINE HDP AS STRM=FEED PRES TIMES 0.05
  SPEC DUTY = 5000
  VARY AREA TO MEET TMIN = 10
  DEFINE CTEMP AS 100
  SPEC MITA = 5

METHOD SET allows override of thermodynamic method.

Thermal specification (specify ONE):
  - CONFIGURE U=..., AREA=... (rating calculation)
  - DUTY = heat duty
  - Outlet temperatures via DEFINE`
    },
    'HX': {
        description: 'Simple Heat Exchanger - Heats/cools streams or exchanges heat between streams (PRO/II Manual §13.1)',
        types: [
            'One-Sided - Process stream with infinite heat source/sink',
            'Two-Sided - Heat exchange between two process streams',
            'Utility - Process stream with water, air, steam, or refrigerant',
            'Attached Condenser - Attached to column condenser',
            'Attached Reboiler - Attached to column reboiler',
            'Attached Pumparound - Attached to column pumparound',
            'Attached Side - Attached to column side heater/cooler'
        ],
        parameters: {
            required: ['UID'],
            optional: [
                'NAME', 'ZONES', 'OUTPUT', 'CALC', 'PLOT',
                'HOT', 'COLD', 'FEED', 'V', 'L', 'M', 'W', 'S', 'DP', 'METHOD', 'HCAL',
                'UTILITY', 'WATER', 'AIR', 'STEAM', 'HEATINGMEDIUM', 'REFRIGERANT',
                'TIN', 'TEMP', 'TSAT', 'PSAT',
                'ATTACH', 'COLUMN', 'TYPE', 'CONDENSER', 'COND', 'REBOILER', 'REB',
                'PA', 'SIDE', 'TRAY', 'FTRAY', 'PHASE', 'RATE',
                'CONFIG', 'CONFIGURATION', 'COUNTERCURRENT', 'COUNTER', 'COCURRENT',
                'TPASS', 'SPASS', 'FT', 'UAMAX', 'U', 'AREA', 'XOPTION', 'STOP',
                'OPERATION', 'DUTY', 'HOCI', 'HICO', 'HOCO', 'TMIN', 'MITA',
                'HTEMP', 'CTEMP', 'HLFRAC', 'CLFRAC',
                'HDTBB', 'CDTBB', 'HDTAD', 'CDTAD', 'COCI', 'HIHO',
                'UA', 'TOLERANCE', 'TOL',
                'DEFINE', 'AS', 'HDP', 'CDP',
                'SET', 'PRINT', 'EXTE', 'EXTENDED'
            ]
        },
        example: `$ Example 1: Process heater with steam utility
HX          UID=HE01, NAME=PROCESS HEATER
  COLD      FEED=FEED1, FEED2, V=VAP, L=LIQ, DP(PSI)=20
  OPERATION CTEMP(C)=200
  UTILITY   STEAM, TSAT(C)=300

$ Example 2: Two-stream exchanger with approach spec
HX          UID=HX02, NAME=FEED EFFLUENT HX
  HOT       FEED=EFFLUENT, M=HOT_OUT, DP(ATM)=0.5
  COLD      FEED=FEED, M=COLD_OUT, DP(PSI)=10
  OPERATION HOCI(F)=20
  CONFIG    U=150

$ Example 3: UA specification with shell/tube config
HX          UID=H3, NAME=COOLER
  HOT       FEED=STREAM1, STREAM2, L=LIQ_OUT, V=VAP_OUT, DP=8
  COLD      FEED=COOLANT, L=WARM_COOL, DP=15
  CONFIG    U(BTU/HR-FT2-F)=125, AREA(FT2)=1850, &
            TPASS=4, SPASS=2

$ Example 4: Duty spec with DEFINE statements
HX          UID=HX4, NAME=PROCESS COOLER, ZONES(OUTPUT)=7
  HOT       FEED=HOT, M=COOLED
  COLD      FEED=COLD, M=HEATED, DP=6
  DEFINE    DUTY AS COLUMN=T101, DUTY(2), ADD, COLUMN=T101, DUTY(3)
  DEFINE    HDP(PSI) AS HX=E2, CDP, ADD, 5
  DEFINE    AREA AS HX=E2, AREA

$ Example 5: Attached condenser with utility
HX          UID=COND, NAME=COLUMN CONDENSER
  ATTACH    COLUMN=C01, TYPE=COND
  UTILITY   WATER, TIN=75, TEMP=100`,
        notes: `⚠️ UID is REQUIRED (unique identifier).
📖 Reference: PRO/II Keyword Manual Section 13.1

GENERAL DESCRIPTION:
- Heats or cools single process stream
- Exchanges heat between two process streams
- Exchanges heat with utility streams (water, air, steam)
- Can attach to distillation column trays
- Calculates product temperatures and phase separation
- Reports UA value and required heat transfer area
- Supports zone analysis for temperature profiles

KEY CAPABILITIES:
✓ One-sided (infinite heat source/sink)
✓ Two-sided (process-to-process heat exchange)
✓ Utility calculations (water, air, steam, refrigerant)
✓ Column attachment (condenser, reboiler, pumparound, side)
✓ Counter-current or co-current flow
✓ Shell and tube configurations (N:2N passes)
✓ Zone analysis (temperature crossover detection)
✓ Multiple specifications (duty, approach, UA, etc.)
✓ VLLE support (three-phase)

HOT/COLD STATEMENT (required):
Format: HOT FEED=sid,{sid,...}, V=sid or L=sid or M=sid, {W=sid,S=sid}, {DP=0.0}, {METHOD SET=setid}
    or: COLD FEED=sid,{sid,...}, V=sid or L=sid or M=sid, {W=sid,S=sid}, {DP=0.0}, {METHOD SET=setid}

HOT: Streams losing energy (cooling)
COLD: Streams gaining energy (heating)

Product phase:
  V = Vapor only
  L = Liquid only
  M = Mixed (vapor + liquid)
  W = Water phase (VLLE systems)
  S = Solids product

DP: Pressure drop through side (default: 0.0)
METHOD: Thermodynamic method for this side

Example:
  HOT FEED=EFFLUENT, M=COOLED, DP(PSI)=5
  COLD FEED=FEED1, FEED2, L=HEATED, DP(PSI)=10

UTILITY STATEMENT (optional):
Replaces HOT or COLD statement

Format: UTILITY WATER, TIN(utemp)=value, TEMP(utemp)=value
    or: UTILITY AIR, TIN(utemp)=value, TEMP(utemp)=value
    or: UTILITY STEAM, TSAT(utemp)=value or PSAT(upres)=value
    or: UTILITY HEATINGMEDIUM=component, TSAT(utemp)=value or PSAT(upres)=value
    or: UTILITY REFRIGERANT=component, TSAT(utemp)=value or PSAT(upres)=value

WATER/AIR:
  Cold side only, sensible heat
  Requires TIN and TEMP
  Example: UTILITY WATER, TIN(F)=75, TEMP(F)=100

STEAM:
  Hot side only, latent heat (condensing)
  Requires TSAT or PSAT
  Example: UTILITY STEAM, TSAT(C)=300

HEATINGMEDIUM:
  Hot side only, latent heat (condensing)
  Requires component and TSAT or PSAT
  Example: UTILITY HEATINGMEDIUM=DOWTHERM, TSAT(F)=500

REFRIGERANT:
  Cold side only, latent heat (vaporizing)
  Requires component and TSAT or PSAT
  Example: UTILITY REFRIGERANT=PROPANE, PSAT(PSIA)=50

ATTACH STATEMENT (optional):
Links exchanger to column tray

Format: ATTACH COLUMN=uid, TYPE=CONDENSER or REBOILER
    or: ATTACH COLUMN=uid, TYPE=PA, TRAY=tno
    or: ATTACH COLUMN=uid, TYPE=SIDE, TRAY=tno, FTRAY=tno, PHASE=V or L, {RATE=value}

TYPE=CONDENSER or COND: Column condenser
TYPE=REBOILER or REB: Column reboiler
TYPE=PA: Pumparound heater-cooler (requires TRAY)
TYPE=SIDE: Side heater-cooler (requires TRAY, FTRAY, PHASE)

Example:
  ATTACH COLUMN=C01, TYPE=COND
  ATTACH COLUMN=T201, TYPE=SIDE, TRAY=20, FTRAY=20, PHASE=L

⚠️ Column must declare heater-cooler on attached tray

CONFIGURATION STATEMENT (optional):
Applies to two-sided exchangers

Format: CONFIG COUNTERCURRENT or COCURRENT, {TPASS=2,SPASS=1 or FT=value}, &
              {UAMAX=value}, {U=value,AREA=value}, {XOPTION=STOP}

COUNTERCURRENT (default): Counter-current flow, better efficiency
COCURRENT: Co-current flow, same direction

TPASS/SPASS: Tube and shell passes
  Default ratio: 1 shell : 2 tube passes (N:2N)
  PRO/II resets if ratio incorrect (warning issued)

FT: LMTD correction factor (manual override)

UAMAX: Upper limit on heat transfer

U + AREA: Defines "UA" performance specification
  ⚠️ Do not use OPERATION statement with UA spec
  
  Example:
    CONFIG U(BTU/HR-FT2-F)=125, AREA(FT2)=1850
    CONFIG TPASS=4, SPASS=2

XOPTION=STOP: Stop if temperature crossover detected

OPERATION STATEMENT (optional):
Specifies performance parameter

Format: OPERATION <spec>=value, {TOLERANCE=0.001}

⚠️ Exactly one spec required (unless using U+AREA on CONFIG)

SPECIFICATIONS FOR ALL EXCHANGERS:

DUTY(uduty): Heat duty (millions energy/time)
  Positive=heating, Negative=cooling
  Example: OPERATION DUTY(MMBTU/HR)=5.0

HTEMP(utemp): Hot outlet temperature
  Example: OPERATION HTEMP(F)=150

CTEMP(utemp): Cold outlet temperature
  Example: OPERATION CTEMP(F)=200

HLFRAC: Hot side liquid fraction (0.0-1.0)
  1.0=bubble point, 0.0=dew point
  Example: OPERATION HLFRAC=1.0

CLFRAC: Cold side liquid fraction (0.0-1.0)
  Example: OPERATION CLFRAC=0.0

HDTBB/CDTBB: Subcooling below bubble point
  Example: OPERATION HDTBB(F)=10

HDTAD/CDTAD: Superheating above dew point
  Example: OPERATION CDTAD(F)=50

COCI: Cold temperature rise
  Example: OPERATION COCI(F)=100

HIHO: Hot temperature drop
  Example: OPERATION HIHO(C)=75

SPECIFICATIONS FOR TWO-SIDED ONLY:

HOCI: Hot outlet - cold inlet approach
  Example: OPERATION HOCI(F)=20

HICO: Hot inlet - cold outlet approach
  Example: OPERATION HICO(F)=30

HOCO: Hot outlet - cold outlet difference
  Example: OPERATION HOCO(F)=15

TMIN: Minimum approach (min of HOCI or HICO)
  Example: OPERATION TMIN(F)=10

MITA: Minimum internal temperature approach
  Performs zone analysis at calculation time
  Most rigorous approach specification
  Example: OPERATION MITA(F)=15

UA: Overall heat transfer coefficient × area
  Alternative to U+AREA on CONFIG
  Example: OPERATION UA(BTU/HR-FT2-F,FT2)=231250

ZONE ANALYSIS (optional):
Format: HX UID=uid, ZONES, or ZONES=n, or ZONES(OUTPUT), or ZONES(CALC), or ZONES(PLOT)

Computes duty-weighted LMTD
Divides exchanger into ≥5 equal-duty zones
Detects temperature crossovers

ZONES or ZONES=n: Specify number of zones (≥5)
OUTPUT: Zone analysis during output only (default)
CALC: Zone analysis during solution (required for MITA)
PLOT: Requests zone analysis plot

Example:
  HX UID=HX1, ZONES(OUTPUT)=7
  HX UID=HX2, ZONES(CALC), PLOT

DEFINE STATEMENT (optional):
Relates parameters to streams or units

Format: DEFINE <param> AS <unit type>=uid, <param>, {<op>, <ref>}
    or: DEFINE <param> AS STREAM=sid, <prop>, {<op>, <ref>}

Available parameters:
  All OPERATION specs, HDP, CDP, FT, U, AREA

Operators: PLUS, ADD, MINUS, TIMES, MULTIPLY, DIVIDEBY, DIVIDE

Multiple DEFINE statements allowed

Example:
  DEFINE DUTY AS COLUMN=T101, DUTY(2), ADD, COLUMN=T101, DUTY(3)
  DEFINE HDP(PSI) AS HX=E2, CDP, ADD, 5
  DEFINE CTEMP(F) AS 200

METHOD STATEMENT (optional):
Format: METHOD SET=setid

Selects thermodynamic method for both sides
⚠️ Method on HOT/COLD statements overrides METHOD

Example:
  METHOD SET=SRK-HP

TYPICAL APPLICATIONS:

1. Process Heater (one-sided):
   HX UID=HEATER
     COLD FEED=FEED, M=HEATED
     OPERATION CTEMP(F)=200

2. Feed-Effluent Exchanger:
   HX UID=FEX
     HOT FEED=EFFLUENT, M=COOL_EFF
     COLD FEED=FEED, M=WARM_FEED
     OPERATION HOCI(F)=20
     CONFIG U=150

3. Cooling Water Exchanger:
   HX UID=CW_COOLER
     HOT FEED=PROCESS, M=COOLED, DP(PSI)=3
     OPERATION HTEMP(F)=120
     UTILITY WATER, TIN=75, TEMP=100

4. Steam Heater:
   HX UID=STEAM_HTR
     COLD FEED=COLD, M=HOT
     OPERATION CTEMP(F)=300
     UTILITY STEAM, TSAT(F)=350

5. Column Condenser:
   HX UID=COND
     ATTACH COLUMN=C01, TYPE=COND
     UTILITY WATER, TIN=80, TEMP=110

6. UA Rating:
   HX UID=RATING
     HOT FEED=HOT, M=H_OUT
     COLD FEED=COLD, M=C_OUT
     CONFIG U=125, AREA=1850, TPASS=4, SPASS=2

DESIGN GUIDELINES:

1. Specification Selection:
   ✓ DUTY for known heat load
   ✓ HOCI/HICO for approach temperature
   ✓ TMIN for simple minimum approach
   ✓ MITA for rigorous approach (zone analysis)
   ✓ HTEMP/CTEMP for outlet temperatures
   ✓ UA (U+AREA) for rating calculations

2. Flow Configuration:
   ✓ Default COUNTERCURRENT for best efficiency
   ✓ Shell:tube passes ratio = 1:2 (N:2N)
   ✓ More passes = better approach but more ΔP

3. Utility Selection:
   ✓ WATER/AIR for sensible heat cooling
   ✓ STEAM for latent heat heating
   ✓ HEATINGMEDIUM for thermal oil
   ✓ REFRIGERANT for refrigeration

4. Zone Analysis:
   ✓ OUTPUT mode: During output only (faster)
   ✓ CALC mode: During solution (required for MITA)
   ✓ Minimum 5 zones (auto-generates more if needed)

5. Column Attachment:
   ✓ Column should calculate duty (preferred)
   ✓ Declare heater-cooler on column tray
   ✓ TYPE=COND for condensers
   ✓ TYPE=REB for reboilers
   ✓ TYPE=PA for pumparounds
   ✓ TYPE=SIDE for side heaters/coolers

COMMON MISTAKES:

❌ Using OPERATION with U+AREA on CONFIG
❌ Forgetting FEED keyword on HOT/COLD
❌ Not specifying product phase (V, L, or M)
❌ Using TIN/TEMP with STEAM (use TSAT/PSAT)
❌ Using TSAT/PSAT with WATER/AIR (use TIN/TEMP)
❌ TPASS not equal to 2×SPASS
❌ Specifying UAMAX with UA specification

TROUBLESHOOTING:

Issue: "Temperature crossover detected"
- Increase flow rate on one side
- Reduce U or AREA
- Change specification (reduce duty or approach)
- Use XOPTION=STOP to prevent convergence

Issue: "Specification not met"
- Increase TOLERANCE value
- Check if specification physically achievable
- Verify thermodynamic method appropriate

Issue: "Negative approach temperature"
- Specification too tight
- Insufficient heat transfer area
- Check flow configuration (counter vs co-current)
- Verify streams assigned to correct sides

Issue: "Attached exchanger not converging"
- Let column calculate duty (remove HX OPERATION)
- Declare heater-cooler on column tray
- Check column convergence first

Issue: "Utility calculation unrealistic"
- Check TIN and TEMP reasonable
- Verify TSAT/PSAT for saturation
- Check component declared in COMPONENT DATA
- Verify latent heat data available

PARAMETERS FOR CROSS-REFERENCING:

Available in DEFINE, SPEC, VARY:
- DUTY = Heat duty
- HTEMP = Hot outlet temperature
- CTEMP = Cold outlet temperature
- HOCI = Hot outlet - cold inlet approach
- HICO = Hot inlet - cold outlet approach
- HOCO = Hot outlet - cold outlet difference
- TMIN = Minimum approach
- UA = Overall heat transfer coefficient × area
- U = Overall heat transfer coefficient
- AREA = Heat transfer area
- FT = LMTD correction factor
- HDP = Hot side pressure drop
- CDP = Cold side pressure drop
- LMTD = Log mean temperature difference
- MTD = Mean temperature difference (from zones)

Example:
  DEFINE DUTY AS HX=E1, DUTY, PLUS, HX=E2, DUTY
  DEFINE HOCI(F) AS 20.0`
    },
    'PUMP': {
        description: 'Pump - Increases liquid stream pressure through mechanical work (PRO/II Manual §11.2)',
        types: [
            'Centrifugal - Most common type for liquids',
            'Positive Displacement - For high pressure/viscous fluids',
            'Specified Efficiency - User-defined pump efficiency',
            'Specified Head - Discharge head specification',
            'Specified Pressure - Outlet pressure or pressure rise',
            'Cross-Referenced - Pressure calculated from other units'
        ],
        parameters: {
            required: ['UID', 'FEED', 'PRODUCT'],
            optional: [
                'NAME', 'PRODUCT', 'L', 'M',
                'OPERATION', 'OPER',
                'PRES', 'PRESSURE', 'POUT', 'DP', 'DELP', 'PRATIO',
                'HEAD', 'EFF', 'MEFF',
                'WORK', 'DUTY',
                'DEFINE', 'SPEC', 'VARY',
                'METHOD'
            ]
        },
        example: `$ Basic pump with efficiency and outlet pressure
PUMP        UID=P101, NAME=FEED PUMP
  FEED      BOTTOMS
  PRODUCT   L=PUMPED
  OPERATION EFF=75, PRES=25

$ Pump with pressure drop specification
PUMP        UID=HISPO, NAME=INTERSTAGE STRIPPER BTMS PUMP
  FEED      ISBTIN
  PROD      L=ISBTP
  OPER      EFF=70, DP=15

$ Pump with calculated pressure from other unit
PUMP        UID=P102, NAME=REACTOR FEED PUMP
  FEED      PREHEATED
  PRODUCT   L=TOREACTOR
  OPERATION EFF=78
  DEFINE    PRES AS UNIT=R101 PRESSURE PLUS 5

$ Pump with mechanical efficiency
PUMP        UID=P103, NAME=HIGH PRESSURE PUMP
  FEED      LIQUID
  PRODUCT   L=DISCHARGED
  OPERATION EFF=82, MEFF=95, PRES=150`,
        notes: `⚠️ UID is REQUIRED (unique identifier).
📖 Reference: PRO/II Keyword Manual Section 11.2

GENERAL DESCRIPTION:
- Pumps increase liquid pressure through mechanical work
- Adds shaft work to overcome pressure difference
- Can handle pure liquids or liquid mixtures
- Efficiency accounts for hydraulic and mechanical losses

PRODUCT SPECIFICATION (required):
  Format: PRODUCT phase=sid  
  Phase options:
    L = liquid product (most common)
    M = mixed (if flashing occurs due to conditions)

  Only ONE product stream allowed

OPERATION BLOCK (required):
  Contains performance specifications for pump
  
  PRESSURE SPECIFICATION (choose ONE):
    DP(upres) = pressure increase from feed
      Example: DP(PSI)=50 means 50 psi pressure rise
      Alternative: DELP
    
    PRESSURE(upres) = absolute outlet pressure
      Example: PRESSURE(BAR)=25 sets discharge to 25 bar or
               PRES(BAR)=25 sets discharge to 25 bar
      Alternatives: PRES, POUT
    
    PRATIO = pressure ratio (Pout/Pin)
      Example: PRATIO=2.5 means outlet is 2.5× inlet pressure
    
    HEAD(uhead) = discharge head
      Example: HEAD(M)=100 for 100 meters head
      Used for pump curve specifications

  EFFICIENCY SPECIFICATIONS:
    EFF(upercent) = overall pump efficiency
      Default: 100% (no solids in liquid feed)
      Default: 65% (if ANY solids present in feed)
      Range: Typically 50-90% for real pumps
      Accounts for hydraulic losses, friction, recirculation
      
      Example: EFF=75 means 75% efficient
    
    MEFF(upercent) = mechanical efficiency
      Accounts for bearing friction, seal losses
      Default: 100% (if not specified)
      Typically: 95-98% for good mechanical design
      
      Example: MEFF=96
    
    💡 Overall efficiency = Hydraulic efficiency × Mechanical efficiency
    If only EFF specified: used for hydraulic calculations
    If both EFF and MEFF: Total power = Hydraulic power / (EFF × MEFF)

DEFAULT EFFICIENCY BEHAVIOR:
  ✅ No solids in feed → EFF defaults to 100%
  ⚠️ ANY solids present → EFF defaults to 65%
  This automatic adjustment accounts for slurry pumping losses

DEFINE STATEMENT (optional):
  Can define pressure specifications relative to other units
  
  Syntax for pressure:
    DEFINE DP AS UNIT=uid, parameter, {operation}, {value}
    DEFINE PRESSURE AS STREAM=sid, PRES, {operation}, {value}
  
  Operations: PLUS, MINUS, TIMES, DIVIDE
  
  Examples:
    DEFINE PRES AS UNIT=R101 PRESSURE PLUS 5
      Sets pump discharge to reactor pressure + 5
    
    DEFINE DP AS STREAM=FEED PRES TIMES 0.1
      Pressure rise = 10% of feed pressure
    
    DEFINE PRES AS CALCULATOR=C101 R(1)
      Uses calculator result R(1) for discharge pressure

CROSS-REFERENCING:
  Can reference (see Manual Tables 10.3-2, 10.3-3):
    - Stream properties: TEMP, PRESSURE, RATE, DENS, etc.
    - Unit parameters: Other unit pressures, flows
    - Calculator results: CALC=name R(n)
  
  Enables pump discharge pressure tied to:
    - Downstream vessel pressure
    - Column pressure + safety margin
    - Heat exchanger inlet requirements
    - Calculated optimal pressure

WORK OUTPUT:
  WORK = shaft work required (energy/time)
  Calculated automatically from:
    Work = (Pout - Pin) × Flow / (Efficiency)
  
  Units depend on DIMENSION settings:
    SI: kW (kilowatts)
    ENG: HP (horsepower) or BTU/hr

THERMODYNAMIC METHOD:
  METHOD SET=setid - Optional override
  
  Uses liquid enthalpy for calculations
  Important for:
    - Non-ideal liquid mixtures
    - High pressure applications
    - Near-critical conditions

TYPICAL PUMP EFFICIENCIES:
  Small pumps (< 50 HP): 60-70%
  Medium pumps (50-200 HP): 70-80%
  Large pumps (> 200 HP): 80-88%
  
  Slurry/solids service: 55-70%
  High pressure (> 100 bar): 75-85%
  Metering pumps: 85-95%

PRESSURE SPECIFICATIONS:
  Typical applications:
    DP: When pressure rise is known (e.g., 50 psi boost)
    PRES: When discharge pressure is fixed (e.g., to vessel)
    PRATIO: For proportional pressure increase
    HEAD: When using pump performance curves

COMMON APPLICATIONS:
  - Feed pumps for columns/reactors
  - Interstage pumps in multi-stage separation
  - Transfer pumps between units
  - Circulation pumps for heat exchangers
  - High-pressure injection pumps
  - Bottoms pumps from vessels

TYPICAL PATTERNS:
  Booster pump: OPERATION EFF=75, DP=50
  To vessel: OPERATION EFF=78, PRES=<vessel pressure>
  With margin: DEFINE PRES AS UNIT=C101 PRES PLUS 3
  High pressure: OPERATION EFF=80, MEFF=96, PRES=150

⚠️ IMPORTANT NOTES:
  - UID is REQUIRED for all unit operations
  - PRODUCT specification is REQUIRED
  - Must specify pressure (DP, PRES, PRATIO, or HEAD)
  - Efficiency defaults change based on solids presence
  - Cannot pump pure vapor (use COMPRESSOR instead)
  - If mixed feed, uses liquid fraction for pumping
  - Outlet temperature calculated from work addition
  - No phase change unless pressure/temp causes flashing

💡 EFFICIENCY TIPS:
  - Use actual pump curve data when available
  - Account for viscosity effects on efficiency
  - Higher efficiency = lower operating cost
  - MEFF captures driver losses (motor, turbine)
  - Conservative efficiency = oversized pump in design

CONVERGENCE CONSIDERATIONS:
  - Pumps usually converge easily
  - Issues if downstream pressure not well-defined
  - Use DEFINE for pressure coupling to other units
  - Check for negative DP (would indicate pressure decrease)`
    },
    'COMPRESSOR': {
        description: 'Compressor - Single stage isentropic compression with efficiency or performance curves (PRO/II Manual §11.6)',
        types: [
            'Simple Specification - PRESSURE/DP/PRATIO with EFF/POLY efficiency',
            'Work Specification - WORK input with efficiency or TEMP outlet',
            'Tabular Curves (Single MW) - PRESSURE/PRATIO/HEAD/WORK vs flow rate',
            'Tabular Curves (Multiple MW) - DPRESSURE/DHEAD/DWORK with MW/RPM variations',
            'With After Cooler - COOLER block with ACTEMP/ACDP specifications'
        ],
        parameters: {
            required: ['UID', 'FEED', 'PRODUCT'],
            optional: [
                'NAME', 'OPERATION', 'PRESSURE', 'DP', 'PRATIO', 'WORK',
                'EFF', 'POLY', 'MEFF', 'TEMP', 'TEST', 'PIN',
                'CALC', 'PRSWITCH', 'PDESIGN', 'WTOL',
                'RPM', 'REFRPM', 'FANH', 'FANE',
                'HEAD', 'EFFICIENCY', 'PINLET', 'POUTLET',
                'DPRESSURE', 'DPRATIO', 'DHEAD', 'DWORK', 'REFMWT', 'COPT',
                'SURGE', 'STONE', 'HBASIS', 'EFTYPE',
                'COOLER', 'ACTEMP', 'ACDP',
                'DEFINE', 'METHOD', 'JONK'
            ]
        },
        example: `$ Example 1: Simple compression to specified pressure
COMPRESSOR  UID=CMP1, NAME=COMPRESSOR 1
  FEED      F1
  PROD      V=V1
  OPER      PRESSURE(PSIA)=500, EFF(PCT)=75
  COOLER    ACDP(PSI)=5, ACTEMP(F)=130

$ Example 2: Compression with temperature specification
COMPRESSOR  UID=CMP2
  FEED      F2
  PROD      M=MIX2
  OPER      TEMP(C)=200, PRESSURE(BAR)=35

$ Example 3: Work-based with pressure ratio
COMPRESSOR  UID=CPR4
  FEED      10
  PROD      V=11
  OPER      PDESIGN(PSIA)=1200
  DEFINE    WORK AS EXPANDER=EX1, WORK, TIMES, 0.98
  DEFINE    PIN AS STREAM=9, PRESSURE, MINUS, FLASH=F1, PRESSURE
  DEFINE    POLY AS COMPRESS=C9, POLY

$ Example 4: Two-stage with performance curves
COMPRESSOR  UID=1, NAME=STAGE 1
  FEED      1
  PROD      L=1L, V=1V
  OPER      PRSWITCH=1.15, RPM=5000, REFRPM=5480
  COOLER    DP(PSI)=2, TEMP(F)=100
  HEAD      ACTUAL = 20000,18760/22000,17720/25000,17060/ &
              27000,16000/30000,15000/40000,14000/70000,10000
  EFFICIENCY POLY = 20000,76/30000,78.0/70000,75.0

$ Example 5: Multiple MW curves with COPT=MULT
COMPRESSOR  UID=C1
  FEED      S1
  PRODUCT   V=S2
  DHEAD(ft3/hr,BTU/lb) POLY 4919.28,124.143,84/5457.4,123.074,86/ &
              7228.7,112.384,86/7542.6,108.464,86, REFRPM=11347, REFMWT=18.3
  DHEAD(ft3/hr,BTU/lb) POLY 5838.57,157.283,84/6264.57,156.927,86/ &
              10771.3,100.268,74/10883.4,95.635,72, REFRPM=12766, REFMWT=18.3
  OPERATION CALCULATION=ASME, COPT=MULT, PIN=1.3197, RPM=12000, HBASIS=ENERGY`,
        notes: `UID is REQUIRED (unique identifier for compressor).

ALIASES: COMPRESSOR = COMP = CMPR (use COMPR/CMPR to avoid COMPONENT conflict)

══════════════════════════════════════════════════════════════════════════════
FEEDS AND PRODUCTS (REQUIRED)
══════════════════════════════════════════════════════════════════════════════

FEED sid {, sid, ...}
  - One or more feed streams
  - Typically vapor or gas streams
  - Mixed feeds allowed
  - Combined at lowest feed pressure before compression

PRODUCT specifications:
  V = sid         Vapor product (most common)
  L = sid         Liquid product (if condensation occurs)
  M = sid         Mixed phase product
  V=sid, L=sid    Separate vapor and liquid products
  W = sid         Optional decant water (VLLE systems)
  S = sid         Optional solids product
  
  ⚠️ Liquid formation possible at high pressure ratios
  💡 Use M phase if condensation expected

══════════════════════════════════════════════════════════════════════════════
OPERATION STATEMENT (PERFORMANCE SPECIFICATIONS)
══════════════════════════════════════════════════════════════════════════════

Two degrees of freedom must be satisfied:
  1. Pressure/Work specification (choose ONE)
  2. Efficiency/Temperature specification (choose ONE)

PRESSURE/WORK SPECIFICATION (choose ONE):

  PRESSURE(upres) = value
    - Outlet pressure (absolute)
    - Alternative keywords: PRES, PRESS, POUT
    - No default value
    
    Example: PRESSURE(PSIA)=1200
             PRES(BAR)=35
  
  DP(upres) = value
    - Pressure increase over lowest feed pressure
    - Must be positive value
    - No default value
    
    Example: DP(PSI)=800
  
  PRATIO(ufrac) = value
    - Pressure ratio: Pout/Pin
    - Must be > 1.0
    - No default value
    
    Example: PRATIO=3.5
  
  WORK(uwork) = value, WTOL=0.001, {PDESIGN(upres)=value}
    - Desired work input
    - WTOL: Relative convergence tolerance (default 0.001)
    - PDESIGN: Maximum outlet pressure constraint
    - If calculated Pout > PDESIGN, work recomputed to meet PDESIGN
    
    Example: WORK(HP)=500, WTOL=0.0005, PDESIGN(PSIA)=1500

EFFICIENCY/TEMPERATURE SPECIFICATION (choose ONE):

  EFF(upct) = value (default 100)
    - Adiabatic efficiency, percent
    - Typical range: 75-92%
    - Higher values for larger compressors
    
    Example: EFF(PCT)=82
             EFF=85
  
  POLY(upct) = value (default 100)
    - Polytropic efficiency, percent
    - Preferred for high pressure ratios
    - Accounts for multi-stage behavior
    
    Example: POLY(PCT)=88
  
  TEMP(utemp) = value
    - Outlet temperature specification
    - Efficiency calculated from energy balance
    - Useful when discharge T is design constraint
    
    Example: TEMP(F)=300
             TEMP(C)=150

OPTIONAL OPERATION ENTRIES:

  MEFF(upct) = 100
    - Mechanical efficiency, percent
    - Accounts for bearing/seal losses
    - Default 100% (no mechanical losses)
    
    Example: MEFF=98
  
  PIN(upres) = value
    - Inlet pressure override
    - Default: Lowest feed stream pressure
    - Use when feed pressure varies
    
    Example: PIN(PSIA)=100
  
  TEST(utemp) = value
    - Outlet temperature estimate
    - Improves convergence speed
    - Not required but helpful
    
    Example: TEST(F)=250

  CALC = GPSA or ASME
    - Calculation method selection
    - GPSA: Iterative method (default, GPSA Engineering Data Book)
    - ASME: Analytic method (ASME Power Test Code 10)
    
    Example: CALC=ASME
  
  PRSWITCH(ufrac) = 1.15 (GPSA method only)
    - Pressure ratio switch point
    - PRATIO < PRSWITCH: Use temperature equation for k/n
    - PRATIO ≥ PRSWITCH: Use head equation
    - Default 1.15
    
    Example: PRSWITCH=1.20

══════════════════════════════════════════════════════════════════════════════
TABULAR PERFORMANCE CURVES (SINGLE MOLECULAR WEIGHT)
══════════════════════════════════════════════════════════════════════════════

Evaluate performance as function of inlet volumetric flow rate.
Alternative to PRESSURE/DP/PRATIO/WORK on OPERATION statement.
At least TWO data points required per curve.

PRESSURE(uGvRate, upres) = gvrate,press {, REFRPM=value, SURGE=value, STONE=value} / ...
  - Outlet pressure vs flow rate curve
  - Flow rate in gas volume units (actual inlet)
  
  Example: PRESSURE(ACFM,PSIA) = 5000,400/7500,380/10000,350, REFRPM=3600

PRATIO(uGvRate, ufrac) = gvrate,frac {, REFRPM=value, SURGE=value, STONE=value} / ...
  - Pressure ratio vs flow rate curve
  
  Example: PRATIO(M3/H,FRAC) = 1000,2.8/1500,2.6/2000,2.4

HEAD(uGvRate, uleng or Energy/Mass) ADIA or POLY or ACTUAL = gvrate,value {, REFRPM=value, SURGE=value, STONE=value} / ...
  - Head vs flow rate curve
  - Type: ADIABATIC, POLYTROPIC, or ACTUAL
  - Units: Length (ft, m) or Energy/Mass (BTU/lb, kJ/kg)
  - RPM scaling with fan laws allowed
  
  Example: HEAD(ACFM,FT) ACTUAL = 20000,18760/25000,17060/30000,15000, REFRPM=5480

WORK(uGvRate, uwork) ADIA or POLY or ACTUAL = gvrate,value {, REFRPM=value, SURGE=value, STONE=value} / ...
  - Work vs flow rate curve
  - Type: ADIABATIC, POLYTROPIC, or ACTUAL
  
  Example: WORK(M3/H,KW) POLY = 500,250/750,240/1000,220

EFFICIENCY(uGvRate, PCT) ADIA or POLY = rate,value / ...
  - Optional efficiency vs flow rate curves
  - Up to 10 curves allowed with PINLET or POUTLET
  - Type: ADIABATIC or POLYTROPIC
  - Must match HEAD/WORK curve type
  - If omitted, EFF/POLY from OPERATION used (default 100%)
  
  Single curve:
    EFFICIENCY POLY = 20000,76/30000,78.0/70000,75.0
  
  Multiple curves (with PINLET or POUTLET):
    EFFICIENCY POLY = 5000,80/7500,82/10000,81, PINLET(PSIA)=50
    EFFICIENCY POLY = 5000,78/7500,80/10000,79, PINLET(PSIA)=60
    
  ⚠️ All efficiency curves must use same keyword (PINLET or POUTLET)

RPM SCALING (with HEAD or WORK curves):

  RPM = value
    - Operating speed (revolutions per minute)
    - Scales performance curve from reference speed
  
  REFRPM = value
    - Machine design speed used to measure curve
    - Required when RPM specified
  
  Fan Laws applied to scale curve:
    - Accurate within ±10% of design speed
    - Warning printed if exceeded
    
  FANH = 2.0 (with HEAD curves)
    - Exponent for head scaling: Head ~ (RPM/REFRPM)^FANH
    - Default 2.0
  
  FANE = 1.0 (with EFFICIENCY curves)
    - Exponent for efficiency scaling
    - Default 1.0
  
  Example: RPM=5000, REFRPM=5480, FANH=2.0

SURGE AND STONEWALL:

  SURGE = value
    - Surge flow rate (minimum stable flow)
    - Optional warning/error if flow < SURGE
  
  STONE = value
    - Stonewall flow rate (maximum choked flow)
    - Optional warning/error if flow > STONE

══════════════════════════════════════════════════════════════════════════════
TABULAR PERFORMANCE CURVES (MULTIPLE MOLECULAR WEIGHTS)
══════════════════════════════════════════════════════════════════════════════

For variable gas composition. Requires COPT=MULT on OPERATION statement.
Interpolates between MWs and RPMs. Limited to 5 MWts and 7 RPMs.

DPRESSURE(uGvRate, upres) = gvrate,press,Efficiency / ..., REFRPM=value, REFMWT=value
  - Pressure curve with embedded efficiency
  
DPRATIO(uGvRate, ufrac) = gvrate,frac,Efficiency / ..., REFRPM=value, REFMWT=value
  - Pressure ratio curve with embedded efficiency

DHEAD(uGvRate, uleng or Energy/Mass) ADIA or POLY or ACTUAL = gvrate,value,Efficiency / ..., REFRPM=value, REFMWT=value
  - Head curve with embedded efficiency

DWORK(uGvRate, uwork) ADIA or POLY or ACTUAL = gvrate,value,Efficiency / ..., REFRPM=value, REFMWT=value
  - Work curve with embedded efficiency

Required entries:
  REFRPM = value  (reference speed for this curve)
  REFMWT = value  (reference molecular weight for this curve)
  
Optional:
  SURGE = value   (surge flow rate)
  STONE = value   (stonewall flow rate)

OPERATION requirements:
  COPT = MULT     (enables multiple MW mode)
  RPM = value     (operating speed)
  HBASIS = ENERGY or Length (for head curves)
  
  ⚠️ If TEMP specified on OPERATION, efficiency data in curves ignored

Example structure:
  DHEAD(ft3/hr,BTU/lb) POLY gvrate,head,eff/..., REFRPM=11347, REFMWT=18.3
  DHEAD(ft3/hr,BTU/lb) POLY gvrate,head,eff/..., REFRPM=12766, REFMWT=18.3
  DHEAD(ft3/hr,BTU/lb) POLY gvrate,head,eff/..., REFRPM=11347, REFMWT=25
  OPERATION COPT=MULT, RPM=12000, HBASIS=ENERGY

══════════════════════════════════════════════════════════════════════════════
COOLER STATEMENT (AFTER COOLER / INTERCOOLER)
══════════════════════════════════════════════════════════════════════════════

COOLER ACTEMP(utemp)=value, ACDP(upres)=0.0

  Cools compressor discharge to specified temperature.
  Flashes cooled stream to determine final vapor/liquid split.
  
  ACTEMP = After cooler outlet temperature (REQUIRED)
  ACDP = After cooler pressure drop (optional, default 0.0)
  
  Typical applications:
    - Intercooling between compression stages
    - Final cooling before next unit
    - Condensation of heavy components
  
  Example: COOLER ACTEMP(F)=130, ACDP(PSI)=5

══════════════════════════════════════════════════════════════════════════════
DEFINE STATEMENT (ALTERNATE PARAMETER DEFINITION)
══════════════════════════════════════════════════════════════════════════════

DEFINE <param> AS <unit type>=uid, <param>, {<op>, <ref>}
DEFINE <param> AS STREAM=sid, <prop>, {<op>, <ref>}

Allowed <param> entries (Table 11.6-1):
  PRESSURE, DP, PRATIO, WORK, EFF, POLY, MEFF, PIN, PDESIGN, TEMP, TEST

Operations: PLUS, MINUS, TIMES, DIVIDE, RATIO

Examples:
  DEFINE PRESSURE AS STREAM=9, PRESSURE, PLUS, 10
  DEFINE WORK AS EXPANDER=EX1, WORK, TIMES, 0.98
  DEFINE POLY AS COMPRESS=C9, POLY
  DEFINE EFF AS CALCULATOR=CAL1, R(3)
  DEFINE PIN AS STREAM=9, PRESSURE, MINUS, FLASH=F1, PRESSURE

Cross-references:
  - Stream properties (Tables 10.3-2 A-B)
  - Unit operation properties (Tables 10.3-3 A-H)
  - Calculator results: CALC=uid, R(n) or P(n)

══════════════════════════════════════════════════════════════════════════════
METHOD STATEMENT (THERMODYNAMIC SET SELECTION)
══════════════════════════════════════════════════════════════════════════════

METHOD SET=setid

  Selects specific thermodynamic method set for this unit.
  Important for accurate K-values at high pressure.
  
  Common methods:
    SRK - Soave-Redlich-Kwong (good for hydrocarbons)
    PR - Peng-Robinson (good for gases)
    BWRS - Benedict-Webb-Rubin-Starling (high accuracy gases)
  
  Example: METHOD SET=PRMIX01

══════════════════════════════════════════════════════════════════════════════
JONK DATA (OPTIONAL ALTERNATIVE K-VALUES)
══════════════════════════════════════════════════════════════════════════════

JONK TREF=value, ZREF=value, KREF=value, MW=value

  Alternative K-value correlation for light hydrocarbon systems.
  Rarely used - included for legacy cases.

══════════════════════════════════════════════════════════════════════════════
TYPICAL EFFICIENCIES AND DESIGN GUIDELINES
══════════════════════════════════════════════════════════════════════════════

ADIABATIC EFFICIENCY (EFF):
  Small compressors (<100 HP): 75-80%
  Medium compressors (100-1000 HP): 80-85%
  Large compressors (>1000 HP): 85-92%
  Centrifugal (high flow): 80-88%
  Reciprocating (high ratio): 82-90%

POLYTROPIC EFFICIENCY (POLY):
  Typically 2-4% higher than adiabatic
  Preferred for pressure ratios > 2.5
  Better represents multi-stage behavior
  Centrifugal: 82-90%

MECHANICAL EFFICIENCY (MEFF):
  Direct drive: 98-99%
  Gear drive: 96-98%
  Belt drive: 93-96%

PRESSURE RATIO LIMITS:
  Single stage centrifugal: 1.2-4.0
  Single stage reciprocating: 2.0-6.0
  Multi-stage: Any ratio (divide into stages)

DISCHARGE TEMPERATURE:
  High pressure ratio → High discharge T
  T discharge ≈ T inlet × (PRATIO)^[(k-1)/(k×eff)]
  ⚠️ Limit to ~150-200°C to prevent oil degradation
  💡 Use after cooler or multiple stages for high ratios

COMPRESSION PROCESS:
  Isentropic: Adiabatic reversible (ideal, eff=100%)
  Polytropic: Incremental isentropic (multi-stage model)
  Isothermal: Constant temperature (theoretical minimum work)
  Actual: Real compression with efficiency < 100%

CALCULATION METHODS:
  GPSA (default):
    - Iterative successive approximation
    - Handles complex phase behavior
    - Slower but robust
  
  ASME:
    - Analytic solution
    - Faster convergence
    - Limited to simple cases

CONVERGENCE TIPS:
  - Supply TEST temperature estimate
  - Use appropriate thermodynamic method (SRK/PR)
  - Check for condensation at high pressure
  - Verify positive inlet pressure
  - Use M product phase if liquid possible
  - Increase segments for long distance

COMMON APPLICATIONS:
  - Gas pipeline compression
  - Refrigeration systems
  - Air compression
  - Vapor recovery units
  - Recycle gas compression
  - Natural gas processing
  - CO2 compression for sequestration

COMPARISON WITH PUMP:
  COMPRESSOR:
    - Compressible fluids (gases/vapors)
    - Significant density change
    - Temperature rise during compression
    - Efficiency accounts for gas behavior
    - Isentropic process model
  
  PUMP:
    - Incompressible fluids (liquids)
    - Negligible density change
    - Small temperature rise
    - Mechanical/hydraulic efficiency
    - Energy balance model

⚠️ IMPORTANT NOTES:
  - UID is REQUIRED
  - Two degrees of freedom required (pressure + efficiency/temp)
  - High pressure ratios may cause liquid condensation
  - After cooler causes flash separation
  - VLLE possible at high pressure
  - Check discharge temperature limits
  - Performance curves require actual inlet volumetric flow
  - RPM scaling accurate only within ±10% of design
  - Multiple MW curves interpolate between data points
  - CALC=GPSA default, CALC=ASME for analytic solution

💡 ENGINEERING TIPS:
  - Use polytropic efficiency for PRATIO > 2.5
  - Include after cooler for high discharge temperatures
  - Consider multi-stage with intercooling for PRATIO > 4
  - Use M product phase if condensation expected
  - Supply TEST temperature to improve convergence
  - DEFINE useful for linking to reactors/calculators
  - Performance curves better than simple efficiency for accuracy
  - Check for hydrate formation in cooler
  - Verify suction pressure is adequate (avoid cavitation)
  - Consider driver power limitations (MEFF)
  - Use appropriate thermodynamic method (SRK/PR/BWRS)

TYPICAL MULTI-STAGE PATTERN:
  Stage 1: Compression with cooler
  Stage 2: Compression with cooler
  Final: Compression to target pressure
  
  Link stages with DEFINE RPM for common shaft`
    },
    'COMP': {
        description: 'Compressor - Increases pressure of gas streams (same as COMPRESSOR)',
        types: [
            'Adiabatic - With efficiency specification',
            'Polytropic - Multi-stage compression with cooling',
            'Isothermal - Constant temperature compression',
            'With Intercooling - COOLER block for aftercooler'
        ],
        parameters: {
            required: ['UID', 'FEED'],
            optional: [
                'NAME', 'PRODUCT', 'M', 'V',
                'POUT', 'PRES', 'PRESS', 'PRATIO', 'TOUT',
                'OPERATION', 'OPER', 'EFF', 'IEFF', 'PEFF',
                'WORK', 'COOLER', 'ACTEMP', 'ACDP',
                'DEFINE', 'METHOD'
            ]
        },
        example: `$ Adiabatic compressor with specified efficiency
COMP        UID=K101, NAME=RECYCLE COMPRESSOR
  FEED      S1
  PRODUCT   M=S2
  PRATIO    3.5
  OPERATION IEFF=80, PEFF=95

$ With intercooler and pressure calculated
COMPRESSOR  UID=FGC1, NAME=1ST STAGE COMPRESSOR
  FEED      FRSHBL
  PRODUCT   M=FRSH1
  OPERATION EFF=90, PRES=50
  COOLER    ACTEMP=45, ACDP=0.50`,
        notes: `⚠️ UID is REQUIRED (unique identifier).
✅ COMP and COMPRESSOR are equivalent keywords.

Pressure specification (choose ONE):
  PRES/PRESS/POUT = outlet pressure
  PRATIO = pressure ratio (Pout/Pin)
  
Efficiency types:
  EFF = adiabatic efficiency (%)
  IEFF = isentropic efficiency (%)
  PEFF = polytropic efficiency (%)
  
COOLER for intercooling:
  ACTEMP = after-cooler outlet temperature
  ACDP = after-cooler pressure drop

PRODUCT phase:
  M = mixed (when some condensation occurs)
  V = vapor only

Common efficiency values: 75-92% depending on size and type.`
    },
    'VALVE': {
        description: 'Valve - Pressure reduction through isenthalpic throttling expansion (PRO/II Manual §11.3)',
        types: [
            'Control Valve - Pressure regulation with fixed DP',
            'Letdown Valve - Pressure reduction between units',
            'Expansion Valve - Flash expansion for refrigeration',
            'Throttling Valve - Flow control with pressure drop',
            'Back Pressure Regulator - Maintains upstream pressure'
        ],
        parameters: {
            required: ['UID', 'FEED', 'PRODUCT'],
            optional: [
                'NAME', 'PROD', 'L', 'M', 'V',
                'OPERATION', 'OPER',
                'DP', 'DELP', 'PRESSURE', 'PRES', 'POUT',
                'DEFINE',
                'METHOD'
            ]
        },
        example: `$ Control valve with pressure drop
VALVE       UID=VAL1, NAME=CONTROL VALVE
  FEED      2
  PRODUCT   L=L3, V=V1
  OPERATION DP(PSI)=50

$ Letdown valve with separate phase products
VALVE       UID=CHPL1REC, NAME=RECYCLE CONTROL VALVE
  FEED      CHPL1DIS
  PRODUCT   L=CHPL1REC
  OPERATION DP=1
  METHOD    SET=SRK-HP

$ Valve with calculated outlet pressure
VALVE       UID=VAL2
  FEED      F2
  PRODUCT   M=M2
  DEFINE    PRESSURE AS STREAM=L3, PRESSURE, PLUS, 5.0

$ Simple expansion to fixed pressure
VALVE       UID=V102, NAME=LETDOWN VALVE
  FEED      HIGH
  PRODUCT   M=LOW
  OPERATION PRESSURE=5`,
        notes: `⚠️ UID is REQUIRED (unique identifier).
📖 Reference: PRO/II Keyword Manual Section 11.3

GENERAL DESCRIPTION:
- Valve performs isenthalpic (constant enthalpy) expansion
- No work interaction (W = 0)
- No heat transfer (Q = 0)
- Enthalpy unchanged: H_out = H_in
- Temperature typically decreases due to Joule-Thomson effect
- May cause phase change (flashing) if pressure drop is large

THERMODYNAMIC BEHAVIOR:
  Isenthalpic Process:
    - Constant enthalpy throttling
    - Different from isentropic (constant entropy)
    - Real irreversible process
    - Entropy increases (ΔS > 0)
  
  Temperature Effects:
    - Liquids: Usually small temperature change
    - Gases: Temperature drop depends on Joule-Thomson coefficient
    - Near-critical: Can have significant temperature effects
    - Flash zone: Large temperature drop due to vaporization

PRODUCT SPECIFICATION (required):
  Format: PRODUCT phase=sid
  
  Phase options:
    L = liquid product (if no flashing occurs)
    V = vapor product (if complete vaporization)
    M = mixed phase (if partial flashing occurs)
  
  Multiple products allowed:
    PRODUCT L=L3, V=V1
    Automatically separates vapor and liquid phases
  
  Single product:
    PRODUCT M=M2
    Combined vapor-liquid product
  
  ⚠️ PRO/II automatically determines actual phase
  Declared phase is overridden if needed

OPERATION BLOCK (required):
  Must specify outlet pressure condition
  One entry (DP or PRESSURE) is REQUIRED
  
  PRESSURE SPECIFICATION (choose ONE):
    DP(upres) = pressure drop below feed pressure
      Example: DP(PSI)=50 means 50 psi pressure drop
      Alternative spelling: DELP
      
      Positive DP = pressure decrease (normal)
      Negative DP = pressure increase (unusual)
      
      For multiple feeds: DP relative to LOWEST feed pressure
    
    PRESSURE(upres) = absolute outlet pressure
      Example: PRESSURE(BAR)=5 sets outlet to 5 bar
      Alternative spellings: PRES, POUT
      
      Directly specifies discharge pressure
      Independent of feed pressure

DEFAULT BEHAVIOR:
  If no OPERATION block specified:
    - DP defaults to 0.0 (no pressure change)
    - Outlet pressure = feed pressure

DEFINE STATEMENT (optional):
  Can define pressure specifications relative to other units
  
  Syntax:
    DEFINE DP AS UNIT=uid, parameter, {operation}, {value}
    DEFINE PRESSURE AS STREAM=sid, property, {operation}, {value}
  
  Operations: PLUS, MINUS, TIMES, DIVIDE
  
  Only ONE DEFINE statement allowed
  
  Examples:
    DEFINE PRESSURE AS STREAM=L3, PRESSURE, PLUS, 5.0
      Sets outlet pressure to stream L3 pressure + 5
    
    DEFINE DP AS STREAM=FEED, PRES, TIMES, 0.5
      Pressure drop = 50% of feed pressure
    
    DEFINE PRESSURE AS UNIT=V101, PRES
      Matches outlet pressure to vessel V101

CROSS-REFERENCING:
  Can reference (see Manual Tables 10.3-2, 10.3-3):
    - Stream properties: TEMP, PRESSURE, RATE, etc.
    - Unit parameters: Other unit pressures
    - Useful for pressure coordination between units
  
  Common patterns:
    - Match downstream vessel pressure
    - Set relative to column pressure
    - Coordinate with other valves

PHASE BEHAVIOR:
  Flash Calculation:
    - Performs adiabatic flash at outlet pressure
    - Determines vapor fraction from phase equilibrium
    - May create two-phase flow
  
  Common scenarios:
    High pressure liquid → Flash to vapor-liquid mix
    Subcooled liquid → Remains liquid (small T drop)
    Gas → Slight cooling (Joule-Thomson effect)
    Near-critical fluid → Complex phase behavior

THERMODYNAMIC METHOD:
  METHOD SET=setid - Optional override
  
  Important for:
    - Accurate flash calculations
    - Joule-Thomson coefficient
    - Phase equilibrium near flash zone
  
  VLLE Support:
    - Supports VLLE calculations
    - When VLLE method set selected
    - Three-phase flash possible

TYPICAL APPLICATIONS:
  - Control valves for flow/pressure regulation
  - Letdown valves between high and low pressure systems
  - Expansion valves in refrigeration cycles
  - Flash drum feed valves (create vapor-liquid)
  - Back pressure regulators
  - Pressure reduction stations
  - Reactor effluent letdown

PRESSURE DROP SIZING:
  Small DP (< 10%):
    - Minimal temperature change
    - Usually no phase change
    - Control valve application
  
  Medium DP (10-50%):
    - Noticeable temperature drop
    - Possible flash if near saturation
    - Letdown valve application
  
  Large DP (> 50%):
    - Significant temperature drop
    - Likely flash vaporization
    - Two-phase flow downstream
    - Expansion valve application

DESIGN CONSIDERATIONS:
  ⚠️ Flashing can cause:
    - Erosion of valve trim
    - Noise and vibration
    - Two-phase flow issues
    - Choked flow conditions
  
  💡 For large DP with flashing:
    - Consider multi-stage pressure reduction
    - Use flash drum downstream
    - Select appropriate valve materials
    - Account for two-phase pressure drop

COMMON PATTERNS:
  Simple control: OPERATION DP=10
  To vessel: OPERATION PRESSURE=<vessel_pressure>
  Relative pressure: DEFINE PRESSURE AS STREAM=DOWN PRES PLUS 2
  Flash expansion: OPERATION DP=<large_value>, PRODUCT M=mixed

TYPICAL DP VALUES:
  Control valves: 5-25% of inlet pressure
  Letdown valves: 30-70% pressure reduction
  Flash valves: 50-90% pressure drop
  Back pressure: Varies with system requirements

⚠️ IMPORTANT NOTES:
  - UID is REQUIRED for all unit operations
  - PRODUCT specification is REQUIRED
  - Must specify pressure (DP or PRESSURE) in OPERATION
  - Isenthalpic process (H = constant, NOT S = constant)
  - No work extracted (unlike turbine/expander)
  - Phase change may occur with large DP
  - Actual phase overrides declared phase
  - Multiple feeds: DP measured from LOWEST feed pressure

💡 ENGINEERING TIPS:
  - For gas service: Expect temperature drop
  - For liquid service: Watch for flashing
  - Large DP → Consider downstream phase separator
  - Joule-Thomson coefficient determines T change
  - Use M phase for mixed product if unsure
  - Check for choked flow in large DP applications

CONVERGENCE:
  - Valves typically converge easily
  - Flash calculation may require iteration
  - Issues if outlet pressure not well-defined
  - Use DEFINE to couple to downstream pressure
  - Check for physically impossible specs (negative P)`
    },
    'MIXER': {
        description: 'Mixer - Combines two or more streams into single product with adiabatic flash (PRO/II Manual §11.4)',
        types: [
            'Adiabatic Mixing - Default operation (Q=0)',
            'Specified Pressure - Fixed outlet pressure',
            'Referenced Pressure - Pressure from other streams/units',
            'Minimum Pressure - Lowest feed pressure (default)',
            'Phase Separator - Can separate V/L/S phases'
        ],
        parameters: {
            required: ['UID', 'FEED', 'PRODUCT'],
            optional: [
                'NAME', 'PROD', 'M', 'L', 'V', 'S',
                'OPERATION', 'OPER',
                'DP', 'DELP', 'PRESSURE', 'PRES',
                'DEFINE',
                'METHOD'
            ]
        },
        example: `$ Simple adiabatic mixer at minimum feed pressure
MIXER       UID=MIX3
  FEED      A16, A10, R4
  PRODUCT   M=M3

$ Mixer with specified pressure
MIXER       UID=MIX1
  FEED      A16, A10, R4
  PRODUCT   M=M1
  OPERATION PRESSURE(PSIA)=50

$ Mixer with pressure from another stream
MIXER       UID=MIX2
  FEED      A16, A10, R4
  PRODUCT   M=M2
  DEFINE    PRESSURE AS STREAM=A10, PRESSURE

$ Mixer for combining overhead streams
MIXER       UID=HPMO, NAME=HHPS OVERHEAD CONDENSER INLET MIXER
  FEED      HPOV, HPWW1
  PRODUCT   M=HPMO

$ Mixer with multiple feeds and pressure drop
MIXER       UID=CLPI, NAME=CLPS INLET MIXER
  FEED      CLPS1, CLPS2, MAKEUP
  PRODUCT   L=CLPIN
  OPERATION PRESSURE=15`,
        notes: `⚠️ UID is REQUIRED (unique identifier).
📖 Reference: PRO/II Keyword Manual Section 11.4

GENERAL DESCRIPTION:
- Combines two or more streams into single product
- Performs adiabatic flash at outlet conditions
- No work interaction (W = 0)
- No heat duty unless specified (Q = 0 default)
- Outlet phase determined by flash calculation
- Can separate phases if desired (V/L/S products)

MIXING BEHAVIOR:
  Material Balance:
    - Total mass/moles conserved
    - Component flows summed
    - Weighted average composition
  
  Energy Balance:
    - Adiabatic: H_out = Σ(H_in,i) for all feeds
    - Flash determines T at outlet pressure
    - Heat of mixing included in calculation
  
  Pressure Handling:
    - Default: Lowest feed pressure (DP=0)
    - Or specify absolute outlet pressure
    - Or define relative to another stream/unit

FEED SPECIFICATION (required):
  Format: FEED sid, sid, sid, ...
  
  Minimum: 2 feed streams
  Maximum: No limit (can combine many streams)
  
  Examples:
    FEED A16, A10, R4
    FEED RECYCLE, FRESH, MAKEUP, WASH
  
  All feeds at different conditions:
    - Different temperatures
    - Different pressures
    - Different compositions
    - Different phases (can mix V+L)

PRODUCT SPECIFICATION (required):
  Format: PRODUCT phase=sid
  
  Single product (most common):
    PRODUCT M=M1 - Mixed vapor-liquid product
    PRODUCT L=L1 - Liquid product only
    PRODUCT V=V1 - Vapor product only
    PRODUCT S=S1 - Solid product (rare)
  
  Phase-separated products:
    For V/L/S phase separation, use FLASH instead
    MIXER determines correct phase automatically
    Declared phase overridden if necessary
  
  ⚠️ Only ONE product stream allowed
  💡 To separate phases, use FLASH unit instead of MIXER

OPERATION BLOCK (optional):
  Outlet pressure specification
  
  PRESSURE SPECIFICATION (choose ONE):
    DP(upres) = pressure drop from lowest feed
      Example: DP(PSI)=0.0 (default)
      Negative DP = pressure increase
      
      DP measured from feed with LOWEST pressure
      DP=0 → outlet at lowest feed pressure
    
    PRESSURE(upres) = absolute outlet pressure
      Example: PRESSURE(BAR)=15
      Alternative: PRES
      
      Directly sets discharge pressure
      Independent of feed pressures
  
  Default behavior (no OPERATION):
    DP = 0.0
    Outlet pressure = pressure of combined feed
    Combined feed = stream at lowest pressure

DEFINE STATEMENT (optional):
  Can define pressure relative to other streams/units
  
  Syntax:
    DEFINE DP AS UNIT=uid, parameter, {operation}, {value}
    DEFINE PRESSURE AS STREAM=sid, property, {operation}, {value}
  
  Operations: PLUS, MINUS, TIMES, DIVIDE
  
  Only ONE DEFINE statement allowed
  
  Examples:
    DEFINE PRESSURE AS STREAM=A10, PRESSURE
      Outlet pressure = stream A10 pressure
    
    DEFINE DP AS STREAM=LOWFEED, PRES, TIMES, -0.05
      5% pressure increase above lowest feed
    
    DEFINE PRESSURE AS UNIT=V101, PRES, PLUS, 2
      Outlet pressure = vessel V101 + 2 pressure units

CROSS-REFERENCING:
  Parameters DP and PRESSURE can reference:
    - Stream properties (Tables 10.3-2 A-B)
    - Unit operation properties (Tables 10.3-3 A-H)
  
  Common patterns:
    - Match downstream unit inlet pressure
    - Reference header pressure
    - Coordinate with column feed pressure
    - Set relative to vessel pressure

THERMODYNAMIC CALCULATIONS:
  Flash Calculation:
    - Combines all feeds at mixing pressure
    - Adiabatic flash determines outlet temperature
    - Phase equilibrium determines vapor fraction
    - May create two-phase product from all-liquid feeds
  
  Phase Determination:
    - Automatic phase detection
    - Overrides declared phase if necessary
    - Bubble point check
    - Dew point check
  
  METHOD SET=setid:
    - Optional thermodynamic method override
    - Supports VLLE calculations
    - When VLLE method set selected
    - Three-phase equilibrium possible

TYPICAL MIXING SCENARIOS:
  All liquids → Usually liquid product
    But may flash if pressure reduced
  
  All vapors → Usually vapor product
    But may condense if pressure increased
  
  Mixed feeds (V+L) → Mixed product
    Flash determines final phase split
  
  Different temperatures → Intermediate temperature
    Energy balance determines final T
  
  Different pressures → Flash at outlet P
    Lowest feed P if not specified

THERMODYNAMIC METHOD:
  METHOD SET=setid - Optional override
  
  Important when:
    - Feeds use different thermo methods
    - Non-ideal liquid mixing
    - Electrolyte systems
    - Phase behavior complex
  
  VLLE Support:
    - Vapor-liquid-liquid equilibrium
    - Three-phase flash
    - Immiscible liquid systems

TYPICAL APPLICATIONS:
  - Combining multiple feed streams to column
  - Mixing recycle with fresh feed
  - Combining overhead vapor with reflux/wash
  - Blending multiple product streams
  - Mixing hot and cold streams
  - Combining light ends for compression
  - Header mixing for distribution
  - Makeup stream addition

COMMON PATTERNS:
  Simple mix (default pressure):
    MIXER UID=M1
    FEED A, B, C
    PRODUCT M=OUT
  
  Mix at specified pressure:
    MIXER UID=M1
    FEED A, B, C
    PRODUCT M=OUT
    OPERATION PRESSURE=50
  
  Mix at reference pressure:
    MIXER UID=M1
    FEED A, B
    PRODUCT M=OUT
    DEFINE PRESSURE AS STREAM=A, PRESSURE
  
  Column feed mixer:
    MIXER UID=M1, NAME=COLUMN FEED MIXER
    FEED FRESH, RECYCLE
    PRODUCT M=COMBINED
    DEFINE PRES AS UNIT=C101, PRES, PLUS, 1

PRESSURE BEHAVIOR:
  Multiple feeds at different pressures:
    - Stream at 100 psi
    - Stream at 80 psi  ← LOWEST
    - Stream at 90 psi
    
    Default outlet = 80 psi (lowest)
    DP measured from 80 psi
  
  Pressure increase (negative DP):
    - OPERATION DP=-5 means 5 psi increase
    - Requires compression work (not provided by mixer)
    - Generally not physical for simple mixer
    - Use for compatibility with downstream unit

TEMPERATURE BEHAVIOR:
  Adiabatic mixing:
    - No heat transfer with surroundings
    - Outlet T from energy balance
    - May be higher or lower than feeds
    - Depends on heat capacities and latent heats
  
  Heat of mixing:
    - Non-ideal solutions show heat effects
    - Exothermic mixing → Temperature rise
    - Endothermic mixing → Temperature drop
    - Included automatically in calculations

DESIGN CONSIDERATIONS:
  ⚠️ Mixing streams at very different conditions:
    - Large T difference → May cause flashing/condensing
    - Large P difference → Flash at lower pressure
    - Different compositions → Check phase behavior
  
  💡 For phase separation after mixing:
    - Use FLASH instead of MIXER
    - Or add FLASH downstream
    - MIXER product is single stream
  
  💡 For pressure coordination:
    - Use DEFINE to match downstream unit
    - Add margin for line losses
    - Consider pump if pressure boost needed

⚠️ IMPORTANT NOTES:
  - UID is REQUIRED for all unit operations
  - FEED specification is REQUIRED (minimum 2 feeds)
  - PRODUCT specification is REQUIRED (only 1 product)
  - Default outlet pressure = LOWEST feed pressure
  - Adiabatic operation unless specified otherwise
  - Actual phase overrides declared phase
  - For phase separation, use FLASH instead
  - MIXER cannot increase pressure without work input

💡 ENGINEERING TIPS:
  - Default operation (no OPERATION block) is most common
  - Outlet at lowest feed P minimizes flashing
  - Large ΔP between feeds → Expect flash vapor
  - Large ΔT between feeds → Check phase behavior
  - Use M phase designation if unsure of final phase
  - Consider line pressure drops upstream
  - DEFINE useful for column feed coordination

CONVERGENCE:
  - Mixers typically converge easily
  - Flash calculation may require iteration
  - Issues if conflicting specifications
  - Check for physically impossible conditions
  - Pressure must be positive
  - Phase equilibrium must be feasible

COMPARISON WITH SPLITTER:
  MIXER:
    - Multiple feeds → One product
    - Combines streams
    - Adiabatic flash
    - Phase may change
  
  SPLITTER:
    - One feed → Multiple products
    - Divides flow
    - No composition change
    - Same phase all products

COMPARISON WITH FLASH:
  MIXER:
    - Multiple feeds combined
    - Single product stream
    - Use for blending/combining
  
  FLASH:
    - Single or multiple feeds
    - Separate V/L products
    - Use for phase separation
    - Can specify V/L split`
    },
    'SPLITTER': {
        description: 'Splitter - Divides feed into multiple products with identical composition and phase (PRO/II Manual §11.5)',
        types: [
            'Fractional Split - Specified fractions for each product',
            'Rate-Based - Specified mass/mole rates',
            'Component Split - Splits specific components',
            'Recovery Split - Component recovery specifications',
            'Referenced Split - Relative to other stream rates'
        ],
        parameters: {
            required: ['UID', 'FEED', 'PRODUCT', 'SPEC'],
            optional: [
                'NAME',
                'OPERATION', 'OPER',
                'DP', 'PRESSURE', 'PRES',
                'OPTION', 'FILL', 'NORMALIZE',
                'SPEC', 'STREAM', 'STRM', 'RATE', 'COMP', 'COMPS',
                'DIVIDE', 'MULTIPLY', 'PLUS', 'MINUS',
                'REFFEED', 'REFSTREAM', 'VALUE', 'RATIO',
                'DEFINE', 'METHOD', 'SET'
            ]
        },
        example: `$ Example 1: Simple fractional split
SPLITTER    UID=SPL1, NAME=PRODUCT SPLITTER
  FEED      F1, F2
  PRODUCT   L=STREAM7, L=STREAM8, L=STREAM9
  SPEC      STREAM=STREAM8, RATE, DIVIDE, REFFEED, VALUE=0.85
  SPEC      STREAM=STREAM9, RATE, VALUE=120

$ Example 2: Component-based split with NORMALIZE
SPLITTER    UID=SPL2, NAME=COMPONENT SPLIT
  FEED      FEED1
  PRODUCT   M=PRODUCT1, M=PRODUCT2
  OPERATION DP(PSI)=5.0, OPTION=NORMALIZE
  SPEC      STREAM=PRODUCT2, COMP=2,4, RATE, RATIO, &
            STREAM=REFERENCE, COMP=2,4, RATE, VALUE=2.0

$ Example 3: DEFINE pressure relative to another unit
SPLITTER    UID=SPL3, NAME=LINKED SPLITTER
  FEED      INLET
  PRODUCT   M=OUT1, M=OUT2
  OPERATION DP(PSI)=5.0, OPTION=NORMALIZE
  SPEC      STREAM=OUT2, COMP=2,4, RATE, RATIO, &
            STREAM=REF, COMP=2,4, RATE, VALUE=2.0
  DEFINE    DP AS FLASH=FL1, DP, MINUS, 0.5

$ Example 4: Equal three-way split
SPLITTER    UID=SPL4, NAME=EQUAL SPLIT
  FEED      COMBINED
  PRODUCT   M=PROD1, M=PROD2, M=PROD3
  SPEC      STREAM=PROD1, RATE, DIVIDE, REFFEED, VALUE=0.333
  SPEC      STREAM=PROD2, RATE, DIVIDE, REFFEED, VALUE=0.333

$ Example 5: Recovery specification
SPLITTER    UID=SPL5, NAME=RECOVERY SPLIT
  FEED      REACTOR_OUT
  PRODUCT   M=RECYCLE, M=PURGE
  OPERATION DP(BAR)=0.1
  SPEC      STREAM=PURGE, COMP=5, RATE, DIVIDE, &
            REFFEED, COMP=5, RATE, VALUE=0.05`,
        notes: `⚠️ UID is REQUIRED (unique identifier).
📖 Reference: PRO/II Keyword Manual Section 11.5

GENERAL DESCRIPTION:
- Splits single feed or mixture of feeds into 2+ products
- ALL products have IDENTICAL composition and phase
- Only flow rates differ between products
- No phase separation (use FLASH for vapor-liquid separation)
- Outlet phase determined by adiabatic flash at outlet pressure
- Unlimited number of feeds allowed
- Minimum 2 products required

KEY BEHAVIOR:
✓ All products same composition (no fractionation)
✓ All products same phase (V, L, or M)
✓ Combined feed uses lowest individual feed pressure
✓ One product can be left unspecified (receives remainder)
✓ Adiabatic flash at outlet pressure determines temperature

FEED STATEMENT (required):
Format: FEED sid1, sid2, ...

Multiple feeds allowed (unlimited)
Combined feed pressure = lowest individual feed pressure
All feeds mixed before splitting

Example:
  FEED      STREAM1, STREAM2, STREAM3

PRODUCT STATEMENT (required):
Format: PRODUCT phase=sid, phase=sid, ...

Minimum: 2 products
Maximum: Unlimited
Phase options:
  V = Vapor product
  L = Liquid product
  M = Mixed (vapor + liquid)

⚠️ IMPORTANT:
- All products must use SAME phase designator
- Phase is advisory only (actual phase from flash)
- Cannot separate vapor and liquid (use FLASH)
- If phase declared doesn't exist, stream rate = 0

Example:
  PRODUCT   M=PROD1, M=PROD2, M=PROD3

SPLIT SPECIFICATIONS (required):
Requires (N-1) specifications for N products
One product left unspecified receives remainder

SPEC statement format:
  SPEC STREAM=sid, property, {operator, reference,} VALUE=value

1. TOTAL STREAM RATE:
   
   Absolute rate:
     SPEC STREAM=sid, RATE(basis), VALUE=value
   
   Basis options:
     M = Molar (default)
     WT = Weight
     LV = Liquid volume
     GV = Gas volume
   
   Example:
     SPEC STREAM=PRODUCT1, RATE(M), VALUE=100
     SPEC STREAM=PRODUCT2, RATE(WT), VALUE=5000

2. FRACTIONAL SPLIT:
   
   Format:
     SPEC STREAM=sid, RATE, DIVIDE, REFFEED, VALUE=fraction
   
   REFFEED = reference to combined feed
   VALUE = fraction (0.0 to 1.0)
   
   Example:
     SPEC STREAM=PROD1, RATE, DIVIDE, REFFEED, VALUE=0.85
     
   Takes 85% of combined feed to PROD1
   Remaining 15% goes to other product(s)

3. COMPONENT RATE:
   
   Single component:
     SPEC STREAM=sid, COMP=i, RATE, VALUE=value
   
   Multiple components:
     SPEC STREAM=sid, COMP=i,j,k, RATE, VALUE=value
   
   Example:
     SPEC STREAM=PROD1, COMP=3, RATE(M), VALUE=50
     SPEC STREAM=PROD2, COMP=2,3,4, RATE(WT), VALUE=1000

4. COMPONENT RECOVERY:
   
   Format:
     SPEC STREAM=sid, COMP=i, RATE, DIVIDE, &
          REFFEED, COMP=i, RATE, VALUE=fraction
   
   Specifies fraction of component(s) to product
   
   Example:
     SPEC STREAM=PURGE, COMP=5, RATE, DIVIDE, &
          REFFEED, COMP=5, RATE, VALUE=0.05
     
   Sends 5% of component 5 to PURGE
   Remaining 95% to other product

5. RATIO TO REFERENCE STREAM:
   
   Total rate ratio:
     SPEC STREAM=sid, RATE, RATIO, &
          STREAM=refid, RATE, VALUE=ratio
   
   Component ratio:
     SPEC STREAM=sid, COMP=i, RATE, RATIO, &
          STREAM=refid, COMP=i, RATE, VALUE=ratio
   
   Example:
     SPEC STREAM=PROD1, COMP=2,4, RATE, RATIO, &
          STREAM=REFERENCE, COMP=2,4, RATE, VALUE=2.0
     
   Component 2+4 in PROD1 = 2× those in REFERENCE

SPECIFICATION ORDER:
- Specifications evaluated in order of entry
- Important for OPTION=FILL (see below)
- List most critical splits first

OPERATION STATEMENT (optional):
Format: OPERATION DP(upres)=value or PRESSURE(upres)=value, &
                  OPTION=FILL or NORMALIZE

Outlet Pressure:
  
  DP (default: 0.0):
    Pressure drop below combined feed pressure
    Negative values = pressure increase
    
    Example:
      OPERATION DP(PSI)=5.0
      OPERATION DP(BAR)=-0.5  (pressure increase)
  
  PRESSURE:
    Absolute outlet pressure
    
    Example:
      OPERATION PRESSURE(PSIA)=100
      OPERATION PRESSURE(BAR)=10

OPTION Parameter (default: FILL):
  
  Controls behavior when feed insufficient for specs
  
  FILL (default):
    ✓ Satisfies specs in order until feed exhausted
    ✓ First spec encountering insufficient feed gets remainder
    ✓ Subsequent specs get zero flow
    ✓ Unspecified product gets remainder (if any)
    
    Best for:
      - Sequential priority splits
      - Critical products specified first
    
    Example:
      OPERATION OPTION=FILL
      SPEC STREAM=CRITICAL, RATE, VALUE=100    (first priority)
      SPEC STREAM=SECONDARY, RATE, VALUE=50    (second priority)
      $ TERTIARY gets remainder (unspecified)
  
  NORMALIZE:
    ✓ Satisfies ALL specs simultaneously
    ✓ Normalizes all specified flows to match feed
    ✓ Maintains relative split ratios
    ✓ Unspecified product gets zero flow
    
    Best for:
      - Maintaining split ratios
      - All products equally important
      - Component splits
    
    Example:
      OPERATION OPTION=NORMALIZE
      SPEC STREAM=PROD1, RATE, VALUE=100
      SPEC STREAM=PROD2, RATE, VALUE=50
      $ If feed only 120: PROD1=80, PROD2=40 (2:1 ratio maintained)

⚠️ OPTION=FILL vs NORMALIZE:

FILL Example (feed=120, specs sum to 150):
  SPEC 1: Request 100 → Gets 100
  SPEC 2: Request 50  → Gets 20 (remainder)
  Result: 100 + 20 = 120 ✓

NORMALIZE Example (feed=120, specs sum to 150):
  SPEC 1: Request 100 → Gets 80  (100×120/150)
  SPEC 2: Request 50  → Gets 40  (50×120/150)
  Result: 80 + 40 = 120 ✓ (ratio 2:1 maintained)

DEFINE STATEMENT (optional):
Format: DEFINE param AS unit_type=uid, param, {operator, reference}
    or: DEFINE param AS STREAM=sid, property, {operator, reference}

Only one DEFINE statement allowed
Can define: DP or PRESSURE

Operators:
  PLUS, MINUS, MULTIPLY, DIVIDE

Common uses:
  
  1. Pressure relative to another unit:
     DEFINE DP AS FLASH=FL1, DP, MINUS, 0.5
     
  2. Pressure from stream property:
     DEFINE PRESSURE AS STREAM=REFERENCE, PRES, TIMES, 0.95
     
  3. Pressure drop calculation:
     DEFINE DP AS PIPE=P1, DP, PLUS, 2.0

Example:
  OPERATION DP(PSI)=5.0
  DEFINE    DP AS FLASH=FL1, DP, MINUS, 0.5
  
  Actual DP = FL1.DP - 0.5 psi

METHOD STATEMENT (optional):
Format: METHOD SET=setid

Selects thermodynamic method when multiple methods available
Method used for adiabatic flash calculation

Example:
  METHOD    SET=SRK-HP

TYPICAL APPLICATIONS:

1. Product Distribution:
   Split reactor effluent to multiple destinations
   
   SPLITTER    UID=SP1
     FEED      REACTOR_OUT
     PRODUCT   M=TO_COLUMN, M=TO_RECYCLE
     SPEC      STREAM=TO_RECYCLE, RATE, DIVIDE, &
               REFFEED, VALUE=0.20

2. Purge Stream:
   Remove small purge from recycle loop
   
   SPLITTER    UID=SP2
     FEED      RECYCLE
     PRODUCT   M=BACK_TO_REACTOR, M=PURGE
     SPEC      STREAM=PURGE, RATE(M), VALUE=5.0

3. Component Rejection:
   Control unwanted component buildup
   
   SPLITTER    UID=SP3
     FEED      LOOP
     PRODUCT   M=RECYCLE, M=PURGE
     SPEC      STREAM=PURGE, COMP=5, RATE, DIVIDE, &
               REFFEED, COMP=5, RATE, VALUE=0.05

4. Multi-Product Distribution:
   Split to multiple process units
   
   SPLITTER    UID=SP4
     FEED      MAIN
     PRODUCT   M=TO_UNIT1, M=TO_UNIT2, M=TO_UNIT3
     SPEC      STREAM=TO_UNIT1, RATE, DIVIDE, REFFEED, VALUE=0.40
     SPEC      STREAM=TO_UNIT2, RATE, DIVIDE, REFFEED, VALUE=0.35

5. Sample Stream:
   Small sample for analysis
   
   SPLITTER    UID=SP5
     FEED      PROCESS
     PRODUCT   M=MAIN, M=SAMPLE
     OPERATION OPTION=FILL
     SPEC      STREAM=SAMPLE, RATE(M), VALUE=0.1

DESIGN GUIDELINES:

1. Specification Strategy:
   ✓ Use (N-1) specs for N products
   ✓ Leave largest product unspecified
   ✓ Order specs by priority with OPTION=FILL
   ✓ Use NORMALIZE for ratio splits

2. OPTION Selection:
   FILL when:
     - Products have priority ranking
     - Critical products must be satisfied
     - Sequential allocation preferred
   
   NORMALIZE when:
     - Split ratios must be maintained
     - All products equally important
     - Component splits involved

3. Pressure Specification:
   ✓ Default DP=0 usually acceptable
   ✓ Specify pressure if needed for downstream
   ✓ Use DEFINE for linked pressures

4. Component Splits:
   ✓ Useful for controlling buildup in recycles
   ✓ Purge stream sizing
   ✓ Recovery specifications
   ✓ Always use NORMALIZE option

5. Multiple Feeds:
   ✓ Automatically combined before split
   ✓ Lowest pressure used
   ✓ Adiabatic mixing occurs

COMMON MISTAKES:

❌ Specifying all N products (need only N-1)
❌ Using FILL with component specs (use NORMALIZE)
❌ Expecting phase separation (use FLASH instead)
❌ Sum of fractions ≠ 1.0 without NORMALIZE
❌ Forgetting outlet is adiabatic flash result

TROUBLESHOOTING:

Issue: "Insufficient feed for split"
- Reduce specified rates
- Use NORMALIZE option
- Check feed rate is adequate

Issue: "All products zero flow"
- Check feed rate > 0
- Verify pressure allows liquid/vapor
- Check component availability

Issue: "Wrong phase in products"
- Phase from adiabatic flash at outlet pressure
- Adjust outlet pressure
- Check thermodynamic method

Issue: "Unspecified product gets too much/little"
- Reorder specifications (with FILL)
- Specify that product explicitly
- Use NORMALIZE option

PARAMETERS FOR CROSS-REFERENCING:

Available in DEFINE, SPEC, VARY statements:
- DP = Pressure drop
- TEMP = Outlet temperature
- RATE = Product stream rates
- COMP rates = Component rates

Example:
  DEFINE DP AS STREAM=UPSTREAM PRES MINUS STRM=DOWNSTREAM PRES`
    },
    'PIPE': {
        description: 'Pipe - Models single or mixed-phase pressure drop and heat transfer in piping (PRO/II Manual §11.8)',
        types: [
            'Simple Line - Basic pressure drop calculation',
            'Line + Elevation - Includes elevation effects',
            'Line + Fitting - Combined line and fitting',
            'Multiple Devices - Complex piping systems (v10.2+)',
            'Line Sizing - Determines required diameter'
        ],
        parameters: {
            required: ['UID', 'FEED', 'PRODUCT', 'LINE'],
            optional: [
                'NAME',
                'LINE', 'DIAMETER', 'NPS', 'S40', 'S80', 'S10', 'S20', 'S30', 'S60', 'S80', 'S100', 'S120', 'S140', 'S160',
                'LENGTH', 'ELEVATION', 'ELEV', 'SEGMENT', 'SEGMENTS',
                'FLOWEFF', 'FRICTION', 'AROUGH', 'RROUGH',
                'DUTY', 'ISOTHERMAL', 'U', 'TAMBIENT',
                'DPCORR', 'BBM', 'OLIMENS', 'DEF', 'MB', 'GRAY', 'HB', 'PALMER',
                'DPEST', 'DPTOL', 'NOACCEL', 'BACK',
                'XOPTION', 'CONTINUE', 'STOP',
                'KFACTOR', 'KFAC', 'KMUL', 'CV',
                'PRINT', 'EXTE', 'EXTENDED',
                'SIZE', 'DPMAX', 'VMAX', 'PMIN',
                'DEFINE', 'METHOD', 'SET',
                'DPIPE', 'DREG', 'DORIFICE', 'DCHECK', 'DBEND', 'DTEE', 'DNOZZLE',
                'DENTRANCE', 'DEXIT', 'DCONTRACTION', 'DEXPANSION', 'DKFACTOR', 'DVALVE',
                'DEVSEQ', 'NUMB', 'COEFFICIENT', 'CPCV', 'CHISHOLM', 'HOMOGENEOUS',
                'LAMBDA', 'C2', 'ANGLE', 'RADIUS', 'STANDARD', 'NONSTANDARD', 'BRANCH'
            ]
        },
        example: `$ Example 1: Simple horizontal pipe
PIPE        UID=P01, NAME=TRANSFER LINE
  FEED      STREAM1
  PRODUCT   M=STREAM2
  LINE      DIAMETER(IN)=6, LENGTH(FT)=500, &
            AROUGH(IN)=0.0018, DPCORR=BBM

$ Example 2: Pipe with elevation change
PIPE        UID=P02, NAME=UPHILL LINE
  FEED      LOWPOINT
  PRODUCT   M=HIGHPOINT
  LINE      NPS=8, S40, LENGTH(M)=150, ELEVATION(M)=25, &
            SEGMENT=5, DPCORR=BBM

$ Example 3: Pipe with heat transfer
PIPE        UID=P03, NAME=COOLED LINE
  FEED      HOT
  PRODUCT   M=COOLED
  LINE      DIAMETER(MM)=200, LENGTH(M)=100, &
            U(W/M2-C)=50, TAMBIENT(C)=20, &
            SEGMENT=10, DPCORR=OLIMENS

$ Example 4: Line with fitting (elbow)
PIPE        UID=P04, NAME=LINE WITH ELBOW
  FEED      IN
  PRODUCT   M=OUT
  LINE      NPS=4, S40, LENGTH(FT)=200, &
            KFACTOR=0.3, DPCORR=BBM

$ Example 5: Line sizing calculation
PIPE        UID=P05, NAME=SIZE DETERMINATION
  FEED      FLUID
  PRODUCT   M=OUTLET
  SIZE      DPMAX(PSI)=5.0, VMAX(FT/S)=20, &
            DIAMETER(IN)=2/3/4/6/8/10/12
  LINE      LENGTH(FT)=1000, ELEVATION(FT)=50`,
        notes: `⚠️ UID is REQUIRED (unique identifier).
📖 Reference: PRO/II Keyword Manual Section 11.8

GENERAL DESCRIPTION:
- Calculates single or mixed-phase pressure drop in piping
- Can size line for given pressure drop or velocity
- Handles horizontal, vertical, uphill, downhill configurations
- Supports heat transfer (external duty, ambient cooling, isothermal)
- Can model line alone, fitting alone, or line + fitting
- Multiple devices feature for complex piping systems (v10.2+)

KEY CAPABILITIES:
✓ Single-phase (vapor or liquid) flow
✓ Two-phase (vapor-liquid) flow
✓ Three-phase (vapor-liquid-liquid) with VLLE
✓ Elevation effects (hydrostatic head)
✓ Heat transfer (duty, ambient cooling, isothermal)
✓ Segmented calculations for accuracy
✓ Multiple pressure drop correlations
✓ Line sizing mode

FEED/PRODUCT STATEMENTS (required):
Format: FEED sid1, sid2, ...
        PRODUCT phase=sid, {W=sid, S=sid}

Phase options:
  V = Vapor product only
  L = Liquid product only
  M = Mixed (vapor + liquid)
  W = Decanted water (VLLE systems)
  S = Solids (separate solid product)

Multiple feeds allowed (mixed before entering pipe)

LINE STATEMENT (required):
Format: LINE DIAMETER(ufleng)=value or NPS=size,schedule, &
            LENGTH(uleng)=value, {ELEVATION(uleng)=0.0}, &
            {SEGMENT=1}, {configuration options}

DIAMETER vs NPS:

1. DIAMETER (direct specification):
   Format: DIAMETER(unit)=value
   
   Units: IN, FT, MM, CM, M
   Range: Up to 144 inches (3.66 m) equivalent
   
   Example:
     DIAMETER(IN)=6.065
     DIAMETER(MM)=154.0

2. NPS (Nominal Pipe Size):
   Format: NPS=size, schedule
   
   Standard sizes (inches):
     0.125, 0.25, 0.375, 0.5, 0.75
     1.0, 1.25, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 5.0, 6.0, 8.0
     10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36
   
   Schedules:
     S10, S20, S30, S40 (default), S60, S80, S100, S120, S140, S160
   
   Example:
     NPS=6, S40          (6-inch schedule 40)
     NPS=8, S80          (8-inch schedule 80)
     NPS=4               (4-inch schedule 40, default)

LENGTH (required):
Format: LENGTH(uleng)=value

Maximum: 3,280,000 ft (~621 miles / ~1000 km) equivalent

Units: FT, M, KM, MILE

Example:
  LENGTH(FT)=500
  LENGTH(M)=150

ELEVATION (optional, default: 0.0):
Format: ELEVATION(uleng)=value

Elevation change from inlet to outlet:
  Positive = Uphill (pressure increases due to hydrostatic head)
  Negative = Downhill (pressure decreases)
  Zero = Horizontal

Cannot exceed LENGTH

Example:
  ELEVATION(FT)=50           (50 ft rise)
  ELEVATION(M)=-10           (10 m drop)

SEGMENT (optional, default: 1):
Format: SEGMENT=value or SEGMENTS=value

Number of equal-length segments for calculation
Range: 1 to 200

Recommendation:
  ✓ Use segments ≤ 10,000 ft (3,000 m)
  ✓ More segments = more accurate but slower
  ✓ Long pipes: 5-20 segments
  ✓ Short pipes: 1-3 segments
  ✓ Steep elevation: More segments

Auto-segmentation:
  If convergence fails, PRO/II automatically increases segments ×5

Example:
  SEGMENT=10

ROUGHNESS (optional):
Format: AROUGH(ufleng)=value (absolute roughness)
    or: RROUGH=value (relative roughness, dimensionless)

Default: AROUGH=0.0018 inch

Common values (absolute roughness):
  Commercial steel: 0.0018 in (0.046 mm) - DEFAULT
  Drawn tubing: 0.000005 in (0.0013 mm)
  PVC/plastic: 0.000007 in (0.002 mm)
  Concrete: 0.01-0.1 in (0.3-3 mm)
  Rusty steel: 0.04 in (1 mm)

Example:
  AROUGH(IN)=0.0018
  AROUGH(MM)=0.046
  RROUGH=0.00015

FLOWEFF (optional, default: 100%):
Format: FLOWEFF(PCT)=value

Flow efficiency percentage
Adjusts pressure drop linearly:
  100% = Normal (no adjustment)
  < 100% = Higher pressure drop (fouling, restrictions)
  > 100% = Lower pressure drop

Example:
  FLOWEFF(PCT)=85    (15% fouling penalty)

⚠️ Prefer AROUGH or FRICTION over FLOWEFF for calibration

FRICTION (optional):
Format: FRICTION=value

User-supplied Moody friction factor (dimensionless)
Overrides automatic friction factor calculation

If not specified:
  Calculated using Colebrook-White equation
  Initial value from Jain equation

Example:
  FRICTION=0.020

HEAT TRANSFER OPTIONS (mutually exclusive):

1. External Duty:
   Format: DUTY(uduty)=value
   
   Millions of energy/time units
   Positive = Heating
   Negative = Cooling
   Divided equally among segments
   
   Example:
     DUTY(MMBTU/HR)=2.5
     DUTY(KW)=-500

2. Isothermal Operation:
   Format: ISOTHERMAL
   
   Maintains constant temperature
   No pressure-temperature interaction
   
   Example:
     LINE ... ISOTHERMAL

3. Ambient Heat Transfer:
   Format: U(uhtco)=value, TAMBIENT(utemp)=value
   
   U = Overall heat transfer coefficient
   TAMBIENT = Ambient temperature
   
   Heat loss/gain calculated from:
     Q = U × A × (T_fluid - T_ambient)
   
   Example:
     U(BTU/HR-FT2-F)=5, TAMBIENT(F)=80
     U(W/M2-C)=25, TAMBIENT(C)=20

PRESSURE DROP CORRELATION (optional):
Format: DPCORR=method

Available methods:

1. BBM (default) - Beggs-Brill-Moody:
   Best for:
     ✓ General purpose
     ✓ Horizontal and inclined pipes
     ✓ Two-phase flow
     ✓ Oil and gas pipelines
   
   Most widely used correlation

2. OLIMENS:
   Best for:
     ✓ Vertical pipes
     ✓ Two-phase flow
     ✓ High gas content
   
3. DEF - Dukler-Eaton-Flanigan:
   Best for:
     ✓ Horizontal pipes
     ✓ Two-phase flow
   
4. MB - Mukherjee-Brill:
   Best for:
     ✓ Inclined pipes
     ✓ Two-phase flow
     ✓ Severe slugging

5. GRAY:
   Best for:
     ✓ Vertical pipes
     ✓ Gas wells
     ✓ Gas condensate systems

6. HB - Hagedorn-Brown:
   Best for:
     ✓ Vertical pipes
     ✓ Oil wells
     ✓ Heavy oils

7. PALMER:
   BBM with Palmer holdup modification
   Best for:
     ✓ High-pressure gas systems

Selection guidelines:
  - Horizontal: BBM, DEF
  - Vertical up: OLIMENS, GRAY, HB
  - Vertical down: BBM, OLIMENS
  - Inclined: BBM, MB
  - Gas condensate: GRAY, PALMER
  - General: BBM (default)

Example:
  DPCORR=BBM
  DPCORR=OLIMENS

CONVERGENCE PARAMETERS (optional):

DPEST (default: 0.0):
  Format: DPEST(upres)=value
  
  Initial pressure drop estimate
  Helps convergence for difficult cases
  
  Example:
    DPEST(PSI)=10

DPTOL (default: 1.0):
  Format: DPTOL=value
  
  Pressure drop convergence tolerance
  Relative tolerance (%)
  
  Example:
    DPTOL=0.5

CALCULATION OPTIONS:

NOACCEL:
  Format: NOACCEL
  
  Ignores acceleration pressure drop
  Use for low-velocity flows
  
  Example:
    LINE ... NOACCEL

BACK:
  Format: BACK
  
  Backward calculation mode
  Calculates inlet from outlet
  Heat duty sign reverses
  
  Example:
    LINE ... BACK

XOPTION (default: CONTINUE):
  Format: XOPTION=CONTINUE or STOP
  
  CONTINUE: Continues if pressure < 0
  STOP: Stops if pressure < 0
  
  Example:
    XOPTION=STOP

FITTING CALCULATIONS:

Add fitting to line:
  Format: KFACTOR=value
  
  KFACTOR = Resistance coefficient (dimensionless)
  Fitting assumed after line
  Heat transfer only in line portion
  
  Common K-factors:
    Globe valve (open): 10
    Gate valve (open): 0.2
    90° elbow: 0.9
    45° elbow: 0.4
    Tee (straight): 0.6
    Tee (branch): 1.8
    Entrance (sharp): 0.5
    Exit: 1.0
  
  Example:
    LINE ... KFACTOR=0.9    (90° elbow)

Alternative fitting specs:
  KMUL = Multiplier for calculated K
  KFAC = K-factor
  CV = Control valve coefficient
  
  Example:
    LINE ... CV=50

LINE SIZING MODE (optional):

SIZE statement (replaces fixed diameter):
  Format: SIZE DPMAX(upres)=value, {VMAX(uvelo)=value}, &
              {PMIN(upres)=value}, &
              DIAMETER(unit)=d1/d2/d3/... or NPS=size/size/...
  
  PRO/II selects smallest diameter meeting all criteria:
    - Pressure drop ≤ DPMAX
    - Velocity ≤ VMAX (if specified)
    - Outlet pressure ≥ PMIN (if specified)
  
  Example:
    SIZE DPMAX(PSI)=5, VMAX(FT/S)=20, &
         DIAMETER(IN)=2/3/4/6/8/10

MULTIPLE DEVICES (v10.2+):

Complex piping systems with combinations of:
  - DPIPE - Pipe segment
  - DREG - Pressure regulator
  - DORIFICE - Orifice plate
  - DCHECK - Check valve
  - DBEND - Pipe bend/elbow
  - DTEE - Tee junction
  - DNOZZLE - Nozzle
  - DENTRANCE - Entrance
  - DEXIT - Exit
  - DCONTRACTION - Reducer
  - DEXPANSION - Expander
  - DKFACTOR - Generic K-factor
  - DVALVE - Control valve

Format: Device UID=uid, DEVSEQ=sequence, {device parameters}

Example:
  DPIPE UID=P1, DEVSEQ=1, NPS=6, S40, LENGTH(FT)=100
  DBEND UID=B1, DEVSEQ=2, NPS=6, S40, STANDARD=90
  DPIPE UID=P2, DEVSEQ=3, NPS=6, S40, LENGTH(FT)=50

DEFINE STATEMENT (optional):
Format: DEFINE param AS unit_type=uid, param, {operator, value}
    or: DEFINE param AS STREAM=sid, property, {operator, value}

Can define:
  - DIAMETER
  - LENGTH
  - ELEVATION
  - DUTY
  - U (heat transfer coefficient)
  - TAMBIENT

Example:
  DEFINE DUTY AS STRM=INLET ENTHALPY MINUS STRM=OUTLET ENTHALPY
  DEFINE LENGTH AS 1000.0

METHOD STATEMENT (optional):
Format: METHOD SET=setid

Selects thermodynamic method for:
  - Property calculations (density, viscosity, surface tension)
  - Phase equilibrium (two-phase flow)

Important:
  ⚠️ Must specify transport property method in THERMODYNAMIC DATA
  ⚠️ Viscosity required for pressure drop
  ⚠️ Surface tension required for two-phase flow

Example:
  METHOD SET=SRK-HP

PRINT OPTIONS (optional):
Format: PRINT EXTE or EXTENDED

EXTE: Extended output
  - Segment-by-segment results
  - Properties along pipe
  - Pressure profile
  - Temperature profile
  - Phase behavior

Example:
  LINE ... PRINT=EXTE

TYPICAL APPLICATIONS:

1. Transfer Lines:
   Simple pressure drop between units
   
   PIPE    UID=XFER
     FEED  FROM_UNIT
     PRODUCT M=TO_UNIT
     LINE  NPS=6, S40, LENGTH(FT)=200

2. Pumped Lines:
   Discharge piping from pump
   
   PIPE    UID=DISCHARGE
     FEED  PUMP_OUT
     PRODUCT L=DEST
     LINE  NPS=4, S40, LENGTH(M)=50, ELEVATION(M)=10, SEGMENT=5

3. Cooled Lines:
   Pipe with ambient heat loss
   
   PIPE    UID=COOLER
     FEED  HOT
     PRODUCT M=COLD
     LINE  NPS=8, S40, LENGTH(M)=100, &
           U(W/M2-C)=25, TAMBIENT(C)=20, SEGMENT=10

4. Vertical Riser:
   Significant elevation change
   
   PIPE    UID=RISER
     FEED  BOTTOM
     PRODUCT M=TOP
     LINE  NPS=6, S40, LENGTH(FT)=500, ELEVATION(FT)=450, &
           SEGMENT=20, DPCORR=OLIMENS

5. Line Sizing:
   Determine required diameter
   
   PIPE    UID=DESIGN
     FEED  FLOW
     PRODUCT M=OUT
     SIZE  DPMAX(PSI)=10, VMAX(FT/S)=15, &
           DIAMETER(IN)=2/3/4/6/8/10/12
     LINE  LENGTH(FT)=1000, ELEVATION(FT)=20

DESIGN GUIDELINES:

1. Segmentation:
   ✓ Long pipes (>1000 ft): Use 5-20 segments
   ✓ Elevation change: More segments
   ✓ Two-phase: 10-20 segments
   ✓ Single-phase: 1-5 segments

2. Correlation Selection:
   ✓ Start with BBM (default)
   ✓ Vertical: Try OLIMENS or GRAY
   ✓ Compare results from multiple methods
   ✓ Calibrate with field data if available

3. Heat Transfer:
   ✓ Long lines: Use U and TAMBIENT
   ✓ Insulated: U = 0.1-5 Btu/hr-ft²-°F
   ✓ Uninsulated: U = 5-50 Btu/hr-ft²-°F
   ✓ Buried: U = 1-10 Btu/hr-ft²-°F

4. Pressure Drop:
   ✓ Liquid: Typically 0.5-5 psi/100 ft
   ✓ Gas: Typically 0.1-2 psi/100 ft
   ✓ Two-phase: Highly variable

5. Velocity Limits:
   ✓ Liquid: < 10 ft/s (erosion concern)
   ✓ Gas: < 100 ft/s (noise, erosion)
   ✓ Two-phase: < 50 ft/s

COMMON MISTAKES:

❌ Forgetting SEGMENT for long pipes
❌ Using BBM for vertical pipes (use OLIMENS)
❌ Not specifying transport properties
❌ Ignoring elevation in pressure drop
❌ Too few segments for two-phase
❌ Using DIAMETER and NPS together
❌ ELEVATION > LENGTH

TROUBLESHOOTING:

Issue: "Convergence failure"
- Increase SEGMENT count
- Provide DPEST estimate
- Try different DPCORR
- Check transport properties defined

Issue: "Negative outlet pressure"
- Increase inlet pressure
- Use XOPTION=CONTINUE
- Reduce LENGTH or ELEVATION
- Increase DIAMETER

Issue: "Pressure drop too high"
- Increase DIAMETER
- Reduce LENGTH
- Reduce ELEVATION (if uphill)
- Check AROUGH (fouling?)
- Verify FLOWEFF=100%

Issue: "Results unrealistic"
- Check DPCORR appropriate for configuration
- Verify property methods defined
- Check phase behavior (single vs two-phase)
- Increase SEGMENT count

Issue: "Wrong phase at outlet"
- Check pressure drop magnitude
- Verify thermodynamic method
- Check heat transfer effects
- May need flash downstream

PARAMETERS FOR CROSS-REFERENCING:

Available in DEFINE, SPEC, VARY:
- DP = Pressure drop (psi or equivalent)
- POUT = Outlet pressure
- TEMP = Outlet temperature
- VFRAC = Outlet vapor fraction
- DUTY = Heat duty
- DPCALC = Calculated pressure drop

Example:
  DEFINE DP AS PIPE=P1, DP, PLUS, 5.0`
    },
    'REACTOR': {
        description: 'Reactor - Models chemical reactions with specified conversion or kinetics',
        types: [
            'Conversion - Simple conversion-based reactor',
            'Equilibrium - Equilibrium reactions',
            'Kinetic - Detailed kinetics with rate equations',
            'Gibbs - Gibbs free energy minimization'
        ],
        parameters: {
            required: ['FEED', 'PROD', 'REAC'],
            optional: ['NAME', 'TEMP', 'PRES', 'DUTY', 'VOL', 'RES']
        },
        example: `REACTOR
    NAME=R-101
    FEED=S1
    PROD=S2
    TEMP=250(C)
    PRES=5.0(BAR)
    REAC=CONV(1)=0.95`,
        notes: 'REAC defines reaction specifications. Multiple reactions can be specified. Conversion is per reaction basis.'
    },
    'ABSORBER': {
        description: 'Absorber - Gas absorption column where liquid absorbs gas components',
        parameters: {
            required: ['NSTAGE', 'FEED', 'PROD'],
            optional: ['NAME', 'PRES', 'DELP', 'SPEC', 'ABSTYPE']
        },
        example: `ABSORBER
    NAME=ABS-101
    NSTAGE=15
    FEED=GAS(1), SOLV(15)
    PROD=BTMS=RICH, OVHD=LEAN
    PRES=10(BAR)`,
        notes: 'Feed stage numbers in parentheses. Gas feed typically at bottom (high stage number), solvent at top (stage 1).'
    },
    'STRIPPER': {
        description: 'Stripper - Removes light components from liquid using vapor stripping',
        parameters: {
            required: ['NSTAGE', 'FEED', 'PROD'],
            optional: ['NAME', 'PRES', 'DELP', 'REB', 'SPEC']
        },
        example: `STRIPPER
    NAME=STR-101
    NSTAGE=10
    FEED=S1(5)
    PROD=BTMS=LEAN, OVHD=RICH
    PRES=2.0(BAR)
    REB=KETTLE`,
        notes: 'Often has reboiler to generate stripping vapor. Stage 1 is top, highest stage number is bottom.'
    },
    'EXTRACT': {
        description: 'Liquid-Liquid Extractor - Separates components using selective solvent',
        types: [
            'Mixer-Settler - Multiple mixing and settling stages',
            'Column - Counter-current extraction column'
        ],
        parameters: {
            required: ['NSTAGE', 'FEED', 'SOLV', 'PROD'],
            optional: ['NAME', 'TEMP', 'PRES', 'SPEC']
        },
        example: `EXTRACT
    NAME=EXT-101
    NSTAGE=8
    FEED=S1(4)
    SOLV=S2(1)
    PROD=EXTRACT=E1, RAFFINATE=R1
    TEMP=25(C)`,
        notes: 'SOLV is solvent stream. EXTRACT is solvent-rich phase, RAFFINATE is feed-rich phase. Requires liquid-liquid equilibrium.'
    },
    'EQUREACTOR': {
        description: 'Equilibrium Reactor - Simultaneous reactions based on equilibrium, stoichiometry, and approach to equilibrium (PRO/II Manual §14.1)',
        types: [
            'Stoichiometric (STOIC) - User-defined reactions with stoichiometry from RXDATA',
            'Shift Reactor (SHIFT) - Built-in CO + H2O ⇌ CO2 + H2 reaction',
            'Methanator (METHANATION) - Built-in methanation and shift reactions',
            'Isothermal - Fixed temperature with duty calculation',
            'Adiabatic - Temperature from energy balance with optional duty'
        ],
        parameters: {
            required: ['UID', 'FEED', 'PRODUCT'],
            optional: [
                'NAME', 'OPERATION', 'ISOTHERMAL', 'ADIABATIC', 'TEMPERATURE', 'TEMP', 'DTFEED',
                'PRESSURE', 'DP', 'DUTY', 'TMAX', 'TMIN', 'PHASE', 'TOLERANCE',
                'RXCALC', 'MODEL', 'NOHBALANCE', 'CONCENTRATION', 'PARTIALPRESSURE', 'ACTIVITY',
                'FUGACITY', 'MOLEFRACTION', 'REFSTATE',
                'RXSTOIC', 'RXSET',
                'REACTION', 'BASE', 'COMPONENT', 'EQUILIBRIUM', 'APPROACH', 'FRACTION', 'DT',
                'DEFINE', 'METHOD', 'PRINT', 'PATH'
            ]
        },
        example: `$ Example 1: Water-gas reaction at equilibrium
EQUREACTOR  UID=RX1
  FEED      1,3
  PRODUCT   V=4
  OPERATION PHASE=V, TEMPERATURE=1530, ISOTHERMAL
  RXCALC    MODEL=STOIC
  RXSTOIC   RXSET=1
  REACTION  1
  BASE      COMPONENT=2

$ Example 2: Shift reactor with approach
EQUREACTOR  UID=S1, NAME=SHIFT ONLY
  FEED      F1
  PROD      V=V1
  OPERATION PRESSURE(PSIA)=90, TEMPERATURE(F)=600
  RXCALC    MODEL=SHIFT
  REACTION  SHIFT
  APPROACH  DT=50

$ Example 3: Adiabatic methanator
EQUREACTOR  UID=M1, NAME=FIRST STAGE
  FEED      1
  PRODUCT   V=V1
  RXCALC    MODEL=METHANATION
  OPERATION ADIABATIC
  REACTION  METHANATION
  APPROACH  FRACTION=0.90
  REACTION  SHIFT
  APPROACH  FRACTION=0.80`,
        notes: `UID is REQUIRED (unique identifier).

══════════════════════════════════════════════════════════════════════════════
OPERATION STATEMENT (THERMAL AND PRESSURE SPECIFICATIONS)
══════════════════════════════════════════════════════════════════════════════

THERMAL MODE (choose ONE):

  ISOTHERMAL (default)
    - Fixed outlet temperature
    - Duty calculated from heat balance
    - Use with TEMPERATURE or DTFEED
    
  ADIABATIC
    - Outlet temperature calculated
    - Fixed enthalpy (zero duty unless specified)
    - Optional DUTY specification
    - Optional TMAX/TMIN limits

TEMPERATURE SPECIFICATION:

  TEMPERATURE(utemp) = value
    - Fixed outlet temperature (ISOTHERMAL mode)
    - Alternative: TEMP
    
  DTFEED(utemp) = value (default 0.0)
    - Temperature rise above combined feed
    - Used with ISOTHERMAL mode
    
  Default: ISOTHERMAL at DTFEED=0.0 (feed temperature)

PRESSURE SPECIFICATION:

  PRESSURE(upres) = value
    - Absolute outlet pressure
    - Alternative: PRES
    
  DP(upres) = value (default 0.0)
    - Pressure drop below combined feed pressure
    - Must be positive

OTHER OPERATION ENTRIES:

  DUTY(uduty) = value (ADIABATIC only, default 0.0)
    - External heat transfer (millions of energy units/time)
    - Positive = heat input
    - Negative = heat removal
    
  TMAX(K) = 3000 (ADIABATIC only)
    - Maximum temperature limit
    - Warning if exceeded
    
  TMIN(K) = 1.0 (ADIABATIC only)
    - Minimum temperature limit
    - Warning if violated
    
  PHASE = L or V (default L)
    - Reaction phase for equilibrium constants
    - L = Liquid phase reaction
    - V = Vapor phase reaction
    - ⚠️ Mixed phase equilibrium not supported
    
  TOLERANCE = 0.001
    - Relative error tolerance for duty
    - Internal calculation convergence

══════════════════════════════════════════════════════════════════════════════
RXCALC STATEMENT (MODEL SELECTION AND CALCULATION OPTIONS)
══════════════════════════════════════════════════════════════════════════════

MODEL = STOIC or SHIFT or METHANATION (default STOIC)

  STOIC (default)
    - General reactor with user-defined stoichiometry
    - Requires RXSTOIC with RXSET specification
    - Reactions from RXDATA section
    
  SHIFT
    - Built-in shift reaction: CO + H2O ⇌ CO2 + H2
    - CO is fixed base component
    - Optional EQUILIBRIUM and APPROACH
    - National Bureau of Standards K eq data (default)
    
  METHANATION
    - Built-in methanation: CO + 3H2 ⇌ CH4 + H2O
    - Built-in shift reaction: CO + H2O ⇌ CO2 + H2
    - Simultaneous equilibrium of both reactions
    - CO is fixed base component
    - Requires: CH4, CO, CO2, H2O, H2 in component list
    - NBS default equilibrium data

NOHBALANCE (ISOTHERMAL only)
  - Prevents heat balance calculation
  - No duty computed
  - Must define outlet temperature with TEMP or DEFINE
  - PATH print option ignored

ACTIVITY BASIS (rate equations):

  CONCENTRATION (default for liquid)
    - Molar concentration basis
    
  PARTIALPRESSURE (vapor only)
    - Partial pressure basis
    
  ACTIVITY (liquid only)
    - Activity coefficient basis
    
  FUGACITY
    - Fugacity basis (vapor or liquid)
    
  MOLEFRACTION
    - Mole fraction basis

REFSTATE = IDEA or ONEA (enthalpy reference state)

  IDEA (default)
    - Ideal gas at 298.15 K and 1 atm
    
  ONEA
    - Reference pressure basis per thermo set
    - Vapor: 298.15 K & 1 atm
    - Liquid: 298.15 K & reactor outlet pressure

══════════════════════════════════════════════════════════════════════════════
RXSTOIC STATEMENT (REACTION SET SPECIFICATION)
══════════════════════════════════════════════════════════════════════════════

RXSTOIC RXSET = setid (MODEL=STOIC only, REQUIRED)

  - Identifies reaction set from RXDATA section
  - All reactions in set included
  - Reaction order follows RXDATA definition
  - Not allowed for SHIFT or METHANATION models

══════════════════════════════════════════════════════════════════════════════
REACTION STATEMENT (INDIVIDUAL REACTION SPECIFICATIONS)
══════════════════════════════════════════════════════════════════════════════

REACTION rxid or SHIFT or METHANATION

  For STOIC model:
    - rxid = reaction ID from RXDATA section
    - Followed by BASE, EQUILIBRIUM, APPROACH statements
    
  For SHIFT model:
    - REACTION SHIFT (optional)
    - Followed by optional EQUILIBRIUM, APPROACH
    
  For METHANATION model:
    - REACTION METHANATION (optional)
    - REACTION SHIFT (optional)
    - Each followed by optional EQUILIBRIUM, APPROACH

BASE COMPONENT = i (STOIC only)

  - Specifies base component for conversion report
  - Must be reactant (not product)
  - Must be present in reactor feed
  - Default: Base component from RXDATA heat of reaction

EQUILIBRIUM (utemp, upres, uwt, uliqvol) A=value, B=value, C=value, D=value, E=value, F=value, G=value, H=value

  - Defines equilibrium constant vs temperature
  - Keq = exp(A + B/T + C·ln(T) + D·T + E·T² + F·T³ + G·T⁴ + H·T⁵)
  - T in absolute units (K or R)
  - Required for STOIC if not in RXDATA
  - Optional for SHIFT/METHANATION (NBS defaults)
  - At least one coefficient required
  
  Keq dimensions:
    - Liquid phase: Dimensionless
    - Vapor phase: (pressure unit)^n where n=(products)-(reactants)
    - SHIFT: Dimensionless
    - METHANATION: (pressure unit)^(-2)

APPROACH (equilibrium approach specification):

  DT(utemp) = value
    - Temperature approach method
    - For endothermic: T = Treaction - ΔT
    - For exothermic: T = Treaction + ΔT
    - Keq evaluated at adjusted temperature
    
  FRACTION(utemp) = C0, C1, C2
    - Fractional approach to equilibrium
    - APP = C0 + C1·T + C2·T²
    - APP = (CB - CF)/(CE - CF)
    - CB = conversion of base
    - CF = feed moles
    - CE = equilibrium moles
    - Range: 0.0 (no reaction) to 1.0 (full equilibrium)
    - Default: C0=1.0, C1=0.0, C2=0.0 (full equilibrium)
    - Typical: C0=0.3 to 0.9 for kinetic limitations

══════════════════════════════════════════════════════════════════════════════
DEFINE STATEMENT
══════════════════════════════════════════════════════════════════════════════

DEFINE <param> AS <unit type>=uid, <param>, {<op>, <ref>}
DEFINE <param> AS STREAM=sid, <param>, {<op>, <ref>}

Allowed <param>: PRESSURE, DP, TEMPERATURE, DUTY

Multiple DEFINE statements allowed

══════════════════════════════════════════════════════════════════════════════
METHOD STATEMENT
══════════════════════════════════════════════════════════════════════════════

METHOD SET = setid

  Selects thermodynamic method set for this reactor

══════════════════════════════════════════════════════════════════════════════
PRINT OPTIONS
══════════════════════════════════════════════════════════════════════════════

PRINT PATH

  Prints trace of reaction path for heat of reaction calculation

══════════════════════════════════════════════════════════════════════════════
BUILT-IN REACTIONS
══════════════════════════════════════════════════════════════════════════════

SHIFT REACTION:
  CO + H2O ⇌ CO2 + H2
  - Keq dimensionless
  - NBS default equilibrium data
  - CO fixed as base component

METHANATION REACTION:
  CO + 3H2 ⇌ CH4 + H2O
  - Keq in (pressure unit)^(-2)
  - NBS default equilibrium data
  - CO fixed as base component
  - Shift reaction always included

Required components for METHANATION model:
  - CH4 (methane)
  - CO (carbon monoxide)
  - CO2 (carbon dioxide)
  - H2O (water)
  - H2 (hydrogen)

══════════════════════════════════════════════════════════════════════════════
TYPICAL APPLICATIONS AND DESIGN GUIDELINES
══════════════════════════════════════════════════════════════════════════════

COMMON APPLICATIONS:
  - Water-gas shift reactors
  - Methanation reactors
  - Steam reforming equilibrium
  - Ammonia synthesis equilibrium
  - Methanol synthesis equilibrium
  - Fischer-Tropsch equilibrium

APPROACH FRACTION GUIDELINES:
  High temperature favored:
    - Approach → 1.0 (near equilibrium)
    - Fast kinetics at high T
    
  Low temperature favored:
    - Approach < 0.5 (kinetic limitations)
    - Slow kinetics at low T
    
  Catalyst activity:
    - Fresh catalyst: APP = 0.8-0.95
    - Aged catalyst: APP = 0.3-0.7
    - Deactivated: APP = 0.1-0.3

ISOTHERMAL VS ADIABATIC:
  ISOTHERMAL:
    - Fixed temperature control
    - Duty calculated
    - Typical for jacketed reactors
    - Good for exothermic reactions
    
  ADIABATIC:
    - No external heat transfer (unless DUTY specified)
    - Temperature calculated
    - Typical for large fixed-bed
    - Exothermic → Temperature rise
    - Endothermic → Temperature drop

⚠️ IMPORTANT NOTES:
  - UID is REQUIRED
  - Equilibrium constants valid only in specified PHASE
  - Mixed phase equilibrium not supported
  - NOHBALANCE with ISOTHERMAL prevents duty calculation
  - STOIC model requires RXSTOIC with RXSET
  - SHIFT/METHANATION use built-in data
  - Approach fraction 0.0-1.0 range
  - Temperature approach DT sign depends on endothermic/exothermic

💡 ENGINEERING TIPS:
  - Use APPROACH FRACTION for catalyst activity effects
  - Use DT approach for temperature-sensitive equilibrium
  - ISOTHERMAL good for heat-transfer controlled systems
  - ADIABATIC good for adiabatic fixed beds
  - VLLE supported for two liquid phases
  - Check equilibrium at reaction temperature
  - Verify base component is reactant
  - Use appropriate activity basis for phase
  - METHANATION model includes shift automatically
  - Consider multi-stage with interstage cooling for large ΔT
  - Steam reforming
  - Hydrogenation reactions at equilibrium`
    },
    'RXGIBBS': {
        description: 'Gibbs Reactor - Gibbs free energy minimization for chemical equilibrium (PRO/II Manual §14.3)',
        types: [
            'No Stoichiometry Required - Finds equilibrium automatically',
            'Single Phase - Vapor, liquid, or specified phase',
            'Mixed Phase - Determines phase split (default)',
            'With Constraints - Restrict components, rates, conversions',
            'Temperature Approach - Equilibrium at T±ΔT'
        ],
        parameters: {
            required: ['UID', 'FEED', 'PRODUCT'],
            optional: [
                'NAME', 'PROD', 'V', 'L', 'M', 'W', 'S',
                'OPERATION', 'OPER',
                'PHASE', 'M', 'V', 'L', 'VL', 'LL', 'VLL',
                'PRESSURE', 'PRES', 'DP',
                'TEMPERATURE', 'TEMP',
                'ISOTHERMAL', 'ISOT',
                'ADIABATIC', 'ADIA', 'DUTY',
                'TMAX', 'TMIN',
                'PARAMETER',
                'MAXTRIALS', 'TOLERANCE', 'FIBTOL',
                'PROFLAG', 'PHYSPROP', 'DTOL',
                'TRIAL',
                'START', 'FREQUENCY', 'INITIALPHASE', 'ELIMINATE',
                'ELEMENTS',
                'REACTANTS', 'COMPONENTS', 'NAMES',
                'CONVERSION',
                'APPROACH', 'RATE', 'PERCENT',
                'RXSTOIC', 'RXSET',
                'REACTION', 'DT', 'EXTENT',
                'DEFINE', 'METHOD'
            ]
        },
        example: `$ Example 1: Simple Gibbs reactor (no stoichiometry needed)
GIBBS       UID=G1, NAME=SHIFT CONV
  FEED      1, 3
  PRODUCT   V=5

$ Example 2: Adiabatic with heat removal
GIBBS       UID=G2, NAME=METHANATION
  FEED      7
  PRODUCT   V=9
  OPERATION ADIABATIC, DUTY(BTU/H)=-380, &
            TEMPERATURE(F)=650, PRESSURE(PSIA)=90
  CONVERSION APPROACH(F)=-20
  ELEMENTS  REACTANTS=1,4000/2,50/3,200/4,100/5,6000

$ Example 3: Combustor with inert nitrogen
RXGIBBS     UID=COMB, NAME=COMBUSTOR
  FEED      FUEL, AIR
  PRODUCT   M=FLUEGAS
  OPERATION TEMPERATURE=1200, PRESSURE=1.5
  ELEMENTS  REACTANTS=1/2/3/4/5

$ Example 4: With phase specification and constraints
GIBBS       UID=G3, NAME=REFORMER
  FEED      FEED1, STEAM
  PRODUCT   V=SYNGAS, L=WATER
  OPERATION PHASE=VL, TEMPERATURE(C)=850, PRESSURE(BAR)=25
  CONVERSION PERCENT=1,95/2,80
  PARAMETER MAXTRIALS=100, TOLERANCE=0.0001`,
        notes: `⚠️ UID is REQUIRED (unique identifier).
📖 Reference: PRO/II Keyword Manual Section 14.3

GENERAL DESCRIPTION:
- Gibbs reactor finds equilibrium by minimizing Gibbs free energy
- NO reaction stoichiometry required (finds equilibrium automatically)
- Suitable for complex reaction systems with many reactions
- All components in Component Data participate unless constrained
- More rigorous than equilibrium reactor with K-values

KEY ADVANTAGE:
  Unlike EQUREACTOR which requires:
    - Reaction stoichiometry
    - Equilibrium constants or models
  
  GIBBS reactor only needs:
    - Feed composition
    - Temperature/pressure (or ADIABATIC)
    - Thermodynamic method with entropy
  
  Software determines equilibrium composition automatically!

THERMODYNAMIC REQUIREMENTS:
  Entropy method REQUIRED in thermodynamic set
  
  For PETRO/NONLIBRARY components, must supply:
    - Free energy of formation (required)
    - Heat of formation (estimated by PRO/II if not given)
  
  For SOLID components, must supply:
    - Free energy of formation
    - Heat of formation
    - Molecular formula
  
  NOT supported:
    - SOUR, GPSWATER, AMINE, KDATA K-value methods
    - User-added subroutines for K-values
    - Free-water decant (avoid for rigorous solution)

OPERATION MODES:

1. ISOTHERMAL (default):
   Format: OPERATION ISOTHERMAL, TEMPERATURE(utemp)=value
   
   Behavior:
     - Operates at specified temperature
     - Calculates duty to maintain temperature
     - Default: Feed temperature if TEMP not specified
     - DUTY, TMAX, TMIN not valid in ISOTHERMAL mode
   
   Example:
     OPERATION ISOTHERMAL, TEMPERATURE(C)=850, PRESSURE(BAR)=25

2. ADIABATIC:
   Format: OPERATION ADIABATIC, DUTY(uduty)=value, TMAX(K)=3000, TMIN(K)=1.0
   
   Behavior:
     - Calculates outlet temperature from energy balance
     - DUTY: Heat added (positive) or removed (negative)
     - Default: DUTY=0.0 (true adiabatic)
     - TMAX/TMIN: Temperature limits (adjusted via duty if exceeded)
     - Valid temperature range: 1 to 3000 K
   
   Example:
     OPERATION ADIABATIC, DUTY(MMBTU/H)=-50, TMAX(F)=1500, TMIN(F)=500

PHASE SPECIFICATION:

Format: OPERATION PHASE=designation

Phase options:
  M  = Mixed (default) - Determines phase automatically
       Simultaneous phase equilibrium + chemical equilibrium
       No warning if phase differs from expected
  
  V  = Vapor only - Calculates in vapor phase
       Flash check after convergence (warns if actual ≠ vapor)
  
  L  = Liquid only - Calculates in liquid phase
       Flash check after convergence (warns if actual ≠ liquid)
  
  VL = Vapor-liquid - Two phase system
  LL = Liquid-liquid - Two immiscible liquids
  VLL = Vapor-liquid-liquid - Three phase system

Recommendation: Use PHASE=M unless phase is definitively known

PRESSURE SPECIFICATION:

Two options (choose one):
  1. PRESSURE(upres) = Absolute outlet pressure
  2. DP(upres) = Pressure drop below feed (default DP=0.0)

Example:
  OPERATION PRESSURE(PSIA)=100
  or
  OPERATION DP(PSI)=5.0

PARAMETER STATEMENT OPTIONS:

Format: PARAMETER keyword=value, keyword=value, ...

MAXTRIALS (default: 50):
  Maximum iterations to reach convergence
  Increase for difficult convergence
  Example: PARAMETER MAXTRIALS=100

TOLERANCE (default: 1E-4 isothermal, 1E-6 adiabatic):
  Relative convergence tolerance
  Tighter tolerance = more accurate but slower
  Example: PARAMETER TOLERANCE=0.0001

FIBTOL (default: 0.01):
  Fibonacci search convergence tolerance
  Used in internal optimization algorithm

PROFLAG (default: 0 if no estimate, 2 if estimate provided):
  Starting estimate method for product rates
  0 = PRO/II default estimate
  1 = Average all feeds
  2 = Use REACTANTS entry values
  Example: PARAMETER PROFLAG=1

PHYSPROP (default: 1):
  Physical property evaluation method
  0 = Use values from previous iteration (faster)
  1 = Reevaluate at each step (more accurate)

DTOL (default: 1E-5, range: [1E-5, 1E-4)):
  Duty convergence tolerance
  Example: PARAMETER DTOL=5E-5

TRIAL STATEMENT (for PHASE=M):

Controls phase determination when phase unknown

Format: TRIAL START=6, FREQUENCY=4, INITIALPHASE=VL, ELIMINATE=1.0E-6

START (default: 6):
  Iteration number to first attempt phase split
  
FREQUENCY (default: 4):
  Iterations between phase split trials
  
INITIALPHASE (default: VL):
  Initial phase guess (VL, V, L, LL, VLL)
  
ELIMINATE (default: 1.0E-6):
  Threshold for phase existence
  Phase exists if molar ratio > ELIMINATE

Example:
  TRIAL START=10, FREQUENCY=5, INITIALPHASE=V, ELIMINATE=1E-5

ELEMENTS STATEMENT (Constraints):

Format: ELEMENTS REACTANTS(basis)=i,value/..., COMPONENTS=i,value,.../..., NAMES=text,text,...

REACTANTS:
  Restricts reaction to specified components
  Provides product rate estimates
  i = component numbers (omitted components are inert)
  value = optional product rate estimate (M or W basis)
  
  Example - Only components 1,2,3 react:
    ELEMENTS REACTANTS=1/2/3
  
  Example - With product estimates:
    ELEMENTS REACTANTS(W)=1,500/3,450/7,850, &
             REACTANTS(M)=2,23/5,12.5

COMPONENTS:
  Required only for PETRO/NONLIBRARY components
  Defines invariant atomic group composition
  i = component number
  value = stoichiometric coefficients of atomic groups
  
  Example:
    ELEMENTS NAMES=H2,O2,C, &
             COMPONENTS=1,1,0.5/2,2,,1/3,3.5,0.5,3,0.5

NAMES:
  Optional labels for atomic groups (max 21 groups)
  Makes element matrix more readable
  1-4 characters each
  Blank entries default to ELMn
  
  Example:
    ELEMENTS NAMES=H2,O2,C,N2

CONVERSION STATEMENT (Overall Constraints):

Format: CONVERSION APPROACH(utemp)=value, RATE(urate)=i,value/..., PERCENT=i,value/...

APPROACH:
  Overall temperature approach to equilibrium
  Positive = Equilibrium calculated at T + ΔT above reaction T
  Negative = Equilibrium calculated at T - ΔT below reaction T
  
  Example:
    CONVERSION APPROACH(F)=-20  $ Equilibrium at 20°F below reactor T

RATE:
  Fixed product rates for selected components
  Basis: M (molar, default) or W (weight)
  
  Example:
    CONVERSION RATE(W,LB/HR)=3,150/5,200

PERCENT:
  Fractional conversion of feed components
  Value: 0-100 percent
  
  Example:
    CONVERSION PERCENT=1,95/2,80  $ 95% conv of comp 1, 80% of comp 2

⚠️ CAUTION: Overspecification causes singular matrix error!

RXSTOIC STATEMENT (Optional Stoichiometry):

Format: RXSTOIC RXSET=setid

  While GIBBS doesn't require stoichiometry, you CAN provide it to:
    - Specify reaction extents (EXTENT)
    - Specify temperature approach per reaction (DT)
  
  Reactions must be defined in RXDATA section
  Must be linearly independent
  
  Number of reactions = Number of species - Number of effective atoms
  
  Example:
    RXSTOIC RXSET=1

REACTION STATEMENT (Optional):

Format: REACTION rxid
        APPROACH DT(utemp)=value or EXTENT(urate)=i,value

REACTION rxid:
  References reaction ID from RXDATA section
  
APPROACH DT:
  Temperature approach for this specific reaction
  Positive = Equilibrium at T + ΔT above reaction T
  
  Example:
    REACTION 1
    APPROACH DT(F)=-35

APPROACH EXTENT:
  Amount of specified component participating in reaction
  Positive = Shift toward products
  Negative = Shift toward reactants
  i = component number in this reaction
  
  Example:
    REACTION 2
    APPROACH EXTENT(W,LB/HR)=2,140  $ 140 lb/hr of component 2

⚠️ NOTE: Cannot use overall CONVERSION APPROACH with individual REACTION APPROACH DT!

DEFINE STATEMENT:

Format: DEFINE param AS STREAM=sid, param, {op, ref}
        DEFINE param AS unittype=uid, param, {op, ref}

Valid parameters: TEMPERATURE, PRESSURE, DP, DUTY

Example:
  DEFINE PRESSURE AS STREAM=FEED1, PRESSURE, PLUS, 5.0
  DEFINE TEMPERATURE AS FLASH=FL1, TEMPERATURE

TYPICAL APPLICATIONS:

1. Combustion/Oxidation:
   - Combustors, incinerators
   - Auto-determines CO/CO₂ split, NOx formation
   - Handles complex combustion chemistry
   
2. Reforming/Gasification:
   - Steam reforming, partial oxidation
   - Coal/biomass gasification
   - Syngas production
   
3. Complex Equilibria:
   - Multiple simultaneous reactions
   - Unknown reaction pathways
   - When stoichiometry is uncertain

4. High Temperature Chemistry:
   - Pyrolysis, cracking
   - Thermal decomposition
   - Product distribution unknown

COMPARISON: GIBBS vs EQUREACTOR:

Use GIBBS when:
  ✓ Many simultaneous reactions
  ✓ Reaction stoichiometry unknown or complex
  ✓ Product distribution uncertain
  ✓ High temperature with many products
  ✓ Combustion/gasification

Use EQUREACTOR when:
  ✓ Specific known reactions
  ✓ Need approach to equilibrium per reaction
  ✓ Equilibrium constants available
  ✓ Simpler reaction systems
  ✓ More control over individual reactions

DESIGN GUIDELINES:

1. Component Selection:
   - Include all possible products
   - Add trace species that may form
   - Use REACTANTS to exclude truly inert components

2. Temperature/Pressure:
   - GIBBS sensitive to T & P specification
   - Use ADIABATIC for reactor design
   - ISOTHERMAL for equilibrium composition studies

3. Convergence:
   - Start with good estimates via REACTANTS
   - Increase MAXTRIALS if needed
   - Adjust TOLERANCE for accuracy vs speed

4. Phase Behavior:
   - Use PHASE=M for unknown phase
   - Specify single phase if definitely known
   - Check output for phase warnings

5. Constraints:
   - Use sparingly - only when needed
   - Avoid overspecification
   - Start without constraints, add as needed

6. Validation:
   - Check element balance in output
   - Verify Gibbs energy is minimized
   - Compare with known equilibrium data if available

COMMON APPLICATIONS:
  - Steam methane reforming
  - Water-gas shift reaction
  - Fischer-Tropsch synthesis
  - Ammonia synthesis
  - Combustion modeling
  - Gasification
  - Pyrolysis and cracking`
    },
    'RXEQUIL': {
        description: 'Equilibrium Reactor - Alternative keyword for equilibrium reactions (same as EQUREACTOR)',
        types: [
            'Equilibrium - Reactions at equilibrium',
            'Temperature specified',
            'Heat duty specified'
        ],
        parameters: {
            required: ['UID', 'FEED', 'PROD', 'REACTION'],
            optional: ['NAME', 'TEMP', 'PRES', 'DUTY', 'APPROACH', 'METHOD']
        },
        example: `$ Water-gas shift reactor
RXEQUIL     UID=R101, NAME=WGS REACTOR
  FEED      S1
  PROD      M=S2
  TEMP      300
  PRES      3.0
  REACTION  WGS
  APPROACH  FRACTION=0.95`,
        notes: `⚠️ UID is REQUIRED (unique identifier).
Similar to EQUREACTOR. Reactions proceed to thermodynamic equilibrium.
Use APPROACH FRACTION to model approach to equilibrium (0=none, 1=full).`
    },
    'RXCONV': {
        description: 'Conversion Reactor - Reactions with specified conversion',
        parameters: {
            required: ['UID', 'FEED', 'PROD', 'REACTION'],
            optional: ['NAME', 'TEMP', 'PRES', 'DUTY', 'CONV', 'METHOD']
        },
        example: `$ Simple conversion reactor
RXCONV      UID=R101, NAME=HYDROGENATION
  FEED      S1
  PROD      M=S2
  TEMP      250
  PRES      50
  REACTION  HYDROGENATION
  CONV      (1)=0.95`,
        notes: `⚠️ UID is REQUIRED (unique identifier).
Simple conversion-based reactor. CONV(n) specifies fractional conversion of reaction n (0 to 1).
Simplest reactor model - no kinetics needed, just specify conversion.`
    },
    'PLUGFLOW': {
        description: 'Plug Flow Reactor (PFR) - Tubular reactor with kinetic rate equations (PRO/II Manual §14.4)',
        types: [
            'Thermal - Fixed temperature or temperature profile',
            'Adiabatic - Energy balance with optional duty',
            'Co-current - External heating/cooling stream in same direction',
            'Counter-current - External heating/cooling stream opposite direction',
            'Open Pipe - Pressure drop via pipe correlations',
            'Packed Bed - Catalyst bed with Ergun equation'
        ],
        parameters: {
            required: ['UID', 'FEED', 'PRODUCT', 'RXSTOIC', 'REACTION', 'KINETIC', 'OPERATION'],
            optional: [
                'NAME', 'PROD', 'V', 'L', 'M', 'W', 'S',
                'RXSET',
                'KORDER', 'COMPONENT', 'PEXP', 'ACTIVATION', 'TEXPONENT',
                'LENGTH', 'DIAMETER', 'TUBES', 'PHASE',
                'DPIN', 'PIN', 'DP', 'PRESSURE', 'POINTS',
                'THERMAL', 'TEMPERATURE',
                'ADIABATIC', 'DUTY',
                'COCURRENT', 'COUNTERCURRENT',
                'HOT', 'COLD',
                'RXCALC',
                'CONCENTRATION', 'PARTIALPRESSURE', 'ACTIVITY', 'FUGACITY',
                'RUNGEKUTTA', 'GEAR', 'LSODA',
                'NSTEPS', 'STEPSIZE', 'TOLERANCE',
                'KINETICS', 'POWERLAW', 'SUBROUTINE', 'PROCEDURE',
                'DTOL',
                'TPROFILE', 'PPROFILE', 'PROFILE',
                'PRINT', 'PATH',
                'OPENPIPE', 'DPCORR', 'DPTOL', 'FLOWEFF', 'FRICTION', 'AROUGH', 'RROUGH', 'NOACCEL',
                'PACKING', 'CATALYST', 'PDIAM', 'PORO', 'SPHE', 'PSHAPE', 'PLENGTH',
                'HTCO', 'TSTR', 'TIN', 'TOUT', 'U',
                'DEFINE', 'PDATA', 'IDATA', 'RDATA', 'SUPPLEMENT',
                'METHOD'
            ]
        },
        example: `$ Example 1: Adiabatic plug flow reactor
PLUGFLOW    UID=PFR1, NAME=TUBULAR REACTOR
  FEED      FEED1
  PRODUCT   M=PROD1
  RXSTOIC   RXSET=1
  REACTION  1
  KINETIC   COMPONENT=1, PEXP(GMOL,M3,MIN,BAR,K)=5.2E6, &
            ACTIVATION(KCAL/GMOL)=18.5, TEXPONENT=0
  KORDER    1,1/2,1
  OPERATION LENGTH(M)=15, DIAMETER(MM)=50, TUBES=100, &
            PHASE=V, ADIABATIC, DUTY(KCAL/H)=0, POINTS=20
  RXCALC    PARTIALPRESSURE, RUNGEKUTTA, NSTEPS=50

$ Example 2: Isothermal with temperature profile
PLUGFLOW    UID=PFR2, NAME=CATALYTIC REACTOR
  FEED      SYNGAS
  PRODUCT   V=PRODUCTS
  RXSTOIC   RXSET=REFORMING
  REACTION  R1
  KINETIC   COMPONENT=2, PEXP=1.5E8, ACTIVATION=25000
  OPERATION LENGTH(FT)=30, DIAMETER(IN)=3, &
            THERMAL, TEMPERATURE(F)=800, PRESSURE(PSIA)=300
  TPROFILE  (FRAC,F) 0,750/0.25,800/0.5,850/0.75,870/1.0,880
  PACKING   CATALYST PDIAM(IN)=0.25, PORO=0.4, PSHAPE=CYLINDRICAL

$ Example 3: Counter-current with external cooling
PLUGFLOW    UID=PFR3, NAME=COOLED REACTOR
  FEED      HOTFEED
  PRODUCT   M=COOLED
  RXSTOIC   RXSET=1
  REACTION  1
  KINETIC   COMPONENT=1, PEXP=2.1E7, ACTIVATION=22000
  OPERATION LENGTH(M)=20, DIAMETER(MM)=100, COUNTERCURRENT
  COLD      FEED=COOLANT, L=COOLOUT, DP(BAR)=0.5, TOUT(C)=50`,
        notes: `⚠️ UID is REQUIRED (unique identifier).
📖 Reference: PRO/II Keyword Manual Section 14.4

GENERAL DESCRIPTION:
- Tubular reactor with plug flow (no axial mixing)
- All fluid elements have equal transit time
- Kinetic rate equations required (not equilibrium)
- Power law kinetics (default) or user-supplied
- Rigorous pressure drop calculations
- Temperature profile along length

PLUG FLOW ASSUMPTIONS:
  1. No axial (longitudinal) mixing or heat transfer
  2. Equal transit time for all fluid elements
  3. Radial uniformity (perfect radial mixing)
  4. Steady-state operation

REACTOR GEOMETRY (required):

Format: OPERATION LENGTH(uleng)=value, DIAMETER(ufleng)=value, TUBES=value

LENGTH (required):
  Total effective length of reactor
  Default units: ft (ENGLISH), m (METRIC/SI)
  
DIAMETER (required):
  Inside diameter of reactor tube
  Default units: in (ENGLISH), mm (METRIC/SI)
  
TUBES (default: 1):
  Number of parallel tubes
  All tubes assumed identical
  Feed split equally among tubes

Example:
  OPERATION LENGTH(M)=15, DIAMETER(MM)=50, TUBES=100

PHASE SPECIFICATION:

Format: OPERATION PHASE=designation

Options:
  V = Vapor phase (default)
  L = Liquid phase

Example:
  OPERATION PHASE=L, LENGTH(FT)=20, DIAMETER(IN)=4

THERMAL MODES:

1. THERMAL (default):
   Format: OPERATION THERMAL, TEMPERATURE(utemp)=value
   
   Fixed temperature operation
   - Constant temperature along length
   - Or use TPROFILE for varying temperature
   - Default: Feed temperature if TEMP omitted
   - Duty calculated from energy balance
   
   Example:
     OPERATION THERMAL, TEMPERATURE(C)=450

2. ADIABATIC:
   Format: OPERATION ADIABATIC, DUTY(uduty)=value
   
   Energy balance determines outlet temperature
   - DUTY: Heat added (positive) or removed (negative)
   - Default: DUTY=0.0 (true adiabatic)
   - Heat distributed linearly along length
   - Temperature calculated from energy balance
   
   Example:
     OPERATION ADIABATIC, DUTY(MMBTU/HR)=-2.5

3. COCURRENT:
   Format: OPERATION COCURRENT
           HOT or COLD statement required
   
   External stream flows in same direction as process
   - Requires HOT or COLD statement
   - Heat transfer calculated rigorously
   - Co-current: External and process flow same direction
   
   Example:
     OPERATION COCURRENT
     HOT FEED=STEAM, V=STMOUT, TOUT(F)=350

4. COUNTERCURRENT:
   Format: OPERATION COUNTERCURRENT
           HOT or COLD statement required
   
   External stream flows opposite to process
   - Requires HOT or COLD statement
   - Counter-current: External flows opposite direction
   - Must specify external outlet temperature
   - Inlet T adjusted if needed (prints warning)
   
   Example:
     OPERATION COUNTERCURRENT
     COLD FEED=COOLANT, L=COOLOUT, TOUT(C)=80

EXTERNAL HEATING/COOLING:

Format: HOT FEED=sid, phase=sid, DP(upres)=value, TOUT(utemp)=value
        COLD FEED=sid, phase=sid, DP(upres)=value, TOUT(utemp)=value

HOT:
  External hot stream for heating
  Supplies heat to process stream
  
COLD:
  External cold stream for cooling
  Removes heat from process stream

Parameters:
  FEED = inlet stream ID
  Phase = V, L, or M for outlet
  DP = pressure drop of external stream
  PIN = inlet pressure (or DPIN for drop)
  POUT = outlet pressure
  TOUT = outlet temperature (required for COUNTERCURRENT)
  HTCO, U = heat transfer coefficient
  TSTR, TIN = external stream inlet temperature

Example:
  COLD FEED=CW, L=CWOUT, PIN(PSIA)=50, DP(PSI)=5, TOUT(F)=120, &
       HTCO, U(BTU/HR/FT2/F)=150

PRESSURE SPECIFICATION:

Three options:
  1. DPIN or PIN - Inlet pressure
  2. DP or PRESSURE - Outlet pressure or total drop
  3. PPROFILE - Pressure profile along length

DPIN or PIN:
  DPIN = Pressure drop at inlet below feed pressure
  PIN = Absolute inlet pressure
  Default: DPIN=0.0
  
  Example:
    OPERATION DPIN(PSI)=2.0

DP or PRESSURE:
  DP = Total pressure drop through reactor
  PRESSURE = Absolute outlet pressure
  Creates uniform pressure drop along length
  
  Example:
    OPERATION PRESSURE(BAR)=25
    or
    OPERATION DP(PSI)=15

PPROFILE:
  Variable pressure along reactor length
  Format: PPROFILE (basis,uleng,upres) location,pressure/...
  Basis: FRAC (0-1) or PCT (0-100)
  
  Example:
    PPROFILE (FRAC,PSI) 0,300/0.5,295/1.0,290

TEMPERATURE PROFILES:

TPROFILE:
  Format: TPROFILE (basis,uleng,utemp) location,temp/...
  Basis: FRAC (0-1) or PCT (0-100) of length
  
  Example:
    TPROFILE (FRAC,F) 0,750/0.25,800/0.5,850/0.75,870/1.0,880

PROFILE (combined T & P):
  Format: PROFILE (basis,uleng,utemp,upres) location,temp,pres/...
  
  Example:
    PROFILE (PCT,M,C,BAR) 0,400,30/50,450,28/100,500,25

POINTS (default: 10):
  Number of points in reactor profile printout
  Maximum: 100
  
  Example:
    OPERATION POINTS=25

REACTION KINETICS:

RXSTOIC statement (required):
  Format: RXSTOIC RXSET=setid
  References reaction set from RXDATA section
  
  Example:
    RXSTOIC RXSET=1

REACTION statement (required for each reaction):
  Format: REACTION rxid
  References reaction ID from RXDATA
  Must be followed immediately by KINETIC statement
  
  Example:
    REACTION 1

KINETIC statement (required for each reaction):
  Format: KINETIC COMPONENT=cno, PEXP(units)=value, &
                  ACTIVATION(uenth)=value, TEXPONENT=value

COMPONENT (default: base component from RXDATA):
  Base component for conversion report
  Must be a reactant (not product)
  
PEXP (default: 1.0):
  Pre-exponential (frequency) factor
  Units: (utemp, uweight, uvolume, upres, utime)
  Arrhenius equation: k = A × T^n × exp(-E/RT)
  A is the PEXP value
  
ACTIVATION (default: 0.0):
  Activation energy (E in Arrhenius)
  Units: Thousands of specific enthalpy per mole
  Common units: KCAL/GMOL, BTU/LBMOL, KJ/KMOL
  
TEXPONENT (default: 0.0):
  Temperature exponent (n in Arrhenius)
  Usually 0 for simple Arrhenius form
  
Example:
  KINETIC COMPONENT=1, PEXP(GMOL,M3,MIN,BAR,K)=5.2E6, &
          ACTIVATION(KCAL/GMOL)=18.5, TEXPONENT=0

KORDER statement (optional):
  Format: KORDER i,expo/j,expo/...
  Reaction orders for power law kinetics
  i,j = component numbers
  expo = exponent in rate law
  Default: Absolute value of stoichiometric coefficient
  
  Example:
    KORDER 1,1.5/2,2/3,0.5

POWER LAW RATE EXPRESSION:
  
  r = k × ∏(C_i^n_i)
  
  Where:
    r = Reaction rate
    k = Rate constant = PEXP × T^TEXPONENT × exp(-ACTIVATION/RT)
    C_i = Activity of component i (concentration, partial pressure, etc.)
    n_i = Reaction order from KORDER (or stoichiometry if omitted)

RXCALC STATEMENT OPTIONS:

Format: RXCALC keywords...

ACTIVITY BASIS:
  CONCENTRATION (default) - Molar concentration (mole/volume)
  PARTIALPRESSURE - Partial pressure (vapor phase)
  ACTIVITY - Liquid phase activity coefficient
  FUGACITY - Vapor phase fugacity
  
  Example:
    RXCALC PARTIALPRESSURE

INTEGRATION METHOD:
  RUNGEKUTTA (default) - Fixed step size, 4th order
  GEAR - Variable step size for stiff systems
  LSODA - Automatic stiffness detection
  
  RUNGEKUTTA options:
    NSTEPS = Number of integration steps (default: 20)
    STEPSIZE = Integration step size in length units
    
    Example:
      RXCALC RUNGEKUTTA, NSTEPS=50
      or
      RXCALC RUNGEKUTTA, STEPSIZE(M)=0.5
  
  GEAR/LSODA options:
    TOLERANCE = Integration tolerance in percent (default: 0.1%)
    
    Example:
      RXCALC GEAR, TOLERANCE(PCT)=0.05

KINETICS MODEL:
  POWERLAW (default) - Built-in power law
  SUBROUTINE - User-added FORTRAN subroutine
  PROCEDURE - In-line procedure
  
  POWERLAW:
    Uses built-in Arrhenius with power law
    No ID required
    
  SUBROUTINE:
    Format: KINETICS(SUBROUTINE)=id
    id = U1, U2, U3, U4, or U5
    Corresponds to USKIN1 through USKIN5
    
    Example:
      RXCALC KINETICS(SUBROUTINE)=U1
  
  PROCEDURE:
    Format: KINETICS(PROCEDURE)=id
    id = In-line procedure name (8 chars max)
    
    Example:
      RXCALC KINETICS(PROCEDURE)=MYKINPRO

DTOL (default: 1E-2, range: [1E-5, 1E-2]):
  Duty convergence tolerance
  
  Example:
    RXCALC DTOL(FRAC)=5E-3

PRESSURE DROP MODELS:

OPENPIPE (empty tube):
  Format: OPENPIPE DPCORR=correlation, DPTOL(upct)=1.0, &
                   FLOWEFF(upct)=100, FRICTION=value, &
                   AROUGH(uflen)=0.0018, NOACCEL

DPCORR correlations:
  BBM - Beggs & Brill Modified
  BBP - Beggs & Brill Plus
  OLIMENS - Oliphant & Schipper
  DEF - Default (BBM)
  MB - Modified Beggs & Brill
  GRAY - Gray correlation
  HB - Hagedorn & Brown
  DP1 - User subroutine USDP1
  DP2 - User subroutine USDP2

DPTOL (default: 1.0%):
  Pressure drop convergence tolerance
  
FLOWEFF (default: 100%):
  Flow efficiency (percentage)
  Accounts for flow restrictions
  
FRICTION:
  User-specified friction factor
  Overrides correlation
  
AROUGH or RROUGH:
  AROUGH = Absolute roughness (default: 0.0018 in)
  RROUGH = Relative roughness
  
NOACCEL:
  Neglect acceleration pressure drop
  Use for incompressible flow

Example:
  OPENPIPE DPCORR=BBM, AROUGH(IN)=0.002, NOACCEL

PACKING (catalyst bed):
  Format: PACKING DPCORR=ERGUN, &
                  CATALYST PDIAM(uflen)=value, PORO(ufrac)=value, &
                  PSHAPE=shape, SPHE=value, PLENGTH(uflen)=value

DPCORR:
  ERGUN - Ergun equation (default)
  DP1 - User subroutine USDP1
  DP2 - User subroutine USDP2

CATALYST parameters:
  PDIAM = Particle diameter
  PORO = Bed porosity (void fraction)
  PSHAPE = SPHERICAL or CYLINDRICAL
  SPHE = Sphericity (for non-spherical particles)
  PLENGTH = Particle length (for cylindrical)

Example:
  PACKING CATALYST PDIAM(MM)=3.5, PORO=0.45, PSHAPE=SPHERICAL

PRINT OPTIONS:

Format: PRINT PATH

PATH:
  Prints reaction path trace
  Shows heat of reaction calculation details

USER-ADDED KINETICS DATA:

DEFINE PDATA (for procedures):
  Format: DEFINE PDATA(elno) AS value
          DEFINE PDATA(elno) AS STREAM=sid, property
          DEFINE PDATA(elno) AS unittype=uid, parameter
  
  Transfer data to in-line procedure
  elno = element number (1-50)

IDATA/RDATA (for subroutines):
  Format: IDATA ivalue1, ivalue2, ...
          RDATA value1, value2, ...
  
  Integer and real data for user subroutines

SUPPLEMENT:
  Format: SUPPLEMENT elno, value, value/...
  
  Supplemental data arrays

DEFINE STATEMENT:

Format: DEFINE param AS STREAM=sid, param, {op, ref}
        DEFINE param AS unittype=uid, param, {op, ref}

Valid parameters:
  - LENGTH, DIAMETER, TUBES
  - DPIN, PIN, DP, PRESSURE
  - TEMPERATURE, DUTY
  - PEXP(i), ACTIVATION(i), TEXPONENT(i)
  - IDATA(i), RDATA(i)

Example:
  DEFINE TEMPERATURE AS STREAM=FEED1, TEMPERATURE, PLUS, 50

DESIGN GUIDELINES:

1. Geometry:
   - Length: Sufficient for desired conversion
   - Diameter: Based on pressure drop and heat transfer
   - Tubes: Scale-up from single tube data

2. Integration:
   - Use RUNGEKUTTA for smooth profiles
   - Use GEAR for stiff kinetics or steep gradients
   - Increase NSTEPS if oscillations occur

3. Pressure Drop:
   - OPENPIPE for empty tubes
   - PACKING for catalyst beds
   - Check DP doesn't exceed limits

4. Temperature Control:
   - THERMAL for lab-scale isothermal
   - ADIABATIC for industrial adiabatic beds
   - COCURRENT/COUNTERCURRENT for heat exchange

5. Convergence:
   - Provide good estimates via TPROFILE/PPROFILE
   - Adjust NSTEPS or TOLERANCE if convergence issues
   - Check for physically realistic kinetics

TYPICAL APPLICATIONS:
  - Catalytic tubular reactors
  - Steam reforming
  - Ethylene cracking
  - Ammonia synthesis
  - Methanol synthesis
  - Oxidation reactions
  - Polymerization`
    },
    'CSTR': {
        description: 'Continuous Stirred Tank Reactor - Perfect mixing with kinetic rate equations (PRO/II Manual §14.5)',
        types: [
            'Liquid Phase - Liquid reactor at constant volume',
            'Vapor Phase - Vapor reactor at constant volume',
            'Boiling Pot - Liquid volume determined by equilibrium',
            'Isothermal - Fixed temperature operation',
            'Adiabatic - Energy balance determines temperature'
        ],
        parameters: {
            required: ['UID', 'FEED', 'PRODUCT', 'RXSTOIC', 'REACTION', 'KINETIC', 'OPERATION'],
            optional: [
                'NAME', 'PROD', 'V', 'L', 'M', 'W', 'S',
                'RXSET',
                'KORDER', 'KPHASE', 'COMPONENT', 'PEXP', 'ACTIVATION', 'TEXPONENT',
                'PHASE', 'L', 'V', 'BOIL',
                'VOLUME', 'VMAX',
                'DP', 'PRESSURE',
                'TEMPERATURE',
                'ISOTHERMAL',
                'ADIABATIC', 'DUTY', 'TMAX', 'TMIN',
                'RXCALC',
                'VAPOR', 'LIQUID',
                'CONCENTRATION', 'PARTIALPRESSURE', 'ACTIVITY', 'FUGACITY',
                'KINETICS', 'POWERLAW', 'SUBROUTINE', 'PROCEDURE',
                'NONVOLATILE', 'CHARGE', 'FRACTION',
                'PARAMETER', 'BTRIAL', 'DERIV', 'VESTIMATE', 'TESTIMATE', 'FESTIMATE',
                'TOLERANCE', 'TEMP', 'COMP', 'ENTH',
                'PRINT', 'PATH',
                'DEFINE', 'PDATA', 'IDATA', 'RDATA', 'SUPPLEMENT',
                'METHOD'
            ]
        },
        example: `$ Example 1: Liquid phase CSTR, isothermal
CSTR        UID=CSTR1, NAME=BATCH REACTOR
  FEED      FEED1
  PRODUCT   L=PRODUCT1
  RXSTOIC   RXSET=1
  REACTION  1
  KINETIC   COMPONENT=1, PEXP(GMOL,L,MIN)=2.5E4, &
            ACTIVATION(KCAL/GMOL)=15.0
  KORDER    1,2/2,1
  OPERATION PHASE=L, VOLUME(L)=1000, ISOTHERMAL, &
            TEMPERATURE(C)=80, PRESSURE(BAR)=3
  RXCALC    LIQUID=CONCENTRATION

$ Example 2: Adiabatic vapor phase
CSTR        UID=CSTR2, NAME=GAS PHASE REACTOR
  FEED      VAPOR1
  PRODUCT   V=VAPOR2
  RXSTOIC   RXSET=OXIDATION
  REACTION  OX1
  KINETIC   COMPONENT=2, PEXP=1.8E6, ACTIVATION=22000
  OPERATION PHASE=V, VOLUME(M3)=10, ADIABATIC, &
            DUTY(MMBTU/HR)=0, PRESSURE(PSIA)=100
  RXCALC    VAPOR=PARTIALPRESSURE, KINETICS(POWERLAW)

$ Example 3: Boiling pot reactor
CSTR        UID=BP1, NAME=BOILING POT
  FEED      LIQUID
  PRODUCT   V=VAPOR, L=LIQUID
  RXSTOIC   RXSET=1
  REACTION  1
  KINETIC   COMPONENT=1, PEXP=5E5, ACTIVATION=18000
  OPERATION PHASE=BOIL, VOLUME, VMAX(M3)=50, &
            PRESSURE(BAR)=1.5, ISOTHERMAL
  NONVOLATILE CHARGE(GMOL)=3,100
  PARAMETER VESTIMATE(M3)=25, BTRIAL=5`,
        notes: `⚠️ UID is REQUIRED (unique identifier).
📖 Reference: PRO/II Keyword Manual Section 14.5

GENERAL DESCRIPTION:
- Continuously-fed stirred-tank reactor
- Perfect mixing assumption (uniform composition and temperature)
- Kinetic rate equations required
- Three reactor types: Liquid, Vapor, Boiling Pot
- Power law kinetics (default) or user-supplied

PERFECT MIXING ASSUMPTION:
  - Composition uniform throughout reactor
  - Temperature uniform throughout reactor
  - Exit stream has same properties as reactor contents
  - No concentration gradients
  - Reaction rate based on exit conditions

REACTOR TYPES:

1. LIQUID (PHASE=L):
   - Constant volume liquid reactor
   - Single liquid phase
   - VOLUME specifies reactor size
   - Products at reactor composition
   
2. VAPOR (PHASE=V):
   - Constant volume vapor reactor
   - Single vapor phase
   - VOLUME specifies reactor size
   - Products at reactor composition
   
3. BOILING POT (PHASE=BOIL):
   - Vapor-liquid equilibrium reactor
   - Liquid volume determined by VLE
   - Vapor product at dewpoint
   - Can include nonvolatile catalyst
   - VOLUME or VMAX optional

REACTOR GEOMETRY:

Format: OPERATION PHASE=designation, VOLUME(uvol)=value

PHASE (required):
  L = Liquid phase reactor
  V = Vapor phase reactor
  BOIL = Boiling pot reactor

VOLUME:
  For L or V: Reactor volume (required)
  For BOIL: Liquid phase volume (optional, calculated if omitted)
  Default units: ft³ (ENGLISH), m³ (METRIC/SI)

VMAX (BOIL only):
  Maximum liquid phase volume
  Used for volume calculation bounds
  Default: 2 × VESTIMATE or 100 m³
  
Example:
  OPERATION PHASE=L, VOLUME(L)=1000
  or
  OPERATION PHASE=BOIL, VMAX(M3)=50

THERMAL MODES:

1. ISOTHERMAL (default):
   Format: OPERATION ISOTHERMAL, TEMPERATURE(utemp)=value
   
   Fixed temperature operation
   - Operates at specified temperature
   - Duty calculated from energy balance
   - Default: Feed temperature if TEMP omitted
   
   Example:
     OPERATION ISOTHERMAL, TEMPERATURE(C)=80

2. ADIABATIC:
   Format: OPERATION ADIABATIC, DUTY(uduty)=value, TMAX(K)=3000, TMIN(K)=1.0
   
   Energy balance determines temperature
   - DUTY: Heat added (positive) or removed (negative)
   - Default: DUTY=0.0 (true adiabatic)
   - TMAX: Maximum allowable temperature (default: 3000 K)
   - TMIN: Minimum allowable temperature (default: 1 K)
   - Duty adjusted if T exceeds limits
   
   Example:
     OPERATION ADIABATIC, DUTY(MMBTU/HR)=-1.5, TMAX(F)=500

PRESSURE SPECIFICATION:

Format: OPERATION DP(upres)=value or PRESSURE(upres)=value

DP (default: 0.0):
  Pressure drop at entrance below feed pressure
  
PRESSURE:
  Absolute reactor pressure
  
Reactor always operates at constant pressure

Example:
  OPERATION PRESSURE(BAR)=3
  or
  OPERATION DP(PSI)=5

REACTION KINETICS:

RXSTOIC statement (required):
  Format: RXSTOIC RXSET=setid
  References reaction set from RXDATA section

REACTION statement (required for each reaction):
  Format: REACTION rxid
  References reaction ID from RXDATA
  Must be followed by KINETIC statement

KINETIC statement (optional):
  Format: KINETIC COMPONENT=cno, PEXP(units)=value, &
                  ACTIVATION(uenth)=value, TEXPONENT=value

  Parameters same as PLUGFLOW reactor
  See PLUGFLOW documentation for details

KORDER statement (optional):
  Format: KORDER i,expo/j,expo/...
  Reaction orders for power law
  Default: Stoichiometric coefficients

KPHASE statement (BOIL only):
  Format: KPHASE DEFAULT or COMPONENT
  
  Specifies component reaction phase
  DEFAULT = All components in liquid phase (default)
  COMPONENT = Specify phase per component

Example:
  REACTION 1
  KINETIC COMPONENT=1, PEXP(GMOL,L,MIN)=2.5E4, &
          ACTIVATION(KCAL/GMOL)=15.0
  KORDER 1,2/2,1

RXCALC STATEMENT OPTIONS:

Format: RXCALC VAPOR=basis, LIQUID=basis, KINETICS=model

VAPOR BASIS:
  CONCENTRATION - Molar concentration (default)
  PARTIALPRESSURE - Partial pressure
  FUGACITY - Vapor fugacity

LIQUID BASIS:
  CONCENTRATION - Molar concentration (default)
  ACTIVITY - Activity coefficient basis
  FUGACITY - Liquid fugacity

KINETICS MODEL:
  POWERLAW (default) - Built-in power law
  SUBROUTINE=id - User FORTRAN subroutine (U1-U5)
  PROCEDURE=id - In-line procedure (8 chars max)

Example:
  RXCALC LIQUID=CONCENTRATION, KINETICS(POWERLAW)
  or
  RXCALC VAPOR=PARTIALPRESSURE, KINETICS(SUBROUTINE)=U1

BOILING POT SPECIFIC OPTIONS:

NONVOLATILE statement:
  Format: NONVOLATILE CHARGE(M or W)=i,value/... or
                       FRACTION(M or W)=i,value/...
  
  Specifies nonvolatile components (catalyst, etc.)
  Components must not be in feed
  Remain in liquid phase
  
  CHARGE:
    Fixed amount (mole or weight basis)
    
  FRACTION:
    Fraction of liquid phase (mole or weight)
  
  Example:
    NONVOLATILE CHARGE(GMOL)=3,100/5,50
    or
    NONVOLATILE FRACTION(W)=3,0.05

PARAMETER statement:
  Format: PARAMETER BTRIAL=value, DERIV=value, &
                     VESTIMATE(uvol)=value, TESTIMATE(utemp)=value

BTRIAL (default: 3):
  Broyden approximation trials before Jacobian update
  For boiling pot convergence control
  
DERIV (default: 0.01, range: [0.0001, 0.1]):
  Derivative step size multiplier
  
VESTIMATE:
  Initial volume estimate for boiling pot
  Units: ft³ (ENGLISH), m³ (METRIC/SI)
  
TESTIMATE:
  Initial temperature estimate
  For boiling pot or adiabatic with fixed volume
  
FESTIMATE:
  Format: FESTIMATE i,value/j,value/...
  Component molar flow rate estimates
  Can improve convergence

Example:
  PARAMETER BTRIAL=5, DERIV=0.02, VESTIMATE(M3)=25, &
            TESTIMATE(C)=120

TOLERANCE statement (BOIL):
  Format: TOLERANCE TEMP(value)=value, COMP=value, ENTH=value

TEMP (default: 0.1°F, range: [0.01, 1.0]°F):
  Temperature tolerance between reactor T and product dewpoint
  
COMP (default: 1.0E-5, range: [1.0E-8, 1.0E-3]):
  Component mole fraction tolerance for mass balance
  Relaxed by factor of 10 if no convergence in 40 iterations
  
ENTH (default: 1.0E-4, range: [1.0E-6, 0.01]):
  Enthalpy error tolerance

Example:
  TOLERANCE TEMP(F)=0.05, COMP=1E-6, ENTH=5E-5

PRINT OPTIONS:

Format: PRINT PATH

PATH:
  Prints reaction path trace
  Shows heat of reaction details

USER-ADDED KINETICS:

Same as PLUGFLOW reactor:
- DEFINE PDATA for in-line procedures
- IDATA/RDATA for subroutines
- SUPPLEMENT for data arrays

DEFINE STATEMENT:

Format: DEFINE param AS source

Valid parameters:
  - ACTIVATION(i), PEXP(i), TEMPERATURE
  - DP, DUTY, PRESSURE
  - VOLUME, VMAX, TMAX, TMIN
  - RDATA(i)

Example:
  DEFINE TEMPERATURE AS STREAM=FEED1, TEMPERATURE, PLUS, 25

DESIGN GUIDELINES:

1. Reactor Sizing:
   - Larger V = Higher conversion (longer residence time)
   - τ = V/Q (residence time = volume/volumetric flow)
   - Balance size vs conversion requirements

2. Thermal Mode Selection:
   - ISOTHERMAL: Lab-scale, controlled temperature
   - ADIABATIC: Industrial-scale, heat of reaction important

3. Phase Selection:
   - LIQUID: Liquid reactions, high pressure
   - VAPOR: Gas reactions, moderate pressure
   - BOIL: VLE important, catalyst in liquid

4. Boiling Pot:
   - Use when vapor product composition important
   - Catalyst remains in liquid phase
   - Liquid volume determined by VLE
   - Provide good VESTIMATE

5. Convergence:
   - Provide estimates (VESTIMATE, TESTIMATE, FESTIMATE)
   - Adjust BTRIAL for boiling pot
   - Check TOLERANCE settings

COMPARISON: CSTR vs PLUGFLOW:

CSTR (Perfect Mixing):
  ✓ Uniform composition and temperature
  ✓ Simple to model
  ✓ Good for slow reactions
  ✓ Lower conversion per volume than PFR
  ✓ Can handle solids/slurries
  
PLUGFLOW (No Mixing):
  ✓ Concentration gradient along length
  ✓ Temperature profile possible
  ✓ Higher conversion per volume than CSTR
  ✓ Better for fast reactions
  ✓ Requires tubular geometry

TYPICAL APPLICATIONS:
  - Liquid phase polymerization
  - Fermentation reactors
  - Continuous stirred tanks
  - Gas phase reactors
  - Boiling pot with catalyst
  - Slurry reactors`
    },
    'RXKINETIC': {
        description: 'Kinetic Reactor - Generic keyword (Use PLUGFLOW or CSTR instead)',
        parameters: {
            required: ['UID', 'FEED', 'PROD'],
            optional: ['NAME', 'TYPE']
        },
        example: `$ Note: RXKINETIC is not a valid PRO/II keyword
$ Use PLUGFLOW for tubular reactors:
PLUGFLOW    UID=PFR1
  FEED      S1
  PRODUCT   M=S2
  OPERATION LENGTH(M)=10, DIAMETER(MM)=50

$ Or use CSTR for stirred tank reactors:
CSTR        UID=CSTR1
  FEED      S1
  PRODUCT   M=S2
  OPERATION PHASE=L, VOLUME(L)=1000`,
        notes: `⚠️ RXKINETIC is NOT a valid PRO/II keyword!

Use these instead:
  • PLUGFLOW - Tubular plug flow reactor (§14.4)
  • CSTR - Continuous stirred tank reactor (§14.5)

Both support:
  - Kinetic rate equations
  - Power law or user-supplied kinetics
  - Arrhenius rate constants
  - Multiple simultaneous reactions`
    },
    'CALCULATOR': {
        description: 'Calculator - Custom calculations using stream properties, unit operation results, and user-defined equations',
        types: [
            'Property Calculations - Read/write stream properties',
            'Unit Operation Results - Access calculated values from other units',
            'Specification Setting - Set specifications for iterative calculations',
            'Data Manipulation - Complex mathematical operations',
            'Control Logic - IF-THEN-ELSE statements'
        ],
        parameters: {
            required: ['UID', 'NAME'],
            optional: [
                'DEFINE', 'PROCEDURE', 'FEED', 'PROD',
                'VARY', 'SPEC', 'RETURN',
                'WRITE', 'OUTPUT', 'DISPLAY'
            ]
        },
        example: `CALCULATOR  UID=R1MR, NAME=METHANATION RATIO HDO REACTOR
  $ Define variables from stream properties
  DEFINE    P(1) AS STRM=DHTG COMP=6 RATE
  DEFINE    P(2) AS STRM=DHTG COMP=15 RATE
  DEFINE    P(3) AS STRM=DHTG COMP=17 RATE
  DEFINE    R(1) AS OUTPUT
  
  $ Calculation procedure
  PROCEDURE
    $ Calculate methanation ratio
    R(1) = P(1)/(P(1)+P(2)+P(3))
  RETURN`,
        notes: `UID is REQUIRED (unique identifier for the calculator).

DEFINE syntax:
  - DEFINE variable AS STRM=<stream> <property>
  - DEFINE variable AS STRM=<stream> COMP=<n> <property>
  - DEFINE variable AS UNIT=<unit> <result>
  - DEFINE variable AS INPUT (user input)
  - DEFINE variable AS OUTPUT (result variable)

Available stream properties:
  TEMP, PRES, RATE (mass/molar), VFRAC, LFRAC
  FLOW, MFLOW, VFLOW, LFLOW
  DENS, VDENS, LDENS, MW, VISC, CP, ENTH

PROCEDURE block:
  - Use FORTRAN-style expressions
  - Mathematical operators: +, -, *, /, **
  - Functions: SQRT, EXP, LOG, LOG10, ABS, SIN, COS, etc.
  - Logic: IF-THEN-ELSE-ENDIF
  - Can set VARY/SPEC for optimization

Calculator executes after unit operations converge.
Use for complex correlations, property adjustments, ratio calculations.`
    },
    'STCALC': {
        description: 'Stream Calculator - Feed blending, stream splitting, and stream synthesis (PRO/II Manual §16.2)',
        types: [
            'Feed Blending - Combine streams with scaling factors',
            'Stream Splitting - Split into OVHD and BTMS products',
            'Stream Synthesis - Create streams with specified composition',
            'Combined Mode - All three operations in one unit'
        ],
        parameters: {
            required: ['UID'],
            optional: [
                'NAME',
                'FEED',
                'OVHD', 'BTMS', 'PROD',
                'FOVHD', 'FBTMS', 'FPROD',
                'ROVHD', 'RBTMS', 'RPROD',
                'XOVHD', 'XBTMS', 'XPROD',
                'COVHD', 'CBTMS', 'CPROD',
                'PRESSURE', 'PRES', 'DP',
                'TEMP', 'DT', 'DEWT', 'BUBT',
                'DTBB', 'DTAD',
                'OPERATION', 'STOP', 'DUTY',
                'DEFINE', 'METHOD'
            ]
        },
        example: `$ Feed blending with scaling factors
STCALC      UID=M1, NAME=BLEND FEEDS
  FEED      A16, 0.5 / A10, 0.6 / R4, 0.7
  PROD      M=BLENDED
  FPROD     1, 20, 1.0

$ Stream splitting
STCALC      UID=M2, NAME=COMPONENT SPLIT
  FEED      5
  OVHD      M=6, DP=5, DT=-10
  BTMS      M=7, DP=-5
  FOVHD     0.95 / 0.93 / 3, 4, 0.7
  RBTMS     (LV) 5, 9, 120
  ROVHD     (WT) 10, 100
  OPERATION DUTY=0.5

$ Stream synthesis (no feeds required)
STCALC      UID=SYN, NAME=CREATE STREAM
  PROD      M=SY1, TEMP(C)=100, PRESSURE(KPA)=200
  RPROD     (WT,KG/HR) 1, 42.1 / 2, 0.5 / 3, 20, 0.0

$ Combined: blend, split, and synthesize
STCALC      UID=ST-1, NAME=C3SPLIT
  FEED      C3A, 0.5 / C3B, 1.0 / C3C, -0.2
  OVHD      M=PPYN, DP=2, BUBT
  BTMS      M=PPAN, DP=-3
  PROD      M=FD, TEMP=100
  XOVHD     1, 0.99
  XBTMS     2, 0.97
  FPROD     1, 2, 1.0
  DEFINE    PRESSURE(3,KPA) AS STREAM=C3A, PRESSURE`,
        notes: `⚠️ UID is REQUIRED (unique identifier).
📖 Reference: PRO/II Keyword Manual Section 16.2

⚠️ IMPORTANT: STCALC is NOT a programming calculator like CALCULATOR!
STCALC provides three specific stream manipulation modes:
  1. Feed blending (with scaling factors)
  2. Stream splitting (OVHD/BTMS)
  3. Stream synthesis (create streams)

For FORTRAN-style programming, use CALCULATOR instead!

MODE 1: FEED BLENDING
  Combines streams with arbitrary scaling factors
  
  Format: FEED sid, factor / sid, factor / ...
  
  Examples:
    FEED A, 0.5 / B, 1.0 / C, -0.2
    - 50% of stream A
    - 100% of stream B
    - Subtract 20% of stream C
  
  Blending calculation:
    Component_i = Σ(factor × stream_rate)
    Enthalpy = Σ(factor × stream_enthalpy)
  
  Factors can be:
    - Any magnitude (> or < 1)
    - Positive or negative
    - Use negative to subtract streams

MODE 2: STREAM SPLITTING
  Splits blended feed into OVHD and BTMS products
  
  Required statements:
    - FEED (one or more)
    - OVHD (overhead product)
    - BTMS (bottoms product)
    - Splitting specifications (FOVHD/FBTMS, ROVHD/RBTMS, etc.)
  
  Splitting specifications:
    FOVHD/FBTMS - Fraction of feed (0-1)
    ROVHD/RBTMS - Actual rate (M, W, LV, GV basis)
    XOVHD/XBTMS - Composition fraction
    COVHD/CBTMS - Concentration (M or WT basis)
  
  Component format: keyword (basis) i, j, value / ...
  
  Examples:
    FOVHD 1, 0.95 - 95% of component 1 to overhead
    XOVHD 1, 0.99 - Component 1 is 99% pure in overhead

MODE 3: STREAM SYNTHESIS
  Creates product streams of any composition/state
  
  Required: PROD statement + composition specs
  Optional: FEED (can synthesize without feeds)
  
  Composition specifications:
    RPROD - Actual rate (M, W, LV, GV basis)
    XPROD - Composition fraction
    FPROD - Fraction of feed (requires FEED)
    CPROD - Concentration
  
  Example:
    RPROD (WT,KG/HR) 1, 42.1 / 2, 0.5
      Component 1: 42.1 kg/hr
      Component 2: 0.5 kg/hr

COMPARISON WITH OTHER UNITS:
  STCALC vs CALCULATOR:
    - CALCULATOR: FORTRAN-style programming, PROCEDURE block
    - STCALC: Specific stream operations only, no programming
  
  STCALC vs MIXER:
    - MIXER: Simple combining at lowest pressure
    - STCALC: Blending with scaling factors
  
  STCALC vs SPLITTER:
    - SPLITTER: Equal composition splits
    - STCALC: Component-by-component splitting

⚠️ NO PROGRAMMING FEATURES:
  - No PROCEDURE block
  - No FORTRAN expressions
  - No IF-THEN-ELSE logic
  - No STRM.TEMP or STRM.COMP(i).RATE syntax
  - For calculations, use CALCULATOR instead!

💡 ENGINEERING TIPS:
  - Use negative factors to subtract streams
  - Each component must be specified exactly once
  - Can combine all three modes in one unit
  - STOP=ZERO handles infeasible specs gracefully`
    }
};
//# sourceMappingURL=unitOperations.js.map