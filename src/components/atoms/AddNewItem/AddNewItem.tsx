import SeasonsForm from "@/components/molecules/SeasonsForm/SeasonsForm";
import { useSeasonsContext } from "@/context/SeasonsContext/SeasonsContext";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MyDialog from "../MyDialog/MyDialog";

export enum AddNew_e {
  Section = "SECTION",
  Module = "MODULE",
  Lesson = "Lesson",
}

export default function AddNewItem({ addNew }: { addNew: AddNew_e }) {
  const renderAddNewItem = () => {
    switch (addNew) {
      case AddNew_e.Section:
        return <AddNewSeason />;
      case AddNew_e.Module:
        return <AddNewModule />;
      default:
        return <div>Item not found</div>;
    }
  };
  return <>{renderAddNewItem()}</>;
}

const AddNewSeason = () => {
  const { handleOnSubmit__Create }: any = useSeasonsContext();
  return (
    <MyDialog
      title="New Season"
      trigger={
        <button className="box-item">
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

const AddNewModule = () => {
  return (
    <MyDialog
      title="New Modules"
      trigger={
        <button className="box-item">
          <FontAwesomeIcon icon={faPlus} className="size-[1rem]" />
        </button>
      }
    >
      <div>new modules</div>
    </MyDialog>
  );
};
