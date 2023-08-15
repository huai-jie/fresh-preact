import {
  DANGER_BUTTON_STYLES,
  FORM_INPUT_LABEL_STYLES,
  PRIMARY_BUTTON_STYLES,
  SECONDARY_BUTTON_STYLES,
} from "@/utils/constants.ts";
import { ComponentChild } from "preact";

export interface Inner {
  labelTxt: string;
  optional?: boolean;
  inner: ComponentChild;
  value?: string | number | boolean | bigint | URL;
  isURL?: boolean;
}

export interface FormEntry {
  class?: string;
  id?: string;
  method?: string;
  submitBtnTxt?: string;
  title: string;
  description?: string;
  inners: Inner[];
  editUrl?: string;
  noReversible?: boolean;
  cancel?: boolean;
}

export function Form(props: FormEntry) {
  return (
    //mt-6 new
    <div
      class={`rounded-lg overflow-hidden p-5 bg-ultralight ${
        props.class ? props.class : ""
      }`}
      id={props.id || "form"}
    >
      <header class="flex gap-3 justify-between mb-4">
        <hgroup>
          <h2 class="font-medium text-lg !leading-none text-black capitalize">
            {props.title}
          </h2>
          {props.description && (
            <h3 class="text-gray-500 mt-1 !leading-tight">
              {props.description}
            </h3>
          )}
        </hgroup>
        {!props.method && (
          <a
            class="h-8 px-3.5 rounded-md inline-flex flex-shrink-0 whitespace-nowrap items-center gap-2 transition-colors duration-150 ease-in-out leading-none border-1 cursor-pointer border-gray-200/60 bg-gray-200/60 text-gray-900 hover:bg-gray-200 hover:text-gray-900"
            aria-current="page"
            href={props.editUrl}
          >
            Edit
          </a>
        )}
      </header>
      {props.method === "DELETE" && props.noReversible &&
        (
          <div class="mt-5 p-3 flex items-center justify-between bg-[#e908071a] border border-[#e908074d] rounded-md">
            <span class="flex items-center gap-2 text-danger">
              <span class="w-5 h-5 inline-flex items-center justify-center rounded-full flex-shrink-0 bg-[#e9080726] !w-[1.125rem] !h-[1.125rem]">
                <svg
                  class="text-danger"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="4.75" cy="7.75" r="0.75" fill="currentColor">
                  </circle>
                  <line
                    x1="4.75"
                    y1="1.75"
                    x2="4.75"
                    y2="5.25"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  >
                  </line>
                </svg>
              </span>This action is not reversible.
            </span>
          </div>
        )}
      <form method="POST">
        <div class="flex flex-col gap-1.5">
          <input
            type="hidden"
            class="w-0 h-0 hidden"
            name="_method"
            value={props.method}
          />
          {props.inners.map(({ labelTxt, inner, optional, value, isURL }) => {
            return (
              <>
                <span class={`${FORM_INPUT_LABEL_STYLES}`}>
                  <label>
                    {labelTxt}{" "}
                    {optional && (
                      <span class="text-[10px] normal-case">(optional)</span>
                    )}
                  </label>
                </span>
                {props.method && inner}
                {!props.method && !isURL && <p>{value}</p>}
                {!props.method && isURL && (
                  <a
                    class="hover:underline text-gray-800"
                    target="_blank"
                    href={`${value}`}
                  >
                    {value}
                  </a>
                )}
              </>
            );
          })}
        </div>
        {/* // todo: check there are detail change or not to disavble or enable the submit button */}
        <div class="mt-5 flex justify-end justify-between gap-3">
          {props.cancel && (
            <button
              class={`${SECONDARY_BUTTON_STYLES} mt-3 `}
              disabled={false}
              data-close-modal
            >
              Cancel
            </button>
          )}
          {props.method && (
            <button
              class={`${
                props.cancel ? DANGER_BUTTON_STYLES : PRIMARY_BUTTON_STYLES
              } mt-3 `}
              disabled={false}
              type="submit"
            >
              {props.submitBtnTxt}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
