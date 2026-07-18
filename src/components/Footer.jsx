import { Link } from "react-router-dom";
import { ChefHat } from "lucide-react";

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
  { label: "TikTok", href: "https://www.tiktok.com/@simmer", icon: tikTokIcon },
//   { label: "Instagram", href: "https://www.instagram.com/simmer", icon: Instagram },
  { label: "X", href: "https://www.x.com/simmer", icon: XIcon },
];

export default function Footer() {
    return(
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
                        Discover recipes, save your favorites, and share your own creations with the
                        community.
                    </p>
                </div>

                <div>
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-obsidian/40 dark:text-ivory/40">
                        Quick Links
                    </h3>
                    <ul className="mt-4 space-y-2.5">
                        {quickLinks.map(({ to, label }) => (
                            <li key={to}>
                                <Link
                                    to={to}
                                    className="text-sm text-obsidian/70 transition-colors hover:text-tomato dark:text-ivory/70"
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-obsidian/40 dark:text-ivory/40">
                        Follow Us
                    </h3>
                    <div className="mt-4 flex items-center gap-3">
                        {socialLinks.map(({ label, href, icon: Icon }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-olive/20 text-obsidian/70 transition-colors hover:border-tomato hover:text-tomato dark:border-ivory/20 dark:text-ivory/70"
                            >
                                <Icon className="h-4 w-4" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-10 flex flex-col items-center gap-3 border-t border-olive/10 pt-6 text-center dark:border-ivory/10 sm:flex-row sm:justify-between sm:text-left">
                <p className="text-sm text-obsidian/60 dark:text-ivory/60">
                    &copy; 2026 Simmer. Crafted with soul.
                </p>
                <div className="flex gap-6">
                    <a
                        href="#"
                        className="text-sm text-obsidian/60 underline-offset-4 hover:text-tomato hover:underline dark:text-ivory/60"
                    >
                        Privacy Policy
                    </a>
                    <a
                        href="#"
                        className="text-sm text-obsidian/60 underline-offset-4 hover:text-tomato hover:underline dark:text-ivory/60"
                    >
                        Help Center
                    </a>
                </div>
            </div>
        </div>
    </footer>
    )

}