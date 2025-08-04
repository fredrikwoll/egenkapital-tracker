# DEVELOPMENT.md

This file provides development guidelines and architectural documentation for this repository.

## Project Overview

**Egenkapital Tracker** is a Next.js web application for tracking equity capital for property down payments. It tracks accounts, records, debt, and income with a PostgreSQL database and Prisma ORM.

**Tech Stack:**
- Next.js 15 with TypeScript and App Router
- PostgreSQL with Prisma ORM
- Tailwind CSS 4.1
- Vitest for testing
- React Query for data fetching
- React Hook Form with Zod validation
- Heroicons for UI icons

## Common Development Commands

```bash
# Development
yarn dev                    # Start development server
yarn build                  # Build for production
yarn start                  # Start production server

# Testing
yarn test                   # Run tests in watch mode
yarn test:run              # Run tests once

# Database
npx prisma migrate dev      # Run database migrations
npx prisma generate         # Generate Prisma client
yarn db:seed               # Seed database with test data
npx prisma studio          # Open Prisma Studio

# Linting
yarn lint                   # Run ESLint
```

## Database Schema

The application uses PostgreSQL with these core models:

- **Account**: Financial accounts (SAVINGS, STOCK_SAVINGS, CHECKING, INVESTMENT, OTHER)
- **AccountRecord**: Transaction history with type (DEPOSIT, WITHDRAWAL, INTEREST, TRANSFER)
- **Debt**: Debt items (STUDENT_LOAN, CONSUMER_LOAN, MORTGAGE, CREDIT_CARD)
- **Income**: Income sources

All monetary values use `Decimal` type with precision 12,2. All models use `cuid()` for IDs.

## Architecture

**App Router Structure:**
- `/src/app/` - Next.js app router pages and API routes
- `/src/app/api/` - API routes for CRUD operations
- `/src/components/` - Reusable React components
- `/src/schemas/` - Shared Zod validation schemas
- `/src/lib/` - Utilities (Prisma client, API functions, utils)

**API Pattern:**
- RESTful endpoints: `/api/accounts`, `/api/records`, `/api/debt`, `/api/income`
- Server Actions with `"use server"` directive
- Zod validation for request data
- Error handling with proper HTTP status codes

**Frontend Pattern:**
- Client components with React Query for data fetching
- React Hook Form for type-safe form handling
- Layout component with sidebar navigation
- Mobile-responsive design with Tailwind CSS
- Custom hooks in `_hooks/` directories
- Extracted form components (CreateAccountForm, EditAccountForm)
- Reusable UI components (TableRow, PageHeader, etc.)

## Key Files

- `src/lib/prisma.ts` - Prisma client singleton
- `src/lib/api.ts` - Client-side API functions
- `src/schemas/account.ts` - Account validation schemas
- `prisma/schema.prisma` - Database schema
- `src/components/layout/Layout.tsx` - Main layout component
- `src/components/forms/Input.tsx` - React Hook Form compatible input
- `src/components/forms/Select.tsx` - React Hook Form compatible select
- `test-setup.ts` - Vitest configuration with database cleanup

## Testing

Tests are located in `__tests__/` with API route testing. Uses Vitest with Node environment and test database cleanup after each test suite.

## Development Notes

- Uses Norwegian loan calculation rules (5x income, 10% down payment)
- Tracks equity capital specifically for property purchases
- All API routes include proper error handling and validation
- Components follow Next.js App Router patterns with client/server separation
- Form validation handled by shared Zod schemas between frontend and backend
- Input/Select components support both React Hook Form and manual usage via forwardRef

## Form Handling Pattern

The application uses React Hook Form with Zod validation:

- **Shared schemas** in `src/schemas/` used by both frontend and backend
- **Separate forms** for create/edit operations with different validation rules
- **Custom hooks** (like `useAccountForms`) to encapsulate form logic
- **Extracted form components** for better reusability and separation of concerns

## Development Philosophy

This project emphasizes deliberate learning and deep understanding of architectural patterns over rapid implementation. The development approach prioritizes building comprehensive knowledge of each system component.

### Preferred Development Methodology:

**Discovery-Based Development:**
- **Guided exploration** of existing patterns before implementing new features
- **Architectural understanding** through analysis of established code structures  
- **Iterative learning** via targeted questions and concept explanation
- **Pattern recognition** by examining similar implementations across the codebase

**Implementation Approach:**
- **Concept-first development** - Understanding the "why" before the "how"
- **Reference-driven solutions** - Leveraging existing patterns and structures
- **Incremental building** - Small, understood steps rather than large code blocks
- **Debug-through-understanding** - Analyzing issues to build deeper system knowledge

**Code Quality Standards:**
- **Intentional architecture** - Every pattern should be understood and purposeful
- **Consistent implementation** - Following established patterns throughout the codebase
- **Educational value** - Code should serve as learning material for future development
- **Maintainable solutions** - Emphasizing readability and pattern consistency

### Communication Preferences:
- **Socratic method** - Questions that lead to understanding rather than direct answers
- **Codebase references** - Pointing to existing implementations for pattern learning
- **Concept explanation** - Focus on principles and architectural reasoning
- **Guided discovery** - Suggesting exploration paths rather than providing solutions

> This methodology ensures deep architectural understanding, promotes consistent code patterns, and builds comprehensive system knowledge for long-term maintainability and scalability.