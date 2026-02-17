'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShoppingBag, Heart, Star } from 'lucide-react';
import { useCartStore, useWishlistStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import GlassCard from '@/components/ui/GlassCard';

interface ProductCardProps {
  product: {
    name: string;
    slug: string;
    description: string;
    price: number;
    comparePrice?: number;
    images: string[];
    categorySlug: string;
    sku?: string;
    featured?: boolean;
  };
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addToCart = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } =
    useWishlistStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(product.slug)) {
      removeFromWishlist(product.slug);
    } else {
      addToWishlist(product.slug);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <GlassCard className="overflow-hidden group">
        {/* Image */}
        <Link href={`/shop/${product.slug}`}>
          <div className="relative aspect-square bg-gradient-to-br from-dark/5 to-dark/10 overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Wishlist */}
            <button
              onClick={toggleWishlist}
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

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
              {product.comparePrice && (
                <span className="px-2 py-1 bg-primary text-white text-xs font-medium rounded-lg">
                  Sale
                </span>
              )}
              {product.featured && (
                <span className="px-2 py-1 bg-accent text-white text-xs font-medium rounded-lg">
                  Featured
                </span>
              )}
            </div>

            {/* Quick add */}
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-dark/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
              <button
                onClick={handleAddToCart}
                className="w-full py-2.5 bg-white/90 backdrop-blur-sm rounded-xl text-sm font-medium text-dark flex items-center justify-center space-x-2 hover:bg-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300"
              >
                <ShoppingBag size={14} />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </Link>

        {/* Info */}
        <div className="p-4">
          <p className="text-xs text-dark/40 uppercase tracking-wider mb-1">
            {product.categorySlug.replace(/-/g, ' ')}
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
  );
}
