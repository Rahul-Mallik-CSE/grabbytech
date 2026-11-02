"use client";

import Image from "next/image";
import Link from "next/link";
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag } from "react-icons/fi";
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
    <div className="flex gap-3 py-4 border-b border-white/10">
      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
        <Image
          src={product.images[0].url}
          alt={product.images[0].alt}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white line-clamp-2 leading-tight">
          {product.name}
        </p>
        <p className="text-[#FD6603] font-semibold text-sm mt-1">
          ৳{product.price.toLocaleString()}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => updateQuantity(product.id, quantity - 1)}
            className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <FiMinus size={10} className="text-white" />
          </button>
          <span className="text-white text-sm w-5 text-center">{quantity}</span>
          <button
            onClick={() => updateQuantity(product.id, quantity + 1)}
            className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <FiPlus size={10} className="text-white" />
          </button>
          <button
            onClick={() => removeItem(product.id)}
            className="ml-auto text-red-400 hover:text-red-300 transition-colors"
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
        className="bg-[#111111] border-l border-white/10 w-full sm:max-w-sm flex flex-col p-0"
      >
        <SheetHeader className="px-5 pt-5 pb-4 border-b border-white/10">
          <SheetTitle className="text-white flex items-center gap-2">
            <FiShoppingBag size={18} className="text-[#FD6603]" />
            My Cart
            {totalItems > 0 && (
              <span className="ml-auto text-xs bg-[#FD6603] text-white px-2 py-0.5 rounded-full">
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
              <FiShoppingBag size={48} className="text-white/20" />
              <p className="text-white/50 text-sm">Your cart is empty</p>
              <Button
                onClick={() => onOpenChange(false)}
                className="bg-[#FD6603] hover:bg-[#e55b03] text-white text-sm"
                size="sm"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div>
              {items.map((item) => (
                <CartItemRow key={item.product.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-5 py-5 border-t border-white/10 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">Subtotal ({totalItems} items)</span>
              <span className="text-white font-semibold text-base">
                ৳{totalPrice.toLocaleString()}
              </span>
            </div>
            <p className="text-white/40 text-xs">
              Free delivery across Bangladesh
            </p>
            <Link href="/checkout" onClick={() => onOpenChange(false)}>
              <Button className="w-full bg-[#FD6603] hover:bg-[#e55b03] text-white font-semibold h-11 rounded-lg text-sm">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

