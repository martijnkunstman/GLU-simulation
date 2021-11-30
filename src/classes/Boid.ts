import Vector from "./Vector";
import Invection from "./Invection";
import Util from "./Util";

enum State {
    Susceptible = 0,
    Infectious = 1,
    Recovered = 2,
    Removed = 3
}

export default class Boid {
    public location: Vector;
    public direction: Vector;
    public bounds: Vector;
    public invection: Invection;
    public radius: number = 5;
    public overlap: boolean = false;
    public checked: boolean = false;
    public id: number;
    public state: State; //temp
    public gotIt : boolean = false; //temp

    private speed = 1;

    private infectionDuration: number = 0;

    public constructor(location: Vector, bounds: Vector, id: number, invection: Invection, state: State) {
        this.invection = invection;
        this.location = location;
        this.bounds = bounds;
        this.id = id;
        this.state = state;
        this.direction = new Vector(Util.randomBetween(-this.speed, this.speed), Util.randomBetween(-this.speed, this.speed))
    }

    public reset(){
        this.overlap = false 
        this.checked = false 
        this.gotIt = false
    }

    private update(){
        if (this.state == State.Infectious)
        {
            this.infectionDuration++;
        }
        if (this.infectionDuration>this.invection.duration)
        {
            this.state = State.Recovered;
        }
        if (this.gotIt&&this.state == State.Susceptible)
        {
            this.state = State.Infectious;
        }

        //die...        
    }

    public render(ctx: CanvasRenderingContext2D) {
        this.update();
        
        this.location.x = this.location.x + this.direction.x
        this.location.y = this.location.y + this.direction.y

        if (this.location.x < 0) { this.direction.x = -this.direction.x }
        if (this.location.x > this.bounds.x) { this.direction.x = -this.direction.x }
        if (this.location.y < 0) { this.direction.y = -this.direction.y }
        if (this.location.y > this.bounds.y) { this.direction.y = -this.direction.y }

        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        if (this.overlap) {
            ctx.strokeStyle = "red";
            ctx.lineWidth = 2;
        }  
        
        ctx.beginPath();
        ctx.arc(this.location.x, this.location.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();

        let color = "white";

        if (this.state == State.Infectious) {
            color = "red";
        }  
        if (this.state == State.Recovered) {
            color = "green";
        }

        ctx.fillStyle = color;
        ctx.fill();              
    }
}