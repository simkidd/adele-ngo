import AboutContent from "@/components/pages/about/AboutContent";
import PageHero from "@/components/shared/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Adele Empowerment Foundation",
  description:
    "Learn about the Adele Empowerment Foundation — our history, mission, values, team, and the communities we serve across Ghana.",
};

export default function AboutPage() {
  return (
    <main>
      <PageHero
        label="Our Story"
        title="A Foundation Built on"
        titleAccent="Purpose"
        subtitle="Since 2015, we've been transforming lives through education, skills, and community — one person at a time."
        image="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=1600&q=80"
        imageAlt="Adele Foundation team and community"
      />
      <AboutContent />
    </main>
  );
}
