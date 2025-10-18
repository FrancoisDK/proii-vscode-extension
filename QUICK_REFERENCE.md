# PRO/II Extension - Quick Reference Card

## 🎨 Syntax Highlighting Colors

| Element | Color | Examples |
|---------|-------|----------|
| **Unit Operations** | Teal/Cyan | FLASH, COLUMN, HX, COMPRESSOR, PUMP |
| **Major Keywords** | Purple | TITLE, PRINT, DIMENSION, METHOD |
| **Parameters** | Light Blue | TEMP, PRES, RATE, FEED, PROD, DUTY |
| **Arithmetic Operators** | **Bright Yellow** | PLUS, MINUS, TIMES, DIVIDE |
| **Continuation &** | **Bright Yellow** | `&` |
| **Comments** | Green | `$ Comment text` |
| **Numbers** | Light Green | 100, 3.14, 1.5E-3 |
| **Strings** | Orange | "TEXT" |
| **Section Headers** | Bold Purple | COMPONENT DATA, STREAM DATA |

## 🚀 Top 20 Most Useful Snippets

### Essential Structure (5)
1. **`title`** → Complete TITLE block with all fields
2. **`compdata`** → COMPONENT DATA with LIBID and ASSAY
3. **`thermodata`** → THERMODYNAMIC DATA with METHOD
4. **`streamdata`** → STREAM DATA category
5. **`unitops`** → UNIT OPERATIONS category

### FLASH Units (3)
6. **`flash-adia`** → Adiabatic flash (most common)
7. **`flash-isot`** → Isothermal flash with temperature
8. **`flash-spec`** → Flash with TPSPEC and SPEC statement

### Major Equipment (5)
9. **`column-io`** → Complete column setup (IO algorithm)
10. **`comp-poly`** → Polytropic compressor
11. **`pump`** → Basic pump with outlet pressure
12. **`hx-cold`** → Heat exchanger with cold side
13. **`mixer`** → Mixer with multiple feeds

### Utilities (4)
14. **`prop`** → Stream PROPERTY definition
15. **`spec`** → SPEC statement for specifications
16. **`define-stream`** → DEFINE from stream property
17. **`comment`** → Decorative section separator

### Advanced (3)
18. **`reactor-conv`** → Conversion reactor with stoichiometry
19. **`calculator`** → Calculator unit with PROCEDURE
20. **`splitter`** → Splitter with fractions

## ⌨️ Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Trigger snippet | Type prefix + `Tab` |
| Next placeholder | `Tab` |
| Previous placeholder | `Shift+Tab` |
| Exit snippet mode | `Escape` |
| Comment line | Type `$` |
| Line continuation | Type `&` at end |

## 📋 Common Patterns

### Complete Unit Operation
```proii
  FLASH     UID=F-1, NAME=FLASH DRUM
    FEED    STREAM_NAME
    PROD    V=VAPOR, L=LIQUID
    ISOT    TEMP(F)=100, DP=5
    METHOD  SET=SRK-HP
```

### With DEFINE
```proii
    DEFINE  TEMP AS STREAM=S1, TEMP, PLUS, 10
```

### With SPEC
```proii
  SPEC      STREAM=LIQUID, RATE, VALUE=1000
```

### Inline Comment
```proii
    FEED    STREAM1, STREAM2    $ Multiple feeds
```

## 🎯 Quick Start Workflow

```proii
$ Step 1: Title
title [Tab]

$ Step 2: Components
compdata [Tab]

$ Step 3: Thermodynamics
thermodata [Tab]

$ Step 4: Streams
streamdata [Tab]
prop [Tab] [Tab] [Tab]...

$ Step 5: Unit Operations
unitops [Tab]
flash-adia [Tab]
column-io [Tab]
pump [Tab]
```

## 💡 Pro Tips

1. **Use Tab Navigation**: After inserting snippet, press Tab to jump between fields
2. **Choice Selections**: Some fields show dropdown (|option1,option2|) - use arrows
3. **Inline Comments**: Add `$ comment` after any code line
4. **Continuation**: Use `&` at end of line (shows bright yellow)
5. **Column Formatting**: All snippets maintain Col 3, 5, 15 alignment
6. **Arithmetic**: Use PLUS, MINUS, TIMES, DIVIDE in DEFINE statements

## 🔍 Finding the Right Snippet

### "I need to..."
- **Set up a new file** → `title`, `compdata`, `thermodata`
- **Define a stream** → `prop`
- **Add a flash** → `flash-adia` (common) or `flash-isot`
- **Add a column** → `column-io` (most complete)
- **Add a compressor** → `comp-poly`
- **Add a pump** → `pump`
- **Add a heat exchanger** → `hx-cold` or `hx-hot`
- **Mix streams** → `mixer`
- **Split a stream** → `splitter`
- **Add a reactor** → `reactor-conv`
- **Calculate values** → `calculator`
- **Add a valve** → `valve`
- **Specify something** → `spec`
- **Define a parameter** → `define-stream` or `define-calc`

## 📊 Snippet Categories

| Category | Count | Prefixes Start With |
|----------|-------|---------------------|
| General | 9 | `title`, `dimension`, `comp*`, `thermo*`, `stream*`, `prop`, `print`, `sequence` |
| FLASH | 6 | `flash-*` |
| COLUMN | 3 | `column-*`, `sidestripper` |
| COMPRESSOR | 2 | `comp-*` |
| PUMP | 2 | `pump*` |
| HX | 5 | `hx-*`, `hcurve` |
| MIXER | 2 | `mixer*` |
| SPLITTER | 2 | `splitter*` |
| VALVE | 2 | `valve*` |
| REACTOR | 2 | `reactor-*` |
| CALCULATOR | 2 | `calculator`, `stcalc` |
| SPEC/DEFINE | 4 | `spec`, `define-*` |
| COMMENTS | 2 | `comment`, `comm` |

**Total: 43 snippets**

## 🎓 Example Session

```proii
TITLE       NEWFILE=C,
            CASE=A
            PROJECT=MY_PROJECT
            PROBLEM=FLASH_SEPARATION
            USER=YOUR_NAME
            DATE=01JAN2025

DIMENSION   ENGLISH, TEMP=F, PRES=PSIA, TIME=HR

COMPONENT DATA
    LIBID   1,H2O/2,H2/3,N2/4,CO2
            BANK=SIMSCI,PROCESS,SHLB=NONE

THERMODYNAMIC DATA
    METHOD  SYSTEM=SRK, TRANSPORT=PETR, SET=SRK-HP, DEFAULT

STREAM DATA
PROPERTY STREAM=FEED1, TEMP(F)=200, PRES(PSIA)=100,
         RATE(M)=1000, COMP(M)=1,50/2,30/3,20, NORMALIZE

UNIT OPERATIONS
$ ------------------- Flash Section -------------------
  FLASH     UID=F-1, NAME=FIRST FLASH
    FEED    FEED1
    PROD    V=VAPOR1, L=LIQUID1
    ADIA    DP=10                $ 10 psi pressure drop
    METHOD  SET=SRK-HP

$ ------------------- Compression Section -------------------
  COMPRESSOR UID=CMP1, NAME=VAPOR COMPRESSOR
    FEED    VAPOR1
    PROD    V=VAPOR_COMP
    OPER    PRESSURE(PSIA)=500, EFF(PCT)=75
    METHOD  SET=SRK-HP
```

---

**Print this card** for easy reference while coding!

**Package**: `proii-language-support-1.0.0.vsix` (28.25KB)  
**Documentation**: See `SNIPPETS_GUIDE.md` for complete details
