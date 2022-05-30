import { Size } from "../types/size";
import { fileToImage } from "./fileToImage";

export function getImageSize(src: File): Promise<Size> {
    return new Promise<Size>(async (resolve, _) => {
        let img = await fileToImage(src);
        resolve(new Size(img.naturalWidth, img.naturalHeight));
    });
}