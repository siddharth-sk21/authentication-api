# Authentication API

A backend authentication system built with **Node.js, Express, PostgreSQL, bcrypt, Passport.js, and Google OAuth 2.0**.

## Features

- User registration and login
- Password hashing with bcrypt
- Session-based authentication
- Protected routes
- Role-based authorization (User/Admin)
- Google OAuth 2.0 login
- Automatic Google user creation
- Logout and session destruction
- PostgreSQL database integration
- Environment variable configuration

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- bcrypt
- express-session
- Passport.js
- Google OAuth 2.0
- Postman

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/register` | Register a new user |
| POST | `/login` | Login with email/password |
| GET | `/profile` | Get authenticated user's profile |
| GET | `/admin` | Admin-only route |
| POST | `/logout` | Logout and destroy session |
| GET | `/auth/google` | Login with Google |
| GET | `/auth/google/callback` | Google OAuth callback |

## Authentication Flow

```text
Email/Password ──┐
                 ├──> Express Session ──> Protected Routes
Google OAuth ────┘
                         │
                         ├── /profile
                         └── /admin