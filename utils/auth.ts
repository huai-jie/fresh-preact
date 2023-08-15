import {
  Cookie,
  deleteCookie,
  getCookies,
  setCookie,
} from "$std/http/cookie.ts";
import { redirect } from "./http.ts";

export const frontendRoute = Deno.env.get("FRONTEND_URL") ??
  "http://localhost:3000";
export const serverRoute = Deno.env.get("SERVER_URL") ??
  "http://localhost:8000";
export const apiRoute = `${serverRoute}/api/v1`;
export const csrf_cookie = "XSRF-TOKEN";

/**
 * Return the cookies needed by "Sanctum", browser will handle them automatically.
 */
export const getCSRF = async () => {
  await fetch(`${serverRoute}/sanctum/csrf-cookie`, {
    credentials: "include", // Allow browser to handle cookies
  });
};

export async function apiFetch() {
  const headers: HeadersInit = {
    Accept: "application/json",
    "Cache-Control": "no-cache",
  };
  const res = await fetch(`${apiRoute}/user`, {
    method: "GET",
    credentials: "include", // Allow browser to handle cookies
    headers,
  });
  console.log(res);
  return res;
}

export interface Payload {
  username: string;
  password: string;
}

export interface APIResponse extends Response {
  message?: string;
  errors?: Record<string, unknown>;
}

export async function login(
  { headers: _headers, url }: Request,
  payload: Payload,
): Promise<APIResponse> {
  // const csrf = getCookies(headers)[csrf_cookie];

  const data = new FormData();
  data.append("username", payload.username);
  data.append("password", payload.password);
  data.append("remember", "1");

  const res = await fetch(`${apiRoute}/auth/login`, {
    method: "POST",
    credentials: "include", // Allow browser to handle cookies
    body: data,
    headers: {
      Accept: "application/json",
      "Cache-Control": "no-cache",
      // "X-XSRF-TOKEN": csrf,
    },
  });

  if (!res.ok) return res.json();

  const { access_token } = await res.json();
  const resp = new Response("Redirecting...", {
    headers: {
      Location: `${frontendRoute}/api/auth/login?url=${url}`,
    },
    status: 307,
  });
  const token = encryption(access_token);
  setCookie(resp.headers, {
    name: "access_token",
    value: token,
    path: "/",
  });

  return resp;
}

function encryption(token: string) {
  const str = btoa(token);
  return `${btoa(crypto.randomUUID())}-${
    [(str).slice(0, 20), "-", str.slice(20)].join("")
  }`.replace("==", "");
}

function decryption(token: string) {
  if (token) {
    return atob(`${token.split("-")[1]}${token.split("-")[2]}`);
  }
  return token;
}

export async function authenticate(headers: Headers) {
  // const csrf = getCookies(headers)[csrf_cookie];
  // Bearer token for laravel sanctum
  const token = decryption(
    decodeURIComponent(getCookies(headers)["access_token"] || ""),
  );
  try {
    const res = await fetch(`${apiRoute}/user`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      credentials: "include", // include, *same-origin, omit
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Cache-Control": "no-cache",
        // "X-XSRF-TOKEN": csrf,
      },
    });

    return res;
  } catch (error) {
    const {
      response: { _data: data },
    } = error;
    console.log(data.message);
    return data;
  }
}

export async function FETCH_GET(req: Request, path: string) {
  const headers = req.headers;
  // Bearer token for laravel sanctum
  const token = decryption(
    decodeURIComponent(getCookies(headers)["access_token"] || ""),
  );
  const res = await fetch(`${apiRoute}/${path}`, {
    method: "GET",
    credentials: "include", // include, *same-origin, omit
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Cache-Control": "no-cache",
    },
  });
  if (!res.ok) return redirect("/login");
  return await res.json();
}
export async function FETCH_POST(
  req: Request,
  path: string,
  payload: any,
  _method: FormDataEntryValue | null,
) {
  const headers = req.headers;
  // const csrf = getCookies(headers)[csrf_cookie];
  // Bearer token for laravel sanctum
  const token = decryption(
    decodeURIComponent(getCookies(headers)["access_token"] || ""),
  );
  let data;
  let options;
  if (_method === "POST") {
    data = new FormData();
    for (const property in payload) {
      data.append(property, payload[property]);
    }
  } else if (_method === "PUT") {
    // convert to x-www--form-urlencoded
    data = new URLSearchParams(Object.entries(payload)).toString();
    options = { "Content-Type": "application/x-www-form-urlencoded" };
  }

  const res = await fetch(`${apiRoute}/${path}`, {
    method: _method as string, // *POST, PUT, DELETE, PATCH.
    credentials: "include", // include, *same-origin, omit
    body: data,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Cache-Control": "no-cache",
      // "X-XSRF-TOKEN": csrf,
      ...options,
    },
  });
  return _method === "PATCH" || _method === "DELETE" ? res : res.json();
}
