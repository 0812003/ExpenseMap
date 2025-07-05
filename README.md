📊 **Expense Map SaaS Platform**

A fully-featured SaaS Expense Tracker built with MERN Stack (MongoDB, Express, React, Node.js) and enhanced with:

-🔐 Secure Authentication (JWT + Google OAuth)
-👤 User Dashboard with email verification
-🧾 Expense tracking with categories, notes, and filtering
-📈 Summary & insights page 
-💼 Admin & User Panels (coming soon)


🚀 Features


✅ Authentication & Authorization

-Register & Login with JWT

-Google Sign-In via OAuth 2.0

-Email verification with OTP

-Password reset with email OTP


✅ Expense Management

-Add, view, update, and delete expenses

-Categorize and note each expense

-Real-time UI updates

-Scrollable list with a clean responsive design


✅ Tech Stack

-Frontend: React, Tailwind CSS

-Backend: Node.js, Express.js

-Database: MongoDB (Mongoose)

-Authentication: JWT, Google OAuth

-Email: Nodemailer with Gmail SMTP

⚙️ Setup Instructions
Clone the Repository
```
git clone https://github.com/your-username/expense-tracker-saas.git
cd expense-tracker-saas
```

Setup Backend
```
cd backend
npm install
cp .env.example .env   # Fill in MongoDB URI, JWT, Google OAuth creds
npm run dev
```

Setup Frontend
```
npm install
npm run dev
```

