import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import MyDialog from "../MyDialog/MyDialog";
import ModulesForm from "@/components/molecules/ModulesForm/ModulesForm";
import { useModulesApiContext } from "@/context/ModulesApiContext/ModulesApiContext";

export default function ModuleRenderItem({
  title,
  mentor_name,
  lessonLen,
  id,
}) {
  const { handleOnSubmit__Edit, fetch_delete_module }: any =
    useModulesApiContext();
  return (
    <div className="flex flex-col">
      <Link href={`/module/${title}/${id}`}>
        <button className="border-2 flex flex-col px-[1.2rem] py-3 justify-between items-center  border-gray-600 h-[9rem] rounded-md aspect-video">
          <div className="flex flex-col items-start gap-y-3 w-full h-[4rem]">
            <h1 className="text-[1.3rem] font-medium ">{title}</h1>
            <span>Lessons : {lessonLen}</span>
          </div>
          <p className="text-gray-600 text-[0.8rem] ">{mentor_name}</p>
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
        <ModulesForm
          itemId={id}
          handleDelete={fetch_delete_module}
          handleOnSubmit={handleOnSubmit__Edit}
          defaultValues={{ name: title, mentor_name }}
        />
      </MyDialog>
    </div>
  );
}
