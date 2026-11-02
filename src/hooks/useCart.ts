"use client";

import { useState, useEffect, useCallback } from "react";
import { CartItem, Product } from "@/types/AllTypes";

const CART_KEY = "grabbytech_cart";

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    setItems(loadCart());
  }, []);

  const syncAndSet = useCallback((updater: (prev: CartItem[]) => CartItem[]) => {
    setItems((prev) => {
      const next = updater(prev);
      saveCart(next);
      return next;
    });
  }, []);

  const addItem = useCallback(
    (product: Product, quantity = 1) => {
      syncAndSet((prev) => {
        const existing = prev.find((i) => i.product.id === product.id);
        if (existing) {
          return prev.map((i) =>
            i.product.id === product.id
              ? { ...i, quantity: i.quantity + quantity }
              : i
          );
        }
        return [...prev, { product, quantity }];
      });
    },
    [syncAndSet]
  );

  const removeItem = useCallback(
    (productId: string) => {
      syncAndSet((prev) => prev.filter((i) => i.product.id !== productId));
    },
    [syncAndSet]
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        syncAndSet((prev) => prev.filter((i) => i.product.id !== productId));
      } else {
        syncAndSet((prev) =>
          prev.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i
          )
        );
      }
    },
    [syncAndSet]
  );

  const clearCart = useCallback(() => {
    syncAndSet(() => []);
  }, [syncAndSet]);

  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);
  const totalPrice = items.reduce(
    (acc, i) => acc + i.product.price * i.quantity,
    0
  );

  return { items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice };
}

