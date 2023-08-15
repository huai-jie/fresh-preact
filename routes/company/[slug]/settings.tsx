import {
  COMPANY_INFO_FORM_INNERS,
  COMPANY_NAV_ITEMS,
  headers,
  sharedHandler,
} from "@/routes/company/[slug]/index.tsx";
import type { CompanyState } from "@/routes/company/_middleware.tsx";
import { AlertIcon } from "@/components/Icons.tsx";
import { Form } from "@/components/Form.tsx";
import { ProfilePage } from "@/components/ProfilePage.tsx";
import { APP_CONTAINER_STYLES } from "@/utils/constants.ts";
import Menu from "@/islands/Menu.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import Modal from "@/islands/Modal.tsx";

export const handler: Handlers<CompanyState, CompanyState> = {
  GET(_req, ctx) {
    return ctx.render({ ...ctx.state });
  },
  POST: sharedHandler,
};

export default function Settings(props: PageProps<CompanyState>) {
  return (
    <ProfilePage
      class={APP_CONTAINER_STYLES}
      headers={headers({
        updated_at: props.data.company.updated_at,
        deleted_at: props.data.company.deleted_at,
        name: props.data.company.name,
        is_flagged: props.data.company.is_flagged,
      })}
      nav={{ ...props, data: COMPANY_NAV_ITEMS }}
    >
      <Main {...props} />
    </ProfilePage>
  );
}

export function Main(props: PageProps<CompanyState>) {
  return (
    <div class="mt-5 w-full">
      <div class="flex gap-5">
        <LeftMainSection {...props} />
        <RightMainSection />
      </div>
    </div>
  );
}

export function LeftMainSection(props: PageProps<CompanyState>) {
  return (
    <div class="flex flex-col gap-5 flex-1">
      <Form
        method="PUT"
        inners={COMPANY_INFO_FORM_INNERS({ ...props.data.company })}
        title="Company Info"
        description="General details of this company."
        submitBtnTxt="Save"
      />
      <DangerZone title="company" restore={!!props.data.company.deleted_at} />
    </div>
  );
}

export function DangerZone(
  props: { title: string; noReversible?: boolean; restore?: boolean },
) {
  return (
    <div id="danger-zone">
      <div class="mb-3 flex items-center gap-1.5 text-xs text-gray-400">
        <AlertIcon />
        DANGER ZONE
      </div>
      <div class="rounded-lg overflow-hidden p-5 bg-ultralight mt-5">
        <header class="flex gap-3 justify-between mb-4">
          <hgroup>
            <h2 class="font-medium text-lg !leading-none text-black capitalize">
              {props.restore ? "Restore" : "Delete"} {props.title}
            </h2>
            <h3 class="text-gray-500 mt-1 !leading-tight">
              Be aware all the data related to this {props.title} would be{" "}
              {props.restore ? "restored" : "deleted"}{" "}
              after this action. Please do take note on this.
            </h3>
          </hgroup>
          <div></div>
        </header>
        <button
          class="h-8 px-3.5 rounded-md inline-flex flex-shrink-0 whitespace-nowrap items-center gap-2 transition-colors duration-150 ease-in-out leading-none border-1 cursor-pointer text-danger bg-white border-danger hover:bg-danger hover:text-white"
          type="button"
          data-open-modal
        >
          {props.restore ? "RESTORE" : "DELETE"}
        </button>
      </div>
      <Modal
        title={props.title}
        noReversible={!!props.noReversible}
        action={props.restore ? "PATCH" : "DELETE"}
      />
    </div>
  );
}

export function RightMainSection(props: { new?: boolean }) {
  return <Menu new={props.new} />;
}
