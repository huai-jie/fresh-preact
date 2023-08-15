import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import {
  DangerZone,
  RightMainSection,
} from "@/routes/company/[slug]/settings.tsx";
import { Address, ADDRESS_INFO_FORM_INNERS } from "./index.tsx";
import { CompanyState } from "../../_middleware.tsx";
import { ProfilePage } from "@/components/ProfilePage.tsx";
import { APP_CONTAINER_STYLES } from "@/utils/constants.ts";
import { COMPANY_NAV_ITEMS, headers, Patch } from "../index.tsx";
import { Form } from "@/components/Form.tsx";
import { FETCH_GET, FETCH_POST } from "@/utils/auth.ts";
import { redirect } from "@/utils/http.ts";

interface AddressPageData extends CompanyState {
  address: Address | undefined;
}

async function sharedHandler(
  req: Request,
  ctx: HandlerContext<AddressPageData, CompanyState>,
) {
  const form = await req.formData();
  const _method = form.get("_method");
  const baseUrl = new URL(req.url).href.split("?")[0];
  let redirectUrl = baseUrl;
  if (_method === "DELETE") {
    const confirm = form.get("confirm");
    if (confirm === "DELETE") {
      const url = `address/${ctx.params.id}`;
      const res = await FETCH_POST(req, url, undefined, _method);
      if (res.ok) redirectUrl = `/company/${ctx.state.company.slug}/address`;
      if (!res.ok && res.statusText) {
        redirectUrl = `${baseUrl}?error=${res.statusText}`;
      }
    }
  } else if (_method === "PATCH") {
    if (_method === "PATCH") {
      const confirm = form.get("confirm");
      redirectUrl = await Patch(
        req,
        ctx as HandlerContext<CompanyState, CompanyState>,
        confirm,
        _method,
      );
    }
  } else if (_method === "POST" || _method === "PUT") {
    const is_default = form.get("is_default");
    const address_1 = form.get("address_1");
    const postcode = form.get("postcode");
    const country = form.get("country");
    const address_label = form.get("address_label");
    const state = form.get("state");
    const city = form.get("city");

    const url = _method === "POST"
      ? `company/${ctx.state.company.slug}/address`
      : `address/${ctx.params.id}`;
    redirectUrl = `/company/${ctx.state.company.slug}/address`;
    const res = await FETCH_POST(
      req,
      url,
      {
        is_default,
        address_1,
        postcode,
        country,
        address_label,
        state,
        city,
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

export const handler: Handlers<AddressPageData, CompanyState> = {
  async GET(req, ctx) {
    let address;
    if (ctx.params.id !== "new") {
      const { data } = await FETCH_GET(req, `address/${ctx.params.id}`);
      if (!data) return redirect(`/company/${ctx.state.company.slug}/address`);
      address = { ...data };
    }
    return ctx.render({ ...ctx.state, address });
  },
  POST: sharedHandler,
};

export default function Slug(props: PageProps<AddressPageData>) {
  return (
    <ProfilePage
      class={APP_CONTAINER_STYLES}
      headers={headers({
        updated_at: props.data.company.updated_at,
        name: props.data.company.name,
        deleted_at: props.data.company.deleted_at,
        is_flagged: props.data.company.is_flagged,
      })}
      nav={{ ...props, data: COMPANY_NAV_ITEMS }}
    >
      <Main {...props} />
    </ProfilePage>
  );
}

export function Main(props: PageProps<AddressPageData>) {
  return (
    <div class="mt-5 w-full">
      <div class="flex gap-5">
        <LeftMainSection {...props} />
        <RightMainSection new={props.params.id === "new"} />
      </div>
    </div>
  );
}

export function LeftMainSection(props: PageProps<AddressPageData>) {
  return (
    <div class="flex flex-col gap-5 flex-1">
      <Form
        method={props.params.id === "new" ? "POST" : "PUT"}
        inners={ADDRESS_INFO_FORM_INNERS(
          props.params.id !== "new" ? { ...props.data.address! } : undefined,
        )}
        title={props.params.id !== "new" ? "Address Info" : "New Address"}
        description={props.params.id !== "new"
          ? "General details of this address."
          : "Add basic info for the new address"}
        submitBtnTxt={props.params.id !== "new" ? "Save" : "Create"}
      />
      {props.params.id !== "new" && (
        <DangerZone title="address" noReversible={true} />
      )}
    </div>
  );
}
