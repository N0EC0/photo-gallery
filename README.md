# SOEN 487 - A2
Noemie Corneillier - 40284815

Description: 
Small picture gallery desktop application to understand MongoDB + backend API implementations

## 1) Backend setup

From the project folder "a2":

```bash
cd backend
npm install
```

Create `backend/.env`:

```bash
MONGODB_URI="YOUR URI"
PORT=3001
```

Run the backend:

```bash
npm run dev
```

Backend will run on:

- `http://localhost:3001`
- Photos API base: `http://localhost:3001/api/photos`

## 2) Frontend setup

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on:

- `http://localhost:5173`

### Notes

- The frontend is hardcoded to call the backend at `http://localhost:3001/api`
  (see `frontend/src/services/api.ts`).
- The backend CORS config allows `http://localhost:5173` (Vite dev server).
- Uploaded images are stored in MongoDB as base64 and returned to the frontend as a `data:` URL. (Database is not maintained and probably inactive)
