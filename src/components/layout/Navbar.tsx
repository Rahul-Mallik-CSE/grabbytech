"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import CartSheet from "@/components/cart/CartSheet";
import { useCartContext } from "@/context/CartContext";
import { cn } from "cn";

export default function Navbar() {
  const [cartOpen, setCartOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems } = useCartContext();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Collections", href: "/collections" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-40 bg-black border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Left Corner: Brand Logo (Full logo on desktop, Icon on mobile) */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              {/* Desktop Full Logo */}
              <div className="hidden md:block relative h-10 w-36">
                <Image
                  src="/grabbytechLogo.jpg"
                  alt="GrabbyTech"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>

              {/* Mobile Square Icon */}
              <div className="block md:hidden relative h-9 w-9 rounded-lg overflow-hidden border border-white/15">
                <Image
                  src="/grabbytechicon.jpg"
                  alt="GrabbyTech Icon"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Middle of Nav: 2 Buttons - Home and Collections */}
          <div className="flex items-center gap-2">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200",
                    active
                      ? "bg-[#FD6603] text-white shadow-sm shadow-[#FD6603]/30"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Corner: Profile Icon and Cart Icon */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Profile Icon */}
            <button
              type="button"
              aria-label="Profile"
              className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <FiUser size={20} />
            </button>

            {/* Cart Icon with Sheet Trigger */}
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label="Shopping Cart"
              className="relative p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <FiShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#FD6603] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none ring-2 ring-black">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Right-Side Cart Sheet */}
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
    </>
  );
}
