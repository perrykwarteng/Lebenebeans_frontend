import { create } from "zustand";
import { persist } from "zustand/middleware";

type Guest = {
  name: string;
  phone: string;
};

export interface GuestType {
  guest: Guest;
  setGuest: (guest: Guest) => void;
  clearGuest: () => void;
}

export const useGuestStore = create<GuestType>()(
  persist(
    (set) => ({
      guest: {
        name: "",
        phone: "",
      },

      setGuest: (guest: Guest) => {
        set(() => ({ guest }));
      },

      clearGuest: () => {
        set(() => ({
          guest: {
            name: "",
            phone: "",
          },
        }));
      },
    }),
    {
      name: "guest",
    },
  ),
);
