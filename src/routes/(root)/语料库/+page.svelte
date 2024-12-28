<script>
    import Basic from "$lib/layouts/basic.svelte";
    import { getContext } from "svelte";
    import Doc from "./doc.svelte";
    const api = getContext("api");
    const path = [];

    async function get_items() {
        return api("/api/doc/get-items", { path });
    }
</script>

<Basic>
    <div class=""></div>
    {#await get_items()}
        <div class="">加载中...</div>
    {:then items}
        {#each items as item}
            <Doc {...item} />
        {/each}
    {/await}
</Basic>
