import Image from "next/image";
import Link from "next/link";
import {
  FiFacebook,
  FiInstagram,
  FiYoutube,
  FiTwitter,
} from "react-icons/fi";
import { SiTiktok } from "react-icons/si";

const policyLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Refund Policy", href: "#" },
  { label: "Shipping Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

const aboutLinks = [
  { label: "Our Story", href: "#" },
  { label: "Our Sustainability Approach", href: "#" },
  { label: "About", href: "#" },
];

const connectLinks = [
  { label: "Contact Us", href: "#" },
  { label: "Contact Information", href: "#" },
  { label: "Email", href: "mailto:support@grabbytech.com" },
  { label: "Regulatory Information", href: "#" },
];

const socials = [
  { icon: FiFacebook, href: "https://facebook.com", label: "Facebook" },
  { icon: FiInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FiYoutube, href: "https://youtube.com", label: "YouTube" },
  { icon: SiTiktok, href: "https://tiktok.com", label: "TikTok" },
  { icon: FiTwitter, href: "https://twitter.com", label: "X" },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-white/10 pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Mark / Logo on Left (like 1st image) */}
          <div className="col-span-2 md:col-span-1 flex flex-col items-start">
            <Link href="/" className="inline-block mb-4">
              <div className="relative h-14 w-14 rounded-2xl overflow-hidden border border-white/20 bg-black flex items-center justify-center p-1 shadow-lg">
                <Image
                  src="/grabbytechicon.jpg"
                  alt="GrabbyTech"
                  fill
                  className="object-cover"
                />
              </div>
            </Link>
            <p className="text-white/50 text-xs sm:text-sm leading-relaxed max-w-xs">
              স্মার্ট লাইফস্টাইল ও টেকনোলজি সমাধানের জন্য বাংলাদেশের বিশ্বস্ত ব্র্যান্ড।
            </p>
          </div>

          {/* Column 1: Policies */}
          <div>
            <h4 className="text-white font-semibold text-sm sm:text-base tracking-wide mb-4">
              Policies
            </h4>
            <ul className="space-y-2.5">
              {policyLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-white/60 hover:text-white text-xs sm:text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: About Us */}
          <div>
            <h4 className="text-white font-semibold text-sm sm:text-base tracking-wide mb-4">
              About Us
            </h4>
            <ul className="space-y-2.5">
              {aboutLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-white/60 hover:text-white text-xs sm:text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Connect */}
          <div>
            <h4 className="text-white font-semibold text-sm sm:text-base tracking-wide mb-4">
              Connect
            </h4>
            <ul className="space-y-2.5">
              {connectLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-white/60 hover:text-white text-xs sm:text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Icons row (centered like 1st image) */}
        <div className="flex items-center justify-center gap-7 mt-12 sm:mt-16 pt-8 border-t border-white/10">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-white/70 hover:text-[#FD6603] transition-colors p-1"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>

        {/* Copyright notice */}
        <div className="mt-8 text-center">
          <p className="text-white/40 text-xs tracking-wide">
            © 2026, GrabbyTech. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
