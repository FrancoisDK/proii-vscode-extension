# PRO/II Language Server (v2.0) - Fork & Development Plan

## Executive Summary

Fork the current extension to create a **v2.0 with full Language Server Protocol (LSP)** implementation, while maintaining v1.x as stable release.

**Timeline**: 3-6 months  
**Approach**: New repository (recommended) or long-lived branch  
**Version**: v2.0.0 (major version bump justified by architectural change)

---

## Why Fork?

### Technical Justification
1. **Complete architectural rewrite**: Providers → LSP
2. **Different dependency tree**: `vscode-languageserver`, parser libraries
3. **Breaking changes**: API surface, configuration, performance characteristics
4. **Long development cycle**: Can't block v1.x maintenance
5. **Risk isolation**: Don't break stable extension used by users

### Semantic Versioning
```
v1.x.x = Current architecture (custom providers)
v2.0.0 = LSP architecture (major breaking change)
v3.0.0 = Future (maybe multi-file workspace support)
```

---

## Repository Strategy

### Option A: New Repository (RECOMMENDED ⭐)

**Repo Name**: `proii-language-server` or `proii-lsp`

**Advantages**:
- ✅ Clean slate for LSP architecture
- ✅ Separate issue tracking
- ✅ Independent CI/CD
- ✅ Clear separation of concerns
- ✅ v1.x continues unaffected
- ✅ Can archive when stable

**Structure**:
```
proii-language-server/
├── client/                 # VS Code extension (thin client)
│   ├── src/
│   │   └── extension.ts
│   └── package.json
├── server/                 # Language server (heavy lifting)
│   ├── src/
│   │   ├── server.ts
│   │   ├── parser/
│   │   ├── validator/
│   │   └── providers/
│   └── package.json
├── shared/                 # Shared types
│   └── types.ts
├── package.json           # Workspace root
└── README.md
```

### Option B: Branch in Existing Repo

**Branch Name**: `v2-lsp` or `develop/v2`

**Advantages**:
- ✅ All history in one place
- ✅ Easier to cherry-pick fixes
- ✅ Simpler for solo developer

**Disadvantages**:
- ❌ Risk of confusion (which branch?)
- ❌ Cluttered issue tracker
- ❌ CI/CD runs for both versions

**Branch Strategy**:
```
main              # v1.x stable
  └── v2-lsp     # v2.0 development
       └── feature/* # LSP features
```

---

## Migration Path for Users

### Dual Publishing Strategy

**Year 1 (2025-2026)**:
- **v1.x** (`proii-language-support`): Maintenance mode, bug fixes only
- **v2.x** (`proii-lsp` or beta tag): Active development, opt-in

**Year 2 (2026+)**:
- **v1.x**: Security fixes only
- **v2.x**: Production-ready, recommended
- **Migration guide**: Clear path for users

### Version Comparison

| Feature | v1.x (Current) | v2.0 (LSP) |
|---------|----------------|------------|
| Syntax Highlighting | ✅ | ✅ |
| Hover Tooltips | ✅ | ✅ Enhanced |
| Stream Highlighting | ✅ | ✅ Enhanced |
| Component Lookup | ✅ | ✅ Enhanced |
| Column Limiter | ✅ | ✅ |
| Auto-completion | Snippets only | ✅ Context-aware |
| Go-to-Definition | ❌ | ✅ NEW |
| Find References | ❌ | ✅ NEW |
| Error Validation | Basic | ✅ Comprehensive |
| Rename Symbol | ❌ | ✅ NEW |
| Document Symbols | ❌ | ✅ NEW |
| Multi-file Support | ❌ | ✅ NEW |

---

## Development Phases

### Phase 0: Setup (Week 1-2)

**Create New Repo** (if Option A):
```bash
# On GitHub
# Create new repo: proii-language-server

# Clone and initialize
git clone https://github.com/FrancoisDK/proii-language-server.git
cd proii-language-server

# Initialize NPM workspace
npm init -y
npm init -w client
npm init -w server
npm init -w shared

# Install dependencies
npm install --workspace=client vscode-languageclient
npm install --workspace=server vscode-languageserver vscode-languageserver-textdocument

# Copy data files from v1.x
cp -r ../proii-vscode-extension/src/data ./shared/data
```

**Or Create Branch** (if Option B):
```bash
cd proii-vscode-extension
git checkout -b v2-lsp
git push -u origin v2-lsp

# Add development notice
echo "# ⚠️ v2.0 LSP Development Branch - DO NOT USE IN PRODUCTION" > BRANCH_README.md
git add BRANCH_README.md
git commit -m "chore: Initialize v2.0 LSP development branch"
```

**Deliverables**:
- [ ] Repository/branch created
- [ ] NPM workspace initialized
- [ ] Dependencies installed
- [ ] Basic README with warning
- [ ] Architecture document

---

### Phase 1: Lexer & Parser (Month 1)

**Goal**: Parse PRO/II files into Abstract Syntax Tree (AST)

**Tasks**:
1. **Lexer** (Tokenization)
   ```typescript
   // server/src/lexer.ts
   export enum TokenType {
     KEYWORD,        // FLASH, COLUMN, etc.
     IDENTIFIER,     // Stream names, UIDs
     NUMBER,         // 100, 3.14, 1.5E-3
     OPERATOR,       // =, +, -, etc.
     COMMENT,        // $ comment
     CONTINUATION,   // &
     NEWLINE,
     EOF
   }
   ```

2. **Parser** (AST Construction)
   ```typescript
   // server/src/parser.ts
   export interface AST {
     sections: Section[];
     streams: Stream[];
     unitOperations: UnitOperation[];
     components: Component[];
   }
   ```

3. **AST Nodes**
   ```typescript
   // shared/types.ts
   export interface UnitOperation {
     type: string;           // 'FLASH', 'COLUMN', etc.
     uid?: string;
     parameters: Parameter[];
     feeds: StreamReference[];
     products: StreamReference[];
     range: Range;
   }
   ```

**Testing**:
- [ ] Parse simple FLASH unit
- [ ] Parse complex COLUMN with 20+ parameters
- [ ] Handle multi-line with & continuation
- [ ] Parse multiple NAME sections
- [ ] Handle LIBID component lists

**Deliverables**:
- [ ] Lexer with full token support
- [ ] Parser with AST generation
- [ ] AST type definitions
- [ ] 50+ unit tests
- [ ] Documentation

---

### Phase 2: Core LSP (Month 2)

**Goal**: Basic language server responding to VS Code

**Tasks**:
1. **Server Setup**
   ```typescript
   // server/src/server.ts
   const connection = createConnection(ProposedFeatures.all);
   const documents = new TextDocuments(TextDocument);
   
   connection.onInitialize((params) => {
     return {
       capabilities: {
         textDocumentSync: TextDocumentSyncKind.Incremental,
         hoverProvider: true,
         completionProvider: { resolveProvider: true },
         // ... more capabilities
       }
     };
   });
   ```

2. **Document Synchronization**
   - Keep server in sync with editor changes
   - Incremental parsing for performance

3. **Symbol Table**
   ```typescript
   // server/src/symbolTable.ts
   export class SymbolTable {
     private streams: Map<string, StreamSymbol>;
     private unitOps: Map<string, UnitOpSymbol>;
     private components: Map<number, ComponentSymbol>;
     
     update(document: TextDocument, ast: AST): void { }
     findStream(name: string): StreamSymbol | undefined { }
   }
   ```

4. **Basic Diagnostics**
   - Syntax errors from parser
   - Simple validation (e.g., undefined streams)

**Testing**:
- [ ] Server starts and connects
- [ ] Document opens and parses
- [ ] Changes trigger incremental updates
- [ ] Symbol table updates correctly
- [ ] Basic diagnostics appear

**Deliverables**:
- [ ] Working language server
- [ ] Client extension connects
- [ ] Document synchronization
- [ ] Symbol table management
- [ ] Basic diagnostics

---

### Phase 3: Hover & Completion (Month 3)

**Goal**: Migrate and enhance hover tooltips, add intelligent completion

**Tasks**:
1. **Hover Provider**
   ```typescript
   // Migrate from v1.x hoverProvider.ts
   connection.onHover((params) => {
     const word = getWordAtPosition(document, params.position);
     
     // Check symbol table first
     const stream = symbolTable.findStream(word);
     if (stream) return createStreamHover(stream);
     
     // Fallback to static data
     if (UNIT_OPERATIONS[word]) return createUnitOpHover(word);
   });
   ```

2. **Completion Provider**
   ```typescript
   connection.onCompletion((params) => {
     const context = getCompletionContext(document, params.position);
     
     if (context === 'FEED=') {
       return symbolTable.getAllStreams().map(s => ({
         label: s.name,
         kind: CompletionItemKind.Value,
         detail: s.description
       }));
     }
   });
   ```

**Testing**:
- [ ] Hover on unit operations
- [ ] Hover on stream names
- [ ] Hover on parameters
- [ ] Complete stream names after FEED=
- [ ] Complete parameters in unit operations

**Deliverables**:
- [ ] Full hover support
- [ ] Context-aware completion
- [ ] Migrate all v1.x hover data
- [ ] 100+ completion scenarios

---

### Phase 4: Navigation (Month 4)

**Goal**: Go-to-definition, find references, document symbols

**Tasks**:
1. **Go-to-Definition**
   ```typescript
   connection.onDefinition((params) => {
     const word = getWordAtPosition(document, params.position);
     const symbol = symbolTable.find(word);
     
     if (symbol) {
       return {
         uri: document.uri,
         range: symbol.definitionRange
       };
     }
   });
   ```

2. **Find References**
   ```typescript
   connection.onReferences((params) => {
     const word = getWordAtPosition(document, params.position);
     return symbolTable.findAllReferences(word);
   });
   ```

3. **Document Symbols**
   ```typescript
   connection.onDocumentSymbol((params) => {
     return [
       { name: 'Streams', kind: SymbolKind.Namespace, children: [...] },
       { name: 'Unit Operations', kind: SymbolKind.Namespace, children: [...] }
     ];
   });
   ```

**Testing**:
- [ ] Click stream → jump to NAME
- [ ] Find all uses of stream
- [ ] Document outline shows structure
- [ ] Breadcrumbs work

**Deliverables**:
- [ ] Go-to-definition for streams, UIDs, components
- [ ] Find all references
- [ ] Document symbol outline
- [ ] Workspace symbol search

---

### Phase 5: Validation (Month 5)

**Goal**: Comprehensive error detection

**Tasks**:
1. **Semantic Validation**
   - Undefined stream references
   - Missing required parameters
   - Duplicate UIDs
   - Component indices not in LIBID
   - Invalid parameter values

2. **Type Checking**
   - Temperature units and ranges
   - Pressure units and ranges
   - Flow rate consistency

3. **Code Actions (Quick Fixes)**
   - Create undefined stream
   - Add missing parameter
   - Fix parameter value

**Testing**:
- [ ] Detect undefined streams
- [ ] Detect missing parameters
- [ ] Detect invalid values
- [ ] Quick fixes work

**Deliverables**:
- [ ] 20+ validation rules
- [ ] Quick fix actions
- [ ] Performance: < 100ms validation

---

### Phase 6: Polish & Release (Month 6)

**Goal**: Production-ready v2.0.0

**Tasks**:
1. **Performance Optimization**
   - Incremental parsing
   - Caching
   - Debouncing
   - Worker threads for large files

2. **Testing**
   - 1000+ unit tests
   - Integration tests
   - Real-world file testing
   - Performance benchmarks

3. **Documentation**
   - Migration guide from v1.x
   - Architecture documentation
   - API documentation
   - User guide

4. **Release**
   - Alpha releases (v2.0.0-alpha.1, etc.)
   - Beta releases (v2.0.0-beta.1)
   - Release candidate (v2.0.0-rc.1)
   - Final v2.0.0

**Deliverables**:
- [ ] Full test coverage
- [ ] Performance benchmarks
- [ ] Complete documentation
- [ ] Migration guide
- [ ] v2.0.0 release

---

## Success Metrics

### Performance Targets
- **Parsing**: < 100ms for 5000-line file
- **Diagnostics**: < 200ms full validation
- **Completion**: < 50ms response
- **Memory**: < 100MB for typical workspace

### Feature Coverage
- [ ] 100% of v1.x features migrated
- [ ] 10+ new LSP-exclusive features
- [ ] 95%+ test coverage
- [ ] Zero regression bugs

### User Adoption
- **Month 1**: Alpha testers (5-10 users)
- **Month 3**: Beta release (50+ users)
- **Month 6**: Production (500+ downloads)
- **Year 1**: Majority migration from v1.x

---

## Risk Mitigation

### Technical Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| Parser complexity | High | Start simple, iterate |
| Performance issues | High | Benchmark early, optimize continuously |
| LSP bugs | Medium | Extensive testing, gradual rollout |
| Breaking changes | Medium | Clear migration guide, maintain v1.x |

### Timeline Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| Scope creep | High | Stick to MVP for v2.0.0 |
| Solo developer | High | Use existing LSP libraries, no NIH |
| Burnout | Medium | Set sustainable pace, 10-15 hrs/week |

---

## Decision: Which Option?

### Recommendation: **Option A - New Repository** ⭐

**Why?**
1. Clean separation of architectures
2. v1.x remains untouched and stable
3. Easier to manage issues and PRs
4. Independent CI/CD
5. Can archive v1.x when v2.x is stable

**Action**: Create `proii-language-server` repo next week

---

## Next Steps

### This Week (Icon Fix)
1. ✅ Generate new copyright-free icon
2. ✅ Release v1.4.9 with icon fix
3. ✅ Create fork/branch plan (this document)

### Next Week (LSP Setup)
1. Create new `proii-language-server` repository
2. Initialize NPM workspace structure
3. Install LSP dependencies
4. Write architecture documentation
5. Set up CI/CD

### Month 1 (Lexer & Parser)
1. Implement lexer
2. Implement parser
3. Define AST types
4. Write 50+ tests
5. Document grammar

---

## Questions to Resolve

- [ ] Publish v2.x as separate extension or upgrade path?
- [ ] Name: "PRO/II LSP" or "PRO/II Language Server"?
- [ ] Pricing: Free like v1.x?
- [ ] Support: GitHub issues only or email?
- [ ] Testing: Need beta testers?

---

**Status**: ✅ **PLAN APPROVED - READY TO PROCEED**

**Next Action**: Generate and deploy new icon (v1.4.9), then create LSP repository
