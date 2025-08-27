"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { Phone, Send, Shield, ArrowRight, Check, AlertCircle } from "lucide-react";

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
            const res = await api.post("/auth/send-otp", { phone });
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
                phone,
                challengeId,
                code,
            });

            // Store access token
            localStorage.setItem("accessToken", res.data.accessToken);

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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl">
                {/* Header */}
                <div className="text-center mb-6 sm:mb-8 lg:mb-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 lg:mb-6">
                        <Phone className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2 lg:mb-4">Welcome Back</h1>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-600">
                        {step === "phone" ? "Enter your phone number to continue" : "Enter the verification code"}
                    </p>
                </div>

                {/* Progress Indicator */}
                <div className="flex items-center justify-center mb-6 sm:mb-8 lg:mb-10">
                    <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-6">
                        <div className={`flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full border-2 transition-all duration-300 ${step === "phone"
                                ? "border-blue-500 bg-blue-500 text-white"
                                : "border-green-500 bg-green-500 text-white"
                            }`}>
                            {step === "otp" ? <Check className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" /> : "1"}
                        </div>
                        <div className={`h-0.5 w-12 sm:w-16 lg:w-20 transition-all duration-300 ${step === "otp" ? "bg-green-500" : "bg-gray-300"
                            }`} />
                        <div className={`flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full border-2 transition-all duration-300 ${step === "otp"
                                ? "border-blue-500 bg-blue-500 text-white"
                                : "border-gray-300 bg-white text-gray-400"
                            }`}>
                            <Shield className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                        </div>
                    </div>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10 transition-all duration-500">
                    {step === "phone" ? (
                        <form onSubmit={handleSendOtp} className="space-y-4 sm:space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="phone" className="text-sm sm:text-base font-medium text-gray-700">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                                        <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="phone"
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="+919876543210"
                                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 lg:py-5 border border-gray-300 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-base sm:text-lg"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                                <p className="text-xs sm:text-sm text-gray-500">
                                    We'll send you a verification code
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 sm:py-4 lg:py-5 rounded-xl sm:rounded-2xl font-medium text-base sm:text-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                                        <span>Send OTP</span>
                                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOtp} className="space-y-4 sm:space-y-6">
                            <div className="text-center mb-4 sm:mb-6">
                                <p className="text-sm sm:text-base text-gray-600">
                                    Code sent to <span className="font-semibold text-gray-900">{phone}</span>
                                </p>
                                <button
                                    type="button"
                                    onClick={handleBackToPhone}
                                    className="text-blue-500 hover:text-blue-600 text-sm font-medium mt-1"
                                >
                                    Change number
                                </button>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="code" className="text-sm sm:text-base font-medium text-gray-700">
                                    Verification Code
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                                        <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="code"
                                        type="text"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                        placeholder="000000"
                                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 lg:py-5 border border-gray-300 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-base sm:text-lg text-center tracking-widest font-mono"
                                        maxLength={6}
                                        required
                                        disabled={verifying}
                                    />
                                </div>
                                <p className="text-xs sm:text-sm text-gray-500">
                                    Enter the 6-digit code from your console
                                </p>
                            </div>

                            <div className="space-y-3">
                                <button
                                    type="submit"
                                    disabled={verifying || code.length !== 6}
                                    className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 sm:py-4 lg:py-5 rounded-xl sm:rounded-2xl font-medium text-base sm:text-lg hover:from-green-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-green-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                                >
                                    {verifying ? (
                                        <>
                                            <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            <span>Verifying...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                                            <span>Verify & Continue</span>
                                        </>
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={handleBackToPhone}
                                    className="w-full border border-gray-300 text-gray-700 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-medium hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-500/25 transition-all duration-200"
                                >
                                    Back to Phone
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                {/* Message Display */}
                {message && (
                    <div className={`mt-4 sm:mt-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl flex items-center space-x-3 transition-all duration-300 ${messageType === "success"
                            ? "bg-green-50 border border-green-200 text-green-800"
                            : messageType === "error"
                                ? "bg-red-50 border border-red-200 text-red-800"
                                : "bg-blue-50 border border-blue-200 text-blue-800"
                        }`}>
                        {messageType === "success" ? (
                            <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                        ) : (
                            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                        )}
                        <p className="text-xs sm:text-sm">{message}</p>
                    </div>
                )}

                {/* Development Note */}
                <div className="mt-6 sm:mt-8 text-center">
                    <p className="text-xs sm:text-sm text-gray-500">
                        Development Mode: Check console for OTP codes
                    </p>
                </div>
            </div>
        </div>
    );
}