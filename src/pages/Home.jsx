import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import AddRecipeForm from "@/components/AddRecipeForm";

const testimonials = [
    {
        name: "Amara K.",
        quote:
            "Simmer made weeknight dinners so much easier. I favorite everything I want to try and never lose track of a recipe again.",
        rating: 5,
    },
    {
        name: "Wafula.S.",
        quote:
            "I love that I can add my own family recipes and have them sit right alongside everything else. Feels like my own little cookbook.",
        rating: 5,
    },
    {
        name: "Priya R.",
        quote:
            "Simple, fast, and no clutter. I just wanted somewhere to browse recipes and save favorites — this is exactly that.",
        rating: 4,
    },
];

export default function Home() {
    const navigate = useNavigate();

    const { user, isAuthenticated, authLoading } = useAuth();

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            navigate("/login");
        }
    }, [authLoading, isAuthenticated, navigate]);

    const displayName = user?.displayName || user?.email?.split("@")[0] || "Chef";

    return (
        <div className="min-h-screen bg-ivory dark:bg-obsidian">
            <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
                <div className="mb-10 text-center sm:mb-14">
                    <p className="text-xs font-semibold uppercase tracking-widest text-olive">
                        Welcome back
                    </p>

                    <h1 className="mt-2 font-serif text-3xl font-medium tracking-tight text-obsidian dark:text-ivory sm:text-4xl">
                        Hello, {displayName}
                    </h1>

                    <p className="mt-2 text-sm text-obsidian/60 dark:text-ivory/60 sm:text-base">
                        Ready to browse or add something new to the collection?
                    </p>
                </div>
            </div>

        </div>
    )
}
