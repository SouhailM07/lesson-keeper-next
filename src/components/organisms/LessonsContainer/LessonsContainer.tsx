"use client";
import AddNewItem, { AddNew_e } from "@/components/atoms/AddNewItem/AddNewItem";
import LessonRenderItem from "@/components/atoms/LessonRenderItem/LessonRenderItem";
import PageTitle from "@/components/atoms/PageTitle/PageTitle";
import { useLessonApiContext } from "@/context/LessonsApiContext/LessonsApiContext";
import lessonsStore from "@/zustand/lessons.store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LessonsContainer() {
  const router = useRouter();
  const { lessons } = lessonsStore((state) => state);
  const { fetch_get_lessons }: any = useLessonApiContext();
  useEffect(() => {
    fetch_get_lessons();
  }, []);
  // TODO Guardian
  //  console.log(lessons);
  return (
    <section className="section-container">
      <article className="flexBetween">
        <PageTitle title="Lessons" />
        <button onClick={() => router.back()}>back</button>
      </article>
      <div className="p-2 space-y-[0.7rem]">
        {lessons.map((e, i) => (
          <LessonRenderItem key={i} {...e} />
        ))}
        <AddNewItem addNew={AddNew_e.Lesson} />
      </div>
    </section>
  );
}
