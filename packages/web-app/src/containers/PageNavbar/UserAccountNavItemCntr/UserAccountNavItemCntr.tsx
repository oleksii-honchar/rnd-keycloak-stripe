/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Menu, MenuDivider, MenuItem, MenuItems } from "components/menu";
import { useRef } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "src/components/Tooltip";

import {
  HelpCircleIcon,
  LogInIcon,
  LogOutIcon,
  SignupIcon,
  SignUpIcon,
  UserCircleIcon,
  UserCogIcon,
} from "src/components/icons";

export function UserAccountNavItemCntr() {
  // const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  return (
    <Tooltip
      enableHandleClose
      useArrow={false}
      dontOpenOnHover
      allowedPlacements={["bottom", "bottom-end"]}
      gap={8}
      open
    >
      {/* Color & it's name */}
      <TooltipTrigger
        data-id="UserAccountNavItemCntr"
        className={`
          flex flex-row justify-start items-center
          outline-none
        `}
      >
        <span className="sm:hidden xl:block">
          <UserCircleIcon
            className={`
              w-8 h-8 
              text-md-sys-light-primary 
              bg-md-sys-light-surface-container-lowest/70 
              hover:bg-md-sys-light-surface-container-lowest
              backdrop-blur-sm rounded-[100px]
              transition-all duration-200
            `}
          />
        </span>
      </TooltipTrigger>
      <TooltipContent
        className={`
          flex flex-col justify-center items-center
          Tooltip
          shadow-lg rounded-lg p-1
          backdrop-blur-sm
          bg-md-sys-light-surface-container-lowest/70
          border border-md-sys-light-outline-variant/60
        `}
        ref={ref}
      >
        <Menu className="text-md-ref-pal-neutral-variant600 text-sm w-40">
          <MenuItems>
            <MenuItem>
              <SignupIcon className="w-4 h-4 mr-2" />
              Sing up
            </MenuItem>
            <MenuItem>
              <LogInIcon className="w-4 h-4 mr-2" />
              Log in
            </MenuItem>
            <MenuItem>
              <LogOutIcon className="w-4 h-4 mr-2" />
              Log out
            </MenuItem>
            <MenuDivider />
            <MenuItem>
              <UserCogIcon className="w-4 h-4 mr-2" />
              Account
            </MenuItem>
            <MenuItem>
              <HelpCircleIcon className="w-4 h-4 mr-2" />
              Help Center
            </MenuItem>
          </MenuItems>
        </Menu>
      </TooltipContent>
    </Tooltip>
  );
}
