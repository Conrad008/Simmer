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
}