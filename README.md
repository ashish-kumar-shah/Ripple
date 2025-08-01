﻿# 🚀 Social Media App Backend — Documentation

A **Node.js + Express + MongoDB** backend for a modern social app, with authentication, posts, likes, comments, followers, notifications, Redis caching, Cloudinary uploads, and Socket.IO for real-time updates.

---
Live on 🔗https://ripple-dpt6.onrender.com/
---
## 📌 Tech Stack

- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **JWT** authentication
- **Redis** for caching
- **Cloudinary** for file storage
- **Multer** for uploads
- **Socket.IO** for real-time notifications
- **bcrypt** for password hashing

---

## 📂 Project Structure

```
/Config
  ├─ Cloudinary.js
  ├─ Redis.js

/Controller
  ├─ User/
  ├─ Post/
  ├─ Services/

/Middleware
  ├─ Upload.js

/Models
  ├─ User.js
  ├─ Post.js
  ├─ Comment.js
  ├─ Likes.js
  ├─ Friends.js
  ├─ Notification.js

/Routes
  ├─ Auth.js
  ├─ Post.js
  ├─ User.js

/Socket
  ├─ Socket.js

/Utility
  ├─ JWT.js
  ├─ Cache.js
```

---

## 🔐 Authentication

- **Register**
  - `POST /register`  
    Validates fields, hashes password, saves user, issues JWT cookie (`5h`).
- **Login**
  - `POST /login`  
    Checks credentials, returns JWT cookie (`5h`).
- **Logout**
  - `GET /logout`  
    Clears JWT cookie.
- **Verify Token**
  - `verifyToken` middleware  
    Reads JWT from cookies, verifies, attaches `req.userId`.

---

## 📸 Cloudinary Uploads

- **Config**: `Config/Cloudinary.js`  
  Uses `cloud_name`, `api_key`, `api_secret` from `.env`.

- **Profile Avatar**
  - `PATCH /updateavtar`  
    Uploads image, updates `User` `avatar` field, cleans temp file, clears user cache.

- **Post Media**
  - `POST /createpost`  
    Uploads images/videos, stores `public_id` and `secure_url` in `Post`.

---

## 📝 Posts

- **Create**
  - `POST /createpost`  
    `Multer` uploads files → `Cloudinary` → creates `Post` → updates user `postCount` → clears user cache.

- **Fetch All**
  - `GET /getposts/:page`  
    Paginated, sorted by `createdAt`.

- **Fetch By ID**
  - `GET /getpostbyid/:postId`  
    Populates user info.

---

## ❤️ Likes

- **Like/Unlike**
  - `POST /likepost`  
    Toggle like, increment/decrement `Post` `likeCount`. Emits notification to post owner.

- **Get Likes**
  - `GET /liked`  
    Fetch posts liked by logged-in user.

---

## 💬 Comments

- **Create**
  - `POST /createcommnet`  
    Saves comment, updates `Post` `commentCount`. Emits + saves notification to post owner.

- **Fetch By Post**
  - `GET /comment/:postId`  
    Lists all comments for a post.

---

## 👥 Friends

- **Follow**
  - `POST /createfriend`  
    Follows another user, updates counts, clears related cache.

- **Friend List**
  - `GET /friendlist`  
    Returns followers & following.

---

## 🔔 Notifications

- **Unread**
  - `GET /notifications`  
    Get all unread.

- **Mark as Read**
  - `GET /mark/:id`  
    Marks notification as read.

---

## 🧩 User Services

- **Search**
  - `GET /searchuser?q=`  
    Fuzzy search by `username` or `name`.

- **Profile**
  - `GET /profile/:username`  
    Cached. Returns user info & posts.

- **Update Fields**
  - `PATCH /updatefields`  
    Dynamically update `name`, `username`, `email`, `bio`, `password`.

---

## ⚡ Redis Caching

- `Config/Redis.js`  
  Creates Redis client & connects.
- `Utility/Cache.js`  
  `getCache`, `setCache`, `deleteCache`, `getOrSetCache`.

---

## 🔌 Socket.IO

- `Socket/Socket.js`
  - `initSocket(server)` initializes Socket.IO.
  - `emitToUser` sends real-time events.
  - Stores `connectedUsers` map for direct emits.

---

## ✅ Auth Routes Summary

```
POST   /register
POST   /login
GET    /logout
GET    /authenticate
```

---

## ✅ Post Routes Summary

```
POST   /createpost
GET    /getposts/:page
POST   /likepost
GET    /liked
POST   /createcommnet
GET    /comment/:postId
```

---

## ✅ User/Service Routes Summary

```
GET    /profile/:username
GET    /searchuser?q=
POST   /createfriend
GET    /friendlist
GET    /notifications
GET    /mark/:id
GET    /getpostbyid/:postId
PATCH  /updateavtar
PATCH  /updatefields
```

---

## 📌 Notes

- **JWT** expires in **5 hours** — adjust in `/register` & `/login`.
- **Redis** used for user profile caching.
- **Cloudinary** cleans temp files after upload.
- **Socket.IO** notifies users in real-time for likes & comments.
- Notifications also saved in DB for offline fallback.

---

✅ **Keep your `.env` safe!**

```env
DB_URI=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
REDIS_URL=
ORIGIN=
```

---

---
# Ripple
