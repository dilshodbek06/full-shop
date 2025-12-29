import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { WishlistItem } from "@/data/wishlist";
import { wishlistItems as defaultItems } from "@/data/wishlist";

type WishlistStore = {
  items: WishlistItem[];
  setItems: (items: WishlistItem[]) => void;
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  toggleItem: (item: WishlistItem) => void;
  clear: () => void;
};

export const useWishlist = create<WishlistStore>()(
  persist(
    (set) => ({
      items: defaultItems,
      setItems: (items) => set({ items }),
      addItem: (item) =>
        set((state) => {
          const exists = state.items.some((i) => i.id === item.id);
          if (exists) return state;
          return { items: [...state.items, item] };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      toggleItem: (item) =>
        set((state) => {
          const exists = state.items.some((i) => i.id === item.id);
          if (exists) {
            return {
              items: state.items.filter((i) => i.id !== item.id),
            };
          }
          return { items: [...state.items, item] };
        }),
      clear: () => set({ items: [] }),
    }),
    {
      name: "wishlist-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);
