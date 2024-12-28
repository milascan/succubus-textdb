export const load = async ({ parent, fetch, params }) => {
  const { api } = await parent();
  return {
    doc: await api("/api/doc/get", { id: params.id }, { fetch }),
  };
};
