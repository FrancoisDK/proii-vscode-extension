$ PRO/II Language Support - Installation & Testing Guide

## Prerequisites

- Visual Studio Code (version 1.75.0 or higher)
- Node.js and npm (for packaging)

## Installation Steps

### Option 1: Install from VSIX (Easiest)

1. **Package the extension:**
   ```powershell
   cd c:\Users\franc\pyScripts\proii-vscode-extension
   npm install -g vsce
   vsce package
   ```

2. **Install in VS Code:**
   - Open VS Code
   - Press `Ctrl+Shift+P`
   - Type "Extensions: Install from VSIX"
   - Select the generated `.vsix` file

### Option 2: Development Mode

1. **Open the extension folder:**
   ```powershell
   cd c:\Users\franc\pyScripts\proii-vscode-extension
   code .
   ```

2. **Launch Extension Development Host:**
   - Press `F5` in VS Code
   - A new VS Code window will open with the extension loaded

3. **Test with your files:**
   - Open your R.txt or any `.inp`, `.std`, or `.out` file
   - Syntax highlighting should activate automatically

## Testing the Extension

### 1. Test Syntax Highlighting

Open any `.inp`, `.std`, or `.out` file and verify:
- ✅ Section headers (`COMPONENT DATA`, `STREAM DATA`, etc.) are highlighted
- ✅ Unit operations (`FLASH`, `COLUMN`, `PUMP`) stand out
- ✅ Keywords (`TEMP`, `PRES`, `RATE`) are colored
- ✅ Comments starting with `$` are grayed out
- ✅ Numbers are highlighted
- ✅ Thermodynamic methods (`SRK`, `SOUR`) are distinct

### 2. Test Code Snippets

Create a new `.inp` file and try:
- Type `title` + Tab → Should expand to TITLE block
- Type `flash` + Tab → Should expand to FLASH unit
- Type `prop` + Tab → Should expand to stream property
- Type `comment` + Tab → Should create comment separator

### 3. Test Language Features

- **Comments**: Type `$` at line start → Should be recognized as comment
- **Auto-close**: Type `"` → Should auto-close with another `"`
- **Continuation**: Type `&` → Should be highlighted as continuation operator

## Verification Checklist

- [ ] Extension installs without errors
- [ ] `.inp` files are recognized
- [ ] Syntax highlighting works
- [ ] Snippets expand correctly
- [ ] Comments are highlighted
- [ ] Line continuation (`&`) is recognized
- [ ] Numbers (including scientific notation) are highlighted
- [ ] All unit operations are recognized

## Troubleshooting

### Issue: No syntax highlighting
- **Solution**: Ensure the file has `.inp` extension
- Try manually setting language: Click language selector (bottom right) → Select "PRO/II"

### Issue: Snippets not working
- **Solution**: Make sure file is recognized as Pro/II language
- Press `Ctrl+Space` to manually trigger IntelliSense

### Issue: Extension not loading
- **Solution**: Check VS Code version (must be 1.75.0+)
- Reload window: `Ctrl+Shift+P` → "Developer: Reload Window"

## Publishing (Optional)

To publish to VS Code Marketplace:

1. **Create publisher account:**
   - Visit https://marketplace.visualstudio.com/manage
   - Create a publisher ID

2. **Update package.json:**
   - Set your publisher name

3. **Publish:**
   ```powershell
   vsce publish
   ```

## Next Steps

1. Test with multiple `.inp` files
2. Report any missing keywords or patterns
3. Suggest additional snippets
4. Consider adding Language Server Protocol for advanced features

## Support

For issues or suggestions:
- Check the README.md for feature list
- Review CHANGELOG.md for version history
- Refer to the PRO/II Keyword Manual for syntax reference
