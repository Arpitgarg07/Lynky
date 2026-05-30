# 🚀 Lynky — Hyperlocal Worker Marketplace on WhatsApp

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-Backend-green?style=for-the-badge\&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-darkgreen?style=for-the-badge\&logo=mongodb)
![WhatsApp](https://img.shields.io/badge/WhatsApp-Bot-25D366?style=for-the-badge\&logo=whatsapp)
![Baileys](https://img.shields.io/badge/Baileys-WhatsApp_Web_API-blue?style=for-the-badge)

### ⚡ WhatsApp-first hyperlocal marketplace for connecting customers with local workers instantly.

</div>

---

# 📌 Overview

Lynky is a conversational marketplace built on top of WhatsApp.

Instead of downloading apps, users can directly:

* find local workers
* register as workers
* browse services
* connect hyperlocally

through a simple WhatsApp chat flow.

The system is designed as a lightweight operational MVP focused on:

* fast onboarding
* conversational UX
* hyperlocal matching
* scalable backend architecture

---

# ✨ Features

## 👤 Customer Side

* 🔍 Find workers by:

  * Service
  * State
  * City
  * Locality

* ⚡ Instant worker matching

* 📱 WhatsApp conversational flow

* 🗂 Dynamic MongoDB queries

* 🧠 State-based interaction system

---

## 👷 Worker Side

* 📝 Self-registration through WhatsApp
* 📍 Hyperlocal onboarding
* 🚫 Duplicate phone prevention
* 💾 MongoDB data storage
* 🔄 Dynamic service selection

---

# 🏗 Architecture

```bash id="9akp21"
WhatsApp User
      │
      ▼
Baileys WhatsApp Socket
      │
      ▼
Message Router (whatsapp.js)
      │
 ┌───────────────┐
 ▼               ▼
Customer Flow    Worker Flow
Handler           Handler
 │                 │
 ▼                 ▼
MongoDB Database (Workers)
```

---

# 🧠 Core Concepts

## 🔄 Conversational Workflow Engine

Lynky is not just a chatbot.

It works as a:

* state-driven workflow engine
* hyperlocal matching system
* two-sided marketplace backend

Every interaction updates conversational state dynamically.

---

# 🛠 Tech Stack

| Technology    | Purpose               |
| ------------- | --------------------- |
| Node.js       | Backend Runtime       |
| Baileys       | WhatsApp Web API      |
| MongoDB Atlas | Cloud Database        |
| Mongoose      | Database Modeling     |
| Nodemon       | Development Server    |
| dotenv        | Environment Variables |

---

# 📂 Project Structure

```bash id="8zqk11"
src/
│
├── database/
│   ├── db.js
│   └── seedWorkers.js
│
├── handlers/
│   ├── customerHandler.js
│   └── workerHandler.js
│
├── models/
│   └── Worker.js
│
├── socket/
│   └── whatsapp.js
│
├── utils/
│   ├── helpers.js
│   ├── locationHelpers.js
│   ├── locations.js
│   ├── serviceHelpers.js
│   ├── services.js
│   └── userState.js
│
└── index.js
```

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash id="9q1xa2"
git clone https://github.com/Arpitgarg07/Lynky.git

cd Lynky
```

---

## 2️⃣ Install Dependencies

```bash id="0pa21d"
npm install
```

---

## 3️⃣ Setup Environment Variables

Create a `.env` file:

```env id="p1z2x9"
PORT=5000

MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
```

---

# ▶️ Running The Project

## Development Mode

```bash id="9s7x21"
npm run dev
```

---

# 📲 WhatsApp Authentication

When the server starts:

* QR code appears in terminal
* Scan using:

  * WhatsApp
  * Linked Devices

After successful login:

* session automatically stored in `/auth`

---

# 🌱 Seed Sample Workers

```bash id="x1ak2p"
node src/database/seedWorkers.js
```

---

# 💬 Available Commands

## 🚀 Start Customer Flow

```text id="z8x2k1"
hi
hello
start
```

---

## 👷 Join as Worker

```text id="o2x9qa"
join
```

---

# 🔄 Customer Flow

```text id="8x92ka"
Start
  ↓
Select Service
  ↓
Select State
  ↓
Select City
  ↓
Select Locality
  ↓
Get Available Workers
```

---

# 🔄 Worker Flow

```text id="92kxa1"
join
  ↓
Enter Name
  ↓
Enter Phone Number
  ↓
Select Service
  ↓
Select State
  ↓
Select City
  ↓
Select Locality
  ↓
Registration Complete
```

---

# 🚧 Current Limitations

The system is currently an MVP.

Current limitations:

* in-memory session state
* no booking lifecycle
* no payment integration
* no worker availability tracking
* no admin moderation dashboard

These are intentionally postponed until workflow validation succeeds.

---

# 🛣 Future Roadmap

## Phase 1

* ✅ WhatsApp onboarding
* ✅ Worker registration
* ✅ MongoDB integration
* ✅ Dynamic worker matching

---

## Phase 2

* 📦 Booking request system
* 📲 Worker notifications
* 📍 Live availability
* ⭐ Ratings & reviews
* 🔔 Admin moderation

---

## Phase 3

* 🌐 Web dashboard
* 📱 Mobile application
* 💳 Payments
* 🤖 AI automation
* 📊 Analytics & insights

---

# 🎯 Vision

Build a unified hyperlocal marketplace where users can find:

* electricians
* plumbers
* cleaners
* cooks
* mehndi artists
* home services
* local skilled workers

through a lightweight WhatsApp-first experience optimized for Indian users.

---

# 👨‍💻 Author

### Arpit Garg

B.Tech Student • Backend Workflow Systems • Hyperlocal Marketplace Builder

---

<div align="center">

### ⭐ If you like this project, consider giving it a star.

</div>
