import Util from "./Util";
import Vector from "./Vector";
import Boid from "./Boid";
import Invection from "./Invection";

export default class World {
    public width: number
    public height: number
    public initialBoids: number

    public boids: Array<Boid> = []
    public canvas: HTMLCanvasElement
    public ctx: CanvasRenderingContext2D
    public invection: Invection;
    public infections: number;
    public startSeperationAtDistance: number;

    public time: number = 0;

    public constructor(width: number, height: number, density: number, infections: number, invection: Invection, startSeperationAtDistance: number) {
        this.width = width;
        this.height = height;
        this.canvas = document.createElement('canvas')
        this.canvas.id = "world"
        this.canvas.setAttribute("width", this.width.toString())
        this.canvas.setAttribute("height", this.height.toString())
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d")
        this.initialBoids = this.width*this.height*density;
        this.invection = invection;
        this.infections = infections;
        for (let a: number = 0; a < this.initialBoids; a++) {
            let location = new Vector(Util.randomBetween(0, this.width), Util.randomBetween(0, this.height))
            let bounds = new Vector(this.width, this.height)
            let infected
            a<this.infections ? infected = 1 : infected = 0
            let boid = new Boid(location, bounds, a, invection, infected, startSeperationAtDistance)
            this.boids.push(boid)
        }
        this.cycle();
    }

    public resetDensity(density: number)
    {
        this.initialBoids = this.width*this.height*density;
        this.boids = [];
        for (let a: number = 0; a < this.initialBoids; a++) {
            let location = new Vector(Util.randomBetween(0, this.width), Util.randomBetween(0, this.height))
            let bounds = new Vector(this.width, this.height)
            let infected
            a<this.infections ? infected = 1 : infected = 0
            let boid = new Boid(location, bounds, a, this.invection, infected, this.startSeperationAtDistance)
            this.boids.push(boid)
        }
    }

    public resetSeperation(startSeperationAtDistance: number)
    {
        this.startSeperationAtDistance = startSeperationAtDistance
        this.boids = [];
        for (let a: number = 0; a < this.initialBoids; a++) {
            let location = new Vector(Util.randomBetween(0, this.width), Util.randomBetween(0, this.height))
            let bounds = new Vector(this.width, this.height)
            let infected
            a<this.infections ? infected = 1 : infected = 0
            let boid = new Boid(location, bounds, a, this.invection, infected, this.startSeperationAtDistance)
            this.boids.push(boid)
        }
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

        this.boids.map(boid => boid.reset())

        let counter:number = 1;
        for (let i: number = 0; i < this.boids.length; i++) {
            //if (!this.boids[i].checked) {
                for (let ii: number = counter; ii < this.boids.length; ii++) {
                    if (this.boids[i].id != this.boids[ii].id) {
                        if (this.boids[i].location.distance(this.boids[ii].location) < this.boids[i].radius + this.boids[ii].radius + 5) {
                            this.boids[i].overlap = true;
                            this.boids[ii].overlap = true;
                            this.boids[i].checked = true;
                            this.boids[ii].checked = true;
                            //break;
                            if (this.boids[i].state == 1)
                            {
                                this.boids[ii].gotIt = true
                            }
                            if (this.boids[ii].state == 1)
                            {
                                this.boids[i].gotIt = true
                            }
                        }
                    }
                    this.boids[i].checked = true;
                }
            //}
            counter++;
        }
    }

    public render(fps: number) {     
        this.ctx.fillStyle = "#dddddd";
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.font = "30px Arial";
        this.boids.map(boid => boid.cycle(this.ctx, this.boids));
        this.ctx.fillText(fps.toString(), 50, 50);
    }
}