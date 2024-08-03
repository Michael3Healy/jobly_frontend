# Express Jobly

**Express Jobly** is a comprehensive job searching application built with a backend using Node, Express, and PostgreSQL, and a frontend using React. This application allows users to search for job postings and companies, as well as apply for jobs, using an intuitive interface.

## Backend Features

### Authentication & Authorization
- Utilizes JWT tokens for secure access to API endpoints.
- Implements role-based permissions to control access levels.

### Companies & Jobs
- Supports CRUD operations for managing companies and job postings.
- Provides advanced filtering and search functionalities for both companies and jobs.

### Job Applications
- Allows users to apply for jobs and tracks their application history.

### Testing
- Includes comprehensive unit and integration tests to ensure robust functionality and maintainable codebase.

### Documentation
- Extensively documented codebase with clear explanations of functions and routes.

## Frontend Features

### User Interface
- Built with React to provide a dynamic and responsive user experience within a single page application.
- Utilizes React Router for seamless navigation between pages.

### Authentication
- Implements login, signup, and logout functionalities.
- Manages user sessions and displays user-specific information.

### Job Search & Filtering
- Features a search bar for querying companies by name.
- Displays company cards with details like company name, description, and number of employees.

### Responsive Design
- Uses CSS Grid and modern CSS techniques to ensure the application is accessible and visually appealing across different devices.

### State Management
- Manages application state effectively with React's `useState` and `useEffect` hooks.
- Uses local storage for persisting user sessions and search state.

## Setup

### Backend Setup
1. Clone the repository: `git clone <repository-url>`
2. Navigate to the backend directory: `cd backend`
3. Install dependencies: `npm install`
4. Set up environment variables as required (e.g., database configuration, JWT secret).
5. Start the server: `npm start`

### Frontend Setup
1. Clone the repository: `git clone <repository-url>`
2. Navigate to the frontend directory: `cd frontend`
3. Install dependencies: `npm install`
4. Set up environment variables if needed.
5. Start the development server: `npm start`

## Testing

### Backend Tests
- Run tests using: `npm test`

### Frontend Tests
- Run tests using: `npm test` (from the frontend directory)

## Technologies Used

### Backend

- Node
- Express
- PostgreSQL
- JWT

### Frontend

- React
- React Router
- Axios
- Boostrap
- Jest
- React Testing Library