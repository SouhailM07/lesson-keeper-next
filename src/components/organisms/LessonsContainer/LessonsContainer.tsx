"use client";

import AddNewItem, { AddNew_e } from "@/components/atoms/AddNewItem/AddNewItem";
import FUNC_BUTTON, {
  FUNC_BUTTON_e,
} from "@/components/atoms/FUNC_BUTTON/FUNC_BUTTON";
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
import lessons_layout_store from "@/zustand/lessons_layout.store";
import {
  faArrowRight,
  faList,
  faSearch,
  faTableCells,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function LessonsContainer() {
  const { lessons } = lessonsStore((state) => state);
  const { fetch_get_lessons }: any = useLessonApiContext();
  const [lessonsSearch, setLessonsSearch] = useState<string>("");
  const { lessons_layout, edit_lessons_layout } = lessons_layout_store();
  const OrderOptions = { 1: "inline_lessons", 0: "table_lessons" };

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
    <section className="">
      <div className="p-3 space-y-[1rem]">
        <article className="flexBetween ">
          <MyBreadcrumb {...breadcrumbs} />
          <FUNC_BUTTON buttonType={FUNC_BUTTON_e.Back} />
        </article>
        <LessonsTopPanel
          {...{ lessonsSearch, setLessonsSearch, lessons, edit_lessons_layout }}
        />
      </div>

      <div
        className={`px-[2rem] pb-[1rem] mx-auto ${OrderOptions[lessons_layout]}`}
      >
        {lessons
          .filter((e) => e.name.includes(lessonsSearch))
          .map((e, i) => (
            <LessonRenderItem key={i} {...e} />
          ))}
        <AddNewItem addNew={AddNew_e.Lesson} />
      </div>
    </section>
  );
}

const LessonsLayout = () => {
  const { lessons_layout, edit_lessons_layout } = lessons_layout_store();
  const lessons_layout_data: { icon: IconDefinition; handler: () => void }[] = [
    { icon: faTableCells, handler: () => edit_lessons_layout(0) },
    { icon: faList, handler: () => edit_lessons_layout(1) },
  ];
  return (
    <div className="flex justify-end">
      <ul className="border overflow-hidden border-gray-300 text-[1.2rem] w-[5rem] justify-center rounded-sm h-[2.3rem] flex items-center">
        {lessons_layout_data.map((e, i) => (
          <li
            className={`${
              i == lessons_layout && "bg-black text-white"
            } w-full h-full grid place-items-center `}
            key={i}
            onClick={e.handler}
          >
            <FontAwesomeIcon role="button" icon={e.icon} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const LessonsTopPanel = ({ lessonsSearch, setLessonsSearch, lessons }) => {
  return (
    <article className=" flex justify-between items-center border border-gray-300 rounded-sm p-2">
      <div className="flex-row-reverse rounded-md flex items-center border border-gray-300 w-[80%] h-[2.3rem]">
        <input
          placeholder="Enter the lesson name"
          className="w-full rounded-md outline-none self-stretch indent-[1rem]"
          value={lessonsSearch}
          onChange={(e) => setLessonsSearch(e.target.value)}
        />
        <FontAwesomeIcon icon={faSearch} className="p-2" />
      </div>
      <div className="min-w-[7rem] text-center">
        Lessons : <span>{lessons.length}</span>
      </div>
      <LessonsLayout />
    </article>
  );
};
