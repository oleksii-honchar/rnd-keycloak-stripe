import { GithubIcon } from "src/components/icons";

import { Breadcrumbs } from "src/components/Breadcrumbs";

export default function RestrictedPage() {
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
            bg-md-ref-pal-error50
          `}
      >
        <Breadcrumbs
          data={["Restricted"]}
          className="pl-4 w-full max-w-2xl md:max-w-3xl lg:max-w-5xl"
        />
        <section className=" pl-4 flex flex-col h-[90vh] max-h-[900px] justify-top max-w-2xl md:max-w-3xl lg:max-w-5xl w-full">
          <div className="container mx-auto text-left">
            <div className="flex flex-col items-start w-full">
              <h1 className="text-3xl font-medium mb-6">Restricted access</h1>
              <div className="w-full flex flex-row items-center">
                <div className="w-1/2 backdrop-blur-md bg-md-ref-neutral-neutral98/70 p-2 rounded-lg">
                  <p className="text-l mb-2">
                    This page is restricted to authorized users only.
                  </p>
                  <p className="text-l mb-2">
                    Please, login to access the page.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
