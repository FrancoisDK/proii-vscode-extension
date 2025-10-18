# Publishing Your VS Code Extension (VSIX)

There are multiple ways to distribute your VS Code extension. Choose the method that best fits your needs.

---

## Option 1: VS Code Marketplace (Official - Recommended for Public Distribution)

### Benefits:
- ✅ Discoverable by millions of VS Code users
- ✅ Automatic updates for users
- ✅ Professional presentation
- ✅ Free to publish
- ✅ Built-in rating and review system

### Requirements:
1. **Microsoft/Azure Account** (free)
2. **Publisher Account** on VS Code Marketplace
3. **Personal Access Token** (PAT) from Azure DevOps

### Step-by-Step Guide:

#### 1. Create a Microsoft Account (if needed)
- Go to: https://account.microsoft.com/
- Sign up for free

#### 2. Create an Azure DevOps Organization
- Go to: https://dev.azure.com/
- Sign in with your Microsoft account
- Click "New organization" (free)
- Choose a name (e.g., "proii-extensions")

#### 3. Create a Personal Access Token (PAT)
1. In Azure DevOps, click your profile icon (top right)
2. Click **"Personal access tokens"**
3. Click **"New Token"**
4. Configure:
   - **Name:** "VS Code Extension Publishing"
   - **Organization:** Select your organization
   - **Expiration:** Choose duration (90 days, 1 year, custom, etc.)
   - **Scopes:** Select **"Marketplace"** → Check **"Manage"**
5. Click **"Create"**
6. **IMPORTANT:** Copy the token immediately (you can't see it again!)
   - Store it safely (password manager recommended)

#### 4. Create a Publisher Account
```powershell
# Login with your PAT
vsce login <publisher-name>
# Enter your PAT when prompted
```

Or create publisher on the web:
- Go to: https://marketplace.visualstudio.com/manage
- Sign in with Microsoft account
- Click **"Create Publisher"**
- Fill in:
  - **Publisher ID:** Unique identifier (e.g., "francois-deklerk")
  - **Display Name:** Your name or company
  - **Email:** Contact email

#### 5. Update package.json with Publisher ID

Edit `package.json`:
```json
{
  "name": "proii-language-support",
  "publisher": "francois-deklerk",  // ← Use your publisher ID
  "version": "1.3.0",
  ...
}
```

#### 6. Publish to Marketplace
```powershell
# First time: Login
vsce login your-publisher-name

# Publish (will create VSIX and upload)
vsce publish

# Or publish existing VSIX
vsce publish -p <your-PAT>
```

#### 7. Verify Publication
- Go to: https://marketplace.visualstudio.com/
- Search for your extension
- It may take a few minutes to appear

### Updating Your Extension:
```powershell
# Update version number in package.json
# Then publish:
vsce publish patch   # 1.3.0 → 1.3.1
vsce publish minor   # 1.3.0 → 1.4.0
vsce publish major   # 1.3.0 → 2.0.0

# Or specify version:
vsce publish 1.4.0
```

---

## Option 2: GitHub Releases (Good for Open Source)

### Benefits:
- ✅ Free hosting
- ✅ Version control
- ✅ Good for open source projects
- ✅ Community contributions via pull requests

### Steps:

#### 1. Create GitHub Repository
```powershell
# Initialize git (if not already done)
cd c:\Users\franc\pyScripts\proii-vscode-extension
git init
git add .
git commit -m "Initial commit - PRO/II Language Support v1.3.0"

# Create repository on GitHub (https://github.com/new)
# Then push:
git remote add origin https://github.com/your-username/proii-vscode-extension.git
git branch -M main
git push -u origin main
```

#### 2. Create a Release
1. Go to your GitHub repository
2. Click **"Releases"** (right sidebar)
3. Click **"Create a new release"**
4. Configure:
   - **Tag:** `v1.3.0`
   - **Title:** `PRO/II Language Support v1.3.0`
   - **Description:** Add release notes
   - **Attach files:** Upload your `.vsix` file
5. Click **"Publish release"**

#### 3. Share the Download Link
Users can download from:
```
https://github.com/your-username/proii-vscode-extension/releases
```

### Installation Instructions for Users:
```powershell
# Download the VSIX file from GitHub
# Then install:
code --install-extension proii-language-support-1.3.0.vsix
```

---

## Option 3: Private Distribution (Company/Internal Use)

### Benefits:
- ✅ Control over who has access
- ✅ No public marketplace needed
- ✅ Good for proprietary extensions

### Methods:

#### A. Network Share
```powershell
# Copy VSIX to shared network location
Copy-Item proii-language-support-1.3.0.vsix \\company-server\extensions\

# Users install from there:
code --install-extension \\company-server\extensions\proii-language-support-1.3.0.vsix
```

#### B. Email Distribution
- Email the `.vsix` file to users
- Include installation instructions

#### C. Internal Web Server
- Host VSIX files on company intranet
- Provide download link

#### D. Azure DevOps Artifacts (Private Marketplace)
- Create private feed in Azure DevOps
- Publish to private marketplace
- Users install from private marketplace URL

---

## Option 4: Open VSX Registry (Alternative to VS Code Marketplace)

### Benefits:
- ✅ Alternative to Microsoft marketplace
- ✅ Used by VSCodium, Gitpod, etc.
- ✅ Open source friendly

### Steps:
1. Create account at: https://open-vsx.org/
2. Install ovsx CLI:
   ```powershell
   npm install -g ovsx
   ```
3. Publish:
   ```powershell
   ovsx publish proii-language-support-1.3.0.vsix -p <your-token>
   ```

---

## Recommended Publishing Strategy

### For Your Extension:

**I recommend a two-pronged approach:**

1. **VS Code Marketplace** (Primary)
   - Reaches most users
   - Professional presentation
   - Automatic updates

2. **GitHub Releases** (Secondary)
   - Backup distribution
   - Version history
   - Open source contributions

---

## Pre-Publishing Checklist

Before publishing, ensure:

### ✅ Legal/Licensing
- [ ] Choose a license (MIT, Apache 2.0, GPL, etc.)
- [ ] Add LICENSE file to project
- [ ] Verify all code is yours or properly attributed
- [ ] Icon is copyright-free (✅ Done with new icon!)

### ✅ Documentation
- [ ] Update README.md with:
  - Clear description
  - Installation instructions
  - Usage examples
  - Feature list
  - Screenshots (optional but recommended)
- [ ] Update CHANGELOG.md
- [ ] Include contribution guidelines (if open source)

### ✅ package.json
- [ ] Correct publisher name
- [ ] Accurate version number
- [ ] Complete description
- [ ] Relevant keywords
- [ ] Repository URL (if using GitHub)
- [ ] License field
- [ ] Icon file exists and is copyright-free

### ✅ Quality
- [ ] Test extension thoroughly
- [ ] No compilation errors
- [ ] All features work as expected
- [ ] Remove any test/debug code
- [ ] Check file size (should be reasonable)

### ✅ .vscodeignore
Make sure unnecessary files are excluded:
```
.vscode/**
.gitignore
.git/**
tsconfig.json
*.ts
src/**
node_modules/**
*.md
!README.md
!CHANGELOG.md
```

---

## Quick Start Commands

### Marketplace Publishing (One-Time Setup):
```powershell
# 1. Create Azure DevOps organization and PAT (web)
# 2. Create publisher (web or CLI)
# 3. Login
vsce login your-publisher-name

# 4. Update package.json with publisher
# 5. Publish
vsce publish
```

### GitHub Releases:
```powershell
# 1. Create repo on GitHub
# 2. Push code
git init
git add .
git commit -m "v1.3.0"
git remote add origin https://github.com/your-username/proii-vscode-extension.git
git push -u origin main

# 3. Create release on GitHub web interface
# 4. Upload VSIX file
```

### Simple File Sharing:
```powershell
# Just share the VSIX file via:
# - Email
# - Network drive
# - Cloud storage (Dropbox, Google Drive, OneDrive)

# Users install with:
code --install-extension path\to\proii-language-support-1.3.0.vsix
```

---

## Monitoring and Maintenance

### After Publishing:

1. **Monitor installs/ratings** (Marketplace)
   - https://marketplace.visualstudio.com/manage

2. **Watch for issues** (GitHub)
   - Enable issue tracking
   - Respond to user feedback

3. **Regular updates**
   - Bug fixes
   - New features
   - Compatibility updates

4. **Version bump strategy:**
   - **Patch** (1.3.0 → 1.3.1): Bug fixes
   - **Minor** (1.3.0 → 1.4.0): New features
   - **Major** (1.3.0 → 2.0.0): Breaking changes

---

## Support and Help

- **VS Code Publishing Guide:** https://code.visualstudio.com/api/working-with-extensions/publishing-extension
- **Marketplace Publisher Portal:** https://marketplace.visualstudio.com/manage
- **Azure DevOps:** https://dev.azure.com/
- **vsce Documentation:** https://github.com/microsoft/vscode-vsce

---

## Summary

**Easiest for personal use:** Just share the VSIX file

**Best for public distribution:** VS Code Marketplace

**Best for open source:** Marketplace + GitHub Releases

**Best for enterprise:** Private network share or Azure DevOps Artifacts

---

Would you like me to help you with any specific publishing method? I can guide you through the Marketplace setup or create the necessary documentation files!
