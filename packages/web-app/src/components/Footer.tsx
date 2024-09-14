import moment from "moment";
import { CopyrightFilledIcon } from "./icons";

export function Footer() {
  return (
    <div
      id="Footer"
      className={`
        h-6 w-full
        theme-footer-bg
      `}
    >
      <div className="w-full h-full">
        <div
          className={`
          relative
          mx-auto w-full max-w-3xl md:max-w-4xl lg:max-w-6xl 
          justify-center  flex h-full px-2
          text-md-sys-light-on-primary text-sm
        `}
        >
          <span className={`flex justify-center gap-2 items-center`}>
            <CopyrightFilledIcon className="w-4 h-4" />{" "}
            {moment().format("YYYY")} Oleksíi Honchar | &quot;Keycloak +
            Stripe&quot; R&D
          </span>
          <span
            className={`
              gap-2 absolute bottom-0 right-0
              text-[10px] text-md-sys-on-background
            `}
          >
            v{process.env.BUILD_VERSION}
          </span>
        </div>
      </div>
    </div>
  );
}
