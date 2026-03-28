import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check } from 'lucide-react';

const features = [
  'Practical, hands-on training programs',
  'Personalized mentorship and support',
  'Direct connections to employers',
  'Ongoing community engagement',
];

const AboutSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#F8F9FA]">
      <div className="w-full px-4 sm:px-6 lg:px-12">
        <div
          ref={containerRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
              <img
                src="/about_image.jpg"
                alt="Students learning"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#E85D04] rounded-2xl -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <span className="text-sm font-semibold text-[#E85D04] uppercase tracking-wider mb-4 block">
              Our Mission
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A2E] mb-6">
              Building Brighter Futures Together
            </h2>
            <p className="text-lg text-[#6C757D] mb-6 leading-relaxed">
              Since 2015, Adele Empowerment Foundation has been dedicated to transforming
              lives through education and skills development. We believe everyone deserves
              access to opportunities that help them thrive.
            </p>
            <p className="text-lg text-[#6C757D] mb-8 leading-relaxed">
              Our approach combines practical training with personalized support, ensuring
              that each individual has the tools they need to succeed in their chosen path.
            </p>

            {/* Features List */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.4 + index * 0.1,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-[#E85D04]/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-[#E85D04]" />
                  </div>
                  <span className="text-[#1A1A2E] font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
