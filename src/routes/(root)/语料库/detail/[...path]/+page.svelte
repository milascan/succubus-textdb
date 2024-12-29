<script>
    import Basic from "$lib/layouts/basic.svelte";
    import Doc from "../../doc.svelte";

    let { data } = $props();
    let { doc } = $derived(data);
</script>

<Basic>
    <div
        class="box divide-(y solid hue-3)
        lt-md:(bg-hue-2 border-b-(1 solid hue-4))
        md:(card p-4 w-screen-sm self-center)"
    >
        <h1 class="text-2xl p-4">{doc.title}</h1>
        <div class="py-4">
            <Doc {...doc} headless />
        </div>
        <div
            class="p-4 text-wrap ws-pre lh-loose {doc.content
                ? 'text-hue-11 font-serif'
                : 'text-hue-10 font-italic'}"
        >
            {doc.content ?? "无正文"}
        </div>
    </div>
</Basic>
