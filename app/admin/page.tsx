"use client";

import { useState, useCallback, useEffect } from "react";
import { Download, RefreshCw, Lock, Users, Ticket, DollarSign, ArrowRight, Trash2, Plus } from "lucide-react";

type Transfer = {
  id: string;
  name: string;
  fromWorkshop: string;
  fromSlot: string;
  toWorkshop: string;
  toSlot: string;
  note: string;
  addedAt: string;
};

const WORKSHOPS = [
  "Workshop 3 · Sep 6, 2026",
  "Workshop 2 · Aug 30, 2026",
  "Workshop 1 · Aug 9, 2026",
];

const SLOTS_BY_WORKSHOP: Record<string, string[]> = {
  "Workshop 3 · Sep 6, 2026": ["1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"],
  "Workshop 2 · Aug 30, 2026": ["9:30 AM", "10:30 AM", "11:30 AM", "12:30 PM"],
  "Workshop 1 · Aug 9, 2026": ["1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"],
};

const WORKSHOP_TO_FILTER: Record<string, string> = {
  "Workshop 3 · Sep 6, 2026": "current",
  "Workshop 2 · Aug 30, 2026": "workshop2",
  "Workshop 1 · Aug 9, 2026": "previous",
};

const FILTER_TO_WORKSHOP: Record<string, string> = {
  current: "Workshop 3 · Sep 6, 2026",
  workshop2: "Workshop 2 · Aug 30, 2026",
  previous: "Workshop 1 · Aug 9, 2026",
};

type Attendee = {
  date: string;
  name: string;
  email: string;
  phone: string;
  timeSlot: string;
  tickets: number;
  amountPaid: string;
  sessionId: string;
};

type Stats = {
  totalAttendees: number;
  totalTickets: number;
  totalRevenue: number;
};

const SLOT_TITLES: Record<string, string> = {
  "1:00 PM": "Pre-Beginner",
  "2:00 PM": "Beginner",
  "3:00 PM": "Beginner",
  "4:00 PM": "Backwards Beginner",
};

const SLOT_ORDER = [
  "9:30 AM", "10:30 AM", "11:30 AM", "12:30 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
];

function getSlotTitle(timeSlot: string): string {
  const first = timeSlot.split("+")[0].trim();
  return SLOT_TITLES[first] || "—";
}

function slotSortKey(timeSlot: string): number {
  const first = timeSlot.split("+")[0].trim();
  const idx = SLOT_ORDER.indexOf(first);
  return idx === -1 ? 999 : idx;
}

function computeStats(attendees: Attendee[]): Stats {
  return {
    totalAttendees: attendees.length,
    totalTickets: attendees.reduce((s, a) => s + a.tickets, 0),
    totalRevenue: attendees.reduce((s, a) => s + parseFloat(a.amountPaid), 0),
  };
}

function exportCSV(attendees: Attendee[]) {
  const headers = ["Date", "Name", "Email", "Phone", "Session", "Level", "Tickets", "Amount Paid", "Session ID"];
  const rows = attendees.map((a) => [
    new Date(a.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" }),
    a.name,
    a.email,
    a.phone,
    a.timeSlot,
    getSlotTitle(a.timeSlot),
    a.tickets,
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
  const [eventFilter, setEventFilter] = useState<"current" | "workshop2" | "previous">("current");
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [showTransferForm, setShowTransferForm] = useState(false);
  const [tf, setTf] = useState({ name: "", phone: "", fromWorkshop: WORKSHOPS[1], fromSlot: "10:30 AM", toWorkshop: WORKSHOPS[0], toSlot: "1:00 PM", note: "" });
  const [tfError, setTfError] = useState("");
  const [tfLoading, setTfLoading] = useState(false);
  const [attendance, setAttendance] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem("hsp_transfers");
      if (saved) setTransfers(JSON.parse(saved));
      const att = localStorage.getItem("hsp_attendance");
      if (att) setAttendance(JSON.parse(att));
    } catch {}
  }, []);

  const markAttendance = (sessionId: string, value: string) => {
    const updated = { ...attendance, [sessionId]: value };
    setAttendance(updated);
    try { localStorage.setItem("hsp_attendance", JSON.stringify(updated)); } catch {}
  };

  const saveTransfers = (list: Transfer[]) => {
    setTransfers(list);
    try { localStorage.setItem("hsp_transfers", JSON.stringify(list)); } catch {}
  };

  const addTransfer = async () => {
    if (!tf.name.trim() || !tf.phone.trim()) return;
    setTfError("");
    setTfLoading(true);
    try {
      // Fetch attendees from the source workshop and validate name + phone
      const sourceFilter = WORKSHOP_TO_FILTER[tf.fromWorkshop];
      const res = await fetch(`/api/admin/sessions?password=${encodeURIComponent(password)}&event=${sourceFilter}`);
      const data = await res.json();
      if (!res.ok) { setTfError("Could not verify registration. Try again."); return; }

      const nameMatch = (data.attendees as Attendee[]).find(
        (a) =>
          a.name.trim().toLowerCase() === tf.name.trim().toLowerCase() &&
          a.timeSlot.split("+").map((s) => s.trim()).includes(tf.fromSlot)
      );

      if (!nameMatch) {
        setTfError("No registration found with that name and session. Please check the spelling and try again.");
        return;
      }

      // Normalize phone: strip non-digits, strip leading 1 if 11-digit US number
      const normalizePhone = (p: string) => {
        const digits = p.replace(/\D/g, "");
        return digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
      };
      const phoneEntered = normalizePhone(tf.phone);
      const phoneStored = normalizePhone(nameMatch.phone);
      if (phoneStored && phoneStored !== "NA" && phoneEntered !== phoneStored) {
        setTfError("Name and session matched but the phone number doesn't match what's on file. Please double-check the number.");
        return;
      }

      const match = nameMatch;

      const entry: Transfer = { ...tf, id: Date.now().toString(), addedAt: new Date().toISOString() };
      saveTransfers([entry, ...transfers]);
      setTf({ name: "", phone: "", fromWorkshop: WORKSHOPS[1], fromSlot: "10:30 AM", toWorkshop: WORKSHOPS[0], toSlot: "1:00 PM", note: "" });
      setShowTransferForm(false);
    } catch {
      setTfError("Something went wrong. Try again.");
    } finally {
      setTfLoading(false);
    }
  };

  const deleteTransfer = (id: string) => saveTransfers(transfers.filter((t) => t.id !== id));

  const fetchData = useCallback(async (pw: string, filter = "current") => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/sessions?password=${encodeURIComponent(pw)}&event=${filter}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to load");
        setAuthed(false);
      } else {
        setAttendees(data.attendees);
        setAuthed(true);
      }
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData(password, eventFilter);
  };

  const switchFilter = (filter: "current" | "workshop2" | "previous") => {
    setEventFilter(filter);
    fetchData(password, filter);
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
            <p className="text-ink-secondary text-sm mt-0.5">Houston Skate Project</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => fetchData(password, eventFilter)}
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

        {/* Event filter tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {([
            { key: "current",   label: "Workshop 3 · Sep 6, 2026" },
            { key: "workshop2", label: "Workshop 2 · Aug 30, 2026" },
            { key: "previous",  label: "Workshop 1 · Aug 9, 2026" },
          ] as const).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => switchFilter(key)}
              className={`px-5 py-2 rounded-full text-sm font-semibold border-2 transition-all ${
                eventFilter === key
                  ? "bg-charcoal text-white border-charcoal"
                  : "bg-white text-ink-secondary border-charcoal/15 hover:border-charcoal/40"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Orders", value: stats.totalAttendees, icon: Users, color: "text-charcoal" },
              { label: "Tickets", value: stats.totalTickets, icon: Ticket, color: "text-charcoal" },
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
                  <tr className="border-b border-charcoal/10">
                    {["Name", "Email", "Phone", "Session", "Level", "Tickets", "Paid", "Attendance"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-ink-muted uppercase tracking-wider whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    // Expand bundle purchases into one row per slot
                    type Row = Attendee & { displaySlot: string; displayAmount: string; rowKey: string };
                    const expanded: Row[] = [];
                    for (const a of attendees) {
                      if (a.timeSlot.includes("+")) {
                        const [s1, s2] = a.timeSlot.split("+").map((s) => s.trim());
                        expanded.push({ ...a, displaySlot: s1, displayAmount: "25.00", rowKey: `${a.sessionId}-1` });
                        expanded.push({ ...a, displaySlot: s2, displayAmount: "25.00", rowKey: `${a.sessionId}-2` });
                      } else {
                        expanded.push({ ...a, displaySlot: a.timeSlot, displayAmount: a.amountPaid, rowKey: a.sessionId });
                      }
                    }
                    expanded.sort((a, b) => slotSortKey(a.displaySlot) - slotSortKey(b.displaySlot));

                    // Group by displaySlot
                    const groups: { slot: string; rows: Row[] }[] = [];
                    for (const r of expanded) {
                      const last = groups[groups.length - 1];
                      if (last && last.slot === r.displaySlot) { last.rows.push(r); }
                      else { groups.push({ slot: r.displaySlot, rows: [r] }); }
                    }

                    return groups.map(({ slot, rows }) => (
                      <>
                        <tr key={`group-${slot}`} className="bg-charcoal/[0.08] border-b border-t border-charcoal/15">
                          <td colSpan={8} className="px-4 py-2.5">
                            <span className="font-black text-charcoal text-sm">{slot}</span>
                            {getSlotTitle(slot) !== "—" && (
                              <span className="ml-2 text-sm font-bold text-charcoal/70">· {getSlotTitle(slot)}</span>
                            )}
                            <span className="ml-3 text-xs font-semibold text-ink-muted">({rows.reduce((s, r) => s + r.tickets, 0)} ticket{rows.reduce((s, r) => s + r.tickets, 0) !== 1 ? "s" : ""})</span>
                          </td>
                        </tr>
                        {rows.map((a) => {
                          const att = attendance[`${a.sessionId}-${a.displaySlot}`] || "";
                          return (
                            <tr key={a.rowKey} className="border-b border-charcoal/5 last:border-0">
                              <td className="px-4 py-3 font-medium text-charcoal whitespace-nowrap">{a.name}</td>
                              <td className="px-4 py-3 text-ink-secondary">{a.email}</td>
                              <td className="px-4 py-3 text-ink-secondary whitespace-nowrap">{a.phone}</td>
                              <td className="px-4 py-3 font-semibold text-charcoal whitespace-nowrap">{a.displaySlot}</td>
                              <td className="px-4 py-3 text-ink-secondary whitespace-nowrap">{getSlotTitle(a.displaySlot)}</td>
                              <td className="px-4 py-3 text-center font-semibold text-charcoal">{a.tickets}</td>
                              <td className="px-4 py-3 font-bold text-crimson whitespace-nowrap">${a.displayAmount}</td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <select
                                  value={att}
                                  onChange={(e) => markAttendance(`${a.sessionId}-${a.displaySlot}`, e.target.value)}
                                  className={`text-xs rounded-full px-3 py-1.5 border font-semibold focus:outline-none cursor-pointer ${
                                    att === "signed-in"
                                      ? "bg-green-50 border-green-300 text-green-700"
                                      : att === "no-show"
                                      ? "bg-red-50 border-red-300 text-red-600"
                                      : "bg-charcoal/5 border-charcoal/15 text-ink-muted"
                                  }`}
                                >
                                  <option value="">— Mark —</option>
                                  <option value="signed-in">Signed In</option>
                                  <option value="no-show">No Show</option>
                                </select>
                              </td>
                            </tr>
                          );
                        })}
                      </>
                    ));
                  })()}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Transfers */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display text-xl text-charcoal">Transfers</h2>
              <p className="text-ink-muted text-xs mt-0.5">Manual ticket transfers — for record keeping only, does not affect capacity</p>
            </div>
            <button
              onClick={() => setShowTransferForm(!showTransferForm)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-charcoal text-white text-sm hover:bg-charcoal-soft transition-colors"
            >
              <Plus className="w-4 h-4" />
              Log Transfer
            </button>
          </div>

          {showTransferForm && (
            <div className="bg-cream-light border border-charcoal/10 rounded-2xl p-5 mb-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                <div>
                  <label className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-1 block">Name</label>
                  <input className="form-input w-full" placeholder="Attendee name" value={tf.name} onChange={(e) => { setTf({ ...tf, name: e.target.value }); setTfError(""); }} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-1 block">Phone</label>
                  <input className="form-input w-full" placeholder="Attendee phone number" value={tf.phone} onChange={(e) => { setTf({ ...tf, phone: e.target.value }); setTfError(""); }} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-1 block">Note (optional)</label>
                  <input className="form-input w-full" placeholder="e.g. requested via email" value={tf.note} onChange={(e) => setTf({ ...tf, note: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-1 block">From</label>
                  <select className="form-input w-full mb-2" value={tf.fromWorkshop} onChange={(e) => { setTf({ ...tf, fromWorkshop: e.target.value, fromSlot: SLOTS_BY_WORKSHOP[e.target.value][0] }); setTfError(""); }}>
                    {WORKSHOPS.map((w) => <option key={w}>{w}</option>)}
                  </select>
                  <select className="form-input w-full" value={tf.fromSlot} onChange={(e) => setTf({ ...tf, fromSlot: e.target.value })}>
                    {(SLOTS_BY_WORKSHOP[tf.fromWorkshop] || []).map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-1 block">To</label>
                  <select className="form-input w-full mb-2" value={tf.toWorkshop} onChange={(e) => setTf({ ...tf, toWorkshop: e.target.value, toSlot: SLOTS_BY_WORKSHOP[e.target.value][0] })}>
                    {WORKSHOPS.map((w) => <option key={w}>{w}</option>)}
                  </select>
                  <select className="form-input w-full" value={tf.toSlot} onChange={(e) => setTf({ ...tf, toSlot: e.target.value })}>
                    {(SLOTS_BY_WORKSHOP[tf.toWorkshop] || []).map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              {tfError && <p className="text-crimson text-sm mb-3">{tfError}</p>}
              <div className="flex gap-2">
                <button onClick={addTransfer} disabled={!tf.name.trim() || !tf.phone.trim() || tfLoading} className="btn-primary px-6 py-2 disabled:opacity-50">
                  {tfLoading ? "Verifying…" : "Save Transfer"}
                </button>
                <button onClick={() => { setShowTransferForm(false); setTfError(""); }} className="px-6 py-2 rounded-full border border-charcoal/20 text-sm text-ink-secondary hover:bg-charcoal/5 transition-colors">Cancel</button>
              </div>
            </div>
          )}

          {(() => {
            const tabTransfers = transfers.filter((t) => t.toWorkshop === FILTER_TO_WORKSHOP[eventFilter]);
            return tabTransfers.length === 0 && !showTransferForm ? (
              <div className="text-center py-10 text-ink-muted text-sm border border-dashed border-charcoal/15 rounded-2xl">No transfers for this workshop.</div>
            ) : tabTransfers.length > 0 ? (
            <div className="bg-cream-light border border-charcoal/10 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-charcoal/10 bg-charcoal/5">
                      {["Name", "From", "", "To", "Note", "Logged", "Attendance"].map((h, i) => (
                        <th key={i} className="text-left px-4 py-3 text-xs font-semibold text-ink-muted uppercase tracking-wider whitespace-nowrap">{h}</th>
                      ))}
                      <th className="px-4 py-3" />
                    </tr>
                  </thead>
                  <tbody>
                    {transfers.filter((t) => t.toWorkshop === FILTER_TO_WORKSHOP[eventFilter]).map((t, i) => (
                      <tr key={t.id} className={`border-b border-charcoal/5 last:border-0 ${i % 2 === 0 ? "" : "bg-charcoal/[0.02]"}`}>
                        <td className="px-4 py-3 font-medium text-charcoal whitespace-nowrap">{t.name}</td>
                        <td className="px-4 py-3 text-ink-secondary whitespace-nowrap">
                          <div className="font-semibold text-charcoal">{t.fromSlot}</div>
                          <div className="text-xs text-ink-muted">{t.fromWorkshop}</div>
                        </td>
                        <td className="px-2 py-3 text-ink-muted"><ArrowRight className="w-4 h-4" /></td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="font-semibold text-charcoal">{t.toSlot}</div>
                          <div className="text-xs text-ink-muted">{t.toWorkshop}</div>
                        </td>
                        <td className="px-4 py-3 text-ink-muted text-xs">{t.note || "—"}</td>
                        <td className="px-4 py-3 text-ink-muted text-xs whitespace-nowrap">
                          {new Date(t.addedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {(() => {
                            const attKey = `transfer-${t.id}`;
                            const att = attendance[attKey] || "";
                            return (
                              <select
                                value={att}
                                onChange={(e) => markAttendance(attKey, e.target.value)}
                                className={`text-xs rounded-full px-3 py-1.5 border font-semibold focus:outline-none cursor-pointer ${
                                  att === "signed-in"
                                    ? "bg-green-50 border-green-300 text-green-700"
                                    : att === "no-show"
                                    ? "bg-red-50 border-red-300 text-red-600"
                                    : "bg-charcoal/5 border-charcoal/15 text-ink-muted"
                                }`}
                              >
                                <option value="">— Mark —</option>
                                <option value="signed-in">Signed In</option>
                                <option value="no-show">No Show</option>
                              </select>
                            );
                          })()}
                        </td>
                        <td className="px-4 py-3">
                          <button onClick={() => deleteTransfer(t.id)} className="text-ink-muted hover:text-crimson transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            ) : null;
          })()}
        </div>

        <p className="text-ink-muted text-xs text-center mt-8">
          Data pulled live from Stripe · {new Date().toLocaleString()}
        </p>
      </div>
    </main>
  );
}
