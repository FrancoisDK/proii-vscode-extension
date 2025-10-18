# NAME= Parameter Highlighting

## Update Summary

Added special syntax highlighting for `NAME=` parameter text to make unit operation names more visible and consistent.

## Color Recommendation

The text after `NAME=` will be highlighted with a **soft cyan/teal color** using the scope:
- **Scope Name:** `string.unquoted.unit-name.proii`
- **Recommended Colors:**
  - **Light Theme:** `#0098A3` (Teal) or `#0078D4` (Azure Blue)
  - **Dark Theme:** `#4EC9B0` (Cyan) or `#4FC3F7` (Light Cyan)

## How It Works

### Syntax Pattern
```regex
\b(NAME)\s*(=)\s*([^,\$\n]+)
```

This pattern matches:
1. The word `NAME` (as a parameter)
2. The equals sign `=`
3. All text after `=` until a comma, dollar sign (comment), or newline

### Example
```proii
FLASH   UID=IHPS, NAME=INTERMEDIATE HIGH PRESSURE SEPARATOR SRK
```

In this example:
- `FLASH` → Unit operation keyword (entity.name.type.unit.proii)
- `UID` → Parameter (variable.parameter.proii)
- `IHPS` → Value
- `NAME` → Parameter (variable.parameter.proii)
- `=` → Operator (keyword.operator.assignment.proii)
- `INTERMEDIATE HIGH PRESSURE SEPARATOR` → **Unit name text (string.unquoted.unit-name.proii)** ✨

## Color Display

### Recommended Color: #4EC9B0 (Cyan/Teal)

**Preview:**
```
🟦 #4EC9B0 - Soft Cyan (Dark Theme)
   RGB: (78, 201, 176)
   
🟦 #0098A3 - Teal (Light Theme)
   RGB: (0, 152, 163)
```

This color:
- ✓ Stands out clearly from keywords and parameters
- ✓ Similar to string colors (familiar to developers)
- ✓ Readable on both dark and light backgrounds
- ✓ Commonly used for string/text content in VS Code themes
- ✓ Professional and not distracting

## VS Code Theme Compatibility

Most VS Code themes will automatically colorize the `string.unquoted` scope. The exact color will vary by theme:

- **Dark+ (default dark):** Light blue-cyan (#4EC9B0)
- **Light+ (default light):** Red-brown (#A31515)
- **Monokai:** Yellow (#E6DB74)
- **Dracula:** Yellow (#F1FA8C)
- **One Dark Pro:** Green (#98C379)

## Custom Color Override

If you want to force a specific color regardless of theme, add this to your VS Code `settings.json`:

```json
"editor.tokenColorCustomizations": {
  "textMateRules": [
    {
      "scope": "string.unquoted.unit-name.proii",
      "settings": {
        "foreground": "#4EC9B0"
      }
    }
  ]
}
```

## Testing

To test the highlighting:

1. Compile the extension: `npm run compile`
2. Package: `vsce package`
3. Install: `code --install-extension proii-language-support-1.3.0.vsix`
4. Open a `.inp` file
5. Look for `NAME=` parameters - all text after `=` should be consistently colored

## Examples

```proii
$ All these NAME values will be highlighted in cyan:

FLASH    UID=F01, NAME=FEED FLASH DRUM
COLUMN   UID=C01, NAME=MAIN DISTILLATION COLUMN  
HX       UID=E01, NAME=FEED EFFLUENT EXCHANGER
PUMP     UID=P01, NAME=REFLUX PUMP
MIXER    UID=M01, NAME=REACTOR FEED MIXER
SPLITTER UID=S01, NAME=PRODUCT SPLITTER TO STORAGE
```

## Benefits

1. **Visual Clarity:** Unit names are immediately identifiable
2. **Consistency:** All name text colored uniformly (no word breaks)
3. **Professional:** Uses standard string coloring convention
4. **Readable:** Cyan/teal is easy on the eyes for long names
5. **Intuitive:** Similar to how strings are highlighted in code
