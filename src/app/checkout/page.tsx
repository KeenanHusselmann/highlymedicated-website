'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { CreditCard, Truck, Banknote, ChevronRight, Lock, CheckCircle } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { formatPrice, generateOrderNumber } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import GlassCard from '@/components/ui/GlassCard';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState('eft');
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: 'Western Cape',
    postalCode: '',
    notes: '',
  });

  const subtotal = getTotal();
  const shipping = subtotal >= 500 ? 0 : 75;
  const total = subtotal + shipping;

  const provinces = [
    'Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal',
    'Limpopo', 'Mpumalanga', 'North West', 'Northern Cape', 'Western Cape',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate order placement
    await new Promise((r) => setTimeout(r, 2000));
    const newOrderNumber = generateOrderNumber();
    setOrderNumber(newOrderNumber);
    setOrderPlaced(true);
    clearCart();
    setLoading(false);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <motion.div
          className="text-center max-w-md mx-auto px-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div
            className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
          >
            <CheckCircle size={40} className="text-primary" />
          </motion.div>
          <h1 className="text-3xl font-bold text-dark mb-2">Order Placed</h1>
          <p className="text-dark/60 mb-4">
            Thank you for your order. We will be in touch shortly.
          </p>
          <GlassCard className="p-6 mb-6 text-left" hover={false}>
            <p className="text-sm text-dark/40 mb-1">Order Number</p>
            <p className="text-lg font-bold text-primary">{orderNumber}</p>
            <div className="border-t border-dark/10 mt-4 pt-4 space-y-2 text-sm">
              <p className="text-dark/60">
                Payment Method: <span className="font-medium text-dark">{paymentMethod === 'eft' ? 'EFT Bank Transfer' : paymentMethod === 'cod' ? 'Cash on Delivery' : 'Yoco'}</span>
              </p>
              {paymentMethod === 'eft' && (
                <div className="mt-3 p-3 bg-primary/5 rounded-lg">
                  <p className="font-medium text-dark text-xs mb-2">Banking Details</p>
                  <p className="text-xs text-dark/60">Bank: FNB</p>
                  <p className="text-xs text-dark/60">Account: Highly Medicated</p>
                  <p className="text-xs text-dark/60">Account No: 123 456 7890</p>
                  <p className="text-xs text-dark/60">Branch: 250655</p>
                  <p className="text-xs text-dark/60">Reference: {orderNumber}</p>
                </div>
              )}
            </div>
          </GlassCard>
          <p className="text-dark/40 text-sm mb-6">
            A confirmation has been sent to your email address.
          </p>
          <Button onClick={() => router.push('/shop')} variant="primary">
            Continue Shopping
          </Button>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 text-center px-4">
        <h1 className="text-2xl font-bold text-dark mb-4">Your cart is empty</h1>
        <Button onClick={() => router.push('/shop')} variant="primary">
          Go to Shop
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.h1
          className="text-3xl font-bold text-dark mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Checkout
        </motion.h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <GlassCard className="p-6" hover={false}>
                  <h2 className="text-lg font-bold text-dark mb-6 flex items-center">
                    <Truck size={20} className="mr-2 text-primary" />
                    Shipping Information
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="Last Name"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="Phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      required
                    />
                    <div className="sm:col-span-2">
                      <Input
                        label="Street Address"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <Input
                      label="City"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      required
                    />
                    <div>
                      <label className="block text-sm font-medium text-dark mb-1.5">Province</label>
                      <select
                        name="province"
                        value={form.province}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-dark/10 text-dark focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                        required
                      >
                        {provinces.map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>
                    <Input
                      label="Postal Code"
                      name="postalCode"
                      value={form.postalCode}
                      onChange={handleChange}
                      required
                    />
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-dark mb-1.5">Order Notes (Optional)</label>
                      <textarea
                        name="notes"
                        value={form.notes}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-dark/10 text-dark placeholder:text-dark/30 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
                        placeholder="Special delivery instructions..."
                      />
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Payment Method */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <GlassCard className="p-6" hover={false}>
                  <h2 className="text-lg font-bold text-dark mb-6 flex items-center">
                    <CreditCard size={20} className="mr-2 text-primary" />
                    Payment Method
                  </h2>

                  <div className="space-y-3">
                    {[
                      {
                        id: 'eft',
                        name: 'EFT Bank Transfer',
                        description: 'Direct bank transfer. Order will be processed after payment is confirmed.',
                        icon: Banknote,
                      },
                      {
                        id: 'cod',
                        name: 'Cash on Delivery',
                        description: 'Pay when your order arrives. Available in Cape Town metro area.',
                        icon: Truck,
                      },
                      {
                        id: 'yoco',
                        name: 'Yoco (Coming Soon)',
                        description: 'Secure online card payment through Yoco.',
                        icon: CreditCard,
                        disabled: true,
                      },
                    ].map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-start space-x-3 p-4 rounded-xl border cursor-pointer transition-all ${
                          paymentMethod === method.id
                            ? 'border-primary bg-primary/5'
                            : 'border-dark/10 hover:border-dark/20'
                        } ${method.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={() => !method.disabled && setPaymentMethod(method.id)}
                          className="mt-1 accent-primary"
                          disabled={method.disabled}
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <method.icon size={16} className="text-primary" />
                            <span className="font-medium text-dark text-sm">{method.name}</span>
                          </div>
                          <p className="text-xs text-dark/40 mt-1">{method.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            </div>

            {/* Order Summary */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <GlassCard className="p-6 sticky top-28" hover={false}>
                  <h3 className="text-lg font-bold text-dark mb-4">Order Summary</h3>

                  <div className="space-y-3 mb-6">
                    {items.map((item) => (
                      <div key={item.productId} className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <div className="w-10 h-10 rounded-lg bg-dark/5 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs text-dark/20 font-bold">HM</span>
                          </div>
                          <div>
                            <p className="text-dark font-medium line-clamp-1">{item.name}</p>
                            <p className="text-dark/40 text-xs">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-dark/10 pt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-dark/60">Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-dark/60">Shipping</span>
                      <span>{shipping === 0 ? <span className="text-primary">Free</span> : formatPrice(shipping)}</span>
                    </div>
                    <div className="border-t border-dark/10 pt-2 flex justify-between">
                      <span className="font-bold text-dark">Total</span>
                      <span className="font-bold text-lg text-primary">{formatPrice(total)}</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full mt-6"
                    loading={loading}
                  >
                    <Lock size={16} className="mr-2" />
                    Place Order
                  </Button>

                  <p className="text-xs text-dark/30 text-center mt-3">
                    By placing this order, you agree to our Terms & Conditions.
                  </p>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
