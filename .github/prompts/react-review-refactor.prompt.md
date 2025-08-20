---
mode: 'agent'
description: 'Review React/JavaScript code for architecture, patterns, and refactoring opportunities. Provide actionable recommendations without modifying code.'
---
# React/JavaScript Architecture & Refactor Review

Review the React/JavaScript code in ${selection} for architecture, design patterns, and refactoring opportunities. Do not make any changes to the code; provide a review with specific, actionable recommendations.

## Required Focus Areas

-  Component Architecture
  - Functional components with hooks
  - Container/Presentational separation where appropriate
  - Co-location of concerns (styles, tests, stories)
-  State Management
  - Local vs global state boundaries
  - React Context usage vs dedicated state libraries
  - Derived state and memoization
-  Side Effects and Data Fetching
  - useEffect correctness (dependencies, cleanup)
  - Data fetching patterns (SWR/React Query/RTK Query or custom hooks)
  - Error/loading states handling
-  Performance
  - Re-render control (React.memo, useMemo, useCallback)
  - Virtualization for large lists
  - Code-splitting and lazy loading
-  Forms
  - Controlled vs uncontrolled
  - Form libraries (e.g., React Hook Form) and validation schemas (Yup/Zod)
-  Routing
  - Route-level code splitting, protected routes
  - URL state vs app state
-  Styling
  - Consistency (CSS Modules, Tailwind, Styled Components, etc.)
  - Avoiding style recalculation pitfalls
-  API/Services Layer
  - Separation of API clients, DTOs, adapters
  - Error normalization and retry policies
-  Type Safety
  - TypeScript adoption or JSDoc for types
  - Accurate types for props, API responses, and hooks
-  Testing
  - React Testing Library patterns (user-centric)
  - Unit tests for hooks and utilities
  - Integration tests for critical flows
-  Accessibility (a11y)
  - Semantic HTML, ARIA where needed
  - Keyboard navigation and focus management
-  Internationalization (i18n)
  - Message extraction, formatting, and locale handling

## Review Checklist

-  Design & Patterns
  - Are components small, focused, and reusable (KISS)?
  - Is logic shared via custom hooks, HOCs, or render props where suitable (DRY)?
  - Is inversion of control used for side effects and services (Dependency Inversion from SOLID)?
  - Are Strategy/Adapter patterns used to abstract APIs or storage?
-  Architecture
  - Clear folder structure (features-first or layer-first), index boundaries
  - Smart vs dumb components, hook-based data access separation from UI
  - Stable public interfaces for components and hooks
-  React Best Practices
  - Correct hook rules, dependency arrays, cleanup functions
  - Avoiding anti-patterns (derived state duplication, stale closures, inline object/array props)
  - Keys in lists, controlled inputs, portal usage
-  SOLID Principles
  - SRP: Each component/hook does one thing
  - OCP: Extend behavior via composition, not modification
  - LSP: Substitutable components via prop contracts
  - ISP: Small, focused props and interfaces
  - DIP: Depend on abstractions (services) not concrete implementations in components
-  Performance
  - Correct memoization strategy, stable callbacks
  - Suspense/lazy where appropriate
  - Avoid expensive calculations in render; use workers if needed
-  Maintainability
  - Consistent naming, cohesive modules, clear boundaries
  - Centralized constants, config, and env handling
  - Reusable UI primitives and utilities
-  Testability
  - Side effects isolated, easily mockable services
  - Deterministic hooks with injected dependencies
  - Tests follow AAA with clear arrange/setup helpers
-  Security
  - XSS avoidance (no dangerousSetInnerHTML unless sanitized)
  - Safe storage for tokens (httpOnly cookies preferred)
  - Input validation and output encoding
-  Documentation
  - Component/hook README or concise JSDoc
  - Prop documentation and examples (Storybook)
  - ADRs for key architectural choices
-  Code Clarity & Clean Code
  - Meaningful names reflecting domain
  - Minimal nesting, early returns
  - Dead code, duplication, and commented-out blocks removed

## Improvement Focus Areas

-  Components
  - Extract complex UI into smaller presentational components
  - Move business logic into custom hooks
  - Normalize props: avoid “prop drilling” via Context or composition patterns
-  State & Effects
  - Consolidate related state; avoid duplicating derived values
  - Replace imperative effects with declarative data hooks
  - Ensure effect dependencies are minimal and correct
-  Data Layer
  - Introduce a service/adapter layer for API calls
  - Add caching/invalidations with React Query/SWR where beneficial
  - Centralize error handling and toasts
-  Performance
  - Memoize expensive computations and unstable props
  - Split routes and heavy components with React.lazy/Suspense
  - Virtualize long lists
-  Forms & Validation
  - Adopt React Hook Form with schema validation (Yup/Zod)
  - Extract reusable form controls with consistent UX
-  Styling
  - Standardize on one styling approach; extract design tokens
  - Remove inline object styles that change per render
-  Type Safety
  - Add TypeScript or JSDoc typedefs; generate API types from OpenAPI
  - Narrow types in hooks and component props
-  Testing
  - Increase coverage for hooks and critical UI flows
  - Mock services via adapters; avoid mocking internals
-  Accessibility & i18n
  - Ensure labels, roles, and keyboard handlers
  - Externalize strings and support locale formatting

## What to Deliver

-  Identify patterns used (custom hooks, Context, HOCs, Adapter/Strategy)
-  Highlight violations of SOLID, DRY, and KISS with examples from ${selection}
-  Provide prioritized, step-by-step refactor recommendations
-  Suggest lightweight code snippets or pseudocode for key refactors (no full rewrites)
-  Recommend tools/libraries where fitting (React Query, React Hook Form, Zod, Zustand/Redux Toolkit, Storybook, ESLint, Prettier)
-  Include quick wins vs longer-term improvements with estimated impact

Provide concrete, actionable guidance aligned with idiomatic React and modern JavaScript best practices.

