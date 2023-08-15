import {
  APP_CONTAINER_STYLES,
  FORM_INPUT_FIELD_STYLES,
  PRIMARY_BUTTON_STYLES,
} from "@/utils/constants.ts";
import {
  COMPANY_NAV_ITEMS,
  headers,
  Patch,
} from "@/routes/company/[slug]/index.tsx";
import { HandlerContext, PageProps } from "$fresh/server.ts";
import { AddIcon } from "@/components/Icons.tsx";
import { Inner } from "@/components/Form.tsx";
import { ADDRESS_TYPES, COUNTRIES } from "@/utils/db_constants.ts";
import Modal from "@/islands/Modal.tsx";
import { Handlers } from "$fresh/server.ts";
import { CompanyState } from "../../_middleware.tsx";
import { ProfilePage } from "@/components/ProfilePage.tsx";
import { pluralize, timeAgo } from "@/utils/display.ts";
import { FETCH_GET } from "@/utils/auth.ts";
import { redirect } from "@/utils/http.ts";

export interface Address {
  id: number;
  is_default: boolean;
  address_1: string;
  country: number;
  country_name: string;
  postcode: string;
  address_label: string;
  city?: string;
  state?: string;
  updated_at: string;
}

interface AddressesPageData extends CompanyState {
  addresses: Address[];
}

export const handler: Handlers<AddressesPageData, CompanyState> = {
  async GET(req, ctx) {
    const res = await FETCH_GET(req, new URL(req.url).pathname.slice(1));
    const { data: addresses } = res;
    if (!addresses) return res;
    return ctx.render({ ...ctx.state, addresses });
  },
  async POST(req, ctx) {
    let redirectUrl = new URL(req.url).href.split("?")[0];
    const form = await req.formData();
    const _method = form.get("_method");
    if (_method === "PATCH") {
      const confirm = form.get("confirm");
      redirectUrl = await Patch(
        req,
        ctx as HandlerContext<CompanyState, CompanyState>,
        confirm,
        _method,
      );
    }
    return redirect(redirectUrl);
  },
};

export default function Address(props: PageProps<AddressesPageData>) {
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

export function Main(props: PageProps<AddressesPageData>) {
  return (
    <div class="mt-5 w-full">
      <div class="w-full flex flex-col">
        <div class="min-w-full">
          <header class={`flex items-center justify-between gap-4 mb-4`}>
            <hgroup class="flex-1">
              <h2 class="font-bold text-2xl !leading-none text-black">
                Addresses List{" "}
              </h2>{" "}
              <h3 class="text-gray-500 leading-tight mt-1.5 capitalize">
                <strong>{props.data.addresses.length}</strong>{" "}
                {pluralize(props.data.addresses.length, "address", true)}
              </h3>
            </hgroup>
            <div class="flex gap-2 justify-end flex-shrink-0">
              <a
                type="link"
                class={PRIMARY_BUTTON_STYLES}
                href={`${new URL(props.url).pathname}/new`}
                aria-current="page"
              >
                <AddIcon /> New Address
              </a>
            </div>
          </header>

          <div class="mt-3 flex flex-col gap-3">
            {props.data.addresses.map((address) => {
              return <ItemSummary {...address} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ItemSummary(props: Address) {
  return (
    <div class="flex items-center justify-between gap-3 px-5 py-0 rounded-lg border border-gray-300/80 hover:border-gray-500/80 transition-colors duration-200">
      <script
        dangerouslySetInnerHTML={{
          __html: `

            `,
        }}
      />
      <a
        class="block flex-1 py-5"
        href={`address/${props.id}`}
        aria-current="page"
      >
        <h2>
          <strong class="text-base leading-tight font-medium align-middle">
            {props.address_1}
          </strong>
          {" "}
        </h2>
        <h2>
          <strong class="text-base leading-tight font-medium align-middle">
            {props.country_name}
          </strong>
          {" "}
        </h2>
        <h2>
          <strong class="text-base leading-tight font-medium align-middle">
            {props.postcode}
          </strong>
          {" "}
        </h2>

        {!!props.is_default && (
          <p class="px-2 mt-1.5 inline-flex items-center justify-center rounded-full flex-shrink-0 bg-[#2fa85026]">
            <span class="text-fresh capitalize">default</span>
          </p>
        )}
        <p class="flex items-center gap-1.5 mt-1.5 text-sm text-gray-500">
          Last Update: {timeAgo(props.updated_at)}
        </p>
      </a>
      <a
        class="h-8 px-3.5 rounded-md inline-flex flex-shrink-0 whitespace-nowrap items-center gap-2 transition-colors duration-150 ease-in-out leading-none border-1 cursor-pointer border-gray-200/60 bg-gray-200/60 text-gray-900 hover:bg-gray-200 hover:text-gray-900"
        href={`address/${props.id}`}
      >
        Edit
      </a>
    </div>
  );
}

export function ADDRESS_INFO_FORM_INNERS(props?: Address): Inner[] {
  return [
    {
      labelTxt: "Addres Type",
      inner: (
        <select
          placeholder="Selecet a Type"
          name="is_default"
          required
          class={FORM_INPUT_FIELD_STYLES}
          value={Number(props?.is_default) ?? 1}
        >
          {ADDRESS_TYPES.map(({ value, label }) => {
            return <option value={value}>{label}</option>;
          })}
        </select>
      ),
    },
    {
      labelTxt: "Address",
      inner: (
        <input
          placeholder="Address"
          name="address_1"
          type="text"
          required
          class={FORM_INPUT_FIELD_STYLES}
          value={props?.address_1}
        />
      ),
    },
    {
      labelTxt: "Zip / Postcode",
      inner: (
        <input
          placeholder="Zip / Postcode"
          name="postcode"
          type="text"
          required
          class={FORM_INPUT_FIELD_STYLES}
          value={props?.postcode}
        />
      ),
    },
    {
      labelTxt: "Country",
      inner: (
        <select
          placeholder="Selecet a Country"
          name="country"
          required
          class={FORM_INPUT_FIELD_STYLES}
          value={props?.country || 1}
        >
          {COUNTRIES.map(({ value, label }) => {
            return <option value={value}>{label}</option>;
          })}
        </select>
      ),
    },
    {
      labelTxt: "Label",
      inner: (
        <input
          placeholder="i.e. HQ / Office / Depot"
          name="address_label"
          type="text"
          required
          class={FORM_INPUT_FIELD_STYLES}
          value={props?.address_label}
        />
      ),
    },
    {
      labelTxt: "State / Province",
      optional: true,
      inner: (
        <input
          placeholder="State / Province"
          name="state"
          type="text"
          required={false}
          class={FORM_INPUT_FIELD_STYLES}
          value={props?.state}
        />
      ),
    },
    {
      labelTxt: "City",
      optional: true,
      inner: (
        <input
          placeholder="City"
          name="city"
          type="text"
          required={false}
          class={FORM_INPUT_FIELD_STYLES}
          value={props?.city}
        />
      ),
    },
  ];
}
