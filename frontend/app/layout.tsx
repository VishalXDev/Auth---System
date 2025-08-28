// frontend/app/layout.tsx
import "./globals.css";
import React from "react";

export const metadata = {
  title: "Phone Auth",
  description: "Phone OTP auth demo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
