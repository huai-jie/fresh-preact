export const SITE_NAME = "SmartStripe (Beta)";
export const SITE_DESCRIPTION = "SmartStripe In-House System";
export const REDIRECT_PATH_AFTER_LOGIN = "/";

/**
 * These are base styles for some elements. This approach is chosen as it avoids more complex alternatives:
 * 1. Writing custom classes in Tailwind CSS (see https://tailwindcss.com/docs/reusing-styles#compared-to-css-abstractions)
 * 2. Writing custom components which offer no additional funtionality beyond styling
 */
export const BUTTON_STYLES =
  "px-4 py-2 bg-primary hover:bg-white text-white hover:text-primary text-lg rounded-lg border-2 border-primary transition duration-300 disabled:(opacity-50 cursor-not-allowed)";
export const INPUT_STYLES =
  "px-4 py-2 bg-white rounded rounded-lg outline-none w-full border-1 border-gray-300 hover:border-black transition duration-300 disabled:(opacity-50 cursor-not-allowed)";
export const NOTICE_STYLES =
  "px-4 py-2 rounded-lg bg-yellow-100 text-yellow-700 text-sm";
export const SITE_WIDTH_STYLES = "mx-auto max-w-7xl w-full";

export const FORM_POSTFIX_TEXT =
  "font-medium text-gray-700 leading-8 whitespace-nowrap"; //.deno.dev
export const FORM_INPUT_LABEL_STYLES =
  "flex items-center mt-5 mb-1 uppercase text-xs text-gray-400";
export const FORM_INPUT_FIELD_STYLES =
  "border rounded-md border-gray-300 bg-white h-9 lt-sm:flex-grow sm:w-90 px-3 text-gray-500 outline-none focus:text-gray-800 focus:border-gray-500 hover:border-gray-500 transition-colors";
export const FORM_SAVE_BUTTON =
  "h-8 px-3.5 rounded-md inline-flex flex-shrink-0 whitespace-nowrap items-center gap-2 transition-colors duration-150 ease-in-out leading-none border-1 opacity-60 cursor-not-allowed border-gray-200/60 bg-gray-200/60 text-gray-900";

export const NAV_LIST_ITEM_STYLES =
  "inline-block h-[1.875rem] !leading-7 border-b-2 border-transparent text-base text-gray-500 hover:text-black transition-colors capitalize";

export const NAV_LIST_ACTIVE_ITEM_STYLES =
  "!border-black !border-b-2 !text-black";

export const CONTAINER_STYLES = "w-full mx-auto px-8 lt-md:!px-4";
export const APP_CONTAINER_STYLES = `${CONTAINER_STYLES} md:max-w-5xl`;
export const INDEX_CONTAINER_STYLES = `${CONTAINER_STYLES} md:max-w-4xl`;

export const BASE_BUTTON_STYLES =
  "px-[1.125rem] rounded-md inline-flex flex-shrink-0 whitespace-nowrap items-center gap-2 transition-colors duration-150 ease-in-out leading-none border-1 cursor-pointer hover:bg-white disabled:opacity-60 disabled:cursor-not-allowed disabled:border-gray-200/60 disabled:bg-gray-200/60 disabled:text-gray-900";
export const PRIMARY_EFFECT_STYLES =
  "border-primary bg-primary text-white hover:text-primary";
export const DANGER_EFFECT_STYLES =
  "border-danger bg-danger text-white hover:text-danger";
export const SECONDARY_EFFECT_STYLES =
  "border-gray-200/60 bg-gray-200/60 text-gray-900 hover:!bg-gray-200 hover:text-gray-900";
export const PRIMARY_BUTTON_STYLES =
  `h-9 ${BASE_BUTTON_STYLES} ${PRIMARY_EFFECT_STYLES}`;
export const SECONDARY_BUTTON_STYLES =
  `h-9 ${BASE_BUTTON_STYLES} ${SECONDARY_EFFECT_STYLES}`;
export const DANGER_BUTTON_STYLES =
  `h-9 ${BASE_BUTTON_STYLES} ${DANGER_EFFECT_STYLES}`;
"h-8 ...";
