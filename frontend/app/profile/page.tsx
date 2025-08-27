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
    X
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
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-600 font-medium">Loading your profile...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
                <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full mx-4 text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <X className="w-8 h-8 text-red-500" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Error</h2>
                    <p className="text-red-600 mb-6">{error}</p>
                    <button
                        onClick={() => router.push("/login")}
                        className="w-full bg-blue-500 text-white py-3 rounded-2xl font-medium hover:bg-blue-600 transition-colors"
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 pt-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
                        <User className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Profile</h1>
                    <p className="text-gray-600">Manage your account information</p>
                </div>

                {/* Profile Card */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                    {/* Header with gradient */}
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <User className="w-8 h-8 text-white" />
                            </div>
                            <div className="text-white">
                                <h2 className="text-xl font-bold">
                                    {user?.name || "Welcome!"}
                                </h2>
                                <p className="text-blue-100">Account Information</p>
                            </div>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="p-8 space-y-6">
                        {/* Name Section */}
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <User className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Display Name</p>
                                    {isEditing ? (
                                        <div className="flex items-center space-x-2 mt-1">
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Enter your name"
                                                className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                            <button
                                                onClick={handleSaveName}
                                                disabled={savingName}
                                                className="p-1 text-green-600 hover:bg-green-50 rounded"
                                            >
                                                {savingName ? (
                                                    <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
                                                ) : (
                                                    <Check className="w-4 h-4" />
                                                )}
                                            </button>
                                            <button
                                                onClick={handleCancelEdit}
                                                className="p-1 text-red-600 hover:bg-red-50 rounded"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <p className="text-gray-900 font-semibold">
                                            {user?.name || "Not set"}
                                        </p>
                                    )}
                                </div>
                            </div>
                            {!isEditing && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                                >
                                    <Edit3 className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        {/* Phone Section */}
                        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-2xl">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <Phone className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Phone Number</p>
                                <p className="text-gray-900 font-semibold">{user?.phone}</p>
                            </div>
                            <div className="ml-auto">
                                <div className="inline-flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                    <Shield className="w-3 h-3" />
                                    <span>Verified</span>
                                </div>
                            </div>
                        </div>

                        {/* Account Created */}
                        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-2xl">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Member Since</p>
                                <p className="text-gray-900 font-semibold">
                                    {user?.createdAt ? formatDate(user.createdAt) : "Unknown"}
                                </p>
                            </div>
                        </div>

                        {/* Account ID (for reference) */}
                        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-2xl">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                <Clock className="w-5 h-5 text-gray-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-500">Account ID</p>
                                <p className="text-gray-900 font-mono text-sm truncate">
                                    {user?.id}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="border-t border-gray-100 p-8">
                        <button
                            onClick={handleLogout}
                            className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-4 rounded-2xl font-medium text-lg hover:from-red-600 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-red-500/25 transition-all duration-200 flex items-center justify-center space-x-2"
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
                        className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition-shadow"
                    >
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <User className="w-6 h-6 text-blue-600" />
                        </div>
                        <p className="font-medium text-gray-900">Home</p>
                        <p className="text-sm text-gray-500">Go to main page</p>
                    </button>

                    <button className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition-shadow opacity-50 cursor-not-allowed">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Shield className="w-6 h-6 text-gray-400" />
                        </div>
                        <p className="font-medium text-gray-400">Security</p>
                        <p className="text-sm text-gray-400">Coming soon</p>
                    </button>
                </div>
            </div>
        </div>
    );
}