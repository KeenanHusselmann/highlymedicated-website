'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Package, Heart, Settings, LogOut, ChevronRight, Eye, X, MapPin, Truck, CheckCircle } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { useAuthStore } from '@/lib/store';

const sidebarLinks = [
  { href: '/account', icon: User, label: 'Profile' },
  { href: '/account/orders', icon: Package, label: 'Orders', active: true },
  { href: '/account/wishlist', icon: Heart, label: 'Wishlist' },
  { href: '/account/settings', icon: Settings, label: 'Settings' },
];

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Delivered' | 'Processing' | 'Shipped' | 'Cancelled';
  items: OrderItem[];
  shippingAddress?: string;
  trackingNumber?: string;
}

const sampleOrders: Order[] = [
  {
    id: 'HM-20250115-001',
    date: '15 Jan 2025',
    total: 649,
    status: 'Delivered',
    items: [
      { name: 'CannaSalve Original', quantity: 1, price: 350 },
      { name: 'HM Classic Tee', quantity: 1, price: 299 },
    ],
    shippingAddress: '123 Main Street, Cape Town, 8001',
    trackingNumber: 'TRK123456789',
  },
  {
    id: 'HM-20250108-002',
    date: '08 Jan 2025',
    total: 550,
    status: 'Processing',
    items: [
      { name: 'CannaSalve Extra Strength', quantity: 1, price: 550 },
    ],
    shippingAddress: '123 Main Street, Cape Town, 8001',
  },
  {
    id: 'HM-20241220-003',
    date: '20 Dec 2024',
    total: 899,
    status: 'Shipped',
    items: [
      { name: 'CannaSalve Original', quantity: 2, price: 350 },
      { name: 'Hemp Tote Bag', quantity: 1, price: 199 },
    ],
    shippingAddress: '123 Main Street, Cape Town, 8001',
    trackingNumber: 'TRK987654321',
  },
];

function getStatusVariant(status: string) {
  switch (status) {
    case 'Delivered': return 'success' as const;
    case 'Processing': return 'accent' as const;
    case 'Shipped': return 'primary' as const;
    case 'Cancelled': return 'error' as const;
    default: return 'primary' as const;
  }
}

export default function OrdersPage() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuthStore();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
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

  const filteredOrders = filterStatus === 'all' 
    ? sampleOrders 
    : sampleOrders.filter(order => order.status.toLowerCase() === filterStatus);

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

          {/* Orders */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <GlassCard className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-dark">Order History</h2>
                <div className="flex gap-2">
                  {['all', 'processing', 'shipped', 'delivered'].map(status => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        filterStatus === status
                          ? 'bg-primary text-white'
                          : 'bg-dark/5 text-dark/60 hover:bg-dark/10'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {filteredOrders.length === 0 ? (
                <div className="text-center py-12">
                  <Package size={40} className="mx-auto text-dark/20 mb-4" />
                  <p className="text-dark/40 text-sm">No {filterStatus !== 'all' ? filterStatus : ''} orders found</p>
                </div>
              ) : (
              <div className="space-y-6">
                {filteredOrders.map(order => (
                  <div key={order.id} className="border border-dark/10 rounded-2xl p-6">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                      <div>
                        <p className="font-semibold text-dark text-sm">{order.id}</p>
                        <p className="text-dark/40 text-xs mt-0.5">{order.date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                        <button 
                          onClick={() => setSelectedOrder(order)}
                          className="w-8 h-8 rounded-lg bg-dark/5 flex items-center justify-center text-dark/40 hover:text-dark hover:bg-dark/10 transition-all"
                        >
                          <Eye size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                          <span className="text-dark/70">
                            {item.name} <span className="text-dark/40">x{item.quantity}</span>
                          </span>
                          <span className="text-dark font-medium">R{item.price.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-dark/10 flex justify-between items-center">
                      <span className="text-dark/50 text-sm">Total</span>
                      <span className="text-dark font-bold">R{order.total.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </div>

      {/* Order Detail Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedOrder(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-cream rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-dark">Order Details</h2>
                    <p className="text-dark/40 text-sm mt-1">{selectedOrder.id}</p>
                  </div>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="w-10 h-10 rounded-full bg-dark/5 flex items-center justify-center hover:bg-dark/10 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Order Status Timeline */}
                <div className="mb-8 p-6 bg-white/50 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-dark">Order Status</span>
                    <Badge variant={getStatusVariant(selectedOrder.status)}>{selectedOrder.status}</Badge>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 flex-1">
                      <CheckCircle size={20} className="text-primary" />
                      <div className="h-1 flex-1 bg-primary rounded"></div>
                    </div>
                    <div className="flex items-center gap-2 flex-1">
                      <Truck size={20} className={selectedOrder.status === 'Shipped' || selectedOrder.status === 'Delivered' ? 'text-primary' : 'text-dark/20'} />
                      <div className={`h-1 flex-1 rounded ${selectedOrder.status === 'Shipped' || selectedOrder.status === 'Delivered' ? 'bg-primary' : 'bg-dark/10'}`}></div>
                    </div>
                    <Package size={20} className={selectedOrder.status === 'Delivered' ? 'text-primary' : 'text-dark/20'} />
                  </div>
                </div>

                {/* Shipping Info */}
                {selectedOrder.shippingAddress && (
                  <div className="mb-6 p-4 bg-white/50 rounded-xl">
                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="text-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-dark">Shipping Address</p>
                        <p className="text-dark/60 text-sm mt-1">{selectedOrder.shippingAddress}</p>
                        {selectedOrder.trackingNumber && (
                          <p className="text-dark/60 text-sm mt-2">
                            <span className="font-medium">Tracking:</span> {selectedOrder.trackingNumber}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Order Items */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-dark mb-4">Items</h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-white/50 rounded-xl">
                        <div>
                          <p className="font-medium text-dark text-sm">{item.name}</p>
                          <p className="text-dark/40 text-xs mt-0.5">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-bold text-dark">R{item.price.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="pt-6 border-t border-dark/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-dark/60 text-sm">Subtotal</span>
                    <span className="text-dark font-medium">R{selectedOrder.total.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-dark/60 text-sm">Shipping</span>
                    <span className="text-dark font-medium">Free</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-dark/10 mt-3">
                    <span className="text-dark font-bold">Total</span>
                    <span className="text-dark font-bold text-lg">R{selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-dark/10">
                  <p className="text-xs text-dark/40 mb-4">Need help with your order?</p>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full">Contact Support</Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
