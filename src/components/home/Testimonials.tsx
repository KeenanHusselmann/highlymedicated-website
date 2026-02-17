'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

const testimonials = [
  {
    name: 'Nomsa M.',
    location: 'Cape Town',
    rating: 5,
    text: 'The CannaSalve Original has been a game changer for my chronic back pain. I have tried many products, but nothing comes close to the relief this provides. Truly grateful.',
  },
  {
    name: 'James K.',
    location: 'Johannesburg',
    rating: 5,
    text: 'As an athlete, recovery is everything. The Extra Strength formula helps me bounce back faster after training. Natural, effective, and the quality is exceptional.',
  },
  {
    name: 'Lerato P.',
    location: 'Durban',
    rating: 4,
    text: 'I was skeptical at first, but after using CannaSalve for my arthritis, I am a believer. The natural ingredients make me feel good about what I am putting on my skin.',
  },
];

export default function Testimonials() {
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
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-dark mt-2">
            What Our Community Says
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <GlassCard className="p-6 h-full flex flex-col" hover={false}>
                <Quote size={24} className="text-primary/20 mb-4" />
                <p className="text-dark/70 text-sm leading-relaxed flex-1">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="mt-6 pt-4 border-t border-dark/5">
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i < testimonial.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-dark/15'
                        }
                      />
                    ))}
                  </div>
                  <p className="font-semibold text-dark text-sm">{testimonial.name}</p>
                  <p className="text-dark/40 text-xs">{testimonial.location}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
