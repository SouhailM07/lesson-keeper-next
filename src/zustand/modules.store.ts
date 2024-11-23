import { create } from "zustand";

interface IModulesStoreProps {
  modules: any;
  editModules: (st: any) => void;
}

const modulesStore = create<IModulesStoreProps>((set) => ({
  modules: [],
  editModules: (st) => set({ modules: st }),
}));

export default modulesStore;
