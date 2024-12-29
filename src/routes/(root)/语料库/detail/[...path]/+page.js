export const load = async (
  { parent, fetch, params: { path: doc_path_str } },
) => {
  const { api, path } = await parent();
  const doc_path = doc_path_str.split("/");
  const doc = await api("/api/doc/get", { path: doc_path }, {
    fetch,
  });
  const path_rest = doc_path.map((p, i) => ({
    label: p,
    href: "/语料库/detail/" + doc_path.slice(0, i + 1).join("/"),
  }));
  path_rest.at(-1).label = doc.title;
  return {
    doc,
    path: path.concat(path_rest),
  };
};
