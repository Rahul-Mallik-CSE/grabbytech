import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Navbar from "@/components/LayoutComponents/Navbar";
import Footer from "@/components/LayoutComponents/Footer";
import MobileBottomNav from "@/components/LayoutComponents/MobileBottomNav";
import { CartProvider } from "@/context/CartContext";
import ReduxProvider from "@/redux/ReduxProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://grabbytech.com"), // Replace with your actual domain
  title: {
    default: "GrabbyTech — Smart Gadgets & Innovative Lifestyle Tech in Bangladesh",
    template: "%s | GrabbyTech",
  },
  description:
    "Discover premium smart gadgets, home tech, and innovative lifestyle accessories at GrabbyTech. Enjoy secure shopping, fast delivery, and top-tier tech across Bangladesh.",
  keywords: [
    "GrabbyTech",
    "Smart Tech Bangladesh",
    "Gadgets in Bangladesh",
    "Lifestyle Tech",
    "Smart Home Gadgets",
    "Online Tech Store Bangladesh",
  ],
  authors: [{ name: "GrabbyTech" }],
  creator: "GrabbyTech",
  publisher: "GrabbyTech",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://grabbytech.com",
    title: "GrabbyTech — Smart Gadgets & Innovative Lifestyle Tech",
    description:
      "Discover premium smart gadgets, home tech, and lifestyle accessories at GrabbyTech. Shop the latest tech essentials in Bangladesh.",
    siteName: "GrabbyTech",
    images: [
      {
        url: "/grabbytechLogo.jpg", // Make sure this image exists in your public folder
        width: 1200,
        height: 630,
        alt: "GrabbyTech - Smart Products for a Smarter Life",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GrabbyTech — Smart Gadgets & Innovative Lifestyle Tech",
    description:
      "Discover premium smart gadgets, home tech, and lifestyle accessories at GrabbyTech. Shop the latest tech essentials in Bangladesh.",
    images: ["/grabbytechLogo.jpg"],
  },
  alternates: {
    canonical: "https://grabbytech.com",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-white">
        <ReduxProvider>
          <CartProvider>
          <Suspense fallback={<div className="h-16 bg-black" />}>
            <Navbar />
          </Suspense>
          <main className="flex-1">{children}</main>
          <Footer />
          <Suspense fallback={null}>
            <MobileBottomNav />
          </Suspense>
          </CartProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}