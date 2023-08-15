import type { Handlers, PageProps } from "$fresh/server.ts";
import { NOTICE_STYLES, REDIRECT_PATH_AFTER_LOGIN } from "@/utils/constants.ts";
import type { State } from "@/routes/_middleware.ts";
import { redirect } from "@/utils/http.ts";
import { BUTTON_STYLES, INPUT_STYLES } from "@/utils/constants.ts";
import { authenticate, login } from "@/utils/auth.ts";
import CSRFTokenCatcher from "@/islands/CSRFTokenCatcher.tsx";

// deno-lint-ignore no-explicit-any
export const handler: Handlers<any, State> = {
  /**
   * Redirects the client to the authenticated redirect path if already login.
   * If not logged in, it continues to rendering the login page.
   */
  async GET(req, ctx) {
    const res = await authenticate(req.headers);

    if (res.ok) {
      return redirect("/");
    }

    return ctx.render();
  },
  async POST(req, _ctx) {
    const form = await req.formData();
    const username = form.get("username") as string;
    const password = form.get("password") as string;
    let redirectUrl = new URL(req.url).searchParams.get("redirect_url") ??
      REDIRECT_PATH_AFTER_LOGIN;
    const res = await login(req, { username, password });
    const { errors, message } = res;
    if (errors && message) {
      redirectUrl = `/login?error=${encodeURIComponent(message)}`;
    } else return res;

    return redirect(`${redirectUrl}`);
  },
};

export default function LoginPage(props: PageProps) {
  const errorMessage = props.url.searchParams.get("error");

  return (
    <div class="max-w-xs flex h-3/4 m-auto">
      <div class="m-auto w-72">
        <img
          src="https://avatars.githubusercontent.com/u/58794979?s=400&amp;u=c1cfc436a6db878807d7d346a7188fce576cbd8e&amp;v=4"
          class="h-[96px] w-[96px] rounded-full mx-auto mb-8"
          height="96"
          width="96"
          alt=""
        />

        {errorMessage && (
          <div class={`${NOTICE_STYLES} mb-4`}>{errorMessage}</div>
        )}

        {/* <CSRFTokenCatcher /> */}
        <form method="POST" class="space-y-4">
          <input
            placeholder="Username / Email Address"
            name="username"
            type="username"
            required
            class={INPUT_STYLES}
          />
          <input
            placeholder="Password"
            name="password"
            type="password"
            required
            class={INPUT_STYLES}
          />
          <button type="submit" class={`${BUTTON_STYLES} w-full`}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
