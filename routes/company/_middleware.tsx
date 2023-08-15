import { State } from "@/routes/_middleware.ts";
import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { redirect } from "@/utils/http.ts";
import { FETCH_GET } from "@/utils/auth.ts";

export interface CompanyName {
  name: string;
}

export interface InitCompanyInfo extends CompanyName {
  updated_at: Date | string;
  is_flagged: boolean;
  deleted_at: string | Date | null;
}
export interface CompanyFormInfo extends CompanyName {
  workday_limit: number;
  company_type: number;
  company_type_name: string;
  country: number;
  country_name: string;
  website: string;
}

export interface Company extends InitCompanyInfo, CompanyFormInfo {
  slug: string;
}

export interface Companies {
  companies: Company[];
}

export interface CompanyState extends State {
  // sessionId: string;
  company: Company;
}

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<CompanyState>,
) {
  // const redirectResponse = redirect("/login");

  // if (!ctx.state.sessionId) return redirectResponse;

  // const user = await getUserBySessionId(ctx.state.sessionId);
  // if (!user) return redirectResponse;
  // ctx.state.user = user;

  if (new URL(req.url).pathname !== "/company") {
    let companyData: Company;
    const slug = new URL(req.url).pathname.split("/")[2];
    if (slug !== "new") {
      const { data } = await FETCH_GET(req, `company/${slug}`);
      if (!data) return redirect("/company");
      companyData = { ...data };
    }
    ctx.state.company = { ...companyData! };
  }

  return await ctx.next();
}
