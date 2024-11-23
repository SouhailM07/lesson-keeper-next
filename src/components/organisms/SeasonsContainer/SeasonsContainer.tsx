"use client";
import "./styles.css";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth, useUser } from "@clerk/nextjs";
import PageTitle from "@/components/atoms/PageTitle/PageTitle";
import NotSigned from "@/components/atoms/NotSigned/NotSigned";
import MyDialog from "@/components/atoms/MyDialog/MyDialog";
import { useEffect } from "react";
import seasonsStore from "@/zustand/seasons.store";
import { useSeasonsContext } from "@/context/SeasonsContext/SeasonsContext";
import SeasonsForm from "@/components/molecules/SeasonsForm/SeasonsForm";
import Link from "next/link";
import AddNewItem, { AddNew_e } from "@/components/atoms/AddNewItem/AddNewItem";
import SeasonRenderItem from "@/components/atoms/SeasonRenderItem/SeasonRenderItem";

export default function SeasonsContainer() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const { seasons } = seasonsStore((state) => state);
  const { fetch_get_seasons }: any = useSeasonsContext();
  useEffect(() => {
    user?.id && fetch_get_seasons(user.id);
    console.log("check render [SeasonsContainer]");
  }, [user]);

  if (!isSignedIn) return <NotSigned />;
  return (
    <section className="section-container">
      <PageTitle title="Seasons" />
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
