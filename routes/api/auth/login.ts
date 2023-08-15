import { HandlerContext } from "$fresh/server.ts";
import { redirect } from "@/utils/http.ts";

export const handler = (_req: Request, _ctx: HandlerContext): Response => {
  // Todo: optimize with env & able to redirect back the initital url
  const url = Deno.env.get("FRONTEND_URL") ?? "http://localhost:3000";
  return redirect(url);
};
