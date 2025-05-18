# 📓 JournalApp - Portfolio app by Trishna Sharma Mou

**🚀 Live Demo:** [https://journal-app-lilac-seven.vercel.app/](https://journal-app-lilac-seven.vercel.app/)

---

## 🌟 Overview

JournalApp is a full-stack web application designed to demonstrate **C**reate, **R**ead, **U**pdate (via new post creation), and **D**elete (CRUD) operations for journal entries. Users can register, log in, manage their journal entries through a rich text editor, and view their posts. This project showcases the integration of the **MERN stack** (MongoDB, Express.js, React, Node.js) with modern frontend tooling like Vite and Tailwind CSS.

---

## 🛠️ Tech Stack

### 💻 Frontend
*   **React** (with Vite for build tooling)
*   JavaScript (ES6+)
*   **Tailwind CSS** (for styling)
*   Axios (for HTTP requests)
*   **TinyMCE** (for rich text editing)
*   React Router (for client-side routing)

### ⚙️ Backend
*   Node.js
*   **Express.js**
*   **MongoDB** (with Mongoose for ODM)

### 🔑 Authentication
*   JSON Web Tokens (JWT)

### ☁️ Deployment
*   Frontend: **Vercel** (Static Site Hosting)
*   Backend: **Vercel** (Serverless Functions)

---

## ✨ Features

*   👤 User Authentication (Signup & Signin)
*   🔑 JWT-based session management
*   ✍️ Create new journal entries using a rich text editor
*   📖 View a list of all personal journal entries
*   📄 View a single journal entry in detail
*   🗑️ Delete personal journal entries
*   📱 Responsive design for various screen sizes

---

## 📂 Project Structure

*   **`Frontend/`**: Contains the React application (built with Vite).
    *   `src/components/`: Reusable UI components (e.g., AppBar, BlogCard, Auth form).
    *   `src/pages/`: Top-level page components (e.g., Blogs, Signin, Signup, Publish).
    *   `src/hooks/`: Custom React hooks (e.g., `useBlogs` for fetching data).
    *   `src/config.js`: Frontend configuration (e.g., backend URL).
    *   `vite.config.js`: Vite configuration.
    *   `tailwind.config.js`: Tailwind CSS configuration.
    *   `vercel.json`: Vercel deployment configuration for SPA routing.
*   **`Backend/`**: Contains the Node.js and Express.js server application.
    *   `routes/`: API route definitions (e.g., `user.js` for auth, `post.js` for journal entries).
    *   `db.js`: MongoDB connection and schema definitions (User, Post).
    *   `config.js`: Backend configuration (e.g., `JWT_SECRET`, MongoDB URI).
    *   `index.js`: Main Express server setup.
    *   `vercel.json`: Vercel deployment configuration for the backend.

---

## 🔁 Core Functionality & Flow

### 1. User Authentication

*   **Signup (`Frontend/src/components/auth.jsx` -> `POST /api/v1/user/signup`):**
    1.  User provides a username and password.
    2.  Frontend sends credentials to the backend.
    3.  Backend validates input, hashes the password, and creates a new user in MongoDB.
    4.  A JWT is generated, signed with the `JWT_SECRET` (from `Backend/config.js`), containing the `userId`.
    5.  The JWT is sent back to the frontend.
*   **Signin (`Frontend/src/components/auth.jsx` -> `POST /api/v1/user/signin`):**
    1.  User provides their username and password.
    2.  Frontend sends credentials to the backend.
    3.  Backend finds the user, compares the hashed password.
    4.  If valid, a new JWT is generated and sent to the frontend.
*   **Token Handling (Frontend):**
    *   Upon successful signup/signin, the raw JWT (without any "Bearer" prefix) is stored in the browser's `localStorage` under the key `"token"`.
    *   For subsequent authenticated API calls, the token is retrieved from `localStorage`, and the `Authorization` header is set to `Bearer ${token}`.
*   **Protected Routes & Middleware (Backend - `Backend/routes/post.js`):**
    *   An `authMiddleware` is applied to all journal-related routes (`/api/v1/blog/*`).
    *   This middleware checks for an `Authorization` header starting with `Bearer `.
    *   It extracts the token, verifies it using `jwt.verify()` and the `JWT_SECRET`.
    *   If the token is valid, `req.userId` is populated from the decoded token, and the request proceeds.
    *   If the token is missing, malformed, or invalid, a `401 Unauthorized` error is returned.

### 2. Journal CRUD Operations

All journal operations require the user to be authenticated.

*   **Create Journal Entry (`Frontend/src/components/tinyText.jsx` -> `POST /api/v1/blog/post`):**
    1.  User navigates to the "Publish" page.
    2.  They enter a title and use the TinyMCE rich text editor for the content.
    3.  On clicking "Publish Journal", the frontend sends the title, content, and the JWT in the `Authorization` header to the backend.
    4.  The backend's `authMiddleware` validates the token.
    5.  A new `Post` document is created in MongoDB, associating it with the authenticated `userId`.
    6.  The ID of the newly created post is returned.
*   **Read All Journal Entries (`Frontend/src/pages/blogs.jsx` using `Frontend/src/hooks/index.js/useBlogs` -> `GET /api/v1/blog/bulk`):**
    1.  When the "Blogs" page loads, the `useBlogs` hook is triggered.
    2.  An API call is made with the JWT in the `Authorization` header.
    3.  The backend's `authMiddleware` validates the token.
    4.  The backend fetches all posts from MongoDB where the `author` matches the authenticated `userId`, populating author details.
    5.  The list of posts is returned to the frontend and displayed using `BlogCard` components.
*   **Read Single Journal Entry (`Frontend/src/components/blogPage.jsx` using `Frontend/src/hooks/index.js/useBlog` -> `GET /api/v1/blog/:id`):**
    1.  When a user navigates to a specific blog post's page, the `useBlog` hook is triggered with the post ID.
    2.  An API call is made with the JWT in the `Authorization` header.
    3.  The backend's `authMiddleware` validates the token.
    4.  The backend fetches the specific post by its ID from MongoDB, populating author details.
    5.  The post data is returned and displayed.
*   **Delete Journal Entry (`Frontend/src/components/blogCard.jsx` -> `DELETE /api/v1/blog/:id`):**
    1.  User clicks the "Delete" button on a `BlogCard`.
    2.  The frontend sends a DELETE request to the backend with the post ID and the JWT in the `Authorization` header.
    3.  The backend's `authMiddleware` validates the token.
    4.  The backend retrieves the post, verifies that the `post.author` matches the authenticated `req.userId`.
    5.  If authorized, the post is deleted from MongoDB.
    6.  A success message is returned.

---

## ⚙️ Setup and Local Development

**Prerequisites:**
*   Node.js (v18 or later recommended)
*   npm (comes with Node.js)
*   MongoDB instance (local or cloud-hosted like MongoDB Atlas)
*   A `.env` file in the `Backend` directory with your `DATABASE_URL` and optionally `JWT_SECRET`.

**Backend:**
1.  Navigate to the `Backend` directory: `cd Backend`
2.  Create a `.env` file and add your MongoDB connection string and JWT secret:
    ```env
    DATABASE_URL="your_mongodb_connection_string"
    JWT_SECRET="your_super_secret_key_here_or_it_defaults"
    PORT=3000 
    ```
    *(Note: `config.js` has a default `JWT_SECRET` if not provided in `.env`)*
3.  Install dependencies: `npm install`
4.  Start the backend server: `npm run dev` (or `npm start` if you have that script) - usually runs on `http://localhost:3000`.

**Frontend:**
1.  Navigate to the `Frontend` directory: `cd Frontend`
2.  Install dependencies: `npm install`
3.  (Optional) If your backend is running on a port other than the default fallback in `src/config.js`, you might need to adjust `REACT_APP_BACKEND_URL` in `Frontend/src/config.js` or use a `.env` file with `VITE_REACT_APP_BACKEND_URL`.
4.  Start the frontend development server: `npm run dev` - usually runs on `http://localhost:5173`.

---

## 🚀 Deployment

Both frontend and backend are configured for deployment on **Vercel**:

*   **Backend (`Backend/vercel.json`):** Deployed as a Node.js serverless function. Vercel handles the build and routing. Environment variables (like `DATABASE_URL`, `JWT_SECRET`) need to be set in the Vercel project settings.
*   **Frontend (`Frontend/vercel.json`):** Deployed as a static site. The `vercel.json` includes rewrite rules to ensure proper routing for a Single Page Application (SPA), directing all paths to `index.html`.

---

## 🌱 Evolution & Key Learnings

This project evolved through several troubleshooting and refinement stages:

*   **CORS Configuration:** Addressed Cross-Origin Resource Sharing errors by correctly configuring the `cors` middleware in the Express backend, ensuring the `origin` list in `corsOptions` was appropriate for local development and Vercel deployments.
*   **Dependency Management:** Resolved a backend `TypeError: Missing parameter name at 1: https://git.new/pathToRegexpError` by downgrading from a pre-release version of Express.js (v5.x) to a stable version (v4.x).
*   **JWT Authentication Flow:**
    *   Initially, `"Bearer "` was mistakenly stored with the token in `localStorage`, leading to a `"Bearer Bearer <token>"` issue. This was fixed by storing only the raw token in `localStorage` from `auth.jsx`.
    *   Subsequently, components making GET requests were sending the raw token without the `"Bearer "` prefix. This was corrected by ensuring all API calls in hooks (`useBlogs`, `useBlog`) and components (`tinyText.jsx`) correctly prepend `"Bearer "` to the token in the `Authorization` header.
*   **Vercel SPA Routing:** Corrected `Frontend/vercel.json` to use ` { "handle": "filesystem" }` followed by a catch-all rewrite to `index.html`. This resolved "Failed to load module script" errors by ensuring Vercel serves `index.html` for client-side routes while still allowing direct access to static assets.
*   **Environment Variables:** Clarified the use of `VITE_` prefix for environment variables in Vite projects for client-side access, although for `REACT_APP_BACKEND_URL` it was mostly hardcoded or defaulted.

This iterative process was crucial for stabilizing the application and ensuring correct functionality across different environments.

---

## 🎬 Demo Video

