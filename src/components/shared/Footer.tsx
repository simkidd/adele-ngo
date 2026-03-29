"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Programs", href: "/programs" },
  { label: "About Us", href: "/about" },
  { label: "Success Stories", href: "/stories" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const programs = [
  "Digital Literacy",
  "Entrepreneurship",
  "Culinary Arts",
  "Tailoring & Textiles",
  "Carpentry",
];

const socials = [
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaLinkedin, href: "#", label: "LinkedIn" },
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaFacebook, href: "#", label: "Facebook" },
];

export default function Footer() {
  return (
    <footer id="footer" className="bg-slate-950 text-slate-400">
      {/* Main footer content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto px-6 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Column 1 — Brand */}
          <div className="md:col-span-1">
            <h3 className="inline-block font-heading text-2xl font-black text-white mb-3">
              <span className="text-2xl font-bold text-white">
                Adele<span className="text-[#E85D04]">.</span>
              </span>
            </h3>

            <p className="text-sm leading-relaxed mb-6">
              Empowering communities through skills, support, and opportunity
              since 2015.
            </p>
            {/* Social icons */}
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
                    className="w-9 h-9 rounded-full bg-slate-800 hover:bg-orange-500 flex items-center justify-center transition-colors duration-200 group"
                  >
                    <Icon
                      size={16}
                      className="text-slate-400 group-hover:text-white"
                    />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-orange-400 transition-colors relative group"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-[0.5px] bg-orange-400 group-hover:w-full transition-all duration-300" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Programs */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-5">
              Programs
            </h4>
            <ul className="space-y-3">
              {programs.map((p) => (
                <li key={p}>
                  <Link
                    href="#programs"
                    className="text-sm hover:text-orange-400 transition-colors relative group"
                  >
                    <span className="relative">
                      {p}
                      <span className="absolute bottom-0 left-0 w-0 h-[0.5px] bg-orange-400 group-hover:w-full transition-all duration-300" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-5">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail
                  size={15}
                  className="text-orange-400 mt-0.5 flex-shrink-0"
                />
                <a
                  href="mailto:hello@adele.foundation.org"
                  className="text-sm hover:text-orange-400 transition-colors"
                >
                  hello@adelefoundation.org
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone
                  size={15}
                  className="text-orange-400 mt-0.5 flex-shrink-0"
                />
                <a
                  href="tel:+234215076750"
                  className="text-sm hover:text-orange-400 transition-colors"
                >
                  +234 215 076 750
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-orange-400 mt-0.5 shrink-0" />
                <span className="text-sm">Port Harcourt, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <span>
            &copy; {new Date().getFullYear()} Adele Empowerment Foundation. All
            rights reserved.
          </span>

          <span>
            Built with purpose &hearts;{" "}
            <a
              href="https://ionidev.com"
              className="text-orange-400"
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
