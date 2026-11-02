"use client";

import Image from "next/image";
import Link from "next/link";
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiArrowRight } from "react-icons/fi";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCartContext } from "@/context/CartContext";
import { CartItem } from "@/types/AllTypes";

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function CartItemRow({ item }: { item: CartItem }) {
  const { removeItem, updateQuantity } = useCartContext();
  const { product, quantity } = item;

  return (
    <div className="flex gap-3 py-3.5 border-b border-white/10">
      <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-white/5 border border-white/10">
        <Image
          src={product.images[0]?.url || ""}
          alt={product.images[0]?.alt || product.name}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs sm:text-sm font-medium text-white line-clamp-1 leading-tight">
          {product.name}
        </p>
        <p className="text-[#FD6603] font-bold text-xs sm:text-sm mt-1">
          Tk {product.price.toLocaleString()}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center border border-white/20 rounded-lg overflow-hidden bg-white/5">
            <button
              type="button"
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="w-6 h-6 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <FiMinus size={11} />
            </button>
            <span className="text-white text-xs font-semibold w-6 text-center">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="w-6 h-6 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <FiPlus size={11} />
            </button>
          </div>

          <button
            type="button"
            onClick={() => removeItem(product.id)}
            className="ml-auto text-white/40 hover:text-red-400 transition-colors p-1"
            title="Remove item"
          >
            <FiTrash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const { items, totalItems, totalPrice } = useCartContext();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="bg-[#0e0e0e] border-l border-white/10 w-full sm:max-w-md flex flex-col p-0 z-50 text-white"
      >
        <SheetHeader className="px-5 pt-5 pb-4 border-b border-white/10">
          <SheetTitle className="text-white flex items-center gap-2 text-base font-bold">
            <FiShoppingBag size={18} className="text-[#FD6603]" />
            <span>My Shopping Cart</span>
            {totalItems > 0 && (
              <span className="ml-auto text-xs bg-[#FD6603] text-white font-semibold px-2.5 py-0.5 rounded-full">
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {/* Cart items list */}
        <div className="flex-1 overflow-y-auto px-5 divide-y divide-white/5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-20">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/30 border border-white/10">
                <FiShoppingBag size={30} />
              </div>
              <p className="text-white/60 text-sm font-medium">
                Your cart is currently empty
              </p>
              <Button
                type="button"
                onClick={() => onOpenChange(false)}
                className="bg-[#FD6603] hover:bg-[#e55b03] text-white text-xs font-semibold px-6 rounded-full cursor-pointer"
                size="sm"
              >
                Shop Now
              </Button>
            </div>
          ) : (
            <div className="py-2">
              {items.map((item) => (
                <CartItemRow key={item.product.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Sticky Drawer Footer */}
        {items.length > 0 && (
          <div className="px-5 py-5 border-t border-white/10 bg-[#090909] space-y-3.5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})</span>
              <span className="text-white font-bold text-base sm:text-lg">
                Tk {totalPrice.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-white/50">
              <span>Delivery</span>
              <span className="text-emerald-400 font-semibold">Free</span>
            </div>

            <Link
              href="/checkout"
              onClick={() => onOpenChange(false)}
              className="w-full flex items-center justify-center gap-2 bg-[#FD6603] hover:bg-[#e55b03] text-white font-bold py-3.5 rounded-xl text-sm transition-all duration-200 active:scale-95 shadow-md shadow-[#FD6603]/30"
            >
              <span>Proceed to Checkout</span>
              <FiArrowRight size={16} />
            </Link>

            <p className="text-white/40 text-[11px] text-center">
              Cash on Delivery available nationwide
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
