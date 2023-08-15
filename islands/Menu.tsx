import { useEffect } from "preact/hooks";
import { ChevronLeftIcon } from "@/components/Icons.tsx";

export default function Menu(props: { new?: boolean }) {
  useEffect(() => {
    // Cache selectors
    let lastId = "";
    const topMenu = document.getElementById("setting-nav");
    const topMenuHeight = topMenu!.offsetHeight + 1;
    // All list items
    const menuItems = topMenu!.querySelectorAll("li");
    // Link list corresponding to menu items
    const scrollItems = Array.from(menuItems).map(function (item) {
      const href = item.id;
      const element = document.getElementById(href!);
      if (element) {
        return element;
      }
    });

    // Bind click handler to menu items
    Array.from(menuItems).forEach(function (item) {
      item.addEventListener("click", function (e) {
        const id = item.id;
        const offsetTop = id === "#"
          ? 0
          : document.getElementById(id!)!.offsetTop - topMenuHeight + 1;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
        e.preventDefault();
      });
    });

    // Bind to scroll
    addEventListener("scroll", function () {
      // Get container scroll position
      const fromTop = window.scrollY + topMenuHeight;
      // Get id of current scroll item
      const cur = scrollItems.map(function (item) {
        if (item!.offsetTop < fromTop) {
          return item;
        }
      });

      // Get the id of the current element
      let curElemId = "";
      for (let i = cur.length - 1; i < cur.length && i >= 0; i--) {
        if (cur[i] && cur[i]?.id) {
          curElemId = cur[i]!.id;
          break;
        }
      }

      if (lastId !== curElemId) {
        lastId = curElemId;
        // Set/remove active class
        Array.from(menuItems).forEach(function (item) {
          item.classList.remove("active");
          if (item.id === curElemId) {
            item.classList.add("active");
          }
        });
      }
    });
  }, []);
  return (
    <aside class="hidden lg:!block w-64">
      <nav class="sticky" style="top:72px">
        <ul id="setting-nav">
          <li
            class="flex items-center justify-between px-4 py-1.5  border rounded-md cursor-pointer border-transparent active"
            id="basics"
          >
            <ChevronLeftIcon class="text-transparent" />
            <span class="text-gray-500 hover:text-gray-800">Basic</span>
          </li>
          {!props.new &&
            (
              <li
                class="flex items-center justify-between px-4 py-1.5  border rounded-md cursor-pointer border-transparent"
                id="danger-zone"
              >
                <ChevronLeftIcon class="text-transparent" />
                <span class="text-gray-500 hover:text-gray-800">
                  Danger Zone
                </span>
              </li>
            )}
        </ul>
      </nav>
    </aside>
  );
}
