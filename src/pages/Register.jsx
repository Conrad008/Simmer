import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChefHat, Mail, Lock, User, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";

const getFriendlyAuthError = (code) => {
    switch (code) {
        case "auth/email-already-in-use":
            return "An account with this email already exists. Try logging in instead.";
        case "auth/invalid-email":
            return "That email address doesn't look right.";
        case "auth/weak-password":
            return "Your password should be at least 6 characters.";
        case "auth/too-many-requests":
            return "Too many attempts. Please wait a moment and try again.";
        case "auth/network-request-failed":
            return "Network error. Check your connection and try again.";
        default:
            return null;
    }
};