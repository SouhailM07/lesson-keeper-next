import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactElement, ReactNode } from "react";

export default function MyDialog({
  trigger,
  children,
  title,
  customContentStyle,
}: {
  trigger: ReactElement;
  title: string;
  children: ReactNode;
  customContentStyle?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={customContentStyle}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
