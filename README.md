# 📝 Smart Notes

A modern full-stack note-taking application built with the MERN stack, featuring secure JWT authentication, password recovery, and a clean responsive user experience.

## 🚀 Live Demo

🌐 Frontend: https://smart-notes-app-wheat.vercel.app

⚙️ Backend API: https://smart-notes-app-nt7z.onrender.com

---

## 📸 Preview

<img width="1897" height="916" alt="image" src="https://github.com/user-attachments/assets/6c1c1c22-3934-484f-98dd-520e875fd60f" />
<img width="1913" height="955" alt="image" src="https://github.com/user-attachments/assets/1a51e2fe-ddbd-4682-8018-9e9b6a1b1d1d" />
<img width="1912" height="956" alt="image" src="https://github.com/user-attachments/assets/edf0027c-7fe1-42a9-b5cd-72e27b151f6c" />

---

## ✨ Features

### Authentication

* Secure User Registration
* JWT-Based Login System
* Protected Routes
* Persistent Authentication
* Logout Functionality
* Forgot Password Flow
* Password Reset via Email

### Notes Management

* Create Notes
* Read Notes
* Update Notes
* Delete Notes
* Real-Time Dashboard Updates
* Search Notes

### User Experience

* Responsive Design
* Modern UI/UX
* Clean Dashboard Layout
* Fast API Communication
* Error Handling & Validation

---

## 🛠 Tech Stack

### Frontend

* React.js
* Vite
* Axios
* React Router

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcrypt.js
* Nodemailer

### Database

* MongoDB Atlas
* Mongoose ODM

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## 📂 Project Structure

```bash
Smart-Notes/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── server.js
│
└── README.md
```

---

## 🔐 Environment Variables

### Client

```env
VITE_API_URL=YOUR_BACKEND_URL
```

### Server

```env
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET_KEY
EMAIL_USER=YOUR_EMAIL
EMAIL_PASS=YOUR_EMAIL_PASSWORD
CLIENT_URL=YOUR_FRONTEND_URL
```

---

## ⚡ Installation & Setup

### Clone Repository

```bash
git clone [https://github.com/your-username/smart-notes.git](https://github.com/Vanshika-OFFICIAL/smart-notes-app)
cd smart-notes
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

### Backend Setup

```bash
cd server
npm install
npm run dev
```

---

## API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/forgot-password
POST /api/auth/reset-password/:token
```

### Notes

```http
GET    /api/notes
POST   /api/notes
PUT    /api/notes/:id
DELETE /api/notes/:id
```

---

## 🎯 Learning Outcomes

Through this project I gained hands-on experience with:

* MERN Stack Development
* REST API Design
* JWT Authentication
* MongoDB Atlas Integration
* Secure Password Handling
* Email Services with Nodemailer
* Frontend & Backend Deployment
* Environment Variable Management
* Production Debugging & CORS Handling

---

## ⭐ Support

If you found this project useful, consider giving it a star on GitHub.
