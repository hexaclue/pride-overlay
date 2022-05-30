<script lang="ts">
    import { onMount } from "svelte";
    import { degToRad } from "./helpers/degToRad";
    import { fileToImage } from "./helpers/fileToImage";
    import { isImageOk } from "./helpers/isImageOk";

    export let cutoutSize: number;
    export let resizeInwards: boolean;
    export let selectedColors: string[];
    export let previewCircular: boolean;
    export let isGradient: boolean;
    export let isRotating: boolean;
    export let animationLength: number;
    export let isRotatingCounterClockwise: boolean;

    export let selectedFile: File;
    let selectedImage: HTMLImageElement;

    let canvas: HTMLCanvasElement;
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
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);

            if (isRotating) {
                ctx.rotate(
                    degToRad(
                        (now / animationLength) *
                            360 *
                            (isRotatingCounterClockwise ? -1 : 1)
                    )
                );
            }

            ctx.translate(canvas.width / -2, canvas.height / -2);

            if (!isGradient) {
                for (let i = 0; i < selectedColors.length; i++) {
                    ctx.fillStyle = selectedColors[i];
                    ctx.fillRect(
                        -canvas.width / 2,
                        i == 0
                            ? -canvas.height / 2
                            : (i * canvas.height) / selectedColors.length,
                        canvas.width * 2,
                        ([0, selectedColors.length - 1].includes(i)
                            ? canvas.height / 2
                            : 0) +
                            canvas.height / selectedColors.length
                    );
                }
            } else {
                let gradient = ctx.createLinearGradient(
                    canvas.width / 2,
                    0,
                    canvas.width / 2,
                    canvas.height
                );

                for (let i = 0; i < selectedColors.length; i++) {
                    gradient.addColorStop(
                        i / (selectedColors.length - 1),
                        selectedColors[i]
                    );
                }

                ctx.fillStyle = gradient;
                ctx.fillRect(
                    -canvas.width / 2,
                    -canvas.height / 2,
                    canvas.width * 2,
                    canvas.height * 2
                );
            }

            ctx.restore();

            ctx.save();
            ctx.beginPath();
            ctx.arc(
                canvas.width / 2,
                canvas.height / 2,
                ((canvas.width / 2) * cutoutSize) / 100,
                0,
                Math.PI * 2
            );
            ctx.clip();

            if (selectedImage && isImageOk(selectedImage)) {
                ctx.drawImage(
                    selectedImage,
                    resizeInwards
                        ? (canvas.width * (1 - cutoutSize / 100)) / 2
                        : 0,
                    resizeInwards
                        ? (canvas.height * (1 - cutoutSize / 100)) / 2
                        : 0,
                    canvas.width -
                        (resizeInwards
                            ? canvas.width * (1 - cutoutSize / 100)
                            : 0),
                    canvas.height -
                        (resizeInwards
                            ? canvas.height * (1 - cutoutSize / 100)
                            : 0)
                );
            }

            ctx.restore();

            ctx.fillStyle = "red";
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
        background: black;
        transition: border-radius var(--big-element-transition-duration);
    }

    .isCircular {
        border-radius: 50%;
    }
</style>
