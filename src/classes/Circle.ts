import Rectangle from "./Rectangle";
import Vector from "./Vector";

export default class Circle {
    public x: number
    public y: number
    public r: number
    public rSquared: number;


    public constructor(x: number, y: number, r: number) {
        this.x = x
        this.y = y
        this.r = r
        this.rSquared = this.r * this.r
    }

    public contains(point: Vector): boolean {
        let d = Math.pow((point.x - this.x), 2) + Math.pow((point.y - this.y), 2);
        return d <= this.rSquared;
    }

    public intersects(range: Rectangle): boolean {
        let xDist = Math.abs(range.x - this.x);
        let yDist = Math.abs(range.y - this.y);

        let r = this.r;

        let w = range.w / 2;
        let h = range.h / 2;

        let edges = Math.pow((xDist - w), 2) + Math.pow((yDist - h), 2);

        if (xDist > (r + w) || yDist > (r + h)) { return false }

        if (xDist <= w || yDist <= h) { return true }

        return edges <= this.rSquared;
    }

}