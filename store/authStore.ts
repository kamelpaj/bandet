import { Session } from "@supabase/supabase-js";
import create from "zustand";

interface AuthState {
  session: Session | null;
  setAuthSession: (session: Session | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  setAuthSession: (session) => set(() => ({ session })),
}));
