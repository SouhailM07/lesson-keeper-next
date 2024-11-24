"use client";
import AddNewItem, { AddNew_e } from "@/components/atoms/AddNewItem/AddNewItem";
import LessonRenderItem from "@/components/atoms/LessonRenderItem/LessonRenderItem";
import MyButton, {
  MyButtonTypes_e,
} from "@/components/atoms/MyButton/MyButton";
import PageTitle from "@/components/atoms/PageTitle/PageTitle";
import { useLessonApiContext } from "@/context/LessonsApiContext/LessonsApiContext";
import lessonsStore from "@/zustand/lessons.store";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
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
        <MyButton
          onClick={() => router.back()}
          icon={faArrowRight}
          buttonType={MyButtonTypes_e.WithIcon}
          className="border border-black"
        >
          Back
        </MyButton>
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
