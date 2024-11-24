"use client";
import { API_APP_URL } from "@/lib/API_APP_URL";
import loadingStore from "@/zustand/loading.store";
import modulesStore from "@/zustand/modules.store";
import axios from "axios";
import { useContext, createContext } from "react";

const ModulesApiContext = createContext({});

export default function ModulesApiContextProvider({ seasonId, children }) {
  const { editModules } = modulesStore();
  const { editLoading } = loadingStore();

  const fetch_get_modules = async () => {
    try {
      editLoading(true);
      let res = await axios.get(
        `${API_APP_URL}/api/modules?seasonId=${seasonId}`
      );
      editModules(res.data);
      editLoading(false);
    } catch (error) {
      editLoading(false);
      console.log(error);
    }
  };
  const handleOnSubmit__Create = async (values) => {
    try {
      editLoading(true);
      let res = await axios.post(`${API_APP_URL}/api/modules`, {
        ...values,
        seasonBy: seasonId,
      });
      await fetch_get_modules();
      // await to update the list
      console.log(res.data);
    } catch (error) {
      editLoading(false);
      console.log(error);
    }
  };
  const handleOnSubmit__Edit = async (values, itemId) => {
    try {
      editLoading(true);
      const res = await axios.put(
        `${API_APP_URL}/api/modules?id=${itemId}`,
        values
      );
      await fetch_get_modules();
      console.log(res.data);
    } catch (error) {
      editLoading(false);
      console.log(error);
    }
  };
  const fetch_delete_module = async (itemId) => {
    try {
      editLoading(true);
      let res = await axios.delete(`${API_APP_URL}/api/modules?id=${itemId}`);
      await fetch_get_modules();
      console.log(res.data);
    } catch (error) {
      editLoading(false);
      console.log(error);
    }
  };
  return (
    <ModulesApiContext.Provider
      value={{
        seasonId,
        fetch_get_modules,
        handleOnSubmit__Create,
        handleOnSubmit__Edit,
        fetch_delete_module,
      }}
    >
      {children}
    </ModulesApiContext.Provider>
  );
}

export const useModulesApiContext = () => useContext(ModulesApiContext);
