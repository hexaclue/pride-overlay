export function isImageOk(img: HTMLImageElement): boolean {
    if (!img) {
        return false;
    }
    if (!img.complete) {
        return false;
    }
    if (img.naturalWidth === 0) {
        return false;
    }
    return true;
}