'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Heart, Star, ArrowRight } from 'lucide-react';
import { useCartStore, useWishlistStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import { products } from '@/lib/data';

export default function FeaturedProducts() {
  const addToCart = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } =
    useWishlistStore();

  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart({
      id: product.sku || product.slug,
      productId: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
      slug: product.slug,
    });
    openCart();
  };

  const toggleWishlist = (productId: string) => {
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  return (
    <section className="py-20 gradient-calm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex items-end justify-between mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              Featured
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-dark mt-2">
              Best Sellers
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden sm:flex items-center text-primary hover:text-primary-dark font-medium transition-colors"
          >
            View All <ArrowRight size={16} className="ml-1" />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard className="overflow-hidden group">
                {/* Image */}
                <div className="relative aspect-square bg-gradient-to-br from-dark/5 to-dark/10 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary/40 font-bold text-2xl">HM</span>
                    </div>
                  </div>

                  {/* Wishlist */}
                  <button
                    onClick={() => toggleWishlist(product.slug)}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center z-10 hover:bg-white transition-colors"
                  >
                    <Heart
                      size={16}
                      className={
                        isInWishlist(product.slug)
                          ? 'fill-red-500 text-red-500'
                          : 'text-dark/40'
                      }
                    />
                  </button>

                  {/* Sale badge */}
                  {product.comparePrice && (
                    <div className="absolute top-3 left-3 px-2 py-1 bg-primary text-white text-xs font-medium rounded-lg z-10">
                      Sale
                    </div>
                  )}

                  {/* Quick add overlay */}
                  <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/20 transition-all duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-xl text-sm font-medium text-dark flex items-center space-x-2 hover:bg-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300"
                    >
                      <ShoppingBag size={14} />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className="text-xs text-dark/40 uppercase tracking-wider mb-1">
                    {product.categorySlug.replace('-', ' ')}
                  </p>
                  <Link href={`/shop/${product.slug}`}>
                    <h3 className="font-semibold text-dark hover:text-primary transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-dark/50 text-sm mt-1 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center mt-2 space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-dark/20'}
                      />
                    ))}
                    <span className="text-xs text-dark/40 ml-1">(4.0)</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center space-x-2 mt-3">
                    <span className="text-lg font-bold text-primary">
                      {formatPrice(product.price)}
                    </span>
                    {product.comparePrice && (
                      <span className="text-sm text-dark/30 line-through">
                        {formatPrice(product.comparePrice)}
                      </span>
                    )}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/shop">
            <Button variant="outline" size="md">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
