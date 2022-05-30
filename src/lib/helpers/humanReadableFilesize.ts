export function humanReadableFilesize(bytes: number): string {
    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let magnitude = 1;

    while (bytes > 1024 ** magnitude) {
        magnitude++;
    }

    return `${(bytes / 1024 ** (magnitude - 1)).toFixed(2)} ${units[magnitude - 1]}`;
}