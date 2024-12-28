<script>
    import { getContext } from "svelte";
    import Self from "./doc.svelte";
    const base = "/语料库";

    let { indent = 0, title, content, ctime, mtime, path, id } = $props();
    const api = getContext("api");

    let expand = $state(false);

    function get_items() {
        return api("/api/doc/get-items", { path });
    }

    const indent_style = $derived(`padding-left: ${indent * 16 + 8}px`);
    const inner_style = $derived(`padding-left: ${(indent + 1) * 16 + 8}px`);
    const head_class = "flex px-3 gap-2 items-stretch text-start";
</script>

<div class="box divide-(y solid hue-3)">
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
        <a href="{base}/detail/{id}" class="flex-1 flex">
            <div class="flex-1 py-3 text-lg">{title}</div>
            <div class="flex-none self-center text-hue-10 font-italic">
                {new Date(mtime).toLocaleDateString()}
            </div>
        </a>
    </div>
    {#if expand}
        {#await get_items()}
            <div
                class="{head_class} py-3 text-hue-10 font-italic"
                style={inner_style}
            >
                加载中...
            </div>
        {:then items}
            {#each items as item}
                <Self {...item} indent={indent + 1} />
            {/each}
        {/await}
    {/if}
</div>
