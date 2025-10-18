# VS Code Extension Development Setup (No Admin Rights)

This guide explains how to set up the development environment for compiling and packaging VS Code extensions **without administrator rights**.

---

## Prerequisites

- VS Code installed (usually doesn't require admin)
- Access to download files from the internet
- User-level permissions to modify your own PATH variable

---

## Option 1: Portable Node.js Setup (Recommended - No Admin)

### Step 1: Download Node.js Portable

1. Go to **https://nodejs.org/**
2. Click on "Downloads"
3. Download the **"Windows Binary (.zip)"** version (not the installer)
   - Choose the LTS (Long Term Support) version
   - File name will be something like: `node-v20.x.x-win-x64.zip`

### Step 2: Extract Node.js

1. Extract the ZIP file to a location in your user folder:
   ```
   C:\Users\YourName\nodejs\
   ```
   
2. After extraction, you should have:
   ```
   C:\Users\YourName\nodejs\node.exe
   C:\Users\YourName\nodejs\npm
   C:\Users\YourName\nodejs\npm.cmd
   ```

### Step 3: Add Node.js to User PATH

1. Press `Win + R`, type `sysdm.cpl`, press **Enter**
2. Click the **"Environment Variables"** button
3. In the **"User variables"** section (top half), select **"Path"** and click **"Edit"**
4. Click **"New"** and add:
   ```
   C:\Users\YourName\nodejs
   ```
5. Click **OK** on all dialogs

### Step 4: Verify Installation

Open a **new** PowerShell window and test:

```powershell
node --version
# Should show: v20.x.x (or your version)

npm --version
# Should show: 10.x.x (or your version)
```

**Note:** You must open a NEW terminal window for PATH changes to take effect!

### Step 5: Navigate to Extension Folder

```powershell
cd C:\Users\YourName\path\to\proii-vscode-extension
```

Replace `YourName` and the path with your actual location.

### Step 6: Install Dependencies Locally

Install all required packages **locally** in your project (no `-g` flag):

```powershell
# Install project dependencies
npm install

# Install development tools locally
npm install vsce typescript --save-dev
```

This creates a `node_modules` folder in your project with all dependencies.

### Step 7: Compile and Package

Use `npx` to run locally-installed tools:

```powershell
# Compile TypeScript
npm run compile
# OR
npx tsc -p ./

# Package the extension
npx vsce package
```

This creates a `.vsix` file like: `proii-language-support-1.3.0.vsix`

### Step 8: Install Extension in VS Code

```powershell
code --install-extension proii-language-support-1.3.0.vsix --force
```

Or manually in VS Code:
1. Press `Ctrl + Shift + P`
2. Type "Extensions: Install from VSIX"
3. Select your `.vsix` file

---

## Option 2: Request One-Time Admin Setup

If you can get **temporary** administrator access for initial setup:

### With Admin Rights (One-Time):

```powershell
# 1. Install Node.js using the standard installer
# Download from: https://nodejs.org/
# Run the .msi installer with admin rights

# 2. Install global tools
npm install -g vsce
npm install -g typescript

# 3. Verify installation
vsce --version
tsc --version
```

### After Initial Setup (No Admin Needed):

```powershell
# Navigate to your project
cd C:\Users\YourName\path\to\proii-vscode-extension

# Install project dependencies
npm install

# Compile and package (uses global tools)
npm run compile
vsce package

# Install extension
code --install-extension proii-language-support-1.3.0.vsix --force
```

---

## Complete Development Workflow

Once set up, use this workflow to develop and test extensions:

### 1. Make Changes
Edit your TypeScript files, JSON files, etc.

### 2. Compile
```powershell
npm run compile
```

This runs the TypeScript compiler and checks for errors.

### 3. Package
```powershell
npx vsce package
# OR (if vsce installed globally)
vsce package
```

This creates/updates the `.vsix` file.

### 4. Install and Test
```powershell
code --install-extension proii-language-support-1.3.0.vsix --force
```

### 5. Reload VS Code
Press `Ctrl + Shift + P` → Type "Reload Window" → Press Enter

---

## Troubleshooting

### "command not found: node" or "command not found: npm"

**Solution:** PATH not updated properly
- Close and reopen PowerShell/Terminal
- Verify PATH was added correctly (see Step 3)
- Restart VS Code if running commands in integrated terminal

### "npx: command not found"

**Solution:** npx comes with npm 5.2+
- Update npm: `npm install -g npm` (might need admin)
- Or use full path: `.\node_modules\.bin\vsce package`

### "EACCES: permission denied"

**Solution:** Trying to install globally without admin
- Use local installation instead: `npm install vsce --save-dev`
- Use `npx` to run: `npx vsce package`

### "Cannot find module 'typescript'"

**Solution:** Dependencies not installed
```powershell
npm install
npm install typescript --save-dev
```

### VSIX package size is too large

**Solution:** Exclude unnecessary files
- Check `.vscodeignore` file
- Ensure `node_modules` is excluded (except production dependencies)

---

## Summary of Commands

### Initial Setup (One-Time):
```powershell
# Extract Node.js portable to C:\Users\YourName\nodejs\
# Add to user PATH
cd C:\Users\YourName\path\to\proii-vscode-extension
npm install
npm install vsce typescript --save-dev
```

### Daily Development:
```powershell
# Make changes to code
npm run compile              # Compile TypeScript
npx vsce package            # Create VSIX
code --install-extension proii-language-support-1.3.0.vsix --force
# Reload VS Code window
```

---

## Admin Rights Required?

| Task | Admin Required? | Solution Without Admin |
|------|----------------|------------------------|
| **Install Node.js (standard)** | ✅ Yes | Use portable version |
| **Install npm global packages (`-g`)** | ⚠️ Maybe | Install locally with `--save-dev` |
| **Project `npm install`** | ❌ No | Always works |
| **Compile TypeScript** | ❌ No | Use `npm run compile` or `npx tsc` |
| **Create VSIX** | ❌ No | Use `npx vsce package` |
| **Install VSIX in VS Code** | ❌ No | Always works |
| **Modify user PATH** | ❌ No | User variables only |
| **Modify system PATH** | ✅ Yes | Not needed - use user PATH |

---

## Additional Resources

- **Node.js Downloads:** https://nodejs.org/en/download/
- **VS Code Extension API:** https://code.visualstudio.com/api
- **vsce Documentation:** https://github.com/microsoft/vscode-vsce
- **TypeScript Documentation:** https://www.typescriptlang.org/docs/

---

## Notes

- **Portable Node.js** means you can carry your development environment on a USB drive
- **Local installation** (`--save-dev`) adds packages to `package.json` devDependencies
- **npx** runs packages from local `node_modules/.bin/` without global installation
- **User PATH** modifications don't require admin and work for your account only

---

**Bottom Line:** With portable Node.js + local npm packages + npx, you can do **everything without admin rights!** 🎉
