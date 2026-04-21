import GalleryContent from "@/components/pages/gallery/GalleryContent";
import PageHero from "@/components/shared/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Adele Empowerment Foundation",
  description:
    "A visual journey through Adele's programs, graduations, community events, and the people transforming their lives across Nigeria.",
};

export default function GalleryPage() {
  return (
    <main>
      <PageHero
        label="Our Gallery"
        title="Moments That"
        titleAccent="Matter"
        subtitle="Every photograph is a story — of courage, hard work, and the joy of possibility unlocked. Browse our programs, graduations, and community events."
        image="https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1600&q=80"
        imageAlt="Adele Foundation graduation ceremony"
      />
      <GalleryContent />
    </main>
  );
}
