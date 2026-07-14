import { Link } from "react-router-dom";
import { ChefHat, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Landing() {
    return (
        <section className="relative overflow-hidden bg-ivory dark:bg-obsidian">
            <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-28">
                <div className="flex flex-col items-start gap-6">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-olive/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-olive dark:bg-olive/20">
                        <Sparkles className="h-3.5 w-3.5" />
                        Your recipes reimagined
                    </span>

                    <h1 className="font-serif text-4xl font-medium leading-[1.1] tracking-tight text-obsidian dark:text-ivory sm:text-5xl md:text-6xl">
                        Find it, save it

                        <br />

                        let it{" "}
                        <span className="relative inline-block whitespace-nowrap text-tomato">
                            simmer
                            <svg
                                className="simmer-underline absolute -bottom-1 left-0 w-full"
                                viewBox="0 0 200 12"
                                preserveAspectRatio="none"
                                aria-hidden="true"
                            >
                                <path
                                    d="M2 8 C 40 2, 70 10, 100 6 C 130 2, 160 10, 198 5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </span>
                        .
                    </h1>
                    <p className="max-w-md text-base leading-relaxed text-obsidian/70 dark:text-ivory/70 sm:text-lg">
                        Discover recipes worth cooking, save the ones you love, and add
                        your own creations to build out a collection that's entirely
                        yours — all saved right in your browser and available at the click of a button
                    </p>

                    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                        <Button
                            asChild
                            size="lg"
                            className="w-full bg-tomato text-ivory hover:bg-tomato/90 sm:w-auto"
                        >
                            <Link to="/recipes" className="flex items-center justify-center gap-2">
                                <ChefHat className="h-4 w-4" />
                                Browse recipes
                            </Link>
                        </Button>

                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="w-full border-olive text-olive hover:bg-olive/10 hover:text-olive dark:border-[#A3B896] dark:text-[#A3B896] dark:hover:bg-olive/20 dark:hover:text-[#A3B896] sm:w-auto"
                        >
                            <Link to="/login" className="flex items-center justify-center gap-2">
                                Create your own Recipies
                            </Link>
                        </Button>

                    </div>
                </div>

                <div className="relative order-first lg:order-last">
                    <div className="overflow-hidden rounded-[2rem] shadow-xl dark:shadow-black/40">
                        <img
                            src="https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=900&q=80"
                            alt="A warm, home-cooked meal ready to be served"
                            className="aspect-[4/3] w-full object-cover"
                        />

                    </div>
                </div>
            </div>

        </section>
    )
}