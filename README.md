# Smart Student Management System

## Setup Instructions

### 1. Install Dependencies

Frontend:
cd frontend
npm install

Backend:
cd backend
npm install

---

### 2. Run Backend

cd backend
node server.js

Runs on:
http://localhost:5000

*Note: If you get a port conflict (server already running), terminate the existing Node process:*
*Windows: `taskkill /F /IM node.exe`*

---

### 3. Run Frontend

cd frontend
npm start

Runs on:
http://localhost:3000

---

### 4. Environment Variables

Create .env inside backend:

GEMINI_API_KEY=your_key
MONGO_URI=your_mongodb_uri
PORT=5000

---

### 5. Features

* Authentication
* Dashboard
* Attendance tracking
* Assignments management
* Smart AI (Gemini integration)
