# Uber Clone

Lightweight Uber-like ride-hailing application (learning/demo project) with a Node/Express + PostgreSQL backend and a React + Vite frontend.

## Contents

- `backend/` — Express API, PostgreSQL connection, controllers and routes
- `frontend/` — React (Vite) single-page app

## Quick start

Prerequisites:

- Node.js (16+ recommended)
- PostgreSQL database

1. Clone the repo and open the project root.

2. Backend setup

- Change to the `backend` folder and install dependencies:

  ```powershell
  cd backend
  npm install
  ```

- Create a `.env` file in the `backend` folder or update the provided example. Required environment variables used by the server:

  - `DB_USER` — Postgres username
  - `DB_PASS` — Postgres password (optional for local with empty password)
  - `HOST` — Postgres host (defaults to `localhost`)
  - `DB` — Postgres database name
  - `DB_PORT` — Postgres port (defaults to `5432`)
  - `JWT_SECRET` — Secret used to sign JWT tokens
  - `PORT` — Port for the Express server (defaults to `5000`)

  Example `.env` (do not commit secrets):

  ```properties
  PORT=5000
  DB_PORT=5432
  HOST=localhost
  DB=uberclone
  DB_PASS=your_password
  DB_USER=postgres
  JWT_SECRET=your_jwt_secret_here
  ```

- Start the backend in development mode (uses `nodemon`) or production mode:

  ```powershell
  npm run dev   # automatic restart during development
  npm start     # production: node server.js
  ```

The backend server listens by default on `http://localhost:5000` and exposes routes under `/api`.

3. Frontend setup

- Change to the `frontend` folder and install dependencies:

  ```powershell
  cd ..\frontend
  npm install
  ```

- Start the Vite dev server:

  ```powershell
  npm run dev
  ```

The frontend dev server runs on `http://localhost:5173` by default and proxies API calls to `http://localhost:5000/api` (the frontend `src/services/api.js` expects the backend at `http://localhost:5000/api`).

## Available scripts

- backend/package.json
  - `dev` — nodemon server.js
  - `start` — node server.js

- frontend/package.json
  - `dev` — vite
  - `build` — vite build
  - `preview` — vite preview
  - `lint` — eslint

## Environment variables

The backend expects the variables listed above. The project includes a `.env` file in `backend/` used for local development — replace the values with your own before running in any environment.

## API (high level)

The app organizes API routes under `/api` with these main groups:

- /api/users — user registration, login, logout
- /api/drivers — driver signup, login, rides (accept/reject)
- /api/rides — rider creates rides, get rides, accept/reject by drivers
- /api/admin — admin login and admin-only listing endpoints

Notable endpoints (examples)

- GET /api/health — simple health check
- POST /api/users/register — register a new rider
- POST /api/users/login — login as a rider (returns JWT)
- POST /api/drivers/signup — register a driver
- POST /api/drivers/login — login as a driver (returns JWT)
- POST /api/rides — create a new ride (authenticated user)
- GET /api/rides — list rides (role-aware)

Authorization

- The API uses JWT authentication. Include the JWT in an `Authorization: Bearer <token>` header. The frontend stores tokens in `localStorage` and automatically attaches them to requests (see `frontend/src/services/api.js`).

## Project structure

- backend/
  - `server.js` — app entry, route wiring, health endpoints
  - `db.js` — PostgreSQL pool configuration
  - `routes/` — route files for users, drivers, rides, admin
  - `controllers/` — controller logic for each resource
  - `models/` — database model helpers
  - `middleware/` — `authMiddleware.js` (JWT auth & role checking)

- frontend/
  - `src/` — React source code
    - `services/api.js` — axios instance configured for the backend
    - `components/` and `pages/` — UI

## Notes & next steps

- This is a demo learning project. Before deploying:
  - Do not commit real secrets. Use a secure secret store.
  - Add input validation and rate limiting.
  - Harden CORS configuration for production origins.

If you'd like, I can:

- Add a short CONTRIBUTING.md with local DB setup and example SQL to create tables.
- Add a `docker-compose.yml` to bring up Postgres and the app for local development.

## License

This project is provided as-is for learning purposes.
