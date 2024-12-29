import { kv } from "./utils/db.ts";

await Promise.all(
    (await Array.fromAsync(kv.list({ prefix: [] }))).map(({ key }) =>
        kv.delete(key)
    ),
);

console.log("All data has been cleared from kv.");
