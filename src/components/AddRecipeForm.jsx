import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const customRecipesKey = "simmerCustomRecipes";

const getStoredCustomRecipes = () => {
    try {
        const stored = JSON.parse(localStorage.getItem(customRecipesKey) || "[]");
        return Array.isArray(stored) ? stored : [];
    } catch {
        return [];
    }
};

const emptyForm = {
    name: "",
    prep: "",
    description: "",
    ingredients: "",
    steps: "",
    image: "",
};

const recipeToFormValues = (recipe) => ({
    name: recipe.name || "",
    prep: recipe.prep || "",
    description: recipe.description || "",
    ingredients: (recipe.ingredients || []).join("\n"),
    steps: (recipe.steps || []).join("\n"),
    image: recipe.image || "",
});

export default function AddRecipeForm({ recipe = null, onSaved }) {
     const isEditing = Boolean(recipe);

    const [form, setForm] = useState(() => (isEditing ? recipeToFormValues(recipe) : emptyForm));
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setSuccess(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.name || !form.prep || !form.description || !form.ingredients || !form.steps || !form.image) {
            setError("Please fill in every field before saving your recipe.");
            setSuccess(false);
            return;
        }

        const recipeData = {
            id: isEditing ? recipe.id : `custom-${Date.now()}`,
            name: form.name.trim(),
            prep: form.prep.trim(),
            description: form.description.trim(),
            image: form.image.trim(),
            ingredients: form.ingredients
                .split("\n")
                .map((line) => line.trim())
                .filter(Boolean),
            steps: form.steps
                .split("\n")
                .map((line) => line.trim())
                .filter(Boolean),
            isCustom: true,
        };

        const existing = getStoredCustomRecipes();

        const updatedList = isEditing
            ? existing.map((r) => (r.id === recipe.id ? recipeData : r))
            : [...existing, recipeData];

        localStorage.setItem(customRecipesKey, JSON.stringify(updatedList));

        setError("");
        setSuccess(true);

        if (isEditing) {

            onSaved?.(recipeData);
        } else {
            setForm(emptyForm);
        }
   }
}