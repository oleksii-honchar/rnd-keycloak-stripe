import { FaCopyright } from "react-icons/fa";
import moment from "moment";
export function Footer() {
  return (
    <div
      className={`
        h-12 w-full
        bg-[radial-gradient(ellipse_90%_70%_at_20%_50%,_var(--tw-gradient-stops))] 
        from-md3-ref-primary-primary99 to-md3-ref-primary-primary90
        bg-contain bg-no-repeat bg-top
      `}
    >
      <div className="bg-md3-sys-light-surface/40 w-full h-full">
        <div
          className={`
          mx-auto w-full max-w-2xl md:max-w-3xl lg:max-w-5xl justify-between  flex h-full px-2
          text-md3-sys-light-primary text-sm
        `}
        >
          <span className={`flex justify-start gap-2 items-center`}>
            <FaCopyright className={``} /> {moment().format("YYYY")} "TS + React + TW" Template
          </span>
          <span className={`flex justify-end gap-2 items-center text-[10px] text-md3-sys-light-primary/50`}>
            v{process.env.BUILD_VERSION}
          </span>
        </div>
      </div>
    </div>
  );
}
