'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
} from 'lucide-react';

const footerLinks = {
  shop: [
    { name: 'All Products', href: '/shop' },
    { name: 'Healing Ointments', href: '/shop?category=healing-ointments' },
    { name: 'Apparel', href: '/shop?category=apparel' },
    { name: 'Merchandise', href: '/shop?category=merchandise' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20">
      {/* Top wave decoration */}
      <div className="absolute top-0 left-0 right-0 h-20 overflow-hidden -translate-y-full">
        <svg
          viewBox="0 0 1440 120"
          className="absolute bottom-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 C360,120 1080,0 1440,60 L1440,120 L0,120 Z"
            fill="#2b2625"
          />
        </svg>
      </div>

      <div className="bg-dark text-cream/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                  <span className="text-white font-bold text-lg">HM</span>
                </div>
                <div>
                  <h3 className="text-cream font-bold text-lg">Highly Medicated</h3>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-cream/40">Natural Healing</p>
                </div>
              </div>
              <p className="text-cream/50 text-sm leading-relaxed mb-6">
                Premium cannabis-infused healing products crafted with care in Cape Town, South Africa. 
                We believe in the power of nature to heal, restore, and bring balance.
              </p>
              <div className="flex space-x-3">
                {[
                  { icon: Instagram, href: '#', label: 'Instagram' },
                  { icon: Facebook, href: '#', label: 'Facebook' },
                  { icon: Twitter, href: '#', label: 'Twitter' },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-cream/50 hover:text-primary hover:bg-white/10 transition-all duration-300"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Shop Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-cream font-semibold mb-4">Shop</h4>
              <ul className="space-y-2">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream/50 hover:text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-cream font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream/50 hover:text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <h4 className="text-cream font-semibold mb-4 mt-6">Legal</h4>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream/50 hover:text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-cream font-semibold mb-4">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <MapPin size={16} className="text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-cream/50">
                    Mikpunt, Cape Town,<br />
                    Western Cape, South Africa
                  </span>
                </li>
                <li>
                  <a
                    href="tel:+27788007147"
                    className="flex items-center space-x-3 text-sm text-cream/50 hover:text-primary transition-colors"
                  >
                    <Phone size={16} className="text-primary flex-shrink-0" />
                    <span>+27 78 800 7147</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@highlymedicated.co.za"
                    className="flex items-center space-x-3 text-sm text-cream/50 hover:text-primary transition-colors"
                  >
                    <Mail size={16} className="text-primary flex-shrink-0" />
                    <span>info@highlymedicated.co.za</span>
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-cream/30 text-sm">
                {currentYear} Highly Medicated. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 text-cream/30 text-xs">
                <span>EFT</span>
                <span className="w-px h-3 bg-white/20" />
                <span>Cash on Delivery</span>
                <span className="w-px h-3 bg-white/20" />
                <span>Yoco</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
