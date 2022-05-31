<script lang="ts">
    import { isTouch } from "./helpers/isTouch";

    export let withNumberInput = true;
    export let min = 0;
    export let max = 100;
    export let value = 97.5;
    export let step = 0.5;

    let isHovering = false;
    let isClicking = false;

    function element_mouseDown(e: MouseEvent) {
        if (e.button == 0 || isTouch()) {
            isClicking = true;
        }
    }
    function element_mouseUp(e: MouseEvent) {
        if (e.button == 0 || isTouch()) {
            isClicking = false;
        }
    }
    function element_mouseEnter(e: MouseEvent) {
        isHovering = true;
    }
    function element_mouseLeave(e: MouseEvent) {
        isHovering = false;
        element_mouseUp(e);
    }
</script>

{#if withNumberInput}
    <div class="range-with-number">
        <input
            type="range"
            {min}
            {max}
            bind:value
            {step}
            class:active={isClicking}
            class:hover={isHovering}
            on:mouseenter={element_mouseEnter}
            on:mouseleave={element_mouseLeave}
            on:mousedown={element_mouseDown}
            on:mouseup={element_mouseUp}
        />
        <input
            type="number"
            {min}
            {max}
            bind:value
            {step}
            class:active={isClicking}
            class:hover={isHovering}
            on:mouseenter={element_mouseEnter}
            on:mouseleave={element_mouseLeave}
            on:mousedown={element_mouseDown}
            on:mouseup={element_mouseUp}
        />
    </div>
{/if}

<style>
    input {
        border: 2px solid var(--ridge-color);
        padding: 0.5rem;
        border-radius: 0.5rem;
    }
    input:focus {
        border-color: var(--primary-color);
    }

    .range-with-number {
        display: grid;
        grid-template-columns: 1fr 5rem;
        grid-gap: 1rem;
    }

    input[type="range"] {
        -webkit-appearance: none;
        width: 100%;
        height: 0.5rem;
        margin: 1rem 0;
        padding: initial;
        background: transparent;
        border: none;
        --thumb-color: var(--ridge-color);
    }
    input[type="range"].hover {
        --slider-thumb-bg: hsl(0, 0%, 95%);
        --slider-thumb-size: 2.5rem;
        --thumb-color: var(--primary-color);
    }
    input[type="range"].active {
        --slider-thumb-bg: hsl(0, 0%, 90%);
        --slider-thumb-shadow: 0 0.25rem 0.25rem hsla(0, 0%, 0%, 0.5);
    }
    input[type="range"]::-webkit-slider-runnable-track {
        width: 100%;
        height: 100%;
        background: var(--primary-color);
        border-radius: 0.5rem;
    }
    input[type="range"]::-moz-range-track {
        width: 100%;
        height: 100%;
        background: var(--primary-color);
        border-radius: 0.5rem;
    }
    input[type="range"]::-ms-track {
        width: 100%;
        height: 100%;
        background: var(--primary-color);
        border-radius: 0.5rem;
    }
    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: var(--slider-thumb-size);
        height: var(--slider-thumb-size);
        border-radius: 100%;
        background: var(--slider-thumb-bg);
        box-shadow: var(--slider-thumb-shadow);
        box-sizing: border-box;
        border: 2px solid var(--thumb-color);
        margin-top: 0.25rem;
        transform: translate3d(0, -50%, 0);
        transition-duration: var(--small-element-transition-duration);
    }
    input[type="range"]::-moz-range-thumb {
        appearance: none;
        width: var(--slider-thumb-size);
        height: var(--slider-thumb-size);
        border-radius: 100%;
        background: var(--slider-thumb-bg);
        box-shadow: var(--slider-thumb-shadow);
        box-sizing: border-box;
        border: 2px solid var(--thumb-color);
        margin-top: -0.5rem;
        transition-duration: var(--small-element-transition-duration);
    }
    input[type="range"]::-ms-thumb {
        appearance: none;
        width: var(--slider-thumb-size);
        height: var(--slider-thumb-size);
        border-radius: 100%;
        background: var(--slider-thumb-bg);
        box-shadow: var(--slider-thumb-shadow);
        box-sizing: border-box;
        border: 2px solid var(--thumb-color);
        margin-top: -0.5rem;
        transition-duration: var(--small-element-transition-duration);
    }
</style>
