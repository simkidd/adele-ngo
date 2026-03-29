import AboutSection from "@/components/pages/home/AboutSection";
import CTASection from "@/components/pages/home/CTASection";
import Gallery from "@/components/pages/home/Gallery";
import Hero from "@/components/pages/home/Hero";
import Programs from "@/components/pages/home/Programs";
import StatsBanner from "@/components/pages/home/StatsBanner";
import Testimonials from "@/components/pages/home/Testimonials";

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
