import { format } from "./formatDate";
import { LoaderCircle, LogOut, MailCheck, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { logoutAdmin } from "../lib/auth";
import { fetchSubmissions, markSubmissionContacted, removeSubmission } from "../lib/submissions";

export default function AdminDashboard({ user }) {
  const [submissions, setSubmissions] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: "" });
  const [busyId, setBusyId] = useState("");

  async function loadSubmissions() {
    setStatus({ loading: true, error: "" });

    try {
      const results = await fetchSubmissions();
      setSubmissions(results);
      setStatus({ loading: false, error: "" });
    } catch (error) {
      setStatus({ loading: false, error: error.message || "Unable to load submissions." });
    }
  }

  useEffect(() => {
    loadSubmissions();
  }, []);

  async function handleMarkContacted(id) {
    setBusyId(id);
    try {
      await markSubmissionContacted(id);
      await loadSubmissions();
    } finally {
      setBusyId("");
    }
  }

  async function handleDelete(id) {
    setBusyId(id);
    try {
      await removeSubmission(id);
      await loadSubmissions();
    } finally {
      setBusyId("");
    }
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="glass-panel rounded-[2rem] p-6 shadow-panel md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-display text-sm uppercase tracking-[0.35em] text-brand-600">Dashboard</p>
              <h1 className="mt-3 text-3xl font-bold text-ink md:text-4xl">Student inquiries</h1>
              <p className="mt-2 text-slate-600">Signed in as {user?.email}</p>
            </div>
            <button
              type="button"
              onClick={logoutAdmin}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-brand-200 hover:text-brand-700"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        <div className="mt-6 rounded-[2rem] bg-white p-6 shadow-soft md:p-8">
          {status.loading ? (
            <div className="flex min-h-56 items-center justify-center">
              <LoaderCircle className="animate-spin text-brand-600" size={28} />
            </div>
          ) : status.error ? (
            <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
              {status.error}
            </div>
          ) : submissions.length ? (
            <div className="grid gap-5">
              {submissions.map((item) => {
                const isBusy = busyId === item.id;
                return (
                  <article key={item.id} className="rounded-[1.75rem] border border-slate-100 bg-slate-50/80 p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="grid gap-3">
                        <div>
                          <p className="text-2xl font-bold text-ink">{item.name}</p>
                          <p className="mt-1 text-sm text-slate-500">{item.email}</p>
                          <p className="mt-1 text-sm text-slate-500">{item.phone}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-full bg-brand-50 px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-700">
                            {item.country}
                          </span>
                          <span className="rounded-full bg-accent-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
                            {item.course}
                          </span>
                          <span
                            className={`rounded-full px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] ${
                              item.status === "contacted"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-slate-200 text-slate-700"
                            }`}
                          >
                            {item.status || "new"}
                          </span>
                        </div>
                        <p className="max-w-3xl text-sm leading-7 text-slate-600">
                          {item.message || "No additional message provided."}
                        </p>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                          Submitted {format(item.createdAt)}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() => handleMarkContacted(item.id)}
                          disabled={isBusy || item.status === "contacted"}
                          className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <MailCheck size={16} />
                          Mark Contacted
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          disabled={isBusy}
                          className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-[1.75rem] bg-slate-50 p-8 text-center">
              <p className="text-lg font-bold text-ink">No inquiries yet.</p>
              <p className="mt-2 text-slate-600">New student form submissions will appear here once the contact form is live.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
