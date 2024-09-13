/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useRef } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "src/components/Tooltip";

import { UserCircleIcon } from "src/components/icons";

export function UserAccountNavItemCntr() {
  // const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  return (
    <Tooltip
      enableHandleClose
      useArrow={false}
      dontOpenOnHover
      allowedPlacements={["bottom", "bottom-end"]}
    >
      {/* Color & it's name */}
      <TooltipTrigger
        data-id="UserAccountNavItemCntr"
        className={`
          flex flex-row justify-start items-center
          p-2 outline-none
        `}
      >
        <span className="sm:hidden xl:block">
          <UserCircleIcon className="w-8 h-8 text-md-ref-pal-primary bg-md-sys-light-surface-container-lowest rounded-[100px]" />
        </span>
      </TooltipTrigger>
      <TooltipContent
        className={`
          flex flex-col justify-center items-center
          Tooltip
          shadow-lg rounded-lg p-4
          backdrop-blur-sm
          bg-md-sys-light-surface/50
          border border-md-sys-light-outline-variant/60
        `}
        ref={ref}
      >
        test
      </TooltipContent>
    </Tooltip>
  );
}
