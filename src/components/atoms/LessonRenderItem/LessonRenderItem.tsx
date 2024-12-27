import {
  faDownload,
  faGear,
  faBars,
  faEye,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MyDialog from "../MyDialog/MyDialog";
import LessonsForm from "@/components/molecules/LessonsForm/LessonsForm";
import { useLessonApiContext } from "@/context/LessonsApiContext/LessonsApiContext";
import FileType, { fileTypes_e } from "../FileType/FileType";
import MyPopover from "../MyPopover/MyPopover";

export default function LessonRenderItem({ name, _id, file }) {
  const { fetch_delete_lesson, handleOnSubmit__Edit }: any =
    useLessonApiContext();
  return (
    <div className="w-full">
      <FileType fileType={fileTypes_e[file.fileMimiType]} />
      <div className="p-[1rem] border rounded-sm border-gray-500 h-[2.6rem] flexBetween">
        <p>{name}</p>
        <LessonControls_2
          {...{ file, _id, fetch_delete_lesson, handleOnSubmit__Edit }}
        />
      </div>
    </div>
  );
}

const LessonControls_1 = (props) => {
  return (
    <div className="flex items-center gap-x-[1.5rem] text-[1.1rem]">
      <a href={props.file.filePreview} target="__blank">
        <FontAwesomeIcon icon={faEye} />
      </a>
      <a href={props.file.fileUrl}>
        <FontAwesomeIcon icon={faDownload} />
      </a>
      <MyDialog
        title="Edit Lesson"
        trigger={<FontAwesomeIcon role="button" icon={faGear} />}
      >
        <LessonsForm
          itemId={props._id}
          fileId={props.file.fileId}
          handleOnSubmit={props.handleOnSubmit__Edit}
          handleDelete={props.fetch_delete_lesson}
          defaultValues={{ name, file: props.file.fileUrl }}
        />
      </MyDialog>
      <FontAwesomeIcon icon={faBars} />
    </div>
  );
};

const LessonControls_2 = (props) => {
  return (
    <MyPopover
      className="w-[10rem] translate-x-[-4rem]"
      triggerLabel={<FontAwesomeIcon icon={faEllipsisVertical} />}
    >
      <div className="flex flex-col gap-y-[0.7rem]">
        <a
          className="grid grid-cols-[2rem_1fr] items-center"
          href={props.file.filePreview}
          target="__blank"
        >
          <FontAwesomeIcon icon={faEye} />
          <span>Preview </span>
        </a>
        <a
          className="grid grid-cols-[2rem_1fr] items-center"
          href={props.file.fileUrl}
        >
          <FontAwesomeIcon icon={faDownload} />
          <span>Download </span>
        </a>
        <MyDialog
          title="Edit Lesson"
          trigger={
            <button className="text-start grid grid-cols-[2rem_1fr] items-center">
              <FontAwesomeIcon role="button" icon={faGear} />
              <span>Edit Lesson</span>
            </button>
          }
        >
          <LessonsForm
            itemId={props._id}
            fileId={props.file.fileId}
            handleOnSubmit={props.handleOnSubmit__Edit}
            handleDelete={props.fetch_delete_lesson}
            defaultValues={{ name, file: props.file.fileUrl }}
          />
        </MyDialog>
      </div>
    </MyPopover>
  );
};
