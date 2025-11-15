# Change Log

All notable changes to the "proii-language-support" extension will be documented in this file.

## [1.4.9] - 2025-11-15

### Fixed
- **⚠️ Trademark Compliance**: Replaced extension icon to avoid potential trademark infringement
  - Removed `PRO_II.png` which may have resembled AVEVA PRO/II branding
  - Added `proii_icon_new.png` - 100% original geometric design
  - New icon features: Circle + Square (unit operation symbol) + P2 text + stream arrows
  - Color scheme: Cyan (#4EC9B0) for equipment, Orange (#CE9178) for streams
  - Copyright status: Original design, safe for distribution

### Note
- **No functional changes** - All v1.4.8 features remain unchanged
- This is a legal/compliance fix only
- Extension functionality is identical to v1.4.8

---

## [1.4.8] - 2025-11-01

### Added - ⭐ MAJOR FEATURE: 80-Column Limiter & Component Definition Lookup

#### 80-Column Width Compliance Checker
- **Real-Time Diagnostics**: Orange/yellow squiggly underlines on lines exceeding 80 characters
- **4 Smart Quick-Fix Actions**:
  1. Truncate line to exactly 80 characters
  2. Continue line with & marker (comment continuation)
  3. Add comment with truncated content on new line (`$ <rest_of_line>`)
  4. Disable checking for this line (add to ignore list)
- **Visual Column Ruler**: Automatic visual ruler at column 80 for [proii] language mode only
  - Language-scoped: applies ONLY to `.inp`, `.std`, `.out`, `.sdf` files
  - No interference with Python, JavaScript, or other file types
- **Configuration System**: 5 settings to customize behavior (enabled, columnLimit, warnOnExceed, enableAutoFix, showRuler)
- **Toggle Commands**: `PRO/II: Toggle Column Limiter` and `PRO/II: Toggle Column Ruler`

#### Component Definition Lookup (Context Menu)
- **Right-Click Component Index**: New context menu item "Show Component Definition"
- **Interactive Quick Pick Menu**: Choose from 3 actions when clicking a component index:
  1. **Show Info**: Display component ID, name, type, formula, molecular weight
  2. **Go to LIBID Definition**: Jump to component's location in LIBID statement
  3. **Show All Components**: Browse complete list of all components in file
- **Multi-LIBID Support**: Handles multiple LIBID...BANK= sections in same file
- **Line Continuation Handling**: Correctly parses `/&` and `&` continuation markers
- **30+ Component Database**: Pre-loaded with common hydrocarbons, inorganics, and aromatics
- **Component Examples**:
  - Hydrocarbons: C1-C12, IC4, NC4, IC5, NC5, BENZENE, TOLUENE, EBENZENE, PXYLENE, OXYLENE
  - Inorganics: H2O, H2, N2, O2, CO2, H2S, NH3
  - Full names: METHANE, ETHANE, PROPANE, WATER, HYDROGEN, NITROGEN, etc.

#### Enhanced Component Hover Provider
- **Hover on Component Names**: Instant tooltip with component details
- **30+ Pre-Loaded Components**: Expanded from 15 to 30+ components with full names
- **Multi-Line LIBID Support**: Correctly extracts from `/&` continuation markers
- **Detailed Information**: Type, chemical formula, molecular weight for common components

#### LIBID Syntax Highlighting
- **Component-Specific Colors**: Different colors for component numbers (orange) vs. names (cyan/green)
- **Multi-Line Continuation**: Proper highlighting of `/&` and `&` continuation markers
- **Separator Highlighting**: Distinct colors for commas and slashes in component lists

### Changed
- **Ruler Implementation**: Language-scoped to [proii] files only
  - Workspace-level configuration (not global)
  - Automatically applied when ProII file is active
  - Fixed previous issue where ruler appeared on all file types

### Fixed
- **Component Extraction**: Now correctly extracts all components from multi-line LIBID statements
- **Multi-LIBID Support**: Handles multiple LIBID...BANK= sections properly
- **Line Continuation**: Correctly processes both `/&` and `&` continuation markers
- **Ruler Scope**: Fixed ruler appearing globally, now properly scoped to ProII files only

### Performance
- Column limit checking: < 50ms full document scan
- Component extraction: < 100ms for files with multiple LIBID sections
- Diagnostics generation: Real-time with 100ms debounce on changes
- Component lookup: Instant hover and context menu response

### Configuration
New settings available under `proii.columnLimiter`:
- `enabled` (default: true) - Enable/disable column limiter
- `columnLimit` (default: 80, range: 40-200) - Column limit threshold
- `warnOnExceed` (default: true) - Show diagnostics when limit exceeded
- `enableAutoFix` (default: true) - Provide quick-fix actions
- `showRuler` (default: true) - Display visual ruler at column limit (ProII files only)

## [1.3.1] - 2025-10-18

## [1.4.7] - 2025-10-19

### Added
- DEFINE hover support: Adds manual-accurate tooltips and examples for DEFINE statements referencing streams and unit calculations.
- Operator synonyms: Recognizes textual operators (PLUS, SUM, ADD, MINUS, DIFF, SUBT, TIMES, MULTIPLY, DIVIDE, DIVIDEBY, RATIO, OVER) for DEFINE/SPEC arithmetic.

### Changed
- PRES parameter: Clarified default units in hover (SI=kPa, Metric=kg/cm2, English=PSIA absolute) and improved guidance on absolute vs gauge pressure.
- CONTROLLER tooltip: Updated to match PRO/II manual example and removed incorrect 'types' subsection.
- CALC/CALCULATOR: Ensured parity in behavior both as unit operations and parameters (hover and grammar updates).

### Fixed
- Grammar and stream/highlight integration for operator words and DEFINE expression recognition.


### Added
- **✨ Semantic Token-Based Stream Name Highlighting** - Revolutionary feature that automatically highlights all stream names referenced throughout PRO/II files:
  - **Multi-NAME Section Support**: Correctly parses and extracts streams from multiple NAME sections in single file
  - **Intelligent Stream Extraction**: Extracts stream names from both NAME header lines and indented continuation lines
  - **Context-Aware Highlighting**: Highlights stream references in FEED, PRODUCT, STRM=, OUTPUT, and other contexts
  - **Comprehensive Validation**: Distinguishes between actual stream names and keywords through pattern validation

### Fixed
- Fixed StreamNameProvider to correctly skip NAME header and extract stream names from continuation lines
- Fixed parser to validate stream lines with comma/slash requirement to exclude keywords
- Fixed semantic token generation to handle multiple NAME sections properly
- Fixed edge case where streams on NAME lines were being skipped

### Testing & Documentation
- Added comprehensive test report (TEST_STREAM_HIGHLIGHTING.md) with 8 detailed test sections
- Added end-to-end integration test script (test-stream-highlighting.js) with 4 validation tests
- Added complete implementation documentation (STREAM_HIGHLIGHTING_COMPLETE.md)
- Added final status report (FINAL_STATUS.md)
- **Test Results**: 85.7% pass rate (6/7 tests), 244 stream names extracted from test simulation file

### Performance
- Stream name parsing: < 50ms
- Semantic token generation: < 50ms
- Full document highlighting: < 150ms
- Memory overhead: < 5MB

## [1.3.0] - 2025-10-13

### Added
- **🚀 Comprehensive Documentation for Commonly Used Units** - Major expansion focusing on frequently used unit operations (~1,420 lines added):

#### Updated Unit Operations (4):
- **SPLITTER** (~420 lines) - Complete documentation covering:
  - 5 specification types (total rate, fractional, component rate, recovery, referenced)
  - FILL vs NORMALIZE detailed comparison
  - ENRICH/IMPURE product handling
  - Multiple comprehensive examples
  - Design guidelines and troubleshooting
  - Cross-referencing capabilities

- **PIPE** (~300 lines) - Complete documentation covering:
  - 7 pressure drop correlations (BBM, Olimens, DEF, Mukherjee-Brill, Gray, Hagedorn-Brown, Palmer)
  - Multiple device support (11 device types: DPIPE, DREG, DORIFICE, DCHECK, DBEND, DTEE, DNOZZLE, DENTRANCE, DEXIT, DCONTRACTION, DEXPANSION, DKFACTOR, DVALVE)
  - Elevation handling and segmentation (1-200 segments)
  - Friction factor calculations (Moody, Colebrook-White, Jain)
  - Heat transfer options (DUTY, ISOTHERMAL, U+TAMBIENT)
  - Line sizing mode (DPMAX, VMAX, PMIN)
  - Configuration parameters and design guidelines

- **FLASH** (~350 lines) - Complete documentation covering:
  - 10 flash types (ISOTHERMAL, ADIABATIC, DEW, DEWHC, DEWWATER, BUBBLE, ISENTROPIC, UPPERDEWPOINT, TPSPEC, FRAC)
  - VLLE three-phase support
  - Entrainment specifications (FROM/TO phase)
  - Product phase assignment (super-critical handling)
  - Column attachment options
  - Detailed convergence parameters
  - Multiple comprehensive examples

- **HX (Simple Heat Exchanger)** (~350 lines) - Complete documentation covering:
  - 7 exchanger configurations (one-sided, two-sided, utility, 4 column attachment types)
  - 17 performance specifications (DUTY, HOCI, HICO, HOCO, TMIN, MITA, etc.)
  - Zone analysis features (OUTPUT, CALC, PLOT modes)
  - Shell and tube configurations (N:2N passes)
  - 5 utility options (WATER, AIR, STEAM, HEATINGMEDIUM, REFRIGERANT)
  - Column attachment (CONDENSER, REBOILER, PA, SIDE)
  - Counter-current vs co-current flow
  - Design guidelines and troubleshooting

### Summary
- Total documentation added: ~1,420 lines
- Cumulative total: ~4,300 lines of comprehensive unit operation documentation
- Focus on commonly used units (avoiding specialized HXRIG, AIRCOOLHX, LNGHX, FURNACE)
- All updates compiled successfully with no errors

## [1.2.0] - 2025-10-13

### Added
- **🚀 Comprehensive Unit Operation Documentation** - Massive expansion of hover tooltips with detailed technical content (~2,880 lines added):

#### Updated Unit Operations (9):
- **PUMP** (~180 lines) - Complete documentation covering:
  - OPERATION modes (ENRATIO, CURVE, RIGOROUS)
  - Efficiency types (isentropic, mechanical, motor, overall)
  - Pump curves and interpolation
  - DEFINE property calculations
  - Sizing and rating modes
  - Multiple detailed examples

- **VALVE** (~170 lines) - Complete documentation covering:
  - Isenthalpic expansion process
  - Pressure drop specifications
  - Valve sizing and rating
  - CV (valve coefficient) calculations
  - Control valve types
  - Design guidelines

- **MIXER** (~200 lines) - Complete documentation covering:
  - Adiabatic mixing calculations
  - Pressure handling methods (MINIMUM, MAXIMUM, AVERAGE, DEFINE)
  - Multiple inlet streams
  - Temperature and phase equilibrium
  - Design recommendations

- **COMPRESSOR** (~450 lines) - Complete documentation covering:
  - Isentropic vs polytropic efficiency
  - Single-stage and multistage configurations
  - Intercooling options
  - Compressor curves and performance maps
  - Rigorous thermodynamic calculations
  - Power and duty calculations
  - Multiple operational modes

- **EQUREACTOR** (~350 lines) - Complete documentation covering:
  - RXCALC calculation modes (TEMP, DUTY, EQUILIBRIUM)
  - APPROACH temperature specifications
  - Equilibrium models and convergence
  - Phase specifications (VF, LF, VLE)
  - Multiple simultaneous reactions
  - Heat integration options

- **RXGIBBS** (~380 lines) - Complete documentation covering:
  - Gibbs free energy minimization
  - ELEMENTS elemental balance approach
  - CONVERSION reaction-based approach
  - TRIAL composition estimates
  - Phase specification options
  - Constraints and bounds
  - Thermodynamic requirements
  - Troubleshooting convergence issues

- **COLUMN** (~600 lines) - **Most comprehensive update** covering:
  - Six algorithm types with selection criteria:
    * IO (Inside-Out) - Fastest for conventional distillation
    * SURE - Handles free water on multiple trays
    * CHEMDIST - Non-ideal, VLLE, reactive distillation
    * Enhanced IO - IO plus total draws
    * RATEFRAC® - Rate-based (non-equilibrium)
    * LLEX - Liquid-liquid extraction
  - PARAMETER statement options for all algorithms
  - FEED statement with TSEPARATE/TNOTSEPARATE
  - PRODUCT specifications (OVHD, BTMS, LDRAW, VDRAW, WATER)
  - Five CONDENSER types (PARTIAL, MIXED, BUBBLE, TFIX, DTBB)
  - REBOILER types (KETTLE, THERMOSIPHON)
  - DUTY statement for heaters/coolers
  - PA (pump-around) specifications
  - PSPEC pressure profiles
  - ESTIMATE models (SIMPLE, CONVENTIONAL, REFINING, CHEM)
  - SPEC/VARY performance specifications
  - PACKING specifications (random and structured)
  - TSIZE/TRATE hydraulic calculations
  - TEFF tray efficiencies
  - TOLERANCE convergence options
  - Design guidelines and troubleshooting
  - Four comprehensive examples

- **PLUGFLOW** (~350 lines) - **New comprehensive entry** covering:
  - Plug flow reactor (PFR) fundamentals
  - Thermal operation modes (ISOTHERMAL, ADIABATIC, SPECIFIED)
  - Kinetic reaction modeling
  - Pressure drop calculations
  - Integration methods and convergence
  - Reactor packing specifications
  - External heating/cooling
  - Multiple examples for different applications

#### New Unit Operations (2):
- **CSTR** (~200 lines) - **New comprehensive entry** covering:
  - Continuous stirred tank reactor fundamentals
  - Perfect mixing assumption
  - Boiling pot configuration
  - Nonvolatile component handling
  - Thermal modes
  - Convergence parameters
  - Design guidelines

- **RXKINETIC** - Updated to redirect users to PLUGFLOW or CSTR entries with explanation

### Changed
- Version bumped to 1.2.0
- Total documentation lines in unitOperations.ts: ~6,900 (was ~4,044)
- Enhanced formatting consistency across all entries
- Improved example alignment and readability
- Standardized parameter descriptions

### Technical Details
- All updates compiled successfully with TypeScript
- Test file created: test/test_tooltips.inp
- Comprehensive coverage of PRO/II Keyword Manual sections:
  - §6.1 (Pump), §6.2 (Valve), §6.3 (Mixer)
  - §6.4 (Compressor), §11.1 (Equilibrium Reactor)
  - §11.3 (Gibbs Reactor), §11.4 (Kinetic Reactors)
  - §12.1-12.10 (Column algorithms)

## [1.1.1] - 2025-10-13

### Added
- **Additional Reactor Keywords** - Added hover support for all PRO/II reactor types:
  - EQUREACTOR - Equilibrium reactor
  - RXGIBBS - Gibbs free energy minimization reactor
  - RXEQUIL - Equilibrium reactor (alternative keyword)
  - RXCONV - Conversion-based reactor
  - RXKINETIC - Kinetic reactor with rate equations
- **Calculator Keywords** - Added hover support for calculation units:
  - CALCULATOR - Custom calculations with stream properties
  - STCALC - Stream property calculations

### Changed
- Version bumped to 1.1.1
- Total hover tooltips now: 66 (was 58)
  - 21 unit operations (was 13)
  - 15+ thermo methods
  - 30+ parameters

## [1.1.0] - 2025-10-13

### Added
- **🎯 Hover Tooltips** - Major new feature! Hover over keywords to see instant documentation
- **Unit Operations Hovers** - Comprehensive tooltips for all 13 unit operations:
  - FLASH, COLUMN, HEATX, PUMP, COMP, VALVE
  - MIXER, SPLITTER, PIPE, REACTOR
  - ABSORBER, STRIPPER, EXTRACT
  - Shows: Description, types, required/optional parameters, examples, and notes
- **Thermodynamic Methods Hovers** - Detailed guidance for 15+ thermo packages:
  - SRK, PR, IDEAL, NRTL, UNIQUAC, WILSON, UNIFAC
  - ELEC, SRKM, PRM, BWRS, GS, CS, API
  - Shows: Full name, model type, applications, valid ranges, and when to avoid
- **Parameter Hovers** - Help for 30+ common parameters:
  - TEMP, PRES, DUTY, VFRAC, DELP, FEED, PROD
  - EFF, WORK, REFLUX, NSTAGE, LMTD, and many more
  - Shows: Description, valid units, typical ranges, related parameters, and tips
- **TypeScript Implementation** - Extension now uses TypeScript for better maintainability
- **Structured Data Files** - Hover content organized in modular data files

### Changed
- Version bumped to 1.1.0
- Extension now activates on language:proii
- Main entry point changed to compiled JavaScript (./out/extension.js)
- Description updated to mention hover tooltips

### Technical
- Added TypeScript compiler configuration (tsconfig.json)
- New source structure: src/ directory with data/, utils/ subdirectories
- Compilation output in out/ directory
- Dependencies: @types/vscode, @types/node, typescript

## [1.0.3] - 2025-10-12

### Added
- **Extension icon** - Added PRO_II.png as the extension icon
- Icon appears in Extensions marketplace and sidebar

### Changed
- Version bumped to 1.0.3

## [1.0.2] - 2025-10-12

### Added
- **`.out` file support** - Extension now recognizes `.inp`, `.std`, and `.out` files
- Output files get full syntax highlighting for the input section
- Updated keywords to include "out"

### Changed
- Version bumped to 1.0.2
- Description updated to mention input and output files

## [1.0.1] - 2025-10-12

### Added
- **`.std` file support** - Extension now recognizes both `.inp` and `.std` files
- Both file types get full syntax highlighting and snippet support
- Updated keywords to include "std"

### Changed
- Version bumped to 1.0.1
- Description updated to mention both file types

## [1.0.0] - 2025-10-11

### Added - v1.0.0 Final
- **60+ Comprehensive Code Snippets** extracted from PRO/II Keyword Manual
  - 6 FLASH variations (adiabatic, isothermal, bubble, spec, duty, entrain)
  - 3 COLUMN types (IO, SURE, side stripper)
  - 2 COMPRESSOR types (polytropic, adiabatic)
  - 2 PUMP types (basic, with efficiency)
  - 4 HEAT EXCHANGER configurations (cold, hot, duty, both sides)
  - HCURVE heating curve unit
  - MIXER (2 types), SPLITTER (2 types), VALVE (2 types)
  - REACTOR (conversion, equilibrium)
  - CALCULATOR and STCALC units
  - SPEC and DEFINE patterns (stream, unit, arithmetic)
  - Complete project structure snippets (TITLE, DIMENSION, categories)
  - Comment snippets (separator, single line)
- **SNIPPETS_GUIDE.md** - Complete documentation of all 60+ snippets with examples
- **Repository field** added to package.json

### Improved - v1.0.0 Final
- All snippets maintain proper PRO/II column formatting (Col 3, 5, 15)
- Tab stops with intelligent placeholders for easy navigation
- Choice selections for common options (ISOT/ADIA, condenser types, etc.)
- Based on real examples from PRO/II Keyword Manual
- Package size: 28.25KB with all features

### Added - v1.0.0 Initial
- Initial release of PRO/II language support
- **Comprehensive Syntax Highlighting** for `.inp` files
  - 13 Unit operation types: FLASH, COLUMN, HCURVE, HX, COMPRESSOR, PUMP, MIXER, SPLITTER, VALVE, REACTOR, CALCULATOR, STCALC, OPTIMIZER, SIDESTRIPPER, CONTROLLER
  - **200+ Parameter keywords**: TEMP, PRES, RATE, COMP, FEED, PROD, CTEMP, HTEMP, DUTY, REFLUX, CONDENSER, REBOILER, TRAY, POINTS, etc.
  - **Arithmetic operators** (bright yellow): PLUS, MINUS, TIMES, MULTIPLY, DIVIDE, DIVIDED
  - **Continuation character** `&` (bright yellow for visibility)
  - **Inline comments**: `$` works at line start or after code
  - Special handling for NAME statement (tabular component data)
  - Thermodynamic method names: SRK, SRK-HP, SOUR, PETR, PURE, STEAM
  - Section headers: COMPONENT DATA, STREAM DATA, THERMODYNAMIC DATA, UNIT OPERATIONS
  - Major keywords: TITLE, PRINT, DIMENSION, METHOD, SPEC, VARY, DEFINE
  - Numbers: Integer, decimal, scientific notation
- **Language Features**
  - Line and inline comment support (`$`)
  - Auto-closing pairs for brackets and quotes
  - Code folding for major sections
  - Proper column formatting preservation
- **Documentation**
  - Comprehensive README with 60+ snippet examples
  - SNIPPETS_GUIDE.md with detailed usage instructions
  - Based on PRO/II Keyword Manual and real-world `.inp` files
  - INSTALL.md with step-by-step installation guide

### Fixed - v1.0.0
- NAME statement no longer causes following code to highlight as comments
- Inline comments ($ after code) now properly recognized
- Missing parameters PROD, CTEMP, HTEMP, PRESS, POINTS added
- HCURVE added as unit operation keyword
- Arithmetic operators (PLUS, MINUS, etc.) now display in bright yellow
- Continuation character & now displays in bright yellow

### Features
- Recognizes 50+ unit operation types
- Highlights 200+ keywords and parameters
- Supports thermodynamic method names (SRK, SOUR, etc.)
- Proper highlighting for scientific notation
- Continuation line support (`&`)
- Section header recognition
- Publisher: Francois de Klerk

## [Unreleased]

### Planned for v2.0
- Language Server Protocol (LSP) for advanced features
- Error detection and validation
- Hover tooltips with keyword documentation from Keyword Manual
- Go-to-definition for streams and units
- Symbol outline and navigation
- IntelliSense for unit IDs and stream names
- Auto-completion based on context
- Diagnostic messages for common errors
- Code formatting and beautification
- Snippet preview and documentation hover
- Stream and unit operation dependency graph visualization

