<script lang="ts">
    import CustomSelectOption from "./CustomSelectOption.svelte";
    import { isTouch } from "./helpers/isTouch";

    export let options:
        | { icon?: string; label: string; value: string }[]
        | undefined = null;
    export let selected: string | undefined = options
        ? options.length
            ? options[0].value
            : null
        : null;

    let hovering: boolean = false;
    let disablé: boolean = false;

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
</script>

<!-- <div class="select-sim" id="select-color">
    <div class="options">
        <div class="option">
            <input type="radio" name="color" value="" id="color-" checked />
            <label for="color-">
                <img src="http://placehold.it/22/ffffff/ffffff" alt="" /> Select
                an option
            </label>
        </div>
        <div class="option">
            <input type="radio" name="color" value="red" id="color-red" />
            <label for="color-red">
                <img src="http://placehold.it/22/ff0000/ffffff" alt="" /> Red
            </label>
        </div>
        <div class="option">
            <input type="radio" name="color" value="green" id="color-green" />
            <label for="color-green">
                <img src="http://placehold.it/22/00ff00/ffffff" alt="" /> Green
            </label>
        </div>
        <div class="option">
            <input type="radio" name="color" value="blue" id="color-blue" />
            <label for="color-blue">
                <img src="http://placehold.it/22/0000ff/ffffff" alt="" /> Blue
            </label>
        </div>
        <div class="option">
            <input type="radio" name="color" value="yellow" id="color-yellow" />
            <label for="color-yellow">
                <img src="http://placehold.it/22/ffff00/ffffff" alt="" /> Yellow
            </label>
        </div>
        <div class="option">
            <input type="radio" name="color" value="pink" id="color-pink" />
            <label for="color-pink">
                <img src="http://placehold.it/22/ff00ff/ffffff" alt="" /> Pink
            </label>
        </div>
        <div class="option">
            <input
                type="radio"
                name="color"
                value="turquoise"
                id="color-turquoise"
            />
            <label for="color-turquoise">
                <img src="http://placehold.it/22/00ffff/ffffff" alt="" /> Turquoise
            </label>
        </div>
    </div>
</div> -->

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div
    class="select-sim"
    id="select-color"
    on:mouseover={mouseOver}
    on:mouseleave={mouseOut}
    style={"--amount-of-items:" + (options.length > 5 ? 5 : options.length)}
    class:hover={hovering}
    on:mouseup={mouseUp}
>
    <div class="options">
        {#each options as option}
            <CustomSelectOption
                {option}
                bind:group={selected}
                mainHovering={hovering}
                disabled={!(hovering && !disablé)}
            />
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

    .select-sim:hover .options {
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
