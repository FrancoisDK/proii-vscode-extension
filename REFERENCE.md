# PRO/II VS Code Extension - Quick Reference

## File Structure
```
proii-vscode-extension/
├── package.json                 # Extension manifest
├── language-configuration.json  # Language settings
├── README.md                    # User documentation
├── CHANGELOG.md                 # Version history
├── INSTALL.md                   # Installation guide
├── LICENSE                      # MIT License
├── .gitignore                   # Git ignore rules
├── syntaxes/
│   └── proii.tmLanguage.json   # Syntax highlighting rules
├── snippets/
│   └── proii-snippets.json     # Code snippets
└── test/
    └── example.inp              # Test file

```

## Key Files Reference

### 1. package.json
Defines:
- Extension metadata (name, version, publisher)
- Activation events (when extension loads)
- Language ID: `proii`
- File extensions: `.inp`
- Contributions (grammars, snippets)

### 2. proii.tmLanguage.json
TextMate grammar with patterns for:
- Section headers (COMPONENT DATA, STREAM DATA, etc.)
- Unit operations (FLASH, COLUMN, PUMP, etc.)
- Keywords and parameters
- Comments ($ and /* */)
- Numbers and operators
- Thermodynamic methods

### 3. proii-snippets.json
20+ code snippets:
- `title` → TITLE block
- `flash` → FLASH unit
- `column` → COLUMN unit
- `prop` → Stream properties
- And many more...

### 4. language-configuration.json
Language features:
- Line comment: `$`
- Block comment: `/* */`
- Brackets: `()`, `[]`, `{}`
- Auto-closing pairs
- Folding markers

## Supported Syntax Elements

### Major Keywords (28)
TITLE, PRINT, DBASE, TOLERANCE, DIMENSION, SEQUENCE, CALCULATION, OUTPUT, FORMAT, ASSAY, CUTPOINTS, METHOD, WATER, ESTIMATE, PACKING, REBOILER, CONDENSER, TFLOW, PSPEC, DUTY, TRIALS, RECYCLE, LDRAW, BTMS, READ, LIBID, BANK, BLEND

### Unit Operations (12)
FLASH, CALCULATOR, COMPRESSOR, STCALC, COLUMN, PUMP, MIXER, SPLITTER, HX, VALVE, CONTROLLER, OPTIMIZER

### Parameters (50+)
UID, NAME, TEMP, PRES, RATE, COMP, STRM, SET, DEFINE, FEED, PRODUCT, ISOT, ISO, ADIA, SPEC, VARY, CPARAM, CONSTR, OBJECT, REFS, NORM, PETRO, TRANSPORT, FLPO, CETA, DEFAULT, PROP, SYSTEM, TYPE, MODEL, TEST, VALUE, ATOL, MAXI, MINI, TRAY, PHASE, PROCEDURE, RETURN, and more...

### Thermodynamic Methods (12)
SRK, SRK-HP, SRK-HPR, SRK-LP, SOUR, PETR, PURE, NELS, API, API94, STEAM, SIMSCI

### Operators
- Assignment: `=`
- Continuation: `&`, `/&`
- Separator: `/`, `,`
- Arithmetic: `+`, `-`, `*`, `/`
- Comparison: `<`, `>`, `<=`, `>=`

## Color Scheme Mapping

Different themes will color these differently, but typical mapping:

- **Section Headers**: Bold, bright (e.g., cyan/blue)
- **Unit Operations**: Entity type (e.g., yellow/gold)
- **Keywords**: Control keywords (e.g., purple/magenta)
- **Parameters**: Variable names (e.g., light blue)
- **Methods**: Constants (e.g., orange)
- **Comments**: Muted (e.g., gray/green)
- **Numbers**: Numeric constants (e.g., green)
- **Strings**: String literals (e.g., red/orange)

## Testing with Different Themes

Try these popular themes to see syntax highlighting:
- Dark+ (default dark)
- Light+ (default light)
- Monokai
- Solarized Dark
- One Dark Pro
- Dracula

## Customization

Users can customize colors in their `settings.json`:

```json
"editor.tokenColorCustomizations": {
  "textMateRules": [
    {
      "scope": "keyword.control.section.proii",
      "settings": {
        "foreground": "#FF0000",
        "fontStyle": "bold"
      }
    }
  ]
}
```

## Known Scopes

For custom styling, these are the main scopes:
- `comment.line.dollar.proii`
- `comment.block.proii`
- `keyword.control.section.proii`
- `keyword.control.proii`
- `entity.name.type.unit.proii`
- `variable.parameter.proii`
- `constant.language.method.proii`
- `constant.numeric.proii`
- `keyword.operator.proii`

## Performance Notes

- Grammar is optimized for fast parsing
- No external dependencies
- Minimal memory footprint
- Instant activation on `.inp` files

## Compatibility

- **VS Code**: 1.75.0 or higher
- **Platform**: Windows, macOS, Linux
- **File Types**: `.inp` files
- **Encoding**: UTF-8, ASCII

## Future LSP Features (Planned)

When Language Server Protocol is added:
- Real-time error detection
- IntelliSense for unit IDs
- Go-to-definition for streams
- Hover documentation
- Symbol outline
- Rename refactoring
- Find all references
