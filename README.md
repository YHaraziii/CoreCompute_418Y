# CoreCompute 🧠
**University at Albany - ICSI 418Y Final Project**

CoreCompute is a comprehensive, full-stack computer science learning platform. It is designed to assist students by generating personalized learning roadmaps, tracking academic progress, visualizing knowledge dependencies, and curating structured educational resources.

## 🚀 Features
* **Custom Learning Pathways:** Dynamic node-based visual flowcharts generated from user skills, interests, and career goals.
* **Knowledge Gap Analyzer:** A split-screen algorithm that cross-references a user's mastered skills against industry requirements to identify missing knowledge.
* **Interactive Dashboard:** Persistent progress tracking (Started, In-Progress, Mastered) that recalculates course completion rates.
* **Resource Center & Gamification:** A curated, filterable repository of real-world educational links, equipped with "Favorites" bookmarking and a daily Learning Streak calculator.
* **System Admin Portal:** A secure backend interface for moderators to monitor system uptime, user statistics, and push new curriculum directly to the live cloud database.

## 💻 Tech Stack
* **Frontend:** React.js, Vite, Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas (NoSQL)
* **Authentication:** JWT (JSON Web Tokens), bcrypt hashing

## ⚙️ Local Installation
To run this project locally, ensure you have Node.js installed.

1. **Clone the repository:** `git clone https://github.com/YHaraziii/CoreCompute_418Y.git`
2. **Install Backend Dependencies:** `cd backend` -> `npm install`
3. **Install Frontend Dependencies:** `cd frontend` -> `npm install`
4. **Start the Servers:**
   * Terminal 1 (Backend): `npx nodemon server.js`
   * Terminal 2 (Frontend): `npm run dev`

## 👨‍💻 Team 02
* Ahmed Al-Mashraie (Architecture & Admin Portal)
* Yousef Al-Harazi (Learning Path Generator)
* Zakar Pirzada (Resource Center & Streak Tracking)
* Salman Hossain Khan (Authentication & Routing)
* Hisham Naina (Knowledge Gap Analyzer)
