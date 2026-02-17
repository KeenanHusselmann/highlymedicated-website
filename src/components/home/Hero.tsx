'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function Hero() {
  return (
    <section className="relative flex items-start overflow-hidden pt-20 pb-4">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero" />
      
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 -left-40 w-80 h-80 rounded-full bg-accent/10 blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-secondary/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Leaf pattern overlay */}
      <div className="absolute inset-0 leaf-pattern opacity-30" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-cream/70 text-sm">Premium Healing Products</span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-cream leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              Nature&apos;s Remedy,{' '}
              <span className="text-gradient">Crafted</span>{' '}
              with Care
            </motion.h1>

            <motion.p
              className="mt-6 text-lg text-cream/60 leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              Discover the healing power of cannabis with our premium salves and 
              wellness products. Handcrafted in Cape Town for those who seek 
              natural balance and restoration.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
            >
              <Link href="/shop">
                <Button variant="primary" size="lg">
                  Shop Now
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="border-cream/30 text-cream hover:bg-cream hover:text-dark">
                  Our Story
                </Button>
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              className="mt-12 flex items-center space-x-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {[
                { value: '100%', label: 'Natural' },
                { value: 'Hand', label: 'Crafted' },
                { value: 'SA', label: 'Made' },
              ].map((badge) => (
                <div key={badge.label} className="text-center">
                  <p className="text-primary font-bold text-xl">{badge.value}</p>
                  <p className="text-cream/40 text-xs uppercase tracking-wider">{badge.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            className="relative hidden lg:flex items-start justify-center overflow-visible"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
          >
            <div className="relative w-[800px] h-[600px] flex items-start justify-center">
              {/* Glowing orb background */}
              <div className="absolute top-[100px] left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-primary/20 to-accent/10 blur-2xl animate-pulse" />
              
              {/* Main visual circle */}
              <motion.div
                className="absolute top-[100px] left-1/2 -translate-x-1/2 w-[350px] h-[350px] rounded-full bg-gradient-to-br from-primary/30 to-secondary/20 backdrop-blur-sm border border-white/10 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute inset-0 rounded-full border border-dashed border-white/10 m-4" />
              </motion.div>

              {/* Center product mockup */}
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px]"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <img 
                  src="/assets/products/Lid_label.png" 
                  alt="Full Spectrum CannaSalve" 
                  className="w-full h-auto object-contain drop-shadow-2xl"
                />
              </motion.div>

              {/* Floating elements */}
              {[
                { top: '10%', left: '0%', size: 'w-12 h-12', delay: 0 },
                { top: '70%', left: '0%', size: 'w-10 h-10', delay: 1 },
                { top: '15%', right: '0%', size: 'w-8 h-8', delay: 2 },
                { top: '75%', right: '5%', size: 'w-14 h-14', delay: 0.5 },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className={`absolute ${item.size} rounded-full bg-white/5 backdrop-blur-sm border border-white/10`}
                  style={{ top: item.top, left: item.left, right: item.right }}
                  animate={{ y: [0, -15, 0] }}
                  transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    delay: item.delay,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-cream/20 flex justify-center pt-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-1 h-2 bg-cream/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
