import ProgramsContent from "@/components/pages/programs/ProgramsContent";
import PageHero from "@/components/shared/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Programs | Adele Empowerment Foundation",
  description:
    "Explore our comprehensive skills training programs — Digital Literacy, Entrepreneurship, Culinary Arts, Tailoring, and Carpentry — designed to create lasting opportunity.",
};

export default function ProgramsPage() {
  return (
    <main>
      <PageHero
        label="What We Offer"
        title="Programs Built for"
        titleAccent="Real Opportunity"
        subtitle="Every program is designed with one goal in mind: equipping individuals with the skills, confidence, and connections needed to thrive in today's economy."
        image="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&q=80"
        imageAlt="Training programs in action"
      />
      <ProgramsContent />
    </main>
  );
}
