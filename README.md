# Simple Task Tracker

A full-stack task manager with user accounts. Each user registers, logs in and sees only their own tasks. Built with Node.js, Express, MongoDB and plain HTML/CSS/JavaScript on the frontend.

## Features

- Register and log in with a username and password
- Duplicate usernames are rejected ("Username already taken")
- Passwords are hashed with bcrypt, never stored as plain text
- JWT-based sessions (7 days), so it works on serverless hosting like Vercel
- Tasks are private to each user; every task route requires a valid token
- Add, delete, search and mark tasks as completed (or back to pending)
- Completion time is saved on the server (`completedAt`), ready for calendar views
- Live stats for total, pending and completed tasks
- Responsive UI

## Tech stack

| Layer | Tools |
|---|---|
| Backend | Node.js, Express |
| Database | MongoDB with Mongoose |
| Auth | bcryptjs, jsonwebtoken |
| Frontend | HTML, CSS, vanilla JavaScript, Font Awesome |
| Dev tooling | nodemon |
| Hosting | Vercel |

## Project structure

```
simple-task-tracker/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── authController.js     # register, login
│   └── taskController.js     # task CRUD
├── middleware/
│   └── auth.js               # verifies JWT, sets req.userId
├── models/
│   ├── User.js
│   └── Task.js
├── routes/
│   ├── authRoutes.js
│   └── taskRoutes.js
├── public/
│   ├── index.html            # task manager page
│   ├── auth.html             # login / register page
│   ├── script.js
│   ├── auth.js
│   ├── style.css
│   └── auth.css
├── server.js
├── vercel.json
└── package.json
```

## Getting started

### Prerequisites

- Node.js 18 or newer
- A MongoDB database (local, or a free cluster on MongoDB Atlas)

### Setup

```bash
git clone https://github.com/mandeeproy999999-commits/simple-task-tracker.git
cd simple-task-tracker
npm install
```

Create a `.env` file in the project root:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=a_long_random_string
```

Start the dev server:

```bash
npm run dev
```

Open `http://localhost:3000`. You will land on the login page; register an account to get started.

## API reference

All task routes need the header `Authorization: Bearer <token>`.

### Auth

| Method | Endpoint | Body | Description |
|---|---|---|---|
| POST | `/api/auth/register` | `{ username, password }` | Create an account, returns a token |
| POST | `/api/auth/login` | `{ username, password }` | Log in, returns a token |

### Tasks

| Method | Endpoint | Body | Description |
|---|---|---|---|
| GET | `/api/tasks` | none | List the logged-in user's tasks |
| POST | `/api/tasks` | `{ title }` | Create a task |
| PUT | `/api/tasks/:id` | `{ title?, status? }` | Update title or status (`Pending` / `Completed`) |
| DELETE | `/api/tasks/:id` | none | Delete a task |

Example:

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"mandeep","password":"test123"}'
```

## Deployment (Vercel)

1. Push the repo to GitHub and import it in Vercel.
2. Under **Settings → Environment Variables**, add `MONGO_URI` and `JWT_SECRET`.
3. Deploy. If you add the variables after the first deploy, redeploy once.

## Security notes

- `.env` is git-ignored. Never commit your database URI or JWT secret.
- The token is kept in `localStorage`, which is simple but exposed to XSS. Task titles should be escaped before being rendered with `innerHTML`.

## Roadmap

- [ ] Calendar view showing tasks completed on each day
- [ ] Edit task title from the UI
- [ ] Escape task titles when rendering
- [ ] Due dates and reminders

## Author

Mandeep Roy, NIT Silchar
