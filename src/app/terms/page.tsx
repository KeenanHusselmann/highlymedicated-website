'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FileText, ArrowLeft } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="gradient-hero py-16 relative overflow-hidden">
        <div className="absolute inset-0 leaf-pattern opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <FileText size={40} className="mx-auto text-primary-light mb-4" />
            <h1 className="text-3xl sm:text-4xl font-bold text-cream">Terms &amp; Conditions</h1>
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
                  These Terms and Conditions govern your use of the Highly Medicated website 
                  (highlymedicated.co.za) and any purchases made through it. By accessing our website 
                  or placing an order, you agree to be bound by these terms.
                </p>
                <p>
                  Highly Medicated is based in Cape Town, Western Cape, South Africa. These terms 
                  are governed by the laws of the Republic of South Africa, including the Consumer 
                  Protection Act 68 of 2008 (CPA) and the Electronic Communications and Transactions 
                  Act 25 of 2002 (ECTA).
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-dark mb-3">2. Age Restriction</h2>
                <p>
                  You must be at least 18 years of age to use this website and purchase our products. 
                  By confirming your age upon entering the website, you declare under oath that you 
                  are 18 years or older. We reserve the right to request proof of age at any time.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-dark mb-3">3. Products</h2>
                <p>
                  All products listed on our website are for external use only unless otherwise stated. 
                  Our cannabis-infused products are made in compliance with South African law, including 
                  the Cannabis for Private Purposes Act.
                </p>
                <p>
                  Product descriptions and images are provided for informational purposes. While we 
                  make every effort to display products accurately, slight variations may occur. Products 
                  are not intended to diagnose, treat, cure, or prevent any disease.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-dark mb-3">4. Orders and Pricing</h2>
                <ul className="list-disc pl-5 space-y-1">
                  <li>All prices are in South African Rand (ZAR) and include VAT where applicable</li>
                  <li>We reserve the right to change prices without prior notice</li>
                  <li>An order is only confirmed once you receive an order confirmation</li>
                  <li>We reserve the right to refuse or cancel any order for any reason</li>
                  <li>In the event of a pricing error, we will notify you and offer to cancel the order</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-bold text-dark mb-3">5. Payment</h2>
                <p>We accept the following payment methods:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>EFT (Electronic Funds Transfer):</strong> Bank details will be provided at checkout. Orders are processed once payment is confirmed.</li>
                  <li><strong>Cash on Delivery (COD):</strong> Available for Cape Town Metro area only. Payment is due upon delivery.</li>
                  <li><strong>Online Payment:</strong> Via Yoco (when available). Processed securely through Yoco&apos;s payment gateway.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-bold text-dark mb-3">6. Delivery</h2>
                <p>
                  We deliver nationwide within South Africa. Delivery times are estimates and may vary:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Cape Town Metro: 1-3 business days</li>
                  <li>Major cities: 3-5 business days</li>
                  <li>Other areas: 5-7 business days</li>
                </ul>
                <p className="mt-3">
                  Free delivery on orders over R500. Standard delivery fee of R75 applies to orders under R500.
                  Risk of loss and damage passes to you upon delivery.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-dark mb-3">7. Returns and Refunds</h2>
                <p>
                  In accordance with the CPA, you may return goods within 6 months if they are defective, 
                  not suitable for their intended purpose, or not as described. You also have the right 
                  to return goods within 7 days of delivery if you simply change your mind (cooling-off period).
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Items must be unused, in original packaging, and in resalable condition</li>
                  <li>Opened skincare and topical products cannot be returned for hygiene reasons (unless defective)</li>
                  <li>Return shipping costs are the customer&apos;s responsibility (except for defective items)</li>
                  <li>Refunds are processed within 14 business days</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-bold text-dark mb-3">8. Intellectual Property</h2>
                <p>
                  All content on this website, including text, graphics, logos, images, and software, 
                  is the property of Highly Medicated and is protected by South African intellectual 
                  property laws. You may not reproduce, distribute, or create derivative works without 
                  our written consent.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-dark mb-3">9. Disclaimer</h2>
                <p>
                  Our products are wellness products and are not registered medicines. They are not 
                  intended to diagnose, treat, cure, or prevent any disease. Always consult a healthcare 
                  professional before using new topical products, especially if you have pre-existing 
                  skin conditions or allergies.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-dark mb-3">10. Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by law, Highly Medicated shall not be liable for any 
                  indirect, incidental, special, or consequential damages arising out of your use of 
                  our website or products.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-dark mb-3">11. Dispute Resolution</h2>
                <p>
                  Any disputes arising from these terms shall first be attempted to be resolved through 
                  direct negotiation. If unsuccessful, disputes shall be referred to mediation and, 
                  if necessary, resolved through the appropriate courts of South Africa.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-dark mb-3">12. Contact</h2>
                <p>For any questions regarding these terms:</p>
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
