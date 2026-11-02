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
  { label: "Our Values", href: "#" },
  { label: "About Us", href: "#" },
];

const connectLinks = [
  { label: "Contact Us", href: "#" },
  { label: "Contact Information", href: "#" },
  { label: "Email", href: "mailto:hello@grabbytech.com" },
  { label: "Track My Order", href: "#" },
];

const socials = [
  { icon: FiFacebook, href: "#", label: "Facebook" },
  { icon: FiInstagram, href: "#", label: "Instagram" },
  { icon: FiYoutube, href: "#", label: "YouTube" },
  { icon: SiTiktok, href: "#", label: "TikTok" },
  { icon: FiTwitter, href: "#", label: "X / Twitter" },
];

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Logo column */}
          <div className="col-span-2 md:col-span-1">
            <Image
              src="/grabbytechLogo.jpg"
              alt="GrabbyTech Logo"
              width={130}
              height={38}
              className="h-10 w-auto object-contain rounded-md mb-4"
            />
            <p className="text-white/40 text-sm leading-relaxed max-w-[180px]">
              Smart products for a smarter life. Quality you can trust, delivered to your door.
            </p>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Policies</h4>
            <ul className="space-y-2.5">
              {policyLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-white/50 text-sm hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">About Us</h4>
            <ul className="space-y-2.5">
              {aboutLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-white/50 text-sm hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Connect</h4>
            <ul className="space-y-2.5">
              {connectLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-white/50 text-sm hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-6 mt-12 border-t border-white/10 pt-10">
          {socials.map(({ icon: Icon, href, label }) => (
            <Link
              key={label}
              href={href}
              aria-label={label}
              className="text-white/50 hover:text-white transition-colors"
            >
              <Icon size={20} />
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-8 pt-6 text-center">
          <p className="text-white/40 text-xs">
            © 2026, GrabbyTech. All rights reserved.
          </p>
        </div>
      </div>

      {/* Mobile bottom nav spacer */}
      <div className="h-16 md:hidden" />
    </footer>
  );
}

