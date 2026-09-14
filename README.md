# Full-Stack To-Do App (React + Express API)

A full-stack task management application featuring a React Context API frontend and an Express.js REST API backend.

## Features

* **Frontend:** Built with React.js (Vite), Context API, and Tailwind CSS v4.
* **Backend:** Express.js RESTful API providing full CRUD functionality.
* **API Integration:** Asynchronous `fetch` calls connecting UI actions directly to backend endpoints.

## API Specification

* `GET /api/todos` - Retrieve all todo items
* `POST /api/todos` - Create a new todo item
* `PUT /api/todos/:id` - Update task text
* `PATCH /api/todos/:id/toggle` - Toggle task completion status
* `DELETE /api/todos/:id` - Delete a todo item

## Execution Instructions

### 1. Run the Backend Server
```bash
cd server
npm install
npm run dev