# Authentication API

A backend authentication system built with **Node.js, Express, PostgreSQL, bcrypt, and express-session**.

This project was built as a hands-on implementation to understand how authentication works under the hood rather than relying entirely on authentication libraries.

## Features

- User registration
- Password hashing with bcrypt
- User login
- Session-based authentication
- Protected routes
- User profile endpoint
- Logout
- PostgreSQL database integration
- Environment variable configuration
- Basic input validation
- Parameterized SQL queries

## Tech Stack

- **Node.js**
- **Express.js**
- **PostgreSQL**
- **bcrypt**
- **express-session**
- **dotenv**
- **Postman** for API testing

## Authentication Flow

```text
Register
   ↓
Password hashed with bcrypt
   ↓
Stored in PostgreSQL
   ↓
Login
   ↓
Password verified with bcrypt
   ↓
Session created
   ↓
Session cookie stored by browser
   ↓
Protected routes identify the user