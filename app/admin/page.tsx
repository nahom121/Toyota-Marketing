"use client";

import { useState, useCallback } from "react";
import { Download, RefreshCw, Lock, Users, Ticket, Footprints, DollarSign } from "lucide-react";

type Attendee = {
  date: string;
  name: string;
  email: string;
  phone: string;
  tickets: number;
  rentals: number;
  skateSizes: string;
  amountPaid: string;
  sessionId: string;
};

type Stats = {
  totalAttendees: number;
  totalTickets: number;
  totalRentals: number;
  totalRevenue: number;
};

function computeStats(attendees: Attendee[]): Stats {
  return {
    totalAttendees: attendees.length,
    totalTickets: attendees.reduce((s, a) => s + a.tickets, 0),
    totalRentals: attendees.reduce((s, a) => s + a.rentals, 0),
    totalRevenue: attendees.reduce((s, a) => s + parseFloat(a.amountPaid), 0),
  };
}

function exportCSV(attendees: Attendee[]) {
  const headers = ["Date", "Name", "Email", "Phone", "Tickets", "Rentals", "Skate Sizes", "Amount Paid", "Session ID"];
  const rows = attendees.map((a) => [
    new Date(a.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" }),
    a.name,
    a.email,
    a.phone,
    a.tickets,
    a.rentals,
    a.skateSizes,
    `$${a.amountPaid}`,
    a.sessionId,
  ]);
  const csv = [headers, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `hsp-registrations-${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [attendees, setAttendees] = useState<Attendee[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [authed, setAuthed] = useState(false);

  const fetchData = useCallback(async (pw: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/sessions?password=${encodeURIComponent(pw)}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to load");
        setAuthed(false);
      } else {
        setAttendees(data.attendees);
        setAuthed(true);
      }
    } catch {
      setError("Network error — try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData(password);
  };

  const stats = attendees ? computeStats(attendees) : null;

  if (!authed) {
    return (
      <main className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-charcoal flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 text-sand" />
            </div>
            <h1 className="font-display text-3xl text-charcoal">Admin</h1>
            <p className="text-ink-secondary text-sm mt-1">Houston Skate Project · Registrations</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              className="form-input w-full"
              autoFocus
            />
            {error && <p className="text-crimson text-sm text-center">{error}</p>}
            <button
              type="submit"
              disabled={loading || !password}
              className="btn-primary w-full py-3 disabled:opacity-50"
            >
              {loading ? "Checking…" : "Sign In"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl text-charcoal">Registrations</h1>
            <p className="text-ink-secondary text-sm mt-0.5">Houston Skate Project · August 9, 2026</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => fetchData(password)}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-charcoal/20 text-charcoal text-sm hover:bg-charcoal/5 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            {attendees && attendees.length > 0 && (
              <button
                onClick={() => exportCSV(attendees)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-charcoal text-white text-sm hover:bg-charcoal-soft transition-colors"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Orders", value: stats.totalAttendees, icon: Users, color: "text-charcoal" },
              { label: "Tickets", value: stats.totalTickets, icon: Ticket, color: "text-charcoal" },
              { label: "Rentals", value: stats.totalRentals, icon: Footprints, color: "text-charcoal" },
              { label: "Revenue", value: `$${stats.totalRevenue.toFixed(2)}`, icon: DollarSign, color: "text-crimson" },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="bg-cream-light border border-charcoal/10 rounded-2xl p-5">
                <Icon className={`w-5 h-5 ${color} mb-2 opacity-60`} />
                <p className={`font-bold text-2xl ${color}`}>{value}</p>
                <p className="text-ink-muted text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Table */}
        {attendees && attendees.length === 0 && (
          <div className="text-center py-20 text-ink-muted">No paid registrations yet.</div>
        )}

        {attendees && attendees.length > 0 && (
          <div className="bg-cream-light border border-charcoal/10 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-charcoal/10 bg-charcoal/5">
                    {["Date", "Name", "Email", "Phone", "Tickets", "Rentals", "Skate Sizes", "Paid"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-ink-muted uppercase tracking-wider whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {attendees.map((a, i) => (
                    <tr key={a.sessionId} className={`border-b border-charcoal/5 last:border-0 ${i % 2 === 0 ? "" : "bg-charcoal/[0.02]"}`}>
                      <td className="px-4 py-3 text-ink-muted whitespace-nowrap">
                        {new Date(a.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}{" "}
                        <span className="text-xs opacity-60">
                          {new Date(a.date).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-medium text-charcoal whitespace-nowrap">{a.name}</td>
                      <td className="px-4 py-3 text-ink-secondary">{a.email}</td>
                      <td className="px-4 py-3 text-ink-secondary whitespace-nowrap">{a.phone}</td>
                      <td className="px-4 py-3 text-center font-semibold text-charcoal">{a.tickets}</td>
                      <td className="px-4 py-3 text-center font-semibold text-charcoal">{a.rentals}</td>
                      <td className="px-4 py-3 text-ink-secondary text-xs">{a.skateSizes}</td>
                      <td className="px-4 py-3 font-bold text-crimson whitespace-nowrap">${a.amountPaid}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <p className="text-ink-muted text-xs text-center mt-8">
          Data pulled live from Stripe · {new Date().toLocaleString()}
        </p>
      </div>
    </main>
  );
}
