"use client";

import loadingStore from "@/zustand/loading.store";
import { AnimatePresence, motion } from "framer-motion";

export default function Loading() {
  const { loading } = loadingStore((state) => state);
  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-black/30 h-screen w-full fixed flexCenter z-[100]"
          >
            <div className="size-[10rem] rounded-full border-transparent animate-spin border-[0.6rem] border-t-green-500" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
