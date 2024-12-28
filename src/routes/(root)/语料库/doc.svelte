<script>
    import { getContext } from "svelte";
    import Self from "./doc.svelte";

    let { title, content, ctime, mtime, path } = $props();
    const api = getContext("api");

    let expand = $state(false);

    function get_items() {
        return api("/api/doc/get-items", { path });
    }
</script>

<div class="box">
    <div class="flex justify-between">
        <div class="">{title}</div>
        <div class="">{new Date(mtime).toLocaleString()}</div>
    </div>
    {#if expand}
        {#await get_items()}
            <div class="">加载中...</div>
        {:then items}
            {#each items as item}
                <Self {...item} />
            {/each}
        {/await}
    {/if}
</div>
