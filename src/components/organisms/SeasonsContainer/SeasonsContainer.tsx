"use client";
import "./styles.css";
import { useAuth, useUser } from "@clerk/nextjs";
import PageTitle from "@/components/atoms/PageTitle/PageTitle";
import NotSigned from "@/components/atoms/NotSigned/NotSigned";
import { useEffect } from "react";
import seasonsStore from "@/zustand/seasons.store";
import { useSeasonsContext } from "@/context/SeasonsContext/SeasonsContext";
import AddNewItem, { AddNew_e } from "@/components/atoms/AddNewItem/AddNewItem";
import SeasonRenderItem from "@/components/atoms/SeasonRenderItem/SeasonRenderItem";
import MyBreadcrumb, {
  IBreadcrumbLink,
  IMyBreadcrumb,
} from "@/components/atoms/MyBreadcrumb/MyBreadcrumb";

export default function SeasonsContainer() {
  const { seasons } = seasonsStore((state) => state);
  const { fetch_get_seasons }: any = useSeasonsContext();

  useEffect(() => {
    fetch_get_seasons();
    console.log("check render [SeasonsContainer]");
  }, []);

  // if (!isSignedIn) return <NotSigned />;
  // links label link / main page
  const breadcrumbs: IMyBreadcrumb = {
    mainPage: "Seasons",
    links: [{ link: "/", label: "Seasons" }],
  };
  return (
    <section className="section-container">
      {/* <PageTitle title="Seasons" /> */}
      <MyBreadcrumb {...breadcrumbs} />
      <ul className="flex gap-[1rem] flex-wrap ">
        {seasons.map((e, i) => (
          <li key={i}>
            <SeasonRenderItem
              id={e._id}
              itemId={e._id}
              title={e.name}
              modulesLen={10}
              duration={e.duration}
            />
          </li>
        ))}
        <AddNewItem addNew={AddNew_e.Section} />
      </ul>
    </section>
  );
}
