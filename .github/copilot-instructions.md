# Vitest Learning Project - AI Coding Instructions

## Project Overview

This is a **Danish educational project** focused on teaching Vitest unit testing. Students work through structured exercises (Øvelser 1-6) that progressively build testing skills. The codebase pairs implementation functions in `my-functions.js` with comprehensive tests in `my-functions.test.js`.

## Architecture & Structure

- **React 19 + Vite 7**: Modern React setup for learning environment, though testing focus is on vanilla JS functions
- **Vitest 4**: Primary testing framework with coverage support via `@vitest/coverage-v8`
- **Dual-purpose codebase**:
  - `src/my-functions.js` - Exercise implementations (simple functions demonstrating test concepts)
  - `src/my-functions.test.js` - Student test implementations following Danish exercise instructions
  - `src/App.jsx` + `src/my-functions-fetch.jsx` - React UI for demo purposes (intentionally not tested)

## Testing Workflow

Tests follow the **6-exercise Danish curriculum** in `README.md`:

1. **Input type handling** - null, numbers, strings with edge cases
2. **Test organization** - `describe`, `beforeEach`, `afterEach` structure
3. **Async testing** - Promises with success/failure scenarios
4. **Error testing** - `toThrow` and exception handling
5. **Mocking** - Fake timers with `vi.useFakeTimers()` for time-dependent code
6. **Coverage** - Use `npm run coverage` to identify untested branches ([Coverage Guide](https://vitest.dev/guide/coverage.html))

### Critical Commands

```bash
npm test              # Watch mode for TDD workflow
npm run coverage      # Generate HTML coverage report in coverage/
npm run dev           # Start Vite dev server (port 5173)
npm run lint          # ESLint with React hooks rules
```

## Project-Specific Conventions

### Test Structure Pattern

Tests mirror the **numbered exercise structure** from README. Each `describe` block corresponds to an exercise:

```javascript
//Øvelse N: [Danish exercise title]
describe('functionName', () => {
  // Nested describes for input scenarios
  describe('When input is X', () => { ... });
});
```

### Async Testing Approach

- **Always use `async/await`** syntax (not `.then()` chains)
- Use `vi.advanceTimersByTime()` for time-dependent promises
- Pattern: `beforeEach(() => vi.useFakeTimers())` + `afterEach(() => vi.useRealTimers())`

### ESLint Custom Rule

Unused variables starting with uppercase or underscore are **allowed** (see `eslint.config.js`):

```javascript
rules: {
  'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }]
}
```

## Testing Anti-Patterns to Avoid

- Don't test implementation details - focus on input/output behavior
- Avoid duplicating test logic across exercises - each builds on previous concepts
- Don't mock what you don't own (e.g., don't mock React or browser APIs without good reason)
- React components (`App.jsx`, `my-functions-fetch.jsx`) are **intentionally untested** - focus only on `my-functions.js`

## Key Files Reference

- `README.md` - **Exercise definitions** (Danish) with Vitest documentation links
- `src/my-functions.test.js` - All test implementations with Danish exercise comments
- `package.json` - Scripts and exact dependency versions for reproducibility
- `vite.config.js` - Minimal Vite setup with React plugin only
