# ⚡ Creator Fuel

**Creator Fuel** is a full-stack crowdfunding platform designed for creators to receive support and payments directly from their audience. Built with Next.js, NextAuth, MongoDB, and Razorpay, it offers seamless social authentication and instant payment processing.

---

## 🚀 Live Demo

* **Deployed Web Application:** [https://creator-fuel-rho.vercel.app](https://creator-fuel-rho.vercel.app)

---

## ✨ Features

* 🔐 **Authentication:** Secure OAuth login via GitHub powered by **NextAuth.js**.
* 💳 **Payment Integration:** Real-time payment processing using **Razorpay API**.
* 👤 **Dynamic Creator Profiles:** Custom dynamic routing (`/[username]`) for personalized creator pages.
* 🗄️ **Database Integration:** Persistent data storage for user accounts and transaction history using **MongoDB** & **Mongoose**.
* 🎨 **Modern UI:** Responsive and modern UI built with Next.js and custom CSS styling.

---

## 🛠️ Tech Stack

* **Frontend:** Next.js (App Router), React, Standard CSS
* **Backend:** Next.js Server Actions & API Routes, Node.js
* **Database:** MongoDB Atlas (Mongoose ODM)
* **Authentication:** NextAuth.js (GitHub Provider)
* **Payment Gateway:** Razorpay API
* **Deployment:** Vercel

---

## ⚙️ Environment Variables

To run this project locally, create a `.env.local` file in the root directory and add the following keys:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_generated_nextauth_secret

# GitHub OAuth
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret

# Razorpay
NEXT_PUBLIC_KEY_ID=your_razorpay_key_id
KEY_SECRET=your_razorpay_key_secret

# Public Site URL
NEXT_PUBLIC_URL=http://localhost:3000
```

---


##💻 Getting Started
Follow these steps to set up and run the project locally:


1. Clone the Repository
```Bash
git clone [https://github.com/AdiVThakur/Creator-Fuel.git](https://github.com/AdiVThakur/Creator-Fuel.git)
cd Creator-Fuel
```
2. Install Dependencies
```Bash
npm install
```
3. Run the Development Server
```Bash
npm run dev
Open http://localhost:3000 in your browser to view the application.
```


---

📁 Project Structure
```
Plaintext
├── app/
│   ├── [username]/     # Dynamic creator profile pages
│   ├── api/            # API & NextAuth routes
│   ├── components/     # Reusable UI components
│   └── page.js         # Landing page
├── db/                 # Database connection & Mongoose models
├── models/             # Data schemas (User, Payment)
├── public/             # Static assets
└── README.md
```

---


👨‍💻 Author
Aditya Vithalrao Thakur

GitHub: @AdiVThakur

Project: Creator Fuel
