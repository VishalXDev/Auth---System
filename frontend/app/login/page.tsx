"use client";

import { useState } from "react";
import api from "@/lib/api";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [challengeId, setChallengeId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await api.post("/auth/send-otp", { phone });
      setChallengeId(res.data.challengeId);
      setMessage("OTP sent! Check console for demo OTP.");
    } catch (err: any) {
      setMessage(err.response?.data?.error || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login with Phone</h1>

        {!challengeId ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+919876543210"
              className="w-full p-3 border rounded-lg focus:ring focus:outline-none"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <div className="text-center">
            <p className="mb-4">OTP sent to <b>{phone}</b></p>
            <p className="text-sm text-gray-500">Your challengeId: <code>{challengeId}</code></p>
          </div>
        )}

        {message && <p className="mt-4 text-center text-sm text-red-600">{message}</p>}
      </div>
    </div>
  );
}
