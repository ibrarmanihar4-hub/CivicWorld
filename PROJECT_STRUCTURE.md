# CivicConnect Project Structure

## Backend Structure (Node.js/Express)
```
server/
├── src/
│   ├── config/
│   │   └── database.js           # MongoDB configuration
│   ├── controllers/
│   │   ├── authController.js     # Auth logic (login, register)
│   │   ├── issuesController.js   # Issues CRUD operations
│   │   └── commentsController.js # Comments CRUD operations
│   ├── middleware/
│   │   └── auth.js               # JWT verification and authorization
│   ├── models/
│   │   └── placeholder.js        # Future MongoDB schemas
│   ├── routes/
│   │   ├── auth.js               # Authentication endpoints
│   │   ├── issues.js             # Issues endpoints
│   │   └── comments.js           # Comments endpoints
│   └── services/
│       ├── authService.js        # Auth business logic
│       ├── issuesService.js      # Issues business logic
│       └── commentsService.js    # Comments business logic
├── index.js                       # Main server entry point
└── package.json                   # Backend dependencies

```

## Frontend Structure (React + Vite)
```
client/src/
├── assets/
│   └── README.md                 # Static assets (images, icons)
├── components/
│   ├── Header.jsx                # Header component
│   ├── NavBar.jsx                # Navigation bar
│   ├── IssueCard.jsx             # Reusable issue card display
│   ├── FeedFilter.jsx            # Issue feed filtering
│   └── TrendingSection.jsx       # Trending issues section
├── context/
│   └── AuthContext.jsx           # Global auth state management
├── pages/
│   ├── Home.jsx                  # Home page
│   ├── Home.css                  # Home page styles
│   ├── Login.jsx                 # User login page
│   ├── Register.jsx              # User registration page
│   ├── CreateIssue.jsx           # Create new issue page
│   ├── IssuesList.jsx            # List of issues
│   ├── IssueDetails.jsx          # Individual issue details
│   ├── Profile.jsx               # User profile page
│   ├── AdminDashboard.jsx        # Admin dashboard
│   ├── About.jsx                 # About page
│   ├── Contact.jsx               # Contact page
│   └── ReportIssue.jsx           # Report issue page
├── services/
│   ├── api.js                    # API client configuration
│   └── auth.js                   # Auth-related API calls
├── styles/
│   ├── global.css                # Global CSS rules
│   └── variables.css             # CSS variables and theme tokens
├── utils/
│   ├── constants.js              # App-wide constants
│   └── helpers.js                # Common utility functions
├── App.jsx                       # Main App component
├── main.jsx                      # React entry point
└── index.css                     # Main CSS

```

## Architecture Overview

### Backend Layers
- **Routes**: API endpoints definition
- **Controllers**: Request handling and response formatting
- **Services**: Business logic implementation
- **Models**: Database schema definitions (MongoDB)
- **Middleware**: Authentication and authorization
- **Config**: Database and environment configuration

### Frontend Structure
- **Pages**: Full page components for routing
- **Components**: Reusable UI components
- **Services**: API communication and data fetching
- **Context**: Global state management (Auth)
- **Utils**: Helper functions and constants
- **Styles**: CSS files and design tokens

## Next Steps
1. Implement package.json scripts
2. Set up Express server in index.js
3. Configure database connection
4. Implement authentication flow
5. Build API endpoints
6. Create React components
7. Set up routing and navigation
