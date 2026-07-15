import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChefHat, Mail, Lock, User, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";

const getFriendlyAuthError = (code) => {
    switch (code) {
        case "auth/email-already-in-use":
            return "An account with this email already exists. Try logging in instead.";
        case "auth/invalid-email":
            return "That email address doesn't look right.";
        case "auth/weak-password":
            return "Your password should be at least 6 characters.";
        case "auth/too-many-requests":
            return "Too many attempts. Please wait a moment and try again.";
        case "auth/network-request-failed":
            return "Network error. Check your connection and try again.";
        default:
            return null;
    }
};

export default function Register() {
    const navigate = useNavigate();
    const { register, loginWithGoogle } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords don't match.");
            return;
        }

        if (password.length < 6) {
            setError("Your password should be at least 6 characters long.");
            return;
        }

        setError("");
        setIsSubmitting(true);
        try {
            await register(email, password, name);
            navigate("/home");
        } catch (err) {
            setError(
                getFriendlyAuthError(err?.code) ||
                err?.message ||
                "We couldn't create your account. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGoogleSignUp = async () => {
        setError("");
        setIsGoogleSubmitting(true);
        try {
            await loginWithGoogle();
            navigate("/home");
        } catch (err) {
            if (err?.code !== "auth/popup-closed-by-user") {
                setError(
                    getFriendlyAuthError(err?.code) ||
                    err?.message ||
                    "We couldn't sign you up with Google. Please try again."
                );
            }
        } finally {
            setIsGoogleSubmitting(false);
        }
    };
    return (
        <div className="flex min-h-screen flex-col bg-ivory dark:bg-obsidian">
            <header className="sticky top-0 z-50 flex w-full items-center justify-center bg-ivory px-5 py-4 dark:bg-obsidian">
                <Link to="/" className="flex items-center gap-2">
                    <ChefHat className="h-6 w-6 text-tomato" strokeWidth={2} />
                    <span className="font-serif text-xl font-semibold tracking-tight text-obsidian dark:text-ivory">
                        Simmer
                    </span>
                </Link>
            </header>

            <main className="flex flex-grow items-center justify-center px-5 py-12 sm:py-16">
                <section className="w-full max-w-md">
                    <div className="rounded-xl border border-olive/10 bg-white p-6 shadow-xl dark:border-ivory/10 dark:bg-[#3A3E3C] dark:shadow-black/40 sm:p-8">
                        <div className="mb-8 text-center">
                            <h2 className="font-serif text-2xl font-semibold text-obsidian dark:text-ivory">
                                Create your account
                            </h2>

                            <p className="mt-1 text-sm text-obsidian/60 dark:text-ivory/60">
                                Start building your own recipe collection
                            </p>

                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="space-y-1">
                                <label
                                    htmlFor="name"
                                    className="block text-xs font-semibold uppercase tracking-wider text-obsidian/70 dark:text-ivory/70"
                                >
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-obsidian/40 dark:text-ivory/40" />
                                    <Input
                                        id="name"
                                        type="text"
                                        autoComplete="name"
                                        placeholder="Jamie Oliver"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        disabled={isSubmitting || isGoogleSubmitting}
                                        className="border-transparent bg-obsidian/[0.03] pl-10 text-obsidian placeholder:text-obsidian/30 focus-visible:border-tomato/30 focus-visible:ring-tomato/20 dark:bg-ivory/5 dark:text-ivory dark:placeholder:text-ivory/30"
                                    />

                                </div>

                            </div>

                            <div className="space-y-1">
                                <label
                                    htmlFor="email"
                                    className="block text-xs font-semibold uppercase tracking-wider text-obsidian/70 dark:text-ivory/70"
                                >
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-obsidian/40 dark:text-ivory/40" />
                                    <Input
                                        id="email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="chef@simmer.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={isSubmitting || isGoogleSubmitting}
                                        className="border-transparent bg-obsidian/[0.03] pl-10 text-obsidian placeholder:text-obsidian/30 focus-visible:border-tomato/30 focus-visible:ring-tomato/20 dark:bg-ivory/5 dark:text-ivory dark:placeholder:text-ivory/30"
                                    />

                                </div>
                            </div>
                            <div className="space-y-1">
                                <label
                                    htmlFor="password"
                                    className="block text-xs font-semibold uppercase tracking-wider text-obsidian/70 dark:text-ivory/70"
                                >
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-obsidian/40 dark:text-ivory/40" />
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="new-password"
                                        placeholder="At least 6 characters"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={isSubmitting || isGoogleSubmitting}
                                        className="border-transparent bg-obsidian/[0.03] px-10 text-obsidian placeholder:text-obsidian/30 focus-visible:border-tomato/30 focus-visible:ring-tomato/20 dark:bg-ivory/5 dark:text-ivory dark:placeholder:text-ivory/30"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((v) => !v)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-obsidian/40 hover:text-obsidian/70 dark:text-ivory/40 dark:hover:text-ivory/70"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                    
                                </div>
                            </div>

                        </form>


                    </div>

                </section>
            </main>

        </div>
    )
}