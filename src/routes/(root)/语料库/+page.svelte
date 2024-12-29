<script>
    import Basic from "$lib/layouts/basic.svelte";
    import { getContext } from "svelte";
    import Doc from "./doc.svelte";
    import { sort_str } from "$lib/utils.ts";
    const api = getContext("api");
    const path = [];

    async function get_items() {
        return api("/api/doc/get-items", { path });
    }
</script>

<Basic>
    {#await get_items()}
        <div class="p-4 text-hue-10 font-italic">加载中...</div>
    {:then items}
        <div
            class="box lt-md:(bg-hue-2 border-b-(1 solid hue-4)) md:(card py-4)"
        >
            {#each items.sort((a, b) => sort_str(a.id, b.id)) as item}
                <Doc {...item} />
            {/each}
        </div>
    {/await}
</Basic>
