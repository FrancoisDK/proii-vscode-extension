# Fix Applied: NAME Statement Syntax Highlighting

## Issue
The `NAME` statement was being incorrectly highlighted as comments. Everything after `NAME` turned green because the `/*` line continuation marker was being interpreted as the start of a block comment.

## What Was Fixed
1. **Removed block comment pattern** (`/* */`) that was conflicting with line continuations
2. **Added special handling for NAME statements** with proper pattern matching
3. **Line continuation markers** (`/*`) are now recognized correctly in NAME context

## Changes Made to `proii.tmLanguage.json`:
- Removed `/* */` block comment pattern
- Added `name-statement` pattern with special handling
- `/*` is now treated as a line continuation marker, not comment start

## Verification
After reinstalling, the NAME statement should now display:
- `NAME` keyword - highlighted (purple/magenta)
- Stream/unit names - normal text color
- Commas - as separators
- `/*` - as continuation markers (not starting a comment block)

## Example:
```proii
NAME AC11       ,AIRCOOLER   ,AIR INLET    ,E1105       /*
     AC12       ,AIRCOOLER   ,AIR INLET    ,E1106       /*
     AC15       ,AIRCOOLER   ,AIR INLET    ,E1107       /*
```

Should display with proper colors, not all green!

## To Apply the Fix:
1. **Uninstall** the old version from VS Code (optional but recommended)
2. **Reinstall** the new `proii-language-support-1.0.0.vsix`
3. **Reload** VS Code window
4. **Test** by opening a file with NAME statements

---

**Fixed on:** October 11, 2025
**Version:** 1.0.0 (updated build)
