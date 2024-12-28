export async function load({ parent }) {
  const { path } = await parent();
  return {
    path: path.concat([{ label: "语料库", href: "/语料库" }]),
  };
}
