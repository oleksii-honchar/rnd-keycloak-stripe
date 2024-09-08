import { FaGithubSquare } from "react-icons/fa";

import { Breadcrumbs } from "src/components/Breadcrumbs";

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
        <Breadcrumbs
          data={["About"]}
          className="pl-4 w-full max-w-2xl md:max-w-3xl lg:max-w-5xl"
        />
        <section className="mt-[-30px] pl-4 flex flex-col h-[90vh] max-h-[900px] justify-center max-w-2xl md:max-w-3xl lg:max-w-5xl w-full">
          <div className="container mx-auto text-left">
            <div className="flex flex-col items-start w-full">
              <h1 className="text-3xl font-medium mb-6">Welcome stranger!</h1>
              <div className="w-full flex flex-row items-center">
                <div className="w-1/2 backdrop-blur-md bg-md3-ref-neutral-neutral98/70 p-2 rounded-lg">
                  <p className="text-l mb-2">
                    This bootstrap template contains multiple tools
                    configuration in &quot;ready to use&quot;, i.e copy & paste
                    state.
                  </p>
                  <p className="text-l mb-2">
                    When I make my way back to development from management and
                    consulting, I usually start from the basics. I have compiled
                    the most valuable and not overly complex cases to set up
                    most of the features.
                  </p>
                  <p className="text-l mb-2">
                    It&apos;s not a minimal setup, but it provides sufficient
                    setup for web-app development, including the most recent
                    updates in frontend technology.
                  </p>
                  <p className="text-l mb-2">
                    My favorite stack includes the following: TypeScript, React,
                    TailWindCSS, PostCSS, WebPack, ESLint+Prettier.
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
    </article>
  );
}
