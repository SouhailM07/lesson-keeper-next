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
  faSearch,
  faTableCells,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function LessonsContainer() {
  const router = useRouter();
  const { lessons } = lessonsStore((state) => state);
  const { fetch_get_lessons }: any = useLessonApiContext();
  const [lessonsSearch, setLessonsSearch] = useState<string>("");
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
    <section className="">
      <div className="p-3 space-y-[1rem]">
        <article className="flexBetween ">
          <MyBreadcrumb {...breadcrumbs} />
          <button className="bg-black text-white px-4 py-2 rounded-sm">
            Back
          </button>
        </article>
        <LessonsTopPanel
          {...{ lessonsSearch, setLessonsSearch, lessons, setOrderOption }}
        />
      </div>

      <div
        className={`px-[2rem] pb-[1rem] mx-auto ${OrderOptions[orderOption]}`}
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

const LessonsLayout = ({ setOrderOption }) => {
  return (
    <div className="flex justify-end">
      <div className="border border-gray-300 text-[1.2rem] w-[5rem] justify-center rounded-sm h-[2.3rem] flex gap-x-[1rem] items-center">
        <FontAwesomeIcon
          icon={faTableCells}
          onClick={() => setOrderOption(0)}
        />
        <FontAwesomeIcon icon={faList} onClick={() => setOrderOption(1)} />
      </div>
    </div>
  );
};

const LessonsTopPanel = ({
  lessonsSearch,
  setLessonsSearch,
  lessons,
  setOrderOption,
}) => {
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
      <LessonsLayout setOrderOption={setOrderOption} />
    </article>
  );
};
