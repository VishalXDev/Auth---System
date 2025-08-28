📞 Phone OTP Auth - Backend

This is the **backend API** for the Phone OTP Authentication System.  
It handles OTP generation/verification, JWT authentication, and user session management.  
Built with **Node.js, Express, PostgreSQL, and Twilio**.

---

## 🚀 Features

- Phone-based OTP authentication (Twilio SMS)
- JWT Access & Refresh token authentication
- PostgreSQL user database
- Secure token storage (hashed OTPs, secret pepper)
- CORS enabled for frontend

---

## 📦 Installation

```bash
# Go to backend folder
cd backend

# Install dependencies
npm install
⚙️ Environment Variables
Create a .env file in the backend/ folder:

env
Copy code
# Database
DATABASE_URL=postgresql://authuser:supersecret@localhost:5432/authdb?schema=public

# App Config
NODE_ENV=development
PORT=3004
CORS_ORIGIN=http://localhost:3000

# JWT Secrets (use strong random values)
JWT_ACCESS_SECRET=your_48_byte_random_access_secret
JWT_REFRESH_SECRET=your_48_byte_random_refresh_secret

# OTP Pepper
OTP_PEPPER=your_random_pepper_value

# Twilio (for sending SMS)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1234567890
🛠 Database Setup
Make sure PostgreSQL is running:

bash
Copy code
# Create database
createdb authdb

# Run migrations (if using Prisma)
npx prisma migrate dev
▶️ Run Server
bash
Copy code
# Development
npm run dev

# Production
npm run build && npm start
Backend runs at:
👉 http://localhost:3004

✅ API Endpoints
Method	Endpoint	Description
POST	/auth/send-otp	Send OTP to phone number
POST	/auth/verify-otp	Verify OTP & return tokens
GET	/auth/me	Get logged-in user details
POST	/auth/refresh	Refresh access token
POST	/auth/logout	Logout & clear refresh token
```
