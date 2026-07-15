import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signOut, GoogleAuthProvider,} from "@/config/firebase";

const AuthContext = createContext(undefined);
 
const googleProvider = new GoogleAuthProvider();