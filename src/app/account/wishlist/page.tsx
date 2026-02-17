'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Package, Heart, Settings, LogOut, ChevronRight, Trash2, ShoppingCart, HeartOff } from 'lucide-react';
import { products } from '@/lib/data';
import { useWishlistStore, useCartStore, useAuthStore } from '@/lib/store';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';

const sidebarLinks = [
  { href: '/account', icon: User, label: 'Profile' },
  { href: '/account/orders', icon: Package, label: 'Orders' },
  { href: '/account/wishlist', icon: Heart, label: 'Wishlist', active: true },
  { href: '/account/settings', icon: Settings, label: 'Settings' },
];

export default function WishlistPage() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuthStore();
  const { items: wishlistIds, toggleItem } = useWishlistStore();
  const { addItem } = useCartStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, router]);

  if (isLoading || !isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  // For now, we're using the slug as the wishlist ID since the in-memory products don't have IDs
  const wishlistProducts = products.filter(p => wishlistIds.includes(p.slug));

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-dark mb-8">My Account</h1>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <GlassCard className="p-4">
              <nav className="space-y-1">
                {sidebarLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                      link.active
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-dark/60 hover:bg-dark/5 hover:text-dark'
                    }`}
                  >
                    <link.icon size={16} />
                    {link.label}
                    <ChevronRight size={14} className="ml-auto" />
                  </Link>
                ))}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-all w-full"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </nav>
            </GlassCard>
          </motion.div>

          {/* Wishlist */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <GlassCard className="p-8">
              <h2 className="text-xl font-bold text-dark mb-6">
                My Wishlist ({wishlistProducts.length})
              </h2>

              {wishlistProducts.length === 0 ? (
                <div className="text-center py-12">
                  <HeartOff size={40} className="mx-auto text-dark/20 mb-4" />
                  <h3 className="text-lg font-semibold text-dark/60 mb-2">Your wishlist is empty</h3>
                  <p className="text-dark/40 text-sm mb-6">Save items you love for later!</p>
                  <Link href="/shop">
                    <Button variant="outline">Browse Products</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {wishlistProducts.map(product => (
                    <div
                      key={product.slug}
                      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-dark/10 rounded-2xl"
                    >
                      <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-bold text-sm">HM</span>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <Link href={`/shop/${product.slug}`} className="font-semibold text-dark hover:text-primary transition-colors">
                          {product.name}
                        </Link>
                        <p className="text-dark/40 text-sm mt-0.5">{product.categorySlug}</p>
                        <p className="text-dark font-bold mt-1">
                          {formatPrice(product.price)}
                          {product.comparePrice && (
                            <span className="text-dark/30 line-through text-sm ml-2">
                              {formatPrice(product.comparePrice)}
                            </span>
                          )}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          onClick={() => addItem({
                            id: product.sku || product.slug,
                            productId: product.slug,
                            name: product.name,
                            price: product.price,
                            image: product.images?.[0] || '/placeholder.jpg',
                            slug: product.slug,
                          })}
                        >
                          <ShoppingCart size={14} />
                          Add to Cart
                        </Button>
                        <button
                          onClick={() => toggleItem(product.slug)}
                          className="w-9 h-9 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
