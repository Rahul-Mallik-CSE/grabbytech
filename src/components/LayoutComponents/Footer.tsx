import Image from "next/image";
import Link from "next/link";
import {
  FiFacebook,
  FiInstagram,
  FiYoutube,
  FiTwitter,
} from "react-icons/fi";
import { SiTiktok } from "react-icons/si";


const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/collections" },
  { label: "contact", href: "/contact" },
];

const policyLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
];



const connectLinks = [
  { label: "Contact Us", href: "/contact" },
  { label: "Tutpara, Khulna", href: "#" },
  { label: "Phone: +8801951755457", href: "tel:+8801951755457" },
  { label: "Email: Contact@grabbytech.com", href: "mailto:Contact@grabbytech.com" },
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
        
        {/* Mobile: Centered Stacked Layout | Desktop: 4-Column Grid Layout */}
        <div className="flex flex-col items-center text-center md:grid md:grid-cols-4 md:items-start md:text-left gap-10 md:gap-12">
          
          {/* Brand Mark / Logo Section */}
          <div className="flex flex-col items-center md:items-start md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <div className="relative h-20 md:h-24 w-20 md:w-24 margin-0  overflow-hidden bg-transparent flex items-center justify-center p-1 shadow-lg">
                <Image
                  src="/grabbytechicon.jpg"
                  alt="GrabbyTech"
                  fill
                  className="object-cover"
                />
              </div>
            </Link>
            <p className="text-white/50 text-xs sm:text-sm leading-relaxed max-w-xs">
              Your trusted destination for smart lifestyle tech and innovative everyday essentials.
            </p>
          </div>

          

          {/* Column 1: About Us */}
          <div className="w-full">
            <h4 className="text-white font-semibold text-sm sm:text-base tracking-wide mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
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

          {/* Column 2: Policies */}
          <div className="w-full">
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

          {/* Column 3: Connect */}
          <div className="w-full">
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

        {/* Social Icons row (centered) */}
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