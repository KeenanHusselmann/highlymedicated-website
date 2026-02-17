'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Package, Heart, Settings, LogOut, ChevronRight, Edit2, Save, Check, X } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useAuthStore } from '@/lib/store';

const sidebarLinks = [
  { href: '/account', icon: User, label: 'Profile', active: true },
  { href: '/account/orders', icon: Package, label: 'Orders' },
  { href: '/account/wishlist', icon: Heart, label: 'Wishlist' },
  { href: '/account/settings', icon: Settings, label: 'Settings' },
];

export default function AccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout, updateProfile } = useAuthStore();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'success' | 'error' | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });
  const [originalProfile, setOriginalProfile] = useState(profile);

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      router.push('/auth/login');
    } else if (user) {
      // Update profile from user data
      const userProfile = {
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        address: user.address || '',
      };
      setProfile(userProfile);
      setOriginalProfile(userProfile);
      setIsLoading(false);
    }
  }, [isAuthenticated, user, router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus(null);

    const result = await updateProfile(profile);
    
    if (result.success) {
      setOriginalProfile(profile);
      setSaveStatus('success');
      setEditing(false);
      setTimeout(() => setSaveStatus(null), 3000);
    } else {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(null), 3000);
    }
    
    setSaving(false);
  };

  const handleCancel = () => {
    setProfile(originalProfile);
    setEditing(false);
    setSaveStatus(null);
  };

  if (isLoading || !isAuthenticated) {
    return null;
  }

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
              <div className="flex items-center gap-3 p-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                  <span className="text-white font-bold">{user?.name?.charAt(0) || 'U'}</span>
                </div>
                <div>
                  <p className="font-semibold text-dark text-sm">{user?.name}</p>
                  <p className="text-dark/40 text-xs">{user?.email}</p>
                </div>
              </div>

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

          {/* Main Content */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <GlassCard className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-dark">Profile Information</h2>
                <div className="flex items-center gap-3">
                  {editing && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCancel}
                      disabled={saving}
                    >
                      <X size={14} /> Cancel
                    </Button>
                  )}
                  <Button
                    variant={editing ? "primary" : "outline"}
                    size="sm"
                    onClick={editing ? handleSave : () => setEditing(true)}
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <span className="animate-spin">⏳</span> Saving...
                      </>
                    ) : editing ? (
                      <><Save size={14} /> Save Changes</>
                    ) : (
                      <><Edit2 size={14} /> Edit Profile</>
                    )}
                  </Button>
                </div>
              </div>

              {/* Status Messages */}
              {saveStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3"
                >
                  <Check size={20} className="text-green-600" />
                  <p className="text-green-800 text-sm font-medium">Profile updated successfully!</p>
                </motion.div>
              )}
              
              {saveStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3"
                >
                  <X size={20} className="text-red-600" />
                  <p className="text-red-800 text-sm font-medium">Failed to update profile. Please try again.</p>
                </motion.div>
              )}

              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    disabled={!editing}
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    disabled={!editing}
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <Input
                    label="Phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    disabled={!editing}
                  />
                  <Input
                    label="Address"
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    disabled={!editing}
                  />
                </div>
              </div>

              {/* Recent Orders Preview */}
              <div className="mt-12 pt-8 border-t border-dark/10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-dark">Recent Orders</h3>
                  <Link href="/account/orders" className="text-primary text-sm font-medium hover:underline">
                    View All
                  </Link>
                </div>
                <div className="text-center py-8 text-dark/40">
                  <Package size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No orders yet</p>
                  <Link href="/shop" className="text-primary text-sm font-medium hover:underline mt-2 inline-block">
                    Start Shopping
                  </Link>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
