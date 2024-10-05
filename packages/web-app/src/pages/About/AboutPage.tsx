import { TextCompletionContainer } from 'containers/TextCompletion/TextCompletionContainer';
import { useContext } from 'react';
import { KeyCloakContext } from 'src/contexts/KeyCloakContext';
import { PingPong } from './components/PingPong';

export default function AboutPage() {
  const { keycloak } = useContext(KeyCloakContext);
  const userName = keycloak?.tokenParsed?.preferred_username || 'stranger';

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
          <div className="container text-left">
            <div className="flex flex-col items-start w-full">
              <h1 className="text-3xl font-medium mb-6">Welcome, {userName}!</h1>
              <div className="w-full flex flex-col items-start gap-2">
                <div className="w-full flex flex-col gap-2">
                  <p className="text-l mb-2">Public access page</p>
                  <TextCompletionContainer />
                  <PingPong />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
