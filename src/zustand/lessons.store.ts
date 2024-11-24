import { create } from "zustand";

interface ILessonsStoreProps {
  lessons: any;
  editLessons: (st) => void;
}

const lessonsStore = create<ILessonsStoreProps>((set) => ({
  lessons: [],
  editLessons: (st) => set({ lessons: st }),
}));

export default lessonsStore;
