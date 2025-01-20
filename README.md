# Todo App

A full-stack web application using React, Redux, MUI for the frontend and Node.js, Express.js, MongoDB with mongoose for the backend.

Allow users to register account and create their own todo tasks

Author: Derek Li

## Project Structure

### Frontend

- **Framework**: React
- **State Management**: 
  - global: Redux (with Redux Thunk for async actions)
  - local: useState
- **UI Library**: Material-UI (MUI)
- **Pages**:
  - **Login**: accessible only to unauthenticated users.
  - **Home**: accessible only to authenticated users.
- **Authentication**: Implemented using a Higher-Order Component (AuthHOC) and React Router.
- **Redux Store**:
  - **Slices**:
    - `tasks`: Manages the state of to-do tasks.
    - `userAuth`: Manages the state of user authentication status.
  - **Async Data Fetching**: Both slices use Redux Thunk to handle asynchronous actions.

### Backend

- **Framework**: Node.js and Express
- **Database**: MongoDB, accessed via Mongoose
- **Data Models**:
  - **User**: Represents user data
  - **Task**: Represents task data
- **Controllers**: Each data model has an associated controller to handle the logic.
- **Routers**: Each data model has a router to handle API endpoints.
- **Middlewares**: 
  - **Authentication**: JWT (JSON Web Token) with Cookie
  - **CORS**: whitelist frontend origin in corsOptions

## Instructions to Run the App

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-name>
```

### 2. Set Up MongoDB Cluster
- Obtain the connection string (MONGO_URI) for your cluster.
- Replace the MONGO_URI in .env file of backend
```bash
MONGO_URI=your-mongo-db-connection-string
```

### 3(Optional). Seed the Database
- populate the database with sample data
```bash
npm run seed
```

### 4. Start backend server
```bash
npm run start
```

### 5. Start frontend app
```bash
npm run start
```

> **Notes**: 
1. Ensure that both the frontend and backend servers are running simultaneously for the app to function correctly.
2. default ports is 3000 for backend and 3001 for frontend, can be changed in .env files

# todo_app
