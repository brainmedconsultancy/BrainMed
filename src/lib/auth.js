import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, hasFirebaseConfig } from "./firebase";

const allowedAdminEmail = import.meta.env.VITE_ADMIN_EMAIL?.toLowerCase().trim();

export async function loginAdmin(email, password) {
  if (!hasFirebaseConfig || !auth) {
    throw new Error("Firebase is not configured. Add your environment variables first.");
  }

  const credential = await signInWithEmailAndPassword(auth, email, password);

  return credential;
}

export async function logoutAdmin() {
  if (!auth) {
    return;
  }

  await signOut(auth);
}
