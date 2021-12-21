import Util from "./Util"
import Vector from "./Vector"
import Boid from "./Boid"
import Infection from "./Infection"
import SpacialHash from "./SpacialHash"

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
    public spacialHash: SpacialHash;
    public density: number;

    public boidRadius: number;

    public time: number = 0;
    public times: Array<number> = [];

    public constructor(width: number, height: number, density: number, infections: number, infection: Infection, startSeperationAtDistance: number, boidRadius: number) {

        this.width = width
        this.height = height
        this.density = density //is now actual ammount of Boids
        this.startSeperationAtDistance = startSeperationAtDistance
        this.infection = infection
        this.infections = infections
        this.boidRadius = boidRadius;
        
        this.canvas = document.createElement('canvas')
        this.canvas.id = "world"
        this.canvas.setAttribute("width", this.width.toString())
        this.canvas.setAttribute("height", this.height.toString())
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d")

        this.init(this.density, this.startSeperationAtDistance, this.boidRadius);

        this.cycle();
    }

    public init(density: number, startSeperationAtDistance: number, boidRadius: number) {
        let spacialHashGridSize: number;
        if (this.infection.transmittability>startSeperationAtDistance)
        {
            spacialHashGridSize=this.infection.transmittability;
        }
        else
        {
            spacialHashGridSize=startSeperationAtDistance;
        }       
        this.spacialHash = new SpacialHash(new Vector(this.width, this.height), spacialHashGridSize)

        this.boidRadius = boidRadius;
        this.boids = []
        this.density = density;
        this.startSeperationAtDistance = startSeperationAtDistance;
        //this.initialBoids = this.width * this.height * this.density;
        this.initialBoids = this.density;
        for (let a: number = 0; a < this.initialBoids; a++) {
            let location = new Vector(Util.randomBetween(0, this.width), Util.randomBetween(0, this.height))
            let bounds = new Vector(this.width, this.height)
            let infected
            a < this.infections ? infected = 1 : infected = 0
            let boid = new Boid(location, bounds, a, this.infection, infected, this.startSeperationAtDistance, this.boidRadius)
            this.boids.push(boid)
        }
    }

    public resetDensity(density: number) {
        this.init(density, this.startSeperationAtDistance, this.boidRadius)
    }
    public resetSeperation(seperation: number) {
        this.init(this.density, seperation, this.boidRadius)
    }
    public resetRadius(radius: number) {
        this.init(this.density, this.startSeperationAtDistance, radius)
    }



    public updateSpacialHash() {
        this.spacialHash.clear();
        for (let a = 0; a < this.boids.length; a++) {
            this.spacialHash.insert(this.boids[a]);
        }
    }

    public fps() {
        const now = performance.now();
        while (this.times.length > 0 && this.times[0] <= now - 1000) {
            this.times.shift();
        }
        this.times.push(now);
        let fps = this.times.length;
    }

    public cycle() {
        this.fps()
        this.updateSpacialHash();
        this.render();
        window.requestAnimationFrame(() => this.cycle());
    }
    
    public render() {

        this.ctx.fillStyle = "#dddddd";
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.font = "30px Arial";

        for (let boid of this.boids)
        {
            boid.cycle(this.ctx, this.spacialHash.getNeighbours(boid))
            //boid.cycle(this.ctx, this.boids)
        }     
        
        this.ctx.fillStyle = "black";
        this.ctx.fillText(this.times.length.toString(), 50, 50);

    }
}