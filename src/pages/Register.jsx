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

                            <div className="space-y-1">
                                <label
                                    htmlFor="confirmPassword"
                                    className="block text-xs font-semibold uppercase tracking-wider text-obsidian/70 dark:text-ivory/70"
                                >
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-obsidian/40 dark:text-ivory/40" />
                                    <Input
                                        id="confirmPassword"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="new-password"
                                        placeholder="Re-enter your password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        disabled={isSubmitting || isGoogleSubmitting}
                                        className="border-transparent bg-obsidian/[0.03] pl-10 text-obsidian placeholder:text-obsidian/30 focus-visible:border-tomato/30 focus-visible:ring-tomato/20 dark:bg-ivory/5 dark:text-ivory dark:placeholder:text-ivory/30"
                                    />
                                </div>
                            </div>

                            {error && (
                                <p className="rounded-lg border border-red-200 bg-red-50 p-2.5 text-xs text-red-600 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-400">
                                    {error}
                                </p>
                            )}

                            <Button
                                type="submit"
                                disabled={isSubmitting || isGoogleSubmitting}
                                className="mt-2 w-full bg-tomato text-ivory shadow-lg transition-all hover:bg-tomato/90 active:scale-[0.98] disabled:opacity-70"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Creating account...
                                    </span>
                                ) : (
                                    "Create Account"
                                )}
                            </Button>

                        </form>

                        <div className="my-8 flex items-center">
                            <div className="flex-grow border-t border-olive/20 dark:border-ivory/10" />
                            <span className="mx-3 text-xs font-semibold uppercase tracking-widest text-obsidian/40 dark:text-ivory/40">
                                or
                            </span>
                            <div className="flex-grow border-t border-olive/20 dark:border-ivory/10" />
                        </div>

                        <button
                            type="button"
                            onClick={handleGoogleSignUp}
                            disabled={isSubmitting || isGoogleSubmitting}
                            className="flex w-full items-center justify-center gap-3 rounded-lg border border-olive/20 bg-white py-3 transition-all hover:bg-obsidian/[0.03] active:scale-[0.98] disabled:opacity-70 dark:border-ivory/10 dark:bg-ivory/5 dark:hover:bg-ivory/10"
                        >
                            {isGoogleSubmitting ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin text-obsidian dark:text-ivory" />
                                    <span className="text-sm text-obsidian dark:text-ivory">Signing up...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                                        <path
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            fill="#4285F4"
                                        />
                                        <path
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            fill="#34A853"
                                        />
                                        <path
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                                            fill="#FBBC05"
                                        />
                                        <path
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                            fill="#EA4335"
                                        />
                                    </svg>
                                    <span className="text-sm text-obsidian dark:text-ivory">Sign up with Google</span>
                                </>
                            )}
                        </button>

                        <div className="mt-10 text-center">
                            <p className="text-sm text-obsidian/70 dark:text-ivory/70">
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="font-bold text-tomato underline-offset-4 hover:underline"
                                >
                                    Log in
                                </Link>
                            </p>
                        </div>
                    </div>

                </section>
            </main>

        </div>
    )
}