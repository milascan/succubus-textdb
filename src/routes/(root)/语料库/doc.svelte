<script>
    import { getContext } from "svelte";
    import Self from "./doc.svelte";
    const base = "/语料库";

    let {
        indent = 0,
        title,
        content,
        ctime,
        mtime,
        path,
        id,
        headless = false,
    } = $props();
    const api = getContext("api");

    let expand = $state(headless);

    function get_items() {
        return api("/api/doc/get-items", { path });
    }

    const indent_style = $derived(`padding-left: ${indent * 16}px`);
    const inner_style = $derived(
        `padding-left: ${(headless ? indent : indent + 1) * 16}px`,
    );
    const head_class = "flex px-4 gap-2 items-stretch text-start";
</script>

<div class="box divide-(y solid hue-3)">
    {#if !headless}
        <div
            class="{head_class} @hover:bg-base-2A active:bg-base-4A"
            style={indent_style}
        >
            <button
                aria-label="expand"
                class="flex items-center px-2"
                onclick={() => (expand = !expand)}
            >
                <div
                    class="i-mdi:expand-more {expand
                        ? 'text-base12'
                        : 'text-base9 rotate--90'}"
                ></div>
            </button>
            <a href="{base}/detail/{path.join('/')}" class="flex-1 flex">
                <div class="flex-1 py-2 text-lg">{title}</div>
                <div class="flex-none self-center text-hue-10 font-italic">
                    {new Date(mtime).toLocaleDateString()}
                </div>
            </a>
        </div>
    {/if}
    {#if expand}
        {#await get_items()}
            <div
                class="{head_class} py-2 text-hue-10 font-italic"
                style={inner_style}
            >
                <div class="px-4 ps-8">加载中...</div>
            </div>
        {:then items}
            {#each items as item}
                <Self {...item} indent={headless ? indent : indent + 1} />
            {:else}
                <div
                    class="{head_class} py-2 text-hue-10 font-italic"
                    style={inner_style}
                >
                    <div class="px-4 ps-8">无项目</div>
                </div>
            {/each}
        {/await}
    {/if}
</div>
