# Mini Loan App

## Deployed Version

You can access the deployed version of the app at [https://loan-app-black.vercel.app/](https://loan-app-black.vercel.app/).

## Overview

This project consists of a frontend and a backend. The frontend is built using React and Vite, while the backend is built using Node.js and Express.

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js (version 14 or higher)
- npm (Node package manager)

## Getting Started

### Backend (Server)

1. Navigate to the server directory:

   ```bash
   cd server
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the server using Nodemon:

   ```bash
   npm run server
   ```

   This will start the server and watch for changes in the `index.js` file.

### Frontend

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   This will start the Vite development server, and you can access the frontend at `http://localhost:3000` (or the port specified in your Vite configuration).

## API Documentation

### Authentication APIs

#### Register User

- **Endpoint**: `POST /api/auth/register`
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  - **201 Created**: User registered successfully.
  - **400 Bad Request**: User already exists.
  - **500 Internal Server Error**: Error message.

#### Login User

- **Endpoint**: `POST /api/auth/login`
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  - **200 OK**: Returns user details and JWT token.
  - **401 Unauthorized**: Invalid email or password.
  - **500 Internal Server Error**: Error message.

### Loan APIs

#### Create Loan

- **Endpoint**: `POST /api/loans`
- **Request Body**:
  ```json
  {
    "amount": "number",
    "term": "number"
  }
  ```
- **Response**:
  - **201 Created**: Returns the created loan object.
  - **500 Internal Server Error**: Error message.

#### Get Loans

- **Endpoint**: `GET /api/loans`
- **Response**:
  - **200 OK**: Returns an array of loans for the authenticated user or all loans if the user is an admin.
  - **500 Internal Server Error**: Error message.

#### Update Loan Status

- **Endpoint**: `PATCH /api/loans/:id/status`
- **Request Body**:
  ```json
  {
    "status": "string" // 'PENDING', 'APPROVED', or 'PAID'
  }
  ```
- **Response**:
  - **200 OK**: Returns the updated loan object.
  - **404 Not Found**: Loan not found.
  - **401 Unauthorized**: Not authorized.
  - **500 Internal Server Error**: Error message.

#### Add Repayment

- **Endpoint**: `POST /api/loans/:id/repayment`
- **Response**:
  - **200 OK**: Returns the updated loan object.
  - **404 Not Found**: Loan not found.
  - **401 Unauthorized**: Not authorized.
  - **400 Bad Request**: All repayments are already paid.
  - **500 Internal Server Error**: Error message.

## Models

### User Model

```javascript
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' }
});
```

- **Fields**:
  - `name`: User's name (required).
  - `email`: User's email (required, unique).
  - `password`: User's password (required).
  - `role`: User's role (default is 'customer').

### Loan Model

```javascript
const loanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: Number,
  term: Number,
  status: { type: String, enum: ['PENDING', 'APPROVED', 'PAID'], default: 'PENDING' },
  repayments: [{
    amount: Number,
    dueDate: Date,
    status: { type: String, enum: ['PENDING', 'PAID'], default: 'PENDING' }
  }]
});
```

- **Fields**:
  - `userId`: Reference to the User model (required).
  - `amount`: Total loan amount (required).
  - `term`: Loan term in weeks (required).
  - `status`: Current status of the loan (default is 'PENDING').
  - `repayments`: Array of repayment objects containing amount, due date, and status.

## License

This project is licensed under the ISC License.
