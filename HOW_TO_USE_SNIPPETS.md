# How to Use Snippets in VS Code - Complete Guide

## 🎯 What Are Snippets?

Snippets are **code templates** that you can insert quickly by typing a short prefix. They save time and ensure consistent formatting.

## 🚀 Basic Usage - 3 Simple Steps

### Step 1: Type the Prefix
In a `.inp`, `.std`, or `.out` file, type the snippet prefix (like `flash-adia`)

### Step 2: Press Tab
Press `Tab` or `Enter` to expand the snippet

### Step 3: Fill in the Blanks
Use `Tab` to jump between placeholders and type your values

## 📝 Complete Example

Let's create a flash unit step-by-step:

### 1. Open a PRO/II File
```
File → New File → Save as: test.inp
```

### 2. Type "flash-adia"
Just type it anywhere in the file:
```
flash-adia
```

### 3. Press Tab
The snippet expands to:
```proii
  FLASH     UID=F-1, NAME=FLASH
    FEED    FEED_STREAM
    PROD    V=VAPOR, L=LIQUID
    ADIA    DP=5
```

### 4. Fill in the Values
The cursor is now at the **first placeholder** (`F-1`):

**Tab Stop 1:** UID
```proii
  FLASH     UID=HTDF|, NAME=FLASH
              ^^^^
         (type here, cursor is highlighted)
```
Type `HTDF` to replace `F-1`

**Tab Stop 2:** NAME
Press `Tab` - cursor moves to NAME:
```proii
  FLASH     UID=HTDF, NAME=HDO FEED FLASH|
                           ^^^^^^^^^^^^^^
                        (type your name here)
```
Type `HDO FEED FLASH`

**Tab Stop 3:** FEED stream
Press `Tab` - cursor moves to FEED:
```proii
    FEED    DHTF|
            ^^^^
```
Type `DHTF`

**Tab Stop 4:** Vapor product
Press `Tab`:
```proii
    PROD    V=VAPOR|, L=LIQUID
              ^^^^^
```
Type `HTDF_V`

**Tab Stop 5:** Liquid product
Press `Tab`:
```proii
    PROD    V=HTDF_V, L=HTDF_L|
                        ^^^^^^
```
Type `HTDF_L`

**Tab Stop 6:** Pressure drop
Press `Tab`:
```proii
    ADIA    DP=10|
               ^^
```
Type `10`

**Done!** Press `Escape` or click elsewhere

## 🎨 Visual Guide

### What You'll See:

**1. Autocomplete Dropdown**
When you type `flash-`, VS Code shows matching snippets:
```
┌─────────────────────────────────┐
│ flash-adia                      │ ← Adiabatic flash
│ flash-isot                      │ ← Isothermal flash
│ flash-bubb                      │ ← Bubble point flash
│ flash-spec                      │ ← Flash with spec
│ flash-duty                      │ ← Flash with duty
│ flash-entrain                   │ ← Flash with entrain
└─────────────────────────────────┘
```
Use arrow keys to select, press `Tab` or `Enter`

**2. Highlighted Placeholders**
Placeholders are highlighted in blue/orange:
```proii
  FLASH     UID=[F-1], NAME=[FLASH]
    FEED    [FEED_STREAM]
    PROD    V=[VAPOR], L=[LIQUID]
    ADIA    DP=[5]
```
The `[...]` parts are selected - just type to replace them

**3. Tab Navigation**
Press `Tab` to move forward through placeholders
Press `Shift+Tab` to move backward

## 🎯 Choice Selections (Dropdown)

Some snippets have **dropdown choices**:

### Example: Column Condenser Type
```proii
column-io [Tab]
```

Expands and shows dropdown at condenser type:
```proii
    COND    TYPE=TOTAL, TEMP(F)=100
                 ↓↓↓↓↓
        [TOTAL, PARTIAL, SUBCOOLED]
```

Use:
- **Arrow keys** ↑↓ to select
- **Enter** to confirm
- Or just **type** the option you want

### Example: Flash Operation Type
```proii
  FLASH     UID=F-1, NAME=FLASH
    FEED    FEED
    PRODUCT M=PRODUCT
    ISOT        ← Dropdown appears here
    ↓↓↓
    [ISOT, ADIA, ISO]
```

## 💡 Pro Tips

### 1. See All Snippets
- Press `Ctrl+Space` in any `.inp` file
- Type `flash`, `column`, `pump`, etc. to filter
- VS Code shows all matching snippets with descriptions

### 2. Snippet Descriptions
Each snippet has a helpful description:
```
flash-adia    "Adiabatic Flash with pressure drop"
column-io     "Column with IO algorithm"
pump          "Basic pump with outlet pressure"
```

### 3. Escape Snippet Mode
- Press `Escape` to exit snippet mode
- Or just click elsewhere with mouse

### 4. Undo Snippet
- Press `Ctrl+Z` immediately after expanding to undo

### 5. Multi-Cursor
Some snippets have multiple instances of the same placeholder:
```proii
  SPEC      STREAM=LIQUID, RATE, VALUE=1432
                  ^^^^^^              ← Same variable
                  
    DEFINE  TEMP AS STREAM=S1, TEMP
                          ^^        ← S1 appears twice
```
When you type at one, all instances update!

## 🎓 Common Workflows

### Workflow 1: Build Complete Input File

**1. Title Block**
```
title [Tab]
→ Fill in: NEWFILE, CASE, PROJECT, PROBLEM, USER, DATE
```

**2. Components**
```
compdata [Tab]
→ Fill in: component list
```

**3. Thermodynamics**
```
thermodata [Tab]
→ Fill in: method, set name
```

**4. Streams**
```
streamdata [Tab]
prop [Tab]
→ Fill in: stream name, temp, pres, rate, comp
```
Repeat `prop [Tab]` for each stream

**5. Unit Operations**
```
unitops [Tab]
flash-adia [Tab]
→ Fill in flash details
column-io [Tab]
→ Fill in column details
```

### Workflow 2: Quick Flash Unit

```
1. Type: flash-adia [Tab]
2. UID: F-101
3. Tab: NAME: HDO FLASH
4. Tab: FEED: FEED1
5. Tab: V: VAPOR1
6. Tab: L: LIQUID1
7. Tab: DP: 15
8. Escape
Done in 10 seconds!
```

### Workflow 3: Complex Column

```
1. Type: column-io [Tab]
2. Fill in all tab stops:
   - UID: COL1
   - NAME: DEETHANIZER
   - IO iterations: 30
   - Trays: 40
   - Feed streams and locations
   - Product streams
   - Pressures
   - Condenser type and temp
   - Reflux ratio
   - Product estimates
3. Escape
Done in 30 seconds vs 5 minutes typing!
```

## 📋 All 43 Snippets Quick Reference

### Type These Prefixes + Tab:

**General (9)**
```
title          → Title block
dimension      → Dimension statement
compdata       → Component data section
thermodata     → Thermodynamic data section
streamdata     → Stream data header
unitops        → Unit operations header
prop           → Property statement
print          → Print statement
sequence       → Sequence statement
```

**FLASH Units (6)**
```
flash-adia     → Adiabatic flash
flash-isot     → Isothermal flash
flash-bubb     → Bubble point flash
flash-spec     → Flash with specification
flash-duty     → Flash with duty
flash-entrain  → Flash with entrainment
```

**COLUMN Units (3)**
```
column-io      → Column with IO algorithm
column-sure    → Column with SURE algorithm
sidestripper   → Side stripper unit
```

**COMPRESSOR (2)**
```
comp-poly      → Polytropic compressor
comp-adia      → Adiabatic compressor
```

**PUMP (2)**
```
pump           → Basic pump
pump-eff       → Pump with efficiency
```

**HEAT EXCHANGERS (5)**
```
hx-cold        → HX cold side
hx-hot         → HX hot side
hx-duty        → HX with duty
hx-both        → Two-side HX
hcurve         → Heating curve
```

**MIXER (2)**
```
mixer          → Basic mixer
mixer-temp     → Mixer with temperature
```

**SPLITTER (2)**
```
splitter       → Splitter with fractions
splitter-rate  → Splitter with rates
```

**VALVE (2)**
```
valve          → Throttle valve
valve-dp       → Valve with pressure drop
```

**REACTOR (2)**
```
reactor-conv   → Conversion reactor
reactor-equil  → Equilibrium reactor
```

**CALCULATOR (2)**
```
calculator     → Calculator unit
stcalc         → Stream calculator
```

**SPEC/DEFINE (4)**
```
spec           → Spec statement
define-stream  → Define from stream
define-unit    → Define from unit
define-calc    → Define with arithmetic
```

**COMMENTS (2)**
```
comment        → Decorative separator
comm           → Single line comment
```

## 🎬 Video Tutorial (Text Version)

### Scene 1: Empty File to Flash Unit
```
1. Open test.inp
2. Type: "flash-adia"
3. Suggestion appears
4. Press Tab
5. Code expands:
   FLASH     UID=F-1, NAME=FLASH
     FEED    FEED_STREAM
     PROD    V=VAPOR, L=LIQUID
     ADIA    DP=5
6. F-1 is selected (highlighted)
7. Type: "F101" (replaces F-1)
8. Press Tab
9. FLASH is selected
10. Type: "HDO FLASH"
11. Continue pressing Tab and typing...
12. Press Escape when done
13. Perfect flash unit in 20 seconds!
```

## ⌨️ Keyboard Shortcuts Summary

| Action | Shortcut |
|--------|----------|
| **Trigger snippet** | Type prefix + `Tab` or `Enter` |
| **Next placeholder** | `Tab` |
| **Previous placeholder** | `Shift+Tab` |
| **Accept choice** | `Enter` (when dropdown shows) |
| **Exit snippet mode** | `Escape` |
| **Show snippets** | `Ctrl+Space` |
| **Undo snippet** | `Ctrl+Z` |

## 🔍 Finding the Right Snippet

### Method 1: Type and Filter
```
Type: "flash" + Ctrl+Space
→ Shows all flash snippets
```

### Method 2: Browse All
```
Press: Ctrl+Space (in .inp file)
→ Shows ALL 43 snippets
Scroll through list
```

### Method 3: Search
```
Type partial name: "col" + Ctrl+Space
→ Shows: column-io, column-sure
```

## 🎨 Column Formatting

All snippets maintain PRO/II column format:
```
  FLASH     UID=F-1, NAME=FLASH
  ↑         ↑
  Col 3     Col 5 (keywords start here)
  (indent)  (parameters start here)
  
    FEED    FEED_STREAM
    ↑       ↑
    Col 5   Col 15 (values start here)
```

Snippets automatically format correctly - you just fill in values!

## 🆘 Troubleshooting

### Snippet Not Showing?
1. Check file extension: Must be `.inp`, `.std`, or `.out`
2. Check status bar: Should say "PRO/II"
3. Try `Ctrl+Space` after typing prefix
4. Extension installed? Check Extensions view

### Can't Navigate with Tab?
1. Make sure snippet expanded (not just typed)
2. Press `Escape` to exit, try again
3. Check no other extension interfering

### Wrong File Type?
1. Right-click file → "Change Language Mode"
2. Select "PRO/II"
3. Or save with `.inp`, `.std`, or `.out` extension

## 📚 Additional Resources

- **QUICK_REFERENCE.md** - One-page cheat sheet
- **SNIPPETS_GUIDE.md** - All 43 snippets detailed
- **README.md** - Full extension features

## 🎯 Practice Exercise

Try creating this complete flash unit in under 30 seconds:

```proii
  FLASH     UID=F-101, NAME=FEED FLASH
    FEED    FEED1
    PROD    V=VAPOR1, L=LIQUID1
    ISOT    TEMP(F)=150, DP=10
    METHOD  SET=SRK-HP
```

Steps:
1. `flash-isot` + `Tab`
2. `F-101` + `Tab`
3. `FEED FLASH` + `Tab`
4. `FEED1` + `Tab`
5. `VAPOR1` + `Tab`
6. `LIQUID1` + `Tab`
7. Keep defaults or modify
8. `Escape`

**Time yourself!** With practice, you'll do this in seconds!

---

## 🎉 Summary

**Using snippets is easy:**
1. Type prefix (like `flash-adia`)
2. Press `Tab`
3. Fill in values (Tab between fields)
4. Press `Escape` when done

**Benefits:**
- ⚡ 10x faster than typing
- ✅ No syntax errors
- 🎨 Perfect formatting
- 📋 Consistent code

**Start practicing now!** Open a `.inp` file and try `flash-adia` + `Tab`!

---

**Happy coding!** 🚀
