import { KV_URL } from "../const.ts";

const ONLINE_DB = Deno.env.get("ONLINE_DB") === "true";

export const kv = ONLINE_DB ? await Deno.openKv(KV_URL) : await Deno.openKv();
