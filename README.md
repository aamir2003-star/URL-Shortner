# 🔗 LinkSift - URL Shortener & Analytics

LinkSift is a modern, high-performance, full-stack URL shortening and tracking application. Built with a responsive glassmorphic UI using React 19, Tailwind CSS v4, and Zustand, and backed by a robust Node.js, Express v5, and MongoDB architecture. 

It enables users to securely sign up, create customized short URLs, manage their link portfolio on a slick dashboard, and monitor click analytics in real-time.

---

## 🚀 Key Features

- 🔑 **Secure Authentication**: User signup, login, and session persistence using JSON Web Tokens (JWT), Bcrypt password hashing, and cookie-based storage.
- 🔗 **Instant URL Shortening**: Fast generation of custom short URL IDs utilizing unique, database-indexed hashes.
- 📊 **Real-time Click Analytics**: Automatic click counter increments on redirect, showing you exactly how much traffic your shortened links attract.
- 🖥️ **Responsive Glassmorphism UI**: Beautifully designed dashboard with modern layout, animations, hover transitions, and mobile responsiveness.
- 📂 **Full Portfolio Management**: Simple CRUD operations allowing logged-in users to list, copy, test, and delete their shortened links.
- 🐳 **Dockerized Deployment**: Production-ready container settings for rapid microservice deployment.

---

## 🛠️ Tech Stack

### Frontend
- **Framework & Tooling**: [React 19](https://react.dev/), [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **API Client**: [Axios](https://axios-http.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)

### Backend
- **Runtime Environment**: [Node.js](https://nodejs.org/)
- **Web Framework**: [Express.js v5](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose v9](https://mongoosejs.com/)
- **Cryptography & Security**: [Bcrypt](https://github.com/kelektiv/node.bcrypt.js), [JWT (jsonwebtoken)](https://github.com/auth0/node-jsonwebtoken)
- **Middleware**: `cookie-parser`, `cors`
- **ID Generator**: `short-id`

---

## 📁 Repository Structure

```text
URLShortining/
├── client/                 # React Frontend application
│   ├── src/
│   │   ├── api/            # Axios API config with credentials
│   │   ├── components/     # Reusable UI components (e.g., Navbar)
│   │   ├── pages/          # Page layouts (Home, Dashboard, Login, Register, etc.)
│   │   ├── store/          # Zustand state management stores (auth, url)
│   │   ├── App.jsx         # App Routing and global container
│   │   └── main.jsx        # App entry point
│   ├── package.json
│   ├── tailwind.config.js  # Styling configuration
│   └── vite.config.js      # Vite build configurations
│
└── server/                 # Express Backend API
    ├── src/
    │   ├── config/         # Database connection helper
    │   ├── controller/     # Controllers for Users and URLs
    │   ├── middleware/     # JWT authentication parser middleware
    │   ├── model/          # Mongoose Schemas (User, URL)
    │   └── routes/         # Express endpoint definitions
    ├── Dockerfile          # Node-Alpine deployment build file
    ├── index.js            # Express API entry point
    └── package.json
```

---

## ⚡ Quick Start & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) (running locally on port `27017` or a cloud-hosted MongoDB Atlas URI)
- [Docker](https://www.docker.com/) (optional, for containerization)

---

### Backend Setup

1. **Navigate to the server directory**:
   ```bash
   cd server
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root of the `server/` directory and configure your server variables:
   ```env
   PORT=3000
   JWT_SECRET=your_super_secure_jwt_secret_phrase
   CLIENT_URL=http://localhost:5173
   MONGO_URI=mongodb://localhost:27017/short-url
   ```
   *Note: For MongoDB Atlas, set `MONGO_URI` to your Atlas connection string (e.g., `mongodb+srv://...`).*

4. **Start the development server** (runs on port `3000` with hot reloading):
   ```bash
   npm run dev
   ```

---

### Frontend Setup

1. **Navigate to the client directory**:
   ```bash
   cd ../client
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root of the `client/` directory and configure your backend endpoint URL:
   ```env
   VITE_BACKEND_URL=http://localhost:3000
   ```
   *(For deployment, change this to your deployed backend URL, e.g., `https://url-shortner-9sxd.onrender.com`)*

4. **Start the Vite dev server** (runs on `http://localhost:5173`):
   ```bash
   npm run dev
   ```

---

## 🐳 Docker Deployment (Server)

You can containerize the server using the provided `Dockerfile`.

1. **Build the Docker Image**:
   ```bash
   docker build -t url-shortener-server ./server
   ```

2. **Run the Container**:
   ```bash
   docker run -p 3000:3000 --env JWT_SECRET=mysecret -d url-shortener-server
   ```

---

## 📡 API Reference

### 🔐 User Authentication (`/api/user`)

| Method | Endpoint | Description | Auth Required | Request Body |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/register` | Create a new user account | No | `{ "username": "...", "email": "...", "password": "..." }` |
| **POST** | `/login` | Authenticate user & set secure cookie | No | `{ "email": "...", "password": "..." }` |
| **POST** | `/logout` | Invalidate token and clear user session | No | None |
| **GET** | `/me` | Get the logged-in user profile details | **Yes** | None |

### 🔗 URL Shortening & Redirects (`/api/url`)

| Method | Endpoint | Description | Auth Required | Request Body |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/` | Shorten a target URL | **Yes** | `{ "url": "https://example.com" }` |
| **GET** | `/my-urls` | Retrieve all shortened URLs by the user | **Yes** | None |
| **DELETE** | `/:id` | Delete a shortened URL entry | **Yes** | None |
| **GET** | `/r/:shortID` | Retrieve redirect entry (internal) | No | None |

### 🚀 Direct Link Redirection (Root)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| **GET** | `/r/:shortID` | Increments click counter and redirects browser to destination URL | No |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page or submit pull requests to enhance the project.

---

## 📝 License

This project is licensed under the ISC License.
