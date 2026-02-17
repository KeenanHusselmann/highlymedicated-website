'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';
import GlassCard from '@/components/ui/GlassCard';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();

  const subtotal = getTotal();
  const shipping = subtotal >= 500 ? 0 : 75;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.h1
          className="text-3xl font-bold text-dark mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Shopping Cart
        </motion.h1>

        {items.length === 0 ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <ShoppingBag size={64} className="text-dark/10 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-dark/50 mb-2">Your cart is empty</h2>
            <p className="text-dark/30 mb-6">Start shopping to add items to your cart</p>
            <Link href="/shop">
              <Button variant="primary">Continue Shopping</Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={item.productId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlassCard className="p-4 sm:p-6" hover={false}>
                    <div className="flex gap-4">
                      <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl bg-dark/5 overflow-hidden flex-shrink-0 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-primary/20 font-bold text-xl">HM</span>
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <Link
                              href={`/shop/${item.slug}`}
                              className="font-semibold text-dark hover:text-primary transition-colors"
                            >
                              {item.name}
                            </Link>
                            <p className="text-primary font-bold mt-1">
                              {formatPrice(item.price)}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.productId)}
                            className="p-2 text-dark/30 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="w-8 h-8 rounded-lg border border-dark/10 flex items-center justify-center hover:bg-primary/10 transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-10 text-center font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="w-8 h-8 rounded-lg border border-dark/10 flex items-center justify-center hover:bg-primary/10 transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <p className="font-bold text-dark">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}

              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={clearCart}
                  className="text-sm text-dark/30 hover:text-red-500 transition-colors"
                >
                  Clear Cart
                </button>
                <Link href="/shop" className="text-sm text-primary hover:underline">
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <GlassCard className="p-6 sticky top-28" hover={false}>
                <h3 className="text-lg font-bold text-dark mb-6">Order Summary</h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-dark/60">Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dark/60">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-primary">Free</span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </span>
                  </div>
                  {subtotal < 500 && (
                    <p className="text-xs text-dark/40">
                      Spend {formatPrice(500 - subtotal)} more for free shipping
                    </p>
                  )}
                  <div className="border-t border-dark/10 pt-3">
                    <div className="flex justify-between">
                      <span className="font-bold text-dark">Total</span>
                      <span className="font-bold text-lg text-primary">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>
                </div>

                <Link href="/checkout" className="block mt-6">
                  <Button variant="primary" size="lg" className="w-full">
                    Checkout <ArrowRight size={18} className="ml-2" />
                  </Button>
                </Link>

                <div className="mt-4 text-center">
                  <p className="text-xs text-dark/30">
                    EFT / Cash on Delivery / Yoco
                  </p>
                </div>
              </GlassCard>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
