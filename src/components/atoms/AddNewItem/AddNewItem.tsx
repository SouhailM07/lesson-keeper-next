import SeasonsForm from "@/components/molecules/SeasonsForm/SeasonsForm";
import { useSeasonsContext } from "@/context/SeasonsContext/SeasonsContext";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MyDialog from "../MyDialog/MyDialog";
import ModulesForm from "@/components/molecules/ModulesForm/ModulesForm";
import axios from "axios";
import { API_APP_URL } from "@/lib/API_APP_URL";
import { useModulesApiContext } from "@/context/ModulesApiContext/ModulesApiContext";

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
  const { handleOnSubmit__Create }: any = useModulesApiContext();
  return (
    <MyDialog
      title="New Module"
      trigger={
        <button className="box-item">
          <FontAwesomeIcon icon={faPlus} className="size-[1rem]" />
        </button>
      }
    >
      <ModulesForm
        handleOnSubmit={handleOnSubmit__Create}
        defaultValues={{ name: "", mentor_name: "" }}
      />
    </MyDialog>
  );
};
