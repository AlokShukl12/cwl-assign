# cwlAssign - Course Subscription Platform

A full-stack MERN application for course subscriptions with authentication, promo codes, and user course management.

## Features

- **Authentication**: JWT-based authentication with signup and login
- **Course Catalog**: Browse available courses with details
- **Course Subscriptions**: Subscribe to free courses instantly or paid courses with promo codes
- **Promo Code System**: Apply promo code `BFSALE25` for 50% discount on paid courses
- **My Courses**: View all subscribed courses with subscription details

## Tech Stack

### Backend
- Node.js + Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

### Frontend
- React 19
- React Router for navigation
- TailwindCSS for styling
- Axios for API calls
- React Toastify for notifications

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (running locally on default port 27017)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
MONGO_URI=mongodb://127.0.0.1:27017/cwlassign
JWT_SECRET=supersecretjwtkeychange_me
PORT=5000
```

4. Seed the database with dummy users and courses:
```bash
npm run seed
```

5. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory (optional):
```env
VITE_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or another port if 5173 is busy)

## Dummy User Credentials

The seed script creates 3 dummy users:

1. **Email**: `john@example.com`  
   **Password**: `password123`

2. **Email**: `jane@example.com`  
   **Password**: `password123`

3. **Email**: `admin@example.com`  
   **Password**: `admin123`

## Promo Code

- **Valid Promo Code**: `BFSALE25`
- **Discount**: 50% off on paid courses

## API Endpoints

### Authentication
- `POST /auth/signup` - Create a new user account
- `POST /auth/login` - Login and get JWT token

### Courses
- `GET /courses` - Get all courses
- `GET /courses/:id` - Get course by ID

### Subscriptions
- `POST /subscribe` - Subscribe to a course (requires authentication)
  - Free courses: Subscribe directly
  - Paid courses: Requires valid promo code

### User Courses
- `GET /my-courses` - Get all courses subscribed by authenticated user

## Project Structure

```
cwlAssign/
├── backend/
│   ├── config/
│   │   └── db.js          # MongoDB connection
│   ├── models/
│   │   ├── User.js        # User model
│   │   ├── Course.js      # Course model
│   │   └── Subscription.js # Subscription model
│   ├── routes/
│   │   ├── auth.js        # Authentication routes
│   │   ├── courses.js     # Course routes
│   │   ├── subscriptions.js # Subscription routes
│   │   └── myCourses.js   # User courses route
│   ├── middleware/
│   │   └── auth.js        # JWT authentication middleware
│   ├── server.js          # Express server setup
│   └── seed.js            # Database seeding script
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx        # Navigation bar
    │   │   └── ProtectedRoute.jsx # Route protection
    │   ├── context/
    │   │   └── AuthContext.jsx   # Authentication context
    │   ├── pages/
    │   │   ├── Login.jsx         # Login page
    │   │   ├── Signup.jsx        # Signup page
    │   │   ├── Home.jsx          # Course listing page
    │   │   ├── CourseDetail.jsx  # Course details page
    │   │   └── MyCourses.jsx     # User's subscribed courses
    │   ├── utils/
    │   │   └── api.js            # Axios API client
    │   ├── App.jsx               # Main app component
    │   └── main.jsx              # Entry point
    └── package.json
```

## Usage

1. Start MongoDB service
2. Start backend server (`npm run dev` in backend directory)
3. Seed database (`npm run seed` in backend directory)
4. Start frontend (`npm run dev` in frontend directory)
5. Navigate to `http://localhost:5173`
6. Login with one of the dummy credentials
7. Browse courses and subscribe!

## Notes

- All routes except `/auth/signup` and `/auth/login` require authentication
- Free courses can be subscribed to without promo codes
- Paid courses require the promo code `BFSALE25` to subscribe
- JWT tokens are stored in localStorage
- Tokens expire after 7 days
"# cwl-assign" 
