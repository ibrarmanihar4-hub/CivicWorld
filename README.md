# CivicConnect 🏛️

A full-stack social media-style civic issue reporting platform built with React.js and Node.js + Express.js.

## 📋 Project Overview

CivicConnect is a community-driven platform where citizens can report local civic issues, upvote problems they care about, and collaborate on solutions. The platform combines the engagement of Reddit and LinkedIn with the responsiveness of Twitter.

**Key Features:**
- User authentication (Register/Login)
- Report local civic issues with images
- Upvote issues to show support
- Filter and search issues by city, category, status
- Real-time trending issues
- User profiles with post history
- Comments on issues
- Admin dashboard for monitoring
- Responsive design for all devices

## 🏗️ Architecture

### Technology Stack

**Frontend:**
- React 18.2 with Vite
- React Router DOM for navigation
- Axios for API calls
- React Icons for UI icons
- CSS with design system variables

**Backend:**
- Node.js with Express.js
- JWT for authentication
- Bcryptjs for password hashing
- CORS enabled for frontend communication
- In-memory arrays (prepared for MongoDB integration)

## 📁 Project Structure

### Backend (`/server`)
```
server/
├── src/
│   ├── controllers/      # Request handlers
│   │   ├── authController.js
│   │   ├── issuesController.js
│   │   └── commentsController.js
│   ├── services/         # Business logic
│   │   ├── authService.js
│   │   ├── issuesService.js
│   │   └── commentsService.js
│   ├── routes/          # API endpoints
│   │   ├── auth.js
│   │   ├── issues.js
│   │   └── comments.js
│   ├── middleware/      # Authentication & auth
│   │   └── auth.js
│   ├── models/          # Placeholder for MongoDB
│   └── config/          # Configuration
├── index.js             # Server entry point
└── package.json         # Dependencies
```

### Frontend (`/client`)
```
client/src/
├── components/          # Reusable UI components
│   ├── NavBar.jsx
│   ├── Header.jsx
│   ├── IssueCard.jsx    # Core feed component
│   ├── FeedFilter.jsx
│   └── TrendingSection.jsx
├── pages/              # Full page components
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── CreateIssue.jsx
│   ├── IssueDetails.jsx
│   ├── IssuesList.jsx
│   ├── Profile.jsx
│   ├── AdminDashboard.jsx
│   ├── About.jsx
│   └── Contact.jsx
├── context/            # Global state
│   └── AuthContext.jsx
├── services/           # API calls & auth
│   ├── api.js
│   └── auth.js
├── styles/             # CSS & design tokens
│   ├── global.css
│   └── variables.css
├── utils/              # Helpers & constants
│   ├── constants.js
│   └── helpers.js
├── App.jsx            # Main app component
└── main.jsx           # Entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

#### 1. Clone and Setup
```bash
# Navigate to project root
cd CivicConnect

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

#### 2. Environment Setup

Create `.env` file in `/server`:
```env
PORT=5000
JWT_SECRET=your_secret_key_here_change_in_production
```

#### 3. Start Both Servers

**Terminal 1 - Backend:**
```bash
cd server
npm run dev    # Starts on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev    # Starts on http://localhost:5173
```

Visit `http://localhost:5173` in your browser.

## 📚 API Documentation

### Authentication Endpoints

```
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "city": "New York",
  "profilePictureUrl": "https://..." (optional)
}

POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}

GET /api/auth/profile
Authorization: Bearer {token}

PUT /api/auth/profile
Authorization: Bearer {token}
{
  "name": "Jane Doe",
  "city": "Los Angeles",
  "profilePictureUrl": "https://..."
}
```

### Issues Endpoints

```
GET /api/issues?city=NYC&category=Road%20Damage&status=open&search=pothole&sortBy=latest

POST /api/issues
Authorization: Bearer {token}
{
  "title": "Large pothole on Main St",
  "description": "Detailed description...",
  "category": "Road Damage",
  "city": "New York",
  "location": "Main St & 5th Ave",
  "imageUrl": "https://..."
}

GET /api/issues/:id

PUT /api/issues/:id
Authorization: Bearer {token}
{ "status": "resolved" }

DELETE /api/issues/:id
Authorization: Bearer {token}

POST /api/issues/:id/upvote
Authorization: Bearer {token}

GET /api/issues/trending/list?limit=5

GET /api/issues/user/:userId

GET /api/issues/admin/stats
Authorization: Bearer {token}
```

### Comments Endpoints

```
GET /api/comments/issue/:issueId

POST /api/comments/issue/:issueId
Authorization: Bearer {token}
{ "text": "Great observation!" }

PUT /api/comments/:id
Authorization: Bearer {token}
{ "text": "Updated comment" }

DELETE /api/comments/:id
Authorization: Bearer {token}
```

## 🎯 Key Features Explained

### 1. Home Feed
- Displays all civic issues in a Reddit-like feed
- Filter by city, category, status
- Search by title/location
- Sort by most/least upvoted, latest/oldest
- Trending issues sidebar

### 2. Authentication
- Secure JWT-based auth
- Password hashing with bcryptjs
- Profile customization with optional avatar
- Protected routes for authenticated users

### 3. Issue Management
- Create issues with title, description, category, location, image
- Upvote/unupvote to show support
- View full issue details with comments
- Edit/delete own issues (authorization checks)
- Track issue status (open, pending, resolved, closed)

### 4. User Profiles
- Display user information and city
- Show total posts, upvotes, and upvoted issues
- Tab navigation for "My Posts" and "Upvoted Posts"
- Edit profile functionality

### 5. Admin Dashboard
- View overall statistics (users, issues, pending, resolved)
- Monitor recent issues in table format
- View all registered users
- Real-time data updates

## 🔐 Security Features

- JWT token-based authentication
- Password hashing with bcryptjs (10 rounds)
- Authorization checks on sensitive operations
- CORS properly configured
- Error handling and validation on all endpoints
- Protected routes in frontend

## 🎨 Design System

The app uses a comprehensive CSS variable system:

**Colors:**
- Primary: Blue (#2563eb)
- Success: Green (#10b981)
- Danger: Red (#ef4444)
- Warning: Orange (#f59e0b)

**Spacing:** Consistent 8px base unit
**Typography:** System fonts with semantic sizing
**Shadows:** Layered shadow system for depth
**Border Radius:** Consistent rounded corners

## 🚧 Future Enhancements

### MongoDB Integration
The backend is structured to easily swap in MongoDB:
1. Replace `authService.js`, `issuesService.js`, `commentsService.js` with MongoDB operations
2. Create proper models in `/src/models/`
3. No frontend changes needed!

### Additional Features
- Image upload to cloud storage (AWS S3, Cloudinary)
- Email notifications
- Advanced analytics and heatmaps
- Real-time updates with WebSockets
- Mobile app using React Native
- AI-powered issue categorization
- Integration with municipal APIs
- Badge system for active contributors

## 🧪 Testing

```bash
# Frontend
cd client
npm run build    # Production build

# Backend
cd server
npm test        # (When test suite is added)
```

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For issues, questions, or suggestions, please reach out to info@civicconnect.com

---

**Built with ❤️ for better communities**
