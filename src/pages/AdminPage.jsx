import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import AdminDashboard from "../components/admin/AdminDashboard";
import AdminLogin from "../components/admin/AdminLogin";
import { auth, hasFirebaseConfig } from "../lib/firebase";

export default function AdminPage() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    if (!hasFirebaseConfig || !auth) {
      setUser(null);
      return undefined;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser ?? null);
    });

    return unsubscribe;
  }, []);

  if (!hasFirebaseConfig) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="max-w-xl rounded-[2rem] bg-white p-8 text-center shadow-panel">
          <p className="font-display text-sm uppercase tracking-[0.35em] text-brand-600">
            Setup Required
          </p>
          <h1 className="mt-4 text-3xl font-bold text-ink">
            Firebase configuration is missing.
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Add the environment variables from `.env.example` to a local `.env`
            file, then restart the app.
          </p>
        </div>
      </div>
    );
  }

  if (user === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" />
      </div>
    );
  }

  return user ? <AdminDashboard user={user} /> : <AdminLogin />;
}
