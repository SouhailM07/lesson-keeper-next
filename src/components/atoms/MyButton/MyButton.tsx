import { cn } from "@/lib/utils";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HTMLMotionProps, motion } from "framer-motion";
import { ReactNode } from "react";

export enum MyButtonTypes_e {
  Normal = "NORMAL",
  WithIcon = "WITH_ICON",
  Icon = "ICON",
}

interface IMyButtonProps extends HTMLMotionProps<"button"> {
  buttonType: MyButtonTypes_e;
  borderBottomColor?: string;
  icon?: IconDefinition;
  children: ReactNode;
}

export default function MyButton({
  children,
  buttonType,
  borderBottomColor = "black",
  icon,
  ...props
}: IMyButtonProps) {
  const MyButtonRenderItem = () => {
    switch (buttonType) {
      case MyButtonTypes_e.Normal:
        return <span>{children}</span>;
      case MyButtonTypes_e.WithIcon:
        return (
          <>
            <span>{children}</span>
            {icon && (
              <FontAwesomeIcon
                className="h-[1.2rem] aspect-square"
                icon={icon}
              />
            )}
          </>
        );
      case MyButtonTypes_e.Icon:
        return <>{icon && <FontAwesomeIcon icon={icon} />}</>;
      default:
        return <span>Unknown Btn</span>;
    }
  };
  return (
    <motion.button
      {...props}
      animate={{ borderBottom: "5px solid transparent" }}
      whileHover={{ borderBottom: `5px solid ${borderBottomColor}`, y: -5 }}
      whileTap={{ y: 5, borderBottom: "5px solid transparent" }}
      className={cn(
        ` rounded-lg flex items-center p-3 gap-x-[1rem] `,
        props.className
      )}
    >
      {MyButtonRenderItem()}
    </motion.button>
  );
}
