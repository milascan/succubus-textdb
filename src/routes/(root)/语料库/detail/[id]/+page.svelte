<script>
    import Basic from "$lib/layouts/basic.svelte";

    let { data } = $props();
</script>

<Basic>
    <div
        class="box divide-(y solid hue-3)
        lt-md:(bg-hue-2 border-b-(1 solid hue-4))
        md:(card p-4 max-w-screen-sm self-center)"
    >
        <h1 class="text-2xl p-4">{data.doc.title}</h1>
        <div
            class="p-4 text-wrap ws-pre lh-loose {data.doc.content
                ? 'text-hue-11 font-serif'
                : 'text-hue-10 font-italic'}"
        >
            {data.doc.content ?? "无正文"}
        </div>
    </div>
</Basic>
