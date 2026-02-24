import { AuthProvider } from "@refinedev/core";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

let identityCache: { id: number; name: string; email: string; role?: string } | null = null;
let identityPromise: Promise<typeof identityCache> | null = null;

export const authProvider: AuthProvider = {
    login: async ({ email, password }) => {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (response.status === 200) {
            localStorage.setItem("token", data.token);
            identityCache = data.user ?? null;
            return {
                success: true,
                redirectTo: "/",
            };
        }

        return {
            success: false,
            error: {
                name: "Login Error",
                message: data.message || "Invalid email or password",
            },
        };
    },
    logout: async () => {
        const token = localStorage.getItem("token");
        await fetch(`${API_URL}/logout`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        localStorage.removeItem("token");
        identityCache = null;
        identityPromise = null;
        return {
            success: true,
            redirectTo: "/login",
        };
    },
    check: async () => {
        const token = localStorage.getItem("token");
        if (token) {
            return {
                authenticated: true,
            };
        }

        return {
            authenticated: false,
            redirectTo: "/login",
        };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
        if (identityCache) return identityCache;
        const token = localStorage.getItem("token");
        if (!token) return null;
        if (!identityPromise) {
            identityPromise = (async () => {
                try {
                    const response = await fetch(`${API_URL}/user`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (response.status === 200) {
                        const data = await response.json();
                        identityCache = data;
                        return data;
                    }
                    return null;
                } finally {
                    identityPromise = null;
                }
            })();
        }
        return identityPromise;
    },
    onError: async (error) => {
        if (error.status === 401 || error.status === 403) {
            localStorage.removeItem("token");
            return {
                logout: true,
                redirectTo: "/login",
            };
        }
        return {};
    },
};
