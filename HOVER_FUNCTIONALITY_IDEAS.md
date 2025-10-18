# 🎯 Hover Functionality Ideas for PRO/II Extension

## What is Hover Functionality?

**Hover tooltips** appear when you hover your mouse over keywords, parameters, or values in your code. They provide instant documentation without leaving your editing context.

### Example:
```
When you hover over "FLASH" → Shows tooltip:
┌────────────────────────────────────────┐
│ FLASH - Flash Separation Unit         │
│                                        │
│ Types: Isothermal, Adiabatic,        │
│        Isentropic, Dew Point,         │
│        Bubble Point, Spec             │
│                                        │
│ Common Parameters:                     │
│   TEMP=   Temperature specification   │
│   PRES=   Pressure specification      │
│   DUTY=   Heat duty specification     │
│   FEED=   Feed stream(s)              │
│   PROD=   Product stream(s)           │
└────────────────────────────────────────┘
```

---

## 🎨 **Tier 1: Unit Operation Tooltips** (HIGHEST VALUE)

### What to Show:
When hovering over unit operations like `FLASH`, `COLUMN`, `HEATX`, `PUMP`

```yaml
Hover Content:
  - Unit operation name and description
  - Common flash types (Isothermal, Adiabatic, etc.)
  - Required parameters
  - Optional parameters
  - Example syntax
  - Common mistakes/tips
```

### Implementation Example:
```typescript
// extension.ts
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const hoverProvider = vscode.languages.registerHoverProvider(
        ['proii-input', 'proii-standard', 'proii-output'],
        {
            provideHover(document, position, token) {
                const range = document.getWordRangeAtPosition(position);
                const word = document.getText(range);
                
                // Check if word is a unit operation
                const unitOps = getUnitOperationInfo(word.toUpperCase());
                if (unitOps) {
                    return new vscode.Hover(unitOps);
                }
            }
        }
    );
    
    context.subscriptions.push(hoverProvider);
}
```

### Data Structure:
```typescript
const UNIT_OPERATIONS = {
    'FLASH': {
        description: 'Flash Separation Unit',
        types: [
            'Isothermal - Constant temperature flash',
            'Adiabatic - No heat transfer flash',
            'Isentropic - Constant entropy flash',
            'Dew Point - Vapor condenses',
            'Bubble Point - Liquid vaporizes',
            'Spec - User-specified conditions'
        ],
        parameters: {
            required: ['FEED=', 'PROD='],
            optional: ['TEMP=', 'PRES=', 'DUTY=', 'VFRAC=', 'NAME=']
        },
        example: `FLASH
    NAME=F-101
    FEED=S1
    PROD=V1,L1
    PRES=1.5(BAR)
    TEMP=50(C)`
    },
    'COLUMN': {
        description: 'Distillation Column',
        types: [
            'Shortcut - Quick estimates',
            'Rigorous - Detailed calculations',
            'Batch - Batch distillation'
        ],
        parameters: {
            required: ['NSTAGE=', 'FEED=', 'PROD='],
            optional: ['REFLUX=', 'BOTTOM=', 'COND=', 'REB=', 'PRES=']
        },
        example: `COLUMN
    NAME=C-101
    NSTAGE=20
    FEED=S1(10)
    PROD=OVHD=V1, BOT=L1
    REFLUX=2.5
    PRES=1.0(BAR)`
    },
    'HEATX': {
        description: 'Heat Exchanger',
        types: [
            'Simple - Basic heat transfer',
            'Detailed - Full TEMA design',
            'Air Cooler - Air cooling',
            'Fired Heater - Furnace'
        ],
        parameters: {
            required: ['HOTFEED=', 'COLDFEED='],
            optional: ['DUTY=', 'LMTD=', 'AREA=', 'UA=', 'TAPP=']
        },
        example: `HEATX
    NAME=E-101
    HOTFEED=S1
    COLDFEED=S2
    HOTPROD=S3
    COLDPROD=S4
    DUTY=1000(KW)
    TAPP=10(C)`
    },
    'PUMP': {
        description: 'Centrifugal or Positive Displacement Pump',
        parameters: {
            required: ['FEED=', 'PROD='],
            optional: ['POUT=', 'DELP=', 'HEAD=', 'WORK=', 'EFF=']
        },
        example: `PUMP
    NAME=P-101
    FEED=S1
    PROD=S2
    POUT=10(BAR)
    EFF=75(%)`
    }
};
```

---

## 🎯 **Tier 2: Thermodynamic Method Tooltips**

### What to Show:
When hovering over thermo methods like `SRK`, `PR`, `IDEAL`, `NRTL`

```yaml
Hover Content:
  - Full method name
  - Best suited for (polar, non-polar, etc.)
  - Temperature/pressure range
  - Common applications
  - When NOT to use
```

### Example Data:
```typescript
const THERMO_METHODS = {
    'SRK': {
        name: 'Soave-Redlich-Kwong',
        suited_for: 'Non-polar and light hydrocarbons',
        range: 'Low to moderate pressure',
        applications: [
            'Oil & gas processing',
            'Refinery applications',
            'Natural gas systems'
        ],
        avoid: 'Highly polar systems, electrolytes'
    },
    'PR': {
        name: 'Peng-Robinson',
        suited_for: 'Hydrocarbon systems, gas processing',
        range: 'Wide pressure range',
        applications: [
            'LNG processes',
            'Gas processing',
            'Petroleum refining'
        ],
        avoid: 'Aqueous electrolyte solutions'
    },
    'NRTL': {
        name: 'Non-Random Two Liquid',
        suited_for: 'Polar mixtures, highly non-ideal systems',
        range: 'Low to moderate pressure',
        applications: [
            'Chemical processing',
            'Azeotropic distillation',
            'Liquid-liquid extraction'
        ],
        avoid: 'High pressure gas systems'
    },
    'IDEAL': {
        name: 'Ideal Gas',
        suited_for: 'Low pressure gas systems only',
        range: 'Near atmospheric pressure',
        applications: [
            'Air separation',
            'Low pressure processes'
        ],
        avoid: 'Any high pressure, any liquids'
    }
};
```

---

## 📊 **Tier 3: Parameter Tooltips**

### What to Show:
When hovering over parameters like `TEMP=`, `PRES=`, `DUTY=`

```yaml
Hover Content:
  - Parameter description
  - Valid units
  - Typical ranges
  - Related parameters
```

### Example:
```typescript
const PARAMETERS = {
    'TEMP': {
        description: 'Temperature specification',
        units: ['C', 'F', 'K', 'R'],
        typical_range: '-50 to 500°C',
        related: ['DUTY', 'VFRAC'],
        tip: 'Cannot specify both TEMP and DUTY simultaneously'
    },
    'PRES': {
        description: 'Pressure specification',
        units: ['BAR', 'KPA', 'PSI', 'ATM', 'MMHG'],
        typical_range: '0.1 to 100 bar',
        related: ['DELP', 'VFRAC'],
        tip: 'Gauge pressure by default, use PSIA for absolute'
    },
    'DUTY': {
        description: 'Heat duty specification',
        units: ['KW', 'MW', 'BTU/HR', 'KCAL/HR'],
        typical_range: '-10000 to 10000 kW',
        related: ['TEMP', 'LMTD'],
        tip: 'Positive = heating, Negative = cooling'
    },
    'VFRAC': {
        description: 'Vapor fraction specification',
        units: ['dimensionless', '0 to 1'],
        typical_range: '0.0 (all liquid) to 1.0 (all vapor)',
        related: ['TEMP', 'PRES', 'DUTY'],
        tip: '0.5 = half vapor, half liquid by mass'
    }
};
```

---

## 🔢 **Tier 4: Unit Tooltips**

### What to Show:
When hovering over unit specifications like `(BAR)`, `(C)`, `(KW)`

```yaml
Hover Content:
  - Full unit name
  - Conversions to other common units
  - Typical usage
```

### Example:
```typescript
const UNITS = {
    'BAR': {
        name: 'Bar (pressure)',
        conversions: [
            '1 bar = 100 kPa',
            '1 bar = 14.5 psi',
            '1 bar = 0.987 atm'
        ],
        usage: 'Standard metric pressure unit'
    },
    'C': {
        name: 'Celsius (temperature)',
        conversions: [
            '°C = K - 273.15',
            '°F = (°C × 9/5) + 32'
        ],
        usage: 'Common temperature scale'
    },
    'KW': {
        name: 'Kilowatt (power/duty)',
        conversions: [
            '1 kW = 1000 W',
            '1 kW = 3412 BTU/hr',
            '1 kW = 860 kcal/hr'
        ],
        usage: 'Standard power unit for heat duties'
    }
};
```

---

## 🚨 **Tier 5: Common Error Tooltips**

### What to Show:
When hovering over potential error patterns

```yaml
Hover Content:
  - What's wrong
  - Why it's a problem
  - How to fix it
```

### Example:
```typescript
// Detect patterns and show warnings
const ERROR_PATTERNS = {
    // Missing required parameter
    'FLASH without FEED': {
        error: 'FLASH unit requires FEED parameter',
        fix: 'Add: FEED=<stream_name>'
    },
    // Invalid specification
    'TEMP and DUTY together': {
        error: 'Cannot specify both TEMP and DUTY',
        fix: 'Choose one: either TEMP= or DUTY='
    },
    // Unit mismatch
    'PRES=(PSI) with SI units': {
        warning: 'Mixing unit systems',
        tip: 'Consider using BAR for consistency'
    }
};
```

---

## 📝 **Tier 6: Stream Property Tooltips**

### What to Show:
When hovering over stream names in your files

```yaml
Hover Content:
  - Stream type (feed, product, intermediate)
  - Connected units
  - Typical properties
```

This would require parsing the file to track streams.

---

## 🎓 **Tier 7: Snippet Preview in Hover**

### What to Show:
When hovering over snippet trigger words

```yaml
Example:
Hover over "fla" → Shows:
┌────────────────────────────────────┐
│ Snippet: "fla" → FLASH unit        │
│                                    │
│ Expands to:                        │
│   FLASH                            │
│       NAME=${1:F-101}              │
│       FEED=${2:feed_stream}        │
│       ...                          │
│                                    │
│ Press Tab to expand                │
└────────────────────────────────────┘
```

---

## 🏗️ **Implementation Architecture**

### File Structure:
```
proii-vscode-extension/
├── src/
│   ├── extension.ts              ← Main activation
│   ├── hoverProvider.ts          ← Hover logic
│   ├── data/
│   │   ├── unitOperations.ts     ← Unit op data
│   │   ├── thermoMethods.ts      ← Thermo data
│   │   ├── parameters.ts         ← Parameter data
│   │   └── units.ts              ← Unit conversion data
│   └── utils/
│       ├── parser.ts             ← Parse PRO/II syntax
│       └── formatter.ts          ← Format hover markdown
├── package.json                  ← Register hover provider
└── tsconfig.json                 ← TypeScript config
```

### Basic Extension Structure:

```typescript
// src/extension.ts
import * as vscode from 'vscode';
import { ProIIHoverProvider } from './hoverProvider';

export function activate(context: vscode.ExtensionContext) {
    console.log('PRO/II Language Support activated!');
    
    // Register hover provider for all PRO/II file types
    const hoverProvider = vscode.languages.registerHoverProvider(
        [
            { scheme: 'file', language: 'proii-input' },
            { scheme: 'file', language: 'proii-standard' },
            { scheme: 'file', language: 'proii-output' }
        ],
        new ProIIHoverProvider()
    );
    
    context.subscriptions.push(hoverProvider);
}
```

```typescript
// src/hoverProvider.ts
import * as vscode from 'vscode';
import { UNIT_OPERATIONS } from './data/unitOperations';
import { THERMO_METHODS } from './data/thermoMethods';
import { PARAMETERS } from './data/parameters';

export class ProIIHoverProvider implements vscode.HoverProvider {
    
    provideHover(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken
    ): vscode.ProviderResult<vscode.Hover> {
        
        // Get the word at cursor position
        const wordRange = document.getWordRangeAtPosition(position);
        if (!wordRange) {
            return;
        }
        
        const word = document.getText(wordRange).toUpperCase();
        
        // Check unit operations
        if (UNIT_OPERATIONS[word]) {
            return this.createUnitOpHover(word, UNIT_OPERATIONS[word]);
        }
        
        // Check thermodynamic methods
        if (THERMO_METHODS[word]) {
            return this.createThermoHover(word, THERMO_METHODS[word]);
        }
        
        // Check parameters (TEMP, PRES, etc.)
        const paramMatch = word.match(/^([A-Z]+)=?$/);
        if (paramMatch && PARAMETERS[paramMatch[1]]) {
            return this.createParameterHover(paramMatch[1], PARAMETERS[paramMatch[1]]);
        }
        
        return undefined;
    }
    
    private createUnitOpHover(name: string, data: any): vscode.Hover {
        const markdown = new vscode.MarkdownString();
        markdown.isTrusted = true;
        
        markdown.appendMarkdown(`### ${name} - ${data.description}\n\n`);
        
        if (data.types) {
            markdown.appendMarkdown(`**Types:**\n`);
            data.types.forEach((type: string) => {
                markdown.appendMarkdown(`- ${type}\n`);
            });
            markdown.appendMarkdown(`\n`);
        }
        
        if (data.parameters) {
            markdown.appendMarkdown(`**Required Parameters:** ${data.parameters.required.join(', ')}\n\n`);
            markdown.appendMarkdown(`**Optional Parameters:** ${data.parameters.optional.join(', ')}\n\n`);
        }
        
        if (data.example) {
            markdown.appendMarkdown(`**Example:**\n\`\`\`proii\n${data.example}\n\`\`\`\n`);
        }
        
        return new vscode.Hover(markdown);
    }
    
    private createThermoHover(name: string, data: any): vscode.Hover {
        const markdown = new vscode.MarkdownString();
        markdown.isTrusted = true;
        
        markdown.appendMarkdown(`### ${name} - ${data.name}\n\n`);
        markdown.appendMarkdown(`**Best For:** ${data.suited_for}\n\n`);
        markdown.appendMarkdown(`**Range:** ${data.range}\n\n`);
        markdown.appendMarkdown(`**Applications:**\n`);
        data.applications.forEach((app: string) => {
            markdown.appendMarkdown(`- ${app}\n`);
        });
        markdown.appendMarkdown(`\n**Avoid:** ${data.avoid}\n`);
        
        return new vscode.Hover(markdown);
    }
    
    private createParameterHover(name: string, data: any): vscode.Hover {
        const markdown = new vscode.MarkdownString();
        markdown.isTrusted = true;
        
        markdown.appendMarkdown(`### ${name} - ${data.description}\n\n`);
        markdown.appendMarkdown(`**Valid Units:** ${data.units.join(', ')}\n\n`);
        markdown.appendMarkdown(`**Typical Range:** ${data.typical_range}\n\n`);
        
        if (data.related) {
            markdown.appendMarkdown(`**Related:** ${data.related.join(', ')}\n\n`);
        }
        
        if (data.tip) {
            markdown.appendMarkdown(`💡 **Tip:** ${data.tip}\n`);
        }
        
        return new vscode.Hover(markdown);
    }
}
```

### Update package.json:
```json
{
    "name": "proii-language-support",
    "version": "1.1.0",
    "main": "./out/extension.js",
    "activationEvents": [
        "onLanguage:proii-input",
        "onLanguage:proii-standard",
        "onLanguage:proii-output"
    ],
    "contributes": {
        "languages": [...],
        "grammars": [...],
        "snippets": [...]
    },
    "scripts": {
        "vscode:prepublish": "npm run compile",
        "compile": "tsc -p ./",
        "watch": "tsc -watch -p ./"
    },
    "devDependencies": {
        "@types/vscode": "^1.60.0",
        "@types/node": "^16.x",
        "typescript": "^4.4.3"
    }
}
```

---

## 🎯 **Recommended Implementation Priority**

### **Phase 1: MVP** (Start Here)
1. **Unit Operations** (FLASH, COLUMN, HEATX, PUMP, COMP, VALVE)
   - Most valuable for users
   - ~13 unit operations from your snippets
   - Show: description, parameters, example

### **Phase 2: Enhanced**
2. **Thermodynamic Methods** (SRK, PR, NRTL, IDEAL, etc.)
   - Show: full name, applications, when to use
3. **Parameters** (TEMP, PRES, DUTY, VFRAC, etc.)
   - Show: description, units, typical ranges

### **Phase 3: Advanced**
4. **Unit Conversions** (hover over (BAR), (C), (KW))
   - Show: conversions, typical usage
5. **Stream Intelligence** (parse file for stream connections)
   - Requires more complex parsing

### **Phase 4: Expert**
6. **Error Detection** (highlight potential issues)
7. **Property Calculations** (show real-time conversions)

---

## 📦 **Complete v1.1.0 Feature Set**

If you implement **Phase 1** hover tooltips:

```
PRO/II Language Support v1.1.0
✅ File Support: .inp, .std, .out
✅ Syntax Highlighting: 200+ keywords
✅ Code Snippets: 43 snippets
✅ Unit Operations: 13 types
✅ Custom Icon: PRO_II.png
✅ Hover Tooltips: 13 unit operations ⭐ NEW!
```

---

## 🚀 **Quick Start to Add Hover**

### Step 1: Initialize TypeScript Extension
```bash
cd c:\Users\franc\pyScripts\proii-vscode-extension
npm init -y
npm install --save-dev @types/vscode @types/node typescript
npx tsc --init
```

### Step 2: Create Extension Code
Create `src/extension.ts` with the hover provider

### Step 3: Compile
```bash
npx tsc
```

### Step 4: Update package.json
Add `"main": "./out/extension.js"`

### Step 5: Test
Press F5 in VS Code to launch Extension Development Host

### Step 6: Package
```bash
vsce package
```

---

## 💡 **Value Proposition**

### For Users:
- **Instant Documentation** - No need to search manuals
- **Fewer Errors** - Know valid parameters immediately
- **Faster Coding** - See examples right in the editor
- **Learning Tool** - New users learn PRO/II syntax faster

### Development Effort:
- **Phase 1 (MVP)**: 4-6 hours
  - Create data files for 13 unit operations
  - Implement basic hover provider
  - Test and package
  
- **Phase 2 (Enhanced)**: 2-3 hours
  - Add thermo methods and parameters
  
- **Phase 3+**: Optional enhancements

---

## 📊 **Example Hover Output**

### When hovering over "FLASH":
```markdown
### FLASH - Flash Separation Unit

**Types:**
- Isothermal - Constant temperature flash
- Adiabatic - No heat transfer flash
- Isentropic - Constant entropy flash
- Dew Point - Vapor condenses
- Bubble Point - Liquid vaporizes
- Spec - User-specified conditions

**Required Parameters:** FEED=, PROD=

**Optional Parameters:** TEMP=, PRES=, DUTY=, VFRAC=, NAME=

**Example:**
```proii
FLASH
    NAME=F-101
    FEED=S1
    PROD=V1,L1
    PRES=1.5(BAR)
    TEMP=50(C)
```
```

### When hovering over "SRK":
```markdown
### SRK - Soave-Redlich-Kwong

**Best For:** Non-polar and light hydrocarbons

**Range:** Low to moderate pressure

**Applications:**
- Oil & gas processing
- Refinery applications
- Natural gas systems

**Avoid:** Highly polar systems, electrolytes
```

---

## 🎓 **Learning Resources**

### VS Code Extension Development:
- [VS Code API Docs](https://code.visualstudio.com/api)
- [Hover Provider Guide](https://code.visualstudio.com/api/language-extensions/programmatic-language-features#show-hovers)
- [Extension Samples](https://github.com/microsoft/vscode-extension-samples)

### TypeScript:
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TS for VS Code Extensions](https://code.visualstudio.com/api/working-with-extensions/bundling-extension)

---

## ✅ **Next Steps**

1. **Decide on Phase 1 scope** - Which unit operations?
2. **Set up TypeScript** - Initialize npm project
3. **Create data files** - Unit operation info
4. **Implement hover provider** - Basic functionality
5. **Test in development mode** - Press F5
6. **Package as v1.1.0** - Release with hover support

---

## 🎉 **Summary**

**Hover functionality would provide:**
- 📚 **Instant documentation** for unit operations
- 🎯 **Parameter guidance** with valid units
- 💡 **Usage examples** right in the editor
- 🚀 **Faster development** for PRO/II files
- 🎓 **Learning tool** for new users

**Best starting point:**
- **Unit Operation hovers** (13 types)
- **4-6 hours implementation**
- **High user value**
- **v1.1.0 release ready**

Would you like me to help you set up the TypeScript project and create the first hover provider?
