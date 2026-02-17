import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Highly Medicated | Premium Cannabis Healing Products",
    template: "%s | Highly Medicated",
  },
  description:
    "Premium cannabis-infused healing products handcrafted in Cape Town, South Africa. CannaSalve ointments, apparel, and merchandise for natural wellness.",
  keywords: [
    "cannabis",
    "healing",
    "CannaSalve",
    "ointment",
    "CBD",
    "natural",
    "wellness",
    "Cape Town",
    "South Africa",
  ],
  authors: [{ name: "Highly Medicated" }],
  icons: {
    icon: [
      { url: '/assets/favicons/favicon1.png', sizes: 'any' },
    ],
    apple: '/assets/favicons/favicon1.png',
    shortcut: '/assets/favicons/favicon1.png',
  },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "https://highlymedicated.co.za",
    siteName: "Highly Medicated",
    title: "Highly Medicated | Premium Cannabis Healing Products",
    description:
      "Premium cannabis-infused healing products handcrafted in Cape Town.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Highly Medicated | Premium Cannabis Healing Products",
    description:
      "Premium cannabis-infused healing products handcrafted in Cape Town.",
  },
  metadataBase: new URL("https://highlymedicated.co.za"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
