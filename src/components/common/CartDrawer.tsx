'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotal, clearCart } =
    useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 overlay-blur"
            onClick={closeCart}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Drawer */}
          <motion.div
            className="absolute top-0 right-0 w-full max-w-md h-full bg-cream/98 backdrop-blur-xl shadow-2xl flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-dark/10">
              <div className="flex items-center space-x-3">
                <ShoppingBag size={20} className="text-primary" />
                <h2 className="text-lg font-bold text-dark">Your Cart</h2>
                <span className="text-sm text-dark/40">
                  ({items.length} {items.length === 1 ? 'item' : 'items'})
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-lg hover:bg-dark/5 transition-colors"
              >
                <X size={20} className="text-dark/50" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag size={48} className="text-dark/20 mb-4" />
                  <p className="text-dark/50 mb-2">Your cart is empty</p>
                  <p className="text-dark/30 text-sm mb-6">
                    Discover our healing products
                  </p>
                  <Link href="/shop" onClick={closeCart}>
                    <Button variant="primary" size="sm">
                      Browse Shop
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.productId}
                      className="flex gap-4 p-3 glass-card rounded-xl"
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                    >
                      {/* Image */}
                      <div className="w-20 h-20 rounded-lg bg-dark/5 overflow-hidden flex-shrink-0 relative">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/shop/${item.slug}`}
                          onClick={closeCart}
                          className="text-sm font-medium text-dark hover:text-primary transition-colors line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <p className="text-primary font-semibold text-sm mt-1">
                          {formatPrice(item.price)}
                        </p>

                        {/* Quantity */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() =>
                                updateQuantity(item.productId, item.quantity - 1)
                              }
                              className="w-7 h-7 rounded-lg bg-dark/5 flex items-center justify-center hover:bg-primary/10 transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-sm font-medium w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.productId, item.quantity + 1)
                              }
                              className="w-7 h-7 rounded-lg bg-dark/5 flex items-center justify-center hover:bg-primary/10 transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.productId)}
                            className="p-1.5 text-dark/30 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Clear Cart */}
                  <button
                    onClick={clearCart}
                    className="text-xs text-dark/30 hover:text-red-500 transition-colors"
                  >
                    Clear cart
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-dark/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-dark/60">Subtotal</span>
                  <span className="text-lg font-bold text-dark">
                    {formatPrice(getTotal())}
                  </span>
                </div>
                <p className="text-xs text-dark/40">
                  Shipping calculated at checkout
                </p>
                <Link href="/checkout" onClick={closeCart} className="block">
                  <Button variant="primary" size="lg" className="w-full">
                    Proceed to Checkout
                  </Button>
                </Link>
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="block text-center text-sm text-dark/50 hover:text-primary transition-colors"
                >
                  View Cart
                </Link>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
