"use client";
import { API_APP_URL } from "@/lib/API_APP_URL";
import modulesStore from "@/zustand/modules.store";
import axios from "axios";
import { useContext, createContext } from "react";

const ModulesApiContext = createContext({});

export default function ModulesApiContextProvider({ seasonId, children }) {
  const { editModules } = modulesStore();

  const fetch_get_modules = async () => {
    try {
      let res = await axios.get(
        `${API_APP_URL}/api/modules?seasonId=${seasonId}`
      );
      editModules(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnSubmit__Create = async (values) => {
    try {
      let res = await axios.post(`${API_APP_URL}/api/modules`, {
        ...values,
        seasonBy: seasonId,
      });
      await fetch_get_modules();
      // await to update the list
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnSubmit__Edit = async (values, itemId) => {
    try {
      const res = await axios.put(
        `${API_APP_URL}/api/modules?id=${itemId}`,
        values
      );
      await fetch_get_modules();
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetch_delete_module = async (itemId) => {
    try {
      let res = await axios.delete(`${API_APP_URL}/api/modules?id=${itemId}`);
      await fetch_get_modules();
      console.log(res.data);
    } catch (error) {
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
