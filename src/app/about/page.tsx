'use client';

import { motion } from 'framer-motion';
import { Leaf, Heart, Shield, Users, MapPin, Award } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import Newsletter from '@/components/home/Newsletter';

const values = [
  {
    icon: Leaf,
    title: '100% Natural',
    description: 'We source only the finest natural ingredients, ensuring purity in every product.',
  },
  {
    icon: Heart,
    title: 'Crafted with Love',
    description: 'Each product is handmade in small batches with intention, love, and healing energy.',
  },
  {
    icon: Shield,
    title: 'Quality Assured',
    description: 'Rigorous quality control and testing ensures safety and consistency in every batch.',
  },
  {
    icon: Users,
    title: 'Community First',
    description: 'We are building a community of conscious individuals who believe in natural wellness.',
  },
  {
    icon: MapPin,
    title: 'Proudly Cape Town',
    description: 'Rooted in the Mother City, inspired by the rich botanical heritage of the Western Cape.',
  },
  {
    icon: Award,
    title: 'Trusted Brand',
    description: 'Hundreds of satisfied customers trust Highly Medicated for their wellness journey.',
  },
];

const timeline = [
  { year: '2024', title: 'The Beginning', description: 'Highly Medicated was born from a passion for natural healing and cannabis wellness.' },
  { year: '2024', title: 'CannaSalve Launch', description: 'Our signature CannaSalve Original made its debut, receiving overwhelming positive feedback.' },
  { year: '2025', title: 'Growing Community', description: 'Expanded our product line and built a loyal community of wellness enthusiasts.' },
  { year: '2026', title: 'The Future', description: 'Continuing to innovate and bring premium healing products to South Africa and beyond.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-0">
      {/* Hero */}
      <div className="gradient-hero py-20 relative overflow-hidden">
        <div className="absolute inset-0 leaf-pattern opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            className="text-primary-light text-sm font-medium uppercase tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Our Story
          </motion.span>
          <motion.h1
            className="text-4xl sm:text-5xl font-bold text-cream mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Healing Through Nature
          </motion.h1>
          <motion.p
            className="text-cream/60 mt-6 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Highly Medicated was born from a deep belief that nature provides everything 
            we need to heal. From the heart of Cape Town, we craft premium cannabis-infused 
            products that honour traditional wisdom while embracing modern science.
          </motion.p>
        </div>
      </div>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden glass-card">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/10 flex items-center justify-center">
                  <div className="glass-card rounded-3xl p-8 text-center">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center mb-4">
                      <span className="text-3xl font-bold text-white">HM</span>
                    </div>
                    <p className="text-dark/60 text-sm italic">&ldquo;Healing the natural way&rdquo;</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary text-sm font-medium uppercase tracking-wider">Our Mission</span>
              <h2 className="text-3xl font-bold text-dark mt-2 mb-6">
                Bringing Balance Through{' '}
                <span className="text-gradient">Natural Wellness</span>
              </h2>
              <div className="space-y-4 text-dark/60 leading-relaxed">
                <p>
                  We believe that the healing power of cannabis has been known for millennia, 
                  and it is our mission to make high-quality cannabis wellness products accessible 
                  to everyone in South Africa.
                </p>
                <p>
                  Our approach combines the wisdom of traditional plant medicine with modern 
                  scientific formulation. Every product we create is designed to work in harmony 
                  with your body, supporting its natural ability to heal and find balance.
                </p>
                <p>
                  From the sourcing of our raw materials to the final product in your hands, 
                  we maintain the highest standards of quality, purity, and sustainability. 
                  Because when it comes to your health, nothing less will do.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 gradient-calm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary text-sm font-medium uppercase tracking-wider">What We Stand For</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-dark mt-2">Our Values</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-6 h-full" hover={false}>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon size={24} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-dark mb-2">{value.title}</h3>
                  <p className="text-dark/50 text-sm leading-relaxed">{value.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary text-sm font-medium uppercase tracking-wider">Our Journey</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-dark mt-2">The Journey So Far</h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-primary/20" />
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex gap-8"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 border-4 border-cream flex items-center justify-center flex-shrink-0 relative z-10">
                    <span className="text-primary font-bold text-xs">{item.year}</span>
                  </div>
                  <div className="pt-3">
                    <h3 className="font-bold text-dark text-lg">{item.title}</h3>
                    <p className="text-dark/50 text-sm mt-1">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
