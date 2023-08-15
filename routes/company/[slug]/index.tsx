import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import { NavBarProps, ProfilePage } from "@/components/ProfilePage.tsx";
import {
  APP_CONTAINER_STYLES,
  FORM_INPUT_FIELD_STYLES,
  SECONDARY_BUTTON_STYLES,
} from "@/utils/constants.ts";
import IconFlag from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/flag.tsx";
import { COMPANY_TYPES, COUNTRIES } from "@/utils/db_constants.ts";
import { Form, FormEntry, Inner } from "@/components/Form.tsx";
import type {
  CompanyFormInfo,
  CompanyState,
  InitCompanyInfo,
} from "@/routes/company/_middleware.tsx";
import { timeAgo } from "@/utils/display.ts";
import { redirect } from "@/utils/http.ts";
import { FETCH_POST } from "@/utils/auth.ts";

export async function Patch(
  req: Request,
  ctx: HandlerContext<CompanyState, CompanyState>,
  confirm: FormDataEntryValue | null,
  _method: FormDataEntryValue | null,
) {
  let url = "/";
  if (confirm === "RESTORE") {
    url = `company/${ctx.state.company.slug}/restore`;
  } else if (!confirm) {
    url = `company/${ctx.state.company.slug}/${
      ctx.state.company.is_flagged ? "remove" : "add"
    }-flag`;
  }
  const res = await Promise.resolve(FETCH_POST(req, url, undefined, _method));
  const baseUrl = new URL(req.url).href.split("?")[0];
  let redirectUrl = baseUrl;
  if (!res.ok && res.statusText) {
    redirectUrl = `${baseUrl}?error=${res.statusText}`;
  }
  return redirectUrl;
}

export async function sharedHandler(
  req: Request,
  ctx: HandlerContext<CompanyState, CompanyState>,
) {
  const form = await req.formData();
  const _method = form.get("_method");
  let res;
  const baseUrl = new URL(req.url).href.split("?")[0];
  let redirectUrl = baseUrl;
  if (_method === "DELETE") {
    const confirm = form.get("confirm");
    if (confirm === "DELETE") {
      const url = `company/${ctx.params.slug}`;
      res = await FETCH_POST(req, url, undefined, _method);
      if (res.ok) redirectUrl = "/company";
      if (!res.ok && res.statusText) {
        redirectUrl = `${baseUrl}?error=${res.statusText}`;
      }
    }
  } else if (_method === "PATCH") {
    const confirm = form.get("confirm");
    const _method = form.get("_method");
    redirectUrl = await Patch(req, ctx, confirm, _method);
  } else if (_method === "POST" || _method === "PUT") {
    const name = form.get("name");
    const country = form.get("country");
    const company_type = form.get("company_type");
    const website = form.get("website");
    const workday_limit = form.get("workday_limit");

    const url = _method === "POST" ? `company` : `company/${ctx.params.slug}`;
    if (_method === "POST") redirectUrl = "/company";
    res = await FETCH_POST(
      req,
      url,
      {
        name,
        country,
        company_type,
        website,
        workday_limit,
      },
      _method,
    );
    const { message, errors } = res;
    if (message) {
      redirectUrl = `${baseUrl}?error=${encodeURIComponent(message)}`;
    }
  }
  return redirect(redirectUrl);
}

export const handler: Handlers<CompanyState, CompanyState> = {
  GET(_req, ctx) {
    return ctx.render({ ...ctx.state });
  },
  POST: sharedHandler,
};

export default function Slug(props: PageProps<CompanyState>) {
  return (
    <ProfilePage
      class={`${APP_CONTAINER_STYLES} ${
        props.params.slug === "new" ? "!max-w-3xl" : ""
      }`}
      headers={headers({
        updated_at: props.data.company.updated_at,
        deleted_at: props.data.company.deleted_at,
        name: props.data.company.name,
        is_flagged: props.data.company.is_flagged,
      })}
      nav={{ ...props, data: COMPANY_NAV_ITEMS }}
      new={props.params.slug === "new"}
    >
      {props.params.slug === "new"
        ? (
          <New
            title="company"
            description="This company should be your client."
            form={{
              class: "mt-6",
              method: "POST",
              inners: [...COMPANY_INFO_FORM_INNERS()],
              title: "Create a company",
              description: "Enter basic info for the new company.",
              submitBtnTxt: "Create",
            }}
          />
        )
        : <Main {...props} />}
    </ProfilePage>
  );
}

export function headers(data: InitCompanyInfo) {
  return {
    title: data.name,
    description: {
      inner: <p>Last update: {timeAgo(data.updated_at)}</p>,
    },
    is_deleted: !!data.deleted_at,
    is_flagged: data.is_flagged,
    buttons: [
      {
        inner: (
          <form method="POST" id="flag">
            <input
              type="hidden"
              name="_method"
              class="w-0 h-0 hidden"
              value="PATCH"
            />
            <button type="submit" class={SECONDARY_BUTTON_STYLES} form="flag">
              <IconFlag class="w-5 h-5" />
              {data.is_flagged ? "Unflag" : "Flag"}
            </button>
          </form>
        ),
      },
    ],
  };
}

export const COMPANY_NAV_ITEMS: NavBarProps = {
  baseRoute: "company",
  navItems: ["address", "contacts", "quotations", "jobs", "settings"],
};

export function Main(props: PageProps<CompanyState>) {
  return (
    <div class="mt-5 w-full">
      <div class="w-full flex gap-4">
        <LeftMainSection {...props} />
        <RightMainSection {...props} />
      </div>
    </div>
  );
}

export function LeftMainSection(props: PageProps<CompanyState>) {
  return (
    <div class="w-full flex-1">
      <Form
        inners={COMPANY_INFO_FORM_INNERS({ ...props.data.company })}
        title="Company Info"
        description={`General details of ${props.data.company.name}`}
        editUrl={`${props.params.slug}/settings`}
      />
    </div>
  );
}

// Todo:Upload image
export function RightMainSection(props: PageProps) {
  return (
    <div class="w-64 flex-shrink-0 hidden lg:!flex flex-col gap-4">
      <div class="rounded-lg overflow-hidden p-5 border border-gray-300/60 shadow-lg shadow-transparent hover:shadow-gray-100/80 transition-shadow duration-450 ease-in-out flex flex-col justify-between min-h-56 !p-4">
        <header class="flex items-center gap-1">
          <h3 class="ftext-base font-medium text-gray-800">Image</h3>
        </header>
        <div class="w-6/12 mx-auto">
          <img
            src="https://avatars.githubusercontent.com/u/58794979?s=400&u=c1cfc436a6db878807d7d346a7188fce576cbd8e&v=4"
            class="w-full rounded-full"
            alt=""
          />
        </div>
        <button class="mt-3 h-9 px-[1.125rem] rounded-md inline-flex flex-shrink-0 whitespace-nowrap items-center gap-2 transition-colors duration-150 ease-in-out leading-none border-1 cursor-pointer border-gray-200/60 bg-gray-200/60 text-gray-900 hover:bg-gray-200 hover:text-gray-900 w-full justify-between !px-3">
          <svg
            aria-hidden="true"
            height="16"
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            data-view-component="true"
            class="octicon octicon-pencil"
          >
            <path d="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm.176 4.823L9.75 4.81l-6.286 6.287a.253.253 0 0 0-.064.108l-.558 1.953 1.953-.558a.253.253 0 0 0 .108-.064Zm1.238-3.763a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354Z">
            </path>
          </svg>
          Edit Image
          <svg
            class="opacity-50"
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.5 13L10.5 8L5.5 3"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
            </path>
          </svg>
        </button>
      </div>
      <div class="rounded-lg overflow-hidden p-5 border border-gray-300/60 shadow-lg shadow-transparent hover:shadow-gray-100/80 transition-shadow duration-450 ease-in-out">
        <header class="flex items-center gap-1">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.99992 1.33334C5.41992 1.33334 3.33325 3.42001 3.33325 6.00001C3.33325 7.58668 4.12659 8.98001 5.33325 9.82668V11.3333C5.33325 11.7 5.63325 12 5.99992 12H9.99992C10.3666 12 10.6666 11.7 10.6666 11.3333V9.82668C11.8733 8.98001 12.6666 7.58668 12.6666 6.00001C12.6666 3.42001 10.5799 1.33334 7.99992 1.33334ZM9.33325 9.05334V10.6667H8.66659V7.60668L9.80659 6.47334C10.0666 6.21334 10.0666 5.78668 9.80659 5.52668C9.54659 5.26668 9.11992 5.26668 8.85992 5.52668L7.99992 6.39334L7.13992 5.52668C6.87992 5.26668 6.45325 5.26668 6.19325 5.52668C5.93325 5.78668 5.93325 6.21334 6.19325 6.47334L7.33325 7.60668V10.6667H6.66659V9.05334C5.48659 8.54001 4.66659 7.36668 4.66659 6.00001C4.66659 4.16001 6.15992 2.66668 7.99992 2.66668C9.83992 2.66668 11.3333 4.16001 11.3333 6.00001C11.3333 7.36668 10.5133 8.54001 9.33325 9.05334ZM5.99992 13.3333H9.99992V14C9.99992 14.3667 9.69992 14.6667 9.33325 14.6667H6.66659C6.29992 14.6667 5.99992 14.3667 5.99992 14V13.3333Z"
              fill="currentColor"
            >
            </path>
          </svg>
          <h3 class="ftext-base font-medium text-gray-800">Quick Access</h3>
        </header>
        <ul class="mt-3">
          <li class="mt-0.5">
            <a
              class="text-sm text-gray-600 hover:text-black hover:underline"
              href={`${new URL(props.url)}/address`}
              aria-current="page"
            >
              Set Default Address
            </a>
          </li>
          <li class="mt-0.5">
            <a
              class="text-sm text-gray-600 hover:text-black hover:underline"
              href={`${new URL(props.url)}/contacts`}
              aria-current="page"
            >
              Add Contacts
            </a>
          </li>
          <li class="mt-0.5">
            <a
              class="text-sm text-gray-600 hover:text-black hover:underline"
              href="/company"
            >
              Back to Companies List
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export function COMPANY_INFO_FORM_INNERS(props?: CompanyFormInfo): Inner[] {
  return [
    {
      labelTxt: "name",
      inner: (
        <input
          placeholder="Name"
          name="name"
          type="text"
          required
          class={FORM_INPUT_FIELD_STYLES}
          value={props?.name || ""}
        />
      ),
      value: props?.name,
    },
    {
      labelTxt: "country",
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
      value: props?.country_name,
    },
    {
      labelTxt: "type",
      inner: (
        <select
          placeholder="Selecet a Type"
          name="company_type"
          required
          class={FORM_INPUT_FIELD_STYLES}
          value={props?.company_type || 1}
        >
          {COMPANY_TYPES.map(({ value, label }) => {
            return <option value={value}>{label}</option>;
          })}
        </select>
      ),
      value: props?.company_type_name,
    },
    {
      labelTxt: "website",
      isURL: true,
      optional: true,
      inner: (
        <input
          placeholder="URL"
          name="website"
          type="url"
          required={false}
          class={FORM_INPUT_FIELD_STYLES}
          value={props?.website}
        />
      ),
      value: props?.website || "N/A",
    },
    {
      labelTxt: "Workday Limit",
      inner: (
        <div class="flex gap-1.5">
          <input
            placeholder="Workday Limit"
            name="workday_limit"
            type="number"
            min="0"
            required
            class={FORM_INPUT_FIELD_STYLES}
            value={props?.workday_limit}
          />
          <span class="font-medium text-gray-700 leadin-8 whitespace-nowrap">
            day(s)
          </span>
        </div>
      ),
      value: `${props?.workday_limit} day(s)`,
    },
  ];
}

interface NewProps {
  title: string;
  description: string;
  form: FormEntry;
}

export function New(props: NewProps) {
  return (
    <>
      <header>
        <hgroup class="flex-1">
          <h2 class="font-bold text-2xl !leading-none text-black capitalize">
            New {props.title}
          </h2>
          <h3 class="text-gray-500 leading-tight mt-1.5">
            {props.description}
          </h3>
        </hgroup>
      </header>
      <Form
        class={props.form.class}
        method={props.form.method}
        inners={props.form.inners}
        title={props.form.title}
        description={props.form.description}
        submitBtnTxt={props.form.submitBtnTxt}
      />
    </>
  );
}
