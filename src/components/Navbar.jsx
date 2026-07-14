import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { ChefHat, Heart, BookMarked, Menu, X, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeContext } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
    { to: "/recipes", label: "Recipes" },
    { to: "/my-recipes", label: "My Recipes", icon: BookMarked },
    { to: "/favorites", label: "Favorites", icon: Heart },
];

export default function Navbar() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { user, isAuthenticated, logout } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-obsidian/10 bg-ivory/95 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-8">
                <NavLink to="/" className="flex items-center gap-2 font-serif text-2xl font-medium tracking-tight text-obsidian">
                    <ChefHat className="h-6 w-6 text-tomato" strokeWidth={2} />
                    Simmer
                </NavLink>

                <nav className="hidden items-center gap-1 md:flex">
                    {navLinks.map(({ to, label, end, icon: Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={end}
                            className={({ isActive }) =>
                                `flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${isActive ? "bg-olive/10 text-olive" : "text-obsidian/70 hover:bg-obsidian/5 hover:text-obsidian"}`
                            }
                        >
                            {Icon && <Icon className="h-3.5 w-3.5" strokeWidth={2.5} />}
                            {label}
                        </NavLink>
                    ))}
                </nav>

                <div className="hidden items-center gap-2 md:flex">
                    <Button
                        asChild
                        variant="ghost"
                        className="text-obsidian/80 hover:bg-obsidian/5 hover:text-obsidian">
                        <NavLink to="/login" className="flex items-center gap-1.5">
                            <LogIn className="h-4 w-4" />Log in
                        </NavLink>
                    </Button>

                    <Button asChild className="bg-tomato text-ivory hover:bg-tomato/90">
                        <NavLink to="/register" className="flex items-center gap-1.5">
                            <UserPlus className="h-4 w-4" />
                            Register
                        </NavLink>
                    </Button>
                </div>
                
            </div>

        </header>
    )
}