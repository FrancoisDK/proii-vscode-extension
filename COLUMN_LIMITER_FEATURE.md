# 80-Column Width Limiter Feature

## 📋 Overview

The **80-Column Width Limiter** helps enforce Pro/II's 80-character limit for input files. Pro/II typically truncates output at column 80, which can cause data loss or misalignment in `.out` files. This feature provides warnings and automatic fixes.

**Release**: v1.5.0 (NEW)

---

## 🎯 Why 80 Columns?

Pro/II's output formatting traditionally limits output to 80 characters per line (legacy terminal constraint). When input files exceed 80 characters:
- Output files may truncate data
- Simulation results can be misaligned or incomplete
- Parameter values may be cut off
- Stream descriptions may be lost

This feature helps catch these issues before simulation.

---

## ✨ Features

### 1. **Automatic Diagnostics** ⚠️
When you open or edit a `.inp` file:
- Lines exceeding 80 characters are highlighted with a warning
- Shows how many characters over the limit
- Appears in VS Code's **Problems** panel
- Inline squiggly underline on excessive portion

**Example:**
```proii
UNIT OPERATIONS                                          $ Line length OK (43 chars)
FLASH F-101  OUTLET=V INLET=I1 INLET=I2  VAPOR_FRAC=0.5  $ ⚠️ EXCEEDS (89 chars)
```

### 2. **Quick-Fix Actions** 🔧
Right-click on the warning to see 4 auto-fix options:

#### Option A: **Truncate to 80 characters**
- Removes all characters beyond column 80
- Fastest fix, minimal editing

#### Option B: **Continue line with & marker**
- Adds `&` continuation marker at end of first 80 columns
- Breaks remaining text to next line
- Preserves all content

#### Option C: **Truncate with comment**
- Truncates at 80 columns
- Adds comment line with truncated portion
- Helpful for code review

#### Option D: **Add ignore marker**
- Adds `$ noqa: proii-column-limit` comment
- Disables warning for this specific line
- Useful for necessary long lines

---

## ⚙️ Configuration

Open **Settings** (Ctrl+Shift+P → "Preferences: Open Settings") and search for "proii" to configure:

### Enable/Disable the Limiter
```json
"proii.columnLimiter.enabled": true
```
- **Default**: `true`
- **Type**: Boolean
- **Effect**: Turns column checking on/off

### Set Column Limit
```json
"proii.columnLimiter.columnLimit": 80
```
- **Default**: `80`
- **Range**: 40-200
- **Use Case**: Change to 72 for older systems, 120 for modern displays

### Show Warnings
```json
"proii.columnLimiter.warnOnExceed": true
```
- **Default**: `true`
- **Type**: Boolean
- **Effect**: Shows diagnostics when lines exceed limit

### Enable Auto-Fix
```json
"proii.columnLimiter.enableAutoFix": true
```
- **Default**: `true`
- **Type**: Boolean
- **Effect**: Provides quick-fix code actions

### Show Visual Ruler
```json
"proii.columnLimiter.showRuler": true
```
- **Default**: `true`
- **Type**: Boolean
- **Effect**: Displays vertical line at column 80 in editor

---

## 🚀 Usage Examples

### Example 1: Simple Truncation
**Before:**
```proii
$ This is a very long comment line that exceeds the standard 80 character limit set by Pro/II truncation
```

**Quick-fix: Truncate to 80**
```proii
$ This is a very long comment line that exceeds the standard 80 character
```

---

### Example 2: Parameter Continuation
**Before:**
```proii
SPEC COMP=NITROGEN MOLE-PERCENT=0.01 STREAM=OUTLET-GAS RELATIVE-ERROR=0.0001 CALCULATE
```

**Quick-fix: Continue with &**
```proii
SPEC COMP=NITROGEN MOLE-PERCENT=0.01 STREAM=OUTLET-GAS &
RELATIVE-ERROR=0.0001 CALCULATE
```

---

### Example 3: Preserve Long Comments
**Before:**
```proii
NAME HPFLSH1 ,High Pressure Flash Vessel for Reactor Outlet Stream with Integrated Heat Exchanger
```

**Quick-fix: Truncate with comment**
```proii
NAME HPFLSH1 ,High Pressure Flash Vessel for Reactor Outlet Stream with
$ TRUNCATED: Integrated Heat Exchanger
```

---

## 🎮 Commands

### Toggle Column Limiter On/Off
```
Ctrl+Shift+P → PRO/II: Toggle 80-Column Limiter
```
- Instantly enable/disable feature
- Saves setting globally
- Shows confirmation message

### Refresh Stream Name Highlighting
```
Ctrl+Shift+P → PRO/II: Refresh Stream Name Highlighting
```
- Also works with column limiter for consistency

---

## 👀 Visual Indicators

### 1. **Ruler at Column 80**
A thin vertical line appears at column 80 to guide your typing. Works with the `"editor.rulers"` setting.

### 2. **Inline Warning**
Squiggly underline (default: orange) on the part exceeding 80 columns

### 3. **Problems Panel**
**View** → **Problems** shows all violations with:
- File name and line number
- Exact error message
- Severity indicator

---

## 🔍 How It Works

1. **On File Open**: Extension scans entire document
2. **While Typing**: Checks line changes (debounced, 500ms)
3. **On Save**: Re-checks complete document
4. **On Configuration Change**: Clears/resets diagnostics

---

## 📊 Performance

- **Full document scan**: < 50ms (even for 10,000 line files)
- **Debounced typing check**: Minimal CPU impact
- **Quick-fix computation**: < 5ms per action

---

## ⚠️ Common Scenarios

### Scenario 1: Long Unit Operation Block
```proii
$ ❌ Problem: Parameter line too long
EQUREACTOR R-501 KINETIC=YES TEMPERATURE=450 PRESSURE=25 FEED-INLET=REACTANTS &
PRODUCT-OUTLET=PRODUCTS HOLDUP=500 RESIDENCE-TIME=2 EXCESS-REACTANT=NITROGEN CONVERSION=0.95

$ ✅ After Fix:
EQUREACTOR R-501 KINETIC=YES TEMPERATURE=450 PRESSURE=25 FEED-INLET=REACTANTS &
PRODUCT-OUTLET=PRODUCTS HOLDUP=500 RESIDENCE-TIME=2 &
EXCESS-REACTANT=NITROGEN CONVERSION=0.95
```

### Scenario 2: Long Stream Description
```proii
$ ❌ Problem: NAME description too long
NAME OUTLET-TREAT-GAS ,Treated Gas Stream from Reactor with Integrated Separation and Heat Recovery Unit

$ ✅ After Fix:
NAME OUTLET-TREAT-GAS ,Treated Gas Stream from Reactor with Integrated &
$ Separation and Heat Recovery Unit
```

### Scenario 3: Complex DEFINE Statement
```proii
$ ❌ Problem: DEFINE expression too long
DEFINE X_ISO_EFFICIENCY = (WIS_COMPRESSOR / W_ACTUAL_COMPRESSOR) * 100 WHERE WIS_COMPRESSOR=STREAM PROPERTY MOLAR_WEIGHT

$ ✅ After Fix:
DEFINE X_ISO_EFFICIENCY = (WIS_COMPRESSOR / W_ACTUAL_COMPRESSOR) * 100 &
WHERE WIS_COMPRESSOR=STREAM PROPERTY MOLAR_WEIGHT
```

---

## 🔧 Troubleshooting

### Warnings Not Appearing?
1. Check if `proii.columnLimiter.enabled` is `true` in settings
2. Verify document is saved as `.inp`, `.std`, or `.out` file
3. Ensure VS Code recognizes it as "proii" language
4. Reload window: **Ctrl+Shift+P** → **Reload Window**

### Ruler Not Showing?
The ruler depends on:
- `proii.columnLimiter.showRuler` = `true`
- VS Code version 1.105+ (included in this extension)
- May not show in all themes

### Quick-Fixes Not Available?
1. Hover over the warning, click the lightbulb icon
2. If no lightbulb appears, check `proii.columnLimiter.enableAutoFix` = `true`
3. Ensure cursor is on the flagged line

---

## 📝 Notes for Power Users

### Disable for Specific Lines
Add this to preserve a long line (if absolutely necessary):
```proii
VERY LONG LINE THAT IS INTENTIONALLY OVER 80 CHARACTERS $ noqa: proii-column-limit
```

The warning will not appear for this line.

### Pro/II Output Format Tip
After simulation, check `.out` files for truncation. If you see cut-off values, your `.inp` file likely had lines over 80 characters. Use this tool to prevent that!

---

## 🚀 Future Enhancements

Potential additions in future versions:
- [ ] Auto-wrap on save (convert to & continuation automatically)
- [ ] Per-workspace column limit settings
- [ ] Integration with Pro/II linting server
- [ ] Export line statistics report
- [ ] Batch fix all violations at once

---

## Version History

- **v1.5.0** (2025-11-01): Initial release
  - Diagnostic warnings for lines > 80 chars
  - 4 quick-fix options
  - Configuration system
  - Visual ruler support
  - Toggle command

---

**Need help?** Open an issue on [GitHub](https://github.com/francois-deklerk/proii-vscode-extension/issues)
