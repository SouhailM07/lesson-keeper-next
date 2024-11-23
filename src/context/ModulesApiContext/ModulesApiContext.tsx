"use client";
import { API_APP_URL } from "@/lib/API_APP_URL";
import axios from "axios";
import { useContext, createContext } from "react";

const ModulesApiContext = createContext({});

export default function ModulesApiContextProvider({ seasonId, children }) {
  const handleOnSubmit__Create = async (values) => {
    try {
      let res = await axios.post(`${API_APP_URL}/api/modules`, {
        ...values,
        seasonBy: seasonId,
      });
      // await to update the list
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ModulesApiContext.Provider value={{ seasonId, handleOnSubmit__Create }}>
      {children}
    </ModulesApiContext.Provider>
  );
}

export const useModulesApiContext = () => useContext(ModulesApiContext);
