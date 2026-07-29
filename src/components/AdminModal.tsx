import React, { useState, useEffect } from "react";
import { EnrollmentData } from "../types";
import {
  ShieldCheck,
  Search,
  Filter,
  Download,
  Trash2,
  CheckCircle2,
  Clock,
  X,
  RefreshCw,
  Users,
  BookOpen,
  FileSpreadsheet
} from "lucide-react";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const [enrollments, setEnrollments] = useState<EnrollmentData[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [stats, setStats] = useState<any>(null);

  const fetchEnrollments = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (statusFilter !== "All") query.append("status", statusFilter);
      if (searchTerm) query.append("search", searchTerm);

      const [resList, resStats] = await Promise.all([
        fetch(`/api/enrollments?${query.toString()}`),
        fetch("/api/stats"),
      ]);

      const listData = await resList.json();
      const statsData = await resStats.json();

      setEnrollments(listData);
      setStats(statsData);
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchEnrollments();
    }
  }, [isOpen, statusFilter, searchTerm]);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/enrollments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchEnrollments();
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this enrollment submission?")) return;
    try {
      const res = await fetch(`/api/enrollments/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchEnrollments();
      }
    } catch (err) {
      console.error("Error deleting record:", err);
    }
  };

  const handleExportCSV = () => {
    if (enrollments.length === 0) return;

    const headers = ["Confirmation Code", "Child Name", "Grade", "Subject", "Format", "Parent Name", "Parent Email", "Parent Phone", "Status", "Date Submitted", "Notes"];
    const rows = enrollments.map((e) => [
      `"${e.confirmationCode || ""}"`,
      `"${e.childName || ""}"`,
      `"${e.childGrade || ""}"`,
      `"${e.subject || ""}"`,
      `"${e.format || ""}"`,
      `"${e.parentName || ""}"`,
      `"${e.parentEmail || ""}"`,
      `"${e.parentPhone || ""}"`,
      `"${e.status || ""}"`,
      `"${e.createdAt ? new Date(e.createdAt).toLocaleDateString() : ""}"`,
      `"${(e.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `brainy_bunch_enrollments_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 text-slate-100 rounded-3xl w-full max-w-6xl p-6 sm:p-8 shadow-2xl relative my-auto animate-fadeIn max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold text-white">Staff Enrollment Management Portal</h2>
                <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-cyan-500/30">
                  Backend Node/Express Connected
                </span>
              </div>
              <p className="text-xs text-slate-400">Manage incoming parent requests, statuses, and student applications in Irving, TX</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Summary Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-b border-slate-800 flex-shrink-0">
            <div className="bg-slate-800/60 p-3 rounded-2xl border border-slate-700/60 text-center">
              <span className="text-2xl font-black text-amber-400 block">{stats.total}</span>
              <span className="text-[11px] text-slate-400 font-medium">Total Applications</span>
            </div>
            <div className="bg-slate-800/60 p-3 rounded-2xl border border-slate-700/60 text-center">
              <span className="text-2xl font-black text-amber-400 block">{stats.pending}</span>
              <span className="text-[11px] text-slate-400 font-medium">Pending Review</span>
            </div>
            <div className="bg-slate-800/60 p-3 rounded-2xl border border-slate-700/60 text-center">
              <span className="text-2xl font-black text-emerald-400 block">{stats.enrolled}</span>
              <span className="text-[11px] text-slate-400 font-medium">Approved / Enrolled</span>
            </div>
            <div className="bg-slate-800/60 p-3 rounded-2xl border border-slate-700/60 text-center">
              <span className="text-2xl font-black text-blue-400 block">
                {stats.formats?.inPerson || 0} / {stats.formats?.online || 0}
              </span>
              <span className="text-[11px] text-slate-400 font-medium">In-Person / Online Split</span>
            </div>
          </div>
        )}

        {/* Toolbar Controls */}
        <div className="py-4 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search student, parent, or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Filter by status */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="py-1.5 px-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Contacted">Contacted</option>
              <option value="Approved">Approved</option>
              <option value="Enrolled">Enrolled</option>
              <option value="Archived">Archived</option>
            </select>

            <button
              onClick={fetchEnrollments}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition-colors"
              title="Refresh List"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>

          <button
            onClick={handleExportCSV}
            disabled={enrollments.length === 0}
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center justify-center transition-colors shadow cursor-pointer disabled:opacity-50"
          >
            <FileSpreadsheet className="w-4 h-4 mr-1.5" />
            Export CSV Report
          </button>
        </div>

        {/* Scrollable Data Table */}
        <div className="overflow-x-auto flex-1 border border-slate-800 rounded-2xl bg-slate-950/50">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/80 text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Code / Date</th>
                <th className="py-3 px-4">Student & Grade</th>
                <th className="py-3 px-4">Subject Requested</th>
                <th className="py-3 px-4">Format</th>
                <th className="py-3 px-4">Parent Info</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/60 font-medium">
              {enrollments.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-mono font-bold text-amber-400 block">{item.confirmationCode}</span>
                    <span className="text-[10px] text-slate-500">
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Recent"}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <span className="font-bold text-white block">{item.childName}</span>
                    <span className="text-[10px] text-cyan-400">{item.childGrade}</span>
                  </td>

                  <td className="py-3 px-4 text-slate-200">
                    {item.subject}
                  </td>

                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700 text-[10px] font-semibold">
                      {item.format}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <span className="block text-slate-200">{item.parentName}</span>
                    <span className="text-[10px] text-slate-400 block">{item.parentPhone}</span>
                    <span className="text-[10px] text-slate-500 block">{item.parentEmail}</span>
                  </td>

                  <td className="py-3 px-4">
                    <select
                      value={item.status || "Pending"}
                      onChange={(e) => handleUpdateStatus(item.id!, e.target.value)}
                      className={`text-[11px] font-bold px-2 py-1 rounded-lg bg-slate-900 border focus:outline-none ${
                        item.status === "Pending"
                          ? "text-amber-400 border-amber-500/50"
                          : item.status === "Approved" || item.status === "Enrolled"
                          ? "text-emerald-400 border-emerald-500/50"
                          : item.status === "Contacted"
                          ? "text-blue-400 border-blue-500/50"
                          : "text-slate-400 border-slate-700"
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Approved">Approved</option>
                      <option value="Enrolled">Enrolled</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleDelete(item.id!)}
                      className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                      title="Delete Record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}

              {enrollments.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500 font-medium">
                    No enrollment applications match your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 flex items-center justify-between text-xs text-slate-500 border-t border-slate-800 mt-2 flex-shrink-0">
          <span>Brainy Bunch Academy • Internal Director Dashboard</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
          >
            Close Dashboard
          </button>
        </div>

      </div>
    </div>
  );
};
