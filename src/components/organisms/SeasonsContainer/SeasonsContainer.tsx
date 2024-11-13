"use client";
import "./styles.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import PageTitle from "@/components/atoms/PageTitle/PageTitle";
import NotSigned from "@/components/atoms/NotSigned/NotSigned";

export default function SeasonsContainer() {
  const { isSignedIn } = useAuth();
  useEffect(() => {
    console.log(isSignedIn);
  }, []);
  if (!isSignedIn) return <NotSigned />;
  return (
    <section className="space-y-3 h-[25rem] p-[2rem]">
      <PageTitle title="Seasons" />
      <ul className="flex gap-x-[1rem]">
        <RenderItem
          title="S1"
          modulesLen={10}
          duration="from 20/10/2024 to 20/03/2025"
        />
        <button className="border-2 flexCenter border-gray-600 h-[8rem] rounded-md aspect-video">
          <FontAwesomeIcon icon={faPlus} />
        </button>
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
  );
};
