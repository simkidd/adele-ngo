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
    tagline: "Build real digital skills for today’s economy",
    description:
      "Our Digital Literacy program equips participants with practical computer and internet skills for work, business, and everyday life. From basic device use to productivity tools and digital income opportunities, participants gain the confidence to learn, work, and earn in a digital world.",
    duration: "12 Weeks",
    cohortSize: "25 Participants",
    certification: "Digital Skills Certificate",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&q=80",
    color: "from-primary to-secondary",
    lightColor: "bg-primary/10",
    accentColor: "text-primary",
    curriculum: [
      "Computer basics & internet navigation",
      "Microsoft Office & productivity tools",
      "Email & professional communication",
      "Online research & digital safety",
      "Introduction to freelancing platforms",
      "Using social media and AI tools for business",
    ],
    outcomes: [
      "Participants gain practical digital confidence",
      "Better access to jobs, remote work, and freelancing",
      "Improved readiness for online business opportunities",
    ],
  },
  {
    id: "entrepreneurship",
    icon: TrendingUp,
    title: "Entrepreneurship",
    tagline: "Turn your idea into a sustainable business",
    description:
      "This program helps aspiring and early-stage entrepreneurs develop the mindset, structure, and practical skills needed to build and grow a business. Participants learn how to validate ideas, attract customers, manage money, and position their ventures for long-term success.",
    duration: "16 Weeks",
    cohortSize: "20 Participants",
    certification: "Entrepreneurship Certificate",
    image:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=900&q=80",
    color: "from-primary to-accent",
    lightColor: "bg-primary/10",
    accentColor: "text-primary",
    curriculum: [
      "Business idea validation",
      "Pricing, budgeting & record keeping",
      "Marketing & customer acquisition",
      "Branding and social media for business",
      "Business registration & compliance basics",
      "Pitching and accessing funding opportunities",
    ],
    outcomes: [
      "Participants leave with a clearer business roadmap",
      "Improved confidence in managing and growing a business",
      "Greater readiness for grants, funding, and market access",
    ],
  },
  {
    id: "culinary-arts",
    icon: ChefHat,
    title: "Culinary Arts",
    tagline: "Turn your passion for food into income",
    description:
      "More than cooking, our Culinary Arts program teaches kitchen discipline, food safety, menu planning, and the business side of food. Graduates are prepared for opportunities in catering, hospitality, food service, and self-employment.",
    duration: "14 Weeks",
    cohortSize: "18 Participants",
    certification: "Culinary Skills Certificate",
    image:
      "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=900&q=80",
    color: "from-secondary to-primary",
    lightColor: "bg-secondary/10",
    accentColor: "text-secondary",
    curriculum: [
      "Food hygiene & kitchen safety",
      "Nigerian and continental dishes",
      "Baking & pastry basics",
      "Menu planning and food costing",
      "Catering operations & event service",
      "Building a small food business",
    ],
    outcomes: [
      "Hands-on culinary and food service skills",
      "Readiness for catering, hospitality, and food ventures",
      "Better understanding of how to earn through food business",
    ],
  },
  {
    id: "tailoring",
    icon: Scissors,
    title: "Tailoring & Fashion Design",
    tagline: "Create fashion and build your brand",
    description:
      "From sewing fundamentals to garment finishing, this program helps participants build strong tailoring skills while also learning how to run a fashion business. It is designed for those who want to work independently, serve clients, or launch a small brand.",
    duration: "16 Weeks",
    cohortSize: "22 Participants",
    certification: "Fashion & Tailoring Certificate",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
    color: "from-primary to-secondary",
    lightColor: "bg-primary/10",
    accentColor: "text-primary",
    curriculum: [
      "Hand and machine sewing techniques",
      "Pattern drafting & garment construction",
      "Nigerian fabrics (Ankara, Adire) & design principles",
      "Alterations, fitting & finishing",
      "Textile sourcing and pricing",
      "Fashion branding and client management",
    ],
    outcomes: [
      "Participants develop practical tailoring skills",
      "Improved ability to earn from custom orders",
      "Stronger foundation for building a fashion business",
    ],
  },
  {
    id: "carpentry",
    icon: Hammer,
    title: "Carpentry & Woodwork",
    tagline: "Learn a trade and build a future",
    description:
      "Our Carpentry & Woodwork program provides hands-on training in furniture making, joinery, finishing, and workshop safety. Participants gain practical trade skills alongside the knowledge needed to manage jobs, clients, and income opportunities.",
    duration: "18 Weeks",
    cohortSize: "16 Participants",
    certification: "Carpentry Certificate",
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=900&q=80",
    color: "from-primary to-secondary",
    lightColor: "bg-primary/10",
    accentColor: "text-primary",
    curriculum: [
      "Tool handling & workshop safety",
      "Basic furniture making and joinery",
      "Measurements, cutting & assembly",
      "Wood finishing techniques",
      "Introductory construction carpentry",
      "Workshop management & client relations",
    ],
    outcomes: [
      "Participants gain practical woodworking skills",
      "Better readiness for work and self-employment",
      "Stronger foundation for running a small workshop",
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
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-lg"
    >
      <div className="relative h-56 overflow-hidden">
        <Image
          src={program.image}
          alt={program.title}
          fill
          className="object-cover"
          loading="lazy"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t ${program.color} opacity-70`}
        />
        <div className="absolute bottom-4 left-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <Icon size={20} className="text-white" />
          </div>
          <div>
            <div className="font-heading text-xl font-bold leading-none text-white">
              {program.title}
            </div>
            <div className="mt-0.5 text-xs text-white/85">
              {program.tagline}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4 flex flex-wrap gap-2">
          {[
            { icon: Clock, text: program.duration },
            { icon: Users, text: program.cohortSize },
            { icon: Award, text: program.certification },
          ].map(({ icon: MetaIcon, text }) => (
            <span
              key={text}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${program.lightColor} ${program.accentColor}`}
            >
              <MetaIcon size={11} />
              {text}
            </span>
          ))}
        </div>

        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          {program.description}
        </p>

        <div className="mb-4 space-y-2">
          {program.outcomes.map((o) => (
            <div key={o} className="flex items-start gap-2">
              <CheckCircle2
                size={14}
                className={`${program.accentColor} mt-0.5 flex-shrink-0`}
              />
              <span className="text-xs text-muted-foreground">{o}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className={`flex w-full items-center justify-between border-t border-border py-3 text-sm font-semibold ${program.accentColor}`}
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
                  transition={{ delay: i * 0.04 }}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        <Link
          href={`/programs/${program.id}`}
          className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all hover:gap-3 hover:opacity-90 ${program.lightColor} ${program.accentColor}`}
        >
          View Program & Register <ArrowRight size={14} />
        </Link>
      </div>
    </motion.div>
  );
}

export default function ProgramsContent() {
  return (
    <div className="bg-muted/40">
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-heading mb-6 text-4xl font-black text-foreground"
              >
                Practical Skills. Real Support. Lasting Impact.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mb-4 leading-relaxed text-muted-foreground"
              >
                The Adele Empowerment Foundation runs practical training
                programs designed to help individuals in underserved communities
                build usable, income-generating skills.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="mb-8 leading-relaxed text-muted-foreground"
              >
                Our programs are delivered through facilitators, partner
                trainers, and community-based learning models, focusing on
                real-world application rather than theory.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground transition-all hover:scale-105 hover:bg-primary/90"
                >
                  Apply for a Program <ArrowRight size={16} />
                </Link>
              </motion.div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "5", label: "Skill Tracks" },
                { value: "12–18", label: "Weeks of Training" },
                { value: "Hands-on", label: "Learning Approach" },
                { value: "Ongoing", label: "Post-Training Support" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-2xl bg-card p-6 text-center shadow-sm border border-border"
                >
                  <div className="font-heading mb-1 text-3xl font-black text-primary">
                    {s.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading mb-12 text-center text-3xl font-black text-foreground"
          >
            Choose Your Path
          </motion.h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((program, i) => (
              <ProgramCard key={program.id} program={program} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading mb-4 text-4xl font-black text-foreground"
          >
            How to Apply
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-16 text-muted-foreground"
          >
            Joining an Adele program is simple and accessible. Here’s what to
            expect.
          </motion.p>

          <div className="grid gap-8 md:grid-cols-4">
            {[
              {
                step: "01",
                title: "Expression of Interest",
                desc: "Interested individuals submit basic details or are referred through community partners.",
              },
              {
                step: "02",
                title: "Selection & Matching",
                desc: "Participants are matched to available training cohorts based on interest and capacity.",
              },
              {
                step: "03",
                title: "Onboarding",
                desc: "Selected participants receive program details and orientation from facilitators.",
              },
              {
                step: "04",
                title: "Training Begins",
                desc: "Participants begin hands-on learning with guidance from trainers and mentors.",
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
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary font-heading text-lg font-black text-primary-foreground">
                  {s.step}
                </div>
                <h3 className="mb-2 font-semibold text-foreground">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
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
              className="inline-flex items-center gap-2 rounded-full bg-primary px-10 py-4 text-lg font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105 hover:bg-primary/90"
            >
              Apply Now <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
