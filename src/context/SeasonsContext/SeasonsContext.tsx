"use client";
import { API_APP_URL } from "@/lib/API_APP_URL";
import loadingStore from "@/zustand/loading.store";
import modulesStore from "@/zustand/modules.store";
import seasonsStore from "@/zustand/seasons.store";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { createContext, useContext } from "react";

const SeasonsContext = createContext({});

export default function SeasonsProvider({ children }) {
  //
  const { user }: any = useUser();
  const { editSeasons } = seasonsStore((state) => state);
  const { editModules } = modulesStore();
  const { editLoading } = loadingStore();

  //

  const reset_modules_store = () => editModules([]);

  let fetch_get_seasons = async (): Promise<void> => {
    try {
      editLoading(true);
      let results = await axios.get(
        `${API_APP_URL}/api/seasons?userId=${user?.id}`
      );
      editSeasons(results.data);
      editLoading(false);
    } catch (error) {
      editLoading(false);
      console.log(error);
    }
  };
  const handleOnSubmit__Create = async (values) => {
    try {
      editLoading(true);
      let res = await axios.post(`${API_APP_URL}/api/seasons`, {
        ...values,
        userId: user?.id,
      });
      await fetch_get_seasons();
      console.log(res);
    } catch (error) {
      editLoading(false);
      console.log(error);
    }
  };
  const handleOnSubmit__Edit = async (values, itemId) => {
    try {
      editLoading(true);
      let res = await axios.put(
        `${API_APP_URL}/api/seasons?id=${itemId}`,
        values
      );
      await fetch_get_seasons();
      console.log(res);
    } catch (error) {
      editLoading(false);
      console.log(error);
    }
  };
  const fetch_delete_season = async (itemId: string): Promise<void> => {
    try {
      editLoading(true);
      let res = await axios.delete(`${API_APP_URL}/api/seasons?id=${itemId}`);
      await fetch_get_seasons();
      console.log(res.data);
    } catch (error) {
      editLoading(false);
      console.log(error);
    }
  };
  return (
    <SeasonsContext.Provider
      value={{
        reset_modules_store,
        fetch_get_seasons,
        handleOnSubmit__Create,
        handleOnSubmit__Edit,
        fetch_delete_season,
      }}
    >
      {children}
    </SeasonsContext.Provider>
  );
}

export const useSeasonsContext = () => useContext(SeasonsContext);
