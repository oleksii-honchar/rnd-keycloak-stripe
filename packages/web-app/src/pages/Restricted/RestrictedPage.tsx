import { useContext, useEffect } from "react";
import { KeyCloakContext } from "src/contexts/KeyCloakContext";

export default function RestrictedPage() {
  const { keycloak } = useContext(KeyCloakContext);

  useEffect(() => {
    if (!keycloak?.authenticated) {
      keycloak?.login();
    }
  }, []);

  return (
    <article
      className={`
        flex flex-col items-center w-full h-full grow
      `}
    >
      <div
        className={`
          w-full max-w-3xl md:max-w-4xl lg:max-w-6xl
          rounded-lg p-4 grow
          theme-content-bg
        `}
      >
        <section className="flex flex-col justify-center ">
          <div className="container mx-auto text-left">
            <div className="flex flex-col items-start w-full">
              <h1 className="text-3xl font-medium mb-6">Resticted page</h1>
              <div className="w-full flex flex-row items-center">
                <p className="text-l mb-2">TBD</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
