"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownToLine, ArrowUpRight, Building2, Check,
  CircleDot, Globe2, LayoutGrid, List, Mail, MapPin, Megaphone, Phone,
  Plus, RefreshCw, Search, StickyNote, UserRound, X,
} from "lucide-react";

const STATUSES = ["New", "Contacted", "Qualified", "Viewing booked", "Won", "Lost"];
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const STATUS_STYLES = {
  New: "bg-blue-50 text-blue-700 ring-blue-200",
  Contacted: "bg-violet-50 text-violet-700 ring-violet-200",
  Qualified: "bg-amber-50 text-amber-800 ring-amber-200",
  "Viewing booked": "bg-cyan-50 text-cyan-800 ring-cyan-200",
  Won: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Lost: "bg-slate-100 text-slate-600 ring-slate-200",
};

const blankDraft = (lead = {}) => ({
  status: lead.status || "New",
  assignedTo: lead.assignedTo || "",
  notes: lead.notes || "",
});

const RoomLeads = () => {
  const [leads, setLeads] = useState([]);
  const [drafts, setDrafts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savingId, setSavingId] = useState("");
  const [creating, setCreating] = useState(false);
  const [view, setView] = useState("board");
  const [selectedId, setSelectedId] = useState("");
  const [search, setSearch] = useState("");
  const [source, setSource] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [newLead, setNewLead] = useState({ name: "", email: "", phone: "", location: "" });

  const fetchLeads = async () => {
    setError("");
    try {
      const response = await fetch(`${API_URL}/leads`, { credentials: "include" });
      if (response.status === 401) throw new Error("Your admin session has expired. Please sign in again.");
      if (!response.ok) throw new Error("Could not load leads.");
      const result = await response.json();
      const rows = result.data || [];
      setLeads(rows);
      setDrafts(Object.fromEntries(rows.map((lead) => [lead._id, blankDraft(lead)])));
    } catch (err) {
      setError(err.message || "Could not load leads.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLeads(); }, []);

  const filteredLeads = useMemo(() => {
    const term = search.trim().toLowerCase();
    return leads.filter((lead) => {
      const matchesTerm = !term || [lead.name, lead.email, lead.phone, lead.location, lead.assignedTo]
        .some((value) => String(value || "").toLowerCase().includes(term));
      const matchesSource = source === "all" || (lead.source || "website") === source;
      const matchesStatus = statusFilter === "all" || (lead.status || "New") === statusFilter;
      return matchesTerm && matchesSource && matchesStatus;
    });
  }, [leads, search, source, statusFilter]);

  const selectedLead = leads.find((lead) => lead._id === selectedId);
  const newCount = leads.filter((lead) => (lead.status || "New") === "New").length;
  const googleCount = leads.filter((lead) => lead.source === "google_ads" && !lead.google?.isTest).length;
  const websiteCount = leads.filter((lead) => !["google_ads", "manual"].includes(lead.source)).length;
  const activeCount = leads.filter((lead) => !["Won", "Lost"].includes(lead.status || "New")).length;

  const updateDraft = (id, field, value) => setDrafts((current) => ({
    ...current,
    [id]: { ...(current[id] || {}), [field]: value },
  }));

  const saveLead = async (lead, overrides = {}) => {
    const payload = { ...(drafts[lead._id] || blankDraft(lead)), ...overrides };
    setSavingId(lead._id);
    setError("");
    try {
      const response = await fetch(`${API_URL}/leads/${lead._id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Could not save this lead.");
      setLeads((current) => current.map((item) => item._id === lead._id ? result.data : item));
      setDrafts((current) => ({ ...current, [lead._id]: blankDraft(result.data) }));
    } catch (err) {
      setError(err.message || "Could not save this lead.");
    } finally {
      setSavingId("");
    }
  };

  const createLead = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const response = await fetch(`${API_URL}/leads`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLead),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Could not create lead.");
      setLeads((current) => [result.data, ...current]);
      setDrafts((current) => ({ ...current, [result.data._id]: blankDraft(result.data) }));
      setSelectedId(result.data._id);
      setNewLead({ name: "", email: "", phone: "", location: "" });
      setCreating(false);
    } catch (err) {
      setError(err.message || "Could not create lead.");
    }
  };

  const exportCsv = () => {
    const headings = ["Name", "Email", "Phone", "Location", "Source", "Status", "Assigned to", "Notes", "Created"];
    const quote = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
    const rows = filteredLeads.map((lead) => [lead.name, lead.email, lead.phone, lead.location,
      lead.source || "website", lead.status || "New", lead.assignedTo, lead.notes, lead.createdAt]);
    const csv = [headings, ...rows].map((row) => row.map(quote).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "room-leads.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const changeStage = (lead, nextStatus) => saveLead(lead, { status: nextStatus });

  if (loading) return <div className="rounded-xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">Loading CRM leads…</div>;

  return (
    <div className="relative min-h-[calc(100vh-190px)] min-w-0 max-w-full overflow-hidden rounded-xl border border-[#dfe3eb] bg-[#f5f7fa] text-[#334155] shadow-sm">
      <div className="border-b border-[#e4e7ed] bg-white px-5 py-4 sm:px-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff0e8] text-[#f47c3c]"><UserRound size={21} /></div>
            <div><p className="text-xs font-semibold uppercase tracking-[.12em] text-[#718096]">CRM workspace</p><h2 className="text-xl font-bold text-[#263445]">Room leads</h2></div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={exportCsv} className="inline-flex items-center gap-2 rounded-md border border-[#cbd2dc] bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50"><ArrowDownToLine size={16} /> Export</button>
            <button onClick={fetchLeads} className="inline-flex items-center gap-2 rounded-md border border-[#cbd2dc] bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50"><RefreshCw size={15} /> Refresh</button>
            <button onClick={() => setCreating(true)} className="inline-flex items-center gap-2 rounded-md bg-[#f47c3c] px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#df692d]"><Plus size={17} /> Create lead</button>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2 sm:gap-3 xl:grid-cols-5">
          <Metric icon={<UserRound size={17} />} title="All leads" value={leads.length} tint="orange" />
          <Metric icon={<CircleDot size={17} />} title="New leads" value={newCount} tint="blue" />
          <Metric icon={<Globe2 size={17} />} title="From website" value={websiteCount} tint="blue" />
          <Metric icon={<Megaphone size={17} />} title="From Google Ads" value={googleCount} tint="violet" />
          <Metric icon={<Building2 size={17} />} title="Open pipeline" value={activeCount} tint="green" />
        </div>
      </div>

      <div className="flex min-w-0 flex-col items-stretch justify-between gap-3 border-b border-[#e4e7ed] bg-white px-4 py-3 sm:px-7 lg:flex-row lg:items-center">
        <div className="inline-flex rounded-md border border-[#d7dce4] bg-[#f6f7f9] p-1">
          <button onClick={() => setView("board")} className={`inline-flex items-center gap-2 rounded px-3 py-1.5 text-sm font-medium ${view === "board" ? "bg-white text-[#28384a] shadow-sm" : "text-slate-500"}`}><LayoutGrid size={15} /> Board</button>
          <button onClick={() => setView("list")} className={`inline-flex items-center gap-2 rounded px-3 py-1.5 text-sm font-medium ${view === "list" ? "bg-white text-[#28384a] shadow-sm" : "text-slate-500"}`}><List size={16} /> List</button>
        </div>
        <div className="grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_auto_auto] lg:flex lg:flex-1 lg:justify-end">
          <label className="relative min-w-0 lg:w-full lg:max-w-xs"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search leads" className="w-full rounded-md border border-[#d7dce4] py-2 pl-9 pr-3 text-sm outline-none focus:border-[#f47c3c]" /></label>
          <select aria-label="Filter by source" value={source} onChange={(event) => setSource(event.target.value)} className="min-w-0 rounded-md border border-[#d7dce4] bg-white px-3 py-2 text-sm"><option value="all">All sources</option><option value="website">From website</option><option value="google_ads">From Google Ads</option><option value="manual">Added manually</option></select>
          <select aria-label="Filter by stage" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="min-w-0 rounded-md border border-[#d7dce4] bg-white px-3 py-2 text-sm"><option value="all">All stages</option>{STATUSES.map((item) => <option key={item}>{item}</option>)}</select>
        </div>
      </div>

      {error && <div role="alert" className="mx-5 mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 sm:mx-7">{error}</div>}

      <div className="flex min-h-[510px] min-w-0">
        <main className="min-w-0 flex-1 p-2 sm:p-4 lg:p-6">
          {view === "board" ? <>
          <p className="mb-2 px-1 text-xs text-slate-500 sm:hidden">Swipe horizontally to view every pipeline stage.</p>
          <div className="flex h-full min-h-[380px] min-w-0 gap-3 overflow-x-auto pb-3 sm:min-h-[480px]">
            {STATUSES.map((stage) => {
              const stageLeads = filteredLeads.filter((lead) => (lead.status || "New") === stage);
              return <section key={stage} onDragOver={(event) => event.preventDefault()} onDrop={(event) => {
                event.preventDefault();
                const lead = leads.find((item) => item._id === event.dataTransfer.getData("text/plain"));
                if (lead && lead.status !== stage) changeStage(lead, stage);
              }} className="w-[265px] shrink-0 rounded-lg border border-[#e0e4eb] bg-[#eef1f5] p-2.5">
                <div className="flex items-center justify-between px-1 pb-2.5"><div className="flex items-center gap-2"><span className={`h-2.5 w-2.5 rounded-full ${stage === "New" ? "bg-blue-500" : stage === "Contacted" ? "bg-violet-500" : stage === "Qualified" ? "bg-amber-500" : stage === "Viewing booked" ? "bg-cyan-500" : stage === "Won" ? "bg-emerald-500" : "bg-slate-400"}`} /><h3 className="text-sm font-semibold text-[#344256]">{stage}</h3></div><span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-slate-500">{stageLeads.length}</span></div>
                <div className="space-y-2">
                  {stageLeads.map((lead) => <button key={lead._id} draggable onDragStart={(event) => event.dataTransfer.setData("text/plain", lead._id)} onClick={() => setSelectedId(lead._id)} className={`block w-full rounded-lg border bg-white p-3 text-left shadow-[0_1px_2px_rgba(16,24,40,.05)] transition hover:border-[#f5a477] hover:shadow-sm ${selectedId === lead._id ? "border-[#f47c3c] ring-1 ring-[#f47c3c]/20" : "border-[#e0e4eb]"}`}>
                    <div className="flex items-start justify-between gap-2"><span className="line-clamp-2 text-sm font-semibold text-[#2d3b4d]">{lead.name || "Name not provided"}</span>{lead.google?.isTest && <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold text-amber-800">TEST</span>}</div>
                    <p className="mt-1 truncate text-xs text-slate-500">{lead.email || lead.phone || "No contact details"}</p>
                    <div className="mt-3 flex items-center justify-between gap-2"><SourceBadge source={lead.source} /><span className="max-w-24 truncate text-[10px] text-slate-400">{lead.assignedTo || "Unassigned"}</span></div>
                    {lead.location && <p className="mt-2 truncate text-xs text-slate-500"><MapPin size={12} className="mr-1 inline" />{lead.location}</p>}
                  </button>)}
                  {stageLeads.length === 0 && <div className="rounded-md border border-dashed border-slate-300 px-3 py-6 text-center text-xs text-slate-400">Drop a lead here</div>}
                </div>
              </section>;
            })}
          </div></> : <div className="overflow-hidden rounded-lg border border-[#e0e4eb] bg-white">
            <div className="hidden overflow-x-auto md:block"><div className="min-w-[760px]">
            <div className="grid grid-cols-[minmax(180px,1.4fr)_minmax(130px,1fr)_minmax(120px,1fr)_140px_130px] gap-3 border-b bg-[#f8f9fb] px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-slate-500"><span>Lead</span><span>Source</span><span>Location</span><span>Stage</span><span>Owner</span></div>
            <div>
              {filteredLeads.map((lead) => <button key={lead._id} onClick={() => setSelectedId(lead._id)} className={`grid w-full grid-cols-[minmax(180px,1.4fr)_minmax(130px,1fr)_minmax(120px,1fr)_140px_130px] items-center gap-3 border-b px-4 py-3 text-left text-sm hover:bg-[#f9fafb] ${selectedId === lead._id ? "bg-orange-50/60" : ""}`}>
                <span className="min-w-0"><span className="block truncate font-semibold text-[#334155]">{lead.name || "Name not provided"}</span><span className="block truncate text-xs text-slate-500">{lead.email || lead.phone || "No contact details"}</span></span>
                <span><SourceBadge source={lead.source} /></span><span className="truncate text-xs text-slate-600">{lead.location || "—"}</span>
                <span><span className={`inline-flex rounded-full px-2 py-1 text-[11px] font-semibold ring-1 ring-inset ${STATUS_STYLES[lead.status || "New"]}`}>{lead.status || "New"}</span></span><span className="truncate text-xs text-slate-600">{lead.assignedTo || "Unassigned"}</span>
              </button>)}
            </div>
            </div></div>
            <div className="divide-y divide-slate-100 md:hidden">
              {filteredLeads.map((lead) => <button key={lead._id} onClick={() => setSelectedId(lead._id)} className={`block w-full p-4 text-left ${selectedId === lead._id ? "bg-orange-50/60" : "bg-white"}`}>
                <div className="flex items-start justify-between gap-2"><span className="min-w-0 truncate font-semibold text-[#334155]">{lead.name || "Name not provided"}</span><SourceBadge source={lead.source} /></div>
                <p className="mt-1 truncate text-xs text-slate-500">{lead.email || lead.phone || "No contact details"}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2"><span className={`rounded-full px-2 py-1 text-[11px] font-semibold ring-1 ring-inset ${STATUS_STYLES[lead.status || "New"]}`}>{lead.status || "New"}</span>{lead.location && <span className="max-w-full truncate text-xs text-slate-500"><MapPin size={12} className="mr-1 inline" />{lead.location}</span>}</div>
              </button>)}
            </div>
            {filteredLeads.length === 0 && <p className="p-12 text-center text-sm text-slate-500">No leads match your filters.</p>}
          </div>}
        </main>

        {selectedLead && <>
          <button type="button" onClick={() => setSelectedId("")} aria-label="Close lead details" className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden" />
          <aside className="fixed inset-y-0 right-0 z-50 flex h-dvh w-full max-w-[420px] flex-col border-l border-[#e0e4eb] bg-white shadow-2xl lg:static lg:z-auto lg:h-auto lg:max-h-[calc(100vh-190px)] lg:w-[390px] lg:max-w-[38vw] lg:shrink-0 lg:shadow-none">
          <div className="flex items-center justify-between border-b px-5 py-4"><div><p className="text-[10px] font-bold uppercase tracking-[.12em] text-slate-400">Lead record</p><h3 className="mt-1 text-lg font-bold text-[#2e3b4d]">{selectedLead.name || "New lead"}</h3></div><button onClick={() => setSelectedId("")} aria-label="Close lead details" className="rounded p-1.5 text-slate-500 hover:bg-slate-100"><X size={18} /></button></div>
          <div className="flex flex-wrap items-center justify-between gap-2 border-b px-5 py-3"><SourceBadge source={selectedLead.source} /><select value={drafts[selectedLead._id]?.status || selectedLead.status || "New"} onChange={(event) => updateDraft(selectedLead._id, "status", event.target.value)} className="max-w-40 rounded-md border border-slate-200 px-2 py-1.5 text-xs">{STATUSES.map((item) => <option key={item}>{item}</option>)}</select></div>
          <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-5">
            <div><h4 className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-400">Contact information</h4><InfoRow icon={<Mail size={15} />} value={selectedLead.email} href={selectedLead.email ? `mailto:${selectedLead.email}` : undefined} placeholder="Email not provided" /><InfoRow icon={<Phone size={15} />} value={selectedLead.phone} href={selectedLead.phone ? `tel:${selectedLead.phone}` : undefined} placeholder="Phone not provided" /><InfoRow icon={<MapPin size={15} />} value={selectedLead.location} placeholder="Location not provided" /></div>
            <div className="border-t pt-4"><h4 className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-400">Lead properties</h4>{selectedLead.google?.campaignId && <PropertyRow label="Campaign ID" value={selectedLead.google.campaignId} />}{selectedLead.google?.formId && <PropertyRow label="Form ID" value={selectedLead.google.formId} />}{selectedLead.roomType && <PropertyRow label="Room type" value={selectedLead.roomType} />}{selectedLead.monthlyBudget && <PropertyRow label="Budget" value={selectedLead.monthlyBudget} />}<PropertyRow label="Created" value={selectedLead.createdAt ? new Date(selectedLead.createdAt).toLocaleString() : "—"} /></div>
            <div className="border-t pt-4"><label htmlFor="lead-owner" className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-400">Lead owner</label><div className="relative"><UserRound size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input id="lead-owner" value={drafts[selectedLead._id]?.assignedTo || ""} onChange={(event) => updateDraft(selectedLead._id, "assignedTo", event.target.value)} placeholder="Assign an owner" className="w-full rounded-md border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-[#f47c3c]" /></div></div>
            <div className="border-t pt-4"><label htmlFor="lead-notes" className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-400"><StickyNote size={14} /> Follow-up notes</label><textarea id="lead-notes" rows={5} maxLength={5000} value={drafts[selectedLead._id]?.notes || ""} onChange={(event) => updateDraft(selectedLead._id, "notes", event.target.value)} placeholder="Record the last conversation or next action…" className="w-full resize-y rounded-md border border-slate-200 p-3 text-sm outline-none focus:border-[#f47c3c]" /></div>
            {selectedLead.google?.answers?.length > 0 && <div className="border-t pt-4"><h4 className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-400">Google form answers</h4><div className="space-y-2">{selectedLead.google.answers.map((answer, index) => <div key={`${answer.question}-${index}`} className="rounded-md bg-[#f7f8fa] p-2.5"><p className="text-[10px] font-semibold uppercase text-slate-400">{answer.question.replaceAll("_", " ")}</p><p className="mt-1 break-words text-sm text-slate-700">{answer.answer}</p></div>)}</div></div>}
            <div className="flex gap-2 border-t pt-4"><button disabled={savingId === selectedLead._id} onClick={() => saveLead(selectedLead)} className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-[#f47c3c] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#df692d] disabled:opacity-60">{savingId === selectedLead._id ? "Saving…" : <><Check size={16} /> Save changes</>}</button><a href={selectedLead.email ? `mailto:${selectedLead.email}` : selectedLead.phone ? `tel:${selectedLead.phone}` : undefined} className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"><ArrowUpRight size={15} /> Contact</a></div>
          </div>
          </aside>
        </>}
      </div>

      {creating && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setCreating(false); }}><form onSubmit={createLead} className="max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto rounded-xl bg-white shadow-2xl"><div className="flex items-center justify-between border-b px-4 py-4 sm:px-6"><div><p className="text-xs font-semibold uppercase tracking-wide text-slate-400">CRM record</p><h3 className="text-lg font-bold text-slate-800">Create a lead</h3></div><button type="button" onClick={() => setCreating(false)} aria-label="Close" className="rounded p-1.5 hover:bg-slate-100"><X size={18} /></button></div><div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-6"><label className="sm:col-span-2"><span className="mb-1.5 block text-xs font-semibold text-slate-600">Name *</span><input required minLength={2} maxLength={120} value={newLead.name} onChange={(event) => setNewLead({ ...newLead, name: event.target.value })} className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#f47c3c]" placeholder="Full name" /></label><label><span className="mb-1.5 block text-xs font-semibold text-slate-600">Email</span><input type="email" maxLength={254} value={newLead.email} onChange={(event) => setNewLead({ ...newLead, email: event.target.value })} className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#f47c3c]" placeholder="name@example.com" /></label><label><span className="mb-1.5 block text-xs font-semibold text-slate-600">Phone</span><input maxLength={40} value={newLead.phone} onChange={(event) => setNewLead({ ...newLead, phone: event.target.value })} className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#f47c3c]" placeholder="Phone number" /></label><label className="sm:col-span-2"><span className="mb-1.5 block text-xs font-semibold text-slate-600">Preferred location</span><input maxLength={160} value={newLead.location} onChange={(event) => setNewLead({ ...newLead, location: event.target.value })} className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#f47c3c]" placeholder="Area or postcode" /></label></div><div className="flex justify-end gap-2 border-t bg-slate-50 px-4 py-4 sm:px-6"><button type="button" onClick={() => setCreating(false)} className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium">Cancel</button><button className="rounded-md bg-[#f47c3c] px-4 py-2 text-sm font-semibold text-white">Create lead</button></div></form></div>}
    </div>
  );
};

const Metric = ({ icon, title, value, tint }) => {
  const colors = { orange: "bg-orange-50 text-orange-600", blue: "bg-blue-50 text-blue-600", violet: "bg-violet-50 text-violet-600", green: "bg-emerald-50 text-emerald-600" };
  return <div className="flex items-center gap-3 rounded-lg border border-[#e7eaf0] bg-white px-4 py-3"><span className={`flex h-9 w-9 items-center justify-center rounded-lg ${colors[tint]}`}>{icon}</span><span><span className="block text-xs text-slate-500">{title}</span><span className="block text-lg font-bold leading-tight text-[#334155]">{value}</span></span></div>;
};

const SourceBadge = ({ source }) => {
  const isGoogle = source === "google_ads";
  const isManual = source === "manual";
  const label = isGoogle ? "Google Ads lead" : isManual ? "Added manually" : "Website lead";
  return <span className={`inline-flex max-w-full items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold leading-tight ${isGoogle ? "bg-violet-50 text-violet-700" : isManual ? "bg-slate-100 text-slate-600" : "bg-blue-50 text-blue-700"}`}>
    {isGoogle ? <Megaphone size={11} className="shrink-0" /> : isManual ? <UserRound size={11} className="shrink-0" /> : <Globe2 size={11} className="shrink-0" />}
    <span className="truncate">{label}</span>
  </span>;
};

const InfoRow = ({ icon, value, href, placeholder }) => <div className="flex items-center gap-2.5 py-1.5 text-sm text-slate-600"><span className="text-slate-400">{icon}</span>{value ? href ? <a className="truncate hover:text-blue-700 hover:underline" href={href}>{value}</a> : <span>{value}</span> : <span className="text-slate-400">{placeholder}</span>}</div>;

const PropertyRow = ({ label, value }) => <div className="flex items-start justify-between gap-3 py-1.5 text-sm"><span className="text-slate-500">{label}</span><span className="text-right font-medium text-slate-700">{value}</span></div>;

export default RoomLeads;
