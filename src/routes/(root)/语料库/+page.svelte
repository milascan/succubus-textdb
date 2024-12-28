<script>
    import Basic from "$lib/layouts/basic.svelte";
    import { getContext } from "svelte";
    const api = getContext("api");
    const path = [];

    async function get_items() {
        await api("/api/doc/get", { path });
        return api("/api/doc/get-items", { path });
    }
</script>

<Basic>
    <div class=""></div>
    {#await get_items()}
        <div class="">加载中...</div>
    {:then items}
        {#each items as item}
            <Self {...item} />
        {/each}
    {/await}
</Basic>
