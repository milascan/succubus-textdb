export async function load({ parent }) {
  const { path } = await parent();
  return {
    path: path.concat([{ label: "词料库", href: "/词料库" }]),
  };
}
