# Egenkapital Tracker

## Project description
I need a better way to track how much money I have for a down payment on a property. I've been using a Google Sheet; however, I want to move this into a small web application to track stats over time without having to use a full budgeting tool.

## Technical Stack
### Frontend
- NextJS w/TypeScript
- Tailwind CSS
- 

### Backend
- NextJS API Routes
- PostgreSQL
- Prisma ORM

### Deployment
- [ ] PM2 on VPS

## Functionality
### Core
- [ ] Accounts with types (stock savings account, savings account, etc.)
- [ ] Records/history per account
- [ ] Debt overview
- [ ] Income management
- [ ] Loan simulator
- [ ] Dashboard with overview

### Loan calculation (Norway)
- [ ] 5x annual income rule
- [ ] Dependent deduction
- [ ] Downpayment minimum (10% )
- [ ] Existing debt.

## Implementation plan
### Fase 1: Basic
- [x] NextJS project setup
- [x] Database setup (PostgreSQL + Prisma)
- [x] Foundemantal API structure

### Fase 2: Database & API
- [x] Database schema design
- [x] API endpoints for accounts
- [x] API endpoints for records
- [x] API endpoints for debt/Income

### Fase 3: Basic Frontend UI
- [ ] Figma sketches
- [ ] Tailwind CSS classes/configuration
- [ ] Basic component structure
- [ ] Basic form component

### Fase 4: Onboarding
- [ ] First time setup flow
- [ ] Create accounts
- [ ] Set starting values

### Fase 5: Dashboard
- [ ] Overview of equity capital
- [ ] Debt and inncome overview
- [ ] Basic stats

### Fase 6: Loan simulator
- [ ] Calculation logic
- [ ] Home purchase simulator
- [ ] Result display

### Phase 7: History and Statistics
- [ ] Trend View
- [ ] Period Comparison
- [ ] Graphs and Visualization

## Database Design
### Tables
- [x] `accounts` - Accounts
- [x] `account_records` - Historical values
- [x] `debt` - Debt items
- [x] `income` - Income
- [ ] `users` - Future use

## API Endpoints
### Accounts
- [x] `GET /api/accounts` - Get all accounts
- [x] `POST /api/accounts` - Create account
- [x] `GET /api/accounts/[id]` - Get specific account
- [x] `PATCH /api/accounts/[id]` - Update account
- [x] `DELETE /api/accounts/[id]` - Delete account

### Records
- [x] `GET /api/records` - Get all records
- [x] `POST /api/records` - Create record
- [x] `GET /api/records/account/[accountId]` - Records for account
- [x] `PATCH /api/records/[id]` - Update record
- [x] `DELETE /api/records/[id]` - Delete record

### Debt
- [x] `GET /api/debt` - Get all debt
- [x] `POST /api/debt` - Create debt
- [x] `GET /api/debt/[id]` - Get specific debt
- [x] `PATCH /api/debt/[id]` - Update debt
- [x] `DELETE /api/debt/[id]` - Delete debt

### Income
- [x] `GET /api/income` - Get all income
- [x] `POST /api/income` - Create income
- [x] `GET /api/income/[id]` - Get specific income
- [x] `PATCH /api/income/[id]` - Update income
- [x] `DELETE /api/income/[id]` - Delete income

### Calculations
- [ ] `POST /api/calculate/loan-capacity` - Loan capacity
- [ ] `GET /api/calculate/net-worth` - Total equity

## Setup/Installation
### Prerequisites
- Node.js
- Yarn
- PostgreSQL (DBngin)

### Local Setup
```bash
# Install dependencies
yarn install
# Setup database
npx prisma migrate dev
# Start development server
yarn dev
```

## Deployment
### VPS Setup
- [ ] PM2 configuration
- [ ] PostgreSQL production
- [ ] Environment variables
- [ ] SSL certificate

## Future Potential Features
- [ ] Multiple users/households
- [ ] Import from bank (CSV)
- [ ] Budget functionality
- [ ] Goals and progress
- [ ] Notifications