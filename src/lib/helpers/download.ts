import type { CanvasDrawOptions } from "../types/canvasDrawOptions";
import { drawToCanvas } from "./drawToCanvas";
import { fileToImage } from "./fileToImage";
import * as gifshot from "gifshot";

export function download(selectedFile: File, options: CanvasDrawOptions): Promise<void> {
    return new Promise(async (resolve, reject) => {
        let frames: HTMLElement[] = [];

        let selectedImage: HTMLImageElement;
        if (selectedFile) {
            selectedImage = await fileToImage(selectedFile);
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext("2d");

        if (selectedFile) {
            canvas.width = selectedImage.width;
            canvas.height = selectedImage.width;
        } else {
            canvas.width = 512;
            canvas.height = 512;
        }

        if (options.isRotating) {
            let fps = 30;

            canvas.width = Math.min(canvas.width, 256);
            canvas.height = Math.min(canvas.height, 256);

            for (let i = 0; i < fps * options.animationLength; i++) {
                drawToCanvas(canvas, ctx, selectedImage, options, i / fps);

                frames.push(await new Promise(resolveImg => {
                    let img = new Image();
                    img.onload = () => {
                        resolveImg(img);
                    }
                    img.src = canvas.toDataURL();
                }));
            }

            gifshot.createGIF({
                gifWidth: canvas.width,
                gifHeight: canvas.height,
                images: frames,
                interval: 1 / fps,
                // progressCallback: (captureProgress: number) => {
                //     // console.log(captureProgress);
                // },
            }, (obj) => {
                if (!obj.error) {
                    let image = obj.image;
                    const link = document.createElement('a');
                    link.download = "lpppog_ani" + Date.now() + ".gif";
                    link.href = image;
                    link.click();
                    resolve();
                } else {
                    reject();
                }
            });
        } else {
            drawToCanvas(canvas, ctx, selectedImage, options, 0);

            const link = document.createElement('a');
            link.download = "lpppog" + Date.now() + ".png";
            link.href = canvas.toDataURL("image/png");
            link.click();

            resolve();
        }
    });
}