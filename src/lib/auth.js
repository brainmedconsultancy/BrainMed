import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, hasFirebaseConfig } from "./firebase";

const allowedAdminEmail = import.meta.env.VITE_ADMIN_EMAIL?.toLowerCase().trim();

export async function loginAdmin(email, password) {
  if (!hasFirebaseConfig || !auth) {
    throw new Error("Firebase is not configured. Add your environment variables first.");
  }

  const credential = await signInWithEmailAndPassword(auth, email, password);
  const normalizedEmail = credential.user.email?.toLowerCase().trim();

  if (allowedAdminEmail && normalizedEmail !== allowedAdminEmail) {
    await signOut(auth);
    throw new Error("This account is not authorized to access the admin dashboard.");
  }

  return credential;
}

export async function logoutAdmin() {
  if (!auth) {
    return;
  }

  await signOut(auth);
}
