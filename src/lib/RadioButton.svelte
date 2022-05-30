<script lang="ts">
    import type { RadioOption } from "./types/radioOption";

    export let option: RadioOption<any>;
    export let group: string;
</script>

<label for={option.value} class="option">
    <input
        id={option.value}
        type="radio"
        name="type"
        value={option.value}
        bind:group
    />
    <span>
        {option.label}
    </span>
</label>

<style>
    .option {
        display: grid;
        grid-auto-columns: min-content;
        gap: 1rem;
    }
    .option > * {
        grid-row: 1;
    }
</style>
