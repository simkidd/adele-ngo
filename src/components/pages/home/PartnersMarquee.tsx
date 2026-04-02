"use client";

import { motion } from "framer-motion";

const partners = [
  { name: "Women Empowerment Network", category: "Community Partner" },
  { name: "Lagos State Ministry of Youth", category: "Government" },
  { name: "UN Women Nigeria", category: "Development Partner" },
  { name: "Access Bank Foundation", category: "Corporate Foundation" },
  { name: "LEAP Africa", category: "Youth Development" },
  { name: "FATE Foundation", category: "Entrepreneurship" },
  { name: "Tony Elumelu Foundation", category: "Empowerment" },
  { name: "UNICEF Nigeria", category: "International Partner" },
  { name: "National Youth Service Corps", category: "Youth Engagement" },
  { name: "Lagos State Employment Trust Fund", category: "Enterprise Support" },
  { name: "SMEDAN", category: "Small Business Support" },
  { name: "ActionAid Nigeria", category: "Nonprofit Partner" },
];

const doubled = [...partners, ...partners];

export default function PartnersMarquee() {
  return (
    <section className="overflow-hidden border-y border-border bg-background py-16">
      <div className="mx-auto mb-10 max-w-7xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground"
        >
          Working with partners to empower communities across Nigeria
        </motion.p>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        <div className="flex overflow-hidden">
          <div className="animate-marquee flex flex-shrink-0 items-stretch gap-6">
            {doubled.map((partner, i) => (
              <div
                key={i}
                className="group flex min-w-[220px] flex-shrink-0 cursor-default flex-col items-center justify-center gap-1.5 rounded-2xl border border-border bg-card px-7 py-4 transition-colors duration-200 hover:border-primary/20 hover:bg-secondary/10"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted transition-colors group-hover:bg-primary/10">
                  <span className="font-heading text-base font-black text-muted-foreground transition-colors group-hover:text-primary">
                    {partner.name.charAt(0)}
                  </span>
                </div>

                <span className="text-center text-sm font-semibold leading-tight text-card-foreground">
                  {partner.name}
                </span>

                <span className="text-xs text-muted-foreground">
                  {partner.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}