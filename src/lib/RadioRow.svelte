<script lang="ts">
    import RadioButton from "./RadioButton.svelte";
    import type { RadioOption } from "./types/radioOption";

    export let options: RadioOption<any>[];

    export let selected: string | undefined = options
        ? options.length
            ? options[0].value
            : null
        : null;
</script>

<div class="row">
    {#each options as option}
        <RadioButton {option} bind:group={selected} />
    {/each}
</div>

<style>
    .row {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        gap: 1rem 2rem;
    }
</style>
