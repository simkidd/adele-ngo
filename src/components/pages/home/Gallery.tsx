"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

const images = [
  {
    src: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800&q=80",
    alt: "Graduation ceremony",
    caption: "Celebrating program graduates ready for new opportunities",
    height: "h-64",
    rotation: -1.5,
  },
  {
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
    alt: "Digital skills training session",
    caption: "Participants gaining practical digital skills",
    height: "h-48",
    rotation: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800&q=80",
    alt: "Community engagement session",
    caption: "Engaging communities through empowerment initiatives",
    height: "h-72",
    rotation: -0.8,
  },
  {
    src: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80",
    alt: "Skills workshop",
    caption: "Hands-on learning experience during training sessions",
    height: "h-48",
    rotation: 1.2,
  },
  {
    src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
    alt: "Training session",
    caption: "Facilitators guiding participants through practical sessions",
    height: "h-56",
    rotation: -1,
  },
  {
    src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
    alt: "Mentorship session",
    caption: "Mentorship sessions focused on growth and direction",
    height: "h-44",
    rotation: 0.7,
  },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<null | (typeof images)[0]>(
    null,
  );

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary font-semibold text-sm tracking-widest uppercase mb-3"
          >
            Our Impact in Action
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl md:text-5xl font-black text-slate-900 mb-4"
          >
            Real Moments from Our Programs
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-500"
          >
           A glimpse into the lives we are impacting through training, mentorship, and community-driven initiatives.
          </motion.p>
        </div>

        {/* Masonry Grid */}
        <div className="masonry">
          {images.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, rotate: img.rotation }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`masonry-item relative ${img.height} overflow-hidden rounded-xl cursor-pointer group`}
              onClick={() => setSelectedImage(img)}
            >
              <Image
                src={img.src}
                alt="Digital skills training session in Nigeria"
                fill
                className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0 grayscale-0 md:grayscale group-hover:grayscale-0"
                loading="lazy"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                <ZoomIn size={24} className="text-white mb-2" />
                <span className="text-white text-sm font-medium">
                  {img.caption}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="relative max-w-4xl w-full max-h-[80vh] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[70vh]">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-6">
                <p className="text-white font-semibold text-lg">
                  {selectedImage.caption}
                </p>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Close lightbox"
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
