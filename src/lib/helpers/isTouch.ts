export function isTouch(): boolean {
    return ("ontouchstart" in window
        || !!navigator.maxTouchPoints);
}