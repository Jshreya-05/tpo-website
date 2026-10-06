# TPO Website — Deployment Guide

| Layer | Path | Platform |
|-------|------|----------|
| Frontend (Vite) | `frontend/` | Vercel |
| Backend (Express) | `backend/` | Render |

---

## Local development

### Backend

```bash
cd backend
cp .env.example .env
# Edit .env — set MONGO_URI, JWT_SECRET, and Cloudinary keys
npm install
npm run seed:admin    # first time only
npm run dev           # or: npm start
```

Expected output:

```
MongoDB Connected: ...
Server running on port 5000
Public file base URL: http://localhost:5000/uploads
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`. Admin login: `http://localhost:5173/admin/login`

---

## Environment variables

### Backend (`backend/.env`)

| Variable | Required | Example |
|----------|----------|---------|
| `PORT` | No | `5000` |
| `MONGO_URI` | Yes | `mongodb+srv://...` |
| `JWT_SECRET` | Yes (prod) | long random string |
| `BACKEND_URL` | Yes (prod) | `https://tpo-website-631h.onrender.com` |
| `FRONTEND_URL` | Yes (prod) | `https://tpo-website-seven.vercel.app` |
| `NODE_ENV` | No | `production` |
| `CLOUDINARY_CLOUD_NAME` | Yes (gallery) | from Cloudinary dashboard |
| `CLOUDINARY_API_KEY` | Yes (gallery) | from Cloudinary dashboard |
| `CLOUDINARY_API_SECRET` | Yes (gallery) | from Cloudinary dashboard |

### Frontend (Vercel dashboard)

| Variable | Example |
|----------|---------|
| `VITE_API_BASE_URL` | `https://tpo-website-631h.onrender.com/api` |

---

## Render (backend)

1. Connect GitHub repo.
2. **Root Directory:** `backend`
3. **Build Command:** `npm install`
4. **Start Command:** `npm start`
5. Add environment variables from the table above.
6. After first deploy, run locally once (with production `MONGO_URI` in `.env`):

```bash
cd backend
npm run seed:admin
npm run migrate:gallery-urls   # if gallery URLs still use localhost
npm run migrate:gallery-cloudinary   # copy local gallery files to Cloudinary
```

### MongoDB Atlas

1. Create a cluster and database user.
2. Network Access → allow `0.0.0.0/0` (or Render outbound IPs).
3. Copy connection string into `MONGO_URI`.

---

## Vercel (frontend)

1. Import the same GitHub repo.
2. **Root Directory:** `frontend`
3. **Framework Preset:** Vite
4. **Build Command:** `npm run build`
5. **Output Directory:** `dist`
6. **Environment Variable:** `VITE_API_BASE_URL=https://<your-render-service>.onrender.com/api`

> **Important:** Update Render and Vercel root directories from the old paths (`tpo-website/` and `tpo-website/server/`) to `frontend/` and `backend/`.

---

## CORS

Configured in `backend/config/cors.js`:

- `http://localhost:5173` (Vite dev)
- `https://tpo-website-seven.vercel.app`
- All `https://tpo-website*.vercel.app` preview URLs
- `FRONTEND_URL` from env

---

## Verification checklist

- [ ] `GET https://<backend>/api/health` → `{ success: true }`
- [ ] `GET https://<backend>/api/activities` → JSON with `data` array
- [ ] `POST https://<backend>/api/auth/login` → 401 without body, not 404
- [ ] `GET https://<backend>/api/gallery` → images use `BACKEND_URL`, not localhost
- [ ] `https://<frontend>/admin/login` → login works
- [ ] Dashboard loads analytics, activities, gallery stats
- [ ] Gallery images visible on public homepage
