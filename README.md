# HeroBase Backend

This is the backend service for the HeroBase mobile application, built with Node.js and Express, and uses MongoDB for data storage.

## Features

- User authentication (registration, login)
- CRUD operations for characters
- Validation and error handling
- Secure data storage

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [MongoDB](https://www.mongodb.com/) (local or MongoDB Atlas)
- [Git](https://git-scm.com/)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/herobase-backend.git
   cd herobase-backend

Install dependencies:

sh

npm install

Create a .env file in the root directory and add your environment variables:

env

    MONGO_URI=your-mongodb-uri
    JWT_SECRET=your-secret-key

Running the Server

To start the development server, run:

sh

npm start

The server will start on http://localhost:5000.
API Endpoints
Authentication

    POST /api/auth/register - Register a new user
    POST /api/auth/login - Login a user

Characters

    POST /api/characters - Create a new character
    GET /api/characters - Get all characters for the logged-in user
    DELETE /api/characters/:id - Delete a character by ID

Project Structure

bash

.
├── middleware
│   └── auth.js         # Authentication middleware
├── models
│   └── User.js         # User model
│   └── Character.js    # Character model
├── routes
│   └── auth.js         # Authentication routes
│   └── characters.js   # Character routes
├── .env                # Environment variables
├── .gitignore          # Git ignore file
├── package.json        # Project metadata and dependencies
├── server.js           # Entry point of the application
└── README.md           # Project documentation

Contributing

Contributions are welcome! Please create an issue or submit a pull request.
License

This project is licensed under the MIT License
