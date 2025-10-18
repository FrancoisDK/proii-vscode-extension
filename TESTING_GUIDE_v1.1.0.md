# 🧪 Testing Guide for v1.1.0 Hover Tooltips

## Quick Test Checklist

### ✅ Installation Test
1. Install `proii-language-support-1.1.0.vsix`
2. Reload VS Code
3. Check Extensions view for PRO/II icon and v1.1.0

### ✅ Hover Tests

#### Test 1: Unit Operations
Create a test file `test.inp` with:
```proii
UNIT OPERATIONS
FLASH
    NAME=F-101
    FEED=S1
    PROD=V1,L1
    
COLUMN
    NAME=C-101
    NSTAGE=20
    
HEATX
    NAME=E-101
    
PUMP
    NAME=P-101
```

**Hover over each unit operation keyword:**
- [ ] FLASH → Shows types, parameters, example
- [ ] COLUMN → Shows types, parameters, example
- [ ] HEATX → Shows types, parameters, example
- [ ] PUMP → Shows parameters, example

#### Test 2: Thermodynamic Methods
```proii
THERMODYNAMIC DATA
METHOD SYSTEM=SRK
METHOD SYSTEM=PR
METHOD SYSTEM=NRTL
METHOD SYSTEM=IDEAL
```

**Hover over each method:**
- [ ] SRK → Shows full name, applications, ranges
- [ ] PR → Shows description, when to use
- [ ] NRTL → Shows polar systems info
- [ ] IDEAL → Shows low pressure warning

#### Test 3: Parameters
```proii
FLASH
    NAME=F-101
    FEED=S1
    TEMP=50(C)
    PRES=1.5(BAR)
    DUTY=1000(KW)
    VFRAC=0.5
```

**Hover over each parameter:**
- [ ] TEMP → Shows units (C, F, K, R), ranges, tips
- [ ] PRES → Shows units (BAR, KPA, PSI), ranges
- [ ] DUTY → Shows units (KW, MW), positive/negative
- [ ] VFRAC → Shows range 0-1, meaning
- [ ] FEED → Shows stream specification help
- [ ] NAME → Shows naming conventions

#### Test 4: Column Parameters
```proii
COLUMN
    NAME=C-101
    NSTAGE=20
    REFLUX=2.5
    BOTTOM=1.8
    COND=TOTAL
    REB=KETTLE
```

**Hover over column-specific parameters:**
- [ ] NSTAGE → Shows typical ranges
- [ ] REFLUX → Shows L/D ratio explanation
- [ ] BOTTOM → Shows V/B ratio explanation
- [ ] COND → Shows condenser types
- [ ] REB → Shows reboiler types

#### Test 5: Equipment Parameters
```proii
PUMP
    NAME=P-101
    EFF=75(%)
    POUT=10(BAR)
    HEAD=100(M)
    
COMP
    NAME=K-101
    PRATIO=3.5
    IEFF=80(%)
    PEFF=85(%)
```

**Hover over equipment parameters:**
- [ ] EFF → Shows efficiency ranges
- [ ] POUT → Shows outlet pressure help
- [ ] HEAD → Shows pump head explanation
- [ ] PRATIO → Shows pressure ratio (Pout/Pin)
- [ ] IEFF → Shows isentropic efficiency
- [ ] PEFF → Shows polytropic efficiency

### ✅ Syntax Highlighting Test
Verify that existing syntax highlighting still works:
- [ ] Section headers are highlighted
- [ ] Unit operation keywords are colored
- [ ] Comments ($) are properly colored
- [ ] Numbers are highlighted
- [ ] Operators (&, PLUS, MINUS) are bright yellow

### ✅ Snippet Test
Verify that snippets still work:
- [ ] Type `fla` + Tab → Expands to FLASH unit
- [ ] Type `col` + Tab → Expands to COLUMN unit
- [ ] Type `title` + Tab → Expands to TITLE block

### ✅ File Type Test
Verify all file types work:
- [ ] `.inp` files show hovers
- [ ] `.std` files show hovers
- [ ] `.out` files show hovers

## 🐛 Known Issues to Watch For

### Issue: Hover doesn't appear
- **Check:** Is the file recognized as PRO/II language?
- **Fix:** Look at bottom-right of VS Code, should say "PRO/II"
- **Fix:** If not, click and select "PRO/II" from language list

### Issue: Hover shows but incomplete
- **Check:** Is the word exactly matching (FLASH vs flash)?
- **Note:** Hover provider converts to uppercase automatically

### Issue: Extension not activating
- **Check:** Is a .inp/.std/.out file open?
- **Fix:** Open any PRO/II file to activate extension
- **Check:** Look for "PRO/II Language Support activated" in Output → Extension Host

## 📊 Expected Results

### Hover Tooltip Format

**Unit Operations:**
```
⚙️ UNIT_NAME

Description text

Types:
- Type 1
- Type 2

Required: param1, param2
Optional: param3, param4

Example:
  CODE EXAMPLE

💡 Note: Additional tips
```

**Thermo Methods:**
```
🧪 METHOD_NAME

Full Name
Model Type

Best For: Description
Range: Valid ranges

Applications:
- Application 1
- Application 2

⚠️ Avoid: When not to use
```

**Parameters:**
```
📊 PARAMETER_NAME

Description

Units: unit1, unit2, unit3
Typical Range: range description
Related: related_params

💡 Tip: Usage tip
```

## ✅ Success Criteria

All tests should pass:
- ✅ Hover appears for all 13 unit operations
- ✅ Hover appears for all 15+ thermo methods
- ✅ Hover appears for all 30+ parameters
- ✅ Tooltips show formatted markdown correctly
- ✅ Examples in code blocks are formatted
- ✅ Icons (⚙️, 🧪, 📊, 💡, ⚠️) display correctly
- ✅ All file types (.inp, .std, .out) work
- ✅ Syntax highlighting still works
- ✅ Snippets still work
- ✅ Extension icon shows in Extensions view

## 🎯 Performance Test

- [ ] Hover appears instantly (< 100ms)
- [ ] No lag when typing
- [ ] No errors in Developer Console (Help → Toggle Developer Tools)
- [ ] Memory usage is reasonable

## 📝 Test Log Template

```
Test Date: _______________
Tester: __________________
VS Code Version: _________

Unit Operations:    PASS / FAIL
Thermo Methods:     PASS / FAIL
Parameters:         PASS / FAIL
Syntax Highlight:   PASS / FAIL
Snippets:           PASS / FAIL
File Types:         PASS / FAIL
Performance:        PASS / FAIL

Notes:
_________________________________
_________________________________
_________________________________

Overall: PASS / FAIL
```

## 🚀 If All Tests Pass

**Congratulations!** v1.1.0 is working perfectly!

You can now:
1. Use hover tooltips in your PRO/II work
2. Share the extension with colleagues
3. Enjoy faster PRO/II development!

---

**Test Guide Created:** October 13, 2025  
**Extension Version:** 1.1.0  
**Package:** proii-language-support-1.1.0.vsix
