import type { StringIndex } from "src/typings/index.d.ts";
import {
  keyColors,
  paletteColors,
  primaryShades,
  secondaryShades,
  errorShades,
  neutralShades,
  neutralVShades,
} from "./palette-page.data.ts";
import { Breadcrumbs } from "src/components/Breadcrumbs.tsx";
import { classNames } from "src/utils/classNames.ts";

function ColorHashText({ color, toShowOnHover }: StringIndex) {
  return (
    <div
      className={classNames(
        `
        absolute bottom-0 left-0 px-1
        select-all
        text-[10px]
        `,
        toShowOnHover ? "hidden group-hover:block" : "block",
      )}
    >
      {color}
    </div>
  );
}
function ColorShadeName({ shadeName, toShowOnHover }: StringIndex) {
  return (
    <div
      className={classNames(
        `
        absolute bottom-0 right-0 px-1
        text-[10px]
        `,
        toShowOnHover ? "hidden group-hover:block" : "block",
      )}
    >
      {shadeName}
    </div>
  );
}

function KeyColor({ name, textColor, bgColor, colorHash }: StringIndex) {
  return (
    <div
      className={`
      flex items-start justify-center w-full p-1
      ${textColor}
      ${bgColor}
      relative
      rounded-lg
      border-2 border-transparent
      hover:border-md3-sys-light-outline
      hover:cursor-pointer
    `}
    >
      {name}
      <ColorHashText color={colorHash} />
    </div>
  );
}

function PaletteColorPair({ colorPair }: StringIndex) {
  return (
    <div className="flex flex-col w-full">
      {colorPair.map((color, idx) => (
        <PaletteColor key={`col-pair-${idx}`} {...color} />
      ))}
    </div>
  );
}
function PaletteColor({ name, textColor, bgColor, colorHash, shadeName }: StringIndex) {
  return (
    <div
      className={`
          flex items-start justify-start w-full p-1 h-12 last:h-8
          ${textColor}
          ${bgColor}
          relative text-[14px]
          first:rounded-t-lg last:rounded-b-lg
          border-2 border-transparent
          hover:border-md3-sys-light-outline
          hover:cursor-pointer
        `}
    >
      {name}
      <ColorHashText color={colorHash} />
      <ColorShadeName shadeName={shadeName} />
    </div>
  );
}
function ColorShade({ name, textColor, bgColor, colorHash, shadeName }: StringIndex) {
  return (
    <div
      className={`
          flex items-center justify-start w-full h-8 p-1
          ${textColor}
          ${bgColor}
          relative text-[14px]
          group
          first:rounded-t-lg last:rounded-b-lg
          border-2 border-transparent
          hover:border-md3-sys-light-outline
          hover:cursor-pointer
        `}
    >
      {name}
      <ColorHashText color={colorHash} toShowOnHover />
      <ColorShadeName shadeName={shadeName} toShowOnHover />
    </div>
  );
}

function PaletteColorCol({ colorCol }: StringIndex) {
  return (
    <div className="flex flex-col w-full gap-2">
      {colorCol.map((colorPair, idx) => (
        <PaletteColorPair key={`col-pair-${idx}`} colorPair={colorPair} />
      ))}
    </div>
  );
}
export default function PalettePage() {
  return (
    <article
      className={`
        flex flex-col 
        w-full max-w-2xl md:max-w-3xl lg:max-w-5xl 
        pb-4
      `}
    >
      <div
        id="content-container"
        className={`
          px-2
          w-full max-w-2xl md:max-w-3xl lg:max-w-5xl
          flex flex-col flex-grow 
        `}
      >
        <Breadcrumbs data={["Palette", "Light Theme"]} />
        <section className="flex flex-col justify-center">
          <section className="flex flex-row flex-wrap">
            <section id="colors" className="flex flex-wrap gap-4 py-0 w-full">
              <div className="flex items-stretch h-10 w-full gap-2 justify-between">
                {keyColors.map((color) => (
                  <KeyColor key={color.name} {...color} />
                ))}
              </div>
              <div className="flex items-stretch w-full gap-2 justify-between">
                {paletteColors.map((colorCol, idx) => (
                  <PaletteColorCol key={`pal-col-${idx}`} colorCol={colorCol} />
                ))}
              </div>
              <div className="flex items-stretch w-full gap-2 justify-between">
                <div className="flex flex-col w-full max-w-[20%]">
                  {primaryShades.map((shadeColor, idx) => (
                    <ColorShade key={`primary-shade-col-${idx}`} {...shadeColor} />
                  ))}
                </div>
                <div className="flex flex-col  w-full max-w-[20%]">
                  {secondaryShades.map((shadeColor, idx) => (
                    <ColorShade key={`secondary-shade-col-${idx}`} {...shadeColor} />
                  ))}
                </div>
                <div className="flex flex-col  w-full max-w-[20%]">
                  {errorShades.map((shadeColor, idx) => (
                    <ColorShade key={`error-shade-col-${idx}`} {...shadeColor} />
                  ))}
                </div>
                <div className="flex flex-col  w-full max-w-[20%]">
                  {neutralShades.map((shadeColor, idx) => (
                    <ColorShade key={`neutral-shade-col-${idx}`} {...shadeColor} />
                  ))}
                </div>
                <div className="flex flex-col w-full max-w-[20%]">
                  {neutralVShades.map((shadeColor, idx) => (
                    <ColorShade key={`neutral-v-shade-col-${idx}`} {...shadeColor} />
                  ))}
                </div>
              </div>
            </section>
          </section>
        </section>
      </div>
    </article>
  );
}
