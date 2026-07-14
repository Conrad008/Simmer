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

