export default class Vector {
    public x
    public y

    public constructor(x: number = 1, y: number = 1) {
        this.x = x
        this.y = y
    }

    public distance(vector: Vector): number {
        return Math.hypot(this.x - vector.x, this.y - vector.y)
    }
    public add(vector: Vector): Vector {
        return new Vector(this.x + vector.x, this.y + vector.y)
    }
    public substract(vector: Vector): Vector {
        return new Vector(this.x - vector.x, this.y - vector.y)
    }

}