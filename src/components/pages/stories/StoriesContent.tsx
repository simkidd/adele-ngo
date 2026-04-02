"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ArrowRight, Filter } from "lucide-react";

const stories = [
  {
    name: "Ama Mensah",
    program: "Digital Literacy",
    location: "Accra, Madina",
    year: "2022",
    role: "IT Support Specialist & Digital Trainer",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80",
    shortQuote: "I went from uncertain to employed — and now I mentor others.",
    fullStory:
      "Before Adele, I was a stay-at-home mother with no formal qualifications beyond secondary school. I had a second-hand phone but had never touched a laptop. My husband encouraged me to apply after seeing a flyer at our church.\n\nThe 12-week Digital Literacy program was intense, but the facilitators were patient and encouraging. I learned Microsoft Office, basic web design, and how to communicate professionally online. Within two months of graduating, I was hired as an IT support assistant at a local accounting firm.\n\nToday, I run after-school digital literacy sessions for 30 teenagers in my community — using skills I learned at Adele. My income has tripled, and I'm saving to start my own digital training centre.",
    impact: ["Tripled her income", "Employs 2 part-time assistants", "Trains 30 youth weekly"],
    tag: "Digital Literacy",
  },
  {
    name: "Kwame Asante",
    program: "Entrepreneurship",
    location: "Kumasi, Adum",
    year: "2021",
    role: "Founder, Asante Agri-Fresh Supplies",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80",
    shortQuote: "The training gave me skills I use every day. I now employ three people.",
    fullStory:
      "I had been selling tomatoes at Kejetia market for six years — barely making enough to pay rent. I knew there was a better business model, but I didn't know how to execute it. The Entrepreneurship program changed everything.\n\nAdele taught me to write a business plan, understand cash flow, and approach buyers professionally. I restructured my informal selling into a registered agri-supply company that delivers fresh produce to restaurants and hotels across Kumasi.\n\nWithin 8 months of graduating, I had three full-time employees and a contract with two hotel groups. Adele didn't just give me skills — they connected me with my first major client through their employer network.",
    impact: ["Founded registered company", "Employs 3 full-time staff", "Serves 2 hotel groups"],
    tag: "Entrepreneurship",
  },
  {
    name: "Abena Osei",
    program: "Culinary Arts",
    location: "Takoradi",
    year: "2023",
    role: "Head Pastry Chef, Golden Tulip Hotel",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&q=80",
    shortQuote: "I found not just a job, but a career path I'm truly passionate about.",
    fullStory:
      "Growing up, I cooked for my family every day but never imagined it could be a real career. After losing my retail job during the pandemic, a neighbour mentioned Adele's Culinary Arts program.\n\nThe program was rigorous — food safety certification, pastry techniques, menu costing, and even social media for restaurants. The practical sessions in the professional kitchen gave me the confidence that my skills were industry-standard.\n\nI was placed through Adele's employer network at Golden Tulip Takoradi as a pastry assistant. Within 14 months, I was promoted to Head Pastry Chef. I now lead a team of four and develop the seasonal dessert menu. Adele gave me a career, not just a job.",
    impact: ["Promoted to Head Chef in 14 months", "Leads a team of 4", "Designs seasonal menus"],
    tag: "Culinary Arts",
  },
  {
    name: "Emmanuel Darko",
    program: "Carpentry & Woodwork",
    location: "Tema",
    year: "2020",
    role: "Owner, Darko Custom Furniture",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    shortQuote: "I left the program with tools, a client list, and the belief I could do it.",
    fullStory:
      "I had always been handy — fixing things around the neighbourhood for small change. But I had no formal training and couldn't get hired for serious work. The Carpentry program at Adele formalized everything I'd been doing intuitively.\n\nThe 18-week program covered everything from blueprint reading to fine joinery and workshop management. The facilitators helped me build my first portfolio piece: a custom dining set that I eventually sold for ₵4,000.\n\nAdele also helped me register my business. Today, Darko Custom Furniture serves clients across Tema and Accra. I work on custom furniture commissions and residential fit-outs. I've hired two other Adele carpentry graduates. It's a full circle.",
    impact: ["Owns a registered business", "Employs 2 Adele alumni", "₵8,000+ monthly revenue"],
    tag: "Carpentry",
  },
  {
    name: "Akosua Frimpong",
    program: "Tailoring & Textiles",
    location: "Kumasi, Suame",
    year: "2022",
    role: "Fashion Designer & Boutique Owner",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=600&q=80",
    shortQuote: "My boutique started in my bedroom. Now it has four sewing machines and two staff.",
    fullStory:
      "I had basic sewing skills from watching my mother, but I couldn't produce work at a professional quality. I applied to the Tailoring & Textiles program after failing twice to get hired by local fashion houses.\n\nAdele's program was transformative. Pattern making, kente integration, garment costing, and how to attract clients online — all in 16 weeks. The practical sessions were supervised by working fashion designers from Kumasi's fashion district.\n\nI launched my boutique, Kente Couture by Akosua, from my bedroom with two clients. Within a year I had moved into a proper workspace, invested in four professional machines, and hired two assistants. My waiting list is currently three weeks long.",
    impact: ["Launched her own boutique", "Employs 2 seamstresses", "3-week client waiting list"],
    tag: "Tailoring",
  },
  {
    name: "Prince Antwi",
    program: "Digital Literacy",
    location: "Accra, Nima",
    year: "2023",
    role: "Freelance Graphic Designer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
    shortQuote: "I now earn more from my laptop than I ever did working 12-hour market days.",
    fullStory:
      "I sold phone accessories in Nima market for five years. I was good at it, but the income ceiling was frustratingly low. When Adele opened a registration booth at our community centre, I signed up on impulse.\n\nThe Digital Literacy course exposed me to design software for the first time. I immediately fell in love with Canva and later Adobe tools. Our facilitator encouraged me to explore design as a career path and connected me with an online freelancing course.\n\nI now earn a consistent income as a freelance graphic designer, creating logos, social media content, and marketing materials for small businesses across Ghana. My monthly income is 4x what I made at the market, and I set my own hours.",
    impact: ["4x income increase", "20+ active clients", "100% remote work"],
    tag: "Digital Literacy",
  },
];

const tags = ["All", "Digital Literacy", "Entrepreneurship", "Culinary Arts", "Tailoring", "Carpentry"];

export default function StoriesContent() {
  const [activeTag, setActiveTag] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = activeTag === "All" ? stories : stories.filter((s) => s.tag === activeTag);

  return (
    <div>
      {/* Impact numbers strip */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "12,000+", label: "Graduates" },
              { value: "68%", label: "Employment Rate" },
              { value: "45+", label: "Communities" },
              { value: "150+", label: "Employer Partners" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="font-heading text-4xl font-black text-primary mb-1">{s.value}</div>
                <div className="text-sm text-slate-500">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stories */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Filter */}
          <div className="flex flex-wrap gap-3 mb-12 items-center">
            <Filter size={16} className="text-slate-400" />
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`text-sm font-medium px-4 py-2 rounded-full transition-all ${
                  activeTag === tag
                    ? "bg-primary text-white"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-primary/40"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Cards grid */}
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((story, i) => (
                <motion.div
                  key={story.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                >
                  {/* Image */}
                  <div className="relative h-56">
                    <Image src={story.image} alt={story.name} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                    <div className="absolute bottom-4 left-5 right-5">
                      <span className="inline-block bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full mb-2">
                        {story.program}
                      </span>
                      <div className="text-white font-heading font-bold text-lg leading-tight">{story.name}</div>
                      <div className="text-white/75 text-xs">{story.role}</div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <Quote size={24} className="text-primary/30 mb-3" />
                    <p className="text-slate-700 text-sm leading-relaxed mb-4 italic">
                      &ldquo;{story.shortQuote}&rdquo;
                    </p>

                    {/* Impact chips */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {story.impact.map((imp) => (
                        <span key={imp} className="text-xs bg-primary/10 text-primary/90 px-2.5 py-1 rounded-full">
                          {imp}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setExpanded(expanded === story.name ? null : story.name)}
                      className="text-sm font-semibold text-primary hover:text-primary/90 transition-colors cursor-pointer"
                    >
                      {expanded === story.name ? "Read less ↑" : "Read full story →"}
                    </button>

                    <AnimatePresence>
                      {expanded === story.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 border-t border-slate-100 mt-4 space-y-3">
                            {story.fullStory.split("\n\n").map((para, j) => (
                              <p key={j} className="text-slate-600 text-sm leading-relaxed">{para}</p>
                            ))}
                            <div className="text-xs text-slate-400 mt-2">
                              {story.location} · Class of {story.year}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Share your story CTA */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-heading text-4xl font-black text-white mb-4">
            Are You an Adele Graduate?
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-slate-400 mb-8 text-lg">
            Your story could inspire the next person who needs to hear it. Share your journey with us.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 rounded-full text-lg transition-all">
              Share Your Story <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
