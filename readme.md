
## Table of Contents

- [Project Setup](#project-setup)
  - [Prerequisites](#prerequisites)
  - [Steps](#steps)
  - [This will start the server and connect to the MongoDB database. The server will be running at `http://localhost:5000`.](#this-will-start-the-server-and-connect-to-the-mongodb-database-the-server-will-be-running-at-httplocalhost5000)
  - [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
  - [Authentication](#authentication)
    - [Register](#register)
    - [Login](#login)
  - [Forms](#forms)
    - [Submit Form](#submit-form)
    - [Get All Forms (Admin)](#get-all-forms-admin)
    - [Get Form by ID (Admin)](#get-form-by-id-admin)
    - [Update Form (Admin)](#update-form-admin)
    - [Delete Form (Admin)](#delete-form-admin)


# Project Setup

This guide will walk you through the steps to set up the project locally.

## Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [MongoDB](https://www.mongodb.com/) (or use a hosted MongoDB service like [Atlas](https://www.mongodb.com/cloud/atlas))

## Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/samirdhoran2000/health-plus.git
   cd health-plus
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the root of the project and add the following variables:

   ```
    MONGO_URI=mongodb://127.0.0.1:27017/health-plus
    PORT=5000
    JWT_SECRET=SECRET
   ```

  You can Replace `<your-mongodb-connection-string>` with the connection string for your MongoDB database, and `<your-jwt-secret-key>` with a secret key for signing JWT tokens.

4. **Start the development server**:

   ```bash
   npm run dev
   ```

   This will start the server and connect to the MongoDB database. The server will be running at `http://localhost:5000`.
---

## Project Structure

The project is structured as follows:

```
your-project/
├── controllers/
│   ├── authController.js
│   └── formController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── formModel.js
│   └── userModel.js
├── routes/
│   ├── authRoutes.js
│   └── formRoutes.js
├── app.js
└── package.json
```

- `controllers/`: Contains the logic for handling API requests.
- `middleware/`: Contains middleware functions for authentication and authorization.
- `models/`: Contains the Mongoose models for the `User` and `Form` data.
- `routes/`: Contains the API route definitions.
- `app.js`: The main entry point of the application.
- `package.json`: The project's dependencies and scripts.

---
# API Documentation

This documentation outlines the API endpoints available for the application.


## Authentication

### Register

**Endpoint**: `POST /api/auth/register`

**Description**: This endpoint is used to register a new user.

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "role": "user"
}
```

**Response**:
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "60a123456789abcdef012345",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "user"
  }
}
```

**Possible Errors**:
- `400 Bad Request`: If any of the required fields are missing or invalid.
- `400 Bad Request`: If the email is already registered.

### Login

**Endpoint**: `POST /api/auth/login`

**Description**: This endpoint is used to authenticate a user and obtain a JWT token.

**Request Body**:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "message": "Login successful",
  "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGExMjM0NTY3ODlhYmNkZWYwMTIzNDUiLCJyb2xlIjoidXNlciIsImlhdCI6MTYyMTIzNDU2NywiZXhwIjoxNjIxMjM4MTY3fQ.UKmVXmRmEfTuqVIwl2MDlmGQXYFr6blaBc-123456"
}
```

**Possible Errors**:
- `400 Bad Request`: If email or password is missing.
- `401 Unauthorized`: If the email or password is invalid.

## Forms

### Submit Form

**Endpoint**: `POST /api/forms/submit`

**Description**: This endpoint is used to submit a new form.

**Request Body**:
```json
{
  "patientName": "Jane Doe",
  "patientNumber": "1234567890",
  "patientGender": "Female",
  "appointmentTime": "2023-05-15T10:00:00Z",
  "preferredMode": "voice"
}
```

**Response**:
```json
{
  "message": "Form submitted successfully",
  "form": {
    "id": "60a123456789abcdef012345",
    "patientName": "Jane Doe",
    "patientNumber": "1234567890",
    "patientGender": "Female",
    "appointmentTime": "2023-05-15T10:00:00Z",
    "preferredMode": "voice"
  }
}
```

**Possible Errors**:
- `400 Bad Request`: If any of the required fields are missing or invalid.

### Get All Forms (Admin)

**Endpoint**: `GET /api/forms/admin/forms`

**Description**: This endpoint is used to retrieve all forms. It is accessible only to users with the "admin" role.

**Response**:
```json
[
  {
    "id": "60a123456789abcdef012345",
    "patientName": "Jane Doe",
    "patientNumber": "1234567890",
    "patientGender": "Female",
    "appointmentTime": "2023-05-15T10:00:00Z",
    "preferredMode": "voice"
  },
  {
    "id": "60a123456789abcdef012346",
    "patientName": "John Smith",
    "patientNumber": "0987654321",
    "patientGender": "Male",
    "appointmentTime": "2023-05-16T14:30:00Z",
    "preferredMode": "video"
  }
]
```

**Possible Errors**:
- `401 Unauthorized`: If the user is not authenticated or does not have the "admin" role.
- `404 Not Found`: If there are no forms found.

### Get Form by ID (Admin)

**Endpoint**: `GET /api/forms/admin/forms/:id`

**Description**: This endpoint is used to retrieve a single form by its ID. It is accessible only to users with the "admin" role.

**Parameters**:
- `id`: The ID of the form to retrieve.

**Response**:
```json
{
  "id": "60a123456789abcdef012345",
  "patientName": "Jane Doe",
  "patientNumber": "1234567890",
  "patientGender": "Female",
  "appointmentTime": "2023-05-15T10:00:00Z",
  "preferredMode": "voice"
}
```

**Possible Errors**:
- `401 Unauthorized`: If the user is not authenticated or does not have the "admin" role.
- `400 Bad Request`: If the `id` parameter is missing.
- `404 Not Found`: If the form with the specified ID is not found.

### Update Form (Admin)

**Endpoint**: `PATCH /api/forms/admin/forms/:id`

**Description**: This endpoint is used to update an existing form. It is accessible only to users with the "admin" role.

**Parameters**:
- `id`: The ID of the form to update.

**Request Body**:
```json
{
  "patientName": "Jane Smith",
  "patientNumber": "0987654321",
  "patientGender": "Female",
  "appointmentTime": "2023-05-17T15:00:00Z",
  "preferredMode": "video"
}
```

**Response**:
```json
{
  "message": "Form updated successfully",
  "form": {
    "id": "60a123456789abcdef012345",
    "patientName": "Jane Smith",
    "patientNumber": "0987654321",
    "patientGender": "Female",
    "appointmentTime": "2023-05-17T15:00:00Z",
    "preferredMode": "video"
  }
}
```

**Possible Errors**:
- `401 Unauthorized`: If the user is not authenticated or does not have the "admin" role.
- `400 Bad Request`: If the `id` parameter is missing.
- `404 Not Found`: If the form with the specified ID is not found.

### Delete Form (Admin)

**Endpoint**: `DELETE /api/forms/admin/forms/:id`

**Description**: This endpoint is used to delete an existing form. It is accessible only to users with the "admin" role.

**Parameters**:
- `id`: The ID of the form to delete.

**Response**:
```json
{
  "message": "Form deleted successfully"
}
```

**Possible Errors**:
- `401 Unauthorized`: If the user is not authenticated or does not have the "admin" role.
- `400 Bad Request`: If the `id` parameter is missing.
- `404 Not Found`: If the form with the specified ID is not found.