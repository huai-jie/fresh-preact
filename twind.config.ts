import { Options } from "$fresh/plugins/twindv1.ts";
import { defineConfig, Preset } from "twind";
// twind preset
import presetAutoPrefix from "twind-preset-autoprefix";
import presetTailWind from "twind-preset-tailwind";
import * as colors from "twind-preset-tailwind-colors";

/** @todo Remove the need for type-assertions */
export default {
  selfURL: import.meta.url,
  // <BaseTheme, Preset<any>[]>
  ...defineConfig({
    presets: [
      presetAutoPrefix() as Preset,
      presetTailWind({
        colors: {
          // This line is required. Otherwise, if removed, the values of other colors with be removed.
          ...colors,
          // Modify primary and secondary colors according to your color-scheme
          primary: "#026beb",
          secondary: "#170139",
          ultralight: "#f8f7f6",
          fresh: "#2FA850",
          danger: "#e90807",
        },
        // deno-lint-ignore no-explicit-any
      }) as Preset<any>,
    ],
  }),
} as Options;
