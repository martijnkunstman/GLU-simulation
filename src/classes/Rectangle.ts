import Vector from "./Vector";

export default class Rectangle {
    public x: number
    public y: number
    public w: number
    public h: number
    public left: number
    public right: number
    public top: number
    public bottom: number

    public constructor(x: number, y: number, w: number, h: number) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.left = x - w / 2
        this.right = x + w / 2
        this.top = y - h / 2
        this.bottom = y + h / 2
    }

    public contains(point: Vector): boolean {
        return (
            this.left <= point.x && point.x <= this.right &&
            this.top <= point.y && point.y <= this.bottom
        )
    }

    public intersects(range: Rectangle): boolean {
        return !(
            this.right < range.left || range.right < this.left ||
            this.bottom < range.top || range.bottom < this.top
        )
    }

    public subdivide(quadrant: string):Rectangle {
        switch (quadrant) {
            case 'ne':
                return new Rectangle(this.x + this.w / 4, this.y - this.h / 4, this.w / 2, this.h / 2);
            case 'nw':
                return new Rectangle(this.x - this.w / 4, this.y - this.h / 4, this.w / 2, this.h / 2);
            case 'se':
                return new Rectangle(this.x + this.w / 4, this.y + this.h / 4, this.w / 2, this.h / 2);
            case 'sw':
                return new Rectangle(this.x - this.w / 4, this.y + this.h / 4, this.w / 2, this.h / 2);
        }
    }

    public xDistanceFrom(point: Vector):number {
        if (this.left <= point.x && point.x <= this.right) {
            return 0;
        }

        return Math.min(
            Math.abs(point.x - this.left),
            Math.abs(point.x - this.right)
        );
    }

    public yDistanceFrom(point: Vector):number {
        if (this.top <= point.y && point.y <= this.bottom) {
            return 0;
        }
        return Math.min(
            Math.abs(point.y - this.top),
            Math.abs(point.y - this.bottom)
        );
    }

    public sqDistanceFrom(point: Vector): number {
        const dx = this.xDistanceFrom(point);
        const dy = this.yDistanceFrom(point);
        return dx * dx + dy * dy;
    }

    public distanceFrom(point: Vector): number {
        return Math.sqrt(this.sqDistanceFrom(point));
    }


}