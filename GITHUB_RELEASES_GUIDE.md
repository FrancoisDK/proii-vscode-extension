# GitHub Releases Upload Guide

## 📦 Three VSIX Files Ready for Upload

```
✅ proii-language-support-1.4.6.vsix (1.49 MB)
✅ proii-language-support-1.4.7.vsix (1.5  MB)
✅ proii-language-support-1.4.8.vsix (1.5  MB)
```

Location: `D:\pyScripts\proii-vscode-extension\`

---

## 🚀 How to Upload to GitHub Releases

### Option 1: Using GitHub Web Interface (Easiest)

1. Go to: https://github.com/FrancoisDK/proii-vscode-extension/releases
2. Click **"Create a new release"** (or **"Draft a new release"**)
3. Fill in the details for each version:

#### **Release v1.4.8** (Latest)
- **Tag version**: `v1.4.8`
- **Release title**: `v1.4.8 - 80-Column Limiter & Enhanced LIBID Highlighting`
- **Description**:
```
## 🆕 What's New in v1.4.8

⭐ **MAJOR FEATURES**
- 80-Column Width Limiter for Pro/II compliance
- Enhanced LIBID syntax highlighting (multi-line support)
- Component numbers and names now distinctly highlighted
- Smart multi-line continuation support with /& marker

## ✨ Key Improvements
- Component IDs highlighted in orange/yellow
- Component names highlighted in cyan/green
- Proper visual separation of component pairs
- Spans multiple lines correctly

## 🔧 Files Included
- `proii-language-support-1.4.8.vsix` - Full extension package

## 📖 Documentation
See `COLUMN_LIMITER_FEATURE.md` for complete feature guide.
```
- **Attach files**: Drag/drop `proii-language-support-1.4.8.vsix`
- **Check**: "Set as the latest release"
- **Click**: "Publish release"

---

#### **Release v1.4.7**
- **Tag version**: `v1.4.7`
- **Release title**: `v1.4.7 - DEFINE Hover & Operator Synonyms`
- **Description**:
```
## ✨ What's New in v1.4.7

### 🌊 Stream Description Hover Tooltips
Hover over any stream name to see its complete description from the NAME section

### 🔧 Improvements
- Added DEFINE statement hover and example support
- Full operator synonyms for arithmetic expressions
- Updated PRES hover default units and guidance
- Improved CONTROLLER hover accuracy
- CALC and CALCULATOR now behave identically

### 📋 Files Included
- `proii-language-support-1.4.7.vsix` - Full extension package
```
- **Attach files**: Drag/drop `proii-language-support-1.4.7.vsix`
- **Check**: "Set as a pre-release" (if you want v1.4.8 as latest)
- **Click**: "Publish release"

---

#### **Release v1.4.6**
- **Tag version**: `v1.4.6`
- **Release title**: `v1.4.6 - Stream Description Tooltips`
- **Description**:
```
## ✨ What's New in v1.4.6

### 🌊 Stream Description Hover Tooltips
Hover over any stream name to see its complete description from the NAME section

### 🔧 Key Features
- Stream Descriptions on Hover
- NAME Section Parsing for comma-separated descriptions
- 237+ Streams Supported
- Smart Context Detection

### 📋 Files Included
- `proii-language-support-1.4.6.vsix` - Full extension package
```
- **Attach files**: Drag/drop `proii-language-support-1.4.6.vsix`
- **Check**: "Set as a pre-release"
- **Click**: "Publish release"

---

### Option 2: Using PowerShell + curl (Alternative)

```powershell
# First, create git tags if they don't exist
cd D:\pyScripts\proii-vscode-extension
git tag v1.4.8 -m "v1.4.8 - 80-Column Limiter & Enhanced LIBID Highlighting"
git tag v1.4.7 -m "v1.4.7 - DEFINE Hover & Operator Synonyms"
git tag v1.4.6 -m "v1.4.6 - Stream Description Tooltips"

# Push tags to GitHub
git push origin v1.4.8 v1.4.7 v1.4.6
```

Then create releases through web interface.

---

## ✅ Verification After Upload

After uploading all three releases:

1. Visit: https://github.com/FrancoisDK/proii-vscode-extension/releases
2. Verify all three versions appear
3. Confirm VSIX files are attached to each release
4. Check that v1.4.8 is marked as "Latest release"

---

## 📊 Release Summary

| Version | Features | Status |
|---------|----------|--------|
| v1.4.6 | Stream Hover Tooltips | Pre-release |
| v1.4.7 | DEFINE Hover, Operators | Pre-release |
| v1.4.8 | 80-Column Limiter, LIBID | Latest Release ✅ |

---

## 🎯 Next Steps

After uploading to releases:

1. **Publish to VS Code Marketplace** (optional)
2. **Announce new release** to users
3. **Archive VSIX files** locally for backup
4. **Update documentation** with release links

---

## 📝 Notes

- VSIX files are located at: `D:\pyScripts\proii-vscode-extension\`
- Git tags already exist for v1.4.6 and v1.4.7
- You may need to create tag for v1.4.8 if not already done
- Each VSIX is self-contained and independent

---

**Ready to upload?** Go to GitHub Releases and follow the steps above! 🚀
