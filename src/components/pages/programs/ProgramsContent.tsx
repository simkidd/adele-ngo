"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Monitor,
  TrendingUp,
  ChefHat,
  Scissors,
  Hammer,
  Clock,
  Users,
  Award,
  ChevronDown,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const programs = [
  {
    id: "digital-literacy",
    icon: Monitor,
    title: "Digital Literacy",
    tagline: "Navigate the digital world with confidence",
    description:
      "Our Digital Literacy program equips participants with foundational to advanced computer skills. From basic device use to professional software, participants graduate ready to work in digital-first environments — or launch their own online ventures.",
    duration: "12 Weeks",
    cohortSize: "25 Participants",
    certification: "ICT Proficiency Certificate",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&q=80",
    color: "from-blue-500 to-indigo-600",
    lightColor: "bg-blue-50",
    accentColor: "text-blue-600",
    curriculum: [
      "Computer basics & operating systems",
      "Microsoft Office Suite (Word, Excel, PowerPoint)",
      "Internet skills, research & digital safety",
      "Email communication & professional etiquette",
      "Introduction to coding & web basics",
      "Social media for business & personal branding",
    ],
    outcomes: [
      "85% secure employment within 3 months",
      "60% report income increase",
      "40% start online businesses",
    ],
  },
  {
    id: "entrepreneurship",
    icon: TrendingUp,
    title: "Entrepreneurship",
    tagline: "Turn ideas into thriving businesses",
    description:
      "This intensive program transforms aspiring entrepreneurs into business owners. Participants learn to ideate, validate, and launch ventures — backed by mentorship from successful local business leaders and access to our partner network.",
    duration: "16 Weeks",
    cohortSize: "20 Participants",
    certification: "Business Development Certificate",
    image:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=900&q=80",
    color: "from-orange-500 to-red-500",
    lightColor: "bg-orange-50",
    accentColor: "text-orange-600",
    curriculum: [
      "Business ideation & market research",
      "Business plan development",
      "Financial literacy & budgeting",
      "Marketing & customer acquisition",
      "Legal structures & registration",
      "Pitching to investors & grant writing",
    ],
    outcomes: [
      "70% launch businesses within 6 months",
      "Avg. 3 jobs created per graduate",
      "₵5,000 avg. seed funding secured",
    ],
  },
  {
    id: "culinary-arts",
    icon: ChefHat,
    title: "Culinary Arts",
    tagline: "Master the art and business of food",
    description:
      "More than cooking — our Culinary Arts program covers professional kitchen skills, food safety, catering operations, and how to build a food business. Graduates work in restaurants, hotels, and catering companies, or run their own food ventures.",
    duration: "14 Weeks",
    cohortSize: "18 Participants",
    certification: "Professional Culinary Certificate",
    image:
      "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=900&q=80",
    color: "from-amber-500 to-orange-600",
    lightColor: "bg-amber-50",
    accentColor: "text-amber-600",
    curriculum: [
      "Food hygiene & kitchen safety (HACCP)",
      "West African & international cuisine techniques",
      "Baking & pastry fundamentals",
      "Catering & event planning",
      "Menu development & costing",
      "Food entrepreneurship & social media marketing",
    ],
    outcomes: [
      "90% employment rate",
      "Partners with 12 hospitality employers",
      "30% open catering businesses",
    ],
  },
  {
    id: "tailoring",
    icon: Scissors,
    title: "Tailoring & Textiles",
    tagline: "Create fashion that transforms lives",
    description:
      "From hand stitching to industrial sewing machines, participants master the craft of tailoring and fashion production. The program also covers fashion design principles and running a successful tailoring business.",
    duration: "16 Weeks",
    cohortSize: "22 Participants",
    certification: "Fashion & Textile Skills Certificate",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
    color: "from-purple-500 to-pink-600",
    lightColor: "bg-purple-50",
    accentColor: "text-purple-600",
    curriculum: [
      "Hand & machine sewing techniques",
      "Pattern making & garment construction",
      "African print & kente design principles",
      "Alterations & custom fitting",
      "Textile sourcing & cost management",
      "Building a tailoring clientele",
    ],
    outcomes: [
      "80% self-employed within 4 months",
      "Average 5 clients in first month",
      "₵3,500 avg. monthly income",
    ],
  },
  {
    id: "carpentry",
    icon: Hammer,
    title: "Carpentry & Woodwork",
    tagline: "Build with skill, build for life",
    description:
      "Our Carpentry program provides hands-on training in woodworking, furniture making, and construction carpentry. Participants graduate with both a solid trade skill and the business knowledge to operate their own workshops.",
    duration: "18 Weeks",
    cohortSize: "16 Participants",
    certification: "Carpentry & Woodwork Certificate",
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=900&q=80",
    color: "from-green-600 to-teal-600",
    lightColor: "bg-green-50",
    accentColor: "text-green-700",
    curriculum: [
      "Woodwork safety & tool mastery",
      "Reading blueprints & construction plans",
      "Furniture design & joinery",
      "Cabinet making & finishing techniques",
      "Construction carpentry & site work",
      "Workshop management & client relations",
    ],
    outcomes: [
      "75% employed in construction sector",
      "Partners with 8 construction firms",
      "25% open own workshops",
    ],
  },
];

function ProgramCard({
  program,
  index,
}: {
  program: (typeof programs)[0];
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const Icon = program.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={program.image}
          alt={program.title}
          fill
          className="object-cover"
          loading="lazy"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t ${program.color} opacity-60`}
        />
        <div className="absolute bottom-4 left-5 flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Icon size={20} className="text-white" />
          </div>
          <div>
            <div className="text-white font-heading font-bold text-xl leading-none">
              {program.title}
            </div>
            <div className="text-white/80 text-xs mt-0.5">
              {program.tagline}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        {/* Meta chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            { icon: Clock, text: program.duration },
            { icon: Users, text: program.cohortSize },
            { icon: Award, text: program.certification },
          ].map(({ icon: MetaIcon, text }) => (
            <span
              key={text}
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full ${program.lightColor} ${program.accentColor}`}
            >
              <MetaIcon size={11} />
              {text}
            </span>
          ))}
        </div>

        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          {program.description}
        </p>

        {/* Outcomes */}
        <div className="space-y-1.5 mb-4">
          {program.outcomes.map((o) => (
            <div key={o} className="flex items-start gap-2">
              <CheckCircle2
                size={14}
                className={`${program.accentColor} mt-0.5 flex-shrink-0`}
              />
              <span className="text-xs text-slate-600">{o}</span>
            </div>
          ))}
        </div>

        {/* Curriculum accordion */}
        <button
          onClick={() => setExpanded(!expanded)}
          className={`w-full flex items-center justify-between text-sm font-semibold py-3 border-t border-slate-100 ${program.accentColor}`}
        >
          View Curriculum
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={16} />
          </motion.div>
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-2 overflow-hidden"
            >
              {program.curriculum.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-2 text-sm text-slate-600"
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${program.accentColor.replace("text", "bg")}`}
                  />
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function ProgramsContent() {
  return (
    <div className="bg-slate-50">
      {/* Intro */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-heading text-4xl font-black text-slate-900 mb-6"
              >
                Practical Skills. Real Results. Lasting Change.
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-slate-600 leading-relaxed mb-4"
              >
                All Adele programs are developed in partnership with industry
                employers to ensure graduates meet real-world hiring standards.
                We combine classroom instruction, hands-on workshops, and
                mentorship from working professionals.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="text-slate-600 leading-relaxed mb-8"
              >
                Participants also receive ongoing support after graduation —
                from job placement assistance to access to our alumni network
                and continued learning resources.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-7 py-3.5 rounded-full transition-all hover:scale-105"
                >
                  Apply for a Program <ArrowRight size={16} />
                </Link>
              </motion.div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "5", label: "Skill Tracks" },
                { value: "12 wks", label: "Avg. Duration" },
                { value: "83%", label: "Employment Rate" },
                { value: "2,400+", label: "Graduates" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-slate-50 rounded-2xl p-6 text-center"
                >
                  <div className="font-heading text-3xl font-black text-orange-500 mb-1">
                    {s.value}
                  </div>
                  <div className="text-sm text-slate-500">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Program Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl font-black text-slate-900 mb-12 text-center"
          >
            Choose Your Path
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, i) => (
              <ProgramCard key={program.id} program={program} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* How to apply */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl font-black text-slate-900 mb-4"
          >
            How to Apply
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 mb-16"
          >
            Joining an Adele program is straightforward. Here&apos;s what to
            expect.
          </motion.p>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Submit Application",
                desc: "Fill out our short online form with your background and program interest.",
              },
              {
                step: "02",
                title: "Screening Interview",
                desc: "A brief call with our admissions team to assess fit and motivation.",
              },
              {
                step: "03",
                title: "Acceptance & Onboarding",
                desc: "Receive your acceptance letter, program materials, and orientation date.",
              },
              {
                step: "04",
                title: "Begin Training",
                desc: "Start your program with your cohort and dedicated program facilitator.",
              },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-orange-500 text-white font-heading font-black text-lg rounded-full flex items-center justify-center mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-14"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-10 py-4 rounded-full text-lg transition-all hover:scale-105 shadow-lg shadow-orange-500/25"
            >
              Apply Now <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
