"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { setAccessToken } from "@/lib/auth";
import { toE164 } from "@/app/utils/phone"; // ✅ added formatter
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
        phone: toE164(phone), // ✅ ensure backend accepts
        challengeId,
        code,
      });

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
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-2xl mb-6 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Verify Your OTP
          </h1>
          <p className="text-slate-400">
            Complete verification by entering your details below
          </p>
        </div>

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 inline-flex items-center text-slate-400 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span>Back</span>
        </button>

        {/* Main Card */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
          <form onSubmit={handleVerify} className="space-y-6">
            {/* Phone Number Input */}
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="text-sm font-medium text-slate-300 flex items-center"
              >
                <Phone className="w-4 h-4 mr-2 text-blue-400" />
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+919876543210"
                  className="w-full pl-12 pr-4 py-4 bg-slate-900 border border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-slate-400"
                  required
                  disabled={loading}
                />
              </div>
              <p className="text-sm text-slate-400">
                Enter phone number in E.164 format
              </p>
            </div>

            {/* Challenge ID Input */}
            <div className="space-y-2">
              <label
                htmlFor="challengeId"
                className="text-sm font-medium text-slate-300 flex items-center"
              >
                <Key className="w-4 h-4 mr-2 text-blue-400" />
                Challenge ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Key className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="challengeId"
                  type="text"
                  value={challengeId}
                  onChange={(e) => setChallengeId(e.target.value)}
                  placeholder="Enter challenge ID from send-otp response"
                  className="w-full pl-12 pr-4 py-4 bg-slate-900 border border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-slate-400"
                  required
                  disabled={loading}
                />
              </div>
              <p className="text-sm text-slate-400">
                UUID or CUID from the send-otp response
              </p>
            </div>

            {/* OTP Code Input */}
            <div className="space-y-2">
              <label
                htmlFor="code"
                className="text-sm font-medium text-slate-300 flex items-center"
              >
                <Shield className="w-4 h-4 mr-2 text-blue-400" />
                Verification Code
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Shield className="h-5 w-5 text-slate-400" />
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
                  className="w-full pl-12 pr-4 py-4 bg-slate-900 border border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-slate-400 text-center tracking-widest font-mono"
                  required
                  disabled={loading}
                />
              </div>
              <p className="text-sm text-slate-400">
                Enter the 6-digit OTP code
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || code.length !== 6}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
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
          <div className="mt-6 pt-6 border-t border-slate-700">
            <div className="flex items-center justify-center space-x-6 text-sm">
              <button
                onClick={() => router.push("/login")}
                className="flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
              >
                <User className="w-4 h-4 mr-1" />
                Go to Login
              </button>
              <button
                onClick={() => router.push("/")}
                className="flex items-center text-slate-400 hover:text-white font-medium transition-colors duration-200"
              >
                Home
              </button>
            </div>
          </div>
        </div>

        {/* Message Display */}
        {message && (
          <div
            className={`mt-6 p-4 rounded-xl flex items-center space-x-3 transition-all duration-300 ${
              messageType === "success"
                ? "bg-green-900/50 border border-green-700 text-green-300"
                : messageType === "error"
                ? "bg-red-900/50 border border-red-700 text-red-300"
                : "bg-blue-900/50 border border-blue-700 text-blue-300"
            }`}
          >
            {messageType === "success" ? (
              <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <p className="text-sm">{message}</p>
          </div>
        )}

        {/* Info Card */}
        <div className="mt-6 bg-slate-800/30 rounded-xl p-6 border border-slate-700">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Clock className="w-5 h-5 text-blue-400 mt-0.5" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-blue-300 mb-2">
                Need Help?
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Make sure you have the correct challenge ID from your send-otp
                request. OTP codes expire after 5 minutes and have a maximum of
                5 attempts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
