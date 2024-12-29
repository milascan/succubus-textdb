import { collection, Document, kvdex, model } from "@olli/kvdex";
import { decodeTime, monotonicUlid } from "@std/ulid";
import z from "zod";
import { kv } from "$lib/db/db.server.ts";

export const DocumentParamsModel = z.object({
  title: z.string(),
  content: z.ostring(),
  path: z.array(z.string()).min(1),
});

type TDocumentParams = z.infer<typeof DocumentParamsModel>;
type TDocument = TDocumentParams & {
  id: string;
  parent: string[];
  ctime: number;
  mtime: number;
};

const db = kvdex({
  kv,
  schema: {
    docs: collection(
      model<TDocument>(),
      {
        idGenerator: (doc) => doc.id,
        indices: {
          path: "primary",
          parent: "secondary",
        },
      },
    ),
  },
});

const map_doc = (res: Document<TDocument, string>) => ({
  ...res.value,
  date: decodeTime(res.id),
});

export const get_items = async (parent_path: string[]) => {
  const res = await db.docs.findBySecondaryIndex("parent", parent_path);
  return res.result.map(map_doc);
};

export const has = async (path: string[]) => {
  const res = await db.docs.findByPrimaryIndex("path", path);
  return !!res;
};

export const ref = async (id: string) => {
  const res = await db.docs.find(id);
  if (res) {
    return map_doc(res);
  } else {
    return null;
  }
};

export const get = async (path: string[]) => {
  const res = await db.docs.findByPrimaryIndex("path", path);
  if (res) {
    return map_doc(res);
  } else {
    return null;
  }
};

export const set = async (doc: TDocumentParams) => {
  const time = Date.now();
  await db.docs.upsertByPrimaryIndex({
    index: ["path", doc.path],
    update: {
      title: doc.title,
      content: doc.content,
      mtime: time,
    },
    set: {
      id: monotonicUlid(),
      parent: doc.path.slice(0, -1),
      ctime: time,
      mtime: time,
      ...doc,
    },
  }, { batched: true });
};

export const remove = async (id: string) => {
  await db.docs.delete(id);
};
