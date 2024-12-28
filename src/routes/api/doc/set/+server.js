import { DocumentParamsModel, set } from "$lib/db/docs.server.ts";
import { request_data, transfer } from "$lib/utils.ts";
import { error } from "@sveltejs/kit";
import { z } from "zod";

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
    const { docs } = await request_data(request);
    const { success, data } = z.array(DocumentParamsModel).safeParse(docs);
    if (success) {
      for (const doc of data) {
        await set(doc);
      }
    } else throw "invalid doc params";
  } catch (e) {
    return error(400, e);
  }
  return transfer("ok", {
    headers: { "Access-Control-Allow-Origin": "*" },
  });
};
