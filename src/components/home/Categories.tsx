'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

const categories = [
  {
    name: 'Healing Ointments',
    slug: 'healing-ointments',
    description: 'Premium CannaSalve products for natural pain relief and skin restoration.',
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="24" cy="24" r="18" className="text-primary/30" />
        <path d="M24 10c-4 6-10 10-10 16a10 10 0 0020 0c0-6-6-10-10-16z" className="text-primary" strokeLinejoin="round" />
        <path d="M24 20v10M20 26h8" className="text-primary" strokeLinecap="round" />
      </svg>
    ),
    gradient: 'from-primary/20 to-primary/5',
  },
  {
    name: 'Apparel',
    slug: 'apparel',
    description: 'Premium clothing that represents the Highly Medicated lifestyle.',
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="24" cy="24" r="18" className="text-secondary/30" />
        <path d="M16 14l-6 6 4 2v14h20V22l4-2-6-6c-2 2-4 3-8 3s-6-1-8-3z" className="text-secondary" strokeLinejoin="round" />
      </svg>
    ),
    gradient: 'from-secondary/20 to-secondary/5',
  },
  {
    name: 'Merchandise',
    slug: 'merchandise',
    description: 'Exclusive accessories and collectibles for the conscious community.',
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="24" cy="24" r="18" className="text-accent/30" />
        <path d="M16 16h16v4l-2 2v10H18V22l-2-2V16z" className="text-accent" strokeLinejoin="round" />
        <path d="M20 16v-2a4 4 0 018 0v2" className="text-accent" />
      </svg>
    ),
    gradient: 'from-accent/20 to-accent/5',
  },
];

export default function Categories() {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary text-sm font-medium uppercase tracking-wider">
            Browse By Category
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-dark mt-2">
            Explore Our Collections
          </h2>
          <p className="text-dark/50 mt-4 max-w-md mx-auto">
            From healing ointments to lifestyle apparel, find what resonates with your journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Link href={`/shop?category=${category.slug}`}>
                <GlassCard className="p-8 h-full group">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-dark/50 text-sm leading-relaxed mb-4">
                    {category.description}
                  </p>
                  <span className="inline-flex items-center text-sm text-primary font-medium group-hover:gap-2 transition-all">
                    Browse Collection <ArrowRight size={16} className="ml-1" />
                  </span>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
