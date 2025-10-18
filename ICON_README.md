# Icon Replacement for VS Code Extension

## Why Change the Icon?

The current icon (`PRO_II.png`) may have copyright concerns as it could be based on proprietary software branding. This new icon is:

✅ **Original geometric design**  
✅ **No trademarked symbols**  
✅ **Professional appearance**  
✅ **Safe for distribution**

---

## New Icon Design

### Visual Elements:
- **Circle + Square:** Universal symbol for process unit operations in chemical engineering
- **Arrows with direction:** Represent input/output streams in process flow diagrams
- **"P2" Text:** Simple, non-proprietary abbreviation for "PRO/II"

### Color Scheme:
- **Cyan (#4EC9B0):** Equipment and unit operations
- **Orange (#CE9178):** Process streams and flows
- **Dark Background (#1E1E1E):** Professional VS Code theme integration

---

## How to Generate the Icon

### Option 1: Use the HTML Generator (Easiest)

1. **Open the generator:**
   ```
   C:\Users\franc\pyScripts\proii-vscode-extension\generate_icon.html
   ```
   (Should open automatically in your browser)

2. **Click "Download as PNG (128x128)"**

3. **Save as:** `proii_icon.png` in the extension root folder

### Option 2: Use the SVG File

The SVG file has been created: `proii_icon.svg`

**Convert to PNG using:**
- **Online:** https://cloudconvert.com/svg-to-png (set to 128x128)
- **VS Code:** Install "SVG" extension and export
- **Command line:** `magick convert proii_icon.svg -resize 128x128 proii_icon.png`

---

## Installing the New Icon

### Step 1: Replace the Icon File

After generating `proii_icon.png`:

```powershell
# Backup old icon
Move-Item PRO_II.png PRO_II_backup.png

# Rename new icon
Move-Item proii_icon.png PRO_II.png
```

Or simply delete the old `PRO_II.png` and rename `proii_icon.png` to `PRO_II.png`.

### Step 2: Recompile and Package

```powershell
npm run compile
vsce package
```

### Step 3: Install Updated Extension

```powershell
code --install-extension proii-language-support-1.3.0.vsix --force
```

---

## Alternative: Update package.json

If you want to use a different filename:

### Edit `package.json`:

```json
{
  "name": "proii-language-support",
  "icon": "proii_icon.png",  // ← Change this line
  ...
}
```

Then recompile and package.

---

## Icon Preview

The icon looks like this:

```
     ╭──────────────────────────╮
     │     [Dark Background]    │
     │                          │
     │        ◯────────◯        │
     │        │   P2   │        │
     │    →   ◯────────◯   →    │
     │                          │
     │  [Cyan Circle & Square]  │
     │   [Orange Arrow Streams] │
     ╰──────────────────────────╯
```

- Clean, minimal design
- Instantly recognizable as a process engineering tool
- Professional appearance in VS Code marketplace

---

## Copyright Status

### ✅ Safe Elements:
- **Geometric shapes** (circle, square, arrows) - Public domain
- **Color scheme** - Generic engineering colors, not trademarked
- **"P2" abbreviation** - Generic text, not a trademark
- **Overall design** - Original composition, no copied elements

### ❌ What We Avoided:
- Company logos or wordmarks
- Proprietary software icons
- Trademarked symbols or graphics
- Copyrighted imagery

---

## Legal Statement

This icon is an **original geometric design** created specifically for the PRO/II VS Code extension. It uses:
- Generic shapes (circle, square, arrows)
- Standard colors
- Simple text abbreviation

**No copyrighted or trademarked materials were used.** The icon is safe for:
- VS Code Marketplace publication
- Open source distribution
- Commercial use
- Modification and derivative works

---

## Files Created

- ✅ `create_icon_svg.py` - Python script to generate SVG
- ✅ `proii_icon.svg` - Vector SVG icon
- ✅ `generate_icon.html` - Browser-based PNG generator
- ✅ `ICON_README.md` - This documentation

---

## Next Steps

1. **Open:** `generate_icon.html` in browser
2. **Download:** PNG file (128x128)
3. **Replace:** Old `PRO_II.png` with new `proii_icon.png`
4. **Compile & Package:** Create new VSIX
5. **Test:** Install and verify icon appears correctly

---

## Questions?

**Q: Is 128x128 the right size?**  
A: Yes, VS Code recommends 128x128 for extension icons.

**Q: Can I customize the colors?**  
A: Yes! Edit the SVG file or modify `generate_icon.html` with your preferred colors.

**Q: Can I modify the design?**  
A: Absolutely! The SVG is fully editable. Consider:
- Different shapes (hexagon, etc.)
- Alternative text ("PROII", "P/2", etc.)
- Additional process symbols

**Q: Is this icon truly copyright-free?**  
A: Yes, it's an original geometric design with no copyrighted elements.

---

**Ready to use!** Your extension will have a professional, copyright-free icon. 🎉
