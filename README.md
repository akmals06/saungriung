# Nyobs Project

A fullstack software engineering project with a clean and scalable architecture.

## Tech Stack

- **Backend:** Node.js, Express, REST API
- **Frontend:** React, Vite

## Project Structure

### Backend (`/backend`)
Follows a modular architecture:
- `src/config/`: Configuration files (environment variables, database connection).
- `src/controllers/`: Logic for handling requests.
- `src/models/`: Data models (database schema).
- `src/routes/`: API route definitions.
- `src/middleware/`: Custom middleware (error handling, auth).
- `src/utils/`: Helper functions.
- `src/app.js`: Express application setup.
- `server.js`: Server entry point.

### Frontend (`/frontend`)
Follows a component-based architecture:
- `src/components/`: Reusable UI components (TaskCard, TaskList).
- `src/pages/`: Page views (HomePage).
- `src/services/`: API communication logic.
- `src/styles/`: Global and component-specific styles.
- `src/context/`: Context API for global state (prepared).

## Getting Started

1.  **Backend:**
    ```bash
    cd backend
    npm install
    npm start
    ```

2.  **Frontend:**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```