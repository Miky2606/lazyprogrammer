import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface AccountStore {
  token: string | undefined;
  getToken: () => void;
  createToken: (tok: string) => void;
}

export const useAccountStore = create<AccountStore>()(
  persist(
    (set, get) => ({
      token: undefined,
      getToken: () => set({ token: get().token }),
      createToken: (tok) => set({ token: tok }),
    }),

    {
      name: "token",

      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
