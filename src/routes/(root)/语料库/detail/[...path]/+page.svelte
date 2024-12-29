<script>
    import Basic from "$lib/layouts/basic.svelte";
    import { getContext } from "svelte";
    import Doc from "../../doc.svelte";
    import { goto } from "$app/navigation";
    const api = getContext("api");

    let { data } = $props();
    let { doc } = $derived(data);

    async function 删除() {
        if (confirm("确认删除？")) {
            await api("/api/doc/remove", { id: doc.id });
            alert("已删除！");
            goto("/语料库/detail/" + doc.path.slice(0, -1).join("/"));
        }
    }

    const button_class = "button button-detail tint text-hue-11 lt-md:flex-1";
</script>

<Basic>
    <div
        class="box divide-(y solid hue-3)
        lt-md:(bg-hue-2 border-b-(1 solid hue-4))
        md:(card py-4 w-screen-sm self-center)"
    >
        <h1 class="text-(2xl wrap) px-6 py-4">{doc.title}</h1>
        <div class="flex px-6 py-2 gap-6 min-w-0">
            <div class="box justify-evenly text-(sm hue-10)">
                <div>创建: {new Date(doc.ctime).toLocaleString()}</div>
                <div>修改: {new Date(doc.mtime).toLocaleString()}</div>
            </div>
            <div class="flex-1 flex justify-end gap-2">
                <button class="hue-prim {button_class}">
                    <div class="i-mdi:edit-outline"></div>
                    <div>编辑</div>
                </button>
                <button class="hue-err {button_class}" onclick={删除}>
                    <div class="i-mdi:delete-outline"></div>
                    <div>删除</div>
                </button>
            </div>
        </div>
        <div
            class="px-6 py-4 text-wrap ws-pre lh-loose {doc.content
                ? 'text-hue-11 font-serif'
                : 'text-hue-10 font-italic'}"
        >
            {doc.content ?? "无正文"}
        </div>
        <div>
            <Doc {...doc} headless />
        </div>
    </div>
</Basic>
