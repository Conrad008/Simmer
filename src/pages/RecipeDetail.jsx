import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { ArrowLeft, Clock, ChefHat, ListChecks, UtensilsCrossed, ImageOff, Loader2, AlertCircle } from "lucide-react";
import { db } from "@/config/firebase";

export default function RecipeDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [error, setError] = useState("");
    const [imageFailed, setImageFailed] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const loadRecipe = async () => {
            setLoading(true);
            setError("");
            setNotFound(false);
            setImageFailed(false);

            try {
                const snap = await getDoc(doc(db, "recipes", id));

                if (snap.exists()) {
                    if (isMounted) {
                        setRecipe({ id: snap.id, ...snap.data() });
                    }
                    return;
                }


                const res = await fetch("/recipes/recipes.json");

                if (!res.ok) {
                    throw new Error(`Failed to fetch recipes (status ${res.status})`);
                }

                const data = await res.json();
                const found = data.find((r) => String(r.id) === String(id));

                if (isMounted) {
                    if (found) {
                        setRecipe(found);
                    } else {
                        setNotFound(true);
                    }
                }
            } catch (err) {
                if (isMounted) {
                    setError("We couldn't load this recipe right now. Please try again.");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadRecipe();

        return () => {
            isMounted = false;
        };
    }, [id]);

    if (loading) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-ivory text-obsidian/60 dark:bg-obsidian dark:text-ivory/60">
                <Loader2 className="h-7 w-7 animate-spin text-tomato" />
                <p className="text-sm">Loading recipe...</p>
            </div>
        );
    }

    if (notFound) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-ivory px-6 text-center dark:bg-obsidian">
                <AlertCircle className="h-8 w-8 text-obsidian/30 dark:text-ivory/30" />
                <div>
                    <h1 className="font-serif text-xl font-medium text-obsidian dark:text-ivory">
                        Recipe not found
                    </h1>
                    <p className="mt-1 text-sm text-obsidian/60 dark:text-ivory/60">
                        This recipe may have been removed or the link is incorrect.
                    </p>
                </div>
                <button
                    onClick={() => navigate("/recipes")}
                    className="text-sm font-semibold text-tomato hover:underline"
                >
                    Back to Recipes
                </button>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-ivory px-6 text-center dark:bg-obsidian">
                <AlertCircle className="h-7 w-7 text-red-500" />
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
        );
    }

    const { name, image, prep, description, ingredients, steps, isCustom, createdByName } = recipe;
    const showImage = image && !imageFailed;

    return (
        <div className="min-h-screen bg-ivory dark:bg-obsidian">
            <div clasName="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 flex items-center gap-2 text-sm font-medium text-obsidian/70 transition-colors hover:text-obsidian dark:text-ivory/70 dark:hover:text-ivory"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </button>
                
                <div className="overflow-hidden rounded-2xl border border-olive/10 bg-white shadow-sm dark:border-ivory/10 dark:bg-[#3A3E3C] dark:shadow-black/20">
                   <div className="relative h-64 w-full overflow-hidden bg-obsidian/5 dark:bg-ivory/5 sm:h-80">
                        {showImage ? (
                            <img
                                src={image}
                                alt={name}
                                onError={() => setImageFailed(true)}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full flex-col items-center justify-center gap-2">
                                <ImageOff
                                    className="h-9 w-9 text-obsidian/20 dark:text-ivory/20"
                                    strokeWidth={1.5}
                                />
                                <span className="text-xs font-medium text-obsidian/30 dark:text-ivory/30">
                                    No image
                                </span>
                            </div>
                        )}
                   </div>

                    <div className="p-6 sm:p-8">
                        <h1 className="font-serif text-2xl font-medium leading-snug text-obsidian dark:text-ivory sm:text-3xl">
                            {name}
                        </h1>
                        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-obsidian/60 dark:text-ivory/60">
                            {prep && (
                                <span className="flex items-center gap-1.5">
                                    <Clock className="h-4 w-4 text-tomato" strokeWidth={2.5} />
                                    {prep}
                                </span>
                            )}
                            {isCustom && (
                                <span className="flex items-center gap-1.5">
                                    <ChefHat className="h-4 w-4 text-tomato" strokeWidth={2.5} />
                                    Added by {createdByName || "a Simmer cook"}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}