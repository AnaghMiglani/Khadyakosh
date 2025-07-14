import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "./firebaseClient";
import { GoogleAuthProvider } from "firebase/auth";

export const provider = new GoogleAuthProvider();

export const auth = getAuth(app);

export const signUp = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password);



export const signIn = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);

export const logout = () => signOut(auth);
