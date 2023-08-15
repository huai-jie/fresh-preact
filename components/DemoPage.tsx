import { Head } from "$fresh/runtime.ts";
import type { ComponentChildren } from "preact";
import IconChevronDown from "$icons/chevron-down.tsx";

export default function Page(props: {
  children?: ComponentChildren;
}) {
  return (
    <div class="flex">
      <Head>
        <title>SmartStripe</title>
      </Head>
      <SideBar />
      <div class="w-full h-full overflow-y-auto">
        <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
          <NavBar />
          <div class="max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-12">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SideBar() {
  return (
    <aside
      class="flex border-r border-gray-700 bg-gray-800 font-bold"
      aria-label="Sidebar"
    >
      <div class=" w-72 h-screen relative duration-300">
        <div class="flex items-center cursor-pointer px-4 py-4 false">
          <div class="flex flex-nowrap font-bold rounded-lg text-white">
            <span class="text-2xl text-blue-600">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 448 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M100.69 363.29c10 10 27.31 2.93 27.31-11.31V160c0-14.32-17.33-21.31-27.31-11.31l-96 96a16 16 0 0 0 0 22.62zM432 416H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm3.17-128H204.83A12.82 12.82 0 0 0 192 300.83v38.34A12.82 12.82 0 0 0 204.83 352h230.34A12.82 12.82 0 0 0 448 339.17v-38.34A12.82 12.82 0 0 0 435.17 288zm0-128H204.83A12.82 12.82 0 0 0 192 172.83v38.34A12.82 12.82 0 0 0 204.83 224h230.34A12.82 12.82 0 0 0 448 211.17v-38.34A12.82 12.82 0 0 0 435.17 160zM432 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z">
                </path>
              </svg>
            </span>
            <span class="false origin-left duration-200 mx-4">SmartStripe</span>
          </div>
        </div>
        <div class="bg-gradient-to-r from-cyan-500 to-blue-500 w-full h-0.5">
        </div>
        <div class="px-4 flex flex-wrap false">
          <ul class="w-full py-4 border-b border-gray-600">
            <li class="flex text-center rounded-md px-4 py-2 cursor-pointer text-sm items-center
                                        ">
              <a
                class="flex items-center text-base font-normal rounded-lg text-white"
                href="/"
              >
                <span>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M464 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zM224 416H64V160h160v256zm224 0H288V160h160v256z">
                    </path>
                  </svg>
                </span>
                <span class="false duration-200 mx-4">Dashboard</span>
              </a>
            </li>
          </ul>
          <ul class="w-full">
            <li class="flex">
              <ul class="w-full py-4 border-b border-gray-600 text-center items-center text-white">
                <li class="flex text-gray-300 justify-start px-2 my-2 rounded-md text-xs uppercase false">
                  Sales and Account
                </li>
                <li class="flex text-center rounded-md px-4 py-2 cursor-pointer text-sm items-center my-2 bg-blue-700    text-white">
                  <a
                    class="flex items-center text-base font-normal rounded-lg text-white"
                    href="/company"
                  >
                    <span>
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 448 512"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M436 480h-20V24c0-13.255-10.745-24-24-24H56C42.745 0 32 10.745 32 24v456H12c-6.627 0-12 5.373-12 12v20h448v-20c0-6.627-5.373-12-12-12zM128 76c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12V76zm0 96c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12v-40zm52 148h-40c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12zm76 160h-64v-84c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v84zm64-172c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40zm0-96c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40zm0-96c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12V76c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40z">
                        </path>
                      </svg>
                    </span>
                    <span class="false duration-200 mx-4">Company</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}

export function NavBar() {
  return (
    <nav class="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
      <div class="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-end h-16">
          <div class="hidden sm:flex sm:items-center sm:ml-6">
            <span class="text-gray-800 dark:text-gray-200">
              <span>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 512 512"
                  class="top-navigation-icon"
                  height="24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z">
                  </path>
                </svg>
              </span>
            </span>
            <div class="ml-3 relative">
              <div class="relative">
                <div>
                  <span class="inline-flex rounded-md">
                    <button
                      type="button"
                      class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                    >
                      test
                      <IconChevronDown class="ml-2 -mr-0.5 h-4 w-4" />
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="-mr-2 flex items-center sm:hidden">
            <button class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out">
              <svg
                class="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  class="inline-flex"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                >
                </path>
                <path
                  class="hidden"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                >
                </path>
              </svg>
              here
            </button>
          </div>
        </div>
      </div>
      <div class="hidden sm:hidden">
        <div class="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
          <div class="px-4">
            <div class="font-medium text-base text-gray-800 dark:text-gray-200">
              test
            </div>
            <div class="font-medium text-sm text-gray-500">
              test@gmail.com
            </div>
          </div>
          <div class="mt-3 space-y-1">
            <a
              class="w-full flex items-start pl-3 pr-4 py-2 border-l-4 border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 focus:text-gray-800 dark:focus:text-gray-200 focus:bg-gray-50 dark:focus:bg-gray-700 focus:border-gray-300 dark:focus:border-gray-600 text-base font-medium focus:outline-none transition duration-150 ease-in-out "
              href="/profile"
            >
              <div class="flex align-middle items-center">
                <div class="text-lg">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2A10.13 10.13 0 0 0 2 12a10 10 0 0 0 4 7.92V20h.1a9.7 9.7 0 0 0 11.8 0h.1v-.08A10 10 0 0 0 22 12 10.13 10.13 0 0 0 12 2zM8.07 18.93A3 3 0 0 1 11 16.57h2a3 3 0 0 1 2.93 2.36 7.75 7.75 0 0 1-7.86 0zm9.54-1.29A5 5 0 0 0 13 14.57h-2a5 5 0 0 0-4.61 3.07A8 8 0 0 1 4 12a8.1 8.1 0 0 1 8-8 8.1 8.1 0 0 1 8 8 8 8 0 0 1-2.39 5.64z">
                    </path>
                    <path d="M12 6a3.91 3.91 0 0 0-4 4 3.91 3.91 0 0 0 4 4 3.91 3.91 0 0 0 4-4 3.91 3.91 0 0 0-4-4zm0 6a1.91 1.91 0 0 1-2-2 1.91 1.91 0 0 1 2-2 1.91 1.91 0 0 1 2 2 1.91 1.91 0 0 1-2 2z">
                    </path>
                  </svg>
                </div>
                <div class="mx-2">Profile</div>
              </div>
            </a>
            <button class="w-full flex items-start pl-3 pr-4 py-2 border-l-4 border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 focus:text-gray-800 dark:focus:text-gray-200 focus:bg-gray-50 dark:focus:bg-gray-700 focus:border-gray-300 dark:focus:border-gray-600 text-base font-medium focus:outline-none transition duration-150 ease-in-out ">
              <div class="flex align-middle items-center">
                <div class="text-lg">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z">
                    </path>
                  </svg>
                </div>
                <div class="mx-2">Log Out</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
