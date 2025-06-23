# ToDo Application

A full-stack ToDo application built with Node.js, TypeScript, and a clean modular architecture.

## Features

- Create, edit, and delete task lists
- Add, edit, and delete tasks within task lists
- Mark tasks as completed
- Filter task lists by status (All, Completed, Pending)
- Responsive design for mobile and desktop views
- Clean, modern UI with subtle animations

## Tech Stack

### Backend
- Node.js with TypeScript
- Express.js for RESTful API
- JSON file storage for data persistence

### Frontend
- HTML5, CSS3, and vanilla JavaScript
- Responsive design with Flexbox/Grid
- Fetch API for backend communication

## Project Structure

```
todo-app/
├── client/                  # Frontend
│   ├── assets/              # Images, icons, etc.
│   ├── css/                 # Stylesheets
│   ├── js/                  # JavaScript files
│   └── index.html           # Main HTML file
│
├── server/                  # Backend
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Request handlers
│   │   ├── models/          # Data models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── utils/           # Helper functions
│   │   ├── data/            # JSON storage
│   │   ├── types/           # TypeScript type definitions
│   │   ├── app.ts           # Express app setup
│   │   └── server.ts        # Server entry point
│   ├── tsconfig.json        # TypeScript configuration
│   └── package.json         # Dependencies
│
└── README.md                # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
   ```
   git clone <repository-url>
   cd todo-app
   ```

2. Install backend dependencies
   ```
   cd server
   npm install
   ```

3. Start the backend server
   ```
   npm run dev
   ```

4. Open the frontend in a browser
   ```
   # In a new terminal window
   cd ../client
   # Open index.html in your browser
   ```

## API Endpoints

### Task Lists
- `GET /api/tasklists` - Get all task lists
- `GET /api/tasklists/:id` - Get a specific task list
- `POST /api/tasklists` - Create a new task list
- `PUT /api/tasklists/:id` - Update a task list
- `DELETE /api/tasklists/:id` - Delete a task list
- `GET /api/tasklists/filter/:status` - Filter task lists by status (all/completed/pending)

### Tasks
- `POST /api/tasklists/:id/tasks` - Add a task to a task list
- `PUT /api/tasklists/:listId/tasks/:taskId` - Update a task
- `DELETE /api/tasklists/:listId/tasks/:taskId` - Delete a task
- `PATCH /api/tasklists/:listId/tasks/:taskId/toggle` - Toggle task completion status

## Architecture

This application follows clean architecture principles with a modular design:

- **UI Layer**: Handles user interactions and display
- **Logic Layer**: Contains business logic and services
- **Data Layer**: Manages data persistence and retrieval

The codebase adheres to SOLID principles:
- **S**ingle Responsibility Principle
- **O**pen/Closed Principle
- **L**iskov Substitution Principle
- **I**nterface Segregation Principle
- **D**ependency Inversion Principle

## License

This project is licensed under the ISC License.
