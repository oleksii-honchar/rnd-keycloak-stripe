import { StringIndex } from "src/typings";
import { classNames } from "src/utils/classNames";
import { HomeFilledIcon } from "./icons";

function SingleCrumb({ item, keyId, isLast }: StringIndex) {
  return (
    <li
      className={classNames(
        `text-md3-sys-light-on-surface-variant hover:text-md3-sys-light-secondary`,
        "flex cursor-pointer items-center font-sans text-sm font-normal leading-normal antialiased transition-colors duration-300",
      )}
      key={keyId}
    >
      <a className={classNames(isLast ? `font-medium` : "")} href="#">
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
              <HomeFilledIcon />
            </a>
            <span className="pointer-events-none mx-2 select-none font-sans text-sm font-normal leading-normal text-blue-gray-500 antialiased">
              /
            </span>
          </li>
          {data.map((item: string, index: number) => (
            <SingleCrumb
              item={item}
              key={index}
              isLast={index === data.length - 1}
            />
          ))}
        </ol>
      </nav>
    </div>
  );
}
