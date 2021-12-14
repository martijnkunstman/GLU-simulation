import Vector from "./Vector";

export default class Rectangle {
    public x: number;
    public y: number;
    public w: number;
    public h: number;

    public constructor(x: number, y: number, w: number, h: number) {
        this.x = x
        this.y = y;
        this.w = w;
        this.h = h;
    }

    public contains(point: Vector): boolean {
        return (
            point.x >= this.x - this.w &&
            point.x <= this.x + this.x &&
            point.y >= this.y - this.h &&
            point.y <= this.y + this.h
        )
    }

}