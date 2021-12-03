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
    public gotIt: boolean = false; //temp
    public startSeperationAtDistance: number;

    private speed = 1;
    private infectionDuration: number = 0;

    private _tempCounter = 0;

    public constructor(location: Vector, bounds: Vector, id: number, invection: Invection, state: State, startSeperationAtDistance: number) {
        this.invection = invection;
        this.location = location;
        this.bounds = bounds;
        this.id = id;
        this.state = state;
        this.startSeperationAtDistance = startSeperationAtDistance;
        //this.direction = new Vector(Util.randomBetween(-this.speed, this.speed), Util.randomBetween(-this.speed, this.speed))
        this.direction = new Vector(Util.random()-0.5, Util.random()-0.5)
    
    }

    public reset() {
        this.overlap = false
        this.checked = false
        this.gotIt = false
    }

    private updateInfection() {
        if (this.state == State.Infectious) {
            this.infectionDuration++;
        }
        if (this.infectionDuration > this.invection.duration) {
            this.state = State.Recovered;
        }
        if (this.gotIt && this.state == State.Susceptible) {
            this.state = State.Infectious;
        }

        //die...        
    }


    private separate(boids: Array<Boid>) {

        //use multi hash map for performance

        //affect direction, based on forces of nearby
        let startSeperationAtDistance = this.startSeperationAtDistance;
        for (let i: number = 0; i < boids.length; i++) {
            if (this.id != boids[i].id) {
                let distanceBetween = this.location.distance(boids[i].location);
                if (distanceBetween < startSeperationAtDistance) {
                    let affectFactor = (startSeperationAtDistance - distanceBetween) / startSeperationAtDistance;
                    let affectVector = new Vector(this.location.x - boids[i].location.x, this.location.y - boids[i].location.y);
                    affectVector.setMagnitude(affectFactor);
                    this.direction = this.direction.add(affectVector);
                    if ((this._tempCounter<10)&&(this.id == 0))
                    {
                        //console.log(this._tempCounter+"- x:"+affectVector.x+"- y:"+affectVector.y);
                        console.log(affectFactor);
                    }
                }
            }
        }
        this.direction.setMaxMagnitude(2);
        this._tempCounter++;
    }



    private updateLocation() {
        this.location.x = this.location.x + this.direction.x
        this.location.y = this.location.y + this.direction.y

        /*
        //flip direction beyond border
        if (this.location.x < 0) { this.direction.x = -this.direction.x }
        if (this.location.x > this.bounds.x) { this.direction.x = -this.direction.x }
        if (this.location.y < 0) { this.direction.y = -this.direction.y }
        if (this.location.y > this.bounds.y) { this.direction.y = -this.direction.y }
        */

        //stay away from border
        let startSeperationAtDistance = this.startSeperationAtDistance;
        if (this.location.x < startSeperationAtDistance) {
            this.direction.x = this.direction.x + (startSeperationAtDistance - this.location.x) / startSeperationAtDistance;
         }
        if (this.location.x > this.bounds.x - startSeperationAtDistance) {
            this.direction.x = this.direction.x + ((this.bounds.x - startSeperationAtDistance) - this.location.x) / startSeperationAtDistance;
         }
         //
         if (this.location.y < startSeperationAtDistance) {
            this.direction.y = this.direction.y + (startSeperationAtDistance - this.location.y) / startSeperationAtDistance;
         }
        if (this.location.y > this.bounds.y - startSeperationAtDistance) {
            this.direction.y = this.direction.y + ((this.bounds.y - startSeperationAtDistance) - this.location.y) / startSeperationAtDistance;
         }
         //




    }

    public cycle(ctx: CanvasRenderingContext2D, boids: Array<Boid>) {
        this.updateInfection();
        this.separate(boids);
        this.updateLocation();
        this.render(ctx);
    }



    private render(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        if (this.overlap) {
            ctx.strokeStyle = "red";
            ctx.lineWidth = 2;
        }

        if (this.state == State.Infectious) {
            
            let lineWIdth = Math.sin(this.infectionDuration/this.invection.duration*Math.PI)*20;
            ctx.strokeStyle = "rgba(255,0,0,0.4)";
            ctx.lineWidth = lineWIdth;
        }

        ctx.beginPath();
        ctx.arc(this.location.x, this.location.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();

        let color = "#ffffff";

        if (this.state == State.Infectious) {
            color = "red";
        }
        if (this.state == State.Recovered) {
            color = "#bbbbbb";
        }

        ctx.fillStyle = color;
        ctx.fill();
    }
}