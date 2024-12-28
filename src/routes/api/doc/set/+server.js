import { DocumentParamsModel, set } from "$lib/db/docs.server.ts";
import { request_data } from "$lib/utils.ts";
import { error } from "@sveltejs/kit";

export const POST = async ({ request }) => {
  try {
    const { docs } = await request_data(request);
    const path = [];
    for (const doc of docs) {
      path.push(doc.ref);
      const { success, data } = DocumentParamsModel.safeParse({ ...doc, path });
      if (success) {
        await set(data);
      } else throw "invalid doc params";
    }
  } catch (e) {
    return error(400, e);
  }
};
