# KBP Engineering College — Training & Placement Cell Portal

Full-stack web portal for the Training & Placement Cell of KBP Engineering College, Satara.

| Layer | Directory | Stack |
|-------|-----------|-------|
| Frontend | `frontend/` | React, TypeScript, Vite |
| Backend | `backend/` | Express, MongoDB, JWT auth |

## Features

- Public portal: programs, activities gallery, placements, contact
- Admin dashboard: analytics, activity CRUD, gallery management
- Authentication with role-based access
- MongoDB Atlas integration with local file uploads

## Quick start

### Prerequisites

- Node.js 18+
- MongoDB Atlas connection string (or local MongoDB)

### 1. Install dependencies

```bash
npm run install:all
```

Or install each project separately:

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2. Configure environment

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Edit `backend/.env` — set `MONGO_URI` and `JWT_SECRET`.

### 3. Seed admin user (first time)

```bash
cd backend
npm run seed:admin
```

Default credentials: `admin@kbp.edu` / `admin123`

### 4. Run locally

From the repo root:

```bash
npm run dev
```

Or run each service separately:

```bash
npm run dev:backend   # http://localhost:5000
npm run dev:frontend  # http://localhost:5173
```

- Public site: http://localhost:5173
- Admin login: http://localhost:5173/admin/login
- API health: http://localhost:5000/api/health

## Project structure

```
tpo-website/
├── frontend/          # Vite React app
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/           # Express API
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── uploads/
│   └── server.js
├── README.md
├── DEPLOYMENT.md
└── package.json       # Root workspace scripts
```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for Render (backend) and Vercel (frontend) setup.

## License

Private — KBP Engineering College.
