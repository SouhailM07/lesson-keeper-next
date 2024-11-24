"use client";
import { API_APP_URL } from "@/lib/API_APP_URL";
import { deleteFile, uploadFile } from "@/lib/appwriteHandlers";
import lessonsStore from "@/zustand/lessons.store";
import loadingStore from "@/zustand/loading.store";
import axios from "axios";
import { createContext, useContext } from "react";

export const LessonsApiContext: any = createContext({});

export default function LessonsApiContextProvider({
  moduleId,
  moduleTitle,
  children,
}) {
  const { editLessons } = lessonsStore((state) => state);
  const { editLoading } = loadingStore((state) => state);

  const fetch_get_lessons = async () => {
    try {
      editLoading(true);
      let res = await axios.get(
        `${API_APP_URL}/api/lessons?moduleId=${moduleId}`
      );
      editLessons(res.data);
      editLoading(false);
    } catch (error) {
      editLoading(false);
      console.log(error);
    }
  };
  const handleOnSubmit__Create = async (values) => {
    try {
      editLoading(true);
      let fileRes = await uploadFile(values.file);
      let postValues = {
        name: values.name,
        moduleBy: moduleId,
        file: {
          fileName: fileRes?.name,
          fileId: fileRes?.$id,
          fileMimiType: fileRes?.mimeType,
          fileUrl: fileRes?.fileHref,
        },
      };
      let res = await axios.post(`${API_APP_URL}/api/lessons`, postValues);
      await fetch_get_lessons();
      console.log(res.data);
    } catch (error) {
      editLoading(false);
      console.log(error);
    }
  };
  const fetch_delete_lesson = async (itemId: string, fileId: string) => {
    try {
      editLoading(true);
      await deleteFile(fileId);
      const res = await axios.delete(`${API_APP_URL}/api/lessons?id=${itemId}`);
      await fetch_get_lessons();
      console.log(res.data);
    } catch (error) {
      editLoading(false);
      console.log(error);
    }
  };
  return (
    <LessonsApiContext.Provider
      value={{
        moduleId,
        fetch_get_lessons,
        fetch_delete_lesson,
        handleOnSubmit__Create,
      }}
    >
      {children}
    </LessonsApiContext.Provider>
  );
}

export const useLessonApiContext = () => useContext(LessonsApiContext);
