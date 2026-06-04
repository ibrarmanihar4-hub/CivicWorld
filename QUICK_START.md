# CivicConnect - Quick Start Guide

## 🚀 Get Running in 5 Minutes

### Prerequisites
```bash
# Verify Node.js is installed (v16+)
node --version
npm --version
```

### Step 1: Install Dependencies

```bash
# Install backend
cd server
npm install

# Install frontend  
cd ../client
npm install
```

### Step 2: Run Both Servers

**Open Two Terminal Windows/Tabs**

**Terminal 1 (Backend):**
```bash
cd server
npm run dev
```
✅ You should see: `🚀 CivicConnect API running on http://localhost:5000`

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
```
✅ You should see: `➜  Local:   http://localhost:5173/`

### Step 3: Open in Browser

Visit: **http://localhost:5173**

---

## 🧪 Test the App

### Create Account
1. Click "Register"
2. Fill form (any test data works)
3. Click "Register"

### Create Issue
1. Click "+ Report Issue"
2. Fill out form
3. Click "Submit Issue"

### Interact
- ✅ Click upvote button
- ✅ Add comments
- ✅ Use filters
- ✅ View trending

---

## 📍 Important URLs

| What | URL |
|------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:5000 |
| Backend Health | http://localhost:5000 |
| Admin Dashboard | http://localhost:5173/admin |

---

## 🔑 Test Credentials

Create your own during registration. No pre-set accounts.

---

## 📂 Key Files to Know

### Backend
- `server/index.js` - Main server entry
- `server/src/routes/` - API endpoints
- `server/src/controllers/` - Business logic
- `server/src/services/` - Data operations

### Frontend  
- `client/src/App.jsx` - Main app & routing
- `client/src/pages/` - Page components
- `client/src/components/` - Reusable components
- `client/src/services/auth.js` - API calls

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Port already in use | Change PORT in `.env` or kill process |
| Dependencies error | `npm cache clean --force` then `npm install` |
| CORS error | Make sure backend is running on :5000 |
| Page won't load | Check browser console for errors |
| Backend not responding | Restart backend server |

---

## 📝 Common Tasks

### Add a Feature
1. Create endpoint in `server/src/routes/`
2. Add logic in `server/src/services/`
3. Create page or component in `client/src/`
4. Test via API client or browser

### Change Colors
Edit: `client/src/styles/variables.css`

### Add Page
1. Create file: `client/src/pages/MyPage.jsx`
2. Add route: `client/src/App.jsx`
3. Create component

### Deploy Backend
- Heroku, Railway, or Fly.io
- Push to repository
- Connect to service
- Done!

### Deploy Frontend
- Vercel, Netlify, or GitHub Pages
- Connect repository
- Set API URL environment variable
- Done!

---

## 🎓 Learn the Structure

```
CivicConnect/
├── server/           ← Node.js + Express API
│   └── src/
│       ├── routes/   ← API endpoints
│       ├── controllers/ ← Logic
│       └── services/ ← Database operations
│
└── client/          ← React + Vite frontend
    └── src/
        ├── pages/   ← Full pages
        ├── components/ ← Reusable parts
        └── services/ ← API calls
```

---

## ⚡ Quick Commands

```bash
# Start backend (from server/)
npm run dev

# Start frontend (from client/)
npm run dev

# Build for production (from client/)
npm run build

# Preview production build (from client/)
npm run preview
```

---

## 💡 Pro Tips

1. **Keep both servers running** during development
2. **Use browser DevTools** (F12) for debugging
3. **Check network tab** to see API calls
4. **Read error messages** - they're helpful!
5. **Save changes** - both frontend and backend watch for changes

---

## 🆘 Need Help?

1. Check console for errors
2. Read the full README.md
3. Review SETUP_INSTRUCTIONS.md
4. Check IMPLEMENTATION_SUMMARY.md for architecture

---

## ✅ You're All Set!

The app is ready to use. Start with:
1. Register a user
2. Create an issue
3. Explore the features
4. Try the admin dashboard

**Enjoy building! 🎉**
