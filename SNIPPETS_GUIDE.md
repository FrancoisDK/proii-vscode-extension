# PRO/II Code Snippets Guide

This extension now includes **60+ comprehensive code snippets** extracted from the PRO/II Keyword Manual. Simply start typing the prefix and press `Tab` or `Enter` to insert the snippet.

## General Snippets

| Prefix | Description |
|--------|-------------|
| `title` | Complete TITLE block with NEWFILE, CASE, PROJECT, etc. |
| `dimension` | DIMENSION statement for unit system selection |
| `compdata` | COMPONENT DATA section with LIBID and ASSAY |
| `thermodata` | THERMODYNAMIC DATA section with METHOD and WATER |
| `streamdata` | STREAM DATA category header |
| `prop` | PROPERTY statement for stream definition |
| `unitops` | UNIT OPERATIONS category header |
| `print` | PRINT statement with output options |
| `sequence` | SEQUENCE statement for calculation order |
| `comment` | Decorative comment separator block |
| `comm` | Single line comment |

## FLASH Unit Snippets

| Prefix | Description |
|--------|-------------|
| `flash-adia` | Adiabatic flash with pressure drop |
| `flash-isot` | Isothermal flash at specified temperature |
| `flash-bubb` | Bubble point flash |
| `flash-spec` | Flash with stream specification (TPSPEC) |
| `flash-duty` | Flash with defined duty from column |
| `flash-entrain` | Flash with liquid entrainment in vapor |

## COLUMN Snippets

| Prefix | Description |
|--------|-------------|
| `column-io` | Column with IO algorithm (complete setup) |
| `column-sure` | Column with SURE algorithm |
| `sidestripper` | Side stripper column unit |

**Column-IO includes:**
- PARAMETER with IO algorithm and tray count
- FEED statements with tray locations
- PROD with overhead and bottoms
- PRES with top and bottom pressures
- COND with condenser type and temperature
- REFLUX ratio
- DUTY specifications
- ESTIMATE statements for initialization

## COMPRESSOR Snippets

| Prefix | Description |
|--------|-------------|
| `comp-poly` | Polytropic compressor with pressure and efficiency |
| `comp-adia` | Adiabatic compressor with efficiency |

## PUMP Snippets

| Prefix | Description |
|--------|-------------|
| `pump` | Basic pump with outlet pressure |
| `pump-eff` | Pump with adiabatic efficiency |

## HEAT EXCHANGER (HX) Snippets

| Prefix | Description |
|--------|-------------|
| `hx-cold` | HX with cold side and outlet temperature |
| `hx-hot` | HX with hot side and outlet temperature |
| `hx-duty` | HX with specified duty |
| `hx-both` | Two-side heat exchanger |
| `hcurve` | Heating curve unit with multiple duty points |

## MIXER Snippets

| Prefix | Description |
|--------|-------------|
| `mixer` | Basic mixer with multiple feeds |
| `mixer-temp` | Mixer with temperature specification |

## SPLITTER Snippets

| Prefix | Description |
|--------|-------------|
| `splitter` | Splitter with fractions |
| `splitter-rate` | Splitter with product rates |

## VALVE Snippets

| Prefix | Description |
|--------|-------------|
| `valve` | Throttle valve with outlet pressure |
| `valve-dp` | Valve with pressure drop |

## REACTOR Snippets

| Prefix | Description |
|--------|-------------|
| `reactor-conv` | Conversion reactor with stoichiometry |
| `reactor-equil` | Equilibrium reactor |

## CALCULATOR Snippets

| Prefix | Description |
|--------|-------------|
| `calculator` | Calculator unit with DEFINE and PROCEDURE |
| `stcalc` | Stream calculator unit |

## SPECIFICATION & DEFINE Snippets

| Prefix | Description |
|--------|-------------|
| `spec` | SPEC statement for stream specifications |
| `define-stream` | DEFINE parameter from stream property |
| `define-unit` | DEFINE parameter from unit property |
| `define-calc` | DEFINE with arithmetic operations |

## Usage Tips

### 1. **Tab Stops**
All snippets include tab stops (numbered placeholders like `${1:value}`). After inserting a snippet:
- Press `Tab` to move to the next placeholder
- Press `Shift+Tab` to go back
- Type your value to replace the placeholder

### 2. **Choice Selections**
Some placeholders offer choices using `${1|option1,option2,option3|}`:
- A dropdown menu appears
- Use arrow keys to select
- Press `Enter` to confirm

Example: `${5|ISOT,ADIA,ISO|}` in flash units

### 3. **Column Formatting**
All snippets maintain PRO/II column formatting:
- **Column 3**: Keywords (FLASH, FEED, PROD)
- **Column 5**: Parameters (TEMP, PRES, RATE)
- **Column 15**: Values (numbers, stream names)

### 4. **Common Patterns**

**Complete Unit Operation:**
```
  FLASH     UID=F-1, NAME=FLASH DRUM
    FEED    FEED_STREAM
    PROD    V=VAPOR, L=LIQUID
    ISOT    TEMP(F)=100, DP=5
    METHOD  SET=SRK-HP
```

**With DEFINE:**
```
    DEFINE  TEMP AS STREAM=S1, TEMP, PLUS, 10
```

**With SPEC:**
```
  SPEC      STREAM=LIQUID, RATE, VALUE=1432
```

### 5. **Arithmetic Operations**
Available in DEFINE snippets:
- `PLUS` - Addition
- `MINUS` - Subtraction
- `TIMES` or `MULTIPLY` - Multiplication
- `DIVIDE` or `DIVIDED` - Division

### 6. **Quick Start Workflow**

1. Type `title` → Complete title block
2. Type `compdata` → Component setup
3. Type `thermodata` → Thermodynamics setup
4. Type `streamdata` → Start stream section
5. Type `prop` → Define each stream
6. Type `unitops` → Start unit operations
7. Type unit prefixes (`flash-adia`, `column-io`, etc.) → Add unit operations

## Examples from Keyword Manual

All snippets are based on real examples from the PRO/II Keyword Manual:

**Example E11.1-2:** Flash with pressure drop
```proii
FLASH UID=F-2 FEED 1 PROD V=2, L=3 ISOT TEMP(F)=30, DP=5
```

**Example E11.1-4:** Flash with specification
```proii
FLASH  UID=F004, NAME=COOLER, KPRINT FEED 2, 3, 18 PROD V=V14, L=L15 TPSPEC DP=10
SPEC  STREAM=L15, RATE, VALUE=1432
```

**Example E11.1-7:** Flash with entrainment
```proii
FLASH  UID=F7 FEED 1 PROD V=2, L=3
ISOT  TEMP(F)=100, PRESSURE(ATM)=1
ENTRAIN FROM=L, TO=V, PERCENT=1.5
```

## Customizing Snippets

To add your own snippets or modify existing ones:

1. Open `snippets/proii-snippets.json`
2. Add new snippet in this format:
```json
"Snippet Name": {
  "prefix": "trigger-word",
  "body": [
    "  KEYWORD   UID=${1:default_value}",
    "    PARAM   ${2:value}"
  ],
  "description": "What this snippet does"
}
```

## Version History

**v1.0.0** - Added 60+ comprehensive snippets from PRO/II Keyword Manual including:
- 6 Flash variations (adiabatic, isothermal, bubble, spec, duty, entrain)
- 3 Column types (IO, SURE, side stripper)
- 2 Compressor types (polytropic, adiabatic)
- 2 Pump types (basic, with efficiency)
- 4 Heat exchanger configurations
- HCURVE heating curve
- Mixer, Splitter, Valve, Reactor units
- Calculator and Stream Calculator
- SPEC and DEFINE patterns
- Complete project structure snippets

---

**Quick Reference:** Start typing any prefix and VS Code will show matching snippets!
