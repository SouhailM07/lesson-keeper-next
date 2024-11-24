import {
  faDownload,
  faGear,
  faBars,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MyDialog from "../MyDialog/MyDialog";
import LessonsForm from "@/components/molecules/LessonsForm/LessonsForm";
import { useLessonApiContext } from "@/context/LessonsApiContext/LessonsApiContext";
import FileType, { fileTypes_e } from "../FileType/FileType";

export default function LessonRenderItem({ name, _id, file }) {
  const { fetch_delete_lesson }: any = useLessonApiContext();
  return (
    <div>
      <FileType fileType={fileTypes_e[file.fileMimiType]} />
      <div className="p-[1rem] mx-auto max-w-[50rem] border rounded-sm border-gray-500 h-[2.6rem] flexBetween">
        <p>{name}</p>
        <div className="flex items-center gap-x-[1.5rem] text-[1.1rem]">
          <a href="#">
            <FontAwesomeIcon icon={faEye} />
          </a>
          <a href={file.fileUrl}>
            <FontAwesomeIcon icon={faDownload} />
          </a>
          <MyDialog
            title="Edit Lesson"
            trigger={<FontAwesomeIcon role="button" icon={faGear} />}
          >
            <LessonsForm
              itemId={_id}
              fileId={file.fileId}
              handleOnSubmit={() => {}}
              handleDelete={fetch_delete_lesson}
              defaultValues={{ name, file: undefined }}
            />
          </MyDialog>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
    </div>
  );
}
