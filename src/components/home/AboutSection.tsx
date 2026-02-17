'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Leaf, Shield, Heart } from 'lucide-react';
import Button from '@/components/ui/Button';

const values = [
  {
    icon: Leaf,
    title: '100% Natural',
    description: 'Every product is crafted from natural, ethically sourced ingredients.',
  },
  {
    icon: Shield,
    title: 'Lab Tested',
    description: 'Quality assured through rigorous testing and quality control processes.',
  },
  {
    icon: Heart,
    title: 'Made with Love',
    description: 'Handcrafted in small batches in Cape Town with intention and care.',
  },
];

export default function AboutSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="glass-card rounded-3xl p-8 max-w-[280px] text-center">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center mb-4">
                    <span className="text-3xl font-bold text-white">HM</span>
                  </div>
                  <h3 className="text-xl font-bold text-dark">Crafted in</h3>
                  <p className="text-primary font-semibold">Cape Town</p>
                  <p className="text-dark/40 text-sm mt-2">Since 2024</p>
                </div>
              </div>
            </div>

            {/* Floating stat cards */}
            <motion.div
              className="absolute -top-4 -right-4 glass-card rounded-2xl p-4 text-center"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <p className="text-2xl font-bold text-primary">500+</p>
              <p className="text-xs text-dark/50">Happy Customers</p>
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -left-4 glass-card rounded-2xl p-4 text-center"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <p className="text-2xl font-bold text-secondary">100%</p>
              <p className="text-xs text-dark/50">Natural Ingredients</p>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              Our Story
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-dark mt-2 leading-tight">
              Healing Through{' '}
              <span className="text-gradient">Nature&apos;s Wisdom</span>
            </h2>
            <p className="text-dark/60 mt-6 leading-relaxed">
              Born in the heart of Cape Town, Highly Medicated was founded on a simple 
              belief: nature provides everything we need to heal. Our journey began with 
              a passion for cannabis wellness and a commitment to creating products 
              that truly make a difference.
            </p>
            <p className="text-dark/60 mt-4 leading-relaxed">
              Every CannaSalve jar is handcrafted with love, using only the finest 
              natural ingredients. We honour traditional healing wisdom while embracing 
              modern science to bring you products that work in harmony with your body.
            </p>

            {/* Values */}
            <div className="mt-8 space-y-4">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.15 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <value.icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark">{value.title}</h4>
                    <p className="text-dark/50 text-sm">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8">
              <Link href="/about">
                <Button variant="primary">Learn More About Us</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
