import type { CanvasDrawOptions } from "../types/canvasDrawOptions";
import { CutoutType } from "../types/cutoutType";
import { degToRad } from "./degToRad";
import { isImageOk } from "./isImageOk";

/**
    @param now - the amount of milliseconds elapsed in the animation
*/
export function drawToCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, selectedImage: HTMLImageElement, options: CanvasDrawOptions, now: number) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (options.cutoutType != CutoutType.OVERLAY) {
        drawFlag(canvas, ctx, options, now);
    }

    ctx.save();
    ctx.beginPath();

    if (options.cutoutType != CutoutType.OVERLAY) {
        switch (options.cutoutType) {
            case CutoutType.CIRCLE:
                ctx.arc(
                    canvas.width / 2,
                    canvas.height / 2,
                    ((canvas.width / 2) * options.cutoutSize) / 100,
                    0,
                    Math.PI * 2
                );
                break;
            case CutoutType.SQUARE:
                ctx.rect(
                    (canvas.width * (1 - options.cutoutSize / 100)) / 2,
                    (canvas.height * (1 - options.cutoutSize / 100)) /
                    2,
                    canvas.width * (options.cutoutSize / 100),
                    canvas.height * (options.cutoutSize / 100)
                );
                break;
        }
        ctx.clip();
    }

    if (selectedImage && isImageOk(selectedImage)) {
        ctx.drawImage(
            selectedImage,
            options.resizeInwards
                ? (canvas.width * (1 - options.cutoutSize / 100)) / 2
                : 0,
            options.resizeInwards
                ? (canvas.height * (1 - options.cutoutSize / 100)) / 2
                : 0,
            canvas.width -
            (options.resizeInwards
                ? canvas.width * (1 - options.cutoutSize / 100)
                : 0),
            canvas.height -
            (options.resizeInwards
                ? canvas.height * (1 - options.cutoutSize / 100)
                : 0)
        );
    }

    ctx.restore();

    if (options.cutoutType == CutoutType.OVERLAY) {
        drawFlag(canvas, ctx, options, now);
    }
}


function drawFlag(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, options: CanvasDrawOptions, now: number) {
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);

    if (options.isRotating) {
        ctx.rotate(
            degToRad(
                (now / options.animationLength) *
                360 *
                (options.isRotatingCounterClockwise ? -1 : 1)
            )
        );
    }

    ctx.translate(canvas.width / -2, canvas.height / -2);

    ctx.globalAlpha = options.overlayOpacity / 100;

    if (!options.isGradient) {
        for (let i = 0; i < options.selectedColors.length; i++) {
            ctx.fillStyle = options.selectedColors[i];
            ctx.fillRect(
                -canvas.width / 2,
                i == 0
                    ? -canvas.height / 2
                    : (i * canvas.height) / options.selectedColors.length,
                canvas.width * 2,
                ([0, options.selectedColors.length - 1].includes(i)
                    ? canvas.height / 2
                    : 0) +
                canvas.height / options.selectedColors.length
            );
        }
    } else {
        let gradient = ctx.createLinearGradient(
            canvas.width / 2,
            0,
            canvas.width / 2,
            canvas.height
        );

        for (let i = 0; i < options.selectedColors.length; i++) {
            gradient.addColorStop(
                i / (options.selectedColors.length - 1),
                options.selectedColors[i]
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
}