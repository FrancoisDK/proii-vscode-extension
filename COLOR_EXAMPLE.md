# NAME= Text Highlighting - Color Preview

## 🎨 Recommended Color

### Dark Theme: **#4EC9B0** (Soft Cyan)
```
█████████████ Cyan/Teal
RGB: (78, 201, 176)
Hex: #4EC9B0
```

### Light Theme: **#0098A3** (Teal)
```
█████████████ Teal
RGB: (0, 152, 163)
Hex: #0098A3
```

## Visual Example

### Before (Inconsistent - different colors for each word):
```
FLASH UID=IHPS, NAME=INTERMEDIATE HIGH PRESSURE SEPARATOR SRK
                    ↑↑↑↑↑↑↑↑↑↑↑ ↑↑↑↑ ↑↑↑↑↑↑↑↑ ↑↑↑↑↑↑↑↑↑ ↑↑↑
                    Different colors - hard to identify as unit name
```

### After (Consistent - all text in cyan):
```
FLASH UID=IHPS, NAME=INTERMEDIATE HIGH PRESSURE SEPARATOR
                    ╚═══════════════════════════════════════╝
                    All in cyan (#4EC9B0) - clearly a unit name
```

## Color Characteristics

**Cyan (#4EC9B0) Properties:**
- ✓ **High Contrast:** Stands out from white/gray text
- ✓ **Professional:** Used in many popular VS Code themes
- ✓ **Semantic:** Similar to string literals (text content)
- ✓ **Eye-Friendly:** Not too bright, comfortable for long sessions
- ✓ **Distinct:** Different from keywords (blue/purple) and parameters (white)

## Comparison with Other Code Elements

```proii
FLASH   UID=IHPS, NAME=INTERMEDIATE HIGH PRESSURE SEPARATOR
^^^^^   ^^^       ^^^^
Keyword Param     Param
(Blue)  (White)   (White)

                  ═════════════════════════════════════════
                  Unit Name Text (CYAN #4EC9B0) ← New!
```

## Theme-Specific Colors

The actual color will adapt to your VS Code theme:

| Theme              | Color                  | Hex Code |
|--------------------|------------------------|----------|
| **Dark+**          | Cyan                   | #4EC9B0  |
| **Light+**         | Reddish Brown          | #A31515  |
| **Monokai**        | Yellow                 | #E6DB74  |
| **Dracula**        | Yellow                 | #F1FA8C  |
| **One Dark Pro**   | Green                  | #98C379  |
| **Solarized Dark** | Cyan                   | #2AA198  |

## Why This Color?

1. **Industry Standard:** Cyan/teal is VS Code's default color for string content
2. **Semantic Meaning:** Unit names are text descriptions (like strings)
3. **Visual Hierarchy:** Different from keywords but clearly structured content
4. **Readability:** High contrast without being harsh
5. **Consistency:** Same color used across thousands of VS Code extensions

## Override Instructions

If you prefer a different color, add to your `settings.json`:

```json
{
  "editor.tokenColorCustomizations": {
    "textMateRules": [
      {
        "scope": "string.unquoted.unit-name.proii",
        "settings": {
          "foreground": "#4EC9B0"  // ← Change this hex code
        }
      }
    ]
  }
}
```

### Alternative Color Suggestions:

- **Bright Cyan:** `#00D9FF` - More vibrant
- **Azure Blue:** `#0078D4` - Microsoft blue
- **Green:** `#98C379` - Natural/organic feel
- **Yellow:** `#DCDCAA` - Warmer tone
- **Orange:** `#CE9178` - High visibility

---

## 📸 Next Steps

1. **Test:** Package the extension and test with your PRO/II files
2. **Evaluate:** See if the cyan color works well with your theme
3. **Customize:** (Optional) Override with preferred color in settings
4. **Feedback:** Let me know if you want a different color!
