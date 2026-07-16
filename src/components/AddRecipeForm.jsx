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