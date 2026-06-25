# Reimbursements Management System

A backend-only reimbursements management system built with Node.js, Express.js, PostgreSQL, JWT, and cookie-based authentication.

## Features
- User registration and login
- Cookie-based JWT authentication
- Role-based authorization for CFO, RM, APE, and EMP
- Employee-manager assignment
- Reimbursement creation and approval workflow

## Prerequisites
- Node.js 18+
- PostgreSQL running locally or remotely

## Setup
1. Copy [.env.example](.env.example) to .env and update the database credentials.
2. Create a PostgreSQL database matching the DB_NAME value.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run migrations:
   ```bash
   npm run migrate
   ```
5. Seed the CFO account:
   ```bash
   node -e "require('./src/seeders/seedCfo')" 
   ```
6. Start the server:
   ```bash
   npm start
   ```

## API Base
- Public routes: /rest/onboardings
- Protected routes: /rest/roles, /rest/employees, /rest/reimbursements

## Notes
- New registrations default to the EMP role.
- Only email addresses ending with @org.com are allowed.
- CFO is seeded and should not be registered through the public API.
