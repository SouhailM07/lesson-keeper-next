"use client";

import AddNewItem, { AddNew_e } from "@/components/atoms/AddNewItem/AddNewItem";
import LessonRenderItem from "@/components/atoms/LessonRenderItem/LessonRenderItem";
import MyBreadcrumb, {
  IMyBreadcrumb,
} from "@/components/atoms/MyBreadcrumb/MyBreadcrumb";
import MyButton, {
  MyButtonTypes_e,
} from "@/components/atoms/MyButton/MyButton";
import { useLessonApiContext } from "@/context/LessonsApiContext/LessonsApiContext";
import { useModulesApiContext } from "@/context/ModulesApiContext/ModulesApiContext";
import lessonsStore from "@/zustand/lessons.store";
import {
  faArrowRight,
  faList,
  faTableCells,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function LessonsContainer() {
  const router = useRouter();
  const { lessons } = lessonsStore((state) => state);
  const { fetch_get_lessons }: any = useLessonApiContext();

  const [orderOption, setOrderOption] = useState<number>(0);

  const OrderOptions = ["inline_lessons", "table_lessons"];

  useEffect(() => {
    fetch_get_lessons();
    console.log("check render");
  }, []);

  const breadcrumbs: IMyBreadcrumb = {
    mainPage: "Lessons",
    links: [
      { link: "/", label: "need to solve" },
      { link: "/", label: "need to solve" },
      { link: "/", label: "Lessons" },
    ],
  };
  return (
    <section className="section-container">
      <article className="flexBetween">
        <MyBreadcrumb {...breadcrumbs} />
        <MyButton
          onClick={() => router.back()}
          icon={faArrowRight}
          buttonType={MyButtonTypes_e.WithIcon}
          className="bg-gray-300"
        >
          Back
        </MyButton>
      </article>

      <div className="flex justify-end">
        <div className="border border-black text-[1.2rem] w-[5rem] justify-center rounded-sm h-[2rem] flex gap-x-[1rem] items-center">
          <FontAwesomeIcon
            icon={faTableCells}
            onClick={() => setOrderOption(0)}
          />
          <FontAwesomeIcon icon={faList} onClick={() => setOrderOption(1)} />
        </div>
      </div>

      <div className={`mx-auto max-w-[50rem] ${OrderOptions[orderOption]}`}>
        {lessons.map((e, i) => (
          <LessonRenderItem key={i} {...e} />
        ))}
        <AddNewItem addNew={AddNew_e.Lesson} />
      </div>
    </section>
  );
}
