import { get } from "$lib/db/docs.server.ts";
import { request_data } from "$lib/utils.ts";
import { error } from "@sveltejs/kit";

export const POST = async ({ request }) => {
  try {
    const { path } = await request_data(request);
    return transfer(await get(path));
  } catch (e) {
    return error(400, e);
  }
};
