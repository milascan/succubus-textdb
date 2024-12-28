import { redirect } from "@sveltejs/kit";

export function load({ url }) {
  let href = url.href;
  href = href.endsWith("/") ? href : href + "/";
  redirect(307, new URL("主页", href));
}
