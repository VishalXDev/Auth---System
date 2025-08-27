// app/layout.tsx
import "./globals.css";
import React from "react";

export const metadata = {
  title: "Phone Auth",
  description: "Phone OTP auth demo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-slate-900 min-h-screen flex items-center justify-center">
        <main className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl px-4 sm:px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}