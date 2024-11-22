import { create } from "zustand";

interface ISeasonsStoreProps {
  seasons: any;
  editSeasons: (st: any) => void;
}

const seasonsStore = create<ISeasonsStoreProps>((set) => ({
  seasons: [],
  editSeasons: (st) => set({ seasons: st }),
}));

export default seasonsStore;
