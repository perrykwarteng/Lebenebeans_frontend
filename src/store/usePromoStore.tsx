import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Promo = {
  code: string;
  type: string;
  minOrderAmount: number;
  minOrder: number;
  expiresAt: string;
  isActive: boolean;
};

export interface PromoType {
  promo: Promo;
  setPromo: (p: Promo) => void;
  clearPromo: () => void;
}

const defaultPromo: Promo = {
  code: "",
  type: "",
  minOrderAmount: 0,
  minOrder: 0,
  expiresAt: "",
  isActive: false,
};

export const usePromoStore = create<PromoType>()(
  persist(
    (set) => ({
      promo: defaultPromo,

      setPromo: (promotion) => {
        set(() => ({
          promo: promotion,
        }));
      },

      clearPromo: () => {
        set(() => ({
          promo: defaultPromo,
        }));
      },
    }),
    {
      name: "promo",
    },
  ),
);
