import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signOut, GoogleAuthProvider, } from "@/config/firebase";

const AuthContext = createContext(undefined);

const googleProvider = new GoogleAuthProvider();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setAuthLoading(false);
        });

        return unsubscribe;
    }, []);

    const login = async (email, password) => {
        const result = await signInWithEmailAndPassword(auth, email, password);
        return result.user;
    };

    const register = async (email, password, displayName) => {
        const result = await createUserWithEmailAndPassword(auth, email, password);

        if (displayName) {
            await updateProfile(result.user, { displayName });
            setUser({ ...result.user, displayName });
        }

        return result.user;
    };

    const loginWithGoogle = async () => {
        const result = await signInWithPopup(auth, googleProvider);
        return result.user;
    };

    const logout = () => signOut(auth);

    const value = {
        user,
        isAuthenticated: !!user,
        authLoading,
        login,
        register,
        loginWithGoogle,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}