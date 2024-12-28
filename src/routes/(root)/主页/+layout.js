export async function load({ parent }) {
  const { path } = await parent();
  return {
    path: path.concat([{ label: "主页", href: "/主页" }]),
  };
}
