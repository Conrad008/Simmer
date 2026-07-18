import { Link } from "react-router-dom";
import { ChefHat, Instagram } from "lucide-react";

const quickLinks = [
    { to: "/home", label: "Home" },
    { to: "/recipes", label: "Recipes" },
    { to: "/my-recipes", label: "My Recipes" },
    { to: "/favorites", label: "Favorites" },
];

const tikTokIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M16.6 5.82a4.28 4.28 0 0 1-3.02-1.36V.02h-3.2v14.6a2.6 2.6 0 1 1-1.84-2.49v-3.28a5.8 5.8 0 1 0 5.04 5.77V8.28a7.44 7.44 0 0 0 4.35 1.4V6.5a4.3 4.3 0 0 1-1.33-.68z" />
  </svg>
);
 
const XIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.24 2H21l-6.5 7.43L22.15 22H16.1l-4.73-6.2L5.94 22H3.17l6.96-7.95L2.1 2h6.2l4.28 5.66L18.24 2Zm-1.06 18.17h1.53L6.9 3.75H5.25l11.93 16.42Z" />
  </svg>
);

const socialLinks = [
  { label: "TikTok", href: "https://www.tiktok.com/@simmer", icon: TikTokIcon },
  { label: "Instagram", href: "https://www.instagram.com/simmer", icon: Instagram },
  { label: "X", href: "https://www.x.com/simmer", icon: XIcon },
];

export default function Footer() {
    <footer className="border-t border-olive/10 bg-ivory dark:border-ivory/10 dark:bg-obsidian">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
                <div>
                    <Link to="/" className="flex items-center gap-2">
                        <ChefHat className="h-6 w-6 text-tomato" strokeWidth={2} />
                        <span className="font-serif text-xl font-semibold tracking-tight text-obsidian dark:text-ivory">
                          Simmer
                        </span>
                    </Link>
                    <p className="mt-3 max-w-xs text-sm leading-relaxed text-obsidian/60 dark:text-ivory/60">
                        &copy;2026 Simmer. All rights reserved.
                        Discover recipes, save your favorites, and share your own creations with the
                        community.
                    </p>
                </div>
            </div>
        </div>
    </footer>
}