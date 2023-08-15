import { Form, Inner } from "@/components/Form.tsx";
import { useEffect } from "preact/hooks";
import { FORM_INPUT_FIELD_STYLES } from "@/utils/constants.ts";

export function ACTION_FORM_INNERS(props: { action: string }): Inner[] {
  return [
    {
      labelTxt: `Please enter ${
        props.action === "DELETE" ? "DELETE" : "RESTORE"
      } to continue`,
      inner: (
        <input
          placeholder={`${props.action === "DELETE" ? "DELETE" : "RESTORE"}`}
          name="confirm"
          type="text"
          required
          class={FORM_INPUT_FIELD_STYLES}
          pattern={`${props.action === "DELETE" ? "DELETE" : "RESTORE"}`}
          value=""
        />
      ),
    },
  ];
}
export default function Modal(
  props: { title: string; noReversible: boolean; action: string },
) {
  useEffect(() => {
    const modal = document.querySelector("[data-modal]") as HTMLDialogElement;
    Array.from(document.querySelectorAll("button[data-open-modal]"))?.map(
      function (elem) {
        elem.addEventListener("click", () => {
          modal.showModal();
        });
      },
    );
    Array.from(document.querySelectorAll("button[data-close-modal]"))?.map(
      function (elem) {
        elem.addEventListener("click", () => {
          modal.close();
        });
      },
    );
  }, []);
  return (
    <dialog data-modal class="relative z-10 w-0 h-0 border-0">
      <div class="fixed inset-0 w-full h-full bg-black/30 transition-opacity duration-100 opacity-100">
      </div>
      <div class="fixed inset-0 z-10 w-screen h-screen flex items-center justify-center">
        <Form
          class="relative bg-white border border-gray-300/70 rounded-lg shadow-xl shadow-gray-500/10 overflow-auto transition-top,opacity duration-300 top-0 opacity-100 w-full max-w-lg"
          method={`${props.action}`}
          noReversible={props.noReversible}
          inners={ACTION_FORM_INNERS({ action: props.action })}
          title={`${
            props.action === "DELETE" ? "Delete" : "Restore"
          } ${props.title}`}
          description={`You are about to ${
            props.action === "DELETE" ? "DELETE" : "RESTORE"
          } this ${props.title}.`}
          submitBtnTxt={`${props.action === "DELETE" ? "Delete" : "Restore"}`}
          cancel={true}
        />
      </div>
    </dialog>
  );
}
