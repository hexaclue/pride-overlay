<script lang="ts">
    import CustomSelectOption from "./CustomSelectOption.svelte";
    import { isTouch } from "./helpers/isTouch";

    export let options: { icon?: string; label: string; value: string }[] | undefined = null;
    export let selected: string | undefined = options ? (options.length ? options[0].value : null) : null;

    let hovering: boolean = false;
    let disablé: boolean = false;

    let optionsElement: HTMLDivElement;

    function mouseOver() {
        hovering = true;
        if (!isTouch()) {
            disablé = false;
        }
    }
    function mouseOut() {
        hovering = false;
        disablé = true;
    }
    function mouseUp() {
        if (isTouch() && hovering && disablé) {
            setTimeout(() => {
                disablé = false;
            }, 50);
        }
    }

    function keyDownHandler(
        e: KeyboardEvent & {
            currentTarget: EventTarget & HTMLDivElement;
        }
    ) {
        if (e.key === "Enter") {
            mouseOver();
            let well: HTMLElement = optionsElement.querySelector("*");
            well.focus();
        } else if (e.key == "Escape") {
            mouseOut();
        }
    }
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div
    class="select-sim"
    id="select-color"
    on:mouseover={mouseOver}
    on:mouseleave={mouseOut}
    style={"--amount-of-items:" + (options.length > 5 ? 5 : options.length)}
    class:hover={hovering}
    on:mouseup={mouseUp}
    tabindex="0"
    role="combobox"
    on:keydown={keyDownHandler}
>
    <div class="options" bind:this={optionsElement}>
        {#each options as option}
            <CustomSelectOption {option} bind:group={selected} mainHovering={hovering} disabled={!(hovering && !disablé)} />
        {/each}
    </div>
</div>

<style>
    /* Select styles */
    .select-sim {
        position: relative;
        /* max-width: 30rem; */
        vertical-align: middle;
        background: var(--bg);
        border: 1px solid var(--ridge-color);
        box-sizing: border-box;
        overflow: hidden;
        /* border-radius: 0.5rem; */
        height: Calc(3rem + 2px);
        transition-duration: 0.2s;
        --amount-of-items: 0;
    }
    .select-sim:not(.hover) {
        border-radius: 1rem;
    }

    .select-sim::after {
        content: "▼";
        font-size: 0.5rem;
        position: absolute;
        top: 50%;
        right: 0.5rem;
        transform: translate(0, -50%);
    }

    .select-sim .options {
        transition-duration: 0.2s;
        height: 100%;
    }

    .select-sim.hover::after {
        content: "";
    }

    .select-sim.hover {
        overflow: visible;
        z-index: 1;
        border: none;
        height: Calc(3rem + 2px);
    }

    .select-sim.hover .options {
        background: var(--bg);
        /*border:1px solid #ccc;
  position:absolute;*/
        /*border: 1px solid var(--ridge-color);
  width:100%;
  height: 10rem;
  overflow-y:scroll;*/
        position: absolute;
        box-sizing: border-box;
        border: 1px solid var(--border-color);
        overflow-y: scroll;
        height: Calc(3rem * var(--amount-of-items) + 2px);
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        box-shadow: var(--slider-thumb-shadow);
        /* border-radius: 0.5rem; */
    }
</style>
