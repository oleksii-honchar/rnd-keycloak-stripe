import { nl } from "src/utils/native-lodash.ts";
import * as palette from "src/stylesheets/md3-design-tokens-v1.ts";

export const keyColors = [
  {
    name: "Primary",
    bgColor: "bg-md3-key-colors-primary",
    textColor: "text-md3-sys-light-on-primary",
    colorHash: nl.get(palette, "colors.md3.key-colors.primary"),
  },
  {
    name: "Secondary",
    bgColor: "bg-md3-key-colors-secondary",
    textColor: "text-md3-sys-light-on-secondary",
    colorHash: nl.get(palette, "colors.md3.key-colors.secondary"),
  },
  {
    name: "Error",
    bgColor: "bg-md3-sys-light-error",
    textColor: "text-md3-sys-light-on-error",
    colorHash: nl.get(palette, "colors.md3.sys.light.error"),
  },
  {
    name: "Neutral",
    bgColor: "bg-md3-key-colors-neutral",
    textColor: "text-md3-sys-light-on-surface",
    colorHash: nl.get(palette, "colors.md3.key-colors.neutral"),
  },
  {
    name: "N. Variant",
    bgColor: "bg-md3-key-colors-neutral-variant",
    textColor: "text-md3-sys-light-on-surface",
    colorHash: nl.get(palette, "colors.md3.key-colors.neutral-variant"),
  },
];

export const paletteColors = [
  [
    [
      {
        name: "Primary",
        bgColor: "bg-md3-sys-light-primary",
        textColor: "text-md3-sys-light-on-primary",
        colorHash: nl.get(palette, "colors.md3.sys.light.primary"),
        shadeName: "P-40",
      },
      {
        name: "On Primary",
        bgColor: "bg-md3-ref-primary-primary99",
        textColor: "text-md3-sys-light-primary",
        colorHash: nl.get(palette, "colors.md3.ref.primary.primary99"),
        shadeName: "P-99",
      },
    ],
    [
      {
        name: "Primary Container",
        bgColor: "bg-md3-sys-light-primary-container",
        textColor: "text-md3-sys-light-on-primary-container",
        colorHash: nl.get(palette, "colors.md3.sys.light.primary-container"),
        shadeName: "P-90",
      },
      {
        name: "On Primary Container",
        bgColor: "bg-md3-sys-light-on-primary-container",
        textColor: "text-md3-sys-light-on-primary",
        colorHash: nl.get(palette, "colors.md3.sys.light.on-primary-container"),
        shadeName: "P-10",
      },
    ],
  ],
  [
    [
      {
        name: "Secondary",
        bgColor: "bg-md3-sys-light-secondary",
        textColor: "text-md3-sys-light-on-secondary",
        colorHash: nl.get(palette, "colors.md3.sys.light.secondary"),
        shadeName: "S-40",
      },
      {
        name: "On Secondary",
        bgColor: "bg-md3-ref-secondary-secondary99",
        textColor: "text-md3-sys-light-secondary",
        colorHash: nl.get(palette, "colors.md3.ref.secondary.secondary99"),
        shadeName: "S-99",
      },
    ],
    [
      {
        name: "Secondary Container",
        bgColor: "bg-md3-sys-light-secondary-container",
        textColor: "text-md3-sys-light-on-secondary-container",
        colorHash: nl.get(palette, "colors.md3.sys.light.secondary-container"),
        shadeName: "S-90",
      },
      {
        name: "On Secondary Container",
        bgColor: "bg-md3-sys-light-on-secondary-container",
        textColor: "text-md3-sys-light-on-secondary",
        colorHash: nl.get(palette, "colors.md3.sys.light.on-secondary-container"),
        shadeName: "S-10",
      },
    ],
  ],
  [
    [
      {
        name: "Error",
        bgColor: "bg-md3-sys-light-error",
        textColor: "text-md3-sys-light-on-error",
        colorHash: nl.get(palette, "colors.md3.sys.light.error"),
        shadeName: "Error-40",
      },
      {
        name: "On Error",
        bgColor: "bg-md3-ref-error-error99",
        textColor: "text-md3-sys-light-error",
        colorHash: nl.get(palette, "colors.md3.ref.error.error99"),
        shadeName: "Error-99",
      },
    ],
    [
      {
        name: "Error Container",
        bgColor: "bg-md3-sys-light-error-container",
        textColor: "text-md3-sys-light-on-error-container",
        colorHash: nl.get(palette, "colors.md3.sys.light.error-container"),
        shadeName: "Error-90",
      },
      {
        name: "On Error Container",
        bgColor: "bg-md3-sys-light-on-error-container",
        textColor: "text-md3-sys-light-on-error",
        colorHash: nl.get(palette, "colors.md3.sys.light.on-error-container"),
        shadeName: "P-10",
      },
    ],
  ],
  [
    [
      {
        name: "Background",
        bgColor: "bg-md3-sys-light-background",
        textColor: "text-md3-sys-light-on-background",
        colorHash: nl.get(palette, "colors.md3.sys.light.background"),
        shadeName: "N99",
      },
      {
        name: "On Background",
        bgColor: "bg-md3-sys-light-on-background",
        textColor: "text-md3-sys-light-background",
        colorHash: nl.get(palette, "colors.md3.sys.light.on-background"),
        shadeName: "N-10",
      },
    ],
    [
      {
        name: "Surface",
        bgColor: "bg-md3-sys-light-surface",
        textColor: "text-md3-sys-light-on-surface",
        colorHash: nl.get(palette, "colors.md3.sys.light.surface"),
        shadeName: "N-99",
      },
      {
        name: "On Surface",
        bgColor: "bg-md3-sys-light-on-surface",
        textColor: "text-md3-sys-light-surface",
        colorHash: nl.get(palette, "colors.md3.sys.light.on-surface"),
        shadeName: "N-10",
      },
    ],
  ],
  [
    [
      {
        name: "Outline",
        bgColor: "bg-md3-sys-light-outline",
        textColor: "text-md3-sys-light-background",
        colorHash: nl.get(palette, "colors.md3.sys.light.outline"),
        shadeName: "NV-50",
      },
      {
        name: "Outline Variant",
        bgColor: "bg-md3-sys-light-outline-variant",
        textColor: "text-md3-sys-light-on-surface",
        colorHash: nl.get(palette, "colors.md3.sys.light.outline-variant"),
        shadeName: "NV-80",
      },
    ],
    [
      {
        name: "Surface Variant",
        bgColor: "bg-md3-sys-light-surface-variant",
        textColor: "text-md3-sys-light-on-surface-variant",
        colorHash: nl.get(palette, "colors.md3.sys.light.surface-variant"),
        shadeName: "NV-90",
      },
      {
        name: "On Surface Variant",
        bgColor: "bg-md3-sys-light-on-surface-variant",
        textColor: "text-md3-sys-light-surface",
        colorHash: nl.get(palette, "colors.md3.sys.light.on-surface-variant"),
        shadeName: "NV-30",
      },
    ],
  ],
];

export const primaryShades = [
  {
    bgColor: "bg-md3-ref-primary-primary10",
    textColor: "text-md3-ref-primary-primary99",
    colorHash: nl.get(palette, "colors.md3.ref.primary.primary10"),
    shadeName: "P-10",
  },
  {
    bgColor: "bg-md3-ref-primary-primary20",
    textColor: "text-md3-ref-primary-primary99",
    colorHash: nl.get(palette, "colors.md3.ref.primary.primary20"),
    shadeName: "P-20",
  },
  {
    bgColor: "bg-md3-ref-primary-primary30",
    textColor: "text-md3-ref-primary-primary99",
    colorHash: nl.get(palette, "colors.md3.ref.primary.primary30"),
    shadeName: "P-30",
  },
  {
    bgColor: "bg-md3-ref-primary-primary40",
    textColor: "text-md3-ref-primary-primary99",
    colorHash: nl.get(palette, "colors.md3.ref.primary.primary40"),
    shadeName: "P-40",
  },
  {
    bgColor: "bg-md3-ref-primary-primary50",
    textColor: "text-md3-ref-primary-primary95",
    colorHash: nl.get(palette, "colors.md3.ref.primary.primary50"),
    shadeName: "P-50",
  },
  {
    bgColor: "bg-md3-ref-primary-primary60",
    textColor: "text-md3-ref-primary-primary95",
    colorHash: nl.get(palette, "colors.md3.ref.primary.primary60"),
    shadeName: "P-60",
  },
  {
    bgColor: "bg-md3-ref-primary-primary70",
    textColor: "text-md3-ref-primary-primary95",
    colorHash: nl.get(palette, "colors.md3.ref.primary.primary70"),
    shadeName: "P-70",
  },
  {
    bgColor: "bg-md3-ref-primary-primary80",
    textColor: "text-md3-ref-primary-primary30",
    colorHash: nl.get(palette, "colors.md3.ref.primary.primary80"),
    shadeName: "P-80",
  },
  {
    bgColor: "bg-md3-ref-primary-primary90",
    textColor: "text-md3-ref-primary-primary20",
    colorHash: nl.get(palette, "colors.md3.ref.primary.primary90"),
    shadeName: "P-90",
  },
  {
    bgColor: "bg-md3-ref-primary-primary95",
    textColor: "text-md3-ref-primary-primary5",
    colorHash: nl.get(palette, "colors.md3.ref.primary.primary95"),
    shadeName: "P-95",
  },
];
export const secondaryShades = [
  {
    bgColor: "bg-md3-ref-secondary-secondary10",
    textColor: "text-md3-ref-secondary-secondary99",
    colorHash: nl.get(palette, "colors.md3.ref.secondary.secondary10"),
    shadeName: "S-10",
  },
  {
    bgColor: "bg-md3-ref-secondary-secondary20",
    textColor: "text-md3-ref-secondary-secondary99",
    colorHash: nl.get(palette, "colors.md3.ref.secondary.secondary20"),
    shadeName: "S-20",
  },
  {
    bgColor: "bg-md3-ref-secondary-secondary30",
    textColor: "text-md3-ref-secondary-secondary99",
    colorHash: nl.get(palette, "colors.md3.ref.secondary.secondary30"),
    shadeName: "S-30",
  },
  {
    bgColor: "bg-md3-ref-secondary-secondary40",
    textColor: "text-md3-ref-secondary-secondary99",
    colorHash: nl.get(palette, "colors.md3.ref.secondary.secondary40"),
    shadeName: "S-40",
  },
  {
    bgColor: "bg-md3-ref-secondary-secondary50",
    textColor: "text-md3-ref-secondary-secondary95",
    colorHash: nl.get(palette, "colors.md3.ref.secondary.secondary50"),
    shadeName: "S-50",
  },
  {
    bgColor: "bg-md3-ref-secondary-secondary60",
    textColor: "text-md3-ref-secondary-secondary95",
    colorHash: nl.get(palette, "colors.md3.ref.secondary.secondary60"),
    shadeName: "S-60",
  },
  {
    bgColor: "bg-md3-ref-secondary-secondary70",
    textColor: "text-md3-ref-secondary-secondary95",
    colorHash: nl.get(palette, "colors.md3.ref.secondary.secondary70"),
    shadeName: "S-70",
  },
  {
    bgColor: "bg-md3-ref-secondary-secondary80",
    textColor: "text-md3-ref-secondary-secondary30",
    colorHash: nl.get(palette, "colors.md3.ref.secondary.secondary80"),
    shadeName: "S-80",
  },
  {
    bgColor: "bg-md3-ref-secondary-secondary90",
    textColor: "text-md3-ref-secondary-secondary20",
    colorHash: nl.get(palette, "colors.md3.ref.secondary.secondary90"),
    shadeName: "S-90",
  },
  {
    bgColor: "bg-md3-ref-secondary-secondary95",
    textColor: "text-md3-ref-secondary-secondary5",
    colorHash: nl.get(palette, "colors.md3.ref.secondary.secondary95"),
    shadeName: "S-95",
  },
];
export const errorShades = [
  {
    bgColor: "bg-md3-ref-error-error10",
    textColor: "text-md3-ref-error-error99",
    colorHash: nl.get(palette, "colors.md3.ref.error.error10"),
    shadeName: "E-10",
  },
  {
    bgColor: "bg-md3-ref-error-error20",
    textColor: "text-md3-ref-error-error99",
    colorHash: nl.get(palette, "colors.md3.ref.error.error20"),
    shadeName: "E-20",
  },
  {
    bgColor: "bg-md3-ref-error-error30",
    textColor: "text-md3-ref-error-error99",
    colorHash: nl.get(palette, "colors.md3.ref.error.error30"),
    shadeName: "E-30",
  },
  {
    bgColor: "bg-md3-ref-error-error40",
    textColor: "text-md3-ref-error-error99",
    colorHash: nl.get(palette, "colors.md3.ref.error.error40"),
    shadeName: "E-40",
  },
  {
    bgColor: "bg-md3-ref-error-error50",
    textColor: "text-md3-ref-error-error95",
    colorHash: nl.get(palette, "colors.md3.ref.error.error50"),
    shadeName: "E-50",
  },
  {
    bgColor: "bg-md3-ref-error-error60",
    textColor: "text-md3-ref-error-error95",
    colorHash: nl.get(palette, "colors.md3.ref.error.error60"),
    shadeName: "E-60",
  },
  {
    bgColor: "bg-md3-ref-error-error70",
    textColor: "text-md3-ref-error-error95",
    colorHash: nl.get(palette, "colors.md3.ref.error.error70"),
    shadeName: "E-70",
  },
  {
    bgColor: "bg-md3-ref-error-error80",
    textColor: "text-md3-ref-error-error30",
    colorHash: nl.get(palette, "colors.md3.ref.error.error80"),
    shadeName: "E-80",
  },
  {
    bgColor: "bg-md3-ref-error-error90",
    textColor: "text-md3-ref-error-error20",
    colorHash: nl.get(palette, "colors.md3.ref.error.error90"),
    shadeName: "E-90",
  },
  {
    bgColor: "bg-md3-ref-error-error95",
    textColor: "text-md3-ref-error-error5",
    colorHash: nl.get(palette, "colors.md3.ref.error.error95"),
    shadeName: "E-95",
  },
];
export const neutralShades = [
  {
    name: "Scrim",
    bgColor: "bg-md3-sys-light-scrim",
    textColor: "text-md3-ref-neutral-neutral95",
    colorHash: nl.get(palette, "colors.md3.sys.light.scrim"),
    shadeName: "N-0",
  },
  {
    name: "Shadow",
    bgColor: "bg-md3-sys-light-shadow",
    textColor: "text-md3-ref-neutral-neutral95",
    colorHash: nl.get(palette, "colors.md3.sys.light.shadow"),
    shadeName: "N-0",
  },
  {
    name: "Surface Dim",
    bgColor: "bg-md3-sys-light-surface-dim",
    textColor: "text-md3-ref-neutral-neutral10",
    colorHash: nl.get(palette, "colors.md3.sys.light.surface-dim"),
    shadeName: "N-87",
  },
  {
    name: "Surf. Cntr. Highest",
    bgColor: "bg-md3-sys-light-surface-container-highest",
    textColor: "text-md3-ref-neutral-neutral10",
    colorHash: nl.get(palette, "colors.md3.sys.light.surface-container-highest"),
    shadeName: "N-90",
  },
  {
    name: "Surf. Cntr. High",
    bgColor: "bg-md3-sys-light-surface-container-high",
    textColor: "text-md3-ref-neutral-neutral10",
    colorHash: nl.get(palette, "colors.md3.sys.light.surface-container-high"),
    shadeName: "N-92",
  },
  {
    name: "Surf. Cntr.",
    bgColor: "bg-md3-sys-light-surface-container",
    textColor: "text-md3-ref-neutral-neutral10",
    colorHash: nl.get(palette, "colors.md3.sys.light.surface-container"),
    shadeName: "N-94",
  },
  {
    name: "Surf. Cntr. Low",
    bgColor: "bg-md3-sys-light-surface-container-low",
    textColor: "text-md3-ref-neutral-neutral10",
    colorHash: nl.get(palette, "colors.md3.sys.light.surface-container-low"),
    shadeName: "N-96",
  },
  {
    name: "Surf. Cntr. Lowest",
    bgColor: "bg-md3-ref-neutral-neutral98",
    textColor: "text-md3-ref-neutral-neutral10",
    colorHash: nl.get(palette, "colors.md3.ref.neutral.neutral98"),
    shadeName: "N-98",
  },
  {
    name: "Surface",
    bgColor: "bg-md3-ref-neutral-neutral99",
    textColor: "text-md3-ref-neutral-neutral10",
    colorHash: nl.get(palette, "colors.md3.ref.neutral.neutral99"),
    shadeName: "N-99",
  },
];

export const neutralVShades = [
  {
    bgColor: "bg-md3-ref-neutral-variant-neutral-variant10",
    textColor: "text-md3-ref-neutral-variant-neutral-variant99",
    colorHash: nl.get(palette, "colors.md3.ref.neutral-variant.neutral-variant10"),
    shadeName: "NV-10",
  },
  {
    bgColor: "bg-md3-ref-neutral-variant-neutral-variant20",
    textColor: "text-md3-ref-neutral-variant-neutral-variant99",
    colorHash: nl.get(palette, "colors.md3.ref.neutral-variant.neutral-variant20"),
    shadeName: "NV-20",
  },
  {
    bgColor: "bg-md3-ref-neutral-variant-neutral-variant30",
    textColor: "text-md3-ref-neutral-variant-neutral-variant99",
    colorHash: nl.get(palette, "colors.md3.ref.neutral-variant.neutral-variant30"),
    shadeName: "NV-30",
  },
  {
    bgColor: "bg-md3-ref-neutral-variant-neutral-variant40",
    textColor: "text-md3-ref-neutral-variant-neutral-variant99",
    colorHash: nl.get(palette, "colors.md3.ref.neutral-variant.neutral-variant40"),
    shadeName: "NV-40",
  },
  {
    bgColor: "bg-md3-ref-neutral-variant-neutral-variant50",
    textColor: "text-md3-ref-neutral-variant-neutral-variant95",
    colorHash: nl.get(palette, "colors.md3.ref.neutral-variant.neutral-variant50"),
    shadeName: "NV-50",
  },
  {
    bgColor: "bg-md3-ref-neutral-variant-neutral-variant60",
    textColor: "text-md3-ref-neutral-variant-neutral-variant95",
    colorHash: nl.get(palette, "colors.md3.ref.neutral-variant.neutral-variant60"),
    shadeName: "NV-60",
  },
  {
    bgColor: "bg-md3-ref-neutral-variant-neutral-variant70",
    textColor: "text-md3-ref-neutral-variant-neutral-variant95",
    colorHash: nl.get(palette, "colors.md3.ref.neutral-variant.neutral-variant70"),
    shadeName: "NV-70",
  },
  {
    bgColor: "bg-md3-ref-neutral-variant-neutral-variant80",
    textColor: "text-md3-ref-neutral-variant-neutral-variant30",
    colorHash: nl.get(palette, "colors.md3.ref.neutral-variant.neutral-variant80"),
    shadeName: "NV-80",
  },
  {
    bgColor: "bg-md3-ref-neutral-variant-neutral-variant90",
    textColor: "text-md3-ref-neutral-variant-neutral-variant20",
    colorHash: nl.get(palette, "colors.md3.ref.neutral-variant.neutral-variant90"),
    shadeName: "NV-90",
  },
  {
    bgColor: "bg-md3-ref-neutral-variant-neutral-variant95",
    textColor: "text-md3-ref-neutral-variant-neutral-variant5",
    colorHash: nl.get(palette, "colors.md3.ref.neutral-variant.neutral-variant95"),
    shadeName: "NV-95",
  },
];
