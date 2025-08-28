"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { setAccessToken } from "@/lib/auth";
import { Phone, Send, Shield, ArrowRight, Check, AlertCircle, ArrowLeft } from "lucide-react";

// E.164 formatter (assume India for 10-digit input)
function toE164(raw: string) {
    const s = raw.replace(/\s+/g, "");
    if (/^\d{10}$/.test(s)) return `+91${s}`;
    if (/^\+[1-9]\d{7,14}$/.test(s)) return s;
    throw new Error("Enter phone like +919876543210");
}

export default function LoginPage() {
    const [phone, setPhone] = useState("");
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [challengeId, setChallengeId] = useState<string | null>(null);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState<"success" | "error" | "info">("info");
    const [step, setStep] = useState<"phone" | "otp">("phone");
    const router = useRouter();

    const showMessage = (text: string, type: "success" | "error" | "info") => {
        setMessage(text);
        setMessageType(type);
        setTimeout(() => setMessage(""), 5000);
    };

    async function handleSendOtp(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = { phone: toE164(phone) };
            const res = await api.post("/auth/send-otp", payload);
            setChallengeId(res.data.challengeId);
            setStep("otp");
            showMessage("OTP sent successfully! Check your console for the demo code.", "success");
        } catch (err: any) {
            showMessage(err.response?.data?.error || "Failed to send OTP", "error");
        } finally {
            setLoading(false);
        }
    }

    async function handleVerifyOtp(e: React.FormEvent) {
        e.preventDefault();
        if (!challengeId) return;

        setVerifying(true);

        try {
            const res = await api.post("/auth/verify-otp", {
                phone: toE164(phone),
                challengeId,
                code,
            });

            setAccessToken(res.data.accessToken);
            showMessage("Login successful! Redirecting...", "success");

            setTimeout(() => {
                router.push("/profile");
            }, 1500);
        } catch (err: any) {
            showMessage(err.response?.data?.error || "Verification failed", "error");
        } finally {
            setVerifying(false);
        }
    }

    const handleBackToPhone = () => {
        setStep("phone");
        setChallengeId(null);
        setCode("");
        setMessage("");
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <Phone className="w-8 h-8 text-gray-700" />
                    </div>
                    <h1 className="text-3xl font-bold text-black mb-2">Welcome Back</h1>
                    <p className="text-gray-600">
                        {step === "phone"
                            ? "Enter your phone number to continue"
                            : "Enter the verification code"}
                    </p>
                </div>

                {/* Progress Indicator */}
                <div className="mb-8">
                    <div className="flex items-center justify-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${step === "otp"
                                ? "bg-green-100 text-green-700"
                                : "bg-black text-white"
                            }`}>
                            {step === "otp" ? (
                                <Check className="w-5 h-5" />
                            ) : (
                                "1"
                            )}
                        </div>
                        <div className={`h-1 w-16 ${step === "otp" ? "bg-green-200" : "bg-gray-200"
                            }`} />
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step === "otp"
                                ? "bg-black text-white"
                                : "bg-gray-100 text-gray-400"
                            }`}>
                            <Shield className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                {/* Main Card */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
                    {step === "phone" ? (
                        <form onSubmit={handleSendOtp} className="space-y-6">
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-black mb-2">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Phone className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="phone"
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="+919876543210"
                                        required
                                        disabled={loading}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-black placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                                    />
                                </div>
                                <p className="mt-2 text-sm text-gray-500">We'll send you a verification code</p>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        <span>Send OTP</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOtp} className="space-y-6">
                            <div className="text-center pb-4 border-b border-gray-100">
                                <p className="text-gray-600 mb-2">
                                    Code sent to{" "}
                                    <span className="font-medium text-black">{phone}</span>
                                </p>
                                <button
                                    type="button"
                                    onClick={handleBackToPhone}
                                    className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                                >
                                    Change number
                                </button>
                            </div>

                            <div>
                                <label htmlFor="code" className="block text-sm font-medium text-black mb-2">
                                    Verification Code
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
                                        required
                                        disabled={verifying}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-black text-center text-xl font-mono tracking-widest placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                                    />
                                </div>
                                <p className="mt-2 text-sm text-gray-500">Enter the 6-digit code from your console</p>
                            </div>

                            <div className="space-y-3">
                                <button
                                    type="submit"
                                    disabled={verifying || code.length !== 6}
                                    className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                                >
                                    {verifying ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            <span>Verifying...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Check className="w-5 h-5" />
                                            <span>Verify & Continue</span>
                                        </>
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={handleBackToPhone}
                                    className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-colors flex items-center justify-center gap-2"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                    <span>Back to Phone</span>
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                {/* Message Display */}
                {message && (
                    <div className={`p-4 rounded-lg mb-6 flex items-center gap-3 ${messageType === "success"
                            ? "bg-green-50 text-green-800 border border-green-200"
                            : messageType === "error"
                                ? "bg-red-50 text-red-800 border border-red-200"
                                : "bg-blue-50 text-blue-800 border border-blue-200"
                        }`}>
                        {messageType === "success" ? (
                            <Check className="w-5 h-5 text-green-600" />
                        ) : (
                            <AlertCircle className="w-5 h-5 text-red-600" />
                        )}
                        <p className="text-sm font-medium">{message}</p>
                    </div>
                )}

                {/* Back to Home Link */}
                <div className="text-center">
                    <button
                        onClick={() => router.push("/")}
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Home</span>
                    </button>
                </div>
            </div>
        </div>
    );
}