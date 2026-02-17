'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ShoppingBag,
  Heart,
  Star,
  Minus,
  Plus,
  ChevronRight,
  Truck,
  Shield,
  RotateCcw,
  Leaf,
} from 'lucide-react';
import { useCartStore, useWishlistStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';
import GlassCard from '@/components/ui/GlassCard';
import { products } from '@/lib/data';

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = products.find((p) => p.slug === slug);

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'reviews'>('description');

  const addToCart = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } =
    useWishlistStore();

  if (!product) {
    return (
      <div className="min-h-screen pt-32 text-center">
        <h1 className="text-2xl font-bold text-dark">Product not found</h1>
        <Link href="/shop" className="text-primary hover:underline mt-4 inline-block">
          Back to Shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.sku || product.slug,
        productId: product.slug,
        name: product.name,
        price: product.price,
        image: product.images[0],
        slug: product.slug,
      });
    }
    openCart();
  };

  const toggleWishlist = () => {
    if (isInWishlist(product.slug)) {
      removeFromWishlist(product.slug);
    } else {
      addToWishlist(product.slug);
    }
  };

  const relatedProducts = products
    .filter((p) => p.categorySlug === product.categorySlug && p.slug !== product.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center space-x-2 text-sm text-dark/40">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <ChevronRight size={14} />
          <Link
            href={`/shop?category=${product.categorySlug}`}
            className="hover:text-primary transition-colors"
          >
            {product.categorySlug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
          </Link>
          <ChevronRight size={14} />
          <span className="text-dark/60">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-dark/5 to-dark/10 overflow-hidden glass-card">
              <img
                src={product.images[0]}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Badges */}
              {product.comparePrice && (
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 bg-primary text-white text-sm font-medium rounded-lg">
                    {Math.round((1 - product.price / product.comparePrice) * 100)}% Off
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-primary text-sm font-medium uppercase tracking-wider">
              {product.categorySlug.replace(/-/g, ' ')}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-dark mt-2">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center space-x-2 mt-3">
              <div className="flex space-x-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-dark/20'}
                  />
                ))}
              </div>
              <span className="text-sm text-dark/40">4.0 (12 reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline space-x-3 mt-6">
              <span className="text-3xl font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              {product.comparePrice && (
                <span className="text-lg text-dark/30 line-through">
                  {formatPrice(product.comparePrice)}
                </span>
              )}
            </div>

            <p className="text-dark/60 mt-4 leading-relaxed">
              {product.description}
            </p>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4 mt-8">
              <div className="flex items-center border border-dark/10 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center hover:bg-dark/5 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 h-12 flex items-center justify-center font-medium border-x border-dark/10">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center hover:bg-dark/5 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>

              <Button
                onClick={handleAddToCart}
                variant="primary"
                size="lg"
                className="flex-1"
              >
                <ShoppingBag size={18} className="mr-2" />
                Add to Cart
              </Button>

              <button
                onClick={toggleWishlist}
                className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all ${
                  isInWishlist(product.slug)
                    ? 'border-red-200 bg-red-50 text-red-500'
                    : 'border-dark/10 text-dark/40 hover:border-primary hover:text-primary'
                }`}
              >
                <Heart
                  size={20}
                  className={isInWishlist(product.slug) ? 'fill-red-500' : ''}
                />
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3 mt-8">
              {[
                { icon: Truck, text: 'Free delivery over R500' },
                { icon: Shield, text: 'Quality guaranteed' },
                { icon: RotateCcw, text: '30-day returns' },
                { icon: Leaf, text: '100% Natural' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center space-x-2 text-sm text-dark/50">
                  <Icon size={16} className="text-primary flex-shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="mt-10 border-t border-dark/10 pt-8">
              <div className="flex space-x-1 border-b border-dark/10">
                {(['description', 'ingredients', 'reviews'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-3 text-sm font-medium transition-all border-b-2 -mb-px capitalize ${
                      activeTab === tab
                        ? 'border-primary text-primary'
                        : 'border-transparent text-dark/40 hover:text-dark/60'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="py-6">
                {activeTab === 'description' && (
                  <div className="text-dark/60 leading-relaxed text-sm space-y-4">
                    {product.longDescription?.split('\n\n').map((p, i) => (
                      <p key={i}>{p}</p>
                    )) || <p>{product.description}</p>}
                    {product.benefits && (
                      <div className="mt-4">
                        <h4 className="font-semibold text-dark mb-2">Benefits</h4>
                        <ul className="space-y-1">
                          {product.benefits.split(', ').map((b) => (
                            <li key={b} className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {product.usage && (
                      <div className="mt-4">
                        <h4 className="font-semibold text-dark mb-2">How to Use</h4>
                        <p>{product.usage}</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'ingredients' && (
                  <div className="text-dark/60 text-sm">
                    {product.ingredients ? (
                      <div className="space-y-2">
                        {product.ingredients.split(', ').map((ing) => (
                          <div key={ing} className="flex items-center space-x-2 py-2 border-b border-dark/5">
                            <Leaf size={14} className="text-primary" />
                            <span>{ing}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>Ingredient information coming soon.</p>
                    )}
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="text-center py-8">
                    <Star size={32} className="text-dark/10 mx-auto mb-3" />
                    <p className="text-dark/40">No reviews yet</p>
                    <p className="text-dark/30 text-sm mt-1">Be the first to review this product</p>
                    <Button variant="outline" size="sm" className="mt-4">
                      Write a Review
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-dark mb-8">You Might Also Like</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rp, i) => (
                <motion.div
                  key={rp.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={`/shop/${rp.slug}`}>
                    <GlassCard className="p-4 flex items-center space-x-4">
                      <div className="w-20 h-20 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary/30 font-bold">HM</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-dark text-sm">{rp.name}</h3>
                        <p className="text-primary font-bold mt-1">{formatPrice(rp.price)}</p>
                      </div>
                    </GlassCard>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
