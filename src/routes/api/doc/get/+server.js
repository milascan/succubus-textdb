import { get, ref } from "$lib/db/docs.server.ts";
import { request_data, transfer } from "$lib/utils.ts";
import { error } from "@sveltejs/kit";

export const OPTIONS = () => {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};

export const POST = async ({ request }) => {
  try {
    const { id, path } = await request_data(request);
    if (id) {
      return transfer(await ref(id), {
        headers: { "Access-Control-Allow-Origin": "*" },
      });
    } else {
      return transfer(await get(path), {
        headers: { "Access-Control-Allow-Origin": "*" },
      });
    }
  } catch (e) {
    return error(400, e.toString());
  }
};
