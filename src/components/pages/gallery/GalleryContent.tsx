"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import Link from "next/link";

const categories = [
  "All",
  "Graduation",
  "Training",
  "Community",
  "Workshops",
  "Partners",
];

const photos = [
  {
    src: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=1200&q=85",
    thumb:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=600&q=75",
    alt: "Graduation ceremony 2023",
    caption: "Class of 2023 Graduation Ceremony",
    category: "Graduation",
    location: "Accra, Ghana",
  },
  {
    src: "https://images.unsplash.com/photo-1627556704290-2b1f5853ff78?w=1200&q=85",
    thumb:
      "https://images.unsplash.com/photo-1627556704290-2b1f5853ff78?w=600&q=75",
    alt: "Graduate receiving certificate",
    caption: "Certificate Presentation — Digital Literacy Cohort",
    category: "Graduation",
    location: "Madina, Accra",
  },
  {
    src: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1200&q=85",
    thumb:
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&q=75",
    alt: "Group of graduates celebrating",
    caption: "Entrepreneurship Program Graduates — Kumasi",
    category: "Graduation",
    location: "Kumasi",
  },
  {
    src: "https://images.unsplash.com/photo-1544531585-9847b68c8c86?w=1200&q=85",
    thumb:
      "https://images.unsplash.com/photo-1544531585-9847b68c8c86?w=600&q=75",
    alt: "Graduation ceremony crowd",
    caption: "Annual Graduation Day — 2022",
    category: "Graduation",
    location: "Accra",
  },
  {
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=85",
    thumb:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=75",
    alt: "Digital literacy classroom session",
    caption: "Digital Literacy — Hands-On Lab Session",
    category: "Training",
    location: "Accra Training Centre",
  },
  {
    src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=85",
    thumb:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=75",
    alt: "Students in training class",
    caption: "Entrepreneurship Masterclass in Session",
    category: "Training",
    location: "Kumasi Office",
  },
  {
    src: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=1200&q=85",
    thumb:
      "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&q=75",
    alt: "Culinary arts training",
    caption: "Culinary Arts — Professional Kitchen Training",
    category: "Training",
    location: "Takoradi",
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85",
    thumb:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75",
    alt: "Tailoring training session",
    caption: "Tailoring & Textiles — Pattern Making Workshop",
    category: "Training",
    location: "Suame, Kumasi",
  },
  {
    src: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1200&q=85",
    thumb:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&q=75",
    alt: "Carpentry workshop",
    caption: "Carpentry & Woodwork — Joinery Techniques",
    category: "Training",
    location: "Tema Workshop",
  },
  {
    src: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=1200&q=85",
    thumb:
      "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=600&q=75",
    alt: "Community outreach event",
    caption: "Community Outreach — Nima, Accra",
    category: "Community",
    location: "Nima, Accra",
  },
  {
    src: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&q=85",
    thumb:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=75",
    alt: "Community gathering",
    caption: "Town Hall — Volta Region Community Forum",
    category: "Community",
    location: "Ho, Volta Region",
  },
  {
    src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=85",
    thumb:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=75",
    alt: "Community support program",
    caption: "Food Security & Community Support Initiative",
    category: "Community",
    location: "Northern Region",
  },
  {
    src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=85",
    thumb:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=75",
    alt: "Business workshop",
    caption: "Business Planning Workshop — Cohort 14",
    category: "Workshops",
    location: "Accra",
  },
  {
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=85",
    thumb:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=75",
    alt: "Collaborative workshop session",
    caption: "Women in Tech — Annual Workshop",
    category: "Workshops",
    location: "Accra",
  },
  {
    src: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200&q=85",
    thumb:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&q=75",
    alt: "Pitch competition",
    caption: "Startup Pitch Competition — Adele Demo Day",
    category: "Workshops",
    location: "Kumasi",
  },
  {
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=85",
    thumb:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=75",
    alt: "Partnership signing ceremony",
    caption: "MOU Signing — Golden Tulip Hotels Partnership",
    category: "Partners",
    location: "Accra",
  },
  {
    src: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1200&q=85",
    thumb:
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&q=75",
    alt: "Employer job fair",
    caption: "Graduate Employment Fair — 80+ Employers",
    category: "Partners",
    location: "Accra International Conference Centre",
  },
];

type Photo = (typeof photos)[number];

const getPhotoSpanClass = (index: number, total: number) => {
  if (total <= 2) return "";

  if (index % 11 === 0) return "md:row-span-2";
  if (index % 7 === 0) return "md:col-span-2";
  if (index % 13 === 0) return "lg:col-span-2 lg:row-span-2";

  return "";
};

export default function GalleryContent() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const thumbnailStripRef = useRef<HTMLDivElement | null>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const filtered: Photo[] =
    activeCategory === "All"
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filtered.length);
  }, [lightboxIndex, filtered.length]);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
  }, [lightboxIndex, filtered.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const activeThumb = thumbnailRefs.current[lightboxIndex];
    if (!activeThumb) return;

    activeThumb.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [lightboxIndex]);

  useEffect(() => {
    thumbnailRefs.current = [];
  }, [activeCategory]);

  const currentPhoto = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <div>
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-12 text-center">
            {[
              { value: "500+", label: "Photos & Videos" },
              { value: "45+", label: "Communities Documented" },
              { value: "10", label: "Years of Memories" },
              { value: "12K+", label: "Lives Captured" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="font-heading text-3xl font-black text-primary">
                  {s.value}
                </div>
                <div className="text-sm text-slate-500 mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-3 mb-12 items-center"
          >
            <Filter size={16} className="text-slate-400 shrink-0" />
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`text-sm font-semibold px-5 py-2 rounded-full transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-md shadow-primary/25"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-primary/30 hover:text-primary"
                }`}
              >
                {cat}
              </motion.button>
            ))}
            <span className="ml-auto text-sm text-slate-400">
              {filtered.length} photos
            </span>
          </motion.div>

          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[220px] gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((photo, i) => (
                <motion.div
                  key={photo.src + photo.caption}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  onClick={() => openLightbox(i)}
                  className={`relative overflow-hidden rounded-2xl cursor-pointer group bg-slate-200 ${getPhotoSpanClass(
                    i,
                    filtered.length,
                  )}`}
                >
                  <Image
                    src={photo.thumb}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-110"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                    <ZoomIn size={14} className="text-white" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="text-white text-sm font-semibold leading-tight line-clamp-2">
                      {photo.caption}
                    </div>
                    <div className="text-white/60 text-xs mt-1 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full inline-block" />
                      {photo.location}
                    </div>
                  </div>

                  <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs font-semibold bg-primary text-white px-2.5 py-1 rounded-full">
                      {photo.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && currentPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] h-dvh bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors"
              aria-label="Close lightbox"
            >
              <X size={20} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-4 md:left-8 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors"
              aria-label="Previous photo"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-4 md:right-8 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors"
              aria-label="Next photo"
            >
              <ChevronRight size={22} />
            </button>

            <div
              className="relative w-full max-w-5xl mx-6 md:mx-20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-2xl overflow-hidden aspect-video">
                <Image
                  src={currentPhoto.src}
                  alt={currentPhoto.alt}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <div
                className="mt-4 flex items-start justify-between gap-4 px-1"
              >
                <div>
                  <p className="text-white font-semibold text-base">
                    {currentPhoto.caption}
                  </p>
                  <p className="text-slate-400 text-sm flex items-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full" />
                    {currentPhoto.location} · {currentPhoto.category}
                  </p>
                </div>
                <div className="text-slate-500 text-sm flex-shrink-0">
                  {lightboxIndex + 1} / {filtered.length}
                </div>
              </div>

              <div
                ref={thumbnailStripRef}
                className="py-2 flex gap-2 overflow-x-auto px-1"
                style={{ scrollbarWidth: "none" }}
              >
                {filtered.map((p, i) => (
                  <button
                    key={p.src + i}
                    ref={(el) => {
                      thumbnailRefs.current[i] = el;
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxIndex(i);
                    }}
                    className={`shrink-0 relative w-14 h-10 rounded-lg overflow-hidden transition-all ${
                      i === lightboxIndex
                        ? "ring-2 ring-primary opacity-100 scale-105"
                        : "opacity-40 hover:opacity-70"
                    }`}
                  >
                    <Image
                      src={p.thumb}
                      alt={p.alt}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-primary/10-100 text-primary/90 text-sm font-semibold px-4 py-2 rounded-full mb-6"
          >
            📷 Are you a graduate or partner?
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl font-black text-slate-900 mb-4"
          >
            Share Your Adele Moment
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 leading-relaxed mb-8"
          >
            Tag us on social media with{" "}
            <span className="font-semibold text-primary">
              #AdeleEmpowers
            </span>{" "}
            or send your photos directly to our team. The best community shots
            get featured here each month.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-8 py-3.5 rounded-full transition-all hover:scale-105"
            >
              Submit Photos
            </Link>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-slate-200 hover:border-primary/40 text-slate-700 font-bold px-8 py-3.5 rounded-full transition-all hover:text-primary"
            >
              Follow on Instagram
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
