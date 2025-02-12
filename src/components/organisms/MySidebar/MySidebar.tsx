"use client";

import MyPopover from "@/components/atoms/MyPopover/MyPopover";
import { cn } from "@/lib/utils";
import sidebarStore from "@/zustand/sidebar.store";
import { useAuth, UserButton, useUser } from "@clerk/nextjs";
import {
  faBars,
  faCircleQuestion,
  faFilter,
  faGear,
  faPalette,
  faSun,
  faUser,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonHTMLAttributes } from "react";

interface ISideBarOptions extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconDefinition;
  onClick?: any;
  labelTxt: string;
  innerTest?: any;
}
export default function MySidebar() {
  // ! zustand handlers
  const { toggleSidebar, editToggleSidebar } = sidebarStore((state) => state);
  // sidebar options
  const UiTEST = () => <MyPopover triggerLabel="Trigger Label">Test</MyPopover>;
  const sideBarOptions: ISideBarOptions[] = [
    {
      icon: faBars,
      onClick: () => editToggleSidebar(!toggleSidebar),
      labelTxt: "Sidebar",
    },
    { icon: faUser, labelTxt: "Profile" },
    { icon: faFilter, labelTxt: "Filter Books", innerTest: UiTEST() },
    { icon: faPalette, labelTxt: "Themes" },
    { icon: faSun, labelTxt: "Dark Mode" },
    { icon: faCircleQuestion, labelTxt: "Information" },
    {
      icon: faGear,
      labelTxt: "Admin Panel",
      className: "text-red-500 border-red-500",
    },
  ];
  return (
    <div
      className={`border ${
        toggleSidebar ? "w-[14rem]" : "w-[4.5rem]"
      } duration-300 ease-in-out z-[10] bg-primaryTransparent fixed right-0 h-screen top-0  p-[0.5rem] `}
    >
      <ul
        className={`flex flex-col ${
          toggleSidebar ? "items-start px-[1rem]" : "items-center"
        } justify-between border h-full py-[1rem] rounded-md`}
      >
        {sideBarOptions.map((e, i) => (
          <li
            title={e.labelTxt}
            key={i}
            className={`${toggleSidebar && "w-full"} flex items-center`}
          >
            <SidebarOption {...e}>{e.innerTest}</SidebarOption>
          </li>
        ))}
      </ul>
    </div>
  );
}

const SidebarOption = ({
  className,
  icon,
  onClick,
  children,
}: ISideBarOptions) => {
  const { toggleSidebar } = sidebarStore((state) => state);
  const { isSignedIn, isLoaded } = useAuth();
  if (isSignedIn && isLoaded && icon == faUser) {
    return (
      <div
        className={`border-2 aspect-square size-[2.2rem] rounded-md flexCenter  border-black ${
          toggleSidebar && "size-[0.9rem]"
        }`}
      >
        <UserButton />
      </div>
    );
  }
  return (
    <>
      <FontAwesomeIcon
        onClick={onClick}
        icon={icon}
        role="button"
        className={cn(
          `border-2 aspect-square size-[1.1rem] rounded-md p-2 border-black ${
            toggleSidebar && "size-[0.9rem]"
          }`,
          className
        )}
      />
      {toggleSidebar && (
        <div className={`mx-auto ${icon == faGear && "text-red-500"}`}>
          {children}
        </div>
      )}
    </>
  );
};
