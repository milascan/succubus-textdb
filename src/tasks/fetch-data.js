import { get_all } from "$lib/db/docs.server.ts";

const data_dir = "./data";

const fetch_data = async () => {
  Deno.mkdirSync(data_dir, { recursive: true });
  for await (const docs of get_all()) {
    for (const { content, id } of docs) {
      Deno.writeTextFileSync(`${data_dir}/${id}.txt`, content);
      console.log("fetched:", id);
    }
  }
};

await fetch_data();
