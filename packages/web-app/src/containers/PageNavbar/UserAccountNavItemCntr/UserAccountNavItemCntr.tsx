/** @jsx jsx */
/** @jsxFrag React.Fragment */
import { jsx } from "@emotion/react";
import { Menu, MenuDivider, MenuItem, MenuItems } from "components/menu";
import { useContext, useEffect, useRef, useState } from "react";

import {
  HelpCircleIcon,
  LogInIcon,
  LogOutIcon,
  SignUpIcon,
  UserCircleFilledIcon,
  UserCircleIcon,
  UserCogIcon,
} from "src/components/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "src/components/Tooltip";
import { KeyCloakContext } from "src/contexts/KeyCloakContext";
import { getLogger } from "src/utils/getLogger";

const logger = getLogger("UserAccountNavItemCntr");

export function UserAccountNavItemCntr() {
  const { keycloak } = useContext(KeyCloakContext); // Get keycloak instance
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsAuthenticated(keycloak?.authenticated ?? false);
  }, [keycloak?.authenticated]);

  const commonUserIconStyle = `
    w-6 h-6 sm:w-8 sm:h-8 
    text-md-sys-light-primary 
    bg-md-sys-light-surface-container-lowest/70 
    hover:bg-md-sys-light-surface-container-lowest
    backdrop-blur-sm rounded-[100px]
    transition-all duration-200
  `;

  return (
    <Tooltip
      enableHandleClose
      useArrow={false}
      dontOpenOnHover
      allowedPlacements={["bottom", "bottom-end"]}
      gap={8}
    >
      {/* Color & it's name */}
      <TooltipTrigger
        data-id="UserAccountNavItemCntr"
        className={`
          flex flex-row justify-start items-center
          outline-none
        `}
      >
        <span className="xs:hidden md:block xl:block">
          {isAuthenticated ? (
            <UserCircleFilledIcon className={commonUserIconStyle} />
          ) : (
            <UserCircleIcon className={commonUserIconStyle} />
          )}
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
            {!isAuthenticated && (
              <>
                <MenuItem
                  onClick={() => {
                    keycloak?.register();
                  }}
                >
                  <SignUpIcon className="w-4 h-4 mr-2" />
                  Sing up
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    keycloak?.login();
                  }}
                >
                  <LogInIcon className="w-4 h-4 mr-2" />
                  Log in
                </MenuItem>
              </>
            )}
            {isAuthenticated && (
              <>
                <MenuItem
                  onClick={() => {
                    keycloak?.logout();
                  }}
                >
                  <LogOutIcon className="w-4 h-4 mr-2" />
                  Log out
                </MenuItem>
                <MenuItem
                  onClick={async () => {
                    await keycloak?.accountManagement();
                  }}
                >
                  <UserCogIcon className="w-4 h-4 mr-2" />
                  Account
                </MenuItem>
              </>
            )}
            <MenuDivider />
            <MenuItem
              onClick={() => {
                logger.info("Not available currently");
              }}
            >
              <HelpCircleIcon className="w-4 h-4 mr-2" />
              Help Center
            </MenuItem>
          </MenuItems>
        </Menu>
      </TooltipContent>
    </Tooltip>
  );
}
