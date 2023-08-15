import Head from "@/components/Head.tsx";
import { SITE_WIDTH_STYLES } from "@/utils/constants.ts";
import type { UnknownPageProps } from "$fresh/server.ts";

export default function NotFoundPage(props: UnknownPageProps) {
  return (
    <>
      <Head title="Page not found" href={props.url.href} />
      <div
        class={`h-3/4 flex flex-col justify-center ${SITE_WIDTH_STYLES} p-4 text-center space-y-4`}
      >
        <img
          src="https://avatars.githubusercontent.com/u/58794979?s=400&amp;u=c1cfc436a6db878807d7d346a7188fce576cbd8e&amp;v=4"
          class="h-[96px] w-[96px] rounded-full mx-auto mb-8"
          height="96"
          width="96"
          alt=""
        />
        <h1 class="text-4xl inline-block font-bold">Page not found</h1>
        <p class="text-xl text-blue-900">
          <a href="/">Return home</a>
        </p>
      </div>
    </>
  );
}
