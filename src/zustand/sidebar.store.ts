import { create } from "zustand";

interface ISidebarStore {
  toggleSidebar: boolean;
  editToggleSidebar: (st: boolean) => void;
}

const sidebarStore = create<ISidebarStore>((set) => ({
  toggleSidebar: false,
  editToggleSidebar: (st) => set({ toggleSidebar: st }),
}));

export default sidebarStore;
