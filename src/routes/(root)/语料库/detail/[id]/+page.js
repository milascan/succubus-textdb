export const load = async ({ parent, fetch, params: { id } }) => {
  const { api, path } = await parent();
  const doc = await api("/api/doc/get", { id }, { fetch });
  return {
    doc,
    path: path.concat([{ label: doc.title, href: `/语料库/${id}` }]),
  };
};
