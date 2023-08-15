import { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import Header from "@/components/Header.tsx";

export default function App({ Component }: AppProps) {
  return (
    <div class="h-screen">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />

        {/* needed for the dialog on safari to handle visibility of modal based on the `open` prop */}
        <link
          rel="stylesheet"
          href="https://esm.sh/dialog-polyfill@0.5.6/dialog-polyfill.css"
        />

        <link rel="stylesheet" href="/app.css" />
      </Head>
      <Header />
      <Component />
      <footer class="h-[3.75rem]" />
    </div>
  );
}
