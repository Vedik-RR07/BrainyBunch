import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "./Logo";
import { CheckCircle2, Clock3, CalendarDays, LogOut, Sparkles, UserCircle } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { getEnrollments, updateEnrollmentStatus } from "../lib/enrollmentService";

interface EnrollmentRecord {
  id: string;
  parent_name: string;
  parent_email: string;
  parent_phone: string;
  child_name: string;
  child_grade: string;
  subject: string;
  subjects: string[] | string;
  format: string;
  preferred_time: string;
  assessment_date: string | null;
  assessment_time: string | null;
  status: string;
  confirmation_code: string;
  created_at: string;
}

const pageSize = 5;

const STATUS_OPTIONS = [
  { value: "Pending", label: "Pending", color: "bg-amber-100 text-amber-800" },
  { value: "Contacted", label: "Contacted", color: "bg-sky-100 text-sky-800" },
  { value: "Scheduled", label: "Scheduled", color: "bg-cyan-100 text-cyan-800" },
  { value: "Completed", label: "Completed", color: "bg-emerald-100 text-emerald-800" },
  { value: "Cancelled", label: "Cancelled", color: "bg-rose-100 text-rose-800" },
] as const;

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [enrollments, setEnrollments] = useState<EnrollmentRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [statusUpdating, setStatusUpdating] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const loadDashboard = async () => {
      setIsLoading(true);
      setFetchError(null);

      try {
        const { data: sessionData } = await supabase.auth.getSession();
        console.log("[DEBUG] AdminDashboard current session:", sessionData);

        if (!sessionData.session) {
          navigate("/admin/login");
          return;
        }

        const { data: userData } = await supabase.auth.getUser();
        console.log("[DEBUG] AdminDashboard current user:", userData);
        console.log("[DEBUG] AdminDashboard auth UID:", userData?.user?.id ?? null);

        const liveEnrollments = await getEnrollments({ orderBy: "created_at", ascending: false });
        setEnrollments(liveEnrollments);
      } catch (error) {
        console.error("Failed to load enrollments", error);
        setFetchError(
          error instanceof Error
            ? error.message
            : "Unable to load enrollments. Please refresh the page."
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboard();
  }, [navigate]);

  useEffect(() => {
    const signOutOnUnload = () => {
      void supabase.auth.signOut();
    };

    window.addEventListener("beforeunload", signOutOnUnload);
    window.addEventListener("pagehide", signOutOnUnload);

    return () => {
      window.removeEventListener("beforeunload", signOutOnUnload);
      window.removeEventListener("pagehide", signOutOnUnload);
    };
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setStatusUpdating((prev) => ({ ...prev, [id]: true }));

    try {
      await updateEnrollmentStatus(id, newStatus);
      setEnrollments((current) =>
        current.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item
        )
      );
    } catch (error) {
      console.error("Failed to update enrollment status:", error);
    } finally {
      setStatusUpdating((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const stats = useMemo(() => {
    const total = enrollments.length;
    const pending = enrollments.filter((item) => item.status === "Pending").length;
    const contacted = enrollments.filter((item) => item.status === "Contacted").length;
    const scheduled = enrollments.filter((item) => item.status === "Scheduled").length;
    const completed = enrollments.filter((item) => item.status === "Completed").length;
    const cancelled = enrollments.filter((item) => item.status === "Cancelled").length;

    return { total, pending, contacted, scheduled, completed, cancelled };
  }, [enrollments]);

  const pageCount = Math.max(1, Math.ceil(enrollments.length / pageSize));
  const currentPageItems = enrollments.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    if (page > pageCount) {
      setPage(pageCount);
    }
  }, [page, pageCount]);

  const getSubjectsText = (subjects: string[] | string) =>
    Array.isArray(subjects) ? subjects.join(", ") : subjects;

  const formatDate = (value: string | null) => value || "-";
  const formatCreatedAt = (value: string) => value.slice(0, 10);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 selection:bg-purple-200 selection:text-slate-950">
      <div className="bg-gradient-to-b from-purple-950 via-purple-900 to-purple-800 text-white pb-12">
        <div className="max-w-7xl mx-auto px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-3xl bg-white/10 p-3 shadow-lg shadow-black/10">
                <Logo size="sm" variant="dark" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-purple-200/80">Admin Dashboard</p>
                <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Brainy Bunch Learning Academy</h1>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:items-end sm:flex-row sm:gap-4">
              <div className="rounded-3xl bg-white/10 px-4 py-3 text-sm text-purple-100 shadow-lg shadow-black/10">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-100/15 text-white">
                    <UserCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Ava Morgan</p>
                    <p className="text-xs uppercase tracking-[0.24em] text-purple-200/80">Administrator</p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center justify-center gap-2 rounded-3xl bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-purple-950 shadow-lg shadow-black/10 transition hover:bg-slate-100"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="-mt-10 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {[
              {
                label: "Total Enrollments",
                value: stats.total,
                icon: <Sparkles className="h-5 w-5 text-white" />,
                accent: "bg-purple-950 text-white",
              },
              {
                label: "Pending",
                value: stats.pending,
                icon: <Clock3 className="h-5 w-5 text-white" />,
                accent: "bg-amber-500 text-slate-950",
              },
              {
                label: "Contacted",
                value: stats.contacted,
                icon: <UserCircle className="h-5 w-5 text-white" />,
                accent: "bg-sky-500 text-slate-950",
              },
              {
                label: "Scheduled",
                value: stats.scheduled,
                icon: <CalendarDays className="h-5 w-5 text-white" />,
                accent: "bg-cyan-500 text-slate-950",
              },
              {
                label: "Completed",
                value: stats.completed,
                icon: <CheckCircle2 className="h-5 w-5 text-white" />,
                accent: "bg-emerald-500 text-slate-950",
              },
              {
                label: "Cancelled",
                value: stats.cancelled,
                icon: <LogOut className="h-5 w-5 text-white" />,
                accent: "bg-rose-500 text-white",
              },
            ].map((card) => (
              <div key={card.label} className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">{card.label}</p>
                    <p className="mt-4 text-3xl font-black text-slate-950">{card.value}</p>
                  </div>
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-3xl ${card.accent}`}>
                    {card.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <section className="mt-10 overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-slate-200">
            <div className="border-b border-slate-200 bg-slate-50 px-6 py-5 sm:px-8">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-700">Enrollment Submissions</p>
                  <p className="mt-1 text-sm text-slate-600">Recent inquiries and assessment requests with an admin-friendly overview.</p>
                </div>
                <div className="text-sm text-slate-500">Showing {currentPageItems.length} of {enrollments.length} records</div>
              </div>
            </div>

            {fetchError && (
              <div className="border-b border-rose-200 bg-rose-50 px-6 py-4 text-sm text-rose-700 sm:px-8">
                {fetchError}
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="min-w-[1400px] w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                <thead className="bg-slate-100 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  <tr>
                    <th className="px-5 py-4">Parent Name</th>
                    <th className="px-5 py-4">Parent Email</th>
                    <th className="px-5 py-4">Parent Phone</th>
                    <th className="px-5 py-4">Child Name</th>
                    <th className="px-5 py-4">Grade</th>
                    <th className="px-5 py-4">Subject(s)</th>
                    <th className="px-5 py-4">Session Format</th>
                    <th className="px-5 py-4">Preferred Time</th>
                    <th className="px-5 py-4">Assessment Date</th>
                    <th className="px-5 py-4">Assessment Time</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Confirmation Code</th>
                    <th className="px-5 py-4">Submitted Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {isLoading ? (
                    <tr>
                      <td colSpan={13} className="px-5 py-10">
                        <div className="flex flex-col items-center justify-center gap-4">
                          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-purple-950"></div>
                          <p className="text-sm text-slate-600">Loading enrollment records...</p>
                        </div>
                      </td>
                    </tr>
                  ) : currentPageItems.length === 0 ? (
                    <tr>
                      <td colSpan={13} className="px-5 py-10 text-center text-sm text-slate-600">
                        No enrollment records were found.
                      </td>
                    </tr>
                  ) : (
                    currentPageItems.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-5 py-4 font-semibold text-slate-900">{row.parent_name}</td>
                        <td className="px-5 py-4 text-slate-600">{row.parent_email}</td>
                        <td className="px-5 py-4 text-slate-600">{row.parent_phone}</td>
                        <td className="px-5 py-4 text-slate-900">{row.child_name}</td>
                        <td className="px-5 py-4 text-slate-600">{row.child_grade}</td>
                        <td className="px-5 py-4 text-slate-600">{getSubjectsText(row.subjects)}</td>
                        <td className="px-5 py-4 text-slate-600">{row.format}</td>
                        <td className="px-5 py-4 text-slate-600">{row.preferred_time}</td>
                        <td className="px-5 py-4 text-slate-600">{formatDate(row.assessment_date)}</td>
                        <td className="px-5 py-4 text-slate-600">{formatDate(row.assessment_time)}</td>
                        <td className="px-5 py-4">
                          <select
                            value={row.status}
                            onChange={(event) => handleStatusChange(row.id, event.target.value)}
                            disabled={statusUpdating[row.id]}
                            className="min-w-[160px] rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200 disabled:cursor-not-allowed disabled:opacity-70"
                          >
                            {STATUS_OPTIONS.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                            {!STATUS_OPTIONS.some((option) => option.value === row.status) && (
                              <option key={row.status} value={row.status}>{row.status}</option>
                            )}
                          </select>
                        </td>
                        <td className="px-5 py-4 font-mono text-slate-700">{row.confirmation_code}</td>
                        <td className="px-5 py-4 text-slate-600">{formatCreatedAt(row.created_at)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <div className="text-sm text-slate-600">
                Page {page} of {pageCount}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage((current) => Math.max(current - 1, 1))}
                  disabled={page === 1 || isLoading}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => setPage((current) => Math.min(current + 1, pageCount))}
                  disabled={page === pageCount || isLoading}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
