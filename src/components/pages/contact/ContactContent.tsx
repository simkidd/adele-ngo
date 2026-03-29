"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Users,
  Heart,
  Handshake,
  BookOpen,
} from "lucide-react";

const enquiryTypes = [
  { icon: BookOpen, label: "Program Application", value: "application" },
  { icon: Heart, label: "Donate / Fund a Cohort", value: "donation" },
  { icon: Handshake, label: "Partnership / Employer", value: "partnership" },
  { icon: Users, label: "Volunteer / Mentor", value: "volunteer" },
];

const offices = [
  {
    city: "Accra HQ",
    address: "17 Liberation Road, Madina, Greater Accra",
    phone: "+233 30 270 6750",
    email: "accra@adelefoundation.org",
    hours: "Mon – Fri: 8:00 AM – 5:00 PM",
  },
  {
    city: "Kumasi Office",
    address: "22 Prempeh II Street, Adum, Ashanti Region",
    phone: "+233 32 202 1198",
    email: "kumasi@adelefoundation.org",
    hours: "Mon – Fri: 8:00 AM – 4:30 PM",
  },
  {
    city: "Takoradi Office",
    address: "8 Market Circle, Effiakuma, Western Region",
    phone: "+233 31 202 4437",
    email: "takoradi@adelefoundation.org",
    hours: "Mon – Thu: 8:00 AM – 4:00 PM",
  },
];

export default function ContactContent() {
  const [enquiry, setEnquiry] = useState("application");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    program: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div>
      {/* Enquiry type selector + form */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left — info */}
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-heading text-4xl font-black text-slate-900 mb-4"
              >
                How Can We Help?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-slate-600 mb-8 leading-relaxed"
              >
                Select the type of enquiry below and fill in the form. Our team
                typically responds within one business day.
              </motion.p>

              {/* Enquiry type cards */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                {enquiryTypes.map((type, i) => {
                  const Icon = type.icon;
                  return (
                    <motion.button
                      key={type.value}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      onClick={() => setEnquiry(type.value)}
                      className={`flex flex-col items-start gap-2 p-5 rounded-2xl border-2 transition-all text-left ${
                        enquiry === type.value
                          ? "border-orange-500 bg-orange-50"
                          : "border-slate-200 hover:border-orange-200"
                      }`}
                    >
                      <Icon
                        size={20}
                        className={
                          enquiry === type.value
                            ? "text-orange-500"
                            : "text-slate-400"
                        }
                      />
                      <span
                        className={`text-sm font-semibold ${
                          enquiry === type.value
                            ? "text-orange-600"
                            : "text-slate-700"
                        }`}
                      >
                        {type.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Contact info */}
              <div className="space-y-4">
                {[
                  { icon: Mail, text: "hello@adelefoundation.org" },
                  { icon: Phone, text: "+233 30 270 6750" },
                  {
                    icon: MapPin,
                    text: "17 Liberation Road, Madina, Accra, Ghana",
                  },
                  {
                    icon: Clock,
                    text: "Monday – Friday, 8:00 AM – 5:00 PM GMT",
                  },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-orange-500" />
                    </div>
                    <span className="text-slate-600 text-sm pt-2">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-slate-50 rounded-3xl p-8 md:p-10"
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-full py-16 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: 0.1,
                      }}
                      className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6"
                    >
                      <CheckCircle2 size={32} className="text-green-500" />
                    </motion.div>
                    <h3 className="font-heading text-2xl font-black text-slate-900 mb-3">
                      Message Received!
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed max-w-xs">
                      Thank you for reaching out. A member of our team will get
                      back to you within one business day.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setForm({
                          name: "",
                          email: "",
                          phone: "",
                          program: "",
                          message: "",
                        });
                      }}
                      className="mt-6 text-sm text-orange-500 font-semibold hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <h3 className="font-heading text-2xl font-black text-slate-900 mb-6">
                      {enquiryTypes.find((e) => e.value === enquiry)?.label}
                    </h3>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                          Full Name *
                        </label>
                        <input
                          required
                          value={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                          placeholder="Your full name"
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                          Email *
                        </label>
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
                          placeholder="your@email.com"
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        placeholder="+234 ..."
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                      />
                    </div>

                    {enquiry === "application" && (
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                          Program of Interest *
                        </label>
                        <select
                          required
                          value={form.program}
                          onChange={(e) =>
                            setForm({ ...form, program: e.target.value })
                          }
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                        >
                          <option value="">Select a program</option>
                          <option>Digital Literacy</option>
                          <option>Entrepreneurship</option>
                          <option>Culinary Arts</option>
                          <option>Tailoring & Textiles</option>
                          <option>Carpentry & Woodwork</option>
                        </select>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                        Message *
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                        placeholder={
                          enquiry === "application"
                            ? "Tell us a bit about yourself and why you'd like to join..."
                            : enquiry === "donation"
                              ? "Tell us how you'd like to contribute..."
                              : enquiry === "partnership"
                                ? "Describe your organisation and how we might work together..."
                                : "Tell us how you'd like to get involved..."
                        }
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition resize-none"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-70 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm cursor-pointer disabled:pointer-events-none"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          />
                          Sending...
                        </span>
                      ) : (
                        <>
                          <Send size={16} /> Send Message
                        </>
                      )}
                    </motion.button>

                    <p className="text-xs text-slate-400 text-center">
                      We respond within 1 business day. Your data is never
                      shared.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Office locations */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl font-black text-slate-900 mb-12 text-center"
          >
            Our Offices
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {offices.map((office, i) => (
              <motion.div
                key={office.city}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-7 shadow-sm"
              >
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                  <MapPin size={18} className="text-orange-500" />
                </div>
                <h3 className="font-heading font-bold text-xl text-slate-900 mb-4">
                  {office.city}
                </h3>
                <div className="space-y-3 text-sm text-slate-600">
                  <p className="flex items-start gap-2">
                    <MapPin
                      size={13}
                      className="text-slate-400 mt-0.5 flex-shrink-0"
                    />
                    {office.address}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone size={13} className="text-slate-400" />
                    <a
                      href={`tel:${office.phone}`}
                      className="hover:text-orange-500 transition-colors"
                    >
                      {office.phone}
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail size={13} className="text-slate-400" />
                    <a
                      href={`mailto:${office.email}`}
                      className="hover:text-orange-500 transition-colors"
                    >
                      {office.email}
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock size={13} className="text-slate-400" />
                    {office.hours}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Donate strip */}
      <section className="py-16 bg-orange-500">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-heading text-3xl font-black text-white mb-3"
          >
            Ready to Fund a Future?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-orange-100 mb-6"
          >
            Every donation directly funds training, tools, and mentorship for
            someone who needs it.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <button className="bg-white text-orange-500 font-bold px-10 py-4 rounded-full text-lg hover:bg-orange-50 transition-colors">
              Donate Now
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
