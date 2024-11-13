"use client";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function DontRenderWhen({
  route,
  children,
}: {
  route: string[];
  children: ReactNode;
}) {
  const pathname = usePathname();
  if (!route.includes(pathname!)) {
    return children;
  }
}
