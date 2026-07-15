import { useState, useEffect } from "react";
import { Loader2, AlertCircle } from "lucide-react";
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

export default function RecipeList() {
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

}