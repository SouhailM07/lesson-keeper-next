import { create } from "zustand";

interface ILoading {
  loading: boolean;
  editLoading: (st: boolean) => void;
}

const loadingStore = create<ILoading>((set) => ({
  loading: false,
  editLoading: (st) => set({ loading: st }),
}));

export default loadingStore;
