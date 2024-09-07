import { FaGithubSquare } from "react-icons/fa";
import { Breadcrumbs } from "src/components/Breadcrumbs.tsx";

export default function AboutPage() {
  return (
    <article
      className={`
        flex flex-col items-center w-full
      `}
    >
      <div
        id="first-section-wrapper"
        className={`
            w-full flex flex-col items-center
            bg-[radial-gradient(ellipse_90%_40%_at_25%_25%,_var(--tw-gradient-stops))] 
            from-md3-ref-primary-primary99 to-md3-ref-primary-primary90
            bg-contain bg-no-repeat bg-top
          `}
      >
        <Breadcrumbs data={["About"]} className="pl-4 w-full max-w-2xl md:max-w-3xl lg:max-w-5xl" />
        <section className="mt-[-30px] pl-4 flex flex-col h-[90vh] max-h-[900px] justify-center max-w-2xl md:max-w-3xl lg:max-w-5xl w-full">
          <div className="container mx-auto text-left">
            <div className="flex flex-col items-start w-full">
              <h1 className="text-3xl font-medium mb-6">Welcome stranger!</h1>
              <div className="w-full flex flex-row items-center">
                <div className="w-1/2 backdrop-blur-md bg-md3-ref-neutral-neutral98/70 p-2 rounded-lg">
                  <p className="text-l mb-2">
                    This bootstrap template contains multiple tools configuration in "ready to use", i.e copy & paste
                    state.
                  </p>
                  <p className="text-l mb-2">
                    When I make my way back to development from management and consulting, I usually start from the
                    basics. I have compiled the most valuable and not overly complex cases to set up most of the
                    features.
                  </p>
                  <p className="text-l mb-2">
                    It's not a minimal setup, but it provides sufficient setup for web-app development, including the
                    most recent updates in frontend technology.
                  </p>
                  <p className="text-l mb-2">
                    My favorite stack includes the following: TypeScript, React, TailWindCSS, PostCSS, WebPack,
                    ESLint+Prettier.
                  </p>
                  <p className="text-l mb-2">
                    You can find more information in the &nbsp;
                    <a
                      href="https://github.com/oleksii-honchar/ts-react-tmpl"
                      className="relative top-[3px] text-md3-sys-light-primary hover:text-md3-sys-light-primary/70 hover:underline inline-flex items-center gap-1"
                    >
                      <FaGithubSquare />
                      repo
                    </a>
                    .
                  </p>
                </div>
                <div className="w-1/2 pl-16">
                  <img
                    src="/assets/images/hand.png"
                    className="h-64 w-full object-cover rounded-xl"
                    alt="Layout Image"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div
        id="second-section-wrapper"
        className={`
            w-full flex flex-col items-center
            bg-[radial-gradient(ellipse_90%_40%_at_25%_15%,_var(--tw-gradient-stops))] 
            from-md3-ref-primary-primary99 to-md3-ref-primary-primary90
            bg-contain bg-no-repeat bg-top
          `}
      >
        <section
          className={`
          pl-4 flex flex-col h-screen justify-center max-h-[920px] max-w-2xl md:max-w-3xl lg:max-w-5xl w-full
        `}
        >
          <div className="container mx-auto text-left">
            <h1 className="text-3xl font-medium mb-6">Brief tools & setup description</h1>
            <div className="flex items-start gap-2">
              <div className="w-1/2 backdrop-blur-md bg-md3-ref-neutral-neutral98/70 text-md3-sys-light-on-secondary-container rounded-lg p-2">
                <h2 className="text-xl font-medium mb-6">Build & Configuration</h2>
                <ul className="list-disc list-inside">
                  <li>project.env file and environments configs</li>
                  <li>Latest TypeScript & separate configs for node, es2016 and es2022</li>
                  <li>ESM modules both for node and react configured using custom loader</li>
                  <li>ESLint + Prettier(as plugin) for React and Node</li>
                  <li>Husky + Cimmitizen github hooks</li>
                  <li>Custom WebPack TS wrapper</li>
                  <li>
                    Extended WebPack config including:
                    <ul className="list-disc list-inside ml-4">
                      <li>post-css + TailWindCSS</li>
                      <li>purge-css, prune licenses and fund requests</li>
                      <li>Custom index.html based on HandleBars</li>
                      <li>"es-build" TS loader</li>
                    </ul>
                  </li>
                  <li>Code Splitting and route async loading</li>
                  <li>[TBD] Terraform based deploy to AWS</li>
                </ul>
              </div>
              <div className="w-1/2 backdrop-blur-md bg-md3-ref-neutral-neutral98/70 text-md3-sys-light-on-secondary-container rounded-lg p-2">
                <h2 className="text-xl font-medium mb-6">Web App Modules</h2>
                <ul className="list-disc list-inside">
                  <li>React + React-Router</li>
                  <li>TailWindCSS with MaterialDesign v3 Palette Tokens</li>
                  <li>[TBD] MD3 colors in TailWindCSS color palette notation</li>
                  <li>[TBD] XState example</li>
                  <li>[TBD] unit testing</li>
                  <li>[TBD] e2e testing</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
