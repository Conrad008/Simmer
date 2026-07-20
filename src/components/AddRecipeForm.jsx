import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/config/firebase";
import { useAuth } from "@/context/AuthContext";
import { collection, addDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";



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
    const { user } = useAuth();
    const isEditing = Boolean(recipe);

    const [form, setForm] = useState(() => (isEditing ? recipeToFormValues(recipe) : emptyForm));
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setSuccess(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name || !form.prep || !form.description || !form.ingredients || !form.steps ) {
            setError("Please fill in every field before saving your recipe.");
            setSuccess(false);
            return;
        }

        const recipeData = {
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

        setError("");
        
        try {
            if (isEditing) {
                await updateDoc(doc(db, "recipes", recipe.id), recipeData);
                setSuccess(true);
                onSaved?.({ ...recipe, ...recipeData });
            } else {
                await addDoc(collection(db, "recipes"), {
                    ...recipeData,
                    createdBy: user?.uid || null,
                    createdByName: user?.displayName || user?.email || "Anonymous",
                    createdAt: serverTimestamp(),
                });
                setSuccess(true);
                setForm(emptyForm);
            }
        } catch (err) {
            setError(
                err?.message || "We couldn't save your recipe right now. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }

    }

    return (
        <div className={isEditing ? "" : "rounded-2xl border border-olive/10 bg-white p-6 shadow-sm dark:border-ivory/10 dark:bg-[#3A3E3C] sm:p-8"}>
            {!isEditing && (
                <>
                    <h2 className="font-serif text-2xl font-medium text-obsidian dark:text-ivory">
                        Share your own recipe
                    </h2>
                    <p className="mt-1 text-sm text-obsidian/60 dark:text-ivory/60">
                        Add a dish you love and it'll show up alongside everything else in Recipes and in My Recipes.
                    </p>
                </>
            )}

            <form className={isEditing ? "space-y-5" : "mt-6 space-y-5"} onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="space-y-1">
                        <label
                            htmlFor="name"
                            className="block text-xs font-semibold uppercase tracking-wider text-obsidian/70 dark:text-ivory/70"
                        >
                            Recipe Name
                        </label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Grandma's Lasagna"
                            value={form.name}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className="border-obsidian/10 bg-obsidian/[0.02] text-obsidian placeholder:text-obsidian/30 focus-visible:border-tomato/30 focus-visible:ring-tomato/20 dark:border-ivory/10 dark:bg-ivory/5 dark:text-ivory dark:placeholder:text-ivory/30"
                        />
                    </div>

                    <div className="space-y-1">
                        <label
                            htmlFor="prep"
                            className="block text-xs font-semibold uppercase tracking-wider text-obsidian/70 dark:text-ivory/70"
                        >
                            Prep Time
                        </label>
                        <Input
                            id="prep"
                            name="prep"
                            placeholder="25 mins"
                            value={form.prep}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className="border-obsidian/10 bg-obsidian/[0.02] text-obsidian placeholder:text-obsidian/30 focus-visible:border-tomato/30 focus-visible:ring-tomato/20 dark:border-ivory/10 dark:bg-ivory/5 dark:text-ivory dark:placeholder:text-ivory/30"
                        />
                    </div>

                </div>

                <div className="space-y-1">
                    <label
                        htmlFor="image"
                        className="block text-xs font-semibold uppercase tracking-wider text-obsidian/70 dark:text-ivory/70"
                    >
                        Image URL(optional)
                    </label>
                    <Input
                        id="image"
                        name="image"
                        type="url"
                        placeholder="https://images.unsplash.com/..."
                        value={form.image}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="border-obsidian/10 bg-obsidian/[0.02] text-obsidian placeholder:text-obsidian/30 focus-visible:border-tomato/30 focus-visible:ring-tomato/20 dark:border-ivory/10 dark:bg-ivory/5 dark:text-ivory dark:placeholder:text-ivory/30"
                    />
                </div>

                <div className="space-y-1">
                    <label
                        htmlFor="description"
                        className="block text-xs font-semibold uppercase tracking-wider text-obsidian/70 dark:text-ivory/70"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows={2}
                        placeholder="A short, tasty description of the dish."
                        value={form.description}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="w-full rounded-md border border-obsidian/10 bg-obsidian/[0.02] px-3 py-2 text-sm text-obsidian placeholder:text-obsidian/30 outline-none focus-visible:border-tomato/30 focus-visible:ring-2 focus-visible:ring-tomato/20 dark:border-ivory/10 dark:bg-ivory/5 dark:text-ivory dark:placeholder:text-ivory/30"
                    />
                </div>

                <div className="space-y-1">
                    <label
                        htmlFor="ingredients"
                        className="block text-xs font-semibold uppercase tracking-wider text-obsidian/70 dark:text-ivory/70"
                    >
                        Ingredients{" "}
                        <span className="normal-case text-obsidian/40 dark:text-ivory/40">(one per line)</span>
                    </label>
                    <textarea
                        id="ingredients"
                        name="ingredients"
                        rows={5}
                        placeholder={"2 cups flour\n1 tsp salt\n3 eggs"}
                        value={form.ingredients}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="w-full rounded-md border border-obsidian/10 bg-obsidian/[0.02] px-3 py-2 text-sm text-obsidian placeholder:text-obsidian/30 outline-none focus-visible:border-tomato/30 focus-visible:ring-2 focus-visible:ring-tomato/20 dark:border-ivory/10 dark:bg-ivory/5 dark:text-ivory dark:placeholder:text-ivory/30"
                    />
                </div>

                <div className="space-y-1">
                    <label
                        htmlFor="steps"
                        className="block text-xs font-semibold uppercase tracking-wider text-obsidian/70 dark:text-ivory/70"
                    >
                        Steps{" "}
                        <span className="normal-case text-obsidian/40 dark:text-ivory/40">(one per line)</span>
                    </label>
                    <textarea
                        id="steps"
                        name="steps"
                        rows={5}
                        placeholder={"Preheat the oven to 200°C.\nMix the dry ingredients.\nBake for 25 minutes."}
                        value={form.steps}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="w-full rounded-md border border-obsidian/10 bg-obsidian/[0.02] px-3 py-2 text-sm text-obsidian placeholder:text-obsidian/30 outline-none focus-visible:border-tomato/30 focus-visible:ring-2 focus-visible:ring-tomato/20 dark:border-ivory/10 dark:bg-ivory/5 dark:text-ivory dark:placeholder:text-ivory/30"
                    />
                </div>

                {error && (
                    <p className="rounded-lg border border-red-200 bg-red-50 p-2.5 text-xs text-red-600 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-400">
                        {error}
                    </p>
                )}

                {success && !isEditing && (
                    <p className="flex items-center gap-2 rounded-lg border border-olive/20 bg-olive/10 p-2.5 text-xs text-olive dark:border-olive/30 dark:bg-olive/15">
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                        Recipe added! Thank you for contributing to the community.
                    </p>
                )}

                <Button type="submit" disabled={isSubmitting} className="w-full bg-tomato text-ivory hover:bg-tomato/90 sm:w-auto">
                    {isSubmitting ? (
                        <span className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            {isEditing ? "Saving..." : "Adding..."}
                        </span>
                    ) : isEditing ? (
                        "Save Changes"
                    ) : (
                        "Add Recipe"
                    )}
                </Button>

            </form>
        </div>
    )
}