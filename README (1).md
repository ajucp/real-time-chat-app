# **Real-Time Chat Application (Node.js)**

## **📌 Overview**
This is a **real-time chat application** built using **Node.js, Express, WebSockets, Sequelize, and PostgreSQL.** It supports **JWT-based authentication, real-time messaging, bulk file uploads, and activity logging.**

---

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (Sequelize ORM)
- **Real-Time Communication**: WebSockets (Socket.io)
- **Queue Processing**: Redis + Bull
- **File Uploads**: Multer
- **Authentication**: JWT & bcrypt


---


## ✨ Features

### User Authentication
- JWT & bcrypt for security

### Real-Time Messaging
- WebSocket, typing indicator, notifications

### Message Persistence
- PostgreSQL, Sequelize

### Chat History Pagination

### Bulk File Upload AP
- Supports XLSX, PDF, JPEG, DOCX
### Queue Processing for File Uploads
- Bull + Redis

### Activity Logging
- User logins, messages sent, file uploads

---

## Installation

### Prerequisites
- Node.js (v16+)
- PostgreSQL
- Redis

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/ajucp/real-time-chat-app.git

 **Navigate to the project folder:**


- **Backend:**
  ```bash
  cd real-time-chat-app

**Install dependencies:**

```bash
npm install
```

**Configure environment variables:**

- **Backend**: Add `.env`.  

---
**Set up the .env file with the following variables:**

```bash
PORT=5000
DB_NAME=chat_app
DB_USER=chat_user
DB_PASS=yourpassword
DB_HOST=localhost
DB_DIALECT=postgres

JWT_SECRET=your_jwt_secret

REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```
**Start PostgreSQL & Redis:**


- 
  ```bash
  redis-server  # Start Redis

**Start the Application:**


- **For development mode::**
  ```bash
  npm run dev

- **For production:**
  ```bash
  npm start

**Usage:**

- **Base URL:**
  ```bash
  http://localhost:5000/api

- **🔥 API Endpoints**
**Authentication**

1. **Register a new user:**


**POST /api/auth/register**


2. **Login and receive a JWT token**


**POST /api/auth/login**


**Chat**

1. **Get paginated chat history:**


**GET /api/chat/history?user1Id=USER1&user2Id=USER2&page=1&pageSize=10**

2. **WebSocket Events**

Send a message
**sendMessage**

Typing indicator
**typing**

 **File Uploads**

1. **Upload a file (XLSX, PDF, JPEG, DOCX):**


**POST /api/files/upload**


**📝 License**

This project is open-source and available under the MIT License.