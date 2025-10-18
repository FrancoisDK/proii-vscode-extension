# 📺 Visual Demo: Snippets in Action

## Example 1: Creating a Flash Unit (Step-by-Step Screenshots)

### Step 1: Empty File
```
┌─────────────────────────────────────────────────────┐
│ File: test.inp                    PRO/II    Ln 1, Col 1 │
├─────────────────────────────────────────────────────┤
│                                                     │
│ |  ← cursor here                                    │
│                                                     │
│                                                     │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Step 2: Type "flash-adia"
```
┌─────────────────────────────────────────────────────┐
│ File: test.inp                    PRO/II    Ln 1, Col 11│
├─────────────────────────────────────────────────────┤
│                                                     │
│ flash-adia|                                         │
│           ▲                                         │
│       (cursor)                                      │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Step 3: Autocomplete Appears
```
┌─────────────────────────────────────────────────────┐
│ File: test.inp                    PRO/II    Ln 1, Col 11│
├─────────────────────────────────────────────────────┤
│                                                     │
│ flash-adia|                                         │
│ ┌────────────────────────────────────────────────┐ │
│ │ ▶ flash-adia                                   │ │
│ │   Adiabatic Flash with pressure drop           │ │
│ │                                                 │ │
│ │   flash-isot                                   │ │
│ │   Isothermal flash at specified temperature    │ │
│ │                                                 │ │
│ │   flash-bubb                                   │ │
│ │   Bubble point flash                           │ │
│ └────────────────────────────────────────────────┘ │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Step 4: Press Tab → Snippet Expands!
```
┌─────────────────────────────────────────────────────┐
│ File: test.inp                    PRO/II    Ln 1, Col 18│
├─────────────────────────────────────────────────────┤
│                                                     │
│   FLASH     UID=█F-1█, NAME=FLASH                   │
│                 ▲▲▲▲                                │
│             (highlighted - active placeholder)      │
│     FEED    FEED_STREAM                             │
│     PROD    V=VAPOR, L=LIQUID                       │
│     ADIA    DP=5                                    │
│                                                     │
└─────────────────────────────────────────────────────┘
```
**Tab Stop 1** is active (F-1 is highlighted in blue/orange)

### Step 5: Type "F101"
```
┌─────────────────────────────────────────────────────┐
│ File: test.inp                    PRO/II    Ln 1, Col 21│
├─────────────────────────────────────────────────────┤
│                                                     │
│   FLASH     UID=█F101█, NAME=FLASH                  │
│                 ▲▲▲▲▲                               │
│             (you typed this)                        │
│     FEED    FEED_STREAM                             │
│     PROD    V=VAPOR, L=LIQUID                       │
│     ADIA    DP=5                                    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Step 6: Press Tab → Move to NAME
```
┌─────────────────────────────────────────────────────┐
│ File: test.inp                    PRO/II    Ln 1, Col 30│
├─────────────────────────────────────────────────────┤
│                                                     │
│   FLASH     UID=F101, NAME=█FLASH█                  │
│                            ▲▲▲▲▲▲                   │
│                        (now highlighted)            │
│     FEED    FEED_STREAM                             │
│     PROD    V=VAPOR, L=LIQUID                       │
│     ADIA    DP=5                                    │
│                                                     │
└─────────────────────────────────────────────────────┘
```
**Tab Stop 2** is now active

### Step 7: Type "HDO FLASH"
```
┌─────────────────────────────────────────────────────┐
│ File: test.inp                    PRO/II    Ln 1, Col 39│
├─────────────────────────────────────────────────────┤
│                                                     │
│   FLASH     UID=F101, NAME=█HDO FLASH█              │
│                            ▲▲▲▲▲▲▲▲▲▲▲              │
│     FEED    FEED_STREAM                             │
│     PROD    V=VAPOR, L=LIQUID                       │
│     ADIA    DP=5                                    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Step 8: Continue with Tab → Fill All Fields
```
┌─────────────────────────────────────────────────────┐
│ File: test.inp                    PRO/II    Ln 4, Col 20│
├─────────────────────────────────────────────────────┤
│                                                     │
│   FLASH     UID=F101, NAME=HDO FLASH                │
│     FEED    FEED1                                   │
│     PROD    V=VAPOR1, L=LIQUID1                     │
│     ADIA    DP=█10█                                 │
│                ▲▲▲                                  │
│            (last field)                             │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Step 9: Press Escape → Done!
```
┌─────────────────────────────────────────────────────┐
│ File: test.inp                    PRO/II    Ln 4, Col 22│
├─────────────────────────────────────────────────────┤
│                                                     │
│   FLASH     UID=F101, NAME=HDO FLASH                │
│     FEED    FEED1                                   │
│     PROD    V=VAPOR1, L=LIQUID1                     │
│     ADIA    DP=10|                                  │
│                  ▲                                  │
│             (normal cursor)                         │
│                                                     │
└─────────────────────────────────────────────────────┘
```
**Complete flash unit in 15 seconds!** ✅

---

## Example 2: Dropdown Choice Selection

### Step 1: Type "column-io" + Tab
```
┌─────────────────────────────────────────────────────┐
│ File: test.inp                    PRO/II    Ln 5, Col 1 │
├─────────────────────────────────────────────────────┤
│   COLUMN    UID=█COL1█, NAME=DISTILLATION COLUMN    │
│                 ▲▲▲▲▲                               │
│     PARA    IO=30, TRAY=20                          │
│     FEED    FEED1,10/FEED2,15                       │
│     PROD    OVHD=OVHD, BTMS=BTMS                    │
│     PRES    TOP(PSIA)=20, BOTTOM(PSIA)=25           │
│     COND    TYPE=TOTAL, TEMP(F)=100                 │
│     ...                                             │
└─────────────────────────────────────────────────────┘
```

### Step 2: Tab Through Fields Until Condenser Type
```
┌─────────────────────────────────────────────────────┐
│ File: test.inp                    PRO/II    Ln 10, Col 18│
├─────────────────────────────────────────────────────┤
│     PROD    OVHD=DIST, BTMS=BOTTOMS                 │
│     PRES    TOP(PSIA)=50, BOTTOM(PSIA)=55           │
│     COND    TYPE=█TOTAL█, TEMP(F)=120               │
│                  ▲▲▲▲▲▲                             │
│                                                     │
│ ┌────────────────────────────┐                     │
│ │ ▶ TOTAL                    │ ← Arrow keys select │
│ │   PARTIAL                  │                     │
│ │   SUBCOOLED                │                     │
│ └────────────────────────────┘                     │
│                                                     │
└─────────────────────────────────────────────────────┘
```
**Dropdown appears!** Use arrows or type to select.

### Step 3: Select "PARTIAL" and Press Enter
```
┌─────────────────────────────────────────────────────┐
│ File: test.inp                    PRO/II    Ln 10, Col 21│
├─────────────────────────────────────────────────────┤
│     PROD    OVHD=DIST, BTMS=BOTTOMS                 │
│     PRES    TOP(PSIA)=50, BOTTOM(PSIA)=55           │
│     COND    TYPE=█PARTIAL█, TEMP(F)=120             │
│                  ▲▲▲▲▲▲▲▲                           │
│                (selected!)                          │
│     REFLUX  RATIO=3.0                               │
│                                                     │
└─────────────────────────────────────────────────────┘
```
**Choice accepted!** Continue with Tab to next field.

---

## Example 3: Multiple Instances of Same Placeholder

### When You Type at One, All Update!

**Before typing:**
```
┌─────────────────────────────────────────────────────┐
│   SPEC      STREAM=█LIQUID█, RATE, VALUE=1432       │
│                    ▲▲▲▲▲▲▲                          │
│                                                     │
│   DEFINE    TEMP AS STREAM=█LIQUID█, TEMP           │
│                            ▲▲▲▲▲▲▲                  │
│                  (both highlighted - linked!)       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**After typing "PROD1":**
```
┌─────────────────────────────────────────────────────┐
│   SPEC      STREAM=█PROD1█, RATE, VALUE=1432        │
│                    ▲▲▲▲▲▲                           │
│                                                     │
│   DEFINE    TEMP AS STREAM=█PROD1█, TEMP            │
│                            ▲▲▲▲▲▲                   │
│                  (both updated automatically!)      │
│                                                     │
└─────────────────────────────────────────────────────┘
```
**Magic! Both placeholders update together!** ✨

---

## Example 4: Browsing All Snippets

### Press Ctrl+Space in .inp File
```
┌─────────────────────────────────────────────────────┐
│ File: test.inp                    PRO/II    Ln 1, Col 1 │
├─────────────────────────────────────────────────────┤
│ |                                                    │
│ ┌──────────────────────────────────────────────────┐│
│ │ 📄 title                                         ││
│ │    Complete TITLE block                          ││
│ │                                                  ││
│ │ 📐 dimension                                     ││
│ │    Define dimensional units                      ││
│ │                                                  ││
│ │ 🧪 compdata                                      ││
│ │    Component Data section                        ││
│ │                                                  ││
│ │ 🌡️ thermodata                                    ││
│ │    Thermodynamic Data section                    ││
│ │                                                  ││
│ │ 💧 flash-adia                                    ││
│ │    Adiabatic flash with pressure drop            ││
│ │                                                  ││
│ │ ⚗️ column-io                                     ││
│ │    Column with IO algorithm                      ││
│ │                                   [43 items] ↓   ││
│ └──────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────┘
```
**Scroll through all 43 snippets!**

---

## Example 5: Filtering Snippets

### Type "flash" + Ctrl+Space
```
┌─────────────────────────────────────────────────────┐
│ File: test.inp                    PRO/II    Ln 1, Col 6 │
├─────────────────────────────────────────────────────┤
│ flash|                                              │
│ ┌──────────────────────────────────────────────────┐│
│ │ 💧 flash-adia                                    ││
│ │    Adiabatic Flash with pressure drop            ││
│ │                                                  ││
│ │ 🌡️ flash-isot                                    ││
│ │    Isothermal flash at specified temperature     ││
│ │                                                  ││
│ │ 🫧 flash-bubb                                    ││
│ │    Bubble point flash                            ││
│ │                                                  ││
│ │ 📊 flash-spec                                    ││
│ │    Flash with TPSPEC                             ││
│ │                                                  ││
│ │ ⚡ flash-duty                                    ││
│ │    Flash with defined duty                       ││
│ │                                                  ││
│ │ 💨 flash-entrain                                 ││
│ │    Flash with entrainment                        ││
│ │                                   [6 items]      ││
│ └──────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────┘
```
**Only flash snippets shown!**

---

## Example 6: Status Bar Shows Language

### Bottom of VS Code Window
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│                 (your code here)                    │
│                                                     │
├─────────────────────────────────────────────────────┤
│ ⓘ PRO/II    🔤 UTF-8    ↵ CRLF    Ln 1, Col 1    ↗️ │
│   ▲▲▲▲▲▲                                           │
│   (language mode - must show PRO/II for snippets)  │
└─────────────────────────────────────────────────────┘
```

---

## Example 7: Real-World Complete File Creation

### Sequence of Snippets Used:

**Step 1:** `title` + Tab
```
TITLE       NEWFILE=C,
            CASE=A
            PROJECT=MY_PROJECT
```

**Step 2:** `compdata` + Tab
```
COMPONENT DATA
    LIBID   1,H2O/2,H2/3,N2
```

**Step 3:** `thermodata` + Tab
```
THERMODYNAMIC DATA
    METHOD  SYSTEM=SRK, SET=SRK-HP
```

**Step 4:** `streamdata` + Tab
```
STREAM DATA
```

**Step 5:** `prop` + Tab (repeat 3x)
```
PROPERTY STREAM=FEED1, TEMP(F)=100, PRES(PSIA)=50
PROPERTY STREAM=FEED2, TEMP(F)=150, PRES(PSIA)=60
PROPERTY STREAM=FEED3, TEMP(F)=200, PRES(PSIA)=70
```

**Step 6:** `unitops` + Tab
```
UNIT OPERATIONS
```

**Step 7:** `flash-adia` + Tab
```
  FLASH     UID=F-1, NAME=FLASH
    FEED    FEED1
    PROD    V=V1, L=L1
    ADIA    DP=10
```

**Step 8:** `mixer` + Tab
```
  MIXER     UID=MIX1, NAME=MIXER
    FEED    V1,FEED2
    PROD    M=MIXED
```

**Step 9:** `column-io` + Tab
```
  COLUMN    UID=COL1, NAME=COLUMN
    PARA    IO=30, TRAY=20
    FEED    MIXED,10
    PROD    OVHD=DIST, BTMS=BTMS
    ...
```

**Total time: 3 minutes vs 20 minutes typing!** 🚀

---

## Color Legend for Placeholders

```
█████ ← Blue/Orange highlight = Active placeholder (type to replace)
▼▼▼▼▼ ← Arrow indicates current position
[  ] ← Brackets show linked placeholders (update together)
```

---

## 🎯 Quick Reference Card

```
╔═══════════════════════════════════════════════════╗
║         SNIPPET KEYBOARD SHORTCUTS                ║
╠═══════════════════════════════════════════════════╣
║ Ctrl+Space        → Show all snippets             ║
║ Type prefix+Tab   → Expand snippet                ║
║ Tab               → Next placeholder              ║
║ Shift+Tab         → Previous placeholder          ║
║ Enter             → Accept dropdown choice        ║
║ Escape            → Exit snippet mode             ║
║ Ctrl+Z            → Undo snippet                  ║
╚═══════════════════════════════════════════════════╝
```

---

## 💡 Practice Exercise

**Try this in VS Code now:**

1. Create new file: `practice.inp`
2. Type: `flash-adia`
3. Press `Tab`
4. Fill in:
   - UID: `PRACTICE`
   - NAME: `TEST FLASH`
   - FEED: `FEED1`
   - V: `VAPOR`
   - L: `LIQUID`
   - DP: `5`
5. Press `Escape`

**Congratulations!** You've used your first snippet! 🎉

---

**See Also:**
- **QUICK_REFERENCE.md** - All 43 snippet prefixes
- **SNIPPETS_GUIDE.md** - Detailed descriptions
- **HOW_TO_USE_SNIPPETS.md** - This guide (text version)
