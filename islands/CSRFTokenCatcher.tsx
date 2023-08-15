import { useEffect } from "preact/hooks";
import { getCSRF } from "@/utils/auth.ts";

export default function CSRFTokenCatcher() {
  useEffect(() => {
    getCSRF();
  }, []);
  return <div class="hidden"></div>;
}
