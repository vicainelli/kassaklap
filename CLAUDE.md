# Project: Groceries price comparison


## Project Description
A brief description of what your project does and its main features.

## Tech Stack
- Frontend: React, TypeScript
- Backend: Bun
- Testing: Bun, Vitest, React Testing Library

## Code Conventions
- We use Biome for formatting
- Biome for linting
- Functional components with hooks for React
- 2-space indentation
- camelCase for variables and functions
- PascalCase for components and classes

## Project Structure
- /src - Main source code
  - /components - React components using Chadcn and Tailwindcss
  - /lib - utility classes/methods
- /styles - CSS/SCSS files

- User authentication uses JWT stored in HttpOnly cookies
- New components should have a companion test file
- State management uses React Query in a context pattern

## Known Issues
No issues yet

## Future Plans
No plans yet

## Instructions for Claude
- Always suggest TypeScript types for new functions
- Prioritize performance optimizations
- Use React Query for data fetching
- Follow the existing error handling pattern
- Include JSDoc comments for public functions
- Prefer functional programming approaches

## Environment Setup
- Node.js v22+
- bun scripts:
  - `bun run dev` - Start development server
  - `bun run start` - Run production
  - `bun run build` - Build for production
