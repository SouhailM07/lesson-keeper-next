"use client";
import AddNewItem, { AddNew_e } from "@/components/atoms/AddNewItem/AddNewItem";
import ModuleRenderItem from "@/components/atoms/ModuleRenderItem/ModuleRenderItem";
import PageTitle from "@/components/atoms/PageTitle/PageTitle";
import { useModulesApiContext } from "@/context/ModulesApiContext/ModulesApiContext";
import modulesStore from "@/zustand/modules.store";
import Link from "next/link";
import { useEffect } from "react";

export default function ModulesContainer() {
  const { fetch_get_modules }: any = useModulesApiContext();
  const { modules } = modulesStore((state) => state);
  useEffect(() => {
    fetch_get_modules();
  }, []);
  return (
    <section className="section-container">
      <article className="flexBetween">
        <PageTitle title="Modules" />
        <Link href="/">back</Link>
      </article>
      <ul className="flex gap-[1rem] flex-wrap">
        {modules.map((e, i) => (
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
