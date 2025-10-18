# 🚀 PRO/II VS Code Extension - Quick Start Guide

## What You Have Now

A **complete VS Code extension** that adds syntax highlighting and language support for PRO/II `.inp` files!

---

## 📦 Installation (Choose One Method)

### Method 1: Package and Install (Recommended)

1. **Open PowerShell** in the extension directory:
   ```powershell
   cd c:\Users\franc\pyScripts\proii-vscode-extension
   ```

2. **Run the build script:**
   ```powershell
   .\build.ps1
   ```
   This will:
   - Check for dependencies
   - Validate all files
   - Create a `.vsix` package file

3. **Install in VS Code:**
   - Open VS Code
   - Press `Ctrl+Shift+X` (Extensions view)
   - Click the `...` menu (top right)
   - Select "Install from VSIX..."
   - Choose the `.vsix` file that was created

4. **Done!** Open any `.inp` file and see the highlighting!

### Method 2: Development Mode (For Testing)

1. **Open extension folder in VS Code:**
   ```powershell
   cd c:\Users\franc\pyScripts\proii-vscode-extension
   code .
   ```

2. **Press `F5`** to launch a new VS Code window with the extension loaded

3. **Open your `R.txt`** or any `.inp` file in the new window

4. **See the magic!** ✨

---

## ✅ Verification

### Check Syntax Highlighting
Open your `R.txt` file and verify you see colors for:
- ✅ **Blue/Cyan**: Section headers like `COMPONENT DATA`, `STREAM DATA`
- ✅ **Yellow/Gold**: Unit operations like `FLASH`, `COLUMN`, `PUMP`
- ✅ **Light Blue**: Parameters like `TEMP`, `PRES`, `RATE`, `UID`
- ✅ **Orange**: Methods like `SRK`, `SOUR`, `STEAM`
- ✅ **Gray/Green**: Comments starting with `$`
- ✅ **Green**: Numbers (100, 1.5, 1E-6)
- ✅ **Purple/Magenta**: Keywords like `DEFINE`, `SPEC`, `VARY`

### Test Code Snippets
1. Create a new file: `test.inp`
2. Type `flash` and press `Tab`
3. Should expand to a complete FLASH unit template!
4. Try other snippets: `title`, `prop`, `column`, `calculator`

### Test Comments
1. Select a few lines
2. Press `Ctrl+/`
3. Lines should toggle between commented and uncommented

---

## 🎨 What Gets Highlighted

### From Your R.txt Example:

```proii
$ This is a comment - GRAY

COMPONENT DATA                    ← Section header - BRIGHT BLUE
    LIBID   1,H2O/2,H2/3,N2      ← LIBID keyword - PURPLE
            BANK=SIMSCI           ← Parameter - LIGHT BLUE

THERMODYNAMIC DATA                ← Section header - BRIGHT BLUE
    METHOD SYSTEM=SRK             ← METHOD keyword - PURPLE
                                     SRK method - ORANGE

STREAM DATA                       ← Section header - BRIGHT BLUE
  PROP STRM=FEED1                 ← PROP keyword - PURPLE
       TEMP=25, PRES=1.0          ← Parameters - LIGHT BLUE
       RATE(W)=100                ← Numbers - GREEN

UNIT OPERATIONS                   ← Section header - BRIGHT BLUE

  FLASH UID=FL01, NAME=MIXER      ← FLASH unit - YELLOW
    FEED      FEED1, FEED2        ← Parameters - LIGHT BLUE
    PRODUCT   V=VAP, L=LIQ        ← Parameters - LIGHT BLUE
    METHOD    SET=SRK-HP          ← Method - ORANGE

  CALCULATOR UID=CALC1            ← CALCULATOR unit - YELLOW
    DEFINE R(1) AS STRM=X TEMP    ← DEFINE keyword - PURPLE
    PROCEDURE                     ← Control keyword - PURPLE
      R(1) = R(2) + R(3)          ← Calculation
    RETURN                        ← Control keyword - PURPLE
```

---

## 📝 Using Snippets

### Available Snippets:

| Type This | Press Tab | Get This |
|-----------|-----------|----------|
| `title` | → | Complete TITLE block |
| `compdata` | → | COMPONENT DATA section |
| `thermodata` | → | THERMODYNAMIC DATA section |
| `prop` | → | Stream properties |
| `flash` | → | FLASH unit |
| `calculator` | → | CALCULATOR unit |
| `column` | → | COLUMN unit |
| `hx` | → | Heat exchanger |
| `pump` | → | PUMP unit |
| `mixer` | → | MIXER unit |
| `comment` | → | Section separator |

### Snippet Example:

1. Create new file: `myfile.inp`
2. Type: `flash`
3. Press: `Tab`
4. Get:
   ```proii
   FLASH       UID=FLASH1, NAME=FLASH SEPARATOR
     FEED      FEED_STREAM
     PRODUCT   V=VAPOR, L=LIQUID
     ISOT
     DEFINE    TEMP AS value
     DEFINE    PRES AS value
     METHOD    SET=SRK-HP
   ```
5. Tab through placeholders to fill in your values!

---

## 🎯 Common Tasks

### Task: Add a new flash unit
1. Type `flash` + Tab
2. Change `FLASH1` to your unit ID
3. Change stream names
4. Done!

### Task: Define a stream
1. Type `prop` + Tab
2. Change stream name and values
3. Done!

### Task: Add section separator
1. Type `comment` + Tab
2. Change the title
3. Done!

### Task: Toggle comments
1. Select lines
2. Press `Ctrl+/`
3. Done!

---

## 🐛 Troubleshooting

### Problem: No syntax highlighting
**Solution 1:** Check file extension is `.inp`
**Solution 2:** Manually set language:
- Click language selector (bottom right of VS Code)
- Type "PRO/II"
- Select it

### Problem: Snippets not working
**Solution:** Make sure:
1. File is recognized as PRO/II (check bottom right)
2. Try pressing `Ctrl+Space` to trigger manually
3. Type the prefix exactly (e.g., `flash` not `Flash`)

### Problem: Extension not loading
**Solution:** 
1. Reload VS Code: `Ctrl+Shift+P` → "Developer: Reload Window"
2. Check VS Code version (must be 1.75.0+)
3. Reinstall the extension

---

## 📚 Documentation Files

All in the extension directory:

- **COMPLETE.md** ← You are here! Complete overview
- **README.md** - User-facing documentation
- **INSTALL.md** - Detailed installation steps
- **REFERENCE.md** - Technical reference for customization
- **CHANGELOG.md** - Version history
- **test/example.inp** - Comprehensive test file

---

## 🎉 Next Steps

1. ✅ **Build**: Run `.\build.ps1`
2. ✅ **Install**: Install the `.vsix` in VS Code
3. ✅ **Test**: Open your `R.txt` file
4. ✅ **Enjoy**: Beautiful syntax highlighting!
5. 🌟 **Share**: Share with your team!

---

## 💡 Pro Tips

### Tip 1: Customize Colors
Want different colors? Add to your VS Code `settings.json`:
```json
"editor.tokenColorCustomizations": {
  "textMateRules": [
    {
      "scope": "entity.name.type.unit.proii",
      "settings": { "foreground": "#FFD700" }
    }
  ]
}
```

### Tip 2: Use Code Folding
Click the arrows next to line numbers to fold/unfold sections

### Tip 3: Try Different Themes
The extension works with all VS Code themes:
- Dark+ (default)
- Monokai
- Solarized Dark
- One Dark Pro
- Dracula

### Tip 4: Multiple Cursors
Hold `Alt` and click to add cursors - great for editing multiple lines!

---

## 🤝 Need Help?

Check these files in order:
1. **This file** (COMPLETE.md) - Quick overview
2. **INSTALL.md** - Detailed installation
3. **README.md** - Feature documentation
4. **REFERENCE.md** - Technical details

---

## ✨ You're Ready!

Your PRO/II extension is **complete** and ready to make your `.inp` files beautiful! 🎨

**Run this now:**
```powershell
cd c:\Users\franc\pyScripts\proii-vscode-extension
.\build.ps1
```

Then install and enjoy! 🚀
