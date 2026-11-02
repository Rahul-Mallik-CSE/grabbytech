"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiGrid, FiShoppingBag, FiUser } from "react-icons/fi";
import { cn } from "cn";
import { useCartContext } from "@/context/CartContext";
import CartSheet from "@/components/cart/CartSheet";
import { MdProductionQuantityLimits } from "react-icons/md";

export default function MobileBottomNav() {
  const [cartOpen, setCartOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems } = useCartContext();

  const isHome = pathname === "/";
  const isCollections = pathname === "/collections";

  return (
    <>
      {/* Mobile Fixed Bottom Navigation Bar (like 2nd image) */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0e0e0e]/95 backdrop-blur-md border-t border-white/10 pb-safe shadow-2xl">
        <div className="grid grid-cols-4 items-center h-16 px-1">
          {/* 1. Home */}
          <Link
            href="/"
            className={cn(
              "flex flex-col items-center justify-center gap-1 py-1 transition-colors",
              isHome ? "text-[#FD6603]" : "text-white/60 hover:text-white"
            )}
          >
            <FiHome size={22} className={isHome ? "text-[#FD6603]" : "text-white/70"} />
            <span className="text-[11px] font-medium leading-none">Home</span>
          </Link>

          {/* 2. Category / Collections */}
          <Link
            href="/collections"
            className={cn(
              "flex flex-col items-center justify-center gap-1 py-1 transition-colors",
              isCollections ? "text-[#FD6603]" : "text-white/60 hover:text-white"
            )}
          >
            <MdProductionQuantityLimits
              size={22}
              className={isCollections ? "text-[#FD6603]" : "text-white/70"}
            />
            <span className="text-[11px] font-medium leading-none">Collections</span>
          </Link>

          {/* 3. Cart with Badge */}
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="flex flex-col items-center justify-center gap-1 py-1 transition-colors relative cursor-pointer"
          >
            <div className="relative">
              <FiShoppingBag size={22} className="text-white/70" />
              {totalItems > 0 ? (
                <span className="absolute -top-1.5 -right-2 bg-[#FD6603] text-white text-[10px] font-bold rounded-full min-w-[16px] h-4 px-1 flex items-center justify-center leading-none ring-2 ring-[#0e0e0e]">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              ) : (
                <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none ring-2 ring-[#0e0e0e]">
                  0
                </span>
              )}
            </div>
            <span className="text-[11px] font-medium text-white/60 leading-none">
              Cart
            </span>
          </button>

          {/* 4. Account */}
          <button
            type="button"
            className="flex flex-col items-center justify-center gap-1 py-1 transition-colors cursor-pointer text-white/60 hover:text-white"
          >
            <FiUser size={22} className="text-white/70" />
            <span className="text-[11px] font-medium leading-none">Account</span>
          </button>
        </div>
      </nav>

      {/* Cart Sheet */}
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
    </>
  );
}
