import { ComponentChild, ComponentChildren } from "preact";
import { NAV_LIST_ITEM_STYLES } from "@/utils/constants.ts";
import { PageProps } from "$fresh/server.ts";
import IconFlag from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/flag.tsx";

export interface NavBarProps {
  baseRoute: string;
  navItems: string[];
}

interface Inner {
  inner: ComponentChild;
}

export interface HeaderProps {
  title: string;
  description: Inner;
  is_deleted: boolean;
  is_flagged: boolean;
  buttons?: Inner[];
}

export interface ProfilePageProps {
  children?: ComponentChildren;
  class: string;
  headers: HeaderProps;
  nav?: PageProps<NavBarProps>;
  new?: boolean;
}

export function ProfilePage(
  props: ProfilePageProps,
) {
  return (
    <div class={`${props.class || ""}`}>
      {!props.new && (
        <>
          <Header {...props.headers} />
          {props.nav && <NavBar {...props.nav} />}
        </>
      )}
      {props.children}
    </div>
  );
}

export function Header(props: HeaderProps) {
  return (
    <header class="flex items-center justify-between gap-4">
      <hgroup class="flex-1">
        <h2 class="font-bold text-2xl !leading-none text-black">
          {props.title}{" "}
          {!!props.is_flagged && (
            <IconFlag class="w-5 h-5 bg-yellow-300 inline-block rounded" />
          )}
          {!!props.is_deleted && (
            <p class="px-2 mt-1.5 !text-base inline-flex items-center justify-center rounded-full flex-shrink-0 bg-red-50 inline-block">
              <span class="text-red-600 capitalize">
                DELETED
              </span>
            </p>
          )}
        </h2>
        <h3 class="text-gray-500 leading-tight mt-1.5">
          {props.description.inner}
        </h3>
      </hgroup>
      {props.buttons && (
        <div class="flex gap-2 justify-end flex-shrink-0">
          {props.buttons.map(({ inner }) => inner)}
        </div>
      )}
    </header>
  );
}

export function NavBar(props: PageProps<NavBarProps>) {
  return (
    <div class="mt-3 flex items-center justify-between overflow-auto -mx-4 px-4">
      <nav>
        <ul class="h-[1.875rem] flex gap-1 -mx-2">
          <li class="h-[1.875rem] hover:bg-gray-100/90 px-2 rounded-md transition-colors">
            <a
              class={`${NAV_LIST_ITEM_STYLES} ${
                props.route.split("/").pop() === ":slug"
                  ? "!border-black !border-b-2 !text-black"
                  : ""
              }`}
              href={`/${props.data.baseRoute}/${props.params.slug}`}
              aria-current="page"
            >
              overview
            </a>
          </li>
          {props.data.navItems.map(function (navItem) {
            return (
              <li class="h-[1.875rem] hover:bg-gray-100/90 px-2 rounded-md transition-colors">
                <a
                  class={`${NAV_LIST_ITEM_STYLES} ${
                    props.route.includes(navItem)
                      ? "!border-black !border-b-2 !text-black"
                      : ""
                  }`}
                  href={`/${props.data.baseRoute}/${props.params.slug}/${navItem}`}
                  aria-current="page"
                >
                  {navItem}
                </a>
              </li>
            );
          })}
          {
            /* <li class="h-[1.875rem] hover:bg-gray-100/90 px-2 rounded-md transition-colors">
            <a
              class={NAV_LIST_ITEM_STYLES}
              href="/projects/huai-jie-saaskit/kv"
              aria-current="page"
            >
              <span class="inline-flex items-center gap-1">
                <span>KV</span>
                <span
                  class="px-1.5 leading-4 bg-gray-200 rounded-full text-black"
                  style="font-size: 9px;"
                >
                  Beta
                </span>
              </span>
            </a>
          </li> */
          }
        </ul>
      </nav>
    </div>
  );
}
