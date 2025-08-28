📌 `frontend/README.md`

````markdown
# 📱 Phone OTP Auth - Frontend

This is the **frontend app** for the Phone OTP Authentication System.  
Built with **Next.js, React, TailwindCSS, Axios**.

---

## 🚀 Features

- Phone number OTP login form
- API integration with backend
- Stores JWT access token in cookies
- Responsive UI (mobile, tablet, desktop)
- Shows system status (local & production)

---

## 📦 Installation

```bash
# Go to frontend folder
cd frontend

# Install dependencies
npm install
⚙️ Environment Variables
Create a .env.local file in frontend/:

env
Copy code
# Local backend
NEXT_PUBLIC_API_URL_LOCAL=http://localhost:3004

# Production backend
NEXT_PUBLIC_API_URL=https://auth-system-rplm.onrender.com
▶️ Run App
bash
Copy code
# Development
npm run dev

# Production build
npm run build && npm start
Frontend runs at:
👉 http://localhost:3000

✅ Pages
/ → Login (enter phone & OTP)

/profile → Profile (shows logged-in user)

Status Badge shows:

Local backend URL

Production backend URL

🔗 Backend Setup
Make sure backend (http://localhost:3004) is running before testing the frontend.
```
````
