# PRO/II VS Code Extension v1.3.1 - Testing Guide

## 🎉 New in v1.3.1
- **Stream Reference Highlighting**: Stream names now have the same orange/tan color as the NAME section
- **EQUREACTOR Syntax**: Now highlighted in key color (green) like other unit operations
- **RATIO Operator**: Added to arithmetic operators (bright yellow)
- **Improved Examples**: Updated EQUREACTOR with proper spacing and RETURN TGSI example

## 📦 Installation for Testing

### Step 1: Install the Extension
1. Open VS Code
2. Go to **Extensions** panel (Ctrl+Shift+X)
3. Click the **"..."** menu → **"Install from VSIX..."**
4. Navigate to: `proii-language-support-1.3.1.vsix`
5. Click **Install**
6. When prompted, click **Reload** or reload VS Code manually

### Step 2: Open a PRO/II File
- Open or create a `.inp` file (PRO/II input file)
- The status bar should show **"PRO/II"** language mode
- If not, click the language indicator and select **"PRO/II"**

## ✅ Testing Checklist

### 1. Stream Reference Highlighting
**Test with:**
```proii
FLASH       UID=R1IN, NAME=FIRST REACTOR BED INLET
  FEED      HTDF
  PROD      M=R1IN
  DEFINE    PRES AS CALC=HDST R(2)
```

**Verify:**
- ✅ `HTDF` (after FEED) = orange/tan color
- ✅ `R1IN` (after PROD) = orange/tan color  
- ✅ `HDST` (in CALC) = orange/tan color
- ✅ Matches NAME section colors from your file

### 2. EQUREACTOR Unit Operation
**Test with:**
```proii
EQUREACTOR  UID=TGSIK, NAME=TREAT GAS INLET KINETICS
  FEED        TGSI
  DEFINE      P(1) AS STRM=TGSI COMP=6 RATE
  PROCEDURE
    REAL RGAS
    RGAS = 2907260.0
    R(1) = RGAS
  RETURN TGSI
```

**Verify:**
- ✅ `EQUREACTOR` keyword = green (key color)
- ✅ `TGSI` (after FEED) = orange/tan color
- ✅ `TGSI` (in STRM=) = orange/tan color
- ✅ `RETURN TGSI` = RETURN blue, TGSI orange/tan
- ✅ Spacing is consistent and readable

### 3. Arithmetic Operators with RATIO
**Test with:**
```proii
DEFINE      PRES AS CALC=HDST R(2) PLUS 12
DEFINE      FLOW AS RATE RATIO VALUE
DEFINE      AREA AS VALUE TIMES FACTOR
```

**Verify:**
- ✅ `RATIO` keyword = bright yellow (like PLUS, TIMES, etc.)
- ✅ All arithmetic operators highlighted consistently

### 4. General Syntax Highlighting
**Test elements:**
```proii
$ Comment line
TITLE       NEWFILE=PII_9.3, CASE=Test   $ Inline comment

COMPONENT Data
  LIBID 1,H2O/2,H2/3,N2

STREAM Data
  PROP STREAM=F1, TEMP=25, PRES=1, RATE=100

UNIT OPERATIONS
  FLASH       UID=FL1, NAME=FLASH1
    FEED      F1
    PRODUCT   V=V1
    OPERATION PHASE=V, TEMPERATURE=150
```

**Verify:**
- ✅ Comments = green
- ✅ Keywords (TITLE, COMPONENT, FLASH, etc.) = blue
- ✅ Unit operations (FLASH) = green (key color)
- ✅ Stream names (F1, V1) = orange/tan
- ✅ Parameter names (FEED, PRODUCT) = light blue/cyan
- ✅ Numbers = orange
- ✅ Continuation `&` = bright yellow

## 🔍 Color Reference

| Element | Color | Example |
|---------|-------|---------|
| Keywords | Blue | `TITLE`, `FLASH`, `COLUMN` |
| Unit Operations | Green | `EQUREACTOR`, `FLASH`, `PUMP` |
| Stream Names | Orange/Tan | `HTDF`, `TGSI`, `R1IN` |
| Arithmetic Ops | Bright Yellow | `PLUS`, `MINUS`, `RATIO` |
| Parameters | Light Blue/Cyan | `FEED`, `PROD`, `TEMP` |
| Comments | Green | `$ This is a comment` |
| Numbers | Orange | `100`, `25.5`, `1.5e-3` |
| Continuation | Bright Yellow | `&` |

## 📝 Test Cases

### Test Case 1: Stream Reference Recognition
**File:** `RIIG.inp` (your existing file)
- Navigate to line 601 (EQUREACTOR TGSIK)
- Check that TGSI is highlighted in orange/tan
- Hover over TGSI and verify no errors

### Test Case 2: Multiple Keywords
Open the file and look for patterns like:
```proii
FEED STREAM1
PROD M=STREAM2
RETURN STREAM3
DEFINE STRM=STREAM4
```
All stream names should be orange/tan.

### Test Case 3: Edge Cases
- Stream names with numbers: `F1`, `R2IN`, `V001` = orange/tan ✅
- Stream names with underscores: `FEED_1`, `OUTLET_GAS` = orange/tan ✅
- Mixed case: `Feed`, `PROD` = keywords should still match (case-insensitive)

## 🐛 Known Limitations

1. **Stream names in VALUES/RATE assignments** may not be highlighted if they don't follow keywords
   - Example: `VALUE = STREAM1` (might not highlight correctly)
   - Workaround: Use `STRM=STREAM1` format

2. **Complex expressions** with streams might have highlighting quirks
   - This is expected in TextMate grammars

## 🚀 Next Steps if Testing Passes

1. ✅ Rename to final version number
2. ✅ Create GitHub release
3. ✅ Publish to VS Code Marketplace
4. ✅ Update documentation

## 📞 Feedback

If you notice any issues:
1. Check line numbers where problems occur
2. Note the specific keywords/values involved
3. Create a minimal test case
4. Report via GitHub Issues

---

**Created:** October 18, 2025  
**Version:** 1.3.1 (Pre-release Testing)  
**Status:** Ready for Testing ✅
