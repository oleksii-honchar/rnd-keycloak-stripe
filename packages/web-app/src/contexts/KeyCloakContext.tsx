import Keycloak from 'keycloak-js';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { getLogger } from 'src/utils/getLogger';

const logger = getLogger('KeyCloakContext');

let keycloak: Keycloak | null = null; // Initialize as null

interface KeyCloakContextProps {
  keycloakInitialized: boolean;
  keycloak: Keycloak | null;
  getToken: () => Promise<string | undefined>;
}

export const KeyCloakContext = createContext<KeyCloakContextProps>({
  keycloakInitialized: false,
  keycloak: null,
  getToken: () => Promise.resolve(undefined),
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
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
      })
      .then(auth => {
        setKeycloakInitialized(true);
        if (auth) {
          logger.info('User is authenticated');
        } else {
          logger.warn('User is not authenticated');
        }
      })
      .catch(() => {
        logger.error('Failed to initialize Keycloak');
      });
  }, []);

  const getToken = async () => {
    if (keycloak) {
      try {
        await keycloak.updateToken(30); // Refresh token if it's about to expire
        return keycloak.token;
      } catch (error) {
        logger.error('Failed to refresh token', error);
        return undefined;
      }
    }
    return undefined;
  };

  return (
    <KeyCloakContext.Provider value={{ keycloakInitialized, keycloak, getToken }}>
      {children}
    </KeyCloakContext.Provider>
  );
};

export default KeyCloakContext;
