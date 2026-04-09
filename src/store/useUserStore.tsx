import { create } from "zustand";
import { persist } from "zustand/middleware";

type userInfo = {
  name: string;
  email: string;
  role: string;
};

interface User {
  user: userInfo;
  setUser: (user: userInfo) => void;
}

export const useUserStore = create<User>()(
  persist(
    (set) => ({
      user: {
        name: "",
        email: "",
        role: "",
      },
      setUser: (userDetails: userInfo) => {
        set(() => ({ user: userDetails }));
      },
    }),
    {
      name: "user-info",
    },
  ),
);
