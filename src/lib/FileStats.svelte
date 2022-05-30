<script lang="ts">
    import { getImageSize } from "./helpers/getImageSize";
    import { humanReadableFilesize } from "./helpers/humanReadableFilesize";

    export let selectedFiles: File[] | undefined = [];
</script>

<div>
    <h3>File stats</h3>
    {#if selectedFiles.length > 0}
        {selectedFiles[0].name}<br />
        {#await getImageSize(selectedFiles[0])}... x ...{:then v}{v.width} x {v.height}{:catch}err{/await}
        ({humanReadableFilesize(selectedFiles[0].size)})
    {/if}
</div>

<style>
    div {
        padding: 1rem;
        border: 1px solid var(--ridge-color);
        border-radius: 1rem;
        white-space: nowrap;
    }
    h3 {
        margin-bottom: 0.5rem;
    }
</style>
