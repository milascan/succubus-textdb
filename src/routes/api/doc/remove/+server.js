import { remove } from "$lib/db/docs.server.ts";
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
    const { id } = await request_data(request);
    await remove(id);
  } catch (e) {
    return error(400, e);
  }
  return transfer("ok", {
    headers: { "Access-Control-Allow-Origin": "*" },
  });
};
