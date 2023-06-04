import type { CutoutType } from "./cutoutType";

export type CanvasDrawOptions = {
    cutoutSize: number;
    resizeInwards: boolean;
    selectedColors: string[][];
    isGradient: boolean;
    isRotating: boolean;
    animationLength: number;
    isRotatingCounterClockwise: boolean;
    overlayOpacity: number;
    cutoutType: CutoutType;
    rotationOffset: number;
}