import { get } from "$lib/db/docs.server.ts";
import { request_data } from "$lib/utils.ts";
import { error } from "@sveltejs/kit";

export const OPTIONS = () => {
  return new Response({
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};

export const POST = async ({ request }) => {
  try {
    const { path } = await request_data(request);
    return transfer(await get(path), {
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  } catch (e) {
    return error(400, e);
  }
};
