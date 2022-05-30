import { Size } from "../types/size";

/// Default ratio = 7:4
export function generateFlag(colors: string[], size: Size = new Size(105, 60)): string {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = size.width;
    canvas.height = size.height;

    for (let i = 0; i < colors.length; i++) {
        ctx.fillStyle = colors[i];
        ctx.fillRect(0, i * size.height / colors.length, size.width, size.height / colors.length);
    }

    return canvas.toDataURL();
}