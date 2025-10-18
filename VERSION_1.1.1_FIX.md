# 🔧 Version 1.1.1 - Reactor Keywords Fix

## What Was Fixed

**Issue:** EQUREACTOR keyword was not recognized by hover tooltips  
**Solution:** Added 8 additional reactor and calculator keywords

## ✨ New Keywords Added (v1.1.1)

### Reactor Types (6 new)
1. **EQUREACTOR** - Equilibrium reactor ⭐ (Your request!)
2. **RXGIBBS** - Gibbs free energy minimization
3. **RXEQUIL** - Equilibrium reactor (alternative)
4. **RXCONV** - Conversion-based reactor
5. **RXKINETIC** - Kinetic reactor with rate equations
6. (REACTOR was already included in v1.1.0)

### Calculator Types (2 new)
7. **CALCULATOR** - Custom calculations
8. **STCALC** - Stream calculations

## 📊 Updated Coverage

### Total Hover Tooltips: 66 (was 58)
- **21 Unit Operations** (was 13) ⬆️ +8
  - All reactor types now included
- **15+ Thermodynamic Methods** (unchanged)
- **30+ Parameters** (unchanged)

## 📦 Package Details

**Version:** 1.1.1  
**Size:** 230.97 KB (was 212.97 KB)  
**Files:** 39 files (was 35)  
**Date:** October 13, 2025

## 🎯 Now You Can Hover Over:

### All Reactor Types:
```proii
REACTOR         ← Generic reactor (v1.1.0)
EQUREACTOR      ← Equilibrium reactor ⭐ NEW!
RXGIBBS         ← Gibbs reactor ⭐ NEW!
RXEQUIL         ← Equilibrium alt. ⭐ NEW!
RXCONV          ← Conversion reactor ⭐ NEW!
RXKINETIC       ← Kinetic reactor ⭐ NEW!
```

### Calculator Types:
```proii
CALCULATOR      ← Custom calculations ⭐ NEW!
STCALC          ← Stream calculations ⭐ NEW!
```

### All Previous Keywords:
- FLASH, COLUMN, HEATX, PUMP, COMP, VALVE
- MIXER, SPLITTER, PIPE
- ABSORBER, STRIPPER, EXTRACT
- Plus all thermo methods and parameters

## 🧪 Test in Your File

Open your `RIIG.inp` file and hover over:

**Line 29:**
```proii
EQUREACTOR  ← Hover here - NOW WORKS! ✅
```

**Line 21:**
```proii
CALCULATOR  ← Hover here - NOW WORKS! ✅
```

**Line 39:**
```proii
STCALC      ← Hover here - NOW WORKS! ✅
```

## 📥 How to Upgrade

### From v1.1.0:
```
1. Uninstall v1.1.0 (optional)
2. Extensions → Install from VSIX
3. Select: proii-language-support-1.1.1.vsix
4. Reload VS Code
5. Test hover on EQUREACTOR - it works! ✅
```

## 🎯 What You'll See

### Hover over EQUREACTOR:
```
┌────────────────────────────────────────────┐
│ ⚙️ EQUREACTOR                              │
│                                            │
│ Equilibrium Reactor - Chemical reactions  │
│ at equilibrium conditions                 │
│                                            │
│ Types:                                     │
│ - Equilibrium - Reactions reach           │
│   equilibrium state                       │
│ - Multiple reactions - Simultaneous       │
│   equilibrium reactions                   │
│                                            │
│ Required: FEED, PROD, REACTION             │
│ Optional: NAME, TEMP, PRES, DUTY, VOL,    │
│           APPROACH                         │
│                                            │
│ Example:                                   │
│   EQUREACTOR                               │
│       NAME=R-101                           │
│       FEED=S1                              │
│       PROD=S2                              │
│       TEMP=250(C)                          │
│       PRES=5.0(BAR)                        │
│       REACTION METHANATION                 │
│       APPROACH FRACTION=0.364              │
│                                            │
│ 💡 Note: Use APPROACH to specify approach │
│    to equilibrium (0=no reaction,         │
│    1=full equilibrium)                    │
└────────────────────────────────────────────┘
```

### Hover over CALCULATOR:
```
┌────────────────────────────────────────────┐
│ ⚙️ CALCULATOR                              │
│                                            │
│ Calculator - Custom calculations using    │
│ stream properties and user equations      │
│                                            │
│ Required: UID, NAME                        │
│ Optional: DEFINE, PROCEDURE, FEED, PROD   │
│                                            │
│ Example:                                   │
│   CALCULATOR UID=R1MR,                     │
│       NAME=METHANATION RATIO HDO REACTOR  │
│       DEFINE P(1) AS STRM=DHTG COMP=6     │
│       DEFINE P(2) AS STRM=DHTG COMP=15    │
│       PROCEDURE                            │
│           R(1) = P(1)/(P(1)+P(2)+P(3))    │
│       Return                               │
│                                            │
│ 💡 Note: Powerful tool for custom         │
│    calculations. Can read/write stream    │
│    properties and set specifications.     │
└────────────────────────────────────────────┘
```

## 📈 Version Progression

```
v1.0.0 →  28.25 KB  - Base (.inp)
v1.0.1 →  45.41 KB  - + .std files
v1.0.2 →  46.76 KB  - + .out files
v1.0.3 → 193.33 KB  - + Icon
v1.1.0 → 212.97 KB  - + 58 hover tooltips
v1.1.1 → 230.97 KB  - + 8 reactor/calc keywords ⭐ YOU ARE HERE
```

## ✅ Issue Resolved

**Original Issue:** "EQUAREACTOR IS NOT PICKEUP AS KEY"  
**Status:** ✅ **FIXED in v1.1.1**

Now you can hover over:
- ✅ EQUREACTOR
- ✅ All other reactor types
- ✅ CALCULATOR and STCALC

## 🎉 Summary

**Quick Fix:** We added 8 missing keywords to the hover tooltips!

**Install:** `proii-language-support-1.1.1.vsix`  
**Size:** 230.97 KB  
**New Features:** 8 additional reactor and calculator keywords  
**Total Tooltips:** 66 (21 unit ops + 15 thermo + 30 params)

---

**Created:** October 13, 2025  
**Version:** 1.1.1  
**Issue:** EQUREACTOR not recognized → ✅ **FIXED**
