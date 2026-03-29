import ContactContent from "@/components/pages/contact/ContactContent";
import PageHero from "@/components/shared/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Adele Empowerment Foundation",
  description:
    "Get in touch with Adele Empowerment Foundation — for program applications, donations, partnerships, or general enquiries.",
};

export default function ContactPage() {
  return (
    <main>
      <PageHero
        label="Get In Touch"
        title="Let's Build Something"
        titleAccent="Together"
        subtitle="Whether you're applying for a program, exploring a partnership, or want to donate — we'd love to hear from you."
        image="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1600&q=80"
        imageAlt="People in conversation"
      />
      <ContactContent />
    </main>
  );
}
