"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HTMLAttributes, ReactElement, ReactNode } from "react";

interface IMyPopover extends HTMLAttributes<HTMLDivElement> {
  triggerLabel: string | ReactElement;
  children: ReactNode;
}

export default function MyPopover({
  triggerLabel,
  children,
  ...props
}: IMyPopover) {
  return (
    <Popover>
      <PopoverTrigger>{triggerLabel}</PopoverTrigger>
      <PopoverContent {...props}>{children}</PopoverContent>
    </Popover>
  );
}
