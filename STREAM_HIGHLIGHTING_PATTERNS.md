# PRO/II Stream Highlighting Patterns Analysis

## Overview
Streams in PRO/II UNIT OPERATIONS sections appear in specific patterns that vary by unit operation type and context. This document defines the comprehensive patterns for accurate semantic token highlighting.

## Core Stream Usage Patterns

### 1. **FEED Keyword Pattern**
Stream names appear after `FEED` keyword in different contexts:

```proii
FEED SRGO, LRY, DMDS              # Multiple streams, comma-separated
FEED FRSHBL                       # Single stream
FEED TGSI                         # Single stream
FEED HPLF,  1.0               /&  # Stream with quantity, /& continuation
```

**Pattern**: `FEED\s+(stream1\s*,\s*stream2\s*,\s*stream3|stream)`

**Characteristics**:
- Comma-separated lists
- Optional quantities after stream names
- Can span multiple lines with `/&` continuation character

---

### 2. **PRODUCT/PROD Output Patterns**
The most common pattern - product streams defined with phase designators:

#### 2.1 **M= Pattern (Total/Mixed)**
```proii
Product m = DHTF              # Mixed phase (all streams)
PRODUCT   M=FRSH1             # Mixed phase
PROD      M=SBTIN             # Mixed phase
PROD m = FGCO                 # Mixed phase (lowercase 'm')
PRODUCT   M=HPSW              # Mixed phase
```

#### 2.2 **L= Pattern (Liquid)**
```proii
PROD      L=ISBTP             # Liquid phase
PROD L = LRY                  # Liquid phase
Product L = CHPL1DIS          # Liquid phase
PRODOCT L = CHPL1DIS          # Note: typo in original (PRODOCT)
Product L = CHPL1REC          # Liquid phase
```

#### 2.3 **V= Pattern (Vapor)**
```proii
Product v = R2OUV, L = R2OUL  # Vapor AND Liquid (same line)
Product v = CHPV1, L = IHSW   # Multiple phases
Product v = CHIV, L = CHPL, W = CHIW  # Three phases (V, L, W)
PRODUCT   V=TGSI,L=TGSIL      # Vapor and Liquid (no spaces)
Product v = CHPV, L = CHSW    # Vapor and Liquid
```

#### 2.4 **W= Pattern (Water)**
```proii
Product V=IHIV,L=CHPL1,W=IHIW # Water phase
Product v = CHIV, L = CHPL, W = CHIW  # Water phase
```

#### 2.5 **Multi-Phase Same Line**
```proii
Product v = R2OUV, L = R2OUL                    # V and L
Product   V=IHIV,L=CHPL1,W=IHIW                # V, L, W
Product v = CHPV1, L = IHSW                    # V and L
PRODUCT   V=TGSI,L=TGSIL                       # V and L
Product v = CHPV, L = CHSW                     # V and L
Product v = CHIV, L = CHPL, W = CHIW           # V, L, W
```

**Pattern**: `(PRODUCT|PROD)\s+(M|m|V|v|L|W)(\s*=|\s+)\s*stream`

**Characteristics**:
- Case-insensitive phase designators (m/M, v/V, L, W)
- Spaces optional around `=` sign
- Multiple phases on same line separated by commas

---

### 3. **OVHD/BTMS Patterns (Distillation Products)**

#### 3.1 **OVHD (Overhead) Pattern**
```proii
OVHD      M=H2C1              # Overhead main product
OVHD      M= H2C2             # Overhead (with space before stream name)
OVHD(M)=HPOVN,120.4331784,&   # Overhead with quantity
```

#### 3.2 **BTMS (Bottoms) Pattern**
```proii
BTMS      M=EX71              # Bottoms main product
BTMS m = CHCL                 # Bottoms (lowercase)
BTMS(M)=HPLF ,38.28197232     # Bottoms with quantity
```

**Pattern**: `(OVHD|BTMS)(\(M\))?(\s*=|M\s*=|m\s*=)\s*stream`

**Characteristics**:
- Often appear on consecutive lines in distillation units
- May have `(M)` notation in some cases
- Can have quantities after stream name

---

### 4. **STRM= / STREAM= Patterns (Definition References)**

#### 4.1 **In DEFINE Statements**
```proii
DEFINE    P(1) AS STRM=HCL, H2S, NH3, DHTG, DHTE, DMDE
DEFINE    P(1) AS STRM=SRGO RATE(WT)
DEFINE    P(2) AS STRM=DMDS RATE
DEFINE    P(1) AS STRM=TGSI COMP=6 RATE
DEFINE    TEMP AS STRM=TGS1 TEMP
DEFINE    PRES AS CALC=HDST R(2)    &
          PLUS 12
```

#### 4.2 **In OUTPUT Statements**
```proii
OUTPUT Format = GEN, STRM = ALL
OUTPUT Format = GEN, STRM = R1IN, R1OU, R2IN, R2OU
OUTPUT Format = ASTM, STRM = SRGO, LRY, DHTF
OUTPUT Format = ASTM, STRM = CHPL1, CHPL, ISBTIN, R2OUL
OUTPUT Format = CHECK, STRM = HHPSIN, Acot, QLIQC, HEO3A
```

#### 4.3 **In CALCULATOR PROCEDURE Calls**
```proii
CALL    SRXSTR(SWR,H2S ,H2S)        $ Set H2S formation rate
CALL    SRXSTR(SWR,NH3 ,NH3)        $ Set NH3 formation rate
CALL    SRXSTR(SWR,GAS ,DHTG)       $ Set gas make rate
```

**Pattern**: `(DEFINE|OUTPUT|STRM|STREAM)(\s*)=(\s*)(stream1\s*,\s*stream2|stream)`

**Characteristics**:
- Comma-separated lists common in OUTPUT
- Part of DEFINE AS syntax
- In PROCEDURE context for variable definitions

---

### 5. **Continuation Lines (After /&)**

When a line ends with `/&`, the next lines are continuations:

```proii
FEED      HPLF,    1.0        /&
          QLIQ2,-1.0          /&    # Continuation - stream at line start
          LRY  , -1#                # Continuation - stream at line start

PRODUCT   OVHD(M)=HPOVN,120.4331784,&
          BTMS(M)=HPLF ,38.28197232

FEED      HPIS,1,TSEPARATE         /&
          (continuation next line)
```

**Pattern Recognition**:
- Line starts with whitespace
- First token after whitespace is stream name
- Followed by comma, space, or number
- Example: `            QLIQ2,-1.0`

---

## Complete Semantic Token Patterns

### **Pattern 1: Separator-Based (WORKING)**
```regex
([\s,=\(\[])${streamName}([\s,=\)\];/*]|$)
```
- Matches: `FEED HPLF`, `L=ISBTP`, `M=LQRD`, `STRM=HPLF`
- Handles: Separators before AND after stream name
- Includes: End-of-line matching with `|$`

**Examples**:
- ` HPLF ` ✓ (spaces before/after)
- `,LQRD ` ✓ (comma before, space after)
- `=ISBTP` ✓ (= before, end-of-line after)
- `(STREAM)` ✓ (parenthesis before/after)

### **Pattern 2: Line-Start (FOR CONTINUATION)**
```regex
^(\s*)${streamName}([\s,=\)\];/*]|$)
```
- Matches: Streams at start of line after whitespace
- Context: `/&` continuation lines
- Handles: `            QLIQ2,-1.0`, `            LRY , -1#`

**Examples**:
- `            QLIQ2,` ✓ (many spaces, stream, comma)
- `  LRY ` ✓ (few spaces, stream, space)
- `      IHIV,` ✓ (continuation pattern)

---

## Unit Operation Stream Patterns Summary

| Unit Op Type | FEED Pattern | Product Pattern | Notes |
|--------------|-------------|-----------------|-------|
| **FLASH** | `FEED strm1, strm2` | `Product M=strm` | Simple mixer |
| **COMPRESSOR** | `FEED strm` | `Product M=strm` | Single inlet/outlet |
| **DISTILLATION** | `FEED strm` | `OVHD M=strm / BTMS M=strm` | Two products |
| **SEPARATOR** | `FEED strm` | `Product V=strm, L=strm` | Phase split |
| **CALCULATOR** | `FEED strm` | `DEFINE P(n) AS STRM=strm` | Procedure-based |
| **MIXER** | `FEED strm1, strm2` | `Product M=strm` | Combining streams |

---

## Non-Stream Contexts to Avoid

1. **Variable Assignment**: `FEED = 3` (FEED is variable, not keyword)
2. **Numerical Values**: `R(1) = 2907260` (R(1) is array, not stream)
3. **Keywords as Variables**: `PROD = P(1) - HCL - NH3` (PROD is calculation result)
4. **Type Declarations**: In PROCEDURE sections: `INTEGER CASE, FEED`
5. **Property References**: `STRM=TGSI RATE`, `COMP=6` (RATE, COMP are properties)

---

## Implementation Rules

### **Rule 1: Context Awareness**
- Don't highlight stream names in PROCEDURE sections when used as variables
- Skip `NAME` sections themselves (stream definitions, not references)
- Avoid highlighting in comments (anything after `$`)

### **Rule 2: Separator Validation**
- Require separator before stream (space, comma, =, (, [)
- Require separator after stream (space, comma, =, ), ], ;, /, *, or EOL)
- Prevents false positives like `STREAMER` being matched as `STREAM + ER`

### **Rule 3: Phase Designator Handling**
- Recognize M/m, V/v, L, W as phase markers
- Handle optional spaces: `M=`, `m =`, `M =`
- Support multiple phases: `V=strm1,L=strm2,W=strm3`

### **Rule 4: Continuation Line Support**
- After `/&`, subsequent lines may start with stream names
- Strip leading whitespace but respect line boundaries
- Examples: `            QLIQ2,-1.0`, `            LRY  , -1#`

---

## Special Cases

### **Case 1: Spaces Before Equals**
```proii
OVHD      M= H2C1              # Space after =
OVHD      M =H2C2              # Space before =
PROD L = LRY                    # Spaces around =
```

### **Case 2: Parenthesized Phases**
```proii
OVHD(M)=HPOVN,120.4331784
PRODUCT   OVHD(M)=HPOVN,120.4331784,&
              BTMS(M)=HPLF ,38.28197232
```

### **Case 3: Multiple Streams on One Line**
```proii
FEED SRGO, LRY, DMDS
PRODUCT   V=IHIV,L=CHPL1,W=IHIW
OUTPUT Format = ASTM, STRM = CHPL1, CHPL, ISBTIN, R2OUL
```

### **Case 4: Stream Names With Quantities**
```proii
FEED      HPLF,  1.0        /&
PRODUCT   OVHD(M)=HPOVN,120.4331784
OVHD      M= H2C1 DT=5
```

---

## Test Cases Covered

✅ **ISBTIN** - FEED keyword context  
✅ **ISBTP** - L=STREAM end-of-line  
✅ **HPLF** - FEED keyword, multiple uses  
✅ **QLIQ2** - Continuation line after /&  
✅ **LRY** - Continuation line after /&, and in DEFINE  
✅ **LQRD** - M=STREAM pattern  
✅ **H2C1** - OVHD M= pattern  
✅ **HPOVN** - Multi-phase, with quantity  
✅ **CHPL1** - Multiple contexts (FEED, OUTPUT, phase designator)  
✅ **TGSI** - STRM= in DEFINE  

---

## Performance Considerations

- Stream list sorted by length (longest first) to prevent substring matches
- Both patterns applied to each line (order doesn't matter)
- Skip NAME sections and PROCEDURE sections to reduce false positives
- Regex compiled once, reused across all stream names

---

## Future Enhancements

1. **Type Inference**: Distinguish between FEED streams vs PRODUCT streams
2. **Color Coding by Phase**: Different colors for V=, L=, M= contexts
3. **Cross-Reference**: Link stream definitions to usages
4. **Validation**: Warn on undefined stream references
5. **Refactoring**: Support renaming streams throughout file
