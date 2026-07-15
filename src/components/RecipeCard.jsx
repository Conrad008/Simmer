import { Link } from "react-router-dom";
import { Clock } from "lucide-react";

const favoriteKey = "simmerFavorites";

const getStoredFavorites = () => {
    try {
        const stored = JSON.parse(localStorage.getItem(favoriteKey) || "[]");
        return Array.isArray(stored) ? stored : [];
    } catch {
        return [];
    }
};

export default function RecipeCard({ recipe }) {
    const { id, name, image, prep } = recipe;

    const [favorited, setFavorited] = useState(() => getStoredFavorites().includes(id));

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

    return (
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
    )

}