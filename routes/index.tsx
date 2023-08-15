import Page from "@/components/DemoPage.tsx";
import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";

export const handler: Handlers = {
  GET(req, ctx) {
    return Response.redirect(`http://localhost:3000/company`, 301);
  },
};
export default function Home() {
  return (
    <>
      <Page />
      {/* dashboard component soon */}
    </>
  );
}
