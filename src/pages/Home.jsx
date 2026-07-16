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

                <AddRecipeForm />

                <div className="mt-16 sm:mt-20">
                    <h2 className="text-center font-serif text-2xl font-medium text-obsidian dark:text-ivory sm:text-3xl">
                        What people are cooking up
                    </h2>

                    <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
                        {testimonials.map((testimonial) => (
                            <div
                                key={testimonial.name}
                                className="flex flex-col rounded-2xl border border-olive/10 bg-white p-5 shadow-sm dark:border-ivory/10 dark:bg-[#3A3E3C]"
                            >
                                <div className="flex gap-0.5">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-3.5 w-3.5 ${i < testimonial.rating
                                                    ? "fill-tomato text-tomato"
                                                    : "fill-none text-obsidian/20 dark:text-ivory/20"
                                                }`}
                                        />
                                    ))}
                                </div>
                                <p className="mt-3 flex-grow text-sm leading-relaxed text-obsidian/70 dark:text-ivory/70">
                                    "{testimonial.quote}"
                                </p>
                                <p className="mt-4 text-sm font-semibold text-obsidian dark:text-ivory">
                                    {testimonial.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}
