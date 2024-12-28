<script>
    import { page } from "$app/stores";
    import Shell from "$lib/layouts/shell.svelte";
    let { children } = $props();
    const base = "";

    let navs = $derived([
        { label: "主页", href: `${base}/主页`, icon: "i-mdi:home-outline" },
        {
            label: "语料库",
            href: `${base}/语料库`,
            icon: "i-mdi:book-ribbon-outline",
        },
        {
            label: "词料库",
            href: `${base}/词料库`,
            icon: "i-mdi:book-3-outline",
        },
    ]);
    let { path } = $derived($page.data);
</script>

<Shell {navs} {path}>
    {@render children?.()}
</Shell>
