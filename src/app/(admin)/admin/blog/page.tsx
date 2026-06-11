"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Eye, EyeOff, Search } from "lucide-react";
import { SEED_POSTS, type BlogPost, type BlogCategory, type BlogStatus } from "@/lib/store";

const CATEGORIES: BlogCategory[] = ["News", "Programs", "Community", "Impact"];
const statusColors: Record<BlogStatus, string> = {
  Published: "bg-green-100 text-green-700",
  Draft:     "bg-slate-100 text-slate-500",
};

const empty: Omit<BlogPost,"id"> = { title:"", slug:"", excerpt:"", body:"", category:"News", status:"Draft", author:"", coverImage:"", date: new Date().toISOString().split("T")[0], readTime:3 };

function slugify(s: string) { return s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,""); }

export default function AdminBlogPage() {
  const [posts, setPosts]         = useState<BlogPost[]>(SEED_POSTS);
  const [search, setSearch]       = useState("");
  const [filterStatus, setFilter] = useState<"All"|BlogStatus>("All");
  const [editing, setEditing]     = useState<BlogPost | null>(null);
  const [isNew, setIsNew]         = useState(false);
  const [form, setForm]           = useState<Omit<BlogPost,"id">>(empty);
  const [deleteId, setDeleteId]   = useState<string|null>(null);

  const upd = (k: string, v: string | number) => setForm(f => ({...f, [k]: v, ...(k==="title" && isNew ? {slug: slugify(v as string)} : {})}));

  const openNew  = () => { setForm(empty); setIsNew(true); setEditing({} as BlogPost); };
  const openEdit = (p: BlogPost) => { setForm({ title:p.title, slug:p.slug, excerpt:p.excerpt, body:p.body, category:p.category, status:p.status, author:p.author, coverImage:p.coverImage, date:p.date, readTime:p.readTime }); setIsNew(false); setEditing(p); };
  const closeModal = () => { setEditing(null); setIsNew(false); };

  const savePost = () => {
    if (isNew) {
      setPosts(prev => [{...form, id:`post-${Date.now()}`}, ...prev]);
    } else {
      setPosts(prev => prev.map(p => p.id === editing!.id ? {...editing!, ...form} : p));
    }
    closeModal();
  };

  const confirmDelete = () => {
    setPosts(prev => prev.filter(p => p.id !== deleteId));
    setDeleteId(null);
  };

  const filtered = posts.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.author.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const inp = "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition";

  return (
    <div className="max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search posts..." className="pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 w-56 transition" />
          </div>
          {(["All","Published","Draft"] as const).map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`text-sm px-4 py-2 rounded-xl font-medium transition-all ${filterStatus===s ? "bg-orange-500 text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-orange-300"}`}>{s}</button>
          ))}
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl transition-colors text-sm">
          <Plus size={16} /> New Post
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {["Title","Category","Status","Author","Date","Actions"].map(h => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((post, i) => (
                <motion.tr key={post.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i*0.04 }}
                  className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-900 line-clamp-1">{post.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">/{post.slug}</p>
                  </td>
                  <td className="px-5 py-4"><span className="text-xs bg-orange-100 text-orange-700 px-2.5 py-1 rounded-full font-semibold">{post.category}</span></td>
                  <td className="px-5 py-4"><span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${statusColors[post.status]}`}>{post.status}</span></td>
                  <td className="px-5 py-4 text-slate-600">{post.author}</td>
                  <td className="px-5 py-4 text-slate-500">{new Date(post.date).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(post)} className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-orange-100 hover:text-orange-600 flex items-center justify-center transition-colors"><Pencil size={14} /></button>
                      <button onClick={() => setDeleteId(post.id)} className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-5 py-10 text-center text-slate-400">No posts found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Editor Modal */}
      <AnimatePresence>
        {editing !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100">
                <h2 className="font-heading font-black text-xl text-slate-900">{isNew ? "New Post" : "Edit Post"}</h2>
                <button onClick={closeModal} className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"><X size={18} /></button>
              </div>
              <div className="overflow-y-auto flex-1 px-7 py-6 space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Title *</label>
                  <input value={form.title} onChange={e=>upd("title",e.target.value)} placeholder="Post title" className={inp} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Slug</label>
                    <input value={form.slug} onChange={e=>upd("slug",e.target.value)} className={inp} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Author</label>
                    <input value={form.author} onChange={e=>upd("author",e.target.value)} placeholder="Author name" className={inp} />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Category</label>
                    <select value={form.category} onChange={e=>upd("category",e.target.value)} className={inp}>
                      {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Status</label>
                    <select value={form.status} onChange={e=>upd("status",e.target.value)} className={inp}>
                      <option>Draft</option><option>Published</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Read Time (min)</label>
                    <input type="number" value={form.readTime} onChange={e=>upd("readTime",Number(e.target.value))} className={inp} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Cover Image URL</label>
                  <input value={form.coverImage} onChange={e=>upd("coverImage",e.target.value)} placeholder="https://..." className={inp} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Excerpt</label>
                  <textarea rows={2} value={form.excerpt} onChange={e=>upd("excerpt",e.target.value)} placeholder="Short summary..." className={`${inp} resize-none`} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Body</label>
                  <textarea rows={10} value={form.body} onChange={e=>upd("body",e.target.value)} placeholder="Post content (separate paragraphs with blank lines)..." className={`${inp} resize-none font-mono text-xs`} />
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 px-7 py-4 border-t border-slate-100">
                <button onClick={closeModal} className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium transition-colors">Cancel</button>
                <button onClick={savePost} className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition-colors">
                  {isNew ? "Publish Post" : "Save Changes"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete confirm */}
      <AnimatePresence>
        {deleteId && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl p-7 max-w-sm w-full shadow-2xl text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><Trash2 size={22} className="text-red-500" /></div>
              <h3 className="font-heading font-black text-lg text-slate-900 mb-2">Delete Post?</h3>
              <p className="text-slate-500 text-sm mb-6">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors">Cancel</button>
                <button onClick={confirmDelete} className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-colors">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
