import { LoaderCircle, LockKeyhole } from "lucide-react";
import { useState } from "react";
import { loginAdmin } from "../../lib/auth";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      await loginAdmin(email, password);
      setStatus({ type: "success", message: "Login successful. Loading dashboard..." });
    } catch (error) {
      setStatus({
        type: "error",
        message: "Login failed. Please check your admin email and password.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl items-center px-4 py-10">
      <div className="grid w-full gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[2rem] bg-ink p-8 text-white shadow-panel md:p-10">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-accent-300">
            <LockKeyhole size={24} />
          </div>
          <p className="mt-6 font-display text-sm uppercase tracking-[0.35em] text-brand-200">Admin Access</p>
          <h1 className="mt-4 text-4xl font-bold">Secure dashboard login for inquiry management.</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-200">
            Only your admin team needs authentication. Students can submit inquiries publicly without creating accounts.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass-panel rounded-[2rem] p-8 shadow-panel md:p-10">
          <h2 className="text-3xl font-bold text-ink">Sign in</h2>
          <p className="mt-3 text-slate-600">Use your Firebase Authentication admin credentials to access the dashboard.</p>

          <div className="mt-8 space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-700">Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-medium text-slate-800 outline-none transition focus:border-brand-500"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-700">Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-medium text-slate-800 outline-none transition focus:border-brand-500"
              />
            </label>
          </div>

          {status.message && (
            <div
              className={`mt-5 rounded-2xl px-4 py-3 text-sm font-semibold ${
                status.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
              }`}
            >
              {status.message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-4 text-sm font-bold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? <LoaderCircle className="animate-spin" size={18} /> : null}
            Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
