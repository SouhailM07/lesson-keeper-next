"use client";
import { useContext, createContext } from "react";
import { API_APP_URL } from "@/lib/API_APP_URL";
import axios from "axios";
import { useSeasonsContext } from "../SeasonsContext/SeasonsContext";
import { useUser } from "@clerk/nextjs";

const SeasonsFormContext = createContext({});

export default function SeasonsFormProvider({ children }) {
  const { fetch_get_seasons }: any = useSeasonsContext();
  const { user } = useUser();
  const handleOnSubmit__Create = async (values, userId) => {
    try {
      let res = await axios.post(`${API_APP_URL}/api/seasons`, {
        ...values,
        userId,
      });
      await fetch_get_seasons(user?.id);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnSubmit__Edit = async (values, itemId) => {
    try {
      let res = await axios.put(
        `${API_APP_URL}/api/seasons?id=${itemId}`,
        values
      );
      await fetch_get_seasons(user?.id);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SeasonsFormContext.Provider
      value={{ handleOnSubmit__Create, handleOnSubmit__Edit }}
    >
      {children}
    </SeasonsFormContext.Provider>
  );
}

export const useSeasonsFormContext = () => useContext(SeasonsFormContext);
