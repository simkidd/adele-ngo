"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { cn } from "@/lib/utils";
import Logo from "./Logo";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Programs", href: "/programs" },
  { label: "About Us", href: "/about" },
  { label: "Success Stories", href: "/stories" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const programs = [
  "Digital Skills Training",
  "Entrepreneurship Development",
  "Vocational Skills Training",
  "Mentorship & Career Support",
  "Community Outreach Programs",
];

// ⚠️ Replace with real links OR remove if unavailable
const socials = [
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaLinkedin, href: "#", label: "LinkedIn" },
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaFacebook, href: "#", label: "Facebook" },
];

export default function Footer() {
  return (
    <footer id="footer" className="bg-slate-950 text-slate-400">
      {/* Main footer */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.15 },
          },
        }}
        className="max-w-7xl mx-auto px-6 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Column 1 — Brand */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <div
              className={cn(
                "flex items-center justify-center gap-2 p-3 rounded-full bg-white w-fit mb-4",
              )}
            >
              <Logo className="h-12 w-12" />
            </div>

            <p className="text-sm leading-relaxed mb-4">
              Empowering youth and women through practical skills training,
              mentorship, and access to economic opportunities across
              communities in Nigeria.
            </p>

            {/* Micro CTA */}
            <Link
              href="/donate"
              className="inline-block text-sm text-primary font-semibold hover:underline mb-6"
            >
              Support our work →
            </Link>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-9 h-9 rounded-full bg-slate-800 hover:bg-primary flex items-center justify-center transition-colors duration-200 group"
                  >
                    <Icon
                      size={16}
                      className="text-slate-400 group-hover:text-white"
                    />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Column 2 — Quick Links */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <motion.li
                  key={link.label}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={link.href}
                    className="text-sm hover:text-primary transition-colors relative group"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-[0.5px] bg-primary group-hover:w-full transition-all duration-300" />
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3 — Programs */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-5">
              Programs
            </h4>
            <ul className="space-y-3">
              {programs.map((p) => (
                <motion.li
                  key={p}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href="/programs"
                    className="text-sm hover:text-primary transition-colors relative group"
                  >
                    <span className="relative">
                      {p}
                      <span className="absolute bottom-0 left-0 w-0 h-[0.5px] bg-primary group-hover:w-full transition-all duration-300" />
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4 — Contact */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-5">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={15} className="text-primary mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:adeleempowermentfoundation@gmail.com"
                  className="text-sm hover:text-primary transition-colors"
                >
                  adeleempowermentfoundation@gmail.com
                </a>
              </li>

              <li className="flex items-start gap-3">
                <Phone
                  size={15}
                  className="text-primary mt-0.5 flex-shrink-0"
                />
                <a
                  href="tel:+2348133039718"
                  className="text-sm hover:text-primary transition-colors"
                >
                  +234 813 303 9718
                </a>
              </li>

              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-primary mt-0.5 shrink-0" />
                <span className="text-sm">
                  Port Harcourt, Rivers State, Nigeria
                </span>
              </li>
            </ul>

            {/* Trust line */}
            <p className="text-xs text-slate-600 mt-4">
              Adele Empowerment Foundation (AEF) is committed to equipping
              individuals with skills for sustainable livelihoods.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <span>
            © {new Date().getFullYear()} Adele Empowerment Foundation. All
            rights reserved.
          </span>

          <span>
            Built with purpose ♥ by{" "}
            <a
              href="https://ionidev.com"
              className="text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              iOnidev
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
