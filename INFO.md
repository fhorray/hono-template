# TypeScript Configuration for Hono + React-Compat

This document explains a common TypeScript issue encountered in this project (Hono with `react-compat`) and the recommended patterns to resolve it.

## The Problem

When using `@hono/react-renderer` with the `react-compat` layer, you might encounter two specific TypeScript errors:

1.  **`Cannot find namespace 'React'`**: Even if JSX is working, TypeScript might not recognize the global `React` namespace for types like `React.ReactNode` or `React.ComponentProps`.
2.  **`Namespace '...' has no exported member 'ComponentProps'`**: Some React-specific type utilities might be missing from the `@hono/react-compat` shim, or the type resolution might be pointing to the wrong place.

## The Root Causes

- **Explicit Imports**: In a `react-jsx` environment, the compiler transforms JSX automatically, but it doesn't automatically provide the `React` namespace for manual type annotations.
- **Type Parity**: The Hono compatibility layer is a lightweight shim. It provides runtime compatibility but doesn't always mirror 100% of the complex React type utility namespace.

## The Solutions

### 1. Explicitly Import the React Namespace

Whenever you use `React.Something` in your code, you **must** import the namespace at the top of the file:

```tsx
import * as React from 'react';
```

### 2. Prefer Hono Native JSX Types

Instead of relying on React-specific utilities like `ComponentProps`, use Hono's native JSX types. They are more reliable in this environment and ensure that your components are correctly typed for the Hono renderer.

**Instead of this:**

```tsx
function MyComponent(props: React.ComponentProps<'div'>) { ... }
```

**Do this:**

```tsx
import type { JSX } from 'hono/jsx';

function MyComponent(props: JSX.IntrinsicElements['div']) { ... }
```

### 3. Proper `@types/react` Configuration

Ensure that your `package.json` uses the official `@types/react` for development, even if the runtime `react` package is aliased to `@hono/react-compat`.

**In `package.json`:**

```json
"devDependencies": {
  "@types/react": "^19.0.0",
  "@types/react-dom": "^19.0.0"
}
```

## Summary Checklist for New Components

- [ ] Add `import * as React from 'react'` if using hooks or namespaces.
- [ ] Use `import type { JSX } from 'hono/jsx'` for HTML element props.
- [ ] Use `JSX.IntrinsicElements['tagname']` for component props.
- [ ] Ensure `tsconfig.json` has `"jsxImportSource": "react"`.
