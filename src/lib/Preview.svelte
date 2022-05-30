<script lang="ts">
    import { onMount } from "svelte";
    import { degToRad } from "./helpers/degToRad";
    import { drawToCanvas } from "./helpers/drawToCanvas";
    import { fileToImage } from "./helpers/fileToImage";
    import { isImageOk } from "./helpers/isImageOk";
    import type { CanvasDrawOptions } from "./types/canvasDrawOptions";
    import { CutoutType } from "./types/cutoutType";

    export let options: CanvasDrawOptions;
    export let selectedFile: File;
    export let previewCircular: boolean;

    // export let cutoutSize: number;
    // export let resizeInwards: boolean;
    // export let selectedColors: string[];
    // export let previewCircular: boolean;
    // export let isGradient: boolean;
    // export let isRotating: boolean;
    // export let animationLength: number;
    // export let isRotatingCounterClockwise: boolean;
    // export let overlayOpacity: number;

    // export let selectedFile: File;
    let selectedImage: HTMLImageElement;

    export let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;

    let frame: number;

    $: {
        (async () => {
            if (selectedFile) {
                selectedImage = await fileToImage(selectedFile);
                fixRes();
            }
        })();
    }

    function fixRes() {
        let smallest = 0;
        smallest = selectedImage.naturalWidth;
        smallest =
            selectedImage.naturalHeight < smallest
                ? selectedImage.naturalHeight
                : smallest;

        // canvas.width = smallest;
        // canvas.height = smallest;
    }

    onMount(() => {
        frame = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(frame);
        };
    });

    function draw() {
        let now = performance.now() / 1000;
        if (canvas && ctx) {
            drawToCanvas(canvas, ctx, selectedImage, options, now);
        } else {
            canvas.width = canvas.getBoundingClientRect().width;
            canvas.height = canvas.getBoundingClientRect().height;
            ctx = canvas.getContext("2d");
        }
        frame = requestAnimationFrame(draw);
    }
</script>

<canvas bind:this={canvas} class:isCircular={previewCircular} />

<style>
    canvas {
        width: 20rem;
        height: 20rem;
        /* background: black; */
        transition: border-radius var(--big-element-transition-duration);
    }

    .isCircular {
        border-radius: 50%;
    }
</style>
