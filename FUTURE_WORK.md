# PRO/II Extension - Future Work Tracking

## Version History
- **v1.0.0-1.1.2**: Base extension with basic hover tooltips
- **v1.2.0** (In Progress): High-priority comprehensive unit operations

## Current Status (v1.2.0 Development)

### ✅ Completed Comprehensive Units
1. **FLASH** (§11.1) - All flash types with short forms (ISOT, ADIA, ISEN, DEW, BUBL, SPEC)
2. **SPLITTER** (§11.5) - Complete split specifications, cross-referencing, material balance
3. **HX/HEATX** (§13.1) - Table 10.3-3C parameters, thermal design, cross-referencing

### 🔄 High Priority - In Progress (Target: v1.2.0)
4. **PUMP** (§11.2) - Pressure rise, efficiency (EFF/MEFF), DEFINE statements
5. **VALVE** (§11.3) - Isenthalpic expansion, pressure drop, phase behavior
6. **MIXER** (§11.4) - Adiabatic mixing, multiple feeds, pressure handling
7. **COMPRESSOR/COMP** (§11.6) - Efficiency types, intercooling, pressure ratio
8. **COLUMN** (§12.x) - Rigorous distillation, PARAMETER, PSPEC, PACKING, ESTIMATE
9. **EQUREACTOR** (§14.x) - Equilibrium reactions, RXCALC models, APPROACH fraction
10. **RXGIBBS** (§14.x) - Gibbs free energy minimization
11. **RXKINETIC** (§14.x) - Rate equations, CSTR/PFR, kinetic parameters

---

## Future Work - Remaining Unit Operations

### Chapter 11: Basic Unit Operations (Medium Priority)

#### 11.7 EXPANDER - Turbine Expansion
**Status**: Basic tooltip exists (~30 lines)  
**Manual Section**: §11.7 (estimated lines 9400-9600)  
**Complexity**: Medium  
**Estimated Effort**: 1-2 hours

**Content to Add**:
- Isentropic expansion with efficiency
- Work extraction calculations
- OPERATION block specifications (EFF, IEFF, PEFF)
- Pressure ratio vs. outlet pressure
- Efficiency defaults and typical values
- Power generation calculations
- DEFINE statement usage
- 2-3 practical examples

**Current State**: Basic description only
**Priority**: Medium (less common than compressor but important for power recovery)

---

#### 11.8 PIPE - Hydraulic Flow
**Status**: Basic tooltip exists (~25 lines)  
**Manual Section**: §11.8 (estimated lines 9600-9800)  
**Complexity**: Medium  
**Estimated Effort**: 1-2 hours

**Content to Add**:
- Pressure drop calculations (friction factor methods)
- LENGTH, DIAM, ROUGH parameters
- Elevation effects (ELEV parameter)
- Heat transfer in pipes (DUTY specification)
- Two-phase flow considerations
- Friction factor correlations
- DEFINE for pressure drop
- 2-3 examples (horizontal, vertical, heat transfer)

**Current State**: Basic description
**Priority**: Medium (important for plant-wide simulations)

---

#### 11.9 BLEND - Component Blending
**Status**: Not in current file  
**Manual Section**: §11.9 (estimated lines 9800-10000)  
**Complexity**: Low-Medium  
**Estimated Effort**: 1 hour

**Content to Add**:
- Blending multiple streams with composition control
- SPEC for blend properties (API, RVP, flashpoint, etc.)
- OPTIMIZE for recipe optimization
- Property blending rules (linear vs. non-linear)
- Constraints on blend ratios
- Refinery blending applications
- 2-3 examples (gasoline blending, crude blending)

**Current State**: Not implemented
**Priority**: Medium (important for refinery applications)

---

#### 11.10 RESET - Stream Reinitialization
**Status**: Not in current file  
**Manual Section**: §11.10 (estimated lines 10000-10100)  
**Complexity**: Low  
**Estimated Effort**: 30 minutes

**Content to Add**:
- Purpose: Reset stream to new conditions
- Temperature/pressure reset
- Flow rate adjustments
- Phase reinitialization
- Use cases (convergence help, stream manipulation)
- Simple examples

**Current State**: Not implemented
**Priority**: Low (rarely used)

---

#### 11.11 COMPONENT REPORTER - Stream Analysis
**Status**: Not in current file  
**Manual Section**: §11.11 (estimated lines 10100-10200)  
**Complexity**: Low  
**Estimated Effort**: 30 minutes

**Content to Add**:
- Component flow reporting
- Property calculations for groups
- Tabulation of component data
- Export capabilities
- Use cases

**Current State**: Not implemented
**Priority**: Low (utility function)

---

#### 11.12 CAPEOPENUNIT - External Models
**Status**: Not in current file  
**Manual Section**: §11.12 (estimated lines 10200-10300)  
**Complexity**: High  
**Estimated Effort**: 2 hours

**Content to Add**:
- CAPE-OPEN interface description
- External unit operation integration
- Parameter passing
- Configuration requirements
- Troubleshooting external models
- Examples of common CAPE-OPEN units

**Current State**: Not implemented
**Priority**: Low (advanced feature, rarely used)

---

#### 11.13 MEMBRANE SEPARATOR - Membrane Separation
**Status**: Not in current file  
**Manual Section**: §11.13 (estimated lines 10300-10500)  
**Complexity**: Medium-High  
**Estimated Effort**: 1-2 hours

**Content to Add**:
- Membrane separation mechanisms
- Permeance specifications
- Stage cut definitions
- Multi-component permeation
- Pressure ratio effects
- Membrane types (gas, vapor, liquid)
- 2-3 examples (H2 recovery, CO2 removal, dehydration)

**Current State**: Not implemented
**Priority**: Low-Medium (growing importance for gas processing)

---

#### 11.14 ELECTROLYTE FUELCELL - Fuel Cell Modeling
**Status**: Not in current file  
**Manual Section**: §11.14 (estimated lines 10500-10700)  
**Complexity**: High  
**Estimated Effort**: 2-3 hours

**Content to Add**:
- Fuel cell types (PEM, SOFC, etc.)
- Electrochemical reactions
- Efficiency calculations
- Operating conditions
- Heat generation
- Current density specifications
- Examples for different fuel cell types

**Current State**: Not implemented
**Priority**: Low (specialized application)

---

### Chapter 12: Column Operations (High Priority)

#### 12.1 COLUMN - Comprehensive Update
**Status**: Basic tooltip exists (~60 lines) - **HIGH PRIORITY TARGET**  
**Manual Section**: Chapter 12 (multiple sections, estimated lines 10700-15000)  
**Complexity**: Very High  
**Estimated Effort**: 4-6 hours

**Content to Add**:
- **12.1**: Column types (shortcut, rigorous, batch, reactive)
- **12.2**: PARAMETER statement (TRAY, IO, DAMP, etc.)
- **12.3**: FEED specifications (stage, thermal condition)
- **12.4**: PRODUCT specifications (OVHD, BTMS, SIDE draws)
- **12.5**: PSPEC pressure profiles (PTOP, DPCOLUMN, DPSTAGE)
- **12.6**: Column section definitions
- **12.7**: PACKING specifications (type, size, height, HETP)
- **12.8**: CONDENSER types (total, partial, none)
- **12.9**: REBOILER types (kettle, thermosiphon)
- **12.10**: ESTIMATE for initialization (SIMPLE, DETAILED)
- **12.11**: SPEC statements for column control
- **12.12**: VARY for optimization
- **12.13**: Convergence parameters (MAXIT, TOL)
- **12.14**: PRINT options for detailed output
- Tray efficiency specifications
- Multiple feed/draw configurations
- Temperature and flow profiles
- 5-6 comprehensive examples

**Current State**: Basic description with limited parameters
**Priority**: **HIGHEST** (most complex and frequently used)

---

### Chapter 13: Heat Exchanger Operations

#### 13.2 HXRIG - Rigorous Shell & Tube Rating
**Status**: Not in current file (mentioned in HX notes)  
**Manual Section**: §13.2 (estimated lines 15000-16000)  
**Complexity**: Very High  
**Estimated Effort**: 3-4 hours

**Content to Add**:
- TEMA shell types (E, F, G, H, J, K, X)
- Tube specifications (OD, thickness, length, pitch)
- Baffle design (spacing, cut, type)
- Shell diameter and configuration
- Nozzle specifications
- Fouling resistances (shell/tube side)
- ZONE definitions for multi-zone
- Rating vs. simulation modes
- Heat transfer coefficient calculations
- DEFINE for U, AREA, DP parameters
- Pressure drop correlations
- 4-5 detailed examples

**Current State**: Not implemented (HX has basic HXRIG parameter references)
**Priority**: Medium-High (important for detailed design)

---

#### 13.3 LNGHX - LNG Heat Exchanger
**Status**: Not in current file  
**Manual Section**: §13.3 (estimated lines 16000-16500)  
**Complexity**: High  
**Estimated Effort**: 2-3 hours

**Content to Add**:
- Specialized LNG service
- Multi-stream configurations
- Cryogenic considerations
- Brazed aluminum construction
- Core specifications
- Flow arrangement
- Temperature approach specifications
- Examples for LNG service

**Current State**: Not implemented
**Priority**: Low-Medium (specialized LNG applications)

---

#### 13.4 AIRCOOLER - Air-Cooled Heat Exchanger
**Status**: Not in current file  
**Manual Section**: §13.4 (estimated lines 16500-17000)  
**Complexity**: Medium  
**Estimated Effort**: 2 hours

**Content to Add**:
- Fan specifications (diameter, number)
- Tube bundle arrangement
- Ambient air conditions
- AIRFLOW specifications
- Tube configuration (rows, fins)
- Fan power calculations
- Approach temperature
- Winter/summer operation
- 3-4 examples

**Current State**: Not implemented
**Priority**: Medium (common in refineries/plants)

---

#### 13.5 FURNACE - Fired Heater/Furnace
**Status**: Not in current file  
**Manual Section**: §13.5 (estimated lines 17000-18000)  
**Complexity**: High  
**Estimated Effort**: 3 hours

**Content to Add**:
- Furnace types (cabin, box, cylindrical)
- Radiant/convection sections
- Burner specifications
- Fuel specifications and combustion
- Efficiency calculations
- Tube specifications (radiant/convection)
- Draft specifications
- Stack conditions
- Flue gas composition
- Heat flux calculations
- 3-4 examples

**Current State**: Not implemented
**Priority**: Medium-High (critical for refinery heaters)

---

### Chapter 14: Reactor Operations

#### 14.1 REACTOR - General Purpose Reactor
**Status**: Basic tooltip exists (~30 lines)  
**Manual Section**: §14.1 (estimated lines 18000-19000)  
**Complexity**: High  
**Estimated Effort**: 2-3 hours

**Content to Add**:
- Reactor types overview
- Conversion specifications
- Multiple reactions
- Reaction heat effects
- Temperature/pressure specifications
- DUTY specifications
- Adiabatic vs. isothermal
- 3-4 examples

**Current State**: Basic description
**Priority**: High (fundamental reactor type)

---

#### 14.2 EQUREACTOR - Equilibrium Reactor
**Status**: Basic tooltip exists (~40 lines) - **HIGH PRIORITY TARGET**  
**Manual Section**: §14.2 (estimated lines 19000-20000)  
**Complexity**: Medium-High  
**Estimated Effort**: 2-3 hours

**Content to Add**:
- Equilibrium calculations
- RXCALC MODEL specifications (WGS, METHANATION, etc.)
- APPROACH FRACTION usage (0-1 scale)
- Temperature approach (DT parameter)
- Multiple equilibrium reactions
- Heat effects at equilibrium
- DEFINE for temperature/pressure
- Integration with REACTION data
- 4-5 practical examples (methanation, WGS, reforming)

**Current State**: Basic description with example
**Priority**: **HIGH** (commonly used in refinery/petrochemical)

---

#### 14.3 RXGIBBS - Gibbs Free Energy Minimization
**Status**: Basic tooltip exists (~25 lines) - **HIGH PRIORITY TARGET**  
**Manual Section**: §14.3 (estimated lines 20000-20500)  
**Complexity**: Medium  
**Estimated Effort**: 1-2 hours

**Content to Add**:
- Gibbs minimization theory
- No stoichiometry required
- INERTS specification (non-reactive components)
- Temperature/pressure effects on equilibrium
- Phase behavior at equilibrium
- Combustion applications
- RESTRICT for phase/component constraints
- 3-4 examples (combustion, reforming, gasification)

**Current State**: Basic description
**Priority**: **HIGH** (powerful for complex equilibria)

---

#### 14.4 RXEQUIL - Alternative Equilibrium Reactor
**Status**: Basic tooltip exists (~25 lines)  
**Manual Section**: §14.4 (estimated lines 20500-21000)  
**Complexity**: Medium  
**Estimated Effort**: 1 hour

**Content to Add**:
- Differences from EQUREACTOR
- When to use RXEQUIL vs. EQUREACTOR
- Equilibrium constant specifications
- Temperature effects
- 2-3 examples

**Current State**: Basic description
**Priority**: Medium (alternative to EQUREACTOR)

---

#### 14.5 RXCONV - Conversion Reactor
**Status**: Basic tooltip exists (~25 lines)  
**Manual Section**: §14.5 (estimated lines 21000-21500)  
**Complexity**: Low-Medium  
**Estimated Effort**: 1 hour

**Content to Add**:
- Simple conversion specifications
- CONV(n) for multiple reactions
- Fractional conversion (0-1)
- Per-pass vs. overall conversion
- Heat effects with conversion
- 3-4 simple examples

**Current State**: Basic description
**Priority**: Medium (simple but widely used)

---

#### 14.6 RXKINETIC - Kinetic Reactor
**Status**: Basic tooltip exists (~35 lines) - **HIGH PRIORITY TARGET**  
**Manual Section**: §14.6 (estimated lines 21500-23000)  
**Complexity**: Very High  
**Estimated Effort**: 3-4 hours

**Content to Add**:
- Reactor types (CSTR, PFR, BATCH)
- Rate equation specifications
- ARRHENIUS parameters (A, E, n)
- Reaction orders
- Multiple reactions with selectivity
- Catalyst effects
- Residence time calculations (VOL, RES)
- Temperature profiles in PFR
- Pressure drop in PFR
- Integration methods
- Convergence parameters
- 5-6 comprehensive examples

**Current State**: Basic description
**Priority**: **HIGH** (detailed kinetic modeling)

---

### Additional Unit Operations (Lower Priority)

#### ABSORBER - Gas Absorption Column
**Status**: Basic tooltip exists (~20 lines)  
**Manual Section**: Chapter 15 (estimated)  
**Complexity**: High  
**Estimated Effort**: 2-3 hours  
**Priority**: Medium (important for gas processing)

#### STRIPPER - Stripping Column
**Status**: Basic tooltip exists (~20 lines)  
**Manual Section**: Chapter 15 (estimated)  
**Complexity**: Medium-High  
**Estimated Effort**: 2 hours  
**Priority**: Medium (common separation)

#### EXTRACT - Liquid-Liquid Extraction
**Status**: Basic tooltip exists (~20 lines)  
**Manual Section**: Chapter 16 (estimated)  
**Complexity**: High  
**Estimated Effort**: 2-3 hours  
**Priority**: Low-Medium (specialized separation)

#### CALCULATOR - Custom Calculations
**Status**: Basic tooltip exists (~50 lines)  
**Manual Section**: Chapter 10 (estimated lines 7000-8500)  
**Complexity**: Very High  
**Estimated Effort**: 3-4 hours  
**Priority**: High (extremely powerful and flexible)

**Content to Add**:
- Complete DEFINE syntax (all property tables)
- PROCEDURE block programming
- IF-THEN-ELSE logic
- FORTRAN expressions
- Mathematical functions
- VARY/SPEC integration
- Accessing unit operation results
- Component-wise calculations
- 6-8 comprehensive examples

#### STCALC - Stream Calculator
**Status**: Basic tooltip exists (~40 lines)  
**Manual Section**: Chapter 10 (estimated)  
**Complexity**: High  
**Estimated Effort**: 2 hours  
**Priority**: Medium (stream manipulation)

---

## Priority Ranking for Future Releases

### v1.2.0 (Current Target)
1. ✅ FLASH (completed)
2. ✅ SPLITTER (completed)
3. ✅ HX/HEATX (completed)
4. 🔄 PUMP (in progress)
5. VALVE
6. MIXER
7. COMPRESSOR/COMP
8. COLUMN (critical!)
9. EQUREACTOR
10. RXGIBBS
11. RXKINETIC

### v1.3.0 (Next Major Release)
1. HXRIG (detailed heat exchanger)
2. FURNACE (fired heater)
3. AIRCOOLER
4. CALCULATOR (comprehensive)
5. EXPANDER
6. PIPE
7. REACTOR (general)
8. RXCONV
9. RXEQUIL

### v1.4.0 (Subsequent Release)
1. BLEND (refinery applications)
2. ABSORBER
3. STRIPPER
4. EXTRACT
5. MEMBRANE SEPARATOR
6. LNGHX
7. STCALC

### v1.5.0+ (Future)
1. CAPEOPENUNIT
2. ELECTROLYTE FUELCELL
3. RESET
4. COMPONENT REPORTER
5. Specialized/rare unit operations

---

## Effort Estimation Summary

| Priority | Unit Operations | Estimated Hours | Target Version |
|----------|----------------|-----------------|----------------|
| **Critical** | COLUMN | 4-6 hrs | v1.2.0 |
| **High** | PUMP, VALVE, MIXER, COMPRESSOR | 6-8 hrs | v1.2.0 |
| **High** | EQUREACTOR, RXGIBBS, RXKINETIC | 6-9 hrs | v1.2.0 |
| **Medium-High** | HXRIG, FURNACE, AIRCOOLER | 7-9 hrs | v1.3.0 |
| **Medium-High** | CALCULATOR, EXPANDER, PIPE | 6-8 hrs | v1.3.0 |
| **Medium** | REACTOR, RXCONV, RXEQUIL | 4-5 hrs | v1.3.0 |
| **Medium** | BLEND, ABSORBER, STRIPPER | 5-7 hrs | v1.4.0 |
| **Low-Medium** | EXTRACT, MEMBRANE, LNGHX, STCALC | 6-8 hrs | v1.4.0 |
| **Low** | Others | 4-6 hrs | v1.5.0+ |

**Total estimated effort for complete coverage**: ~60-80 hours

---

## Manual Section Reference Map

| Unit Operation | Manual Chapter | Estimated Line Range | Status |
|---------------|---------------|---------------------|--------|
| FLASH | §11.1 | 8500-8909 | ✅ Complete |
| PUMP | §11.2 | 8909-9100 | 🔄 In Progress |
| VALVE | §11.3 | 9100-9204 | ⏳ Pending |
| MIXER | §11.4 | 9204-9300 | ⏳ Pending |
| SPLITTER | §11.5 | 9300-9600 | ✅ Complete |
| COMPRESSOR | §11.6 | 9600-9900 | ⏳ Pending |
| EXPANDER | §11.7 | 9900-10100 | ⏳ Pending |
| PIPE | §11.8 | 10100-10300 | ⏳ Pending |
| BLEND | §11.9 | 10300-10500 | ⏳ Pending |
| RESET | §11.10 | 10500-10600 | ⏳ Pending |
| COMPONENT REPORTER | §11.11 | 10600-10700 | ⏳ Pending |
| CAPEOPENUNIT | §11.12 | 10700-10800 | ⏳ Pending |
| MEMBRANE SEPARATOR | §11.13 | 10800-11000 | ⏳ Pending |
| ELECTROLYTE FUELCELL | §11.14 | 11000-11200 | ⏳ Pending |
| COLUMN (all) | Chapter 12 | 11200-16000 | ⏳ High Priority |
| HX/HEATX | §13.1 | 16000-17000 | ✅ Complete |
| HXRIG | §13.2 | 17000-18000 | ⏳ Pending |
| LNGHX | §13.3 | 18000-18500 | ⏳ Pending |
| AIRCOOLER | §13.4 | 18500-19000 | ⏳ Pending |
| FURNACE | §13.5 | 19000-20000 | ⏳ Pending |
| REACTOR | §14.1 | 20000-21000 | ⏳ Pending |
| EQUREACTOR | §14.2 | 21000-22000 | ⏳ High Priority |
| RXGIBBS | §14.3 | 22000-22500 | ⏳ High Priority |
| RXEQUIL | §14.4 | 22500-23000 | ⏳ Pending |
| RXCONV | §14.5 | 23000-23500 | ⏳ Pending |
| RXKINETIC | §14.6 | 23500-25000 | ⏳ High Priority |
| CALCULATOR | §10.x | 7000-8500 | ⏳ High Priority |

---

## Quality Standards for Comprehensive Tooltips

Each comprehensive tooltip should include:

1. **Description** (1-2 sentences)
   - Clear purpose statement
   - Manual section reference (e.g., "PRO/II Manual §11.2")

2. **Types Array** (5-8 items)
   - Common operation modes
   - Variants and configurations

3. **Parameters** (15-30 items)
   - Required parameters (always include UID)
   - Optional parameters organized by category
   - Common abbreviations/aliases

4. **Examples** (2-4 real-world cases)
   - Basic usage
   - Advanced configuration
   - Common patterns from actual files
   - Include comments for clarity

5. **Notes Section** (comprehensive)
   - ⚠️ Critical warnings (UID required, common errors)
   - 📋 Parameter tables (if applicable)
   - Subsections with clear headers
   - Cross-referencing information
   - Typical values/ranges
   - Common applications
   - Important tips and best practices
   - 5-10 bulleted subsections

6. **Length**: 100-200 lines for complex units, 80-120 for simpler ones

---

## Testing Checklist

For each comprehensive update:
- [ ] Hover displays correctly in VS Code
- [ ] All examples are syntactically correct
- [ ] Parameter lists are complete and accurate
- [ ] Cross-references are valid
- [ ] Notes section is well-organized
- [ ] Manual section matches content
- [ ] No TypeScript compilation errors
- [ ] Package size is reasonable (<1MB)

---

## Notes

- Manual file: `c:\Users\franc\pyScripts\doclings\res docs\Keyword Manual.txt` (34,309 lines)
- Extension location: `c:\Users\franc\pyScripts\proii-vscode-extension\`
- Data file: `src/data/unitOperations.ts`
- Approach: Read manual chapter → adapt wording → comprehensive hover
- Copyright: Use adapted wording, not verbatim copies
- Pattern: Established with SPLITTER (~120 lines comprehensive tooltip)

---

## Completion Target

- **v1.2.0**: Focus on most commonly used units (estimated 2-3 weeks at current pace)
- **v1.3.0**: Secondary important units (estimated 2-3 weeks)
- **v1.4.0+**: Specialized/rare units (as needed)
- **Full completion**: 2-3 months of development time

---

*Last Updated: January 2025*  
*Current Extension Version: 1.1.2 → 1.2.0 (in development)*
