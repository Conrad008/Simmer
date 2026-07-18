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

}