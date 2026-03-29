"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart,
  Globe,
  Users,
  Lightbulb,
  Shield,
  Handshake,
  ArrowRight,
} from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Compassion",
    desc: "We lead with empathy — meeting people where they are and honouring their dignity in every interaction.",
  },
  {
    icon: Globe,
    title: "Inclusivity",
    desc: "We serve without bias across gender, religion, ethnicity, or background. Every person deserves a chance.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "We constantly evolve our programs to reflect the actual needs of employers and the communities we serve.",
  },
  {
    icon: Shield,
    title: "Integrity",
    desc: "We are transparent with our donors, partners, and participants — accountability is core to how we operate.",
  },
  {
    icon: Users,
    title: "Community",
    desc: "We believe in collective uplift. When one person rises, the whole community benefits from their growth.",
  },
  {
    icon: Handshake,
    title: "Partnership",
    desc: "We work alongside government, business, and civil society to multiply our reach and deepen our impact.",
  },
];

const team = [
  {
    name: "Dr. Adwoa Sarpong",
    role: "Executive Director",
    bio: "Former UNICEF education specialist with 20 years of community development experience across West Africa.",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80",
  },
  {
    name: "Kofi Acheampong",
    role: "Head of Programs",
    bio: "Certified skills development trainer with a background in vocational education policy and curriculum design.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
  },
  {
    name: "Esi Boateng",
    role: "Director of Partnerships",
    bio: "MBA graduate who spent a decade building employer networks in the manufacturing and service sectors.",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80",
  },
  {
    name: "Yaw Mensah",
    role: "Community Outreach Lead",
    bio: "Social worker and community organiser who grew up in the Volta Region and understands grassroots needs firsthand.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
];

const milestones = [
  {
    year: "2015",
    title: "Foundation Established",
    desc: "Adele began with a single cohort of 15 participants in Accra's Madina neighbourhood, running a 6-week digital literacy pilot.",
  },
  {
    year: "2017",
    title: "Expanded to 3 Programs",
    desc: "Added Entrepreneurship and Culinary Arts tracks. Graduated our first 100 participants and established our first employer partnership network.",
  },
  {
    year: "2019",
    title: "National Reach",
    desc: "Expanded to 5 regions across Nigeria. Launched our flagship Tailoring & Textiles program and received USAID recognition for programme excellence.",
  },
  {
    year: "2021",
    title: "10,000 Lives Touched",
    desc: "Crossed the 10,000 participant milestone. Added Carpentry & Woodwork. Partnered with 80+ employers to create direct job pipelines.",
  },
  {
    year: "2023",
    title: "Regional Leadership",
    desc: "Began pilot operations in Togo and Côte d'Ivoire. Received the Africa Social Impact Award and launched our alumni mentorship network.",
  },
  {
    year: "2025",
    title: "12,000+ & Growing",
    desc: "12,000 graduates across 45+ communities, a 68% employment rate, and ambitious plans to reach 20,000 by 2027.",
  },
];

export default function AboutContent() {
  return (
    <div>
      {/* Mission & Vision */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-orange-500 font-semibold text-sm tracking-widest uppercase mb-4">
                Who We Are
              </p>
              <h2 className="font-heading text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                We believe potential is everywhere. Opportunity is not.
              </h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                The Adele Empowerment Foundation was born from a simple
                observation: Nigeria is full of brilliant, motivated people who
                simply lack access to the skills and networks that open doors.
                We exist to change that — systematically, sustainably, and at
                scale.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                We don&apos;t believe in charity for its own sake. We believe in
                investment — in people, in skills, in communities. Our graduates
                don&apos;t just get jobs; they become entrepreneurs, mentors,
                and community leaders who pay their growth forward.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-orange-50 rounded-2xl p-5">
                  <div className="font-heading text-3xl font-black text-orange-500 mb-1">
                    2015
                  </div>
                  <div className="text-sm text-slate-600">Year Founded</div>
                </div>
                <div className="bg-slate-50 rounded-2xl p-5">
                  <div className="font-heading text-3xl font-black text-slate-900 mb-1">
                    Port Harcourt
                  </div>
                  <div className="text-sm text-slate-600">
                    Headquarters, Nigeria
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="space-y-6">
              {[
                {
                  label: "Our Mission",
                  text: "To empower individuals in underserved communities with practical skills, mentorship, and employment connections that create economic independence and lasting community transformation.",
                  color: "border-orange-400 bg-orange-50",
                },
                {
                  label: "Our Vision",
                  text: "A West Africa where geography and circumstance no longer determine destiny — where every individual has access to the tools they need to build a dignified and prosperous life.",
                  color: "border-slate-400 bg-slate-50",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className={`border-l-4 rounded-r-2xl p-6 ${item.color}`}
                >
                  <div className="font-semibold text-slate-900 mb-2">
                    {item.label}
                  </div>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-orange-500 font-semibold text-sm tracking-widest uppercase mb-3"
            >
              Our Values
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading text-4xl font-black text-slate-900"
            >
              What We Stand For
            </motion.h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-11 h-11 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                    <Icon size={20} className="text-orange-500" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-slate-900 mb-2">
                    {v.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {v.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-orange-500 font-semibold text-sm tracking-widest uppercase mb-3"
            >
              Our Journey
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading text-4xl font-black text-slate-900"
            >
              A Decade of Impact
            </motion.h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2" />
            <div className="space-y-12">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6 }}
                  className={`flex gap-8 md:gap-0 items-start ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div
                    className={`hidden md:block md:w-1/2 ${i % 2 === 0 ? "md:pr-12 text-right" : "md:pl-12 text-left"}`}
                  >
                    <div className="font-heading text-4xl font-black text-orange-200">
                      {m.year}
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg mt-1">
                      {m.title}
                    </h3>
                    <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                  {/* Node */}
                  <div className="relative flex-shrink-0 flex items-start justify-center md:w-0">
                    <div className="w-4 h-4 bg-orange-500 rounded-full border-4 border-white shadow md:absolute md:-translate-x-1/2 mt-1.5 z-10" />
                  </div>
                  {/* Mobile / right side */}
                  <div
                    className={`md:w-1/2 ${i % 2 === 0 ? "md:pl-12" : "md:pr-12 md:text-right"}`}
                  >
                    <div className="font-heading text-3xl font-black text-orange-200 md:hidden">
                      {m.year}
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg mt-1 md:hidden">
                      {m.title}
                    </h3>
                    <p className="text-slate-500 text-sm mt-2 leading-relaxed md:hidden">
                      {m.desc}
                    </p>
                    {/* Desktop shows content on alternate side */}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-orange-500 font-semibold text-sm tracking-widest uppercase mb-3"
            >
              Leadership
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading text-4xl font-black text-slate-900"
            >
              Meet the Team
            </motion.h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-bold text-slate-900 text-lg">
                    {member.name}
                  </h3>
                  <div className="text-orange-500 text-xs font-semibold mb-2">
                    {member.role}
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-orange-500">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl font-black text-white mb-4"
          >
            Partner With Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-orange-100 mb-8 text-lg"
          >
            Whether you&pos;re an employer, donor, government body, or community
            leader — we&apos&apos;d love to explore how we can work together.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-orange-500 font-bold px-8 py-4 rounded-full hover:bg-orange-50 transition-colors text-lg"
            >
              Get In Touch <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
