import PageHero from "@/components/shared/PageHero";
import StoriesContent from "@/components/pages/stories/StoriesContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Success Stories | Adele Empowerment Foundation",
  description:
    "Real stories of transformation — meet the graduates of the Adele Empowerment Foundation whose lives changed through skills, support, and opportunity.",
};

export default function StoriesPage() {
  return (
    <main>
      <PageHero
        label="Graduate Stories"
        title="Lives Changed,"
        titleAccent="Communities Transformed"
        subtitle="Behind every statistic is a human story. Here are the people at the heart of our work."
        image="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=1600&q=80"
        imageAlt="Graduates celebrating"
      />
      <StoriesContent />
    </main>
  );
}
