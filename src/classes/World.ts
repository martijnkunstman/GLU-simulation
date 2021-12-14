import Util from "./Util";
import Vector from "./Vector";
import Boid from "./Boid";
import Infection from "./Infection";
import QuadTree from "./QuadTree";
import * as PIXI from 'pixi.js'
import Rectangle from "./Rectangle";

export default class World {
    public width: number
    public height: number
    public initialBoids: number

    public boids: Array<Boid> = []
    public canvas: HTMLCanvasElement
    public ctx: CanvasRenderingContext2D
    public infection: Infection;
    public infections: number;
    public startSeperationAtDistance: number;

    public pixi;
    public container;

    private fps: number;
    private quadTree: QuadTree;

    public time: number = 0;
    public times: Array<number> = [];

    public constructor(width: number, height: number, density: number, infections: number, infection: Infection, startSeperationAtDistance: number) {
        this.pixi = new PIXI.Application({
            width: width,
            height: height,
            backgroundColor: 0x2c3e50
        });
        document.body.appendChild(this.pixi.view);

        this.container = new PIXI.Container();
        this.pixi.stage.addChild(this.container);

        this.width = width;
        this.height = height;
        /*
        this.canvas = document.createElement('canvas')
        this.canvas.id = "world"
        this.canvas.setAttribute("width", this.width.toString())
        this.canvas.setAttribute("height", this.height.toString())
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d")
        */
        this.quadTree = new QuadTree(new Rectangle(width/2,height/2,width/2,height/2),4)
        
        this.initialBoids = this.width * this.height * density;
        this.infection = infection;
        this.infections = infections;
        for (let a: number = 0; a < this.initialBoids; a++) {
            let location = new Vector(Util.randomBetween(0, this.width), Util.randomBetween(0, this.height))
            let bounds = new Vector(this.width, this.height)
            let infected
            a < this.infections ? infected = 1 : infected = 0
            let boid = new Boid(location, bounds, a, infection, infected, startSeperationAtDistance, this.container)
            this.boids.push(boid)
        }
        this.cycle();
    }

    public resetDensity(density: number) {
        this.container.removeChildren();
        this.initialBoids = this.width * this.height * density;
        this.boids = [];
        for (let a: number = 0; a < this.initialBoids; a++) {
            let location = new Vector(Util.randomBetween(0, this.width), Util.randomBetween(0, this.height))
            let bounds = new Vector(this.width, this.height)
            let infected
            a < this.infections ? infected = 1 : infected = 0
            let boid = new Boid(location, bounds, a, this.infection, infected, this.startSeperationAtDistance, this.container)
            this.boids.push(boid)
        }
    }

    public resetSeperation(startSeperationAtDistance: number) {
        this.container.removeChildren();
        this.startSeperationAtDistance = startSeperationAtDistance
        this.boids = [];
        for (let a: number = 0; a < this.initialBoids; a++) {
            let location = new Vector(Util.randomBetween(0, this.width), Util.randomBetween(0, this.height))
            let bounds = new Vector(this.width, this.height)
            let infected
            a < this.infections ? infected = 1 : infected = 0
            let boid = new Boid(location, bounds, a, this.infection, infected, this.startSeperationAtDistance, this.container)
            this.boids.push(boid)
        }
    }

    public cycle() {
        const now = performance.now();
        while (this.times.length > 0 && this.times[0] <= now - 1000) {
            this.times.shift();
        }
        this.times.push(now);
        let fps = this.times.length;
       //this.checkOverlap();
        this.render(fps);
        window.requestAnimationFrame(() => this.cycle());

    }

    public checkOverlap() {

        
        this.boids.map(boid => boid.reset())

        let counter: number = 1;
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
                        if (this.boids[i].state == 1) {
                            this.boids[ii].gotIt = true
                        }
                        if (this.boids[ii].state == 1) {
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
        /*
        this.ctx.fillStyle = "#dddddd";
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.font = "30px Arial";
        */
        
        this.boids.map(boid => boid.cycle(this.ctx, this.boids));
        /*
        this.ctx.fillStyle = "black";
        this.ctx.fillText(fps.toString(), 50, 50);
        */
    }
}