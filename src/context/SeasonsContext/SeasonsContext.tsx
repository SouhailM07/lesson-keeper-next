"use client";
import { API_APP_URL } from "@/lib/API_APP_URL";
import seasonsStore from "@/zustand/seasons.store";
import axios from "axios";
import { createContext, useContext } from "react";

const SeasonsContext = createContext({});

export default function SeasonsProvider({ children }) {
  //
  const { editSeasons } = seasonsStore((state) => state);
  //
  let fetch_get_seasons = async (userId: string): Promise<void> => {
    try {
      let results = await axios.get(
        `${API_APP_URL}/api/seasons?userId=${userId}`
      );
      editSeasons(results.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SeasonsContext.Provider value={{ fetch_get_seasons }}>
      {children}
    </SeasonsContext.Provider>
  );
}

export const useSeasonsContext = () => useContext(SeasonsContext);
