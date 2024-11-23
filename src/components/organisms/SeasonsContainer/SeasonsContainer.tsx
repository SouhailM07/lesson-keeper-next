"use client";
import "./styles.css";
import { faEllipsisVertical, faPlus } from "@fortawesome/free-solid-svg-icons";
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
        {seasons.map((e, i) => (
          <li key={i}>
            <RenderItem
              id={e._id}
              itemId={e._id}
              title={e.name}
              modulesLen={10}
              duration={e.duration}
            />
          </li>
        ))}
        <PlusSeason />
      </ul>
    </section>
  );
}

const RenderItem = ({
  itemId,
  id,
  title,
  modulesLen,
  duration,
}: {
  id: string;
  title: string;
  modulesLen: number;
  duration: any;
  itemId?: any;
}) => {
  const { handleOnSubmit__Edit, fetch_delete_season }: any =
    useSeasonsContext();

  return (
    <div className="flex flex-col">
      <Link href={`season/${id}`}>
        <button className="border-2 flex flex-col px-[1.2rem] py-3 justify-between items-center  border-gray-600 h-[9rem] rounded-md aspect-video">
          <div className="flexBetween w-full h-[4rem] px-2">
            <h1 className="text-[1.7rem] font-medium ">{title}</h1>
            <div className="flex text-start flex-col">
              <span>Modules : {modulesLen}</span>
              <span>Lessons : {modulesLen}</span>
            </div>
          </div>
          <p className="text-gray-600 text-[0.8rem] ">{duration}</p>
        </button>
      </Link>
      <MyDialog
        title="Edit Season"
        trigger={
          <button className="absolute self-end text-[1.2rem] text-red-500 p-2">
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>
        }
      >
        <SeasonsForm
          itemId={itemId}
          handleOnSubmit={handleOnSubmit__Edit}
          handleDelete={fetch_delete_season}
          defaultValues={{ name: title, duration }}
        />
      </MyDialog>
    </div>
  );
};

const PlusSeason = () => {
  const { handleOnSubmit__Create }: any = useSeasonsContext();
  return (
    <MyDialog
      title="New Season"
      trigger={
        <button className="border-2 flexCenter border-gray-600 h-[9rem] rounded-md aspect-video">
          <FontAwesomeIcon icon={faPlus} className="size-[1rem]" />
        </button>
      }
    >
      <SeasonsForm
        handleOnSubmit={handleOnSubmit__Create}
        defaultValues={{ name: "", duration: undefined }}
      />
    </MyDialog>
  );
};
