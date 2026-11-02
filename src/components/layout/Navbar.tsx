"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiShoppingCart, FiUser, FiMenu, FiX } from "react-icons/fi";
import CartSheet from "@/components/cart/CartSheet";
import { useCartContext } from "@/context/CartContext";
import { cn } from "cn";

export default function Navbar() {
  const [cartOpen, setCartOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
          
          {/* Left Side: Burger Menu (Mobile Only) / Full Logo (Desktop Only) */}
          <div className="flex items-center">
            {/* Mobile Burger Menu Button */}
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open Navigation Menu"
              className="md:hidden p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <FiMenu size={22} />
            </button>

            {/* Desktop Full Logo */}
            <Link href="/" className="hidden md:flex items-center gap-2">
              <div className="relative h-10 w-36">
                <Image
                  src="/grabbytechLogo.jpg"
                  alt="GrabbyTech"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Middle: Centered Logo on Mobile / Nav Links on Desktop */}
          <div className="flex items-center">
            {/* Mobile Brand Logo (Centered) */}
            <Link href="/" className="md:hidden flex items-center">
              <div className="relative h-9 w-32">
                <Image
                  src="/grabbytechLogo.jpg"
                  alt="GrabbyTech"
                  fill
                  className="object-contain object-center"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200",
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
          </div>

          {/* Right Corner: Profile Icon (Desktop Only) and Cart Icon (Both) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Profile Icon - Hidden on mobile view */}
            <button
              type="button"
              aria-label="Profile"
              className="hidden md:flex p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
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

      {/* Mobile Sidebar Navigation Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setSidebarOpen(false)}
          />

          {/* Sidebar Drawer Panel */}
          <div className="relative w-4/5 max-w-xs bg-black border-r border-white/10 h-full flex flex-col justify-between p-6 z-10 shadow-2xl animate-in slide-in-from-left duration-200">
            {/* Top section: Header & Nav Links */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <span className="text-white font-bold text-lg tracking-wide">Menu</span>
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  aria-label="Close Menu"
                  className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <FiX size={22} />
                </button>
              </div>

              <div className="flex flex-col gap-3 mt-6">
                {navLinks.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setSidebarOpen(false)}
                      className={cn(
                        "px-4 py-3 rounded-xl text-base font-medium transition-all duration-200",
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
            </div>

            {/* Bottom section: Profile Button */}
            <div className="pt-6 border-t border-white/10">
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors font-medium text-base"
              >
                <FiUser size={20} />
                <span>Profile</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Right-Side Cart Sheet */}
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
    </>
  );
}