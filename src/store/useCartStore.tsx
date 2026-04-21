import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Cart = {
  id: number;
  name: string;
  quantity: number;
  description: string;
  price: number;
  image: string;
};

export interface CartType {
  item: Cart[];
  addCart: (product: Cart) => void;
  removeCart: (id: number) => void;
  clearCart: () => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  changeQty: (id: number, value: number) => void;
}

export const useCartStore = create<CartType>()(
  persist(
    (set) => ({
      item: [],

      addCart: (product) =>
        set((state) => {
          const exist = state.item.find((i) => i.id === product.id);

          if (exist) {
            return {
              item: state.item.map((i) =>
                i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
              ),
            };
          }
          return {
            item: [...state.item, { ...product, quantity: 1 }],
          };
        }),

      removeCart: (id) =>
        set((state) => ({
          item: state.item.filter((i) => i.id !== id),
        })),

      increaseQty: (id) =>
        set((state) => {
          const updatedItems = state.item.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity + 1 } : i,
          );
          return { item: updatedItems };
        }),
      decreaseQty: (id) =>
        set((state) => {
          const updateItems = state.item.map((i) =>
            i.id === id
              ? { ...i, quantity: i.quantity > 1 ? i.quantity - 1 : i.quantity }
              : i,
          );
          return { item: updateItems };
        }),

      changeQty: (id, value) =>
        set((state) => ({
          item: state.item.map((i) =>
            i.id === id
              ? { ...i, quantity: Math.max(0, Number(value) || 1) }
              : i,
          ),
        })),

      clearCart: () => set({ item: [] }),
    }),
    {
      name: "cart",
    },
  ),
);
