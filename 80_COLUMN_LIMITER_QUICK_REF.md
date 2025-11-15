# ⚡ PRO/II 80-Column Limiter - Quick Reference Card

## 🎯 What It Does
Warns about and fixes lines that exceed 80 characters (Pro/II truncation limit)

---

## 🚀 Quick Start (30 seconds)

1. **Open** a `.inp` file
2. **Look** for orange squiggly lines (lines > 80 chars)
3. **Right-click** on warning
4. **Choose** one of 4 fixes

✅ **Done!** Your file is now Pro/II-compatible

---

## ⚠️ What You'll See

### In the Editor
```proii
SPEC COMP=N2 MOLE-PERCENT=0.01 STREAM=OUTLET-GAS RELATIVE-ERROR=0.0001 CALCULATE
     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
     Orange squiggly line = exceeds 80 characters
```

### In Problems Panel
```
Line 42: Column 89 - Line exceeds 80 character limit by 9 characters
         (Pro/II typically truncates at column 80)
```

### Visual Ruler
```
         1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
SPEC COMP=N2 MOLE-PERCENT=0.01 STREAM=OUTLET-GAS RELATIVE-ERROR=0.0001 CALCULATE
                                                                        ↑
                                                               Vertical line at 80
```

---

## 🔧 The 4 Quick Fixes

### Option 1: **Truncate to 80**
```proii
❌ Before (89 chars):
SPEC COMP=N2 MOLE-PERCENT=0.01 STREAM=OUTLET-GAS RELATIVE-ERROR=0.0001 CALCULATE

✅ After (80 chars):
SPEC COMP=N2 MOLE-PERCENT=0.01 STREAM=OUTLET-GAS RELATIVE-ERROR=0.0001 CA
```

### Option 2: **Continue with & Marker**
```proii
❌ Before (89 chars):
SPEC COMP=N2 MOLE-PERCENT=0.01 STREAM=OUTLET-GAS RELATIVE-ERROR=0.0001 CALCULATE

✅ After (preserves all text):
SPEC COMP=N2 MOLE-PERCENT=0.01 STREAM=OUTLET-GAS RELATIVE-ERROR=0.0001 &
CALCULATE
```

### Option 3: **Truncate + Comment**
```proii
❌ Before (89 chars):
SPEC COMP=N2 MOLE-PERCENT=0.01 STREAM=OUTLET-GAS RELATIVE-ERROR=0.0001 CALCULATE

✅ After (shows what was cut):
SPEC COMP=N2 MOLE-PERCENT=0.01 STREAM=OUTLET-GAS RELATIVE-ERROR=0.0001 CA
$ TRUNCATED: LCULATE
```

### Option 4: **Add Ignore Marker**
```proii
❌ Before (89 chars - warning shown):
SPEC COMP=N2 MOLE-PERCENT=0.01 STREAM=OUTLET-GAS RELATIVE-ERROR=0.0001 CALCULATE

✅ After (warning hidden for this line):
SPEC COMP=N2 MOLE-PERCENT=0.01 STREAM=OUTLET-GAS RELATIVE-ERROR=0.0001 CALCULATE $ noqa: proii-column-limit
```

---

## 🎮 Commands

### Toggle the Limiter
```
Ctrl+Shift+P → Type: proii toggle
→ Select: PRO/II: Toggle 80-Column Limiter
```

---

## ⚙️ Quick Settings

### Disable Feature (Not Recommended)
**Settings** → Search `proii` → Uncheck `Column Limiter: Enabled`

### Change Column Limit
**Settings** → Search `proii` → Set `Column Limiter: Column Limit` to desired value (e.g., 72, 120)

### Disable Visual Ruler
**Settings** → Search `proii` → Uncheck `Column Limiter: Show Ruler`

### Disable Auto-Fixes
**Settings** → Search `proii` → Uncheck `Column Limiter: Enable Auto Fix`

---

## 🧠 Why 80 Columns?

| Issue | Symptom | Solution |
|-------|---------|----------|
| Line > 80 chars in `.inp` | Data truncated in `.out` file | Keep input ≤ 80 chars |
| Parameter values cut off | Simulation uses wrong values | Use & continuation marker |
| Stream descriptions lost | Output shows truncated names | Wrap long descriptions |

---

## ✋ When to Use Each Fix

| Fix | When to Use | Example |
|-----|------------|---------|
| **Truncate** | Comments you don't need | Long explanatory comments |
| **Continue &** | Parameters you need | Long SPEC, DEFINE statements |
| **Truncate + Comment** | Code review needed | Complex truncations |
| **Ignore** | Exceptions (rare) | Necessary long comments |

---

## 🚫 Common Mistakes

### ❌ Don't: Leave lines > 80 chars
```proii
SPEC COMP=NITROGEN MOLE-PERCENT=0.01 STREAM=OUTLET-GAS RELATIVE-ERROR=0.0001 CALCULATE
↑ Pro/II will truncate this!
```

### ✅ Do: Keep everything ≤ 80 chars
```proii
SPEC COMP=NITROGEN MOLE-PERCENT=0.01 STREAM=OUTLET-GAS &
RELATIVE-ERROR=0.0001 CALCULATE
↑ All data preserved, Pro/II reads correctly
```

---

## 📊 How It Works

1. **Scan**: Opens file → checks each line
2. **Detect**: Line > 80 chars? → Add warning
3. **Show**: Warning appears in Problems panel + squiggly line
4. **Fix**: Right-click → pick one of 4 fixes
5. **Done**: Line now ≤ 80 chars

**Performance**: < 50ms even for huge files ⚡

---

## 🎓 Pro Tips

### Tip 1: Use Continuation Markers
```proii
$ ✅ Good - uses & for continuation
UNIT OPERATIONS
PUMP P-101 INLET=INLET-STREAM OUTLET=OUTLET-STREAM &
PRESSURE-RISE=250 EFFICIENCY=0.75
```

### Tip 2: Position Parameters at Column 5
```proii
$ ✅ Standard Pro/II format
UNIT OPERATIONS
PUMP   P-101
       INLET=I1
       OUTLET=O1
       PRES-RISE=250
```

### Tip 3: Check Before Simulating
```
Before you run Pro/II simulation:
1. Run extension (Ctrl+Shift+P → "Save and Check Column Limit")
2. Fix any warnings
3. Save
4. Run Pro/II simulation
5. Enjoy complete, uncorrupted output! ✅
```

---

## 📞 Need Help?

### The Warning Won't Go Away?
- Check `proii.columnLimiter.enabled` is `true` in settings
- Make sure line is actually > 80 chars
- Reload window: Ctrl+Shift+P → "Reload Window"

### Quick-Fix Buttons Not Showing?
- Hover over orange squiggly line
- Look for lightbulb icon (💡)
- Check `proii.columnLimiter.enableAutoFix` is `true`

### I Don't See a Vertical Ruler?
- Check `proii.columnLimiter.showRuler` is `true`
- May not appear in all themes
- Usually visible as thin gray vertical line at column 80

---

## 📚 Full Documentation

For detailed information, see:
- 📖 `COLUMN_LIMITER_FEATURE.md` - Complete guide
- 📖 `RELEASE_v1.4.8.md` - Technical details
- 📖 `README.md` - Feature overview

---

**Version**: 1.4.8  
**Last Updated**: November 1, 2025  
**Status**: ✅ Ready to Use
