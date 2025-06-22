'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
    name: string;
    email: string;
    phone?: string;
}

interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await fetch('/api/profile');
                if (res.ok) {
                    const data: User = await res.json();
                    setUser(data);
                }
            } catch (err) {
                console.error('Auth fetch error:', err);
            }
        }

        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
