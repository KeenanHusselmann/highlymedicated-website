'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Package, Heart, Settings, LogOut, ChevronRight, Lock, Bell, Mail, Shield, Check, X } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useAuthStore } from '@/lib/store';

const sidebarLinks = [
  { href: '/account', icon: User, label: 'Profile' },
  { href: '/account/orders', icon: Package, label: 'Orders' },
  { href: '/account/wishlist', icon: Heart, label: 'Wishlist' },
  { href: '/account/settings', icon: Settings, label: 'Settings', active: true },
];

export default function SettingsPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState<'success' | 'error' | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    newsletter: true,
    newProducts: false,
  });

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

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordStatus('error');
      setTimeout(() => setPasswordStatus(null), 3000);
      return;
    }

    setSavingPassword(true);
    setPasswordStatus(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would make an actual API call:
      // const response = await fetch('/api/user/change-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(passwordForm),
      // });
      
      setPasswordStatus('success');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setPasswordStatus(null), 3000);
    } catch (error) {
      console.error('Error changing password:', error);
      setPasswordStatus('error');
      setTimeout(() => setPasswordStatus(null), 3000);
    } finally {
      setSavingPassword(false);
    }
  };

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    // Here you would save to API:
    // await fetch('/api/user/notifications', { ... });
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-dark mb-8">My Account</h1>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
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
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-all w-full"
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </nav>
            </GlassCard>
          </motion.div>

          {/* Settings Content */}
          <motion.div
            className="lg:col-span-3 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {/* Security Settings */}
            <GlassCard className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Lock size={20} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-dark">Security</h2>
                  <p className="text-dark/40 text-sm">Change your password</p>
                </div>
              </div>

              {passwordStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3"
                >
                  <Check size={20} className="text-green-600" />
                  <p className="text-green-800 text-sm font-medium">Password changed successfully!</p>
                </motion.div>
              )}
              
              {passwordStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3"
                >
                  <X size={20} className="text-red-600" />
                  <p className="text-red-800 text-sm font-medium">Passwords don't match or invalid current password</p>
                </motion.div>
              )}

              <form onSubmit={handlePasswordChange} className="space-y-4">
                <Input
                  label="Current Password"
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  required
                />
                <Input
                  label="New Password"
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  required
                />
                <Input
                  label="Confirm New Password"
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  required
                />
                <Button type="submit" disabled={savingPassword} className="w-full sm:w-auto">
                  {savingPassword ? (
                    <>
                      <span className="animate-spin">⏳</span> Updating...
                    </>
                  ) : (
                    <>
                      <Shield size={16} /> Change Password
                    </>
                  )}
                </Button>
              </form>
            </GlassCard>

            {/* Notification Preferences */}
            <GlassCard className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Bell size={20} className="text-accent" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-dark">Notifications</h2>
                  <p className="text-dark/40 text-sm">Manage your notification preferences</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { key: 'orderUpdates' as const, label: 'Order Updates', description: 'Get notified about your order status' },
                  { key: 'promotions' as const, label: 'Promotions & Offers', description: 'Receive special offers and discounts' },
                  { key: 'newsletter' as const, label: 'Newsletter', description: 'Stay updated with our latest news' },
                  { key: 'newProducts' as const, label: 'New Products', description: 'Be the first to know about new products' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-white/50 rounded-xl">
                    <div className="flex-1">
                      <p className="font-medium text-dark text-sm">{item.label}</p>
                      <p className="text-dark/40 text-xs mt-0.5">{item.description}</p>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle(item.key)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        notifications[item.key] ? 'bg-primary' : 'bg-dark/20'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                          notifications[item.key] ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Email Preferences */}
            <GlassCard className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <Mail size={20} className="text-secondary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-dark">Email Preferences</h2>
                  <p className="text-dark/40 text-sm">Manage how we communicate with you</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-4 bg-white/50 rounded-xl">
                  <p className="text-dark text-sm mb-2">Primary Email</p>
                  <p className="text-dark/60 text-sm font-medium">{user?.email || 'Not set'}</p>
                  <Link href="/account" className="text-primary text-xs font-medium hover:underline mt-2 inline-block">
                    Change Email
                  </Link>
                </div>
              </div>
            </GlassCard>

            {/* Danger Zone */}
            <GlassCard className="p-8 border border-red-200">
              <h2 className="text-xl font-bold text-red-600 mb-2">Danger Zone</h2>
              <p className="text-dark/60 text-sm mb-6">Irreversible actions</p>
              
              <div className="space-y-3">
                <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                  Delete Account
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
