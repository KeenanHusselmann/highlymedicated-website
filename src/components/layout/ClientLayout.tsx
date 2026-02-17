'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/common/CartDrawer';
import AgeVerification from '@/components/common/AgeVerification';
import CookieConsent from '@/components/common/CookieConsent';
import ChatWidget from '@/components/common/ChatWidget';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AgeVerification />
      <Navbar />
      <CartDrawer />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <ChatWidget />
      <CookieConsent />
    </>
  );
}
