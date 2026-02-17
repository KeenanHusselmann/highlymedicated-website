'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitted(true);
    setLoading(false);
  };

  const contactInfo = [
    { icon: MapPin, label: 'Address', value: 'Cape Town, Western Cape, South Africa' },
    { icon: Phone, label: 'Phone', value: '+27 78 800 7147', href: 'tel:+27788007147' },
    { icon: Mail, label: 'Email', value: 'info@highlymedicated.co.za', href: 'mailto:info@highlymedicated.co.za' },
    { icon: Clock, label: 'Hours', value: 'Mon - Fri: 9:00 - 17:00' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero */}
      <div className="gradient-hero py-20 relative overflow-hidden">
        <div className="absolute inset-0 leaf-pattern opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            className="text-primary-light text-sm font-medium uppercase tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Get In Touch
          </motion.span>
          <motion.h1
            className="text-4xl sm:text-5xl font-bold text-cream mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Contact Us
          </motion.h1>
          <motion.p
            className="text-cream/60 mt-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Have questions about our products? Need help with an order? We&apos;d love to hear from you.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {contactInfo.map((item) => (
              <GlassCard key={item.label} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark text-sm">{item.label}</h3>
                    {item.href ? (
                      <a href={item.href} className="text-dark/60 text-sm hover:text-primary transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-dark/60 text-sm">{item.value}</p>
                    )}
                  </div>
                </div>
              </GlassCard>
            ))}

            <GlassCard className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={20} className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-dark text-sm">WhatsApp</h3>
                  <p className="text-dark/60 text-sm mb-2">Quick chat support</p>
                  <a
                    href="https://wa.me/27788007147"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <MessageCircle size={14} />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <GlassCard className="p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Send size={24} className="text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-dark mb-2">Message Sent</h3>
                  <p className="text-dark/50">
                    Thank you for reaching out! We typically respond within 24 hours.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-dark mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <Input
                        label="Full Name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                      <Input
                        label="Email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <Input
                      label="Subject"
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                    <div>
                      <label className="block text-sm font-medium text-dark/70 mb-2">Message</label>
                      <textarea
                        rows={6}
                        className="w-full rounded-xl border border-dark/10 bg-white/50 backdrop-blur-sm px-4 py-3 text-dark placeholder:text-dark/30 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                        placeholder="Tell us more..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      />
                    </div>
                    <Button type="submit" loading={loading}>
                      Send Message
                    </Button>
                  </form>
                </>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
