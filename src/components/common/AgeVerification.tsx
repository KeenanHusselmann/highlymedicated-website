'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAgeVerificationStore } from '@/lib/store';
import Button from '@/components/ui/Button';
import { ShieldCheck } from 'lucide-react';

export default function AgeVerification() {
  const { isVerified, setVerified } = useAgeVerificationStore();

  if (isVerified) return null;

  return (
    <AnimatePresence>
      {!isVerified && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-dark/90 backdrop-blur-lg" />
          <motion.div
            className="relative w-full max-w-md glass-card rounded-3xl p-8 bg-cream/95 backdrop-blur-xl text-center"
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Logo */}
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
              <ShieldCheck size={32} className="text-white" />
            </div>

            <h2 className="text-2xl font-bold text-dark mb-2">
              Age Verification
            </h2>
            <p className="text-dark/60 text-sm mb-6 leading-relaxed">
              You must be 18 years or older to access Highly Medicated. 
              By entering this site, you confirm that you are of legal age 
              in South Africa to purchase cannabis-related products.
            </p>

            <div className="space-y-3">
              <Button
                onClick={() => setVerified(true)}
                variant="primary"
                size="lg"
                className="w-full"
              >
                I am 18 or Older
              </Button>
              <button
                onClick={() => window.location.href = 'https://www.google.com'}
                className="w-full py-3 text-sm text-dark/40 hover:text-dark/60 transition-colors"
              >
                I am Under 18
              </button>
            </div>

            <p className="mt-6 text-[11px] text-dark/30 leading-relaxed">
              By entering this website, you agree to our{' '}
              <a href="/terms" className="underline hover:text-primary">Terms & Conditions</a>{' '}
              and{' '}
              <a href="/privacy" className="underline hover:text-primary">Privacy Policy</a>.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
