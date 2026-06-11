"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ChevronLeft, ChevronRight, X, Pencil, Trash2, Users, MapPin, Clock } from "lucide-react";
import { SEED_EVENTS, type CalendarEvent, type EventType } from "@/lib/store";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS_SHORT = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const typeColors: Record<EventType, string> = {
  Graduation: "bg-orange-500",
  Workshop:   "bg-blue-500",
  "Open Day": "bg-green-500",
  Community:  "bg-purple-500",
};
const typeBadge: Record<EventType, string> = {
  Graduation: "bg-orange-100 text-orange-700",
  Workshop:   "bg-blue-100 text-blue-700",
  "Open Day": "bg-green-100 text-green-700",
  Community:  "bg-purple-100 text-purple-700",
};

const emptyEvent = (): Omit<CalendarEvent,"id"|"rsvps"> => ({
  title:"", description:"", date: new Date().toISOString().split("T")[0],
  time:"9:00 AM", location:"", type:"Workshop", capacity:50, status:"Upcoming"
});

export default function AdminEventsPage() {
  const today = new Date();
  const [year,  setYear]  = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [events, setEvents] = useState<CalendarEvent[]>(SEED_EVENTS);
  const [selectedDay, setSelectedDay]   = useState<string|null>(null);
  const [detailEvent, setDetailEvent]   = useState<CalendarEvent|null>(null);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent|null>(null);
  const [isNew, setIsNew]               = useState(false);
  const [form,  setForm]                = useState(emptyEvent());
  const [deleteId, setDeleteId]         = useState<string|null>(null);

  const upd = (k: string, v: string | number) => setForm(f => ({...f, [k]: v}));

  const firstDay    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells       = Array.from({ length: firstDay + daysInMonth }, (_, i) => i < firstDay ? null : i - firstDay + 1);

  const prevMonth = () => { if (month===0){setMonth(11);setYear(y=>y-1);}else setMonth(m=>m-1); };
  const nextMonth = () => { if (month===11){setMonth(0);setYear(y=>y+1);}else setMonth(m=>m+1); };

  const eventsForDay = (day: number) => {
    const ds = `${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
    return events.filter(e => e.date === ds);
  };

  const openNew = () => {
    setForm({...emptyEvent(), date: selectedDay ?? new Date().toISOString().split("T")[0]});
    setIsNew(true); setEditingEvent({} as CalendarEvent);
  };
  const openEdit = (evt: CalendarEvent) => {
    setForm({ title:evt.title, description:evt.description, date:evt.date, time:evt.time, location:evt.location, type:evt.type, capacity:evt.capacity, status:evt.status });
    setIsNew(false); setEditingEvent(evt); setDetailEvent(null);
  };
  const closeModal = () => { setEditingEvent(null); setIsNew(false); };

  const saveEvent = () => {
    if (isNew) {
      setEvents(prev => [...prev, {...form, id:`evt-${Date.now()}`, rsvps:[]}]);
    } else {
      setEvents(prev => prev.map(e => e.id === editingEvent!.id ? {...editingEvent!, ...form} : e));
    }
    closeModal();
  };

  const confirmDelete = () => {
    setEvents(prev => prev.filter(e => e.id !== deleteId));
    setDeleteId(null); setDetailEvent(null);
  };

  const inp = "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition";

  return (
    <div className="max-w-6xl space-y-6">
      {/* Calendar header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={prevMonth} className="w-9 h-9 rounded-xl bg-white border border-slate-200 hover:border-orange-300 flex items-center justify-center transition-colors"><ChevronLeft size={16}/></button>
          <h2 className="font-heading font-black text-2xl text-slate-900 w-56 text-center">{MONTHS[month]} {year}</h2>
          <button onClick={nextMonth} className="w-9 h-9 rounded-xl bg-white border border-slate-200 hover:border-orange-300 flex items-center justify-center transition-colors"><ChevronRight size={16}/></button>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl transition-colors text-sm">
          <Plus size={16} /> New Event
        </button>
      </div>

      {/* Calendar grid */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-slate-100">
          {DAYS_SHORT.map(d => (
            <div key={d} className="text-center text-xs font-semibold text-slate-400 uppercase tracking-wider py-3">{d}</div>
          ))}
        </div>
        {/* Day cells */}
        <div className="grid grid-cols-7">
          {cells.map((day, i) => {
            if (!day) return <div key={i} className="h-28 border-b border-r border-slate-50" />;
            const dayEvents = eventsForDay(day);
            const isToday   = day===today.getDate() && month===today.getMonth() && year===today.getFullYear();
            const ds = `${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
            return (
              <div key={i} onClick={() => setSelectedDay(ds)}
                className={`h-28 border-b border-r border-slate-50 p-2 cursor-pointer hover:bg-slate-50/80 transition-colors ${selectedDay===ds?"bg-orange-50/50":""}`}>
                <span className={`inline-flex w-6 h-6 items-center justify-center rounded-full text-xs font-bold mb-1 ${isToday?"bg-orange-500 text-white":"text-slate-600"}`}>{day}</span>
                <div className="space-y-0.5 overflow-hidden">
                  {dayEvents.slice(0,2).map(evt => (
                    <button key={evt.id} onClick={e=>{e.stopPropagation();setDetailEvent(evt);}}
                      className={`w-full text-left text-xs text-white px-1.5 py-0.5 rounded-md truncate font-medium ${typeColors[evt.type]} hover:opacity-90 transition-opacity`}>
                      {evt.title}
                    </button>
                  ))}
                  {dayEvents.length > 2 && <p className="text-xs text-slate-400 pl-1">+{dayEvents.length-2} more</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4">
        {(Object.entries(typeColors) as [EventType, string][]).map(([type, color]) => (
          <span key={type} className="flex items-center gap-1.5 text-sm text-slate-600">
            <span className={`w-3 h-3 rounded-sm ${color}`} />{type}
          </span>
        ))}
      </div>

      {/* Event detail side-panel */}
      <AnimatePresence>
        {detailEvent && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 bg-black/50 flex justify-end" onClick={()=>setDetailEvent(null)}>
            <motion.div initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}} transition={{type:"spring",stiffness:300,damping:30}}
              className="bg-white w-full max-w-md h-full overflow-y-auto shadow-2xl" onClick={e=>e.stopPropagation()}>
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                <h3 className="font-heading font-black text-lg text-slate-900">Event Details</h3>
                <button onClick={()=>setDetailEvent(null)} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"><X size={16}/></button>
              </div>
              <div className="p-6 space-y-5">
                <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${typeBadge[detailEvent.type]}`}>{detailEvent.type}</span>
                <h2 className="font-heading font-black text-xl text-slate-900 leading-tight">{detailEvent.title}</h2>
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex items-center gap-2"><Clock size={14} className="text-slate-400"/>{new Date(detailEvent.date).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})} at {detailEvent.time}</div>
                  <div className="flex items-start gap-2"><MapPin size={14} className="text-slate-400 mt-0.5"/>{detailEvent.location}</div>
                  <div className="flex items-center gap-2"><Users size={14} className="text-slate-400"/>{detailEvent.rsvps.reduce((s,r)=>s+r.seats,0)} RSVPs · {detailEvent.capacity} capacity</div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{detailEvent.description}</p>

                {/* RSVPs */}
                {detailEvent.rsvps.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3 text-sm">RSVPs ({detailEvent.rsvps.length})</h4>
                    <div className="space-y-2">
                      {detailEvent.rsvps.map(r => (
                        <div key={r.id} className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-2.5 text-sm">
                          <div><p className="font-medium text-slate-800">{r.name}</p><p className="text-xs text-slate-400">{r.email}</p></div>
                          <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">{r.seats} seat{r.seats>1?"s":""}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <button onClick={()=>openEdit(detailEvent)} className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 rounded-xl text-sm transition-colors"><Pencil size={14}/> Edit</button>
                  <button onClick={()=>setDeleteId(detailEvent.id)} className="flex-1 flex items-center justify-center gap-2 bg-red-100 hover:bg-red-200 text-red-600 font-bold py-2.5 rounded-xl text-sm transition-colors"><Trash2 size={14}/> Delete</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Event editor modal */}
      <AnimatePresence>
        {editingEvent !== null && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
            <motion.div initial={{scale:0.95,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.95,opacity:0}}
              className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl" onClick={e=>e.stopPropagation()}>
              <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100">
                <h2 className="font-heading font-black text-xl text-slate-900">{isNew?"New Event":"Edit Event"}</h2>
                <button onClick={closeModal} className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center"><X size={18}/></button>
              </div>
              <div className="overflow-y-auto flex-1 px-7 py-6 space-y-5">
                <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Title *</label><input value={form.title} onChange={e=>upd("title",e.target.value)} placeholder="Event title" className={inp}/></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Date *</label><input type="date" value={form.date} onChange={e=>upd("date",e.target.value)} className={inp}/></div>
                  <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Time</label><input value={form.time} onChange={e=>upd("time",e.target.value)} placeholder="9:00 AM" className={inp}/></div>
                </div>
                <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Location</label><input value={form.location} onChange={e=>upd("location",e.target.value)} placeholder="Venue, City" className={inp}/></div>
                <div className="grid grid-cols-3 gap-4">
                  <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Type</label>
                    <select value={form.type} onChange={e=>upd("type",e.target.value)} className={inp}>
                      {(["Workshop","Graduation","Open Day","Community"] as EventType[]).map(t=><option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Capacity</label><input type="number" value={form.capacity} onChange={e=>upd("capacity",Number(e.target.value))} className={inp}/></div>
                  <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Status</label>
                    <select value={form.status} onChange={e=>upd("status",e.target.value)} className={inp}>
                      <option>Upcoming</option><option>Past</option>
                    </select>
                  </div>
                </div>
                <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Description</label><textarea rows={4} value={form.description} onChange={e=>upd("description",e.target.value)} placeholder="Event description..." className={`${inp} resize-none`}/></div>
              </div>
              <div className="flex items-center justify-end gap-3 px-7 py-4 border-t border-slate-100">
                <button onClick={closeModal} className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium transition-colors">Cancel</button>
                <button onClick={saveEvent} className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition-colors">{isNew?"Create Event":"Save Changes"}</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete confirm */}
      <AnimatePresence>
        {deleteId && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
            <motion.div initial={{scale:0.9}} animate={{scale:1}} exit={{scale:0.9}} className="bg-white rounded-2xl p-7 max-w-sm w-full shadow-2xl text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><Trash2 size={22} className="text-red-500"/></div>
              <h3 className="font-heading font-black text-lg text-slate-900 mb-2">Delete Event?</h3>
              <p className="text-slate-500 text-sm mb-6">All RSVPs for this event will also be removed.</p>
              <div className="flex gap-3">
                <button onClick={()=>setDeleteId(null)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors">Cancel</button>
                <button onClick={confirmDelete} className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-colors">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
