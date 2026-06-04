# CivicConnect Setup Instructions

Complete guide to set up and run CivicConnect locally.

## Prerequisites

- **Node.js** 16.0 or higher
- **npm** 7.0 or higher (comes with Node.js)
- A code editor (VS Code recommended)
- Git (for version control)

## Step 1: Install Dependencies

### Backend Setup

```bash
# Navigate to server directory
cd server

# Install all dependencies
npm install

# Expected packages:
# - express (web framework)
# - cors (cross-origin requests)
# - bcryptjs (password hashing)
# - jsonwebtoken (authentication)
# - nodemon (development restart)
```

### Frontend Setup

```bash
# Navigate to client directory
cd ../client

# Install all dependencies
npm install

# Expected packages:
# - react & react-dom (UI framework)
# - react-router-dom (navigation)
# - axios (HTTP client)
# - react-icons (icon library)
# - vite (build tool)
```

## Step 2: Configure Environment Variables

### Backend Configuration

Create `.env` file in `/server` directory:

```env
# Server port
PORT=5000

# JWT Secret (CHANGE THIS IN PRODUCTION!)
JWT_SECRET=your_super_secret_key_change_this_in_production_12345

# Optional: Environment
NODE_ENV=development
```

**Security Note:** In production, use a strong random secret key. Generate one:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Step 3: Start Development Servers

You'll need **two terminal windows/tabs** open simultaneously.

### Terminal 1: Start Backend Server

```bash
cd server
npm run dev
```

**Expected output:**
```
🚀 CivicConnect API running on http://localhost:5000
```

The backend API is now running and ready to receive requests.

### Terminal 2: Start Frontend Development Server

```bash
cd client
npm run dev
```

**Expected output:**
```
➜  Local:   http://localhost:5173/
➜  press h + enter to show help
```

The frontend will automatically open in your browser.

## Step 4: Verify Installation

### Backend Health Check

Open your browser and visit: `http://localhost:5000`

You should see:
```json
{
  "message": "CivicConnect API is running"
}
```

### Frontend Check

The frontend should be running at: `http://localhost:5173`

You should see the CivicConnect home page with the hero section.

## Step 5: Create Test Account

1. Click **"Register"** in the navbar
2. Fill in the form:
   - **Name:** John Doe
   - **Email:** john@example.com
   - **Password:** password123
   - **City:** New York
   - **Profile Picture:** Leave blank (optional)
3. Click **"Register"**
4. You'll be logged in and redirected to home page

## Step 6: Test Core Features

### Create an Issue

1. Click **"+ Report Issue"** button in navbar
2. Fill in the form:
   - **Title:** Test pothole on Main Street
   - **Description:** Large pothole causing traffic delays
   - **Category:** Road Damage
   - **City:** New York
   - **Location:** Main St & 5th Ave
   - **Image URL:** https://via.placeholder.com/500
3. Click **"Submit Issue"**
4. Issue appears on home feed

### Upvote an Issue

1. On any issue card, click the **👍 Upvote** button
2. Number increases instantly

### View Issue Details

1. Click on issue title or **"Comment"** button
2. See full description, comments, and details
3. Add a comment in the textarea

### Browse Trending

1. Check the **"Trending Issues"** sidebar on home page
2. Shows top 5 most upvoted issues

### Use Filters

1. On home page, use **Search** bar
2. Click **Filters** for advanced options (City, Category, Status, Sort)
3. Results update instantly

## Step 7: Admin Dashboard

1. Go to `/admin` in your browser (or click Admin in navbar if logged in)
2. View:
   - Total Users
   - Total Issues  
   - Pending Issues
   - Resolved Issues
3. Recent issues table
4. Users table

## Troubleshooting

### Port Already in Use

If port 5000 or 5173 is already in use:

**Backend:**
```bash
# Change port in .env
PORT=5001
```

**Frontend:**
```bash
# Kill existing process or use different port
npm run dev -- --port 5174
```

### Dependencies Installation Issues

```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and package-lock
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### CORS Errors

If you see CORS errors:
1. Check backend is running on http://localhost:5000
2. Check frontend is using correct API URL
3. Verify CORS is enabled in server/index.js

### Backend not responding

```bash
# Check if port 5000 is in use
netstat -an | grep 5000

# Restart backend server
npm run dev
```

### Frontend not loading

```bash
# Check if Vite is running
# Clear browser cache (Ctrl+Shift+Delete)
# Restart frontend
npm run dev
```

## Available Scripts

### Backend

```bash
npm run dev     # Start development server with auto-reload
npm start       # Start production server
```

### Frontend

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run preview # Preview production build
```

## Data Persistence

**Current:** Data is stored in server memory
- Restarting backend server clears all data
- Perfect for development and testing

**Ready for MongoDB:** To add persistent database:
1. Replace array-based services with MongoDB models
2. Update connection in config/database.js
3. No frontend changes needed!

## Development Tips

1. **React DevTools:** Install browser extension for debugging
2. **VS Code Extensions:**
   - ES7+ React/Redux/React-Native snippets
   - Prettier Code Formatter
   - Thunder Client (API testing)

3. **API Testing:**
   - Use Thunder Client or Postman
   - Import endpoints from API Documentation

4. **Responsive Testing:**
   - Use Chrome DevTools (F12)
   - Toggle device toolbar for mobile view

## Next Steps

1. **Explore the Code:**
   - Backend: `/server/src/controllers/` for business logic
   - Frontend: `/client/src/pages/` for page components

2. **Customize:**
   - Update colors in `/client/src/styles/variables.css`
   - Modify constants in `/client/src/utils/constants.js`

3. **Add Features:**
   - Reference existing services for patterns
   - Add new routes in backend
   - Add new pages in frontend

4. **Deploy:**
   - Backend: Heroku, Railway, or similar
   - Frontend: Vercel, Netlify, or similar

## Need Help?

- Check console for error messages
- Review browser DevTools Network tab
- Check backend logs in terminal
- Read README.md for API documentation

---

**Setup Complete! 🎉 You're ready to start using CivicConnect.**
