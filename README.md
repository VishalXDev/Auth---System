# 📱 Phone OTP Authentication System

A modern, secure phone-based OTP authentication system built with Next.js, Express.js, and PostgreSQL. Features a beautiful, responsive UI with seamless user experience.

![Phone Auth Hero](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white)

## ✨ Features

### 🔐 Authentication

- **Phone OTP Verification** - Secure 6-digit OTP authentication
- **JWT Tokens** - Access & refresh token implementation
- **Rate Limiting** - IP and phone-based rate limiting
- **Secure Hashing** - Argon2 password hashing with salt & pepper
- **Session Management** - Automatic token refresh and logout

### 🎨 Modern UI/UX

- **Responsive Design** - Mobile-first, works on all devices
- **Gradient Animations** - Beautiful gradient backgrounds and hover effects
- **Loading States** - Smooth loading animations and transitions
- **Error Handling** - User-friendly error messages and validation
- **Dark Mode Ready** - Clean, modern design system

### 🛡️ Security Features

- **E.164 Phone Validation** - International phone number format support
- **OTP Expiration** - 5-minute OTP timeout
- **Attempt Limiting** - Maximum 5 OTP attempts per challenge
- **CORS Protection** - Configurable CORS origins
- **Helmet Security** - Security headers and protection
- **Cookie Security** - HttpOnly, Secure, SameSite cookies

## 🏗️ Tech Stack

### Backend

- **Framework**: Express.js + TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: JWT (jsonwebtoken)
- **Security**: Argon2, Helmet, Rate Limiting
- **Validation**: Zod schema validation
- **Logging**: Pino structured logging

### Frontend

- **Framework**: Next.js 14 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios with interceptors
- **State Management**: React Hooks
- **Routing**: Next.js App Router

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL database
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd phone-auth-system
   ```

2. **Backend Setup**

   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

### Configuration

1. **Backend Environment** (`backend/.env`)

   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/phone_auth"

   # Server
   NODE_ENV="development"
   PORT=3004
   CORS_ORIGIN="http://localhost:3000"

   # JWT Secrets (generate with: openssl rand -base64 32)
   JWT_ACCESS_SECRET="your-super-secret-access-key-min-32-chars"
   JWT_REFRESH_SECRET="your-super-secret-refresh-key-min-32-chars"

   # OTP Security
   OTP_PEPPER="your-secret-pepper-min-16-chars"
   ```

2. **Frontend Environment** (`frontend/.env.local`)
   ```env
   NEXT_PUBLIC_API_URL="http://localhost:3004"
   ```

### Database Setup

1. **Run Prisma migrations**

   ```bash
   cd backend
   npx prisma migrate dev --name init
   npx prisma generate
   ```

2. **Optional: View database**
   ```bash
   npx prisma studio
   ```

### Running the Application

1. **Start Backend** (Terminal 1)

   ```bash
   cd backend
   npm run dev
   ```

   Backend runs on: `http://localhost:3004`

2. **Start Frontend** (Terminal 2)
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend runs on: `http://localhost:3000`

## 📱 Usage

### Authentication Flow

1. **Register/Login**

   - Visit `http://localhost:3000/login`
   - Enter phone number in E.164 format (e.g., `+919876543210`)
   - Click "Send OTP"

2. **Verify OTP**

   - Check console logs for OTP code (development mode)
   - Enter the 6-digit code
   - Click "Verify & Continue"

3. **Access Profile**
   - View user profile at `/profile`
   - Update name and view account details
   - Logout securely

### API Endpoints

#### Authentication Routes (`/auth`)

- `POST /auth/register` - Register user with phone
- `POST /auth/send-otp` - Send OTP to phone
- `POST /auth/verify-otp` - Verify OTP and login
- `GET /auth/profile` - Get user profile (protected)
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - Logout and revoke tokens

#### System Routes

- `GET /health` - Health check endpoint

## 🗄️ Database Schema

### Users Table

```sql
User {
  id        String   @id @default(cuid())
  phone     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### OTP Table

```sql
Otp {
  id          String   @id @default(cuid())
  phone       String
  challengeId String   @unique
  codeHash    String
  expiresAt   DateTime
  attempts    Int      @default(0)
  createdAt   DateTime @default(now())
}
```

### Refresh Tokens Table

```sql
RefreshToken {
  id         String   @id @default(cuid())
  userId     String
  tokenHash  String   @unique
  createdAt  DateTime @default(now())
  expiresAt  DateTime
  revoked    Boolean  @default(false)
}
```

## 🔧 Configuration

### Security Settings (`backend/src/config.ts`)

```typescript
export const ACCESS_TOKEN_TTL_SEC = 10 * 60; // 10 minutes
export const REFRESH_TOKEN_TTL_SEC = 30 * 24 * 60 * 60; // 30 days
export const OTP_TTL_SEC = 5 * 60; // 5 minutes
export const OTP_MAX_ATTEMPTS = 5; // Max attempts
```

### Rate Limiting (`backend/src/ratelimit.ts`)

- **IP Limiter**: 10 requests/minute per IP
- **Phone Send**: 5 OTP sends/15 minutes per phone
- **Phone Verify**: 10 attempts/15 minutes per phone

## 🧪 Development

### Development Features

1. **Console OTP Logging**

   - OTP codes are logged to console in development
   - Use query param `?dev=123456` to set custom OTP

2. **Hot Reload**

   - Backend: `npm run dev` (nodemon)
   - Frontend: `npm run dev` (Next.js)

3. **Database Debugging**
   - Enable query logging in `backend/src/db.ts`
   - Use Prisma Studio for visual database management

### Code Structure

```
├── backend/
│   ├── prisma/          # Database schema & migrations
│   ├── src/
│   │   ├── routes/      # API route handlers
│   │   ├── middleware/  # Authentication middleware
│   │   ├── config.ts    # App configuration
│   │   ├── db.ts        # Database client
│   │   ├── jwt.ts       # JWT utilities
│   │   ├── otp.ts       # OTP generation & validation
│   │   └── tokens.ts    # Token management
│   └── package.json
├── frontend/
│   ├── app/             # Next.js app directory
│   │   ├── login/       # Login page
│   │   ├── profile/     # Profile page
│   │   ├── verify/      # OTP verification page
│   │   └── layout.tsx   # Root layout
│   ├── lib/             # Utilities
│   │   ├── api.ts       # Axios configuration
│   │   └── auth.ts      # Token management
│   └── package.json
└── README.md
```

## 🚀 Production Deployment

### Backend Deployment

1. **Environment Variables**

   ```bash
   NODE_ENV=production
   DATABASE_URL="your-production-db-url"
   CORS_ORIGIN="https://your-frontend-domain.com"
   # ... other env vars
   ```

2. **Build & Deploy**
   ```bash
   npm run build
   npm start
   ```

### Frontend Deployment

1. **Build for Production**

   ```bash
   npm run build
   npm start
   ```

2. **Environment Variables**
   ```bash
   NEXT_PUBLIC_API_URL="https://your-api-domain.com"
   ```

### Database Migration

```bash
npx prisma migrate deploy
```

## 🛠️ Customization

### Adding SMS Provider

Replace the mock SMS in `backend/src/sms.ts`:

```typescript
export async function sendOtpSms(phone: string, code: string) {
  // Replace with Twilio, MSG91, or your preferred provider
  const response = await twilioClient.messages.create({
    body: `Your verification code is: ${code}`,
    from: "+1234567890",
    to: phone,
  });

  return response.sid;
}
```

### UI Theming

Customize colors in `frontend/tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          // Your custom color palette
        },
      },
    },
  },
};
```

## 📋 API Testing

### Using cURL

1. **Send OTP**

   ```bash
   curl -X POST http://localhost:3004/auth/send-otp \
     -H "Content-Type: application/json" \
     -d '{"phone": "+919876543210"}'
   ```

2. **Verify OTP**
   ```bash
   curl -X POST http://localhost:3004/auth/verify-otp \
     -H "Content-Type: application/json" \
     -d '{"phone": "+919876543210", "challengeId": "your-challenge-id", "code": "123456"}'
   ```

## 🔍 Troubleshooting

### Common Issues

1. **Database Connection**

   - Ensure PostgreSQL is running
   - Check DATABASE_URL format
   - Run `npx prisma migrate dev`

2. **CORS Errors**

   - Verify CORS_ORIGIN in backend env
   - Check frontend API_URL configuration

3. **OTP Not Working**

   - Check console logs in development
   - Verify phone number format (E.164)
   - Check rate limiting hasn't been exceeded

4. **Token Issues**
   - Clear localStorage and cookies
   - Check JWT secrets are properly set
   - Verify token expiration settings

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🔗 Links

- **Frontend**: `http://localhost:3000`
- **Backend**: `http://localhost:3004`
- **API Health**: `http://localhost:3004/health`
- **Database Studio**: `npx prisma studio`

## 📞 Support

If you have any questions or run into issues, please open an issue on GitHub or reach out to the development team.

---

**Built with ❤️ using modern web technologies**
