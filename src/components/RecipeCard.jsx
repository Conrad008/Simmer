import { Link } from "react-router-dom";
import { Clock, Heart, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import AddRecipeForm from "@/components/AddRecipeForm";


const favoriteKey = "simmerFavorites";
const customRecipesKey = "simmerCustomRecipes";


const getStoredFavorites = () => {
    try {
        const stored = JSON.parse(localStorage.getItem(favoriteKey) || "[]");
        return Array.isArray(stored) ? stored : [];
    } catch {
        return [];
    }
};

const getStoredCustomRecipes = () => {
    try {
        const stored = JSON.parse(localStorage.getItem(customRecipesKey) || "[]");
        return Array.isArray(stored) ? stored : [];
    } catch {
        return [];
    }
};

export default function RecipeCard({ recipe }) {
    const { id, name, image, prep, isCustom } = recipe;

    const [favorited, setFavorited] = useState(() => getStoredFavorites().includes(id));

    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const stored = getStoredFavorites();
        const updated = stored.includes(id)
            ? stored.filter((favId) => favId !== id)
            : [...stored, id];

        localStorage.setItem(favoriteKey, JSON.stringify(updated));
        setFavorited(updated.includes(id));
    };

    const handleEditClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setEditOpen(true);
    };

    const handleSaved = () => {
        setEditOpen(false);

        window.location.reload();
    };

    const handleDeleteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDeleteOpen(true);
    };

    const confirmDelete = () => {
        const remainingRecipes = getStoredCustomRecipes().filter((r) => r.id !== id);
        localStorage.setItem(customRecipesKey, JSON.stringify(remainingRecipes));


        const remainingFavorites = getStoredFavorites().filter((favId) => favId !== id);
        localStorage.setItem(favoriteKey, JSON.stringify(remainingFavorites));

        window.location.reload();
    };


    return (
        <>
            <Link
                to={`/recipes/${id}`}
                className="group block overflow-hidden rounded-2xl border border-olive/10 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-ivory/10 dark:bg-[#3A3E3C] dark:shadow-black/20"
            >

                <div className="aspect-[4/3] w-full overflow-hidden bg-obsidian/5 dark:bg-ivory/5">
                    <img
                        src={image}
                        alt={name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {isCustom && (
                        <div className="absolute left-3 top-3 flex flex-col gap-2">
                            <button
                                type="button"
                                onClick={handleEditClick}
                                aria-label="Edit recipe"
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition-transform hover:scale-110 active:scale-95 dark:bg-obsidian/80"
                            >
                                <Pencil className="h-4 w-4 text-obsidian dark:text-ivory" strokeWidth={2} />
                            </button>

                            <button
                                type="button"
                                onClick={handleDeleteClick}
                                aria-label="Delete recipe"
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition-transform hover:scale-110 hover:bg-red-50 active:scale-95 dark:bg-obsidian/80 dark:hover:bg-red-950/40"
                            >
                                <Trash2 className="h-4 w-4 text-red-500" strokeWidth={2} />
                            </button>
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={handleFavoriteClick}
                        aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
                        aria-pressed={favorited}
                        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition-transform hover:scale-110 active:scale-95 dark:bg-obsidian/80"
                    >
                        <Heart
                            className={`h-4.5 w-4.5 transition-colors ${favorited ? "fill-tomato text-tomato" : "fill-none text-obsidian dark:text-ivory"
                                }`}
                            strokeWidth={2}
                        />
                    </button>
                </div>

                <div className="p-4">
                    <h3 className="font-serif text-base font-medium leading-snug text-obsidian dark:text-ivory sm:text-lg">
                        {name}
                    </h3>

                    <div className="mt-2 flex items-center gap-1.5 text-sm text-obsidian/60 dark:text-ivory/60">
                        <Clock className="h-3.5 w-3.5 text-tomato" strokeWidth={2.5} />
                        {prep}
                    </div>

                </div>

            </Link>

            {isCustom && (
                <>
                    
                    <Dialog open={editOpen} onOpenChange={setEditOpen}>
                        <DialogContent className="max-h-[90vh] overflow-y-auto border-olive/10 bg-white dark:border-ivory/10 dark:bg-[#3A3E3C] sm:max-w-2xl">
                            <DialogHeader>
                                <DialogTitle className="font-serif text-2xl font-medium text-obsidian dark:text-ivory">
                                    Edit recipe
                                </DialogTitle>
                            </DialogHeader>
                            <AddRecipeForm recipe={recipe} onSaved={handleSaved} />
                        </DialogContent>
                    </Dialog>

                    <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                        <AlertDialogContent className="border-olive/10 bg-white dark:border-ivory/10 dark:bg-[#3A3E3C]">
                            <AlertDialogHeader>
                                <AlertDialogTitle className="font-serif text-xl font-medium text-obsidian dark:text-ivory">
                                    Delete "{name}"?
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-obsidian/60 dark:text-ivory/60">
                                    This can't be undone. This recipe will be permanently removed from your
                                    collection, along with your favorites list if it was saved there.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className="border-obsidian/10 text-obsidian hover:bg-obsidian/5 dark:border-ivory/10 dark:text-ivory dark:hover:bg-ivory/10">
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={confirmDelete}
                                    className="bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-300 dark:hover:bg-red-600"
                                >
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </>
            )}
        </>
    )
}