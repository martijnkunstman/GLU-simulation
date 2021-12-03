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
    public multiply(scalar: number) {
        return new Vector(this.x * scalar, this.y * scalar);
    }


    public getDirection(): number {
        return Math.atan2(this.y, this.x);
    }
    public getMagnitude(): number {
        return Math.hypot(this.x, this.y)
    }

    public setMagnitude(magnitude: number): void {
        let direction = this.getDirection();
        this.x = Math.cos(direction) * magnitude;
        this.y = Math.sin(direction) * magnitude;
    }
    public setMaxMagnitude(magnitude: number): void {
        if (this.getMagnitude() > magnitude) {
            this.setMagnitude(magnitude)
        }
    }    

    //create random vector with magnitude...
}