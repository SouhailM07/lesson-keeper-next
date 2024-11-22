"use client";
import "./styles.css";
import {
  faEllipsisVertical,
  faListDots,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth, useUser } from "@clerk/nextjs";
import PageTitle from "@/components/atoms/PageTitle/PageTitle";
import NotSigned from "@/components/atoms/NotSigned/NotSigned";
import MyDialog from "@/components/atoms/MyDialog/MyDialog";
import SeasonForm__Create from "@/components/molecules/SeasonForm__Create/SeasonForm__Create";
import { useEffect } from "react";
import seasonsStore from "@/zustand/seasons.store";
import axios from "axios";
import { API_APP_URL } from "@/lib/API_APP_URL";
import { useSeasonsContext } from "@/context/SeasonsContext/SeasonsContext";

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
    <section className="space-y-3 h-[25rem] py-[1rem] px-[2rem]">
      <PageTitle title="Seasons" />
      <ul className="flex gap-[1rem] flex-wrap ">
        <RenderItem
          title="S1"
          modulesLen={10}
          duration="from 20/10/2024 to 20/03/2025"
        />
        {seasons.map((e, i) => (
          <li key={i}>
            <RenderItem title={e.name} modulesLen={10} duration={e.duration} />
          </li>
        ))}
        <PlusSeason />
      </ul>
    </section>
  );
}

const RenderItem = ({
  title,
  modulesLen,
  duration,
}: {
  title: string;
  modulesLen: number;
  duration: any;
}) => {
  return (
    <div className="flex flex-col">
      <button className="border-2 flex flex-col p-3 justify-between items-center  border-gray-600 h-[8rem] rounded-md aspect-video">
        <div className="flexBetween w-full h-[4rem] px-2">
          <h1 className="text-[1.7rem] font-medium ">{title}</h1>
          <div className="flex flex-col">
            <span>Modules : {modulesLen}</span>
            <span>Lessons : {modulesLen}</span>
          </div>
        </div>
        <p className="text-gray-600 text-[0.8rem] ">{duration}</p>
      </button>
      <MyDialog
        title="Edit Season"
        trigger={
          <button className="absolute self-end text-[1.2rem] text-red-500 p-2">
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>
        }
      >
        <div>sb</div>
      </MyDialog>
    </div>
  );
};

const PlusSeason = () => (
  <MyDialog
    title="New Season"
    trigger={
      <button className="border-2 flexCenter border-gray-600 h-[8rem] rounded-md aspect-video">
        <FontAwesomeIcon icon={faPlus} className="size-[1rem]" />
      </button>
    }
  >
    <SeasonForm__Create />
  </MyDialog>
);
