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
    ArrowLeft,
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
            <div>
                <div>
                    <div></div>
                    <p>Loading your profile...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <div>
                    <div>
                        <X />
                    </div>
                    <h2>Error</h2>
                    <p>{error}</p>
                    <button onClick={() => router.push("/login")}>Back to Login</button>
                </div>
            </div>
        );
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div>
            <div>
                {/* Back Button */}
                <div>
                    <button onClick={() => router.push("/")}>
                        <ArrowLeft />
                        <span>Back to Home</span>
                    </button>
                </div>

                {/* Header */}
                <div>
                    <div>
                        <User />
                    </div>
                    <h1>Your Profile</h1>
                    <p>Manage your account information</p>
                </div>

                {/* Profile Card */}
                <div>
                    {/* Header */}
                    <div>
                        <div>
                            <div>
                                <User />
                            </div>
                            <div>
                                <h2>{user?.name || "Welcome!"}</h2>
                                <p>Account Information</p>
                            </div>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div>
                        {/* Name Section */}
                        <div>
                            <div>
                                <div>
                                    <User />
                                </div>
                                <div>
                                    <p>Display Name</p>
                                    {isEditing ? (
                                        <div>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Enter your name"
                                            />
                                            <button onClick={handleSaveName} disabled={savingName}>
                                                {savingName ? <div /> : <Check />}
                                            </button>
                                            <button onClick={handleCancelEdit}>
                                                <X />
                                            </button>
                                        </div>
                                    ) : (
                                        <p>{user?.name || "Not set"}</p>
                                    )}
                                </div>
                            </div>
                            {!isEditing && (
                                <button onClick={() => setIsEditing(true)}>
                                    <Edit3 />
                                </button>
                            )}
                        </div>

                        {/* Phone Section */}
                        <div>
                            <div>
                                <Phone />
                            </div>
                            <div>
                                <p>Phone Number</p>
                                <p>{user?.phone}</p>
                            </div>
                            <div>
                                <Shield />
                                <span>Verified</span>
                            </div>
                        </div>

                        {/* Account Created */}
                        <div>
                            <div>
                                <Calendar />
                            </div>
                            <div>
                                <p>Member Since</p>
                                <p>
                                    {user?.createdAt ? formatDate(user.createdAt) : "Unknown"}
                                </p>
                            </div>
                        </div>

                        {/* Account ID */}
                        <div>
                            <div>
                                <Clock />
                            </div>
                            <div>
                                <p>Account ID</p>
                                <p>{user?.id}</p>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div>
                        <button onClick={handleLogout}>
                            <LogOut />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>

                {/* Quick Actions */}
                <div>
                    <button onClick={() => router.push("/")}>
                        <div>
                            <Home />
                        </div>
                        <p>Home</p>
                        <p>Go to main page</p>
                    </button>

                    <div>
                        <div>
                            <Shield />
                        </div>
                        <p>Security</p>
                        <p>Coming soon</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
