# PRO/II Language Support v1.4.6 Release

**Release Date:** October 18, 2025

## 389 Major Features

### 30A Stream Description Hover Tooltips
- **NEW:** Hover over any stream name to see its description from the NAME section
- Descriptions are automatically extracted and formatted from comma-separated NAME section data
- Stream icon (🌊) displays with stream name and full description
- Works with all 237+ defined streams in large PRO/II files

### 527 STRM= Pattern Detection
- **FIXED:** Stream names in STRM= contexts now properly highlighted in all scenarios
- Works in DEFINE, SPEC, VARY, RESULT, and other statements
- Pattern moved to top-level check to ensure it takes precedence over line-type exclusions
- Examples: `STRM=TGSI`, `STRM=TGS1`, `STRM=FRSHBL`

### 3A8 Minimap & Styling Improvements
- Removed bold font styling to normalize minimap appearance
- Added `fontStyle: ""` to semantic token configuration
- Added TextMate rule overrides for `entity.name.type.unit.proii` scope
- Created explicit theme file for consistent rendering

## 31F Features (Complete List)

- 197 **Blue-only stream highlighting** - Only defined streams highlighted, no red for undefined
- 197 **Accurate NAME section parsing** - Extracts only stream names, not descriptive text
- 197 **Stream descriptions on hover** - Full descriptions from NAME section with formatting
- 197 **STRM= context detection** - Works in all unit operation contexts
- 197 **Professional documentation** - Cleaned up RIIG references
- 197 **Semantic token support** - Modern VS Code highlighting API
- 197 **Comprehensive keyword exclusions** - Prevents false positives
- 197 **Parameter/unit operation highlighting** - TextMate grammar support

## 4DB Bug Fixes

- Fixed STRM= patterns not being detected in DEFINE/SPEC/VARY statements
- Fixed stream descriptions not being captured from NAME section
- Normalized minimap rendering by removing bold styling artifacts
- Improved semantic token styling consistency

## 527 Technical Changes

### Modified Files
- `src/streamNameProvider.ts`
  - Enhanced `parseNameSection()` to capture comma-separated descriptions
  - Fixed `isInStreamContext()` to check STRM= patterns first
  - Added `streamDescriptions` Map export for hover provider access
  - Improved regex parsing for description extraction

- `src/hoverProvider.ts`
  - Imported `streamDescriptions` from streamNameProvider
  - Added `createStreamHover()` method for stream description display
  - Prioritized stream description check in hover provider
  - Removed debug logging for cleaner console output

- `package.json`
  - Version bumped to 1.4.6
  - Enhanced `semanticTokenColors` with explicit `fontStyle: ""`
  - Updated `configurationDefaults` with TextMate rule overrides
  - Added token color customization for consistent rendering

### New Files
- `themes/proii-theme.json` - Explicit theme customization for consistent styling

## 4CA Statistics

- **Stream Names Parsed:** 237+ streams
- **Description Extraction:** Comma-separated format with line-break handling
- **Hover Contexts:** 6+ detection patterns (STRM=, FEED, PRODUCT, REFS, etc.)
- **Code Lines Changed:** ~50 modifications, 200+ lines added/modified

## 4A1 Known Limitations

- Minimap shows slight text size variations in CALCULATOR rows (VS Code rendering quirk)
- Stream names limited to 3-6 characters (configurable via settings)
- Descriptions limited to text between stream name and `/*` comment marker

## 4DD Testing

Tested with:
- RIIG.inp (2334 lines, 237 streams)
- Multiple CALCULATOR and DEFINE statement types
- Various STRM= patterns in PROP, DEFINE, SPEC, VARY, RESULT statements
- Stream descriptions with special characters and formatting

## 680 Installation

### Option 1: VS Code Extensions
```
Search: "PRO/II Language Support"
Click Install
```

### Option 2: Manual Install
```powershell
code --install-extension proii-language-support-1.4.6.vsix
```

### Option 3: Download
Download `proii-language-support-1.4.6.vsix` from release assets

## 4A1 Usage Tips

1. **Hover for Stream Info**
   - Position cursor over any blue stream name
   - Hover tooltip shows: 🌊 Stream: STREAMNAME with description

2. **Configure Stream Lengths**
   - Open Settings (`Ctrl+,`)
   - Search: "proii.streamNames"
   - Adjust `enabledLengths`, `minLength`, `maxLength`

3. **Refresh Highlighting**
   - Command Palette: `PRO/II: Refresh Stream Name Highlighting`

## 64F Acknowledgments

Special thanks to the PRO/II engineering community for feature requests and testing!

## 4E2 Support

- Issues: https://github.com/FrancoisDK/proii-vscode-extension/issues
- Discussions: https://github.com/FrancoisDK/proii-vscode-extension/discussions

---

**Previous Versions:** [v1.4.5](https://github.com/FrancoisDK/proii-vscode-extension/releases/tag/v1.4.5) | [v1.4.4](https://github.com/FrancoisDK/proii-vscode-extension/releases/tag/v1.4.4)
