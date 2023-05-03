<script lang="ts">
    import { slide } from "svelte/transition";

    import Dropzone from "./lib/Dropzone.svelte";
    import FileStats from "./lib/FileStats.svelte";
    import { flagColours } from "./lib/constants/flagColours";
    import CustomSelect from "./lib/CustomSelect.svelte";
    import Slider from "./lib/Slider.svelte";
    import Switch from "./lib/Switch.svelte";

    import gradientIcon from "./assets/gradient.svg";
    import resizeInwardsIcon from "./assets/resizeInwards.svg";
    import loadingIcon from "./assets/loading.svg";
    import rotatingIcon from "./assets/rotating.svg";
    import Preview from "./lib/Preview.svelte";
    import { generateFlag } from "./lib/helpers/generateFlag";
    import { capitalise } from "./lib/helpers/stringHelpers";
    import Button from "./lib/Button.svelte";
    import { download } from "./lib/helpers/download";
    import RadioRow from "./lib/RadioRow.svelte";
    import { CutoutType } from "./lib/types/cutoutType";
    import Footer from "./lib/Footer.svelte";
    import Note from "./lib/Note.svelte";
    import { NoteType } from "./lib/types/noteTypes";

    let selectedFiles: File[] = [];
    let selectedFlag: string = "pride";
    let cutoutSize: number = 90;
    let isGradient: boolean = false;
    let resizeInwards: boolean = true;
    let rotating: boolean = false;
    let animationLength: number = 10;
    let previewCircular: boolean = true;
    let isRotatingCounterClockwise: boolean = false;
    let overlayOpacity: number = 100;
    let cutoutType: CutoutType = CutoutType.CIRCLE;

    let canvas: HTMLCanvasElement;

    $: animated = rotating;

    $: renderOptions = {
        cutoutSize: cutoutSize,
        resizeInwards: resizeInwards,
        selectedColors: flagColours[selectedFlag],
        isGradient: isGradient,
        isRotating: rotating,
        animationLength: animationLength,
        isRotatingCounterClockwise: isRotatingCounterClockwise,
        overlayOpacity: overlayOpacity,
        cutoutType: cutoutType,
    };

    let isRendering: boolean = false;
</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@700&family=Roboto&display=swap" rel="stylesheet" />
</svelte:head>

<main>
    <header>
        <h1>LGBT Profile Picture Overlay Generator</h1>
    </header>

    <section>
        <h2>File input</h2>
        <div class="flexysmexy" class:expanded={selectedFiles.length > 0}>
            <div>
                <Dropzone bind:selectedFiles filter="image/*" />
            </div>
            <div>
                <FileStats {selectedFiles} />
            </div>
        </div>
    </section>

    <section>
        <h2>Flag selection</h2>
        <CustomSelect
            options={Object.keys(flagColours)
                .sort()
                .map(e => ({
                    label: capitalise(e),
                    value: e,
                    icon: generateFlag(flagColours[e]),
                }))}
            bind:selected={selectedFlag}
        />
    </section>

    <section>
        <h2>Settings</h2>
        <p>Cutout type</p>
        <RadioRow
            bind:selected={cutoutType}
            options={[
                { label: "Circular", value: CutoutType.CIRCLE },
                { label: "Square", value: CutoutType.SQUARE },
                { label: "Overlay", value: CutoutType.OVERLAY },
            ]}
        />
        <br /><br />
        <p>Cutout size (how many % of your profile picture will remain visible)</p>
        <Slider bind:value={cutoutSize} />
        <br />
        <p>Overlay opacity</p>
        <Slider bind:value={overlayOpacity} />
        <br />
        <h3>Painting modes</h3>
        <div class="multiple-choices">
            <Switch bind:checked={isGradient}>Gradient <img alt="" src={gradientIcon} class="icon" /></Switch>
            <Switch bind:checked={resizeInwards}>Resize inwards (fit to cutout size) <img alt="" src={resizeInwardsIcon} class="icon" /></Switch>
            <Switch bind:checked={rotating}>Animated rotating <img alt="" src={rotatingIcon} class="icon" /></Switch>
        </div>
    </section>

    {#if animated}
        <section transition:slide|local>
            <h2>Animation customisation</h2>
            <p>Animation length (seconds)</p>
            <Slider bind:value={animationLength} min={0.1} max={30} step={0.1} />
            <br />
            <Switch bind:checked={isRotatingCounterClockwise}>Counter-clockwise</Switch>
        </section>
    {/if}

    <section>
        <h2>Preview</h2>
        <Preview options={renderOptions} selectedFile={selectedFiles[0]} {previewCircular} bind:canvas />
        <br /><br />
        <Switch bind:checked={previewCircular}>Circular preview</Switch>
    </section>

    <section>
        <h2>Export</h2>
        {#if !isRendering}
            {#if !selectedFiles.length}
                <Note>Note: There is no input file selected. However, you can still export this flag.</Note><br />
            {/if}
            {#if animated}
                <Note type={NoteType.WARNING}>Note: Animated GIFs take quite a long time to process! (especially if you are on a mobile device)</Note><br />
            {/if}
            <Button
                on:click={() => {
                    isRendering = true;
                    setTimeout(async () => {
                        await download(selectedFiles[0], renderOptions);
                        isRendering = false;
                    }, 50);
                }}
                >Download as {#if animated}GIF{:else}PNG{/if}!</Button
            >
        {:else}
            <Note>Currently rendering your image...<img src={loadingIcon} class="icon" alt="" /></Note>
        {/if}
    </section>

    <Footer />
</main>

<style>
    :root {
        --page-size: 50vw;
        --bg: white;
        --primary-color: hsl(163, 100%, 45%);
        --slider-thumb-size: 2rem;
        --slider-thumb-bg: white;
        --slider-thumb-shadow: 0 0.25rem 0.5rem hsla(0, 0%, 0%, 0.25);
        --select-color: hsl(0, 0%, 90%);
        --ridge-color: hsl(0, 0%, 70%);
        --disabled-color: hsl(0, 0%, 40%);
        --small-element-transition-duration: 0.15s;
        --big-element-transition-duration: 0.3s;
        --ease-out-cubic: cubic-bezier(0.33, 1, 0.68, 1);
    }

    :global(html) {
        scrollbar-color: var(--primary-color) transparent;
    }

    :global(h1),
    :global(h2),
    :global(h3),
    :global(h4),
    :global(h5),
    :global(h6) {
        font-family: Raleway, Arial, sans-serif, monospace;
    }

    :global(h1),
    :global(h2),
    :global(h3),
    :global(h4),
    :global(h5),
    :global(h6),
    :global(p) {
        margin: 0 0 0.75rem 0;
    }

    :global(a) {
        color: hsl(163, 100%, 25%);
    }

    main {
        position: relative;
        width: 100%;
        min-height: 100%;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
    }

    main > header > h1 {
        text-align: center;
        margin: 2rem 0;
    }

    section {
        flex-grow: 0;
        width: Calc(var(--page-size) + 0.01px); /* because flex-wrap */
        padding: 1.2rem;
        box-sizing: border-box;
        margin: 0 auto;
    }

    .flexysmexy {
        display: grid;
        overflow-x: hidden;
        grid-template-columns: 100% 0;
        gap: 0;
        transition-duration: var(--big-element-transition-duration);
    }
    .flexysmexy > * {
        position: relative;
        align-items: stretch;
        grid-row: 1;
    }
    .flexysmexy.expanded {
        gap: 1rem;
        grid-template-columns: Calc((100% - 1rem) / 2) Calc((100% - 1rem) / 2);
    }

    img {
        display: inline-flex;
    }
    img.icon {
        vertical-align: middle;
        width: 2rem;
        height: 2rem;
        margin-left: 0.5rem;
    }

    .multiple-choices {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem 3rem;
    }

    @media screen and (max-width: 80rem) {
        :root {
            --page-size: 70vw;
        }
    }
    @media screen and (max-width: 60rem) {
        :root {
            /* --page-size: 97.5vw; */
            --page-size: Calc(100vw - (97.5vw - 97.5%));
        }
    }

    @media screen and (max-width: 35rem) and (orientation: portrait) {
        .flexysmexy {
            overflow-x: initial;
            overflow-y: hidden;
            grid-template-columns: initial;
            grid-template-rows: 100% 0;
        }

        .flexysmexy > * {
            align-items: initial;
            grid-row: initial;
        }

        .flexysmexy.expanded {
            grid-template-columns: initial;
            grid-template-rows: 1fr 1fr;
        }
    }
</style>
