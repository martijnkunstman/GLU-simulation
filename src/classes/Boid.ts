import Vector from "./Vector";
import Invection from "./Invection";
import Util from "./Util";

export default class Boid {
    public location: Vector;
    public direction: Vector;
    public bounds: Vector;
    public invection: Invection;
    public radius: number = 3;
    public overlap: boolean = false;
    public checked: boolean = false;
    public util: Util = new Util();
    public id: number;

    public constructor(location: Vector, bounds: Vector, id: number, invection: Invection = new Invection()) {
        this.invection = invection;
        this.location = location;
        this.bounds = bounds;
        this.id = id;
        this.direction = new Vector(this.util.randomBetween(-2, 2), this.util.randomBetween(-2, 2))
    }

    /*
    public checkOverlap(boids: Array<Boid>):boolean {    
        if (this.checked) {
            return true;
        }
        for (let i: number = 0; i < boids.length; i++) {
            console.log(boids[i].id);
            if (this.id != boids[i].id) {
                if (this.location.distance(boids[i].location) < this.radius * 2) {
                    this.overlap = true;
                    this.checked = true;
                    //boids[i].overlap = true;
                    boids[i].checked = true;
                }
            }            
        }
        this.checked = true; 
        return true;  
    }
    */

    public render(ctx: CanvasRenderingContext2D) {
        this.location.x = this.location.x + this.direction.x
        this.location.y = this.location.y + this.direction.y

        if (this.location.x < 0) { this.direction.x = -this.direction.x }
        if (this.location.x > this.bounds.x) { this.direction.x = -this.direction.x }
        if (this.location.y < 0) { this.direction.y = -this.direction.y }
        if (this.location.y > this.bounds.y) { this.direction.y = -this.direction.y }

        ctx.beginPath();
        ctx.arc(this.location.x, this.location.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
        if (this.overlap) {
            ctx.fillStyle = "red";
            ctx.fill();
        }
    }
}