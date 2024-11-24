import SeasonsForm from "@/components/molecules/SeasonsForm/SeasonsForm";
import { useSeasonsContext } from "@/context/SeasonsContext/SeasonsContext";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import MyDialog from "../MyDialog/MyDialog";

export default function SeasonRenderItem({
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
}) {
  const { reset_module_store, handleOnSubmit__Edit, fetch_delete_season }: any =
    useSeasonsContext();

  return (
    <div className="flex flex-col">
      <Link onClick={reset_module_store} href={`season/${title}/${id}`}>
        <button className="border-2 flex flex-col px-[1.2rem] py-3 justify-between items-center  border-gray-600 h-[9rem] rounded-md aspect-video">
          <div className="flexBetween w-full h-[4rem] px-4">
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
}
