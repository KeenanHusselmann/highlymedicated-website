'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappNumber = '27788007147';
  const defaultMessage = 'Hi Highly Medicated! I have a question about your products.';

  const handleWhatsApp = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-[80]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-16 right-0 w-80 glass-card rounded-2xl overflow-hidden bg-cream/95 backdrop-blur-xl mb-2"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="gradient-hero p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">HM</span>
                  </div>
                  <div>
                    <h4 className="text-cream font-semibold text-sm">Highly Medicated</h4>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      <span className="text-cream/60 text-xs">Online</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-cream/60 hover:text-cream transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="p-4 min-h-[200px] flex flex-col justify-between">
              <div>
                <div className="bg-primary/10 rounded-2xl rounded-tl-sm p-3 max-w-[85%]">
                  <p className="text-sm text-dark/80">
                    Welcome to Highly Medicated! How can we assist you today?
                  </p>
                  <span className="text-[10px] text-dark/30 mt-1 block">Just now</span>
                </div>

                <div className="mt-4 space-y-2">
                  {[
                    'Product enquiry',
                    'Order status',
                    'General question',
                  ].map((option) => (
                    <button
                      key={option}
                      onClick={handleWhatsApp}
                      className="block w-full text-left px-3 py-2 text-sm text-dark/70 border border-dark/10 rounded-xl hover:border-primary hover:text-primary transition-all duration-200"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleWhatsApp}
                className="mt-4 w-full flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#20BD5A] text-white py-3 rounded-xl transition-colors font-medium text-sm"
              >
                <Send size={16} />
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={isOpen ? { rotate: 0 } : { rotate: 0 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <MessageCircle size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
