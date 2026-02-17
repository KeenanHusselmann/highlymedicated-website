'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 leaf-pattern opacity-20" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary-light text-sm font-medium uppercase tracking-wider">
            Stay Connected
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-cream mt-2">
            Join the Highly Medicated Community
          </h2>
          <p className="text-cream/50 mt-4 max-w-md mx-auto">
            Be the first to know about new products, exclusive offers, and wellness tips 
            delivered straight to your inbox.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 max-w-md mx-auto"
          >
            <div className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-cream placeholder:text-cream/30 focus:outline-none focus:ring-2 focus:ring-primary/50 backdrop-blur-sm transition-all"
                required
              />
              <motion.button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="px-6 py-3.5 btn-glossy rounded-xl text-white font-medium flex items-center space-x-2 disabled:opacity-50"
                whileTap={{ scale: 0.97 }}
              >
                {status === 'success' ? (
                  <CheckCircle size={20} />
                ) : (
                  <Send size={18} />
                )}
                <span className="hidden sm:inline">
                  {status === 'success' ? 'Subscribed' : 'Subscribe'}
                </span>
              </motion.button>
            </div>
            {status === 'error' && (
              <p className="text-red-400 text-sm mt-2">
                Something went wrong. Please try again.
              </p>
            )}
            {status === 'success' && (
              <p className="text-primary-light text-sm mt-2">
                Welcome to the community! Check your inbox soon.
              </p>
            )}
          </form>

          <p className="text-cream/20 text-xs mt-4">
            No spam, ever. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
