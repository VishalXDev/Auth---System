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
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6 shadow-lg">
                        <Phone className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-slate-400">
                        {step === "phone"
                            ? "Enter your phone number to continue"
                            : "Enter the verification code"}
                    </p>
                </div>

                {/* Progress Indicator */}
                <div className="flex items-center justify-center mb-8">
                    <div className="flex items-center space-x-4">
                        <div
                            className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                                step === "phone"
                                    ? "border-blue-500 bg-blue-500 text-white"
                                    : "border-green-500 bg-green-500 text-white"
                            }`}
                        >
                            {step === "otp" ? (
                                <Check className="w-4 h-4" />
                            ) : (
                                "1"
                            )}
                        </div>
                        <div
                            className={`h-0.5 w-16 transition-all duration-300 ${
                                step === "otp" ? "bg-green-500" : "bg-slate-600"
                            }`}
                        />
                        <div
                            className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                                step === "otp"
                                    ? "border-blue-500 bg-blue-500 text-white"
                                    : "border-slate-600 bg-slate-800 text-slate-400"
                            }`}
                        >
                            <Shield className="w-4 h-4" />
                        </div>
                    </div>
                </div>

                {/* Main Card */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
                    {step === "phone" ? (
                        <form onSubmit={handleSendOtp} className="space-y-6">
                            <div className="space-y-2">
                                <label
                                    htmlFor="phone"
                                    className="text-sm font-medium text-slate-300"
                                >
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
                                    We'll send you a verification code
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
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
                            <div className="text-center mb-6">
                                <p className="text-slate-300">
                                    Code sent to{" "}
                                    <span className="font-semibold text-white">{phone}</span>
                                </p>
                                <button
                                    type="button"
                                    onClick={handleBackToPhone}
                                    className="text-blue-400 hover:text-blue-300 text-sm font-medium mt-1 transition-colors duration-200"
                                >
                                    Change number
                                </button>
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="code"
                                    className="text-sm font-medium text-slate-300"
                                >
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
                                        className="w-full pl-12 pr-4 py-4 bg-slate-900 border border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-slate-400 text-center tracking-widest font-mono"
                                        maxLength={6}
                                        required
                                        disabled={verifying}
                                    />
                                </div>
                                <p className="text-sm text-slate-400">
                                    Enter the 6-digit code from your console
                                </p>
                            </div>

                            <div className="space-y-3">
                                <button
                                    type="submit"
                                    disabled={verifying || code.length !== 6}
                                    className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
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
                                    className="w-full border border-slate-600 text-slate-300 hover:bg-slate-700 py-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2"
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

                {/* Back to Home Link */}
                <div className="text-center mt-8">
                    <button
                        onClick={() => router.push("/")}
                        className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center justify-center space-x-2 mx-auto"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Home</span>
                    </button>
                </div>
            </div>
        </div>
    );
}