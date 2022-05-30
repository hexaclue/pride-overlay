export function fileToImage(file: File): Promise<HTMLImageElement> {
    return new Promise<HTMLImageElement>((resolve, reject) => {
        let img = new Image();
        let srcUrl = URL.createObjectURL(file);

        img.onload = () => {
            URL.revokeObjectURL(srcUrl);
            resolve(img);
        };
        img.onerror = (e) => {
            reject(e);
        };

        img.src = srcUrl;
    });
}