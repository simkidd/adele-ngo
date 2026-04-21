"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Logo from "./Logo";

const links = [
  { label: "Programs", href: "/programs" },
  { label: "About", href: "/about" },
  // { label: "Blog", href: "/blog" },
  // { label: "Events", href: "/events" },
  { label: "Stories", href: "/stories" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDark = isHome ? !scrolled : false;

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isDark ? "bg-transparent" : "bg-white/95 backdrop-blur-md shadow-sm"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2 p-4 rounded-b-3xl transition-all duration-300 w-fit mr-auto",
            isDark ? "bg-white/95 backdrop-blur-md shadow-sm" : "",
          )}
        >
          <Logo className="w-10 lg:w-14 h-10 lg:h-14" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors relative group",
                  isDark
                    ? "text-white/90 hover:text-white"
                    : "text-slate-700 hover:text-primary",
                  isActive ? "text-primary" : "",
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300",
                    isActive ? "w-full" : "w-0 group-hover:w-full",
                  )}
                />
              </Link>
            );
          })}
        </div>

        {/* Mobile toggle */}
        <button
          className={`cursor-pointer md:hidden ${!isDark ? "text-slate-800" : "text-white"}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`font-medium transition-colors ${
                    pathname === link.href
                      ? "text-primary"
                      : "text-slate-700 hover:text-primary"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
