import Keycloak from "keycloak-js";
import { createContext, ReactNode, useEffect, useState } from "react";
import { getLogger } from "src/utils/getLogger";

const logger = getLogger("KeyCloakContext");

let keycloak: Keycloak | null = null; // Initialize as null

interface KeyCloakContextProps {
  keycloakInitialized: boolean;
  keycloak: Keycloak | null;
}

export const KeyCloakContext = createContext<KeyCloakContextProps>({
  keycloakInitialized: false,
  keycloak: null,
});

interface KeyCloakContextProviderProps {
  children: ReactNode | ReactNode[];
  config: {
    url: string;
    realm: string;
    clientId: string;
  };
}

export const KeyCloakContextProvider = ({
  children,
  config,
}: KeyCloakContextProviderProps) => {
  const [keycloakInitialized, setKeycloakInitialized] = useState(false);

  useEffect(() => {
    keycloak = new Keycloak(config);
    keycloak
      .init({
        onLoad: "check-sso",
        silentCheckSsoRedirectUri:
          window.location.origin + "/silent-check-sso.html",
      })
      .then((auth) => {
        setKeycloakInitialized(true);
        if (auth) {
          logger.info("User is authenticated");
        } else {
          logger.warn("User is not authenticated");
        }
      })
      .catch(() => {
        logger.error("Failed to initialize Keycloak");
      });
  }, []);

  return (
    <KeyCloakContext.Provider value={{ keycloakInitialized, keycloak }}>
      {children}
    </KeyCloakContext.Provider>
  );
};

export default KeyCloakContext;
