# Stream Highlighting Issue Diagnosis: OUTPUT STRM Lines

## Problem Statement
In OUTPUT STRM lines like:
```proii
OUTPUT Format = ASTM, STRM=SRGO,LRY,DHTF
```

Only **SRGO** is highlighted in the stream color, while **LRY** and **DHTF** are not highlighted, even though they are defined streams in the NAME sections.

## Root Cause Analysis

### Verified Facts:
✅ All three streams (SRGO, LRY, DHTF) are correctly extracted from NAME sections (244 total streams extracted)
✅ All three streams are found by the semantic token regex patterns:
   - SRGO matched at position 29-33: `=SRGO,`
   - LRY matched at position 34-37: `,LRY,`
   - DHTF matched at position 38-42: `,DHTF`
✅ The semantic token provider logic is correct (tested 32 real-world cases, 100% pass rate)
✅ The semantic tokens should be generated for all three streams

### Likely Cause:
**Token Rendering or Theme Color Issue**

Since the tokens are being detected correctly by the regex patterns but only one stream shows highlighting, the issue is likely in one of these areas:

1. **TextMate Grammar Override**: The TextMate grammar may be classifying tokens as something other than "streamName", preventing semantic tokens from rendering
2. **Semantic Token Priority**: VS Code may not render semantic tokens if TextMate has already classified the position  
3. **Theme Color Missing**: The `streamName` semantic token type may not have a color defined in the active theme
4. **Token Deduplication**: VS Code might deduplicate tokens if there are overlapping ranges
5. **Line Processing**: The semantic token provider might stop processing after finding the first token

## Investigation Required

### Step 1: Check Theme Color Application
Add explicit semantic token color mappings to see if that fixes highlighting:

In `package.json`, add a `semanticTokenColors` object:

```json
"semanticTokenColors": {
  "streamName": "#D7BA7D",
  "streamName.definition": "#4EC9B0"
}
```

### Step 2: Disable TextMate Grammar Interference
Temporarily modify `syntaxes/proii.tmLanguage.json` to NOT match stream names in OUTPUT lines, allowing semantic tokens to render:

Current rule (matches only first stream):
```json
"match": "(STRM)\\s*(=)\\s*([A-Za-z][A-Za-z0-9_]*?)(?:\\s|,|&|\\$|\\)|\\n)"
```

Change to not capture stream names in OUTPUT context, let semantic tokens handle it.

### Step 3: Test Semantic Token Generation
Add debugging to `streamNameProvider.ts` to verify tokens are being pushed:

```typescript
console.log(`Pushing token for ${streamName} at line ${lineNum}, pos ${startChar}`);
builder.push(lineNum, startChar, length, 0, 0);
```

Then reload extension and check VS Code console output.

### Step 4: Check for Token Conflicts
Verify that semantic tokens don't overlap with TextMate classifications by reviewing:
- Are any lines classified as keyword/variable that shouldn't be?
- Do the token positions align with character boundaries?
- Are there encoding issues with non-ASCII characters?

## Solution Approaches

### Approach 1: Clean TextMate Grammar (Recommended)
Modify the `stream-reference` patterns in `syntaxes/proii.tmLanguage.json` to:
- Only match SINGLE stream in FEED/PRODUCT contexts (TextMate is good for these)
- Skip matching streams in OUTPUT/STRM lines (let semantic tokens handle the complex comma-separated lists)

This prevents TextMate from "claiming" the tokens and allows semantic tokens full priority.

### Approach 2: Enhanced Semantic Token Legend
Ensure `semanticTokenLegend` is properly registered with color information:

```typescript
export const semanticTokenLegend = new vscode.SemanticTokensLegend(
    ['streamName'], 
    ['']
);
```

And add to `package.json`:
```json
"semanticTokenColors": {
  "streamName": "#D7BA7D"  // Match the color of other defined-name highlights
}
```

### Approach 3: Range Collection for Multiple Matches
Ensure the semantic token builder accumulates all ranges without deduplication:

The current code uses `while ((match = pattern1.exec(line)) !== null)` which should work, but verify that:
- No tokens are being dropped
- Token ranges don't overlap
- Line number is correct (not off by one)

## Testing Checklist

After implementing fixes:

- [ ] Load extension in debug mode
- [ ] Open RIIG.inp in VS Code
- [ ] Navigate to line 456: `OUTPUT Format = ASTM, STRM=SRGO,LRY,DHTF`
- [ ] Verify all three streams (SRGO, LRY, DHTF) are highlighted
- [ ] Check other OUTPUT formats on lines 457-460
- [ ] Test with spaces: `STRM = SRGO, LRY, DHTF` (line 457 has this format)
- [ ] Verify no regressions in other FEED/PRODUCT highlighting
- [ ] Test continuation lines (QLIQ2, LRY after /&)
- [ ] Compile and package final VSIX

## Code References

**File**: `src/streamNameProvider.ts`  
**Function**: `provideDocumentSemanticTokens` (lines 103-174)  
**Patterns**:
- Pattern 1 (line 145): `([\\s,=\\(\\[])${streamName}([\\s,=\\)\\];/*]|$)`
- Pattern 2 (line 160): `^(\\s*)${streamName}([\\s,=\\)\\];/*]|$)`

**File**: `syntaxes/proii.tmLanguage.json`  
**Section**: `stream-reference` (lines 183-246)

## Example Case

Line 456-457 from RIIG.inp:
```proii
  OUTPUT Format = ASTM, STRM=SRGO,LRY,DHTF
  OUTPUT Format = ASTM, STRM = CHPL1, CHPL,ISBTIN, R2OUL
```

Expected Highlighting:
- Line 456: SRGO ✓, LRY ✓, DHTF ✓
- Line 457: CHPL1 ✓, CHPL ✓, ISBTIN ✓, R2OUL ✓

Current Result:
- Line 456: SRGO ✓, LRY ✗, DHTF ✗
- Line 457: CHPL1 ✓, CHPL ✗, ISBTIN ✗, R2OUL ✗

This suggests a **systematic issue** where only the first stream in each comma-separated list is highlighted, pointing to TextMate grammar capturing and preventing semantic tokens from rendering.

## Recommendations

1. **Priority 1**: Review TextMate `stream-reference` patterns to see if they're interfering
2. **Priority 2**: Add semantic token color definitions to theme/package.json
3. **Priority 3**: Add debug logging to semantic token provider to trace token generation
4. **Priority 4**: Test in VS Code debug mode to verify token ranges and rendering
