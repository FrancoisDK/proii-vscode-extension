# Release v1.4.9 - Icon Trademark Fix

## Priority: URGENT
**Release Date**: Within 48 hours  
**Type**: Patch release (trademark/legal fix)

---

## Changes

### Fixed
- **Icon replacement**: Removed potentially trademarked icon, replaced with original copyright-free design
  - Old: `PRO_II.png` (potential trademark issue with AVEVA PRO/II branding)
  - New: `proii_icon_new.png` (original geometric design)
  - Design: Circle + Square (unit operation symbol) + P2 text + stream arrows
  - Colors: Cyan (#4EC9B0) equipment, Orange (#CE9178) streams
  - Status: 100% original, no trademark concerns

### No Functional Changes
- All features from v1.4.8 remain unchanged
- No breaking changes
- No new features

---

## Release Checklist

### 1. Generate New Icon
- [ ] Open `generate_icon.html` in browser
- [ ] Click "Download as PNG (128x128)"
- [ ] Save as `proii_icon_new.png` in extension root
- [ ] Verify icon is 128x128 pixels

### 2. Update Files
- [ ] Update `package.json`: Change `"icon": "PRO_II.png"` to `"icon": "proii_icon_new.png"`
- [ ] Update version: `"version": "1.4.9"`
- [ ] Update `CHANGELOG.md`: Add v1.4.9 entry
- [ ] Update `README.md`: No changes needed (features unchanged)

### 3. Build & Test
```bash
npm run compile
vsce package
# Should create: proii-language-support-1.4.9.vsix
```

- [ ] Verify VSIX contains new icon
- [ ] Install locally and test:
  ```bash
  code --install-extension proii-language-support-1.4.9.vsix
  ```
- [ ] Check icon appears correctly in Extensions panel
- [ ] Test all features work (hover, column limiter, etc.)

### 4. Git Commit
```bash
git add proii_icon_new.png
git add package.json
git add CHANGELOG.md
git rm PRO_II.png  # Remove old icon
git commit -m "fix: Replace icon to avoid trademark infringement (v1.4.9)

- Remove PRO_II.png (potential trademark issue)
- Add proii_icon_new.png (original copyright-free design)
- No functional changes
- Legal/trademark compliance fix"

git tag v1.4.9
git push origin main --tags
```

### 5. GitHub Release
- [ ] Go to: https://github.com/FrancoisDK/proii-vscode-extension/releases/new
- [ ] Tag: `v1.4.9`
- [ ] Title: `v1.4.9 - Icon Trademark Fix`
- [ ] Description:
```markdown
## v1.4.9 - Icon Trademark Fix (2025-11-15)

### Fixed
- **⚠️ Trademark Compliance**: Replaced extension icon to avoid potential trademark infringement
  - Removed icon that may have resembled AVEVA PRO/II branding
  - New icon is 100% original geometric design (circle + square + arrows)
  - No functional changes to extension features

### No Breaking Changes
All features from v1.4.8 remain fully functional:
- ✅ 80-column limiter
- ✅ Component definition lookup
- ✅ Stream name highlighting
- ✅ Hover tooltips
- ✅ 43+ code snippets

**This is a legal/compliance fix only - no need to update unless concerned about icon.**
```
- [ ] Upload `proii-language-support-1.4.9.vsix`

### 6. VS Code Marketplace
- [ ] Publish to marketplace:
  ```bash
  vsce publish patch
  # Or manually upload at:
  # https://marketplace.visualstudio.com/manage/publishers/francois-de-klerk
  ```

### 7. Notify Users (Optional)
- [ ] Add notice to README
- [ ] Update documentation

---

## CHANGELOG.md Entry

```markdown
## [1.4.9] - 2025-11-15

### Fixed
- **Icon Replacement**: Replaced extension icon to avoid potential trademark infringement with AVEVA PRO/II branding
  - New icon: Original geometric design (circle + square symbol with stream arrows)
  - Color scheme: Cyan (#4EC9B0) for equipment, Orange (#CE9178) for streams
  - Copyright status: 100% original, safe for distribution
  
### Note
- No functional changes - all v1.4.8 features remain unchanged
- This is a legal compliance fix only
```

---

## Legal Notice to Add

**To `README.md` (optional section at bottom)**:

```markdown
## Legal & Trademark Notice

This extension provides **language support** for PRO/II file formats and is **not affiliated with, endorsed by, or sponsored by AVEVA or the PRO/II software product**.

- **PRO/II** is a registered trademark of AVEVA Group plc
- This extension is an independent, open-source tool for syntax highlighting and editing support
- No proprietary code, algorithms, or branding from PRO/II software is included
- Extension icon and branding are original designs with no trademark conflicts

For the official PRO/II software, visit: https://www.aveva.com/
```

---

## Timeline

- **Day 1 (Today)**: Generate icon, update files, test locally
- **Day 2 (Tomorrow)**: Build VSIX, commit, create GitHub release
- **Day 3**: Publish to marketplace, monitor for issues

---

## Post-Release

### Monitor
- [ ] Check GitHub issues for icon-related feedback
- [ ] Verify marketplace listing shows new icon
- [ ] Ensure download counts continue normally

### Next Steps (After v1.4.9)
- [ ] Plan v2.0.0 with LSP (separate repo/branch)
- [ ] Maintain v1.x as stable version
- [ ] Document migration path to v2.0
