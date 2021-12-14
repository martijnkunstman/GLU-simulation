export default class Vector {
    public x: number
    public y: number
    public userData;

    public constructor(x: number = 1, y: number = 1, data: any = []) {
        this.x = x
        this.y = y
        this.userData = data
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

    public sqDistanceFrom(other: Vector): number {
        const dx = other.x - this.x;
        const dy = other.y - this.y;

        return dx * dx + dy * dy;
    }

    // Pythagorus: a^2 = b^2 + c^2
    public distanceFrom(other: Vector): number {
        return Math.sqrt(this.sqDistanceFrom(other));
    }
}