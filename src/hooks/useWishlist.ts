"use client";

import { useCallback, useMemo } from "react";
import { useCart } from "@/store/useCartStore";

/**
 * Custom hook for wishlist functionality
 * Centralizes wishlist logic to avoid duplication
 */
export function useWishlist(productId?: string) {
  const { state, addToWishlist, removeFromWishlist } = useCart();

  // Check if a specific product is in wishlist
  const isInWishlist = useMemo(() => {
    if (!productId) return false;
    return state.wishlist.some((item) => item.productId === productId);
  }, [state.wishlist, productId]);

  // Check if any product is in wishlist (by ID)
  const checkIsInWishlist = useCallback(
    (id: string): boolean => {
      return state.wishlist.some((item) => item.productId === id);
    },
    [state.wishlist]
  );

  // Toggle wishlist status for a product
  const toggleWishlist = useCallback(
    (id?: string) => {
      const targetId = id || productId;
      if (!targetId) return;

      const inWishlist = state.wishlist.some(
        (item) => item.productId === targetId
      );

      if (inWishlist) {
        removeFromWishlist(targetId);
      } else {
        addToWishlist(targetId);
      }
    },
    [productId, state.wishlist, addToWishlist, removeFromWishlist]
  );

  // Get wishlist count
  const wishlistCount = useMemo(() => state.wishlist.length, [state.wishlist]);

  // Get all wishlist items
  const wishlistItems = useMemo(() => state.wishlist, [state.wishlist]);

  return {
    /** Whether the current product (if productId provided) is in wishlist */
    isInWishlist,
    /** Check if a specific product ID is in wishlist */
    checkIsInWishlist,
    /** Toggle wishlist status for the current or specified product */
    toggleWishlist,
    /** Add a product to wishlist */
    addToWishlist,
    /** Remove a product from wishlist */
    removeFromWishlist,
    /** Total number of items in wishlist */
    wishlistCount,
    /** All wishlist items */
    wishlistItems,
  };
}

export type UseWishlistReturn = ReturnType<typeof useWishlist>;
