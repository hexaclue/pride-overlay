<script lang="ts">
    import { onMount } from "svelte";
    import { drawToCanvas } from "./helpers/drawToCanvas";
    import { fileToImage } from "./helpers/fileToImage";
    import type { CanvasDrawOptions } from "./types/canvasDrawOptions";

    export let options: CanvasDrawOptions;
    export let selectedFile: File;
    export let previewCircular: boolean;

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
        // let smallest = 0;
        // smallest = selectedImage.naturalWidth;
        // smallest =
        //     selectedImage.naturalHeight < smallest
        //         ? selectedImage.naturalHeight
        //         : smallest;

        // canvas.width = 100;
        // canvas.height = 100;

        // canvas.removeAttribute("width");
        // canvas.removeAttribute("height");
        // canvas.width = undefined;
        // canvas.height = undefined;

        setTimeout(() => {
            canvas.width = canvas.getBoundingClientRect().width;
            canvas.height = canvas.getBoundingClientRect().height;
        }, 100);

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

<svelte:window on:resize={fixRes} />

<canvas bind:this={canvas} class:isCircular={previewCircular} />

<style>
    canvas {
        width: min(20rem, var(--page-size));
        /* height: min(20rem, var(--page-size)); */
        aspect-ratio: 1;

        /* background: black; */
        transition: border-radius var(--big-element-transition-duration);
    }

    .isCircular {
        border-radius: 50%;
    }
</style>
