'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCookieConsentStore } from '@/lib/store';
import { Cookie, X } from 'lucide-react';
import Link from 'next/link';

export default function CookieConsent() {
  const { hasConsented, setConsent } = useCookieConsentStore();

  if (hasConsented !== null) return null;

  return (
    <AnimatePresence>
      {hasConsented === null && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-[90] p-4"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ delay: 1, duration: 0.5, ease: 'easeOut' }}
        >
          <div className="max-w-4xl mx-auto glass-dark rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Cookie size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="text-cream font-semibold text-sm mb-1">
                  We value your privacy
                </h4>
                <p className="text-cream/50 text-xs leading-relaxed">
                  We use cookies to enhance your browsing experience, personalise content, 
                  and analyse our traffic. By clicking &quot;Accept All&quot;, you consent to our use 
                  of cookies. Read our{' '}
                  <Link href="/cookies" className="text-primary hover:underline">
                    Cookie Policy
                  </Link>{' '}
                  for more information.
                </p>
              </div>
              <button
                onClick={() => setConsent(false)}
                className="text-cream/30 hover:text-cream/60 transition-colors flex-shrink-0"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex items-center justify-end gap-3 mt-4">
              <button
                onClick={() => setConsent(false)}
                className="px-4 py-2 text-xs text-cream/50 hover:text-cream transition-colors rounded-lg hover:bg-white/5"
              >
                Reject All
              </button>
              <button
                onClick={() => setConsent(true)}
                className="px-5 py-2 text-xs bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors font-medium"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
