import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { KeyCloakContext } from "src/contexts/KeyCloakContext";
import { getLogger } from "utils/getLogger";

interface ProtectedRouteProps {
  children: ReactNode;
}

const logger = getLogger("ProtectedRoute");

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { keycloak } = useContext(KeyCloakContext);

  if (!keycloak?.authenticated) {
    logger.error("User is not authenticated. Access denied.");
    return <Navigate to="/" />;
  }

  return children;
}
