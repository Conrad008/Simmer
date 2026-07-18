import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { ArrowLeft, Clock, ChefHat, ListChecks, UtensilsCrossed, ImageOff, Loader2, AlertCircle } from "lucide-react";
import { db } from "@/config/firebase";
