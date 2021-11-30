import Util from "./Util";
import Vector from "./Vector";
import Boid from "./Boid";

export default class World {
    public width: number
    public height: number
    public initialBoids: number

    public boids: Array<Boid> = []
    public canvas: HTMLCanvasElement
    public ctx: CanvasRenderingContext2D

    public time: number = 0;

    public util: Util = new Util()

    public constructor(width: number, height: number, initialBoids: number) {
        this.width = width;
        this.height = height;
        this.canvas = document.createElement('canvas')
        this.canvas.setAttribute("width", this.width.toString())
        this.canvas.setAttribute("height", this.height.toString())
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d")
        this.initialBoids = initialBoids;
        for (let a: number = 0; a < this.initialBoids; a++) {
            let location = new Vector(this.util.randomBetween(0, width), this.util.randomBetween(0, height))
            let bounds = new Vector(this.width, this.height)
            let boid = new Boid(location, bounds, a)
            this.boids.push(boid)
        }
        this.cycle();
    }

    public cycle() {
        const d = new Date();
        let time = d.getTime();
        this.checkOverlap();
        let dif = time - this.time;
        this.render(dif);
        console.log();
        window.requestAnimationFrame(() => this.cycle());
        this.time = time;
    }

    public checkOverlap() {

        this.boids.map(boid => { boid.overlap = false; boid.checked = false })

        let counter:number = 1;
        for (let i: number = 0; i < this.boids.length; i++) {
            if (!this.boids[i].checked) {
                for (let ii: number = counter; ii < this.boids.length; ii++) {
                    if (this.boids[i].id != this.boids[ii].id) {
                        if (this.boids[i].location.distance(this.boids[ii].location) < this.boids[i].radius + this.boids[ii].radius) {
                            this.boids[i].overlap = true;
                            this.boids[ii].overlap = true;
                            this.boids[i].checked = true;
                            this.boids[ii].checked = true;
                            break;
                        }
                    }
                    this.boids[i].checked = true;
                }
            }
            counter++;
        }
    }

    public render(fps: number) {
        this.ctx.fillStyle = "#00FF00";
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.font = "30px Arial";
        this.boids.map(boid => boid.render(this.ctx));
        this.ctx.fillText(fps.toString(), 50, 50);
    }
}