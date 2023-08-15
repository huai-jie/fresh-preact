import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { walk } from "$std/fs/walk.ts";
import { authenticate } from "@/utils/auth.ts";

const STATIC_DIR_ROOT = new URL("../static", import.meta.url);
const staticFileNames: string[] = [];
for await (const { name } of walk(STATIC_DIR_ROOT, { includeDirs: false })) {
  staticFileNames.push(name);
}

export interface State {
  // session: any;
}

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<State>,
) {
  const { pathname } = new URL(req.url);
  // Don't process session-related data for keepalive and static requests
  if (["_frsh", ...staticFileNames].some((part) => pathname.includes(part))) {
    return await ctx.next();
  }
  //try catch
  // deno-lint-ignore no-explicit-any
  // ctx.state.session = await authenticate(req.headers).then((response: any) =>
  //   response.json()
  // )
  //   .then((data) => {
  //     return data;
  //   });

  const response = await ctx.next();

  return response;
}
