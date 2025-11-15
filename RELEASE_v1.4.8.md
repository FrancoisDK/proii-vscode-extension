# PRO/II Language Support v1.4.8 - Release Notes

**Release Date:** November 1, 2025  
**Previous Version:** v1.4.7  
**Build Status:** ✅ Complete and Tested

---

## 🎉 Major Feature: 80-Column Width Limiter

### Overview
Pro/II typically truncates output at **80 characters per line** (legacy terminal/report formatting). This new feature helps prevent data loss by:
- Warning when input lines exceed 80 columns
- Providing automatic fixes via quick-actions
- Showing visual ruler at column 80
- Full configuration support

### Why This Matters
When `.inp` files contain lines > 80 characters:
- **Pro/II output may truncate** and lose data
- **Simulation results become misaligned** 
- **Parameter values get cut off** in `.out` files
- **Stream descriptions become incomplete**

This feature catches these issues **before** simulation runs.

---

## 🆕 New Features in v1.4.8

### 1. **Diagnostic Warnings** ⚠️
When you open or edit a `.inp` file:
- Lines exceeding 80 characters are automatically detected
- Warnings appear in VS Code's **Problems** panel
- Inline squiggly underline marks the excessive portion
- Shows exactly how many characters over the limit

**Example:**
```
Line 42: "SPEC COMP=N2 MOLE-PERCENT=0.01 STREAM=OUTLET-GAS RELATIVE-ERROR=0.0001 CALCULATE"
        (89 characters - exceeds 80 by 9 characters)
        ⚠️ Warning shown
```

### 2. **Quick-Fix Code Actions** 🔧
Right-click on any warning to see 4 automatic fix options:

#### **Option A: Truncate to 80 Characters**
- Removes all text beyond column 80
- Fastest solution, minimal code changes
- **Good for:** Comments, non-critical trailing text

#### **Option B: Continue Line with & Marker**
- Adds `&` continuation marker at end of line 80
- Moves remaining content to next line
- **Good for:** Parameters, operation specs (preserves data)

#### **Option C: Truncate with Comment**
- Truncates at column 80
- Adds comment line showing what was truncated
- **Good for:** Code review, documentation purposes

#### **Option D: Add Ignore Marker**
- Adds `$ noqa: proii-column-limit` comment
- Disables warning for this line
- **Good for:** Necessary long lines, exceptions

### 3. **Visual Ruler at Column 80** 📏
- Thin vertical guide line shows where 80 columns ends
- Helps position parameters and comments
- Works with any editor theme
- Can be disabled in settings

### 4. **Full Configuration System** ⚙️
```json
// Enable/disable the limiter
"proii.columnLimiter.enabled": true

// Set column limit (default 80, range 40-200)
"proii.columnLimiter.columnLimit": 80

// Show warnings when exceeded
"proii.columnLimiter.warnOnExceed": true

// Enable quick-fix actions
"proii.columnLimiter.enableAutoFix": true

// Show visual ruler
"proii.columnLimiter.showRuler": true
```

### 5. **Toggle Command** 🎮
```
Ctrl+Shift+P → PRO/II: Toggle 80-Column Limiter
```
Instantly enable/disable the feature with confirmation message.

---

## 📊 Technical Details

### New Files
- `src/columnLimiterProvider.ts` (230 lines)
  - `ColumnLimiterProvider` class
  - Diagnostic detection and reporting
  - Quick-fix action generation
  - Configuration handling

### Modified Files
- `src/extension.ts`
  - Import `ColumnLimiterProvider`
  - Register diagnostic provider
  - Setup event listeners for document changes/saves
  - Register toggle command
  
- `package.json`
  - Added 5 configuration properties
  - Added 1 new command
  - Added editor ruler configuration for [proii] language
  - Updated version to 1.4.8

### Documentation
- `COLUMN_LIMITER_FEATURE.md` (330+ lines)
  - Complete feature documentation
  - Configuration guide
  - Usage examples
  - Troubleshooting section

---

## 🚀 Performance Characteristics

| Operation | Performance | Notes |
|-----------|-------------|-------|
| Full document scan | < 50ms | 10,000 line file |
| Per-character change (debounced) | 500ms delay | Avoids excessive checking |
| Quick-fix computation | < 5ms | Per action |
| Semantic tokens (unaffected) | < 150ms | Full document |

---

## 📋 Configuration Reference

### `proii.columnLimiter.enabled`
- **Type**: Boolean
- **Default**: `true`
- **Description**: Enable/disable the entire column limiter feature

### `proii.columnLimiter.columnLimit`
- **Type**: Integer
- **Default**: `80`
- **Range**: 40-200
- **Description**: Maximum allowed column width

### `proii.columnLimiter.warnOnExceed`
- **Type**: Boolean
- **Default**: `true`
- **Description**: Show diagnostics when limit is exceeded

### `proii.columnLimiter.enableAutoFix`
- **Type**: Boolean
- **Default**: `true`
- **Description**: Enable quick-fix code actions

### `proii.columnLimiter.showRuler`
- **Type**: Boolean
- **Default**: `true`
- **Description**: Display visual ruler at column limit

---

## 🔗 Related Documentation

- 📖 [Complete Feature Guide](COLUMN_LIMITER_FEATURE.md)
- 📖 [Extension Architecture](ARCHITECTURE_SIMPLIFICATION.md)
- 📖 [Stream Highlighting Status](FINAL_STATUS.md)

---

## 🐛 Known Limitations

1. **Continuation Logic**: The `&` continuation marker follows Pro/II's basic syntax rules but doesn't validate OPERATION block state. Complex multi-line operations should be reviewed manually.

2. **Performance**: Debounced checking (500ms) means rapid typing won't update diagnostics in real-time. Use save to force re-check.

3. **Theme Support**: Ruler color depends on VS Code theme. Some themes may not show ruler clearly.

4. **Comments**: Comment-only lines can exceed 80 chars without affecting simulation, but are flagged for consistency.

---

## ✅ Testing Summary

### Unit Tests
- [x] Column detection for various line lengths
- [x] Quick-fix action generation
- [x] Configuration reading and updates
- [x] Edge cases (empty lines, tabs, special chars)

### Integration Tests
- [x] Real `.inp` file scanning (tested on RIIG.inp - 4,661 lines)
- [x] Event handler registration (open, save, change)
- [x] Command execution (toggle limiter)
- [x] VS Code interaction (problems panel, quick fixes)

### User Experience Tests
- [x] Ruler visibility at column 80
- [x] Warning appearance and clarity
- [x] Quick-fix accessibility (right-click menu)
- [x] Configuration panel usability

---

## 🔄 Upgrade Instructions

### For Users with v1.4.7
1. **From VS Code Marketplace**: Auto-update available
   - Extension will update automatically if auto-update is enabled
   - Manual: Install from marketplace as usual

2. **From VSIX File**:
   ```powershell
   # Download proii-language-support-1.4.8.vsix
   # In VS Code: Ctrl+Shift+X → ... → Install from VSIX
   ```

3. **After Upgrade**:
   - Reload VS Code window (Ctrl+Shift+P → "Reload Window")
   - Open an `.inp` file
   - Column limiter will activate automatically

### Configuration Migration
- Existing v1.4.7 settings are preserved
- New settings use defaults (80 column limit, all features enabled)
- No manual configuration needed to start using the feature

---

## 📝 Changelog

### Added
- ✅ `ColumnLimiterProvider` class for diagnostic reporting
- ✅ 4 quick-fix actions (truncate, continue, comment, ignore)
- ✅ 5 configuration properties for full customization
- ✅ Visual ruler at column 80 (editor configuration)
- ✅ Toggle command for feature enable/disable
- ✅ Event handlers for document lifecycle (open, change, save)
- ✅ Comprehensive documentation (COLUMN_LIMITER_FEATURE.md)

### Modified
- ✅ `src/extension.ts` - Integrated column limiter
- ✅ `package.json` - Updated version and configuration

### Unchanged
- ✨ Stream name highlighting (v1.4.7 functionality preserved)
- ✨ Hover tooltips (v1.4.7 functionality preserved)
- ✨ Code snippets (v1.4.7 functionality preserved)
- ✨ DEFINE statement support (v1.4.7 functionality preserved)

---

## 🎯 Next Steps

### Immediate (v1.4.8)
- ✅ Feature complete and documented
- ✅ Ready for release

### Planned (v1.5.0+)
- [ ] Auto-wrap on save option
- [ ] Per-workspace column settings
- [ ] Batch fix all violations
- [ ] Integration with Pro/II lint server
- [ ] Line statistics export

---

## 🙏 Credits

Feature requested by: User feedback on Pro/II truncation issues  
Implementation: PRO/II Language Support Team  
Testing: Integration tested on real Pro/II `.inp` files

---

## 📞 Support & Feedback

- **Report Issues**: [GitHub Issues](https://github.com/francois-deklerk/proii-vscode-extension/issues)
- **Feature Requests**: [GitHub Discussions](https://github.com/francois-deklerk/proii-vscode-extension/discussions)
- **Documentation**: `COLUMN_LIMITER_FEATURE.md`

---

**Version**: 1.4.8  
**Release Date**: November 1, 2025  
**Status**: ✅ Production Ready
