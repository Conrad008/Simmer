import { useState, useEffect } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import RecipeCard from "@/components/RecipeCard";

export default function RecipeList() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

}