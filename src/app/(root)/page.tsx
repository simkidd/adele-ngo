import AboutSection from "@/components/home/AboutSection";
import CTASection from "@/components/home/CTASection";
import Gallery from "@/components/home/Gallery";
import Hero from "@/components/home/Hero";
import Programs from "@/components/home/Programs";
import StatsBanner from "@/components/home/StatsBanner";
import Testimonials from "@/components/home/Testimonials";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <StatsBanner />
      <Programs />
      <AboutSection />
      <Testimonials />
      <Gallery />
      <CTASection />
    </div>
  );
};

export default HomePage;
