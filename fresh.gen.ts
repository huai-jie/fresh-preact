// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/_404.tsx";
import * as $1 from "./routes/_500.tsx";
import * as $2 from "./routes/_app.tsx";
import * as $3 from "./routes/_middleware.ts";
import * as $4 from "./routes/api/auth/login.ts";
import * as $5 from "./routes/api/joke.ts";
import * as $6 from "./routes/company/[slug]/address/[id].tsx";
import * as $7 from "./routes/company/[slug]/address/index.tsx";
import * as $8 from "./routes/company/[slug]/index.tsx";
import * as $9 from "./routes/company/[slug]/settings.tsx";
import * as $10 from "./routes/company/_middleware.tsx";
import * as $11 from "./routes/company/index.tsx";
import * as $12 from "./routes/index.tsx";
import * as $13 from "./routes/login/index.tsx";
import * as $$0 from "./islands/CSRFTokenCatcher.tsx";
import * as $$1 from "./islands/Counter.tsx";
import * as $$2 from "./islands/Menu.tsx";
import * as $$3 from "./islands/Modal.tsx";

const manifest = {
  routes: {
    "./routes/_404.tsx": $0,
    "./routes/_500.tsx": $1,
    "./routes/_app.tsx": $2,
    "./routes/_middleware.ts": $3,
    "./routes/api/auth/login.ts": $4,
    "./routes/api/joke.ts": $5,
    "./routes/company/[slug]/address/[id].tsx": $6,
    "./routes/company/[slug]/address/index.tsx": $7,
    "./routes/company/[slug]/index.tsx": $8,
    "./routes/company/[slug]/settings.tsx": $9,
    "./routes/company/_middleware.tsx": $10,
    "./routes/company/index.tsx": $11,
    "./routes/index.tsx": $12,
    "./routes/login/index.tsx": $13,
  },
  islands: {
    "./islands/CSRFTokenCatcher.tsx": $$0,
    "./islands/Counter.tsx": $$1,
    "./islands/Menu.tsx": $$2,
    "./islands/Modal.tsx": $$3,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
