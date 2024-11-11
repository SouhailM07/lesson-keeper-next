"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ReactNode } from "react";

interface IMyPopover {
  triggerLabel: string;
  children: ReactNode;
}

export default function MyPopover({ triggerLabel, children }: IMyPopover) {
  return (
    <Popover>
      <PopoverTrigger>{triggerLabel}</PopoverTrigger>
      <PopoverContent>{children}</PopoverContent>
    </Popover>
  );
}
