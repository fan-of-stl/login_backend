
# Movie Application Backend

This is the backend for a movie application built using Node.js, Express, and MongoDB. It includes user registration and login functionality with JWT authentication and data validation.

## Features

- User registration with input validation
- User login with JWT generation
- Protected routes for authenticated users
- MongoDB for data storage
- Custom error messages

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications
- **Express**: Web framework for Node.js
- **MongoDB**: NoSQL database for data storage
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB
- **Joi**: Validation library for input validation
- **JWT**: JSON Web Tokens for secure authentication

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/login_backend.git
   cd login_backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create a `.env` file**

   Create a `.env` file in the root directory and add the following variables:

   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/yourdatabase
   JWT_SECRET=your_jwt_secret
   ```

   Replace `yourdatabase` with your desired database name and `your_jwt_secret` with a secret key for JWT.

4. **Run the application**

   Start the server with:

   ```bash
   npm start
   ```

   The server will run on `http://localhost:9000`.

## API Endpoints

### User Registration

- **Endpoint**: `POST /api/register`
- **Request Body**:
  ```json
  {
    "name": "User Name",
    "email": "user@example.com",
    "password": "userpassword",
    "username": "username",
    "phonenumber": "1234567890",
    "profession": "Developer"
  }
  ```

### User Login

- **Endpoint**: `POST /api/login`
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "userpassword"
  }
  ```

### Protected Route

- **Endpoint**: `GET /api/dashboard`
- **Authorization**: Bearer token required in the header.

## Validation

User input is validated using Joi. The `userValidationSchema` and `loginValidationSchema` are defined to ensure proper data format and constraints.

## Error Handling

Custom error messages are returned for various scenarios, including validation errors and login failures.

