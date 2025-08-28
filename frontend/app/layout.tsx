// frontend/app/layout.tsx
import "./globals.css";
import React from "react";

export const metadata = {
  title: "Phone Auth",
  description: "Secure phone OTP authentication platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}