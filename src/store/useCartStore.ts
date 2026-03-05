import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem, WishlistItem } from "@/types/product";
import { getProductById } from "@/lib/data/products";

/** Cart state shape for the useCart hook */
export interface CartHookState {
  items: CartItem[];
  wishlist: WishlistItem[];
  isOpen: boolean;
}

/** Return type for the useCart hook */
export interface UseCartReturn {
  state: CartHookState;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, variantId: string) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  updateEngraving: (productId: string, variantId: string, engraving: string) => void;
  clearCart: () => void;
  toggleCart: (open?: boolean) => void;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  cartTotal: number;
  cartCount: number;
  wishlistCount: number;
}

interface CartState {
  // State
  items: CartItem[];
  wishlist: WishlistItem[];
  isOpen: boolean;

  // Cart Actions
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, variantId: string) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  updateEngraving: (productId: string, variantId: string, engraving: string) => void;
  clearCart: () => void;

  // Cart Drawer Actions
  toggleCart: (open?: boolean) => void;
  openCart: () => void;
  closeCart: () => void;

  // Wishlist Actions
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;

  // Computed Getters
  getCartTotal: () => number;
  getCartCount: () => number;
  getWishlistCount: () => number;
  getItemQuantity: (productId: string, variantId: string) => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      // Initial State
      items: [],
      wishlist: [],
      isOpen: false,

      // Cart Actions
      addItem: (item) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) => i.productId === item.productId && i.variantId === item.variantId
          );

          if (existingIndex > -1) {
            const newItems = [...state.items];
            newItems[existingIndex] = {
              ...newItems[existingIndex],
              quantity: newItems[existingIndex].quantity + item.quantity,
            };
            return { items: newItems, isOpen: true };
          }

          return { items: [...state.items, item], isOpen: true };
        });
      },

      removeItem: (productId, variantId) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.productId === productId && item.variantId === variantId)
          ),
        }));
      },

      updateQuantity: (productId, variantId, quantity) => {
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter(
                (item) => !(item.productId === productId && item.variantId === variantId)
              ),
            };
          }

          return {
            items: state.items.map((item) =>
              item.productId === productId && item.variantId === variantId
                ? { ...item, quantity }
                : item
            ),
          };
        });
      },

      updateEngraving: (productId, variantId, engraving) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId && item.variantId === variantId
              ? { ...item, engraving }
              : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      // Cart Drawer Actions
      toggleCart: (open) => {
        set((state) => ({ isOpen: open ?? !state.isOpen }));
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      // Wishlist Actions
      addToWishlist: (productId) => {
        set((state) => {
          if (state.wishlist.some((item) => item.productId === productId)) {
            return state;
          }
          return {
            wishlist: [
              ...state.wishlist,
              { productId, addedAt: new Date().toISOString() },
            ],
          };
        });
      },

      removeFromWishlist: (productId) => {
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.productId !== productId),
        }));
      },

      isInWishlist: (productId) => {
        return get().wishlist.some((item) => item.productId === productId);
      },

      clearWishlist: () => {
        set({ wishlist: [] });
      },

      // Computed Getters
      getCartTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          const product = getProductById(item.productId);
          if (!product) return total;
          const variant = product.variants.find((v) => v.id === item.variantId);
          if (!variant) return total;
          return total + variant.price * item.quantity;
        }, 0);
      },

      getCartCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },

      getWishlistCount: () => {
        return get().wishlist.length;
      },

      getItemQuantity: (productId, variantId) => {
        const item = get().items.find(
          (i) => i.productId === productId && i.variantId === variantId
        );
        return item?.quantity ?? 0;
      },
    }),
    {
      name: "lustorri-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        wishlist: state.wishlist,
      }),
    }
  )
);

// Selectors for optimized re-renders
export const selectCartItems = (state: CartState) => state.items;
export const selectWishlist = (state: CartState) => state.wishlist;
export const selectIsCartOpen = (state: CartState) => state.isOpen;

// Hook for backward compatibility with existing useCart pattern
export function useCart(): UseCartReturn {
  const store = useCartStore();

  return {
    state: {
      items: store.items,
      wishlist: store.wishlist,
      isOpen: store.isOpen,
    },
    addItem: store.addItem,
    removeItem: store.removeItem,
    updateQuantity: store.updateQuantity,
    updateEngraving: store.updateEngraving,
    clearCart: store.clearCart,
    toggleCart: store.toggleCart,
    addToWishlist: store.addToWishlist,
    removeFromWishlist: store.removeFromWishlist,
    isInWishlist: store.isInWishlist,
    cartTotal: store.getCartTotal(),
    cartCount: store.getCartCount(),
    wishlistCount: store.getWishlistCount(),
  };
}
