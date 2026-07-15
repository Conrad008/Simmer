import { useState, useEffect } from "react";
import { Loader2, AlertCircle, HeartOff } from "lucide-react";
import RecipeCard from "@/components/RecipeCard";

const favoritesKey = "simmerFavorites";

const getStoredFavorites = () => {
    try {
        const stored = JSON.parse(localStorage.getItem(favoritesKey) || "[]");
        return Array.isArray(stored) ? stored : [];
    } catch {
        return [];
    }
};

export default function RecipeList({ favoritesOnly = false }) {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;

        const fetchRecipes = async () => {
            try {

                const res = await fetch("recipes/recipes.json");

                if (!res.ok) {
                    throw new Error(`Failed to fetch recipes (status ${res.status})`);
                }

                const data = await res.json();

                if (isMounted) {
                    setRecipes(data);
                }
            } catch (err) {
                if (isMounted) {
                    setError("We couldn't load recipes right now. Please try again.");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchRecipes();

        return () => {
            isMounted = false;
        }
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-obsidian/60 dark:text-ivory/60">
                <Loader2 className="h-7 w-7 animate-spin text-tomato" />
                <p className="text-sm">Loading recipes...</p>
            </div>
        );
    }
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-red-100 bg-red-50 py-16 text-center dark:border-red-900/30 dark:bg-red-950/20">
                <AlertCircle className="h-7 w-7 text-red-500" />
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
        );
    }

    const visibleRecipes = favoritesOnly
        ? recipes.filter((recipe) => getStoredFavorites().includes(recipe.id))
        : recipes;

    if (visibleRecipes.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-center text-obsidian/60 dark:text-ivory/60">
                {favoritesOnly ? (
                    <>
                        <HeartOff className="h-7 w-7 text-obsidian/30 dark:text-ivory/30" />
                        <p>You haven't favorited any recipes yet.</p>
                        <p className="text-sm">Tap the heart on any recipe card to save it here.</p>
                    </>
                ) : (
                    <p>No recipes found.</p>
                )}
            </div>
        );
    }
    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
        </div>
    );
}