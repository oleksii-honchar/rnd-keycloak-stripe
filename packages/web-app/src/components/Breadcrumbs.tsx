import { StringIndex } from "src/typings/index.js";
import { classNames } from "src/utils/classNames.ts";

function SingleCrumb({ item, keyId, isLast }: StringIndex) {
  return (
    <li
      className={classNames(
        `text-md3-sys-light-on-surface-variant hover:text-md3-sys-light-secondary`,
        "flex cursor-pointer items-center font-sans text-sm font-normal leading-normal antialiased transition-colors duration-300"
      )}
      key={keyId}
    >
      <a className={classNames(isLast ? `font-medium` : false)} href="#">
        <span>{item}</span>
      </a>
      {!isLast && (
        <span className="pointer-events-none mx-2 select-none font-sans text-sm font-normal leading-normal text-blue-gray-500 antialiased">
          /
        </span>
      )}
    </li>
  );
}
export function Breadcrumbs({ data, className }: StringIndex) {
  return (
    <div className={`pl-2 w-1/2 text-left ${className}`}>
      <nav aria-label="breadcrumb" className="w-max">
        <ol className="flex w-full flex-wrap items-center py-2 pr-2">
          <li
            className={`
                flex cursor-pointer items-center font-sans text-sm font-normal leading-normal 
                 antialiased transition-colors duration-300
                 text-md3-sys-light-on-surface-variant hover:text-md3-sys-light-secondary 
            `}
          >
            <a className="opacity-60" href="#">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
            </a>
            <span className="pointer-events-none mx-2 select-none font-sans text-sm font-normal leading-normal text-blue-gray-500 antialiased">
              /
            </span>
          </li>
          {data.map((item: string, index: number) => (
            <SingleCrumb item={item} key={index} isLast={index === data.length - 1} />
          ))}
        </ol>
      </nav>
    </div>
  );
}
