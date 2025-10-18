# Snippets Quick Start - One Page Guide

## 🚀 3-Second Summary
**Type a prefix → Press Tab → Fill blanks → Done!**

---

## 📝 Example: Create a Flash Unit in 10 Seconds

### What You Type:
```
flash-adia [Tab]
```

### What VS Code Creates:
```proii
  FLASH     UID=F-1, NAME=FLASH
    FEED    FEED_STREAM
    PROD    V=VAPOR, L=LIQUID
    ADIA    DP=5
```

### What You Do:
1. **Tab** through each blue/orange highlighted field
2. **Type** your values
3. **Escape** when done

---

## 🎯 Top 10 Most Useful Snippets

| Type This | Get This | Use For |
|-----------|----------|---------|
| `title` | Title block | File header |
| `flash-adia` | Adiabatic flash | Separations |
| `column-io` | Complete column | Distillation |
| `comp-poly` | Compressor | Compression |
| `pump` | Pump | Pumping |
| `mixer` | Mixer | Mixing streams |
| `prop` | Stream property | Define streams |
| `hx-cold` | Heat exchanger | Heating/cooling |
| `spec` | Specification | Add specs |
| `comment` | Separator line | Section breaks |

---

## ⌨️ Essential Shortcuts

| Key | What It Does |
|-----|--------------|
| `Tab` | Next field |
| `Shift+Tab` | Previous field |
| `Escape` | Finish editing |
| `Ctrl+Space` | Show all snippets |
| `Ctrl+Z` | Undo snippet |

---

## 🎬 Live Example

**Step-by-step:** Creating `FLASH UID=F101, NAME=HDO FLASH`

```
1. Type:        flash-adia
2. Press:       Tab
3. Replace:     F-1 → F101
4. Press:       Tab
5. Replace:     FLASH → HDO FLASH
6. Press:       Tab (3 more times to fill remaining)
7. Press:       Escape
8. Done!        ✅
```

**Time: 10 seconds vs 2 minutes typing!**

---

## 📋 All 43 Snippet Prefixes

### General (9)
`title`, `dimension`, `compdata`, `thermodata`, `streamdata`, `unitops`, `prop`, `print`, `sequence`

### Flash (6)
`flash-adia`, `flash-isot`, `flash-bubb`, `flash-spec`, `flash-duty`, `flash-entrain`

### Column (3)
`column-io`, `column-sure`, `sidestripper`

### Equipment (18)
`comp-poly`, `comp-adia`, `pump`, `pump-eff`, `hx-cold`, `hx-hot`, `hx-duty`, `hx-both`, `hcurve`, `mixer`, `mixer-temp`, `splitter`, `splitter-rate`, `valve`, `valve-dp`, `reactor-conv`, `reactor-equil`, `calculator`, `stcalc`

### Utilities (7)
`spec`, `define-stream`, `define-unit`, `define-calc`, `comment`, `comm`

---

## 💡 Pro Tips

### 1. See Suggestions While Typing
Just start typing - VS Code shows matching snippets automatically!

### 2. Browse All Snippets
Press `Ctrl+Space` in any `.inp` file to see all 43 snippets

### 3. Filter by Type
Type partial name: `"flash"` shows all 6 flash variations

### 4. Dropdown Choices
Some fields have dropdowns - use arrow keys or just type

### 5. Linked Fields
Some fields are linked - change one, all update!

---

## 🎯 Complete Workflow Example

**Build entire input file in 2 minutes:**

```proii
$ 1. Type: title [Tab]
TITLE       NEWFILE=C, CASE=A, PROJECT=MY_PROJECT

$ 2. Type: compdata [Tab]
COMPONENT DATA
    LIBID   1,H2O/2,H2/3,N2

$ 3. Type: thermodata [Tab]
THERMODYNAMIC DATA
    METHOD  SYSTEM=SRK

$ 4. Type: streamdata [Tab]
STREAM DATA

$ 5. Type: prop [Tab] (repeat 3x)
PROPERTY STREAM=FEED1, TEMP(F)=100, PRES(PSIA)=50
PROPERTY STREAM=FEED2, TEMP(F)=150, PRES(PSIA)=60

$ 6. Type: unitops [Tab]
UNIT OPERATIONS

$ 7. Type: flash-adia [Tab]
  FLASH     UID=F-1, NAME=FLASH
    FEED    FEED1
    PROD    V=V1, L=L1
    ADIA    DP=10

$ 8. Type: column-io [Tab]
  COLUMN    UID=COL1, NAME=COLUMN
    PARA    IO=30, TRAY=20
    FEED    V1,10
    PROD    OVHD=DIST, BTMS=BTMS
    ...
```

**Done! Complete file in 2 minutes!** 🎉

---

## ✅ Checklist for Success

- [ ] Extension installed (`proii-language-support-1.0.2.vsix`)
- [ ] File saved as `.inp`, `.std`, or `.out`
- [ ] Status bar shows "PRO/II"
- [ ] Tried `flash-adia` + `Tab`
- [ ] Successfully filled in values
- [ ] Used `Tab` to navigate between fields

---

## 🆘 Not Working?

### Problem: Snippets don't show
**Solution:** 
- Check file extension (must be `.inp`, `.std`, or `.out`)
- Check status bar says "PRO/II"
- Try `Ctrl+Space` after typing prefix

### Problem: Can't navigate with Tab
**Solution:**
- Make sure snippet expanded (not just typed the prefix)
- Press `Escape` and try again

### Problem: Wrong file type
**Solution:**
- Right-click → "Change Language Mode" → Select "PRO/II"
- Or save file with correct extension

---

## 🎓 Want to Learn More?

📖 **HOW_TO_USE_SNIPPETS.md** - Complete tutorial with examples  
📺 **VISUAL_SNIPPET_DEMO.md** - Screenshots of every step  
📋 **QUICK_REFERENCE.md** - All features on one page  
📚 **SNIPPETS_GUIDE.md** - All 43 snippets with descriptions  

---

## 🎯 Try It Now!

**Open VS Code and try:**
```
1. Create: practice.inp
2. Type: flash-adia
3. Press: Tab
4. Fill in values
5. Press: Escape
```

**That's it! You're now a snippet pro!** 🚀

---

**Remember:** Type prefix → Tab → Fill → Escape = Done! ✨
