'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield, ArrowLeft } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="gradient-hero py-16 relative overflow-hidden">
        <div className="absolute inset-0 leaf-pattern opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Shield size={40} className="mx-auto text-primary-light mb-4" />
            <h1 className="text-3xl sm:text-4xl font-bold text-cream">Privacy Policy</h1>
            <p className="text-cream/50 mt-3 text-sm">Last updated: January 2025</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/" className="text-primary text-sm flex items-center gap-2 mb-8 hover:underline">
          <ArrowLeft size={14} /> Back to Home
        </Link>
        
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <GlassCard className="p-8 sm:p-12">
            <div className="prose prose-sm max-w-none space-y-8 text-dark/70 leading-relaxed">
              <section>
                <h2 className="text-lg font-bold text-dark mb-3">1. Introduction</h2>
                <p>
                  Highly Medicated (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your personal information 
                  and your right to privacy. This Privacy Policy explains how we collect, use, disclose, 
                  and safeguard your information when you visit our website highlymedicated.co.za or make 
                  a purchase from us.
                </p>
                <p>
                  We are subject to the Protection of Personal Information Act (POPIA) of South Africa 
                  and comply with all applicable data protection legislation.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-dark mb-3">2. Information We Collect</h2>
                <p>We collect information that you voluntarily provide to us, including:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Name, email address, phone number, and delivery address</li>
                  <li>Payment information (processed securely through our payment providers)</li>
                  <li>Account registration details (email and encrypted password)</li>
                  <li>Product reviews and ratings</li>
                  <li>Newsletter subscription preferences</li>
                  <li>Communications you send to us via email, WhatsApp, or contact forms</li>
                </ul>
                <p className="mt-3">We automatically collect certain information, including:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Browser type and version</li>
                  <li>IP address and general location data</li>
                  <li>Pages visited and time spent on our website</li>
                  <li>Referring website addresses</li>
                  <li>Device information (type, operating system)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-bold text-dark mb-3">3. How We Use Your Information</h2>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Process and fulfil your orders</li>
                  <li>Create and manage your account</li>
                  <li>Send order confirmations and shipping updates</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Send marketing communications (with your consent)</li>
                  <li>Improve our website, products, and services</li>
                  <li>Prevent fraud and maintain security</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-bold text-dark mb-3">4. Cookies and Tracking</h2>
                <p>
                  We use cookies and similar technologies to enhance your browsing experience. 
                  For detailed information about the cookies we use, please see our{' '}
                  <Link href="/cookies" className="text-primary hover:underline">Cookie Policy</Link>.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-dark mb-3">5. Data Sharing</h2>
                <p>We may share your personal information with:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Payment processors (for secure transaction processing)</li>
                  <li>Delivery and courier services (to fulfil orders)</li>
                  <li>Analytics providers (to improve our services)</li>
                  <li>Law enforcement (when required by law)</li>
                </ul>
                <p className="mt-3">We do not sell your personal data to third parties.</p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-dark mb-3">6. Data Security</h2>
                <p>
                  We implement appropriate technical and organisational measures to protect your 
                  personal information against unauthorised access, alteration, disclosure, or 
                  destruction. This includes encryption of sensitive data, secure server infrastructure, 
                  and regular security assessments.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-dark mb-3">7. Your Rights Under POPIA</h2>
                <p>You have the right to:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Access your personal information we hold</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Object to the processing of your personal information</li>
                  <li>Withdraw consent for marketing communications</li>
                  <li>Lodge a complaint with the Information Regulator</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-bold text-dark mb-3">8. Data Retention</h2>
                <p>
                  We retain your personal information for as long as necessary to fulfil the purposes 
                  for which it was collected, or as required by law. Order records are kept for a 
                  minimum of 5 years for tax and accounting purposes.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-dark mb-3">9. Contact Us</h2>
                <p>For any privacy-related queries or to exercise your rights, contact us at:</p>
                <ul className="list-none space-y-1 mt-2">
                  <li>Email: info@highlymedicated.co.za</li>
                  <li>Phone: +27 78 800 7147</li>
                  <li>Address: Cape Town, Western Cape, South Africa</li>
                </ul>
              </section>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
