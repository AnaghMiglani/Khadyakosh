import { getDatabase } from "firebase/database";
import app from "./firebaseClient";



export const db = getDatabase(app);
