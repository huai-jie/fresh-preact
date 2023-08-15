import { Handlers, PageProps } from "$fresh/server.ts";
import { FETCH_GET } from "@/utils/auth.ts";
import {
  INDEX_CONTAINER_STYLES,
  PRIMARY_BUTTON_STYLES,
  SECONDARY_BUTTON_STYLES,
} from "@/utils/constants.ts";
import { AddIcon } from "@/components/Icons.tsx";
import { Companies, Company } from "./_middleware.tsx";
import { pluralize, timeAgo } from "@/utils/display.ts";
import IconFlag from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/flag.tsx";

export const handler: Handlers = {
  async GET(req, ctx) {
    const res = await FETCH_GET(req, "company");
    const { data: companies } = res;
    if (!companies) return res;
    return ctx.render({ ...ctx, companies });
  },
};

export default function Index(props: PageProps<Companies>) {
  return (
    <div class={INDEX_CONTAINER_STYLES}>
      <Header {...props} />
      <Main {...props} />
    </div>
  );
}

export function Header(props: PageProps<Companies>) {
  return (
    <header
      class={`flex items-center justify-between gap-4`}
    >
      <hgroup class="flex-1">
        <h2 class="font-bold text-2xl !leading-none text-black">
          Companies List{" "}
        </h2>{" "}
        <h3 class="text-gray-500 leading-tight mt-1.5 capitalize">
          <strong>{props.data.companies.length}</strong>{" "}
          {pluralize(props.data.companies.length, "company", true)}
        </h3>
      </hgroup>
      <div class="flex gap-2 justify-end flex-shrink-0">
        <a
          type="link"
          class={PRIMARY_BUTTON_STYLES}
          href="/company/new"
          aria-current="page"
        >
          <AddIcon /> New Company
        </a>
      </div>
    </header>
  );
}

export function Search() {
  return (
    <form action="GET" class="flex gap-3">
      <label class="inline-flex items-center justify-between gap-1 px-3 transition-colors duration-150 ease-in-out group bg-gray-100 text-default border border-transparent focus-within:bg-white focus-within:border focus-within:border-gray-400 rounded-md h-9 w-64 lt-sm:!hidden">
        <input
          placeholder="Company name"
          autocomplete="off"
          class="flex-1 bg-transparent placeholder:text-gray-400 border-none outline-none min-w-10"
          type="text"
        />
      </label>
      <button class={SECONDARY_BUTTON_STYLES} type="submit">
        Search
      </button>
    </form>
  );
}

export function Main(props: PageProps<Companies>) {
  return (
    <div class="mt-5 w-full">
      <div class="mt-3 w-full flex flex-col">
        <div class="min-w-full py-2">
          <Search />
          <div class="mt-3 flex flex-col gap-3">
            {props.data.companies.map((company) => {
              return <ItemSummary {...company} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ItemSummary(props: Company) {
  return (
    <div class="flex items-center justify-between gap-3 px-5 py-0 rounded-lg border border-gray-300/80 hover:border-gray-500/80 transition-colors duration-200">
      <a
        class="block flex-1 py-5"
        href={`/company/${props.slug}`}
        aria-current="page"
      >
        <h2>
          <strong class="text-base leading-tight font-medium align-middle">
            {props.name}
          </strong>{" "}
          {!!props.is_flagged && (
            <IconFlag class="w-5 h-5 bg-yellow-300 inline-block rounded" />
          )}{" "}
          {!!props.deleted_at && (
            <p class="px-2 mt-1.5 inline-flex items-center justify-center rounded-full flex-shrink-0 bg-red-50 inline-block">
              <span class="text-red-600 capitalize">
                DELETED
              </span>
            </p>
          )}
        </h2>
        <p class="flex items-center gap-1.5 mt-1.5 text-sm text-gray-500">
          Last Update: {timeAgo(props.updated_at)}
        </p>
      </a>
      <a
        class="h-8 px-3.5 rounded-md inline-flex flex-shrink-0 whitespace-nowrap items-center gap-2 transition-colors duration-150 ease-in-out leading-none border-1 cursor-pointer border-gray-200/60 bg-gray-200/60 text-gray-900 hover:bg-gray-200 hover:text-gray-900"
        href={`/company/${props.slug}`}
      >
        View
      </a>
    </div>
  );
}
