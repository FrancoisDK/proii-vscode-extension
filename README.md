# PRO/II Language Support for VS Code

Comprehensive syntax highlighting, **interactive hover tooltips**, **60+ code snippets**, and language support for PRO/II process simulation files (`.inp`, `.std`, `.out`).

## 🆕 What's New in v1.3.1

### ✨ **Semantic Token-Based Stream Name Highlighting!**

Revolutionary new feature that automatically highlights all stream names throughout your PRO/II files with intelligent multi-section support!

**Key Features:**
- 🎯 **Multi-Section Parsing**: Correctly handles files with multiple NAME sections (tested with 3 sections in real PRO/II files)
- 📍 **Context-Aware Highlighting**: Highlights streams in FEED, PRODUCT, STRM=, OUTPUT, and all other contexts
- ✅ **Smart Validation**: Distinguishes actual stream names from keywords (HEATER, FEED, PRODUCT are correctly excluded)
- ⚡ **High Performance**: Full-document highlighting in < 150ms, even with 200+ streams

**Test Results:**
- ✓ 244 stream names extracted from real PRO/II simulation file
- ✓ 531+ stream references correctly identified
- ✓ 85.7% test pass rate (6/7 tests)
- ✓ Comprehensive test suite included

**Try it:** Open any `.inp` file with stream definitions → Stream names automatically highlighted in orange/tan color!

### New Documentation:
- 📄 `TEST_STREAM_HIGHLIGHTING.md` - Comprehensive test report with 8 sections
- 📄 `STREAM_HIGHLIGHTING_COMPLETE.md` - Complete technical implementation guide
- 📄 `FINAL_STATUS.md` - Release summary and status report
- 🧪 `test-stream-highlighting.js` - Integration test script (Node.js executable)

## 🆕 What's New in v1.2.0

**Comprehensive Hover Documentation for 9 High-Priority Unit Operations!**

We've added ~2,880 lines of detailed documentation that appears when you hover over these keywords:

- **PUMP** - Operation modes, efficiency types, curves, DEFINE usage
- **VALVE** - Isenthalpic expansion, pressure drop, CV calculations
- **MIXER** - Adiabatic mixing, pressure handling, multiple inlets
- **COMPRESSOR** - Isentropic/polytropic efficiency, intercooling, multistage
- **COLUMN** - All 6 algorithms (IO, SURE, CHEMDIST, Enhanced IO, RATEFRAC, LLEX), complete specifications
- **EQUREACTOR** - RXCALC modes, APPROACH temperature, equilibrium models
- **RXGIBBS** - Gibbs free energy minimization, ELEMENTS, CONVERSION, constraints
- **PLUGFLOW** *(NEW!)* - Tubular reactor, thermal modes, kinetics, pressure drop
- **CSTR** *(NEW!)* - Stirred tank reactor, boiling pot, perfect mixing

Each tooltip includes:
- ✅ Description with manual reference (§ section number)
- ✅ Types/Algorithms with selection criteria
- ✅ Complete parameter lists (required & optional)
- ✅ Multiple detailed examples with proper formatting
- ✅ Design guidelines and troubleshooting tips

**Try it:** Open any `.inp` file, hover over `COLUMN`, `PUMP`, or `COMPRESSOR` to see the comprehensive documentation!

## Features

### 🎯 **Hover Tooltips** (v1.1.1)

**Instant documentation at your fingertips!** Hover over any keyword to see detailed information without leaving your editor.

#### Unit Operations (21 types)
Hover over `FLASH`, `COLUMN`, `HEATX`, `PUMP`, `COMP`, `VALVE`, `MIXER`, `SPLITTER`, `PIPE`, **`REACTOR`, `EQUREACTOR`, `RXGIBBS`, `RXEQUIL`, `RXCONV`, `RXKINETIC`**, `ABSORBER`, `STRIPPER`, `EXTRACT`, **`CALCULATOR`, `STCALC`** to see:
- Complete description and purpose
- Available types (Isothermal, Adiabatic, etc.)
- Required and optional parameters
- Working examples with proper syntax
- Important notes and tips

#### Thermodynamic Methods (15+ packages)
Hover over `SRK`, `PR`, `IDEAL`, `NRTL`, `UNIQUAC`, `ELEC`, etc. to see:
- Full method name and model type
- Best applications (oil & gas, chemicals, etc.)
- Valid pressure/temperature ranges
- When to use and when to avoid
- Typical applications

#### Parameters (30+ common parameters)
Hover over `TEMP`, `PRES`, `DUTY`, `VFRAC`, `REFLUX`, `EFF`, etc. to see:
- Clear parameter description
- Valid units (BAR, C, KW, etc.)
- Typical value ranges
- Related parameters
- Pro tips and common mistakes

**Example:** Hover over `FLASH` → See complete guide with types, parameters, and example code!

### 🎨 Syntax Highlighting

- **Section Headers**: `COMPONENT DATA`, `STREAM DATA`, `THERMODYNAMIC DATA`, `UNIT OPERATIONS`
- **Unit Operations**: `FLASH`, `COLUMN`, `HCURVE`, `CALCULATOR`, `COMPRESSOR`, `PUMP`, `HX`, `MIXER`, `SPLITTER`, `VALVE`, `REACTOR`, etc.
- **Keywords**: `TITLE`, `PRINT`, `DIMENSION`, `METHOD`, `SPEC`, `VARY`, `DEFINE`, etc.
- **200+ Parameters**: `TEMP`, `PRES`, `RATE`, `COMP`, `FEED`, `PROD`, `CTEMP`, `HTEMP`, `DUTY`, `REFLUX`, `CONDENSER`, `REBOILER`, `TRAY`, `POINTS`, etc.
- **Arithmetic Operators** (bright yellow): `PLUS`, `MINUS`, `TIMES`, `MULTIPLY`, `DIVIDE`, `DIVIDED`
- **Thermodynamic Methods**: `SRK`, `SRK-HP`, `SOUR`, `PETR`, `PURE`, `STEAM`, etc.
- **Comments**: Dollar sign (`$`) - both line-start and inline comments
- **Continuation Character** (bright yellow): `&` for line continuation
- **Numbers**: Integer, decimal, and scientific notation
- **Special Handling**: NAME statement for tabular component data

### 📝 Code Snippets (60+)

Comprehensive snippets extracted from the PRO/II Keyword Manual. See **[SNIPPETS_GUIDE.md](SNIPPETS_GUIDE.md)** for complete documentation.

#### Quick Reference:

**General**
- `title` - Complete TITLE block
- `dimension` - DIMENSION statement
- `compdata` - COMPONENT DATA section
- `thermodata` - THERMODYNAMIC DATA section
- `streamdata`, `unitops` - Category headers
- `prop` - Stream PROPERTY definition
- `print` - PRINT statement
- `sequence` - SEQUENCE statement

**FLASH Units (6 variations)**
- `flash-adia` - Adiabatic flash
- `flash-isot` - Isothermal flash
- `flash-bubb` - Bubble point flash
- `flash-spec` - Flash with TPSPEC
- `flash-duty` - Flash with defined duty
- `flash-entrain` - Flash with entrainment

**COLUMN Units**
- `column-io` - Column with IO algorithm
- `column-sure` - Column with SURE algorithm
- `sidestripper` - Side stripper unit

**COMPRESSOR & PUMP**
- `comp-poly` - Polytropic compressor
- `comp-adia` - Adiabatic compressor
- `pump` - Basic pump
- `pump-eff` - Pump with efficiency

**HEAT EXCHANGERS**
- `hx-cold` - Cold side HX
- `hx-hot` - Hot side HX
- `hx-duty` - HX with duty
- `hx-both` - Two-side HX
- `hcurve` - Heating curve

**OTHER UNITS**
- `mixer`, `mixer-temp` - Mixer units
- `splitter`, `splitter-rate` - Splitter units
- `valve`, `valve-dp` - Valve units
- `reactor-conv`, `reactor-equil` - Reactors
- `calculator` - Calculator unit
- `stcalc` - Stream calculator

**SPECIFICATIONS**
- `spec` - SPEC statement
- `define-stream` - DEFINE from stream
- `define-unit` - DEFINE from unit
- `define-calc` - DEFINE with arithmetic

**COMMENTS**
- `comment` - Decorative separator
- `comm` - Single line comment

### 🔧 Language Features

- **Line Comments**: Use `$` at the start of a line or after code
- **Inline Comments**: `$` works anywhere on the line
- **Auto-Closing Pairs**: Automatic closing of brackets, quotes, and parentheses
- **Code Folding**: Fold major sections (UNIT OPERATIONS, COMPONENT DATA, etc.)
- **Column Formatting**: All snippets maintain PRO/II column conventions (Col 3, 5, 15)

## Installation

### From VSIX (Recommended)
1. Download the `.vsix` file: `proii-language-support-1.0.0.vsix` (28.25KB)
2. Open VS Code
3. Go to Extensions (`Ctrl+Shift+X`)
4. Click `...` → `Install from VSIX`
5. Select the downloaded file

### From Source
```bash
cd proii-vscode-extension
npm install -g vsce
vsce package
code --install-extension proii-language-support-1.0.0.vsix
```

## Usage

1. Open any `.inp`, `.std`, or `.out` file
2. Syntax highlighting will be applied automatically
3. Type snippet prefixes (e.g., `flash-adia`) and press `Tab` to expand
4. Use `Tab` to navigate between placeholders in snippets
5. Use `$` for comments (works at line start or after code)
6. Use `&` for line continuation

## Example

```proii
$ HDO Reactor Section
FLASH       UID=F-1, NAME=HDO FEED FLASH
  FEED      FEED1, FEED2           $ Multiple feeds
  PROD      V=VAPOR, L=LIQUID
  ISOT      TEMP(F)=350, DP=10     $ Isothermal flash
  METHOD    SET=SRK-HP

COLUMN      UID=COL1, NAME=FRACTIONATOR
  PARA      IO=30, TRAY=25
  FEED      LIQUID,10
  PROD      OVHD=DISTILLATE, BTMS=BOTTOMS
  PRES      TOP(PSIA)=50, BOTTOM(PSIA)=55
  COND      TYPE=TOTAL, TEMP(F)=120
  REFLUX    RATIO=3.0
  ESTIMATE  PRODUCT(M)=DISTILLATE,200/BOTTOMS,800
  ISO
  DEFINE    TEMP AS STRM=FEED1 TEMP
  DEFINE    PRES AS 68.0
  METHOD    SET=SRK-HP
```

## Reference Documentation

This extension is based on the PRO/II Keyword Manual and includes support for:

- All major unit operations (Flash, Column, Reactor, Heat Exchangers, etc.)
- Stream and component data definitions
- Thermodynamic methods and property packages
- Controllers, optimizers, and calculators
- Procedure blocks and custom calculations

## Configuration

No additional configuration required. The extension works out of the box with `.inp`, `.std`, and `.out` files.

## Known Limitations

- Basic syntax highlighting only (no semantic analysis)
- No IntelliSense or auto-completion beyond snippets
- No error checking or validation

## Future Enhancements

- Language Server Protocol (LSP) for advanced features
- Error detection and validation
- ✅ **Hover tooltips with keyword documentation** (IMPLEMENTED in v1.2.0!)
- Go-to-definition for streams and units
- Symbol outline and navigation

## Contributing

Contributions welcome! Please submit issues or pull requests on GitHub.

## License

MIT License - See LICENSE file for details

## Credits

Developed for PRO/II process simulation software by AVEVA.

---

**Note**: This extension provides syntax highlighting and editing support only. It does not execute or validate PRO/II simulations. You still need the PRO/II software to run simulations.
