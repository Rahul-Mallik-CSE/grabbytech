"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiShoppingCart, FiUser, FiMenu, FiX, FiSearch } from "react-icons/fi";
import CartSheet from "@/components/CartComponents/CartSheet";
import { useCartContext } from "@/context/CartContext";
import { cn } from "cn";

export default function Navbar() {
  const [cartOpen, setCartOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const { totalItems } = useCartContext();

  const searchRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Collections", href: "/collections" },
    { label: "Contact", href: "/contact" },
  ];

  // Close mobile search when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setMobileSearchOpen(false);
      }
    }
    if (mobileSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileSearchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    console.log("Searching for:", searchQuery);
    setMobileSearchOpen(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-40 bg-black border-b border-white/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">

          {/* Left Side: Burger Menu (Mobile Only) / Full Logo (Desktop Only) */}
          <div className="flex items-center shrink-0">
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
          <div className="flex items-center justify-center">
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
                      "px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200",
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

          {/* Right Corner: Desktop Search Bar, Mobile Search Toggle, Profile, & Cart */}
          <div className="flex items-center gap-1 sm:gap-3 shrink-0">

            {/* Desktop Custom Search Bar (Positioned just left of right icons) */}
            <form
              onSubmit={handleSearch}
              className="hidden md:flex relative items-center w-60 lg:w-72 bg-white rounded-full p-1 border-2 border-[#FD6603] shadow-sm shadow-[#FD6603]/20"
            >
              <div className="pl-3 pr-1.5 text-neutral-400">
                <FiSearch size={16} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-transparent text-neutral-800 text-xs lg:text-sm placeholder:text-neutral-400 focus:outline-none pr-1"
              />
              <button
                type="submit"
                className="flex items-center gap-1 bg-[#FD6603] hover:bg-[#e05b02] text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors shrink-0 cursor-pointer"
              >
                <FiSearch size={12} />
                <span>Search</span>
              </button>
            </form>

            {/* Mobile Search Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              aria-label="Toggle Search"
              className="md:hidden p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <FiSearch size={20} />
            </button>

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

        {/* Mobile Sticky Floating Search Box Overlay (Opens over page content without increasing navbar height) */}
        {mobileSearchOpen && (
          <div
            ref={searchRef}
            className="md:hidden absolute top-16 left-0 right-0 bg-none  px-4 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <form
              onSubmit={handleSearch}
              className="relative flex items-center w-full bg-white rounded-full p-1.5 border-2 border-[#FD6603] shadow-lg shadow-[#FD6603]/30"
            >
              <div className="pl-3.5 pr-2 text-neutral-400">
                <FiSearch size={18} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                autoFocus
                className="w-full bg-transparent text-neutral-900 text-sm placeholder:text-neutral-400 focus:outline-none pr-2"
              />
              <button
                type="submit"
                className="flex items-center gap-1.5 bg-[#FD6603] hover:bg-[#e05b02] text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-colors shrink-0 cursor-pointer shadow-md"
              >
                <FiSearch size={14} />
                <span>Search</span>
              </button>
            </form>
          </div>
        )}
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
          <div className="relative w-4/5 max-w-xs bg-black border-r border-white/15 h-full flex flex-col justify-between p-6 z-10 shadow-2xl animate-in slide-in-from-left duration-200">
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
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors font-medium text-base cursor-pointer"
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