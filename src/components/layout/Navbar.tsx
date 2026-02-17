'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Heart,
  User,
  Search,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';
import { useCartStore, useWishlistStore } from '@/lib/store';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', href: '/' },
  {
    name: 'Shop',
    href: '/shop',
    children: [
      { name: 'All Products', href: '/shop' },
      { name: 'Healing Ointments', href: '/shop?category=healing-ointments' },
      { name: 'Apparel', href: '/shop?category=apparel' },
      { name: 'Merchandise', href: '/shop?category=merchandise' },
    ],
  },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopDropdown, setShopDropdown] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cartItemCount = useCartStore((s) => s.getItemCount());
  const openCart = useCartStore((s) => s.openCart);
  const wishlistItems = useWishlistStore((s) => s.items);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 glass-dark py-2 shadow-lg transition-all duration-500"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <motion.div
                className="relative h-12 w-12"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <img 
                  src="/assets/logos/logo1_color.png" 
                  alt="Highly Medicated Logo" 
                  className="h-full w-full object-contain rounded-lg"
                />
              </motion.div>
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight transition-colors text-cream">
                  Highly Medicated
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase -mt-1 transition-colors text-cream/60">
                  Natural Healing
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.children && setShopDropdown(true)}
                  onMouseLeave={() => item.children && setShopDropdown(false)}
                >
                  {item.children ? (
                    <button
                      className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center text-cream/80 hover:text-cream hover:bg-white/10"
                    >
                      {item.name}
                      <ChevronDown
                        size={14}
                        className={cn(
                          'ml-1 transition-transform',
                          shopDropdown && 'rotate-180'
                        )}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center text-cream/80 hover:text-cream hover:bg-white/10"
                    >
                      {item.name}
                    </Link>
                  )}

                  {/* Dropdown */}
                  {item.children && (
                    <AnimatePresence>
                      {shopDropdown && (
                        <motion.div
                          className="absolute top-full left-0 mt-1 w-56 rounded-xl overflow-hidden backdrop-blur-xl bg-white/80 border border-primary/40 shadow-xl"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          onMouseEnter={() => setShopDropdown(true)}
                          onMouseLeave={() => setShopDropdown(false)}
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              onClick={() => setShopDropdown(false)}
                              className="block px-4 py-3 text-sm text-dark hover:text-primary hover:bg-primary/10 transition-colors font-medium backdrop-blur-sm"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              {/* Search */}
              <motion.button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-lg transition-all text-cream/80 hover:text-cream hover:bg-white/10"
                whileTap={{ scale: 0.9 }}
              >
                <Search size={20} />
              </motion.button>

              {/* Wishlist */}
              <Link href="/account/wishlist">
                <motion.div
                  className="relative p-2 rounded-lg transition-all text-cream/80 hover:text-cream hover:bg-white/10"
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart size={20} />
                  {wishlistItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {wishlistItems.length}
                    </span>
                  )}
                </motion.div>
              </Link>

              {/* Cart */}
              <motion.button
                onClick={openCart}
                className="relative p-2 rounded-lg transition-all text-cream/80 hover:text-cream hover:bg-white/10"
                whileTap={{ scale: 0.9 }}
              >
                <ShoppingBag size={20} />
                {cartItemCount > 0 && (
                  <motion.span
                    className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  >
                    {cartItemCount}
                  </motion.span>
                )}
              </motion.button>

              {/* Account */}
              <Link href="/account">
                <motion.div
                  className="p-2 rounded-lg transition-all hidden sm:block text-cream/80 hover:text-cream hover:bg-white/10"
                  whileTap={{ scale: 0.9 }}
                >
                  <User size={20} />
                </motion.div>
              </Link>

              {/* Mobile Menu Toggle */}
              <motion.button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg transition-all text-cream/80 hover:text-cream"
                whileTap={{ scale: 0.9 }}
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              className="absolute top-full left-0 right-0 p-4 glass-dark"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="max-w-2xl mx-auto relative">
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/50"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, blog posts..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-cream placeholder:text-cream/40 focus:outline-none focus:ring-2 focus:ring-primary/50 backdrop-blur-sm"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
                      setSearchOpen(false);
                    }
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 overlay-blur" onClick={() => setMobileOpen(false)} />
            <motion.div
              className="absolute top-0 right-0 w-80 h-full bg-dark/95 backdrop-blur-xl p-6 pt-24"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <nav className="flex flex-col space-y-1">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 text-cream/80 hover:text-cream hover:bg-white/10 rounded-lg transition-colors text-lg"
                    >
                      {item.name}
                    </Link>
                    {item.children && (
                      <div className="ml-4 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="block px-4 py-2 text-cream/50 hover:text-cream hover:bg-white/5 rounded-lg transition-colors text-sm"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navigation.length * 0.1 }}
                >
                  <Link
                    href="/account"
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-cream/80 hover:text-cream hover:bg-white/10 rounded-lg transition-colors text-lg"
                  >
                    My Account
                  </Link>
                </motion.div>
              </nav>

              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-cream/40 text-xs">
                  Highly Medicated
                </p>
                <p className="text-cream/30 text-xs mt-1">
                  Natural Healing Products
                </p>
                <p className="text-cream/30 text-xs mt-1">
                  Cape Town, South Africa
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
