"use client";
import AddNewItem, { AddNew_e } from "@/components/atoms/AddNewItem/AddNewItem";
import FUNC_BUTTON, {
  FUNC_BUTTON_e,
} from "@/components/atoms/FUNC_BUTTON/FUNC_BUTTON";
import ModuleRenderItem from "@/components/atoms/ModuleRenderItem/ModuleRenderItem";
import MyBreadcrumb, {
  IMyBreadcrumb,
} from "@/components/atoms/MyBreadcrumb/MyBreadcrumb";
import { useModulesApiContext } from "@/context/ModulesApiContext/ModulesApiContext";
// import modulesStore from "@/zustand/modules.store";
// import { useEffect } from "react";

export default function ModulesContainer({ moduleData }) {
  const { seasonTitle }: any = useModulesApiContext();
  // const { modules } = modulesStore((state) => state);
  const breadcrumbs: IMyBreadcrumb = {
    mainPage: "Modules",
    links: [
      { link: "/", label: seasonTitle },
      { link: "#", label: "Modules" },
    ],
  };
  // useEffect(() => {
  // fetch_get_modules();
  // }, []);
  return (
    <section className="section-container">
      <article className="flexBetween">
        <MyBreadcrumb {...breadcrumbs} />
        <FUNC_BUTTON buttonType={FUNC_BUTTON_e.Back} />
      </article>
      <ul role="list" className="flex gap-[1rem] flex-wrap">
        {moduleData.map((e, i) => (
          <ModuleRenderItem
            title={e.name}
            mentor_name={e.mentor_name}
            id={e._id}
            lessonLen={10}
            key={i}
          />
        ))}
        <AddNewItem addNew={AddNew_e.Module} />
      </ul>
    </section>
  );
}
