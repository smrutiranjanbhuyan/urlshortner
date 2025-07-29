# URL Shortener

This is a full-stack web application that allows users to shorten long URLs, similar to services like Bitly or TinyURL. It's built with Node.js, Express, and MongoDB, and it features user authentication, a personal dashboard, and visit tracking for each shortened link.

## Table of Contents

-   [Features](#features)
-   [How It Works](#how-it-works)
-   [Tech Stack](#tech-stack)
-   [Project Structure](#project-structure)
-   [Setup and Installation](#setup-and-installation)
-   [Key Concepts for an Interview](#key-concepts-for-an-interview)

## Features

*   **User Authentication**: Secure user signup and login system. Passwords are encrypted using `bcrypt`.
*   **URL Shortening**: Authenticated users can generate a unique, short alias for any long URL.
*   **Redirection**: The short URL seamlessly redirects to the original long URL.
*   **Visit History**: Tracks the timestamp of every visit to a shortened URL.
*   **User Dashboard**: After logging in, users can view a list of all the URLs they have shortened.
*   **Automatic URL Expiration**: Shortened URLs are automatically removed from the database after 30 days using a MongoDB TTL index to keep the system efficient.
*   **Responsive UI**: A simple and clean user interface built with EJS and basic CSS for a good user experience.

## How It Works

1.  **User Management**:
    *   A new user signs up with their name, email, and password. The password is securely hashed using `bcrypt` before being stored in the database.
    *   When a user logs in, the system verifies their credentials. Upon success, a stateless **JSON Web Token (JWT)** is generated and stored in an `httpOnly` cookie. This token contains the user's identity and is sent with every subsequent request to authenticate the user.

2.  **URL Shortening**:
    *   An authenticated user submits a long URL through their dashboard.
    *   The backend uses the `shortid` library to generate a unique short string.
    *   This `shortId`, the original `redirectUrl`, and the `userId` of the creator are saved as a new document in the `urls` collection in MongoDB.
    *   The user is then redirected back to their dashboard, where the new short URL is displayed.

3.  **Redirection**:
    *   When anyone accesses `http://your-domain.com/:shortId`, the server retrieves the `shortId` from the URL parameters.
    *   It queries the database to find the document matching this `shortId`. This lookup is very fast due to an index on the `shortId` field.
    *   If found, it pushes a new timestamp into the `visitHistory` array for analytics and then performs a 302 redirect to the original `redirectUrl`.
    *   If not found, it returns a 404 "Not Found" error.

## Tech Stack

*   **Backend**: Node.js, Express.js
*   **Database**: MongoDB with Mongoose ODM
*   **View Engine**: EJS (Embedded JavaScript templates)
*   **Authentication**: Stateless authentication using **JSON Web Tokens (JWT)**. Passwords are hashed with `bcrypt`.
*   **ID Generation**: `shortid` for creating unique URL aliases.
*   **Environment Variables**: `dotenv` for managing configuration securely.

## Project Structure

The project follows a Model-View-Controller (MVC) architecture to keep the code organized and maintainable.

```
.
├── controllers/        # Logic for handling requests (Controller)
├── middlewares/        # Custom middleware (e.g., authentication)
├── models/             # Mongoose schemas for the database (Model)
├── public/             # Static assets (CSS, images)
├── routes/             # Express route definitions
├── service/            # Services (e.g., session management)
├── views/              # EJS template files (View)
├── .env                # Environment variables (PORT, DB URI)
├── connect.js          # MongoDB connection logic
├── index.js            # Main application entry point
└── package.json        # Project dependencies and scripts
```

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/smrutiranjanbhuyan/urlshortner.git
    cd urlshortner
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add the following variables. Ensure you have a local or remote MongoDB instance running.

    ```
    PORT=8001
    URI=mongodb://127.0.0.1:27017/urlshortner
    ```

4.  **Run the application:**
    ```bash
    npm start
    ```
    The server will start on the port specified in your `.env` file (e.g., http://localhost:8001).

