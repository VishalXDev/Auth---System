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
    <div>
      {/* Background */}
      <div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div>
        {/* Header */}
        <div>
          <div>
            <Shield />
          </div>
          <h1>Verify Your OTP</h1>
          <p>Complete verification by entering your details below</p>
        </div>

        {/* Back Button */}
        <button onClick={() => router.back()}>
          <ArrowLeft />
          <span>Back</span>
        </button>

        {/* Main Card */}
        <div>
          <form onSubmit={handleVerify}>
            {/* Phone Number Input */}
            <div>
              <label htmlFor="phone">
                <Phone />
                Phone Number
              </label>
              <div>
                <div>
                  <Phone />
                </div>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+919876543210"
                  required
                  disabled={loading}
                />
              </div>
              <p>Enter phone number in E.164 format</p>
            </div>

            {/* Challenge ID Input */}
            <div>
              <label htmlFor="challengeId">
                <Key />
                Challenge ID
              </label>
              <div>
                <div>
                  <Key />
                </div>
                <input
                  id="challengeId"
                  type="text"
                  value={challengeId}
                  onChange={(e) => setChallengeId(e.target.value)}
                  placeholder="Enter challenge ID from send-otp response"
                  required
                  disabled={loading}
                />
              </div>
              <p>UUID or CUID from the send-otp response</p>
            </div>

            {/* OTP Code Input */}
            <div>
              <label htmlFor="code">
                <Shield />
                Verification Code
              </label>
              <div>
                <div>
                  <Shield />
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
                  required
                  disabled={loading}
                />
              </div>
              <p>Enter the 6-digit OTP code</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || code.length !== 6}
            >
              {loading ? (
                <>
                  <div />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <Check />
                  <span>Verify OTP</span>
                </>
              )}
            </button>
          </form>

          {/* Additional Actions */}
          <div>
            <div>
              <button onClick={() => router.push("/login")}>
                <User />
                Go to Login
              </button>
              <button onClick={() => router.push("/")}>
                Home
              </button>
            </div>
          </div>
        </div>

        {/* Message Display */}
        {message && (
          <div>
            {messageType === "success" ? (
              <Check />
            ) : (
              <AlertCircle />
            )}
            <p>{message}</p>
          </div>
        )}

        {/* Info Card */}
        <div>
          <div>
            <div>
              <Clock />
            </div>
            <div>
              <h3>Need Help?</h3>
              <p>
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