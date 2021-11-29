import Helper from "./Helper";
import Location from "./Location";
import Boid from "./Boid";

export default class World {
    public width: number
    public height: number
    public initialBoids: number

    public boids:Array<Boid> = []
    public canvas: HTMLCanvasElement
    public ctx: CanvasRenderingContext2D

    public helper: Helper = new Helper()

    public constructor(width: number, height: number, initialBoids: number) {
        this.canvas = document.createElement('canvas')
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d")
        this.ctx.fillStyle = "#00FF00";
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.initialBoids = initialBoids;
        for (let a:number = 0; a<this.initialBoids;a++)
        {
            this.createBoid(new Location(this.helper.randomBetween(0,width), this.helper.randomBetween(0,height)))
        }
        this.render();
    }

    public createBoid(location: Location)
    {
        let boid = new Boid(location)
        this.boids.push(boid)
    }

    public render()
    {
        this.boids.map(boid => boid.render(this.ctx));
    }
}