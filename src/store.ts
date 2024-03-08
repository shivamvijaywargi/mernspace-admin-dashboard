import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface ITenant {
  id: number;
  name: string;
  address: string;
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  tenant?: ITenant;
}

interface IAuthState {
  user: IUser | null;
  setUser: (user: IUser) => void;
  logout: () => void;
}

export const useAuthStore = create<IAuthState>()(
  devtools((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    logout: () => set({ user: null }),
  }))
);
