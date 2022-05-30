import type { CanvasDrawOptions } from "../types/canvasDrawOptions";
import { drawToCanvas } from "./drawToCanvas";
import { fileToImage } from "./fileToImage";

export async function download(selectedFile: File, options: CanvasDrawOptions) {
    const selectedImage: HTMLImageElement = await fileToImage(selectedFile);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext("2d");

    canvas.width = selectedImage.width;
    canvas.height = selectedImage.width;

    drawToCanvas(canvas, ctx, selectedImage, options, 0);

    const link = document.createElement('a');
    link.download = "lpppog" + Date.now() + ".png";
    link.href = canvas.toDataURL("image/png");
    link.click();
}