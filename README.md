# IT Major Recommendation System – Redesigned Demo

This package contains a redesigned demo version of the IT Major Recommendation System with:

- Role-based dashboards after login
- Sidebar-first SaaS-style navigation
- Student flow: Dashboard → Assessment → Result → History
- Advisor flow: Dashboard → Students → Detail / Notes
- Department Admin flow: Dashboard → Majors → Subjects → Learning Paths → Weights
- System Admin flow: Dashboard → Users

## Demo Accounts
Default password for seeded demo accounts: `123456`

- Student: `student@example.com`
- Advisor: `advisor@example.com`
- Department Admin: `deptadmin@example.com`
- System Admin: `sysadmin@example.com`

## Backend Setup
1. Create a MySQL database by running:
   - `backend/sql/schema.sql`
   - `backend/sql/seed.sql`
2. Copy `backend/.env.example` to `backend/.env`
3. Update DB credentials in `.env`
4. Install dependencies:
   - `cd backend`
   - `npm install`
5. Start server:
   - `npm run dev`

Backend base URL: `http://localhost:5000/api`

## Frontend Setup
1. Install dependencies:
   - `cd frontend`
   - `npm install`
2. Start dev server:
   - `npm run dev`
3. Open the Vite URL shown in terminal

## Notes
- Frontend scripts are adjusted to run Vite via Node directly.
- The recommendation engine is preserved and reused.
- Assessment draft is saved locally in browser localStorage.
