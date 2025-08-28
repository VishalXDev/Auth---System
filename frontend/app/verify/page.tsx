"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { setAccessToken } from "@/lib/auth";
import {
  Phone,
  Shield,
  Key,
  Check,
  AlertCircle,
  ArrowLeft,
  User,
  Clock,
} from "lucide-react";

export default function VerifyPage() {
  const [phone, setPhone] = useState("");
  const [challengeId, setChallengeId] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "info">(
    "info"
  );
  const router = useRouter();

  const showMessage = (
    text: string,
    type: "success" | "error" | "info"
  ) => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(""), 5000);
  };

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await api.post("/auth/verify-otp", {
        phone,
        challengeId,
        code,
      });

      // Save token properly (cookies via auth.ts)
      setAccessToken(res.data.accessToken);

      showMessage("OTP verified successfully! Redirecting...", "success");

      setTimeout(() => {
        router.push("/profile");
      }, 1500);
    } catch (err: any) {
      showMessage(
        err.response?.data?.error || "Verification failed",
        "error"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Verify Your OTP
          </h1>
          <p className="text-gray-600">
            Complete verification by entering your details below
          </p>
        </div>

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <form onSubmit={handleVerify} className="space-y-6">
            {/* Phone Number Input */}
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="text-sm font-medium text-gray-700 flex items-center"
              >
                <Phone className="w-4 h-4 mr-2 text-gray-500" />
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+919876543210"
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
                  required
                  disabled={loading}
                />
              </div>
              <p className="text-xs text-gray-500">
                Enter phone number in E.164 format
              </p>
            </div>

            {/* Challenge ID Input */}
            <div className="space-y-2">
              <label
                htmlFor="challengeId"
                className="text-sm font-medium text-gray-700 flex items-center"
              >
                <Key className="w-4 h-4 mr-2 text-gray-500" />
                Challenge ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Key className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="challengeId"
                  type="text"
                  value={challengeId}
                  onChange={(e) => setChallengeId(e.target.value)}
                  placeholder="Enter challenge ID from send-otp response"
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                  disabled={loading}
                />
              </div>
              <p className="text-xs text-gray-500">
                UUID or CUID from the send-otp response
              </p>
            </div>

            {/* OTP Code Input */}
            <div className="space-y-2">
              <label
                htmlFor="code"
                className="text-sm font-medium text-gray-700 flex items-center"
              >
                <Shield className="w-4 h-4 mr-2 text-gray-500" />
                Verification Code
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Shield className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="code"
                  type="text"
                  value={code}
                  onChange={(e) =>
                    setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  placeholder="000000"
                  maxLength={6}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg text-center tracking-widest font-mono"
                  required
                  disabled={loading}
                />
              </div>
              <p className="text-xs text-gray-500">
                Enter the 6-digit OTP code
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || code.length !== 6}
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-4 rounded-2xl font-medium text-lg hover:from-green-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-green-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  <span>Verify OTP</span>
                </>
              )}
            </button>
          </form>

          {/* Additional Actions */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-center space-x-4 text-sm">
              <button
                onClick={() => router.push("/login")}
                className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                <User className="w-4 h-4 mr-1" />
                Go to Login
              </button>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <button
                onClick={() => router.push("/")}
                className="flex items-center text-gray-600 hover:text-gray-700 font-medium"
              >
                Home
              </button>
            </div>
          </div>
        </div>

        {/* Message Display */}
        {message && (
          <div
            className={`mt-6 p-4 rounded-2xl flex items-center space-x-3 transition-all duration-300 ${
              messageType === "success"
                ? "bg-green-50 border border-green-200 text-green-800"
                : messageType === "error"
                ? "bg-red-50 border border-red-200 text-red-800"
                : "bg-blue-50 border border-blue-200 text-blue-800"
            }`}
          >
            {messageType === "success" ? (
              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <p className="text-sm">{message}</p>
          </div>
        )}

        {/* Info Card */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-blue-900 mb-1">
                Need Help?
              </h3>
              <p className="text-xs text-blue-700">
                Make sure you have the correct challenge ID from your send-otp
                request. OTP codes expire after 5 minutes and have a maximum of
                5 attempts.
              </p>
            </div>
          </div>
        </div>

        {/* Development Note */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Development Mode: Check your console for OTP codes
          </p>
        </div>
      </div>
    </div>
  );
}
