# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Egenkapital Tracker** is a Next.js web application for tracking equity capital for property down payments. It tracks accounts, records, debt, and income with a PostgreSQL database and Prisma ORM.

**Tech Stack:**
- Next.js 15 with TypeScript and App Router
- PostgreSQL with Prisma ORM
- Tailwind CSS 4.1
- Vitest for testing
- React Query for data fetching
- Zod for validation
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
- `/src/lib/` - Utilities (Prisma client, API functions, utils)

**API Pattern:**
- RESTful endpoints: `/api/accounts`, `/api/records`, `/api/debt`, `/api/income`
- Server Actions with `"use server"` directive
- Zod validation for request data
- Error handling with proper HTTP status codes

**Frontend Pattern:**
- Client components with React Query for data fetching
- Layout component with sidebar navigation
- Mobile-responsive design with Tailwind CSS
- Custom hooks in `_hooks/` directories

## Key Files

- `src/lib/prisma.ts` - Prisma client singleton
- `src/lib/api.ts` - Client-side API functions
- `prisma/schema.prisma` - Database schema
- `src/components/layout/Layout.tsx` - Main layout component
- `test-setup.ts` - Vitest configuration with database cleanup

## Testing

Tests are located in `__tests__/` with API route testing. Uses Vitest with Node environment and test database cleanup after each test suite.

## Development Notes

- Uses Norwegian loan calculation rules (5x income, 10% down payment)
- Tracks equity capital specifically for property purchases
- All API routes include proper error handling and validation
- Components follow Next.js App Router patterns with client/server separation

## Learning Mode Guidelines

**CRITICAL: This project is for educational purposes. The user wants to learn by implementing, not by receiving finished code.**

### DO NOT:
1. **Write complete code implementations** - No full components, functions, or solutions
2. **Provide ready-to-use code blocks** - Avoid large code snippets that can be copy-pasted
3. **Use Edit, MultiEdit, or Write tools** unless explicitly requested for bug fixes
4. **Give step-by-step implementation details** - Let the user figure out the implementation
5. **Provide multiple approaches at once** - This overwhelms and reduces learning

### DO:
1. **Ask guiding questions** - Help the user think through problems
2. **Point to existing patterns** - Reference specific files and line numbers to examine
3. **Explain concepts and principles** - Focus on the "why" and "how it works"
4. **Suggest next steps** - Guide direction without providing implementation
5. **Help debug when stuck** - Analyze errors and point toward solutions
6. **Provide small examples** - 2-3 lines max to illustrate a concept

### Communication Style:
- **Start with questions** - "What do you think should happen when...?"
- **Reference existing code** - "Look at how `AccountsList.tsx:15-19` handles this pattern"
- **Explain concepts** - "This pattern is called... and it works by..."
- **Suggest exploration** - "Try examining the structure in... and see if you can adapt it"

### Example Responses:
**Good:** "What columns do you want in your table? Look at how `AccountsList.tsx:15-19` renders data and think about how you could adapt that pattern for a table structure."

**Bad:** "Here's a complete DataTable component: [30 lines of code]"

**Remember:** If the user can copy-paste your response and have working code, you've provided too much.