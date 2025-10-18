# Stream Highlighting Architecture Simplification

## Overview
Refactored the stream name highlighting system to use a **single, data-driven approach** instead of competing TextMate and semantic token rules.

## The Change

### Before: Dual-Path Architecture ❌
- **TextMate** captured stream names at specific keyword positions (FEED, PROD, STRM=, etc.)
- **Semantic tokens** also tried to highlight stream names everywhere
- Result: Conflicts and inconsistent highlighting (only first stream in lists)

### After: Single-Path Architecture ✅
- **TextMate** highlights keywords ONLY (FEED, PROD, STRM, CALC, RETURN)
- **Semantic tokens** handle ALL stream name highlighting
- Result: Clean, consistent, no conflicts

## Technical Details

### TextMate Grammar - Before
```json
{
  "comment": "STRM= followed by stream name",
  "match": "(STRM)\\s*(=)\\s*([A-Za-z][A-Za-z0-9_]*?)(?:\\s|,|&|\\$|\\)|\\n)",
  "captures": {
    "1": { "name": "variable.parameter.proii" },
    "2": { "name": "keyword.operator.assignment.proii" },
    "3": { "name": "string.unquoted.name.proii" }  ← Causes interference
  }
}
```

### TextMate Grammar - After
```json
{
  "comment": "STRM keyword only - stream names handled by semantic tokens",
  "match": "\\b(STRM)\\s*(=)",
  "captures": {
    "1": { "name": "variable.parameter.proii" },
    "2": { "name": "keyword.operator.assignment.proii" }
  }
}
```

### Semantic Token Provider (Unchanged)
```typescript
// Extract all defined stream names from NAME sections
const streamNames = parseNameSection(document);

// Highlight ALL instances in document
for (const streamName of sortedStreams) {
  // Pattern: surrounded by separators or boundaries
  const pattern = new RegExp(
    `([\\s,=\\(\\[])${streamName}([\\s,=\\)\\];/*]|$)`,
    'gi'
  );
  // ... find and highlight all matches ...
}
```

## Stream Highlighting Flow

```
Document Text
    ↓
┌─────────────────────────────────────┐
│ 1. TextMate Processing              │
│    - Highlight FEED keyword         │
│    - Highlight PROD keyword         │
│    - Highlight STRM= operators      │
│    - Highlight CALC= operators      │
│    - Highlight RETURN keyword       │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│ 2. Semantic Token Processing        │
│    - Extract stream names from NAME │
│    - Find ALL stream references     │
│    - Highlight all with stream      │
│      color (no conflicts with       │
│      TextMate since it only has     │
│      keywords, not stream names)    │
└─────────────────────────────────────┘
    ↓
Final Result: Clean, consistent highlighting
```

## What Changed in Grammar File

**File**: `syntaxes/proii.tmLanguage.json`

**Section**: `stream-reference` patterns

### Pattern 1: FEED
- **Before**: `^\\s*(FEED)\\s+([A-Za-z][A-Za-z0-9_]*?)(?:\\s|,|&|\\$|$)`
- **After**: `^\\s*(FEED)\\b`
- **Captures**: Removed stream name capture (was capture group 2)

### Pattern 2: PROD
- **Before**: `\\b(PROD)\\s+m\\s*=\\s*([A-Za-z][A-Za-z0-9_]*?)(?:\\s|,|&|\\$|$)`
- **After**: `\\b(PROD)\\b`
- **Captures**: Removed stream name capture (was capture group 2)

### Pattern 3: RETURN
- **Before**: `\\b(RETURN)\\s+([A-Za-z][A-Za-z0-9_]*?)(?:\\s|,|&|\\$|$)`
- **After**: `\\b(RETURN)\\b`
- **Captures**: Removed stream name capture (was capture group 2)

### Pattern 4: STRM=
- **Before**: `(STRM)\\s*(=)\\s*([A-Za-z][A-Za-z0-9_]*?)(?:\\s|,|&|\\$|\\)|\\n)`
- **After**: `\\b(STRM)\\s*(=)`
- **Captures**: Removed stream name capture (was capture group 3)

### Pattern 5: CALC=
- **Before**: `(CALC)\\s*(=)\\s*([A-Za-z][A-Za-z0-9_]*)(?=\\s+[A-Z]|\\s*\\)|\\s*$|\\s*&|\\s*\\$)`
- **After**: `\\b(CALC)\\s*(=)`
- **Captures**: Removed stream name capture (was capture group 3)

## Benefits

| Aspect | Before | After |
|--------|--------|-------|
| **Code Complexity** | Complex regex patterns | Simple keyword patterns |
| **Maintainability** | Multiple patterns to maintain | Single data-driven approach |
| **Correctness** | Partial (conflicts) | Complete (no conflicts) |
| **Scalability** | Limited by regex | Unlimited (data-driven) |
| **Performance** | Pattern matching at keyword | Pattern matching at keyword |
| **Consistency** | Inconsistent (context-dependent) | Consistent (everywhere) |

## Example: OUTPUT STRM Highlighting

### Before
```
OUTPUT Format = ASTM, STRM=SRGO,LRY,DHTF
                       ↓
                    Only SRGO highlighted
                    (TextMate captured it)
                    
                       LRY and DHTF NOT highlighted
                       (No TextMate match, semantic tokens blocked)
```

### After
```
OUTPUT Format = ASTM, STRM=SRGO,LRY,DHTF
                       ↓↓↓ ↓↓↓ ↓↓↓↓
                    All streams highlighted
                    (Semantic tokens handle all)
```

## Stream Name Coverage

The semantic token provider highlights ALL defined streams:
- ✅ SRGO, LRY, DHTF, CHPL, CHPL1, ISBTIN, R2OUL, etc.
- ✅ In FEED statements
- ✅ In PRODUCT/PROD lines
- ✅ In STRM= equations
- ✅ In CALC= expressions
- ✅ In RETURN statements
- ✅ In continuation lines after `/&`
- ✅ Comma-separated lists
- ✅ Space-separated lists
- ✅ Any valid context

## Implementation Details

### Data-Driven Approach
1. **Extract stream definitions** from NAME sections
2. **Build list of valid streams** (244+ in typical files)
3. **Highlight by list membership** (semantic tokens)
4. **No regex patterns needed** for stream names

### Keywords Still Pattern-Based
TextMate continues to handle keywords efficiently:
- FEED, PROD, STRM, CALC, RETURN
- These are fixed, static keywords
- Pattern matching is appropriate

## Version Information
- **Extension Version**: 1.3.1
- **VSIX File**: proii-language-support-1.3.1.vsix (704.9KB, 71 files)
- **Commit**: 0dc30d8 ("Simplify stream highlighting: remove all TextMate stream captures")

## Why This Is Better

1. **Simpler Architecture**: TextMate only for static keywords, semantic tokens for dynamic streams
2. **No Conflicts**: Each system has clear responsibility
3. **More Maintainable**: No complex regex patterns for stream names
4. **More Robust**: Data-driven approach adapts to any defined streams
5. **Better Performance**: Fewer pattern matches in TextMate (removed complex lookahead)
6. **Single Source of Truth**: Stream definitions drive highlighting

This represents the optimal balance between:
- TextMate performance (simple patterns)
- Semantic token accuracy (data-driven)
- Overall system maintainability (clear separation)
