import { create } from "zustand";

interface lessons_layout_i {
  lessons_layout: number;
  edit_lessons_layout: (st: number) => void;
}

const lessons_layout_store = create<lessons_layout_i>((set) => ({
  lessons_layout: 0,
  edit_lessons_layout: (st) => set({ lessons_layout: st }),
}));

export default lessons_layout_store;
