import { DialogClose } from "@/components/ui/dialog";
import MyDialog from "../MyDialog/MyDialog";
import { Button } from "@/components/ui/button";

export default function WarningBeforeDelete({ children, handleDelete }) {
  return (
    <MyDialog title="Warning" trigger={<Button>Delete</Button>}>
      <div>{children}</div>
      <div className="flexBetween">
        <DialogClose asChild>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button>Cancel</Button>
        </DialogClose>
      </div>
    </MyDialog>
  );
}
