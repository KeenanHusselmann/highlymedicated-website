'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Cookie, ArrowLeft } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

export default function CookiesPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="gradient-hero py-16 relative overflow-hidden">
        <div className="absolute inset-0 leaf-pattern opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Cookie size={40} className="mx-auto text-primary-light mb-4" />
            <h1 className="text-3xl sm:text-4xl font-bold text-cream">Cookie Policy</h1>
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
                <h2 className="text-lg font-bold text-dark mb-3">1. What Are Cookies</h2>
                <p>
                  Cookies are small text files that are placed on your computer or mobile device when 
                  you visit a website. They are widely used to make websites work more efficiently, 
                  provide a better user experience, and give website owners useful information about 
                  how their site is being used.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-dark mb-3">2. How We Use Cookies</h2>
                <p>Highly Medicated uses cookies for the following purposes:</p>
                
                <h3 className="text-base font-semibold text-dark mt-4 mb-2">Essential Cookies</h3>
                <p>
                  These cookies are necessary for the website to function properly. They include 
                  cookies that enable you to log into secure areas, use a shopping cart, and complete 
                  purchases. Without these cookies, the services you have asked for cannot be provided.
                </p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Session management and authentication</li>
                  <li>Shopping cart functionality</li>
                  <li>Age verification status</li>
                  <li>Cookie consent preferences</li>
                </ul>

                <h3 className="text-base font-semibold text-dark mt-4 mb-2">Functional Cookies</h3>
                <p>
                  These cookies allow the website to remember choices you make and provide enhanced 
                  features and personalisation.
                </p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Remembering your wishlist items</li>
                  <li>Storing your preferences (e.g., dark mode)</li>
                  <li>Remembering items in your cart between visits</li>
                </ul>

                <h3 className="text-base font-semibold text-dark mt-4 mb-2">Analytics Cookies</h3>
                <p>
                  These cookies help us understand how visitors interact with our website, helping us 
                  improve our content and services.
                </p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Pages visited and time spent</li>
                  <li>Traffic sources and referral data</li>
                  <li>Browser and device information</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-bold text-dark mb-3">3. Third-Party Cookies</h2>
                <p>
                  Some cookies are placed by third-party services that appear on our pages. We do not 
                  control the setting of these cookies. Third-party cookies on our site may include:
                </p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Analytics services (e.g., Google Analytics)</li>
                  <li>Payment processing services (e.g., Yoco)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-bold text-dark mb-3">4. Managing Cookies</h2>
                <p>
                  You can manage your cookie preferences through our cookie consent banner that appears 
                  when you first visit our website. You can also control cookies through your browser 
                  settings:
                </p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li><strong>Chrome:</strong> Settings &gt; Privacy and Security &gt; Cookies</li>
                  <li><strong>Firefox:</strong> Settings &gt; Privacy &amp; Security &gt; Cookies</li>
                  <li><strong>Safari:</strong> Preferences &gt; Privacy &gt; Cookies</li>
                  <li><strong>Edge:</strong> Settings &gt; Privacy &gt; Cookies</li>
                </ul>
                <p className="mt-3">
                  Please note that disabling certain cookies may affect the functionality of our website 
                  and your ability to use some features such as the shopping cart and user accounts.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-dark mb-3">5. Local Storage</h2>
                <p>
                  In addition to cookies, we use your browser&apos;s local storage to persist certain 
                  preferences such as your shopping cart contents, wishlist items, age verification 
                  status, and cookie consent choices. You can clear local storage through your browser&apos;s 
                  developer tools or settings.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-dark mb-3">6. Updates to This Policy</h2>
                <p>
                  We may update this Cookie Policy from time to time to reflect changes in our practices 
                  or for other operational, legal, or regulatory reasons. Please revisit this policy 
                  periodically to stay informed.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-dark mb-3">7. Contact Us</h2>
                <p>
                  If you have questions about our use of cookies, please contact us at:
                </p>
                <ul className="list-none space-y-1 mt-2">
                  <li>Email: info@highlymedicated.co.za</li>
                  <li>Phone: +27 78 800 7147</li>
                </ul>
              </section>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
