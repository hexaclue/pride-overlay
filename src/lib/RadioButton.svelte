<script lang="ts">
    import type { RadioOption } from "./types/radioOption";

    export let option: RadioOption<any>;
    export let group: string;
</script>

<label
    for={option.value}
    class="option"
    tabindex="0"
    role="radio"
    on:keydown={event => {
        if (event.key == "Enter") event.currentTarget.click();
    }}
>
    <input id={option.value} type="radio" name="type" value={option.value} bind:group />
    <span class="check-ind"><span class="check-ind-k" /></span>
    <span>
        {option.label}
    </span>
</label>

<style>
    .option {
        display: grid;
        grid-auto-columns: min-content;
        gap: 0.5rem;
        align-items: center;
    }
    .option > * {
        grid-row: 1;
        vertical-align: middle;
    }

    input[type="radio"] {
        display: none;
    }

    .check-ind {
        display: inline-block;
        background-color: white;
        border: 2px solid var(--ridge-color);
        border-radius: 1.5rem;
        width: 1.5rem;
        height: 1.5rem;
        vertical-align: middle;
        transition-duration: var(--small-element-transition-duration);
        transition-timing-function: cubic-bezier(0.33, 1, 0.68, 1);
        margin-right: 0.25rem;
    }

    input[type="radio"]:hover ~ .check-ind {
        transform: scale3d(1.1, 1.1, 1);
        border: 2px solid hsl(0, 0%, 80%);
    }

    .check-ind-k {
        background: var(--primary-color);
        box-sizing: border-box;
        border-radius: 1.25rem;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        margin: 0.25rem 0.25rem;
        transition-duration: var(--small-element-transition-duration);
        transition-timing-function: cubic-bezier(0.33, 1, 0.68, 1);
    }

    input[type="radio"]:not(:checked):hover ~ .check-ind .check-ind-k {
        transform: scale3d(0.5, 0.5, 1);
    }

    input[type="radio"]:not(:checked) ~ .check-ind .check-ind-k {
        transform: scale3d(0, 0, 1);
    }
</style>
