# User Management Web Application

This is a simple User Management Web Application built with Node.js, Express, and an in-memory database (or JSON file for testing).

## Project Overview

This application provides basic CRUD (Create, Read, Update, Delete) operations for managing user data. It includes both server-side logic (Node.js with Express) and client-side interface (HTML, CSS, and JavaScript).

## Features

- List all users
- Add a new user
- Update existing user information
- Delete a user
- Toggle between active and inactive user status

## Project Structure

- `server.js`: Main server file containing the Express application and API routes
- `public/`: Directory containing static files
  - `index.html`: Main HTML file for the client-side interface
  - `styles.css`: CSS file for styling the interface
  - `app.js`: Client-side JavaScript for interacting with the API
- `test-users.json`: JSON file containing sample user data for testing

## Prerequisites

- Node.js (v12 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/LeanGains/SampleNodeProject.git
   cd SampleNodeProject
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Running the Application

### Development Mode (using JSON file)

To run the application in development mode, which uses the `test-users.json` file:

```
NODE_ENV=development node server.js
```

### Production Mode (using in-memory database)

To run the application in production mode, which uses an in-memory database:

```
NODE_ENV=production node server.js
```

The application will start and be available at `http://localhost:3000`.

## API Endpoints

- GET `/api/users`: Retrieve all users
- POST `/api/users`: Create a new user
- PUT `/api/users/:id`: Update a user
- DELETE `/api/users/:id`: Delete a user
- PATCH `/api/users/:id/toggle`: Toggle user's active status

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.