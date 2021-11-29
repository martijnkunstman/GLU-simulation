import Location from "./Location";

export default class Boid {
    public location: Location;
    public constructor(location:Location) {
        this.location = location;
    }
    public render(ctx:CanvasRenderingContext2D)
    {
        ctx.beginPath();
        ctx.arc(this.location.x, this.location.y, 10, 0, 2 * Math.PI);
        ctx.stroke();
    }
}