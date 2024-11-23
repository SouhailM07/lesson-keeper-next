"use client";
import AddNewItem, { AddNew_e } from "@/components/atoms/AddNewItem/AddNewItem";
import LessonRenderItem from "@/components/atoms/LessonRenderItem/LessonRenderItem";
import PageTitle from "@/components/atoms/PageTitle/PageTitle";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LessonsContainer() {
  const router = useRouter();
  return (
    <section className="section-container">
      <article className="flexBetween">
        <PageTitle title="Lessons" />
        <button onClick={() => router.back()}>back</button>
      </article>
      <div className="p-2 space-y-[1rem]">
        <LessonRenderItem />
        <LessonRenderItem />
        <LessonRenderItem />
        <AddNewItem addNew={AddNew_e.Lesson} />
      </div>
    </section>
  );
}
