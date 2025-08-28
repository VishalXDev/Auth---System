"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import {
    User,
    Phone,
    Calendar,
    LogOut,
    Shield,
    Clock,
    Edit3,
    Check,
    X,
    Home,
    ArrowLeft
} from "lucide-react";

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("");
    const [savingName, setSavingName] = useState(false);
    const router = useRouter();

    useEffect(() => {
        async function fetchUser() {
            try {
                const token = localStorage.getItem("accessToken");
                if (!token) {
                    router.push("/login");
                    return;
                }

                const res = await api.get("/auth/profile");
                setUser(res.data.user);
                setName(res.data.user.name || "");
            } catch (err: any) {
                setError(err.response?.data?.error || "Failed to fetch user");
                router.push("/login");
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, [router]);

    async function handleLogout() {
        try {
            await api.post("/auth/logout");
        } catch (err) {
            console.error("Logout error:", err);
        } finally {
            localStorage.removeItem("accessToken");
            router.push("/login");
        }
    }

    async function handleSaveName() {
        setSavingName(true);
        try {
            // This would require a new endpoint in your backend
            // For now, we'll just simulate the save
            setUser({ ...user, name });
            setIsEditing(false);
        } catch (err) {
            console.error("Save name error:", err);
        } finally {
            setSavingName(false);
        }
    }

    function handleCancelEdit() {
        setName(user?.name || "");
        setIsEditing(false);
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-300 font-medium">Loading your profile...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 text-center">
                    <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <X className="w-8 h-8 text-red-500" />
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2">Error</h2>
                    <p className="text-red-400 mb-6">{error}</p>
                    <button
                        onClick={() => router.push("/login")}
                        className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        );
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-slate-950 p-4">
            <div className="max-w-2xl mx-auto">
                {/* Back Button */}
                <div className="mb-6 pt-4">
                    <button
                        onClick={() => router.push("/")}
                        className="inline-flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Home</span>
                    </button>
                </div>

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-4">
                        <User className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Your Profile</h1>
                    <p className="text-slate-400">Manage your account information</p>
                </div>

                {/* Profile Card */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-slate-800 px-8 py-6 border-b border-slate-700">
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                                <User className="w-8 h-8 text-white" />
                            </div>
                            <div className="text-white">
                                <h2 className="text-xl font-bold">
                                    {user?.name || "Welcome!"}
                                </h2>
                                <p className="text-slate-400">Account Information</p>
                            </div>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="p-8 space-y-6">
                        {/* Name Section */}
                        <div className="flex items-center justify-between p-4 bg-slate-800 rounded-xl border border-slate-700">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center">
                                    <User className="w-5 h-5 text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-400">Display Name</p>
                                    {isEditing ? (
                                        <div className="flex items-center space-x-2 mt-1">
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Enter your name"
                                                className="bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                            <button
                                                onClick={handleSaveName}
                                                disabled={savingName}
                                                className="p-1 text-green-400 hover:bg-green-500/10 rounded"
                                            >
                                                {savingName ? (
                                                    <div className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin" />
                                                ) : (
                                                    <Check className="w-4 h-4" />
                                                )}
                                            </button>
                                            <button
                                                onClick={handleCancelEdit}
                                                className="p-1 text-red-400 hover:bg-red-500/10 rounded"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <p className="text-white font-semibold">
                                            {user?.name || "Not set"}
                                        </p>
                                    )}
                                </div>
                            </div>
                            {!isEditing && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-full transition-colors"
                                >
                                    <Edit3 className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        {/* Phone Section */}
                        <div className="flex items-center space-x-3 p-4 bg-slate-800 rounded-xl border border-slate-700">
                            <div className="w-10 h-10 bg-green-600/20 rounded-full flex items-center justify-center">
                                <Phone className="w-5 h-5 text-green-400" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-slate-400">Phone Number</p>
                                <p className="text-white font-semibold">{user?.phone}</p>
                            </div>
                            <div className="inline-flex items-center space-x-1 bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-medium border border-green-500/20">
                                <Shield className="w-3 h-3" />
                                <span>Verified</span>
                            </div>
                        </div>

                        {/* Account Created */}
                        <div className="flex items-center space-x-3 p-4 bg-slate-800 rounded-xl border border-slate-700">
                            <div className="w-10 h-10 bg-purple-600/20 rounded-full flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-purple-400" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-400">Member Since</p>
                                <p className="text-white font-semibold">
                                    {user?.createdAt ? formatDate(user.createdAt) : "Unknown"}
                                </p>
                            </div>
                        </div>

                        {/* Account ID */}
                        <div className="flex items-center space-x-3 p-4 bg-slate-800 rounded-xl border border-slate-700">
                            <div className="w-10 h-10 bg-slate-600/50 rounded-full flex items-center justify-center">
                                <Clock className="w-5 h-5 text-slate-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-400">Account ID</p>
                                <p className="text-white font-mono text-sm truncate">
                                    {user?.id}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="border-t border-slate-700 p-8">
                        <button
                            onClick={handleLogout}
                            className="w-full bg-red-600 text-white py-4 rounded-xl font-medium text-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-600/25 transition-all duration-200 flex items-center justify-center space-x-2"
                        >
                            <LogOut className="w-5 h-5" />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                    <button
                        onClick={() => router.push("/")}
                        className="bg-slate-900 border border-slate-800 rounded-xl shadow-lg p-6 text-center hover:border-slate-700 transition-colors"
                    >
                        <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Home className="w-6 h-6 text-blue-400" />
                        </div>
                        <p className="font-medium text-white">Home</p>
                        <p className="text-sm text-slate-400">Go to main page</p>
                    </button>

                    <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-lg p-6 text-center opacity-50">
                        <div className="w-12 h-12 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Shield className="w-6 h-6 text-slate-500" />
                        </div>
                        <p className="font-medium text-slate-500">Security</p>
                        <p className="text-sm text-slate-600">Coming soon</p>
                    </div>
                </div>
            </div>
        </div>
    );
}